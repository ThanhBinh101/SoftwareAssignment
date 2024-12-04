import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Popup from "./Popup";
import { useAppContext } from "../hooks/useAppContext";

const RootLayout = () => {
  const { isOpenPopup } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen">
      {isOpenPopup && <Popup />}
      
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default RootLayout;
