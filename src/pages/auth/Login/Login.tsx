import { useEffect, Fragment, FormEvent, ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import {
  isLockedOutUser,
  setCredentials,
  verifyCredentials,
} from "utils/Credentials";
import { ROUTES, VALID_USERNAMES, VALID_PASSWORD } from "@utils/Constants";
import InputError from "@components/forms/InputError";
import { INPUT_TYPES } from "@components/forms/types";  // Update this path based on where you moved the types
import SubmitButton from "@components/forms/SubmitButton";
import ErrorMessage from "@components/common/ErrorMessage";
import { BacktraceClient } from "@backtrace-labs/react";

interface LocationState {
  from?: {
    pathname: string;
  };
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [redirectMessage, setRedirectMessage] = useState("");
  const [inputError, setInputError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if we have location state and show the message
    const state = location.state as LocationState;
    if (state?.from) {
      setRedirectMessage(
        `You can only access '${state.from.pathname}' when you are logged in.`
      );
      // Clear the location state to prevent the message from persisting
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, navigate]);

  const dismissError = () => {
    setInputError("");
    setRedirectMessage("");
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!username) {
      return setInputError("Username is required");
    }
  
    if (!password) {
      return setInputError("Password is required");
    }
  
    if (verifyCredentials(username, password)) {
      // Store credentials properly
      setCredentials(username, password);
  
      if (isLockedOutUser()) {
        BacktraceClient.instance?.send(
          new Error("Locked out user tried to log in."),
          { username }
        );
        return setInputError("Sorry, this user has been locked out.");
      }
  
      setRedirectMessage("");
      setInputError("");
      console.log('Credentials set, navigating to inventory');
      navigate(ROUTES.INVENTORY);
    } else {
      BacktraceClient.instance?.send(
        "Someone tried to login with invalid credentials.",
        { username }
      );
      return setInputError(
        "Username and password do not match any user in this service"
      );
    }
  };

  const handleUserChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUsername(evt.target.value);
  };

  const handlePassChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  return (
    <div className="login_container">
      <div className="login_logo">Swag Labs</div>

      <div className="login_wrapper" data-test="login-container">
        <div className="login_wrapper-inner">
          <div id="login_button_container" className="form_column">
            <div className="login-box">
              <form onSubmit={handleSubmit}>
                <InputError
                  isError={Boolean(inputError)}
                  type={INPUT_TYPES.TEXT}
                  value={username}
                  onChange={handleUserChange}
                  testId="username"
                  placeholder="Username"
                  id="user-name"
                  name="user-name"
                  autoCorrect="off"
                  autoCapitalize="none"
                />
                <InputError
                  isError={Boolean(inputError)}
                  type={INPUT_TYPES.PASSWORD}
                  value={password}
                  onChange={handlePassChange}
                  testId="password"
                  placeholder="Password"
                  autoCorrect="off"
                  autoCapitalize="none"
                />
                {(redirectMessage || inputError) && (
                  <ErrorMessage
                    isError={true}
                    errorMessage={`Epic sadface: ${redirectMessage || inputError}`}
                    onClick={dismissError}
                  />
                )}
                <SubmitButton
                  customClass="btn_action"
                  testId="login-button"
                  value="Login"
                />
              </form>
            </div>
          </div>
        </div>
        <div
          className="login_credentials_wrap"
          data-test="login-credentials-container"
        >
          <div className="login_credentials_wrap-inner">
            <div
              id="login_credentials"
              className="login_credentials"
              data-test="login-credentials"
            >
              <h4>Accepted usernames are:</h4>
              {VALID_USERNAMES.map((u, i) => (
                <Fragment key={i}>
                  {u}
                  <br />
                </Fragment>
              ))}
            </div>
            <div className="login_password" data-test="login-password">
              <h4>Password for all users:</h4>
              {VALID_PASSWORD}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;