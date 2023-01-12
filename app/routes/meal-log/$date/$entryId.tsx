import { Form, useLoaderData } from "@remix-run/react";
import MealEditor from "~/components/meal-editor";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { createMeal, getFoodLogEntry } from "~/models/food-log.server";
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

export async function action({ request, params }: ActionArgs) {
  invariant(params.entryId, "entryId param not found");

  const body = await request.formData();
  const mealData = {
    amount: Number(body.get("amount")!.toString()),
    comment: body.get("comment")!.toString(),
    foodLogEntryId: params.entryId,
  };

  console.log({ mealData });
  const meal = await createMeal(mealData);
  console.log({ meal });

  return json({ meal });
}

export default function Meals() {
  const { foodLogEntry } = useLoaderData<typeof loader>();
  return (
    <Form method="post" action=".">
      <MealEditor meals={foodLogEntry.meals} />
    </Form>
  );
}
