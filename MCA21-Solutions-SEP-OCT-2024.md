# MCA21 - Object Oriented Programming using Java  
**Full Solution Guide for Semester End Exam – SEPT / OCT 2024**

---

## UNIT - I

### 1.
#### a) Define a constructor. Discuss its special properties? Explain how Constructors can be overloaded with the help of an example.

**Constructor:**  
A constructor in Java is a special method that is used to initialize objects. It has the same name as the class and does not have a return type (not even void).

**Special Properties:**
- Called automatically when an object is created.
- Can be overloaded (multiple constructors with different parameter lists).
- Used to initialize object state.

**Constructor Overloading Example:**
```java
class Student {
    String name;
    int age;

    // Default constructor
    Student() {
        this.name = "Unknown";
        this.age = 0;
    }

    // Parameterized constructor
    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = new Student("Alice", 22);
        System.out.println(s1.name + " " + s1.age);
        System.out.println(s2.name + " " + s2.age);
    }
}
```

---

#### b) What is Dynamic method dispatch? Illustrate with an example.

**Dynamic Method Dispatch:**  
It is the process where a call to an overridden method is resolved at runtime rather than compile-time. It enables Java to support runtime polymorphism.

**Example:**
```java
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog(); // Reference of Animal, object of Dog
        a.sound(); // Calls Dog's sound() at runtime
    }
}
```

---

### 2.
#### a) Describe the use of Super keyword in inheritance. Illustrate with an example.

**super keyword:**  
Used to refer to the immediate parent class object, methods, or constructors.

**Example:**
```java
class Parent {
    int x = 10;
    void display() {
        System.out.println("Parent x: " + x);
    }
}

class Child extends Parent {
    int x = 20;
    void display() {
        System.out.println("Child x: " + x);
        System.out.println("Parent x: " + super.x); // Access parent variable
        super.display(); // Call parent method
    }
}
```

---

#### b) What is Garbage Collection and what finalize () method does? Explain with an example.

**Garbage Collection:**  
Automatic memory management feature in Java which eliminates unused objects.

**finalize() method:**  
Called by the garbage collector before destroying the object. Used to clean up resources.

**Example:**
```java
class Demo {
    protected void finalize() {
        System.out.println("Finalize called");
    }
}

public class Main {
    public static void main(String[] args) {
        Demo d = new Demo();
        d = null;
        System.gc(); // Suggests JVM to run garbage collector
    }
}
```

---

#### c) Discuss the usage of scanner class in Java.

**Scanner Class:**  
Used for taking input from user (keyboard, files, etc).

**Example:**
```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        System.out.println("You entered: " + num);
    }
}
```

---

## UNIT - II

### 3.
#### a) Create a Balance class and organize it into a package. Demonstrate access protection and importing packages with this class. Write a program to show how classes from different packages interact.

**Balance.java (in package bank):**
```java
package bank;
public class Balance {
    private double amount; // private access
    public Balance(double amount) {
        this.amount = amount;
    }
    public double getAmount() {
        return amount;
    }
}
```
**Main.java (in package app):**
```java
package app;
import bank.Balance; // Import Balance from bank package

public class Main {
    public static void main(String[] args) {
        Balance b = new Balance(5000);
        System.out.println("Balance: " + b.getAmount());
    }
}
```

---

#### b) Discuss the significance of interface in Java. Illustrate with an example.

**Interface:**  
Defines a contract of methods (no implementation). Supports multiple inheritance, abstraction.

**Example:**
```java
interface Drawable {
    void draw();
}

class Circle implements Drawable {
    public void draw() {
        System.out.println("Drawing Circle");
    }
}
```

---

### 4.
#### a) Design a banking application where users can deposit and withdraw money. Create a custom exception InsufficientFundsException that is thrown when a withdrawal request exceeds the current balance. Demonstrate how to handle this custom exception using try-catch blocks and include a finally block to display the remaining balance after each transaction attempt.

**Example:**
```java
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String msg) {
        super(msg);
    }
}

class Account {
    private double balance;
    public Account(double balance) { this.balance = balance; }
    public void deposit(double amt) { balance += amt; }
    public void withdraw(double amt) throws InsufficientFundsException {
        if (amt > balance)
            throw new InsufficientFundsException("Insufficient funds!");
        balance -= amt;
    }
    public double getBalance() { return balance; }
}

public class BankApp {
    public static void main(String[] args) {
        Account acc = new Account(1000);
        try {
            acc.deposit(500);
            acc.withdraw(2000);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
        } finally {
            System.out.println("Remaining Balance: " + acc.getBalance());
        }
    }
}
```

---

#### b) Create exceptions called InvalidAgeException and ArrayOutOfBoundException. Write a Java program handles the appropriate exception gracefully based on the command line argument(s).

**Example:**
```java
class InvalidAgeException extends Exception {
    public InvalidAgeException(String msg) { super(msg); }
}
class ArrayOutOfBoundException extends Exception {
    public ArrayOutOfBoundException(String msg) { super(msg); }
}

public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            int age = Integer.parseInt(args[0]);
            if (age < 0 || age > 120)
                throw new InvalidAgeException("Invalid age!");
            int[] arr = {1,2,3};
            int idx = Integer.parseInt(args[1]);
            if (idx < 0 || idx >= arr.length)
                throw new ArrayOutOfBoundException("Index out of bounds!");
            System.out.println("Value: " + arr[idx]);
        } catch (InvalidAgeException | ArrayOutOfBoundException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

---

## UNIT - III

### 5.
#### a) What is thread? Discuss methods that can be used in interthread communication in Java.

**Thread:**  
A thread is a lightweight process. Java allows concurrent execution via threads.

**Interthread Communication Methods:**
- `wait()`: Causes thread to wait until notified.
- `notify()`: Wakes up one waiting thread.
- `notifyAll()`: Wakes up all waiting threads.

---

#### b) What is the purpose of using Generics? Develop a program using generic class.

**Purpose of Generics:**  
Enables type safety, code reusability, and prevents runtime errors.

**Example:**
```java
class Box<T> {
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

public class Main {
    public static void main(String[] args) {
        Box<Integer> intBox = new Box<>();
        intBox.set(100);
        System.out.println(intBox.get());
    }
}
```

---

#### c) Describe the purpose of the methods: isAlive() and join().

- `isAlive()`: Checks if the thread is running.
- `join()`: Waits for a thread to finish its execution.

---

### 6.
#### a) Explain the concept of Type Wrappers with an example.

**Type Wrappers:**  
Primitive types can be converted to objects using wrapper classes (`Integer`, `Double`, etc).

**Example:**
```java
int a = 10;
Integer obj = Integer.valueOf(a); // wrapping
int b = obj.intValue(); // unwrapping
```

---

#### b) Explain Synchronization. Write Java Code to demonstrate Thread synchronization in Java.

**Synchronization:**  
Used to control access to shared resources by multiple threads, preventing data inconsistency.

**Example:**
```java
class Counter {
    private int count = 0;
    public synchronized void increment() {
        count++;
    }
    public int getCount() { return count; }
}

public class SyncDemo {
    public static void main(String[] args) throws InterruptedException {
        Counter c = new Counter();
        Thread t1 = new Thread(() -> {
            for(int i=0; i<1000; i++) c.increment();
        });
        Thread t2 = new Thread(() -> {
            for(int i=0; i<1000; i++) c.increment();
        });
        t1.start(); t2.start();
        t1.join(); t2.join();
        System.out.println("Count: " + c.getCount());
    }
}
```

---

#### c) Discuss the methods: values() and valueOf() used in enumeration.

- `values()`: Returns array of all enum constants.
- `valueOf(String name)`: Returns enum constant with specified name.

**Example:**
```java
enum Day { MON, TUE, WED }
public class EnumDemo {
    public static void main(String[] args) {
        Day[] days = Day.values();
        for(Day d : days) System.out.println(d);
        Day day = Day.valueOf("MON");
        System.out.println(day);
    }
}
```

---

## UNIT- IV

### 7.
#### a) Develop a program that demonstrates adding, removing, and accessing elements in LinkedList. Explain the scenario where these collection is preferred.

**LinkedList Example:**
```java
import java.util.LinkedList;
public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<>();
        list.add("A"); list.add("B"); list.add("C");
        list.remove("B");
        System.out.println(list.get(1)); // Access element
        System.out.println(list);
    }
}
```
**Scenario:**  
Preferred when frequent insertions and deletions are required.

---

#### b) Demonstrate TCP/IP networking using sockets with an example. Explain the steps involved in setting up a TCP connection.

**Steps:**
1. ServerSocket listens on a port.
2. ClientSocket connects to server.
3. I/O streams are used for communication.

**Example:**
- **Server:**
    ```java
    import java.net.*;
    import java.io.*;
    public class TCPServer {
        public static void main(String[] args) throws Exception {
            ServerSocket ss = new ServerSocket(5000);
            Socket s = ss.accept();
            BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()));
            System.out.println("Client says: " + in.readLine());
            ss.close();
        }
    }
    ```
- **Client:**
    ```java
    import java.net.*;
    import java.io.*;
    public class TCPClient {
        public static void main(String[] args) throws Exception {
            Socket s = new Socket("localhost", 5000);
            PrintWriter out = new PrintWriter(s.getOutputStream(), true);
            out.println("Hello Server!");
            s.close();
        }
    }
    ```

---

### 8.
#### a) Illustrate with an example how to obtain an array from ArrayList.

**Example:**
```java
import java.util.ArrayList;
public class ArrayListToArray {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("A"); list.add("B");
        String[] arr = list.toArray(new String[0]);
        for(String s : arr) System.out.println(s);
    }
}
```

---

#### b) Write a program that uses a lambda expression to implement a simple event handler. Explain how lambda expressions simplify the code.

**Example:**
```java
import javax.swing.*;
public class LambdaDemo {
    public static void main(String[] args) {
        JButton btn = new JButton("Click");
        btn.addActionListener(e -> System.out.println("Button clicked"));
        JFrame frame = new JFrame();
        frame.add(btn); frame.setSize(200,200); frame.setVisible(true);
    }
}
```
**Explanation:**  
Lambda expressions reduce boilerplate code for event handlers.

---

## UNIT - V

### 9.
#### a) Explain the delegation event model and the role of source and listeners with examples.

**Delegation Event Model:**  
Mechanism where event source (component) generates an event and event listener receives and handles it.

- **Source:** Component generating the event.
- **Listener:** Object that handles the event.

**Example:**
```java
class MyListener implements ActionListener {
    public void actionPerformed(ActionEvent e) {
        System.out.println("Action performed");
    }
}
JButton btn = new JButton("Click");
btn.addActionListener(new MyListener());
```

---

#### b) Demonstrate the key event handlers with a java program.

**Example:**
```java
import java.awt.*;
import java.awt.event.*;

class KeyDemo extends Frame implements KeyListener {
    KeyDemo() {
        addKeyListener(this);
        setSize(200,200); setVisible(true);
    }
    public void keyPressed(KeyEvent e) {
        System.out.println("Key Pressed");
    }
    public void keyReleased(KeyEvent e) {
        System.out.println("Key Released");
    }
    public void keyTyped(KeyEvent e) {
        System.out.println("Key Typed");
    }
    public static void main(String[] args) {
        new KeyDemo();
    }
}
```

---

### 10.
#### a) Explain any three JavaFX controls with a code snippet.

- **Button**
- **Label**
- **TextField**

**Example:**
```java
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
public class FXDemo extends Application {
    public void start(Stage stage) {
        Button btn = new Button("Submit");
        Label lbl = new Label("Name:");
        TextField tf = new TextField();
        VBox v = new VBox(lbl, tf, btn);
        stage.setScene(new Scene(v, 200, 200));
        stage.show();
    }
}
```

---

#### b) Discuss briefly Applications class and the life cycle methods of JavaFX.

**Application class:**  
Entry point for JavaFX apps. Extend `Application` and override `start(Stage)` method.

**Life Cycle Methods:**
- `init()`: Called before `start()`.
- `start(Stage)`: Main entry point.
- `stop()`: Called when app is closed.

**Example:**
```java
public class MyApp extends Application {
    public void init() { /* initialization code */ }
    public void start(Stage stage) { /* UI code */ }
    public void stop() { /* cleanup code */ }
}
```