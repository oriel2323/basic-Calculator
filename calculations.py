#Basic calculator in Python 

def add(a,b):
    return float(a) + float(b)

def sub(a,b):
    return float(a) - float(b)

def div(a,b):
    if b == 0:
        return "Can't devide by zero"

    return float(a)/float(b)

def mul(a,b):
    return float(a) * float(b)



def main():

    run = True 
    while run: 


        num1 =  float(input("Enter the first number:"))
        action = input("choose action ")

        if action != "+" and action != "-" and action != "*" and action != "/":
            print("Invalid action")
            continue

        num2 =  float(input("Enter the second number:"))

        if action == "+":
            print(add(num1,num2))

        if action == "-":
            print(sub(num1,num2))

        if action == "*":
            print(mul(num1,num2))

        if action == "/":
            print(div(num1,num2))


        print("continue? y/n ")
        if input() == "n" or input() == "N":
            run = False
        else:
            run = True


if __name__ == "__main__":
    main()