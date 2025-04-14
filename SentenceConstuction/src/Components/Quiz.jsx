import React, { useState, useEffect, useRef } from 'react';
import CircularScore from './Scoremeter';
import { useNavigate } from 'react-router-dom';

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
  "message": "Questions fetched successfully"
};

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [timerActive, setTimerActive] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questionData.data.questions[index];
  const navigate= useNavigate();

  useEffect(() => {
    setAnswers(Array(currentQuestion.correctAnswer.length).fill(null));
    setSelectedOptions([]);
    setTimeLeft(5);
    setTimerActive(true);
  }, [index, currentQuestion]);


  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timerActive && timeLeft === 0) {
      handleQuestionTransition();
    }
  }, [timeLeft, timerActive]);

  const handleOptionClick = (option) => {
    const blankIndex = answers.findIndex(ans => !ans);
    if (blankIndex !== -1) {
      const newAnswers = [...answers];
      newAnswers[blankIndex] = option;
      setAnswers(newAnswers);
      setSelectedOptions(prev => [...prev, option]);
    }
  };

  const handleBlankClick = (blankIndex) => {
    const newAnswers = [...answers];
    const removedOption = newAnswers[blankIndex];
    newAnswers[blankIndex] = null;
    setAnswers(newAnswers);
    setSelectedOptions(prev => prev.filter(opt => opt !== removedOption));
  };

  const checkAnswers = () => {
    if (answers.length === currentQuestion.correctAnswer.length) {
      const isCorrect = answers.every((ans, i) => ans === currentQuestion.correctAnswer[i]);
      setSelectedArray(prev => [...prev, answers]);
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
    }
  };

  const handleQuestionTransition = () => {
    checkAnswers();
    setTimerActive(false);
    
    if (index < questionData.data.questions.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      handleShowResults()
    }
  };



  const handleShowResults = () => {
    setShowResults(true);
  };

  const renderQuestionWithBlanks = () => {
    const parts = currentQuestion.question.split('_____________');
    return parts.map((part, i) => (
      <span key={i} >
        {part}
        {i < currentQuestion.correctAnswer.length && (
          <span className="inline-flex flex-col items-center min-w-[100px] mx-1">
            {answers[i] ? (
              <button 
                onClick={() => handleBlankClick(i)} 
                className="-[38px] rounded-[8px] border border-gray-300 px-[12px] py-[8px] text-sm whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center"
              >
                {answers[i]}
              </button>
            ) : (
              <button 
                className="w-[78px] h-[38px] text-sm whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center text-white" 
              
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

  const renderResults = () => {
    return (
      <div className="w-full max-w-3xl">
        {questionData.data.questions.map((question, qIndex) => {
          const userAnswers = selectedArray[qIndex] || [];
          const parts = question.question.split('_____________');
          
          const correctSentence = parts.reduce((acc, part, i) => {
            return acc + part + (i < question.correctAnswer.length ? question.correctAnswer[i] : '');
          }, '');
          
          const userSentence = parts.reduce((acc, part, i) => {
            return acc + part + (i < question.correctAnswer.length ? (userAnswers[i] || '__________') : '');
          }, '');

          const isCorrect = userAnswers.length === question.correctAnswer.length && 
                           userAnswers.every((ans, i) => ans === question.correctAnswer[i]);

          return (
            <div key={question.questionId} className="mb-6  p-4 rounded-lg text-left shadow-md bg-white ;
 ">
   <div className='py-4'>
    <div className='flex justify-between'><p className='border w-fit rounded-xl bg-gray-100'>Prompt</p>
    <p>{qIndex+1}/10</p></div>
   <p className=" mt-2">Correct: {correctSentence}</p></div>
   <div className='py-4'><p>
    Your response: {isCorrect ? (
      <span className='text-green-600 bg-green-100'>Correct</span>
    ) : (
      <span className='text-red-600 bg-red-100' >Wrong</span>
    )}
  </p>
  <p>Your Answer: {userSentence}</p></div>
  
  
</div>
          );
        })}
      </div>
    );
  };

  if (showResults) {
    return (
      <div className='flex justify-center gap-4'>
       
        <div className="flex flex-col  items-center  justify-center  p-4 text-center border">
      <CircularScore score={score} total={questionData.data.questions.length} />
      <p className="text-xl  ">
        While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness. Review your responses below for more details.
      </p>
      {renderResults()}
    </div>
        </div>
      
      
    
    );
  }
  const allBlanksFilled = answers.every(answer => answer !== null);
  const noOptionsLeft = currentQuestion.options.length === selectedOptions.length;



  return (
    <div className='flex justify-around'>
    <div className="flex flex-col justify-between items-center p-4 mx-auto mt-10 rounded-md shadow-lg min-h-screen w-full max-w-4xl">
      <div className="flex justify-between items-center w-full max-w-3xl mb-6  ">
        <div className="text-xl font-semibold">
          Time: 0:{timeLeft.toString().padStart(2, '0')}
        </div>
       
        <button onClick={()=>navigate('/')} className="text-sm text-gray-600 border px-3 py-1 rounded hover:bg-gray-100">
          Quit
        </button>
      </div>
      <div className="flex gap-2 mt-4 justify-center ">
      {[...Array(10)].map((_, i) => (
    <div
      key={i}
      className={`h-1 w-10 rounded-full ${
        i <= index ? 'bg-orange-400' : 'bg-gray-200'
      }`}
    />
  ))}
      </div>

      <div className="  p-6 rounded-xl w-full max-w-3xl text-center mb-8 ">
        <h2 className="mb-4 text-lg font-medium">
          Select the missing words in the correct order
        </h2>
        <div className="text-lg leading-8 ">
          {renderQuestionWithBlanks()}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-4 mb-8 justify-items-center ">
  {currentQuestion.options.map((option, i) => {
    const isSelected = selectedOptions.includes(option);
    return !isSelected ? (
      <button
        key={i}
        onClick={() => handleOptionClick(option)}
        className=" h-[38px] rounded-[8px] border border-gray-300 px-[12px] py-[8px] text-sm whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center"
      >
        {option}
      </button>
    ) : null;
  })}
</div>




{(allBlanksFilled || noOptionsLeft) && (
          <button 
            onClick={handleQuestionTransition}
            className="bg-[rgba(69,63,225,1)] text-white rounded font-bold px-4 py-2"
          >
            {index === questionData.data.questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        )}

      

      
       
    </div>
    </div>
  );
}