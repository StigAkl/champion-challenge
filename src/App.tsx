import { useEffect, useState } from 'react'
import './App.css'
import compiled from './data/compiled.json';
import ChampionCard from './Components/ChampionCard/ChampionCard';
import { PieChart } from 'react-minimal-pie-chart';

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

  const pieData = getPiechartData(champions);
  return (
    <>
      <h1>Champion Challenge</h1>
      <p>Antall spilt: {playerCounter} / {compiled.length}</p>
      <div className="positionDiagram">
        <PieChart
          data={pieData}
          radius={30}
          lineWidth={100}
          label={({ dataEntry }) => dataEntry.title}
          labelStyle={(index) => {
            if (pieData[index].value > 0) {
              return {
                fontSize: '5px',
                fontFamily: 'sans-serif',
              }
            } else {
              return {
                fontSize: '0px'
              }
            }
          }}
          labelPosition={60}
          segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
          animate
        />
      </div>
      <input type="text" className="search" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder="Søk etter champ..." />
      <div className="cardContainer">
        {cardList}
      </div>
    </>
  )
}

const getPiechartData = (champions: Champion[]) => {
  const data = {
    "top": 0,
    "jungle": 0,
    "mid": 0,
    "bot": 0,
    "support": 0
  };

  champions.forEach((champion) => {
    if (champion.position) {
      data[champion.position]++;
    }
  })

  const pieData = [
    { title: 'Top', value: data["top"], color: '#E38627' },
    { title: 'Jungle', value: data["jungle"], color: '#C13C37' },
    { title: 'Mid', value: data["mid"], color: '#18a459' },
    { title: 'Bot', value: data["bot"], color: '#2b389c' },
    { title: 'Support', value: data["support"], color: '#9a32a7' },
  ];

  return pieData;
}
export default App
