import { Outlet } from "react-router-dom";
import Footer from "./footer";


const MainHeader = () => {
  return (
    <div className="bg-main-color min-h-screen h-auto">
      <div className=" w-full bg-[url('/src/assets/header.png')]  z-10 bg-no-repeat bg-contain ">
        <div className="flex items-start gap-4 w-full  bg-[url('/src/assets/bg-main.png')] bg-contain bg-no-repeat">
          <div className="container mx-auto flex flex-col items-center justify-center min-h-screen ">
            <Outlet/>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MainHeader;
