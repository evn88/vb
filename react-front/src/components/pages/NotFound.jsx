import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NotFound() {
  let location = useLocation();

  return (
    <div>
      <h3>
        <p>Page <code className="error">{location.pathname}</code> not found!</p>
        <br/>
        <Link to={'/vblob/'} className="btn btn-default"><FontAwesomeIcon icon="home" /> На главную</Link>
      </h3>
    </div>
  );
}