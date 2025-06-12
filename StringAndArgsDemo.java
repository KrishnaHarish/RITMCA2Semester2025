// 3. String class, command-line args, varargs, Scanner input

import java.util.Scanner;

public class StringAndArgsDemo {
    static void printArgs(String... args) {
        System.out.println("Arguments:");
        for (String arg : args) System.out.println(arg);
    }

    public static void main(String[] args) {
        // String manipulation
        String s = "Hello, World!";
        System.out.println(s.toUpperCase());
        System.out.println("Substring: " + s.substring(7, 12));

        // Process command-line arguments
        printArgs(args);

        // Scanner input
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        System.out.println("Hello, " + name + "!");
        sc.close();
    }
}