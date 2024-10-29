const rewards = {
    brawl: ["Shelly", "Nita", "Colt", "Bull", "Jessie", "Brock", "Dynamike", "Bo", "Tick", "8-Bit",
            "20 Coins", "30 Power Points", "5 Gems", "10 Gems", "50 Coins"],
    big: ["Emz", "El Primo", "Poco", "Barley", "Rico", "Darryl", "Penny", "Carl", "Jacky", "Gus",
            "50 Coins", "100 Power Points", "15 Gems", "30 Gems", "100 Coins"],
    mega: ["Frank", "Pam", "Piper", "Bea", "Nani", "Edgar", "Griff", "Grom", "Bonnie", "Fang",
            "100 Coins", "200 Power Points", "30 Gems", "50 Gems", "200 Coins"],
    dead: ["Nothing", "1 Coin", "1 Power Point", "Nothing", "1 Gem"],
    legend: ["Spike", "Crow", "Leon", "Sandy", "Amber", "Meg", "Chester", "Lola", "Otis", "Willow",
             "500 Coins", "Star Power", "Gadget", "100 Gems", "Legendary Skin"],
    skin: ["Shark Leon", "Summer Jessie", "Wizard Barley", "Holiday Pam", "Mecha Crow",
           "Night Witch Mortis", "Tropical Sprout", "Dino Leon", "Dark Lord Spike", "Phoenix Crow",
           "Exclusive Skin", "Random Skin", "50 Power Points", "100 Power Points", "75 Gems"],
};

let inventory = new Set();

document.getElementById("openBox").addEventListener("click", openBox);
document.getElementById("playRPS").addEventListener("click", playRockPaperScissors);
document.getElementById("playGuessNumber").addEventListener("click", playGuessNumber);
document.getElementById("exchangeBrawler").addEventListener("click", exchangeBrawler);

function openBox() {
    const boxType = document.getElementById("boxSelect").value;
    const reward = getRandomReward(boxType);

    const boxAnimation = document.getElementById("boxAnimation");
    boxAnimation.style.display = "block";

    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "";

    setTimeout(() => {
        boxAnimation.style.display = "none";
        displayResult(reward);
        addToInventory(reward);
    }, 1500);
}

function getRandomReward(boxType) {
    const possibleRewards = rewards[boxType];
    const randomIndex = Math.floor(Math.random() * possibleRewards.length);
    return possibleRewards[randomIndex];
}

function displayResult(reward) {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `You won: ${reward}!`;
}

function addToInventory(reward) {
    if (!inventory.has(reward)) {
        inventory.add(reward);
        updateInventoryDisplay();
    }
}

function updateInventoryDisplay() {
    const inventoryDiv = document.getElementById("inventory");
    inventoryDiv.innerHTML = "";

    inventory.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("inventory-item");
        itemDiv.textContent = item;
        inventoryDiv.appendChild(itemDiv);
    });
}

// Mini Games
function playRockPaperScissors() {
    const choices = ["Rock", "Paper", "Scissors"];
    const userChoice = prompt("Choose Rock, Paper, or Scissors:");
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result;

    if (userChoice === computerChoice) {
        result = "It's a draw!";
    } else if ((userChoice === "Rock" && computerChoice === "Scissors") ||
               (userChoice === "Paper" && computerChoice === "Rock") ||
               (userChoice === "Scissors" && computerChoice === "Paper")) {
        result = `You win! You chose ${userChoice} and the computer chose ${computerChoice}. You earn 10 Coins!`;
        addToInventory("10 Coins");
    } else {
        result = `You lose! You chose ${userChoice} and the computer chose ${computerChoice}.`;
    }

    displayGameResult(result);
}

function playGuessNumber() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const userGuess = prompt("Guess a number between 1 and 10:");
    
    if (parseInt(userGuess) === randomNumber) {
        displayGameResult("Correct! You guessed the number and won 5 Gems!");
        addToInventory("5 Gems");
    } else {
        displayGameResult(`Incorrect! The correct number was ${randomNumber}. Try again!`);
    }
}

function displayGameResult(result) {
    const gameResultDiv = document.getElementById("gameResult");
    gameResultDiv.textContent = result;
}

// Brawler Exchange Mechanic
function exchangeBrawler() {
    const brawlersInInventory = Array.from(inventory).filter(item => !isNaN(item.indexOf("Coins")) || !isNaN(item.indexOf("Gems")));
    
    if (brawlersInInventory.length === 0) {
        alert("You don’t have any brawlers to exchange!");
        return;
    }

    const chosenBrawler = prompt(`Choose a brawler to exchange: ${brawlersInInventory.join(", ")}`);
    
    if (inventory.has(chosenBrawler)) {
        const availableBrawlers = Object.values(rewards).flat().filter(item => !inventory.has(item) && !item.includes("Coins") && !item.includes("Gems"));
        const randomIndex = Math.floor(Math.random() * availableBrawlers.length);
        const offeredBrawler = availableBrawlers[randomIndex];

        const confirmExchange = confirm(`Exchange ${chosenBrawler} for ${offeredBrawler}?`);

        if (confirmExchange) {
            inventory.delete(chosenBrawler);
            inventory.add(offeredBrawler);
            updateInventoryDisplay();
            alert(`You exchanged ${chosenBrawler} for ${offeredBrawler}!`);
        } else {
            alert("Exchange canceled.");
        }
    } else {
        alert("Invalid brawler selection or brawler not in inventory.");
    }
}

// JavaScript for toggling inventory display
document.getElementById('toggleInventory').addEventListener('click', function () {
    const inventory = document.getElementById('inventory');
    // Toggle the display style
    if (inventory.style.display === 'none') {
        inventory.style.display = 'block';
        this.textContent = 'Hide Inventory'; // Change button text
    } else {
        inventory.style.display = 'none';
        this.textContent = 'Show Inventory'; // Change button text
    }
});

// Sample box opening function (you can expand this with your actual logic)
document.getElementById('openBox').addEventListener('click', function () {
    const boxSelect = document.getElementById('boxSelect').value;
    const result = document.getElementById('boxResult');
    result.innerHTML = `You opened a ${boxSelect}!`; // Example result
});
