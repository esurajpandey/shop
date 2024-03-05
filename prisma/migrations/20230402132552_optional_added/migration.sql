-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_workerId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "workerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
