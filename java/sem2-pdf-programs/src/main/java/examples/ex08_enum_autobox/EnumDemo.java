package examples.ex08_enum_autobox;

enum Apple {
    Jonathan(10), GoldenDel(9), RedDel(12), Winesap(15), Cortland(8);
    
    private int price; // price of each apple
    
    // Constructor
    Apple(int p) { 
        price = p; 
    }
    
    int getPrice() { 
        return price; 
    }
}

public class EnumDemo {
    public static void main(String[] args) {
        System.out.println("All apple prices:");
        
        // display price of all apples
        for (Apple ap : Apple.values()) {
            System.out.println(ap + " costs " + ap.getPrice() + " cents.");
        }
        
        System.out.println();
        System.out.println("My apple price: " + Apple.GoldenDel.getPrice() + " cents");
    }
}