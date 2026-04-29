import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { useGameStore } from "../store/game.store";

export default function GameRoom() {
  const {
    sessionId,
    players,
    question,
    status,
    setPlayers,
    setQuestion,
    setStatus,
  } = useGameStore();

  const [guess, setGuess] = useState("");

  useEffect(() => {
    socket.on("session_update", (data) => {
      setPlayers(data.players || []);
    });

    socket.on("game_started", (data) => {
      setQuestion(data.question);
      setStatus("in-progress");
    });

    socket.on("guess_result", (data) => {
      console.log("Guess result:", data);
    });

    socket.on("game_ended", (data) => {
      setStatus("ended");
      alert(
        data.winner
          ? `Winner: ${data.winner.username}`
          : `No winner. Answer: ${data.answer}`
      );
    });

    return () => {
      socket.off();
    };
  }, []);

  const sendGuess = () => {
    socket.emit("submit_guess", {
      sessionId,
      guess,
    });

    setGuess("");
  };

  return (
    <div className="h-screen flex bg-gray-950 text-white">
      {/* LEFT: PLAYERS */}
      <div className="w-1/4 border-r border-gray-800 p-4">
        <h2 className="font-bold mb-2">Players</h2>

        {players.map((p) => (
          <div key={p.id} className="mb-2">
            <p>{p.username}</p>
            <small>
              Score: {p.score} | Attempts: {p.attempts}
            </small>
          </div>
        ))}
      </div>

      {/* CENTER: GAME */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl">Question</h2>
          <p className="text-green-400">{question}</p>

          <p className="text-sm mt-2">Status: {status}</p>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 p-4 overflow-y-auto">
          <p className="text-gray-400">
            Game messages will appear here...
          </p>
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-gray-800 flex gap-2">
          <input
            className="flex-1 p-2 text-black"
            value={guess}
            placeholder="Enter your guess..."
            onChange={(e) => setGuess(e.target.value)}
          />

          <button
            onClick={sendGuess}
            className="bg-purple-600 px-4"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}