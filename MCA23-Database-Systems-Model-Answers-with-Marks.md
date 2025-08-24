# MCA23 – Database Systems (Model Answers with Mark Breakdown)
Semester End Examinations – Sept/Oct 2023  
Program: MCA | Semester: II | Course Code: MCA23

Note: Each sub-answer includes a clear mark allocation so every mark is accounted for.

---

## UNIT I

### 1(a) What is a Database? Describe with a neat diagram the database architecture. (10 marks)

- Definition of Database and DBMS purpose (2 marks)
  - A database is a structured, shared, integrated collection of logically related data with a schema, managed by a DBMS to provide storage, retrieval, security, concurrency, and recovery. [2]

- ANSI/SPARC three-level architecture (4 marks)
  - External level: Multiple user views (subschemas). [1]
  - Conceptual level: Community-wide logical schema, independent of physical storage. [1.5]
  - Internal level: Physical schema—files, pages, indexes, and access paths. [1.5]

- Data independence (2 marks)
  - Logical data independence: Change conceptual schema without altering external schemas. [1]
  - Physical data independence: Change internal schema without altering conceptual/external schemas. [1]

- Core DBMS components + neat diagram (2 marks)
  - DDL/DML compilers, query optimizer & executor, transaction manager (concurrency & recovery), buffer/storage manager, catalog/authorization managers. [1]
  - Diagram (conceptual): [1]
    ```
    Users/Apps
       └─ External Schemas (Views)
            └─ Conceptual Schema (Logical)
                 └─ Internal Schema (Physical)
                      └─ Storage (Files, Indexes, Pages)
    ```

---

### 1(b) Domain constraint, Key constraint, Entity integrity constraint with examples. (10 marks)

- Domain constraint (3 marks)
  - Definition: Attribute values must come from a defined domain (type, range, format). [1.5]
  - Example: age INTEGER CHECK (age BETWEEN 16 AND 80); INSERT age=200 violates. [1.5]

- Key constraint (3 marks)
  - Definition: Candidate key values unique; primary key uniquely identifies tuples. [1.5]
  - Example: Student(sno PRIMARY KEY); two rows with sno=101 violate. [1.5]

- Entity integrity constraint (3 marks)
  - Definition: Primary key attributes cannot be NULL. [1.5]
  - Example: INSERT INTO Student(sno,... ) VALUES (NULL,...) violates entity integrity. [1.5]

- Cohesion/contrast note (1 mark)
  - Distinction: Key enforces uniqueness; entity integrity forbids NULL in PK; domain controls valid values. [1]

---

### 2(a) Create relations with primary and foreign key constraints. (10 marks)

- Faculty table with PK (2 marks)
- Student table with PK and a domain check (2 marks)
- Course table with PK and FK to Faculty (ON DELETE/UPDATE action) (3 marks)
- Enrolled table with composite PK and FKs to Student and Course (3 marks)

```sql
CREATE TABLE Faculty (
  fid    INTEGER PRIMARY KEY,
  fname  VARCHAR(100) NOT NULL,
  deptid INTEGER
);

CREATE TABLE Student (
  sno    INTEGER PRIMARY KEY,
  sname  VARCHAR(100) NOT NULL,
  major  VARCHAR(100),
  level  VARCHAR(20),
  age    INTEGER CHECK (age >= 0)
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

---

### 2(b) Violation of integrity constraints by update operations. (10 marks)

- INSERT (3.5 marks)
  - Domain violation example (negative age). [1.2]
  - Key violation example (duplicate PK). [1.2]
  - Referential violation example (FK to non-existent parent). [1.1]

- UPDATE (3.5 marks)
  - Domain violation example (oversized string/invalid type). [1.2]
  - Key violation example (changing PK to duplicate). [1.2]
  - Referential violation example (setting FK to non-existent parent). [1.1]

- DELETE (3 marks)
  - Referential violation example (delete parent with referencing children under RESTRICT/NO ACTION). [2]
  - Note: Entity integrity targets PK NULLs; DELETE does not create PK NULLs but may cause dangling FKs if constraints disabled. [1]

Example statements (illustrative, not marked separately):
```sql
-- INSERT violations
INSERT INTO Student(sno, sname, age) VALUES (1, 'Asha', -5);
INSERT INTO Student(sno, sname) VALUES (1, 'Dup'); -- if 1 exists
INSERT INTO Enrolled(sno, cname) VALUES (999, 'DB'); -- no Student 999

-- UPDATE violations
UPDATE Student SET sno = 1 WHERE sno = 2; -- if 1 exists
UPDATE Course SET fid = 777 WHERE cname = 'DB'; -- no Faculty 777

-- DELETE violation
DELETE FROM Faculty WHERE fid = 10; -- referenced by Course(fid=10) with RESTRICT
```

---

## UNIT II

### 3(a) SQL queries on Employee/Department/Project. (10 marks)

- i) Employee names with their department names (2.5 marks)
```sql
SELECT e.name, d.dname
FROM Employee e
JOIN Department d ON e.deptno = d.deptno;
```

- ii) Total salary of employees of each Department (2.5 marks)
```sql
SELECT d.deptno, d.dname, SUM(e.salary) AS total_salary
FROM Department d
LEFT JOIN Employee e ON e.deptno = d.deptno
GROUP BY d.deptno, d.dname;
```

- iii) Salary of ‘Research’ employees after 10% raise (display) (2.5 marks)
```sql
SELECT e.name,
       e.salary AS old_salary,
       ROUND(e.salary * 1.10, 2) AS new_salary
FROM Employee e
JOIN Department d ON d.deptno = e.deptno
WHERE d.dname = 'Research';
```

- iv) Sum, max, min, average salary (2.5 marks)
```sql
SELECT SUM(salary) AS total_salary,
       MAX(salary) AS max_salary,
       MIN(salary) AS min_salary,
       AVG(salary) AS avg_salary
FROM Employee;
```

---

### 3(b) Distinguish procedures vs functions; procedure to decrease salary. (10 marks)

- Distinctions (4 marks)
  - Procedure: Invoked as a statement; can have IN/OUT/INOUT params; may perform DML and transaction control (DBMS policy). [2]
  - Function: Returns a single value; can be used in SQL expressions; generally side-effect-free and no transaction control. [2]

- PL/SQL procedure to reduce salaries > 10,000 by 10% (6 marks)
  - Correct CREATE PROCEDURE syntax (2)
  - UPDATE logic with condition and rounding (3)
  - Invocation example (1)

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

---

### 4(a) Bank database queries. (10 marks)

- i) Branches located in “Chicago” (2.5 marks)
```sql
SELECT branch_name
FROM Branch
WHERE branch_city = 'Chicago';
```

- ii) Borrowers who have a loan in branch “Downhil” (2.5 marks)
```sql
SELECT DISTINCT b.customer_name
FROM Borrower b
JOIN Loan l ON l.loan_number = b.loan_number
WHERE l.branch_name = 'Downhil';
```

- iii) Branches with customers who have an account and live in Harrison (2.5 marks)
```sql
SELECT DISTINCT br.branch_name
FROM Branch br
JOIN Account a   ON a.branch_name = br.branch_name
JOIN Depositor d ON d.account_number = a.account_no
JOIN Customer c  ON c.customer_name = d.customer_name
WHERE c.customer_city = 'Harrison';
```

- iv) Count the number of customers who have an account (2.5 marks)
```sql
SELECT COUNT(DISTINCT d.customer_name) AS num_customers_with_account
FROM Depositor d;
```

---

### 4(b) Types of PL/SQL blocks. (6 marks)

- Overview: What is a PL/SQL block (0.5 mark)
- Anonymous block: structure and use (1.0 mark)
- Procedure: named subprogram (1.0 mark)
- Function: named subprogram returning value (1.0 mark)
- Package: spec and body, grouping related subprograms (1.0 mark)
- Trigger: fires on DML/DDL/system events (1.0 mark)
- Note: Nested blocks/exceptions can appear within any block (0.5 mark)

Anonymous block skeleton:
```sql
DECLARE
  -- declarations
BEGIN
  -- statements
EXCEPTION
  -- handlers
END;
/
```

---

### 4(c) Aggregate functions in SQL. (4 marks)

- Identify core aggregates: COUNT, SUM, AVG, MIN, MAX (1 mark)
- GROUP BY + HAVING example (2 marks)
- Additional simple aggregate usage (1 mark)

```sql
-- Example with GROUP BY and HAVING
SELECT branch_name,
       COUNT(*)      AS num_accts,
       SUM(balance)  AS total_bal
FROM Account
GROUP BY branch_name
HAVING SUM(balance) > 100000;

-- Simple aggregates
SELECT AVG(salary) AS avg_sal, MIN(salary) AS min_sal, MAX(salary) AS max_sal
FROM Employee;
```

---

## UNIT III

### 5(a) Four informal guidelines for relational schema quality. (10 marks)

- Clear semantics: Each relation models a single, well-defined entity/relationship. [2.5]
- Avoid redundancy/anomalies: Prevent insertion, deletion, update anomalies; avoid storing derivable data. [2.5]
- Minimize nulls: Decompose to isolate optional/rare attributes. [2.5]
- Avoid spurious tuples: Use lossless-join, dependency-preserving decompositions; choose suitable keys. [2.5]

---

### 5(b) ER model for Company database; key attrs and structural constraints. (10 marks)

- Entities and key attributes (3 marks)
  - Department(dept_id PK, name, location) [1]
  - Employee(emp_id PK, name, title, salary, supervisor_id FK→Employee.emp_id NULLABLE) [1]
  - Project(proj_id PK, name, budget) [0.5]
  - Dependent (weak): PK = (emp_id, dep_name), attrs: relationship, birthdate [0.5]

- Relationships and constraints (5 marks)
  - Controls: Department(1) — (N) Project; Project.dept_id FK. [1]
  - Works_for: Employee(N) — (1) Department; Employee.dept_id FK; total participation on Employee. [1]
  - Manages: Department(1) — (1) Employee; Department.mgr_id FK; attribute start_date; total on Department. [1]
  - Works_on: Employee(M) — (N) Project with attribute hours; associative entity Works_on(emp_id, proj_id, hours). [1]
  - Supervises: Recursive Employee(1) — (N) Employee via supervisor_id (nullable). [1]

- Participation/cardinality notes (2 marks)
  - Every Employee assigned to exactly one Department (total). [1]
  - Department managed by exactly one Employee (as per requirement). [1]

---

### 6(a) Phases of Database design with a neat diagram. (10 marks)

- Requirements analysis (1.5 marks)
- Conceptual design (ER/EER) (1.5 marks)
- Logical design (relational mapping, keys, FKs) (1.5 marks)
- Schema refinement (normalization: 1NF, 2NF, 3NF/BCNF) (1.5 marks)
- Physical design (indexes, partitioning, storage) (1.5 marks)
- Implementation & tuning (security, views, triggers, monitoring) (1.5 marks)
- Diagram/flow (1 mark)
  ```
  Requirements → Conceptual (ER) → Logical (Relational) → Refinement (NF) → Physical → Implementation/Tuning
  ```

---

### 6(b) Weak entity usage; owner entity type; partial key. (5 marks)

- Weak entity type: definition and when used (cannot be uniquely identified by own attributes; depends on owner via identifying relationship) (2 marks)
- Owner entity type: strong entity supplying part of identifying key (1.5 marks)
- Partial key: weak entity attributes that, with owner’s key, uniquely identify instances (1.5 marks)

Example: Dependent(dep_name [partial]) identified by Employee(emp_id) + dep_name.

---

### 6(c) Bring the relation into 1NF. (5 marks)

- Identify issue: multivalued attribute Dlocation violates 1NF (1 mark)
- 1NF by repetition (2 marks)
  - (Research, 5, 345599100, Bellaire)
  - (Research, 5, 345599100, Sugarland)
  - (Research, 5, 345599100, Houston)
  - (Admin, 4, NULL, Stafford)   -- if Dmgr_ssn absent
  - (Headoffice, 1, 985674900, Houston)
  - (Headoffice, 1, 985674900, Texas)

- Preferred decomposition (2 marks)
  - Department(Dnumber PK, Dname, Dmgr_ssn)
  - Dept_Location(Dnumber FK→Department, Dlocation, PK(Dnumber, Dlocation))

---

## UNIT IV

### 7(a) OODB concepts; Object-Oriented Data Model features. (10 marks)

- Core OODB concepts (5 marks)
  - Object identity (OID), state (attributes), behavior (methods). [2]
  - Class, encapsulation, inheritance. [2]
  - Polymorphism, dynamic binding; complex/nested objects; references; persistence. [1]

- OODM features (5 marks)
  - User-defined and complex types (sets/lists/tuples), OIDs. [2]
  - Methods stored with data; constraints/versioning; triggers. [2]
  - Navigational and declarative querying (e.g., OQL). [1]

---

### 7(b) Data Fragmentation and Sharding; techniques. (10 marks)

- Definitions and purpose (2 marks)
  - Fragmentation: Splitting relations across sites for locality/performance/availability. [1]
  - Sharding: Large-scale horizontal partitioning across nodes; shard key; rebalancing. [1]

- Techniques (6 marks)
  - Horizontal fragmentation (row subsets by predicates). [2]
  - Vertical fragmentation (column subsets incl. key). [2]
  - Hybrid/derived fragmentation (combine and child-by-parent fragmentation). [2]

- Sharding strategies and HA (2 marks)
  - Range, hash, directory/consistent hashing; replication per shard, rebalancing. [2]

---

### 8(a) Any two distributed database architectures with diagrams. (10 marks)

- Client–Server (5 marks)
  - Overview and components (client sends SQL; server: SQL engine, transaction, storage). [2]
  - Pros/cons (simplicity vs bottleneck). [1.5]
  - Diagram (ASCII) [1.5]
    ```
    Clients ⇄ DB Server (Parser/Optimizer/Executor, Txn, Storage)
    ```

- Peer-to-Peer / Shared-Nothing (5 marks)
  - Overview (equal nodes; partition/replicate; distributed queries/txns). [2]
  - Pros/cons (scalability/availability vs consistency complexity). [1.5]
  - Diagram (ASCII) [1.5]
    ```
    Node A ◀▶ Node B ◀▶ Node C   (data shards/replicas on each)
    ```

(Alternative acceptable: Federated/Mediator–Wrapper architecture similarly marked.)

---

### 8(b) HBase and Cassandra with diagrams. (10 marks)

- HBase (5 marks)
  - Model: Bigtable-like wide-column store; tables→column families→columns; sparse, versioned rows keyed by row key. [2]
  - Architecture: HMaster, RegionServers, ZooKeeper; HDFS storage; strong row consistency. [2]
  - Diagram/note (range scans by row key; large sparse data). [1]
    ```
    Client ⇄ RegionServer(s) ⇄ HDFS
             ▲
           HMaster (coordination) + ZooKeeper
    ```

- Cassandra (5 marks)
  - Model: Keyspace→Tables; partition key decides node; clustering columns order rows within partition; tunable consistency. [2]
  - Architecture: Peer-to-peer ring, consistent hashing, replication across DCs, gossip, repair. [2]
  - Diagram/note (high write throughput; linear scale). [1]
    ```
    Ring: Node1 ◀▶ Node2 ◀▶ Node3 ◀▶ Node4  (replicated partitions)
    ```

---

## UNIT V

### 9(a) MongoDB CRUD Operations. (10 marks)

- Create (2.5 marks)
```javascript
db.students.insertOne({ _id: 1, name: "Asha", dept: "CSE", gpa: 8.7 });
db.students.insertMany([
  { _id: 2, name: "Ravi",  dept: "ECE", gpa: 7.9 },
  { _id: 3, name: "Meera", dept: "CSE", gpa: 9.1 }
]);
```

- Read (2.5 marks)
```javascript
db.students.find({ dept: "CSE" });
db.students.find({ gpa: { $gte: 9 } }, { _id: 0, name: 1, gpa: 1 });
db.students.findOne({ _id: 1 });
```

- Update (2.5 marks)
```javascript
db.students.updateOne({ _id: 2 }, { $set: { gpa: 8.2 } });
db.students.updateMany({ dept: "CSE" }, { $inc: { gpa: 0.1 } });
db.students.replaceOne({ _id: 3 }, { name: "Meera", dept: "CSE", gpa: 9.2, year: 2 });
```

- Delete (2.5 marks)
```javascript
db.students.deleteOne({ _id: 1 });
db.students.deleteMany({ gpa: { $lt: 6.0 } });
```

---

### 9(b) Stages of MongoDB Aggregation Pipeline. (10 marks)

- Describe at least 8 stages (0.75 mark each = 6 marks)
  - $match (filter early) [0.75]
  - $project (shape, compute fields) [0.75]
  - $addFields/$set (add/modify fields) [0.75]
  - $unwind (explode arrays) [0.75]
  - $group (aggregations) [0.75]
  - $sort (ordering) [0.75]
  - $limit/$skip (pagination) [0.75]
  - $lookup/$graphLookup (joins/recursive) [0.75]

- Example pipeline (2 marks)
```javascript
db.students.aggregate([
  { $match: { dept: "CSE" } },
  { $group: { _id: "$dept", avgGpa: { $avg: "$gpa" }, count: { $sum: 1 } } },
  { $sort: { avgGpa: -1 } }
]);
```

- Output stages ($out/$merge) and usage notes (2 marks)
  - $out/$merge to persist results; prefer pipeline over map-reduce for analytics. [2]

---

### 10(a) Map-Reduce in MongoDB with your own example. (10 marks)

- Concept and when to use (3 marks)
  - Map emits key–value pairs; Reduce aggregates values by key; suited to custom aggregations, though aggregation pipeline is preferred for most tasks. [3]

- Map function for sales per category (2 marks)
```javascript
var map = function () {
  if (this.items) {
    this.items.forEach(it => emit(it.category, it.price * it.quantity));
  }
};
```

- Reduce function (2 marks)
```javascript
var reduce = function (key, values) {
  return Array.sum(values);
};
```

- Execution with options (2 marks)
```javascript
db.orders.mapReduce(
  map,
  reduce,
  {
    out: { inline: 1 },        // or { replace: "sales_by_category" }
    query: { status: "DELIVERED" }
  }
);
```

- Note on preferring aggregation pipeline (1 mark)
  - Pipeline is generally faster and easier; use map-reduce only when pipeline cannot express the logic. [1]

---

### 10(b) Five MongoDB datatypes with examples. (10 marks)

- String (2 marks)
  - Example: { name: "Asha" } [2]

- Number (int/double/long/decimal) (2 marks)
  - Example: { age: 22, cgpa: 8.5, big: NumberLong("9007199254740993"), price: NumberDecimal("12345.67") } [2]

- Boolean (2 marks)
  - Example: { active: true } [2]

- Date (2 marks)
  - Example: { joinedAt: ISODate("2025-08-24T15:43:52Z") } [2]

- Array/Object (2 marks)
  - Example: { skills: ["java", "sql"], address: { city: "Bengaluru", zip: "560001" } } [2]

(Other acceptable types: ObjectId, Null, Binary, Timestamp, Regex.)

---

Prepared for: MCA23 Database Systems  
Last updated (UTC): 2025-08-24 15:43:52  
Author: KrishnaHarish