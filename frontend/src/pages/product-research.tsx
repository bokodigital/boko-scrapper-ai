import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar"
import SideBarSearches from "../components/SideBarSearches"
import Api from "../Api"
import GoogleSheetsExport from "../components/GoogleSheetsExport"
import { useLanguage } from "../context/LanguageContext"

// Translations
const translations = {
  en: {
    productResearch: "Product Research",
    productName: "Product Name",
    productCode: "Product Code",
    optional: "(Optional)",
    errorSearchData: "Error getting search data, please try again",
    errorDirectoryData: "Error getting directory data, please try again",
    errorValidProductName: "Please enter a valid product name",
    errorParsingResults: "Error parsing results data. Please try again.",
    errorAiData: "Could not get AI data, please try again",
    errorReport: "Could not get report, please try again",
    processing: "Processing...",
    getReport: "Get report",
    researchResults: "Research Results",
    export: "Export",
    downloadCsv: "Download CSV",
    connectSheets: "Connect to Google Sheets",
    marketAnalysis: "Market Analysis"
  },
  es: {
    productResearch: "Investigación de Productos",
    productName: "Nombre del Producto",
    productCode: "Código del Producto",
    optional: "(Opcional)",
    errorSearchData: "Error al obtener datos de búsqueda, inténtelo de nuevo",
    errorDirectoryData: "Error al obtener datos del directorio, inténtelo de nuevo",
    errorValidProductName: "Por favor ingrese un nombre de producto válido",
    errorParsingResults: "Error al analizar los datos de resultados. Por favor, inténtelo de nuevo.",
    errorAiData: "No se pudieron obtener los datos de IA, inténtelo de nuevo",
    errorReport: "No se pudo obtener el informe, inténtelo de nuevo",
    processing: "Procesando...",
    getReport: "obtener informe",
    researchResults: "Resultados de la Investigación",
    export: "Exportar",
    downloadCsv: "Descargar CSV",
    connectSheets: "Conectar a Google Sheets",
    marketAnalysis: "Análisis de mercado"
  }
}

interface Search {
  _id: string
  user_id: string
  name: string
  url: string
  requires_auth: boolean
  scrape_response: any
  ai_prompt: string
  ai_response: any[]
  ai_generated: string
  created_at: string
  __v: number
  pinned: boolean
}

// interface Directory {
//   _id: string
//   name: string
//   website: string
//   requires_auth: boolean
//   internal_prompt: string
//   __v: number
// }

interface ResearchResult {
  [key: string]: string
}

const extractHeaders = (results: ResearchResult[]): string[] => {
  if (!results || results.length === 0) return []
  return Object.keys(results[0])
}

export default function ProductResearch() {
  const { directoryId } = useParams()
  const { language } = useLanguage()
  const t = translations[language]
  
  const [productName, setProductName] = useState("")
  const [productCode, setProductCode] = useState("")
  const [searches, setSearches] = useState<Search[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<ResearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [showSheetsExport, setShowSheetsExport] = useState(false)
  const [aiSummary, setAiSummary] = useState("")

  
  useEffect(() => {
    fetchSearches()
    if (directoryId) {
      fetchDirectory(directoryId as string)
    }
  }, [directoryId])

  const fetchSearches = async () => {
    try {
      setLoading(true)
      const response = await Api.get("/api/get-searches", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      const data = response.data
      if (data.success) {
        setSearches(data.searches)
        setError("")
      }
    } catch (error) {
      console.error("Error fetching searches:", error)
      setError(t.errorSearchData)
    } finally {
      setLoading(false)
    }
  }

  const fetchDirectory = async (id: string) => {
    try {
      setLoading(true)
      const response = await Api.post(`/api/get-directory`, {
        directoryId: id
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      const data = response.data
      if (data.success) {
        // setDirectory(data.directory)
        setError("")
      }
    } catch (error) {
      console.error("Error fetching directory:", error)
      setError(t.errorDirectoryData)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!productName) {
      setError(t.errorValidProductName)
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      setShowResults(false)

      // Create request body with required fields
      const requestBody: any = {
        productName,
      }

      // Only add productCode if it's not empty
      if (productCode.trim() !== "") {
        requestBody.productCode = productCode
      }

      //scrape trade mark
      const scrapper = await Api.post(
        "/api/scrape/trademark",
        { productName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      const data = scrapper.data
      if (data.success) {
        const response = await Api.post(
          "/api/get-ai-data-for-directories",
          {productName},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )

        const ai_data = response.data
        if (ai_data.success) {
          try {
            // Clean the content by removing markdown code blocks and fixing common issues
            let cleanedContent = ai_data.data.content.replace(/```json\n|\n```/g, "")
            
            // First, try to fix common issues before parsing
            // Remove any leading/trailing whitespace
            cleanedContent = cleanedContent.trim()
            
            // Check for the common nested object format that starts with {<newline>{
            if (cleanedContent.startsWith('{\n') && cleanedContent.includes('{\n\t\t"')) {
              // This is likely the format with nested objects
              // Replace the outer curly braces and properly format as an array
              cleanedContent = cleanedContent
                .replace(/^\{\n/, '[')  // Replace opening { with [
                .replace(/\n\}$/, ']')  // Replace closing } with ]
                .replace(/\t\{\n/g, '{\n')  // Remove tabs before {
                .replace(/\n\t\}/g, '\n}')  // Remove tabs before }
            }
            
            // Try parsing the fixed content
            let parsedContent = JSON.parse(cleanedContent)
            
            // Handle different data formats
            let resultsData;
            
            // Check if it's a direct array
            if (Array.isArray(parsedContent)) {
              resultsData = parsedContent
            } 
            // Check if it's a single object that contains an array (e.g., {results: [...], ...})
            else if (parsedContent.results && Array.isArray(parsedContent.results)) {
              resultsData = parsedContent.results
            } 
            // Try to handle the format with multiple objects directly in content
            else if (typeof parsedContent === 'object' && !Array.isArray(parsedContent)) {
              // Check if it looks like an array of objects within an object (the format in your example)
              const values = Object.values(parsedContent)
              if (values.length > 0 && typeof values[0] === 'object') {
                resultsData = values
              } else {
                // If it's just a single object
                resultsData = [parsedContent]
              }
            } else {
              // Fallback
              resultsData = [parsedContent]
            }
            
            // Process data to ensure arrays are converted to strings for React
            const processedResults = resultsData.map((item: ResearchResult) => {
              const processedItem = { ...item }
              // Convert any arrays to strings to avoid React rendering issues
              Object.keys(processedItem).forEach(key => {
                if (Array.isArray(processedItem[key])) {
                  processedItem[key] = processedItem[key].join(', ')
                }
              })
              return processedItem
            })
            
            // Set the results
            setResults(processedResults)
            setError("")
            setShowResults(true)
            setSubmitting(false)
            
            // Check if AI summary is available
            if (ai_data.summary) {
              const cleanMarkdownString = (str: string) => {
                return str
                  .replace(/```markdown\n/, '') // Remove ```markdown\n
                  .replace(/#/g, ''); // Remove all # characters
              }
              setAiSummary(cleanMarkdownString(ai_data.summary.content))
            }
            
            fetchSearches()
            
          } catch (parseError) {
            // Try to handle malformed JSON (like the example with curly braces at beginning of lines)
            try {
              // Clean the content
              let cleanedContent = ai_data.data.content.replace(/```json\n|\n```/g, "")
              
              // More aggressive fixes for malformed JSON
              let fixedContent = cleanedContent
                .replace(/^\s*{\s*\n\s*{\s*\n/g, '[{\n')  // Replace {{ at start with [{
                .replace(/\n\s*}\s*\n\s*}\s*$/g, '\n}]')  // Replace }} at end with }]
                .replace(/\n\s*}\s*,\s*\n\s*{\s*\n/g, '\n},\n{\n')  // Fix },{ syntax
              
              const parsedResults = JSON.parse(fixedContent)
              
              // Process to handle array values that React can't render directly
              const processedResults = Array.isArray(parsedResults) 
                ? parsedResults.map((item: ResearchResult) => {
                    const processedItem = { ...item }
                    Object.keys(processedItem).forEach(key => {
                      if (Array.isArray(processedItem[key])) {
                        processedItem[key] = processedItem[key].join(', ')
                      }
                    })
                    return processedItem
                  })
                : [parsedResults]
              
              setResults(processedResults)
              setError("")
              setShowResults(true)
              setSubmitting(false)
              
              // Check if AI summary is available in the second parsing attempt
              if (ai_data.data.ai_summary) {
                const cleanMarkdownString = (str: string) => {
                  return str
                    .replace(/```markdown\n/, '') // Remove ```markdown\n
                    .replace(/#/g, ''); // Remove all # characters
                }
                setAiSummary(cleanMarkdownString(ai_data.data.ai_summary))
              }
              
              fetchSearches()
              
            } catch (secondError) {
              setError(t.errorParsingResults)
              setSubmitting(false)
            }
          }
        } else {
          setError(t.errorAiData)
          setSubmitting(false)
        }

      } else {
        setError(t.errorReport)
        setSubmitting(false)
      }

    } catch (error) {
      console.error("Error creating search:", error)
      setError(t.errorReport)
    } finally {
      setSubmitting(false)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleExportCSV = () => {
    const headers = [
      "Exporter Country",
      "Export Value",
      "Top Importers",
      "Production Volume",
      "Export Price",
      "Import Price",
      "News"
    ]

    let csvContent = [
      headers.join(','),
      ...results.map(result => [
        `"${result["Exporter Country"]}"`,
        `"${result["Estimated Export Value (USD, Annual)"]}"`,
        `"${result["Top Importer Countries"]}"`,
        `"${result["Estimated Production Volume (Metric Tons, Annual)"]}"`,
        `"${result["Average Export Price (USD/kg)"]}"`,
        `"${result["Average Import Price (USD/kg)"]}"`,
        `"${result["Relevant News"].replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n')

    // Add summary if it exists
    if (aiSummary) {
      csvContent += '\n\n"Market Analysis"\n"' + aiSummary.replace(/"/g, '""').replace(/\n/g, '"\n"') + '"'
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `${productName}_export.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setShowExportOptions(false)
  }

  const handleConnectSheets = () => {
    setShowSheetsExport(true)
    setShowExportOptions(false)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-30 h-full transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } md:w-64 w-64`}
      >
        <SideBarSearches 
          searches={searches} 
          refreshSearches={fetchSearches} 
          isLoading={loading} 
          closeSidebar={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <NavBar toggleSidebar={toggleSidebar} />

        {!showResults ? (
          <div>
            {/* Progress Steps */}
            <div className="max-w-xl mx-auto mt-12 px-4">
              <div className="flex items-center justify-center gap-4">
                {[1, 2, 3].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${step === 2 ? "bg-blue-500 text-white" : step < 2 ? "bg-blue-400 text-white" : "bg-gray-100 text-gray-400"}
                  `}
                    >
                      {step}
                    </div>
                    {index < 2 && (
                      <div className="w-16 md:w-24 h-[2px] mx-2">
                        <div className={`h-full ${step <= 2 ? "bg-blue-400" : "bg-gray-200"}`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <main className="max-w-xl mx-auto mt-8 md:mt-16 px-4 pb-8">
              <h1 className="text-xl md:text-2xl font-bold mb-2">{t.productResearch}</h1>
              {/* Error Display */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-500 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-700">{error}</span>
                  </div>
                </div>
              )}


              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Name Input */}
                <div className="space-y-2">
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                    {t.productName}
                  </label>
                  <input
                    id="productName"
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Sugar"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Product Code Input */}
                <div className="space-y-2">
                  <label htmlFor="productCode" className="block text-sm font-medium text-gray-700">
                    {t.productCode} <span className="text-gray-400">{t.optional}</span>
                  </label>
                  <input
                    id="productCode"
                    type="text"
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    placeholder="e.g. 1806.31"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || loading}
                  className="w-full flex items-center justify-center gap-2 bg-blue-400 hover:bg-blue-500 text-white py-3 px-4 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>{t.processing}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.getReport}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </main>
          </div>

        ) : (

          <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">{t.researchResults}</h1>
                <p className="text-gray-600">
                  {productName} {productCode ? `(${productCode})` : ""}
                </p>
              </div>
              <button
                onClick={() => setShowExportOptions(!showExportOptions)}
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-white flex items-center gap-2"
              >
                {t.export}
                <svg
                  className={`w-4 h-4 transition-transform ${showExportOptions ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showExportOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <button
                    onClick={handleExportCSV}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t.downloadCsv}
                  </button>
                  <button
                    onClick={handleConnectSheets}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t.connectSheets}
                  </button>
                </div>
              )}
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {extractHeaders(results).map((header, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      {extractHeaders(results).map((header, colIndex) => (
                        <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* AI Summary Section */}
            {aiSummary && (
              <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-medium mb-4">{t.marketAnalysis}</h2>
                <div 
                  className="prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: aiSummary.replace(/\n/g, '<br/>') }}
                />
              </div>
            )}

            {/* Mobile View - Card Layout */}
            <div className="md:hidden space-y-4 mt-4">
              {results.map((result, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                  {extractHeaders(results).map((header, headerIndex) => (
                    <div key={headerIndex}>
                      <label className="text-xs text-gray-500">{header}</label>
                      <p className="text-sm">{result[header]}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {showSheetsExport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <GoogleSheetsExport
            data={results}
            headers={extractHeaders(results)}
            name={productName}
            summary={aiSummary}
              onClose={() => setShowSheetsExport(false)}
            />
          </div>
        </div>
      )}

    </div>
  )
}

