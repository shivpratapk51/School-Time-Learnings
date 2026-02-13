fileHandler = open("C:\\Users\\Computer Lab\\Desktop\\PRACTICLE\\QUESTION 1\\sample.txt", "r")
lineList = fileHandler.readlines()
for i in lineList:
    wordList = i.split()
    for j in wordList:
        if j[0]=="a"or j[0]=="A":
            print(j)

