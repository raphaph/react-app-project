import './style.css';
import React, { useEffect, useState } from 'react'; //importar o State com react

import { Card } from '../../components/card' // Importando o component para a página

export function Home() {
  //ESTADO
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  

  function handleAddStudent() {
    const newStudent = {
      name: studentName, // esta capturando do input pela função
      time: new Date().toLocaleDateString("pt-br", { // sintaxe para data hora atual
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }

    setStudents(prevState => [...prevState, newStudent]); //prevState pega o conteudo do estado anterior e adiciona ao novo
  }

  const [user, setUser] = useState({name: '', avatar: ''}) // state com objeto
  useEffect(() => { // o use effect é executado assim que a interface é renderizada
    
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/raphaph");
      const data = await response.json();

      setUser({ // atualiza o state com os dados da api
        name: data.name,
        avatar: data.avatar_url,
      })
    };

    fetchData();
  }, [students]); // esse array serve para executar o useEffect em dependencia de um useState, pode ter mais de 1 com virgula


  return (
    <div className='container'>
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} />
        </div>
      </header>

      <input
        type="text"
        placeholder='Digite um nome'
        onChange={e => setStudentName(e.target.value)} />
      {/* Captura e armazena o valor atual do input toda vez q ele muda, e = event */}
      <button type='button' onClick={handleAddStudent}>Adicionar</button>

      {
        students.map(student =>
          <Card
            name={student.name}
            time={student.time}
            key={student.time} /> // aqui é necessário utilizar um id, foi utilizado time pq era o tinha haha              
        )
      }
    </div>
  )

} // Sintaxe para adicionar um component 

