# Python Object-Oriented Programming

class Employee:
    raise_amount = 1.04
    num_of_emps = 0


    def __init__(self, firstName, lastName, pay):
        self.fistName = firstName
        self.lastName = lastName
        self.pay = pay
        self.email = firstName + "." + lastName + "@company.com"

        Employee.num_of_emps += 1

    def fullName(self):
        return "{} {}".format(self.fistName, self.lastName)

    def apply_raise(self):
        self.pay = int(self.pay * self.raise_amount)

    def __repr__(self):
        return "Employee('{}','{}','{}')".format(self.fistName, self.lastName, self.pay)

    def __str__(self):
        return "{} - {}".format(self.fullName(),self.email)

    def __add__(self, other):
        return self.pay + other.pay




emp1 = Employee("Shiv", "Pratap", 50000)
emp2 = Employee("Test", "User", 60000)

print(emp1 + emp2)

# <---INSTANCE VARIABLE--->
# print(emp1)
# print(emp2)

# emp1.first = "Shiv"
# emp1.last = "Pratap"
# emp1.email="shiv.pratp@company.com"
# emp1.pay= 50000

# emp2.first = "Test"
# emp2.last = "User"
# emp2.email="test.user@company.com"
# emp2.pay= 60000

# print(emp1.email)
# print(emp2.email)
# print(emp1.fullName())
# print(emp2.fullName())
# Employee.fullName(emp1)


#<---CLASS VARIABLE--->

# print(emp1.pay)
# emp1.apply_raise()
# print(emp1.pay)

# print(emp1.__dict__)
# print(Employee.__dict__)

# emp1.raise_amount = 1.05

# print(emp1.__dict__)

#
# print(Employee.raise_amount)
# print(emp1.raise_amount)
# print(emp2.raise_amount)
#
#

# print(Employee.num_of_emps)

# print(emp1)
# repr(emp1)
# str(emp1)
# print(int.__add__(1,5))
# print(str.__add__("a","b"))

























