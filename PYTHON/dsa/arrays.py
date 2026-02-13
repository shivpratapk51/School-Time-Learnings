# USING ARRAY MODULE
    # from array import *

    # val = array("i", [1, 2, 3, 4, 5,6])

    # for i in range(len(val)):
    #     print(val[i])

    # for i in val:
    #     print(i,end="")

    # print(val.typecode)
    # val.reverse()
    # for i in val:
    #     print(i,end=" ")


    # insert() -Don't delete any element

    # val.insert(4, 50)
    # for x in val: print(x)
    # print(len(val))


    # append() -Add element to array at last position
    # val.append(10)
    # for x in val:print(x)

    # To replace a element in array
    # val[2] = 20

    # To copy a array to another array
    # newArray = array(val.typecode,(a*2 for a in val))
    # for x in newArray: print(x)

    # Delete element from the array
    # By index
    # It takes index as parameter and removes element at that index and returns the removed element. By default it removes last element.
    # el = val.pop()
    # print("Deleted element:",el)
    # for x in val: print(x)

    # By value
    # It removes first occurrence of the element. It returns None. 
    # val.remove(3)
    # for x in val: print(x)



    # SLICING IN ARRAY
    # newArray = val[::-2]
    # for x in newArray: print(x)




    # -------------USER GIVEN ARRAY (DYNAMIC ARRAY)------------------

    # arr = array("i", [])
    # size = int(input("Enter enter a number: "))
    # for i in range(size):
    #     element = int(input("Enter element to add in array: "))
    #     arr.append(element)

    # for x in arr: print(x)


    # --------------- SEARCHING IN ARRAY ------------------

    # arr = array("i", [10, 20, 30, 40, 50, 60, 70, 80, 90])

    # idex() -Takes element and returns index of first occurrence of that element
    # index = arr.index(50)
    # print(index)


# USING NUMPY
from numpy import *

# arr = array([1,2,3,4], str)
# for i in arr:print(type(i))

# linspace(start, End, Partition) - It returns evenly spaced numbers over a specified interval. Also includes both start and end element.
# arr = linspace(6, 15, 15)

# for i in range(len(arr)):
#     print(arr[i])

# arange(start, end, commonDifference) -It returns evenly spaced values within a given interval. It excludes the end element.
# arr = arange(1, 15, 2)
# for i in range(len(arr)):
#     print(arr[i])
    
# logspace(start, end, numberOfElements) - It returns numbers spaced evenly on a log scale.
# arr = logspace(1, 40, 5)
# for i in range(len(arr)):
#     print(arr[i])








