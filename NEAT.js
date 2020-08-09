/** Rename vars */
var Neat = neataptic.Neat;
var Methods = neataptic.Methods;
var Config = neataptic.Config;
var Architect = neataptic.Architect;

/** Settings */
var detectionRadius = 150;
var foodDetection  = 3;

var minSpeed = 0.6;
var speed = 3;

var foodArea = 80;
var foodAmount = Math.round(WIDTH * HEIGHT * 4e-4);

// GA settings
var creatureAmount = Math.round(WIDTH * HEIGHT * 8e-5);
var iterations = 500;
var startHiddenSize = 0;
var mutationRate1 = 0.3;
var elitismPercentage = 0.1;

// Trained population
var useTrained = false;

// Global vars
var neat;

/** Construct the genetic algorithm */
function initNeat(){
    neat = new Neat(foodDetection * 2, 2, null,
      {
        //array of mutation types to be used in evolutionary process
        mutation: [
          Methods.Mutation.ADD_NODE,
          Methods.Mutation.SUB_NODE,
          Methods.Mutation.ADD_CONN,
          Methods.Mutation.SUB_CONN,
          Methods.Mutation.MOD_WEIGHT,
          Methods.Mutation.MOD_BIAS,
          Methods.Mutation.MOD_ACTIVATION,
          Methods.Mutation.ADD_GATE,
          Methods.Mutation.SUB_GATE,
          Methods.Mutation.ADD_SELF_CONN,
          Methods.Mutation.SUB_SELF_CONN,
          Methods.Mutation.ADD_BACK_CONN,
          Methods.Mutation.SUB_BACK_CONN
        ],
        popsize: creatureAmount,
        mutationRate: mutationRate1,
        elitism: Math.round(elitismPercentage * creatureAmount),
        network: new Architect.Random(foodDetection * 2, StartHiddenSize, 2)
      }
    );
  
    if(useTrained){
      neat.population = population;
    }
}

/** Start the evaluation of the current generation */
function startEvaluation(){
    creatures = [];
    highestScore = 0;
  
    for(i=0;i<100;i++){ //doesn't like this
      
      new Creature();
    }
}

/** End the evaluation of the current generation */
function endEvaluation(){
    console.log('Generation:', neat.generation, '- average score:', neat.getAverage());
  
    neat.sort();
    var newPopulation = [];
  
    // Elitism
    for(var i = 0; i < neat.elitism; i++){
      newPopulation.push(neat.population[i]);
    }
  
    // Breed the next individuals
    for(var i = 0; i < neat.popsize - neat.elitism; i++){
      newPopulation.push(neat.getOffspring());
    }
  
    // Replace the old population with the new population
    neat.population = newPopulation;
    neat.mutate();
  
    neat.generation++;
    startEvaluation();
  }
  

