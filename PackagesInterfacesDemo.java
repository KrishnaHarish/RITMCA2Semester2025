// 4. Packages, interfaces, access protection, import, default interface methods

package mydemo;

interface Greetable {
    void greet(String name);
    default void sayBye() {
        System.out.println("Goodbye!");
    }
}

class Greeter implements Greetable {
    public void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
}

public class PackagesInterfacesDemo {
    public static void main(String[] args) {
        Greeter g = new Greeter();
        g.greet("Alice");
        g.sayBye();
    }
}