import { getRoom } from "@/data-access/rooms";
import { EditRoomForm } from "./edit-room-form";
import { unstable_noStore } from "next/cache";
import { Room } from "@prisma/client";

export default async function EditPage(props: { params: { id: string } }) {
  unstable_noStore();
  const id = props.params.id;
  const room: Room = (await getRoom(id)) as Room;
  if (!room) return <div>Room not found</div>;

  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold">Edit Room</h1>
      <EditRoomForm room={room} />
    </div>
  );
}
