let gitProfiles = [
    "radiancelux",
    "pasciaks",
    "derykdamon",
    "eltownes",
    "GBowman1",
    "psykter",
    "mventura14",
    "ByronLuke",
    "mbcodepractice",
    "RicardoJaimesDez",
    "cteriipaia",
    "Santoszls3",
    "AngelAdell",
    "IraHuff",
    "AmritLee",
    "TheCosmicFish",
    "MichaelaArteberry",
    "Cmgrowald",
    "Yadriel-Ruiz",
    "easi-d-hatchett",
    "sethcrist",
    "Geoffrey-m-rendon",
    "ben-w-martin"
]

console.log('\n\n\n\n\n\n\n\n\n\n');

let teams = {};
let originalLength = gitProfiles.length;
let count = 0;
let mod = 0;
let teamSize = 2;
let teamIndex = 1;

do {
    let choice = Math.floor(Math.random() * (gitProfiles.length))
    console.log(gitProfiles[choice]);

    if (!teams[`${teamIndex}`]) {
        teams[`${teamIndex}`] = [];
    }
    teams[`${teamIndex}`].push(gitProfiles[choice]);
    gitProfiles.splice(choice, 1);
    count++;
    mod++;
    if (mod >= teamSize) {
        teamIndex++;
        console.log("-------")
        mod = 0;
    }
} while (gitProfiles.length > 0)

console.log('\n\n\n\n\n\n\n\n\n\n');

console.log("Team Size");
console.log(teamSize);

console.log("Total members");
console.log(count)

console.log(`Whole teams of ${teamSize} members`);
console.log(Math.floor((originalLength / teamSize)));

// console.log((originalLength / teamSize).toFixed(2));

console.log("Partial Team");
console.log(((originalLength / teamSize) - Math.floor((originalLength / teamSize))) * teamSize);

console.log(teams);