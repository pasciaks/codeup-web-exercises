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

    function drawCircle() {
        try {
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
            ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
            ctx.lineWidth = 2;
            let offx = Math.random() * canvas.width / 2;
            let offy = Math.random() * canvas.height / 2;
            for (let radi = 0; radi < 10; radi += .1) {
                for (let zz = -100; zz <= 100; zz += Math.random()) {
                    let xx = offx + Math.sin(zz) * radi * 10 + 150;
                    let yy = offy + Math.cos(zz) * radi * 10 + 150;
                    let r = Math.random() * (30 - 5 + 1) + 5;
                    ctx.fillRect(xx - r / 2, yy - r / 2, r, r);
                    ctx.strokeRect(xx - r / 2, yy - r / 2, r, r);
                }
            }
        } catch (err) {
            // console.log("Probably not running in a browser.");
        }
    }

    try {
        drawCircle()
    } catch {

    }


})();
