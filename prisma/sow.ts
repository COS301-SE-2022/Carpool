import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  //delete all entries

  await prisma.pickupLocation.deleteMany({});

  await prisma.review.deleteMany({});

  await prisma.booking.deleteMany({});

  await prisma.location.deleteMany({});

  await prisma.trip.deleteMany({});

  await prisma.message.deleteMany({});

  await prisma.adminUser.deleteMany({});

  await prisma.notification.deleteMany({});

  await prisma.driver.deleteMany({});

  await prisma.user.deleteMany({});
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
