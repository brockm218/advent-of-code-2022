const fs = require('fs');

const inputFile = './input.txt';
const input = fs.readFileSync(inputFile, 'utf8').trim();

// Split the input into an array of strings, where each string
// represents the calories of a single food item carried by an Elf
const foodCalories = input.split("\n");

// Initialize variables to keep track of the Elf carrying the most
// Calories, and the total number of Calories that they are carrying
let currentElf = -1;
let maxCalorieElf = -1;
let maxCalories = 0;

const elves = [];

// Loop through the array of food items and add up the Calories
// for each Elf
for (const calories of foodCalories) {
  if (calories.length === 0) {
    // If the current item is an empty string, it indicates that
    // we have reached the end of the inventory for the current Elf
    // and we need to move on to the next one
    currentElf++;
    continue;
  }

  const currentCalories = parseInt(calories, 10);
  if (currentElf === -1) {
    // If the currentElf is -1, it means that this is the first
    // food item that we are processing, so we need to initialize
    // the currentElf and maxCalorieElf to 0
    currentElf = 0;
    maxCalorieElf = 0;
  }

  // If we have already seen this Elf before, add the current
  // number of Calories to their existing total
  if (currentElf < elves.length) {
    elves[currentElf].calories += currentCalories;
  } else {
    // Otherwise, create a new object to represent the current Elf
    // and add it to the list of Elves
    elves.push({
      id: currentElf,
      calories: currentCalories,
    });
  }
}

// Loop through the array of Elves, keeping track of which Elf
// is carrying the most Calories
for (const elf of elves) {
  if (elf.calories > maxCalories) {
    // If the current Elf is carrying more Calories than the Elf
    // carrying the most Calories, update the maxCalorieElf and
    // maxCalories variables
    maxCalorieElf = elf.id;
    maxCalories = elf.calories;
  }
}

// Output the results
console.log(
  `Elf #${maxCalorieElf + 1} is carrying the most Calories: ${maxCalories}`
);
