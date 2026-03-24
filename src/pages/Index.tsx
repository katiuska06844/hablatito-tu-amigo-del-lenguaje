import { useState, useEffect } from "react";
import Auth from "@/components/Auth";
import Onboarding from "@/components/Onboarding";
import MainMenu from "@/components/MainMenu";
import WordGame from "@/components/WordGame";
import RepeatActivity from "@/components/RepeatActivity";
import MiniGame from "@/components/MiniGame";
import Achievements from "@/components/Achievements";
import ParentModule from "@/components/ParentModule";
import UserProfile from "@/components/UserProfile";

const Index = () => {
  const [screen, setScreen] = useState("auth");
  const [childName, setChildName] = useState("");
  const [points, setPoints] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

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

  // Refresh child name when returning to menu (in case profile was edited)
  const handleBackToMenu = () => {
    const currentPhone = localStorage.getItem("hablatito_current");
    if (currentPhone) {
      const stored = localStorage.getItem(`hablatito_user_${currentPhone}`);
      if (stored) {
        const data = JSON.parse(stored);
        setChildName(data.childName);
      }
    }
    setScreen("menu");
  };

  switch (screen) {
    case "auth":
      return <Auth onAuth={handleAuth} />;
    case "onboarding":
      return <Onboarding onComplete={goMenu} />;
    case "menu":
      return <MainMenu onNavigate={setScreen} points={points} medals={earnedMedals} childName={childName} onLogout={handleLogout} />;
    case "words":
      return <WordGame onBack={goMenu} onPoints={addPoints} />;
    case "repeat":
      return <RepeatActivity onBack={goMenu} onPoints={addPoints} />;
    case "games":
      return <MiniGame onBack={goMenu} onPoints={addPoints} />;
    case "achievements":
      return <Achievements onBack={goMenu} points={points} medals={earnedMedals} gamesPlayed={gamesPlayed} />;
    case "parents":
      return <ParentModule onBack={goMenu} onLogout={handleLogout} />;
    case "profile":
      return <UserProfile onBack={handleBackToMenu} onLogout={handleLogout} />;
    default:
      return <MainMenu onNavigate={setScreen} points={points} medals={earnedMedals} childName={childName} onLogout={handleLogout} />;
  }
};

export default Index;
