
class Student {
    constructor(name, scores) {
        this.name = name;
        this.scores = scores;

    }

    getAverage() {
        let total = 0;

        for(let i = 0; i < this.scores.length; i++){
            total += this.scores[i];

        }

        return total / this.scores.length;

    }
    getLetterGrade() {
        let average = this.getAverage();

        if (average >= 90){
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70){
            return "C";
        } else if (average >= 60){
            return "D";
        } else {
            return "F";
        }

    }
}

function analyzeClass(students) {
    let classSum = 0;
    let highestAverage = -1;
    let topStudent = "";

    console.log("\n\n\n---STUDENT REPORT---");
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const average = student.getAverage();
        const grade = student.getLetterGrade();

        console.log(`${student.name} - Average: ${average.toFixed(1)} | Grade: ${grade} `);

        classSum += average;

        if (average > highestAverage) {
            highestAverage = average;
            topStudent = student.name;
        }

    }
    const classAverage = classSum / students.length;

    console.log("---------------");
    console.log(`Class Average: ${classAverage.toFixed(1)}`);
    console.log(`Top Student: ${topStudent} with ${highestAverage.toFixed(1)}`);

}
let student1 = new Student("Lany", [85, 90, 92]);
let student2 = new Student("Bongbung", [70, 75, 68]);
let student3 = new Student("Dutherthe", [95, 98, 92]);
let student4 = new Student("Pico", [55, 60, 58]);

analyzeClass([student1, student2, student3, student4]);