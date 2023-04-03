import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { collection, query, where, onSnapshot ,orderBy } from "firebase/firestore";
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
      width: 300,
      renderCell: (params) => {
        console.log(params);
        return (
          <div>
      <Stack direction="row" spacing={1}>
      <Button   variant="contained" color="warning" endIcon={<NotInterestedIcon />}>
        Block
      </Button>
      <Button  variant="outlined" color="error" startIcon={<DeleteIcon />}>
        Supprimer
      </Button>
    </Stack>
         </div>
        );
      }
    },


   
  ];
  const [data, setData] = useState(userRows);
  const [users,setUsers]=useState([])
  const [loading,setLoading] = useState(false)
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
    email
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
    user_id:doc.id
  });
 });
 setUsers(list)
 setLoading(true)
 console.log(users)
});
  },[])

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
