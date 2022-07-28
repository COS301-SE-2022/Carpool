-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "status" SET DEFAULT E'confirmed';

-- AlterTable
ALTER TABLE "trip" ADD COLUMN     "status" TEXT NOT NULL DEFAULT E'confirmed';
