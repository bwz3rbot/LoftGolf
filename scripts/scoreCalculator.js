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

function convertToAdjustedGrossScores(){

}





console.log("initiating the calculator!");

function calcScore(){
    alert("your score:");
}




// Scorecard. The Form on the HTML Page, contains all the input fields - the data the get from their physical scorecards
class ScoreCard {
    constructor(){
        this.rounds = [{Round}]
        }

    addScore(courseRating,slope,handicapIndex){
        return this.rounds.push(Round.newRound(courseRating,slope,handicapIndex));
    }


}

class Round {
    constructor(){
        this.courseRating;
        this.slope;
        this.handicapIndex;
    }
    static newRound(courseRating, slope, handicapIndex){
        let round = new Round();
        round.courseRating = courseRating;
        round.slope=slope;
        round.handicapIndex=handicapIndex;
        return round;
    }
}


class Calculator{

    static returnDifferentials(scoreCard){
        console.log("returning differentials...")
        const differentials=[];
        scoreCard.rounds.forEach(round => {
            console.log("inside for each")
            
            differentials.push(Calculator.calculateHandicapDifferential(round));
        });
        return differentials;

    }


static calculateHandicapDifferential(round){
 
    console.log("round.handicapIndex = " + round.handicapIndex);
    console.log("round.courseRating = " + round.courseRating);
    console.log("round.slope = " + round.slope);
    let handicapDifferential = (round.handicapIndex - round.courseRating) * 113 / round.slope;
    console.log("handicapDifferential = "+handicapDifferential);
    // rounding to nerest 10th
    handicapDifferential = Math.ceil(handicapDifferential/10) * 10;
    return handicapDifferential;

}

}

let scoreCard = new ScoreCard;
scoreCard.addScore(90, 126, 100);
scoreCard.addScore(60,115,90);
scoreCard.addScore(88,130,96);

Calculator.returnDifferentials(scoreCard);