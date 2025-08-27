import { useThemeMode } from '@/lib/theme'
import { CircleCheck, Wallet } from 'lucide-react'
import FAQ from './components/FAQ'
import { Link } from 'react-router'

import { useDispatch } from 'react-redux'
import { openModal } from '@/redux/features/modal/modalSlice'

const Home = () => {
  const { mode } = useThemeMode()

  const dispatch = useDispatch()

  const handleClickGetStarted = () => {
    dispatch(openModal())
  }

  const faqItems = [
    {
      id: '1',
      title: 'How can I reset my password?',
      content:
        'To reset your password, click on the "Forgot Password" link on the login page. You will receive an email with instructions to reset your password.',
    },
    {
      id: '2',
      title: 'How do I change my subscription plan?',
      content:
        'To change your subscription plan, go to your account settings and click on "Subscription". You can select the plan you wish to switch to from the available options.',
    },
    {
      id: '3',
      title: 'Can I cancel my subscription anytime?',
      content:
        'Yes, you can cancel your subscription at any time. Simply go to the "Subscription" section in your account settings and click on "Cancel Subscription".',
    },
    {
      id: '4',
      title: 'Do you offer customer support?',
      content:
        'Yes, we offer 24/7 customer support. You can reach us via email at support@example.com or use the live chat feature available on the website.',
    },
    {
      id: '5',
      title: 'What payment methods do you accept?',
      content:
        'We accept various payment methods, including credit/debit cards, PayPal, and bank transfers. You can choose your preferred method during checkout.',
    },
    {
      id: '6',
      title: 'How can I contact customer support?',
      content:
        'You can contact our customer support team via email at support@example.com or use the contact form available in the support section of our website.',
    },
  ]

  return (
    <div>
      <section
        className="flex-grow-1 w-full min-h-screen flex justify-center items-center"
        style={{
          backgroundImage: `url(${
            mode === 'dark'
              ? 'https://images.unsplash.com/photo-1477093782505-e10aaeb27c6d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              : 'https://images.unsplash.com/photo-1615716039130-2d84e4bef125?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          })`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="p-20">
          <div className="flex justify-center gap-x-2 mb-4 font-bold">
            <div className="inline-flex items-center border-2 border-black dark:border-white py-4 px-8 rounded-full text-2xl">
              <Wallet />
              <div className="ml-2">Financial Journey</div>
            </div>
          </div>
          <h1 className="mt-16 text-7xl lg:text-8xl text-center font-light bg-white text-indigo-800 px-1 max-w-5xl">
            Your Gateway to Digital Finance Innovation
          </h1>
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 p-16 gap-16">
        <div className="flex-1">
          <h1 className="text-5xl">Our easy steps for Registration</h1>
          <p className="mt-4 text-2xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s.
          </p>
          <ul className="mt-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2">
            <li className="flex items-center gap-x-2 text-lg">
              <CircleCheck className="text-green-700" size={18} /> Sign up with
              NID card
            </li>
            <li className="flex items-center gap-x-2 text-lg">
              <CircleCheck className="text-green-700" size={18} /> Verify mobile
              number
            </li>
            <li className="flex items-center gap-x-2 text-lg">
              <CircleCheck className="text-green-700" size={18} /> Take a selfie
              video
            </li>
            <li className="flex items-center gap-x-2 text-lg">
              <CircleCheck className="text-green-700" size={18} /> Enjoy the
              full access
            </li>
          </ul>
          <button
            className="mt-4 px-6 py-2 rounded-full text-white text-xl cursor-pointer font-medium bg-gradient-to-r from-[#3a0ca3] to-[#bc6c57] hover:opacity-90 transition"
            onClick={handleClickGetStarted}
          >
            Get Started
          </button>
        </div>
        <div className="flex-1 object-cover">
          <img
            className="scale-130 sm:scale-100"
            src="https://storage.googleapis.com/strapi-v2-bucket-prod/xsolla_mobile_sdk_hero_foreground_f04e3c5e6d/xsolla_mobile_sdk_hero_foreground_f04e3c5e6d.webp"
            alt="Mobile Transaction"
          />
        </div>
      </section>
      <div className="border-t border-indigo-800"></div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="hidden lg:flex justify-center -mt-32">
          <div className="max-w-96 relative flex justify-center items-center">
            <div className="absolute -z-10 w-[50px] h-[150px] rounded-full bg-[#2b0b3a] shadow-[0_0_160px_200px_rgba(111,31,145,0.5)]"></div>
            <img
              className="max-w-96"
              src="https://i.postimg.cc/901M8XX6/excited-young-woman-holding-credit-card-isolated-o-2023-11-27-05-04-08-utc-2-1.png"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col justify-center max-lg:py-12">
          <div className="flex flex-col gap-4 p-4 pr-16">
            <h2 className="font-bold text-4xl capitalize">
              Wallex is the fastest mobile{' '}
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                banking solution
              </span>
            </h2>
            <p className="text-2xl">
              Wallex is the fastestmobile banking solution Lorem Ipsum is simply
              dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry’s standard dummy text ever since the
              1500s.Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
            <p className="text-2xl">
              Lorem Ipsum has been the industry’s standard dummy text ever since
              the 1500s.
            </p>
            <div>
              <button className="inline-block mt-4 px-6 py-2 rounded-full text-white text-xl cursor-pointer font-medium bg-gradient-to-r from-[#3a0ca3] to-[#bc6c57] hover:opacity-90 transition"
                onClick={handleClickGetStarted}
              >
                Signup Now{' '}
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="border-t border-indigo-800"></div>
      <section className="flex flex-col px-4 py-16 gap-y-6 mx-auto max-w-[60rem]">
        <h1 className="text-4xl capitalize font-bold">
          Frequently Asked{' '}
          <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            questions{' '}
          </span>
        </h1>
        <p className="text-lg">
          Welcome to our FAQ section! Here, you will find answers to the most
          commonly asked questions about our platform. If you can't find what
          you're looking for, feel free to reach out to our customer support
          team for further assistance.
        </p>
        <FAQ items={faqItems} />
        <div>
          <Link to="/faq">
            <button className="mt-2 px-6 py-2 rounded-full text-white text-xl cursor-pointer font-medium bg-gradient-to-r from-[#3a0ca3] to-[#bc6c57] hover:opacity-90 transition">
              More FAQ
            </button>
          </Link>
        </div>
      </section>
      <div className="border-t border-indigo-800"></div>
    </div>
  )
}

export default Home
