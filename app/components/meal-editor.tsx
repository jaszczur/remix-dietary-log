import type { Meal } from "@prisma/client";

type Props = {
  meals: Meal[];
  mutating?: boolean;
};

export default function MealEditor({ meals, mutating }: Props) {
  return (
    <ul className="steps steps-vertical">
      {meals.map((food, idx) => (
        <li key={idx} className="step-primary step">
          {food.amount} ({food.comment})
        </li>
      ))}
      <li className="step">
        <div className="left flex flex-col p-2">
          <div className="flex flex-col">
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              className="input-bordered input max-w-xs"
            />
            <input
              type="text"
              name="comment"
              placeholder="Comment"
              className="input-bordered input max-w-xs"
            />
            <button
              className={`btn-primary btn ${mutating ? "loading" : ""}`}
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </li>
    </ul>
  );
}
