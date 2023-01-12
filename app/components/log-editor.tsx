import type { FoodLogEntry, FoodType, Meal } from "@prisma/client";
import { Link, Outlet, useParams } from "@remix-run/react";

type Props = {
  entries: (FoodLogEntry & {
    foodType: FoodType;
    meals: Pick<Meal, "amount">[];
  })[];
};

export default function FoodLogEditor({ entries }: Props) {
  const { entryId } = useParams();
  const rows = entries.map((entry) => {
    const active = entryId === entry.id;
    const meals = entry.meals.length;
    const hasMeals = meals > 0;
    return (
      <tr key={entry.foodType.name} className={active ? "active" : ""}>
        <th>{entry.foodType.name}</th>
        <td>{entry.foodType.unit}</td>
        <td>
          {entry.foodType.strategy === "max" ? "max" : ""}{" "}
          {entry.foodType.amount.toString()}
        </td>
        <td>
          {entry.meals.reduce((result, meal) => result + meal.amount, 0.0)}
        </td>
        <td>
          <Link
            className={`btn-sm btn gap-2 ${active ? "btn-disabled" : ""}`}
            to={entry.id}
          >
            Meals
            {hasMeals && <div className="badge-secondary badge">{meals}</div>}
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div className="flex flex-col lg:flex-row">
      <div className=" pr-8">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit</th>
              <th>Amount</th>
              <th>Logged</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>

      <div className="pl-8">
        <Outlet />
      </div>
    </div>
  );
}
