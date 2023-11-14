"use strict";

(function () {
    console.log("IIFE");
})();

(() => {
    console.log("IIFE");
})();

(async () => {
    console.log("async IIFE");
})();