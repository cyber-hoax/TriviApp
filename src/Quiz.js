import React , {useEffect, useState}from 'react';
import axios from "axios";

const Quiz = () => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [alloption , setAlloption] = useState(['']);
    const [correctmsg , setCorrectmsg] = useState('');


    
  const getQuiz = () => {
    axios.get("https://opentdb.com/api.php?amount=1&type=multiple&encode=base64&difficulty=easy")
    .then((response) => {
       var optionList = [response.data.results[0].incorrect_answers[0],
        response.data.results[0].incorrect_answers[1],
        response.data.results[0].incorrect_answers[2],
        response.data.results[0].correct_answer]  
      setAlloption(optionList);  
      setAnswers(atob(response.data.results[0].correct_answer));
      setQuestion(atob(response.data.results[0].question));
      console.log(response.data.results[0].incorrect_answers, atob(response.data.results[0].correct_answer));
      console.log(alloption)  
    });
  };

const submitHandler = () => {
   
    if(userAnswer == answers){
        setCorrectmsg("correct");
    }
    else{
        setCorrectmsg("wrong");
    }
    
    setTimeout(() => {
        setCorrectmsg("");
        getQuiz();
    }, 3000);

    
};
  return (
    <div>  
        {!question ? (<button onClick ={getQuiz} value="raunak"> start trivia game
        </button>
        ):<div><h3>Q. {question}</h3>
         <select
      style={{ width: "70%" , height: "30px"}}
        value={userAnswer}
        onChange={(e) => {
          const ans = e.target.value;
          setUserAnswer(ans);
          console.log(ans)
          
        }}
      >
         {alloption.map((option) => (
            
        <option key={option} value={atob(option)} >{atob(option)}</option>
           
            ))}
       
      </select>
      <br></br>
      <button onClick={submitHandler}>
        submit
      </button>
      </div>}
         {correctmsg == "correct" ?<div style={{color : "green"}}> <h5 >correct</h5> </div> : correctmsg == "wrong" ?<div style={{color : "red"}}> <h5 >wrong</h5> </div> : null}  
    </div>
  )}

export default Quiz;