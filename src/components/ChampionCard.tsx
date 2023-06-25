interface Champion {
  id: string;
  name: string;
  played?: boolean;
  result?: "win" | "loss";
  position?: string;
}

const ChampionCard: React.FC<{ champion: Champion; onPlayedChange: (played: boolean) => void; onResultChange: (result: "win" | "loss") => void; onPositionChange: (position: string) => void }> = ({ champion, onPlayedChange, onResultChange, onPositionChange }) => {
  return (
    <div>
      <h2>{champion.name}</h2>
      <input type="checkbox" checked={champion.played} onChange={(e) => onPlayedChange(e.target.checked)} />
      <select value={champion.result} onChange={(e) => onResultChange(e.target.value as "win" | "loss")}>
        <option value="">Select result</option>
        <option value="win">Win</option>
        <option value="loss">Loss</option>
      </select>
      <select value={champion.position} onChange={(e) => onPositionChange(e.target.value)}>
        <option value="">Select position</option>
        <option value="top">Top</option>
        <option value="mid">Mid</option>
        <option value="bot">Bot</option>
      </select>
    </div>
  );
}

export default ChampionCard;