# SQL Master Guide - Complete Interview Questions & Scenarios

This is a unified study guide combining theoretical concepts, visual scenario sheets, and cheatsheets to cover SQL, RDBMS design, practical queries, and performance tuning.

## Table of Contents
1. [Database Basics & SQL vs NoSQL](#1-database-basics-sql-vs-nosql)
2. [SQL Command Types & Execution Order](#2-sql-command-types-execution-order)
3. [Basic Querying, Filtering, Sorting & Operators](#3-basic-querying-filtering-sorting-operators)
4. [SQL Joins (Types & Scenarios)](#4-sql-joins-types-scenarios)
5. [Aggregate Functions & Grouping](#5-aggregate-functions-grouping)
6. [Subqueries & Common Table Expressions (CTEs)](#6-subqueries-common-table-expressions-ctes)
7. [Data Types & NULL Value Handling](#7-data-types-null-value-handling)
8. [Database Keys](#8-database-keys)
9. [Data Integrity, Constraints & Normalization](#9-data-integrity-constraints-normalization)
10. [Transactions & ACID Properties](#10-transactions-acid-properties)
11. [Views & Indexing](#11-views-indexing)
12. [Oracle-Specific Functions & PL/SQL Basics](#12-oracle-specific-functions-pl/sql-basics)
13. [Cursors, Triggers & Mutating Table Error](#13-cursors-triggers-mutating-table-error)
14. [Query Optimization & Performance Tuning](#14-query-optimization-performance-tuning)
15. [Advanced Database Concepts](#15-advanced-database-concepts)
16. [Practical Query Scenarios & Tricky Interview Q&A](#16-practical-query-scenarios-tricky-interview-q&a)

---

## 1. Database Basics & SQL vs NoSQL

### Q1. What is SQL and how does it differ from NoSQL?

SQL (Structured Query Language) is the standard programming language designed for managing and manipulating data stored in Relational Database Management Systems (RDBMS). It is declarative, meaning you specify what data you want rather than how to retrieve it.

| Feature | SQL Databases (Relational) | NoSQL Databases (Non-Relational) |
| :--- | :--- | :--- |
| **Data Model** | Tabular (Rows and Columns) | Document, Key-Value, Graph, Column-family |
| **Schema** | Static, predefined schema | Dynamic, flexible schema |
| **Scaling** | Vertically scalable (increase hardware power) | Horizontally scalable (add more servers/sharding) |
| **Transactions** | Follows ACID properties strictly | Follows BASE properties (Eventual Consistency) |
| **Examples** | Oracle, PostgreSQL, MySQL, SQL Server | MongoDB, Cassandra, Redis, DynamoDB |

---

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> SQL (Structured Query Language) is a standard database language used to communicate with databases to store, retrieve, update, and delete data.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Answer SQL (Structured Language) is used to communicate with databases to store, retrieve, update, and delete data

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Answer:

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SQL Structured Language . Used to Communicate with databases. Create read , and delete   data DATABASE Database organized  collection of data. DBMS Software to  manage   databases. SQL is   the Examples   of DBMS : language , MySQL is   the MySQL Software _ Oracle SQL Server PostgreSQL User SQLite

### Q2. What is an RDBMS and what are its key features?

A Relational Database Management System (RDBMS) is a software program that manages relational databases. The relational model is based on storing data in tables (called relations) which are linked to each other using common fields (keys).

Key features of RDBMS include:
*   **Tables**: Data is organized in rows (records/tuples) and columns (attributes/fields).
*   **Primary Keys**: Unique identifiers for each record in a table.
*   **Foreign Keys**: References to primary keys in other tables to establish relationships.
*   **Data Integrity**: Rules enforced to maintain data accuracy (Domain, Entity, and Referential Integrity).
*   **ACID Compliance**: Ensures reliable processing of transactions.

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Answer: Feature DBMS RDBMS Structure Non-relational Relational (tables_ Relations Not Supported Supported Example File System MySQL, Oracle

### Q3. What is the difference between Row Store and Column Store databases?

*   **Row Store**: Stores data rows sequentially on disk. Ideal for transactional systems (OLTP) where entire records are frequently inserted, updated, or retrieved (e.g., Oracle Database standard tables).
*   **Column Store**: Stores data columns sequentially on disk. Ideal for analytical queries (OLAP/Data Warehousing) where aggregations like `AVG` and `SUM` are run across millions of rows for specific columns.

---

### Q4. What is the difference between DBMS and RDBMS?

| Feature | DBMS (Database Management System) | RDBMS (Relational Database Management System) |
| :--- | :--- | :--- |
| **Structure** | Stores data in a non-relational structure. | Stores data in a relational structure (tables). |
| **Relationships**| Relationships between datasets are not supported. | Relationships between tables are supported (using primary/foreign keys). |
| **Example** | File systems, XML sheets. | MySQL, Oracle, PostgreSQL, SQL Server. |

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Feature DBMS RDBMS Structure Non-relational Relational (tables) Relationships Not supported Supported Example File system MySQL, Oracle

### Q5. What is the difference between SQL and MySQL?

*   **SQL (Structured Query Language)**: The standardized programming language used to define and manipulate databases.
*   **MySQL**: A popular open-source relational database management system software engine that utilizes the SQL language.

### Q6. Sensitivity in SQL?

Depends On DBMS (MySQL is case-insensitive for keywords)

### Q7. Why MySQL ?

```sql
DBMS Free Popular to use Database Good for  beginners Basic Database Commands Comment   Styles Create Database single   line comment CREATEDATABASE_companyHR;
```
 
```sql
single line comment Use Database USE companyHR multi - line Database comment DROP DATABASE IF EXISTS wrongDB;
```

### Q8. Utgndn4

Faxragening to learn relational databases_ Data integrity Data security Why


---

## 2. SQL Command Types & Execution Order

### Q1. Explain the Types of SQL Commands (DDL, DML, DQL, DCL, TCL)

SQL commands are grouped into five sub-languages based on their functionality:

| Category | Description | Key Commands |
| :--- | :--- | :--- |
| **DQL (Data Query Language)** | Used to fetch/retrieve data from the database. | `SELECT` |
| **DDL (Data Definition Language)** | Used to define and modify the database structure (schema). | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` |
| **DML (Data Manipulation Language)** | Used to insert, update, or delete data within tables. | `INSERT`, `UPDATE`, `DELETE` |
| **DCL (Data Control Language)** | Used to manage permissions and access control. | `GRANT`, `REVOKE` |
| **TCL (Transaction Control Language)** | Used to manage transactions and ensure data integrity. | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

### Examples

**DDL - Creating a Table:**
```sql
CREATE TABLE employees (
    emp_id NUMBER PRIMARY KEY,
    first_name VARCHAR2(50),
    last_name VARCHAR2(50),
    email VARCHAR2(100) UNIQUE,
    salary NUMBER(10, 2),
    hire_date DATE DEFAULT SYSDATE
);
```

**DML - Inserting and Updating Data:**
```sql
-- Insert a row
INSERT INTO employees (emp_id, first_name, last_name, email, salary)
VALUES (101, 'John', 'Doe', 'john.doe@example.com', 75000);

-- Update a row
UPDATE employees
SET salary = 80000
WHERE emp_id = 101;
```

**TCL - Managing Transactions:**
```sql
UPDATE employees SET salary = salary * 1.1 WHERE emp_id = 101;
SAVEPOINT salary_update;

INSERT INTO employees (emp_id, first_name, last_name, email, salary)
VALUES (102, 'Jane', 'Smith', 'jane.smith@example.com', 90000);

-- If something goes wrong with the insert, roll back to the savepoint
ROLLBACK TO salary_update;

-- Otherwise, save all changes permanently
COMMIT;
```

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Answer: DDL (Data Definition Language): CREATE, ALTER, DROP, TRUNCATE DML (Data Manipulation Language): INSERT, UPDATE, DELETE DCL (Data Control Language): GRANT, REVOKE TCL (Transaction Control Language): COMMIT, ROLLBACK, SAVEPOINT

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Reduced redundancy SQL used to store data , retrieve data data and Standard language perform various operations on relational databases data retrieval Database , DBMS and RDBMS Database Collection of related data DBMS Software used to manage the database _ RDBMS Relational Database Management System . SQL  Architecture Client SQL SQL Result User Interface Server Database Output Note User sends request SQL processes Lt) Server interacts with database Result returned to the user Types of SQL Commands SQL Commands DDL DML DQL DCL TCL (Data Definition (Data Manipulation Data (Data Control (Transaction Control Language ) Language Language) Language) Language _ CREATE , ALTER, INSERT, UPDATE SELECT GRANT, REVOKE COMMIT, DROP, TRUNCATE DELETE ROLLBACK, SAVEPOINT Page Query Easy update Easy Query

### Q2. Explain the SQL Query Execution Order

While SQL queries are written starting with `SELECT`, the database engine evaluates clauses in a different logical order. Understanding this order is crucial for writing correct, optimized queries and debugging issues (e.g., why you cannot use a column alias in the `WHERE` clause).

### Logical Execution Order
1.  **FROM / JOIN**: The engine identifies the source tables and performs joins.
2.  **WHERE**: Records are filtered based on conditions.
3.  **GROUP BY**: Surviving records are grouped by one or more columns.
4.  **HAVING**: Grouped results are filtered based on aggregate conditions.
5.  **SELECT**: The engine projects specified columns and evaluates expressions.
6.  **DISTINCT**: Duplicate records are removed from the result set.
7.  **ORDER BY**: The final records are sorted.
8.  **LIMIT / OFFSET / FETCH**: The database restricts the number of returned rows.

---

### Q3. What are the types of SQL commands?

SQL commands are categorized based on their functions:
*   **DDL (Data Definition Language)**: Defines/modifies the structure of database objects (e.g., `CREATE`, `ALTER`, `DROP`, `TRUNCATE`).
*   **DML (Data Manipulation Language)**: Modifies and manipulates table records (e.g., `INSERT`, `UPDATE`, `DELETE`).
*   **DCL (Data Control Language)**: Manages permissions and access privileges (e.g., `GRANT`, `REVOKE`).
*   **TCL (Transaction Control Language)**: Manages transactional states within sessions (e.g., `COMMIT`, `ROLLBACK`, `SAVEPOINT`).

### Q4. What is auto-commit?

Auto-commit is a database session state where every individual SQL statement is automatically committed to the database immediately upon execution without manual commit control.

---

## 4. Schema, Views, and Indexing

This section covers database schemas, metadata definitions, virtual tables (views), and indexing concepts.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> 'testingvala info@testingvala: Com NOT Yes,

### Q5. What is the use of the ALTER command?

The `ALTER` command is a DDL statement used to add, delete, rename, or modify column definitions and constraints in an existing table structure.

### Q6. What is data definition?

Data definition involves using DDL commands to establish or alter the physical structure of tables, indices, schemas, and datatypes.

---

## 9. Data Manipulation and Practical Queries (Part 1)

This section focuses on data manipulation, why analysts rely on databases, and syntax guides for creating tables and inserting data.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Structure of database objects_ 'testingvala info@testingvala com

### Q7. What is data manipulation?

Data manipulation involves using DML commands to perform operations directly on data records, including inserting new rows, updating field values, and deleting records.

### Q8. Data Deletion Strategy

*   **Scenario**: You need to remove all data from a table quickly, and you do not need the option to roll back the deletion.
*   **Question**: Which command will you use and why?
*   **Answer**: Use `TRUNCATE` because it is a DDL command that deallocates data pages directly, making it faster and bypasses logging individual row deletions.

---

## 12. Scenario-Based Questions - Recovery, Duplicates, and Nulls

This section reviews transactional safety scenarios, preventing duplicated values, handling missing columns, and database relationships.

### Q9. Why is TRUNCATE faster than DELETE?

Because `TRUNCATE` is a DDL statement that directly drops data pages and does not write rollback logs for individual row deletions.

### Q10. What happens if a FOREIGN KEY constraint is violated during DML execution?

The database engine aborts execution and throws a foreign key violation error (preserving referential integrity).

---

## 18. Query Scenarios - Select, Filter, Nulls, and Duplicate Counts

This section contains code templates for targeted DML updates, NULL filters, and group aggregates.

### Q11. Employee Salary Update Scenario

*   **Question**: Write a query to increase salaries by 10% for employees in the IT department.
*   **Query**:
    ```sql
    UPDATE employees
    SET salary = salary * 1.10
    WHERE department = 'IT';
    ```
*   **Database Concepts Tested**: DML `UPDATE` command, filtering with `WHERE`.

### Q12. Table Modification Scenario

*   **Question**: Add a column named `bonus` to the employees table.
*   **Query**:
    ```sql
    ALTER TABLE employees
    ADD bonus INT;
    ```
*   **Database Concepts Tested**: DDL modification commands (`ALTER TABLE`).

### Q13. DDL & ADMIN TASKS



### Q14. DATA MODIFICATION (DML)



### Q15. What is SQL?

SQL (Structured Query Language) is used to interact with relational databses by storing; retrieving; modifying; and SELECT managing structured data Why SQL is Important Works with almost all relational databases Used in real-world applications and analytics Essential for backend and data-related roles Enables reliable and structured data handling How SQL is Used Create databse objects Insert and records Retrieve required data Control data access and integrity Main Categories of SQL DDL (Data Definition Language) Used to define and modify database structure DML (Data Manipulation Language) Used to insert updlate and delete table cata DQL (Data Query Language) Used retrieve data from tables DCL (Data Control Language) Used to control access permissions TCL (Transaction Contra Language) Used to manage database transactions Where You Use SQL Daily Fetch reports from databases SQL is Validate application data SQL is the faundation Debug production issues of data communication Support analytics and dashboards between applications and databases update


---

## 3. Basic Querying, Filtering, Sorting & Operators

### Q1. How do you write basic queries for Filtering and Sorting?

To retrieve and organize data, we use the `SELECT` statement paired with logical clauses.

### Query Template
```sql
SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column1 ASC, column2 DESC;
```

### Common Filtering Operators in WHERE
*   **Comparison Operators**: `=`, `<>`, `!=`, `>`, `<`, `>=`, `<=`
*   **IN**: Matches any value in a specified list.
*   **BETWEEN**: Filters values within a inclusive range.
*   **LIKE**: Performs wildcard matching (`%` for zero/more characters, `_` for a single character).
*   **IS NULL / IS NOT NULL**: Checks for the absence or presence of data.
*   **Logical Operators**: `AND`, `OR`, `NOT`

### Examples

**Filtering and Sorting:**
```sql
SELECT first_name, last_name, salary
FROM employees
WHERE salary BETWEEN 50000 AND 100000
  AND email LIKE '%@example.com'
ORDER BY salary DESC;
```

**Using IN and NULL Checks:**
```sql
SELECT first_name, last_name, manager_id
FROM employees
WHERE manager_id IN (101, 102, 103)
  OR manager_id IS NULL;
```

---

### Q2. What is the difference between the IN and BETWEEN operators?

*   `IN` operator: Used to filter data based on a list of specific, discrete values.
    ```sql
    SELECT * FROM employees WHERE dept_id IN (10, 20, 30);
    ```
*   `BETWEEN` operator: Used to filter data based on an inclusive range of values (numeric, date, or character).
    ```sql
    SELECT * FROM employees WHERE salary BETWEEN 50000 AND 80000;
    ```

---

### Q3. How do you select unique records from a table?

You can retrieve unique rows using two primary methods:
*   `DISTINCT` keyword: Instructs the engine to eliminate duplicate rows from the final select projection.
    ```sql
    SELECT DISTINCT job_title FROM employees;
    ```
*   `GROUP BY` clause: Groups rows that have the same values into summary rows.
    ```sql
    SELECT job_title FROM employees GROUP BY job_title;
    ```

> [!NOTE]
> Use `DISTINCT` for simply removing duplicates from the output. Use `GROUP BY` when you need to calculate aggregate values (like `COUNT`, `SUM`) for each unique value.

---

### Q4. What are wildcard operators in SQL and how do you use them with LIKE?

Wildcard operators are placeholder characters used with the `LIKE` operator to search for patterns in character columns.

*   `%` (Percent sign): Represents zero, one, or multiple characters.
*   `_` (Underscore): Represents a single character.

### Examples
```sql
-- Find names starting with 'A'
SELECT * FROM employees WHERE first_name LIKE 'A%';

-- Find names where the second letter is 'a'
SELECT * FROM employees WHERE first_name LIKE '_a%';

-- Find names ending with 's'
SELECT * FROM employees WHERE first_name LIKE '%s';
```

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Ans: 
> ```sql
> SELECT FROM customers WHERE customer_name LIKE A %' ;
> ```

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> SELECT product_id, AVG (rating) AS average_rating FROM Product_reviews GROUP BY Product_id ORDER BY average _ DESC ;
> ```

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Ans: 
> ```sql
> SELECT FROM employees ORDER BY DESC;
> ```
>  salary greater salary wrong Phone Phone salary salary

### Q5. What is case sensitivity in SQL?

SQL syntax keywords (like `SELECT`, `WHERE`) are case-insensitive. However, case sensitivity of data and table/column names depends on the database engine configuration and OS environment (e.g., MySQL is case-insensitive for table names on Windows, but case-sensitive on Linux).

### Q6. Select Data

**Scenario**: Retrieve all employee details from the database.
```sql
SELECT * FROM employees;
```

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> SELECT FROM employees;
> ```

### Q7. Can NULL be compared using the `=` operator?

No. `NULL` represents an unknown state, so comparing it like `col = NULL` evaluates to `UNKNOWN` (neither true nor false). Use `col IS NULL` or `col IS NOT NULL` instead.

### Q8. Can we use a WHERE clause with TRUNCATE?

No, `TRUNCATE` operates on the entire table and cannot filter rows.

### Q9. Filtering Groups Scenario

*   **Question**: Find all departments that have more than 5 employees.
*   **Query**:
    ```sql
    SELECT department, COUNT(*)
    FROM employees
    GROUP BY department
    HAVING COUNT(*) > 5;
    ```
*   **Database Concepts Tested**: Group count aggregations, filter constraints with `HAVING`.

---

## 20. Query Scenarios - Self Joins, Deletes, and Limit Pagination

This section details self-joins, query deletes, structural resets, and row-level filtering.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> like BILL gate Rows Groups Query

### Q10. Data Deletion Scenario

*   **Question**: Delete employees who left the company (whose status is set to 'inactive').
*   **Query**:
    ```sql
    DELETE FROM employees
    WHERE status = 'inactive';
    ```
*   **Database Concepts Tested**: Filtering targets within `DELETE` statements.

### Q11. Top Performer Scenario

*   **Question**: Find the highest-paid employee.
*   **Query**:
    ```sql
    SELECT *
    FROM employees
    ORDER BY salary DESC
    LIMIT 1;
    ```
*   **Database Concepts Tested**: Sorting records (`ORDER BY`), row limiting (`LIMIT`).

### Q12. Do it?

Ans: SELECT department_id, employee_id, first_name, FROM SELECT RANK() OVER (PARTITION BY department_id ORDER BY DESC) AS rnk FROM employees

### Q13. SQL MASTER NOTES

Filtering_Data with WHERE What is WHERE

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> Data Basics Select AlL Columns and Rows SELECT FROM  employees;
> ```
>
> ```sql
> Select all columns and rows Select   Specific   Columns SELECT em_name, FROM employees;
> ```
>
> ```sql
> select columns Aliases As) AS gives column SELECT em_name AS 'Employee Name FROM employees;
> ```
>
> ```sql
> new name. LIMIT Restrict number   of rows SELECT FROM emp ees LIMIT 10;
> ```
>  return  only first 10 rows. DISTINCT Remove   duplicates Filter SELECT DISTINCT department FROM employees remove duplicate  values _ WHERE clause   with  operators SELECT FROM employees WHERE

### Q14. Oooo AND toooo;

```sql
SELECT SELECT FROM employees FROM employees LIKE Wildcards WHERE city IN ('Delhi' , Mumbai' );
```
 WHERE name LIKE 'A% %

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> Example SELECT name salary FROM SELECT name Access WHERE (SELECT AVG (salary) FROM Employees SELECT FROM   HighEarners;
> ```
>
> ```sql
> FROM Employees WHERE (SELECT  AVG (salary) WHERE dept) ;
> ```
>
> ```sql
> FROM Employees) INDEX DELETE VS TRUNCATE VS DROP Improves   speed of data retrieval. Examples Feature DELETE TRUNCATE DROP Like an index in book DELETE (specific rows) Removes Removes Removes table Purpose DELETE FROM Employees Tols rous structure Example WHERE dept 'IT' Rollback Yes INDEX CREATE INDEX idx_name ON Employees(name);
> ```
>
> ```sql
> Where TRUNCATE (all rows) Yes Condition TRUNCATE  TABLE Employees;
> ```
>
> ```sql
> Speed Slower Fastest Types DROP (remove   table) Single Column Index Identity Yes Reset DROP TABLE loyees;
> ```
>  Composite   Index Structure Remains Remains Deleted Index PRIMARY KEY FOREIGN KEY Students Orders Uniquely identifies each row table _ Links one table another table name order_id student_id Cannot contain NULL values Ensures referential  integrity

### Q15. Inner

query runs first and its   result is used by the outer query : Single-Value  Subquery Types of Subqueries SELECT le - Value Subquery Returns one value SELECT value (one row one column) Used with operators like

### Q16. SELECT & Filtering_



### Q17. Filtering & Pattern Matching



### Q18. Cumulative SUM

```sql
SELECT date_ SUM ( amount) OVER (ORDER BY date) FROM sales;
```

### Q19. Moving average

```sql
SELECT date AVG ( amount) OVER (ORDER BY date ROWS PRECEDING FROM sales;
```

### Q20. FIRST

```sql
VALUE and LAST VALUE SELECT name FIRST_VALUE ( score) OVER PARTITION BY subject ORDER BY  date) FROM results;
```

### Q21. NTILE (bucket values)

SELECT NTILE(4) OVER (ORDER BY  salary) AS salary_quartile FROM employees

### Q22. Conditional count with window

```sql
SELECT date COUNT (*) FILTER WHERE status Open OVER (ORDER BY date) FROM tickets;
```

### Q23. Calculate gap between events

```sql
SELECT id event time LAG (event_time OVER   ( ORDER BY event_time) FROM logs @helloworld_avani By;
```

### Q24. Use CTE for filtering aggregates

WiTH counts AS (SELECT dept, COUNT (*) AS cnt FROM emp GROUP BY dept) SELECT FROM counts WHERE cnt

### Q25. Sort results using ORDER BY

```sql
SELECT FROM orders ORDER BY order_date DESC ;
```
 @helloworld_avani Top using By;

### Q26. O00 ;

```sql
IN DISTINCT SELECT FROM Employee SELECT DISTINCT Dept FROM   Employee WHERE Dept IN ('IT Hr' ) ;
```
 
```sql
ORDER BY LIKE SELECT FROM   Employee ORDER BY ASC ;
```
 
```sql
SELECT FROM Employee SELECT FROM Employee ORDER BY DESC ;
```
 WHERE Name LIKE A% Starts wilh WHERE Name LIKE %n Ends   with LIMIT TOP WHERE Name LIKE middle SELECT FROM   Employee LIMIT MySQL SELECT ToP FROM   Employee SQL Server Sample _ Employee Table Sample Outputs WHERE

### Q27. WHERBORDERBYELNT

follow @jobtechmingle Purpose of WHERE Clause The WHERE clause iS used to filter rows based on specific conditions before results are returned How WHERE Works Applies conditions to table rows Comparison operators

### Q28. ADVANCED FILTERING (023-027)



### Q29. NF (Third Normal Form)

Students Sub ccts Studcnt Scbject any ZNF Na transitive dependency: GacentiT Sicud subjeet SSeentin SuejectID Durability Once committed, Koth changes Permanent. ToP 10 SQL COMMANDS QUICK SYNTAX REFERENCE Command Use Common Operators SELECT Retriev€ data from table Pro_Tig SELECT coll, col2 Equal to WHERE Filter Tor GROUP By rotn Practice   daily: FROM table name Not equal to Greater than HAVING Filter  grouped data Think SQL WHERE   condition Less than ORDER By Sort Write , GROUP BY coli Greater equal INSERT InTo Inscre data UPDATE Modify date Analyze HAVING aggregate_ condition Less LIKE Pattern   match DELETE Delete   specific rows ORDER BY coli ASC | DESC Value in list JOIN Combine data from tables LIMIT BETWEEN Between range UNION Combine Teus Mncnee duplicates) PAGE 10


---

## 4. SQL Joins (Types & Scenarios)

### Q1. Explain SQL Joins and their Types

Joins are used to combine rows from two or more tables based on a related column between them.

| Join Type | Description |
| :--- | :--- |
| **INNER JOIN** | Returns records that have matching values in both tables. |
| **LEFT (OUTER) JOIN** | Returns all records from the left table, and matching records from the right. Unmatched right rows get NULLs. |
| **RIGHT (OUTER) JOIN** | Returns all records from the right table, and matching records from the left. Unmatched left rows get NULLs. |
| **FULL (OUTER) JOIN** | Returns all records when there is a match in either left or right table. |
| **CROSS JOIN** | Returns the Cartesian product of the two tables (combines every row of left with every row of right). |
| **SELF JOIN** | A regular join in which a table is joined with itself. |

### Join Syntax Examples

Consider two tables: `employees` (has `dept_id`) and `departments` (has `dept_id`).

**INNER JOIN:**
```sql
SELECT e.first_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;
```

**LEFT JOIN (Includes employees without a department):**
```sql
SELECT e.first_name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id;
```

**SELF JOIN (Employee and their Manager in the same table):**
```sql
SELECT e.first_name AS employee_name, m.first_name AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id;
```

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> A-1 ~B

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SQL joins are used to combine data from two Or more tables based ona related column between them orders Joins are Needed Data is stored across mulltiple tables Relationships avoid duplication of information Joins help retrieve meaningful combined results How Tables are Related Mddoi Tables are usually connected using: Primary in one table Foreign key in another table Primary Key Foreign Key This relationship allows rows to be matched correctly: Main Types of SQL Joins

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> (028-036)| Tables Thinki: rclated Joins Joins  combine rows two more tables based related  column between  them_ them   together _

### Q2. Explain Self Joins with a practical example

A self join is a regular join where a table is joined with itself. It is useful for querying hierarchical data or comparing rows within the same table.

### Practical Question
Write a query to find all employees who earn more than their managers.

### Solution
```sql
SELECT e.first_name AS employee_name, 
       e.salary AS employee_salary, 
       m.first_name AS manager_name, 
       m.salary AS manager_salary
FROM employees e
INNER JOIN employees m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary;
```

---

### Q3. Why is SQL important for Data Analysts?

SQL is essential for Data Analysts because it provides structured query pathways to:
*   Extract targeted datasets from massive tables.
*   Filter, join, and analyze historical data.
*   Aggregate statistics and generate reports.

### Q4. Insert Multiple Rows

**Scenario**: Populate multiple rows into the `employees` table in a single execution.
```sql
INSERT INTO employees (id, name, salary, joining_date) 
VALUES 
(2, 'Rahul', 60000, '2023-05-20'),
(3, 'Amit', 55000, '2022-03-15');
```

---

## 10. Practical Queries (Part 2) & Constraints Scenario

This section lists query syntax for basic selections, updates, deletions, table modifications, and constraint-based creations.

### Q5. Relationship Scenario (Self Join)

*   **Question**: Retrieve employee names along with their manager names from the employees table.
*   **Query**:
    ```sql
    SELECT e.name AS employee, m.name AS manager
    FROM employees e
    LEFT JOIN employees m ON e.manager_id = m.id;
    ```
*   **Database Concepts Tested**: Hierarchical joins (Self `JOIN`), outer joins (`LEFT JOIN`).

### Q6. INNER JOIN  TableB

JOIN orders ON C.customer_id

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> JOIN customers ON

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SQL Result Returns only the SELECT A.col, B.col matching rows from FROM TableA A B rows that both tables. match in both

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> B tables_ ON A.id B.id;

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> most used join: Table A Table Rows

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Returns only   matching rows Output from both tables EmpID Name DeptName SELECT Emp.EmpID, Emp Name, Dept DeptName Aman Dept FROM HR

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> JOIN Department Dept Karan (Common rows) ON DepEID Dept. DeptID; Neha

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> JOIN table2 the condition ON tablel.id table2,id; between   the   tables_

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Returns   only rows in both tables. SELECT name , dept_name rows with FROM employees matches in both

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> JOIN departments ON e . dept_id d.id; tables_

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> General term used Table Table Returns only combine rows from name dept rows from both tables Ewo more tables Aman based related CSE SELECT column. Ravi ECE FROM name dept

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> JOIN Aman Common Column A.id B.id ; CSE

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> each table Not NULL. Data Multiple Matches both  tables Tables FOREIGN KEY Links one table

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> JOIN Returns rows from both tables

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Returns only  matching rows from both tables _

### Q7. LEFT JOIN is commonly used

mentorships ms ON m.emp id ms.mentor_id GROUP BY mentor id emp_name MENTEES ORDER BY total_ mentees  DESC ; Join query : Show mentor name mentee name Project mentorships (mentor_id, mentee SELECT mentor emp_name AS mentor name mentee emp_ name As mentee name ms FROM mentor employees emp JOIN raentorskips ms ON mentor .emp_id ms mentor_id (mentor ) (mentee JOIN  employees mentee ON mentee emp ms. mentee_ id table ORDER BY mentor emp name mentee emp name twice cccccccFce Practice_Tip Quick Checklist Try   changing WHERE,_ Understand the tables ORDER BY, GROUP BY Read the Query carefully see different results Test

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> TableB B rows from B. ON A.id B.id;

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> reporting: Only matching matching Only Only Matching

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Returns   all Tols from   the left table, and matching rows from   the right table. SELECT name , d.dept_name All employees, FROM employees even if no

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> CSE

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> manager_ Rohie NULL ON manager_id id ; SELECT name FROM Students_

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> another. Ensures referential integrity: All from left Clauses SQL Functions matched

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> COMPOSITE KEY Combination of two FULL OUTER JOIN more columns uniquely identify: All from both   tables_ ACID Normalization Ensure Safe CROSS JOIN Reliable Organize Data Cartesian Transactions Efficiently (row row) CLAUSES (Order of Execution) FUNCTIONS FROM Choose   table(s)

### Q8. RIGHT JOIN departments

SQL Result Returns all rows from SELECT A.col, B.col the right table and FROM   TableA A B All rows from matching rows from

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> TableB matching the left table. rows from ON A.id B.id;

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> FULL OUTER JOIN  TableB B Matched and table ON A.id B.id; unmatched. Legend Remember:

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SELECT FROM orders

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> JOIN customers ON orders. customer_id customers.id;

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> JOIN Returns all rows from table Output EmpID Name DeptName and rows from  left Dept SELECT EmpID, Name_ Dept.DeptName Karan FROM HR

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> JOIN Department Dept Neha Finance (All from right match  from left) ON Emp_ DeptID Dept. DeptID; NULL NULL Marketing FULL OUTER JOIN Returns all rows when there Output match either   left

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> table EmpID Name DeptName Aman Emp Dept SELECT EmpID, Name_ Dept. DeptName FROM Employee Karan FULL   OUTER JOIN Department Dept Neha Finance (ALL rows from both tables) ON DeptID Dept.DeptID;
> ```
>  Arjun NULL NULL NULL Marketing Note Page Marketing Arjun Emp Riya Employee Emp Emp. Finance matching Aman Emp: Emp_ Emp Riye Empl Emp Emp . Arjun

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> JOIN Returns   all rows from the right  table, and matching rows from the   left table_ SELECT name, d.dept_ name All departments, FROM_ employees even if no

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ON dept_id d.id; employees Note Rows without match  will have  NULL for the  columns from the non - side . Page 15 matching ~matching Only matching matching -matching

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> FULL JOIN Returns only Retums all rows Returns all rows Returns all rows rows that have from the left from the right when there iS a matching values table and table and matching match in either in both tables rows fror the right rows from the left table: Simple Join Example SELECT ordersorder_id, customers name FROM orders JOIN customers: ON orders customer_id customerscustomer_id This query combines order data with customer details Important Behavior Join condition decides how rows are matched Incorrect join logic can multiply rows Join performance depends on indexing Real-World Usage Order and customer reports Employee and departnent mapping Key insight Trarsaction history analysis Joins allow. SQL to ADt Viections tbot Why key matching orders

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Returns  all rows  from Returns rows from

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> CSE Matched from Right ON A.id B.id ; Ravi NULL ON A.id B.id ; NULL ECE from Left FULL OUTER JOIN CROSS JOIN A.id B.id Returns Tows when Returns the Cartesian there match Product of both tables_ either

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> rou table_ name dept with Tow of B) SELECT Aman FROM AlL CSE SELECT FULL  OUTER JOIN 8 Ravi NULL FROM Both ON A.id B.id;
> ```
>  NULL ECE CROSS JOIN Tables SELF JOIN UNION Joins table with SELECT name AS Combines result-set  of two itself. name more SELECT statements_ name Example : Employees table FROM Employees Removes duplicates) Aman name

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Control uniquely identify rows Calculations All from right_ Results GLANCE Operations matched

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> JOIN (or RIGHT OUTER JOIN) Returns all rows from

### Q9. JOINS (INNER; OUTER, SELF)



### Q10. INNER JOIN two tables

```sql
SELECT FROM orders JOIN customers ON orders customer_id customers.id;
```

### Q11. LEFT JOIN (keep all from left)

```sql
SELECT FROM customers LEFT JoIN orders ON customers.id orders. customer_id;
```

### Q12. FULL OUTER JOIN

```sql
SELECT FROM FULL OUTER JOIN ON a.id b.id;
```

### Q13. CROSS JOIN (cartesian product)

SELECT FROM sizes CROSS JOIN colors

### Q14. SELF JOIN (same table twice)

```sql
SELECT e1 name e2 .name FROM employees JOIN employees e2 ON e1 . manager_id e2.id;
```

### Q15. JOIN with multiple conditions

SELECT FROM orders JOIN items ON orders id items. order_id AND items status Delivered

### Q16. Anti-join (not in another table)

```sql
SELECT FROM users WHERE id NOT IN SELECT user id FROM logins) ;
```

### Q17. Join on date ranges

```sql
SELECT FROM users JOIN plans ON users. joined_date BETWEEN plans start_date AND plans. end_date @helloworld_avani By;
```

### Q18. SQL MASTER NOTES

```sql
Functions CONCAT() Joins two or more into one . Example Hello World SELECT CONCAT ( first name , last_name) AS full_name FROM  employees;
```
 
```sql
Hello World UPPER () and LOWER ( ) Converts text to upper case or lower case_ abc ABC Example SELECT UPPER(city) AS city_upper , LOWER(city) AS city_lower ABC abc FROM customers LENGTH ( ) Hello! Counts the 'number of characters in Example SELECT LENGTH (' SQL Master Notes AS char_count;
```
 Length

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SQL Joins Joins combine rows from   two or more tables based on related column between   them. Tables   We'll Use   (Example, emp ployees departments id name dept_id id dept_name Alice

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Join   Example: Employees & Mentorships We have two tables table   of employees and child table that stores mentorship   relationships between   employees.

### Q19. LEFT JOIN `departments

ON dept_id d.id; department

### Q20. SQLJoins-Ovenvew

follow @jobtechmingle

### Q21. SQL QUICK REVISION SHEET

Everything You Need to  Remember Keep Calm & KEYS Keys Joins JOINS On Combine PRIMARY KEY Uniquely identifies Ideatlay Data from

### Q22. Right   table

and matching rows from  left table FULL JOIN (or FULL OUTER JOIN) Returns all rows when there match in either left

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> CROSS JOIN Returns Cartesian of both tables


---

## 5. Aggregate Functions & Grouping

### Q1. What are Aggregate Functions and how does GROUP BY work?

Aggregate functions perform a calculation on a set of values and return a single value. When combined with `GROUP BY`, they summarize groups of rows.

### Common Aggregate Functions
*   `COUNT()`: Returns the number of rows or non-null values.
*   `SUM()`: Calculates the total sum of a numeric column.
*   `AVG()`: Calculates the average value of a numeric column.
*   `MIN()`: Finds the minimum value.
*   `MAX()`: Finds the maximum value.

### Example Query
```sql
SELECT dept_id, 
       COUNT(emp_id) AS total_employees, 
       AVG(salary) AS average_salary,
       MAX(salary) AS highest_salary
FROM employees
GROUP BY dept_id;
```

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> Aggregate   functions  perform   calculations On set of rows and return single  value. are used to summarize data: One result Common  aggregate   functions   include  COUNTO, from many SUMC), AVGC), MINC), and MAXO): rows are often used with numeric  columns. are frequently used with the GROUP BY clause to group data before aggregation: Aggregate  functions help in data  analysis and reporting: Syntax: SELECT AGG_FUNCTION (column_name = FROM table_name;
> ```
>  Example: 
> ```sql
> SELECT COUNT (*) FROM employees;
> ```
>  This  query  returns the number of employees. They They They

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Aggregate functions form calculations on multiple rows and return single summarized result: Why Aggregate Functions are Used Analyze large datasets easily Generate summary reports Support decision-making and analytics Reduce manual data processing

### Q2. What is the difference between WHERE and HAVING?

| Feature | WHERE Clause | HAVING Clause |
| :--- | :--- | :--- |
| **Application** | Applied to individual rows *before* they are grouped. | Applied to summarized groups *after* grouping is done. |
| **Aggregates** | Cannot contain aggregate functions (e.g., `WHERE SUM(sal) > 1000` is invalid). | Can contain aggregate functions (e.g., `HAVING SUM(sal) > 1000`). |
| **Execution Order** | Executes before `GROUP BY`. | Executes after `GROUP BY`. |

### Example Query Showing Both
```sql
SELECT dept_id, AVG(salary) AS avg_sal
FROM employees
WHERE job_title <> 'Intern' -- Filter individual rows first
GROUP BY dept_id
HAVING AVG(salary) > 60000;  -- Filter group result
```

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> VS HAVING Both_filterdata, but at different stages WHERE HAVING Filters rows before   grouping Filters groups after grouping: Used with   SELECT UPDATE, DELETE. Used with  GROUP BY. Cannot use aggregate   functions here Can use aggregate functions here SYNTAX SYNTAX SELECT columnl, column2 SELECT columnl, aggregate_function() FROM table name Filters FROM table name Filters WHERE condition;
> ```
>  Rows GROUP BY columnl Groups HAVING condition; EXAMPLE Filters EXAMPLE Filters SELECT name dept individual SELECT dept, COUNTC+) as total_ emp grouped data FROM Employees rows FROM Employees after WHERE

### Q3. Duplicate Data Scenario

*   **Question**: Find duplicate email addresses in a users table.
*   **Query**:
    ```sql
    SELECT email, COUNT(*)
    FROM users
    GROUP BY email
    HAVING COUNT(*) > 1;
    ```
*   **Database Concepts Tested**: `GROUP BY` aggregates, filtering groups with `HAVING`.

---

## 19. Query Scenarios - COALESCE, ALTER, and Aggregations

This section features queries for dynamic null replacements, schema changes, and aggregations.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Question: 
> ```sql
> Find duplicate emails in users table_ SELECT email, COUNT ( * ) FROM users GROUP BY email HAVING COUNT ( *) > 1;
> ```
>  Tests: GROUP BY HAVING Query Salary salary Missing salary provided. handling

### Q4. Business Insight Scenario

*   **Question**: Find the total salary expense for each department.
*   **Query**:
    ```sql
    SELECT department, SUM(salary)
    FROM employees
    GROUP BY department;
    ```
*   **Database Concepts Tested**: `SUM` aggregate function with `GROUP BY`.

### Q5. Would help?

```sql
Ans SELECT   employee_id, SUM(sales _ amount) AS total_sales FROM Sales GROUP BY employee_id;
```
 q You want to count how many  employees work in each  department: How would you do

### Q6. Use HAVING to filter groups

Ans: SELECT customer _ id, CouNT(*) AS order_count FROM orders GROUP BY customer_id HAVING  COUNT(*) >

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SELECT department , COUNT ( * FROM employees GROUP BY  department HAVING COUNT ( *

### Q7. Duplicates ?

Ans: 
```sql
SELECT email, COUNT(*) AS count FROM customer GROUP BY email HAVING COUNT (*) > 1;
```

### Q8. Inner query

In FROM clause to create derived Subquery runs first table (inline   view) _ Result Examples Single-Value_Subquery_ SELECT em_name FROM employees WHERE (SELECT AVG (salary) FROM   employees) Remember : Multi Row (In) The   subquery SELECT FROM employees (inner query WHERE id IN (SELECT mentor_id FROM   mentorships) runs first _ Its result is then FROM - Subquery_ (Derived   Table used by the SELECT dept_name , avg_ outer query_ FROM (SELECT dept_name , AVG (salary) AS avg FROM employees GRouP BY dept_name) AS dept_avg

### Q9. SQL MASTER NOTES

SQL Clauses at a Glance SQL Main SQL Clauses Execution   Order SELECT FROM Specifies   the columns to return. WHERE FROM Specifies the  table(s) to retrieve data from. GROUP BY WHERE HAVING Filters rows based on conditions GROUP BY SELECT rows  that have the Same values in columns ORDER BY TIP HAVING WHEREfilters rows Filters  groups based on aggregate   conditions LIMIT before   grouping: ORDER BY HAVING filters groups Sorts the  result set in (Asc) or descending (DESC) order. after   grouping LIMIT Limits the number of rows returned. Example SELECT department_id, COUNT (*) AS employee_count count FROM employees WHERE status Active GROUP BY department_id HAVING COUNT(*)

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Aggregate Functions

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> GROUP BY and HAVING GROUP BY groups rows that have the Same value MySql in one or more columns_ HAVING filters   the results (after aggregation) . WHERE filters rows before  grouping and aggregation .

### Q10. Count rows grouped by column

```sql
SELECT department , COUNT ( FROM  employees GROUP BY   department;
```

### Q11. Aggregate multiple columns

```sql
SELECT department , COUNT ( *) , AVG ( salary) FROM employees GROUP BY department;
```

### Q12. Group by multiple columns

SELECT department role, COUNT ( *) FROM employees GROUP BY department, role

### Q13. Filter with aggregate inside WHERE

```sql
SELECT FROM employees WHERE salary (SELECT AVG( salary) FROM employees) ;
```

### Q14. Group by date

SELECT DATE (created_at) , CoUNT ( *) FROM users GROUP BY DATE (created_at)

### Q15. Count rows in each table

SELECT table_name COUNT ( * FROM table_name GROUP BY table_name

### Q16. ROUND(AVG( Salary) , 2)

Output

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> Counts number rows Returns total sum Returns average value Total SELECT COUNT Students SELECT   SUM(salary) SELECT  AVG(salary) FROM   students;
> ```
>  FROM employees FROM   employees;

### Q17. Ghuh7106

(returns   single value ) WHERE SELECT MAX(E FROM Employee) Multiple Row Subquery

### Q18. SQLIntervewQuidkRevisionSheet

follow @jobtechmingle SQL Core Fundamentals SQL works with relational databases Data is stored in tables (rows & columns) UPDATE AMEUYAY Queries felch data without modifjing structure UPDATE SQL Query Thinking Order Accounts When solving any SQL problem: Identify required table(s) Apply conditions logically Select needed columns Format final output This approach avoids most logical errors: Must-Know SQL Topics SELECT & execution order SELECT & execution order WHERE ORDER BY, LIMIT WHERE ORDER BY LIMIT Aggregate functions GROUP BY & HAVING GROUP BY & HAVING Joins & subqueries Indexes & performance Transactions & ACID Common Interview Mistakes Confusing WHERE and HAVING Explain logic before syntax Ignoring execution order Use simple real-world examples Forgetting GROUP BY rules Mention performance impact Overusing subqueries Clarify assumptions clearly | Yoxplar Aogic eeforesyQtuestions Use simple real-world examples Mention performance impact Clarifyy assumptions clearly Final Preparation Tip- Practice writing queries daily and focus Strong SQL on understanding 'why" SQL behaves fundamentals matter the way it does more thon memorizing ntax-

### Q19. GROUPBYEHAVING

follow @jobtechmingle dl Purpose of GROUP BY GROUP BY is used to divide rows into groups based on One Or more columns so that aggregatz functions can be applied to each group: Sales How GROUP BY Works HR Rows with same values are grouped together Aggregates are calculated per group Output contains One row per group Sales GROUP BY Example IT


---

## 6. Subqueries & Common Table Expressions (CTEs)

### Q1. What are Subqueries and Common Table Expressions (CTEs)?

### Subqueries
A subquery is a query nested inside another query (such as `SELECT`, `INSERT`, `UPDATE`, or `DELETE`). It can return a single value (scalar), a single column (multiple rows), or a table (multiple columns and rows).

**Correlated Subquery Example:**
A correlated subquery references columns from the outer query, executing once for each row processed by the outer query.
```sql
-- Find employees who earn more than the average salary of their department
SELECT e.first_name, e.salary, e.dept_id
FROM employees e
WHERE e.salary > (
    SELECT AVG(salary)
    FROM employees
    WHERE dept_id = e.dept_id
);
```

### Common Table Expressions (CTEs)
A CTE is a temporary, named result set that you can reference within a `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement. It improves query readability over nested subqueries.

**CTE Example:**
```sql
WITH DeptAvgSalary AS (
    SELECT dept_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY dept_id
)
SELECT e.first_name, e.salary, d.avg_salary
FROM employees e
JOIN DeptAvgSalary d ON e.dept_id = d.dept_id
WHERE e.salary > d.avg_salary;
```

---

### Q2. What is the difference between a Correlated and Non-correlated Subquery?

| Feature | Non-Correlated Subquery | Correlated Subquery |
| :--- | :--- | :--- |
| **Dependency** | Independent of the outer query. | Dependent on the outer query (references outer columns). |
| **Execution** | Executes once, and its result is used by the outer query. | Executes repeatedly, once for every row processed by the outer query. |
| **Performance**| Generally faster because it runs once. | Can be slow on large tables due to row-by-row execution. |

### Non-Correlated Example
```sql
SELECT * FROM employees
WHERE dept_id = (SELECT dept_id FROM departments WHERE location = 'Dallas');
```

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Subquery subquery is query inside another query : (Inner Query_ query The

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SELECT FROM orders WHERE amount (SELECT AVG amount) FROM orders WHERE user_id

### Q3. What is the use of the EXISTS operator and how does it differ from IN?

The `EXISTS` operator checks for the existence of any record in a subquery. It returns a boolean (`TRUE` or `FALSE`).

*   **Short-Circuit Evaluation**: `EXISTS` stops searching as soon as it finds a single match, making it highly efficient.
*   **Comparison with IN**:
    *   Use `IN` when you have a small static list of values or a non-correlated subquery.
    *   Use `EXISTS` when checking conditions against a correlated subquery on large tables.
    *   `NOT IN` returns no rows if the subquery contains a single `NULL` value. `NOT EXISTS` handles `NULL` values correctly.

```sql
-- Using EXISTS to find departments with employees
SELECT department_name
FROM departments d
WHERE EXISTS (
    SELECT 1 
    FROM employees e 
    WHERE e.dept_id = d.dept_id
);
```

---

### Q4. Explain Recursive CTEs with an example

A recursive Common Table Expression is a CTE that references itself. It is commonly used to traverse hierarchical structures like org charts, directories, or bill-of-materials.

### Example: Generating an Employee Hierarchy
Suppose employees have an `emp_id` and a `manager_id`. We want to show the hierarchy path:

```sql
WITH OrgChart AS (
    -- Anchor member: start with the top manager
    SELECT emp_id, first_name, manager_id, 1 AS lvl
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive member: join the CTE with the table to find direct reports
    SELECT e.emp_id, e.first_name, e.manager_id, o.lvl + 1
    FROM employees e
    INNER JOIN OrgChart o ON e.manager_id = o.emp_id
)
SELECT lvl, first_name, manager_id
FROM OrgChart
ORDER BY lvl;
```

---

### Q5. Semi-join (exists in another)

```sql
SELECT FROM users WHERE EXISTS (SELECT FROM logins WHERE logins.user_id users.id) ;
```

### Q6. What is a Subquery?

SELECT name SELECT   COUNT (*) FROM orders WHERE user_id users.id) AS order_count FROM users

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SELECT FROM users WHERE id IN (SELECT user_id FROM orders)

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> subquery is a query written inside another SQL query used to provide intermedate results to main query Subqueries are Used Break complex problems into smaller steps Use results of one query inside another Improve logical clarity of queries Where Subqueries Can Appear subquery can be used:

### Q7. Subquery in WHERE

```sql
SELECT FROM employees WHERE department id (SELECT id FROM departments WHERE name Sales' ) ;
```

### Q8. EXISTS and NOT EXISTS

```sql
SELECT FROM users WHERE EXISTS   ( SELECT FROM logins WHERE logins.user_id users id) ;
```

### Q9. Subquery in FROM (derived table)

```sql
SELECT FROM  (SELECT COUNT( * FROM orders) AS order_count;
```
 @helloworld_avani By-

### Q10. DROP TABLE

```sql
DROP TABLE IF EXISTS  temp_data;
```

### Q11. DELETE with subquery

```sql
DELETE FROM users WHERE id In (SELECT user_id FROM banned_users) ;
```
 @helloworld_avani By;

### Q12. Basic CTE

WITH recent_orders AS  (SELECT FROM orders WHERE order_date >=

### Q13. Multiple CTEs

```sql
WITH step1 AS ( step2 AS ( SELECT FROM step2 ;
```

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> Row (returns multiple values ) SELECT Name Dept Correlated FROM  Employee Returns employees who depends outer WHERE IN (SELECT  Dept query department It FROM Department WHERE DeptName IT') ;
> ```

### Q14. Recursive CTE (e.g: org chart)

WITH RECURSIVE emp_tree AS (..) SELECT FROM emp_tree

### Q15. Generate series using recursive CTE

WiTH RECURSIVE nums AS SELECT AS UNION ALL SELECT FROM nums WHERE

### Q16. Chain CTE with window function

WITH ranked_orders AS (..) SELECT FROM ranked_orders WHERE rn

### Q17. CTE as subquery for UPDATE

(Use with care per RDBMS)

### Q18. Build calendar table with CTE

```sql
WiTH RECURSIVE dates AS (. ) SELECT * FROM dates;
```
 @helloworld_avani By;

### Q19. Single

Row srofcte Employee Name Returns

### Q20. SQL MASTER NOTES

Insert Update & Delete   Data MySQL INSERT INTO Used to insert new   records into table You can insert values into selected columns. INSERT Into employees (em_name, contact_number , years_ in_company) VALUES ('James Lee' M'

### Q21. Inside FROM

Each placement serves a different purpose: Simple Subquery Example SELECT name FROM employees WHERE salary

### Q22. SUBQUERIES & DATABASE OBJECTS (37-04)

CORRELATED SUBQUERY


---

## 7. Data Types & NULL Value Handling

### Q1. What are NVL, NVL2, and COALESCE functions in Oracle?

These functions are used to handle `NULL` values.

*   `NVL(expr1, expr2)`: If `expr1` is null, returns `expr2`. Both arguments must be of compatible data types.
*   `NVL2(expr1, expr2, expr3)`: Evaluates `expr1`. If `expr1` is NOT null, returns `expr2`. If `expr1` is null, returns `expr3`.
*   `COALESCE(expr1, expr2, ..., exprN)`: Standard SQL function. It returns the first non-null expression in the argument list.

### Examples
```sql
-- Returns 0 if commission_pct is null
SELECT NVL(commission_pct, 0) FROM employees;

-- Returns 'Has Commission' if not null, otherwise returns 'No Commission'
SELECT NVL2(commission_pct, 'Has Commission', 'No Commission') FROM employees;

-- Returns the first non-null among telephone, mobile, or email
SELECT COALESCE(telephone, mobile, email, 'No contact details') FROM contacts;
```

---

### Q2. What is the difference between VARCHAR and VARCHAR2 in Oracle?

| Feature | VARCHAR | VARCHAR2 |
| :--- | :--- | :--- |
| **Origin** | Standard SQL standard data type. | Oracle-specific data type. |
| **Null Treatment** | Historically reserved for future SQL standard compliance (currently acts the same as VARCHAR2). | Stores variable-length character string data up to 4000 bytes (in SQL) or 32767 bytes (in PL/SQL). |
| **Recommendation** | Do not use. Oracle does not guarantee its behavior will remain unchanged in future releases. | **Always use VARCHAR2** in Oracle databases for variable-length character storage. |

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Answer CHAR(n) Fixed   length. Uses exact characters VARCHAR(n): Variable   length. Uses   only space Example CHAR(10)

### Q3. What is the difference between a NULL value, zero, and a blank space?

*   **NULL Value**: Represents missing, unknown, or inapplicable data. It is not equivalent to zero or a blank space, and cannot be evaluated with standard comparison operators (use `IS NULL` or `IS NOT NULL`).
*   **Zero (`0`)**: A numeric value representing a specific quantity. It can be used in arithmetic operations.
*   **Blank Space (`' '`)**: A character value of length greater than zero (except in Oracle database, where empty strings `''` are treated as `NULL`).

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Answer NULL represents  missing, unknown inapplicable data in table_ Pro_Tip: NULL is not to zero or empty Use IS NULL to check for NULL values .

### Q4. What is the difference between COALESCE and ISNULL / IFNULL?

*   `COALESCE`: A standard SQL ANSI function that accepts multiple arguments and returns the first non-null value in the list.
*   `ISNULL` (SQL Server) / `IFNULL` (MySQL): Database-specific functions that accept exactly two arguments and return the second argument if the first is null.

| Feature | COALESCE | ISNULL / IFNULL |
| :--- | :--- | :--- |
| **Standard** | Standard SQL (Cross-platform). | Database-specific. |
| **Arguments** | Takes multiple arguments (2 or more). | Takes exactly two arguments. |
| **Evaluation**| Evaluates arguments lazily (stops at the first non-null). | Evaluates both arguments. |

---

### Q5. What is a row and a column?

*   **Row (Record/Tuple)**: A single, horizontal entry containing data for a specific entity.
*   **Column (Field/Attribute)**: A vertical entity containing all information associated with a specific field.

---

## 2. Theoretical Questions - Basics (Part 2)

This section discusses SQL constraints, basic data types, and differences between table-level delete operations.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Constraints NOT NULL value required UNIQUE all values different DEFAULT uses value if no Value is given PRIMARY KEY uniquely  identifies each row

### Q6. What are SQL Data Types?

Data types define the type of values a database column can hold. Common examples include:
*   `INT`: Stores integer values (whole numbers).
*   `VARCHAR`: Stores variable-length alphanumeric text values.
*   `DATE`: Stores calendar date values.
*   `FLOAT`: Stores approximate numeric values (decimals).

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Define the type of data a Column can hold . Examples: INT ~ numbers VARCHAR

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Understanding

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SQL data types define the kind of values that can be stored in a table column and determine how the database stores processes, and validates that data_ Why Data Types Matter Ensure correct type of data is stored Reduce storage and memory usage Improve query performance: Prevent logical and calculation errors Main Categories of SQLData Types Numeric Data Types Used for storing numbers that are used in calculations and comporisons Character / String Data Types Used for storing text-based inform tion such as names and descrip Date & Time Data Types Used for Storing date-related and time-

### Q7. What is the difference between INT and FLOAT?

*   `INT`: Stores precise integer values (whole numbers, no decimals).
*   `FLOAT`: Stores approximate floating-point values (supports real decimal numbers).

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> INT v whole numbers FLOAT

### Q8. What is the difference between CHAR and VARCHAR?

`VARCHAR` is a variable-length character string data type. It dynamically adjusts disk usage to fit the exact length of the string inserted up to a specified limit.

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> | Feature | CHAR | VARCHAR |
> | :--- | :--- | :--- |
> | **Sizing** | Fixed-length character string. Paddings spaces to match limit. | Variable-length character string. Stores exact length. |
> | **Performance**| Faster processing (fixed offset checks). | More space-efficient and flexible. |

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> *   `VARCHAR`: Stores variable-length strings; allocation dynamically resizes based on input.
> *   `CHAR`: Stores fixed-length strings; input shorter than the defined length is padded with spaces.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> VARCHAR variable length CHAR fixed length Theoretical Scenario-Based SQL Questions

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Variable-length data type:

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> CHAR VARCHAR Fixed size Variable size Faster Flexible

### Q9. What is the DATE data type?

`DATE` is a data type used to store calendar dates in a standard format, typically `YYYY-MM-DD`.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Stores date values (Y Y-MM-DD)

### Q10. What is NULL vs 0?

*   `NULL`: Indicates the absence of a value (field was left empty).
*   `0`: A specific, non-null numeric value representing a quantity.

### Q11. Add a New Column

**Scenario**: Modify the table structure to add a department field.
```sql
ALTER TABLE employees
ADD department VARCHAR(30);
```

### Q12. Modify Column Type

**Scenario**: Change the salary data type to `DOUBLE`.
```sql
ALTER TABLE employees
MODIFY COLUMN salary DOUBLE;
```

### Q13. Missing Data Problem

*   **Scenario**: Certain column fields are missing values when new records are populated.
*   **Question**: How do you handle this at the database level?
*   **Answer**:
    *   Set column default parameters using the `DEFAULT` constraint.
    *   Enforce entries using the `NOT NULL` constraint.
    *   Use data cleansing queries utilizing null-handling functions like `COALESCE` or `NVL`.

---

## 13. Scenario-Based Questions - Integrity, Indexes, and Composite Keys

This section explains relational constraints, optimizing slow queries, and validating unique combinations across multiple columns.

### Q14. Multiple Column Uniqueness

*   **Scenario**: A combination of two columns (e.g., area code + phone number) must be unique, though individual fields can repeat.
*   **Question**: How do you enforce this?
*   **Answer**: Establish a `COMPOSITE PRIMARY KEY` or a composite `UNIQUE` constraint on both columns:
    ```sql
    CONSTRAINT uq_phone UNIQUE (area_code, phone_number)
    ```

---

## 14. Scenario-Based Questions - Consistency, Savepoints, and Data Types

This section addresses concurrent database updates, rollbacks, and choosing data types for specific scenarios.

### Q15. Storing Phone Numbers

*   **Scenario**: You need to store customer phone numbers in a new column.
*   **Question**: What data type will you choose and why?
*   **Answer**: Use `VARCHAR` (not `INT`) because:
    *   Phone numbers can contain leading zeros (which numerical datatypes strip).
    *   They can contain special characters like `+` or `-`.
    *   They are not used in mathematical calculations.

---

## 15. Scenario-Based Questions - Char Length, Drop, and Default Constraints

This section covers storing fixed-length codes, deleting schemas, and setting default values.

### Q16. Fixed vs Variable Data

*   **Scenario**: You are storing standard country codes like "IN", "US", or "CA" (always exactly 2 letters).
*   **Question**: What data type is best?
*   **Answer**: Use `CHAR(2)` instead of `VARCHAR` because it processes faster for fixed-length strings and saves storage overhead.

### Q17. Data Cleaning Scenario

*   **Question**: Replace `NULL` salary values with 0 in the query results.
*   **Query**:
    ```sql
    SELECT name, COALESCE(salary, 0) AS salary
    FROM employees;
    ```
*   **Database Concepts Tested**: Using `COALESCE` to handle null fallback values.

### Q18. City VARCHAR (30) DEFAULT

Delhi )

### Q19. Answer:

Use CHAR(2) (fixed length)

### Q20. SQL MASTER NOTES

```sql
ALTER TABLE, DELETE, TRUNCATE & DROP ALTER TABLE The ALTER TABLE statement is used to  add, or rename columns in an table _ ADD  COLUMN Adds new column to the table_ MODIFY COLUMN the data type or definition of column _ DROP COLUMN Removes column from the table_ RENAME COLUMN or TABLE: Renames column the   entire table. DELETE VS TRUNCATE VS DROP Feature DELETE TRUNCATE DROP What does Removes rows from table . Removes   all rows Removes the table from table . itself. WHERE clause Yes No No Rollback Yes   (DML) No  (DDL) No (DDL) Identity Auto Increment Not reset Reset N/A (table removed) Triggers Fires  triggers Does not fire N/A Speed Slower fast fast Data can be  recovered Data cannot be Structure & data (ifnot committed) recovered cannot be recovered Examples ALTER TABLE employees ALTER TABLE   employees ADD email VARCHAR(100) ;
```
 MODIFY DECIMAL (10,2) ; DELETE FROM employees TRUNCATE TABLE employees WHERE id

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Data Types Quick Revision MySqL Data   types   define the kind   of data column can  store the  right data type improves  performance and Saves storage. Text Types Numeric_Types Date & Time Types CHAR(n) INT DATE Stores   fixed-length Stores   whole numbers Stores  date in up to characters _ (integers)_ YYYY-MM-DD format . ABC Example CHAR(1o) Example INT Example DATE

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> Constraints & Quick Revision NOT NULL Ensures Column cannot have NULL values Parent Child   Relationship row must have value  for this Column. PARENT TABLE CHILD TABLE UNIQUE employees mentorships Ensures all values column are different employee_id (PK) FK >PK mentorship_id (PK) Allows one NULL value (DBMS dependent) name employee_id (FK) DEFAULT department mentor_id Sets default value for column . Used when no value is insert_ PRIMARY KEY PRIMARY KEY VS FOREIGN KEY Uniquely identifies each row table _ Cannot be NULL. Identifies rows uniquely Refers to the  primary one Primary per  table_ in its Own table . key of another table. FOREIGN KEY Must be UNIQUE and Can have duplicate NOT NULL. values_ Links Column (or columns) to the primary key of anotner table . one per  table_ Multiple   allowed Maintains   referential integrity: per   table. AuTO_INCREMENT Automatically unique number for numeric Column. Commonly used with  Primary key- COMPOSITE KEY Syntax FOREIGN KEY Reference Primary key made up  of two more Columns CREATE TABLE mentorships Used When single column can uniquely mentorship_id INT AuTO_INCREMENT, identify row_ employee_id INT NOT NULL, Syntax PRIMARY KEY & AutO_INCREMENT mentor_id INT NoT NULL, year INT NOT NULL, CREATE TABLE PRIMARY KEY  (mentorship_id) , employee_id INT `AutO_INCREMENT, FOREIGN KEY (employee_id) name 'VARCHAR(100) NOT NULL, REFERENCES   employees   (employee_id) email VARCHAR(1OO) UNIQUE, ON DELETE CASCADE department VARCHAR(50) DEFAULT General ON UPDATE CASCADE hire date   DATE   DEFAULT (CURRENT_DATE) , PRIMARY KEY (employee_id) ) ;
> ```
>  ); Remember Constraints your  data accurate and   reliable

### Q21. UNION ALL?

Combines the result of two or more   SELECT statements and keeps all rows inc duplicates_ Rules   (Important!) current_employees old_employees name dept name dept Each SELECT must have the same number of columns Alice HR Carol Sales Columns must be in the same order. Bob It David It Carol Sales Eve HR Corresponding  columns must have data types Result UNION (removes duplicates) id name dept Alice HR Carol appears SELECT id , name dept FROM current_ ~employees Bob It only once UNION Carol Sales (duplicate SELECT id, name , dept FROM old_employees David It removed)


---

## 8. Database Keys

### Q1. What is the difference between a Primary Key and a Unique Key?

| Feature | Primary Key | Unique Key |
| :--- | :--- | :--- |
| **Purpose** | Uniquely identifies a record in a table. | Ensures values in a column/group of columns are unique. |
| **Null Values** | Does not allow NULL values. | Allows NULL values (in Oracle, you can have multiple NULLs; in SQL Server, only one). |
| **Count** | Only one Primary Key allowed per table. | Multiple Unique Keys allowed per table. |
| **Index Type** | Automatically creates a Clustered Index (or Unique Index in Oracle). | Automatically creates a Non-Clustered Index. |

---

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> A primary key is a column (or combination of columns) that uniquely identifies each record in a table. It cannot contain `NULL` values and must be unique.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> A column that uniquely identifies each record_

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Answer: Yes, but not recommended_

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> testingvala info@testingvala com Deep string key key : Part

### Q2. What is a composite key?

A composite key is a combination of two or more columns that work together to serve as the primary key of a table to uniquely identify records.

### Q3. Can NULL be part of a PRIMARY KEY?

No. Every column participating in a primary key constraint is implicitly marked as `NOT NULL`.

---

## 6. Database Keys and Redundancy

This section covers candidate, alternate, surrogate, and natural keys, along with data redundancy and denormalization.

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> Yes. Depending on the DBMS, a unique constraint allows one or more `NULL` values because `NULL` is not evaluated as equal to another `NULL`.

### Q4. What is a candidate key?

A candidate key is any column or group of columns that qualifies to uniquely identify each row in a table. A table can have multiple candidate keys.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> AlI possible that can uniquely identify rows

### Q5. What is an alternate key?

An alternate key is any candidate key that was not chosen as the primary key of the table.

### Q6. What is a surrogate key?

A surrogate key is a database-generated, artificial unique identifier (like an auto-incrementing integer ID) that has no real-world business meaning.

### Q7. What is a natural key?

A natural key is a unique identifier made of real-world data columns (such as email, SSN, or phone number) that already exist as business data.

### Q8. What happens if you insert a duplicate PRIMARY KEY?

The transaction statement will fail and the database will throw an error (violating uniqueness constraints).

---

## 8. Table Constraints, SQL vs MySQL, and ALTER

This section focuses on primary key behaviors, differences between SQL language and MySQL database engine, case sensitivity, and structural edits.

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> The query engine halts execution and rolls back the statement, throwing a primary key violation error.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> a 'testingvala point

### Q9. Can a table exist without a primary key?

Yes. RDBMSs allow tables to be created without primary keys, though it is not recommended for performance and identification purposes.

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> Yes. An RDBMS does not strictly enforce the presence of a primary key to build tables, but omitting it makes row-level updates slow and prevents clean relationships.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Yes, but not recommended

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Primary table is collection of data Primary key  uniquely identifies organized in rows and Columns each record in table students Example students name aqe id name age dept Aman

### Q10. Can a table have multiple primary keys?

No, a table can only have one primary key constraint. However, it can consist of multiple columns to form a single **composite primary key**.

### Q11. Duplicate Data Issue

*   **Scenario**: A table allows duplicate entries, causing data inconsistencies.
*   **Question**: How will you prevent duplicates in the future?
*   **Answer**: Implement a `UNIQUE` constraint or a `PRIMARY KEY` on the identifying columns.

### Q12. Table Design Scenario

*   **Scenario**: You are designing a student table for a university.
*   **Question**: How will you ensure each student is uniquely identified?
*   **Answer**: Assign a unique `student_id` and designate it as the `PRIMARY KEY`.

### Q13. Would you  apply ?

Ans: 
```sql
ALTER TABLE employees ADD CONSTRAINT pk_employee_id PRIMARY KEY (employee_id) ;
```
 L5. You need to ensure values cannot be NULL. Which constraint would you

### Q14. Question: How will you prevent duplicates in future?

Answer: Apply UNIQUE constraint or PRIMARY KEY.

### Q15. Student is uniquely identified?

Answer: Use a PRIMARY KEY.

### Q16. Multiple Column Uniqueness

Scenario: A combination of two columns must be unique_ Use COMPOSITE PRIMARY KEY or UNIQUE (coll, col2)

### Q17. Question: Should it be primary key?

Answer: No use surrogate (ID)

### Q18. Foreign_Key?

CustomerID ID Answer: References primary key of another table.

### Q19. CREATE TABLE

```sql
CREATE TABLE students (id INT PRIMARY KEY name TEXT , age INT) ;
```

### Q20. SQL MASTER NOTES

& Relationships Example A Primary key  uniquely identifes We have two tables employees and mentorships . each row in table _ empl (Parent  Table , Composite id em_name A composite primary key uses Alice id is the two or more columns together

### Q21. Right_

CANDIDATE KeY Any key that Fillter , Sort AT Perform


---

## 9. Data Integrity, Constraints & Normalization

### Q1. Explain Database Normalization and its Forms

Normalization is the process of organizing data in a database to reduce data redundancy and improve data integrity (prevent insertion, update, and deletion anomalies).

*   **First Normal Form (1NF)**:
    *   Each table cell must contain a single (atomic) value.
    *   Each record must be unique (presence of a Primary Key).
*   **Second Normal Form (2NF)**:
    *   Must be in 1NF.
    *   No partial dependencies (non-key attributes must depend on the *entire* primary key, not a part of a composite primary key).
*   **Third Normal Form (3NF)**:
    *   Must be in 2NF.
    *   No transitive dependencies (non-key columns must not depend on other non-key columns). "Every non-key attribute must depend on the key, the whole key, and nothing but the key."
*   **Boyce-Codd Normal Form (BCNF)**:
    *   A stronger version of 3NF.
    *   For every non-trivial functional dependency `X -> Y`, `X` must be a super key.

---

### Q2. What are the common types of constraints?

Constraints are rules enforced on data columns in a table. They are used to limit the type of data that can go into a table, ensuring the accuracy and reliability of the data.

*   `NOT NULL`: Ensures that a column cannot have a NULL value.
*   `UNIQUE`: Ensures that all values in a column are distinct.
*   `PRIMARY KEY`: A combination of `NOT NULL` and `UNIQUE`. Uniquely identifies each row in a table.
*   `FOREIGN KEY`: Uniquely identifies a row in another table (enforces referential integrity).
*   `CHECK`: Ensures that all values in a column satisfy a specific condition.
*   `DEFAULT`: Provides a default value for a column when none is specified.

---

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> *   `NOT NULL`: Prevents columns from accepting null entries.
> *   `UNIQUE`: Ensures all column entries are unique.
> *   `PRIMARY KEY`: Enforces both unique values and non-null values.
> *   `FOREIGN KEY`: Enforces relationships between tables.
> *   `CHECK`: Validates that entries satisfy specific logical conditions.
> *   `DEFAULT`: Injects default values when input is omitted.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> NULL UNIQUE PRIMARY KEY FOREIGN KEY CHECK DEFAULT

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SQL constraints are rules applied to table columns that restrict the type of data allowed, ensuring accuracy; consistency, 
> ```sql
> and reliability of stored information: SQL Constraints are Important Prevent invalid or inconsistem data Enforce business rules at databse level Maintain data integrity automatically Reduce dependency on application-side validation Types of SQL Constraints NOT NULL Ensures that a column always contains value and does not accept NuLL entries UNIQUE Ensures all values in a column are different and prevents duplicate records PRIMARY KEY Uniquely identifieseach row in a table and combines uniqueness with non-null enforcement FOREIGN KEY Maintains relationships between tables by referencinga primary key from another table CHECK Validates data based specified condition before insertion Or DEFAULT Automatically assigns a predefined value;
> ```
>  when emp_id email salary no value is provided emp_id email $100 Practical Example salary $100 In an employee management table: emp_id uniquely identifies each employee email, avoids duplicate entries salary accepts only valid positive values Insight dept_id links employees to deportments Constraints act as the databases buittin safery rules proteding data quaity wthout extra cocle Why entry on update Key

### Q3. What is referential integrity, and how do ON DELETE CASCADE and ON DELETE SET NULL work?

Referential integrity is a database concept which ensures that relationships between tables remain consistent. When a foreign key references a primary key, referential integrity rules prevent users from deleting or changing data if it breaks the link.

When defining a Foreign Key constraint, we can control delete behavior:
*   `ON DELETE CASCADE`: If a row in the parent table is deleted, all matching rows in the child table are automatically deleted.
*   `ON DELETE SET NULL`: If a row in the parent table is deleted, the foreign key column in the child table is set to `NULL`.

### Example
```sql
CREATE TABLE orders (
    order_id NUMBER PRIMARY KEY,
    customer_id NUMBER,
    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE CASCADE
);
```

---

### Q4. What is the DEFAULT constraint?

The `DEFAULT` constraint is used to set a pre-defined fallback value for a column if no value is explicitly provided in the insert statement.

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> Constraints are rules applied on table columns to restrict the data inserted, maintaining database accuracy, consistency, and integrity.
>
> ---
>
> ## 3. Theoretical Questions - Constraints & Normalization (Part 3)
>
> This section details constraint definitions, database normalization levels, and details of the `TRUNCATE` operation.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Rules on columns to maintain data accuracy and integrity testingvala info@testingvala = com missing applied

### Q5. Types of normalization?

Normalization is a structural database design technique used to organize tables and columns to reduce data redundancy and improve data integrity.

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> *   **Scenario**: A table stores redundant customer details (e.g. customer name, customer address) on every invoice line record.
> *   **Question**: What design process solves this?
> *   **Answer**: Apply normalization by splitting the table into a customer table and an invoice table to eliminate redundancy.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Process of organizing data to reduce redundancy:

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> INF Atomic values

### Q6. What are the common levels of normalization?

*   **1NF (First Normal Form)**: Requires atomic values (no multiple values in a single cell) and unique row identifications.
*   **2NF (Second Normal Form)**: Must be in 1NF and remove partial dependencies (non-key columns must depend on the entire primary key).
*   **3NF (Third Normal Form)**: Must be in 2NF and remove transitive dependencies (non-key columns must not depend on other non-key columns).

### Q7. What is the difference between DROP and TRUNCATE?

*   `DROP`: Deletes the table structure, constraints, permissions, and all data.
*   `TRUNCATE`: Only deletes the rows in the table; the table structure, column indices, and constraints remain intact.

### Q8. What is denormalization?

Denormalization is the database optimization process of selectively introducing redundancy by combining tables. This minimizes complex joins to speed up heavy analytical read queries.

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> *   **Scenario**: A reporting dashboard query runs a 5-table join, causing slow load times.
> *   **Question**: How can you optimize this schema?
> *   **Answer**: Apply selective denormalization (combining tables or creating pre-aggregated views) to optimize for speed.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Scenario: You need faster reporting Answer: Use Denormalization (combine tables_

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Combining tables to improve performance.

### Q9. What is redundancy?

Redundancy is the duplicate storage of the same data across multiple fields or tables in a database, which can lead to inconsistencies and anomalies if not normalized.

---

## 7. Data Integrity and Transaction Controls

This section covers data integrity definitions, transactions, ACID properties, commits, rollbacks, and savepoints.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Duplicate data in a database. testingvala info@ testingvalacom keys part keys key keys keys key key (e9 ' key

### Q10. What is data integrity?

Data integrity refers to the overall accuracy, consistency, and validity of data stored in a database.

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> *   **Scenario**: You want to guarantee that every employee added to the database belongs to a valid department.
> *   **Question**: What constraint will you use?
> *   **Answer**: Implement a `FOREIGN KEY` constraint linking the employee's department ID to the master departments table.

### Q11. Can we have multiple UNIQUE constraints on a single table?

Yes. A table can only have one primary key constraint, but it can have multiple independent unique constraints.

### Q12. What is the behavior of the default value?

If a row is inserted without specifying a value for a column containing a `DEFAULT` constraint, the database engine automatically inserts the defined default value.

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> *   **Scenario**: You are setting up a table and want the city field to default to "Delhi" if omitted.
> *   **Question**: How do you define this at the database level?
> *   **Answer**: Use the `DEFAULT` constraint:
>     ```sql
>     city VARCHAR(50) DEFAULT 'Delhi'
>     ```
>
> ---
>
> ## 16. Scenario-Based Questions - Normalization and Surrogate Keys
>
> This section discusses normalizations, performance tuning with denormalization, and surrogate key selection.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Scenario: If no city is provided, default should be Delhi Answer: Use DEFAULT Delhi Advanced_Theoretical_Scenarios

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> If no value is provided, default is inserted

### Q13. Create a Table with Constraints

**Scenario**: Create a students table ensuring names are not null and ages are 18 or older.
```sql
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INT CHECK (age >= 18)
);
```

---

## 11. Scenario-Based Questions - Deletion Strategy

This section covers data population scenarios with NULL values, primary key behavior, and deletion optimizations.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> CREATE TABLE students id INT PRIMARY KEY, name VARCHAR(SO) NOT NULL , age INT CHECK (age >=

### Q14. Null Handling Decision

*   **Scenario**: You are tracking customer records. The email field is unique but can be changed or set to null.
*   **Question**: Should the email field be chosen as the primary key?
*   **Answer**: No. A primary key cannot accept nulls and should remain immutable. Use an auto-incrementing surrogate ID as the primary key instead.

---

## 17. Scenario-Based Questions - Check Constraints and Tricky Scenario Q&A

This section details check validation triggers, primary key exclusions, null evaluations, and foreign key validations.

### Q15. Data Validation (CHECK Constraint)

*   **Scenario**: You must ensure that users register with an age greater than 18.
*   **Question**: What database rule enforces this?
*   **Answer**: Use a `CHECK` constraint:
    ```sql
    CONSTRAINT chk_age CHECK (age > 18)
    ```

### Q16. What is NULL?

Represents or unknown data What is DEFAULT constraint Provides default value if none is specified.

### Q17. Question: How do you handle it at database level?

Use DEFAULT values Use NOT NULL constraint Handle using functions like COALESCE

### Q18. Question: What will you use?

Answer: Foreign Constraint to maintain referential integrity.

### Q19. Question: What should you do?

Answer: Apply Normalization (combine redundancy

### Q20. NF (First Normal Form)

The process of organizing Each column should have atomic (single) values In INF data to reduce redundancy Not

### Q21. Example

Employee table [table   constraints] ); id em_name age

### Q22. SQL MASTER NOTES

Date / Time & Column    Constraints

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Changing_ 
> ```sql
> Tables   with  ALTER TABLE RENAME TABLE RENAME TABLE   changes the name of an table SIDE NOTE Syntax Use AFTER Column_name RENAME TABLE old_name To new_name ;
> ```
>  to control where the new column is placed . Example name contact_number RENAME TABLE Co _ employees To   employees ; ADD name Contact_number ALTER TABLE can (AFTER contact_number) ADD COLUMN adds a new column DROp COLUMN removes column MODIFY COLUMN ~changes   datatype or Constraints SIDE NOTE

### Q23. SQLConstraints

follow @jobtechmingle

### Q24. TRANSACTIONS & NORMALIZATION (045-050)




---

## 10. Transactions & ACID Properties

### Q1. What is the difference between DELETE, TRUNCATE, and DROP?

| Feature | DELETE | TRUNCATE | DROP |
| :--- | :--- | :--- | :--- |
| **Command Type**| DML | DDL | DDL |
| **Action** | Removes specific or all rows. | Removes all rows from a table. | Removes the table structure and its data completely. |
| **WHERE Clause**| Supported. | Not supported. | Not supported. |
| **Speed** | Slow (records changes in transaction logs row by row). | Fast (deallocates pages directly). | Very fast (removes schema metadata). |
| **Rollback** | Possible (within transaction if not committed). | Cannot be rolled back (implicitly commits). | Cannot be rolled back (implicitly commits). |
| **Triggers** | Fires DELETE triggers. | Does not fire triggers. | Does not fire triggers. |
| **Space Freeing**| Does not release storage space. | Releases storage space. | Releases storage space. |

---

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> | Feature | DELETE | TRUNCATE |
> | :--- | :--- | :--- |
> | **Row-wise deletion** | Deletes rows row-by-row based on a query filter. | Deallocates all table pages directly. |
> | **Can use WHERE** | Yes (supported). | No (removes all records). |
> | **Speed** | Slower (writes detailed rollback logs). | Faster (minimal transaction logging). |

### Q2. What are ACID Properties in Database Transactions?

ACID is a set of properties that guarantee database transactions are processed reliably:

*   **Atomicity**: "All or nothing." If any part of the transaction fails, the entire transaction is rolled back, leaving the database state unchanged.
*   **Consistency**: A transaction must move the database from one valid state to another, maintaining all schema constraints, triggers, and integrity rules.
*   **Isolation**: Transactions execute concurrently without interfering with each other. Intermediate states of a transaction are invisible to other transactions.
*   **Durability**: Once a transaction commits, its changes are permanently recorded in the database and will not be lost, even in the event of a system crash.

---

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> ACID properties guarantee transaction safety in database engines:
> *   **A (Atomicity)**: All SQL statements in a transaction commit successfully, or all are rolled back.
> *   **C (Consistency)**: Transactions move the database from one valid schema state to another.
> *   **I (Isolation)**: Concurrent transactions run independently without viewing incomplete intermediate states.
> *   **D (Durability)**: Committed transaction modifications are saved permanently even during sudden power losses.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> BEGIN UPDATE DELETE COMMIT;
> ```

### Q3. Can we rollback a TRUNCATE operation?

No, in most Relational Database Management Systems, `TRUNCATE` is a DDL operation that implicitly issues an auto-commit, preventing rollback.

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> No, in standard SQL configurations, `TRUNCATE` issues an implicit commit, making the operation final.

### Q4. What is a transaction?

A transaction is a logical unit of work consisting of one or more SQL statements executed together as a single operation.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> A group of SQL operations executed together:

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> transaction is a sequence of SQL operations executed UPDATE together as one logical unit of work. Why Transactions Matter UPDATE accounts Prevent partial updates Maintain data consistency Handle failures safely Ensure reliable multi-step operations Transaction Result transaction alwoys ends with: COMMIT changes are saved ROLLBACK changes are undone No partial state is allowed. ACID Properties (Core Guarantee Atomicity All operations Succeed together or none are applied Consistency Database moves from one valid state to another: Isolation Concurrent transactions do not affect each other: Durability Committed data remains safe after failures_ Transaction Example BEGIN;
> ```
>  UPDATE accounts

### Q5. What is COMMIT?

`COMMIT` is a TCL command that saves all transaction changes permanently to disk, ending the current transaction block.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Saves changes permanently

### Q6. Rollback TRUNCATE ?

`ROLLBACK` is a TCL command used to undo all pending updates made within the current transaction block.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> No (in most DBMS) , because it is auto-commit

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Undo changes.

### Q7. SAVEPOINT and ROLLBACK

`SAVEPOINT` is a checkpoint marker inside a transaction block that allows a rollback to selectively undo changes up to this point while retaining preceding operations.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Temporary to rollback partially: Interview Tricky Questions

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SAVEPOINT my_save; ROLLBACK To my_ save;

### Q8. Data Consistency Scenario

*   **Scenario**: You accidentally executed a DML delete statement and want to recover the deleted rows.
*   **Question**: Which command could have helped?
*   **Answer**: Use the `ROLLBACK` command (provided the transaction block has not yet been committed).

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> *   **Scenario**: Multiple users are reading and updating the same records concurrently.
> *   **Question**: How do you ensure consistency?
> *   **Answer**: Set appropriate isolation levels and utilize transactions that follow ACID properties.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Answer: Use transactions + ACID Properties

### Q9. Rollback Partial Changes

*   **Scenario**: You are executing a long transaction with multiple inserts and want to undo only the second half if an error occurs.
*   **Question**: What command will you use?
*   **Answer**: Define a `SAVEPOINT` after the first half, and call `ROLLBACK TO savepoint_name` if an error occurs.

### Q10. Question: Which command could have helped?

Answer: ROLLBACK (if transaction was not committed)

### Q11. SQL statement is automatically committed without manual control.

(9.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Answer Atomicity All Consistency Data remains valid state Isolation Transactions do not  affect  each other Durability Once   committed, data permanent Pro   Tip: Focus on writing paper_ Subquery subquery Emp Salary Emp Salary and specific keeps nothing: queries

### Q12. Integrity?

Accuracy and consistency of data Transactions & Control

### Q13. SQLvransactions&ACID

follow @jobtechmingle

### Q14. NF (No Transitive   Dependency)

Departments Higher Normal Forms (BCNF, 4NF, SNF) Employees EmpId EmpName DeptID DeptID DeptName nandle more complex scenarios Anan Ravi Key_Takeaway Exam_Tip Use Transactions for safe  operations draw tables when PAGE 08

### Q15. NF (Second Normal Form)

Priya Math, Eng ensures valid . safe & reliable INF dependency: Isolation Transactions dontt transactions interfere_


---

## 11. Views & Indexing

### Q1. What is the difference between Views and Materialized Views?

| Feature | View (Standard) | Materialized View |
| :--- | :--- | :--- |
| **Storage** | Does not store data physically. It is a saved virtual query. | Stores data physically on disk like a regular table. |
| **Performance** | Runs the underlying query every time the view is accessed (slower for complex joins/aggregations). | Faster read access because data is pre-computed and stored. |
| **Data Freshness** | Always returns the most up-to-date data. | Can become stale. Requires explicit refreshes (on-commit, on-demand, or scheduled). |
| **Write Operations** | Can be updateable under strict rules (e.g., single table without groupings). | Read-only directly. Updates occur when refreshing the view. |

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> A view is virtual table based on the result set of SQL query _ It does not store data   itself . The   data is fetched from the underlying   table (s) whenever the view is used . CREATE VIEW Used to create new view employees  table CREATE VIEW high_= -employees AS SELECT em_name, FROM employees filters WHERE

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Answer : viewu virtual table based on the   result of SQL query It does not store data physically Example Save & Follow CREATE VIEW EmpView AS SELECT ID Name , FROM Employees =

### Q2. What is a Database Index and how does it speed up queries?

A Database Index is a schema object containing pointers to physical rows in a table. It behaves like a book's index, allowing the query engine to find data without scanning the entire table (called a Full Table Scan).

*   **Default Index Structure**: Most RDBMS (including Oracle) use B-Tree (Balanced Tree) indexes by default.
*   **Pros**: Dramatically speeds up retrieval queries using `WHERE` filters, joins, or sorting conditions.
*   **Cons**: Slows down DML operations (`INSERT`, `UPDATE`, `DELETE`) because the database must update the index whenever data changes. It also requires disk space.

---

### Q3. Explain the difference between Clustered and Non-Clustered Indexes

| Feature | Clustered Index | Non-Clustered Index |
| :--- | :--- | :--- |
| **Data Storage** | The leaf nodes of the index contain the actual data rows of the table. | The leaf nodes contain pointers/row locators to the actual data rows. |
| **Limit** | Only one per table (since data rows can only be sorted in one physical order). | Multiple indexes per table are allowed. |
| **Primary Key**| Created automatically on the primary key in databases like SQL Server. | Created on unique keys and other custom columns. |

> [!NOTE]
> Oracle uses Index-Organized Tables (IOT) to implement clustered indexing. Regular tables in Oracle use B-tree indexes as non-clustered indexes.

---

### Q4. What is a schema?

A schema is the logical structure of a database, outlining the organization of database objects like tables, views, triggers, and indices.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Logical structure of a database (tables, views, etc.)_

### Q5. MONITORING & METADATA

Metadata is data about data. In databases, it represents structural schemas, column types, keys, and table descriptions (e.g., records in data dictionaries).

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Data about data table structure

### Q6. What is the difference between a table and a view?

A view is a virtual table that does not contain physical data. Instead, it stores a SQL query that retrieves data dynamically from database tables.

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> | Feature | Table | View |
> | :--- | :--- | :--- |
> | **Data Storage** | Stores actual data records physically. | Stores only the underlying SQL query. |
> | **Physical Storage**| Requires disk storage space for rows. | No physical storage is required for records. |

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Table View Stores data Virtual Physical storage No storage

### Q7. What is indexing?

Indexing is a database performance tuning technique that creates structural pointers to physical rows, helping the query processor locate table records without executing a full-table scan.

---

## 5. Data Types and Advanced Basic Concepts

This section discusses data types details, character constraints, and primary key properties.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Technique to improve query performance. Every (e.9:, from

### Q8. Drop Table

**Scenario**: Completely drop the employees table from the schema.
```sql
DROP TABLE employees;
```

### Q9. Important Interview Scenarios



### Q10. Performance Issue

*   **Scenario**: Searches and lookups filtered by employee salary are running very slowly.
*   **Question**: What database optimization will improve performance?
*   **Answer**: Create an `INDEX` on the `salary` column.

### Q11. Table Removal Decision

*   **Scenario**: You want to delete all table data and completely remove the table schema.
*   **Question**: What statement should you execute?
*   **Answer**: Execute the `DROP TABLE` command.

### Q12. Question: What can improve performance?

Answer: Create an INDEX on the Salary column

### Q13. Viewu?

virtual table created query

### Q14. SQL Basics

Interview_Questions_ Theoretical_Questions

### Q15. SQL MASTER NOTES

NOTES CompanyHR Database Overview CompanyHR

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Views What is

### Q16. NF  (Third Normal Form)

Must be in ZNF and key attribute should be In 3NF transitively dependent the Primary Not in 3NF EmpID EmpName DeptID DeptID DeptName DeptLocation EmpID EmpName DcptID DcptName DeptLocation Rahul Delhi Rahul Delhi Amit Bangalore Amit Bangalore Riya Delhi Problem: Deptlocation depends o DeptID, Employee Table Department   Table not  directly EmpID: Quick Takeaway Interview Tip You Got This! Normalize step by INF

### Q17. SQL Interview Questions & Answers



### Q18. CREATE INDEX

CREATE INDEX idx_name ON users(name)

### Q19. CHECK index usage

SELECT FROM pg_stat_user_indexes

### Q20. REFRESH MATERIALIZED VIEW

REFRESH MATERIALIZED VIEW sales_summary;

### Q21. List tables

SELECT table_name FROM information_schema tables WHERE table_ schema public

### Q22. Session variables

SELECT current_user, current_schema

### Q23. MySQL Workbench  gives

```sql
interface SELECT 'Hello World ;
```
 
```sql
SELECT "MySQL is fun! ;
```
 to write SQL , run and view  results_

### Q24. An Index in SQL?

An index is a database structure that improves query performance by allowing faster access to rows without scanning the entire table. Why_Indexes are Important Speed up data retrieval Improve performance O large tables Optimize filtering and join operations Reduce full table scans QUERY TIME This Significantly reduces query execution time How Indexes Work (Conceptual View) Indes stores column values in an ordered structure Database uses index to kocate matching rows quickl Only requred data blocks are accessed This significantly reduces query execution time When Indexes are Useful Columns are frequently used in WHERE conditions Columns are involved in JON cperations Queries perform Or filtering

### Q25. What is a SELECT Query?

TO The SELECT query is used to retrieve specific data from database tables without modifying the stored records_ Purpose of SELECT Fetch required columns tables View data without changing it Form the base 0f reporting and analysis queries Basic SELECT Syntax A SELECT query always specifies: D


---

## 12. Oracle-Specific Functions & PL/SQL Basics

### Q1. Explain the DUAL Table

In Oracle database, `DUAL` is a special, one-row, one-column table automatically created by the system.
*   **Schema**: It has a single column named `DUMMY` of type `VARCHAR2(1)`.
*   **Content**: It contains a single row with the value `'X'`.
*   **Purpose**: Since SQL in Oracle requires a `FROM` clause for every `SELECT` statement, `DUAL` is used to execute queries that return static values, system variables, or expression evaluations that do not depend on user tables.

### Examples in Oracle
```sql
-- Get current system date and time
SELECT SYSDATE FROM DUAL;

-- Perform mathematical evaluations
SELECT 5 * 10 AS result FROM DUAL;

-- Evaluate a sequence value
SELECT employee_seq.NEXTVAL FROM DUAL;
```

---

### Q2. How does ROWNUM work in Oracle and how is it different from ROW_NUMBER?

### ROWNUM
`ROWNUM` is a pseudo-column in Oracle that assigns a sequential integer to the rows returned by a query, starting at 1. It is evaluated *as* rows are fetched, before sorting occurs.

> [!WARNING]
> Because `ROWNUM` values are assigned before `ORDER BY` is executed, filtering directly with `ROWNUM` and sorting will yield arbitrary rows. To get top-N rows correctly using `ROWNUM`, you must use a subquery:

```sql
-- Correct top-N rows before Oracle 12c:
SELECT * FROM (
    SELECT employee_id, salary
    FROM employees
    ORDER BY salary DESC
)
WHERE ROWNUM <= 5;
```

Also, a condition like `ROWNUM = 2` or `ROWNUM > 1` directly on a query returns no rows because a row with `ROWNUM` = 1 must be fetched first for the count to proceed.

### ROW_NUMBER()
`ROW_NUMBER()` is an analytic/window function that assigns a unique sequential number to rows within a partition of the result set, evaluated *after* sorting.

```sql
-- Correct sorting and row numbering
SELECT employee_id, salary,
       ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank_num
FROM employees;
```

In Oracle 12c and later, you can also use the standard SQL clause for pagination:
```sql
SELECT employee_id, salary
FROM employees
ORDER BY salary DESC
OFFSET 0 ROWS FETCH NEXT 5 ROWS ONLY;
```

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SELECT ROW_NUMBER ( OVER (PARTITION BY department ORDER BY salary DESC) FROM employees

### Q3. What is PL/SQL and what is its basic structure?

PL/SQL (Procedural Language/Structured Query Language) is Oracle's extension of SQL. It allows developers to write procedural logic (loops, conditional statements, variable declarations) combined with SQL statements.

### PL/SQL Block Structure
PL/SQL code is structured in blocks, which contain three sections:
```sql
DECLARE
    -- Optional declaration section: variables, cursors, custom exceptions
    v_salary employees.salary%TYPE;
    v_name   employees.first_name%TYPE;
BEGIN
    -- Mandatory execution section: SQL statements, loops, conditional blocks
    SELECT first_name, salary 
    INTO v_name, v_salary
    FROM employees 
    WHERE emp_id = 101;
    
    DBMS_OUTPUT.PUT_LINE('Employee ' || v_name || ' earns ' || v_salary);
EXCEPTION
    -- Optional exception handling section: error handling logic
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('No employee found with ID 101.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('An unexpected error occurred.');
END;
/
```

---

### Q4. What are Window Functions and how do RANK, DENSE_RANK, and ROW_NUMBER differ?

Window functions perform calculations across a set of table rows that are related to the current row, without collapsing them into a single row (unlike `GROUP BY`).

Consider employees with salaries: `[10000, 10000, 9000, 8000]`

*   `ROW_NUMBER()`: Assigns a unique, consecutive integer.
    *   Output: `1, 2, 3, 4`
*   `RANK()`: Assigns ranks with gaps. Duplicate values get the same rank, and the next rank skips values.
    *   Output: `1, 1, 3, 4` (Rank 2 is skipped because two rows tied for rank 1).
*   `DENSE_RANK()`: Assigns ranks without gaps.
    *   Output: `1, 1, 2, 3`

### Example
```sql
SELECT employee_id, dept_id, salary,
       ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) as row_num,
       RANK()       OVER (PARTITION BY dept_id ORDER BY salary DESC) as rnk,
       DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as dense_rnk
FROM employees;
```

---


---

## 13. Cursors, Triggers & Mutating Table Error

### Q1. What is a Cursor in PL/SQL and what are its types?

A Cursor is a pointer to a private SQL memory area (context area) allocated by Oracle to execute SQL statements. It holds the row set returned by a query.

### Types of Cursors
1.  **Implicit Cursors**: Automatically created by Oracle whenever a single-row SQL statement (like `SELECT INTO`, `INSERT`, `UPDATE`, `DELETE`) is executed.
2.  **Explicit Cursors**: Defined and controlled by the developer for queries that return multiple rows. Must follow a four-step lifecycle:
    *   `DECLARE` (Define the cursor query)
    *   `OPEN` (Initialize memory and execute query)
    *   `FETCH` (Retrieve rows one by one into variables)
    *   `CLOSE` (Free allocated context memory)

### Explicit Cursor Example
```sql
DECLARE
    CURSOR emp_cur IS
        SELECT first_name, salary FROM employees WHERE dept_id = 10;
    v_name employees.first_name%TYPE;
    v_sal  employees.salary%TYPE;
BEGIN
    OPEN emp_cur;
    LOOP
        FETCH emp_cur INTO v_name, v_sal;
        EXIT WHEN emp_cur%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(v_name || ' earns ' || v_sal);
    END LOOP;
    CLOSE emp_cur;
END;
/
```

---

### Q2. Explain Triggers in Oracle SQL and Row vs Statement Level Triggers

A Trigger is a database object that automatically fires in response to DML operations (`INSERT`, `UPDATE`, `DELETE`) or system events.

*   **Statement-Level Trigger**: Fires exactly once for the executing SQL statement, regardless of how many rows are affected (default trigger type).
*   **Row-Level Trigger**: Fires once for each row modified by the SQL statement. Defined using the `FOR EACH ROW` clause. It can reference old and new row values using the `:OLD` and `:NEW` bind variables.

### Row-Level Trigger Example
```sql
CREATE OR REPLACE TRIGGER audit_salary_update
AFTER UPDATE OF salary ON employees
FOR EACH ROW
BEGIN
    INSERT INTO salary_history(emp_id, old_salary, new_salary, change_date)
    VALUES(:OLD.emp_id, :OLD.salary, :NEW.salary, SYSDATE);
END;
/
```

---

### Q3. What is the Mutating Table Error (ORA-04091) in Oracle triggers?

A mutating table is a table that is currently being modified by a DML statement.
*   **Cause**: The ORA-04091 error occurs when a row-level trigger tries to query (`SELECT`) or modify the same table that fired the trigger. The database blocks this to prevent reading inconsistent/in-flight data.
*   **Prevention/Resolution**:
    1.  Avoid querying the triggering table in row-level triggers.
    2.  Use a **Compound Trigger** (introduced in Oracle 11g) which allows sharing variables between row-level and statement-level execution blocks.
    3.  Convert the logic to a statement-level trigger if row-specific references are not needed.

---

### Q4. SQL MASTER NOTES

Final SQL & Study  Roadmap Your  SQL Create Database You've Got Create   Tables This ! Insert Data SQL Topics with SELECT Basics ( Databases, Tables, SQL) Tables Data   Types Filter and Sort Constraints (KEY, NOT NULL , UNIQUE, CHECK ) Use Functions and GROUP BY DML (INSERT, UPDATE , DELETE) SELECT Queries Join   Tables Functions Aggregates Joins (INNER, LEFT, RIGHT, FULL) Use   Views Triggers Views Procedures Functions Cursors Triggers Stored Procedures Build Mini  Project Functions (IF, CASE, WHILE) Practicing, Cursors Growing " Mini   Project Beginner query Practice   daily is the key! you write Write Don't just copy: makes you better Build mini projects That's real learning!

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Triggers MySQL A TRIGGER is stored action (a set of SQL statements) that runs automatically when an INSERT , UPDATE , or DELETE event happens on table .


---

## 14. Query Optimization & Performance Tuning

### Q1. How do you optimize a slow-running SQL query?

Database tuning requires checking execution plans and structural design. Here are the core optimization techniques:

1.  **Analyze the Execution Plan**: Use `EXPLAIN PLAN FOR` or tools like AutoTrace in Oracle to identify bottlenecks, Full Table Scans, and nested loop joins.
2.  **Add Proper Indexes**: Create indexes on fields frequently used in `WHERE`, `JOIN` (foreign keys), and `ORDER BY` clauses.
3.  **Avoid SELECT \***: Specify columns explicitly to reduce memory consumption and network load.
4.  **Use Bind Variables**: In Oracle, bind variables (e.g., `:value`) enable the engine to reuse execution plans rather than parsing a new plan for every unique literal.
5.  **Prefer EXISTS over IN**: For correlated queries against large child tables.
6.  **Avoid Operations on Indexed Columns**: Applying functions like `LOWER(emp_name)` or arithmetic on indexed columns disables index usage. Use Function-Based Indexes if function evaluations are required.

---

### Q2. Performance Issue

Scenario: Your query is slow when searching by salary:

### Q3. Difference between DELETE and TRUNCATE?

DELETE TRUNCATE Row-wise deletion Removes all rows Can use WHERE No WHERE Slowver Faster

### Q4. Find slow queries

```sql
SELECT FROM pg_stat_activity WHERE state active @helloworld_avani By;
```


---

## 15. Advanced Database Concepts

### Q1. What is Database Partitioning?

Partitioning divides large tables or indexes into smaller, more manageable pieces (called partitions) without changing the logical structure of the table. This improves query performance and maintenance.

### Common Partitioning Strategies
*   **Range Partitioning**: Maps data to partitions based on a range of values (e.g., partitioning an invoice table by `invoice_date` into monthly intervals).
*   **List Partitioning**: Maps data to partitions based on explicit, literal value lists (e.g., partitioning customers by `region` like 'North', 'South', 'West').
*   **Hash Partitioning**: Uses an internal hash algorithm on a partition key to distribute rows evenly across a specified number of partitions.
*   **Composite Partitioning**: Combines basic data distribution methods (e.g., range-partitioning by date, then sub-partitioning each range by hash).

---

### Q2. What are Transaction Isolation Levels?

Transaction isolation levels define the degree to which a transaction is isolated from concurrent modifications made by other transactions. They prevent specific database read anomalies:

*   **Dirty Read**: Reading uncommitted changes from another transaction.
*   **Non-repeatable Read**: Reading the same row twice in a transaction yields different values because another transaction modified and committed it.
*   **Phantom Read**: Running a query twice yields a different number of rows because another transaction inserted/deleted rows in the range.

### Isolation Levels and Solved Anomalies

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
| :--- | :--- | :--- | :--- |
| **Read Uncommitted**| Allowed | Allowed | Allowed |
| **Read Committed**  | Prevented | Allowed | Allowed |
| **Repeatable Read** | Prevented | Prevented | Allowed |
| **Serializable**    | Prevented | Prevented | Prevented |

> [!NOTE]
> Oracle Database natively supports **Read Committed** (default) and **Serializable** isolation levels, as well as a read-only isolation level. It does not support Read Uncommitted.


---

## 16. Practical Query Scenarios & Tricky Interview Q&A

### Q1. How do you find the N-th Highest Salary of an Employee?

There are several ways to find the N-th highest salary, depending on database support and performance needs.

### Approach 1: Using Correlated Subquery (Universal SQL)
```sql
SELECT DISTINCT salary
FROM employees e1
WHERE N = (
    SELECT COUNT(DISTINCT salary)
    FROM employees e2
    WHERE e2.salary >= e1.salary
);
```

### Approach 2: Using DENSE_RANK() (Recommended for handling duplicate salaries)
`DENSE_RANK()` assigns ranks without gaps. If multiple employees share a salary, they get the same rank, and the next rank is incremented by 1.
```sql
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rank_num
    FROM employees
)
WHERE rank_num = :N;
```

### Approach 3: Using Pagination (Oracle 12c+, MySQL, PostgreSQL)
```sql
-- MySQL / PostgreSQL (for N=2, OFFSET is N-1)
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- Oracle 12c+ (for N=2, OFFSET is N-1)
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
OFFSET 1 ROWS FETCH NEXT 1 ROWS ONLY;
```

---

### Q2. How do you find and remove duplicate rows from a table in Oracle?

Duplicate records often occur when tables lack primary key or unique key constraints.

### Sample Data Scenario
Suppose you have duplicates in table `employees` based on `email`.

### Finding Duplicate Rows
```sql
SELECT email, COUNT(*)
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;
```

### Removing Duplicates (Keeping the row with the lowest ROWID)
In Oracle, `ROWID` is a unique physical address of a row.
```sql
DELETE FROM employees
WHERE rowid NOT IN (
    SELECT MIN(rowid)
    FROM employees
    GROUP BY email
);
```

### Alternative using CTE (Generic SQL)
```sql
DELETE FROM employees
WHERE emp_id IN (
    SELECT emp_id FROM (
        SELECT emp_id,
               ROW_NUMBER() OVER (PARTITION BY email ORDER BY emp_id) as row_num
        FROM employees
    )
    WHERE row_num > 1
);
```

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> employees Parent   Table) Relationship id (PK) em_name gender Contact_number Alice   Johnson

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Answer A table is collection of data organized in rows and columns_ Each rowu represents record and each column represents an attribute

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> % Answer: Answer : Query Query Tip:

### Q3. What is the difference between UNION and UNION ALL?

Both operators are used to combine the results of two or more `SELECT` queries into a single result set.

| Feature | UNION | UNION ALL |
| :--- | :--- | :--- |
| **Duplicates** | Removes duplicate records from the combined set. | Retains all records, including duplicates. |
| **Performance** | Slower (requires an internal sorting/distinct operation). | Faster (simply appends the second result set to the first). |
| **Ordering** | Sorts the combined output implicitly. | Does not sort output implicitly. |

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> DROP and TRUNCATE? DROP Lt removes table completely TRUNCATE

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> composite

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> case

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> row and

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SELECT name FROM employees UNION ALL SELECT name FROM contractors

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Combines the result of two Or  more SELECT statements and removes licate rows What is

### Q4. What is SQL Injection and how can it be prevented?

SQL Injection (SQLi) is a security vulnerability where an attacker manipulates SQL queries by injecting malicious input into input fields. This can allow attackers to bypass authentication, read sensitive data, or modify database contents.

### Example of Vulnerable Code
```javascript
// Vulnerable to SQL injection if input is: ' OR '1'='1
let query = "SELECT * FROM users WHERE username = '" + userInput + "'";
```

### Prevention Methods
1.  **Parameterized Queries (Bind Variables)**: Enforces that user input is treated strictly as data, not executable code.
    ```sql
    -- Secure query format
    SELECT * FROM users WHERE username = :username;
    ```
2.  **Stored Procedures**: Abstracts SQL statements.
3.  **Input Validation**: White-listing input types and lengths.

---

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Key   Benefits

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Where name 'Ravi' Quick_Tip Sample Table students Remember Practice these id name age dept SELECT Retrieve daily to Aman

### Q5. Difference between table

A table is a collection of structured data organized in a tabular format containing rows and columns.

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> **Scenario**: Create a table named `employees` to track staff information.
> ```sql
> CREATE TABLE employees (
>     id INT PRIMARY KEY,
>     name VARCHAR(50),
>     salary FLOAT,
>     joining_date DATE
> );
> ```

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Decision Scenario: You want to completely remove table structure. Answer: Use DROP

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Question: Create table employees CREATE TABLE   employees id INT PRIMARY KEY name VARCHAR (50) salary FLOAT _ joining_ date DATE

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> collection of data organized in rows and columns_

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> ALTER TABLE students ADD COLUMN email TEXT ;
> ```

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> matching

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> and roms from  right   table. rows from

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> and matching rows from  right table. If no match, NULL returned for  right  table columns Pro Practice on real-world scenarios It in understanding and aggregation  better: (Continue on Page

### Q6. What is the difference between DELETE, TRUNCATE, and DROP?

| Command | Action |
| :--- | :--- |
| **DELETE** | Removes specific rows based on a filter condition. |
| **TRUNCATE** | Removes all rows from a table rapidly (leaves table structure intact). |
| **DROP** | Completely removes the table structure and its data from the database. |

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Command Description DELETE Removes specific rows TRUNCATE Removes all rows (fast) DROP Deletes entire table

### Q7. Insert with NULL

`NULL` represents missing, unknown, or inapplicable values in a database field. It is not equivalent to zero (`0`) or an empty string.

> [!NOTE]
> **Scenario / Additional Context (from Visual-Notes.md):**
> **Scenario**: Populate an employee record omitting the salary value.
> ```sql
> INSERT INTO employees (id, name, salary)
> VALUES (4, 'Karan', NULL);
> ```

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> INSERT INTO employees ( id, name, Salary) VALUES (4, Karan NULL ) ;
> ```

### Q8. Is TRUNCATE faster than DELETE? Why?

Yes. `TRUNCATE` is faster because it does not log individual row deletions. It deallocates the data blocks directly rather than scanning and deleting rows one-by-one.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Answer: Because it doesn 't row-by-row deletion.

### Q9. Practical Questions (With Queries)



### Q10. What iS data

**Scenario**: Insert a single employee record into the database.
```sql
INSERT INTO employees (id, name, salary, joining_date)
VALUES (1, 'Adarsh', 50000, '2024-01-10');
```

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> INSERT INTO employees (id, name salary, joining_date) VALUES   (1 , Adarsh'

### Q11. Rename a Column

**Scenario**: Change the column name `name` to `emp_name`.
```sql
ALTER TABLE employees
RENAME COLUMN name TO emp_name;
```

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Row: A single record Column: Attribute/field of data testingvala info@testingvala. com Query

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Answer : Row single record in table_ Column: An attribute or field that holds type of data

### Q12. Delete Specific Rows

**Scenario**: Remove a employee record with an ID of 2.
```sql
DELETE FROM employees
WHERE id = 2;
```

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> UPDATE users SET is_active FALSE WHERE last_login

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> DELETE FROM sessions WHERE expired TRUE ;
> ```

### Q13. Remove All Data (TRUNCATE)

**Scenario**: Empty the table data quickly while preserving structural properties.
```sql
TRUNCATE TABLE employees;
```

### Q14. Theoretical Scenario-Based SQL Questions

Multiple users are updating the same data. Question: How to ensure

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Your table has repeated data:

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Age must be greater than 18. Answer: Use CHECK (age

### Q15. Intermediate Theoretical Scenarios



### Q16. Partial Data Removal

*   **Scenario**: You want to delete specific records from a table while keeping the rest.
*   **Question**: What command will you use?
*   **Answer**: Use the `DELETE` command combined with a `WHERE` clause filter.

### Q17. Missing Data Scenario

*   **Question**: Find all employee records whose salary is not provided.
*   **Query**:
    ```sql
    SELECT *
    FROM employees
    WHERE salary IS NULL;
    ```
*   **Database Concepts Tested**: Null validations using `IS NULL`.

### Q18. Table Modification Scenario

*   **Question**: Remove all data from the employees table while preserving structure.
*   **Query**:
    ```sql
    TRUNCATE TABLE employees;
    ```
*   **Database Concepts Tested**: Table truncation.

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Scenario: You are designing student table. Question: How will you ensure

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Question: 
> ```sql
> Add Column bonus to employees. ALTER TABLE employees ADD bonus INT;
> ```
>  Tests: ALTER

### Q19. Orders ?

Ans SELECT c. customer_id, C.customer_name,

### Q20. Customer_id;



### Q21. What is the use of ALTER?

SELECT C.customer_ id, C customer_name FROM customers

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Ans: 
> ```sql
> TRUNCATE TABLE  table_name;
> ```

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Ans: ALTER TABLE employees MODIFY DECIMAL(10,2) NOT update

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Ans: UNION

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Ans: SELECT d.department_id, d.department_name FROM departments d

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Ans: SELECT product_id, product_name FROM   pProducts WHERE stock_quantity

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SELECT customer_id customer_name, register_date FROM customers WHERE register_date >= CURRENT_ DATE INTERVAL

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> SELECT P: product_id, P: product_ name FROM   products

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Ans: SELECT FROM employees WHERE >

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Modify table structure_

### Q22. Department?

Ans: UPDATE employees SET department_id

### Q23. Write it?

Ans: 
```sql
SELECT employee_id, first_name, department_id FROM employees el WHERE (SELECT AVG FROM  employees JGalary2 WHERE el.department_id e2.department_id) ;
```

### Q24. Oo00;



### Q25. Numbers ?

Ans: 
```sql
SELECT FROM table_name WHERE _number IS NULL;
```

### Q26. KEY is duplicated?

It will throw an error (violates uniqueness).

### Q27. Can a table have multiple primary



### Q28. Which command will you use and why?

Answer: Use TRUNCATE because it is faster and removes all rows without logging individual deletions testingvala keys No, key: need

### Q29. Duplicate Data

Issue Scenario: table has duplicate records_

### Q30. Null Handling Decision

Scenario: Email is unique but may

### Q31. Data Validation

(Q testingvala info@testingvala com queries: change: key

### Q32. Can NULL be compared

= Answer: No use IS NULL

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> of UNIQUE

### Q33. Is violated?

Answer: Database will throw an error_ testinavo nfoatestinavala Cona using log - No foreign key

### Q34. Tests: HAVING



### Q35. Top Performer _Scenario

Find highest employee. testingvala info@testinavalo com along keep Paid

### Q36. What is surrogate



### Q37. Error

occurs.

### Q38. What is difference between SQL and

```sql
SQL functions are built-in operations that perform calculations or manipulate  data. help  retrieve   useful results from table values_ Functions can work on numbers, text, dates, and Functions groups of rows. save timel reduce manual work and  simplify Common types include  aggregate  functions and string functions. are used in data  analysis and reporting: Syntax: SELECT FUNCTION_NAME (column_name_ FROM table_name;
```
 Example: 
```sql
SELECT COUNT ( *) FROM students;
```
 This  query returns the total number of rows in the students table. Chapter  Summary SQL functions make queries   easier: can calculate, summarize, and transform data. Aggregate  functions work on sets of rows. <1> functions work with text_ COUNT, SUM, AVG, and MAX are important SQL They They queries. They widely They String MIN, examples

### Q39. First_ MySQL_Code

SQL

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Server stores and manages   databases _ SQL Fil 1

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> This comment SELECT to display   messages Comments are ignored SELECT Hello World by MySQL. SELECT MySQL is fun !

### Q40. Properties?

A - Atomicity C> Consistency I

### Q41. Modify column

```sql
ALTER TABLE employees MODIFY DOUBLE;
```

### Q42. Why SQL is important for Data Analysts?

Because it helps to Extract data Analyze datasets Generate reports Practical Questions (With Queries,

### Q43. Insert multiple rows

INSERT INTO  employees VALUES (2 , Rahul

### Q44. SQL MASTER NOTES

Subqueries Outer What is

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Ready_ to Code MySQL

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Date & Time Functions

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> UNION and UNION ALL MySQL What

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> & Databases Database

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Tables Rows & Columns COLUMNS

### Q45. Decimal places

price DECIMAL (10,2) ; Order date order_date DATE

### Q46. Data Modification Commands



### Q47. Letter

Amit

### Q48. Intermediate SQL Concepts



### Q49. NF (Second Normal Form)

Must be in INF and all non- attributes must be functionally dependent on the Yhole Primary In 2NF Not in 2NF OrderID ProductID Product Name Product Price Order Date OrderID OrderDate ProductID Product Name ProductPrice

### Q50. Database ?

Answer:

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> ```sql
> SQL Structured Language _ database is collection of used to communicate with related data stored in an databases and organized manner operations on data . Table Example Table SELECT FROM students ;
> ```
>  Table What is

### Q51. INSERT from SELECT

SELECT

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> INSERT INTO archive SELECT FROM orders WHERE created_at

### Q52. AGGREGATION & GROUPING

retules Run , equal existing Improve-

### Q53. Calculate percentage of total

SELECT category, COUNT ( *)

### Q54. Use COUNT DISTINCT

```sql
SELECT COUNT (DISTINCT user_id) FROM logins;
```

### Q55. Use conditional aggregation

```sql
SELECT COUNT ( *) FILTER WHERE status Open FROM tickets;
```

### Q56. SUBQUERIES & SET OPERATIONS



### Q57. User_id)



### Q58. UNION (removes duplicates)

```sql
SELECT email FROM students UNION  SELECT email FROM teachers;
```

### Q59. INTERSECT

```sql
SELECT email FROM customers INTERSECT SELECT email FROM newsletter subscribers;
```

### Q60. EXCEPT

```sql
MINUS SELECT email FROM users EXCEPT SELECT email FROM unsubscribed;
```

### Q61. WINDOW FUNC TIONS



### Q62. Percent of total

SELECT department , COUNT ( *)

### Q63. GRANT

```sql
REVOKE GRANT SELECT ON orders TO analyst ;
```

### Q64. PERFORMANCE & DEBUGGING



### Q65. EXPLAIN query plan

EXPLAIN ANALYZE SELECT FROM orders WHERE id

### Q66. VACUUM

ANALYZE VACUUM ANALYZE tablename

### Q67. INSERT new row

INSERT INTO products (name_ price) VALUES ( 'Laptop

### Q68. UPSERT (Postgres: ON CONFLICT)

```sql
INSERT INTO users (id, email) VALUES ( On CONFLICT (id) DO UPDATE SET email EXCLUDED . email;
```

### Q69. MERGE (SQL Server

Snowflake) MERGE INto target USING source ON WHEN MATCHED THEN  UPDATE WHEN NOT MATCHED THEN INSERT

### Q70. RETURNING clause (Postgres)

DELETE FROM users WHERE id

### Q71. Recursive hierarchy with level

wiTH RECURSIVE emp(id manager_id, Ivl) AS (...) SELECT FROM emp

### Q72. Recursive path generation

```sql
WITH RECURSIVE paths AS (. SELECT FROM paths ;
```

### Q73. JSON, ARRAYS & ADVANCED



### Q74. Extract from JSON

```sql
SELECT da ~>> name FROM users;
```

### Q75. Aggregate JSON objects

```sql
SELECT json_agg(row_to_json(t) ) FROM SELECT FROM users) t;
```

### Q76. UNNEST arrays

```sql
SELECT unnest (array_column FROM table;
```

### Q77. Create array from rows

```sql
SELECT array_agg( id) FROM users;
```

### Q78. Filter inside JSON

SELECT FROM WHERE data->> event login

### Q79. MISCELLANEOUS TRICKS



### Q80. Generate UUID

SELECT gen_random_uuid()

### Q81. Convert string to date

```sql
SELECT TO_DATE ( '2025-01-01 YYYY-MM-DD ' ) ;
```

### Q82. Case statements

SELECT name CASE WHEN age

### Q83. REGEXP functions

SELECT FROM users WHERE name ^[A-Z]

### Q84. Pivot data (SQL Server example)

Use PIVOT function or conditional aggregation. @helloworld_avani ta logs By;

### Q85. Describe table structure

DESCRIBE table_name

### Q86. Find locked queries

```sql
SELECT FROM pg locks WHERE granted FALSE ;
```

### Q87. DATE & TIME LOGIC



### Q88. Current timestamp

SELECT CURRENT TIMESTAMP

### Q89. Extract parts of date

SELECT EXTRACT (YEAR FROM order_date) FROM orders

### Q90. Date difference

SELECT end_ date start_date FROM bookings

### Q91. Add interval

```sql
SELECT order_date INTERVAL days FROM orders;
```

### Q92. Must Know SQL Queries

```sql
Returns the current date and time SELECT NOw();
```

### Q93. CORE SELECT RETRIEVAL

Select all columns from a table SELECT FROM employees

### Q94. CHAPTER 6 =

SQL Functions

### Q95. Right ,

matching Aman Emp_ Emp; Emp Employee Emp Riye Emp- Emp_ Riye Emp Emp

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Matched

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> from one side makes more SELECT statements_ Ravi FULL OUTER from both Perfect ! Keeps licates Aman CROSS combination UNION Combine remove duplicates SELECT name FROM Students_

### Q96. Ola,g"94)f94



### Q97. AS sub_str;

(start_
```sql
position , length) TRIM() Removes and spaces . Example Hello World SELECT TRIM (' Hello World AS clean_text;
```
 
```sql
REPLACE ( ) I love  SQL Replaces all occurrences  of with another. Example SELECT REPLACE ('I love SQL SQL MySQL AS updated_text;
```
 I love MySQL Note functions are useful for formatting text  output and data . Page 11 String TEXT strings string Part string . trailing Leading ~substring String <1 cleaning

### Q98. Basic   Workflow

Open Connect Type Execute See Workbench to Server Code Result Result Grid Page 2 Getting coding Vicd

### Q99. SQLOvervewecategories

follow @jobtechmingle

### Q100. NdexesgperformanceBasics

follow @jobtechmingle What is

### Q101. SELECTQuereExecutionBasics

follow @jobtechmingle

### Q102. Nalam

Columns that are required

### Q103. SQLAggregateFunctions

follow @jobtechmingle

### Q104. Subqueries(Basicldea)

follow @jobtechmingle

### Q105. Inside SELECT

inside WHERE Prinery Foreign Key

### Q106. Inner query runs first

Result is passed t0 auter query Outer query uses that result for

> [!NOTE]
> **Scenario / Additional Context (from OCR):**
> Only matches Practice

### Q107. S@LDatatpes

follow @jobtechmingle

### Q108. Q14)}

Retrieve the Right Data from the Database

### Q109. DATA OPERATIONS (015-022)



### Q110. NF  (Third

Normal Form)

### Q111. Grov?



### Q112. SQL BASICS (01-Q6)

SQL What is

### Q113. Q1t .

What is GROUP

### Q114. Q19 .

Difference between UNION and UNION


---
