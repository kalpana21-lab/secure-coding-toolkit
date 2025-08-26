import React from 'react';

interface QuestionPreviewProps {
  question: { _id: string; prompt: string; options: string[] };
  index: number;
  selectedOption: string | null;
  onSelect: (option: string) => void;
  onFeedback: (type: string) => void;
}
const QuestionPreview: React.FC<QuestionPreviewProps> = ({
    question,
    index,
    selectedOption,
    onSelect,
}) => {
    return (
        <div className="question-block">
            <h4>Question {index + 1}</h4>
            <p>{question.prompt}</p>
            {question.options.map((opt, i) => (
                <label key={i}>
                    <input
                        type="radio"
                        name={`q-${index}`}
                        value={opt}
                        checked={selectedOption === opt}
                        onChange={() => onSelect(opt)}
                    />
                    <button onClick={() => onFeedback('confusing')}>
                        Mark as Confusing
                    </button>
                    {opt}
                </label>

            ))}
        </div>
    );
};

export default QuestionPreview;