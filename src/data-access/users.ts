import prisma from "@/prisma/client";

export async function deleteUser(userId: string) {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}
