import Home from "./Home";
import Projects from "./Projects";
import About from "./About";
import React, { useEffect } from "react";
import Loading from "@/components/Loading";

const LandingPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // 1. Simulate Loading Delay (e.g., 2.5 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  // --- RENDER LOADING SCREEN ---
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Home />
      <About />
      <Projects />
    </div>
  );
};

export default LandingPage;
