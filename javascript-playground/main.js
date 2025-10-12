// 02 - Startup name generator
// Let's create a function that can generate startup names:
// Create a function called getStartupName. When called it should return a random startup name. Here is how it should work:
// Inside the function there should be two arrays with startup words
// Use the two arrays to get a random word from each array and return the new startup name with the two words
// Here is an example with the following two arrays:

const firstWords = ["Tech", "Inno", "Smart", "Blue", "Next", "Bright", "Quantum", "Rapid", "Future", "Digital"];
const secondWords = ["Vision", "Solutions", "Systems", "Works", "Dynamics", "Hub", "Network", "Innovations", "Labs", "Path"];

function getStartupName() {

    console.clear();

    const randomFirst = firstWords[Math.floor(Math.random() * firstWords.length)];
    const randomSecond = secondWords[Math.floor(Math.random() * secondWords.length)];
    const finalStartupName = `${randomFirst} ${randomSecond}`;

    console.log(`Your startup name could be: \"${finalStartupName}\"`);
    return `Your startup name could be: \"${finalStartupName}\"`;

}
// console.log(getStartupName());  

// Forklaring: 
// Vi har en funktion getStartupName(), som først sætter værdierne i tre variabler og derefter returnere en string: 
// randomFirst og randomSecond kalder tilhørende array på en tilfældig indeksering. 
// For den tilfældigt indeksering bruges den indbyggede funktion random(), som retunere et decimaltal ∈ [0;1[
// Dette ganges med længden af arrayet - som i dette tilfælde er 10. 
// Herefter rundes der ned til det nærmeste heltal med floor() funktionen.

// Eksempel: 
//      randomInt: 0.47924657 
//      arrayLength: 10
//    0.47924657 * 10 = 4.7924657 
//    Math.floor(4.7924657) = 4
// Den tilfældige indeksering ville altså være 4 i dette tilfælde. 

// Til sidst kombineres de to tilfældige strings, og returneres. 




// 3 - Treasure Hunter
// Scenario: You are on a small island, and there's a treasure box hidden somewhere! Your job is to move around the island to find it.
// Island Setup: The island is represented by a 1D array of 5 elements. One of these elements is the hidden treasure (T), and the rest are empty (-).
// Objectives:
// Log out how many moves there are in the island 
// For each move log the following out: If there is a treasure log out: Treasure found at move 3 :) If there is not a treasure log out: No treasure found :(
// Log out how many treasures there are in the island 

const islands = {
    island1: ['-', '-', 'T', '-', '-'],
    island2: ['T', 'T', 'T', '-'],
    island3: ['T', 'T', 'T', '-', '-', '-', '-', 'T']
};

function findTreasure() {

    console.clear();

    const islandInput = prompt("Enter wanted island set: (island1, island2, island3)");

    if (!islands[islandInput]) {
        alert("Invalid island set");
        return;
    }

    const islandName = islandInput;
    const chosenisland = islands[islandInput];

    console.log(`Chosen island: ${islandName}`);

    const chosenIsland = islands[islandName]
    let amountOfTreasures = 0;

    for (let i = 0; i < chosenIsland.length; i++) {
        if (chosenIsland[i] === 'T') {
            console.log(`Treasure found at step ${i + 1}.`);
            amountOfTreasures++
        } else { console.log(`No treasure found at step ${i + 1}.`); }
    }


    console.log(`\nThere where ${chosenIsland.length} steps, with a total of ${amountOfTreasures} treasure(s) on ${islandName}`);

}
// findTreasure("island3");


// Forklaring:
// 1. Funktionen beder først brugeren om at vælge et ø-sæt. Hvis navnet ikke eksisterer i objektet, stoppes funktionen.
// 2. Når et gyldigt ø-sæt er valgt, logges navnet og det matchende array gemmes til videre brug.
// 3. Et for-loop gennemløber hvert felt på øen. Et 'T' betyder fundet skat og tæller op, mens '-' logger, at der ikke blev fundet noget.
// 4. Til sidst logges et sammendrag med antal trin og samlede skatte på den valgte ø.





// 04 - Student Grades Analysis
// Objective: In this exercise, students will create a program that analyzes student grades, determines the highest and lowest grades, and calculates the average grade.

// Create an array that holds 8 grades (integers between 0 and 100) representing the scores of different students
const studentGrades = {
    randomGrades: [24, 92, 74, 72, 84, 15, 62, 39],   // avg = 57.75
    gradesA: [95, 92, 90, 93, 96, 91, 94, 97],   // avg = 93.5
    gradesB: [82, 85, 88, 84, 86, 87, 83, 81],   // avg = 84.5
    gradesC: [72, 75, 78, 70, 74, 76, 73, 71],   // avg = 73.6
    gradesD: [65, 68, 62, 60, 64, 66, 63, 61]    // avg = 63.6
};

function getGradeInformation() {

    console.clear();

    const wantedGrades = prompt("Enter wanted grade set: (randomGrades, gradesA, gradesB, gradesC, gradesD)");

    if (!studentGrades[wantedGrades]) {
        alert("Invalid grade set name");
        return;
    }

    const chosenGrades = studentGrades[wantedGrades];

    console.log(`Chosen grades: ${chosenGrades}`);


    // Log out how many grades there are
    console.log(`Amount of grades: ${chosenGrades.length}`);


    // Classify and log each grade into one of the following categories
    function getLetterGrade(grade) {
        if (grade >= 90) return "A";
        if (grade >= 80) return "B";
        if (grade >= 70) return "C";
        if (grade >= 60) return "D";
        return "F";
    }

    for (const grade of chosenGrades) {
        console.log(`${grade}: ${getLetterGrade(grade)}`);
    }


    // Evaluate overall class performance
    const getClassAverage = () => chosenGrades.reduce((sum, grade) => sum + grade) / chosenGrades.length;

    function getClassPerformance() {
        const classAverage = getClassAverage();

        if (classAverage >= 90) return `Class performance is excellent (${classAverage})`;
        if (classAverage >= 80) return `Class performance is good (${classAverage})`;
        if (classAverage >= 70) return `Class performance is satisfactory (${classAverage})`;
        return `Class performance needs improvement (${classAverage})`;

    }
    console.log(getClassPerformance());


    // Determine the highest grade in the array
    const highestGrade = Math.max(...chosenGrades);
    const getHighestGrade = () => `Highest grade: ${highestGrade} (${getLetterGrade(highestGrade)})`;
    console.log(getHighestGrade());


    // Determine the lowest grade in the array
    const lowestGrade = Math.min(...chosenGrades);
    const getLowestGrade = () => `Lowest grade: ${lowestGrade} (${getLetterGrade(lowestGrade)})`;
    console.log(getLowestGrade());


    // Determine the average grade
    const averageGrade = chosenGrades.reduce((sum, grade) => sum + grade, 0) / chosenGrades.length;
    const getAverageGrade = () => `Average grade: ${averageGrade}`;
    console.log(getAverageGrade());

}
// getGradeInformation(studentGrades["randomGrades"]);

// Forklaring:
// 1. Brugeren vælger først et sæt karakterer. Hvis navnet ikke findes, afbrydes funktionen.
// 2. Alle karakterer logges, og en funktion oversætter hver karakter til et bogstav (A-F).
// 3. Gennemsnittet beregnes for at vurdere klassens niveau og logge en tekst baseret på resultatet.
// 4. Math.max og Math.min bruges til at finde højeste og laveste karakter, som vises sammen med bogstavkarakteren.
// 5. Til sidst logges gennemsnittet igen, så brugeren får et overskueligt overblik over datasættet.






// 06 - Dice Rolling Championship
// Scenario: Two players compete in a dice rolling championship! Each player takes turns rolling a dice, and after 10 rounds, the player with the highest total score wins.
// Level 1 - Player Setup


function diceRollingGame() {
    console.clear();
    const welcomeMessage = console.log("Welcome to the Dice Rolling Championship!");
    const introduceMessage = console.log("What are your names?");

    let amountOfPlayers = 0;
    const players = [];
    let amountOfRounds = 0;
    let currentRound = 0;

    const getAmountsOfPlayers = () => {
        const input = prompt("How many players will be playing? (min. 2)");

        if (input >= 2) { amountOfPlayers = input }
        else { getAmountsOfPlayers() }
    }
    getAmountsOfPlayers()

    const getAmountsOfRounds = () => {
        const input = prompt("How many rounds? (min. 1)");

        if (input >= 1) { amountOfRounds = input }
        else { getAmountsOfRounds() }
    }
    getAmountsOfRounds()

    for (let i = 0; i < amountOfPlayers; i++) {
        players.push(prompt(`What is player ${i + 1}s name?`))
    }

    for (let i = 0; i < players.length; i++) {
        console.log(`Welcome ${players[i]}!`);
    }

    let playerScores = Array(players.length).fill(0);

    function generateRandomDiceRoll(player) {
        let randomDiceRoll = Math.floor(Math.random() * 6) + 1
        playerScores[player] += randomDiceRoll;
        console.log(`${players[player]}'s rolled: ${randomDiceRoll} (Total: ${playerScores[player]})`);
        return randomDiceRoll[player]
    }

    function getWinner() {
        const max = Math.max(...playerScores);
        const winner = players.filter((_, i) => playerScores[i] === max);

        if (winner.length === 1) {
            console.log(`The winner is ${winner[0]} with ${max}`);
        } else {
            console.log(`Tie between: ${winner.join(", ")} with ${max}`);
        }
    }

    console.log("Press Enter to start next round!");

    document.addEventListener("keydown", function (keydown) {
        if (keydown.key === "Enter") {
            if (currentRound < amountOfRounds) {
                currentRound++;
                console.log(`Round ${currentRound}:`);
                for (let p = 0; p < players.length; p++) {
                    generateRandomDiceRoll(p)
                }
            } else {
                console.log(`The game is over`);
                getWinner();
            }
        }
    });

}

// Forklaring:
// 1. Når spillet starter, spørges brugeren efter antal spillere og runder via funktioner som sikrer gyldige værdier.
// 2. Hver spiller indtaster et navn, og der oprettes et scores-array med udgangspunkt i nul for alle spillere.
// 3. Et globalt keydown-lytter starter hver runde, når Enter trykkes: alle spillere får et terningeslag og deres samlede score opdateres.
// 4. Efter den sidste runde kaldes getWinner(), som finder højeste score og håndterer både vinder og uafgjort scenarier.