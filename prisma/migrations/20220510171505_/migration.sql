/*
  Warnings:

  - A unique constraint covering the columns `[student_number]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DRIVER', 'PASSENGER');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isDriver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profile_pic" TEXT;

-- CreateTable
CREATE TABLE "banking_details" (
    "user_id" TEXT NOT NULL,
    "bank_account" INTEGER NOT NULL,
    "expire_date" TIMESTAMP(3) NOT NULL,
    "branch" TEXT NOT NULL,
    "bank" TEXT NOT NULL,

    CONSTRAINT "banking_details_pkey" PRIMARY KEY ("bank_account")
);

-- CreateTable
CREATE TABLE "trips" (
    "trip_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "trip_date" TIMESTAMP(3) NOT NULL,
    "seats_available" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "start_location" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "byID" TEXT NOT NULL,
    "forID" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("byID","forID")
);

-- CreateTable
CREATE TABLE "driver" (
    "user_id" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "car_picture" TEXT NOT NULL,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "_trip_booking" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "banking_details_bank_account_key" ON "banking_details"("bank_account");

-- CreateIndex
CREATE UNIQUE INDEX "banking_details_user_id_key" ON "banking_details"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_trip_booking_AB_unique" ON "_trip_booking"("A", "B");

-- CreateIndex
CREATE INDEX "_trip_booking_B_index" ON "_trip_booking"("B");

-- CreateIndex
CREATE UNIQUE INDEX "user_student_number_key" ON "user"("student_number");

-- AddForeignKey
ALTER TABLE "banking_details" ADD CONSTRAINT "banking_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_byID_fkey" FOREIGN KEY ("byID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_forID_fkey" FOREIGN KEY ("forID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver" ADD CONSTRAINT "driver_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_trip_booking" ADD CONSTRAINT "_trip_booking_A_fkey" FOREIGN KEY ("A") REFERENCES "trips"("trip_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_trip_booking" ADD CONSTRAINT "_trip_booking_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
