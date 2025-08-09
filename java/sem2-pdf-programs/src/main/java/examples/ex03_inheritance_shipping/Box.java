package examples.ex03_inheritance_shipping;

public class Box {
    double width;
    double height;
    double depth;
    
    Box() {
        width = 10;
        height = 30;
        depth = 25;
    }
    
    Box(double w, double h, double d) {
        width = w;
        height = h;
        depth = d;
    }
    
    double volume() {
        return width * height * depth;
    }
}