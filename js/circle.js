(function () {
    "use strict";

    // create a circle object
    let circle = {
        area: null,
        radius: 3,

        getArea: function () {
            // TODO: complete this method
            // hint: area = pi * radius^2
            return Math.PI * (this.radius * this.radius); // TODO: return the proper value
        },

        logInfo: function (doRounding) {
            // TODO: complete this method.
            this.area = this.getArea();
            // If doRounding is true, round the result to the nearest integer.
            // Otherwise, output the complete value
            if (doRounding) {
                this.area = Math.round(this.area);
            }
            console.log("Area of a circle with radius: " + this.radius + ", is: " + `${this.area}`);
        }
    };

    let circleWithoutAreaProperty = {
        radius: 3,

        getArea: function () {
            // TODO: complete this method
            // hint: area = pi * radius^2
            return Math.PI * (this.radius * this.radius); // TODO: return the proper value
            // alternative
            // let radiusSquared = Math.pow(this.radius,2);
            // let area = Math.PI * radiusSquared
            // return area;
        },

        logInfo: function (doRounding) {
            // TODO: complete this method.
            let localArea = this.getArea();
            // If doRounding is true, round the result to the nearest integer.
            // Otherwise, output the complete value
            if (doRounding) {
                localArea = Math.round(localArea);
            }
            console.log("Area of a circle with radius: " + this.radius + ", is: " + `${localArea}`);
        }
    };


    // log info about the circle
    console.log("Raw circle information");
    circle.logInfo(false);
    // circleWithoutAreaProperty.logInfo(false);

    console.log("Circle information rounded to the nearest whole number");
    circle.logInfo(true);
    // circleWithoutAreaProperty.logInfo(true);

    console.log("=======================================================");

    // TODO: Change the radius of the circle to 5.
    circle.radius = 5.0;

    // log info about the circle
    console.log("Raw circle information");
    circle.logInfo(false);
    console.log("Circle information rounded to the nearest whole number");
    circle.logInfo(true);
})();
