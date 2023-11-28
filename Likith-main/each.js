function generateAbstractTests(chars) {
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

// Example usage:
const chars = [
    ['A', 'B', 'C'],
    ['1', '2'],
    ['X', 'Y', 'Z']
];

generateAbstractTests(chars);
