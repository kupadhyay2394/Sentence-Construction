import React from "react";

const CircularScore = ({ score }) => {
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 10) * circumference;

  return (
    <div className="relative w-[120px] h-[120px]"> {/* Slightly larger container */}
      <svg height={radius * 2} width={radius * 2} className="mx-auto"> {/* Center SVG */}
        {/* Background circle */}
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke="#2e7d32"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      {/* Centered text */}
      <div className="absolute top-0 left-0 w-full  h-full flex flex-col items-center justify-center text-green-800 font-semibold">
        <div className="text-xl">{score}</div>
        <div className="text-sm">Overall Score</div>
      </div>
    </div>
  );
};

export default CircularScore;