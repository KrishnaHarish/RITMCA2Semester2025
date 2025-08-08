package lab01;

class Person {
    private String name;
    private int age;

    // Constructor using 'this'
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Copy constructor
    Person(Person other) {
        this(other.name, other.age);
    }

    void haveBirthday() {
        this.age++;
        System.out.println(this.name + " just turned " + this.age);
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }

    // Demonstration only; deprecated in modern Java
    @Deprecated
    @Override
    protected void finalize() throws Throwable {
        try {
            System.out.println("finalize() called for " + name);
        } finally {
            super.finalize();
        }
    }
}

public class ClassFundamentals {
    public static void main(String[] args) {
        Person a = new Person("Ravi", 20);
        System.out.println(a);
        a.haveBirthday();

        Person b = new Person(a);
        System.out.println("Copied: " + b);

        // Hint GC (no guarantee) to trigger finalize() demo
        a = null; b = null;
        System.gc();
        System.runFinalization();
        System.out.println("End of Lab 1");
    }
}