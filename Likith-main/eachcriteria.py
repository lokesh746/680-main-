def generate_abstract_tests(chars, numChars):
    # Find the characteristic with the most blocks
    mostBlocks = max(len(c) for c in chars)
    # let temp1=[]
   
    op=[]
    # Display abstract tests in each choice order
    for testNum in range(1, mostBlocks + 1):
        tmp1=[]
        print("test # {}: ".format(testNum), end="")

        for c in chars:
            # Check if we've displayed all blocks
            if testNum <= len(c):
                print(c[testNum - 1], end=" ")  # Nth block in characteristic C
                tmp1.append(c[testNum - 1]);
            else:
                print("*", end=" ")  # no more blocks in this characteristic, any value will do
                tmp1.append("*");
        print()
        op.append(tmp1)

    print(op)    

# Example usage:
chars = [
    ['A', 'B', 'C'],
    ['1', '2'],
    ['X', 'Y', 'Z']
]

numChars = len(chars)

generate_abstract_tests(chars, numChars)