import Footer from "./Footer";
import { Outlet} from "react-router-dom";
import MyNavbar from "./Navbar";


function Layout(){

    return(
     <div className="d-flex flex-column min-vh-100 bg-black text-white"> 
      <div className="flex-grow-0 border-light  short-border" style={{flexBasis: "20%"}}>
       <MyNavbar />
      </div>
      <div className=" w-100  flex-grow-1 d-flex justify-content-center align-items-start mt-5" style={{flexBasis: "70%"}}>
        <div>
      <Outlet />
      </div>
      </div>
      <div className="flex-grow-0 border-light  footer-border mb-3" style={{flexBasis: "10%"}}>
      <Footer />
     </div>
     </div>
    );
}

export default Layout;