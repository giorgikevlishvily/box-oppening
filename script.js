// Rewards for each box type
const rewards = {
    brawl: ["Shelly", "Colt", "Nita"],
    big: ["El Primo", "Jessie", "Poco"],
    mega: ["Spike", "Leon", "Crow"],
    halloween: ["Ghostly Skin", "Pumpkin Brawler", "Spooky Coins (100)"],
    christmas: ["Santa Skin", "Reindeer Brawler", "Festive Coins (150)"]
};

const rarities = {
    "Shelly": "common", "Colt": "common", "Nita": "common",
    "El Primo": "rare", "Jessie": "rare", "Poco": "rare",
    "Spike": "legendary", "Leon": "legendary", "Crow": "legendary",
    "Ghostly Skin": "super-rare", "Pumpkin Brawler": "super-rare",
    "Santa Skin": "super-rare", "Reindeer Brawler": "super-rare"
};

let playerInventory = [];
let playerCoins = 0;

function openBox(boxType) {
    const boxRewards = rewards[boxType];
    const button = document.querySelector(`button[onclick="openBox('${boxType}')"]`);
    button.classList.add("opening-box-animation");

    setTimeout(() => {
        button.classList.remove("opening-box-animation");
        const randomReward = boxRewards[Math.floor(Math.random() * boxRewards.length)];

        if (!playerInventory.includes(randomReward)) {
            playerInventory.push(randomReward);
            const rarity = rarities[randomReward] || 'common';
            displayReward(`You received: ${randomReward}`, rarity);
            updateInventory();
        } else {
            playerCoins += 50;
            displayReward(`Duplicate item! You received 50 coins.`);
            updateInventory();
        }
    }, 1000);
}

function displayReward(message, rarity = 'common') {
    const rewardElement = document.getElementById("reward");
    rewardElement.innerHTML = `<span class="${rarity}">${message}</span>`;
}

function updateInventory() {
    const inventoryElement = document.getElementById("inventory");
    inventoryElement.innerHTML = `Items: ${playerInventory.join(", ")}<br>Coins: ${playerCoins}`;
    checkForThemes();
}

function applyTheme(theme) {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
}

function checkForThemes() {
    if (playerInventory.includes("Ghostly Skin")) {
        applyTheme('halloween');
    } else if (playerInventory.includes("Santa Skin")) {
        applyTheme('christmas');
    }
}

function startMiniGame() {
    const miniGameArea = document.getElementById("miniGameArea");
    miniGameArea.innerHTML = '';
    const box = document.createElement("div");
    box.className = "mini-box";
    box.style.top = `${Math.random() * 80}%`;
    box.style.left = `${Math.random() * 80}%`;

    box.onclick = () => {
        playerCoins += 10;
        updateInventory();
        miniGameArea.innerHTML = '';
        displayReward("You earned 10 coins!");
    };

    miniGameArea.appendChild(box);
    setTimeout(() => { miniGameArea.innerHTML = ''; }, 3000);
}
