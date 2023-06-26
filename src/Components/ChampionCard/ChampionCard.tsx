import { useState } from "react";
import { Champion, Position, Result } from "../../App";
import "./ChampionCard.css";

interface Props {
  champion: Champion;
  onChampionPlayed: (champion: Champion) => void;
}

const ChampionCard = ({ champion, onChampionPlayed }: Props) => {

  const [position, setPosition] = useState(champion.position);
  const [result, setResult] = useState(champion.result);
  const [error, setError] = useState(false);

  const cardBackground = getCardBackground(champion, error);

  const handlePlayButtonClick = () => {
    if (champion.played) {
      const newChamp: Champion = { ...champion, position: "none", result: undefined, played: false };
      setResult(undefined);
      setPosition(undefined);
      return onChampionPlayed(newChamp)
    }

    if (!position || !result) {
      setError(true);
      return alert(createErrorMessage(result, position));
    }

    onChampionPlayed({ ...champion, played: true, position, result });
    setError(false);
  }

  const renderSelect = () => (
    <>
      <div className={`select-container`}>
        <select className="select-dropdown"
          value={result}
          onChange={(e) => setResult(e.target.value as Result)}>
          <option value="" disabled hidden>Resultat</option>
          <option value="win">Vinn</option>
          <option value="loss">Tap</option>
        </select>
      </div>
      <div className="select-container">
        <select className="select-dropdown"
          value={position}
          onChange={(e) => setPosition(e.target.value as Position)}>
          <option value="" disabled hidden>Posisjon</option>
          <option value="top">Top</option>
          <option value="jungle">Jungle</option>
          <option value="mid">Mid</option>
          <option value="bot">Bot</option>
          <option value="support">Support</option>
        </select>
      </div>
    </>
  )

  const renderResult = () => (
    <div className="result">
      <p>Resultat: {champion.result === "win" ? "Vinn" : "Tap"}</p>
      <p>Posisjon: {champion.position}</p>
    </div>
  )

  return (
    <div className={`card ${cardBackground}`}>
      <span className="name">{champion.name}</span>
      {champion.played ? renderResult() : renderSelect()}
      {renderButton(champion, handlePlayButtonClick)}
    </div>
  )
}

const renderButton = (champion: Champion, callback: () => void) => (
  champion.played
    ? <button className="setunplayed" onClick={callback}>Fjern</button>
    : <button className="setplayed" onClick={callback}>Ferdig</button>
);

const createErrorMessage = (result?: string, position?: string) => {
  const errors = [];
  if (!position) errors.push("posisjon");
  if (!result) errors.push("resultat");

  return errors.length > 0 ? `Du må velge ${errors.join(' og ')}` : '';
}

const getCardBackground = (champion: Champion, error: boolean) => {
  if (!champion.played)
    return error ? "error" : "";

  return ` ${error ? "error" : ""} ${champion.result === "loss" ? "loss" : "win"}`;
}

export default ChampionCard;
