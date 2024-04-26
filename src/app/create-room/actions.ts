"use server";

import { createRoom } from "@/data-access/rooms";
import { getSession } from "@/lib/auth";
import { Room } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  await createRoom(roomData, session.user.id);
  revalidatePath("/browse");
  revalidatePath("/your-rooms");
}
