/*
  Warnings:

  - You are about to drop the `trips` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_user_id_fkey";

-- DropTable
DROP TABLE "trips";

-- CreateTable
CREATE TABLE "trip" (
    "trip_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "trip_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seats_available" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "start_location" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "trip_pkey" PRIMARY KEY ("trip_id")
);

-- AddForeignKey
ALTER TABLE "trip" ADD CONSTRAINT "trip_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;
