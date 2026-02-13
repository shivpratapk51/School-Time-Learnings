# num = 5
# num2=1
# num3=0
# for i in range(1):
#     for j in range(1,6):
#         print(" "*(num-j),"*"*num2+"*"*num3)
#         num2 +=1
#         num3+=1



# rows = 5

# for i in range(rows):
#     # Calculate spaces and stars for each row
#     spaces = '.' * (rows - i - 1)
#     stars = '*' * (2 * i + 1)
    
#     print(spaces + stars)


rows = 50

for i in range(rows):
    spaces = " "*(rows -i-1)
    stars = "*"*( 2*i + 1)
    print(spaces+stars)







# num= 10
# for i in range(1,10):
#     print("*"*(num-i))

# ....*
# ...***
# ..*****
# .*******
# *********