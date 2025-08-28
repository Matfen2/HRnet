import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <section className="elementsToDisplay">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/create" element={<CreateEmployee />} />
          <Route path="/list" element={<ListeEmployee />} /> */}
          <Route path="*" element={<Error />} />
        </Routes>
      </section>
      <Footer />
    </BrowserRouter>
  )
}

export default routes
