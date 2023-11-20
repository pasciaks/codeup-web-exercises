"use strict";

let otherCoffees = [
    {
        "roast": "light",
        "name": "Black",
        "description": "Black coffee is as simple as it gets with ground coffee beans steeped in hot water, served warm. And if you want to sound fancy, you can call black coffee by its proper name: cafe noir.",
        "ingredients": [
            "Coffee"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG",
        "id": 1
    },
    {
        "roast": "light",
        "name": "Latte",
        "description": "As the most popular coffee drink out there, the latte is comprised of a shot of espresso and steamed milk with just a touch of foam. It can be ordered plain or with a flavor shot of anything from vanilla to pumpkin spice.",
        "ingredients": [
            "Espresso",
            "Steamed Milk"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Latte_at_Doppio_Ristretto_Chiang_Mai_01.jpg/509px-Latte_at_Doppio_Ristretto_Chiang_Mai_01.jpg",
        "id": 2
    },
    {
        "roast": "light",
        "name": "Cappuccino",
        "description": "Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top. Sometimes you can find variations that use cream instead of milk or ones that throw in flavor shot, as well.",
        "ingredients": [
            "Espresso",
            "Steamed Milk",
            "Foam"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Wet_Cappuccino_with_heart_latte_art.jpg",
        "id": 3
    },
    {
        "roast": "light",
        "name": "Doppio",
        "description": "A double shot of espresso, the doppio is perfect for putting extra pep in your step.",
        "ingredients": [
            "2oz Espresso"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Doppio.jpg/2560px-Doppio.jpg",
        "id": 6
    },
    {
        "roast": "light",
        "name": "Cortado",
        "description": "Like yin and yang, a cortado is the perfect balance of espresso and warm steamed milk. The milk is used to cut back on the espresso’s acidity.",
        "ingredients": [
            "1oz Espresso",
            "1oz Steamed Milk"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/16/Caf%C3%A9Cortado%28Tallat%29.jpg",
        "id": 7
    },
    {
        "roast": "light",
        "name": "Red Eye",
        "description": "Named after those pesky midnight flights, a red eye can cure any tiresome morning. A full cup of hot coffee with an espresso shot mixed in, this will definitely get your heart racing.",
        "ingredients": [
            "Coffee",
            "Espresso"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Linea_doubleespresso.jpg",
        "id": 8
    },
    {
        "roast": "dark",
        "name": "Galão",
        "description": "Originating in Portugal, this hot coffee drink is closely related to the latte and cappuccino. Only difference is it contains about twice as much foamed milk, making it a lighter drink compared to the other two.",
        "ingredients": [
            "Espresso",
            "Foamed milk"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Gal%C3%A3o.jpg/1280px-Gal%C3%A3o.jpg",
        "id": 9
    },
    {
        "roast": "light",
        "name": "Lungo",
        "description": "A lungo is a long-pull espresso. The longer the pull, the more caffeine there is and the more ounces you can enjoy.",
        "ingredients": [
            "Long pulled espresso"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Caff%C3%A8_lungo.JPG",
        "id": 10
    },
    {
        "roast": "medium",
        "name": "Macchiato",
        "description": "The macchiato is another espresso-based drink that has a small amount of foam on top. It’s the happy medium between a cappuccino and a doppio.",
        "ingredients": [
            "Espresso",
            "Foam"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/0/07/Caff%C3%A8_Espresso_Macchiato_Schiumato.jpg",
        "id": 11
    },
    {
        "roast": "medium",
        "name": "Mocha",
        "description": "For all you chocolate lovers out there, you’ll fall in love with a mocha (or maybe you already have). The mocha is a chocolate espresso drink with steamed milk and foam.",
        "ingredients": [
            "Espresso",
            "Steamed Milk",
            "Chocolate"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Mocaccino-Coffee.jpg",
        "id": 12
    },
    {
        "roast": "medium",
        "name": "Ristretto",
        "description": "Ristretto is an espresso shot. It uses less hot water which creates a sweeter flavor compared to the bitter taste of a traditional shot of espresso or a doppio.",
        "ingredients": [
            "Short pulled espresso"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/12/Doppio_ristretto_Chiang_Mai.jpg",
        "id": 13
    },
    {
        "roast": "medium",
        "name": "Flat White",
        "description": "This Aussie-born drink is basically a cappuccino without the foam or chocolate sprinkle. It’s an espresso drink with steamed milk.",
        "ingredients": [
            "Espresso",
            "Steamed Milk"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Flat_white_coffee_with_pretty_feather_pattern.jpg",
        "id": 14
    },
    {
        "roast": "dark",
        "name": "Affogato",
        "description": "The affogato is an excuse to enjoy a scoop of ice cream any time of day (and any time of year in my opinion). Served with a scoop of ice cream and a shot of espresso, or two.",
        "ingredients": [
            "Espresso",
            "Ice cream"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/17/Vinoteca%2C_Smithfield%2C_London_%284485849609%29.jpg",
        "id": 15
    },
    {
        "roast": "medium",
        "name": "Café au Lait",
        "description": "Café au lait is perfect for the coffee minimalist who wants a bit more flavor. Just add a splash of warm milk to your coffee and you’re all set!",
        "ingredients": [
            "Coffee",
            "Steamed Milk"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/0/06/Latte_art.jpg",
        "id": 16
    },
    {
        "roast": "dark",
        "name": "Irish",
        "description": "Irish coffee consists of black coffee, whiskey and sugar, topped with whipped cream.",
        "ingredients": [
            "Coffee",
            "Whiskey",
            "Sugar",
            "Cream"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/61/Irish_coffee_glass.jpg",
        "id": 17
    },
    {
        "roast": "light",
        "name": "Guayoyo",
        "description": "Traditional venezuelan coffee prepared by filtering the ground coffee in a cone of cloth and pouring hot water on top of it. It's prefferably drinked wihout milk nor cream.",
        "ingredients": [
            "Coffee",
            "Traditional",
            "Hot Water"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG",
        "id": 18
    },
    {
        "roast": "medium",
        "name": "Cortadito",
        "description": "Traditional cuban coffee method where a bit of freshly brewed coffee is mixed with sugar to create a highly sugared paste. Then add the rest of the coffee and stir adding milk until a 50/50 ratio is achieved.",
        "ingredients": [
            "Coffee",
            "Traditional",
            "Sugar",
            "Milk"
        ],
        "image": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Cuban_coffee-_2013-04-05_14-30.jpg",
        "id": 19
    },
    {
        "roast": "dark",
        "name": "Aguapanela Coffee",
        "description": "Bring panela and coffee to a boil in a small pan for 30 minutes until panela is melted. Brew your coffee using your favorite brewing technique but add the hot aguapanela instead of hot water. Delicious sweetened coffee is ready.",
        "ingredients": [
            "Coffee",
            "Sweet",
            "Panela",
            "Traditional"
        ],
        "image": "https://commons.wikimedia.org/wiki/Agua_Panela_con_Queso_Fresco_at_La_Puerta_Falsa_(5617496209).jpg#/media/File:Agua_Panela_con_Queso_Fresco_at_La_Puerta_Falsa_(5617496209).jpg",
        "id": 20
    }
];

function createListItem(title, content, imageUrl, defaultImageUrl, description = "") {
    // Create the list item
    let listItem = document.createElement("li");
    listItem.className = "media col-lg-2 col-md-3 col-sm-4 p-0 m-0 border"; // Display side by side on larger screens

    // Create the image preview
    // let imagePreview = document.createElement("img");
    // imagePreview.src = imageUrl;
    // imagePreview.className = "mr-3";
    // imagePreview.alt = "Image Preview";
    // imagePreview.style.width = "32px"; // Set a fixed width
    // imagePreview.style.height = "32px"; // Set a fixed height

    // Set default image on error
    // imagePreview.onerror = function () {
    //     imagePreview.src = defaultImageUrl;
    // };

    listItem.addEventListener('click', (e) => {
        let imagePreview = document.createElement("img");
        imagePreview.src = imageUrl;
        imagePreview.className = "mr-3";
        imagePreview.alt = "Image Preview";

        // Set default image on error
        imagePreview.onerror = function () {
            imagePreview.src = defaultImageUrl;
        };
        document.getElementById('staticBackdropLabel').innerText = title;
        document.getElementById("modalButton").click();
        imagePreview.style.width = "20%"; // Set a fixed width
        imagePreview.style.display = 'inline-block';

        document.getElementById('theModalBody').innerHTML = '';

        let descElement = document.createElement('h6');
        descElement.innerText = description;
        // document.getElementById('theModalBody').append(imagePreview);
        document.getElementById('theModalBody').append(descElement);
    });

    // Create the media body
    let mediaBody = document.createElement("div");
    mediaBody.className = "media-body";

    // Create the title
    let titleElement = document.createElement("h6");
    titleElement.className = "mt-0";
    titleElement.textContent = title;

    // Create the content (in a span)
    let contentElement = document.createElement("p");
    contentElement.className = "text-right";
    let contentSpan = document.createElement("span");
    contentSpan.textContent = content;

    // Set background color based on content
    switch (content.toLowerCase()) {
        case 'light':
            contentSpan.style.color = 'grey'; // Light color
            break;
        case 'medium':
            contentSpan.style.color = '#8B4513'; // Medium color
            break;
        case 'dark':
            contentSpan.style.color = 'black'; // Dark color
            contentSpan.style.fontWeight = 'bold'; // Dark color

            break;
        default:
            // No background color for other content
            break;
    }


    contentElement.appendChild(contentSpan);

    // Append elements to the media body
    mediaBody.appendChild(titleElement);
    mediaBody.appendChild(contentElement);

    // Append image preview and media body to the list item
    // listItem.appendChild(imagePreview);

    // Append image preview and media body to the list item
    listItem.appendChild(mediaBody);

    return listItem;
}

function createCard(title, content, imageUrl, defaultImageUrl) {
    // Create the card element
    let card = document.createElement('div');
    card.className = 'col-lg-2 col-md-4 col-sm-3 col-xs-2 m-0'; // Adjust the number of columns based on your design

    // Create the card component
    let cardComponent = document.createElement('div');
    cardComponent.className = 'card h-100 m-0 p-0'; // Set a fixed height for the card body

    // Create the cover image
    let coverImage = document.createElement('img');
    coverImage.src = imageUrl;
    coverImage.className = 'card-img-top d-none'; //  d-xl-block
    coverImage.alt = 'Card Cover Image';
    coverImage.style.height = '50px'; // Set a fixed height
    coverImage.style.objectFit = 'cover'; // Resize image to cover the specified dimensions

    // Set default image on error
    coverImage.onerror = function () {
        coverImage.src = defaultImageUrl;
    };

    // Create the card body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    // Create the card title
    let cardTitle = document.createElement('h6');
    cardTitle.className = 'card-title pb-0';
    cardTitle.textContent = title;

    // Create the card content
    let cardContent = document.createElement('p');
    cardContent.className = 'card-text flex-grow-1 pb-0';
    cardContent.textContent = content;

    // Append elements to the card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardContent);

    // Append cover image and card body to the card component
    cardComponent.appendChild(coverImage);
    cardComponent.appendChild(cardBody);

    // Append card component to the card
    card.appendChild(cardComponent);

    return card;
}

function renderCoffees(theCoffees) {

    otherCoffees = theCoffees;

    let myListItem;

    let theViewElement = document.getElementById('listContainer');

    Array.from(theViewElement.childNodes).forEach((child) => {
        child.remove();
    });

    let defaultImageUrl = "https://via.placeholder.com/300";
    otherCoffees.forEach((coffee) => {
        myListItem = createListItem(coffee.name, coffee.roast, coffee.image, defaultImageUrl, coffee.description);
        theViewElement.appendChild(myListItem);
    });
}

// function renderCoffee(coffee) {
//     let html = '<tr class="coffee">';
//     html += `<td>${coffee.id}</td>`;
//     html += `<td>${coffee.name}</td>`;
//     html += `<td>${coffee.roast}</td>`;
//     html += '</tr>';
//     return html;
// }

// function renderCoffees(coffees) {
//     let html = '';
//     for (let i = coffees.length - 1; i >= 0; i--) {
//         html += renderCoffee(coffees[i]);
//     }
//     return html;
// }

// function updateCoffees(e) {
//     e.preventDefault(); // don't submit the form, we just want to update the data
//     const selectedRoast = roastSelection.value;
//     const filteredCoffees = [];
//     coffees.forEach(coffee => {
//         if (coffee.roast === selectedRoast) {
//             filteredCoffees.push(coffee);
//         }
//     });
//     tbody.innerHTML = renderCoffees(filteredCoffees);
// }

// // from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide

const coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

coffees.forEach((coffee) => {
    coffee.description = "Nothing special.";
    coffee.image = "images/favicon.ico";
})
otherCoffees.forEach((coffee) => {
    let newCoffee = {...coffee}
    newCoffee.id = coffees.length + 1;
    coffees.push(newCoffee);
});

console.log(coffees);

renderCoffees(coffees);

// const tbody = document.querySelector('#coffees');
// const submitButton = document.querySelector('#submit');
// const roastSelection = document.querySelector('#roast-selection');

// tbody.innerHTML = renderCoffees(coffees);

// submitButton.addEventListener('click', updateCoffees);

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------


function filterCoffee() {
    let nameFilter = currentNameFilter;
    let roastFilter = currentRoastFilter;
    let filteredCoffees = coffees.filter((coffee) => {
        let cRoast = coffee.roast.toLowerCase();
        let cName = coffee.name.toLowerCase();
        let result = (nameFilter === "" || cName.indexOf(nameFilter) >= 0) && (roastFilter === "" || cRoast === roastFilter);
        return result;
    });
    return filteredCoffees;
}

let currentNameFilter = '';
let currentRoastFilter = '';
let currentFilteredCoffees = [...coffees];

let currentNameAdd = '';
let currentRoastAdd = '';

// function renderCoffees(theCoffees) {
//     console.log('-------------------------');
//     if (!theCoffees || theCoffees.length === 0) {
//         console.log("No Coffees found.");
//     }
//     theCoffees.forEach((coffee) => {
//         console.log(JSON.stringify(coffee));
//     });
// }

// Search coffee form

let searchForm = document.getElementById('formSearch');

document.getElementById('roastSearch').addEventListener('change', (e) => { // @todo - test if input works here instead of change
    currentRoastFilter = e?.target?.value || "";
    currentRoastFilter = `${currentRoastFilter}`.trim();
    currentFilteredCoffees = filterCoffee();
    renderCoffees(currentFilteredCoffees);
});

document.getElementById('coffeeNameSearch').addEventListener('input', (e) => {
    currentNameFilter = e?.target?.value || "";
    currentNameFilter = `${currentNameFilter}`.trim();
    currentFilteredCoffees = filterCoffee();
    renderCoffees(currentFilteredCoffees);
});

document.getElementById('formSearch').addEventListener('submit', (e) => {
    e.preventDefault();
    currentFilteredCoffees = filterCoffee();
    renderCoffees(currentFilteredCoffees);
});

document.getElementById('btnSearch').addEventListener('click', (e) => {
    e.preventDefault();
    currentFilteredCoffees = filterCoffee();
    renderCoffees(currentFilteredCoffees);
});


// Add coffee form

let addForm = document.getElementById('formAdd');

document.getElementById('roastAdd').addEventListener('change', (e) => { // @todo - test if input works here instead of change
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.name);
});

document.getElementById('coffeeNameAdd').addEventListener('input', (e) => {
    console.log(e);
    console.log(e.target.value);
    console.log(e.target.name);
});

function addCoffee(name, roast) {
    name = name.trim();
    roast = roast.trim();

    if (!name) {

        alert("You cannot enter a coffee without a name.");
        return;
    }

    if (!roast) {

        alert("You cannot enter a coffee without a roast.");
        return;
    }

    // @todo - make sure current name and roast don't already exist

    let length = coffees.length;
    coffees.push({id: length + 1, name, roast});
    renderCoffees(coffees);
}

document.getElementById('formAdd').addEventListener('submit', (e) => {
    e.preventDefault();

    let name = addForm.coffeeNameAdd.value;
    let roast = addForm.roastAdd.value;
    addCoffee(name, roast);
});

document.getElementById('btnAdd').addEventListener('click', (e) => {
    e.preventDefault();

    let name = addForm.coffeeNameAdd.value;
    let roast = addForm.roastAdd.value;
    addCoffee(name, roast);
});




