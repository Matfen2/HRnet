import "./Error.css";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="hero-not-found">
        <section className="hero-not-found-content">
          <h2 className="title">Quelque chose ne va pas ici!</h2>
          <p className="text">
            La page que vous recherchez a peut-être été supprimée ou
            temporairement indisponible.
          </p>
          <div>
            <button
              className="hero-not-found-link"
              onClick={() => navigate(-1)}
            >
              Go back to home
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Error
