package examples.ex14_jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.SQLException;

public class DbConnect {
    // Database connection parameters - replace with actual values
    private static final String DB_URL = "jdbc:mysql://localhost:3306/university";
    private static final String DB_USER = "your_username";
    private static final String DB_PASSWORD = "your_password";
    
    public static void main(String[] args) {
        System.out.println("Connecting to database...");
        
        // Use try-with-resources for automatic resource management
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
             Statement stmt = conn.createStatement()) {
            
            System.out.println("Connected to database successfully!");
            
            String query = "SELECT * FROM courses";
            
            try (ResultSet rs = stmt.executeQuery(query)) {
                System.out.println("Course data:");
                System.out.println("CourseID\tCourseName\tCredits");
                System.out.println("------------------------------------");
                
                while (rs.next()) {
                    int courseId = rs.getInt("course_id");
                    String courseName = rs.getString("course_name");
                    int credits = rs.getInt("credits");
                    
                    System.out.println(courseId + "\t\t" + courseName + "\t\t" + credits);
                }
            }
            
        } catch (SQLException e) {
            System.err.println("Database error: " + e.getMessage());
            
            // Sample output in case of connection failure
            System.out.println("\nSample expected output:");
            System.out.println("CourseID\tCourseName\tCredits");
            System.out.println("------------------------------------");
            System.out.println("101\t\tJava Programming\t\t3");
            System.out.println("102\t\tDatabase Systems\t\t4");
            System.out.println("103\t\tData Structures\t\t3");
        }
    }
}