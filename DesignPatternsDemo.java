// 12. Singleton, Factory, Observer, Strategy

// Singleton
class Singleton {
    private static Singleton instance;
    private Singleton() {}
    public static Singleton getInstance() {
        if (instance == null) instance = new Singleton();
        return instance;
    }
}

// Factory
interface Animal { void speak(); }
class Cat implements Animal { public void speak() { System.out.println("Meow"); } }
class Dog2 implements Animal { public void speak() { System.out.println("Woof"); } }
class AnimalFactory {
    static Animal getAnimal(String type) {
        if (type.equals("cat")) return new Cat();
        else return new Dog2();
    }
}

// Observer
interface Observer { void update(); }
class Subject {
    Observer o;
    void register(Observer o) { this.o = o; }
    void notifyObs() { if (o != null) o.update(); }
}
class MyObserver implements Observer { public void update() { System.out.println("Notified!"); } }

// Strategy
interface Strategy { void execute(); }
class PrintA implements Strategy { public void execute() { System.out.println("A"); } }
class PrintB implements Strategy { public void execute() { System.out.println("B"); } }
class Context {
    Strategy s;
    Context(Strategy s) { this.s = s; }
    void run() { s.execute(); }
}

public class DesignPatternsDemo {
    public static void main(String[] args) {
        // Singleton
        Singleton s1 = Singleton.getInstance();

        // Factory
        Animal a = AnimalFactory.getAnimal("cat");
        a.speak();

        // Observer
        Subject subj = new Subject();
        subj.register(new MyObserver());
        subj.notifyObs();

        // Strategy
        Context ctx = new Context(new PrintA());
        ctx.run();
        ctx = new Context(new PrintB());
        ctx.run();
    }
}