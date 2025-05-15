import { useState } from "react"
import { Info, ChevronDown } from "lucide-react"
import NavBar from "../components/NavBar"
import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

export default function FaqsPage() {
    const [openItem, setOpenItem] = useState<string | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { language } = useLanguage()

    const toggleItem = (id: string) => {
        setOpenItem(openItem === id ? null : id)
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const translations = {
        en: {
            title: "Frequently Asked Questions",
            subtitle: "Find answers to common questions about using Relais AI",
            faqsAbout: "Frequently asked questions about Relais AI usability",
            moreQuestions: "Still have questions?",
            contactSupport: "Contact our support team",
            dashboardButton: "Go to dashboard",
        },
        es: {
            title: "Preguntas frecuentes",
            subtitle: "Encuentre respuestas a preguntas comunes sobre el uso de Relais IA",
            faqsAbout: "Preguntas frecuentes sobre la usabilidad de Relais IA",
            moreQuestions: "Aún tienes preguntas?",
            contactSupport: "Contacta a nuestro equipo de soporte",
            dashboardButton: "Ir al panel de control",
        }
    }

    // Define FAQ items in English
    const enFaqItems = [
        {
            id: "item-1",
            question: "What is Relais AI, and what can it do for me?",
            answer: (
                <div className="space-y-2">
                    <p>Relais AI is an AI-powered application with two main functions:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            <strong>Product Research:</strong> Enter a product code or name to get a detailed report on export/import countries, news, and more.
                        </li>
                        <li>
                            <strong>Website Content Analysis:</strong> Scrape any URL (with or without login) and analyze the data with AI to find bidding opportunities, customer lists, or other insights.
                        </li>
                    </ul>
                    <p>You can save your results as a CSV file or in a Google spreadsheet.</p>
                </div>
            ),
        },
        {
            id: "item-2",
            question: "How do I use Relais AI for product research?",
            answer: (
                <div className="space-y-2">
                    <p>Here's the process:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>From the dashboard, go to the "Product Research" section.</li>
                        <li>Enter the product code or name in the input field.</li>
                        <li>Click "Get Report" to generate a detailed report.</li>
                        <li>
                            On the results page, click "Export" to save as a CSV file or "Connect with Google" to link and save to a Google spreadsheet.
                        </li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-3",
            question: "How do I scrape and analyze a website with Relais AI?",
            answer: (
                <div className="space-y-2">
                    <p>Follow these steps for website content analysis:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>Navigate to the "Website Content Analysis" section.</li>
                        <li>Enter the website URL.</li>
                        <li>Check the "Requires login" box if needed and add credentials, then click "Scrape Website".</li>
                        <li>After scraping, type an AI prompt like "How should I analyze this?" and click "Analyze".</li>
                        <li>
                            Review the table report, then click "Export" for a CSV file or "Connect with Google" to save to a new or existing Google spreadsheet.
                        </li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-4",
            question: "Can I scrape a website that requires a login?",
            answer: (
                <div className="space-y-2">
                    <p>Yes! Here's how:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>In the "Website Content Analysis" section, enter the URL.</li>
                        <li>Check the "Requires login" box and add your username and password credentials.</li>
                        <li>Click "Scrape Website" to extract the data.</li>
                        <li>Proceed with analysis using an AI prompt and "Analyze".</li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-5",
            question: "How do I find bidding opportunities that match my business needs?",
            answer: (
                <div className="space-y-2">
                    <p>To scrape and analyze bidding opportunities:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>Go to "Website Content Analysis" and enter the URL of a bidding opportunities website.</li>
                        <li>Click "Scrape Website" (check "Requires login" if needed).</li>
                        <li>
                            After scraping, enter an AI prompt like "Show bidding opportunities in [industry] under [budget]" and click "Analyze".
                        </li>
                        <li>Get your table report and click "Export" or "Connect with Google" to save.</li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-6",
            question: "How can I create a customer database using Relais AI?",
            answer: (
                <div className="space-y-2">
                    <p>To create a database:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>In "Website Content Analysis", enter the URL of a directory page or customer list.</li>
                        <li>Click "Scrape Website" to extract the data.</li>
                        <li>Type an AI prompt like "Extract customers in [region] with [criteria]" and click "Analyze".</li>
                        <li>
                            Review the table report, then click "Export" for a CSV file or "Connect with Google" to save to a new or existing Google spreadsheet.
                        </li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-7",
            question: "How do I save my data from Relais AI?",
            answer: (
                <div className="space-y-2">
                    <p>Saving is easy:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>After generating a report (via "Get Report" or "Analyze"), view the results.</li>
                        <li>Click "Export" to download as a CSV file.</li>
                        <li>
                            Or click "Connect with Google" to link your Google account and save to a new or existing Google spreadsheet
                            (authenticate if needed).
                        </li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-8",
            question: "Is the application interface beginner-friendly?",
            answer: (
                <div className="space-y-2">
                    <p>Yes! Relais AI keeps it simple:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Clear sections for "Product Research" and "Website Content Analysis".</li>
                        <li>Buttons like "Get Report", "Scrape Website", and "Analyze" guide you step by step.</li>
                        <li>AI prompts use natural language (e.g., "How should I analyze this?").</li>
                        <li>Start with a basic task, like scraping a public website, to learn the flow.</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "item-9",
            question: "Can I scrape multiple URLs at once?",
            answer: (
                <div className="space-y-2">
                    <p>No, currently, Relais AI handles one URL at a time:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Enter one URL, click "Scrape Website", and save with "Export" or "Connect with Google".</li>
                        <li>Repeat for each additional URL.</li>
                        <li>Batch scraping may be added later.</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "item-10",
            question: "How do I get the latest news about a product?",
            answer: (
                <div className="space-y-2">
                    <p>For news in product research:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>Enter the product code or name in "Product Research".</li>
                        <li>Click "Get Report" to generate the report.</li>
                        <li>Review the news section in the results and save with "Export" or "Connect with Google".</li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-11",
            question: "How do I use the AI prompt to analyze scraped data?",
            answer: (
                <div className="space-y-2">
                    <p>To analyze scraped content:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>After clicking "Scrape Website", wait for the data to load.</li>
                        <li>
                            Enter an AI prompt like "How should I analyze this?" or "Extract [specific data]" in the prompt box.
                        </li>
                        <li>Click "Analyze" to process the prompt and get a table report.</li>
                        <li>Save with "Export" or "Connect with Google".</li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-12",
            question: "What do I do if I encounter an error or the application doesn't work as expected?",
            answer: (
                <div className="space-y-2">
                    <p>If something goes wrong:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Check your inputs (URL, credentials, or product code).</li>
                        <li>Check your internet connection.</li>
                        <li>Look for a Help or Support option in the menu for assistance.</li>
                        <li>Note any error message for troubleshooting tips.</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "item-13",
            question: "Can I customize the data I scrape or analyze?",
            answer: (
                <div className="space-y-2">
                    <p>Yes!</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>For product research, adjust the product code/name before clicking "Get Report".</li>
                        <li>For scraping, use AI prompts like "Extract only emails" before clicking "Analyze".</li>
                        <li>Save the customized results with "Export" or "Connect with Google".</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "item-14",
            question: "How do I navigate the application interface?",
            answer: (
                <div className="space-y-2">
                    <p className="font-medium">View video (link here):</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            <strong>Dashboard:</strong> Access "Product Research" or "Website Content Analysis".
                        </li>
                        <li>
                            <strong>Product Research:</strong> Enter data and click "Get Report".
                        </li>
                        <li>
                            <strong>Website Content Analysis:</strong> Enter URL, click "Scrape Website", then "Analyze" with a prompt.
                        </li>
                        <li>
                            <strong>Results:</strong> Use Export or Connect with Google to save.
                        </li>
                        <li>Review the menu or tooltips for more guidance.</li>
                    </ul>
                </div>
            ),
        },
    ]

    // Spanish FAQ items - reuse the existing ones
    const esFaqItems = [
        {
            id: "item-1",
            question: "¿Qué es Relais IA, y qué puede hacer por mí?",
            answer: (
                <div className="space-y-2">
                    <p>Relais IA es una aplicación impulsada por IA con dos funciones principales:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            <strong>Investigación de productos:</strong> Ingresa un código de producto o nombre para obtener un informe detallado sobre países de exportación/importación, noticias y más.
                        </li>
                        <li>
                            <strong>Análisis de contenido del sitio web:</strong> Raspale cualquier URL (con o sin inicio de sesión) y analice los datos con IA para encontrar oportunidades de licitación, listas de clientes u otras perspectivas.
                        </li>
                    </ul>
                    <p>Puedes guardar tus resultados como un archivo CSV o en una hoja de cálculo de Google.</p>
                </div>
            ),
        },
        {
            id: "item-2",
            question: "¿Cómo uso Relais IA para la investigación de productos?",
            answer: (
                <div className="space-y-2">
                    <p>Aquí está el proceso:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>Desde el panel de control, vaya a la sección "Investigación de productos".</li>
                        <li>Ingrese el código de producto o nombre en el campo de entrada.</li>
                        <li>Haga clic en "Obtener informe" para generar un informe detallado.</li>
                        <li>
                            En la página de resultados, haga clic en "Exportar" para guardar como un archivo CSV o "Conectar con Google" para vincular y guardar en una hoja de cálculo de Google.
                        </li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-3",
            question: "¿Cómo raspo y analizo un sitio web con Relais IA?",
            answer: (
                <div className="space-y-2">
                    <p>Siga estos pasos para el análisis de contenido del sitio web:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>Navegue a la sección "Análisis de contenido del sitio web".</li>
                        <li>Ingrese la URL del sitio web.</li>
                        <li>Verifique la casilla "Requiere inicio de sesión" si es necesario y agregue credenciales, luego haga clic en "Raspale sitio web".</li>
                        <li>Después de raspar, escriba un AI prompt como "¿Cómo debería analizar esto?" y haga clic en "Analizar".</li>
                        <li>
                            Revise el informe de tabla, luego haga clic en "Exportar" para un archivo CSV o "Conectar con Google" para guardar en una hoja de cálculo de Google nueva o existente.
                        </li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-4",
            question: "¿Puedo raspar un sitio web que requiere un inicio de sesión?",
            answer: (
                <div className="space-y-2">
                    <p>¡Sí! Aquí está cómo:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>En la sección "Análisis de contenido del sitio web", ingrese la URL.</li>
                        <li>Marque la casilla "Requiere inicio de sesión" y agregue sus credenciales de usuario y contraseña.</li>
                        <li>Haga clic en "Raspale sitio web" para extraer los datos.</li>
                        <li>Proceda con el análisis usando un AI prompt y "Analizar".</li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-5",
            question: "¿Cómo encuentro oportunidades de licitación que coincidan con mis necesidades de negocio?",
            answer: (
                <div className="space-y-2">
                    <p>Para raspar y analizar oportunidades de licitación:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>Vaya a "Análisis de contenido del sitio web" y ingrese la URL de un sitio web de oportunidades de licitación.</li>
                        <li>Haga clic en "Raspale sitio web" (marque "Requiere inicio de sesión" si es necesario).</li>
                        <li>
                            Después de raspar, ingrese un AI prompt como "Mostrar oportunidades de licitación en [industria] bajo [presupuesto]" y haga clic en "Analizar".
                        </li>
                        <li>Obtenga su informe de tabla y haga clic en "Exportar" o "Conectar con Google" para guardar.</li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-6",
            question: "¿Cómo puedo crear una base de datos de clientes utilizando Relais IA?",
            answer: (
                <div className="space-y-2">
                    <p>Para crear una base de datos:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>En "Análisis de contenido del sitio web", ingrese la URL de una página de directorio o lista de clientes.</li>
                        <li>Haga clic en "Raspale sitio web" para extraer los datos.</li>
                        <li>Escriba un AI prompt como "Extraer clientes en [región] con [criterios]" y haga clic en "Analizar".</li>
                        <li>
                            Revise el informe de tabla, luego haga clic en "Exportar" para un archivo CSV o "Conectar con Google" para guardar en una hoja de cálculo de Google nueva o existente.
                        </li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-7",
            question: "¿Cómo guardo mis datos de Relais IA?",
            answer: (
                <div className="space-y-2">
                    <p>Guardar es fácil:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>Después de generar un informe (mediante "Obtener informe" o "Analizar"), vea los resultados.</li>
                        <li>Haga clic en "Exportar" para descargar como un archivo CSV.</li>
                        <li>
                            O haga clic en "Conectar con Google" para vincular su cuenta de Google y guardar en una hoja de cálculo de Google nueva o existente
                            (autentíquese si es necesario).
                        </li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-8",
            question: "¿Es la interfaz de la aplicación amigable para principiantes?",
            answer: (
                <div className="space-y-2">
                    <p>¡Sí! Relais IA mantiene simple:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Secciones claras para "Investigación de productos" y "Análisis de contenido del sitio web".</li>
                        <li>Botones como "Obtener informe", "Raspale sitio web" y "Analizar" lo guían paso a paso.</li>
                        <li>Los prompts de IA usan lenguaje natural (e.g., "¿Cómo debería analizar esto?").</li>
                        <li>Comience con una tarea básica, como raspar un sitio web público, para aprender el flujo.</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "item-9",
            question: "¿Puedo raspar varias URLs a la vez?",
            answer: (
                <div className="space-y-2">
                    <p>No, actualmente, Relais IA maneja una URL a la vez:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Ingrese una URL, haga clic en "Raspale sitio web" y guarde con "Exportar" o "Conectar con Google".</li>
                        <li>Repita para cada URL adicional.</li>
                        <li>El raspeo por lotes puede ser agregado más adelante.</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "item-10",
            question: "¿Cómo obtengo las últimas noticias sobre un producto?",
            answer: (
                <div className="space-y-2">
                    <p>Para noticias en investigación de productos:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>Ingrese el código de producto o nombre en "Investigación de productos".</li>
                        <li>Haga clic en "Obtener informe" para generar el informe.</li>
                        <li>Revise la sección de noticias en los resultados y guarde con "Exportar" o "Conectar con Google".</li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-11",
            question: "¿Cómo uso el prompt de IA para analizar datos raspados?",
            answer: (
                <div className="space-y-2">
                    <p>Para analizar contenido raspado:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>Después de hacer clic en "Raspale sitio web", espere a que los datos se carguen.</li>
                        <li>
                            Ingrese un prompt de IA como "¿Cómo debería analizar esto?" o "Extraer [datos específicos]" en el cuadro de prompt.
                        </li>
                        <li>Haga clic en "Analizar" para procesar el prompt y obtener un informe de tabla.</li>
                        <li>Guarde con "Exportar" o "Conectar con Google".</li>
                    </ol>
                </div>
            ),
        },
        {
            id: "item-12",
            question: "¿Qué hago si encuentro un error o la aplicación no funciona como esperaba?",
            answer: (
                <div className="space-y-2">
                    <p>Si algo sale mal:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Verifique sus entradas (URL, credenciales o código de producto).</li>
                        <li>Verifique su conexión a internet.</li>
                        <li>Busque una opción de Ayuda o Soporte en el menú para obtener ayuda.</li>
                        <li>Tenga en cuenta cualquier mensaje de error para obtener consejos de solución de problemas.</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "item-13",
            question: "¿Puedo personalizar los datos que raspo o analizo?",
            answer: (
                <div className="space-y-2">
                    <p>¡Sí!</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Para investigación de productos, ajuste el código/nombre del producto antes de hacer clic en "Obtener informe".</li>
                        <li>Para raspar, use prompts de IA como "Extraer solo correos electrónicos" antes de hacer clic en "Analizar".</li>
                        <li>Guarde los resultados personalizados con "Exportar" o "Conectar con Google".</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "item-14",
            question: "¿Cómo navego por la interfaz de la aplicación?",
            answer: (
                <div className="space-y-2">
                    <p className="font-medium">Ver video (enlace aquí):</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            <strong>Dashboard:</strong> Acceda a "Investigación de productos" o "Análisis de contenido del sitio web".
                        </li>
                        <li>
                            <strong>Investigación de productos:</strong> Ingrese datos y haga clic en "Obtener informe".
                        </li>
                        <li>
                            <strong>Análisis de contenido del sitio web:</strong> Ingrese la URL, haga clic en "Raspale sitio web", luego "Analizar" con un prompt.
                        </li>
                        <li>
                            <strong>Resultados:</strong> Use Export or Connect with Google to save.
                        </li>
                        <li>Revise el menú o los tooltips para obtener más guía.</li>
                    </ul>
                </div>
            ),
        },
    ]

    // Select FAQ items based on current language
    const faqItems = language === 'en' ? enFaqItems : esFaqItems

    return (
        <div>
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}
            <NavBar toggleSidebar={toggleSidebar} />

            <div className="container max-w-4xl mx-auto py-12 px-4 md:px-6">
                <div className="space-y-6">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold tracking-tight">{translations[language].title}</h1>
                        <p className="text-gray-500 mt-4">{translations[language].subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Info className="h-5 w-5 text-blue-500" />
                                {translations[language].faqsAbout}
                            </h2>

                            <div className="space-y-4">
                                {faqItems.map((item) => (
                                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => toggleItem(item.id)}
                                            className="flex items-center justify-between w-full p-4 text-left font-medium focus:outline-none hover:bg-gray-50"
                                        >
                                            <span>{item.question}</span>
                                            <ChevronDown
                                                className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${openItem === item.id ? "transform rotate-180" : ""
                                                    }`}
                                            />
                                        </button>
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${openItem === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            <div className="p-4 border-t border-gray-200 text-gray-600">{item.answer}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-500">
                            {translations[language].moreQuestions}{" "}
                            <Link to="mailto:contacto@relaisoft.org" className="text-blue-500 hover:underline">
                                {translations[language].contactSupport}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* New search button */}
            <div className="p-3 border-b border-gray-200 text-center">
                <Link to="/dashboard">
                    <button className="items-center gap-2 px-3 py-2 text-sm bg-white rounded-md border border-blue-400 hover:bg-gray-50 transition-colors">
                        <span>{translations[language].dashboardButton}</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

