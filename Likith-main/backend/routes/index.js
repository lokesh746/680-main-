let express = require('express');
const modelOps = require('../model/model');
let router = express.Router();


const ACoc = (chars) => {
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

const ECC = (chars) => {
  const numChars = chars.length;
  const mostBlocks = Math.max(...chars.map(c => c.length));
  const op = [];

  for (let testNum = 1; testNum <= mostBlocks; testNum++) {
      const tmp1 = [];
      process.stdout.write(`test # ${testNum}: `);

      for (const c of chars) {
          if (testNum <= c.length) {
              process.stdout.write(`${c[testNum - 1]} `);
              tmp1.push(c[testNum - 1]);
          } else {
              process.stdout.write(`* `);
              tmp1.push('*');
          }
      }
      console.log();
      op.push(tmp1);
  }

  console.log(op);
  return op;
}

const BCC = (chars, base) => {
    const output_base = [];
    const base_length = base.length;
    if (base.length !== chars.length) {
      console.error("not a valid base input");
      let err= new Error('not a valid base input');
      throw err
      
    }
  
    for (const c of base) {
      if (!chars.some((sublist) => sublist.includes(c))) {
        console.error("not a valid base input");
        let err= new Error('not a valid base input');
      throw err
      }
    }
  
    let index = -1;
    output_base.push(base);
    base.sort();
    chars.sort();
  
    for (const char of chars) {
      index++;
      for (let j = 0; j < char.length; j++) {
        const temp = base.slice();
        if (char[j] !== base[index]) {
          temp[index] = char[j];
          output_base.push(temp);
        }
      }
    }
  
    console.log(output_base);
    return output_base;
}

/* GET home page. */
router.post('/getResults', async function (req, res, next) {

  try {

    console.log(req.body);
    let choice = req.body.criteria;
    let inputs = req.body.characteristics;
    let inputArr = [];
    for (let eval of inputs) {
      console.log(eval);
      let value = eval['value'].split(",").map(e=>e.trim());
      inputArr.push(value)
    }

    console.log(inputArr);
    let outputs = []

    if (choice === 'BCC') {
      let base = req.body.baseinpt.split(",").map(e=>e.trim());
      outputs = BCC(inputArr, base);

    }
    else if (choice === 'ECC') {
      outputs = ECC(inputArr);
    }
    else {
      outputs = ACoc(inputArr);
    }

    //write API request to store result and input
    let storedData = await modelOps.storeInputandOutput(req.body, outputs);

    // outputs = outputs.length > 0 ? outputs : [
    //   ['A1', 'B1', 'C1'], ['A1', 'B1', 'C2'], ['A1', 'B2', 'C1'], ['A1', 'B2', 'C2'], ['A1', 'B3', 'C1'], ['A1', 'B3', 'C2'],
    //   ['A2', 'B1', 'C1'], ['A2', 'B1', 'C2'], ['A2', 'B2', 'C1'], ['A2', 'B2', 'C2'], ['A2', 'B3', 'C1'], ['A2', 'B3', 'C2'],
    //   ['A3', 'B1', 'C1'], ['A3', 'B1', 'C2'], ['A3', 'B2', 'C1'], ['A3', 'B2', 'C2'], ['A3', 'B3', 'C1'], ['A3', 'B3', 'C2']
    // ]

    res.json(outputs);
  } catch (error) {
    console.log(error);
    res.statusCode = error.status || 500;
    res.json(error.message);
  }
});


router.get("/getall", async (req, res) => {
  try {
    let data = await modelOps.getAllInputOutput();
    res.json(data)
  } catch (error) {
    console.log(error);
    res.statusCode = error.status || 500;
    res.json(error.message);
  }
})

module.exports = router;
