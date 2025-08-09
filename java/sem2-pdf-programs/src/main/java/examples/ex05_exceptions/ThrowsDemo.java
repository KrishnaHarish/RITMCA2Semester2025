package examples.ex05_exceptions;

public class ThrowsDemo {
    
    static void method1() throws IllegalAccessException {
        System.out.println("Inside method1.");
        throw new IllegalAccessException("Demo exception");
    }
    
    static void method2() throws IllegalAccessException {
        System.out.println("Inside method2.");
        method1();
    }
    
    public static void main(String[] args) {
        try {
            method2();
        } catch (IllegalAccessException e) {
            System.out.println("Caught " + e);
        }
    }
}