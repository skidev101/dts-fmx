import { PrismaClient, Role } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const users = Array.from({ length: 25 }).map(() => {
    const fullName = faker.person.fullName();
    const username = faker.internet.username().toLowerCase();
    const email = faker.internet.email({ firstName: fullName });

    return {
      clerkId: faker.string.uuid(),
      fullname: fullName,
      email,
      username,
      role: Role.STUDENT,
      avatarUrl: faker.image.avatar(),
    };
  });

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("Seeded 25 users!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
