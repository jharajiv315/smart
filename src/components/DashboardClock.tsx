import { useState, useEffect } from "react";

export function DashboardClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-right">
      <div className="text-3xl font-bold text-white uppercase tracking-widest font-mono">
        {currentTime.toLocaleTimeString("en-US", { hour12: true })}
      </div>
      <div className="text-lg text-blue-100 font-medium tracking-wide">
        {currentTime.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
    </div>
  );
}
