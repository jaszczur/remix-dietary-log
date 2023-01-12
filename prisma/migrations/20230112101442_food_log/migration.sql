-- CreateTable
CREATE TABLE "FoodType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "comment" TEXT,
    "strategy" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "FoodLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "FoodLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FoodLogEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "foodLogId" TEXT NOT NULL,
    "foodTypeId" TEXT NOT NULL,
    CONSTRAINT "FoodLogEntry_foodLogId_fkey" FOREIGN KEY ("foodLogId") REFERENCES "FoodLog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FoodLogEntry_foodTypeId_fkey" FOREIGN KEY ("foodTypeId") REFERENCES "FoodType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" DECIMAL NOT NULL,
    "comment" TEXT NOT NULL,
    "foodLogEntryId" TEXT NOT NULL,
    CONSTRAINT "Meal_foodLogEntryId_fkey" FOREIGN KEY ("foodLogEntryId") REFERENCES "FoodLogEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
