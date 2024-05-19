'use server'

import { db } from "@/db";
import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { create } from "domain";
import { revalidatePath } from "next/cache";
import { createRoom } from "../data-access/rooms";
// import { getSession } from "next-auth/react";

export async function createRoomAction(roomData:Omit<Room,"id" |"userId">) {
  const session=await getSession();
  if(!session){
    throw new Error("You must be logged in to create a room")
  }
const room= await createRoom(roomData,session.user.id);

  revalidatePath("/browse");
  return room;
}

