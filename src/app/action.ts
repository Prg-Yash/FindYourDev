// import { getSession } from "next-auth/react";
'use server'
import { getSession } from "@/lib/auth";
import deleteAccount from "./data-access/users";

export default async function deleteAccountAction() {
  const session=await getSession();
  if(!session){
    throw new Error("You must be logged in to create a room")
  }
await deleteAccount(session.user.id);
}