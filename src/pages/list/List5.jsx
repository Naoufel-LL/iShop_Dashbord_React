import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
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
import Datatable5 from "../../components/datatable/Datatable5";

const List5 = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable5/>
      </div>
    </div>
  )
}

export default List5