package examples.ex02_box_ctor;

public class BoxDemo2 {
    public static void main(String[] args) {
        Box myBox = new Box();
        
        double vol = myBox.volume();
        System.out.println("Volume is: " + vol);
    }
}