import React from 'react';
import axios from 'axios';


const LoginForm: React.FC = () => {
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
    console.log(`http://localhost:5000/api/${first}/${last}/${major}/${grad}`);
    axios.get(`http://localhost:5000/add/${first}/${last}/${major}/${grad}`);
    axios.get('http://localhost:5000/api')
    .then(response => {
      console.log(response.data);
    })
  };

  

  return (
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
    </form>
  );
};

export default LoginForm;