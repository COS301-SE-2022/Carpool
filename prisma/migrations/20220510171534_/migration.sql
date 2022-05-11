/*
  Warnings:

  - Made the column `profile_pic` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "profile_pic" SET NOT NULL;
