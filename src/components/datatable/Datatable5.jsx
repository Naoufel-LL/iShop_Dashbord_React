import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { collection, query, where, onSnapshot ,orderBy,deleteDoc,doc } from "firebase/firestore";
import {db} from '../../firebase'
import { useState,useEffect } from "react";
import Skeleton from '@mui/material/Skeleton';
const Datatable5 = () => {
    const [loading,setLoading]=useState(false)
    const [reports,setReports] = useState([])
    useEffect(()=>{
        const list = []
        console.log("clear")
        const q = query(collection(db, "reports"))
       const unsubscribe = onSnapshot(q, (querySnapshot) => {
     querySnapshot.forEach((doc) => {
      const {
        product_id,
        product_img,
        product_title,
        report_comment,
        report_reason,
        report_time,
        user_id,
        user_name,
        user_pic
      } = doc.data();
      list.push({
        product_id:product_id,
        product_img:product_img,
        product_title:product_title,
        report_comment:report_comment,
        report_reason:report_reason,
        report_time:report_time,
        user_id:user_id,
        user_name:user_name,
        user_pic:user_pic,
        report_id:doc.id
         });
     });
     setReports(list)
     setLoading(true)
     console.log(reports)
    });
      },[])
  return (
    <div style={{padding:20}}>
        {!loading  ?
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
      : <div>
         <List sx={{ width: '100%', maxWidth: "80%", bgcolor: 'background.paper' }}>
       {reports.map((report)=>{
        return(
            <div>
                 <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={report.user_name} src={report.user_pic} />
        </ListItemAvatar>
        <ListItemText
          primary={report.report_reason}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {report.user_name}
              </Typography>
              {` - ${new Date(report.report_time).toUTCString()}`} <br />

              {`Message:  ${report.report_comment}`} <br />
              {`Produit Id :   ${report.product_id}`} <br />
              {`Produit Titre :   ${report.product_title}`} <br />

            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
            </div>
        )
       })}
    </List>
      </div> }
    </div>
  )
}

export default Datatable5