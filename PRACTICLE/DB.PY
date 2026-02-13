import mysql.connector
import datetime as dt
import sys

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'passwd': 'root', 
    'database': 'employees'
}

def get_connection():
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        sys.exit()

def initialize_db():
    """Creates the necessary tables if they do not exist."""
    conn = get_connection()
    cur = conn.cursor()
    
    # Table for system access
    cur.execute('''CREATE TABLE IF NOT EXISTS log_id (
                    username VARCHAR(25) PRIMARY KEY, 
                    password VARCHAR(25) NOT NULL)''')
    
    # Table for employee data
    cur.execute('''CREATE TABLE IF NOT EXISTS office (
                    em_no INT PRIMARY KEY, 
                    em_name VARCHAR(50), 
                    em_dept VARCHAR(50), 
                    em_salary FLOAT, 
                    em_age INT)''')
    
    # Table for performance tracking
    cur.execute('''CREATE TABLE IF NOT EXISTS em_performance (
                    em_no INT, 
                    em_name VARCHAR(50), 
                    em_dept VARCHAR(50), 
                    performance VARCHAR(50), 
                    work_experience INT)''')
    conn.commit()
    conn.close()

def register_user():
    conn = get_connection()
    cur = conn.cursor()
    name = input('Enter a new Username: ')
    passwd = input('Enter a 4-DIGIT Password: ')
    try:
        cur.execute("INSERT INTO log_id (username, password) VALUES (%s, %s)", (name, passwd))
        conn.commit()
        print('User created successfully!')
    except mysql.connector.IntegrityError:
        print("Username already exists.")
    conn.close()

def login_user():
    conn = get_connection()
    cur = conn.cursor()
    name = input('Enter your Username: ')
    passwd = input('Enter your Password: ')
    
    cur.execute("SELECT * FROM log_id WHERE username=%s AND password=%s", (name, passwd))
    user = cur.fetchone()
    conn.close()
    
    if user:
        print("\nLogin Successful!")
        return True
    else:
        print("\nInvalid username or password.")
        return False

def register_employee():
    conn = get_connection()
    cur = conn.cursor()
    try:
        v_em_no = int(input("Enter employee ID: "))
        v_em_name = input("Enter name: ")
        v_em_dept = input("Enter department: ")
        v_em_salary = float(input("Enter salary: "))
        v_em_age = int(input("Enter age: "))
        
        sql = "INSERT INTO office (em_no, em_name, em_dept, em_salary, em_age) VALUES (%s, %s, %s, %s, %s)"
        cur.execute(sql, (v_em_no, v_em_name, v_em_dept, v_em_salary, v_em_age))
        conn.commit()
        print("Employee registered successfully!")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        conn.close()

def view_details():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM office")
    results = cur.fetchall()
    print("\n--- Employee Details ---")
    for row in results:
        print(row)
    conn.close()

def update_salary():
    conn = get_connection()
    cur = conn.cursor()
    nam = input("Enter employee name for 10% increment: ")
    cur.execute("UPDATE office SET em_salary = em_salary * 1.10 WHERE em_name = %s", (nam,))
    conn.commit()
    if cur.rowcount > 0:
        print("Salary updated successfully.")
    else:
        print("Employee not found.")
    conn.close()

def em_list():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT em_name FROM office ORDER BY em_name ASC")
    rows = cur.fetchall()
    for row in rows:
        print(row[0])
    print(f"Total employees: {cur.rowcount}")
    conn.close()

def em_count():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT COUNT(DISTINCT em_name) FROM office")
    count = cur.fetchone()
    print(f"Number of unique employees: {count[0]}")
    conn.close()

def check_salary():
    conn = get_connection()
    cur = conn.cursor()
    nam = input("Enter employee name: ")
    cur.execute("SELECT em_salary FROM office WHERE em_name = %s", (nam,))
    res = cur.fetchone()
    if res:
        print(f"Current salary of {nam} is: {res[0]}")
    else:
        print("Employee not found.")
    conn.close()

def add_performance():
    conn = get_connection()
    cur = conn.cursor()
    try:
        v_em_no = int(input("Enter employee ID: "))
        v_em_name = input("Enter name: ")
        v_em_dept = input("Enter department: ")
        v_perf = input("Enter performance: ")
        v_exp = int(input("Enter experience (Years): "))
        
        sql = "INSERT INTO em_performance VALUES (%s, %s, %s, %s, %s)"
        cur.execute(sql, (v_em_no, v_em_name, v_em_dept, v_perf, v_exp))
        conn.commit()
        print("Performance details added.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        conn.close()

def main_menu():
    while True:
        print("\n" + "="*30)
        print("  EMPLOYEE MANAGEMENT SYSTEM")
        print("="*30)
        print("1. Employee Registration")
        print("2. View All Employee Details")
        print("3. Update Salary (10% Bonus)")
        print("4. View Employee List (Alphabetical)")
        print("5. Total Employee Count")
        print("6. Check Specific Salary")
        print("7. Add Performance Record")
        print("8. Logout/Exit")
        
        try:
            choice = int(input("\nEnter choice: "))
            if choice == 1: register_employee()
            elif choice == 2: view_details()
            elif choice == 3: update_salary()
            elif choice == 4: em_list()
            elif choice == 5: em_count()
            elif choice == 6: check_salary()
            elif choice == 7: add_performance()
            elif choice == 8: 
                print("Exiting...")
                break
            else: print("Invalid choice!")
        except ValueError:
            print("Please enter a valid number.")

if __name__ == "__main__":
    initialize_db()
    print('WELCOME TO EMPLOYEE MANAGEMENT SYSTEM')
    print(dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    
    print('\n1. REGISTER NEW SYSTEM USER')
    print('2. LOGIN')
    
    try:
        start_choice = int(input('\nEnter choice: '))
        if start_choice == 1:
            register_user()
        
        # Proceed to login for both new and existing users
        if login_user():
            main_menu()
        else:
            print("Access Denied.")
            
    except ValueError:
        print("Invalid input.")