import { useEffect, useState } from "react";

const useTimer = (initialTime: number) => {
  const [seconds, setSeconds] = useState(initialTime);

  useEffect(() => {
    let interval: number;

    if (seconds > 0) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const start = () => setSeconds(initialTime);

  return {
    minutes,
    remainingSeconds,
    isFinished: seconds <= 0,
    start,
  };
};

export default useTimer;
