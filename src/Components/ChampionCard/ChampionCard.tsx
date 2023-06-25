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
      return onChampionPlayed({ ...champion, played: false, position: undefined, result: undefined })
    }

    if (!position || !result) {
      setError(true);
      return alert(createErrorMessage(result, position));
    }

    champion.played = true;
    champion.position = position;
    champion.result = result;
    setError(false);

    onChampionPlayed(champion);
  }

  const renderSelect = () => {
    return (
      <>
        <div className={`select-container`}>
          <select className="select-dropdown"
            onChange={(e) => setResult(e.target.value as Result)}>
            <option value="" disabled selected hidden>Resultat</option>
            <option value="win">Vinn</option>
            <option value="loss">Tap</option>
          </select>
        </div>
        <div className="select-container">
          <select className="select-dropdown"
            placeholder="Posisjon"
            onChange={(e) => setPosition(e.target.value as Position)}>
            <option value="" disabled selected hidden>Posisjon</option>
            <option value="top">Top</option>
            <option value="jungle">Jungle</option>
            <option value="mid">Mid</option>
            <option value="bot">Bot</option>
            <option value="support">Support</option>
          </select>
        </div>
      </>
    )
  }

  const renderResult = () => {
    return (
      <div className="result">
        <p>Resultat: {champion.result === "win" ? "Vinn" : "Tap"}</p>
        <p>Posisjon: {champion.position}</p>
      </div>
    )
  }

  return (
    <div className={`card ${cardBackground}`}>
      <span className="name">{champion.name}</span>
      {champion.played ? renderResult() : renderSelect()}
      {renderButton(champion, handlePlayButtonClick)}
    </div>
  )
}

const renderButton = (champion: Champion, callback: () => void) => {
  return champion.played ?
    <button className="setunplayed" onClick={callback}>Fjern</button>
    :
    <button className="setplayed" onClick={callback}>Ferdig</button>
};

const createErrorMessage = (result?: string, position?: string) => {
  let error = "";
  if (!position && result) error += "posisjon";
  if (!result && position) error += "resultat";
  if (!result && !position) error += "resultat og posisjon";
  return "Du må velge " + error;
}

const getCardBackground = (champion: Champion, error: boolean) => {
  let styling = "";

  if (error) {
    styling += "error ";
  }
  if (!champion.played)
    return styling;

  if (champion.result === "loss")
    return styling + "loss";

  return styling + "win";
}

export default ChampionCard;