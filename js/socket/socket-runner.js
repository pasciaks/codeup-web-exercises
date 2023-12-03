let recurringTimer = null;
let connectstring = "http://lostwords.org" + ":8383";
let storedImageData = "";
let socket;
let ww, hh;
let myUniqueId = Math.floor(Math.random() * 9999) + "-" + Date.now();

function resizewindow() {
    ww = window.innerWidth;
    hh = window.innerHeight;
}

$(window).resize(function () {
    resizewindow();
});

$(document).ready(function () {

    localStorage.setItem("SSI-Chat-ID", myUniqueId);

    socket = io.connect(connectstring);

    socket.on("error", function (PARAMETERS) {
        console.log("Connection Error - " + PARAMETERS);
        socket = null;
    });

    socket.on("connect", function () {
        socket.on("connected", function (data) {
            recurringTimer = window.setInterval(function () {
                socket.emit("get_signs", "0.0.0.0")
            }, 10000);
            window.setTimeout(function () {
                socket.emit("identify", myUniqueId);
                socket.emit("public_message", "picture");
            }, 2000);
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
