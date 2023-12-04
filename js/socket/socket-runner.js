let recurringTimer = null;
let connectionString = "http://lostwords.org" + ":8383";
let storedImageData = "";
let socket;
let myUniqueId = Math.floor(Math.random() * 9999) + "-" + Date.now();

$(document).ready(function () {

    console.log("ready...");

    localStorage.setItem("SSI-Chat-ID", myUniqueId);

    socket = io.connect(connectionString);

    socket.on("error", function (PARAMETERS) {
        console.log("Connection Error - " + PARAMETERS);
        socket = null;
    });

    socket.on("connect", function () {
        socket.on("connected", function (data) {

            console.log("connected...");

            recurringTimer = window.setInterval(function () {
                socket.emit("get_signs", "0.0.0.0")
            }, 5000);

            window.setTimeout(function () {
                socket.emit("identify", myUniqueId);
                socket.emit("public_message", "picture");
            }, 500);
        });

        socket.on("got_signs", function (data) {
            console.log(JSON.stringify(data));
        });

        socket.on("message", function (data) {
            storedImageData = data;
            if (data.length > 5) {
                if (storedImageData.substring(0, 5) === "data:") {
                    if (storedImageData.length > 30) {
                        document.getElementById("liveImage").src = storedImageData;
                    }
                }
            }
        });

    });

});
