var randomNumber = function(min, max) {
	var value = Math.floor(Math.random() * (max - min + 1)) + min;

	return value;
};

var fight0rSkip = function(enemy) {
	// prompt user to either fight or skip the battle
	var prompt = window.prompt("Would you like to FIGHT or SKIP this battle?");
	if (prompt)
		var promptFight = prompt.toLowerCase();

	// player decides to skip or clicks "cancel"
	if (promptFight === "skip" || prompt === null) {
		var confirmSkip = window.confirm("Are you sure you want to skip this battle with " + enemy.name + "?" + 
										 "\n\nThis will cost 3 coins, and you currently have " + playerInfo.money + ".");
		// player selects "yes" to skip fight
		 if (confirmSkip) {
			// skip and remove coins (penalty), after confirming available coins
			if (playerInfo.money >= 3) {
				playerInfo.money = Math.max(0, playerInfo.money - 3);
				window.alert(playerInfo.name + " has skipped the battle." +
							 "\nCoins left: " + playerInfo.money);
				return false;
			} else {
				window.alert("You don't have enough money to skip! Battle will commence with " + enemy.name + ".");
			}
		// player selects "no" and decides not to skip and fight, no penalty
		} else	{
			window.alert(playerInfo.name + " has chosen not to skip the battle. Battle will commence with " + enemy.name + ".");
		}
		return true;

	// player decides to fight or click "okay"
	} else if (promptFight === "fight" || prompt === "") {
		 return true;

	// player doesn't enter a valid option
	} else {
		window.alert("You need to choose a valid option. Try again!");
		return fight0rSkip(enemy);
	}

}

var fight = function(enemy) {
	// change the order of turn randomly
	var isPlayerTurn = true;
	if (Math.random() > 0.5)
		isPlayerTurn = false;

	if (fight0rSkip(enemy)) {
		while (enemy.health > 0 && playerInfo.health > 0){
			if (isPlayerTurn) {
				// 1. player attacks enemy
				// -- generate random damage value based on player's attack
				var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
				enemy.health = Math.max(0, enemy.health - damage);
				console.log(playerInfo.name + " attacked " + enemy.name + " for " + damage +" points." +
							"\n"+enemy.name + " is down to " + enemy.health + " health.");
				// - 1a. check enemy's health
				if (enemy.health <= 0) {
					window.alert(enemy.name + " has died!");
					playerInfo.money += 5;
					break;
				}
				isPlayerTurn = false;
			}
			else {
				// 2. enemy attacks player
				// -- generate random damage value based on enemy's attack
				var damage = randomNumber(enemy.attack - 3, enemy.attack);
				playerInfo.health = Math.max(0, playerInfo.health-damage);
				console.log(enemy.name + " attacked " + playerInfo.name + " for " + damage +" points." +
							"\n"+playerInfo.name + " is down to " + playerInfo.health + " health.");
				// - 2a. check player health
				if (playerInfo.health <= 0) {
					window.alert(playerInfo.name + " has died!");
					break;	
				}
				isPlayerTurn = true;
			}
		}
	}
};

/*
SHOP function for buying:
ROBOT UPGRADES
HEALTH REFILLS
*/
var shop = function() {
	var selection = window.prompt("Would you like to REFILL your health, UPGRADE your attack or LEAVE the store?" +
										"\nPlease enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice." +
										"\n\nCurrent coin amount: " + playerInfo.money);
	if (selection) {
		var shopSelection = selection.toLowerCase();
		
	// REFILL health
		if (shopSelection === "refill" || shopSelection === "refil" || shopSelection === "r" || shopSelection === "1") {
			// calculate how much player's health refill will be (40% of max health)
			var refillAmount = (playerInfo.maxHealth * .40);
			// calculate cost of upgrade, which is 10% of refill amount
			var costForRefill = refillAmount * .10;
			
			var confirmRefill = window.confirm("You may refill " + refillAmount + " points of health (or top off to " + playerInfo.maxHealth + " if within " + refillAmount + " points) for " + costForRefill + " coins." +
												"\n\nWould you like to?" +
												"\nCurrent health: " + playerInfo.health + "" +
												"\nCurrent coins: " + playerInfo.money);
			// if player confirms to refill their health
			if (confirmRefill) {
				playerInfo.refillHealth(costForRefill, refillAmount);
			}
			window.alert("Going back to main shop menu.");
			shop();
		
	// UPGRADE attack
		} else if (shopSelection === "upgrade" || shopSelection === "u" || shopSelection === "2") {
			var confirmUpgrade = window.confirm("Your current attack is " + playerInfo.attack + "." +
												"\nYou may add 4 for 3 coins." +
												"\n\nWould you like to?" +
												"\nCurrent coins: " + playerInfo.money);
			if (confirmUpgrade) {
				playerInfo.upgradeAttack();
			}
			window.alert("Going back to main shop menu.");
			shop();
		
	// LEAVE shop
		} else if (shopSelection === "leave" || shopSelection === "l" || shopSelection === "3") {
			window.alert("Thank you for visiting the shop. Goodbye!");
		
	// user did not enter a valid response
		} else {
			window.alert("Please enter a valid response.");
			shop();
		}
	} else {
		window.alert("Thank you for visiting the shop. Goodbye!");
	}
};

var endGame = function() {
	// Alerts the player's total stats
	window.alert("The game has now ended. Let's see how you did!");
	if (playerInfo.health > 0) {
		window.alert("Great job, you've survived the game! You have a score of " + playerInfo.money + ".");
		
		// find and replace high score if needed
		var currentHighScore = [parseInt(localStorage.getItem("High Score")), localStorage.getItem("Robot Name")];
		// if there's an entry in the high scores already
		if (currentHighScore[0]) {
			if (playerInfo.money > currentHighScore[0]) {
				window.alert("Congratulations, you have a new high score!" +
							"\n\nOld high score: " + currentHighScore[0] + " by " + currentHighScore[1] + "" +
							"\nNew high score: " + playerInfo.money + " by " + playerInfo.name);
				localStorage.setItem("High Score", playerInfo.money);
				localStorage.setItem("Robot Name", playerInfo.name);
			} else {
				window.alert("Sorry, you didn't beat the high score of " + currentHighScore[0] + " by " + currentHighScore[1] + "" +
							"\nTry again!");
			}
		// no entry in high scores. Display different text
		} else {
			window.alert("You are the first entry to the high score! Score of " + playerInfo.money + " has been saved.");
			localStorage.setItem("High Score", playerInfo.money);
			localStorage.setItem("Robot Name", playerInfo.name);
		}

	} else {
		window.alert("You lost your robot in battle.");
	}

	// Ask the player if they would like to play again
	var playAgainConfirm = window.confirm("Would you like to play again?");
	if (playAgainConfirm) {
		// restart the game
		startGame();
	} else {
		window.alert("Thank you for playing Robot Gladiators. Come back soon!");
	}
};

var playerInfo = {
	name: window.prompt("What is your robot's name?"),
	maxHealth: 100,
	health: this.maxHealth,
	attack: 10,
	money: 5,
	reset: function() {
		this.health = 100;
		this.money = 10;
		this.attack = 10;
	},
	refillHealth: function(costForRefill, refillAmount) {
		if (this.health != this.maxHealth) {
			// check to make sure player has enough money to cover the refill (defined above, variable)
			if (this.money >= costForRefill) {
				// set health either to max player health or current health + refill amount, whichever is smaller
				this.health = Math.min(this.maxHealth, (this.health+refillAmount))
				this.money -= costForRefill;
				window.alert("Health has been refilled." +
							"\n\nCurrent amount of health: " + this.health);
			} else {
				window.alert("You do not have enough coins to purchase this refill!");
			}
		} else {
			window.alert("You already have the maximum amount of health. No coins were deducted.");
		}
	},
	upgradeAttack: function() {
		if (this.money >= 3) {
			this.attack += 4;
			this.money -= 3;
			window.alert("Your attack has been increased to " + this.attack + ".");
		} else {
			window.alert("You don't have enough coins for this upgrade!");
		}
	}
}
var enemyInfo = [
	{
		name: "Roborto",
		attack: randomNumber(10, 14)
	},
	{
		name: "Amy Android",
		attack: randomNumber(10, 14)
	},
	{
		name: "Robo Trumble",
		attack: randomNumber(10, 14)
	}
];

var startGame = function() {
	// reset player stats
	playerInfo.reset();
	
	for (var i = 0; i < enemyInfo.length; i++) {
		// welcome players and display round number if their lifepoints are positive
		if (playerInfo.health > 0) {
			window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
			
			// prompt player to visit shop, if they have money
			if (playerInfo.money > 0 && i != 0) {
				var goToShop = window.confirm("Would you like to visit the shop to buy upgrades or life refills?");
				if (goToShop)
					shop();
			} else {
				if (i > 0)
					window.alert("You have a balance of 0 coins, which is not enough to access the shop. Try again after winning a battle!");
			}
			
			// initiate fight
			var pickedEnemyObj = enemyInfo[i];
			pickedEnemyObj.health = randomNumber(40, 60);
			fight(pickedEnemyObj);
			
		} else {
			// player's robot died, end the loop
			break;
		}
	}
	// ends the game whether all enemies have been fought or player's robot died
	endGame();
};

// MAIN - Start game when page loads
startGame();