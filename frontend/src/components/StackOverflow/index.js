import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './index.css'
import Main from './Main'
import Sidebar from './Sidebar'

function Index() {
  const [questions, setQuestions] = useState([])
  //getting all questions from api
  useEffect(()=>{
    async function getQuestion(){
      await axios
      .get('https://stackoverflow-clone-guvi.herokuapp.com/api/question')
      .then((res)=>{
        console.log(res.data)
        //setting data in reverse so latest question appears on top
        setQuestions(res.data.reverse())
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    getQuestion();
  }, []);

  return (
    <div className='stack-index'>
        <div className="stack-index-content">
            <Sidebar/>
            <Main questions ={questions}/>
        </div>
    </div>
  )
}

export default Index