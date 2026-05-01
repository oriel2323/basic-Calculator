#Basic calculator in Python 
#addition

def add(a,b):
    return float(a) + float(b)

#subtraction
def sub(a,b):
    return float(a) - float(b)

#division
def div(a,b):
    if b == 0:
        return "Can't devide by zero"

    return float(a)/float(b)

#multiplication
def mul(a,b):
    return float(a) * float(b)

