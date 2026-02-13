import React from "react";
import { useSocket } from "../context/SocketProvider";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

import ReactPlayer from "react-player";

const RoomPage = () => {
  const socket = useSocket();
  const [myStream, setMyStream] = useState(null);
  const [remoteSocketId, setRemoteSocketId] = useState(null);

  const handleUserJoined = useCallback(({ emailId, id }) => {
    console.log(`${emailId} has joined with id ${id}`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setMyStream(stream);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);

  return (
    <div>
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? "connected" : "no one in the room"}</h4>
      {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
      {myStream && (
        <ReactPlayer height="300px" width="500px" url={myStream} playing muted />
      )}
    </div>
  );
};

export default RoomPage;
