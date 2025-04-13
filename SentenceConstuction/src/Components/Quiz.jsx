import React, { useState, useEffect, useRef } from 'react';

const questionData = {
    "status": "SUCCESS",
    "data": {
      "testId": "oihq2eo9h1029921-210-20112",
      "questions": [
        {
          "questionId": "b28af948-db8b-465e-92e6-3d42534c4533",
          "question": "The company's _____________ approach to product development _____________ customer feedback at every stage, _____________ user satisfaction and _____________ a loyal consumer base.",
          "questionType": "text",
          "answerType": "options",
          "options": ["Incorporated", "User-centric", "Enhancing", "Cultivating"],
          "correctAnswer": ["User-centric", "Incorporated", "Enhancing", "Cultivating"]
        },
        {
          "questionId": "6e6534ea-260a-4c26-96fd-f830b27601fb",
          "question": "The _____________ musical performance _____________ elements from various genres, _____________ the audience with its unique sound and _____________ critical acclaim from industry experts.",
          "questionType": "text",
          "answerType": "options",
          "options": ["Captivating", "Eclectic", "Garnering", "Blended"],
          "correctAnswer": ["Eclectic", "Blended", "Captivating", "Garnering"]
        },
        {
          "questionId": "7186e3da-0384-460a-af19-5a3984758e78",
          "question": "The scientist's _____________ research on quantum computing _____________ new possibilities for data processing, _____________ traditional limitations and _____________ the way for groundbreaking technological advancements.",
          "questionType": "text",
          "answerType": "options",
          "options": ["Pioneering", "Paving", "Overcoming", "Opened up"],
          "correctAnswer": ["Pioneering", "Opened up", "Overcoming", "Paving"]
        },
        {
          "questionId": "10cbe3c2-13bb-4973-a794-18bf309b0791",
          "question": "The _____________ implementation of machine learning algorithms in medical diagnostics _____________ early detection of diseases, _____________ treatment outcomes and _____________ the workload of healthcare professionals.",
          "questionType": "text",
          "answerType": "options",
          "options": ["Improving", "Reducing", "Enabled", "Revolutionary"],
          "correctAnswer": ["Revolutionary", "Enabled", "Improving", "Reducing"]
        },
        {
          "questionId": "71ffe41e-8732-48e6-87f2-f84ea07eb060",
          "question": "The _____________ security breach at the tech giant _____________ millions of users' data, _____________ concerns about online privacy and _____________ calls for stricter regulations.",
          "questionType": "text",
          "answerType": "options",
          "options": ["Raising", "Massive", "Prompting", "Compromised"],
          "correctAnswer": ["Massive", "Compromised", "Raising", "Prompting"]
        },
        {
          "questionId": "48b9b4bd-5c2c-4c25-92c0-ce453b14e8d7",
          "question": "The _____________ educational reform _____________ a more inclusive curriculum, _____________ equal opportunities for all students and _____________ the overall quality of public schooling.",
          "questionType": "text",
          "answerType": "options",
          "options": ["Comprehensive", "Enhancing", "Implemented", "Promoting"],
          "correctAnswer": ["Comprehensive", "Implemented", "Promoting", "Enhancing"]
        },
        {
          "questionId": "ed5e6e2d-8408-406e-be32-777ac26460e2",
          "question": "The company's _____________ commitment to sustainability _____________ eco-friendly practices across all departments, _____________ its carbon footprint and _____________ a model for corporate responsibility.",
          "questionType": "text",
          "answerType": "options",
          "options": ["Implemented", "Setting", "Unwavering", "Reducing"],
          "correctAnswer": ["Unwavering", "Implemented", "Reducing", "Setting"]
        },
        {
          "questionId": "936eccaa-2f3b-4322-a3d3-ceabf2219dc5",
          "question": "The _____________ implementation of artificial intelligence in healthcare _____________ patient outcomes, _____________ the workload of medical professionals and _____________ new avenues for personalized treatment.",
          "questionType": "text",
          "answerType": "options",
          "options": ["Opening", "Improved", "Gradual", "Reducing"],
          "correctAnswer": ["Gradual", "Improved", "Reducing", "Opening"]
        },
        {
          "questionId": "d78effdf-88ab-4667-8115-3bfb2baa0a24",
          "question": "The _____________ festival _____________ artists from diverse backgrounds, _____________ cultural exchange and _____________ a platform for emerging talents to showcase their work.",
          "questionType": "text",
          "answerType": "options",
          "options": ["Providing", "Brought together", "Promoting", "International"],
          "correctAnswer": ["International", "Brought together", "Promoting", "Providing"]
        },
        {
          "questionId": "2d08ec76-a253-4f34-bc45-e12ef21b78fb",
          "question": "The _____________ implementation of smart city technologies _____________ urban efficiency and sustainability, _____________ quality of life for residents and _____________ a model for future urban development.",
          "questionType": "text",
          "answerType": "options",
          "options": ["Enhancing", "Improved", "Providing", "Widespread"],
          "correctAnswer": ["Widespread", "Improved", "Enhancing", "Providing"]
        }
      ]
    },
    "message": "Questions fetched successfully",
    "activity": {
      "id": "3c576049-9ea9-4b5c-9fb7-4b316adaaaa0",
      "userId": "c6ad08a5-67ac-4a4d-aa3a-16d7fe91d51c",
      "type": "VERSANT_CATEGORY_TEST",
      "coinType": "DEDUCTED",
      "coins": 20,
      "description": "Used Versant Category Test",
      "createdAt": "2025-04-10T06:42:21.041Z"
    }
  };

  export default function Quize3() {
    // Rename to questionRef for clarity
    const questionRef = useRef(questionData.data.questions[0]);
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(3);
    const [total,setTotal]= useState(0);
    const [flag,setFlag]= useState(0);
    // Update the current question whenever index changes
    useEffect(() => {
      questionRef.current = questionData.data.questions[index];
      // Reset answers, selected options, and the timer for the new question
      setAnswers([]);
      setSelectedOptions([]);
      setTimeLeft(3);
    }, [index]);
  
    // Timer effect
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        // When time runs out, check the answer then move on to next question
        checkAnswers();  // implement your own logic here
        // Only advance if there are more questions
        if (index < questionData.data.questions.length - 1) {
          setIndex((prevIndex) => prevIndex + 1);
        } else {
          // Optionally, show results or finish the test if it's the last question.
          setFlag(1)
        }
      }
    }, [timeLeft, index]);
  
    // Update the answers when an option is selected
    const handleOptionClick = (option) => {
      // Ensure that we only select an option if needed and not already selected.
      if (answers.length < questionRef.current.correctAnswer.length && !selectedOptions.includes(option)) {
        setAnswers([...answers, option]);
        setSelectedOptions([...selectedOptions, option]);
      }
    };
  
    // Render the question with blanks by splitting using the placeholder.
    const renderQuestionWithBlanks = () => {
        const parts = questionRef.current.question.split('___________');
      
        return parts.map((part, i) => (
          <span key={i} className="text-lg">
            {part}
            {i < questionRef.current.correctAnswer.length && (
              <span className="relative inline-block min-w-[100px] mx-1">
                {/* If there's an answer selected */}
                {answers[i] ? (
                  <button 
                    onClick={() => alert("worling")}
                    className="px-3 py-1 text-center border-b-2 border-black bg-gray-400"
                  
                  >
                    {answers[i]}
                  </button>
                ) : (
                  // If no answer is selected, show a default "blank" button
                  <button
                    onClick={() => handleAnswerChange(i)}
                    className="px-3 py-1 text-center border-b-2 border-black text-gray-400"
                    style={{
                      textDecoration: 'underline dotted',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    {'__________'}
                  </button>
                )}
              </span>
            )}
          </span>
        ));
      };
    // Example checkAnswers function (compare user answers with correct answers)
    const checkAnswers = () => {
      const isCorrect = answers.length === questionRef.current.correctAnswer.length &&
        answers.every((ans, i) => ans === questionRef.current.correctAnswer[i]);
      (isCorrect ? setTotal((tot)=>tot+1)  : console.log(`not correct marks is${total}`) );
      console.log(`total marks is${total}`);
      
    };
  
    return (
        <div>
         {flag==0 ? (<div className="w-full h-screen flex flex-col justify-center items-center bg-white p-4">
        {/* Timer and Quit */}
        <div className="flex justify-between items-center w-full max-w-3xl mb-4">
          <div className="text-xl font-semibold">0:{timeLeft.toString().padStart(2, '0')}</div>
          <button className="text-sm text-gray-600 border px-3 py-1 rounded hover:bg-gray-100">
            Quit
          </button>
        </div>
  
        {/* Progress bar */}
        <div className="w-full max-w-3xl h-2 bg-gray-200 rounded mb-6 overflow-hidden">
          <div
            className="h-full bg-yellow-400 transition-all duration-1000"
            style={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
          ></div>
        </div>
  
        {/* Question box */}
        <div className="border-2 border-dashed border-blue-400 p-6 rounded-xl w-full max-w-3xl text-center">
          <h2 className="mb-4 text-lg font-medium">Select the missing words in the correct order</h2>
          <div className="text-lg leading-8">{renderQuestionWithBlanks()}</div>
        </div>
  
        {/* Options */}
        <div className="mt-6 grid grid-cols-2 gap-4 max-w-sm">
          {/* Use the current question's options */}
          {questionRef.current.options.map((opt, idx) => (
            <button
              key={idx}
              className={`border rounded-full px-4 py-2 text-base hover:bg-blue-100 ${
                selectedOptions.includes(opt) ? 'bg-gray-300 cursor-not-allowed' : ''
              }`}
              onClick={() => handleOptionClick(opt)}
              disabled={selectedOptions.includes(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
  
        {/* Submit Button */}
        {answers.length === questionRef.current.correctAnswer.length && (
          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={checkAnswers}
          >
            Submit
          </button>
        )}
      </div>): <h1>test completed</h1>}
        
      
      </div>
    );
  }