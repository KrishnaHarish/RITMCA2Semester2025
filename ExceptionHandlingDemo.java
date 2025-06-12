// 5. Exception handling: try-catch, throw, throws, finally, nested try, custom exception

class MyException extends Exception {
    MyException(String msg) { super(msg); }
}

public class ExceptionHandlingDemo {
    static void check(int x) throws MyException {
        if (x < 0) throw new MyException("Negative number!");
    }
    public static void main(String[] args) {
        try {
            try {
                check(-1);
            } catch (MyException e) {
                System.out.println("Caught: " + e.getMessage());
                throw e;
            } finally {
                System.out.println("Inner finally");
            }
        } catch (MyException e) {
            System.out.println("Outer catch: " + e.getMessage());
        } finally {
            System.out.println("Outer finally");
        }
    }
}