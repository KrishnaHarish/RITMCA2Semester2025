package examples.ex13_singleton;

public class Main {
    public static void main(String[] args) {
        // Get singleton instance
        SingletonDemo instance1 = SingletonDemo.getInstance();
        instance1.showMessage();
        
        // Get another reference
        SingletonDemo instance2 = SingletonDemo.getInstance();
        instance2.showMessage();
        
        // Check if both references point to same object
        if (instance1 == instance2) {
            System.out.println("Both instances are the same object");
        } else {
            System.out.println("Different objects created - Singleton pattern failed!");
        }
    }
}