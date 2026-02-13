def longestCommonPrefix(strs:list[str]):
    prefix = []
    for i in strs:
        prefix.append(i[0])
    print(prefix)
    
strs = ["flower","flow","flight"]

longestCommonPrefix(strs)
