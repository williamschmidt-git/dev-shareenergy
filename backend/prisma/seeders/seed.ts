import { PrismaClient } from '@prisma/client';
import { HashGenerator } from '../../src/helpers/hash-generator';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { username: 'desafiosharenergy' },
    create: {
      username: 'desafiosharenergy',
      password: 'sh@r3n3rgy',
    },
    update: {},
  });
  console.log({ user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
