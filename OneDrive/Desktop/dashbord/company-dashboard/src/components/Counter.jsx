import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    // functional updates ensure correct increments even when updates are batched
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  return (
    <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", marginTop: "10px" }}>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment by 3</button>
    </div>
  );
}

export default Counter;
