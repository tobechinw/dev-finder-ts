import { getSession } from "@/lib/auth";
import { Room } from "@prisma/client";

import prisma from "@/prisma/client";

export async function getRooms(search: string | undefined) {
  const where = { name: { contains: search } } || {};
  const rooms = await prisma.room.findMany({
    where,
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
  return room;
}

export async function getUserRooms() {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  const userRooms = await prisma.room.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return userRooms;
}

export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: string
) {
  await prisma.room.create({
    data: {
      ...roomData,
      userId,
    },
  });
}

export async function editRoom(roomData: Room) {
  await prisma.room.update({
    where: {
      id: roomData.id,
    },
    data: {
      name: roomData.name,
      description: roomData.description,
      tags: roomData.tags,
    },
  });
}

export async function deleteRoom(roomId: string) {
  await prisma.room.delete({
    where: {
      id: roomId,
    },
  });
}
