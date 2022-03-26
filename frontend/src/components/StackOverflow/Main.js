import { FilterList } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import AllQuestions from './AllQuestion'
import './Main.css'

function Main({questions}) {
  return (
    <div className='main'>
        <div className="main-container">
            <div className="main-top">
                <h2>All Questions</h2>
                {/* routng to '/add-question' route */}
                <Link to='/add-question'> 
                    <button>Ask Question</button>
                </Link>
            </div>
            <div className="main-desc">
                <p>Total no of questions {questions?questions.length:'Fetching...'}</p>
                <div className="main-filter">
                    <div className="main-tabs">
                        <div className="main-tab">
                            <Link>Newest</Link>
                        </div>
                        <div className="main-tab">
                            <Link>Active</Link>
                        </div>
                        <div className="main-tab">
                            <Link>More</Link>
                        </div>
                    </div>
                    <div className="main-filter-item">
                        <FilterList />
                        <p>Filter</p>
                    </div>
                </div>
            </div>
            <div className="questions">
            {
                questions.map((question, index)=>(
                    
                    <div key={index} className="question">
                    <AllQuestions question={question}/>
                    </div>
                   
                ))
            }
               
            </div>
        </div>
    </div>
  )
}

export default Main