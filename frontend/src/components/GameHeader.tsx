export default function GameHeader({ question, status }) {
  return (
    <div className="p-4 border-b border-gray-800">
      <h2 className="text-xl font-bold">Question</h2>

      <p className="text-green-400 mt-2">{question}</p>

      <p className="text-sm mt-2 text-gray-400">
        Status: {status}
      </p>
    </div>
  );
}