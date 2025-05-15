import { useState, useEffect } from 'react'
import {User, Edit, LogOut, Globe, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../context/AuthStore'
import { useLanguage } from '../context/LanguageContext'

interface NavBarProps {
    toggleSidebar: () => void
}

// Create a language context/store later if needed for a more robust implementation
const translations = {
    en: {
        newSearch: "New search",
        editProfile: "Edit Profile",
        logout: "Logout",
        tutorial: "Tutorial & FAQs"
    },
    es: {
        newSearch: "Nueva búsqueda",
        editProfile: "Editar Perfil",
        logout: "Cerrar Sesión",
        tutorial: "Tutorial y Preguntas Frecuentes"
    }
}

const NavBar = ({ toggleSidebar }: NavBarProps) => {
    const { user, logout } = useAuthStore()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
    const { language, setLanguage } = useLanguage()

    useEffect(() => {
        const closeDropdowns = (e: MouseEvent) => {
            // Close user dropdown
            if (isDropdownOpen && !(e.target as Element).closest('.user-dropdown')) {
                setIsDropdownOpen(false)
            }
            // Close language dropdown
            if (isLangDropdownOpen && !(e.target as Element).closest('.lang-dropdown')) {
                setIsLangDropdownOpen(false)
            }
        }

        document.addEventListener('click', closeDropdowns)
        return () => document.removeEventListener('click', closeDropdowns)
    }, [isDropdownOpen, isLangDropdownOpen])

    const changeLanguage = (lang: 'es' | 'en') => {
        setLanguage(lang);
        setIsLangDropdownOpen(false);
    }

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="max-w-8xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        {/* Mobile menu button */}
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden mr-2 p-1 rounded-md hover:bg-gray-100"
                            aria-label="Toggle sidebar"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-menu"
                            >
                                <line x1="4" x2="20" y1="12" y2="12" />
                                <line x1="4" x2="20" y1="6" y2="6" />
                                <line x1="4" x2="20" y1="18" y2="18" />
                            </svg>
                        </button>
                        <Link to="/dashboard">
                            <svg width="140" height="38" viewBox="0 0 140 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2016_12849)">
                                    <path d="M18.8562 7.37152C18.2419 6.7482 17.5096 6.25372 16.702 5.91701C15.8944 5.5803 15.0277 5.40814 14.1528 5.41058H14.1184C11.678 5.41058 9.58562 6.67655 8.48092 8.59156C7.94147 9.52973 7.65368 10.5915 7.64551 11.6738C7.64551 11.6975 7.64551 11.7213 7.64551 11.745C7.64772 12.9872 8.0268 14.1995 8.73261 15.2214C9.30195 16.0518 10.0574 16.7374 10.9388 17.2237C11.8201 17.71 12.8028 17.9833 13.8086 18.022C14.7091 18.0619 15.6084 17.9198 16.4528 17.6042C17.2972 17.2886 18.0693 16.8059 18.7231 16.1851C19.9525 15.0148 20.641 13.4778 20.6624 11.8575C20.6746 11.0272 20.5212 10.2028 20.211 9.43248C19.9009 8.66221 19.4403 7.96155 18.8562 7.37152ZM12.0322 14.8272H10.6551V8.3474H12.0322V14.8272ZM16.9834 14.8326L15.6117 10.6191L14.2293 14.8326H12.8385L14.9699 8.33745H16.2498L16.2896 8.45532L18.3651 14.8326H16.9834Z" fill="#04DC08" />
                                    <path d="M31.562 9.22531H53.734V12.9352H36.2799V16.3963H51.2967V20.0411H36.3587V23.1877H53.734V27.4348H31.562V9.22531Z" fill="#04A0EA" />
                                    <path d="M113.492 9.24445H108.303V27.4149H113.492V9.24445Z" fill="#04A0EA" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M95.4755 9.32635H90.362L79.4673 27.3001H84.5807L86.849 23.4295L99.4781 23.4747L101.479 27.3017H106.951L95.4755 9.32635ZM89.5167 19.3806L93.2079 14.1307L96.5465 19.3806H89.5167Z" fill="#04A0EA" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M116.284 21.5543H120.963V22.0939C120.979 22.3683 121.09 22.6288 121.276 22.8305C121.463 23.0323 121.714 23.1629 121.986 23.1999L134.297 23.1838C134.589 23.1361 134.855 22.9833 135.043 22.7539C135.231 22.5245 135.329 22.2343 135.319 21.9378V21.1548C135.314 20.8741 135.212 20.6038 135.031 20.3894C134.844 20.186 134.588 20.0606 134.313 20.0381H120.982C120.213 20.0433 119.453 19.8667 118.765 19.5227C118.077 19.1786 117.479 18.6767 117.022 18.058C117.022 18.058 116.429 17.2558 116.303 16.4445C116.291 16.3634 116.287 16.2838 116.287 16.2838V16.159C116.287 16.159 116.287 13.7587 116.287 13.1855C116.287 13.1503 116.287 13.1005 116.292 13.0393C116.292 12.9934 116.297 12.9405 116.303 12.8816C116.351 12.4749 116.471 12.0798 116.655 11.7144C117.142 10.7285 118.084 10.1139 118.227 10.0206C118.921 9.57248 119.713 9.2991 120.535 9.22378H134.603C135.102 9.19316 136.717 9.1549 138.147 10.1981C138.263 10.2823 139.166 10.9406 139.664 11.9585C139.797 12.2098 139.894 12.4785 139.952 12.7568C140.003 13.0171 140.001 13.1977 140 13.8912C140 14.2739 140 14.5693 140 14.7224H135.321V14.1154C135.341 13.9687 135.33 13.8194 135.288 13.6774C135.246 13.5354 135.174 13.404 135.077 13.2919C134.981 13.1798 134.861 13.0895 134.727 13.0271C134.593 12.9646 134.447 12.9315 134.299 12.9298H122.052C121.774 12.9732 121.518 13.1058 121.322 13.3075C121.126 13.5092 121.001 13.7691 120.966 14.0481V15.3102C121.017 15.5899 121.156 15.8461 121.362 16.0414C121.568 16.2368 121.832 16.3611 122.114 16.3963H135.319C136.074 16.4085 136.816 16.5881 137.494 16.922C138.171 17.2559 138.766 17.7359 139.235 18.3274C139.509 18.6772 139.901 19.1777 139.985 19.9087C139.997 20.0104 140.002 20.1126 140.002 20.2149V22.9787C139.977 23.5958 139.813 24.1994 139.523 24.7445C139.087 25.5288 138.454 26.1856 137.687 26.6495C136.969 27.0892 136.161 27.3582 135.323 27.4356H120.966C120.251 27.4474 119.541 27.2999 118.89 27.0039C118.695 26.9144 117.316 26.263 116.735 25.007C116.508 24.4841 116.362 23.9293 116.303 23.3622C116.296 23.2925 116.287 23.2374 116.287 23.1861L116.284 21.5543Z" fill="#04A0EA" />
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
                        
                        {/* Language selector */}
                        <div className="relative lang-dropdown">
                            <button 
                                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm"
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                aria-label="Select language"
                            >
                                <Globe className="w-4 h-4" />
                                <span className="hidden md:inline">
                                    {language === 'es' ? 'Español' : 'English'}
                                </span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            
                            {isLangDropdownOpen && (
                                <div className="absolute left-0 top-full mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-10">
                                    <button
                                        onClick={() => changeLanguage('es')}
                                        className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${language === 'es' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                                    >
                                        Español
                                    </button>
                                    <button
                                        onClick={() => changeLanguage('en')}
                                        className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${language === 'en' ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                                    >
                                        English
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3 relative user-dropdown">
                        <span className="hidden md:block text-gray-700">{user?.name || user?.username}</span>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center focus:outline-none"
                        >
                            <User />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <Link
                                    to="/profile"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <Edit className="mr-3 h-5 w-5 text-gray-400" />
                                    {language === 'es' ? translations.es.editProfile : translations.en.editProfile}
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer text-red-500"
                                >
                                    <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                                    {language === 'es' ? translations.es.logout : translations.en.logout}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavBar
