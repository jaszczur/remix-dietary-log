import { NavButton } from "./nav-button";
import { useOptionalUser } from "~/utils";

export default function Navigation() {
  const user = useOptionalUser();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <NavButton className="text-3xl normal-case" to="/">
          Dietary log
        </NavButton>
      </div>
      <nav className="flex-none">
        {user ? (
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavButton to="/meal-log">Meal log</NavButton>
            </li>
            <li>
              <NavButton to="/logout">Log out</NavButton>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavButton to="/login">Log in</NavButton>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
