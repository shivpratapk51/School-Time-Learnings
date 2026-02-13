import React from "react";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useCallback } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LobbyScreen = () => {
  const [emailId, setEmailId] = useState("");
  const [roomId, setRoomId] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { emailId, roomId });
    },
    [emailId, roomId, socket]
  );

  const handleJoinRoom = useCallback((data) => {
    const { emailId, roomId } = data;
    navigate(`/room/${roomId}`);
    
  }, [navigate]);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
        socket.off("room:join", handleJoinRoom);
    }
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="emailId">Email Id</label>
        <input
          type="email"
          id="emailId"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <br />
        <label htmlFor="roomId">Room ID</label>
        <input
          type="text"
          id="roomId"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
