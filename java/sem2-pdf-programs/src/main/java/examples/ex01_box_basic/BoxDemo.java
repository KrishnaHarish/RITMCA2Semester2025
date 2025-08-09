package examples.ex01_box_basic;

public class BoxDemo {
    public static void main(String[] args) {
        Box myBox = new Box();
        double vol;
        
        // assign values to myBox's instance variables
        myBox.width = 100;
        myBox.height = 200;
        myBox.depth = 150;
        
        // compute volume of box
        vol = myBox.width * myBox.height * myBox.depth;
        
        System.out.println("Volume is: " + vol);
    }
}