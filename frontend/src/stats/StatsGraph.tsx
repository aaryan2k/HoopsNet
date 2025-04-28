import "./Stats.css";
import { useParams, useLoaderData } from "react-router-dom";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Rectangle,
    ResponsiveContainer,
  } from "recharts";
  import StatsSelect from "./StatsSelect";

const StatsGraph = () => {
  const { stat } = useParams();
  const stats = useLoaderData();
  const data = stats[0];

  if (data.length === 0) {
    return(
        <div>
            <p>No data found</p>
        </div>
    );
}
  const mainColors: Record<string, string> = {
    "ATL" : "#C8102E",
    "BOS": "#007A33",
    "BKN": "#000000",
    "CHA" : "#1d1160",
    "CHI" : "#CE1141",
    "CLE" : "#860038",
    "DAL" : "#00538C",
    "DEN" : "#0E2240",
    "DET" : "#C8102E",
    "GSW": "#1D428A",
    "HOU": "#CE1141",
    "IND": "#002D62",
    "LAC": "#1D428A",
    "LAL": "#552583",
    "MEM": "#5D76A9",
    "MIA": "#98002E",
    "MIL": "#00471B",
    "MIN": "#236192",
    "NOP": "#0C2340",
    "NYK" : "#F58426",
    "OKC": "#007AC1",
    "ORL": "#0077C0",
    "PHI": "#006BB6",
    "PHX": "#1D1160",
    "POR": "#E03A3E",
    "SAC": "#5A2D81",
    "SAS": "#000000",
    "TOR": "#CE1141",
    "UTA": "#002B5C",
    "WAS": "#002B5C",
  }

  const altColors: Record<string, string> = {
    "ATL" : "#FDB927",
    "BOS": "#FFFFFF",
    "BKN": "#FFFFFF",
    "CHA" : "#00788C",
    "CHI" : "#FFFFFF",
    "CLE" : "#FDBB30",
    "DAL" : "#B8C4CA",
    "DEN" : "#FEC524",
    "DET" : "#1D42BA",
    "GSW": "#FBD927",
    "HOU": "#FFFFFF",
    "IND": "#FDBB30",
    "LAC": "#C8102E",
    "LAL": "#FDB927",
    "MEM": "#12173F",
    "MIA": "#000000",
    "MIL": "#EEE1C6",
    "MIN": "#0C2340",
    "NOP": "#C8102E",
    "NYK" : "#006BB6",
    "OKC": "#EF3B24",
    "ORL": "#C4CED4",
    "PHI": "#ED174C",
    "PHX": "#E56020",
    "POR": "#000000",
    "SAC": "#63727A",
    "SAS": "#C4CED4",
    "TOR": "#753BBD",
    "UTA": "#00471B",
    "WAS": "#E31837",
  }

  const CustomBar = (props: any) => {
    const { payload } = props;
    const color = mainColors[payload.team] || "#00653A";
    return <Rectangle {...props} fill={color} stroke="white"/>;
  };

  const CustomActiveBar = (props: any) => {
    const { payload } = props;
    const activeColor = altColors[payload.team] || "#FFC200";
    return <Rectangle {...props} fill={activeColor} stroke="black" />;
  };

return (
    <div>
    <StatsSelect />
    <h1>Top 8 NBA Players for {stat}</h1>
    <ResponsiveContainer width={"100%"} height={700}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
            dataKey="name" 
            stroke="#ffffff"
        />
        <YAxis
          stroke="#ffffff"
          label={{
            value: stat,
            angle: -90,
            position: "insideLeft",
            fill: "#ffffff"
          }}
        />
        <Tooltip />
        <Bar
          dataKey="value"
          shape= {<CustomBar/>}
          activeBar={<CustomActiveBar/>}
        />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}

export default StatsGraph