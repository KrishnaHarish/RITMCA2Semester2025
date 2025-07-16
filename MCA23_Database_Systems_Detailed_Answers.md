# MCA23 - Database Systems  
**Semester End Examinations – September / October 2023**  
**Max Marks:** 100 | **Time:** 3 Hrs

---

## Instructions:
- Answer one full question from each unit.

---

## UNIT - I

### 1.  
#### a) **What is a Database? Describe with a neat diagram the database architecture.**  
**CO1 [10 Marks]**

A **database** is a structured collection of data, typically organized to model aspects of reality in a way that supports processes requiring information, such as recording transactions, tracking inventory, or managing customer information. Databases are managed by Database Management Systems (DBMS), which provide mechanisms for data storage, retrieval, and management.

#### Database Architecture

The **three-level database architecture** (ANSI/SPARC) is as follows:

- **External Level (View Level):** This is the highest level of abstraction and describes only part of the entire database relevant to a particular user. It enables different users to have different views of the same database.
- **Conceptual Level (Logical Level):** This level describes the structure of the whole database for a community of users. It hides the details of physical storage and focuses on describing entities, data types, relationships, user operations, and constraints.
- **Internal Level (Physical Level):** This is the lowest level of abstraction, describing how the data is physically stored on storage devices.

**Diagram:**
```
+-------------------+
|   External Level  |  <--- User Views (Schemas)
+-------------------+
|  Conceptual Level |  <--- Community User View
+-------------------+
|   Internal Level  |  <--- Physical Storage
+-------------------+
```

**Explanation:**  
- The external level allows users to access data in a way that is tailored to their needs.
- The conceptual level acts as a bridge between user views and physical storage, ensuring data independence.
- The internal level focuses on data storage efficiency and performance.

---

#### b) **Discuss the following schema-based constraints with examples:**  
- **Domain constraint**
- **Key constraint**
- **Entity integrity constraint**  
**CO1 [10 Marks]**

**Domain Constraint:**  
A domain is a set of permitted values for an attribute. The domain constraint ensures that the value of an attribute must be an element from its domain.

- **Example:**  
  If the domain of the attribute `age` is defined as integers from 18 to 60, then any insertion of `age = 17` or `age = 70` would violate the domain constraint.

  ```sql
  CREATE TABLE Employee (
      emp_id INT PRIMARY KEY,
      name VARCHAR(50),
      age INT CHECK (age >= 18 AND age <= 60)
  );
  ```

**Key Constraint:**  
A key is an attribute or a set of attributes that uniquely identifies a tuple (row) in a relation (table). The key constraint ensures that no two tuples can have the same value for the key attribute(s).

- **Example:**  
  In the `Student` table, `sno` is the primary key and must be unique.

  ```sql
  CREATE TABLE Student (
      sno INT PRIMARY KEY,
      sname VARCHAR(50),
      age INT
  );
  ```

  Trying to insert two students with the same `sno` will violate the key constraint.

**Entity Integrity Constraint:**  
This constraint states that the value of a primary key attribute cannot be NULL, ensuring that every entity can be uniquely identified.

- **Example:**  
  In the `Faculty` table, `fid` is the primary key and cannot be NULL.

  ```sql
  CREATE TABLE Faculty (
      fid INT PRIMARY KEY,
      fname VARCHAR(50)
  );
  ```

  Inserting a tuple with `fid = NULL` will violate the entity integrity constraint.

---

### 2.  
#### a) **Given relations, write SQL statements to create these relations including all primary and foreign key integrity constraints.**  
**CO1 [10 Marks]**

```sql
CREATE TABLE Faculty (
    fid INTEGER PRIMARY KEY,
    fname VARCHAR(50),
    deptid INTEGER
);

CREATE TABLE Student (
    sno INTEGER PRIMARY KEY,
    sname VARCHAR(50),
    major VARCHAR(50),
    level VARCHAR(20),
    age INTEGER
);

CREATE TABLE Course (
    cname VARCHAR(50) PRIMARY KEY,
    meetsat TIME,
    room VARCHAR(20),
    fid INTEGER,
    FOREIGN KEY (fid) REFERENCES Faculty(fid)
);

CREATE TABLE Enrolled (
    sno INTEGER,
    cname VARCHAR(50),
    PRIMARY KEY (sno, cname),
    FOREIGN KEY (sno) REFERENCES Student(sno),
    FOREIGN KEY (cname) REFERENCES Course(cname)
);
```

- **Explanation:**  
  - Each table has a primary key.
  - `Course.fid` is a foreign key referencing `Faculty(fid)`.
  - `Enrolled.sno` and `Enrolled.cname` are foreign keys referencing `Student(sno)` and `Course(cname)` respectively.

---

#### b) **Exemplify the violation of various integrity constraints caused by each of the three types of update operations.**  
**CO1 [10 Marks]**

- **Insert Operation:**
  - **Violation of Domain Constraint:**  
    Inserting a student with `age = 'twenty'` (a string instead of integer) violates the domain constraint.
  - **Violation of Key Constraint:**  
    Inserting a duplicate `sno` in `Student` table violates the key constraint.
  - **Violation of Entity Integrity:**  
    Inserting a record with a NULL primary key (e.g., `sno = NULL`) violates entity integrity.

- **Delete Operation:**
  - **Violation of Referential Integrity:**  
    Deleting a `Student` whose `sno` is referenced in `Enrolled` table will cause the foreign key in `Enrolled` to point to a non-existent `Student`, violating referential integrity.

- **Update Operation:**
  - **Violation of Domain Constraint:**  
    Updating `age` to a value outside its allowed domain.
  - **Violation of Key Constraint:**  
    Updating a primary key value to a value that already exists in another row.
  - **Violation of Entity Integrity:**  
    Updating a primary key attribute to NULL.

---

## UNIT – II

### 3.
#### a) **SQL Queries for Employee, Department, Project relations**  
**CO2 [10 Marks]**

**i) List the employee names and their corresponding department names in which they work.**
```sql
SELECT E.name, D.dname
FROM Employee E
JOIN Department D ON E.deptno = D.deptno;
```

**ii) Display the total salary of employees of each Department.**
```sql
SELECT D.dname, SUM(E.salary) AS total_salary
FROM Employee E
JOIN Department D ON E.deptno = D.deptno
GROUP BY D.dname;
```

**iii) Display the salary of employees of ‘Research’ department after a 10 percent raise.**
```sql
SELECT E.name, E.salary * 1.10 AS increased_salary
FROM Employee E
JOIN Department D ON E.deptno = D.deptno
WHERE D.dname = 'Research';
```

**iv) Display the sum, maximum, minimum, and average salary of all employees.**
```sql
SELECT SUM(salary) AS total_salary,
       MAX(salary) AS max_salary,
       MIN(salary) AS min_salary,
       AVG(salary) AS avg_salary
FROM Employee;
```

---

#### b) **Distinguish between procedures and functions. Write a procedure that decreases the salary for all employees by 10 percent who earn more than Rs. 10,000.**  
**CO2 [10 Marks]**

**Procedures vs Functions:**

| Feature        | Procedure                           | Function                                   |
|----------------|------------------------------------|--------------------------------------------|
| Return Value   | Cannot return value directly        | Must return a value                        |
| Usage          | Used to perform tasks or operations | Used mainly for computations               |
| Invocation     | Called as a statement               | Can be called in a SELECT statement        |
| DML Allowed    | Can perform INSERT/UPDATE/DELETE    | Generally not used for DML                 |

**Procedure Example:**
```sql
CREATE PROCEDURE ReduceHighSalary()
BEGIN
    UPDATE Employee
    SET salary = salary * 0.9
    WHERE salary > 10000;
END;
```
- This procedure reduces the salary of all employees earning more than Rs. 10,000 by 10%.

---

### 4.
#### a) **SQL Queries for the Bank Database**  
**CO2 [10 Marks]**

i) **Find the names of all branches located in "Chicago".**
```sql
SELECT branch_name
FROM Branch
WHERE branch_city = 'Chicago';
```

ii) **Find the names of all borrowers who have a loan in branch "Downhil".**
```sql
SELECT DISTINCT Borrower.customer_name
FROM Borrower
JOIN Loan ON Borrower.loan_number = Loan.loan_number
WHERE Loan.branch_name = 'Downhil';
```

iii) **List the names of all branches with customers who have an account in the bank and who live in Harrison.**
```sql
SELECT DISTINCT Account.branch_name
FROM Account
JOIN Depositor ON Account.account_no = Depositor.account_number
JOIN Customer ON Depositor.customer_name = Customer.customer_name
WHERE Customer.customer_city = 'Harrison';
```

iv) **Count the number of customers who have an account.**
```sql
SELECT COUNT(DISTINCT customer_name) AS num_customers
FROM Depositor;
```

---

#### b) **List and briefly explain the various types of blocks in PL/SQL.**  
**CO2 [6 Marks]**

- **Anonymous Block:**  
  Unnamed PL/SQL block, not stored in the database. Used for ad-hoc operations.
  ```sql
  DECLARE
    x NUMBER := 10;
  BEGIN
    DBMS_OUTPUT.PUT_LINE(x);
  END;
  ```

- **Procedure:**  
  Named block stored in the database, used for repetitive tasks. Can accept parameters.
  ```sql
  CREATE PROCEDURE proc_name IS ... END;
  ```

- **Function:**  
  Named block that returns a value and can be used in SQL expressions.
  ```sql
  CREATE FUNCTION func_name RETURN datatype IS ... END;
  ```

- **Package:**  
  Collection of procedures, functions, variables, stored as a single unit.
  ```sql
  CREATE PACKAGE pkg_name IS ... END;
  ```

- **Trigger:**  
  Block executed automatically in response to certain events on a table or view.
  ```sql
  CREATE TRIGGER trg_name BEFORE INSERT ON table_name ... END;
  ```

---

#### c) **Illustrate the use of Aggregate functions in SQL.**  
**CO2 [4 Marks]**

Aggregate functions perform calculations on a set of values and return a single value.

- **COUNT:** Returns the number of rows.
- **SUM:** Returns the sum of a numeric column.
- **AVG:** Returns the average value.
- **MAX/MIN:** Returns the maximum/minimum value.

**Example:**
```sql
SELECT COUNT(*) AS total_accounts,
       SUM(balance) AS total_balance,
       AVG(balance) AS avg_balance,
       MAX(balance) AS max_balance,
       MIN(balance) AS min_balance
FROM Account;
```

---

## UNIT – III

### 5.
#### a) **Four informal guidelines for assessing relational schema design quality:**  
**CO3 [10 Marks]**

1. **Semantics of Attributes:**  
   Ensure that each attribute describes a property of the entity or relationship it belongs to. Attributes should not be arbitrarily assigned.

2. **Reduce Redundancy:**  
   Avoid storing the same information in more than one place. Redundancy can lead to anomalies during insertion, deletion, and updating.

3. **Avoid Null Values:**  
   Design schemas to minimize attributes that may take null values, as nulls often indicate missing or inapplicable information.

4. **Avoid Spurious Tuples:**  
   When joining relations, ensure that only meaningful combinations are produced. Poor design may result in spurious tuples when performing joins.

---

#### b) **ER model for the described company database. Key attributes and structural constraints:**  
**CO3 [10 Marks]**

**Entities:**
- **Employee** (`ssn` as primary key, name, etc.)
- **Department** (`deptno` as primary key, dname, etc.)
- **Project** (`Pno` as primary key, pname, etc.)
- **Dependent** (dependent_id, name, ssn as foreign key)

**Relationships:**
- **Works_For:** Employee (many) to Department (one)
- **Manages:** Employee (one) to Department (one)
- **Controls:** Department (one) to Project (many)
- **Works_On:** Employee (many) to Project (many), attribute: hours
- **Has_Dependent:** Employee (one) to Dependent (many)
- **Supervises:** Employee supervises another Employee

**Structural Constraints:**
- **Employee-Department (Works_For):** Many-to-One
- **Department-Project (Controls):** One-to-Many
- **Employee-Project (Works_On):** Many-to-Many

**Key Attributes:**
- Employee: `ssn`
- Department: `deptno`
- Project: `Pno`
- Dependent: `dependent_id`

**ER Diagram:**  
(Draw entities as rectangles, relationships as diamonds, connect with lines, and indicate keys with underlines. Show attributes and relationship cardinalities.)

---

### 6.
#### a) **Phases of Database Design Process with diagram:**  
**CO3 [10 Marks]**

1. **Requirements Analysis:**  
   Gather user requirements, identify what data needs to be stored, and what queries will be required.

2. **Conceptual Design:**  
   Create an Entity-Relationship (ER) model representing entities, relationships, and constraints.

3. **Logical Design:**  
   Convert the ER model into a relational schema (tables, keys, relationships).

4. **Physical Design:**  
   Decide on storage structures, indexing, and access paths for efficient data retrieval.

**Diagram:**  
```
User Requirements
       |
       V
Conceptual Design (ER Diagram)
       |
       V
Logical Design (Relational Schema)
       |
       V
Physical Design (Storage Structures)
```

---

#### b) **When is the concept of weak entity type used? Define owner entity type and partial key.**  
**CO3 [5 Marks]**

- **Weak Entity Type:**  
  Used when an entity cannot be uniquely identified by its own attributes alone and needs a foreign key from another (owner) entity.

- **Owner Entity Type:**  
  The entity that provides the primary key for the weak entity. For example, in a "Payment" entity dependent on "Order," Order is the owner.

- **Partial Key:**  
  An attribute of a weak entity that can uniquely identify the entity when combined with the primary key of the owner entity.

---

#### c) **Bring the following relation into First Normal Form (1NF):**

| Dname      | Dnumber | Dmgr_ssn  | Dlocation                   |
|------------|---------|-----------|-----------------------------|
| Research   | 5       | 345599100 | {Bellaire,Sugarland,Houston}|
| Admin      | 4       |           | stafford                    |
| Headoffice | 1       | 985674900 | {Houston,Texas}             |

**Solution:**  
In 1NF, all attributes must have atomic (indivisible) values. Multi-valued attributes must be split into separate rows.

| Dname      | Dnumber | Dmgr_ssn  | Dlocation   |
|------------|---------|-----------|-------------|
| Research   | 5       | 345599100 | Bellaire    |
| Research   | 5       | 345599100 | Sugarland   |
| Research   | 5       | 345599100 | Houston     |
| Admin      | 4       |           | stafford    |
| Headoffice | 1       | 985674900 | Houston     |
| Headoffice | 1       | 985674900 | Texas       |

---

## UNIT – IV

### 7.
#### a) **Object Oriented Database Concepts. What is an Object Oriented Data model? Features?**  
**CO4 [10 Marks]**

- **Object Oriented Database (OODB):**  
  A database that incorporates all the important object-oriented concepts such as encapsulation, inheritance, and polymorphism.

- **Object Oriented Data Model (OODM):**  
  Represents data as objects, similar to object-oriented programming. Objects encapsulate both data (attributes) and behaviors (methods).

**Main Features:**
- **Encapsulation:** Bundles data and methods.
- **Inheritance:** Subclasses inherit properties/methods from parent classes.
- **Polymorphism:** Same operation can be applied to different objects.
- **Complex objects:** Supports composite and nested objects.
- **Identity:** Each object has a unique identity (OID).
- **Persistence:** Objects outlive the program execution.

---

#### b) **Discuss Data Fragmentation and Sharding. Explain the different techniques of data fragmentation.**  
**CO4 [10 Marks]**

- **Data Fragmentation:**  
  Dividing a database into smaller pieces (fragments) for distribution across multiple sites or servers, improving performance and availability.

- **Types of Fragmentation:**
    - **Horizontal Fragmentation:**  
      Divides a table into subsets of rows (tuples), each fragment contains a subset of records.
      - *Example:* Split an Employee table by location.
    - **Vertical Fragmentation:**  
      Divides a table into subsets of columns (attributes), each fragment contains different attributes.
      - *Example:* Split Employee table into personal info and job info.
    - **Hybrid/Mixed Fragmentation:**  
      Combination of horizontal and vertical fragmentation.

- **Sharding:**  
  A form of horizontal fragmentation where each shard is stored on a separate database server to scale out and distribute load.

---

### 8.
#### a) **Describe any two distributed database architectures with diagrams.**  
**CO4 [10 Marks]**

1. **Client-Server Architecture:**
    - **Description:**  
      Clients send requests to a central server, which processes and returns data.
    - **Diagram:**  
      ```
      [Client 1]           [Client 2]
          |                    |
          +-----[Server]-------+
      ```

2. **Peer-to-Peer (P2P) Architecture:**
    - **Description:**  
      All nodes act as both clients and servers, sharing data directly.
    - **Diagram:**  
      ```
      [Peer 1]---[Peer 2]
        |           |
      [Peer 3]-----[Peer 4]
      ```

---

#### b) **Describe HBase, Cassandra DB, database systems with appropriate diagrams.**  
**CO4 [10 Marks]**

- **HBase:**
    - Distributed, column-oriented store built on top of Hadoop HDFS.
    - Supports large tables with billions of rows and millions of columns.
    - **Architecture:**  
      - Clients interact with RegionServers.
      - HMaster manages RegionServers.
      - Data is stored in HDFS.
    - **Diagram:**  
      ```
      [Client] -> [RegionServer] -> [HDFS]
                       ^
                     [HMaster]
      ```

- **Cassandra:**
    - Distributed NoSQL DB, supports high availability and scalability.
    - Decentralized, peer-to-peer architecture.
    - Data is partitioned and replicated across nodes.
    - **Diagram:**  
      ```
      [Node 1]---[Node 2]---[Node 3]---[Node 4]
         |         |           |          |
          ---------------------------------
      ```

---

## UNIT-V

### 9.
#### a) **Exemplify MongoDB CRUD Operations.**  
**CO5 [10 Marks]**

- **Create:**  
  ```js
  db.students.insertOne({ name: "John", age: 22 });
  ```
- **Read:**  
  ```js
  db.students.find({ name: "John" });
  ```
- **Update:**  
  ```js
  db.students.updateOne({ name: "John" }, { $set: { age: 23 } });
  ```
- **Delete:**  
  ```js
  db.students.deleteOne({ name: "John" });
  ```

---

#### b) **Discuss the different stages of MongoDB Aggregation Pipeline.**  
**CO5 [10 Marks]**

- **$match:** Filters documents as per criteria.
- **$group:** Groups documents by specified fields and performs aggregations.
- **$project:** Modifies the structure of documents.
- **$sort:** Sorts the documents.
- **$limit:** Limits the number of documents.
- **$skip:** Skips the specified number of documents.
- **$unwind:** Deconstructs an array field.
- **$lookup:** Performs a left outer join with another collection.

**Example Usage:**
```js
db.orders.aggregate([
  { $match: { status: "A" } },
  { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
]);
```

---

### 10.
#### a) **Explain the implementation of Map-Reduce in MongoDB using an example.**  
**CO5 [10 Marks]**

**Map-Reduce** is used for processing large data sets by dividing the task into two phases:  
- **Map:** Processes each document and emits key-value pairs.
- **Reduce:** Aggregates values for each key.

**Example:** Count the number of orders per customer.

```js
db.orders.mapReduce(
  function() { emit(this.cust_id, 1); }, // Map function
  function(key, values) { return Array.sum(values); }, // Reduce function
  { out: "orderCounts" }
)
```
- This will output a collection `orderCounts` with customer IDs and their order counts.

---

#### b) **List any five datatypes supported by MongoDB with examples.**  
**CO5 [10 Marks]**

1. **String:**  
   `"name": "Alice"`

2. **NumberInt/NumberDouble:**  
   `"age": 25`  
   `"score": 99.5`

3. **Boolean:**  
   `"active": true`

4. **Date:**  
   `"dob": new Date("1990-01-01")`

5. **Array:**  
   `"skills": ["Java", "Python", "C++"]`

---

**End of Detailed Answers**