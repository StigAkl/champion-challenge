import { useState } from 'react'
import './App.css'
import compiled from './data/compiled.json';
import Card from './components/Card';

export interface IChampion {
  id: string;
  name: string;
}

export interface IPlayed {
  [key: string]: boolean;
}

function App() {

  const [champions, _] = useState<IChampion[]>(compiled);
  const [played, setPlayed] = useState<IPlayed>(JSON.parse(localStorage.getItem("played") || "{}"));
  const [search, setSearch] = useState('');

  const toggleChecked = (id: string, hasPlayed: boolean) => {
    const newPlayed = { ...played, [id]: hasPlayed }
    console.log("Setting: ", newPlayed, hasPlayed)
    setPlayed(newPlayed);
    localStorage.setItem("played", JSON.stringify(newPlayed));
    console.log(played);
  }

  const list = champions.filter(champion => champion.name.toLowerCase().includes(search)).map(c => {
    return <Card key={c.id} champion={c} played={played[c.id]} setPlayed={toggleChecked} />
  })

  const playedCounter = Object.values(played).reduce((count, value) => value ? count + 1 : count, 0);

  return (
    <>
      <h1>Champion challenge</h1>
      <p>Antall spilt: {playedCounter} / {champions.length}</p>
      <input type="text" className="search" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder="Søk etter champ..." />
      <div className="container">
        {list}
      </div>
    </>
  )
}

export default App
