import React, {  useEffect, useState } from "react";
import axios from "axios";
const TakeaQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const[currentQuestionIndex,setCurrentQuestionIndex]=useState(0)
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [answers, setAnswers] = useState({});
    const[selectedQuestion,setSelectedQuestion]=useState(null)
useEffect(()=>{
    const GenerateQuizData=async()=>{
         try{
        const response=await axios.get("https://restcountries.com/v3.1/all")
        if(response?.data.length>0){
            const data=response?.data
    const questions = data.map(country => {
        const incorrectCountries = data
          .filter(c => c.name.common !== country.name.common)
          .sort(() => 0.5 - Math.random()) 
          .slice(0, 3) 
          const options = [country.name.common, ...incorrectCountries.map(c => c.name.common)];
          const optionsArray = options.sort(() => Math.random() - 0.5);
          return {
            Continents:country.continents,
            Capital:country.capital?.[0],
            flag: country.flags.png,
            options: optionsArray,
            CorrectAnswer: country.name.common,
          };
    })
    setQuestions(questions)
    setSelectedQuestion(questions[currentQuestionIndex]);
        }
    }
    catch(error){
        console.log(error)  
    }
    }
    GenerateQuizData();
},[])
const CheckAnswer=(option)=>{
    setSelectedOption(option);
    setIsCorrect(option === questions[currentQuestionIndex].CorrectAnswer);
    setAnswers(prevAnswers => ({...prevAnswers, [currentQuestionIndex]: option}));
}
const NextQuestion=()=>{
    setCurrentQuestionIndex(currentQuestionIndex+1)
    setSelectedQuestion(questions[currentQuestionIndex+1]);
    setSelectedOption(answers[currentQuestionIndex+1]);
    setIsCorrect(answers[currentQuestionIndex+1] === questions[currentQuestionIndex+1].CorrectAnswer);

}
const PreviousQuestion=()=>{
    setCurrentQuestionIndex(currentQuestionIndex-1)
    setSelectedQuestion(questions[currentQuestionIndex-1]);
    setSelectedOption(answers[currentQuestionIndex-1]);
    setIsCorrect(answers[currentQuestionIndex-1] === questions[currentQuestionIndex-1].CorrectAnswer);
}

    return (
        <div  style={{ textAlign: "center" }} >
       
            <h2>Which country does this flag belong to?</h2>
              <img
    src={selectedQuestion?.flag}
    alt="Flag Icon"
    style={{ border:"1px solid black",width: "500px", height: "350px" }} 
  />
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
    {selectedQuestion?.options.map((option, optionIndex) => (
      <div key={optionIndex} style={{ flex: "0 0 45%" }}> 
        <button
          key={option}
          onClick={() => CheckAnswer(option)}
          style={{
            backgroundColor: selectedOption === option ? (isCorrect ? 'green' : 'red') : 'blue',
            width: "100%", 
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          {option}
        </button>
      </div>
    ))}
  </div>
  <div style={{ marginTop: "20px" }}>
    {currentQuestionIndex > 0 && (
      <button onClick={() => PreviousQuestion()} style={{ marginRight: "10px" }}>
        Previous
      </button>
    )}
    {currentQuestionIndex < questions?.length - 1 && (
      <button onClick={() => NextQuestion()}>
        Next
      </button>
    )}
  </div>
        </div>
    )
}
export default TakeaQuiz