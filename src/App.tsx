import { useState } from 'react'
import './App.css'
import compiled from './data/compiled.json';

interface IChampion {
  id: string;
  name: string;
}

interface IPlayed {
  [key: string]: boolean;
}

function App() {

  const [champions, _] = useState<IChampion[]>(compiled);
  const [played, setPlayed] = useState<IPlayed>(JSON.parse(localStorage.getItem("played") || "{}"));
  const [search, setSearch] = useState('');

  const toggleChecked = (id: string) => {
    const newPlayed = { ...played, [id]: !played[id] }
    setPlayed(newPlayed);
    localStorage.setItem("played", JSON.stringify(newPlayed));
  }

  const list = champions.filter(champion => champion.name.toLowerCase().includes(search)).map(c => {
    const background = played[c.id] ? "card played" : "card";
    return (
      <div key={c.id} className={background} onClick={() => toggleChecked(c.id)}>
        <input type="checkbox" className="checkbox" checked={played[c.id] || false} onChange={() => toggleChecked(c.id)} />
        <label>{c.name}</label>
      </div>)
  })

  const playedCounter = Object.values(played).reduce((count, value) => value ? count + 1 : count, 0);

  return (
    <>
      <h1>Champion challenge</h1>
      <p>Antall spilt: {playedCounter}</p>
      <input type="text" className="search" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder="Søk etter champ..." />
      <div className="container">
        {list}
      </div>
    </>
  )
}

export default App
