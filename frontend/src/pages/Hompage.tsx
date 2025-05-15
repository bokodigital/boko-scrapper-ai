import { useState } from "react"
import { ArrowRight, BarChart3, Brain, ChevronDown, Database, Lock, Menu, Search, X, Zap } from "lucide-react"
import HomePageImg from "../assets/images/homepage1.jpg"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

// Add these interfaces at the top of the file
interface FaqCategory {
  id: string;
  name: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface OpenItems {
  [key: string]: boolean;
}

interface Feature {
  icon: any;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface FaqData {
  [key: string]: FaqItem[];
}

export default function Homepage() {
  // Update state definitions with proper types
  const [openCategory, setOpenCategory] = useState<string | null>("general")
  const [openItems, setOpenItems] = useState<OpenItems>({})
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Update toggle functions with proper types
  const toggleItem = (category: string, itemId: number): void => {
    setOpenItems((prev) => ({
      ...prev,
      [`${category}-${itemId}`]: !prev[`${category}-${itemId}`],
    }))
  }

  const toggleCategory = (category: string): void => {
    setOpenCategory(category === openCategory ? null : category)
  }

  // Update the data constants with proper types
  const faqCategories: FaqCategory[] = [
    { id: "general", name: "General" },
    { id: "product-research", name: "Investigación de productos" },
    { id: "url-scraping", name: "Raspado de URLs" },
    { id: "pricing", name: "Precios" },
    { id: "security", name: "Seguridad" },
    { id: "misc", name: "Otros" },
  ]

  const features: Feature[] = [
    {
      icon: <Brain className="w-6 h-6 text-blue-600" />,
      title: "Análisis impulsado por IA",
      description:
        "Utilice algoritmos de aprendizaje automático avanzados para extraer patrones y conclusiones automáticamente de sus datos.",
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Procesamiento en tiempo real",
      description: "Procese y analice datos en tiempo real con nuestra infraestructura de cómputo de alto rendimiento.",
    },
    {
      icon: <Database className="w-6 h-6 text-blue-600" />,
      title: "Integración de datos",
      description: "Conecte y combine datos de múltiples fuentes con nuestras capacidades de integración poderosas.",
    },
    {
      icon: <Search className="w-6 h-6 text-blue-600" />,
      title: "Búsqueda inteligente",
      description: "Encuentre exactamente lo que necesita con nuestro sistema de búsqueda y filtrado inteligente.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      title: "Visualización avanzada",
      description: "Transforme datos complejos en insights claros y accionables con visualizaciones interactivas.",
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-600" />,
      title: "Seguridad empresarial",
      description: "Mantenga sus datos seguros con características de seguridad de nivel empresarial y cumplimiento.",
    },
  ]

  const stats: Stat[] = [
    {
      value: "99.9%",
      label: "Tasa de precisión",
    },
    {
      value: "10x",
      label: "Puntos de datos procesados",
    },
    {
      value: "100%",
      label: "Usuarios activos",
    },
    {
      value: "100%",
      label: "Clientes empresariales",
    },
  ]

  const faqData: FaqData = {
    general: [
      {
        question: "¿Qué es Relais IA?",
        answer:
          "Relais IA es una aplicación avanzada de IA-powered diseñada para ayudar a las empresas a crecer más inteligentes. Ofrece dos características clave: (1) Product Research para analizar mercados y evaluar el potencial de productos, y (2) URL Scraping con capacidades de inicio de sesión para extraer datos valiosos, como bases de datos de clientes o directorios de oportunidades, de sitios web accesibles públicamente.",
      },
      {
        question: "¿Quién puede beneficiarse de usar Relais IA?",
        answer:
          "Emprendedores, propietarios de pequeñas empresas, marketing, equipos de adquisiciones y cualquier persona que busque investigar mercados o reunir datos accionables (e.g., leads o oportunidades), puede beneficiarse de Relais IA.",
      },
      {
        question: "¿Cómo puedo empezar a usar Relais IA?",
        answer:
          "Simplemente regístrate para una cuenta en nuestro sitio web, elige tu plan de suscripción, y comienza a explorar las herramientas de Product Research o URL Scraping desde tu panel de control. Están disponibles tutoriales para guiarte a través del proceso de configuración.",
      },
    ],
    "product-research": [
      {
        question: "¿Qué hace la característica de Product Research?",
        answer:
          "La herramienta de Product Research usa IA para analizar tendencias de mercado, demanda, competencia y sentimiento del consumidor para un producto específico. Proporciona insights accionables para ayudarlo a decidir si un producto vale la pena perseguir.",
      },
      {
        question: "¿Qué tipo de datos obtiene la herramienta de Product Research?",
        answer:
          "Entrega datos sobre el tamaño del mercado, análisis de competencia, tendencias de precios, reseñas de clientes y potenciales huecos o oportunidades en el mercado.",
      },
      {
        question: "¿Puedo investigar cualquier producto con Relais IA?",
        answer:
          "¡Sí! Ya sea que se trate de un producto físico, servicio digital o oferta de nicho, puede ingresar los detalles del producto y Relais IA reunirá y analizará los datos de mercado relevantes.",
      },
      {
        question: "¿Qué tan preciso es el análisis del mercado?",
        answer:
          "Nuestra IA utiliza datos web actualizados, informes industriales y perspectivas de redes sociales para proporcionar análisis muy precisos. Sin embargo, los resultados dependen de la disponibilidad de datos públicos para su producto.",
      },
      {
        question: "¿Cuánto tiempo tarda en obtener un informe de investigación de productos?",
        answer:
          "La mayoría de los informes se generan en minutos, dependiendo de la complejidad del producto y la profundidad del análisis solicitado.",
      },
    ],
    "url-scraping": [
      {
        question: "¿Qué hace la característica de URL Scraping?",
        answer:
          "La herramienta de URL Scraping le permite extraer datos de URLs abiertas (con o sin credenciales de inicio de sesión) para crear bases de datos de clientes, identificar potenciales leads o filtrar directorios de oportunidades para oportunidades que coincidan con sus necesidades.",
      },
      {
        question: "¿Qué tipos de sitios web puedo raspar con Relais AI?",
        answer:
          "Puede raspar cualquier URL accesible públicamente o sitio donde tenga acceso legítimo a inicio de sesión. Ejemplos comunes incluyen directorios de negocios, plataformas de comercio electrónico, portales de licitaciones o foros.",
      },
      {
        question: "¿Es legal usar Relais IA para raspar URLs?",
        answer:
          "Relais IA está diseñada para uso ético y legal. Debe raspar sitios web donde tenga permiso o donde el raspe sea permitido según los términos de servicio del sitio. Siempre asegúrese de cumplir con las leyes y regulaciones locales.",
      },
      {
        question: "¿Puedo raspar datos de clientes para generación de leads?",
        answer:
          "Sí, puede extraer datos como nombres, correos electrónicos o detalles de la empresa de directorios abiertos o plataformas (donde esté permitido) para crear bases de datos de clientes dirigidas para contacto.",
      },
      {
        question: "¿Cómo funciona el filtrado de directorios de licitaciones?",
        answer:
          "Ingrese una URL de portal de licitaciones, y Relais IA raspará y filtrará licitaciones según sus criterios (e.g., industria, presupuesto, ubicación), ahorrándole tiempo y ayudándolo a encontrar las mejores oportunidades.",
      },
    ],
    pricing: [
      {
        question: "¿Cuánto cuesta Relais IA?",
        answer:
          "Ofrecemos planes de suscripción por uso (e.g., número de informes de investigación o tareas de raspe). Visite nuestra página de precios para obtener detalles o comience con una prueba gratuita para explorar la aplicación.",
      },
      {
        question: "¿Hay una prueba gratuita disponible?",
        answer:
          "Sí, los nuevos usuarios pueden registrarse para una prueba gratuita limitada para probar ambas características de Product Research y URL Scraping antes de comprometerse a un plan pagado.",
      },
      {
        question: "¿Qué soporte está disponible si tengo problemas?",
        answer:
          "Nuestro equipo de soporte está disponible a través de correo electrónico, chat en vivo o nuestro centro de ayuda. Los planes premium incluyen soporte prioritario y sesiones de incorporación一对一.",
      },
    ],
    security: [
      {
        question: "¿Es mi información segura con Relais IA?",
        answer:
          "Absolutamente. Usamos cifrado de la industria estándar para proteger su cuenta, informes de investigación y datos raspados. Nunca compartimos su información con terceros.",
      },
      {
        question: "¿Almacena Relais IA credenciales de inicio de sesión para sitios raspados?",
        answer:
          "No, no almacenamos sus credenciales de inicio de sesión. Las ingresa de manera segura durante el proceso de raspado y no se retienen después de la tarea.",
      },
    ],
    misc: [
      {
        question: "¿Puedo solicitar nuevas características para Relais IA?",
        answer:
          "¡Sí! Nos encanta recibir comentarios de nuestros usuarios. Envíe sus solicitudes de características a través de la aplicación o contacte a nuestro equipo directamente.",
      },
      {
        question: "¿Qué tan a menudo se actualiza Relais IA?",
        answer:
          "Nuestras IA y herramientas se mejoran continuamente para mantenerse al día con las tendencias del mercado, los cambios en el web, y las necesidades de los usuarios. Las actualizaciones se implementan regularmente con ningún tiempo de inactividad.",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <svg width="140" height="38" viewBox="0 0 140 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2016_12849)">
                  <path
                    d="M18.8562 7.37152C18.2419 6.7482 17.5096 6.25372 16.702 5.91701C15.8944 5.5803 15.0277 5.40814 14.1528 5.41058H14.1184C11.678 5.41058 9.58562 6.67655 8.48092 8.59156C7.94147 9.52973 7.65368 10.5915 7.64551 11.6738C7.64551 11.6975 7.64551 11.7213 7.64551 11.745C7.64772 12.9872 8.0268 14.1995 8.73261 15.2214C9.30195 16.0518 10.0574 16.7374 10.9388 17.2237C11.8201 17.71 12.8028 17.9833 13.8086 18.022C14.7091 18.0619 15.6084 17.9198 16.4528 17.6042C17.2972 17.2886 18.0693 16.8059 18.7231 16.1851C19.9525 15.0148 20.641 13.4778 20.6624 11.8575C20.6746 11.0272 20.5212 10.2028 20.211 9.43248C19.9009 8.66221 19.4403 7.96155 18.8562 7.37152ZM12.0322 14.8272H10.6551V8.3474H12.0322V14.8272ZM16.9834 14.8326L15.6117 10.6191L14.2293 14.8326H12.8385L14.9699 8.33745H16.2498L16.2896 8.45532L18.3651 14.8326H16.9834Z"
                    fill="#04DC08"
                  />
                  <path
                    d="M31.562 9.22531H53.734V12.9352H36.2799V16.3963H51.2967V20.0411H36.3587V23.1877H53.734V27.4348H31.562V9.22531Z"
                    fill="#04A0EA"
                  />
                  <path d="M113.492 9.24445H108.303V27.4149H113.492V9.24445Z" fill="#04A0EA" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M95.4755 9.32635H90.362L79.4673 27.3001H84.5807L86.849 23.4295L99.4781 23.4747L101.479 27.3017H106.951L95.4755 9.32635ZM89.5167 19.3806L93.2079 14.1307L96.5465 19.3806H89.5167Z"
                    fill="#04A0EA"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M116.284 21.5543H120.963V22.0939C120.979 22.3683 121.09 22.6288 121.276 22.8305C121.463 23.0323 121.714 23.1629 121.986 23.1999L134.297 23.1838C134.589 23.1361 134.855 22.9833 135.043 22.7539C135.231 22.5245 135.329 22.2343 135.319 21.9378V21.1548C135.314 20.8741 135.212 20.6038 135.031 20.3894C134.844 20.186 134.588 20.0606 134.313 20.0381H120.982C120.213 20.0433 119.453 19.8667 118.765 19.5227C118.077 19.1786 117.479 18.6767 117.022 18.058C117.022 18.058 116.429 17.2558 116.303 16.4445C116.291 16.3634 116.287 16.2838 116.287 16.2838V16.159C116.287 16.159 116.287 13.7587 116.287 13.1855C116.287 13.1503 116.287 13.1005 116.292 13.0393C116.292 12.9934 116.297 12.9405 116.303 12.8816C116.351 12.4749 116.471 12.0798 116.655 11.7144C117.142 10.7285 118.084 10.1139 118.227 10.0206C118.921 9.57248 119.713 9.2991 120.535 9.22378H134.603C135.102 9.19316 136.717 9.1549 138.147 10.1981C138.263 10.2823 139.166 10.9406 139.664 11.9585C139.797 12.2098 139.894 12.4785 139.952 12.7568C140.003 13.0171 140.001 13.1977 140 13.8912C140 14.2739 140 14.5693 140 14.7224H135.321V14.1154C135.341 13.9687 135.33 13.8194 135.288 13.6774C135.246 13.5354 135.174 13.404 135.077 13.2919C134.981 13.1798 134.861 13.0895 134.727 13.0271C134.593 12.9646 134.447 12.9315 134.299 12.9298H122.052C121.774 12.9732 121.518 13.1058 121.322 13.3075C121.126 13.5092 121.001 13.7691 120.966 14.0481V15.3102C121.017 15.5899 121.156 15.8461 121.362 16.0414C121.568 16.2368 121.832 16.3611 122.114 16.3963H135.319C136.074 16.4085 136.816 16.5881 137.494 16.922C138.171 17.2559 138.766 17.7359 139.235 18.3274C139.509 18.6772 139.901 19.1777 139.985 19.9087C139.997 20.0104 140.002 20.1126 140.002 20.2149V22.9787C139.977 23.5958 139.813 24.1994 139.523 24.7445C139.087 25.5288 138.454 26.1856 137.687 26.6495C136.969 27.0892 136.161 27.3582 135.323 27.4356H120.966C120.251 27.4474 119.541 27.2999 118.89 27.0039C118.695 26.9144 117.316 26.263 116.735 25.007C116.508 24.4841 116.362 23.9293 116.303 23.3622C116.296 23.2925 116.287 23.2374 116.287 23.1861L116.284 21.5543Z"
                    fill="#04A0EA"
                  />
                  <path
                    d="M15.1736 23.764L26.802 37.1691L15.1843 37.1875L3.41891 23.7801H0V15.8904L6.26404 15.9072C7.19673 17.5612 8.62936 18.8769 10.3562 19.6653C11.389 20.1381 12.5047 20.4028 13.6397 20.4445C13.759 20.4491 13.8776 20.4514 13.9962 20.4514C15.1389 20.4538 16.2721 20.2444 17.3386 19.8337C18.4494 19.407 19.4649 18.7647 20.3268 17.9439C21.141 17.1736 21.7982 16.2527 22.2623 15.2321C22.7319 14.2054 22.9825 13.0921 22.9982 11.9631C23.0155 10.8214 22.8051 9.68769 22.3792 8.62829C21.9534 7.5689 21.3206 6.60511 20.518 5.79329C19.7002 4.9599 18.7261 4.29613 17.6515 3.83999C16.5285 3.36234 15.3212 3.11483 14.101 3.11211H14.0543C11.7368 3.09862 9.50531 3.98961 7.83388 5.59581C7.08742 6.31283 6.47587 7.15826 6.02842 8.09177H0V7.27177e-06L15.0925 0.0367448C21.609 0.155381 26.8609 5.57209 26.802 12.0114C26.7446 18.3366 21.5738 23.6048 15.1736 23.764Z"
                    fill="#04A0EA"
                  />
                  <path d="M56.3701 9.22531H61.1072V23.2458H77.4803V27.4348H56.3701V9.22531Z" fill="#04A0EA" />
                  <path d="M16.0479 8.49053L16.0524 8.50419L16.0563 8.49053H16.0479Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_2016_12849">
                    <rect width="140" height="37.1875" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/solutions" className="text-gray-600 hover:text-gray-900">
                Soluciones
              </Link>
              {/* <Link to="/solutions" className="text-gray-600 hover:text-gray-900">
                Soluciones
              </Link> */}
              <Link to="https://relaisoft.org/membership" className="text-gray-600 hover:text-gray-900">
                Precios
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Iniciar sesión
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Crear una cuenta
              </Link>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link to="/features" className="text-gray-600 hover:text-gray-900 py-2">
                Soluciones
              </Link>
              <Link to="https://relaisoft.org/membership" className="text-gray-600 hover:text-gray-900 py-2">
                Precios
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 py-2">
                Iniciar sesión
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors inline-block"
              >
                Crear una cuenta
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 bg-clip-text text-transparent">
                Aprovecha la IA para extraer y analizar datos como nunca antes
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Transforma datos sin procesar en insights accionables con nuestra plataforma avanzada de IA. Extrae, analiza y
                visualiza datos con una precisión sin precedentes y una velocidad sin igual.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
                >
                  Crear una cuenta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src={HomePageImg || "/placeholder.svg"}
                alt="AI Data Analysis"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Características avanzadas para el análisis de datos</h2>
            <p className="mt-4 text-xl text-gray-600">
              Todo lo que necesita para extraer, procesar y analizar datos a escala
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Preguntas frecuentes</h2>
            <p className="mt-4 text-xl text-gray-600">Encuentra respuestas a preguntas comunes sobre Relais IA</p>
          </div>

          {/* FAQ Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  openCategory === category.id ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {faqCategories.map((category) => (
              <div key={category.id} className={openCategory === category.id ? "block" : "hidden"}>
                {faqData[category.id].map((item, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0">
                    <button
                      onClick={() => toggleItem(category.id, index)}
                      className="flex justify-between items-center w-full px-6 py-4 text-left"
                    >
                      <span className="font-medium text-gray-900">{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          openItems[`${category.id}-${index}`] ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`px-6 pb-4 text-gray-600 transition-all duration-200 ease-in-out ${
                        openItems[`${category.id}-${index}`] ? "block" : "hidden"
                      }`}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">¿Listo para transformar tu análisis de datos?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a otras empresas que usan nuestra plataforma para desbloquear el poder de sus datos
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
          >
            Comienza ahora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

