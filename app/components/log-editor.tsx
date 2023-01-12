import type { FoodLogEntry, FoodType, Meal } from "@prisma/client";
import { useState } from "react";

type Props = {
  entries: (FoodLogEntry & { foodType: FoodType; meals: Meal[] })[];
};

export default function FoodLogEditor({ entries }: Props) {
  const [selectedEntryId, setSelectedEntryId] = useState<string | undefined>(
    undefined
  );
  const rows = entries.map((entry) => {
    const active = selectedEntryId === entry.id;
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
          <button
            className={`btn-sm btn gap-2 ${active ? "btn-disabled" : ""}`}
            onClick={() => setSelectedEntryId(entry.id)}
          >
            Meals
            {hasMeals && <div className="badge-secondary badge">{meals}</div>}
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div className="flex">
      <div className="overflow-x-auto pr-8">
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

      {/* <div className="pl-8">
        {selectedEntry && (
          <EntryEditor
            entry={selectedEntry}
            onAdd={addMeal}
            mutating={isMutating}
          />
        )}
      </div> */}
    </div>
  );
}
