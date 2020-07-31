// Steps for calculating a Course Handicap
// http://golfsoftware.com/hsd/golf-handicap-formula.html#:~:text=A%20Course%20Handicap%20is%20the,to%20the%20nearest%20whole%20number.

//
// 1. Convert gross scores to Adjusted Gross Scores
// 2. Calculate Handicap Differential for each score
// 3. Select lowest Handicap Differentials
// 4. Average lowest Handicap Differentials
// 5. Multiply the average Handicap Differential by 96%
// 6. Arrive at Handicap Index by truncating - deleting - the number(s) to the right of tenths
// 7. Calculate Course Handicap 
//


// 1 Convert Original Gross Scores to Adjusted Gross Scores


// Course Handicap	Maximum Score
// 9 or less	double bogey
// 10 through 19	7
// 20 through 29	8
// 30 through 39	9
// 40 and above	10



// 1. Create a Scorecard
class ScoreCard {
    constructor() {
        this.rounds = []
    }

    // 1.a addScore() to create a row of data from the table
    addScore(courseRating, slope, handicapIndex) {
        return this.rounds.push(newRound(courseRating, slope, handicapIndex));
    }


}

// 2. Use Calculator to process the data in each column of the table
class Calculator {

    // 2.a returnDifferentials() takes in a ScoreCard object
    // and returns the calculated differentials for each round
    // this method assumes the original gross scores were already
    // converted to adjusted gross scores.
    static returnDifferentials(scoreCard) {
        console.log("returning differentials...")
        const differentials = [];
        let i = 1;
        scoreCard.rounds.forEach(round => {
            console.log("************");
            console.log("ROUND " + (i++))

            differentials.push(Calculator.calcHandicapDifferential(round));
        });
        console.log("**********************************************");
        console.log("ALL ROUNDS PROCESSED... RETURNING DIFFERENTIALS!");
        return differentials;

    }
    // takes list of calculated differentials and returns the Net Handicap Differential Average,
    // giving the user their Handicap Index
    // Handicap Index is used in the final step to calculate a Course Handicap
    // for each specific course
    static netHandicapDiffAvg(scores) {
        console.log("AVERAGING DIFFERENTIALS");
        console.log("calculated diffs = " + scores);
        // sum scores
        let scoresSum = scores.reduce((acc, score) => acc + score);
        let average = scoresSum / scores.length;
        console.log("AVERAGE HANDICAP INDEX BEFORE USGA PERCENTAGE:: " + average)

        // (5. Multiply the average Handicap Differential by 96%)
        let netHandicapDifferentialAvg = average * 0.96;
        // truncate to 1 decimal place
        let handicapIndex = Calculator.truncateDecimals(average * 100) / 100;
        console.log("AVERAGE HANDICAP INDEX AFTER TRUNCATING:: " + handicapIndex);
        // THIS IS THE FINAL OUTPUT OF HANDICAP INDEX CALCULATOR
        return handicapIndex;
    }


  
    static calcHandicapDifferential(round) {

        console.log("round.courseRating = " + round.courseRating);
        console.log("round.slope = " + round.slope);
        console.log("round.handicapIndex = " + round.handicapIndex);

        let handicapDifferential = (round.handicapIndex - round.courseRating) * 113 / round.slope;
        console.log("handicapDifferential = " + handicapDifferential);
        // rounding to nerest 10th - FIXED
        handicapDifferential = Math.round(handicapDifferential * 10) / 10;
        console.log("correct Diff ----" + handicapDifferential);
        console.log("handicapDifferential = " + handicapDifferential);
        return handicapDifferential;

    }

    static truncateDecimals = function (number) {
        return Math[number < 0 ? 'ceil' : 'floor'](number);
    };

}



// 7. Calculate Course Handicap
// takes in return value from the Calculator.netHandicapDiffAvg() function and returns case-by-case Course Handicap
function calcCourseHandicap(netHandicapDiffAvg, slope, courseRating) {

    console.log("DEBUG netHandicapDiffAvg = " + netHandicapDiffAvg);
    let courseHandicap = netHandicapDiffAvg * slope / courseRating;
    console.log(" DEBUG courseHandicap = " + courseHandicap);
    courseHandicap = Calculator.truncateDecimals(courseHandicap * 1) / 1;
    console.log("YOUR COURSE HANDICAP :: " + courseHandicap);
    return courseHandicap;

}




function newRound(courseRating, slope, handicapIndex) {
    let round = {};
    round.courseRating = courseRating;
    round.slope = slope;
    round.handicapIndex = handicapIndex;
    return round;
}




function createDummyScorecard() {

    let scoreCard = new ScoreCard();
    scoreCard.addScore(70.3, 126, 100);
    scoreCard.addScore(35.3, 122, 100);
    scoreCard.addScore(66.8, 120, 100);
    scoreCard.addScore(65.9, 118, 85);
    scoreCard.addScore(74.3, 137, 88);
    scoreCard.addScore(71.1, 126, 90);
    // scoreCard.addscore accepts: 
    // 1. Course Rating, 2. Slope, 3. Handicap Index
    return scoreCard;

}

function runHandicapIndexCalculator(scoreCard) {
    console.log("************");
    console.log("STARTING CALCULATOR");
    console.log("************");

    // 1. Convert gross scores to Adjusted Gross Scores (DONE BY USER)

    // 2. Calculate Handicap Differential for each score
    let diffs = Calculator.returnDifferentials(scoreCard);
    console.log("diffs = " + diffs);

    // 3. Select lowest Handicap Differentials(skipping for now)
    // 4. Average lowest Handicap Differentials
    let calculatedScores = Calculator.netHandicapDiffAvg(diffs);


    // 5. Multiply the average Handicap Differential by 96% (done in calcscores)
    // The fifth step in calculating the Handicap Index is to compute the net Handicap Differential average. For the USGA the percentage by which the Handicap Differential averages are multiplied is 96%. 

    // 6. Arrive at Handicap Index by truncating - deleting - the number(s) to the right of tenths (done in calcScores)
    return calculatedScores;


    // 7. Calculate Course Handicap 
    // take output from calcScores() and gives a course handicap from user input.(must be done seperately from calculating the Handicap Index)
  


}
function testApp()
{const scoreCard = createDummyScorecard();
let myCalculatedHandicapIndex = runHandicapIndexCalculator(scoreCard);

calcCourseHandicap(12.5, 120, 113);}


// Extract Table Function
function extractTable(){
    document.querySelector("#resultsPanel").style.display ="block"

    

 
// Input Nodes
//  Round 1
let R1_CR = document.querySelector("#R1_CR").value;
let R1_SR = document.querySelector("#R1_SR").value;
let R1_SCORE = document.querySelector("#R1_SCORE").value;
// Round 2
let R2_CR = document.querySelector("#R2_CR").value;
let R2_SR = document.querySelector("#R2_SR").value;
let R2_SCORE = document.querySelector("#R2_SCORE").value;
// Round 3
let R3_CR = document.querySelector("#R3_CR").value;
let R3_SR = document.querySelector("#R3_SR").value;
let R3_SCORE = document.querySelector("#R3_SCORE").value;
// Round 4
let R4_CR = document.querySelector("#R4_CR").value;
let R4_SR = document.querySelector("#R4_SR").value;
let R4_SCORE = document.querySelector("#R4_SCORE").value;
// Round 5
let R5_CR = document.querySelector("#R5_CR").value;
let R5_SR = document.querySelector("#R5_SR").value;
let R5_SCORE = document.querySelector("#R5_SCORE").value;
// Round 6
let R6_CR = document.querySelector("#R6_CR").value;
let R6_SR = document.querySelector("#R6_SR").value;
let R6_SCORE = document.querySelector("#R6_SCORE").value;

// Result Nodes
// Round 1
let R1_CR_RESULT = document.querySelector("#R1_CR_RESULT");
let R1_SR_RESULT = document.querySelector("#R1_SR_RESULT");
let R1_SCORE_RESULT = document.querySelector("#R1_SCORE_RESULT");
let R1_DIFF = document.querySelector("#R1_DIFFERENTIAL");
// Round 2
let R2_CR_RESULT = document.querySelector("#R2_CR_RESULT");
let R2_SR_RESULT = document.querySelector("#R2_SR_RESULT");
let R2_SCORE_RESULT = document.querySelector("#R2_SCORE_RESULT");
let R2_DIFF = document.querySelector("#R2_DIFFERENTIAL");
// Round 3
let R3_CR_RESULT = document.querySelector("#R3_CR_RESULT");
let R3_SR_RESULT = document.querySelector("#R3_SR_RESULT");
let R3_SCORE_RESULT = document.querySelector("#R3_SCORE_RESULT");
let R3_DIFF = document.querySelector("#R3_DIFFERENTIAL");
// Round 4
let R4_CR_RESULT = document.querySelector("#R4_CR_RESULT");
let R4_SR_RESULT = document.querySelector("#R4_SR_RESULT");
let R4_SCORE_RESULT = document.querySelector("#R4_SCORE_RESULT");
let R4_DIFF = document.querySelector("#R4_DIFFERENTIAL");
// Round 5
let R5_CR_RESULT = document.querySelector("#R5_CR_RESULT");
let R5_SR_RESULT = document.querySelector("#R5_SR_RESULT");
let R5_SCORE_RESULT = document.querySelector("#R5_SCORE_RESULT");
let R5_DIFF = document.querySelector("#R5_DIFFERENTIAL");
// Round 6
let R6_CR_RESULT = document.querySelector("#R6_CR_RESULT");
let R6_SR_RESULT = document.querySelector("#R6_SR_RESULT");
let R6_SCORE_RESULT = document.querySelector("#R6_SCORE_RESULT");
let R6_DIFF = document.querySelector("#R6_DIFFERENTIAL");
// Handicap Index
let HANDICAP_INDEX = document.querySelector("#HANDICAP_INDEX_RESULT")

let scoreCard = new ScoreCard();
scoreCard.addScore(R1_CR,R1_SR,R1_SCORE);
scoreCard.addScore(R2_CR,R2_SR,R2_SCORE);
scoreCard.addScore(R3_CR,R3_SR,R3_SCORE);
scoreCard.addScore(R4_CR,R4_SR,R4_SCORE);
scoreCard.addScore(R5_CR,R5_SR,R5_SCORE);
scoreCard.addScore(R6_CR,R6_SR,R6_SCORE);

let diffs = Calculator.returnDifferentials(scoreCard);
let calculatedScores = Calculator.netHandicapDiffAvg(diffs);
HANDICAP_INDEX_RESULT.textContent = calculatedScores;

// Update Result Pane

// Round 1
R1_CR_RESULT.textContent = R1_CR;
R1_SR_RESULT.textContent = R1_SR;
R1_SCORE_RESULT.textContent = R1_SCORE;
R1_DIFF.textContent = diffs[0];
// Round 2
R2_CR_RESULT.textContent = R2_CR;
R2_SR_RESULT.textContent = R2_SR;
R2_SCORE_RESULT.textContent = R2_SCORE;
R2_DIFF.textContent = diffs[1];
// Round 2
R3_CR_RESULT.textContent = R3_CR;
R3_SR_RESULT.textContent = R3_SR;
R3_SCORE_RESULT.textContent = R3_SCORE;
R3_DIFF.textContent = diffs[2];
// Round 4
R4_CR_RESULT.textContent = R4_CR;
R4_SR_RESULT.textContent = R4_SR;
R4_SCORE_RESULT.textContent = R4_SCORE;
R4_DIFF.textContent = diffs[3];
// Round 5
R5_CR_RESULT.textContent = R5_CR;
R5_SR_RESULT.textContent = R5_SR;
R5_SCORE_RESULT.textContent = R5_SCORE;
R5_DIFF.textContent = diffs[4];
// Round 6
R6_CR_RESULT.textContent = R6_CR;
R6_SR_RESULT.textContent = R6_SR;
R6_SCORE_RESULT.textContent = R6_SCORE;
R6_DIFF.textContent = diffs[5];

// Handicap Index
let handicapIndexInput = document.querySelector("#handicapIndex");
handicapIndexInput.value=calculatedScores;



}


let extractTableButton = document.querySelector("#extractTable");
extractTableButton.addEventListener("click",extractTable);

var Table = {
    rounds:[
    newRound(1,R1_CR,R1_SR,R1_SCORE),
    newRound(2,R2_CR,R2_SR,R2_SCORE),
    newRound(3,R3_CR,R3_SR,R3_SCORE),
    newRound(4,R4_CR,R4_SR,R4_SCORE),
    newRound(5,R5_CR,R5_SR,R5_SCORE),
    newRound(6,R6_CR,R6_SR,R6_SCORE)
    ]

    
}

class Round {
    constructor(){
        this.number;
        this.courseRating;
        this.slopeRating;
        this.score;
    }

    static newRound(number,courseRating,slopeRating,score){
        let round = new Round();
        round.number=
        round.courseRating = courseRating;
        round.slopeRating = slopeRating;
        round.score=score;

    }
}


// Calculate Handicap Index
// Buttons
// Calc Button
let calculateHandicapIndexButton = document.querySelector("#calculateHandicap");
calculateHandicapIndexButton.addEventListener("click",calculateHandicapIndex);

// Clear Inputs Button
let clearInputsButton = document.querySelector("#clearInputs");
clearInputsButton.addEventListener("click", clearInputs);

// Course Handicap Result Span
let courseHandicapResultSpan = document.querySelector("#courseHandicapSpan");

let handicapIndexInput = document.querySelector("#handicapIndex");
let courseRatingInput = document.querySelector("#courseRating");
let slopeRatingInput = document.querySelector("#slopeRating");

function calculateHandicapIndex(){

 let handicap = calcCourseHandicap(handicapIndexInput.value,slopeRatingInput.value,courseRatingInput.value);
 console.log("handicap = "+ handicap);
 courseHandicapResultSpan.textContent = handicap;


}

function clearInputs(){
    handicapIndexInput.value="";
    courseRatingInput.value="";
    slopeRatingInput.value="";
    courseHandicapResultSpan.textContent="__.__";
    
    
}