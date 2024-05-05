// import React from 'react'
'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react"
import {  LogInIcon, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Header() {
    const session=useSession();
    
    function AccountDropdown(){
      const session=useSession();

    return(
        <DropdownMenu>
  <DropdownMenuTrigger asChild> 
  <Button variant={"link"}>
    <Avatar className="mr-2">
  <AvatarImage src={session.data?.user?.image ??""} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

   { session.data?.user?.name}

  </Button>
   </DropdownMenuTrigger>
  <DropdownMenuContent>
   
     <DropdownMenuItem onClick={()=>signOut(
        {callbackUrl:"/"}
     )}>
        
         <LogOut className="mr-2"/>Sign Out</DropdownMenuItem> 
  </DropdownMenuContent>
</DropdownMenu>

    )
  }

  return (
<header className=" mx-auto dark:bg-gray-900 bg-gray-100 py-2">
    <div className=" container flex justify-between items-center">
    
        <Link href="/" className="flex gap-2 items-center text-xl hover:underline">
       <Image src="/logo.png"
       width="60"
         height="60"
            alt="logo"
       />
       FindYourDev
        </Link>
    
    <div className=" flex items-center gap-2 ">
        {session.data &&<AccountDropdown/>
        }
        {!session.data && 
        (
          <Button onClick={()=>signIn()} variant={"link"}>
          <LogInIcon className="mr-2"/>
          
          Sign In</Button>

)      }

        <ModeToggle/>

    </div>
        </div>
</header>
  )
}

export default Header