import shutil

total, used, free = shutil.disk_usage("C:/")
print(f"Free space: {free // (1024**3)} GB")