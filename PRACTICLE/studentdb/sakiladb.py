import csv
import mysql.connector

DB_CONFIG = {
    "host":"localhost",
    "user": "root",
    "password": "root",
    "database": "sakila"
}
def writer():
    fileHandeler = open("countrylanguagedetail.csv","a",encoding='utf-8')
    writer = csv.writer(fileHandeler)
    return writer

def getConn():
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Exception as e:
        print(f"Error: {e}")
# cityList = []
try:
    conn = getConn()
    cur = conn.cursor()
    sql = "SELECT * FROM countrylanguage;"
    cur.execute(sql)
    data = cur.fetchall()
    write = writer()
    for i in data:
        print(i)
        write.writerow(i)
        # cityList.append(i)
except Exception as e:
    print(f"Error: {e}")
finally:
    conn.close()

# with open("citydetail.csv","a",encoding='utf-8') as f:
#     writer = csv.writer(f)
#     writer.writerows(cityList)