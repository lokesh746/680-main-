function baseCriteria(chars, base) {
    let output = [];
    let baseLength = base.length;

    if (baseLength !== chars.length) {
        console.log("not a valid base input");
        return;
    }

    for (let c of base) {
        if (!chars.some(sublist => sublist.includes(c))) {
            console.log("not a valid base input");
            return;
        }
    }

    let index = -1;
    console.log(base);
    let t=base;
    output.push(t)

    // Sort the base and chars arrays
    base.sort();
    chars.forEach(sublist => sublist.sort());

    chars.forEach(i => {
        index++;
        let temp = [...base];

        for (let j = 0; j < i.length; j++) {
            if (i[j] !== base[index]) {
                temp[index] = i[j];
                console.log(temp);
                output.push([...temp]);
            }
        }
    });

    console.log(output);
}

const chars = [
    ['B1', 'B2', 'B3'],
    ['A1', 'A2'],
    ['C1', 'C2']
];
const base = ['A1', 'C1', 'B3'];

baseCriteria(chars, base);
