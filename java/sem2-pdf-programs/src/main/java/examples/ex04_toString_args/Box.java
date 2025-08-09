package examples.ex04_toString_args;

public class Box {
    double width;
    double height;
    double depth;
    
    Box(double w, double h, double d) {
        width = w;
        height = h;
        depth = d;
    }
    
    double volume() {
        return width * height * depth;
    }
    
    @Override
    public String toString() {
        return "Box dimensions: " + width + " x " + height + " x " + depth;
    }
}