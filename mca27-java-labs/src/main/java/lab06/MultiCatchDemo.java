package lab06;

public class MultiCatchDemo {
    public static void main(String[] args) {
        String s = (args.length > 0) ? args[0] : null;
        try {
            // Built-in exceptions: NullPointerException, NumberFormatException, ArrayIndexOutOfBoundsException
            int len = s.length(); // may NPE
            int n = Integer.parseInt(s); // may NumberFormatException
            System.out.println("Parsed: " + n + ", len=" + len);
            System.out.println(args[1]); // may AIOOBE
        } catch (NullPointerException | NumberFormatException | ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught: " + e.getClass().getSimpleName() + " -> " + e.getMessage());
        }
        System.out.println("End of Lab 6");
    }
}