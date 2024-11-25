import Navbar from '../navbar/Navbar'
import Footer from './Footer'
import Message from '../message/Message'
import { useRouter } from 'next/router'

export default function MainLayout({ children }) {
   const router = useRouter()
   const { message } = router.query
   return (
      <div className="flex min-h-screen flex-col">
         <Navbar />
         {message ? <Message text={message} /> : <></>}
         <div className="flex-1">{children}</div>
         <Footer />
      </div>
   )
}
