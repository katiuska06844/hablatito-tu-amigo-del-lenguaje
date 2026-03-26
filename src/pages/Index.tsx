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
import AnimalsActivity from "@/components/AnimalsActivity";
import FruitsActivity from "@/components/FruitsActivity";
import ColorsActivity from "@/components/ColorsActivity";
import EmotionsActivity from "@/components/EmotionsActivity";
import BodyPartsActivity from "@/components/BodyPartsActivity";
import RuralActivity from "@/components/RuralActivity";
import StoriesActivity from "@/components/StoriesActivity";
import PhrasesActivity from "@/components/PhrasesActivity";
import Shop from "@/components/Shop";

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
        const progress = localStorage.getItem(`hablatito_progress_${currentPhone}`);
        if (progress) {
          const p = JSON.parse(progress);
          setPoints(p.points || 0);
          setGamesPlayed(p.gamesPlayed || 0);
        }
        setScreen("onboarding");
      }
    }
  }, []);

  useEffect(() => {
    const currentPhone = localStorage.getItem("hablatito_current");
    if (currentPhone && points > 0) {
      localStorage.setItem(`hablatito_progress_${currentPhone}`, JSON.stringify({ points, gamesPlayed }));
    }
  }, [points, gamesPlayed]);

  const earnedMedals = [10, 30, 50, 100, 200, 500].filter((r) => points >= r).length;

  const addPoints = (pts: number) => {
    setPoints((p) => p + pts);
    setGamesPlayed((g) => g + 1);
  };

  const spendPoints = (amount: number) => {
    setPoints((p) => Math.max(0, p - amount));
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
    case "animals":
      return <AnimalsActivity onBack={goMenu} onPoints={addPoints} />;
    case "fruits":
      return <FruitsActivity onBack={goMenu} onPoints={addPoints} />;
    case "colors":
      return <ColorsActivity onBack={goMenu} onPoints={addPoints} />;
    case "emotions":
      return <EmotionsActivity onBack={goMenu} onPoints={addPoints} />;
    case "bodyparts":
      return <BodyPartsActivity onBack={goMenu} onPoints={addPoints} />;
    case "rural":
      return <RuralActivity onBack={goMenu} onPoints={addPoints} />;
    case "stories":
      return <StoriesActivity onBack={goMenu} onPoints={addPoints} />;
    case "phrases":
      return <PhrasesActivity onBack={goMenu} onPoints={addPoints} />;
    case "achievements":
      return <Achievements onBack={goMenu} points={points} medals={earnedMedals} gamesPlayed={gamesPlayed} childName={childName} />;
    case "parents":
      return <ParentModule onBack={goMenu} onLogout={handleLogout} />;
    case "profile":
      return <UserProfile onBack={handleBackToMenu} onLogout={handleLogout} />;
    case "shop":
      return <Shop onBack={goMenu} points={points} onSpendPoints={spendPoints} />;
    default:
      return <MainMenu onNavigate={setScreen} points={points} medals={earnedMedals} childName={childName} onLogout={handleLogout} />;
  }
};

export default Index;
