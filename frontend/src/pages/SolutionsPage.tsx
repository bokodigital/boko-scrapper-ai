import { useState } from "react"
import { ArrowRight, Brain, FileText, Search, ShoppingBag, Target, Truck } from "lucide-react"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState("ecommerce")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Soluciones</h1>
            <p className="mt-2 text-gray-600">Cómo Relais IA resuelve desafíos de negocios reales</p>
          </div>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Volver a la página principal
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold sm:text-4xl mb-6">Soluciones AI para tu industria</h2>
              <p className="text-xl text-blue-100">
                Descubre cómo las capacidades de investigación de productos y raspado de URL de Relais IA pueden transformar tus operaciones y impulsar el crecimiento.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Soluciones personalizadas para cada necesidad de negocio</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Nuestra plataforma AI se adapta a tus desafíos específicos de la industria, proporcionando insights y datos valiosos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutionsOverview.map((solution, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveTab(solution.id)}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{solution.title}</h3>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions Tabs */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Soluciones específicas para cada industria</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Explora cómo Relais IA aborda los desafíos únicos en tu industria
              </p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {solutionsOverview.map((solution) => (
                <button
                  key={solution.id}
                  onClick={() => setActiveTab(solution.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                    activeTab === solution.id ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {solution.title}
                </button>
              ))}
            </div>

            {/* E-commerce Solution */}
            <div className={activeTab === "ecommerce" ? "block" : "hidden"}>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 p-8 md:p-12">
                    <div className="flex items-center mb-6">
                      <ShoppingBag className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">E-commerce Solutions</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                      Relais IA ayuda a las empresas de comercio electrónico a identificar oportunidades de productos rentables, analizar la competencia y optimizar su cartera de productos.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Análisis de oportunidades de producto</h4>
                          <p className="mt-1 text-gray-600">
                            Identifica productos con alto potencial con un análisis de mercado completo antes de agregarlos a tu inventario.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Monitoreo de precios de competidores</h4>
                          <p className="mt-1 text-gray-600">
                            Extrae datos de precios de sitios web de competidores para optimizar tu estrategia de precios y mantener la competitividad.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Análisis de sentimiento de clientes</h4>
                          <p className="mt-1 text-gray-600">
                            Entiende cómo los clientes sienten sobre productos similares a los tuyos para mejorar tus ofertas.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/signup"
                      className="inline-flex items-center text-white bg-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                      Get started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="md:w-1/2 bg-gray-50 p-8 md:p-12">
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Estudio de caso: Minorista en línea</h4>
                      <p className="text-gray-600 mb-4">
                        Una empresa de comercio electrónico utilizó Relais IA para investigar nuevas categorías de productos potenciales. Al analizar tendencias de mercado y competencia, identificaron un segmento subutilizado con alto potencial de ganancias.
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Tiempo ahorrado en la investigación:</span>
                          <span className="font-medium text-gray-900">85%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Nuevos productos lanzados:</span>
                          <span className="font-medium text-gray-900">12</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Aumento de ingresos:</span>
                          <span className="font-medium text-gray-900">32%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Ejemplo de flujo de trabajo</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            1
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">
                              Ingresa categorías de productos potenciales en la herramienta de investigación de productos
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            2
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">Analiza el tamaño del mercado, la competencia y el sentimiento del consumidor</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            3
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">
                              Utiliza el raspado de URL para monitorear los precios de los competidores y las características de los productos
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            4
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">
                              Toma decisiones basadas en datos sobre qué productos agregar a tu inventario
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing Solution */}
            <div className={activeTab === "marketing" ? "block" : "hidden"}>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 p-8 md:p-12">
                    <div className="flex items-center mb-6">
                      <Target className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">Marketing Solutions</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                      Relais IA potencia a los equipos de marketing para construir bases de datos de prospectos dirigidos, analizar la posición en el mercado y crear campañas más efectivas.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Generación de leads</h4>
                          <p className="mt-1 text-gray-600">
                            Extrae información de contacto de directorios de negocios y sitios web para construir listas de prospectos dirigidas.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Análisis de competidores</h4>
                          <p className="mt-1 text-gray-600">
                            Investiga mensajes, posiciones y estrategias de marketing de competidores para diferenciar tus campañas.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Identificación de tendencias de mercado</h4>
                          <p className="mt-1 text-gray-600">
                            Queda por delante de las tendencias de mercado para crear campañas de marketing relevantes y oportunas.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/signup"
                      className="inline-flex items-center text-white bg-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                      Comienza ahora <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="md:w-1/2 bg-gray-50 p-8 md:p-12">
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Estudio de caso: Agencia de marketing digital</h4>
                      <p className="text-gray-600 mb-4">
                        Una agencia de marketing digital utilizó Relais IA para construir listas de prospectos dirigidas para sus clientes. Al raspar directorios de negocios y filtrar por industria y ubicación, crearon bases de datos de prospectos altamente relevantes.
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Tiempo de generación de leads:</span>
                          <span className="font-medium text-gray-900">Reducido en un 70%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Calidad de leads:</span>
                          <span className="font-medium text-gray-900">Mejorado en un 45%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Tasa de conversión de campaña:</span>
                          <span className="font-medium text-gray-900">Aumentado en un 28%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Ejemplo de flujo de trabajo</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            1
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">
                              Identifica directorios de negocios o sitios web de asociaciones objetivo
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            2
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">
                              Utiliza el raspado de URL para extraer información de contacto y detalles de negocios
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            3
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">
                              Filtra y segmenta leads basado en industria, tamaño o ubicación
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            4
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">
                              Exporta a una plataforma de CRM o plataforma de marketing por correo electrónico para campañas dirigidas
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Procurement Solution */}
            <div className={activeTab === "procurement" ? "block" : "hidden"}>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 p-8 md:p-12">
                    <div className="flex items-center mb-6">
                      <FileText className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">Soluciones de adquisición</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                      Relais IA ayuda a los equipos de adquisiciones a encontrar y filtrar oportunidades de licitación, construir bases de datos de proveedores y optimizar el proceso de adquisición.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Filtrado de oportunidades de licitación</h4>
                          <p className="mt-1 text-gray-600">
                            Raspala portales de licitación y filtra oportunidades basado en tus criterios para encontrar los contratos más relevantes.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Construcción de base de datos de proveedores</h4>
                          <p className="mt-1 text-gray-600">
                            Extrae información de proveedores de directorios de industrias para construir bases de datos de proveedores completas.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Análisis de precios de mercado</h4>
                          <p className="mt-1 text-gray-600">
                            Investiga precios de mercado para bienes y servicios para fortalecer tu posición en las negociaciones.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/signup"
                      className="inline-flex items-center text-white bg-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                      Comienza ahora <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="md:w-1/2 bg-gray-50 p-8 md:p-12">
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Estudio de caso: Empresa de construcción</h4>
                      <p className="text-gray-600 mb-4">
                        Una empresa de construcción utilizó Relais IA para monitorear portales de licitación para oportunidades relevantes. Al configurar raspado automático con filtros específicos, identificaron contratos que coincidían con su expertise y capacidad.
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Tiempo de monitoreo de licitaciones:</span>
                          <span className="font-medium text-gray-900">Reducido en un 90%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Oportunidades relevantes encontradas:</span>
                          <span className="font-medium text-gray-900">Aumentado en un 65%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Contratos exitosos:</span>
                          <span className="font-medium text-gray-900">Aumentado en un 40%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Ejemplo de flujo de trabajo</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            1
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">Configura el raspado de URL para portales de licitación relevantes</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            2
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">Configura filtros para industria, presupuesto y ubicación</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            3
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">Recibe notificaciones para oportunidades coincidentes</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            4
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">Analiza detalles de licitaciones y prepara ofertas competitivas</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Entrepreneurship Solution */}
            <div className={activeTab === "entrepreneurship" ? "block" : "hidden"}>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 p-8 md:p-12">
                    <div className="flex items-center mb-6">
                      <Brain className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">Soluciones de emprendimiento</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                      Relais IA ayuda a emprendedores a validar ideas de negocio, identificar oportunidades de mercado y tomar decisiones basadas en datos con un bajo costo de inversión.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Validación de ideas de negocio</h4>
                          <p className="mt-1 text-gray-600">
                            Investiga el potencial del mercado y la competencia antes de invertir recursos significativos en una nueva empresa.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Análisis de brechas</h4>
                          <p className="mt-1 text-gray-600">
                            Identifica nichos no servidos y brechas en productos o servicios existentes para encontrar tu ventaja competitiva.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Construcción de base de datos de clientes</h4>
                          <p className="mt-1 text-gray-600">
                            Extrae información de clientes potenciales para construir listas de contacto dirigidas para tu nueva empresa.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/signup"
                      className="inline-flex items-center text-white bg-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                      Comienza ahora <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="md:w-1/2 bg-gray-50 p-8 md:p-12">
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Estudio de caso: Startup de tecnología</h4>
                      <p className="text-gray-600 mb-4">
                        Una startup de tecnología utilizó Relais IA para validar su idea de producto SaaS. Al analizar tendencias de mercado, competencia y sentimiento del cliente, refinaron su propuesta de valor para abordar un segmento no servido.
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Costo de investigación de mercado:</span>
                          <span className="font-medium text-gray-900">Reducido en un 80%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Tiempo para el mercado:</span>
                          <span className="font-medium text-gray-900">Acelerado en 3 meses</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Adquisición de clientes en el primer año:</span>
                          <span className="font-medium text-gray-900">Superó el objetivo en un 35%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Ejemplo de flujo de trabajo</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            1
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">
                              Utiliza Product Research para analizar el potencial del mercado para tu idea de negocio
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            2
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">
                              Identifica competidores y analiza sus fortalezas y debilidades
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            3
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">Utiliza el raspado de URL para construir bases de datos de clientes potenciales</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            4
                          </div>
                          <div className="ml-3">
                              <p className="text-gray-600">Refina tu modelo de negocio basado en insights de datos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Supply Chain Solution */}
            <div className={activeTab === "supplychain" ? "block" : "hidden"}>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 p-8 md:p-12">
                    <div className="flex items-center mb-6">
                      <Truck className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">Soluciones de cadena de suministro</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                      Relais IA ayuda a profesionales de la cadena de suministro a optimizar la fuente, monitorear el rendimiento de los proveedores y identificar proveedores alternativos para reducir el riesgo.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Descubrimiento de proveedores</h4>
                          <p className="mt-1 text-gray-600">
                            Encuentra y evalúa proveedores alternativos para diversificar tu cadena de suministro y reducir el riesgo de dependencia.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Análisis de precios</h4>
                          <p className="mt-1 text-gray-600">
                            Extrae datos de precios de múltiples fuentes para comparar costos y negociar mejores términos.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Análisis de tendencias de mercado</h4>
                          <p className="mt-1 text-gray-600">
                            Queda por delante de las interrupciones de la cadena de suministro monitoreando tendencias de mercado y noticias de la industria.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/signup"
                      className="inline-flex items-center text-white bg-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                      Comienza ahora <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="md:w-1/2 bg-gray-50 p-8 md:p-12">
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Estudio de caso: Empresa de fabricación</h4>
                      <p className="text-gray-600 mb-4">
                        Una empresa de fabricación utilizó Relais IA para identificar proveedores alternativos después de experimentar interrupciones con su proveedor principal. Al raspar directorios de industrias y analizar potenciales socios, construyeron una cadena de suministro más resiliente.
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Tiempo de descubrimiento de proveedores:</span>
                          <span className="font-medium text-gray-900">Reducido en un 75%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Resiliencia de la cadena de suministro:</span>
                          <span className="font-medium text-gray-900">Mejorado en un 60%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Ahorro en costos:</span>
                          <span className="font-medium text-gray-900">12% en componentes clave</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Ejemplo de flujo de trabajo</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            1
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">Identifica directorios de industrias y bases de datos de proveedores</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            2
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">
                              Utiliza el raspado de URL para extraer información y capacidades de proveedores
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            3
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">
                              Filtra proveedores basado en ubicación, capacidad y certificaciones
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            4
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">
                              Construye una red de proveedores diversificada para reducir el riesgo de dependencia
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Research Solution */}
            <div className={activeTab === "research" ? "block" : "hidden"}>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 p-8 md:p-12">
                    <div className="flex items-center mb-6">
                      <Search className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">Soluciones de investigación de mercado</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                      Relais IA permite a los investigadores reunir y analizar datos de múltiples fuentes, identificar tendencias de mercado y generar informes completos.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Recopilación de datos de múltiples fuentes</h4>
                          <p className="mt-1 text-gray-600">
                            Extrae datos de diversas fuentes para construir conjuntos de datos de investigación completos.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Identificación de tendencias</h4>
                          <p className="mt-1 text-gray-600">
                            Analiza datos de mercado para identificar tendencias emergentes y patrones antes de que se conviertan en mainstream.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-lg font-medium text-gray-900">Inteligencia competitiva</h4>
                          <p className="mt-1 text-gray-600">
                            Monitorea las actividades de los competidores, lanzamientos de productos y estrategias de precios para tomar decisiones estratégicas.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/signup"
                      className="inline-flex items-center text-white bg-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                      Comienza ahora <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="md:w-1/2 bg-gray-50 p-8 md:p-12">
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Estudio de caso: Empresa de investigación de mercado</h4>
                      <p className="text-gray-600 mb-4">
                        Una empresa de investigación de mercado utilizó Relais IA para automatizar la recopilación de datos para informes de industrias. Al raspar múltiples fuentes y analizar tendencias, entregaron insights más completos a sus clientes.
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Tiempo de recopilación de datos:</span>
                          <span className="font-medium text-gray-900">Reducido en un 85%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Completitud del informe:</span>
                          <span className="font-medium text-gray-900">Aumentado en un 40%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Satisfacción del cliente:</span>
                          <span className="font-medium text-gray-900">Mejorado en un 35%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Ejemplo de flujo de trabajo</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            1
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">Identifica fuentes de datos clave para tu tema de investigación</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            2
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">Utiliza el raspado de URL para extraer puntos de datos relevantes</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            3
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">Utiliza Product Research para analizar tendencias de mercado y sentimiento</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                            4
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600">Compila insights en informes de investigación completos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {/* <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Businesses across industries are transforming their operations with Relais IA
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="text-yellow-400 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-500 text-sm">5.0</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">¿Listo para transformar tu negocio con insights de IA?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Únete a otras empresas que usan Relais IA para extraer datos valiosos y obtener insights de mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="https://relais.boko.com.au/membership/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                  Regístrate ahora
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

// Check Icon Component
const Check = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )
}

// Solutions Overview
const solutionsOverview = [
  {
    id: "ecommerce",
    icon: <ShoppingBag className="h-6 w-6 text-blue-600" />,
    title: "Comercio electrónico",
    description: "Identifica oportunidades de productos rentables, analiza la competencia y optimiza tu portafolio de productos.",
  },
  {
    id: "marketing",
    icon: <Target className="h-6 w-6 text-blue-600" />,
    title: "Marketing",
    description: "Crea bases de datos de prospectos dirigidos, analiza la posición en el mercado y crea campañas más efectivas.",
  },
  {
    id: "procurement",
    icon: <FileText className="h-6 w-6 text-blue-600" />,
    title: "Compras",
    description: "Encuentra y filtra oportunidades de licitaciones, construye bases de datos de proveedores y optimiza el proceso de adquisición.",
  },
  {
    id: "entrepreneurship",
    icon: <Brain className="h-6 w-6 text-blue-600" />,
    title: "Emprendimiento",
    description: "Valida ideas de negocio, identifica oportunidades de mercado y toma decisiones basadas en datos.",
  },
  {
    id: "supplychain",
    icon: <Truck className="h-6 w-6 text-blue-600" />,
    title: "Cadena de suministro",
    description: "Optimiza el suministro, monitorea el rendimiento de los proveedores y identifica proveedores alternativos para reducir el riesgo.",
  },
  {
    id: "research",
    icon: <Search className="h-6 w-6 text-blue-600" />,
    title: "Investigación de mercado",
    description: "Reune y analiza datos de múltiples fuentes, identifica tendencias de mercado y genera informes completos.",
  },
]

// Testimonials
// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "E-commerce Entrepreneur",
//     quote:
//       "Relais IA transformed how I research new product opportunities. What used to take weeks now takes hours, and the insights are incredibly valuable for making informed decisions.",
//   },
//   {
//     name: "Michael Chen",
//     role: "Marketing Director",
//     quote:
//       "The lead generation capabilities are game-changing. We've built highly targeted prospect lists that have significantly improved our campaign conversion rates.",
//   },
//   {
//     name: "David Rodriguez",
//     role: "Procurement Manager",
//     quote:
//       "Finding relevant tender opportunities used to be a full-time job. With Relais IA, we get notifications for opportunities that match our criteria, saving us countless hours.",
//   },
// ]

