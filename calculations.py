#Basic calculator functions in Python 

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

#power
def pow(a,b):
    return float(a) ** float(b)

#root
def root(a,b):
    if float(b) == 0:
        return "Can't compute zeroth root"
    return float(a) ** (1/float(b))
