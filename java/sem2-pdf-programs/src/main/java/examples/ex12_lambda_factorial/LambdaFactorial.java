package examples.ex12_lambda_factorial;

interface NumericFunc {
    int func(int n);
}

public class LambdaFactorial {
    public static void main(String[] args) {
        // This lambda computes the factorial of int value
        NumericFunc factorial = (n) -> {
            int result = 1;
            for (int i = 1; i <= n; i++)
                result = i * result;
            return result;
        };
        
        System.out.println("The factorial of 5 is " + factorial.func(5));
        System.out.println("The factorial of 6 is " + factorial.func(6));
    }
}