# MCA21 — Object Oriented Programming using Java
Exam-ready answers with explanations and runnable Java code (Java 8+).

Contents:
- Unit I — Q1: Constructors, Dynamic Method Dispatch
- Unit II — Q3: Packages, Access Protection, Interfaces
- Unit III — Q5: Threads and Inter-thread Communication, Generics, isAlive/join
- Unit IV — Q7: LinkedList operations, TCP/IP Sockets
- Unit V — Q9: Delegation Event Model, Key Event Handlers

Tips:
- Compile single-file programs with: `javac FileName.java` and run with `java ClassName`.
- For packaged code, ensure folders match package names and compile from the source root.

---

## UNIT I — Q1

### a) Define a constructor. Discuss its special properties. Explain how constructors can be overloaded with an example.

Answer:
- A constructor is a special method that initializes a newly created object. It has the same name as the class and no return type. It is invoked automatically when an object is created with `new`.
- Special properties:
  - Name must match the class name; no return type (not even `void`).
  - Invoked automatically at object creation time.
  - Can be no-arg (default) or parameterized.
  - Can be overloaded (multiple constructors with different parameter lists).
  - `this(...)` chains constructors in the same class; `super(...)` calls superclass constructor (must be the first statement).
  - Not inherited and cannot be overridden (but are invoked along the inheritance chain).
  - Cannot be `abstract`, `static`, `final`, or `synchronized`.

Constructor Overloading Example:

```java
// File: PointDemo.java
class Point {
    private int x, y;

    // 1) Default constructor
    public Point() {
        this(0, 0); // constructor chaining
    }

    // 2) Parameterized constructor
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    // 3) "Copy" constructor pattern
    public Point(Point other) {
        this(other.x, other.y);
    }

    @Override
    public String toString() {
        return "(" + x + ", " + y + ")";
    }

    public static void main(String[] args) {
        Point p1 = new Point();           // uses default
        Point p2 = new Point(5, 7);       // uses parameterized
        Point p3 = new Point(p2);         // uses copy

        System.out.println("p1 = " + p1);
        System.out.println("p2 = " + p2);
        System.out.println("p3 = " + p3);
    }
}
```

---

### b) What is Dynamic Method Dispatch? Illustrate with an example.

Answer:
- Dynamic Method Dispatch is the runtime mechanism that resolves which overridden method to call based on the actual object type (not the reference type). This enables runtime polymorphism.

```java
// File: DynamicDispatchDemo.java
abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    private final double r;
    Circle(double r) { this.r = r; }
    @Override double area() { return Math.PI * r * r; }
}

class Rectangle extends Shape {
    private final double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    @Override double area() { return w * h; }
}

public class DynamicDispatchDemo {
    public static void main(String[] args) {
        Shape s; // Superclass reference
        s = new Circle(3);
        System.out.println("Circle area: " + s.area()); // Circle.area()

        s = new Rectangle(4, 5);
        System.out.println("Rectangle area: " + s.area()); // Rectangle.area()
    }
}
```

---

## UNIT II — Q3

### a) Create a Balance class and organize it into a package. Demonstrate access protection and importing packages with this class. Write a program to show how classes from different packages interact.

Answer:
- Create:
  - `com.bank.accounts.Balance` (public) with private fields and public API.
  - `com.bank.accounts.InternalAudit` (package-private).
  - `com.app.Main` that imports and uses `Balance`.
- Access control:
  - `private` not accessible outside the class.
  - package-private (no modifier) not accessible outside the package.
  - `public` accessible from anywhere.

```java
// File: com/bank/accounts/Balance.java
package com.bank.accounts;

public class Balance {
    private String accountHolder; // private
    private double amount;        // private

    public Balance(String accountHolder, double openingAmount) {
        if (openingAmount < 0) throw new IllegalArgumentException("Opening amount cannot be negative");
        this.accountHolder = accountHolder;
        this.amount = openingAmount;
    }

    public String getAccountHolder() { return accountHolder; }
    public double getAmount() { return amount; }

    public void deposit(double value) {
        if (value <= 0) throw new IllegalArgumentException("Deposit must be positive");
        amount += value;
    }

    public void withdraw(double value) {
        if (value <= 0) throw new IllegalArgumentException("Withdraw must be positive");
        if (value > amount) throw new IllegalStateException("Insufficient funds");
        amount -= value;
    }

    @Override
    public String toString() {
        return "Balance{" + "accountHolder='" + accountHolder + '\'' + ", amount=" + amount + '}';
    }
}
```

```java
// File: com/bank/accounts/InternalAudit.java
package com.bank.accounts;

// package-private class — not visible outside the package
class InternalAudit {
    static boolean isFlaggedAccount(Balance b) {
        return b.getAmount() > 1_000_000;
    }
}
```

```java
// File: com/app/Main.java
package com.app;

import com.bank.accounts.Balance;

public class Main {
    public static void main(String[] args) {
        Balance b = new Balance("Alice", 5000.0);
        b.deposit(1500.0);
        b.withdraw(1000.0);

        System.out.println(b);
        System.out.println("Holder via public getter: " + b.getAccountHolder());

        // The following would NOT compile due to access protection:
        // b.amount += 100; // 'amount' is private
        // boolean flagged = InternalAudit.isFlaggedAccount(b); // package-private class not visible

        // Interaction across packages via public API
        paySalary(b, 2000.0);
        System.out.println("After salary: " + b);
    }

    private static void paySalary(Balance b, double amt) {
        b.deposit(amt); // using public method from another package
    }
}
```

Compile from the source root:
- `javac com/bank/accounts/*.java com/app/Main.java`
- Run: `java com.app.Main`

---

### b) Discuss the significance of interface in Java. Illustrate with an example.

Answer:
- Interfaces:
  - Define a contract (abstract methods, constants, default/static methods).
  - Enable polymorphism and programming to abstractions.
  - Allow multiple inheritance of type (a class can implement multiple interfaces).
  - Decouple components and facilitate unit testing and patterns (strategy, callback).

```java
// File: InterfaceDemo.java
interface Payable {
    double computePay();
}

class SalariedEmployee implements Payable {
    private final double monthlySalary;
    SalariedEmployee(double monthlySalary) { this.monthlySalary = monthlySalary; }
    @Override public double computePay() { return monthlySalary; }
}

class Contractor implements Payable {
    private final double hourlyRate;
    private final int hours;
    Contractor(double hourlyRate, int hours) { this.hourlyRate = hourlyRate; this.hours = hours; }
    @Override public double computePay() { return hourlyRate * hours; }
}

public class InterfaceDemo {
    static void payRun(Payable p) {
        System.out.println("Pay: " + p.computePay()); // polymorphic call
    }

    public static void main(String[] args) {
        Payable e = new SalariedEmployee(60000.0 / 12);
        Payable c = new Contractor(100.0, 160);
        payRun(e);
        payRun(c);
    }
}
```

---

## UNIT III — Q5

### a) What is a thread? Discuss methods that can be used in interthread communication in Java.

Answer:
- A thread is a lightweight unit of execution within a process; threads share memory and can run concurrently.
- Inter-thread communication:
  - `wait()`: current thread waits until `notify()`/`notifyAll()` is called on the same monitor.
  - `notify()`: wakes up one waiting thread on the same monitor.
  - `notifyAll()`: wakes all waiting threads on the same monitor.
  - Must be used within a synchronized context.

Producer-Consumer example:

```java
// File: ProducerConsumerDemo.java
import java.util.LinkedList;
import java.util.Queue;

class BoundedBuffer<T> {
    private final Queue<T> queue = new LinkedList<>();
    private final int capacity;

    BoundedBuffer(int capacity) { this.capacity = capacity; }

    public synchronized void put(T item) throws InterruptedException {
        while (queue.size() == capacity) {
            wait(); // wait for space
        }
        queue.add(item);
        notifyAll(); // notify consumers
    }

    public synchronized T take() throws InterruptedException {
        while (queue.isEmpty()) {
            wait(); // wait for item
        }
        T item = queue.remove();
        notifyAll(); // notify producers
        return item;
    }
}

public class ProducerConsumerDemo {
    public static void main(String[] args) {
        BoundedBuffer<Integer> buffer = new BoundedBuffer<>(3);

        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 10; i++) {
                    buffer.put(i);
                    System.out.println("Produced: " + i);
                    Thread.sleep(100);
                }
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        }, "Producer");

        Thread consumer = new Thread(() -> {
            try {
                for (int i = 1; i <= 10; i++) {
                    int val = buffer.take();
                    System.out.println("Consumed: " + val);
                    Thread.sleep(150);
                }
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        }, "Consumer");

        producer.start();
        consumer.start();

        try {
            producer.join();
            consumer.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("Done");
    }
}
```

---

### b) What is the purpose of using Generics? Develop a program using a generic class.

Answer:
- Generics provide:
  - Compile-time type safety (avoid `ClassCastException`).
  - Eliminate explicit casts.
  - Reusable, type-parameterized code.
  - Clearer API contracts.

```java
// File: GenericClassDemo.java
import java.util.Objects;

class Pair<K, V> {
    private final K key;
    private final V value;

    public Pair(K key, V value) {
        this.key = Objects.requireNonNull(key);
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }

    @Override
    public String toString() { return "Pair{" + key + "=" + value + "}"; }
}

public class GenericClassDemo {
    public static void main(String[] args) {
        Pair<String, Integer> age = new Pair<>("Alice", 30);
        Pair<Integer, String> idName = new Pair<>(101, "Widget");
        System.out.println(age);
        System.out.println(idName);

        // Type safety: the following won't compile
        // Pair<String, Integer> bad = new Pair<>(10, "x");
    }
}
```

---

### c) Describe the purpose of the methods: isAlive() and join().

Answer:
- `isAlive()`: true if a thread has been started and has not yet terminated.
- `join()`: current thread waits for another thread to finish; variants accept timeouts.

```java
// File: JoinIsAliveDemo.java
public class JoinIsAliveDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            try { Thread.sleep(500); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            System.out.println("Worker done");
        });

        System.out.println("Before start: isAlive = " + worker.isAlive());
        worker.start();
        System.out.println("After start: isAlive = " + worker.isAlive());

        worker.join(); // wait for worker to finish
        System.out.println("After join: isAlive = " + worker.isAlive());
        System.out.println("Main exiting");
    }
}
```

---

## UNIT IV — Q7

### a) Develop a program that demonstrates adding, removing, and accessing elements in LinkedList. Explain the scenario where this collection is preferred.

Answer:
- `LinkedList` is a doubly-linked list implementation of `List` and `Deque`.
- Preferred when:
  - Frequent insertions/deletions at ends or via iterators (amortized O(1)).
  - Implementing stacks/queues/deques.
  - Random access is infrequent (since `get(index)` is O(n)).

```java
// File: LinkedListDemo.java
import java.util.LinkedList;
import java.util.ListIterator;

public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<>();

        // Adding
        list.add("B");
        list.addFirst("A");
        list.addLast("C");
        list.add(3, "E"); // at index
        list.add("F");
        System.out.println("After adds: " + list);

        // Inserting in the middle via iterator
        ListIterator<String> it = list.listIterator();
        while (it.hasNext()) {
            String s = it.next();
            if (s.equals("C")) {
                it.add("D"); // insert after C
                break;
            }
        }
        System.out.println("After middle insert: " + list);

        // Access
        System.out.println("First: " + list.getFirst());
        System.out.println("Last: " + list.getLast());
        System.out.println("Index 2: " + list.get(2));

        // Update
        list.set(2, "Z");
        System.out.println("After set index 2 -> Z: " + list);

        // Removing
        list.removeFirst();
        list.removeLast();
        list.remove("Z");
        System.out.println("After removes: " + list);

        // Using as queue/deque
        list.addFirst("Head");
        list.addLast("Tail");
        System.out.println("Deque usage: " + list);
    }
}
```

---

### b) Demonstrate TCP/IP networking using sockets with an example. Explain the steps involved in setting up a TCP connection.

Answer:
Steps:
1) Server creates a `ServerSocket` on a port and calls `accept()` to wait for clients.
2) Client creates a `Socket` connecting to server host:port.
3) Both obtain `InputStream`/`OutputStream` for I/O.
4) Exchange data (often buffered).
5) Close streams and sockets.

Echo server and client:

```java
// File: EchoServer.java
import java.io.*;
import java.net.*;

public class EchoServer {
    public static void main(String[] args) throws IOException {
        int port = 5555;
        try (ServerSocket server = new ServerSocket(port)) {
            System.out.println("EchoServer listening on port " + port);
            while (true) {
                Socket client = server.accept(); // wait for a client
                System.out.println("Client connected: " + client.getRemoteSocketAddress());
                new Thread(() -> handle(client)).start();
            }
        }
    }

    private static void handle(Socket client) {
        try (Socket c = client;
             BufferedReader in = new BufferedReader(new InputStreamReader(c.getInputStream()));
             BufferedWriter out = new BufferedWriter(new OutputStreamWriter(c.getOutputStream()))) {

            String line;
            while ((line = in.readLine()) != null) {
                System.out.println("Received: " + line);
                out.write("Echo: " + line);
                out.newLine();
                out.flush();
            }
        } catch (IOException e) {
            System.err.println("Client error: " + e.getMessage());
        }
    }
}
```

```java
// File: EchoClient.java
import java.io.*;
import java.net.*;

public class EchoClient {
    public static void main(String[] args) throws IOException {
        String host = "127.0.0.1";
        int port = 5555;

        try (Socket socket = new Socket(host, port);
             BufferedReader console = new BufferedReader(new InputStreamReader(System.in));
             BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             BufferedWriter out = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()))) {

            System.out.println("Connected to " + host + ":" + port + ". Type lines to echo, or 'exit' to quit.");
            String line;
            while ((line = console.readLine()) != null) {
                if ("exit".equalsIgnoreCase(line)) break;
                out.write(line);
                out.newLine();
                out.flush();
                String resp = in.readLine();
                System.out.println("Server: " + resp);
            }
        }
    }
}
```

Run:
- Start server: `java EchoServer`
- Then client: `java EchoClient`

---

## UNIT V — Q9

### a) Explain the delegation event model and the role of source and listeners with examples.

Answer:
- Delegation Event Model:
  - Event Source: generates events (e.g., `JButton`).
  - Event Object: carries event data (e.g., `ActionEvent`, `MouseEvent`).
  - Event Listener: implements listener interface (e.g., `ActionListener`).
  - Registration: listeners register with sources (`addActionListener`).
  - Delegation: source calls listener methods when events occur.

Swing example:

```java
// File: DelegationEventModelDemo.java
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class DelegationEventModelDemo {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(DelegationEventModelDemo::createAndShow);
    }

    private static void createAndShow() {
        JFrame frame = new JFrame("Delegation Event Model");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 200);

        JButton button = new JButton("Click Me");
        JLabel label = new JLabel("Clicks: 0");
        label.setHorizontalAlignment(SwingConstants.CENTER);

        // Event Source: button
        // Event Listener: an ActionListener implementation
        // Event Object: ActionEvent passed to actionPerformed
        button.addActionListener(new ActionListener() {
            int count = 0;
            @Override
            public void actionPerformed(ActionEvent e) {
                count++;
                label.setText("Clicks: " + count);
            }
        });

        frame.setLayout(new BorderLayout());
        frame.add(button, BorderLayout.SOUTH);
        frame.add(label, BorderLayout.CENTER);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }
}
```

---

### b) Demonstrate the key event handlers with a Java program.

Answer:
- `KeyListener` methods:
  - `keyPressed(KeyEvent e)`: key pressed down.
  - `keyReleased(KeyEvent e)`: key released.
  - `keyTyped(KeyEvent e)`: character input produced.

```java
// File: KeyEventDemo.java
import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class KeyEventDemo extends JFrame implements KeyListener {
    private final JTextArea area = new JTextArea(10, 40);
    private int pressedCount = 0, releasedCount = 0, typedCount = 0;

    public KeyEventDemo() {
        super("Key Event Demo");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        area.setEditable(false);
        area.setText("Focus this window and start typing...\n");
        add(new JScrollPane(area), BorderLayout.CENTER);
        addKeyListener(this); // listen on the frame

        setSize(500, 300);
        setLocationRelativeTo(null);
        setVisible(true);

        // Ensure frame has focus to receive key events
        SwingUtilities.invokeLater(this::requestFocusInWindow);
    }

    @Override
    public void keyPressed(KeyEvent e) {
        pressedCount++;
        area.append(String.format("Pressed: %s (code=%d) | total pressed=%d%n",
                KeyEvent.getKeyText(e.getKeyCode()), e.getKeyCode(), pressedCount));
    }

    @Override
    public void keyReleased(KeyEvent e) {
        releasedCount++;
        area.append(String.format("Released: %s (code=%d) | total released=%d%n",
                KeyEvent.getKeyText(e.getKeyCode()), e.getKeyCode(), releasedCount));
    }

    @Override
    public void keyTyped(KeyEvent e) {
        typedCount++;
        area.append(String.format("Typed: '%s' | total typed=%d%n", e.getKeyChar(), typedCount));
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(KeyEventDemo::new);
    }
}
```

---

## Notes on Compilation and Execution

- Single-file examples: `javac ClassName.java` then `java ClassName`.
- Packaged examples:
  - Ensure directory structure matches packages (e.g., `com/bank/accounts/Balance.java`).
  - From the source root:
    - `javac com/bank/accounts/*.java com/app/Main.java`
    - `java com.app.Main`
- Networking:
  - Run `EchoServer` first, then `EchoClient` in a separate terminal.
- Swing:
  - Run from a desktop environment; ensure Java has GUI access.
