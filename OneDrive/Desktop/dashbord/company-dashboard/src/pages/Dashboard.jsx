import React from "react";
import GreetingWidget from "../components/GreetingWidget";
import Counter from "../components/Counter";

export default function Dashboard() {
  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "1rem" }}>
      <h1>Company Dashboard</h1>
      <GreetingWidget />
      <Counter />
      {/* Add more widgets here */}
    </div>
  );
}
