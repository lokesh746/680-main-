# Online Python compiler (interpreter) to run Python online.
# Write Python 3 code in this online editor and run it. 
def base_criteria(chars,base):
    output=[]
    base_length=len(base)
    if (len(base)!=len(chars)):
        print("not a valid base input")
        return 
    for c in base:
        if (False==any(c in sublist for sublist in chars)):
            print("not a valid base input")
            return 
            
        
    index=-1
    print(base) 
    base.sort()
    chars.sort()
    for i in chars:
        index=index+1
        temp=base.copy()
        
        for j in range(0,len(i)):
            
            if i[j] !=base[index]:
                temp[index]=i[j]
                print(temp)
                output.append(temp)
        del temp       
    print(output)
  
    
chars = [
    ['B1', 'B2', 'B3'],
    ['A1', 'A2'],
    ['C1','C2']              
]
base=['A1','C1','B3']


base_criteria(chars,base)