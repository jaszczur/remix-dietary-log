/*
  Warnings:

  - You are about to alter the column `amount` on the `Meal` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `amount` on the `FoodType` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" REAL NOT NULL,
    "comment" TEXT NOT NULL,
    "foodLogEntryId" TEXT NOT NULL,
    CONSTRAINT "Meal_foodLogEntryId_fkey" FOREIGN KEY ("foodLogEntryId") REFERENCES "FoodLogEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Meal" ("amount", "comment", "foodLogEntryId", "id") SELECT "amount", "comment", "foodLogEntryId", "id" FROM "Meal";
DROP TABLE "Meal";
ALTER TABLE "new_Meal" RENAME TO "Meal";
CREATE TABLE "new_FoodType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "comment" TEXT,
    "strategy" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "amount" REAL NOT NULL
);
INSERT INTO "new_FoodType" ("amount", "comment", "id", "name", "strategy", "unit") SELECT "amount", "comment", "id", "name", "strategy", "unit" FROM "FoodType";
DROP TABLE "FoodType";
ALTER TABLE "new_FoodType" RENAME TO "FoodType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
