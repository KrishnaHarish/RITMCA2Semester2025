# Object Oriented Programming Using Java – Internal Assessment II Sample Answers

## Q1a) Analyze the concept of deadlocks with code and explain the underlying reasons for their occurrence.

**Deadlock** is a condition in concurrent programming where two or more threads are blocked forever, each waiting for the other to release a resource.  
**Underlying Reason:**  
- Occurs mostly when multiple threads need the same locks but obtain them in different orders.

**Sample Code Demonstrating Deadlock:**
```java
class A {
    synchronized void methodA(B b) {
        System.out.println("Thread1: Locked A, waiting for B...");
        try { Thread.sleep(100); } catch (Exception e) {}
        b.last();
    }
    synchronized void last() { System.out.println("Inside A.last()"); }
}

class B {
    synchronized void methodB(A a) {
        System.out.println("Thread2: Locked B, waiting for A...");
        try { Thread.sleep(100); } catch (Exception e) {}
        a.last();
    }
    synchronized void last() { System.out.println("Inside B.last()"); }
}

public class DeadlockDemo implements Runnable {
    A a = new A();
    B b = new B();

    public void run() { b.methodB(a); }

    public static void main(String[] args) {
        DeadlockDemo demo = new DeadlockDemo();
        new Thread(() -> demo.a.methodA(demo.b)).start();
        new Thread(demo).start();
    }
}
```
**Why does deadlock occur here?**  
- Thread 1 locks A and waits for B
- Thread 2 locks B and waits for A
- Both are waiting indefinitely for the other to release the lock.

---

## Q1b) Write a program to derive an array from ArrayList and mention 4 operations of ArrayList.

```java
import java.util.ArrayList;

public class ArrayListDemo {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        // 1. Add elements
        list.add("Apple");
        list.add("Banana");
        list.add("Grapes");
        // 2. Remove an element
        list.remove("Banana");
        // 3. Update/Set an element
        list.set(1, "Orange");
        // 4. Check if contains
        boolean hasApple = list.contains("Apple");

        // Convert ArrayList to Array
        String[] arr = new String[list.size()];
        arr = list.toArray(arr);

        // Display array
        for (String fruit : arr) {
            System.out.println(fruit);
        }
        System.out.println("Contains Apple? " + hasApple);
    }
}
```
**Operations used:** `add()`, `remove()`, `set()`, `contains()`, and conversion to array using `toArray()`.

---

## Q2a) Use lambda expressions to test whether a number is even negative or even non-negative.

```java
interface EvenChecker {
    String check(int n);
}

public class LambdaEvenTest {
    public static void main(String[] args) {
        EvenChecker checker = (n) -> {
            if (n % 2 == 0) {
                return (n < 0) ? "Even Negative" : "Even Non-negative";
            } else {
                return "Not Even";
            }
        };

        System.out.println(checker.check(-4));  // Even Negative
        System.out.println(checker.check(6));   // Even Non-negative
        System.out.println(checker.check(3));   // Not Even
    }
}
```

---

## Q2b) Write a program to demonstrate mouse event in Java.

```java
import java.awt.*;
import java.awt.event.*;

public class MouseEventDemo extends Frame implements MouseListener {
    String msg = "";

    public MouseEventDemo() {
        addMouseListener(this);
        setSize(300, 200);
        setTitle("Mouse Event Demo");
        setVisible(true);
    }

    public void paint(Graphics g) {
        g.drawString(msg, 20, 100);
    }

    public void mouseClicked(MouseEvent me) {
        msg = "Mouse Clicked";
        repaint();
    }
    public void mouseEntered(MouseEvent me) {
        msg = "Mouse Entered";
        repaint();
    }
    public void mouseExited(MouseEvent me) {
        msg = "Mouse Exited";
        repaint();
    }
    public void mousePressed(MouseEvent me) {
        msg = "Mouse Pressed";
        repaint();
    }
    public void mouseReleased(MouseEvent me) {
        msg = "Mouse Released";
        repaint();
    }

    public static void main(String[] args) {
        new MouseEventDemo();
    }
}
```
---

## Q3a) Illustrate with code the concept of Enumeration. Mention the use of values() and valueOf().

```java
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

public class EnumDemo {
    public static void main(String[] args) {
        // Using values()
        for (Day d : Day.values()) {
            System.out.println(d);
        }

        // Using valueOf()
        Day today = Day.valueOf("MONDAY");
        System.out.println("Today is: " + today);
    }
}
```
**Explanation:**  
- `values()`: Returns an array of all enum constants. Useful for iteration.
- `valueOf(String name)`: Returns the enum constant with the specified name.

---

## Q3b) Explain the following:

**i) Events:**  
Events are actions or occurrences recognized by software, often generated by user interaction (e.g., button click, mouse movement).

**ii) Event Sources:**  
An event source is an object that generates events. Example: A button in a GUI.

**iii) Event Listeners:**  
Event listeners are interfaces that receive and handle events generated by event sources. Example: `ActionListener`, `MouseListener`.

**Example:**  
In Java GUI, when you click a button (event source), an `ActionEvent` (event) is generated, and an `ActionListener` (listener) handles it.

---

*Note: These answers are meant to serve as a study guide and template. For the live exam, write answers in your own words and adapt code as needed.*