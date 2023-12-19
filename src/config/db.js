/* eslint-disable import/no-extraneous-dependencies */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
