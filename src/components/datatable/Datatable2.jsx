import "./datatable.scss";
import { DataGrid,GridToolbar,GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { collection, query, where, onSnapshot ,orderBy,deleteDoc,doc } from "firebase/firestore";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import "../table/table.scss";
import {db} from '../../firebase'
import Avatar from "@mui/material/Avatar";
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const Datatable2 = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search,setSearch]=useState("")
  const handleClickOpen = (id) => {
    setOpen(true);
    setPid(id)
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteProduct = (id) =>{
    setLoading(false)
    setOpen(false)
    deleteDoc(doc(db, "produits", id))
    setTimeout(function(){
    setLoading(true)
    },5000)
  }
  const columns = [
    { field: 'prod_id', headerName: 'Product_Id', width: 130 },
    {
        field: "product_img",
        headerName: "Image",
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
    {
        field: "owner_pic",
        headerName: "User",
        width: 70,
        renderCell: (params) => {
          return (
            <>
              <Avatar src={params.value} />
            </>
          );
        }
      },
    { field: 'owner_name', headerName: 'Vendeur', width: 130 },
    { field: 'product_categorie', headerName: 'Catégorie', width: 200 },
    { field: 'product_city', headerName: 'Ville', width: 130 },
    { field: 'product_stock', headerName: 'Stock', width: 130 },
    {
      field: "product_id",
      headerName: "",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
      <Stack direction="row" spacing={1}>
      <Button onClick={()=>{handleClickOpen(params.value)}} variant="outlined" color="error" startIcon={<DeleteIcon />}>
        Supprimer
      </Button>
    </Stack>
         </div>
        );
      }
    },


   
  ];
  const [data, setData] = useState(userRows);
  const [products,setProducts]=useState([])
  const [loading,setLoading] = useState(false)
  const [pid,setPid] = useState("")
  useEffect(()=>{
    const list = []
    console.log("clear")
    const q = query(collection(db, "produits"))
   const unsubscribe = onSnapshot(q, (querySnapshot) => {
 querySnapshot.forEach((doc) => {
  const {
    owner_id,
    owner_name,
    owner_pic,
    owner_tel,
    product_title,
    product_time,
    product_price,
    product_img,
    product_desc,
    product_categorie,
    product_city,
    product_stock,
    product_condition,
  } = doc.data();
  list.push({
    owner_id:owner_id,
    owner_name:owner_name,
    product_time:product_time,
    owner_pic:owner_pic,
    owner_tel:owner_tel,
    product_title:product_title,
    product_price:product_price,
    product_img:product_img,
    product_desc:product_desc,
    product_categorie:product_categorie,
    product_city:product_city,
    product_stock:product_stock,
    product_condition:product_condition,
    product_id:doc.id,
    prod_id:doc.id
  });
 });
 setProducts(list)
 setLoading(true)
 console.log(products)
});
  },[loading])
  let filtred_products = products.filter((data)=>{
    let search_id = search
    return data.product_id.indexOf(search_id) != -1
  })
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
<Box  paddingY={1}
      sx={{
        width: "100%",
        maxWidth: '100%',
      }}
    >
      <TextField  onChange={(e) => {
        setSearch(e.target.value);
      }}
       fullWidth label="Product ID" id="fullWidth" />
    </Box>
<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Supprimer le produit?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           êtes vous sur ? Voulez-vous Supprimer ce article?
           Attention le produit sera supprimer definitivement !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={()=>{deleteProduct(pid)}} autoFocus>
            Accepter
          </Button>
        </DialogActions>
      </Dialog>
      <DataGrid
  title={"I'm a datatable"}
  slots={{ toolbar: CustomToolbar }}
        rows={filtred_products}
        getRowId={(row) => row.product_id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
    </div>}
    </div>
  );
};

export default Datatable2;
