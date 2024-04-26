"use client";

import { generateToken } from "@/app/rooms/[roomId]/actions";
import { Room } from "@/db/schema";
import {
  Call,
  CallControls,
  CallingState,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!; // the API key can be found in the "Credentials" section

export default function VideoCall({ room }: { room: Room }) {
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  useEffect(() => {
    if (!session.data) return;
    if (!room) return;
    const { id, name, image } = session.data.user;
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: id,
        name: name ?? "Unknown",
        image: image ?? undefined,
      },
      tokenProvider: () => generateToken(),
    });
    const call = client.call("default", room.id);
    call.join({ create: true });
    setClient(client);
    setCall(call);

    return () => {
      call
        .leave()
        .then(() => client.disconnectUser())
        .catch(console.error);
    };
  }, [session, room]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout />
        </StreamCall>
      </StreamVideo>
    )
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls
        onLeave={() => {
          router.push("/browse");
        }}
      />
      <CallParticipantsList onClose={() => undefined} />
    </StreamTheme>
  );
};
