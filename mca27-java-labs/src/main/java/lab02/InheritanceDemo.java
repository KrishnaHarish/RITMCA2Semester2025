package lab02;

// Abstract base class
abstract class Animal {
    protected String name;
    Animal(String name) { this.name = name; }
    abstract void speak(); // abstract method

    void info() {
        System.out.println("I am an Animal named " + name);
    }
}

// Concrete subclass
class Dog extends Animal {
    Dog(String name) { super(name); }
    @Override
    void speak() { System.out.println(name + " says: Woof!"); }

    @Override
    void info() {
        super.info(); // use of super
        System.out.println("I am specifically a Dog.");
    }
}

// Multilevel hierarchy
class GuideDog extends Dog {
    GuideDog(String name) { super(name); }
    @Override
    void speak() {
        System.out.println(name + " (guide dog) says: Woof, guiding!");
    }
}

// final with inheritance
final class FinalClass {
    final void cannotOverride() {
        System.out.println("final method cannot be overridden.");
    }
}

// Attempting to extend FinalClass would fail:
// class Sub extends FinalClass {} // ERROR

public class InheritanceDemo {
    public static void main(String[] args) {
        // Dynamic method dispatch
        Animal a1 = new Dog("Bruno");
        Animal a2 = new GuideDog("Buddy");
        a1.speak(); a1.info();
        a2.speak(); a2.info();

        // Overriding and super shown above
        FinalClass f = new FinalClass();
        f.cannotOverride();
        System.out.println("End of Lab 2");
    }
}