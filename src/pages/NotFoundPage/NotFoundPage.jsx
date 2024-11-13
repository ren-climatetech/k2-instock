import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

const NotFoundPage = () => {

  return (
    <section>
      <div className="layout error">
        <h1 className="error__title">404 - Not Found</h1>
        <p className="error__message">Oops! It seems the page cannot be found.</p>
        <Link to="/" className="error__home-button">
          Go to Homepage
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
