// Tamayo_ImeeBelle_ArrayExercise.js
// Student Score Array Analyzer - Version 3



// STARTING DATA
const studentNames = ['Ana', 'Ben', 'Carla', 'Daniel', 'Ella'];
const studentScores = [85, 72, 91, 64, 78];

const activityScores = [
  [80, 85, 90],
  [70, 72, 74],
  [88, 92, 95],
  [60, 65, 67],
  [75, 78, 81],
];

const originalNames = ['Ana', 'Ben', 'Carla', 'Daniel', 'Ella'];


// PART A: Display the Original Records
console.log('--- Part A: Original Records ---');
for (let i = 0; i < studentNames.length; i++) {
  console.log(`${i} - ${studentNames[i]}: ${studentScores[i]}`);
}


// PART B: Add New Students
console.log('\n--- Part B: Add New Students ---');

studentNames.push('Faith');
studentScores.push(88);

studentNames.unshift('Aaron');
studentScores.unshift(76);

console.log('Updated names:', studentNames);
console.log('Updated scores:', studentScores);
console.log('Number of students:', studentNames.length);


// PART C: Remove and Replace Records
console.log('\n--- Part C: Remove and Replace Records ---');

studentNames.shift();
studentScores.shift();

studentNames.pop();
studentScores.pop();

const danielIndex = studentNames.indexOf('Daniel');
studentNames.splice(danielIndex, 1);
studentScores.splice(danielIndex, 1);

studentNames.splice(2, 0, 'Grace');
studentScores.splice(2, 0, 82);

console.log('Final names:', studentNames);
console.log('Final scores:', studentScores);


// PART D: Calculate Class Statistics
console.log('\n--- Part D: Class Statistics ---');

const total = studentScores.reduce((sum, score) => sum + score, 0);
const average = total / studentScores.length;

let highest = studentScores[0];
let lowest = studentScores[0];
for (let i = 1; i < studentScores.length; i++) {
  if (studentScores[i] > highest) highest = studentScores[i];
  if (studentScores[i] < lowest) lowest = studentScores[i];
}

console.log('Total Score:', total);
console.log('Average Score:', average.toFixed(2));
console.log('Highest Score:', highest);
console.log('Lowest Score:', lowest);


// PART E: Analyze Passing Scores
console.log('\n--- Part E: Passing Score Analysis ---');

const PASSING_SCORE = 75;

const passingScores = studentScores.filter((score) => score >= PASSING_SCORE);
const passFailLabels = studentScores.map((score) =>
  score >= PASSING_SCORE ? 'Passed' : 'Failed'
);
const anyoneFailed = studentScores.some((score) => score < PASSING_SCORE);
const everyonePassed = studentScores.every((score) => score >= PASSING_SCORE);

console.log('Passing scores:', passingScores);
console.log('Pass/Fail labels:', passFailLabels);
console.log('Did anyone fail?', anyoneFailed);
console.log('Did everyone pass?', everyonePassed);


// PART F: Sort and Search
console.log('\n--- Part F: Sort and Search ---');

const sortedScoresCopy = Array.from(studentScores);
sortedScoresCopy.sort((a, b) => b - a);

console.log('Sorted copy (highest to lowest):', sortedScoresCopy);
console.log('Does the class have a 91?', studentScores.includes(91));
console.log('Index of score 91:', studentScores.indexOf(91));


// PART G: Process a Two-Dimensional Array
console.log('\n--- Part G: Activity Scores ---');

const activityAverages = [];

for (let i = 0; i < activityScores.length; i++) {
  let rowTotal = 0;
  for (let j = 0; j < activityScores[i].length; j++) {
    console.log(`Student ${i}, Activity ${j}: ${activityScores[i][j]}`);
    rowTotal += activityScores[i][j];
  }
  const rowAverage = rowTotal / activityScores[i].length;
  activityAverages.push(rowAverage);
  console.log(`${originalNames[i]}'s activity average: ${rowAverage.toFixed(2)}`);
}

console.log('All activity averages:', activityAverages);


// PART H: Create a Text Summary
console.log('\n--- Part H: Text Summary ---');
console.log('Students: ' + studentNames.join(' | '));