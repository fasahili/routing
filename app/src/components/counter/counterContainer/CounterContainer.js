import React, { useState } from "react";
import CounterCard from "../CounterCard";
import "./ContainerCounter.style.css";

const ContainerCounter = () => {
  const [totalCount, setTotalCount] = useState(0);

  const updateTotal = (props) => {
    setTotalCount((prevTotal) => prevTotal + props);
  };

  return (
    <>
      <h2 className="total-title">Total {totalCount}</h2>
      <div className="card-container">
        {[...Array(35)].map((_, index) => (
          <CounterCard
            key={index}
            name={`Counter ${index + 1}`}
            updateTotal={updateTotal}
          />
        ))}
      </div>
    </>
  );
};

export default ContainerCounter;
