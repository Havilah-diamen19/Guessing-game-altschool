export default function PlayersList({ players }) {
  return (
    <div className="p-4 border-r border-gray-800 w-1/4">
      <h2 className="font-bold mb-4">Players</h2>

      {players.map((p) => (
        <div key={p.id} className="mb-3">
          <p className="font-semibold">{p.username}</p>

          <small className="text-gray-400">
            Score: {p.score} | Attempts: {p.attempts}
          </small>

          {p.isGameMaster && (
            <span className="text-yellow-400 text-xs ml-2">
              GM
            </span>
          )}
        </div>
      ))}
    </div>
  );
}