import { useState } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import { ArrowUpRight, CheckCircle, AlertCircle, Loader2, X, FileSpreadsheet } from "lucide-react"
import Api from "../Api"

interface GoogleSheetsExportProps {
  data: any[]
  headers: string[]
  name: string
  summary?: string
  onClose?: () => void
}

const GoogleSheetsExport = ({ data, headers, name, summary, onClose }: GoogleSheetsExportProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string | null>(null)

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await Api.post(
          "/api/export/google-sheets",
          {
            data,
            headers,
            name,
            summary,
            accessToken: tokenResponse.access_token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        )

        if (response.data.success) {
          setSpreadsheetUrl(response.data.spreadsheetUrl)
          setIsAuthenticated(true)
        } else {
          throw new Error(response.data.error || "Failed to export to Google Sheets")
        }
      } catch (err) {
        setError("No se pudo exportar a Hojas de Cálculo de Google. Inténtalo de nuevo..")
      } finally {
        setIsLoading(false)
      }
    },
    onError: () => setError("No se pudo autenticar con Google. Por favor, inténtalo de nuevo."),
    scope: [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    flow: "implicit",
  })

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-md w-full mx-auto transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="h-6 w-6 text-white" />
          <h3 className="text-lg font-semibold text-white">Exportar a Google Sheets</h3>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start animate-fadeIn">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-medium">Exportación fallida</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {!isAuthenticated ? (
          <div className="flex flex-col items-center py-6">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Google_Sheets_logo_%282014-2020%29.svg/1498px-Google_Sheets_logo_%282014-2020%29.svg.png"
                alt="Google Sheets"
                className="w-10 h-10 object-contain"
              />
            </div>

            <p className="mb-6 text-gray-700 text-center">
              Exporta <span className="font-medium">{name}</span> datos directamente a una nueva Hoja de Cálculo de Google
            </p>

            <div className="w-full bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Crea una nueva hoja de cálculo en tu Google Drive</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Formatea automáticamente los datos con encabezados</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Compartir y colaborar fácilmente</span>
              </div>
            </div>

            <button
              onClick={() => login()}
              disabled={isLoading}
              className="w-full px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-3 transition-all"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Iniciar sesión con Google
            </button>

            <p className="mt-4 text-xs text-gray-500 text-center">
              Solo solicitamos acceso para crear hojas de cálculo en tu nombre.
              <br />
              Tus datos permanecen privados y seguros.
            </p>
          </div>
        ) : (
          <div className="text-center py-8 animate-fadeIn">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>

            <h4 className="text-lg font-medium text-gray-900 mb-2">Exportación exitosa!</h4>
            <p className="text-gray-600 mb-6">Tus datos han sido exportados a una nueva Hoja de Cálculo de Google</p>

            {spreadsheetUrl && (
              <div className="mt-6">
                <a
                  href={spreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow"
                  onClick={onClose}
                >
                  Abrir en Google Sheets
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
                <button onClick={onClose} className="mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Cerrar esta ventana
                </button>
              </div>
            )}
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-b-xl animate-fadeIn">
            <div className="relative">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-6 w-6 bg-white rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-800 font-medium">Exportando a Hojas de Cálculo de Google...</p>
            <p className="text-sm text-gray-500 mt-2">Creando una nueva hoja de cálculo con tus datos</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GoogleSheetsExport
