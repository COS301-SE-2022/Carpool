-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "booking_date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
