import { PrismaClient, Prisma } from "../../prisma/mysql/client";

export const prisma = Prisma;
export const prismaMySql = new PrismaClient();
