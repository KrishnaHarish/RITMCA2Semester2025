package lab13;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

// Delegation Event Model: listener interfaces and adapter classes (KeyAdapter)
public class EventsDemo {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(EventsDemo::createAndShow);
    }

    private static void createAndShow() {
        JFrame frame = new JFrame("Lab 13 - Events");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 200);
        frame.setLayout(new BorderLayout());

        JTextArea area = new JTextArea();
        area.setEditable(false);
        area.setText("Type keys here (focus the window), click the button.\n");
        frame.add(new JScrollPane(area), BorderLayout.CENTER);

        JButton button = new JButton("Click me");
        frame.add(button, BorderLayout.SOUTH);

        // Action event using listener interface
        button.addActionListener(new ActionListener() {
            @Override public void actionPerformed(ActionEvent e) {
                area.append("Button clicked: " + e.getActionCommand() + "\n");
            }
        });

        // Key event using adapter class
        frame.addKeyListener(new KeyAdapter() {
            @Override public void keyTyped(KeyEvent e) {
                area.append("Key typed: " + e.getKeyChar() + "\n");
            }
            @Override public void keyPressed(KeyEvent e) {
                area.append("Key pressed: " + KeyEvent.getKeyText(e.getKeyCode()) + "\n");
            }
        });

        frame.setFocusable(true);
        frame.setVisible(true);
    }
}