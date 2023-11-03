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

// .DS_Store
// .idea/*
// *.iml

// let h = "";
// gitProfiles.forEach((p) => {
//     let template = `<a href="https://pasciak.com/imugi/${p}.txt">${p}</a>\n`
//     h += template;
// })
// console.log(h);
// process.exit(0);

let count = 0;
do {
    let choice = Math.floor(Math.random() * (gitProfiles.length))
    console.log(gitProfiles[choice]);
    gitProfiles.splice(choice, 1);
    count++;
} while (gitProfiles.length > 0)

console.log(count)