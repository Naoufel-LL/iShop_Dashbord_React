import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {db} from '../../firebase'
import { useState,useEffect } from "react";
import { collection, query, where, onSnapshot ,orderBy,limit } from "firebase/firestore";
import Skeleton from '@mui/material/Skeleton';


const Chart = ({ aspect, title }) => {
  
   const [data,setData] = useState([])
   const [loading,setLoading] = useState(false)
   useEffect(()=>{
    const list = []
    console.log("data")
    const q = query(collection(db, "stats"),limit(7),orderBy("date","desc"))
   const unsubscribe = onSnapshot(q, (querySnapshot) => {
 querySnapshot.forEach((doc) => {
  const {
    total
  } = doc.data();
  list.push({
     Jour : doc.id,
     Total:total
  });
 });
 setData(list.reverse())
 setLoading(true)
 console.log(data)
});
  },[])
  return (
    <div style={{width:'600px'}}>
       {!loading ? <Skeleton width={600} height={400} />
      :
      <div className="chart">
      <div className="title">Derniers 7 jours (Revenue)</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#44BE89" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#44BE89" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="Jour" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="linear"
            dataKey="Total"
            stroke="#44BE89"
            fillOpacity={1}
          activeDot={{ r: 8 }}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div> 
      }
    </div>
  );
};

export default Chart;