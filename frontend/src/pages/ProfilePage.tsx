import { useState, useEffect } from "react"
import { Eye, EyeOff, Mail, User, Lock, Edit2, Save, X, CheckCircle, Loader2} from "lucide-react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import Api from "../Api"
import { useAuthStore } from "../context/AuthStore"
import { useLanguage } from "../context/LanguageContext"

// Translations
const translations = {
  en: {
    backToDashboard: "Back to Dashboard",
    yourProfile: "Your Profile",
    manageAccount: "Manage your account details",
    emailAddress: "Email address",
    emailCannotBeChanged: "Your email address cannot be changed",
    username: "Username",
    name: "Name",
    edit: "Edit",
    enterNewUsername: "Enter new username",
    save: "Save",
    cancel: "Cancel",
    password: "Password",
    change: "Change",
    currentPassword: "Current password",
    forgotPassword: "Forgot your password?",
    newPassword: "New password",
    passwordRequirement: "Password must be at least 8 characters",
    confirmNewPassword: "Confirm new password",
    updatePassword: "Update password",
    passwordsDontMatch: "Passwords don't match",
    passwordMinLength: "Password must be at least 8 characters",
    usernameExists: "Username already exists",
    passwordUpdateError: "Error updating password. Please try again.",
    usernameUpdateSuccess: "Username updated successfully",
    passwordUpdateSuccess: "Password updated successfully",
    nameUpdateError: "Error updating name. Please try again.",
    nameUpdateSuccess: "Name updated successfully"
  },
  es: {
    backToDashboard: "Volver al Dashboard",
    yourProfile: "Tu Perfil",
    manageAccount: "Administra tus detalles de cuenta",
    emailAddress: "Dirección de correo electrónico",
    emailCannotBeChanged: "Tu dirección de correo electrónico no puede ser cambiada",
    username: "Nombre de usuario",
    name: "Nombre",
    edit: "Editar",
    enterNewUsername: "Ingrese nuevo nombre de usuario",
    save: "Guardar",
    cancel: "Cancelar",
    password: "Contraseña",
    change: "Cambiar",
    currentPassword: "Contraseña actual",
    forgotPassword: "¿Olvidaste tu contraseña?",
    newPassword: "Nueva contraseña",
    passwordRequirement: "La contraseña debe tener al menos 8 caracteres",
    confirmNewPassword: "Confirmar nueva contraseña",
    updatePassword: "Actualizar contraseña",
    passwordsDontMatch: "Las contraseñas no coinciden",
    passwordMinLength: "La contraseña debe tener al menos 8 caracteres",
    usernameExists: "Nombre de usuario ya existe",
    passwordUpdateError: "Error al actualizar la contraseña. Por favor, inténtelo de nuevo.",
    usernameUpdateSuccess: "Nombre de usuario actualizado correctamente",
    passwordUpdateSuccess: "Contraseña actualizada correctamente",
    nameUpdateError: "Error al actualizar el nombre. Por favor, inténtelo de nuevo.",
    nameUpdateSuccess: "Nombre actualizado correctamente"
  }
}

const ProfilePage = () => {
  const { user, checkAuth } = useAuthStore()
  const { language } = useLanguage()
  const t = translations[language]
  
  const [userDetails, setUserDetails] = useState(user)
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [newUsername, setNewUsername] = useState(userDetails?.username || "")
  const [newName, setNewName] = useState(userDetails?.name || "")   
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // UI states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")

  // Add useEffect to check auth when component mounts
  useEffect(() => {
    if (!user) {
      checkAuth()
    }
  }, []) // Empty dependency array
  
  // Update userDetails when user changes
  useEffect(() => {
    setUserDetails(user)
  }, [user])

  // Handle name update
  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await Api.post(`/api/update-profile`, { name: newName, username: null, password: null }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      const data = response.data
      if (data.success) {
        setUserDetails((prev) => prev ? { ...prev, name: newName } : null)
        setSuccessMessage(t.nameUpdateSuccess)
        setIsEditingName(false)
      } else {
        setError(data.message || "Failed to update name. Please try again.")
      }
    } catch (err) {
      setError(t.nameUpdateError)
    } finally {
      setIsLoading(false)
    }
    
  }

  // Handle username update
  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await Api.post(`/api/update-profile`, { username: newUsername, password: null }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      const data = response.data
      if (data.success) {
        setUserDetails((prev) => prev ? { ...prev, username: newUsername } : null)
        setSuccessMessage(t.usernameUpdateSuccess)
        setIsEditingUsername(false)
      } else {
        setError(data.message || "Failed to update username. Please try again.")
      }
    } catch (err) {
      setError(t.usernameExists)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle password update
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError(t.passwordsDontMatch)
      return
    }

    // Validate password strength
    if (newPassword.length < 8) {
      setError(t.passwordMinLength)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Replace with your actual API call
      const response = await Api.post(`/api/update-profile`, { 
        username: null,
        password: newPassword
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      const data = response.data
      if (data.success) {
        setUserDetails((prev) => prev ? { ...prev, password: "••••••••" } : null)
        setSuccessMessage(t.passwordUpdateSuccess)
        setIsEditingPassword(false)
      } else {
        setError(data.message || t.passwordUpdateError)
      }

      // Reset form
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      setError(t.passwordUpdateError)
    } finally {
      setIsLoading(false)
    }
  }

  // Cancel editing
  const cancelEditUsername = () => {
    setNewUsername(userDetails?.username || "")
    setIsEditingUsername(false)
  }

  const cancelEditName = () => {
    setNewName(userDetails?.name || "")
    setIsEditingName(false)
  }

  const cancelEditPassword = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setIsEditingPassword(false)
    setError("")
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
}


  return (
    <div className="min-h-screen bg-[#f8f9fe] flex flex-col">
      {/* Header with navigation */}
      <NavBar toggleSidebar={toggleSidebar} />
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12" >
        <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 pb-4">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 11.5L1 7M1 7L5.5 2.5M1 7L15 7" stroke="black" stroke-width="1.25" stroke-linecap="square"/>
          </svg>
          <Link to={"/dashboard"} className="hover:text-blue-800 font-medium">
              {t.backToDashboard}
          </Link>
        </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">{t.yourProfile}</h1>
              <p className="text-gray-600">{t.manageAccount}</p>
            </div>


            {/* Success message */}
            {successMessage && (
              <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Error message */}
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}

            <div className="space-y-6">
              {/* Email (read-only) */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">{t.emailAddress}</h3>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    value={userDetails?.email || ""}
                    className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 bg-gray-50 text-gray-700"
                    disabled
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                <p className="text-sm text-gray-500 mt-2">{t.emailCannotBeChanged}</p>
              </div>

              {/* Name (editable) */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">{t.name}</h3>
                  {!isEditingName && (
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-blue-500 hover:text-blue-700 flex items-center"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      {t.edit}
                    </button>
                  )}
                </div>
              </div>

              {isEditingName ? (
                <form onSubmit={handleNameUpdate}>
                  <div className="relative mb-4">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder={t.enterNewUsername}
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {t.save}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditName}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      {t.cancel}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    value={userDetails?.name || ""}
                    className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 bg-gray-50 text-gray-700"
                    disabled
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              )}


              {/* Username (editable) */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">{t.username}</h3>
                  {!isEditingUsername && (
                    <button
                      onClick={() => setIsEditingUsername(true)}
                      className="text-blue-500 hover:text-blue-700 flex items-center"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      {t.edit}
                    </button>
                  )}
                </div>

                {isEditingUsername ? (
                  <form onSubmit={handleUsernameUpdate}>
                    <div className="relative mb-4">
                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder={t.enterNewUsername}
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center"
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        {t.save}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditUsername}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium flex items-center"
                      >
                        <X className="h-4 w-4 mr-2" />
                        {t.cancel}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="relative">
                    <input
                      type="text"
                      value={userDetails?.username || ""}
                      className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 bg-gray-50 text-gray-700"
                      disabled
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Password (editable) */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">{t.password}</h3>
                  {!isEditingPassword && (
                    <button
                      onClick={() => setIsEditingPassword(true)}
                      className="text-blue-500 hover:text-blue-700 flex items-center"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      {t.change}
                    </button>
                  )}
                </div>

                {isEditingPassword ? (
                  <form onSubmit={handlePasswordUpdate}>
                    {/* Current Password */}
                    <div className="mb-4">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        {t.currentPassword}
                      </label>
                      <small><Link to="/forgot-password" className="text-blue-500 hover:text-blue-700">{t.forgotPassword}</Link></small>
                      <div className="relative">
                        <input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder={t.currentPassword}
                          required
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="mb-4">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        {t.newPassword}
                      </label>
                      <div className="relative">
                        <input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder={t.newPassword}
                          required
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{t.passwordRequirement}</p>
                    </div>

                    {/* Confirm New Password */}
                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        {t.confirmNewPassword}
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder={t.confirmNewPassword}
                          required
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center"
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        {t.updatePassword}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditPassword}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium flex items-center"
                      >
                        <X className="h-4 w-4 mr-2" />
                        {t.cancel}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="relative">
                    <input
                      type="password"
                      value="••••••••"
                      className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 bg-gray-50 text-gray-700"
                      disabled
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ProfilePage

