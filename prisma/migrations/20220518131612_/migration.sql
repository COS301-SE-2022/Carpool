/*
  Warnings:

  - You are about to drop the column `category` on the `trip` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `trip` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `trip` table. All the data in the column will be lost.
  - Added the required column `driver_id` to the `trip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trip" DROP CONSTRAINT "trip_user_id_fkey";

-- AlterTable
ALTER TABLE "trip" DROP COLUMN "category",
DROP COLUMN "status",
DROP COLUMN "user_id",
ADD COLUMN     "driver_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "trip" ADD CONSTRAINT "trip_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
