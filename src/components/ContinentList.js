import React, {   useState } from "react";
import axios from "axios";
import TakeaQuiz from "./TakeaQuiz";
import "../CSS/Quiz.css"
const ContinentList = () => {
    const [questions, setQuestions] = useState([]);
    const[selectedQuestion,setSelectedQuestion]=useState(null)
    const[currentQuestionIndex,setCurrentQuestionIndex]=useState(0)

    const getQuizData=async(continent)=>{
        try{
          const response=await axios.get("https://restcountries.com/v3.1/all")
          if(response?.data.length>0){
              const data=response?.data
              const filteredCountries = data.filter(country =>
                country.continents && country.continents[0] === continent && country.capital!=="undefined"
            );
      const questions = filteredCountries.map(country => {
          const incorrectCountries = filteredCountries
            .filter(c => c.name.common !== country.name.common)
            .sort(() => 0.5 - Math.random()) 
            .slice(0, 3) 
            const options = [country.name.common, ...incorrectCountries.map(c => c.name.common)];
            const optionsArray = options.sort(() => Math.random() - 0.5);
            return {
              Continents:country.continents?.[0],
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
    return (    
        <div>
           <h2 className="continentTitle">
              Select the continent to view the quiz
          </h2>
          <select
              onChange={(e) => getQuizData(e.target.value)}
             className="continentList"
          >
              <option value="">Select Continent</option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
          </select>
          {selectedQuestion && (
              <TakeaQuiz questions={questions} selectedQuestion={selectedQuestion} setSelectedQuestion={setSelectedQuestion} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex}></TakeaQuiz>)
          }
        </div>
    );
}

export default ContinentList;