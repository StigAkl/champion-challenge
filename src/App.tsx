import { useEffect, useState } from 'react'
import './App.css'
import compiled from './data/compiled.json';
import ChampionCard from './Components/ChampionCard/ChampionCard';
import Chart from './Components/PieChart';

export type Result = "win" | "loss";
export type Position = "top" | "jungle" | "mid" | "bot" | "support" | "none";

export interface Champion {
  id: string;
  name: string;
  played?: boolean;
  result?: Result;
  position?: Position;
}


const App = () => {
  const [search, setSearch] = useState('');
  const [champions, setChampions] = useState<Champion[]>(() => {
    const saved = localStorage.getItem("playedChampions");
    if (saved) {
      return JSON.parse(saved);
    }
    return compiled.map((c) => ({ ...c, played: false, result: "", position: "none" }))
  });

  const championPlayedChange = (champion: Champion) => {
    const updatedChampions = champions.map((c) => {
      if (champion.id === c.id) {
        return {
          ...champion,
          played: champion.played,
          position: champion.position,
          result: champion.result
        }
      } else {
        return c;
      }
    });
    setChampions(updatedChampions);
  }

  useEffect(() => {
    localStorage.setItem("playedChampions", JSON.stringify(champions));
  }, [champions]);

  const championsPlayedCounter = champions.filter(p => p.played).length;

  const cardList = champions.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())).map((champion) => (
    <ChampionCard key={champion.id}
      champion={champion}
      onChampionPlayed={championPlayedChange}
    />
  ));

  return (
    <>
      <h1>Champion Challenge</h1>
      <p>Antall spilt: {championsPlayedCounter} / {compiled.length}</p>
      {championsPlayedCounter > 0 && (<div className="positionDiagram">
        <Chart champions={champions} />
      </div>)}
      <input type="text" className="search" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder="Søk etter champ..." />
      <div className="cardContainer">
        {cardList}
      </div>
    </>
  )
}

export default App
