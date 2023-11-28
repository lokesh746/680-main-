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
    ['A1', 'A2', 'A3'],
    ['B1', 'B2','B3'],
    ['C1','C2']              
]
base=['B2','A1','C2']


base_criteria(chars,base)