import type { Meal } from "@prisma/client";
import { useState } from "react";

type Props = {
  meals: Meal[];
  onRemove?: (idx: number) => void;
  onAdd?: (entry: Omit<Meal, "id" | "foodLogEntryId">) => void;
  mutating?: boolean;
};

export default function MealEditor({
  meals,
  onRemove,
  onAdd,
  mutating,
}: Props) {
  const [comment, setComment] = useState("");
  const [amount, setAmount] = useState("");
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
              onChange={(evt) => setAmount(evt.target.value)}
              type="text"
              placeholder="Amount"
              className="input-bordered input max-w-xs"
            />
            <input
              onChange={(evt) => setComment(evt.target.value)}
              type="text"
              placeholder="Comment"
              className="input-bordered input max-w-xs"
            />
            <button
              className={`btn-primary btn ${mutating ? "loading" : ""}`}
              onClick={() => {
                if (onAdd) onAdd({ comment, amount: Number(amount) });
              }}
            >
              Add
            </button>
          </div>
        </div>
      </li>
    </ul>
  );
}
