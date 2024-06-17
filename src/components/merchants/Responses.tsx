import React from "react";

type Response = {
  question: string;
  response: string;
  _id: string;
};

type ResponseProps = {
  responses: Response[];
};

const Responses: React.FC<ResponseProps> = ({ responses }) => {
  return (
    <div className="space-y-6">
      {responses.map((response) => (
        <div
          key={response._id}
          className="p-4 border rounded-lg shadow-sm bg-gray-50"
        >
          <h2 className="text-lg font-bold mb-2">{response.question}</h2>
          <p className="text-sm text-gray-500 mb-4">{response.response}</p>
        </div>
      ))}
    </div>
  );
};

export default Responses;
