import { Link, Outlet } from "@remix-run/react";
import Footer from "~/components/footer";
import Navigation from "~/components/navigation";
import { useUser } from "~/utils";
export default function Index() {
  const user = useUser();
  return (
    <div className="flex h-screen flex-col p-8">
      {user ? (
        <ul className="list">
          <li>
            Go to{" "}
            <Link className="link" to="/meal-log">
              {" "}
              meal log{" "}
            </Link>{" "}
            to check out your progress
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            Go <Link to="/login">here</Link> to log in.
          </li>
        </ul>
      )}
    </div>
  );
}
