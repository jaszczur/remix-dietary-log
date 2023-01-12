import type { FoodLog, FoodLogEntry, User } from "@prisma/client";

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
          meals: { select: { amount: true } },
          foodType: true,
        },
      },
    },
  });
}

export function getFoodLogEntry({ id }: { id: FoodLogEntry["id"] }) {
  return prisma.foodLogEntry.findUnique({
    where: { id },
    include: { meals: true },
  });
}
