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

  if (stats.length === 0) {
    return(
        <div>
            <p>No data found</p>
        </div>
    );
}

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
          fill="#89CFF0"
          activeBar={<Rectangle fill="#90EE90" stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}

export default StatsGraph