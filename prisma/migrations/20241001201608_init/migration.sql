-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'Unknown',

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);
