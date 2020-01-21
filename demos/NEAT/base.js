//https://en.wikipedia.org/wiki/Stochastic_universal_sampling
//https://www.tutorialspoint.com/genetic_algorithms/genetic_algorithms_parent_selection.htm

let population;
const optimum = "1010101010"

function initialise() {
    population = [
        { "solution": "1100101010", "fitness": 0 },
        { "solution": "1000101010", "fitness": 0 },
        { "solution": "1100111010", "fitness": 0 },
        { "solution": "1100101011", "fitness": 0 },
        { "solution": "1100011010", "fitness": 0 },
        { "solution": "1010101010", "fitness": 0 },
        { "solution": "1111100000", "fitness": 0 },
        { "solution": "0000011111", "fitness": 0 },
        { "solution": "0011101010", "fitness": 0 },
        { "solution": "0100101011", "fitness": 0 }
    ];
}
initialise();
console.log(population);

function selection() {
    for (let i = 0; i < population.length; i++) {
        population[i].fitness = evaluate(population[i]);
    }
}
selection();
console.log(population);
selectPop(population, 5);

function crossOver() {

}

function mutate() {

}

function terminate() {

}

function evaluate(sol) {
    let fitness = 0;
    let solString = sol.solution;
    for (let i = 0; i < solString.length; i++) {
        if (solString[i] === optimum[i]) fitness++;
    }
    return fitness;
}

function selectPop(pop, offspring) {
    let sum_pop_fitness = 0;
    let num_offspring = offspring;
    for (let i = 0; i < pop.length; i++) {
        sum_pop_fitness += pop[i].fitness;
    }
    let distance_between_pointers = sum_pop_fitness / num_offspring;
    let start = getRandomInt(0, distance_between_pointers);
    let pointers = [];
    for (let i = 0; i < num_offspring; i++) {
        pointers.push()
    }


}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}