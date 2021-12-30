var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
	// prompt user to either fight or skip the battle
	var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?");
	var fightOrSkip = promptFight.toLowerCase();
	
	// player decides to fight
	if (fightOrSkip === "fight") {
		while (enemyHealth > 0){
			
			// 1. player attacks enemy
			enemyHealth -= playerAttack;
			console.log(playerName + " attacked " + enemyName + ", who's health is now " + enemyHealth);
			// - 1a. check enemy's health
			if (enemyHealth <= 0) {
				window.alert(enemyName + " has died!");
			} else {
				console.log(enemyName + " has " + enemyHealth + " health left.");
			}
			
			// 2. enemy attacks player
			playerHealth -= enemyAttack;
			console.log(enemyName + " attacked "+ playerName + ", who's health is now " + playerHealth);
			// - 2a. check player health
			if (playerHealth <= 0) {
				console.log(playerName + " has died!");
			} else {
				console.log(playerName + " has " + playerHealth + " health left.");
			}	
		}
	
	// player decides to skip
	} else if (fightOrSkip === "skip") {
		var confirmSkip = window.confirm("Are you sure you want to skip this battle with " + enemyName + "?" + 
										 "\n\nThis will cost 2 coins, and you currently have " + playerMoney + ".");
		// skip and remove coins (penalty)
		if (confirmSkip) {
			playerMoney -= 2;
			window.alert(playerName + " has skipped the battle." +
						 "\nCoins left: " + playerMoney);
		// not skip and go back to the top of fight, no penalty
		} else {
			window.alert(playerName + " has chosen not to skip the battle.")
			fight();
		}
		
	// player doesn't enter a valid option
	} else {
		window.alert("You need to choose a valid option. Try again!");
	}
};

// main
for (var i = 0; i < enemyNames.length; i++) {
	var pickedEnemyName = enemyNames[i];
	enemyHealth = 50;
	fight(pickedEnemyName);
}