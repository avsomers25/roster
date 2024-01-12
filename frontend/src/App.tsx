import { useState } from 'react'
import './App.css'
import AddForm from './form';
import RemoveForm from './remove'
import axios from 'axios';
import React from 'react';
import JsonTable from 'ts-react-json-table';


const fetchData = async () => {
  const response = await axios.get('http://localhost:5000/api');
  return response;
};

const fetchData2 = async () => {
  const response = await axios.get('http://localhost:5000/majors');
  return response;
};

const fetchData3 = async () => {
  const response = await axios.get('http://localhost:5000/gradyear');
  return response;
};



function App() {

  const [data, setData] = React.useState([])
  const [data2, setData2] = React.useState([])
  const [data3, setData3] = React.useState([])

  React.useEffect(() => {

   fetchData().then(res => {
     setData(res.data)
   })
  },[])
  React.useEffect(() => {

    fetchData2().then(res => {
      setData2(res.data)
    })
   },[])
   React.useEffect(() => {

    fetchData3().then(res => {
      setData3(res.data)
    })
   },[])

   var columns = [
    'first',
    'last',
    'major',
    'gradyear',
  ];


  return (
    <>
      <div>
        <JsonTable rows = {data} columns = {columns} />
        <AddForm />
        <RemoveForm />
        <JsonTable rows = {data2} />
        <JsonTable rows = {data3} />
      </div>
    </>
  )
}

export default App
