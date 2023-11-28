function allCombinations(chars) {
    var numChars = chars.length;
    var numTests = 1;
    var temp = [];

    for (var i = 0; i < numChars; i++) {
        numTests *= chars[i].length;
    }

    var Ci = new Array(numChars).fill(0); // Initialize index variables for characteristics

    for (var testNum = 1; testNum <= numTests; testNum++) {
        //process.stdout.write("test # " + testNum + ": ");
        var t1 = [];

        for (var i = 0; i < numChars; i++) {
            //process.stdout.write(chars[i][Ci[i]] + " ");
            t1.push(chars[i][Ci[i]]);
        }

        temp.push(t1);
        //process.stdout.write("\n");

        for (var i = numChars - 1; i >= 0; i--) {
            if (Ci[i] === chars[i].length - 1) {
                Ci[i] = 0;
            } else {
                Ci[i]++;
                break;
            }
        }
    }
    console.log(temp);
    return temp;
}

// Example usage:
var chars = [[1, 2, 3],
['A', 'B'],
['X', 'Y', 'Z']];
allCombinations(chars);
