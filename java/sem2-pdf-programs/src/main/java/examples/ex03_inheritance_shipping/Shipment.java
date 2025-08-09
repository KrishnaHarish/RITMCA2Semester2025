package examples.ex03_inheritance_shipping;

public class Shipment extends BoxWeight {
    double cost;
    
    Shipment() {
        super();
        cost = 0;
    }
    
    Shipment(double w, double h, double d, double wt, double c) {
        super(w, h, d, wt);
        cost = c;
    }
}