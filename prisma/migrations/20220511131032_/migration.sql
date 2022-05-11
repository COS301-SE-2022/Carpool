/*
  Warnings:

  - Added the required column `price` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats_booked` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "seats_booked" INTEGER NOT NULL;
