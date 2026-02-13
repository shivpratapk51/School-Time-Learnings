'''
create table DEPT(
    DCODE varchar(4) primary key,
    DEPARTMENT varchar(25),
    CITY varchar(25)
)

create table WORKER(
    WNO int(4) primary key,
    NAME varchar(25),
    DOJ date,
    DOB date,
    GENDER varchar(2),
    DCODE varchar(4)
    foreign key(DCODE) refrences DEPT(DCODE)
);

A.
select WNO,NAME, GENDER FROM WORKER order by WNO DESC;

B.
SELECT NAME FROM WORKER INNER JOIN DEPT ON WORKER.DCODE = DEPT.DCODE WHERE DEPT.DEPARTMENT IN ("MEDIA", "FINANCE");

C.
SELECT WNO, NAME FROM WORKER WHERE DOB BETWEEN '1987-01-01' AND '1991-12-01';

D.
SELECT GENDER, COUNT(*) FROM WORKER WHERE GENDER = 'M' AND DOJ > '1986-01-01' GROUP BY GENDER;
'''