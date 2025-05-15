import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import SideBarSearches from "../components/SideBarSearches"
import Api from "../Api"
import { useParams } from "react-router-dom"
import GoogleSheetsExport from "../components/GoogleSheetsExport"
import { useLanguage } from "../context/LanguageContext"

// Translations
const translations = {
    en: {
        websiteContentAnalysis: "Website Content Analysis:",
        howToAnalyze: "How should I analyze this?",
        tooltipText: "Ask specific questions about the website content to get specific analysis. For example, ask about product features, pricing strategy, or content structure.",
        promptPlaceholder: "Enter your analysis prompt here... (e.g. 'Analyze the product features and compare them with market standards')",
        analyzing: "Analyzing... Please wait",
        analyze: "Analyze",
        analysisResults: "Analysis Results",
        export: "Export",
        downloadCsv: "Download CSV",
        connectSheets: "Connect to Google Sheets",
        errorData: "Error getting data, please try again",
        errorSearchData: "Error getting search data, please try again",
        errorDataNotFound: "Sorry we couldn't find the Data you are looking for"
    },
    es: {
        websiteContentAnalysis: "Análisis de contenido del sitio web:",
        howToAnalyze: "¿Cómo debería analizar esto?",
        tooltipText: "Introduce preguntas específicas sobre el contenido del sitio web para obtener un análisis específico. Por ejemplo, pregunta sobre las características del producto, la estrategia de precios o la estructura del contenido.",
        promptPlaceholder: "Ingrese su mensaje de análisis aquí... (p.ej. 'Analiza las características del producto y compáralas con los estándares del mercado')",
        analyzing: "Analizando... Espere un momento",
        analyze: "Analizar",
        analysisResults: "Resultados del análisis",
        export: "Exportar",
        downloadCsv: "Descargar CSV",
        connectSheets: "Conectar a Google Sheets",
        errorData: "Error al obtener datos, inténtelo de nuevo",
        errorSearchData: "Error al obtener datos de búsqueda, inténtelo de nuevo",
        errorDataNotFound: "Lo sentimos, no pudimos encontrar los datos que está buscando"
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

interface Data {
    success: boolean
    data: any
}

interface ResearchResult {
    [key: string]: string
  }

// Add this helper function at the top of the component
const extractHeaders = (results: ResearchResult[]): string[] => {
    if (!results || results.length === 0) return []
    return Object.keys(results[0])
  }

const AiPromptPage = () => {
    const { id } = useParams()
    const { language } = useLanguage()
    const t = translations[language]
    
    const [siteData, setSiteData] = useState<Data | null>(null)
    const [searches, setSearches] = useState<Search[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [prompt, setPrompt] = useState("")
    const [results, setResults] = useState<any[]>([])
    const [showResults, setShowResults] = useState(false)
    const [showExportOptions, setShowExportOptions] = useState(false)
    const [showSheetsExport, setShowSheetsExport] = useState(false)
    

    useEffect(() => {
        getData()
        fetchSearches()
    }, [])

    const getData = async () => {
        try {
            setLoading(true)
            const response = await Api.post(
                `/api/scrape/get/contents`,
                {
                    id: id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                },
            )

            const data = response.data
            if (data.success) {
                setSiteData(data)
                setError("")
            }
        } catch (error) {
            console.error("Error fetching directory:", error)
            setError(t.errorData)
        } finally {
            setLoading(false)
        }
    }

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

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    // Update the handleSubmit function
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setSubmitting(true)
            const response = await Api.post(
                `/api/get-ai-data`,
                {
                    scrappedDataId: id,
                    prompt: prompt,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                },
            )

            const data = response.data
            if (data.success) {
                const parsedContent = JSON.parse(data.dataResponse.content.replace(/```json\n|\n```/g, ""))
                // Handle nested results under 'products' or similar keys
                const resultsData =parsedContent
                setResults(Array.isArray(resultsData) ? resultsData : [resultsData])
                if (parsedContent.success === "false") {
                    setError(t.errorDataNotFound)
                }else {
                    setError("")
                    setShowResults(true)
                    setSubmitting(false)
                  }
            }else {
                setError(t.errorData)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
            setError(t.errorData)
        } finally {
            setSubmitting(false)
        }

    }

    // Update the handleExportCSV function
    const handleExportCSV = () => {
        const headers = extractHeaders(results)
        
        const csvContent = [
            headers.join(','),
            ...results.map(result => 
                headers.map(header => 
                    `"${(result[header] || '').toString().replace(/"/g, '""')}"`
                ).join(',')
            )
        ].join('\n')
      
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', `${siteData?.data?.url || 'export'}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleConnectSheets = () => {
        setShowSheetsExport(true)
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
                        ${step === 2 ? "bg-blue-500 text-white" : step < 2 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-400"}
                    `}
                                        >
                                            {step}
                                        </div>
                                        {index < 2 && (
                                            <div className="w-16 md:w-24 h-[2px] mx-2">
                                                <div className={`h-full ${step <= 2 ? "bg-blue-500" : "bg-gray-200"}`} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main Content */}
                        <main className="max-w-xl mx-auto mt-8 md:mt-16 px-4 pb-8">
                            <h1 className="text-xl md:text-2xl font-bold mb-2">{t.websiteContentAnalysis}</h1>
                            <p className="text-blue-600 pb-12">{siteData?.data?.url}</p>
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
                                <div className="space-y-2">
                                    <label htmlFor="prompt" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        {t.howToAnalyze}
                                        <div className="relative group">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-blue-600 cursor-help"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="M12 16v-4"></path>
                                                <path d="M12 8h.01"></path>
                                            </svg>
                                            <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50">
                                            {t.tooltipText}
                                            </div>
                                        </div>
                                    </label>
                                    <textarea
                                        id="prompt"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder={t.promptPlaceholder}
                                        className="w-full h-70 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] resize-y"
                                        required
                                    />
                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={submitting || loading}
                                        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                                <span>{t.analyzing}</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{t.analyze}</span>
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
                                </div>
                            </form>
                        </main>
                    </div>)
                    :
                    (
                        <div className="container mx-auto px-4 py-8">
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">{t.analysisResults}</h1>
                                    <p className="text-blue-600 pb-12">{siteData?.data?.url}</p>
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

                            {/* Mobile View - Card Layout */}
                            {/* <div className="md:hidden space-y-4 mt-4">
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
                            </div> */}
                        </div>
                    )}
            </div>
            {showSheetsExport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <GoogleSheetsExport
              data={results}
              headers={extractHeaders(results)}
              name={siteData?.data?.url}
              onClose={() => setShowSheetsExport(false)}
            />
          </div>
        </div>
      )}
        </div>
    )
}

export default AiPromptPage

