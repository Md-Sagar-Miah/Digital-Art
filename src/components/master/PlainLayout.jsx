import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "./Chatbot";


const PlainLayout = (props) => {

  return (
    <div className="flex min-h-screen flex-col relative">
      <Navbar />
      <Chatbot />
      {props.children}
      <Toaster position="bottom-right" />
      <Footer />
    </div>
  )
}

export default PlainLayout
