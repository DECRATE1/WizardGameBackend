-- CreateTable
CREATE TABLE "Lobby" (
    "id" SERIAL NOT NULL,
    "lobbytitle" TEXT NOT NULL,

    CONSTRAINT "Lobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lobby_User" (
    "lobbyuserid" SERIAL NOT NULL,
    "lobbyid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "Lobby_User_pkey" PRIMARY KEY ("lobbyuserid")
);

-- AddForeignKey
ALTER TABLE "Lobby_User" ADD CONSTRAINT "Lobby_User_lobbyid_fkey" FOREIGN KEY ("lobbyid") REFERENCES "Lobby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lobby_User" ADD CONSTRAINT "Lobby_User_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
