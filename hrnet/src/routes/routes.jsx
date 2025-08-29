import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ListEmployee from "../pages/listeEmployee/listEmployee";
import CreateEmployee from "../pages/createEmployee/CreateEmployee";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <section className="elementsToDisplay">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/list" element={<ListEmployee />} />
          <Route path="/create" element={<CreateEmployee />} />
        </Routes>
      </section>
      <Footer />
    </BrowserRouter>
  )
}

export default routes

