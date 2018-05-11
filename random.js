module.exports = function random(arg1, arg2) {  // there is no p5.js on server side so need to replace all it's functions
    if (Array.isArray(arguments[0])) {  //in case the first argument is a massive -- return random element from it;
        var index = Math.floor(Math.random() * arguments[0].length);
        return arguments[0][index];
    } else if (typeof arguments[0] == 'number' && typeof arguments[1] == 'number') { // return random number from interval
        var max = arguments[1] - arguments[0];
        var min = arguments[0];
        return Math.round(Math.random() * max + min);
    }
}