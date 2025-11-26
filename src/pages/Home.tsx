// src/pages/Home.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Speakers from "../components/Speakers";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Speakers />
      </main>
    </>
  );
};

export default Home;
