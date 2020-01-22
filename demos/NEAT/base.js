//https://en.wikipedia.org/wiki/Stochastic_universal_sampling
//https://www.tutorialspoint.com/genetic_algorithms/genetic_algorithms_parent_selection.htm

let oldPopulation;
let newPopulation;
const optimum = "111111101010"

function initialise() {
    oldPopulation = [
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
    newPopulation = [];
}
initialise();


function selection() {
    for (let i = 0; i < oldPopulation.length; i++) {
        oldPopulation[i].fitness = evaluate(oldPopulation[i]);
    }
}
selection();
let candidates = selectPop(oldPopulation, 6);
function crossOver() {
    let parent_a = "";
    let parent_b = "";
    let child_a = "";
    let child_b = "";
    let newPop = []

    for (let i = 0; i < candidates.length - 1; i++) {
        parent_a = candidates[i].solution;
        parent_b = candidates[i + 1].solution;
        for (let j = 0; j < parent_a.length; j++) {
            if (Math.random() > 0.5) {
                child_a += parent_a[j];
                child_b += parent_b[j];
            } else {
                child_b += parent_a[j];
                child_a += parent_b[j];
            }
        }
        newPop.push({ "solution": child_a, "fitness": 0 })
        newPop.push({ "solution": child_b, "fitness": 0 });
        child_a = "";
        child_b = "";
    }
    newPop.push(candidates[candidates.length - 1]);
    return newPop;
}
newPopulation = crossOver();
console.log("**************oldPopulation**************");
console.log(oldPopulation);
console.log();
console.log("**************newPopulation**************");
console.log(newPopulation);
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
    // From the aboe resource, now not used: let start = getRandomInt(0, distance_between_pointers);
    let pointers = [];
    for (let i = 0; i < num_offspring; i++) {
        pointers.push(getRandomInt(0, sum_pop_fitness - 1));
    }
    pointers.sort((a, b) => (a > b) ? 1 : -1);
    pop.sort((a, b) => (a.fitness > b.fitness) ? 1 : -1);
    let keep = [];

    for (let j = 0; j < pointers.length; j++) {
        let i = 0;
        let fitness_sum = 0;
        let p = pointers[j];
        while (fitness_sum < p) {
            fitness_sum += pop[i].fitness;
            i++;
            if (i === pop.length) i--;
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


