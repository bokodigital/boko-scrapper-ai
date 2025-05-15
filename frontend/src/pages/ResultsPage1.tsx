import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import NavBar from "../components/NavBar"
import SideBarSearches from "../components/SideBarSearches"
import Api from "../Api"
import GoogleSheetsExport from "../components/GoogleSheetsExport"
import { useLanguage } from "../context/LanguageContext"

// Translations
const translations = {
  en: {
    researchResults: "Research Results",
    export: "Export",
    downloadCsv: "Download CSV",
    connectSheets: "Connect to Google Sheets",
    yourPrompt: "Your prompt:",
    tryNewSearch: "Try a new search",
    errorSearchData: "Error getting search data, please try again",
    errorParsingData: "Error parsing results data. Check the console for more details.",
    errorProcessingData: "Sorry, we couldn't process the data format.",
    errorGettingData: "Error getting data, please try again",
    noDataFound: "We couldn't find the data you're looking for",
    na: "N/A",
    marketAnalysis: "Market Analysis"
  },
  es: {
    researchResults: "Resultados de investigación",
    export: "Exportar",
    downloadCsv: "Descargar CSV",
    connectSheets: "Conectar a Google Sheets",
    yourPrompt: "Tu consulta:",
    tryNewSearch: "Intentar nueva búsqueda",
    errorSearchData: "Error al obtener los datos de búsqueda, inténtelo de nuevo",
    errorParsingData: "Error al analizar los datos de resultados. Revisa la consola para más detalles.",
    errorProcessingData: "Lo sentimos, no pudimos procesar el formato de datos.",
    errorGettingData: "Error al obtener los datos, inténtelo de nuevo",
    noDataFound: "No pudimos encontrar los datos que buscas",
    na: "N/A",
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
  ai_summary?: string
  ai_generated: string
  created_at: string
  __v: number
  pinned: boolean
}

interface ResearchResult {
  [key: string]: string
}

const extractHeaders = (results: ResearchResult[]): string[] => {
  if (!results || results.length === 0) return []
  return Object.keys(results[0])
}

const ResultsPage1 = () => {
  const { searchId } = useParams()
  const history = useNavigate()
  const { language } = useLanguage()
  const t = translations[language]
  
  const [searches, setSearches] = useState<Search[]>([])
  // const [directory, setDirectory] = useState<Directory | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [results, setResults] = useState<ResearchResult[]>([])
  const [prompt, setPrompt] = useState("")
  const [emptyResults, setEmptyResults] = useState("")
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [showSheetsExport, setShowSheetsExport] = useState(false)
  const [aiSummary, setAiSummary] = useState("")

  useEffect(() => {
    // Reset states when changing searches to prevent displaying old data
    setResults([])
    setAiSummary("")
    setName("")
    setPrompt("")
    setEmptyResults("")
    setError(null)
    
    fetchSearches()
    fetchSearch()
    // fetchDirectory()
  }, [searchId])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.relative')) {
        setShowExportOptions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchSearches = async () => {
    try {
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
      setError(t.errorSearchData)
    }
  }

  // const fetchDirectory = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await Api.post(`/api/get-directory`, {
  //       directoryId: "67c861913287d752b4494ad5"
  //     }, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     })

  //     const data = response.data
  //     if (data.success) {
  //       setDirectory(data.directory)
  //       setError("")
  //     }
  //   } catch (error) {
  //     console.error("Error fetching directory:", error)
  //     setError("Error getting data, please try again")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const fetchSearch = async () => {
    try {
      const response = await Api.post(`/api/get-search-history`, {
        searchId: searchId
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      const data = response.data
      if (data.success) {
        setName(data.search.name)
        
        // Clean the content by removing markdown code blocks and fixing common issues
        let cleanedContent = data.search.ai_response.content.replace(/```json\n|\n```/g, "")
        
        // Save AI summary if available
        if (data.search.ai_summary) {
          const cleanMarkdownString = (str: string) => {
            return str
              .replace(/```markdown\n/, '') // Remove ```markdown\n
              .replace(/#/g, ''); // Remove all # characters
          }
          setAiSummary(cleanMarkdownString(data.search.ai_summary))
        }
        
        try {
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
          // Check if it has a success property
          else if (parsedContent.success === "false") {
            setEmptyResults(t.noDataFound)
            return
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
          
          // Ensure resultsData is an array
          setResults(processedResults)
          setEmptyResults("")
          
        } catch (parseError) {
          
          // Try to handle malformed JSON (like the example with curly braces at beginning of lines)
          try {
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
            setEmptyResults("")
          } catch (secondError) {
            setError(t.errorParsingData)
            setEmptyResults(t.errorProcessingData)
          }
        }
        
        setPrompt(data.search.prompt)
        setError("")
      }
    } catch (error) {
      setError(t.errorGettingData)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }


  const handleExportCSV = () => {
    const headers = extractHeaders(results)
    
    // Properly escape header cells that contain commas by wrapping in quotes
    const headerRow = headers.map(header => 
      `"${header.replace(/"/g, '""')}"`
    ).join(',')
    
    const rows = results.map(result => 
      headers.map(header => {
        const value = result[header] || ''
        // Ensure all values are properly quoted to handle commas, quotes, etc.
        return `"${value.toString().replace(/"/g, '""')}"`
      }).join(',')
    )
    
    // Add summary section if it exists
    let csvContent = [headerRow, ...rows].join('\n')
    if (aiSummary) {
      csvContent += '\n\n"Market Analysis"\n"' + aiSummary.replace(/"/g, '""').replace(/\n/g, '"\n"') + '"'
    }
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `${name}_export.csv`)
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
          closeSidebar={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <NavBar toggleSidebar={toggleSidebar} />


        <div className="container mx-auto px-4 py-8">
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{t.researchResults}</h1>
            </div>
            {!emptyResults && (
              <div className="relative">
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
            )}
          </div>
          <div className="mb-4">
          <p className="text-blue-600">
                {name}
              </p>
              <div>
                {prompt && (
                  <p style={{fontStyle: "italic"}}><span className="font-bold">{t.yourPrompt}</span> {prompt || t.na}</p>
                )}

              </div>
          </div>

          {emptyResults ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">{emptyResults}</p>
              <button
                onClick={() => history("/dashboard")}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {t.tryNewSearch}
              </button>
            </div>
          ) : (
            <>
              {/* Results Table - Desktop */}
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
            </>
          )}
          {showSheetsExport && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <GoogleSheetsExport
                  data={results}
                  headers={extractHeaders(results)}
                  name={name}
                  summary={aiSummary}
                  onClose={() => setShowSheetsExport(false)}
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default ResultsPage1
