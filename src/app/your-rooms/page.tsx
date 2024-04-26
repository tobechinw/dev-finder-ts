import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserRooms } from "@/data-access/rooms";
import UserRoomCard from "./your-room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { Room } from "@prisma/client";

export default async function YourRoomsPage() {
  unstable_noStore();
  const rooms: Room[] = await getUserRooms();
  return (
    <main className="min-h-screen justify-between p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Your Rooms</h1>
        <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <UserRoomCard key={room.id} room={room} />;
        })}
      </div>
      {rooms.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image
            src="/empty.svg"
            width={200}
            height={200}
            alt="No results found"
          />
          <h2 className="text-2xl mb-3">
            You have not created any rooms, yet.
          </h2>
          <Button asChild>
            <Link href={"/create-room"}>Create Room</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
