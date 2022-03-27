import React, { useState } from 'react'
//importing React quill for text editor
import ReactQuill from 'react-quill'
import {useHistory} from 'react-router-dom'
//it is important to import React Quill Css for styling
import 'react-quill/dist/quill.snow.css'
//for question tags
import {TagsInput} from 'react-tag-input-component'
import './Question.css'
import {useSelector} from 'react-redux'
import {selectUser} from '../../features/userSlice'
import axios from 'axios'

function Question() {

    const user = useSelector(selectUser)

    const [loading, setLoading] = useState(false)
    const [title, setTitle] =  useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])

    const history = useHistory();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(title !== "" && body !== ""){
            setLoading(true);
            const bodyJSON = {
                title: title,
                body: body,
                tag: JSON.stringify(tags),
                user:user
            }
            await axios.post('https://stackoverflow-clone-guvi.herokuapp.com/api/question', bodyJSON).then((res)=>{
                alert('Question added successfully');
                setLoading(false);
                history.push('/')
            }).catch((err)=>{
                console.log(err);
                setLoading(false);
            })
        }
    }

  return (
    <div className='add-question'>
    <div className="add-question-container">
        <div className="head-title">
            <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
            <div className="question-options">
                <div className="question-option">
                    <div className="title">
                        <h3>
                            Title
                        </h3>
                        <small>Be specific and imaging you are asking a question to another person</small>
                        <input 
                        type="text" 
                        name="question-title" 
                        id="question-title" 
                        placeholder='Add question title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>

                <div className="question-option">
                    <div className="body">
                        <h3>
                            Body
                        </h3>
                        <small>Include all the information someone would need to answer the question</small>
                        <ReactQuill 
                        className='react-quill' 
                        theme='snow'
                            value={body}
                            onChange = {(value) => setBody(value)}
                        />
                    </div>
                </div>

                <div className="question-option">
                    <div className="title">
                        <h3>
                            Tags
                        </h3>
                        <small>Add up tp 5 tags to describe what your question is about</small>
                        <div className="tag-input">
                        <TagsInput 
                        name='tags' 
                        placeHolder='Press enter to add new tag' 
                        value={tags}
                        onChange = {setTags}
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button 
        className='button'
        type='submit'
        disabled={loading}
        onClick={handleSubmit}>{loading?'Adding question...':'Add your question'}</button>
    </div>
    </div>
  )
}

export default Question