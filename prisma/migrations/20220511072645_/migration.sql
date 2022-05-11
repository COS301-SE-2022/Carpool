/*
  Warnings:

  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `byID` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `forID` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_trip_booking` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_number]` on the table `driver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_number` to the `driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `byId` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_trip_booking" DROP CONSTRAINT "_trip_booking_A_fkey";

-- DropForeignKey
ALTER TABLE "_trip_booking" DROP CONSTRAINT "_trip_booking_B_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_byID_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_forID_fkey";

-- AlterTable
ALTER TABLE "driver" ADD COLUMN     "id_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
DROP COLUMN "byID",
DROP COLUMN "forID",
ADD COLUMN     "byId" TEXT NOT NULL,
ADD COLUMN     "forId" TEXT NOT NULL,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("byId", "forId");

-- AlterTable
ALTER TABLE "user" DROP COLUMN "verificationCode",
ALTER COLUMN "profile_pic" SET DEFAULT E'placeholder.png';

-- DropTable
DROP TABLE "_trip_booking";

-- CreateTable
CREATE TABLE "Booking" (
    "booking_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,
    "booking_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("booking_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "driver_id_number_key" ON "driver"("id_number");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_byId_fkey" FOREIGN KEY ("byId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_forId_fkey" FOREIGN KEY ("forId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
