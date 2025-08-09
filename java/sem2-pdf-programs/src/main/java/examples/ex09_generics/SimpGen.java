package examples.ex09_generics;

public class SimpGen {
    public static void main(String[] args) {
        TwoGen<Integer, String> tgObj = new TwoGen<>(88, "Generics");
        
        tgObj.showTypes();
        
        int v = tgObj.getOb1();
        System.out.println("Value: " + v);
        
        String str = tgObj.getOb2();
        System.out.println("Value: " + str);
    }
}