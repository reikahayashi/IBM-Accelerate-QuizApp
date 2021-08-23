/**
 * Welcome to the bonus round. 
 * We need our options to be shuffled before
 * we send it to our users. Create a function that
 * will take in an array and shuffle the order of that
 * array.
 */

/**
 * Shuffles an array
 * @param {Array} array original array 
 * @returns {Array} shuffled array
 */
function shuffleArray(array) {
  
  const arr = array.slice(0)
  console.log(arr[0])
   // Implementation goes here
  arr.map((collec)=>collec.sort(()=>Math.random()-0.5).map((item,num)=>item))
  
//console.log(arr.map((collec)=>collec.sort(()=>Math.random()*(collec.length +1)).map((item,num)=>item)))
  return arr
}

module.exports = shuffleArray
