'use server'

import { editRoom, getRoom } from "@/app/data-access/rooms";
// import { db } from "@/db";
import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// import { getSession } from "next-auth/react";

export async function editRoomAction(roomData:Omit<Room,"userId">) {
  const session=await getSession();
  if(!session){
    throw new Error("You must be logged in to create a room")
  }
  const room = await getRoom(roomData.id);
    if (room?.userId !== session.user.id) {
        throw new Error("You are not authorized to delete this room");
    }
await editRoom({...roomData,userId:room.userId});

  revalidatePath("/your-rooms");
  revalidatePath(`/edit-room/${roomData.id}`);
 redirect("/your-rooms");
}

