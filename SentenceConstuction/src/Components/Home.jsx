import React from "react";
import { useNavigate } from "react-router-dom";
import Vector from '../assets/Vector.png';
import '../App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
  <h1 className="text-center text-xl font-bold">Sentence Construction</h1>
  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col text-xs leading-none">

<div class="flex flex-col items-center justify-center w-6 h-6 gap-[3px] cursor-pointer">
  <span class="w-1 h-1 bg-black rounded-full"></span>
  <span class="w-1 h-1 bg-black rounded-full"></span>
  <span class="w-1 h-1 bg-black rounded-full"></span>
</div>

  </div>
</div>

      <div className="flex flex-cols justify-center ">
        <div className="flex flex-col items-center gap-6 p-8 text-center bg-white rounded-xl w-full max-w-2xl">
          <img src={Vector} className="p-5" alt="Vector" />
          <div className="flex-col text-center">
            <h1 className="text-5xl p-3 font-bold font-[Inter]">Sentence Construction</h1>
            <p className="text-lg font-[Inter] text-[rgba(124,129,129,1)]">Select the correct words to complete the sentence by arranging</p>
            <p className="text-lg font-[Inter] text-[rgba(124,129,129,1)]">the provided options in the right order.</p>
          </div>

          <div className="flex justify-between w-full text-center font-[Inter]">
            <div >
              <p className="font-bold  ">Time Per Question</p>
              <p className="mt-5">30 sec</p>
            </div>
            <div className="w-px h-20 bg-gray-300"></div>

            <div>
              <p className="font-bold">Total Questions</p>
              <p className="mt-5">10</p>
            </div>
            <div className="w-px h-20 bg-gray-300"></div>

            <div>
              <p className="font-bold">Coins</p>
              <p className="mt-5">0</p>
            </div>
          </div>

          <div className="flex gap-5">
            <button className="border border-[rgba(69,63,225,1)] text-black px-4 py-2 rounded">Back</button>
            <button
              className="bg-[rgba(69,63,225,1)] text-white px-4 py-2 rounded"
              onClick={() => navigate("/quize")}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
