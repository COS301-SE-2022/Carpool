/*
  Warnings:

  - A unique constraint covering the columns `[booking_id]` on the table `pickup_location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pickup_location_booking_id_key" ON "pickup_location"("booking_id");
