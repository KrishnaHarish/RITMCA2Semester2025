package lab12;

import java.util.ArrayList;
import java.util.List;

// Thread-safe lazy-loaded Singleton using holder idiom
class Singleton {
    private Singleton() {}
    private static class Holder { static final Singleton INSTANCE = new Singleton(); }
    public static Singleton getInstance() { return Holder.INSTANCE; }

    public void doWork() {
        System.out.println("Singleton working: " + this);
    }
}

// Factory Pattern
interface Product {
    String name();
}

class ConcreteA implements Product {
    public String name() { return "ConcreteA"; }
}

class ConcreteB implements Product {
    public String name() { return "ConcreteB"; }
}

class ProductFactory {
    public static Product create(String kind) {
        switch (kind) {
            case "A": return new ConcreteA();
            case "B": return new ConcreteB();
            default: throw new IllegalArgumentException("Unknown kind: " + kind);
        }
    }
}

// Observer Pattern
interface Observer {
    void update(int newState);
}

interface Subject {
    void attach(Observer o);
    void detach(Observer o);
    void notifyObservers();
}

class ConcreteSubject implements Subject {
    private final List<Observer> observers = new ArrayList<>();
    private int state = 0;

    public void setState(int s) {
        this.state = s;
        notifyObservers();
    }
    public int getState() { return state; }

    public void attach(Observer o) { observers.add(o); }
    public void detach(Observer o) { observers.remove(o); }
    public void notifyObservers() { for (Observer o : observers) o.update(state); }
}

class ConcreteObserver implements Observer {
    private final String name;
    public ConcreteObserver(String name) { this.name = name; }
    public void update(int newState) {
        System.out.println(name + " observed state = " + newState);
    }
}

// Strategy Pattern
interface Strategy {
    int combine(int a, int b);
}

class AddStrategy implements Strategy { public int combine(int a, int b) { return a + b; } }
class MultiplyStrategy implements Strategy { public int combine(int a, int b) { return a * b; } }

class Context {
    private Strategy strategy;
    public Context(Strategy strategy) { this.strategy = strategy; }
    public void setStrategy(Strategy strategy) { this.strategy = strategy; }
    public int execute(int a, int b) { return strategy.combine(a, b); }
}

public class PatternsDemo {
    public static void main(String[] args) {
        // Singleton
        Singleton s = Singleton.getInstance();
        s.doWork();

        // Factory
        Product a = ProductFactory.create("A");
        Product b = ProductFactory.create("B");
        System.out.println("Factory created: " + a.name() + ", " + b.name());

        // Observer
        ConcreteSubject subject = new ConcreteSubject();
        subject.attach(new ConcreteObserver("Obs1"));
        subject.attach(new ConcreteObserver("Obs2"));
        subject.setState(42);

        // Strategy
        Context ctx = new Context(new AddStrategy());
        System.out.println("Add 2,3 = " + ctx.execute(2, 3));
        ctx.setStrategy(new MultiplyStrategy());
        System.out.println("Mul 2,3 = " + ctx.execute(2, 3));

        System.out.println("End of Lab 12");
    }
}