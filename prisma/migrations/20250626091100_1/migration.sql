/*
  Warnings:

  - A unique constraint covering the columns `[lobbyid]` on the table `lobbyuser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userid]` on the table `lobbyuser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "lobbyuser_lobbyid_key" ON "lobbyuser"("lobbyid");

-- CreateIndex
CREATE UNIQUE INDEX "lobbyuser_userid_key" ON "lobbyuser"("userid");
