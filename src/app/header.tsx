"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Delete, LogIn, LogOut, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { deleteAccountAction } from "./actions";

function AccountDropDown() {
  const [open, setOpen] = useState(false);
  const session = useSession();
  if (!session.data) return;
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Account and all associated data will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"}>
            <Avatar className="mr-2">
              <AvatarImage src={session.data.user.image ?? undefined} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {session.data?.user.name || "DevFinder"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="mr-2" /> Sign Out
          </DropdownMenuItem>

          <Separator className="mt-1 mb-1" />

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 text-red-500" /> Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <header className="bg-gray-100 py-2 dark:bg-gray-900 rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          className="hover:text-slate-400 dark:hover:text-gray-400"
          href="/"
        >
          DevFinder
        </Link>
        {isLoggedIn && (
          <nav className="flex sm:gap-4 lg:gap-36">
            <Link className="hover:underline" href={"/your-rooms"}>
              Your Rooms
            </Link>
            <Link className="hover:underline" href={"/browse"}>
              Browse
            </Link>
          </nav>
        )}
        <div className="flex items-center gap-4">
          {isLoggedIn && <AccountDropDown />}
          {!isLoggedIn && (
            <Button variant={"link"} onClick={() => signIn()}>
              <LogIn className="mr-2" />
              Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
