import type { FoodLog, User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { FoodLog } from "@prisma/client";

export function getLoggedDates({ userId }: { userId: User["id"] }) {
  return prisma.foodLog.findMany({
    where: { userId },
  });
}

export function getFoodLog({
  userId,
  date,
}: {
  userId: User["id"];
  date: FoodLog["date"];
}) {
  return prisma.foodLog.findFirst({
    where: { userId, date },
    include: {
      entries: {
        include: {
          meals: true,
          foodType: true,
        },
      },
    },
  });
}
