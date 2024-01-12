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

  const [first, setfirst] = React.useState('');
  const [last, setlast] = React.useState('');
  const [major, setmajor] = React.useState('');
  const [grad, setgrad] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('first:', first);
    console.log('last:', last);
    console.log('major:', major);
    console.log('grad:', grad);
    axios.get(`http://localhost:5000/add/${first}/${last}/${major}/${grad}`);
    fetchData().then(res => {
      setData(res.data)
    })
    fetchData2().then(res => {
      setData2(res.data)
    })
    fetchData3().then(res => {
      setData3(res.data)
    })
    
  };

  const handleSubmit2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('first:', first);
    console.log('last:', last);
    console.log('major:', major);
    console.log('grad:', grad);
    axios.get(`http://localhost:5000/remove/${first}/${last}/${major}/${grad}`);
    fetchData().then(res => {
      setData(res.data)
    })
    fetchData2().then(res => {
      setData2(res.data)
    })
    fetchData3().then(res => {
      setData3(res.data)
    })
  };

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
        <form onSubmit={handleSubmit}>
      <label>
        First:
        <input type="text" value={first} onChange={(event) => setfirst(event.target.value)} />
      </label>
      <label>
        Last:
        <input type="text" value={last} onChange={(event) => setlast(event.target.value)} />
      </label>
      <label>
        Major:
        <input type="text" value={major} onChange={(event) => setmajor(event.target.value)} />
      </label>
      <label>
        Grad Year:
        <input type="text" value={grad} onChange={(event) => setgrad(event.target.value)} />
      </label>
      <button type="submit">Add</button>
      <button onClick={handleSubmit2}>Remove</button>
      </form>
        <JsonTable rows = {data2} />
        <JsonTable rows = {data3} />
      </div>
    </>
  )
}

export default App
