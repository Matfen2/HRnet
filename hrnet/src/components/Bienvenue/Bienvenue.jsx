import "./Bienvenue.css";
import "../../App.css";
import { NavLink } from "react-router-dom";

const Bienvenue = () => {
  return (
    <>
      <div className="home-wrapper">
        <form className="home-inputs" >
          <NavLink to="/create" >
            <button className="home-button">Create Employee</button>
          </NavLink>
          <NavLink to="/list" >
            <button className="home-button">Liste Employee</button>
          </NavLink>
        </form>
      </div>
    </>
  )
}

export default Bienvenue
