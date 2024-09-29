import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "July 1",
    sparks: 673,
    subs: 3076,
    collectors: 324,
    views: 8320
  },
  {
    name: "July 11",
    sparks: 253,
    subs: 2076,
    collectors: 224,
    views: 8320
  },
  {
    name: "July 21",
    sparks: 473,
    subs: 1076,
    collectors: 524,
    views: 10320
  },
  {
    name: "July 31",
    sparks: 973,
    subs: 76,
    collectors: 124,
    views: 11320
  },
];

function Graph(props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="16" vertical={false} opacity={"25%"} />
        <XAxis dataKey="name" className="text-sm" />
        <YAxis className="text-sm" />
        <Tooltip />
        <Area type="bumpX" dataKey={props.value} stroke="#9A8FFF" strokeWidth={3} fill="#D0AAFF" />
      </AreaChart>
      
    </ResponsiveContainer>
  );
}

export default Graph;
