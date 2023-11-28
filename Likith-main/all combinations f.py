def all_combinations(chars):
    numChars = len(chars)
    numTests = 1
    temp=[]

    for char in chars:
        numTests *= len(char)

    Ci = [0] * numChars  # Initialize index variables for characteristics

    for testNum in range(1, numTests + 1):
        print(f"test # {testNum}: ", end="")
        t1=[]
        for i in range(numChars):
            print(chars[i][Ci[i]], end=" ")
            t1.append(chars[i][Ci[i]])

        temp.append(t1)

        print()

        for i in range(numChars - 1, -1, -1):
            if Ci[i] == len(chars[i]) - 1:
                Ci[i] = 0
            else:
                Ci[i] += 1
                break
    print(temp) 
# Example usage:
chars = [
    [1, 2, 3],
    ['A', 'B'],
    ['X', 'Y', 'Z']
]

all_combinations(chars)
