// 11. Lambda and block lambda

interface MathOp {
    int operate(int a, int b);
}

public class LambdaDemo {
    public static void main(String[] args) {
        MathOp sum = (a, b) -> a + b;
        MathOp block = (a, b) -> {
            int res = a * b;
            return res + 2;
        };
        System.out.println("Sum: " + sum.operate(3, 4));
        System.out.println("Block Lambda: " + block.operate(3, 4));
    }
}