import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const foodTypes = [
  {
    id: "gwn",
    name: "gotowane warzywa niekapustne",
    strategy: "suggested",
    unit: "szklanka gotowanych",
    amount: 1.5,
  },
  {
    id: "gwk",
    name: "gotowane warzywa kapustne",
    strategy: "suggested",
    unit: "szklanka gotowanych",
    amount: 1.5,
  },
  {
    id: "swl",
    name: "surowe warzywa liściaste",
    strategy: "suggested",
    unit: "szklanka",
    amount: 1.5,
  },
  {
    id: "swn",
    name: "surowe warzywa nieliściaste",
    strategy: "suggested",
    unit: "szklanka",
    amount: 1,
  },
  {
    id: "zw",
    name: "zupa warzywna",
    strategy: "suggested",
    unit: "talerz",
    amount: 1,
  },
  {
    id: "s",
    name: "strączki",
    strategy: "suggested",
    unit: "szklanka gotowanych",
    amount: 1,
  },
  {
    id: "kr",
    name: "kasze / ryż",
    strategy: "suggested",
    unit: "szklanka gotowanych",
    amount: 1.5,
  },
  {
    id: "o",
    name: "owoce",
    strategy: "max",
    unit: "g",
    amount: 600,
  },
];

async function seed() {
  const email = "jaszczur@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("jaszczuriscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await Promise.all(
    foodTypes.map((ft) => prisma.foodType.create({ data: ft }).catch(() => {}))
  );

  const foodLog = await prisma.foodLog.create({
    data: {
      date: "2023-01-12",
      userId: user.id,
    },
  });

  await Promise.all(
    foodTypes.map((ft) =>
      prisma.foodLogEntry.create({
        data: {
          foodLogId: foodLog.id,
          foodTypeId: ft.id,
        },
      })
    )
  );

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
