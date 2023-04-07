import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect,useState } from "react";
import { db } from "../../firebase";
import { collection,doc,getCountFromServer,onSnapshot,query,where } from "firebase/firestore";
import { Skeleton } from "@mui/material";
const Featured = () => {
 const  [totalmad,setTotal] = useState(0)
 const  [loading,setLoading] = useState(false)
useEffect(()=>{
  const q = query(collection(db, "commandes"),where("status", "==",true))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let temp = 0
    querySnapshot.forEach((doc) => {
     const {
      total
     } = doc.data();
     console.log(total)
     temp = temp + total
     setTotal(temp)
    });
    setLoading(true)
   });
},[])
  return (
    <div>
      {!loading ? <Skeleton width={600}  height={400}/> :
      <div className="featured">
      <div className="top">
        <h1 className="title">Total des ventes réalisées</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"90%"} strokeWidth={5} />
        </div>
        <p className="title">Totales Commandes Livrées</p>
        <p className="amount">{totalmad} DH</p>
        <p className="desc">
        Traitement des transactions précédentes. Les commandes non livrées peuvent ne pas être inclus.        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
      }
    </div>
  );
};

export default Featured;
