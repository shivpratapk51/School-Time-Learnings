import mysql.connector

# CONNECTION
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="neelgiri"
)


# ---------------- VIEW MENU ----------------
def vmen():
    q = "SELECT * FROM menu"
    cur = conn.cursor() 
    cur.execute(q) 
    menu = cur.fetchall()

    if len(menu) > 0:
        print("\n\n---- Available Dishes ----\n")
        for i in menu:
            print(f"DISH NUMBER: {i[0]}")
            print(f"--> {i[1]} (TYPE: {i[3]})")
            print(f"PRICE: {i[2]}\n")

    yn = int(input("\nDo you want to order an item? (1=Yes / 2=Back): "))
    if yn == 1:
        byo()
    else:
        print("\nTHANK YOU! Redirecting to MAIN PAGE...\n")


# ---------------- BOOK YOUR ORDER ----------------
def byo():
    cur = conn.cursor() 
    ID = int(input("ENTER DISH NO.: "))
    QUANTITY = int(input("ENTER QUANTITY: "))
    NAME = input("ENTER YOUR NAME: ")
    MOBNO = input("ENTER YOUR MOBILE NUMBER: ")
    ADDRESS = input("ENTER YOUR ADDRESS: ")

    a = "SELECT * FROM menu WHERE ID={}".format(ID)
    cur.execute(a)
    result = cur.fetchall()

    if len(result) == 0:
        print("\nInvalid Dish ID!")
        return

    price = result[0][2]
    total = QUANTITY * price

    ins = "INSERT INTO cusdet VALUES({}, {}, '{}', '{}', '{}', {})".format(
        ID, QUANTITY, NAME, MOBNO, ADDRESS, total
    )
    cur.execute(ins)
    conn.commit()

    print("\nTHANKS FOR YOUR ORDER!")
    print("ORDER SUCCESSFUL!\nReturning to main page...\n")


# ---------------- VIEW YOUR ORDER ----------------
def vyo():
    cur = conn.cursor()
    c = input("Enter your mobile number: ")

    d = "SELECT * FROM cusdet WHERE MOBNO='{}'".format(c)
    cur.execute(d)
    orders = cur.fetchall()

    if len(orders) == 0:
        print("\nNo order found with this mobile number!\n")
        return

    print("\n---- YOUR RECENT ORDERS ----\n")

    r = """SELECT menu.ID, menu.NAME, menu.PRICE, menu.TYPE,
            cusdet.QUANTITY, cusdet.TOTALPRICE, cusdet.MOBNO, cusdet.ADDRESS
            FROM menu, cusdet 
            WHERE cusdet.MOBNO='{}' AND menu.ID=cusdet.ID""".format(c)

    cur.execute(r)
    result = cur.fetchall()

    for j in result:
        print(f"ID: {j[0]}")
        print(f"ITEM NAME: {j[1]}")
        print(f"ITEM TYPE: {j[3]}")
        print(f"TOTAL PRICE: {j[5]}")
        print(f"MOBILE NUMBER: {j[6]}")
        print(f"ADDRESS: {j[7]}\n")


# ---------------- CANCEL ORDER ----------------
def cyo():
    cur = conn.cursor()
    c = input("Enter your mobile number: ")

    e = "DELETE FROM cusdet WHERE MOBNO='{}'".format(c)
    cur.execute(e)
    conn.commit()

    print("\nYOUR ORDER HAS BEEN CANCELLED!\nReturning to main page...\n")


# ---------------- FEEDBACK ----------------
def fdbck():
    cur = conn.cursor()
    fd = input("Enter your name: ")
    fdi = input("Write something about us: ")

    q = "INSERT INTO feedback VALUES('{}','{}')".format(fd, fdi)
    cur.execute(q)
    conn.commit()

    print("\nThanks for your feedback :)\nReturning to main page...\n")


# ---------------- WELCOME PAGE ----------------
def start():
    print("\nWELCOME TO NEELGIRI RESTAURANT")
    print("1. CUSTOMER")
    print("2. EXIT")


# ---------------- CUSTOMER MENU ----------------
def start1():
    while True:
        print("\n1. VIEW MENU")
        print("2. BOOK YOUR ORDER")
        print("3. VIEW YOUR ORDERS")
        print("4. CANCEL ORDER")
        print("5. FEEDBACK")
        print("6. EXIT")

        ch1 = int(input("Enter your choice: "))

        if ch1 == 1:
            vmen()
        elif ch1 == 2:
            byo()
        elif ch1 == 3:
            vyo()
        elif ch1 == 4:
            cyo()
        elif ch1 == 5:
            fdbck()
        elif ch1 == 6:
            return
        else:
            print("\nINVALID CHOICE, TRY AGAIN!\n")


# ---------------- MAIN PROGRAM LOOP ----------------
start()
while True:
    ch = int(input("Enter your choice: "))
    if ch == 1:
        start1()
        start()
    elif ch == 2:
        conn.close()
        print("Thank you! Visit Again!")
        break
    else:
        print("\nINVALID CHOICE, TRY AGAIN\n")
def get_absolute_url(self):
    from django.core.urlresolvers import reverse
    return reverse('\\\\\
        
        
        
        
        
        
        hiwhiw
        
        whwirwhr
        ', kwargs={'pk': self.pk})