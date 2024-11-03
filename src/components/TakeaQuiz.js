import React, { useState } from "react";
import axios from "axios";
const TakeaQuiz = ({questions,selectedQuestion,setSelectedQuestion,currentQuestionIndex,setCurrentQuestionIndex}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [answers, setAnswers] = useState({});
    

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
  <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#f9f9f9",
      padding: "20px",
      boxSizing: "border-box",
      overflow: "hidden"
  }}>
      <div style={{
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
      }}>
          
                  <h2 style={{
                      color: "#333",
                      fontSize: "22px",
                      fontWeight: "500",
                      marginBottom: "20px"
                  }}>
                      Which country does this flag belong to?
                  </h2>

                  <img
                      src={selectedQuestion?.flag}
                      alt="Flag Icon"
                     className="imgFlag"
                  />

                  <div style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: "15px",
                  }}>
                      {selectedQuestion?.options.map((option, optionIndex) => (
                          <button
                              key={option}
                              onClick={() => CheckAnswer(option)}
                              style={{
                                  backgroundColor: selectedOption === option ? (isCorrect ? '#4CAF50' : '#F44336') : '#007BFF',
                                  color: "#fff",
                                  padding: "15px",
                                  borderRadius: "8px",
                                  border: "none",
                                  width: "48%",
                                  fontSize: "16px",
                                  cursor: "pointer",
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                  transition: "background-color 0.3s ease"
                              }}
                          >
                              {option}
                          </button>
                      ))}
                  </div>

                  <div style={{
                      marginTop: "30px",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%"
                  }}>
                      {currentQuestionIndex > 0 && (
                          <button
                              onClick={() => PreviousQuestion()}
                              style={{
                                  padding: "10px 20px",
                                  borderRadius: "8px",
                                  border: "none",
                                  backgroundColor: "#6c757d",
                                  color: "#fff",
                                  cursor: "pointer",
                                  fontSize: "16px",
                                  transition: "background-color 0.3s ease"
                              }}
                          >
                              Previous
                          </button>
                      )}
                      {currentQuestionIndex < questions?.length - 1 && (
                          <button
                              onClick={() => NextQuestion()}
                              style={{
                                  padding: "10px 20px",
                                  borderRadius: "8px",
                                  border: "none",
                                  backgroundColor: "#28a745",
                                  color: "#fff",
                                  cursor: "pointer",
                                  fontSize: "16px",
                                  transition: "background-color 0.3s ease"
                              }}
                          >
                              Next
                          </button>
                      )}
                  </div>
      </div>
  </div>
);


}
export default TakeaQuiz