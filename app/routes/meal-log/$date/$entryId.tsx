import { useLoaderData } from "@remix-run/react";
import MealEditor from "~/components/meal-editor";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getFoodLogEntry } from "~/models/food-log.server";
import invariant from "tiny-invariant";

export async function loader({ params }: LoaderArgs) {
  //TODO: user check
  invariant(params.entryId, "entryId param not found");

  const foodLogEntry = await getFoodLogEntry({ id: params.entryId });

  if (!foodLogEntry) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ foodLogEntry });
}

export default function Meals() {
  const { foodLogEntry } = useLoaderData<typeof loader>();
  return (
    <div>
      <MealEditor meals={foodLogEntry.meals} />
    </div>
  );
}
