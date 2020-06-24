import React, { useState, useEffect, useRef } from "react";
import { intervalToDuration, isBefore } from "date-fns";
// import { Container } from './styles';

function DisplayDate({ date = new Date() }) {
  const [displayDate, setDisplayDate] = useState(date);

  // Criando hook de tick
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    });

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

  const calcIntervalDate = (startDate, endDate) => {
    if (isBefore(endDate, startDate)) {
      return {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return intervalToDuration({ start: startDate, end: endDate });
  };

  useInterval(() => {
    setDisplayDate(calcIntervalDate(new Date(), new Date(date)));
  }, 1000);

  return (
    <div>{`years: ${displayDate.years} / months: ${displayDate.months} / days: ${displayDate.days} / hours: ${displayDate.hours} / minutes: ${displayDate.minutes} / seconds: ${displayDate.seconds} `}</div>
  );
}

export default DisplayDate;
