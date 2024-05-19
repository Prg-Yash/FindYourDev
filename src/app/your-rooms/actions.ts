
'use server'

import { getSession } from "@/lib/auth";
import { deleteRoom, getRoom } from "../data-access/rooms";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function deleteRoomAction(roomId: string) {
unstable_noStore();
 const session = await getSession();
    if (!session) {
        throw new Error("User not authenticated");
    }
    const room = await getRoom(roomId);
    if (room?.userId !== session.user.id) {
        throw new Error("You are not authorized to delete this room");
    }
    await deleteRoom(roomId);
    revalidatePath("/your-rooms");
}