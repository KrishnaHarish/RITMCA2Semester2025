package lab11;

import java.util.Arrays;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;

@FunctionalInterface
interface IntOp {
    int apply(int a, int b);
}

public class LambdaDemo {
    public static void main(String[] args) {
        // Simple lambda
        IntOp add = (a, b) -> a + b;
        System.out.println("Add: " + add.apply(3, 4));

        // Block lambda
        IntOp gcd = (a, b) -> {
            a = Math.abs(a); b = Math.abs(b);
            if (a == 0) return b;
            if (b == 0) return a;
            while (b != 0) {
                int t = a % b;
                a = b; b = t;
            }
            return a;
        };
        System.out.println("GCD(54, 24) = " + gcd.apply(54, 24));

        // Lambdas with standard functional interfaces
        List<String> names = Arrays.asList("Ravi", "Anu", "Geeta", "Raj");
        Predicate<String> startsWithR = s -> s.startsWith("R");
        names.stream().filter(startsWithR).map(String::toUpperCase).forEach(System.out::println);

        Function<String, Integer> length = String::length;
        System.out.println("Len(Geeta)=" + length.apply("Geeta"));
        System.out.println("End of Lab 11");
    }
}