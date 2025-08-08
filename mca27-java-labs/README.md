# Programming in Java Laboratory (MCA27)

This project contains 14 minimal, focused Java examples matching the lab list. Each example is a standalone `main` program under `src/main/java/labXX`.

- Java: 11
- Build: Maven
- GUI: Swing/AWT (Delegation Event Model, adapter classes)
- Database: SQLite (embedded)

How to run
1) Open a terminal at the repository root and change into this folder:
   cd mca27-java-labs

2) Compile:
   mvn -q -e -DskipTests package

3) Run any lab (replace the main class):
   mvn -q exec:java -Dexec.mainClass="lab01.ClassFundamentals"
   Examples:
   - mvn -q exec:java -Dexec.mainClass="lab02.InheritanceDemo"
   - mvn -q exec:java -Dexec.mainClass="lab03.StringArgsScanner" -Dexec.args="hello 123"
   - mvn -q exec:java -Dexec.mainClass="lab10.CollectionsDemo"
   - mvn -q exec:java -Dexec.mainClass="lab13.EventsDemo"
   - mvn -q exec:java -Dexec.mainClass="lab14.JDBCDemo"

Notes:
- finalize(): Demonstrated in Lab 1 for completeness; it's deprecated and should not be used in production.
- Lab 13 uses Swing and the classic Delegation Event Model (ActionListener, KeyAdapter).
- Lab 14 creates `lab14.db` SQLite file in this folder and performs basic CRUD.

Contents
- Lab 01: Class fundamentals — constructors, methods, `this`, `finalize()`.
- Lab 02: Inheritance — multilevel, `super`, overriding, dynamic dispatch, `abstract`, `final`.
- Lab 03: Strings, command-line args, varargs, `Scanner`.
- Lab 04: Packages, interfaces, default methods, access.
- Lab 05: Exceptions — try/catch/throw/throws/finally, nested, custom exception.
- Lab 06: Multi-catch and built-in exceptions.
- Lab 07: Multithreading — threads, `isAlive()`, `join()`, priorities, sync, wait/notify.
- Lab 08: Enums, autoboxing, wrappers.
- Lab 09: Generics — generic class with multiple type params.
- Lab 10: Collections — ArrayList, LinkedList.
- Lab 11: Lambdas — expressions and block lambdas.
- Lab 12: Design patterns — Singleton, Factory, Observer, Strategy.
- Lab 13: Event handling — Delegation Event Model, listener interfaces, adapter classes; key and action events.
- Lab 14: JDBC — SQLite CRUD.

References
- Herbert Schildt, The Complete Reference Java, 9th Ed.