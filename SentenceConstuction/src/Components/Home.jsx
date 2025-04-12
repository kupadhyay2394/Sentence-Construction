import React from "react";
import Vector from '../assets/Vector.png';
import '../App.css';

 function Home(){
    return (
        <>
        <div className="flex justify-end justify-between gap-6">
        <h1>Sentence Construction</h1>
        <div className="flex flex-col text-xs font-bold leading-none">
  <p className="-my-1">.</p>
  <p className="-my-1">.</p>
  <p className="-my-1">.</p>
</div>
        </div>
        




        <div className=" flex flex-cols justify-center">
            
        <div className="flex flex-col  items-center gap-6 p-8 text-center bg-white rounded-xl  w-full max-w-2xl"> 
        
        <img src={Vector} className="p-5"></img>
        <div className="flex-col text-center">
        <h1 className="text-5xl p-3 font-bold">Sentence Construction</h1>
        <p className="text-lg">Select the correct words to complete the sentence by arranging</p><p className="text-lg"> the provided options in the right order.</p>
        </div>
       
        <div className="flex justify-between w-full text-center">
            <div >
                <p>Time Per Question</p>
                <p>30 sec</p>
            </div>
            <div>
                <p>Total Questions</p>
                <p>10</p>
            </div>
            <div>
                <p>Coins</p>
                <p>0</p>
            </div>
        </div>
        <div className="flex gap-5">
            <button className="border border-[rgba(69,63,225,1)] text-black px-4 py-2 rounded">Back</button>
            <button className="bg-[rgba(69,63,225,1)] text-white px-4 py-2 rounded">
                Start
            </button>
        </div>
      
        
        </div>
        </div>
        </>
    )
 }

 export default Home;