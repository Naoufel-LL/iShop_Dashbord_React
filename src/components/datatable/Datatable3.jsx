import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { collection, query, where, onSnapshot ,orderBy,doc,updateDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import "../table/table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {db} from '../../firebase'
import Avatar from "@mui/material/Avatar";
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import Skeleton from '@mui/material/Skeleton';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from "react-router-dom";
import { Backdrop } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const Datatable3 = () => {
  const navigate = useNavigate();

  const Livrer = (id) =>{
    setOpen(true)
    const commandeRef = doc(db, "commandes", id);
    updateDoc(commandeRef, {
        status:true
    });
    setTimeout(()=>{
      setOpen(false)
      window.location.reload(false);
    },3000)
}
  const columns = [
    {
        field: "product_img",
        headerName: "",
        width: 150,
        renderCell: (params) => {
          return (
            <>
            <img style={{width:150,height:200,objectFit:"contain"}} src={params.value}/>
            </>
          );
        }
      },
    { field: 'product_title', headerName: 'Titre', width: 180 },
    { field: 'seller_name', headerName: 'Vendeur', width: 130 },
    { field: 'buyer_name', headerName: 'Client', width: 200 },
    { field: 'buyer_tel', headerName: 'Téléphone', width: 120 },
    { field: 'buyer_adress', headerName: 'Adresse', width: 150 },
    { field: 'quantity', headerName: 'Quatity', width: 40 },
    { field: 'total', headerName: 'Total (DH)', width: 130,
    renderCell: (params) => {
      return (
        <>
          <h3>{params.value}DH</h3>
        </>
      );
    }
    },
    {
      field: "status",
      headerName: "Statut",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
              {params.value ?<h3 style={{color:'green'}}>Livred</h3> : <h3 style={{color:'red'}}>Not Livred</h3>}
          </div>
        );
      }
    },
    {
      field: "document_id",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
       <Button onClick={()=>Livrer(params.value)} variant="contained" color="success" endIcon={<LocalShippingIcon />}>
        Livrer
      </Button>  </div>
        );
      }
    },
   
  ];
  const [data, setData] = useState(userRows);
  const [products,setProducts]=useState([])
  const [loading,setLoading] = useState(false)
 const [open,setOpen]=useState(false)
  useEffect(()=>{
    const list = []
    console.log("clear")
    const q = query(collection(db, "commandes"),where("status", "==",false))
   const unsubscribe = onSnapshot(q, (querySnapshot) => {
 querySnapshot.forEach((doc) => {
  const {
    product_id,
    product_img,
    product_title,
    seller_id,
    seller_pic,
    seller_name,
    buyer_id,
    buyer_tel,
    buyer_adress,
    buyer_codePostal,
    buyer_pic,
    buyer_name,
    quantity,
    buy_time,
    total,
    status
  } = doc.data();
  list.push({
    document_id:doc.id,
    product_id:product_id,
    product_img:product_img,
    product_title:product_title,
    seller_id:seller_id,
    seller_pic:seller_pic,
    seller_name:seller_name,
    buyer_id:buyer_id,
    buyer_tel:buyer_tel,
    buyer_adress:buyer_adress,
    buyer_codePostal:buyer_codePostal,
    buyer_pic:buyer_pic,
    buyer_name:buyer_name,
    quantity:quantity,
    buy_time:buy_time,
    total:total,
    status:status,
  });
 });
 setProducts(list)
 setLoading(true)
 console.log(products)
});
  },[])
 
  return (
    <div style={{padding:20}}>
        {!loading ? <div>
            
        <Skeleton  variant="rounded"  height={60} />
        <br />
        <Skeleton variant="rounded" height={60} />
        <br />
        <Skeleton variant="rounded"  height={60} />
        <br />
        <Skeleton variant="rounded"  height={60} />
        <br />
        <Skeleton variant="rounded"  height={60} />
        <br />
        <Skeleton  variant="rounded" height={60}/>
        <br />
        <Skeleton  variant="rounded" height={60}/>  <br />
        <Skeleton  variant="rounded" height={60}/>
</div> : <div style={{ height: 700, width: '100%' }}>
<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}
>
<CircularProgress color="inherit" />

</Backdrop>
      <DataGrid
        rows={products}
        getRowId={(row) => row.document_id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
    </div>}
    </div>
  );
};

export default Datatable3;
