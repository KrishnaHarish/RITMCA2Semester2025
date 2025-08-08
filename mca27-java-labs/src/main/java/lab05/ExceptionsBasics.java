package lab05;

public class ExceptionsBasics {

    static void mayThrow(boolean trigger) throws CustomException {
        if (trigger) throw new CustomException("Triggered CustomException");
    }

    public static void main(String[] args) {
        try {
            System.out.println("Outer try block start");
            try {
                mayThrow(true);
            } catch (CustomException ce) {
                System.out.println("Caught custom: " + ce.getMessage());
                throw new RuntimeException("Wrapped in RuntimeException", ce); // rethrow
            } finally {
                System.out.println("Inner finally always runs");
            }
        } catch (RuntimeException re) {
            System.out.println("Caught runtime: " + re);
        } finally {
            System.out.println("Outer finally always runs");
        }

        // Using throws on method and normal flow
        try {
            mayThrow(false);
            System.out.println("No exception this time");
        } catch (CustomException e) {
            System.out.println("Unexpected: " + e.getMessage());
        }
        System.out.println("End of Lab 5");
    }
}