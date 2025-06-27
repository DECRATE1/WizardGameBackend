/*
  Warnings:

  - You are about to drop the `Lobby_User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lobby_User" DROP CONSTRAINT "Lobby_User_lobbyid_fkey";

-- DropForeignKey
ALTER TABLE "Lobby_User" DROP CONSTRAINT "Lobby_User_userid_fkey";

-- DropTable
DROP TABLE "Lobby_User";

-- CreateTable
CREATE TABLE "lobbyuser" (
    "lobbyuserid" SERIAL NOT NULL,
    "lobbyid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "lobbyuser_pkey" PRIMARY KEY ("lobbyuserid")
);

-- AddForeignKey
ALTER TABLE "lobbyuser" ADD CONSTRAINT "lobbyuser_lobbyid_fkey" FOREIGN KEY ("lobbyid") REFERENCES "Lobby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lobbyuser" ADD CONSTRAINT "lobbyuser_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
