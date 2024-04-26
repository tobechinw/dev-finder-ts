import { getRoom } from "@/data-access/rooms";
import { Github } from "lucide-react";
import Link from "next/link";
import { TagList } from "@/components/tags-list";
import VideoCall from "@/components/video-call";
import { unstable_noStore } from "next/cache";
import { Room } from "@prisma/client";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  unstable_noStore();
  const room: Room = (await getRoom(roomId)) as Room;
  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="grid grid-cols-4 min-h-screen gap-3">
      <div className="col-span-3 p-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <VideoCall room={room} />
        </div>
      </div>
      <div className="col-span-1 p-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">{room?.name}</h1>
          {room.githubRepo && (
            <Link
              className="hover:underline flex items-center gap-2 text-sm"
              target="_blank"
              href={room.githubRepo}
            >
              <Github />
              GitHub repo
            </Link>
          )}
          <p className="text-base text-gray-500 dark:text-gray-500">
            {room?.description}
          </p>
          <TagList tags={room.tags.split(",").map((tag) => tag.trim())} />
        </div>
      </div>
    </div>
  );
}

// function splitTags(tags: string) {
//   return tags.split(",").map((tag) => tag.trim());
// }
