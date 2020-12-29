import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  let location = useLocation();

  return (
    <div>
      <h3>
        <p>Page <code className="error">{location.pathname}</code> not found!</p>
        <br/>
        <Link to={'/'} className="btn btn-default">На главную</Link>
      </h3>
    </div>
  );
}