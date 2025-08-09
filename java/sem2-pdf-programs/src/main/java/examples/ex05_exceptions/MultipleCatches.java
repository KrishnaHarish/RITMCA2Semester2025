package examples.ex05_exceptions;

public class MultipleCatches {
    public static void main(String[] args) {
        try {
            int a[] = new int[5];
            System.out.println("First print statement in try block");
            a[10] = 30 / 0;
            System.out.println("Second print statement in try block");
        } catch (ArithmeticException e) {
            System.out.println("Warning: ArithmeticException");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Warning: ArrayIndexOutOfBoundsException");
        } catch (Exception e) {
            System.out.println("Warning: Some Other exception");
        }
        System.out.println("Out of try-catch block...");
    }
}