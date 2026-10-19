let scores = [85, 72, 91, 64, 78];
console.log("Student Scores:");

    for (let i = 0; i < scores.length; i++) {
        console.log(scores[i]);
    }

let total = 0;
    for (let i = 0; i < scores.length; i++) {
        total += scores[i];
    }    
 
let average = total / scores.length;
let highest = Math.max(...scores);
let lowest = Math.min(...scores);

    let passed = 0;
    let failed = 0;
        for (let i = 0; i < scores.length; i++) {
            let remark;
            if (scores[i] >= 90) {
                remark = "Excellent";
            } else if (scores[i] >= 80) {
                remark = "Very Good";
            } else if (scores[i] >= 75) {
                remark = "Good"; 
            } else {
                remark = "Failed";
            }

            let status;
            if (scores[i] >= 75) {
                status = "Passed";
                passed++;
            } else {
                status = "Failed";
                failed++;
            }

            if (status === "Passed") {
            console.log(`Student ${i + 1}: ${scores[i]} - ${remark} - ${status}`);
            } else {
            console.log(`Student ${i + 1}: ${scores[i]} - ${remark}`);
            }


        }

        

        console.log("\nTotal Score:", total);
        console.log("Average Score:", average);
        console.log("Highest Score", highest);
        console.log("Lowest Score:", lowest);
        console.log("Passed:", passed);
        console.log("Failed:", failed);