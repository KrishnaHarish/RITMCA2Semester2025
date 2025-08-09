package examples.ex13_singleton;

public class SingletonDemo {
    private static SingletonDemo instance;
    
    // Private constructor to prevent instantiation
    private SingletonDemo() {
        System.out.println("Singleton instance created");
    }
    
    // Note: This implementation is not thread-safe
    // For thread-safety, consider using synchronized methods or other approaches
    public static SingletonDemo getInstance() {
        if (instance == null) {
            instance = new SingletonDemo();
        }
        return instance;
    }
    
    public void showMessage() {
        System.out.println("Hello from Singleton!");
    }
}