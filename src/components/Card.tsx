import { useState } from "react";
import { IChampion } from "../App";
import "./Card.css";

interface Props {
  champion: IChampion;
  played: boolean;
  setPlayed: (id: string, hasPlayed: boolean) => void;
}

interface MatchResult {
  [key: string]: string;
}

const getCardBackground = (played: boolean, result: string) => {
  if (!played) {
    return "card";
  }

  if (result === "win")
    return "card won";

  return "card loss";
}

const Card = ({ champion, played, setPlayed }: Props) => {
  const [win, setWin] = useState<MatchResult>(JSON.parse(localStorage.getItem("result") || "{}"));

  const toggleWin = (result: string) => {
    const hasPlayed = result !== "notplayed";

    console.log("Has played:", hasPlayed)
    if (!hasPlayed) {
      return setPlayed(champion.id, false);
    }

    const newWin = { ...win, [champion.id]: result };
    setWin(newWin);
    setPlayed(champion.id, true);
    localStorage.setItem("result", JSON.stringify(newWin));
  }

  const background = getCardBackground(played, win[champion.id]);

  return (
    <div className={background}>
      <div>
        <label className="champion-label">{champion.name}</label>
      </div>
      <div>
        <select id="result" className="result-select" placeholder="Resultat"
          onChange={(e) => {
            toggleWin(e.target.value);
          }}>
          <option value="notplayed">Ikke spilt</option>
          <option value="loss">Tap</option>
          <option selected={win[champion.id] === "win"} value="win">Vinn</option>
        </select>
      </div>
    </div>
  )
}

export default Card;