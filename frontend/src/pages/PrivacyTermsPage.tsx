import { useState } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

export default function TermsPage() {
  const [openSection, setOpenSection] = useState<string | null>("acceptance")

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Términos y Condiciones</h1>
            <p className="mt-2 text-gray-600">Última actualización: 15 de marzo de 2025</p>
          </div>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Volver a la página principal
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introducción</h2>
            <p className="text-gray-600 mb-4">
              Estos Términos y Condiciones ("Términos", "Términos y Condiciones") rigen tu relación con la plataforma Relais IA
              ("Servicio") operada por Relais IA, Inc. ("nosotros", "nuestro").
            </p>
            <p className="text-gray-600">
              Tu acceso y uso del Servicio están sujetos a tu aceptación y cumplimiento de estos Términos. Estos Términos se aplican a todos los visitantes, usuarios y otros que acceden o utilizan el Servicio.
            </p>
            <p className="text-gray-600 mt-4">
              Al acceder o usar el Servicio, aceptas estar sujeto a estos Términos. Si no estás de acuerdo con alguna parte de estos Términos, entonces no puedes acceder al Servicio.
            </p>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {termsSections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                className="w-full p-6 sm:p-8 flex justify-between items-center text-left"
                onClick={() => toggleSection(section.id)}
              >
                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openSection === section.id ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openSection === section.id && (
                <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                  <div className="border-t border-gray-100 pt-4">{section.content}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-blue-50 rounded-xl shadow-sm overflow-hidden mt-12 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contáctanos</h2>
          <p className="text-gray-600 mb-6">
            Si tienes alguna pregunta sobre estos Términos y Condiciones, por favor contacta con nosotros a:
          </p>
          <div className="space-y-2">
            <p className="text-gray-800">
              <strong>Correo electrónico:</strong> contacto@relaisoft.org
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="mailto:contacto@relaisoft.org"
              className="inline-flex items-center text-white bg-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Contáctanos <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

// Terms and Conditions Sections
const termsSections = [
  {
    id: "acceptance",
    title: "Aceptación de Términos",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          Al acceder o usar el Servicio, confirmas que has leído, entendido y aceptas estar sujeto a estos Términos. Si estás usando el Servicio en representación de una empresa o otra entidad legal, representas que tienes autoridad para enlazar a esa entidad a estos Términos. Si no tienes tal autoridad, o si no estás de acuerdo con estos Términos, no debes aceptar estos Términos y no puedes usar el Servicio.
        </p>
        <p className="text-gray-600">
          Podemos modificar estos Términos en cualquier momento. Proporcionaremos aviso de cualquier cambio material a través del Servicio o de otras formas. Si continúas usando el Servicio después de que los cambios entren en vigor, entonces aceptas los Términos revisados.
        </p>
      </div>
    ),
  },
  {
    id: "accounts",
    title: "Cuentas de usuario y responsabilidades",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          Para acceder a ciertas características del Servicio, debes registrarte para una cuenta. Cuando te registres, aceptas proporcionar información precisa, actual y completa sobre ti mismo. Eres responsable de mantener la confidencialidad de tus credenciales de cuenta y de todas las actividades que ocurran bajo tu cuenta.
        </p>
        <p className="text-gray-600">Aceptas:</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Notificar inmediatamente cualquier uso no autorizado de tu cuenta o cualquier violación de seguridad</li>
          <li>
            Asegurarte de cerrar tu cuenta al final de cada sesión cuando accedes al Servicio en un ordenador compartido
          </li>
          <li>No compartir tus credenciales de cuenta con ningún tercero</li>
          <li>Ser responsable exclusivamente de todas las actividades que ocurran bajo tu cuenta</li>
        </ul>
        <p className="text-gray-600">
          Reservamos el derecho de deshabilitar cualquier cuenta de usuario en cualquier momento si, en nuestra opinión, has fallado en cumplir con alguna disposición de estos Términos.
        </p>
      </div>
    ),
  },
  {
    id: "service",
    title: "Descripción del Servicio y Limitaciones",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          Relais IA proporciona una plataforma impulsada por IA con dos características principales: (1) Product Research para analizar mercados y evaluar potenciales productos, y (2) Raspado de URL con capacidades de inicio de sesión para extraer datos de sitios web públicamente accesibles.
        </p>
        <h3 className="text-lg font-medium text-gray-900">Limitaciones del Servicio</h3>
        <p className="text-gray-600">Aceptas:</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>El Servicio se proporciona "tal cual" y "tal como esté disponible" sin garantías de ningún tipo</li>
          <li>
            No garantizamos la precisión, completitud o utilidad de cualquier información obtenida a través del
            Servicio
          </li>
          <li>
            Reservamos el derecho de modificar, suspender o discontinuar el Servicio (o cualquier parte de él) en cualquier momento, con o sin previo aviso
          </li>
          <li>
            No somos responsables de ninguna pérdida o daño que pueda resultar de interrupciones de servicio, pérdida de datos o fallos del sistema
          </li>
          <li>
            Se aplican límites de uso según tu plan de suscripción, y superar estos límites puede resultar en cargos adicionales o restricciones de servicio
          </li>
        </ul>
        <h3 className="text-lg font-medium text-gray-900">Limitaciones del Raspado de URL</h3>
        <p className="text-gray-600">Al usar la característica de Raspado de URL, aceptas:</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>
            Solo raspar sitios web donde tienes permiso o donde el raspado está permitido según los términos de servicio del sitio
          </li>
          <li>Cumplir con todas las leyes y regulaciones aplicables relacionadas con la recopilación y uso de datos</li>
          <li>No usar el Servicio en una forma que pueda dañar, deshabilitar, sobrecargar o afectar negativamente cualquier sitio web</li>
          <li>Aceptar la responsabilidad total de tu uso de la característica de Raspado de URL</li>
        </ul>
      </div>
    ),
  },
  {
    id: "intellectual",
    title: "Derechos de Propiedad Intelectual",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          El Servicio y su contenido original, características y funcionalidad son y permanecerán propiedad exclusiva de Relais IA y sus licenciantes. El Servicio está protegido por derechos de autor, marca registrada y otras leyes de los Estados Unidos y países extranjeros.
        </p>
        <p className="text-gray-600">
          Nuestras marcas y vestimenta comercial pueden no ser utilizadas en conexión con ningún producto o servicio sin el consentimiento previo por escrito de Relais IA.
        </p>
        <h3 className="text-lg font-medium text-gray-900">Tu Contenido</h3>
        <p className="text-gray-600">
          Retienes todos los derechos de cualquier contenido que envíes, publicas o displays en o a través del Servicio ("Tu Contenido").
          Al enviar, publicar o mostrar tu Contenido en o a través del Servicio, otorgas a nosotros una licencia mundial,
          no exclusiva, gratuita, de uso, reproducción, adaptación, publicación, traducción y distribución de tu Contenido
          en conexión con el Servicio.
        </p>
        <p className="text-gray-600">Representas y garantizas:</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>
            Tienes propiedad o tienes los derechos necesarios para usar y autorizarnos a usar tu Contenido como se describe en estos Términos
          </li>
          <li>
            Tu Contenido no viola los derechos de privacidad, derechos de publicidad, derechos de copyright o otros derechos de cualquier persona
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "acceptable",
    title: "Política de Uso Aceptable",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Aceptas no usar el Servicio para:</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Violar cualquier ley, regulación o derechos de terceros aplicables</li>
          <li>Raspado, recopilar o cosechar cualquier información de sitios web en violación de sus términos de servicio</li>
          <li>Transmitir cualquier material que sea difamatorio, obsceno o de otra manera ofensivo</li>
          <li>
            Impersonar a cualquier persona o entidad o falsamente declarar o representar tu afiliación con una persona
            o entidad
          </li>
          <li>Interfiere con o interrumpe el Servicio o servidores o redes conectadas al Servicio</li>
          <li>
            Intentar obtener acceso no autorizado a cualquier parte del Servicio o cualquier otro sistema o redes conectadas al Servicio
          </li>
          <li>Usar el Servicio para cualquier propósito ilegal o no autorizado</li>
          <li>
            Usar el Servicio para generar, distribuir, publicar o transmitir spam, mensajes no solicitados o cartas de cadena
          </li>
        </ul>
        <p className="text-gray-600">
          Reservamos el derecho de terminar tu acceso al Servicio inmediatamente, sin previo aviso, si en nuestra discreción violas cualquier disposición de esta Política de Uso Aceptable.
        </p>
      </div>
    ),
  },
  {
    id: "payment",
    title: "Términos de Pago",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          Ofrecemos planes de suscripción gratuitos y pagos. Al seleccionar un plan de suscripción pagada, aceptas pagar los cargos de suscripción indicados para ese plan. Los pagos se cobrarán en el método de pago que proporciones al momento de la compra.
        </p>
        <h3 className="text-lg font-medium text-gray-900">Ciclo de Facturación</h3>
        <p className="text-gray-600">
          El Servicio se cobra en una base de suscripción. Serás facturado por adelantado en un ciclo recurrente y periódico, dependiendo del plan de suscripción que selecciones. Los ciclos de facturación se establecen en un mes o un año, dependiendo del tipo de plan de suscripción que selecciones al comprar el Servicio.
        </p>
        <h3 className="text-lg font-medium text-gray-900">Prueba Gratuita</h3>
        <p className="text-gray-600">
          Podemos, en nuestra discreción, ofrecer una prueba gratuita por un período limitado de tiempo. Es posible que debas ingresar tu información de facturación para registrarte en la prueba gratuita. Si ingresas tu información de facturación al registrarte en una prueba gratuita, no serás cargado hasta que la prueba gratuita haya expirado. En el último día del período de prueba gratuita, a menos que hayas cancelado tu suscripción, serás cargado automáticamente el cargo de suscripción aplicable para el plan de suscripción que has elegido.
          up for a free trial, you will not be charged until the free trial has expired. On the last day of the free
        </p>
        <h3 className="text-lg font-medium text-gray-900">Cambios en los cargos</h3>
        <p className="text-gray-600">
          Podemos cambiar nuestros cargos de suscripción en cualquier momento. Si cambiamos nuestros cargos, proporcionaremos aviso del cambio en el Servicio o en un correo electrónico a tu opción, al menos 30 días antes de que el cambio entre en vigor. Tu uso continuo del Servicio después de que el cambio en los cargos entre en vigor constituye tu acuerdo para pagar el cargo modificado.
        </p>
        <h3 className="text-lg font-medium text-gray-900">Reembolsos</h3>
        <p className="text-gray-600">Excepto cuando lo exija la ley, las tarifas de suscripción pagadas no son reembolsables..</p>
      </div>
    ),
  },
  {
    id: "termination",
    title: "Terminación",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          Podemos terminar o suspender tu cuenta y acceso al Servicio inmediatamente, sin previo aviso o responsabilidad, por cualquier motivo, incluyendo sin limitación si violas estos Términos.
        </p>
        <p className="text-gray-600">
          Al terminar, tu derecho de usar el Servicio se suspenderá inmediatamente. Si deseas terminar tu cuenta, puedes simplemente dejar de usar el Servicio o contactarnos para solicitar la eliminación de tu cuenta.
        </p>
        <p className="text-gray-600">
          Todas las disposiciones de estos Términos que por su naturaleza deban sobrevivir a la terminación, sobrevivirán a la terminación, incluyendo sin limitación, provisiones de propiedad, renuncias de garantías, indemnización y limitaciones de responsabilidad.
        </p>
      </div>
    ),
  },
  {
    id: "disclaimers",
    title: "Renuncias y Limitaciones de Responsabilidad",
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Renuncia de Garantías</h3>
        <p className="text-gray-600">
          El Servicio se proporciona "tal cual" y "tal como esté disponible" sin garantías de ningún tipo, ya sean expresas o implícitas, incluyendo, sin limitación, garantías implícitas de comerciabilidad, idoneidad para un propósito particular, no infracción, o curso de actuación.
        </p>
        <p className="text-gray-600">RELAIS IA, ITS SUBSIDIARIES, AFFILIATES, AND ITS LICENSORS DO NOT WARRANT THAT:</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>EL SERVICIO FUNCIONARÁ SIN INTERRUPCIONES, SEGURO, O DISPONIBLE EN CUALQUIER MOMENTO O LUGAR</li>
          <li>CUALESQUIERA ERRORES O DEFECTOS SERÁN CORREGIDOS</li>
          <li>EL SERVICIO ESTÉ LIBRE DE VIRUS O COMPONENTES DAÑINOS</li>
          <li>LOS RESULTADOS DE USAR EL SERVICIO SATISFARÁN TUS REQUISITOS</li>
        </ul>
        <h3 className="text-lg font-medium text-gray-900">Limitación de Responsabilidad</h3>
        <p className="text-gray-600">
          EN NINGÚN CASO RELAIS IA, NI SUS DIRECTORES, EMPLEADOS, PARTNERS, AGENTES, PROVEEDORES O AFFILIATES, SERÁN RESPONSABLES DE DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENCIALES O PUNITIVOS, INCLUYENDO SIN LIMITACIÓN, PERDIDAS DE BENEFICIOS, DATOS, USO, BUENA VENTA, O OTROS DAÑOS INTANGIBLES, RESULTANTES DE:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>TU ACCESO O USO O INCAPACIDAD DE ACCESO O USO DEL SERVICIO</li>
          <li>CUALQUIER CONDUCTA O CONTENIDO DE CUALQUIER TERCERO EN EL SERVICIO</li>
          <li>CUALQUIER CONTENIDO OBTENIDO DEL SERVICIO</li>
          <li>ACCESO NO AUTORIZADO, USO, O ALTERACIÓN DE TUS TRANSMISSIONES O CONTENIDO</li>
        </ul>
        <p className="text-gray-600">
          SEGÚN CUALQUIER TEORÍA DE GARANTÍA, CONTRATO, TORTO (INCLUYENDO NEGLIGENCIA), O CUALQUIER OTRA TEORÍA LEGAL, SEGÚN O NO HEMOS SIDO INFORMADOS DE LA POSIBILIDAD DE ESOS DAÑOS, Y AUN SI UN REMEDIO ESTABLECIDO AQUÍ FALLA DE SU PROPÓSITO ESENCIAL.
        </p>
        <p className="text-gray-600">
          EN NINGÚN CASO SERÁ NUESTRA RESPONSABILIDAD TOTAL HACIA TI POR TODOS LOS DAÑOS, PÉRDIDAS O CAUSAS DE ACCIÓN EXCEDERÁ EL MONTO QUE HAS PAGADO A NOSOTROS EN LOS ÚLTIMOS SEIS (6) MESES, O, SI ES MAYOR, CIEN DÓLARES ($100).
        </p>
      </div>
    ),
  },
  {
    id: "governing",
    title: "Ley Gubernativa",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          Estos Términos serán gobernados y construidos de acuerdo con las leyes del Estado de Delaware, Estados Unidos, sin tener en cuenta sus disposiciones de conflicto de leyes.
        </p>
        <p className="text-gray-600">
          Nuestra falta de aplicación de cualquier derecho o disposición de estos Términos no será considerada como una renuncia a esos derechos. Si cualquier disposición de estos Términos es declarada inválida o inaplicable por un tribunal, las disposiciones restantes de estos Términos permanecerán en vigor.
        </p>
        <p className="text-gray-600">
          Cualquier disputa que surja de o esté relacionada con estos Términos o el Servicio se resolverá exclusivamente en los tribunales estatales o federales ubicados en Delaware, y aceptas la jurisdicción personal de esos tribunales.
        </p>
      </div>
    ),
  },
  {
    id: "changes",
    title: "Cambios a los Términos",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          Reservamos el derecho, en nuestra discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es material, intentaremos proporcionar al menos 30 días de aviso antes de que surjan nuevos términos.
        </p>
        <p className="text-gray-600">
          Al continuar accediendo o usando nuestro Servicio después de que esas revisiones entren en vigor, aceptas estar sujeto a los términos revisados. Si no estás de acuerdo con los nuevos términos, por favor deja de usar el Servicio.
        </p>
      </div>
    ),
  },
]

