package lab14;

import java.sql.*;

public class JDBCDemo {
    static final String URL = "jdbc:sqlite:lab14.db";

    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection(URL)) {
            conn.setAutoCommit(false);
            createTable(conn);
            long id = insertPerson(conn, "Ravi", 25);
            selectPeople(conn);
            updateAge(conn, id, 26);
            deletePerson(conn, id);
            selectPeople(conn);
            conn.commit();
            System.out.println("End of Lab 14");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    static void createTable(Connection conn) throws SQLException {
        try (Statement st = conn.createStatement()) {
            st.executeUpdate("CREATE TABLE IF NOT EXISTS people (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "name TEXT NOT NULL, " +
                    "age INTEGER NOT NULL)");
            System.out.println("Table ready.");
        }
    }

    static long insertPerson(Connection conn, String name, int age) throws SQLException {
        String sql = "INSERT INTO people(name, age) VALUES(?, ?)";
        try (PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, name);
            ps.setInt(2, age);
            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    long id = rs.getLong(1);
                    System.out.println("Inserted id=" + id);
                    return id;
                }
            }
        }
        return -1;
    }

    static void selectPeople(Connection conn) throws SQLException {
        System.out.println("Current people:");
        try (PreparedStatement ps = conn.prepareStatement("SELECT id, name, age FROM people ORDER BY id");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                System.out.printf(" - %d: %s (%d)%n", rs.getLong("id"), rs.getString("name"), rs.getInt("age"));
            }
        }
    }

    static void updateAge(Connection conn, long id, int newAge) throws SQLException {
        try (PreparedStatement ps = conn.prepareStatement("UPDATE people SET age = ? WHERE id = ?")) {
            ps.setInt(1, newAge);
            ps.setLong(2, id);
            int rows = ps.executeUpdate();
            System.out.println("Updated rows: " + rows);
        }
    }

    static void deletePerson(Connection conn, long id) throws SQLException {
        try (PreparedStatement ps = conn.prepareStatement("DELETE FROM people WHERE id = ?")) {
            ps.setLong(1, id);
        int rows = ps.executeUpdate();
            System.out.println("Deleted rows: " + rows);
        }
    }
}