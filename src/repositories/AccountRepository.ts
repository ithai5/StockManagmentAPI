import { Prisma } from '@prisma/client'
import prisma from '../database/PrismaClient'

// Find all accounts:
exports.findAll = async function () {
  return await prisma.account.findMany();
}

// Find all accounts with embedded player obj:
exports.findAllIncludePlayer = async function () {
  return await prisma.account.findMany({
    include: {
      player: true, //returns with player obj of that account
    },
  });
}

// Find Account using Account Id:
exports.findWithId = async function (id: number) {
  return await prisma.account.findUnique({
    where: {accountId: id}
  });
}

module.exports = exports;