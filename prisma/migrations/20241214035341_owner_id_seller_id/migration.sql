/*
  Warnings:

  - You are about to drop the column `owner_id` on the `product` table. All the data in the column will be lost.
  - Added the required column `seller_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "owner_id",
ADD COLUMN     "seller_id" INTEGER NOT NULL;
