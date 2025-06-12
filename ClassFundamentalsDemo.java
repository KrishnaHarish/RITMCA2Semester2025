// 1. Class fundamentals: object creation, methods, constructors, this, finalize()
class Person {
    private String name;
    private int age;

    // Constructor using 'this'
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Method implementation
    void display() {
        System.out.println("Name: " + this.name + ", Age: " + this.age);
    }

    // finalize() method
    @Override
    protected void finalize() throws Throwable {
        System.out.println("Person object is being garbage collected: " + this.name);
        super.finalize();
    }

    public static void main(String[] args) {
        Person p1 = new Person("Alice", 25);
        p1.display();
        p1 = null;
        System.gc(); // Request GC to demonstrate finalize (not guaranteed)
    }
}