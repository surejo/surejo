import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
}

type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globlaForPrisma = globalThis as unknown as {
    prisma: prismaClientSingleton | undefined;
}

const prisma = globlaForPrisma.prisma ?? prismaClientSingleton();

export default prisma;