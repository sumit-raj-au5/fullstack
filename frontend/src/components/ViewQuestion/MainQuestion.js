import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Bookmark, History } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css" //quill's css very important to import for using react quill
import './index.css'
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function MainQuestion() {
    //for hiding and showing add comment box
    const[show, setShow] = useState(false)

    const [questionData, setQuestionData] = useState()
    const [answer, setAnswer] = useState("");
    const [comment, setComment] = useState("")
    const user = useSelector(selectUser)
    // Getting parameters sent in URL
    let search = window.location.search
    const params = new URLSearchParams(search)
    const id = params.get("q")

    useEffect(() => {
         async function loadQuestionData(){
            await axios.get(`https://stackoverflow-clone-guvi.herokuapp.com/api/question/${id}`)
            .then((res)=>{
                console.log(res.data[0])
                setQuestionData(res.data[0])
            }).catch((err)=>{
                console.log(err)
            })
         }
           loadQuestionData(); 
    }, [id])

    const handleQuill = (value) => {
        setAnswer(value)
    }

    const getUpdatedAnswers = async() =>{
        
            await axios.get(`https://stackoverflow-clone-guvi.herokuapp.com/api/question/${id}`)
            .then((res)=>{
                console.log(res.data[0])
                setQuestionData(res.data[0])
            }).catch((err)=>{
                console.log(err)
            })
        
    }

    const handleSubmit = async() => {
        if(answer){
        const body = {
            question_id:id,
            answer:answer,
            user:user
        }
    
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }
    await axios.post('https://stackoverflow-clone-guvi.herokuapp.com/api/answer', body, config).then((res)=>{
        console.log(res.data);
        alert('Answer added successfully')
        setAnswer('');
        getUpdatedAnswers()
    }).catch((err)=>{console.log(err)})
    }}

    const handleComment = async() => {
        if(comment){
            const body = {
                question_id:id,
                comment:comment,
                user:user
            }
            await axios.post(`https://stackoverflow-clone-guvi.herokuapp.com/api/comment/${id}`, body).then((res)=>{
                console.log(res.data)
                setComment("")
                setShow(false)
                getUpdatedAnswers()
            }).catch((err)=> {
                console.log(err)
            })
        }
    }

    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }

  return (
    <div className='main'>
        <div className="main-container">
            <div className="main-top">
                <h2 className='main-question'>{questionData?.title}</h2> 
                    <Link to={'/add-question'}>
                        <button> Ask Question </button>
                    </Link>
            </div>
            <div className="main-desc">
                <div className="info">
                    <p>{new Date(questionData?.created_at).toLocaleString()}</p>
                    <p>Active<span>Today</span></p>
                    <p>Viewed <span>43</span></p>
                </div>
            </div>

            <div className="all-questions">
                <div className="all-questions-container">
                <div className="all-questions-left">
                <div className="all-options">
                    <p className='arrow'> <ArrowDropUpIcon /> </p>
                    <p className='arrow'>0</p>
                    <p className='arrow'> <ArrowDropDownIcon/> </p>
                    <Bookmark />
                    <History />
                </div>
                </div>
                <div className="question-answer">
                    <p>{ReactHtmlParser(questionData?.body)}</p>
                    <div className="author">
                        <small>asked {new Date(questionData?.created_at).toLocaleString()}</small>
                        <div className="auth-details">
                            <Avatar sx ={{bgcolor: stringToColor(questionData?.user?.displayName? questionData?.user?.displayName : String(questionData?.user?.email).split('@')[0])}} 
                            src={questionData?.user?.photo}>
                            {questionData?.user?.displayName? questionData?.user?.displayName[0] : String(questionData?.user?.email).split('@')[0][0]}
                            </Avatar>
                            <p>{questionData?.user?.displayName? questionData?.user?.displayName : String(questionData?.user?.email).split('@')[0]}</p>
                        </div>
                    </div>
                    <div className="comments">
                        {
                            questionData?.comments && questionData?.comments?.map((_qd, index) => (
                                <div className="comment" key={index}>
                            
                                  <p>{_qd?.comment} <span>{_qd?.user?.displayName? _qd?.user?.displayName : String(_qd?.user?.email).split('@')[0]}</span> <small>{new Date(_qd?.created_at).toLocaleString()}</small> </p>
                               </div>
                            ))
                        }
                        
                        <p onClick={()=>setShow(!show)}>Add a comment</p>
                        {
                            show && (<div className='title'>
                                <textarea 
                                name="add-comment" 
                                id="add-comment" 
                                cols="30" 
                                rows="10" 
                                placeholder='Add your comment...'
                                value={comment}
                                onChange={(e)=>setComment(e.target.value)}></textarea>
                                <button 
                                className='button'
                                onClick={handleComment}>Add comment</button>
                            </div>)
                        }
                    </div>
                </div>
                </div>
            </div>
            {/* this classname can be all-answers */}
            <div className="all-questions">
                <p className='all-question-no-of-answer'>No. of answer {questionData?.answerDetails?.length}</p>
                {
                    questionData?.answerDetails?.map((_q)=>(
                        <div key={_q?._id} className="all-questions-container">
                <div className="all-questions-left">
                <div className="all-options">
                    <p className='arrow'> <ArrowDropUpIcon /> </p>
                    <p className='arrow'>0</p>
                    <p className='arrow'> <ArrowDropDownIcon/> </p>
                    <Bookmark />
                    <History />
                </div>
                </div>
                <div className="question-answer">
                    <p>{ReactHtmlParser(_q?.answer)}</p>
                    <div className="author">
                        <small>asked {new Date(_q?.created_at).toLocaleString()}</small>
                        <div className="auth-details">
                            <Avatar 
                            name={_q?.user?.displayName? _q?.user?.displayName : String(_q?.user?.email).split('@')[0]}  
                            src={_q?.user?.photo}/>
                            <p>{_q?.user?.displayName? _q?.user?.displayName : String(_q?.user?.email).split('@')[0]}</p>
                        </div>
                    </div>
                    
                </div>
                </div>
                    ))
                }
                
            </div>
        </div>
        <div className="main-answer">
            <h3>Your Answer</h3>
            <ReactQuill 
            className='react-quill' 
            theme='snow' 
            style={{height:"150px"}} 
            value = {answer} 
            onChange={handleQuill}/>
        </div>
        <button 
        className='button'
         style={{ marginTop:"75px" }} 
         type='submit' 
         onClick={handleSubmit} >Post Your Answer</button>
    </div>
  )
}

export default MainQuestion