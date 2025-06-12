// 6. Catching multiple exceptions, built-in exceptions

public class MultiExceptionDemo {
    public static void main(String[] args) {
        try {
            int a = 10 / 0; // ArithmeticException
            String s = null;
            System.out.println(s.length()); // NullPointerException
        } catch (ArithmeticException | NullPointerException e) {
            System.out.println("Caught exception: " + e);
        }
    }
}