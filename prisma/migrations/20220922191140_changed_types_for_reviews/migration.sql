/*
  Warnings:

  - Changed the type of `role` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "Role";
