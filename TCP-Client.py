# client.py
import socket

host = "172.1.27.11"  # IP address of the server (VM1)
port = 9998        # Same port as server

try:
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((host, port))
    data = client_socket.recv(1024)
    client_socket.close()

    print("*" * 50)
    print("The time received from the server is:", data.decode('ascii').strip())
    print("*" * 50)

except ConnectionRefusedError:
    print("Connection failed: Make sure the server is running and accessible.")
except Exception as e:
    print("An error occurred:", e)
