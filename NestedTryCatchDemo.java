public class NestedTryCatchDemo {
    public static void main(String[] args) {
        try {
            // Outer try block
            int[] arr = {10, 20, 30};
            try {
                // Inner try block for ArithmeticException
                int result = arr[1] / 0; // This will throw ArithmeticException
                System.out.println("Result: " + result);
            } catch (ArithmeticException ae) {
                System.out.println("Caught ArithmeticException: " + ae.getMessage());
            }
            try {
                // Inner try block for ArrayIndexOutOfBoundsException
                System.out.println(arr[5]); // This will throw ArrayIndexOutOfBoundsException
            } catch (ArrayIndexOutOfBoundsException aioobe) {
                System.out.println("Caught ArrayIndexOutOfBoundsException: " + aioobe.getMessage());
            }
        } catch (Exception e) {
            System.out.println("Caught Exception in outer try-catch: " + e.getMessage());
        }
        System.out.println("Program continues after exception handling.");
    }
}