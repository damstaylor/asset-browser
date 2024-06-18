"use client";

interface BusinessQuestionsProps {
  questions: string[];
}

const BusinessQuestions: React.FC<BusinessQuestionsProps> = ({
  questions = [],
}) => {
  return (
    <div className="w-full">
      <h4>Business Questions</h4>
      <div className="grid grid-cols-2">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="flex flex-col m-2 p-2 rounded hover:bg-slate-100 hover:cursor-pointer"
          >
            <strong>Question {idx + 1}</strong>
            <p>{q}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessQuestions;
