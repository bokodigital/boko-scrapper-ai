import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../context/AuthStore'

export default function CreateNewPassword() {
  const navigate = useNavigate()
  const {token} = useParams()
  const { resetPassword, error} = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [formError, setFormError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setFormError('') // Clear error when user types
  }

  const validatePasswords = () => {
    if (formData.password.length < 8) {
      setFormError('La contraseña debe tener al menos 8 caracteres')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError('Las contraseñas no coinciden')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePasswords()) return

    setIsSubmitting(true)
    try {

      await resetPassword(token, formData.password)
      navigate('/login')
    } catch (error) {
      setFormError('Error al restablecer la contraseña. Por favor, inténtelo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      {formError && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
          {formError}
        </div>
      )}
      {error && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
          {error}
        </div>
      )}
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/">
            <svg width="140" height="38" viewBox="0 0 140 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2016_12849)">
                <path d="M18.8562 7.37152C18.2419 6.7482 17.5096 6.25372 16.702 5.91701C15.8944 5.5803 15.0277 5.40814 14.1528 5.41058H14.1184C11.678 5.41058 9.58562 6.67655 8.48092 8.59156C7.94147 9.52973 7.65368 10.5915 7.64551 11.6738C7.64551 11.6975 7.64551 11.7213 7.64551 11.745C7.64772 12.9872 8.0268 14.1995 8.73261 15.2214C9.30195 16.0518 10.0574 16.7374 10.9388 17.2237C11.8201 17.71 12.8028 17.9833 13.8086 18.022C14.7091 18.0619 15.6084 17.9198 16.4528 17.6042C17.2972 17.2886 18.0693 16.8059 18.7231 16.1851C19.9525 15.0148 20.641 13.4778 20.6624 11.8575C20.6746 11.0272 20.5212 10.2028 20.211 9.43248C19.9009 8.66221 19.4403 7.96155 18.8562 7.37152ZM12.0322 14.8272H10.6551V8.3474H12.0322V14.8272ZM16.9834 14.8326L15.6117 10.6191L14.2293 14.8326H12.8385L14.9699 8.33745H16.2498L16.2896 8.45532L18.3651 14.8326H16.9834Z" fill="#04DC08" />
                <path d="M31.562 9.22531H53.734V12.9352H36.2799V16.3963H51.2967V20.0411H36.3587V23.1877H53.734V27.4348H31.562V9.22531Z" fill="#04A0EA" />
                <path d="M113.492 9.24445H108.303V27.4149H113.492V9.24445Z" fill="#04A0EA" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M95.4755 9.32635H90.362L79.4673 27.3001H84.5807L86.849 23.4295L99.4781 23.4747L101.479 27.3017H106.951L95.4755 9.32635ZM89.5167 19.3806L93.2079 14.1307L96.5465 19.3806H89.5167Z" fill="#04A0EA" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.284 21.5543H120.963V22.0939C120.979 22.3683 121.09 22.6288 121.276 22.8305C121.463 23.0323 121.714 23.1629 121.986 23.1999L134.297 23.1838C134.589 23.1361 134.855 22.9833 135.043 22.7539C135.231 22.5245 135.329 22.2343 135.319 21.9378V21.1548C135.314 20.8741 135.212 20.6038 135.031 20.3894C134.844 20.186 134.588 20.0606 134.313 20.0381H120.982C120.213 20.0433 119.453 19.8667 118.765 19.5227C118.077 19.1786 117.479 18.6767 117.022 18.058C117.022 18.058 116.429 17.2558 116.303 16.4445C116.291 16.3634 116.287 16.2838 116.287 16.2838V16.159C116.287 16.159 116.287 13.7587 116.287 13.1855C116.287 13.1503 116.287 13.1005 116.292 13.0393C116.292 12.9934 116.297 12.9405 116.303 12.8816C116.351 12.4749 116.471 12.0798 116.655 11.7144C117.142 10.7285 118.084 10.1139 118.227 10.0206C118.921 9.57248 119.713 9.2991 120.535 9.22378H134.603C135.102 9.19316 136.717 9.1549 138.147 10.1981C138.263 10.2823 139.166 10.9406 139.664 11.9585C139.797 12.2098 139.894 12.4785 139.952 12.7568C140.003 13.0171 140.001 13.1977 140 13.8912C140 14.2739 140 14.5693 140 14.7224H135.321V14.1154C135.341 13.9687 135.33 13.8194 135.288 13.6774C135.246 13.5354 135.174 13.404 135.077 13.2919C134.981 13.1798 134.861 13.0895 134.727 13.0271C134.593 12.9646 134.447 12.9315 134.299 12.9298H122.052C121.774 12.9732 121.518 13.1058 121.322 13.3075C121.126 13.5092 121.001 13.7691 120.966 14.0481V15.3102C121.017 15.5899 121.156 15.8461 121.362 16.0414C121.568 16.2368 121.832 16.3611 122.114 16.3963H135.319C136.074 16.4085 136.816 16.5881 137.494 16.922C138.171 17.2559 138.766 17.7359 139.235 18.3274C139.509 18.6772 139.901 19.1777 139.985 19.9087C139.997 20.0104 140.002 20.1126 140.002 20.2149V22.9787C139.977 23.5958 139.813 24.1994 139.523 24.7445C139.087 25.5288 138.454 26.1856 137.687 26.6495C136.969 27.0892 136.161 27.3582 135.323 27.4356H120.966C120.251 27.4474 119.541 27.2999 118.89 27.0039C118.695 26.9144 117.316 26.263 116.735 25.007C116.508 24.4841 116.362 23.9293 116.303 23.3622C116.296 23.2925 116.287 23.2374 116.287 23.1861L116.284 21.5543Z" fill="#04A0EA" />
                <path d="M15.1736 23.764L26.802 37.1691L15.1843 37.1875L3.41891 23.7801H0V15.8904L6.26404 15.9072C7.19673 17.5612 8.62936 18.8769 10.3562 19.6653C11.389 20.1381 12.5047 20.4028 13.6397 20.4445C13.759 20.4491 13.8776 20.4514 13.9962 20.4514C15.1389 20.4538 16.2721 20.2444 17.3386 19.8337C18.4494 19.407 19.4649 18.7647 20.3268 17.9439C21.141 17.1736 21.7982 16.2527 22.2623 15.2321C22.7319 14.2054 22.9825 13.0921 22.9982 11.9631C23.0155 10.8214 22.8051 9.68769 22.3792 8.62829C21.9534 7.5689 21.3206 6.60511 20.518 5.79329C19.7002 4.9599 18.7261 4.29613 17.6515 3.83999C16.5285 3.36234 15.3212 3.11483 14.101 3.11211H14.0543C11.7368 3.09862 9.50531 3.98961 7.83388 5.59581C7.08742 6.31283 6.47587 7.15826 6.02842 8.09177H0V7.27177e-06L15.0925 0.0367448C21.609 0.155381 26.8609 5.57209 26.802 12.0114C26.7446 18.3366 21.5738 23.6048 15.1736 23.764Z" fill="#04A0EA" />
                <path d="M56.3701 9.22531H61.1072V23.2458H77.4803V27.4348H56.3701V9.22531Z" fill="#04A0EA" />
                <path d="M16.0479 8.49053L16.0524 8.50419L16.0563 8.49053H16.0479Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_2016_12849">
                  <rect width="140" height="37.1875" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>


        {/* Main Content */}
        <div className="mt-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-normal text-gray-900">
              Crear nueva contraseña
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Por favor, ingrese y confirme la nueva contraseña.<br />
              Necesitarás iniciar sesión después de restablecer.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 pr-10"
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 pr-10"
                  placeholder="Re-ingresa tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-md bg-blue-500 py-2 px-4 text-white transition-colors
                ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-600'}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Restableciendo...
                </span>
              ) : (
                'Restablecer contraseña'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 flex justify-between items-center text-sm text-gray-500">
        <div>© Relais 2025</div>
        <button className="flex items-center gap-1">
          Español
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}