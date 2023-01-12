import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getFoodLog } from "~/models/food-log.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";
import FoodLogEditor from "~/components/log-editor";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.date, "date param not found");

  const foodLog = await getFoodLog({ userId, date: params.date });
  console.log({ fl: foodLog });
  if (!foodLog) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ foodLog });
}

export default function Day() {
  const { foodLog } = useLoaderData<typeof loader>();
  const header = foodLog.date;

  return (
    <section>
      <header className="pb-4 text-lg capitalize">{header}</header>
      <FoodLogEditor entries={foodLog.entries} />
    </section>
  );
}
