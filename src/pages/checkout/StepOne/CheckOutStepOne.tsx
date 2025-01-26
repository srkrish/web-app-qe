import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { isProblemUser, isErrorUser } from "utils/Credentials";
import { ROUTES } from "utils/Constants";
import SwagLabsFooter from "components/layout/Footer";
import HeaderContainer from "components/layout/HeaderContainer";
import InputError from "components/forms/InputError";
import ErrorMessage from "components/common/ErrorMessage";
import "./CheckOutStepOne.css";

// Assuming this is the correct type from InputError component
const INPUT_TYPES = {
  TEXT: "text"
} as const;

const CheckOutStepOne = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dismissError = () => {
    setError("");
  };

  const handleFirstNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFirstName(evt.target.value);
  };

  const handleLastNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (isProblemUser()) {
      return setFirstName(evt.target.value);
    }
    setLastName(evt.target.value);
  };

  const handlePostalCodeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPostalCode(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!firstName || !lastName || !postalCode) {
      return setError("Error: First Name is required");
    }

    if (isErrorUser()) {
      return setError("Error: Last Name is required");
    }

    navigate(ROUTES.CHECKOUT_STEP_TWO);
  };

  return (
    <div id="page_wrapper" className="page_wrapper">
      <div id="contents_wrapper">
        <HeaderContainer />
        <div className="checkout_info">
          <div className="checkout-header">
            <h2>Checkout: Your Information</h2>
          </div>
          <div className="checkout-content">
            {error && (
              <ErrorMessage
                isError={true}
                errorMessage={`Epic sadface: ${error}`}
                onClick={dismissError}
              />
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <InputError
                  type={INPUT_TYPES.TEXT}
                  id="first-name"
                  placeholder="First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  isError={Boolean(error)}
                  data-test="firstName"
                />
              </div>
              <div className="form-group">
                <InputError
                  type={INPUT_TYPES.TEXT}
                  id="last-name"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  isError={Boolean(error)}
                  data-test="lastName"
                />
              </div>
              <div className="form-group">
                <InputError
                  type={INPUT_TYPES.TEXT}
                  id="postal-code"
                  placeholder="Zip/Postal Code"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                  isError={Boolean(error)}
                  data-test="postalCode"
                />
              </div>
              <div className="form-buttons">
                <button 
                  className="cancel-button"
                  onClick={() => navigate(ROUTES.CART)}
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="continue-button"
                  type="submit"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <SwagLabsFooter />
    </div>
  );
};

export default CheckOutStepOne;