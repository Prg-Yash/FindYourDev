
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
export default function deleteAccount(userId: string) {
    return db.delete(users).where(eq(users.id, userId));
    }