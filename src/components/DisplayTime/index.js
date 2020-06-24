import React, { useState, useEffect, useRef } from "react";
import { intervalToDuration, isBefore } from "date-fns";
import "./styles.css";

import { SVGCircle } from "./svg";

function DisplayDate({ date = new Date() }) {
  const [displayDate, setDisplayDate] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

  // Mapea o tempo para transformalos em propriedade radius
  function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }

  return (
    <div className="countdown-wrapper">
      <div className="countdown-item">
        <SVGCircle radius={mapNumber(displayDate.years, 365, 0, 0, 360)} />
        {displayDate.years}
        <span>Anos</span>
      </div>
      <div className="countdown-item">
        <SVGCircle radius={mapNumber(displayDate.months, 12, 0, 0, 360)} />
        {displayDate.months}
        <span>Meses</span>
      </div>
      <div className="countdown-item">
        <SVGCircle radius={mapNumber(displayDate.days, 30, 0, 0, 360)} />
        {displayDate.days}
        <span>Dias</span>
      </div>
      <div className="countdown-item">
        <SVGCircle radius={mapNumber(displayDate.hours, 24, 0, 0, 360)} />
        {displayDate.hours}
        <span>Horas</span>
      </div>
      <div className="countdown-item">
        <SVGCircle radius={mapNumber(displayDate.minutes, 60, 0, 0, 360)} />
        {displayDate.minutes}
        <span>Minutos</span>
      </div>
      <div className="countdown-item">
        <SVGCircle radius={mapNumber(displayDate.seconds, 60, 0, 0, 360)} />
        {displayDate.seconds}
        <span>Segundos</span>
      </div>
    </div>
  );
}

export default DisplayDate;
