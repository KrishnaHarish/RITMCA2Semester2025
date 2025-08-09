package examples.ex04_toString_args;

public class ToStringDemo {
    public static void main(String[] args) {
        Box b1 = new Box(10, 12, 14);
        Box b2 = new Box(1, 2, 3);
        
        System.out.println("Box 1: " + b1);
        System.out.println("Box 2: " + b2);
        System.out.println("Volume of Box 1: " + b1.volume());
        System.out.println("Volume of Box 2: " + b2.volume());
        
        System.out.println("\nCommand line arguments:");
        if (args.length > 0) {
            for (int i = 0; i < args.length; i++) {
                System.out.println("args[" + i + "]: " + args[i]);
            }
        } else {
            System.out.println("No command line arguments provided.");
        }
    }
}