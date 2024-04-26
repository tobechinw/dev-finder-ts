"use client";

import {
  Call,
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Room } from "@/db/schema";

const apiKey = process.env.GETSTREAM_API_KEY!; // the API key can be found in the "Credentials" section
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTUzZmUyZGEtMjg4ZS00ZTY2LTlmYzQtY2UwMmJlMmUwZTBhIn0.fRjTJ0RFtzR4M-kiiEIOc29UOCsXpNBHR4naAXsmvgQ"; // the token can be found in the "Credentials" section

export default function VideoCall({ room }: { room: Room }) {
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    if (!session.data) return;
    if (!room) return;

    const user: User = {
      id: session.data.user.id,
      name: session.data.user.name!,
      image: session.data.user.image!,
    };
    const client = new StreamVideoClient({ apiKey, user, token });
    setClient(client);
    const call = client.call("default", room.id);
    call.join({ create: true });
    setCall(call);
    return () => {
      call.leave();
      client.disconnectUser();
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

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};
