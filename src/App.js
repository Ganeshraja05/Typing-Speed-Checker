import React from "react";
import Header from "./components/Header";
import TypingTest from "./components/TypingTest";


const App = () => (
  <div className="font-sans">
    <Header />
    <main className="container mx-auto p-4">
      <TypingTest />
     
    </main>
  </div>
);

export default App;
