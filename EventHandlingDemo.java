// 13. Delegation Event Model: key/action events, listener interfaces, adapter classes

import java.awt.*;
import java.awt.event.*;

public class EventHandlingDemo extends Frame implements ActionListener, KeyListener {
    TextField tf;
    public EventHandlingDemo() {
        tf = new TextField();
        tf.setBounds(60, 50, 170, 20);
        Button b = new Button("Click Me");
        b.setBounds(100, 120, 80, 30);
        b.addActionListener(this);
        tf.addKeyListener(this);
        add(b); add(tf);
        setSize(300, 200);
        setLayout(null);
        setVisible(true);
    }
    public void actionPerformed(ActionEvent e) {
        tf.setText("Button Clicked!");
    }
    public void keyTyped(KeyEvent e) {}
    public void keyPressed(KeyEvent e) {
        tf.setText("Key Pressed: " + e.getKeyChar());
    }
    public void keyReleased(KeyEvent e) {}
    public static void main(String[] args) {
        new EventHandlingDemo();
    }
}