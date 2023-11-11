"use client";

import { Server } from "@prisma/client";
import DeleteModal from "@/components/Modals/DeleteModal";
import ServerPatchModal from "./ServerPatchModal";

interface IServerCard {
  server: Server;
  removeServer: Function;
  editServer: Function;
}

export default function ServerCard(serverCardProps: IServerCard) {
  const { server, removeServer, editServer } = serverCardProps;

  return (
    <div className="flex gap-3 rounded-lg bg-secondary p-4 relative max-w-[600px]">
      <label className="text-center absolute right-1/2 translate-x-1/2 truncate w-[50%]">
        <span className="text-lg ">{server.name}</span>
      </label>
      <div className={"flex max-sm:items-end"}>
        <div className="bg-background h-[100px] w-[100px] rounded-md p-5 aspect-square">
          {server.imageUri && (
            <img src={server.imageUri} alt="" className="w-full h-full" />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="justify-end flex-1 items-end flex gap-2">
          <div className="flex gap-3 flex-1 items-center w-14">
            <label className="items-end flex-1  bg-primary p-3 rounded-md truncate">
              <span className="font-mono">{server.ip}</span>
            </label>
          </div>
          <div className="flex gap-2 max-sm:flex-col">
            <ServerPatchModal callback={editServer} server={server} />
            <DeleteModal
              action={`/api/servers/${server.id}`}
              callback={removeServer}
              header={"Deleting a Server"}
              text={`All products connected to this server will be removed!`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
