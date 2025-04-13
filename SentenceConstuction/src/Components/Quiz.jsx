import React, { useState, useEffect, useRef } from 'react';
import CircularScore from './Scoremeter';

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
          "questionId": "d78effdf-88ab-4667-813-3bfb2baa0a24",
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

  export default function Quize() {
  const questionRef = useRef(questionData.data.questions[0]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]); 
  const [selectedArray, setSelectedArray] = useState([]);
  const [sum,setSum]=useState(0);
  


  const [timeLeft, setTimeLeft] = useState(10);
  const [total, setTotal] = useState(0);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    questionRef.current = questionData.data.questions[index];
    setAnswers(Array(questionRef.current.correctAnswer.length).fill(null));
    setSelectedOptions([]);
    setTimeLeft(10); // Reset the timer to 3 seconds for the new question
  }, [index]);
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prevTime) => prevTime - 1), 1000); // Use the previous state for safety
      return () => clearTimeout(timer); // Cleanup the timer on each render
    } else {
      checkAnswers();
      console.log(`index is ${index} and length is ${questionData.data.questions.length - 1}`);
      
      if (index < questionData.data.questions.length - 1) {
        setIndex((prevIndex) => prevIndex + 1); // Go to the next question
      } else {
        console.log("flag");
        setFlag(1); // Set flag to indicate the end of the quiz
      }
    }
  }, [timeLeft]);
  

  const handleOptionClick = (option, index) => {
    // Fill first empty blank
    const blankIndex = answers.findIndex((ans) => !ans);
    if (blankIndex !== -1) {
      const newAnswers = [...answers];
      newAnswers[blankIndex] = option;
      setAnswers(newAnswers);
      setSelectedOptions([...selectedOptions, option]); // track selected
    }
  };
  

  const handleBlankClick = (index) => {
    const newAnswers = [...answers];
    const removed = newAnswers[index];
    newAnswers[index] = null;
    setAnswers(newAnswers);
    setSelectedOptions(selectedOptions.filter((opt) => opt !== removed)); // remove from selected
  };
  

  const renderQuestionWithBlanks = () => {
    const parts = questionRef.current.question.split('_____________');
    return parts.map((part, i) => (
      <span key={i} className="text-lg">
        {part}
        {i < questionRef.current.correctAnswer.length && (
          <span className="inline-flex flex-col items-center min-w-[100px] mx-1">
            {answers[i] ? (
              <button
                onClick={() => handleBlankClick(i)}
                className="bg-grey-500, border"
              >
                {answers[i]} 
              </button>
            ) : (
              <button
                className="px-3 py-1 text-center text-gray-400"
                style={{
                  textDecoration: 'underline dotted',
                  textUnderlineOffset: '3px',
                }}
              >
                {'__________'}
              </button>
            )}
         
            <div className="w-full h-[1px] bg-black mt-1" />
          </span>
        )}
      </span>
    ));
  };
  
  

  const checkAnswers = () => {
    setSelectedArray(prevArray => [...prevArray,[ answers]]);

    console.log(`araris::${selectedArray[0]}`);
    
    const isCorrect =
      answers.length === questionRef.current.correctAnswer.length &&
      answers.every((ans, i) => ans === questionRef.current.options[i]);

    if (isCorrect) {
      setTotal((tot) => tot + 1);
    } else {
      console.log(`Incorrect. Current score: ${total}`);
    }
  };




  function completeSentence(ques, userAnswers, setSum) {
    const parts = ques.question.split('_____________');
  
    // Construct the correct sentence
    const correctSentence = parts.reduce((acc, part, i) => {
      acc += part;
      if (i < ques.correctAnswer.length) {
        acc += <strong>{ques.correctAnswer[i]}</strong>;
      }
      return acc;
    }, []);
  
    // Construct the user's sentence
    const userSentence = parts.reduce((acc, part, i) => {
      acc += part;
      if (i < userAnswers.length) {
        acc += <strong>{userAnswers[i]}</strong>;
      }
      return acc;
    }, []);
  
    // Update score if user's sentence is correct
    const fullCorrectText = parts.reduce((acc, part, i) => {
      acc += part;
      if (i < ques.correctAnswer.length) {
        acc += ques.correctAnswer[i];
      }
      return acc;
    }, '');
  
    const fullUserText = parts.reduce((acc, part, i) => {
      acc += part;
      if (i < userAnswers.length) {
        acc += userAnswers[i];
      }
      return acc;
    }, '');
  
    if (fullCorrectText === fullUserText) {
      setSum((prev) => prev + 1);
    }
  
    return (
      <div key={ques.questionId} className="mb-6 border p-3 rounded">
        <p><strong>Correct:</strong> {correctSentence}</p>
        <p><strong>Your Answer:</strong> {userSentence}</p>
      </div>
    );
  }
  
  

  return (
    <div>
      {flag === 0 ? (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-white p-4">
          <div className="flex justify-between items-center w-full max-w-3xl mb-4">
            <div className="text-xl font-semibold">0:{timeLeft.toString().padStart(2, '0')}</div>
            <button className="text-sm text-gray-600 border px-3 py-1 rounded hover:bg-gray-100">
              Quit
            </button>
          </div>

          <div className="w-full max-w-3xl h-2 bg-gray-200 rounded mb-6 overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-1000"
              style={{ width: `${((3 - timeLeft) / 3) * 100}%` }}
            ></div>
          </div>

          <div className="border-2 border-dashed border-blue-400 p-6 rounded-xl w-full max-w-3xl text-center">
  <h2 className="mb-4 text-lg font-medium">Select the missing words in the correct order</h2>
  <div className="text-lg leading-8">{renderQuestionWithBlanks()}</div>
</div>

{/* Render the options */}
<div className="flex flex-wrap gap-2 mt-4">
  {questionRef.current.options.map((option, i) => {
    // Check if the option is already selected
    const isSelected = selectedOptions.includes(option);
    return !isSelected ? (
      <button
        key={i}
        onClick={() => handleOptionClick(option, i)}
        className="bg-grey-500, border"
      >
        {option}
      </button>
    ) : null;
  })}
</div>
{index + 1 < questionData.data.questions.length-1 ? (
  <button onClick={() => setFlag(1)}  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
    NEXT
  </button>
) : (
  console.log('Button is not displayed yet')
)}




         
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
           {/* <CircularScore score={total} />
             */}

          <p className="text-xl">Your score: {total} / {questionData.data.questions.length}</p>
          {questionData.data.questions.map((ques, ind) =>
          completeSentence(ques, selectedArray[ind] || [])
          )}

          
          
        </div>
      )}
    </div>
  );
}