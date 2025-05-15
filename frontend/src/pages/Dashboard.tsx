import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import SideBarSearches from "../components/SideBarSearches"
import Api from "../Api"
import { useLanguage } from "../context/LanguageContext"
import { useAuthStore } from '../context/AuthStore'

// Translations
const translations = {
  en: {
    hello: "Hello,",
    whatToDoToday: "What are we going to do today?",
    marketResearch: "Product Market Research",
    marketResearchDesc: "Analyze market trends and products",
    websiteAnalysis: "Website Content Analysis",
    websiteAnalysisDesc: "Extract and analyze content from any website",
    errorDefault: "Error getting data, please try again"
  },
  es: {
    hello: "Hola,",
    whatToDoToday: "¿Qué vamos a hacer hoy?",
    marketResearch: "Investigación de mercado de productos",
    marketResearchDesc: "Analice tendencias de mercado y productos",
    websiteAnalysis: "Análisis de contenido del sitio web",
    websiteAnalysisDesc: "Extraiga y analice contenido de cualquier sitio web",
    errorDefault: "Error al obtener los datos, inténtelo de nuevo"
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
}

interface Directory {
  _id: string
  name: string
  website: string
  requires_auth: boolean
  internal_prompt: string
  __v: number
}

export default function ScrapingInterface() {
  const history = useNavigate()
  const { language } = useLanguage()
  const { user } = useAuthStore()
  const t = translations[language]
  
  const [searches, setSearches] = useState<Search[]>([])
  const [directories, setDirectories] = useState<Directory[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSearches()
    fetchDirectories()
  }, [])

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
      console.error("Error al recuperar búsquedas:", error)
      setError(t.errorDefault)
    } finally {
      setLoading(false)
    }
  }

  const fetchDirectories = async () => {
    try {
      const response = await Api.get("/api/get-directories", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      const data = response.data
      if (data.success) {
        setDirectories(data.directories)
        setError("")
      }
    } catch (error) {
      console.error("Error al recuperar directorios:", error)
      setError(t.errorDefault)
    }
  }


  const handleDirectoryClick = () => {
    // Navigate to product research page with the selected directory
    history(`/product-research/${directories[0]._id}`)

    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const MainContent = () => (
    <div className="px-4 py-6">
      <div className="text-center">
          <h1 className="text-2xl font-semibold">
            {t.hello} {user?.name || user?.username} 
        </h1>
        <p className="mb-6 ">{t.whatToDoToday}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        <div
          onClick={() => handleDirectoryClick()}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-all cursor-pointer"
        >
          {/* <Store className="w-8 h-8 text-blue-500 mb-3" /> */}
          <svg width="41" height="32" viewBox="0 0 41 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="27" cy="16" r="14" fill="#CFE0FF"/>
          <path d="M16.0003 29.3334C23.3641 29.3334 29.3337 23.3638 29.3337 16C29.3337 8.63622 23.3641 2.66669 16.0003 2.66669C8.63653 2.66669 2.66699 8.63622 2.66699 16C2.66699 23.3638 8.63653 29.3334 16.0003 29.3334Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.9997 18.6666C17.4724 18.6666 18.6663 17.4727 18.6663 16C18.6663 14.5272 17.4724 13.3333 15.9997 13.3333C14.5269 13.3333 13.333 14.5272 13.333 16C13.333 17.4727 14.5269 18.6666 15.9997 18.6666Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>


          <h3 className="font-medium text-lg mb-2">{t.marketResearch}</h3>
          <p className="text-gray-600 text-sm">
            {t.marketResearchDesc}
          </p>
        </div>

        <div
          onClick={() => history("/custom-url-scrape")}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-all cursor-pointer"
        >

          <svg width="41" height="32" viewBox="0 0 41 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="27" cy="16" r="14" fill="#C7FFB2"/>
          <path d="M16.0003 29.3334C23.3641 29.3334 29.3337 23.3638 29.3337 16C29.3337 8.63622 23.3641 2.66669 16.0003 2.66669C8.63653 2.66669 2.66699 8.63622 2.66699 16C2.66699 23.3638 8.63653 29.3334 16.0003 29.3334Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.66699 16H29.3337" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.0003 2.66669C19.3354 6.31782 21.2307 11.0561 21.3337 16C21.2307 20.944 19.3354 25.6822 16.0003 29.3334C12.6653 25.6822 10.77 20.944 10.667 16C10.77 11.0561 12.6653 6.31782 16.0003 2.66669V2.66669Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>



          <h3 className="font-medium text-lg mb-2">{t.websiteAnalysis}</h3>
          <p className="text-gray-600 text-sm">
            {t.websiteAnalysisDesc}
          </p>
        </div>
      </div>
    </div>
  )

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
          searches={searches as any} 
          refreshSearches={fetchSearches} 
          isLoading={loading} 
          closeSidebar={() => setSidebarOpen(false)} 
        />
      </div>

      <div className="flex-1 overflow-auto">
        <NavBar toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <MainContent />

        {/* Error Display */}
        {error && (
          <div className="max-w-4xl mx-auto px-4">
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
          </div>
        )}
      </div>
    </div>
  )
}

