import { Form, useLoaderData, useTransition } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import {
  createMeal,
  deleteMeal,
  getFoodLogEntry,
} from "~/models/food-log.server";
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
  if (request.method === "POST") {
    const mealData = {
      amount: Number(body.get("amount")!.toString()),
      comment: body.get("comment")!.toString(),
      foodLogEntryId: params.entryId,
    };
    const meal = await createMeal(mealData);
    return json({ meal });
  } else if (request.method === "DELETE") {
    console.log(Object.fromEntries(body));
    await deleteMeal(body.get("id")!.toString());
    return json({});
  } else {
    return new Response("", { status: 405 });
  }
}

export default function Meals() {
  const { foodLogEntry } = useLoaderData<typeof loader>();
  const transition = useTransition();

  const loadingClassName = (
    method: "POST" | "DELETE",
    id: string | undefined = undefined
  ) =>
    transition.submission?.method === method &&
    transition.state === "submitting" &&
    (id === undefined ||
      transition.submission.formData.get("id")?.toString() === id)
      ? "loading"
      : "";

  return (
    <>
      <ul className="steps steps-vertical">
        {foodLogEntry.meals.map((meal) => (
          <li key={meal.id} className="step-primary step">
            <div className="flex w-full items-center">
              <div className="flex-1 text-left">
                {meal.amount} ({meal.comment})
              </div>
              <Form method="delete" className="inline pl-4">
                <input type="hidden" name="id" value={meal.id} />
                <button
                  type="submit"
                  className={`btn ${loadingClassName("DELETE", meal.id)}`}
                >
                  X
                </button>
              </Form>
            </div>
          </li>
        ))}
        <li className="step">Log new meal</li>
      </ul>

      <Form method="post" className="flex flex-col gap-y-4 pt-4">
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Amount</span>
            <input
              type="text"
              name="amount"
              placeholder="1.0"
              className="input-bordered input"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Comment</span>
            <input
              type="text"
              name="comment"
              placeholder="Comment"
              className="input-bordered input "
            />
          </label>
        </div>
        <button
          className={`btn-primary btn ${loadingClassName("POST")}`}
          type="submit"
        >
          Add
        </button>
      </Form>
    </>
  );
}
