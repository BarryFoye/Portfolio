//https://en.wikipedia.org/wiki/Stochastic_universal_sampling
//https://www.tutorialspoint.com/genetic_algorithms/genetic_algorithms_parent_selection.htm

let population;
const optimum = "0000000000"

function initialise() {
    population = [
        { "id": 1, "solution": "1100101010", "fitness": 0 },
        { "id": 2, "solution": "1000101010", "fitness": 0 },
        { "id": 3, "solution": "1100111010", "fitness": 0 },
        { "id": 4, "solution": "1100101011", "fitness": 0 },
        { "id": 5, "solution": "1100011010", "fitness": 0 },
        { "id": 6, "solution": "1010101010", "fitness": 0 },
        { "id": 7, "solution": "1111100000", "fitness": 0 },
        { "id": 8, "solution": "0000011111", "fitness": 0 },
        { "id": 9, "solution": "0011101010", "fitness": 0 },
        { "id": 10, "solution": "0100101011", "fitness": 0 }
    ];
}
initialise();


function selection() {
    for (let i = 0; i < population.length; i++) {
        population[i].fitness = evaluate(population[i]);
    }
}
selection();
console.log(selectPop(population, 7));

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
    let distance_between_pointers = Math.floor(sum_pop_fitness / num_offspring);
    let start = getRandomInt(0, distance_between_pointers);
    let pointers = [];  
    for (let i = 0; i < num_offspring; i++) {
        pointers.push(getRandomInt(0, sum_pop_fitness -1));
    }
    pointers.sort((a, b) => (a > b) ? 1 : -1);
    pop.sort((a,b) => (a.fitness > b.fitness) ? 1 : -1);
    let keep = [];
    
    for (let j = 0; j < pointers.length; j++){
        let i = 0;
        let fitness_sum = 0;
        let p = pointers[j];
        while (fitness_sum < p){
            fitness_sum += pop[i].fitness;
            i++; 
            if(i === pop.length) i--;           
        }
        keep.push(pop[i]);
    }
    return keep;

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}