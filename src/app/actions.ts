"use server";

import { deleteUser } from "@/data-access/users";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function deleteAccountAction() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  await deleteUser(session.user.id);
}
