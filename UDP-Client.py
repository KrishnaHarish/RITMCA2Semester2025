# UDPClient.py
import socket

host = "192.168.0.134"  # IP of the server VM
port = 9999             # Same port as UDP server

client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

try:
    message = "Hello UDP Server!"
    client_socket.sendto(message.encode(), (host, port))

    data, server = client_socket.recvfrom(1024)
    print("*" * 50)
    print("The time received from the server is:", data.decode('ascii').strip())
    print("*" * 50)

except Exception as e:
    print("An error occurred:", e)
finally:
    client_socket.close()
