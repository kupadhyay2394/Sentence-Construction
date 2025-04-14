import React, { useState, useEffect } from 'react';
import CircularScore from './Scoremeter';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch questions
  useEffect(() => {
    axios.get('http://localhost:3001/questions')
      .then(res => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  // Update current question state
  const currentQuestion = questions[index];

  useEffect(() => {
    if (currentQuestion && currentQuestion.correctAnswer) {
      setAnswers(Array(currentQuestion.correctAnswer.length).fill(null));
    }
    setSelectedOptions([]);
    setTimeLeft(30);
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
    const blankIndex = answers.findIndex(ans => ans === null);
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

    if (index < questions.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      handleShowResults();
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const renderQuestionWithBlanks = () => {
    const parts = currentQuestion.question.split('_____________');
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < currentQuestion.correctAnswer.length && (
          <span className="inline-flex flex-col items-center min-w-[100px] mx-1">
            {answers[i] ? (
              <button
                onClick={() => handleBlankClick(i)}
                className="h-[38px] rounded-[8px] border border-gray-300 px-[12px] py-[8px] text-sm whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center"
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
        {questions.map((question, qIndex) => {
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
            <div key={question.questionId} className="mb-6 p-4 rounded-lg text-left shadow-md bg-white">
              <div className='py-4'>
                <div className='flex justify-between'>
                  <p className='border w-fit rounded-xl bg-gray-100 px-2'>Prompt</p>
                  <p>{qIndex + 1}/{questions.length}</p>
                </div>
                <p className="mt-2">Correct: {correctSentence}</p>
              </div>
              <div className='py-4'>
                <p>
                  Your response: {isCorrect ? (
                    <span className='text-green-600 bg-green-100 px-2'>Correct</span>
                  ) : (
                    <span className='text-red-600 bg-red-100 px-2'>Wrong</span>
                  )}
                </p>
                <p>Your Answer: {userSentence}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;

  if (showResults) {
    return (
      <div className='flex justify-center gap-4'>
        <div className="flex flex-col items-center justify-center p-4 text-center border">
          <CircularScore score={score} total={questions.length} />
          {score < questions.length * 0.7 ? (
            <p className="text-xl text-yellow-800 mt-4">
              You got {score}/{questions.length}. Keep practicing to improve!
            </p>
          ) : (
            <p className="text-xl text-green-800 mt-4">
              Great job! You got {score}/{questions.length}.
            </p>
          )}
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
        <div className="flex justify-between items-center w-full max-w-3xl mb-6">
          <div className="text-xl font-semibold">
            Time: 0:{timeLeft.toString().padStart(2, '0')}
          </div>
          <button onClick={() => navigate('/')} className="text-sm text-gray-600 border px-3 py-1 rounded hover:bg-gray-100">
            Quit
          </button>
        </div>

        <div className="flex gap-2 mt-4 justify-center">
          {[...Array(questions.length)].map((_, i) => (
            <div
              key={i}
              className={`h-1 w-10 rounded-full ${i <= index ? 'bg-orange-400' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        <div className="p-6 rounded-xl w-full max-w-3xl text-center mb-8">
          <h2 className="mb-4 text-lg font-medium">
            Select the missing words in the correct order
          </h2>
          <div className="text-lg leading-8">
            {renderQuestionWithBlanks()}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mt-4 mb-8 justify-items-center">
          {currentQuestion.options.map((option, i) => {
            const isSelected = selectedOptions.includes(option);
            return !isSelected ? (
              <button
                key={i}
                onClick={() => handleOptionClick(option)}
                className="h-[38px] rounded-[8px] border border-gray-300 px-[12px] py-[8px] text-sm whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center"
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
            {index === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
}
