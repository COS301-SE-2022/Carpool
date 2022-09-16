/*
  Warnings:

  - You are about to drop the `chat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_user_one_fkey";

-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_user_two_fkey";

-- DropTable
DROP TABLE "chat";
