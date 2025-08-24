import { type ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface Iprops {
  children: ReactNode
}

const CommonLayout = ({ children }: Iprops) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-grow-1'>{children}</div>
      <Footer />
    </div>
  )
}

export default CommonLayout
