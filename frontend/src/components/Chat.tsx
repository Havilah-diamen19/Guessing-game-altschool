export default function QuestionBox({ question }) {
  return (
    <div className="p-4">
      <h3 className="text-lg">Solve this:</h3>
      <p className="text-green-300 text-xl mt-2">
        {question}
      </p>
    </div>
  );
}