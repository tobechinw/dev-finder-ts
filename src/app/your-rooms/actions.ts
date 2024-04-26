"use server";

import { Room } from "@prisma/client";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import prisma from "@/prisma/client";

export async function deleteRoom(room: Room) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  if (session.user.id === room.userId) {
    await prisma.room.delete({
      where: {
        id: room.id,
      },
    });
    revalidatePath("/your-rooms");
    revalidatePath("/browse");
  } else {
    throw new Error("Unauthorized");
  }
}
