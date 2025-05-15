import { useState } from "react"
import { Check, HelpCircle, X } from "lucide-react"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pricing Plans</h1>
            <p className="mt-2 text-gray-600">Choose the perfect plan for your business needs</p>
          </div>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 inline-flex shadow-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 text-sm font-medium rounded-md ${
                billingCycle === "monthly" ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 text-sm font-medium rounded-md ${
                billingCycle === "annual" ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Annual <span className="text-green-600 font-medium">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard Plan */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-transform hover:scale-105 duration-300">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900">Standard</h2>
              <p className="mt-2 text-gray-600">Perfect for small businesses and entrepreneurs</p>

              <div className="mt-6">
                <div className="flex items-end">
                  <span className="text-5xl font-extrabold text-gray-900">
                    {billingCycle === "monthly" ? "$39" : "$29"}
                  </span>
                  <span className="text-xl text-gray-500 ml-2">/ month</span>
                </div>
                {billingCycle === "annual" && (
                  <p className="mt-1 text-green-600 font-medium">Billed annually (${29 * 12})</p>
                )}
              </div>

              <div className="mt-8">
                <Link
                  to="/signup"
                  className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-100 px-8 py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's included:</h3>
              <ul className="space-y-4">
                {standardFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 px-8 py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage limits:</h3>
              <ul className="space-y-4">
                {standardLimits.map((limit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gray-600">{limit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100 relative transition-transform hover:scale-105 duration-300">
            <div className="absolute top-0 right-0">
              <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">MOST POPULAR</div>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900">Pro</h2>
              <p className="mt-2 text-gray-600">Advanced features for growing businesses</p>

              <div className="mt-6">
                <div className="flex items-end">
                  <span className="text-5xl font-extrabold text-gray-900">
                    {billingCycle === "monthly" ? "$79" : "$69"}
                  </span>
                  <span className="text-xl text-gray-500 ml-2">/ month</span>
                </div>
                {billingCycle === "annual" && (
                  <p className="mt-1 text-green-600 font-medium">Billed annually (${69 * 12})</p>
                )}
              </div>

              <div className="mt-8">
                <Link
                  to="/signup"
                  className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-100 px-8 py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Everything in Standard, plus:</h3>
              <ul className="space-y-4">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 px-8 py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage limits:</h3>
              <ul className="space-y-4">
                {proLimits.map((limit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gray-600">{limit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Compare Plans</h2>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 text-left text-gray-500 font-medium">Features</th>
                  <th className="py-4 px-6 text-center text-gray-500 font-medium">Standard</th>
                  <th className="py-4 px-6 text-center text-gray-500 font-medium">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {featureComparison.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-4 px-6 text-gray-900">
                      <div className="flex items-center">
                        <span>{feature.name}</span>
                        {feature.tooltip && (
                          <div className="relative group ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                              {feature.tooltip}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {feature.standard ? (
                        typeof feature.standard === "string" ? (
                          <span className="text-gray-900">{feature.standard}</span>
                        ) : (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        )
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {feature.pro ? (
                        typeof feature.pro === "string" ? (
                          <span className="text-gray-900">{feature.pro}</span>
                        ) : (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        )
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {pricingFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using Relais IA to extract valuable data and gain market insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Free Trial
            </Link>
            <Link
              to="mailto:contacto@relaisoft.org"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

// Standard Plan Features
const standardFeatures = [
  "Product Research Tool",
  "URL Scraping with Basic Authentication",
  "10 Research Reports per Month",
  "50 URL Scraping Tasks per Month",
  "CSV Export",
  "Email Support",
]

// Standard Plan Limits
const standardLimits = [
  "10 Research Reports per Month",
  "50 URL Scraping Tasks per Month",
  "Up to 1,000 Records per Scrape"
]

// Pro Plan Features
const proFeatures = [
  "Advanced Authentication for URL Scraping",
  "Custom Scraping Rules",
  "Priority Processing",
  "Google Sheets Integration",
  "Advanced Analytics Dashboard",
  "Priority Support",
  "One-on-One Onboarding Session",
]

// Pro Plan Limits
const proLimits = [
  "Unlimited Research Reports",
  "200 URL Scraping Tasks per Month",
  "Up to 10,000 Records per Scrape",
]

// Feature Comparison
const featureComparison = [
  { name: "Product Research", standard: true, pro: true },
  { name: "Market Analysis Reports", standard: "10/month", pro: "Unlimited" },
  { name: "URL Scraping", standard: true, pro: true },
  { name: "Scraping Tasks", standard: "50/month", pro: "200/month" },
  { name: "Records per Scrape", standard: "1,000", pro: "10,000" },
  { name: "Basic Authentication", standard: true, pro: true },
  {
    name: "Advanced Authentication",
    standard: false,
    pro: true,
    tooltip: "Support for complex login flows and multi-step authentication",
  },
  {
    name: "Custom Scraping Rules",
    standard: false,
    pro: true,
    tooltip: "Create custom rules to extract specific data patterns",
  },
  { name: "CSV Export", standard: true, pro: true },
  { name: "Google Sheets Integration", standard: false, pro: true },
  { name: "Email Support", standard: true, pro: true },
  { name: "Priority Support", standard: false, pro: true },
//   { name: "One-on-One Onboarding", standard: false, pro: true }
]

// Pricing FAQs
const pricingFaqs = [
  {
    question: "Can I switch between plans?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to the new features. When downgrading, the change will take effect at the end of your current billing cycle.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 14-day free trial of the Standard plan with limited usage (5 research reports and 20 URL scraping tasks). No credit card required to start your trial.",
  },
  {
    question: "What happens if I exceed my monthly limits?",
    answer:
      "If you reach your monthly limit, you can purchase additional credits or upgrade to a higher plan. We'll notify you when you're approaching your limits.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. Your plan will remain active until the end of the current billing period.",
  },
]

