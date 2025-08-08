package lab03;

import java.util.Arrays;
import java.util.Locale;
import java.util.Scanner;

public class StringArgsScanner {
    // Varargs
    static String joinWith(String sep, String... parts) {
        return String.join(sep, parts);
    }

    public static void main(String[] args) {
        // String manipulations
        String s = " Hello, Java! ";
        System.out.println("Trim: '" + s.trim() + "'");
        System.out.println("Upper: " + s.toUpperCase(Locale.ROOT));
        System.out.println("Replace: " + s.replace("Java", "World"));
        System.out.println("Substring: " + s.substring(1, 6));

        // Command-line args
        System.out.println("Args: " + Arrays.toString(args));

        // Varargs
        System.out.println(joinWith("-", "a", "b", "c"));

        // Scanner for input
        System.out.println("Enter your name and age:");
        try (Scanner sc = new Scanner(System.in)) {
            String name = sc.next();
            int age = sc.nextInt();
            System.out.println("Hello " + name + ", age " + age);
        }
        System.out.println("End of Lab 3");
    }
}