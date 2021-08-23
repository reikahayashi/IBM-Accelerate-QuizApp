
/**
 * This is where you will create routes for our
 * questions API
 * Base url: /api/questions
 * We have imported express and router and
 * exported the router. 
 * 
 * Your task is to fill in the router with appropriate
 * routes and implement the functionality of getting
 * data from mongodb and return appropriate results
 */

const express = require('express');
const router = express.Router();

// Question Data
const Questions = require('../../models/questions-data.json')
const shuffleArray = require('../../utils/shuffle');
//Questions = shuffleArray(Questions);
let index = Questions;
 
function makeNewQues(){
  let newQuestions = [...index];
  newQuestions.map((item,index)=>Object.assign(item,{id:`${index}`}));
  shuffleArray(newQuestions.map(item=>item.options))
  //console.log(newQuestions.map((item)=>(item.id)))
  return [...newQuestions]
}

/**
 * Route details
 * api POST /api/questions/result
 * Description: This will receive a body with user
 * entered answers and will return the results. 
 * Calculation of the result will happen here and you
 * would only send the results.
 * 
 * Structure of body JSON:
 * {
 *    'questionID': 'user-answer',
 *    'questionID': 'user-answer'
 * }
 * 
 * Structure of the return JSON:
 * {
 *    summary: 'passed OR failed',
 *    score: (how many answers were correct),
 *    total: (how many questions were there)
 * }
 */
 router.post('/result', (req, res) => {
  // Remove the lines below and write your implementation
  var count = Questions.length;
  var score = 0;
 // ######################## answer calc #################################
  var userAnswers = req.body
  const answers = Questions.map((item)=>(item.answer))
  for(var i=0;i<count;i++){
    if(answers[i] == userAnswers[i]){score++;}
  }

  var passFail = score>=(count/2)?"Pass":"Fail";
  var returnBody = {
       "summary": passFail,
       "score": score,
       "total": count
   }
  
  
  res.send(returnBody)
  console.log(req.body, " body req")
  console.log(answers, " answers")
  //console.log(answers)
  //console.log(score)
  //score=0;
})

/**
 * Route details
 * api GET /api/questions
 * Description: Get all questions in the database
 * IMPORTANT: remove the answers from it's data
 * we don't want the client to know the answer.
 * 
 * Structure of the return JSON:
 * [
 *    {
 *      question: 'sample question',
 *      options: [
 *        'option1',
 *        'option2'
 *      ],
 *      id: '1234'
 *    }
 * ]
 * 
 */
 
router.get('/',(req, res) => {
  // Remove the lines below and write your implementation
  //let questionsList = [...makeNewQues()];
  //Object.values(questionsList).filter(item=>delete item['answer'])
  // console.log(questionsList, ' queslist')
  //const {["answer"]:_, ...quesNoans} = questionsList;
  // removeAns()
  // console.log(quesNoans, 'noans')
  //questionsList.map((item)=>(delete item['answer']))
 
  res.status(200).send(
    makeNewQues()
    )
    // Object.values(Questions).map((item,index)=>
    // (Object.entries(item).filter(item2=>(item2[0]!="answer"))))
    // )
    console.log(questionsList)
})

/**
 * Route details
 * api GET /api/questions/count
 * Description: This will get the count of the questions
 * from the database and return it 
 * Structure of the return JSON:
 * {
 *  count: 4
 * }
 */
let count = Object.keys(Questions).length;
//console.log(Questions.length, "works line 75")
router.get('/count', (req, res) => {
  // Remove the lines below and write your implementation
  var count = Questions.length;
  var countReturn = {"count":count};
 
  res.send(countReturn)
})

/**
 * Route details
 * api GET /api/questions/:qId
 * Description: This will get one question given the question ID
 * Structure of the return JSON:
 * {
 *    question: 'sample question',
 *    options: [
 *      'option1',
 *      'option2'
 *    ],
 *    id: '1234'
 * }
 */
router.get('/:qId', (req, res) => {
  // Remove the lines below and write your implementation
  var questionQuery = makeNewQues(); 
  //console.log(req.query.qId)
  res.status(200).send(questionQuery.filter((item)=>(item.id===`${req.query.qId}`)))
})





module.exports = router;
