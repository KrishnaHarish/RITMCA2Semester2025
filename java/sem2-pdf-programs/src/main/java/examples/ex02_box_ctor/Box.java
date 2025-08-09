package examples.ex02_box_ctor;

public class Box {
    double width;
    double height;
    double depth;
    
    // Default constructor
    Box() {
        width = 10;
        height = 30;
        depth = 25;
    }
    
    // compute and return volume
    double volume() {
        return width * height * depth;
    }
}