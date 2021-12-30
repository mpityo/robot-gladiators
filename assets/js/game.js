var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 0;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
	// fight variable only displays "fight or skip" once
	var fightVariable = 0;
	
	while (enemyHealth > 0 && playerHealth > 0){
			// prompt user to either fight or skip the battle
			if (fightVariable === 0) {
				var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?");
				var fightOrSkip = promptFight.toLowerCase();
				fightVariable = 1;
			}
		
		if (fightOrSkip === "skip") {
			var confirmSkip = window.confirm("Are you sure you want to skip this battle with " + enemyName + "?" + 
											 "\n\nThis will cost 3 coins, and you currently have " + playerMoney + ".");
			// player decides to skip
			if (confirmSkip) {
				// skip and remove coins (penalty), after confirming available coins
				if (playerMoney >= 3) {
					playerMoney -= 3;
					window.alert(playerName + " has skipped the battle." +
								 "\nCoins left: " + playerMoney);
					break;
				} else {
					window.alert("You don't have enough money to skip! Battle will commence with " + enemyName + ".");
					fightOrSkip = "fight";
				}
			// not skip and fight, no penalty
			} else	{
				window.alert(playerName + " has chosen not to skip the battle. Battle will commence with " + enemyName + ".");
				fightOrSkip = "fight";
			}
			
		// player decides to fight
		} else if (fightOrSkip === "fight") {
				
				// 1. player attacks enemy
				enemyHealth -= playerAttack;
				console.log(playerName + " attacked " + enemyName + ", who's health is now " + enemyHealth);
				// - 1a. check enemy's health
				if (enemyHealth <= 0) {
					window.alert(enemyName + " has died!");
					playerMoney += 5;
					break;
				} else {
					//console.log(enemyName + " has " + enemyHealth + " health left.");
				}
				
				// 2. enemy attacks player
				playerHealth -= enemyAttack;
				console.log(enemyName + " attacked "+ playerName + ", who's health is now " + playerHealth);
				// - 2a. check player health
				if (playerHealth <= 0) {
					window.alert(playerName + " has died!");
					break;
				} else {
					//console.log(playerName + " has " + playerHealth + " health left.");
				}
			
		// player doesn't enter a valid option
		} else {
			window.alert("You need to choose a valid option. Try again!");
			fightVariable = 0;
		}
	}
};

/*
SHOP function for buying:
ROBOT UPGRADES - variable
LIFE REFILLS - 5 coins/ea
*/
var shop = function() {
	var selection = window.prompt("Would you like to REFILL your health, UPGRADE your attack or LEAVE the store?" +
										"\nPlease enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
	if (selection) {
		var shopSelection = selection.toLowerCase();
		if (shopSelection === "refill" || shopSelection === "refil" || shopSelection === "r") {
			shop();
		} else if (shopSelection === "upgrade" || shopSelection === "u") {
			shop();
		} else if (shopSelection === "leave" || shopSelection === "l") {
			window.alert("Thank you for visiting the shop. Goodbye!");
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
	// STATS
	if (playerHealth > 0) {
		window.alert("Great job, you've survived the game! You have a score of " + playerMoney + ".");
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
	// If yes, call startGame() to restart
};

var startGame = function() {
	// reset player stats
	playerHealth = 100;
	playerAttack = 10;
	playerMoney = 3;
	
	for (var i = 0; i < enemyNames.length; i++) {
		// welcome players and display round number if their lifepoints are positive
		if (playerHealth > 0) {
			window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
			
			// prompt player to visit shop, if they have money
			if (playerMoney > 0) {
				var goToShop = window.confirm("Would you like to visit the shop to buy upgrades or life refills?");
				if (goToShop) {
					shop();
				}
			} else {
				window.alert("You have a balance of 0 coins, which is not enough to access the shop. Try again after winning a battle!");
			}
			
			// initiate fight
			var pickedEnemyName = enemyNames[i];
			enemyHealth = 50;
			fight(pickedEnemyName);
			
		} else {
			// player's robot died, end the loop
			break;
		}
	}
	
	endGame();
};

// MAIN - Start game when page loads
startGame();