import { ShieldCheck, Smartphone, Send, CreditCard } from 'lucide-react'

const Features = () => {
  return (
    <div className="w-full min-h-screen px-6 py-16 lg:px-20">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold">
          Our Powerful{' '}
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Features
          </span>
        </h1>
        <p className="mt-4 text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Discover how Wallex makes your financial journey seamless, secure, and
          truly effortless.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
          <ShieldCheck className="text-indigo-600 mb-4" size={40} />
          <h2 className="text-2xl font-semibold mb-2">Secure Transactions</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Your money is protected with industry-leading security and
            encryption.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
          <Smartphone className="text-pink-500 mb-4" size={40} />
          <h2 className="text-2xl font-semibold mb-2">Easy to Use</h2>
          <p className="text-gray-600 dark:text-gray-300">
            A simple and intuitive app that makes managing money effortless.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
          <Send className="text-orange-500 mb-4" size={40} />
          <h2 className="text-2xl font-semibold mb-2">Instant Transfers</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Send and receive money instantly with just a few taps.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
          <CreditCard className="text-purple-600 mb-4" size={40} />
          <h2 className="text-2xl font-semibold mb-2">Cashless Payments</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Pay bills, shop online, and go cashless with full confidence.
          </p>
        </div>
      </section>

      <div className="text-center mt-16">
        <button className="px-8 py-3 rounded-full text-white text-xl cursor-pointer font-medium bg-gradient-to-r from-[#3a0ca3] to-[#bc6c57] hover:opacity-90 transition">
          Get Started Today
        </button>
      </div>
    </div>
  )
}

export default Features
