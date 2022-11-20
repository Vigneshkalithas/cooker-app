import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="not-found-head">
      <img
        src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif"
        alt="404 not found"
        className="not-found"
      />
      <div>
        <button className="back-btn" onClick={()=>navigate("/home")}>Home</button>
      </div>
    </div>
  );
}
