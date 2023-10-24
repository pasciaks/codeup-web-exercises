```javascript

var shoppers = [
    {name: 'Cameron', amount: 180},
    {name: 'Ryan', amount: 250},
    {name: 'George', amount: 320}
];

function calculateDiscountIfAny(num, minPurchase = 200) {
    if (Number(num) > minPurchase) {
        console.log(`Discount applied (12%) due to > $${minPurchase.toFixed(2)} purchase.`);
        return 0.12;
    }
    return 0;
}

function calculateDiscountAmount(num, discountDecimalValue) {
    return num * discountDecimalValue;
}

function calculateNewPrice(num, discountedPrice) {
    return num - discountedPrice;
}

shoppers.forEach((shopper) => {
    let amount = shopper.amount;
    let discountPercentage = calculateDiscountIfAny(amount);
    let discountAmount = calculateDiscountAmount(amount, discountPercentage);
    let discountedPrice = calculateNewPrice(amount, discountAmount);
    let displayLine = `${shopper.name} spent $${amount.toFixed(2)}, discount is: ${discountPercentage * 100}%, $${discountAmount.toFixed(2)} discount, discounted price: $${discountedPrice.toFixed(2)}`
    console.log(displayLine);
})

```