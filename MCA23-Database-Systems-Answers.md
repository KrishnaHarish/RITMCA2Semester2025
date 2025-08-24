# MCA23 – Database Systems
Semester End Examinations – Sept/Oct 2023  
Program: MCA | Semester: II | Course Code: MCA23

This document contains concise, exam-ready answers organized by Units and Questions.

---

## UNIT I

### 1(a) What is a Database? Describe the database architecture.
- Database: A shared, integrated collection of logically related data, with a description (schema), designed to support organizational information needs.

- ANSI/SPARC three-level architecture:
  - External level: Multiple user views (subschemas).
  - Conceptual level: Community view; logical global schema independent of physical storage.
  - Internal level: Physical storage structures and access paths.

- Data independence:
  - Logical: Change conceptual schema without changing views.
  - Physical: Change internal schema without changing conceptual or external schemas.

- DBMS Components:
  - DDL/DML compilers, query optimizer/executor, transaction manager (concurrency & recovery), buffer manager, storage manager, catalog manager.

Diagram (conceptual):
```
Users/Applications
   -> External Schemas (Views)
   -> Conceptual Schema (Logical)
   -> Internal Schema (Physical)
   -> Storage (Files/Indexes)
```

### 1(b) Schema-based constraints with examples
- Domain constraint: Attribute values must come from a defined domain.
  - Example: age INTEGER CHECK (age BETWEEN 16 AND 80). Inserting age = 200 violates domain.

- Key constraint: Candidate key values must be unique; primary key uniquely identifies a tuple.
  - Example: Student(sno PRIMARY KEY). Inserting duplicate sno violates key constraint.

- Entity integrity constraint: Primary key attributes cannot be NULL.
  - Example: Inserting Student with sno = NULL violates entity integrity.

### 2(a) SQL DDL with keys and foreign keys
```sql
CREATE TABLE Faculty (
  fid      INTEGER PRIMARY KEY,
  fname    VARCHAR(100) NOT NULL,
  deptid   INTEGER
);

CREATE TABLE Student (
  sno     INTEGER PRIMARY KEY,
  sname   VARCHAR(100) NOT NULL,
  major   VARCHAR(100),
  level   VARCHAR(20),
  age     INTEGER CHECK (age >= 0)
);

CREATE TABLE Course (
  cname    VARCHAR(100) PRIMARY KEY,
  meetsat  TIME,
  room     VARCHAR(50),
  fid      INTEGER,
  CONSTRAINT fk_course_faculty
    FOREIGN KEY (fid) REFERENCES Faculty(fid)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);

CREATE TABLE Enrolled (
  sno    INTEGER,
  cname  VARCHAR(100),
  PRIMARY KEY (sno, cname),
  CONSTRAINT fk_enrolled_student
    FOREIGN KEY (sno) REFERENCES Student(sno)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT fk_enrolled_course
    FOREIGN KEY (cname) REFERENCES Course(cname)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);
```

### 2(b) Integrity violations via update operations
- INSERT:
  - Domain: INSERT Student(sno, age) VALUES (1, -5).
  - Key: INSERT duplicate primary key sno.
  - Referential: INSERT Enrolled(sno=999, cname='DB') when sno=999 not in Student.

- UPDATE:
  - Domain: UPDATE Student SET level = RPAD('X', 1000, 'X') violates length/domain.
  - Key: UPDATE Student SET sno = existing sno duplicates PK.
  - Referential: UPDATE Course SET fid=777 when no Faculty(777) exists.

- DELETE:
  - Referential: DELETE Faculty WHERE fid=10 while Course rows reference fid=10; violates FK unless ON DELETE action permits (RESTRICT/SET NULL/CASCADE).

---

## UNIT II

### 3(a) SQL queries
Assume: Employee(ssn, name, salary, deptno), Department(deptno, dname, mgrssn), Project(pno, pname, deptno).

i) Employee names with department names:
```sql
SELECT e.name, d.dname
FROM Employee e
JOIN Department d ON e.deptno = d.deptno;
```

ii) Total salary per department:
```sql
SELECT d.deptno, d.dname, SUM(e.salary) AS total_salary
FROM Department d
LEFT JOIN Employee e ON e.deptno = d.deptno
GROUP BY d.deptno, d.dname;
```

iii) Salaries of Research dept after 10% raise (display only):
```sql
SELECT e.name,
       e.salary AS old_salary,
       ROUND(e.salary * 1.10, 2) AS new_salary
FROM Employee e
JOIN Department d ON d.deptno = e.deptno
WHERE d.dname = 'Research';
```

iv) Sum, max, min, avg salaries:
```sql
SELECT SUM(salary) AS total_salary,
       MAX(salary) AS max_salary,
       MIN(salary) AS min_salary,
       AVG(salary) AS avg_salary
FROM Employee;
```

### 3(b) Procedures vs Functions; procedure to decrease salaries
- Procedure: Action-oriented, may return via OUT params; invoked as a statement; can do DML.
- Function: Returns a single value; can be used in SQL expressions; typically side-effect-free.

PL/SQL procedure:
```sql
CREATE OR REPLACE PROCEDURE reduce_high_salaries AS
BEGIN
  UPDATE Employee
  SET salary = ROUND(salary * 0.90, 2)
  WHERE salary > 10000;
END;
/
BEGIN
  reduce_high_salaries;
END;
/
```

### 4(a) Bank DB queries
Given: Account(account_no, branch_name, balance)
Branch(branch_name, branch_city, assets)
Customer(customer_name, customer_street, customer_city)
Borrower(customer_name, loan_number)
Loan(loan_number, branch_name, amount)
Depositor(customer_name, account_number)

i) Branches in Chicago:
```sql
SELECT branch_name
FROM Branch
WHERE branch_city = 'Chicago';
```

ii) Borrowers with a loan in 'Downhil':
```sql
SELECT DISTINCT b.customer_name
FROM Borrower b
JOIN Loan l ON l.loan_number = b.loan_number
WHERE l.branch_name = 'Downhil';
```

iii) Branches with customers who have an account and live in Harrison:
```sql
SELECT DISTINCT br.branch_name
FROM Branch br
JOIN Account a ON a.branch_name = br.branch_name
JOIN Depositor d ON d.account_number = a.account_no
JOIN Customer c ON c.customer_name = d.customer_name
WHERE c.customer_city = 'Harrison';
```

iv) Count customers who have an account:
```sql
SELECT COUNT(DISTINCT d.customer_name) AS num_customers_with_account
FROM Depositor d;
```

### 4(b) Types of PL/SQL blocks
- Anonymous block: DECLARE (opt) -> BEGIN -> EXCEPTION (opt) -> END;
- Procedures and Functions (named subprograms);
- Packages (spec and body);
- Triggers (on DML/DDL/events);
- Nested blocks; explicit exception blocks.

### 4(c) Aggregate functions in SQL
- SUM, AVG, MIN, MAX, COUNT with GROUP BY/HAVING.
Examples:
```sql
SELECT branch_name, COUNT(*) AS num_accts, SUM(balance) AS total_bal
FROM Account
GROUP BY branch_name
HAVING SUM(balance) > 100000;

SELECT AVG(salary) FROM Employee;
SELECT MIN(amount), MAX(amount) FROM Loan;
```

---

## UNIT III

### 5(a) Informal design guidelines
- Clear semantics: Each relation models a single, well-defined entity/relationship.
- Avoid redundancy and anomalies: Prevent insertion/deletion/update anomalies; avoid storing derivable data.
- Minimize nulls: Decompose so that optional/rarely applicable attributes are separated.
- Avoid spurious tuples: Use lossless-join, dependency-preserving decompositions; choose stable, minimal keys.

### 5(b) ER model (textual specification)
- Entities:
  - Department(dept_id PK, name, location)
  - Employee(emp_id PK, name, title, salary, supervisor_id FK→Employee.emp_id nullable)
  - Project(proj_id PK, name, budget)
  - Dependent (weak): (emp_id FK, dep_name partial key, relationship, birthdate). PK = (emp_id, dep_name)

- Relationships and constraints:
  - Controls: Department 1 — N Project (dept_id FK in Project)
  - Works_for: Employee N — 1 Department (dept_id FK in Employee; total participation on Employee)
  - Manages: Department 1 — 1 Employee (mgr_id FK in Department; attribute start_date; total on Department)
  - Works_on: Employee M — N Project with attribute hours (associative entity Works_on(emp_id, proj_id, hours))
  - Supervises: Employee 1 — N Employee (recursive via supervisor_id)
  - Has_dependent: Employee 1 — N Dependent (identifying relationship)

### 6(a) Phases of database design
- Requirements analysis
- Conceptual design (ER/EER)
- Logical design (mapping to relational, keys/constraints)
- Schema refinement (normalization: 1NF, 2NF, 3NF/BCNF)
- Physical design (indexes, partitioning, storage)
- Implementation and tuning (security, views, triggers, monitoring)
- Plus: DBMS selection, backup/recovery strategy, application design.

### 6(b) Weak entity concepts
- Weak entity: Cannot be uniquely identified by its own attributes; depends on an owner entity via identifying relationship.
- Owner entity type: Strong entity providing part of the identifying key.
- Partial key: Attributes of weak entity that, with owner’s key, uniquely identify instances.

### 6(c) Convert relation to 1NF
Issue: Multivalued attribute Dlocation = {…}.

1NF by repeating per location:
- (Research, 5, 345599100, Bellaire)
- (Research, 5, 345599100, Sugarland)
- (Research, 5, 345599100, Houston)
- (Admin, 4, stafford, stafford)  [assuming example; otherwise use correct Dmgr_ssn/NULL]
- (Headoffice, 1, 985674900, Houston)
- (Headoffice, 1, 985674900, Texas)

Preferred decomposition:
- Department(Dname, Dnumber, Dmgr_ssn)
- Dept_Location(Dnumber, Dlocation)

---

## UNIT IV

### 7(a) Object-Oriented DB concepts and OODM features
- Concepts:
  - Object with OID (identity), state (attributes), behavior (methods)
  - Class, encapsulation, inheritance, polymorphism, dynamic binding
  - Complex/nested types; references; persistence

- OODM features:
  - OIDs, user-defined/complex types (sets, lists, tuples), methods stored with data
  - Constraints, versioning, navigational and declarative querying

### 7(b) Data fragmentation and sharding
- Fragmentation (in DDBMS):
  - Horizontal: Row subsets by predicates (e.g., region = 'West')
  - Vertical: Column subsets, typically including key
  - Hybrid/mixed: Combination
  - Derived: Child fragmentation based on parent to preserve locality of joins

- Sharding:
  - Large-scale horizontal partitioning across nodes
  - Techniques: Range-based, hash-based, directory/consistent hashing
  - Often combined with per-shard replication for HA; automatic rebalancing

### 8(a) Distributed database architectures
- Client-Server:
  - Clients send SQL; server executes; centralized control
  - Pros: Simpler management; Cons: Server bottlenecks

- Peer-to-Peer (Shared-Nothing):
  - Nodes are peers; partition/replicate data; coordinate for queries/transactions
  - Pros: Scalability, availability; Cons: Complexity for consistency

- Alternatives: Federated/mediated systems via wrappers and mediator.

### 8(b) HBase and Cassandra summaries
- HBase:
  - Wide-column store on HDFS (Bigtable-like). Tables → column families → columns. Sparse, MVCC.
  - Architecture: HMaster, RegionServers, ZooKeeper; strong consistency per row; range scans by row key.

- Cassandra:
  - Wide-column store. Keyspace→Table; partition key determines placement; clustering columns order within partition.
  - Architecture: Peer-to-peer ring, consistent hashing, replication across DCs, gossip, hinted handoff, repair.
  - Strengths: High write throughput, availability, linear scalability, tunable consistency.

---

## UNIT V

### 9(a) MongoDB CRUD operations
- Create:
```javascript
db.students.insertOne({ _id: 1, name: "Asha", dept: "CSE", gpa: 8.7 });
db.students.insertMany([
  { _id: 2, name: "Ravi", dept: "ECE", gpa: 7.9 },
  { _id: 3, name: "Meera", dept: "CSE", gpa: 9.1 }
]);
```

- Read:
```javascript
db.students.find({ dept: "CSE" });
db.students.find({ gpa: { $gte: 9 } }, { name: 1, gpa: 1, _id: 0 });
db.students.findOne({ _id: 1 });
```

- Update:
```javascript
db.students.updateOne({ _id: 2 }, { $set: { gpa: 8.2 } });
db.students.updateMany({ dept: "CSE" }, { $inc: { gpa: 0.1 } });
db.students.replaceOne({ _id: 3 }, { name: "Meera", dept: "CSE", gpa: 9.2, year: 2 });
```

- Delete:
```javascript
db.students.deleteOne({ _id: 1 });
db.students.deleteMany({ gpa: { $lt: 6.0 } });
```

### 9(b) MongoDB Aggregation Pipeline stages
Common stages:
- $match, $project, $addFields/$set, $unwind, $group, $sort, $limit/$skip
- $lookup, $graphLookup
- $replaceRoot/$replaceWith
- $facet
- $bucket/$bucketAuto
- $out/$merge

Example:
```javascript
db.students.aggregate([
  { $match: { dept: "CSE" } },
  { $group: { _id: "$dept", avgGpa: { $avg: "$gpa" }, count: { $sum: 1 } } },
  { $sort: { avgGpa: -1 } }
]);
```

### 10(a) Map-Reduce in MongoDB example (total sales per category)
```javascript
var map = function () {
  if (this.items) {
    this.items.forEach(it => emit(it.category, it.price * it.quantity));
  }
};

var reduce = function (key, values) {
  return Array.sum(values);
};

db.orders.mapReduce(
  map,
  reduce,
  {
    out: { inline: 1 }, // or { replace: "sales_by_category" }
    query: { status: "DELIVERED" }
  }
);

// Example order document:
// { _id: 1, status: "DELIVERED", items: [
//   { category: "Books", price: 500, quantity: 2 },
//   { category: "Toys",  price: 300, quantity: 1 }
// ] }
```

### 10(b) MongoDB data types (examples)
- String: `{ name: "Asha" }`
- Numbers (int/double/long/decimal): `{ age: 22, cgpa: 8.5, big: NumberLong("9007199254740993"), price: NumberDecimal("12345.67") }`
- Boolean: `{ active: true }`
- Date: `{ joinedAt: ISODate("2025-08-24T15:38:14Z") }`
- Array and Object: `{ skills: ["java", "sql"], address: { city: "Bengaluru", zip: "560001" } }`
Other types: ObjectId, Null, Binary, Timestamp, Regex.

---
Last updated: 2025-08-24 15:38:14 UTC
Author: KrishnaHarish