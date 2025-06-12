// 2. Inheritance concepts: multilevel, super, overriding, dynamic dispatch, abstract, final

abstract class Animal {
    abstract void sound();
    void eat() { System.out.println("Animal eats"); }
}

class Mammal extends Animal {
    @Override
    void sound() { System.out.println("Mammal sound"); }
}

class Dog extends Mammal {
    final String breed = "Labrador";
    @Override
    void sound() {
        super.sound();
        System.out.println("Dog barks");
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Animal a = new Dog(); // Dynamic method dispatch
        a.sound(); // Calls Dog's sound
        a.eat();   // Calls Animal's eat
    }
}