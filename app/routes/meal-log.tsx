import { Link, Outlet, useLoaderData } from "@remix-run/react";
import Footer from "~/components/footer";
import Navigation from "~/components/navigation";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getLoggedDates } from "~/models/food-log.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  const foodLogs = await getLoggedDates({ userId });
  return json({ foodLogs });
}

export default function DaysLayout() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen flex-col">
      <div className="py-4 px-2">
        <Navigation />
      </div>
      <main className="grow p-8">
        <div className="flex flex-col xl:flex-row">
          <div className="pr-8">
            <ul>
              <li>
                <Link className="link" to="day/today">
                  Today
                </Link>
              </li>
              {data.foodLogs.map((fl) => (
                <li key={fl.id}>
                  <Link className="link" to={fl.date}>
                    {fl.date}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </main>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
