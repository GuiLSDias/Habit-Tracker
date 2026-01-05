-- AlterEnum
ALTER TYPE "Frequency" ADD VALUE 'MONTHLY';

-- AlterTable
ALTER TABLE "Habit" ALTER COLUMN "frequency" DROP NOT NULL;
