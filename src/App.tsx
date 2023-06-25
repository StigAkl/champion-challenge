import { useEffect, useState } from 'react'
import './App.css'
import compiled from './data/compiled.json';
import ChampionCard from './Components/ChampionCard/ChampionCard';

export type Result = "win" | "loss";
export type Position = "top" | "jungle" | "mid" | "bot" | "support";
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
    return compiled.map((c) => ({ ...c, played: false, result: "", position: "" }))
  });

  const championPlayedChange = (champion: Champion) => {
    setChampions(champions.map((c) => c.id === champion.id ? { ...c, played: champion.played } : c));
  }

  useEffect(() => {
    localStorage.setItem("playedChampions", JSON.stringify(champions));
  }, [champions]);

  const playerCounter = champions.filter(p => p.played).length;

  const cardList = champions.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())).map((champion) => (
    <ChampionCard key={champion.id}
      champion={champion}
      onChampionPlayed={championPlayedChange}
    />
  ));

  return (
    <>
      <h1>Champion Challenge</h1>
      <p>Antall spilt: {playerCounter} / {compiled.length}</p>
      <input type="text" className="search" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder="Søk etter champ..." />
      <div className="cardContainer">
        {cardList}
      </div>
    </>
  )
}

export default App
