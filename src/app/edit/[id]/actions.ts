"use server";
import { editRoom, getRoom } from "@/data-access/rooms";
import { Room } from "@prisma/client";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room, "userId">) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const room = await getRoom(roomData.id);
  if (!room) {
    throw new Error("Room not found");
  }
  if (room.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }
  await editRoom({ ...roomData, userId: room.userId });
  redirect("/your-rooms");
}
