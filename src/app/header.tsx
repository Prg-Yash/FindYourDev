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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react"
import {  Delete, LogInIcon, LogOut, PictureInPicture2, ScanSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { set } from "zod";
import deleteAccountAction from "./action";
import { toast } from "@/components/ui/use-toast";

function Header() {
    const session=useSession();
    const router=useRouter();
    const [open, setOpen] = useState(false);
    function AccountDropdown(){
      const session=useSession();

    return(
      <>
     <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
                toast({
                  title: "Account deleted",
                  description: "Your account has been successfully deleted.",
                  // status: "success",
                  
                })
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>  
    
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
   
     <DropdownMenuItem onClick={()=>{
      router.push("/browse")
     }}>
        
         <ScanSearch className="mr-2" /> Browse</DropdownMenuItem> 
     <DropdownMenuItem onClick={()=>{
      router.push("/your-rooms")
     }}>
        
         <PictureInPicture2 className="mr-2" /> Your Rooms</DropdownMenuItem> 
     <DropdownMenuItem onClick={()=>signOut(
        {callbackUrl:"/"}
     )}>
        <DropdownMenuSeparator />
        
         <LogOut className="mr-2"/>Sign Out</DropdownMenuItem> 
          <DropdownMenuItem onClick={()=>{
            setOpen(true)
          }}>
       <DropdownMenuSeparator />
        
         <Delete className="mr-2"/>  Delete Account</DropdownMenuItem> 
  </DropdownMenuContent>
</DropdownMenu>
</>
    )
  }

  return (
<header className=" mx-auto dark:bg-gray-900 bg-gray-100 py-2 z-20 relative">
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