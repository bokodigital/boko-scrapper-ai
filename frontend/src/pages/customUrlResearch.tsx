import type React from "react"
import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import SideBarSearches from "../components/SideBarSearches"
import Api from "../Api"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

// Translations object
const translations = {
  en: {
    pageTitle: "Get data from any website:",
    tip: "Tip:",
    tipText: "This may not work on all websites. For best results, paste the specific page you want to extract. For now, this tool only extracts one page from the exact URL you paste here.",
    errorDefault: "Error getting search data, please try again",
    errorValidUrl: "Please enter a valid URL",
    errorLoginFields: "Please enter both email and password",
    errorDataNotFound: "Sorry we couldn't find the data you are looking for, please try again",
    enterUrl: "Enter URL",
    requiresLogin: "Requires login",
    loginPageUrl: "Login page URL",
    emailUsername: "Email or username",
    password: "Password",
    betaFeature: "BETA",
    betaText: "This feature is still in development and may not work correctly with some websites. We are constantly improving its functionality and accuracy.",
    scanningWait: "Scanning... Please wait",
    scanWebsite: "Scan website"
  },
  es: {
    pageTitle: "Obtenga datos de cualquier sitio web:",
    tip: "Tip:",
    tipText: "Es posible que esto no funcione en todos los sitios web. Para obtener el mejor resultado, pegue la página específica que desea extraer. Por ahora, esta herramienta solo extrae una página de la URL exacta que pegue aquí.",
    errorDefault: "Error al obtener datos de búsqueda, inténtelo de nuevo",
    errorValidUrl: "Por favor ingrese una URL válida",
    errorLoginFields: "Por favor ingrese email y contraseña",
    errorDataNotFound: "Lo sentimos, no pudimos encontrar los datos que está buscando, inténtelo de nuevo",
    enterUrl: "Ingrese URL",
    requiresLogin: "Requiere inicio de sesión",
    loginPageUrl: "URL de la página de inicio de sesión",
    emailUsername: "Email o nombre de usuario",
    password: "Contraseña",
    betaFeature: "BETA",
    betaText: "Esta función aún está en desarrollo y podría no funcionar correctamente con algunos sitios web. Estamos mejorando constantemente su funcionamiento y precisión.",
    scanningWait: "Analizando... Espere un momento",
    scanWebsite: "analizar sitio web"
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

const customUrlResearch = () => {
  const history = useNavigate()
  const { language } = useLanguage()
  const t = translations[language]
  
  const [customUrl, setCustomUrl] = useState("")
  const [searches, setSearches] = useState<Search[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // const [requiresLogin, setRequiresLogin] = useState(false)
  // const [loginUrl, setLoginUrl] = useState("")
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const [showTooltip, setShowTooltip] = useState(false)
  //const [showBetaTip, setShowBetaTip] = useState(false)
  useEffect(() => {
    fetchSearches()
    setSubmitting(false)
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
      console.error("Error fetching searches:", error)
      setError(t.errorDefault)
    } finally {
      setLoading(false)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!customUrl) {
      setError(t.errorValidUrl)
      return
    }
    // Add https:// if not present
    let processedUrl = customUrl
    if (!customUrl.startsWith('http://') && !customUrl.startsWith('https://')) {
      processedUrl = 'https://' + customUrl
    }

    // if (requiresLogin && (!email || !password)) {
    //   setError(t.errorLoginFields)
    //   return
    // }

    try {
      setSubmitting(true)
      setError(null)

      const requestBody: any = {
        url: processedUrl,
        auth: false,
        loginUrl: "",
        email: "",
        password: ""
      }

      const response = await Api.post(
        "/api/scrape/website",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )

      const data = response.data
      console.log(data)
      if (data.success) {
        history(`/custom-url/ai-prompt/${data.data._id}`)
      }
      else {
        setError(t.errorDataNotFound)
      }
    } catch (error) {
      console.error("Error creating search:", error)
      setError(t.errorDataNotFound)
    } finally {
      setSubmitting(false)
    }
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
          <div className="flex items-center mb-2">
            <h1 className="text-xl md:text-2xl font-bold">{t.pageTitle}</h1>
            <div className="relative ml-3">
              <span 
                className="text-white text-xs px-2 py-0.5 rounded-full font-semibold cursor-help"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.9997 23.4166C18.7526 23.4166 23.4163 18.7529 23.4163 12.9999C23.4163 7.24695 18.7526 2.58325 12.9997 2.58325C7.24671 2.58325 2.58301 7.24695 2.58301 12.9999C2.58301 18.7529 7.24671 23.4166 12.9997 23.4166Z" stroke="black" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
<path d="M13 18.2083H13.0104" stroke="black" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
<path d="M9.96875 9.87511C10.2137 9.17893 10.697 8.59188 11.3333 8.21795C11.9695 7.84402 12.7176 7.70733 13.445 7.8321C14.1724 7.95686 14.8321 8.33503 15.3074 8.89961C15.7826 9.4642 16.0428 10.1788 16.0417 10.9168C16.0417 13.0001 12.9167 14.0418 12.9167 14.0418" stroke="black" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
</svg>

              </span>
              
              {showTooltip && (
                <div className="absolute z-10 w-72 mt-2 -ml-32 transform -translate-x-1/2 px-4 py-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                  <div className="after:content-[''] after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:-translate-y-full after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-gray-900"></div>
                  <p>{t.tipText}</p>
                </div>
              )}
            </div>
          </div>
          
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
              <label htmlFor="customUrl" className="block text-sm font-medium text-gray-700">
                {t.enterUrl}
              </label>
              <input
                id="customUrl"
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="e.g. https://www.example.com"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

{/*             
            <div className="flex items-center space-x-3">
            <div className="relative ml-3">
              <span 
                className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-xs px-2 py-0.5 rounded-full font-semibold cursor-help"
                onMouseEnter={() => setShowBetaTip(true)}
                onMouseLeave={() => setShowBetaTip(false)}
              >
                {t.betaFeature}
              </span>
              
              {showBetaTip && (
                <div className="absolute z-10 w-72 mt-2 -ml-32 transform -translate-x-1/2 px-4 py-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                  <div className="after:content-[''] after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:-translate-y-full after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-gray-900"></div>
                  <p>{t.betaText}</p>
                </div>
              )}
            </div>
              <label htmlFor="requiresLogin" className="text-sm font-medium text-gray-700">
              {t.requiresLogin}
              </label>
              <button
                type="button"
                role="switch"
                aria-checked={requiresLogin}
                onClick={() => setRequiresLogin(!requiresLogin)}
                className={`${requiresLogin ? 'bg-blue-500' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span
                  aria-hidden="true"
                  className={`${requiresLogin ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
              
            </div>
            

            
            {requiresLogin && (
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t.loginPageUrl}
                  </label>
                  <input
                    id="url"
                    type="text"
                    value={loginUrl}
                    onChange={(e) => setLoginUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required={requiresLogin}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t.emailUsername}
                  </label>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required={requiresLogin}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    {t.password}
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required={requiresLogin}
                  />
                </div>
              </div>
            )} */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-400 hover:bg-blue-500  text-white py-3 px-4 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <span>{t.scanningWait}</span>
                </>
              ) : (
                <>
                  <span>{t.scanWebsite}</span>
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
    </div>
  )
}

export default customUrlResearch
