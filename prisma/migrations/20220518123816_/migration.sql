/*
  Warnings:

  - You are about to drop the column `destination` on the `trip` table. All the data in the column will be lost.
  - You are about to drop the column `start_location` on the `trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trip" DROP COLUMN "destination",
DROP COLUMN "start_location";

-- CreateTable
CREATE TABLE "pickup_location" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,

    CONSTRAINT "pickup_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "trip_id" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pickup_location_booking_id_key" ON "pickup_location"("booking_id");

-- AddForeignKey
ALTER TABLE "pickup_location" ADD CONSTRAINT "pickup_location_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;
