import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect,useState } from "react";
import { db } from "../../firebase";
import { collection,doc,getCountFromServer,onSnapshot ,getDoc} from "firebase/firestore";
import { Skeleton } from "@mui/material";
const Widget = ({ type }) => {
  let data;
  const [usernbr,setUserNbr] = useState(0)
  const [commandenbr,setCommandeNbr] = useState(0)
  const [productnbr,setProductNbr] = useState(0)
 const  [totalmad,setTotal] = useState(0)
 const [loading,setLoading]=useState(false)
 const [percentageCommande,setPercentageCommande] = useState(0)
 const [percentageuser,setPercentageUser] = useState(0)
 const [percentageproduct,setPercentageProduct] = useState(0)

  useEffect(async ()=>{
    try {
      const colusers = collection(db, "users");
    const snapshot = await getCountFromServer(colusers);
    console.log('count users : ', snapshot.data().count);
    setUserNbr(snapshot.data().count)

    const colproduits = collection(db, "produits");
    const snapshot1 = await getCountFromServer(colproduits);
    console.log('count produits : ', snapshot1.data().count);
    setProductNbr(snapshot1.data().count)

    const colcommandes = collection(db, "commandes");
    const snapshot2 = await getCountFromServer(colcommandes);
    console.log('count commandes : ', snapshot2.data().count);
    setCommandeNbr(snapshot2.data().count)
    
    const docRef = doc(db, "stats",`${new Date().toLocaleDateString("es-CL")}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().nbrCommande);
       let percCommande = ((docSnap.data().nbrCommande) / snapshot2.data().count) * 100
       setPercentageCommande(percCommande.toFixed(2))
       let percUser = ((docSnap.data().newusers) / snapshot.data().count) * 100
       setPercentageUser(percUser.toFixed(2))
       let percProduct = ((docSnap.data().newproduct) / snapshot1.data().count) * 100
       setPercentageProduct(percProduct.toFixed(2))

    } else {
      console.log("No such document!");
       setPercentageCommande(0)
    }
    
    const unsubscribe = onSnapshot(colcommandes, (querySnapshot) => {
      let temp = 0
      querySnapshot.forEach((doc) => {
       const {
        total
       } = doc.data();
       temp = temp + total
       setTotal(temp)
      });
     });
    } catch (error) {
       console.log(error)    }
       console.log(totalmad)
       setLoading(true)
  },[])
  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        percentage:`${percentageuser}`,
        isMoney: false,
        ct : usernbr,
        url: "/users",
        link: "Voir les users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "PRODUITS",
        url:"/products",
        percentage:`${percentageproduct}`,
        ct:productnbr,
        isMoney: false,
        link: "Voir les produits",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "COMMANDES",
        percentage:`${percentageCommande}`,
        isMoney: true,
        url:"/livred",
        ct:commandenbr,
        link: "Voir les commandes livrées",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div style={{width:"100%",height:"100%"}}>
      {!loading ? <Skeleton width={400} height={150} /> :
      <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
         {data.ct}
        </span>
        <span className="link">
           <a href={data.url}>{data.link}</a>
          </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {data.percentage} %
        </div>
        {data.icon}
      </div>
    </div>
      }
    </div>
  );
};

export default Widget;
