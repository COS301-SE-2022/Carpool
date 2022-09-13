-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "reviewed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "trip" ADD COLUMN     "reviewed" BOOLEAN NOT NULL DEFAULT false;
