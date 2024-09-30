import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";


const PlainLayout = (props) => {

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {props.children}
      <Toaster position="bottom-right" />
      <Footer />
    </div>
  )
}

export default PlainLayout
