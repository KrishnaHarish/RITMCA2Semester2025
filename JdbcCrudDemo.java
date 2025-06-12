// 14. JDBC: connect to DB, CRUD operations, connectivity

import java.sql.*;

public class JdbcCrudDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/testdb";
        String user = "root";
        String pass = "password";
        try (Connection con = DriverManager.getConnection(url, user, pass)) {
            Statement st = con.createStatement();

            // CREATE
            st.executeUpdate("CREATE TABLE IF NOT EXISTS student (id INT, name VARCHAR(100))");
            // INSERT
            st.executeUpdate("INSERT INTO student VALUES (1, 'Alice')");
            // READ
            ResultSet rs = st.executeQuery("SELECT * FROM student");
            while (rs.next())
                System.out.println(rs.getInt("id") + ": " + rs.getString("name"));
            // UPDATE
            st.executeUpdate("UPDATE student SET name='Bob' WHERE id=1");
            // DELETE
            st.executeUpdate("DELETE FROM student WHERE id=1");

        } catch (SQLException e) {
            System.out.println("DB Error: " + e.getMessage());
        }
    }
}