import { useState } from "react";
import { socket } from "../socket/socket";
import { useGameStore } from "../store/game.store";

export default function Lobby() {
  const [username, setUsername] = useState("");
  const [sessionId, setSessionIdInput] = useState("");

  const setSession = useGameStore((s) => s.setSession);

  const createSession = () => {
    socket.connect();

    socket.emit("create_session", { username });

    socket.on("session_update", (session) => {
      setSession(session.id);
    });
  };

  const joinSession = () => {
    socket.connect();

    socket.emit("join_session", {
      username,
      sessionId,
    });

    setSession(sessionId);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-96 space-y-4">
        <h1 className="text-2xl font-bold">Guessing Game 🎮</h1>

        <input
          className="w-full p-2 text-black"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          className="w-full bg-green-600 p-2"
          onClick={createSession}
        >
          Create Game
        </button>

        <input
          className="w-full p-2 text-black"
          placeholder="Session ID"
          onChange={(e) => setSessionIdInput(e.target.value)}
        />

        <button className="w-full bg-blue-600 p-2" onClick={joinSession}>
          Join Game
        </button>
      </div>
    </div>
  );
}