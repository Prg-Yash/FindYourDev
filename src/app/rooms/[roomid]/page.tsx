import { getRoom } from "@/app/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import  { TagsList } from "@/components/TagsList";
import { FindYourDevVP } from "./video-player";
import { splitTags } from "@/lib/utils";
// import { TagsList } from "@/components/TagsList";


export default async function page(props : {params: {roomid: string}}) {
  // console.log(props);
  const roomId=props.params.roomid;
  // console.log(roomId)
  const room= await getRoom(roomId);
  // console.log(room);
   
 // console.log(tags)
   
  if(!room){
    return <div>Room not found</div>
  }
  return (

    <div className=" grid grid-cols-4 min-h-screen"> 
    <div className="col-span-3 p-4 pr-2">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">

      <FindYourDevVP room={room} />
      </div>
      </div>
    <div className="p-4 pl-2 col-span-1">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">

      <h1 className="text-base">

      {room?.name}
      </h1>
        {room?.githubRepo && (
      <Link href={room.githubRepo} className="flex items-center text-sm gap-2" target="_blank "
      rel="noopener noreferrer"
      >
        <GithubIcon/>
        Github Project
        </Link>
    )

    }
      <p className="text-base">
        {room?.description}
      </p>
<TagsList tags={splitTags(room.tags)}/>



     
      </div>
    </div>
    </div>
    
  )
}
