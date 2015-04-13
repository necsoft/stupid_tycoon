/*
  stupid_tycoon

  Un sistema simple en el que esperamos que lleguen clientes.

 */

var chalk = require('chalk');
var inquirer = require('inquirer');
var figlet = require('figlet');
var Chance = require('chance');

// Initialize chance
var chance = new Chance();

// Day variables
var day_moment = 0;
var loop_interval;

// Folks
var folks = ["👨", "👦", "👩", "👵", "👴", "👳"];

// Store variables
var store = {};
store.days = 0;
store.money = chance.integer({
    min: 100,
    max: 1000
});
store.daily_clients = 0;
store.clients = 0;
store.client_chance = 0.5;
store.robbing_chance = 0.1;
store.luck_chance = 0.01;


//Ask store name
prompt_askStoreName();


/*
  loop()

  Es la función que corre durante el día.

 */


function loop() {
    randomShit();
    day_moment += 0.1;

    if (day_moment > 1) {
        dayEnds();
    }
}


/*
  randomShit()

  Se encarga de todas la cosas random que te pueden suceder.

 */



function randomShit() {


    // Entra un cliente
    if (Math.random() < store.client_chance) {
        var platita = chance.integer({
            min: 3,
            max: 20
        });

        var this_folk = chance.integer({
            min: 0,
            max: folks.length - 1
        })
        console.log(chalk.white.bgGreen.bold(folks[this_folk] + " :" + chance.name() + " compró: "));
        console.log(chalk.gray.bgGreen.bold("+$" + platita));
        store.money += platita;
    }


    // Te roban
    if (Math.random() < store.robbing_chance) {
        var choreo = chance.integer({
            min: 100,
            max: 500
        });


        console.log(chalk.white.bgRed.bold('🙊  TE ROBARON, PERDES PLATA!'));
        console.log(chalk.white.bgRed.bold('-$' + choreo));
        store.money -= choreo;
    }

    // Te ganas el telekino
    if (Math.random() < store.luck_chance) {
        var telekino = chance.integer({
            min: 200000,
            max: 999999
        });
        console.log("\n");
        console.log(chalk.green.bgBlack.bold('TE GANASTE EL TELEKINO!'));
        console.log(chalk.green.bgBlack.bold('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'));
        console.log(chalk.white.bgGreen.bold('+' + telekino));
        console.log(chalk.green.bgBlack.bold('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'));
        console.log("\n");
        store.money += telekino;
    }

}


/*
  dayEnds()

  Termina el día.

 */

function dayEnds() {
    console.log("\n");
    console.log(chalk.gray.bgYellow.bold('Terminó el día!'));
    printStoreDetails();
    store.days++;
    clearInterval(loop_interval);
    if (store.money > 0) {
        prompt_continueDay();
    } else {
        console.log(chalk.white.bgRed.bold("🙊 :  No tenes mas guita, perdistes papa."));
    }
}



/*
  startGameLoop()

  Inicia el interval del juego.

 */

function startGameLoop() {
    loop_interval = setInterval(loop, 300);
}


/*
  clearConsole()

  Limpia la consola.

 */

function clearConsole() {
    process.stdout.write("\u001b[2J\u001b[0;0H"); // Clear Console
}

/*
  printStoreDetails()
  
  Imprime los detalles del negocio.

 */

function printStoreDetails() {
    console.log("\n");
    console.log(chalk.white.bgBlack.bold("Days opened: " + store.days));
    console.log(chalk.white.bgBlack.bold("Money: $" + store.money));
    console.log("\n");
}


/*
  prompt_askStoreName()
  
  Imprime los detalles del negocio.

 */


function prompt_askStoreName() {
    clearConsole();
    inquirer.prompt([{
        type: "input",
        name: "store_name",
        message: "Ponele un nombre a tu negocio!"
    }], function(answers) {
        store.name = answers.store_name;
        console.log(chalk.gray.bgYellow.bold(store.name));
        clearConsole();
        figlet(store.name, function(err, data) {
            console.log(chalk.gray.bgYellow.bold(data));

            printStoreDetails();
        });
        startGameLoop();

    });
}




/*
  prompt_continueDay()
  
  Imprime los detalles del negocio.

 */


function prompt_continueDay() {
    inquirer.prompt([{
        type: "confirm",
        name: "continue",
        message: "Listo para el proximo día?"
    }], function(answers) {
        console.log(answers.continue);
        if (answers.continue) {
            day_moment = 0;
            startGameLoop();
        } else {
            console.log("Que te garüe finito.")
        }
    });
}