import { Button } from "@/components/ui/button";
import Link from "next/link";

import { getRooms } from "@/data-access/rooms";
import { SearchBar } from "./search-bar";
import { RoomCard } from "./room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { Room } from "@prisma/client";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  unstable_noStore();
  const rooms: Room[] = await getRooms(searchParams.search);
  return (
    <main className="min-h-screen justify-between p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>
      <div className="mb-12">
        <SearchBar />
      </div>
      {rooms.length !== 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {rooms.map((room) => {
            return <RoomCard key={room.id} room={room} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image
            src="/empty.svg"
            width={200}
            height={200}
            alt="No results found"
          />
          <h2 className="text-2xl mb-3">There are no rooms, yet.</h2>
          <Button asChild>
            <Link href={"/create-room"}>Create Room</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
