
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import MainHeader from "./components/common/main-header";
import Footer from "./components/common/footer";

function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<MainHeader />}>
        <Route
          index
          element={
            <>
              <Home />
            </>
          }
        />
      </Route>
    </Routes>
   
    </>
  );
}

export default App;
