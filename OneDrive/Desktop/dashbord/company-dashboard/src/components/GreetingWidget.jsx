import React from "react";

function GreetingWidget() {
  const currentHour = new Date().getHours(); // parentheses are required
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning!";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "Good evening!";
  }

  return (
    <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
      {greeting}
    </div>
  );
}

export default GreetingWidget;
