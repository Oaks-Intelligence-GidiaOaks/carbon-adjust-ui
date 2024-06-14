import React from "react";

type Question = {
  _id: string;
  title: string;
  questionType: string;
  options?: string[];
};

type QuestionsProps = {
  questions: Question[];
};

const Questions: React.FC<QuestionsProps> = ({ questions }) => {
  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <div
          key={question._id}
          className="p-4 border rounded-lg shadow-sm bg-gray-50"
        >
          <h2 className="text-lg font-bold mb-2">{question.title}</h2>
          <p className="text-sm text-gray-500 mb-4">{question.questionType}</p>
          {question.options && question.options.length > 0 ? (
            <div>
              <p className="font-medium mb-2 text-sm">Options</p>
              <ul className="list-disc list-inside">
                {question.options.map((option, index) => (
                  <li key={index} className="text-gray-700 text-sm">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-700">This question has no options.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Questions;
