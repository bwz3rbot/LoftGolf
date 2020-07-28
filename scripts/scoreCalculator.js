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
    constructor(){
        this.rounds = []
        }

        // 1.a addScore() to create a row of data from the table
    addScore(courseRating,slope,handicapIndex){
        return this.rounds.push(newRound(courseRating,slope,handicapIndex));
    }


}

// 2. Use Calculator to process the data in each column of the table
class Calculator{

    // 2.a returnDifferentials() takes in a ScoreCard object
    // and returns the calculated differentials for each round
    // this method assumes the original gross scores were already
    // converted to adjusted gross scores.
    static returnDifferentials(scoreCard){
        console.log("returning differentials...")
        const differentials=[];
        let i = 1;
        scoreCard.rounds.forEach(round => {
            console.log("************");
           console.log("ROUND "+ (i++))
            
            differentials.push(Calculator.calculateHandicapDifferential(round));
        });
        console.log("**********************************************");
        console.log("ALL ROUNDS PROCESSED... RETURNING DIFFERENTIALS!");
        return differentials;

    }
    // takes list of scores
static calcScores(scores){
    console.log("CALCULATING FINAL SCORES ON EACH ROUND");
    console.log("scores= "+ scores);
      // sum scores
      let scoresSum = scores.reduce((acc, score) => acc + score);
  let average = scoresSum / scores.length;
  average = average * 0.96;
  // truncate to 1 decimal place
  let handicapDifferential = Math.round(average * 10) / 10;
  console.log("CALCULATED HANDICAP INDEX:: " + average);
  return average;
}


static calculateHandicapDifferential(round){
 
    console.log("round.courseRating = " + round.courseRating);
    console.log("round.slope = " + round.slope);
    console.log("round.handicapIndex = " + round.handicapIndex);
   
    let handicapDifferential = (round.handicapIndex - round.courseRating) * 113 / round.slope;
    console.log("handicapDifferential = "+handicapDifferential);
    // rounding to nerest 10th - FIXED
    handicapDifferential = Math.round(handicapDifferential * 10) / 10;
    console.log("correct Diff ----"  + handicapDifferential);
    console.log("handicapDifferential = " + handicapDifferential);
    return handicapDifferential;

}

}



// final step
function calcCourseHandicap(calculatedScores){
    console.log("DEBUG calculatedScores = "+ calculatedScores);
    let courseHandicap = calculatedScores * 120 / 113;
    console.log(" DEBUG courseHandicap = " + courseHandicap);
    courseHandicap /= 113;
    courseHandicap = Math.floor(courseHandicap * 10) / 10;
    console.log("YOUR COURSE HANDICAP :: " + courseHandicap);

}




    function newRound(courseRating, slope, handicapIndex){
        let round = {};
        round.courseRating = courseRating;
        round.slope=slope;
        round.handicapIndex=handicapIndex;
        return round;
    }




function createDummyScorecard(){

    let scoreCard = new ScoreCard();
    scoreCard.addScore(70.3, 126, 100);
    scoreCard.addScore(35.3, 122, 100);
    scoreCard.addScore(66.8, 120, 100);
    scoreCard.addScore(65.9,118,85);
    scoreCard.addScore(74.3,137,88);
    scoreCard.addScore(71.1,126,90);
    return scoreCard;

}

function runCalculator(scoreCard){
    console.log("************");
    console.log("STARTING CALCULATOR");
    console.log("************");
    
    // 1. Convert gross scores to Adjusted Gross Scores (DONE BY USER)

    // 2. Calculate Handicap Differential for each score
    let diffs = Calculator.returnDifferentials(scoreCard);
    console.log("diffs = " + diffs);
 
    // 3. Select lowest Handicap Differentials(skipping for now)
    // 4. Average lowest Handicap Differentials
    let calculatedScores = Calculator.calcScores(diffs);


    // 5. Multiply the average Handicap Differential by 96% (done in calcscores)

    // 6. Arrive at Handicap Index by truncating - deleting - the number(s) to the right of tenths (done in calcScores)
    // 7. Calculate Course Handicap
    calcCourseHandicap(calculatedScores);


}

const scoreCard = createDummyScorecard();
runCalculator(scoreCard);