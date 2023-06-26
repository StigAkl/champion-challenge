import { PieChart } from 'react-minimal-pie-chart';
import { Champion } from '../App';

interface Props {
  champions: Champion[]
}

const Chart = ({ champions }: Props) => {

  const data = getPiechartData(champions);

  return (
    <PieChart
      data={data}
      radius={30}
      lineWidth={100}
      label={({ dataEntry }) => `${dataEntry.title}(${dataEntry.value})`}
      labelStyle={(index) => {
        if (data[index].value > 0) {
          return {
            fontSize: '4px',
            fontFamily: 'sans-serif',
            fill: 'white'
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
  )
}

const getPiechartData = (champions: Champion[]) => {
  const data = {
    "top": 0,
    "jungle": 0,
    "mid": 0,
    "bot": 0,
    "support": 0,
    "none": 0
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

export default Chart;