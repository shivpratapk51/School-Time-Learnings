Student = {
    "Amit": 40,
    "Rajeev": 59,
    "Nilam": 75,
    "Sanyam": 49
}

stack=[]
top = 0

def push(student:dict):
    top = 0
    for i in student:
        value = student[i]
        if value > 50:
            stack.append(i)
            top = len(stack)
    return top
def pop():
    for i in range(len(stack)):
        popedItem = stack.pop()
        print(popedItem)
    if len(stack)== 0:
        print("Stack is Empty")
    # if len(stack)==0:
    #     print("Stack is Empty.")
    # popedName = stack.pop()
    # top = len(stack)
    # print(f"{popedName} is Removed.")
    # return top
    
push(Student)
pop()
