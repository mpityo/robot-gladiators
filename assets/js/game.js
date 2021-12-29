var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roberto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
	window.alert("Welcome to Robot Gladiators!");
	
	// player attacks enemy
	enemyHealth -= playerAttack;
	console.log(playerName + " attacked " + enemyName + ", who's health is now " + enemyHealth);
	// check enemy's health
	if (enemyHealth <= 0) {
		window.alert(enemyName + " has died!");
	} else {
		window.alert(enemyName + " has " + enemyHealth + " health left.");
	}
	
	// enemy attacks player
	playerHealth -= enemyAttack;
	console.log(enemyName + " attacked "+ playerName + ", who's health is now " + playerHealth);
	// check player health
	if (playerHealth <= 0) {
		window.alert(playerName + " has died!");
	} else {
		window.alert(playerName + " has " + playerHealth + " health left.");
	}
};

// main
fight();