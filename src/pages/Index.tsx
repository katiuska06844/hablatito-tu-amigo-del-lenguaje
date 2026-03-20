import { useState, useEffect } from "react";
import Auth from "@/components/Auth";
import Onboarding from "@/components/Onboarding";
import MainMenu from "@/components/MainMenu";
import WordGame from "@/components/WordGame";
import RepeatActivity from "@/components/RepeatActivity";
import MiniGame from "@/components/MiniGame";
import Rewards from "@/components/Rewards";
import ParentModule from "@/components/ParentModule";
import Progress from "@/components/Progress";

const Index = () => {
  const [screen, setScreen] = useState("auth");
  const [childName, setChildName] = useState("");
  const [points, setPoints] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  // Auto-login if session exists
  useEffect(() => {
    const currentPhone = localStorage.getItem("hablatito_current");
    if (currentPhone) {
      const stored = localStorage.getItem(`hablatito_user_${currentPhone}`);
      if (stored) {
        const data = JSON.parse(stored);
        setChildName(data.childName);
        setScreen("onboarding");
      }
    }
  }, []);

  const earnedMedals = [10, 30, 50, 100, 200, 500].filter((r) => points >= r).length;

  const addPoints = (pts: number) => {
    setPoints((p) => p + pts);
    setGamesPlayed((g) => g + 1);
  };

  const goMenu = () => setScreen("menu");

  const handleAuth = (name: string) => {
    setChildName(name);
    setScreen("onboarding");
  };

  const handleLogout = () => {
    localStorage.removeItem("hablatito_current");
    setScreen("auth");
    setChildName("");
    setPoints(0);
    setGamesPlayed(0);
  };

  switch (screen) {
    case "auth":
      return <Auth onAuth={handleAuth} />;
    case "onboarding":
      return <Onboarding onComplete={goMenu} />;
    case "menu":
      return <MainMenu onNavigate={setScreen} points={points} medals={earnedMedals} onLogout={handleLogout} />;
    case "words":
      return <WordGame onBack={goMenu} onPoints={addPoints} />;
    case "repeat":
      return <RepeatActivity onBack={goMenu} onPoints={addPoints} />;
    case "games":
      return <MiniGame onBack={goMenu} onPoints={addPoints} />;
    case "rewards":
      return <Rewards onBack={goMenu} points={points} medals={earnedMedals} />;
    case "parents":
      return <ParentModule onBack={goMenu} onLogout={handleLogout} />;
    case "progress":
      return <Progress onBack={goMenu} points={points} gamesPlayed={gamesPlayed} />;
    default:
      return <MainMenu onNavigate={setScreen} points={points} medals={earnedMedals} onLogout={handleLogout} />;
  }
};

export default Index;
