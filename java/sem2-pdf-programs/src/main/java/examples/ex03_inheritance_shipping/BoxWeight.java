package examples.ex03_inheritance_shipping;

public class BoxWeight extends Box {
    double weight;
    
    BoxWeight() {
        super();
        weight = 0;
    }
    
    BoxWeight(double w, double h, double d, double wt) {
        super(w, h, d);
        weight = wt;
    }
}