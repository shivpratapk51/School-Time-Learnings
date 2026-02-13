import mysql.connector
from pathlib import Path
import os
import csv


DB_CONFIG = {
    "host":"localhost",
    "user": "root",
    "password": "root",
}
def getConn():
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Exception as e:
        print(f"Error: {e}")       

info_of_files= {}

conn = getConn()
cur = conn.cursor()

def main():
    sql = "SHOW DATABASES;"
    cur.execute(sql)
    data = cur.fetchall()
    print("="*10+ "[SELECT YOUR DATABASE]" + "="*10)
    db_info = {}
    count = 1
    for i in data:
        db_info[count] = i[0]
        print(f"{count}. {i[0]}")
        count +=1
    print("")
    selected_db = int(input(f"Choose your database(1 to {count-1}): "))
    db_name = db_info[selected_db]
    dbsql = f"USE {db_name};"
    print(dbsql)
    cur.execute(dbsql)
    data = cur.fetchone()
    
main()
try:
    dbSQL = "show tables;"
    cur.execute(dbSQL)
    data  = cur.fetchall()
    for i in data:
        if i[0] not in info_of_files:
            filePath = f"{i[0]}.csv"
            Path(filePath).touch()
            info_of_files[i[0]] = os.path.abspath(filePath)
    for i in info_of_files:
        sql = f"SELECT * FROM {i}"
        cur.execute(sql)
        data = cur.fetchall()
        filepath = info_of_files[i]
        for j in data:
            with open(filepath, "a", encoding="utf-8") as file:
                writer = csv.writer(file)
                writer.writerow(j)
except Exception as e:
    print(f"Error: {e}")
finally:
    conn.close()


print(info_of_files)

