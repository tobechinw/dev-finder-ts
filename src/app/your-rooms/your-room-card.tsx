"use client";
import { TagList } from "@/components/tags-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { Github, Pencil, TrashIcon } from "lucide-react";
import Link from "next/link";
import { deleteRoom } from "./actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

const UserRoomCard = ({ room }: { room: Room }) => {
  return (
    <Card className="mb-8 hover:shadow-lg">
      <CardHeader className="relative">
        <Button size={"icon"} className="absolute top-2 right-2">
          <Link href={`/edit/${room.id}`}>
            <Pencil />
          </Link>
        </Button>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagList tags={room.tags.split(",")} />
        {room.githubRepo && (
          <Link
            className="flex items-center gap-2 mb-2"
            target="_blank"
            href={room.githubRepo}
          >
            <Github />
            GitHub repo
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>
              <TrashIcon className="mr-2" size={20} />
              Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteRoom(room);
                  toast({
                    title: "Room Deleted",
                    description: "Room deletion successful",
                    variant: "destructive",
                  });
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default UserRoomCard;
