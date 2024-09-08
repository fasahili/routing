import React, { useState } from "react";
import "./CounterCard.style.css";

const CounterCard = ({ name, updateTotal }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
    updateTotal(1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
    updateTotal(-1);
  };

  const reset = () => {
    updateTotal(-count);
    setCount(0);
  };

  return (
    <div className="card">
      <h3 className="num-of-counter">{name}</h3>
      <p className="name-of-counter">You clicked {count} times</p>
      <button className="button" onClick={increment}>
        {" "}
        +{" "}
      </button>
      <button className="button" onClick={reset}>
        {" "}
        Reset{" "}
      </button>
      <button className="button" onClick={decrement}>
        {" "}
        -{" "}
      </button>
    </div>
  );
};

export default CounterCard;
