def maxArea(height: list):
    i = []
    product = []
    for j in range(1, len(height)+1):
        i.append(j)
    max= max(height)
    # for k in i:
    #     for j in height:
    #         product.append(k*j)
    print(product)

height = [1,8,6,2,5,4,8,3,7]
maxArea(height)