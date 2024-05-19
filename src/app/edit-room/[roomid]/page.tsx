
import { getRoom } from '@/app/data-access/rooms';
// import EditRoomForm from './EditRoomForm'
import { unstable_noStore } from 'next/cache';

import { EditRoomForm } from './EditRoomForm';
// import { CloudLightning } from 'lucide-react';
// import { getRoom } from '@/app/data-access/rooms'
// import { EditRoomForm } from './EditRoomForm
// import CreateRoomForm, { EditRoomForm } from './EditRoomForm'
// import CreateRoomForm from '/CreateRoomForm'



export default async function EditRoomPage({
  params,
}: {
  params: { roomid: string };
}) {
  unstable_noStore();
  const room = await getRoom(params.roomid);

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold">Edit Room</h1>

      <EditRoomForm room={room} />
    </div>
  );
}