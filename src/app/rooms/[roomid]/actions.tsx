'use server'

import { getSession } from "@/lib/auth";
// import { get } from "http";
import { StreamChat } from 'stream-chat';

export async function generateTokenAction() {
    const session=await getSession();
    if(!session){
        throw new Error("Unauthenticated")
    }
const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
const api_secret = process.env.NEXT_PUBLIC_GET_STREAM_API_SECRET!;

const serverClient = StreamChat.getInstance( api_key, api_secret);
// Create User Token
const token = serverClient.createToken(session.user.id); 
return token;
}