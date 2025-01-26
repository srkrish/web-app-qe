import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ErrorMessage.css";

interface ErrorMessageProps {
  isError: boolean;
  errorMessage: string;
  onClick: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  isError, 
  errorMessage, 
  onClick, 
  ...props 
}) => {
  return (
    <div
      className={`error-message-container${isError ? " error" : ""}`}
      {...props}
    >
      {isError && (
        <h3 data-test="error">
          <button
            className="error-button"
            onClick={onClick}
            data-test="error-button"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {errorMessage}
        </h3>
      )}
    </div>
  );
};

export default ErrorMessage;