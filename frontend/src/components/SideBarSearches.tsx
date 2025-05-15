import { useState } from "react"
import { format } from "date-fns"
import { Link, useNavigate } from "react-router-dom"
import Api from "../Api"
import {ChevronLeft, ChevronRight, Loader } from "lucide-react"
import { useLanguage } from "../context/LanguageContext"

// Translations for the component
const translations = {
  en: {
    newSearch: "New search",
    recent: "Recent",
    noSavedData: "No saved data yet",
    page: "Page",
    of: "of",
    tutorial: "Tutorial & FAQs",
    loading: "Loading searches..."
  },
  es: {
    newSearch: "Nueva búsqueda",
    recent: "Recientes",
    noSavedData: "No hay datos guardados",
    page: "Página",
    of: "de",
    tutorial: "Tutorial y Preguntas Frecuentes",
    loading: "Cargando búsquedas..."
  }
};

interface Search {
  _id: string
  name: string
  created_at: string
  url: string
  pinned: boolean
}

interface SidebarProps {
  searches: Search[]
  refreshSearches: () => void
  isLoading?: boolean
  closeSidebar?: () => void
}

export default function SideBarSearches({ searches, refreshSearches, isLoading = false, closeSidebar }: SidebarProps) {
  const [isRecentExpanded, setIsRecentExpanded] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isPinning, setIsPinning] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const history = useNavigate()
  
  // Get language from context
  const { language } = useLanguage();
  
  // Get translations based on language
  const t = translations[language];

  const handleDeleteClick = async (e: React.MouseEvent, searchId: string) => {
    e.stopPropagation() // Prevent triggering the parent button click

    try {
      setIsDeleting(searchId) // Set loading state for this specific item

      // Call the correct API endpoint
      const response = await Api.post(
        "/api/delete-search-history",
        {
          searchId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      )

      if (response.data.success) {
        // Refresh the searches from the parent component
        refreshSearches()
        // Reset to first page if we delete the last item on the current page
        const totalPages = Math.ceil((searches.length - 1) / itemsPerPage)
        if (currentPage > totalPages && currentPage > 1) {
          setCurrentPage(totalPages)
        }
      } else {
        console.error("Failed to delete search:", response.data.message)
      }
    } catch (error) {
      console.error("Error deleting search:", error)
    } finally {
      setIsDeleting(null) // Clear loading state
    }
  }

  const handlePinClick = async (e: React.MouseEvent, searchId: string) => {
    e.stopPropagation()
    try {
      setIsPinning(searchId)
      const response = await Api.post(
        "/api/pin-search",
        { searchId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      if (response.data.success) {
        refreshSearches()
      }
    } catch (error) {
      console.error("Error pinning search:", error)
    } finally {
      setIsPinning(null)
    }
  }
  
  const handleSearchClick = (searchId: string) => {
    // Close the sidebar on mobile if the function is provided
    if (closeSidebar) {
      closeSidebar();
    }
    // Navigate to the results page
    history(`/product-research/results/${searchId}`);
  };

  // Calculate pagination values
  const totalPages = Math.max(1, Math.ceil(searches.length / itemsPerPage))
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = searches.slice(indexOfFirstItem, indexOfLastItem)

  // Handle page changes
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col border-r border-gray-200">
      {/* New search button */}
      <div className="p-3 border-b border-gray-200">
        <Link to="/dashboard" onClick={closeSidebar}>
          <button className="w-43 flex items-center gap-2 px-3 py-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer" >
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
              className="lucide lucide-plus"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            <span>{t.newSearch}</span>
          </button>
        </Link>
      </div>

      {/* Recent searches section */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div
          className="px-3 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => setIsRecentExpanded(!isRecentExpanded)}
        >
          <span className="text-sm font-medium text-gray-700">{t.recent}</span>
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
            className={`transition-transform ${isRecentExpanded ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        {isRecentExpanded && (
          <div className="flex-1 overflow-y-auto flex flex-col">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Loader className="w-6 h-6 animate-spin mb-2" />
                <span className="text-sm">{t.loading}</span>
              </div>
            ) : searches && searches.length > 0 ? (
              <>
                <div className="space-y-1 px-2 flex-1">
                  {currentItems.map((search) => (
                    <div key={search._id} className="relative group">
                      <button
                        className="w-full text-left p-2 rounded-md hover:bg-gray-100 transition-colors"
                        onClick={() => handleSearchClick(search._id)}
                      >
                        <div className="flex items-center gap-2">
                        {search.name.length > 20 ? 
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2238_1229)">
                        <path d="M9.49967 17.4166C13.8719 17.4166 17.4163 13.8722 17.4163 9.49998C17.4163 5.12773 13.8719 1.58331 9.49967 1.58331C5.12742 1.58331 1.58301 5.12773 1.58301 9.49998C1.58301 13.8722 5.12742 17.4166 9.49967 17.4166Z" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1.58301 9.5H17.4163" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.49967 1.58331C11.4799 3.75118 12.6052 6.56451 12.6663 9.49998C12.6052 12.4355 11.4799 15.2488 9.49967 17.4166C7.51949 15.2488 6.39416 12.4355 6.33301 9.49998C6.39416 6.56451 7.51949 3.75118 9.49967 1.58331V1.58331Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2238_1229">
                        <rect width="19" height="19" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                         : <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2238_1240)">
<path d="M9.49967 17.4166C13.8719 17.4166 17.4163 13.8722 17.4163 9.49998C17.4163 5.12773 13.8719 1.58331 9.49967 1.58331C5.12742 1.58331 1.58301 5.12773 1.58301 9.49998C1.58301 13.8722 5.12742 17.4166 9.49967 17.4166Z" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.5 14.25C12.1234 14.25 14.25 12.1234 14.25 9.5C14.25 6.87665 12.1234 4.75 9.5 4.75C6.87665 4.75 4.75 6.87665 4.75 9.5C4.75 12.1234 6.87665 14.25 9.5 14.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.50033 11.0834C10.3748 11.0834 11.0837 10.3745 11.0837 9.50002C11.0837 8.62557 10.3748 7.91669 9.50033 7.91669C8.62587 7.91669 7.91699 8.62557 7.91699 9.50002C7.91699 10.3745 8.62587 11.0834 9.50033 11.0834Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2238_1240">
<rect width="19" height="19" fill="white"/>
</clipPath>
</defs>
</svg>
}
                          <span className="text-sm font-medium truncate pr-6 max-w-[165px] inline-block" title={search.name}>
                            {search.name.length > 20 ? `${search.name.substring(0, 20)}...` : search.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>{format(new Date(search.created_at), "MMM d, yyyy")}</span>
                        </div>
                      </button>

                      {/* Pin button */}
                      <button
                        className={`absolute top-2 right-8 p-1 rounded-full ${
                          search.pinned 
                            ? "text-red-500" 
                            : "text-gray-400 opacity-0 group-hover:opacity-100"
                        } hover:text-red-500 hover:bg-gray-200 transition-opacity`}
                        onClick={(e) => handlePinClick(e, search._id)}
                        disabled={isPinning === search._id}
                        aria-label={search.pinned ? "Desanclar búsqueda" : "Anclar búsqueda"}
                        title={search.pinned ? "Desanclar búsqueda" : "Anclar búsqueda"}
                      >
                        {isPinning === search._id ? (
                          <svg
                            className="animate-spin h-4 w-4 text-gray-500"
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
                        ) : (
                          // <Pin className="h-4 w-4" />
                          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.25816 11.6774H14.0969L11.6775 8.77419V2.96774L12.1614 2H6.35493L6.8388 2.96774V8.77419L4.90332 11.6774H9.25816ZM9.25816 11.6774V17" stroke="black" stroke-width="1.25" stroke-linecap="square"/>
</svg>

                        )}
                      </button>

                      {/* Delete button */}
                      <button
                        className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => handleDeleteClick(e, search._id)}
                        disabled={isDeleting === search._id}
                        aria-label="Eliminar búsqueda"
                        title="Eliminar búsqueda"
                      >
                        {isDeleting === search._id ? (
                          <svg
                            className="animate-spin h-4 w-4 text-gray-500"
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
                        ) : (
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
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center px-3 py-2 border-t border-gray-200">
                    <button 
                      onClick={goToPreviousPage} 
                      disabled={currentPage === 1}
                      className={`p-1 rounded-md ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs text-gray-500">
                      {t.page} {currentPage} {t.of} {totalPages}
                    </span>
                    <button 
                      onClick={goToNextPage} 
                      disabled={currentPage === totalPages}
                      className={`p-1 rounded-md ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="px-3 py-6 text-center text-sm text-gray-500">{t.noSavedData}</div>
            )}
          </div>
        )}
      </div>

      {/* Tutorial & FAQs */}
      <div className="border-t border-gray-200 p-2">
        <Link to="/faqs" onClick={closeSidebar}>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-full bg-gray-200 transition-colors cursor-pointer">
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
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
          <span>{t.tutorial}</span>
        </button>
        </Link>
      </div>
    </div>
  )
}

