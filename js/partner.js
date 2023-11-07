function parterMaker(ts = 2) {
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

    let teams = {};
    let originalLength = gitProfiles.length;
    let count = 0;
    let mod = 0;
    let teamSize = ts;
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

    console.log("Team Size");
    console.log(teamSize);

    console.log("Total members");
    console.log(count)

    console.log(`Whole teams of ${teamSize} members`);
    console.log(Math.floor((originalLength / teamSize)));

    console.log("Partial Team");
    console.log(((originalLength / teamSize) - Math.floor((originalLength / teamSize))) * teamSize);

    console.log(teams);
    
    return teams;
}