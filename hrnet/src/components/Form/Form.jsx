import "./Form.css";

import { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "modal_rjmv";

import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../features/newEmployee/newEmployeeSlice"; 
import { listesStates } from "../../moks/states";         
import { listesDepartement } from "../../moks/departements";

import { format, subYears, addWeeks } from "date-fns";

const Form = () => {
  const dispatch = useDispatch();
  const totalEmployee =
    useSelector((state) => state.newEmployee.arrayEmployee) || [];

  const initialValues = {
    id: "",
    firstname: "",
    lastname: "",
    datebirth: "",
    startdate: "",
    street: "",
    city: "",
    countrystate: "",
    zipcode: "",
    departament: "",
  };

  // form state
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // modal
  const [showModal, setShowModal] = useState(false);

  // selects
  const [selectedOptionsState, setSelectedOptionsState] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(null);

  // dates (Date objets pour react-datepicker)
  const [selectedDate, setSelectedDate] = useState(null);       // birth
  const [selectedDateStart, setSelectedDateStart] = useState(null); // start

  // --- handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((errs) => ({ ...errs, [name]: "" }));
  };

  const handleSelectState = (opt) => {
    setSelectedOptionsState(opt);
    setFormValues((prev) => ({ ...prev, countrystate: opt?.value || "" }));
    setFormErrors((e) => ({ ...e, countrystate: "" }));
  };

  const handleSelectDepartment = (opt) => {
    setSelectedOptions(opt);
    setFormValues((prev) => ({ ...prev, departament: opt?.value || "" }));
    setFormErrors((e) => ({ ...e, departament: "" }));
  };

  const ageDate = (date) => {
    setSelectedDate(date);
    const val = date ? format(date, "yyyy/MM/dd") : "";
    setFormValues((prev) => ({ ...prev, datebirth: val }));
    setFormErrors((e) => ({ ...e, datebirth: "" }));
  };

  const startDate = (date) => {
    setSelectedDateStart(date);
    const val = date ? format(date, "yyyy/MM/dd") : "";
    setFormValues((prev) => ({ ...prev, startdate: val }));
    setFormErrors((e) => ({ ...e, startdate: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // soumission effective (évite toute boucle)
  useEffect(() => {
    if (!isSubmit) return;
    if (Object.keys(formErrors).length > 0) return;

    const payload = { ...formValues, id: totalEmployee.length + 1 };
    dispatch(addEmployee(payload));

    setShowModal(true);

    // reset UI
    setFormValues(initialValues);
    setSelectedOptionsState(null);
    setSelectedOptions(null);
    setSelectedDate(null);
    setSelectedDateStart(null);
    setIsSubmit(false);
  }, [isSubmit, formErrors]); // volontairement limité

  // --- validation ---
  const validate = (values) => {
    const errors = {};

    if (!values.firstname) errors.firstname = "First name is required";
    else if (values.firstname.length < 3) errors.firstname = "First name must be at least 3 characters";
    else if (values.firstname.length > 30) errors.firstname = "First name must be less than 30 characters";

    if (!values.lastname) errors.lastname = "Last name is required";
    else if (values.lastname.length < 3) errors.lastname = "Last name must be at least 3 characters";
    else if (values.lastname.length > 30) errors.lastname = "Last name must be less than 30 characters";

    if (!values.datebirth) errors.datebirth = "Date of birth is required (18–60 years).";
    if (!values.startdate) errors.startdate = "Start date is required";

    if (!values.street) errors.street = "Street is required";
    else if (values.street.length < 10) errors.street = "Street must be at least 10 characters";
    else if (values.street.length > 40) errors.street = "Street must be less than 40 characters";

    if (!values.city) errors.city = "City is required";
    else if (values.city.length < 2) errors.city = "City must be at least 2 characters";
    else if (values.city.length > 40) errors.city = "City must be less than 40 characters";

    if (!values.countrystate) errors.countrystate = "State is required";

    const zipStr = String(values.zipcode || "");
    if (!zipStr) errors.zipcode = "Zipcode is required";
    else if (zipStr.length < 5) errors.zipcode = "Zipcode must be at least 5 digits";
    else if (zipStr.length > 7) errors.zipcode = "Zipcode must be at most 7 digits";

    if (!values.departament) errors.departament = "Department is required";

    return errors;
  };

  return (
    <>
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          backgroundColor="#FFFFFF80"
          colorModal="#dcf5ed"
          iconModal="success"
          borderModal="20px"
          content="Employee created !"
          contentcolor="#461632"
          shadowModal="0 5px 12px rgba(18, 39, 3, .5)"
          fontSizeModal="1.5rem"
        />
      )}

      <div className="form-wrapper">
        <form className="form-inputs" onSubmit={handleSubmit}>
          <div className="form-fieldsets">
            <fieldset className="form-fieldset">
              <legend>Employee identity</legend>

              <label htmlFor="firstname">First Name</label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                autoComplete="off"
                value={formValues.firstname}
                onChange={handleChange}
              />
              <span className="errorMessage">{formErrors.firstname}</span>

              <label htmlFor="lastname">Last Name</label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                autoComplete="off"
                value={formValues.lastname}
                onChange={handleChange}
              />
              <span className="errorMessage">{formErrors.lastname}</span>

              <label htmlFor="datebirth">Date of Birth</label>
              <DatePicker
                id="datebirth"
                selected={selectedDate}
                onChange={ageDate}
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/MM/yyyy"
                // contraintes 18–60 ans
                minDate={subYears(new Date(), 60)}
                maxDate={subYears(new Date(), 18)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              <span className="errorMessage">{formErrors.datebirth}</span>

              <label htmlFor="startdate">Start Date</label>
              <DatePicker
                id="startdate"
                selected={selectedDateStart}
                onChange={startDate}
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                maxDate={addWeeks(new Date(), 10)}
                filterDate={(d) => d.getDay() !== 0 && d.getDay() !== 6} // pas samedi/dimanche
                peekNextMonth
                showMonthDropdown
                dropdownMode="select"
                todayButton="today"
              />
              <span className="errorMessage">{formErrors.startdate}</span>
            </fieldset>

            <fieldset className="form-fieldset title">
              <legend>Employee Address</legend>

              <label htmlFor="street">Street</label>
              <input
                id="street"
                name="street"
                type="text"
                autoComplete="off"
                value={formValues.street}
                onChange={handleChange}
              />
              <span className="errorMessage">{formErrors.street}</span>

              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                autoComplete="off"
                value={formValues.city}
                onChange={handleChange}
              />
              <span className="errorMessage">{formErrors.city}</span>

              <label htmlFor="countrystate">
                State
                <Select
                  id="countrystate"
                  name="countrystate"
                  options={listesStates}
                  placeholder="Select state"
                  value={selectedOptionsState}
                  onChange={handleSelectState}
                />
              </label>
              <span className="errorMessage">{formErrors.countrystate}</span>

              <label htmlFor="zipcode">Zip Code</label>
              <input
                id="zipcode"
                name="zipcode"
                type="text"
                autoComplete="off"
                value={formValues.zipcode}
                onChange={handleChange}
              />
              <span className="errorMessage">{formErrors.zipcode}</span>
            </fieldset>

            <fieldset className="form-fieldset title">
              <legend>Department</legend>
              <label htmlFor="departament">
                Department
                <Select
                  id="departament"
                  name="departament"
                  options={listesDepartement}
                  placeholder="Select department"
                  value={selectedOptions}
                  onChange={handleSelectDepartment}
                />
              </label>
              <span className="errorMessage">{formErrors.departament}</span>
            </fieldset>
          </div>

          <button className="form-button" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
