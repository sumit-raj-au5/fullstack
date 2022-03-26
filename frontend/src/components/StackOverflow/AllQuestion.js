import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import "./AllQuestion.css";
import ReactHtmlParser from 'react-html-parser';

function AllQuestion({question}) {
  //getting all tags of the question
  const tags = JSON.parse(question?.tags[0])
  console.log(tags)

  const truncate = (str, n) => (str?.length>n?str.substr(0, n-1) + '...':str) 

  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>Votes</span>
            </div>

            <div className="all-option">
              <p>{question?.answerDetails?.length}</p>
              <span>Answers</span>
            </div>

            <div className="all-option">
              <small>0 Views</small>
            </div>
          </div>
        </div>

        <div className="question-answer">
        {/* Sending question ID */}
          <Link to={`/question?q=${question?._id}`}>
            {question?truncate(question.title, 150):'Loading....'}
          </Link>
          <div style={{ width: "90%" }}>
            <div>
            {/* Parsing in HTML single tags are stored in body from react quill */}
              {ReactHtmlParser(question?truncate(question.body, 150):'Loading Question....')}
            </div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
          {tags.map((tag,index)=>(
            
          <span key={index} className="question-tags">{tag}</span>
          
          ))}
          
          </div>
        <div className="author">
          <small>{new Date(question?.created_at).toLocaleString()}</small>
          <div className="author-details">
            <Avatar src={question?.user?.photo}/>
            <p>{question?.user?.displayName? question?.user?.displayName : String(question?.user?.email).split('@')[0]}</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestion;
