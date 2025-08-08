package lab04.api;

public interface MyInterface {
    void perform();

    // default interface method
    default void greet() {
        System.out.println("Hello from default method in MyInterface");
    }
}