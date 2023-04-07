import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot ,orderBy,getDoc,doc,updateDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import "../table/table.scss";
import CircularProgress from '@mui/material/CircularProgress';
import {db} from '../../firebase'
import Avatar from "@mui/material/Avatar";
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import Skeleton from '@mui/material/Skeleton';
import { Backdrop } from "@mui/material";
const Datatable = () => {
  const columns = [
    {
      field: "profilPic",
      headerName: "User",
      width: 70,
      renderCell: (params) => {
        console.log(params);
        return (
          <>
            <Avatar src={params.value} />
          </>
        );
      }
    },
    { field: 'firstName', headerName: 'Nom', width: 130 },
    { field: 'lastName', headerName: 'Prénom', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Téléphone', width: 130 },
    { field: 'adress', headerName: 'Adresse', width: 130 },
    { field: 'city', headerName: 'Ville', width: 130 },
    {
      field: "banned",
      headerName: "Statut",
      width: 70,
      renderCell: (params) => {
        console.log(params);
        return (
          <div>
              {!params.value ?<h3 style={{color:'green'}}>Actif</h3> : <h3 style={{color:'red'}}>Banned</h3>}
          </div>
        );
      }
    },
    {
      field: "user_id",
      headerName: "",
      width: 120,
      renderCell: (params) => {
        console.log(params);
        return (
          <div>
      <Button onClick={()=>BanUser(params.value)}   variant="contained" color="warning" endIcon={<NotInterestedIcon />}>
        Block
      </Button>
         </div>
        );
      }
    },
    {
      field: "user_id1",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        console.log(params);
        return (
          <div>
      <Button onClick={()=>unBanUser(params.value)}   variant="contained" color="success" endIcon={<NotInterestedIcon />}>
        UnBlock
      </Button>
         </div>
        );
      }
    },
    {
      field: "auth_id",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        console.log(params);
        return (
          <div>
      <Button   variant="contained" color="error" endIcon={<DeleteIcon />}>
        Supprimer
      </Button>
         </div>
        );
      }
    }

   
  ];
  const [data, setData] = useState(userRows);
  const [users,setUsers]=useState([])
  const [loading,setLoading] = useState(false)
  const [open,setOpen] = useState(false)
  const navigate = useNavigate()

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(()=>{
    const list = []
    console.log("clear")
    const q = query(collection(db, "users"))
   const unsubscribe = onSnapshot(q, (querySnapshot) => {
 querySnapshot.forEach((doc) => {
  const {
    firstName,
    lastName,
    phone,
    adress,
    profilPic,
    banned,
    verified,
    city,
    birth,
    email,
    auth_id
  } = doc.data();
  list.push({
    firstName:firstName,
    lastName:lastName,
    phone:phone,
    email:email,
    adress:adress,
    profilPic:profilPic,
    banned:banned,
    verified:verified,
    city:city,
    birth:birth,
    user_id:doc.id,
    user_id1:doc.id,
    auth_id:auth_id
  });
 });
 setUsers(list)
 setLoading(true)
 console.log(users)
});
  },[])
   const BanUser = (id)=>{
    setOpen(true)
    const commandeRef = doc(db, "users", id);
    updateDoc(commandeRef, {
        banned:true
    });
    setTimeout(()=>{
      setOpen(false)
      window.location.reload(false);
    },3000)
   }
   const unBanUser = (id)=>{
    setOpen(true)
    const commandeRef = doc(db, "users", id);
    updateDoc(commandeRef, {
        banned:false
    });
    setTimeout(()=>{
      setOpen(false)
      window.location.reload(false);
    },3000)
   }
  return (
    <div style={{padding:20}}>
        {!loading ? 
        <div>
            
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
</div>
        : <div style={{ height: 700, width: '100%' }}>
        <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}
>
<CircularProgress color="inherit" />

</Backdrop>
      <DataGrid
        rows={users}
        getRowId={(row) => row.user_id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
    </div>}
    </div>
  );
};

export default Datatable;
