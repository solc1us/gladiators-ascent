-- CreateTable
CREATE TABLE "Gladiator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "kills" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Alive',
    "isPlayer" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Gladiator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gladiator_name_key" ON "Gladiator"("name");

-- Enforce the API's case-insensitive name uniqueness, including concurrent writes.
CREATE UNIQUE INDEX "Gladiator_name_insensitive_key" ON "Gladiator"(lower("name"));
