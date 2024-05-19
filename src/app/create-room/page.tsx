import React from 'react'
// import CreateRoomForm from './CreateRoomForm'
import { unstable_noStore } from 'next/cache';
import { CreateRoomForm } from './CreateRoomForm';

function page() {

  unstable_noStore();
  return (
    <div className='container mx-auto flex flex-col gap-8 pt-12 pb-24 h-screen'>
        <h1 className='text-5xl font-bold '>Create Room</h1>
        <CreateRoomForm />
    </div>
  )
}

export default page