# server.py
import socket
import threading
import time

def handle_client(clientsocket, addr):
    print("*" * 50)
    print(f"Client connected from: {addr[0]}:{addr[1]}")
    currentTime = time.ctime(time.time()) + "\r\n"
    print("Sending time:", currentTime.strip())
    print("*" * 50)
    clientsocket.send(currentTime.encode('ascii'))
    clientsocket.close()

def start_server():
    host = "172.1.27.11"  # VM1's IP address
    port = 9998        # Listening port

    serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    serversocket.bind((host, port))
    serversocket.listen(5)

    print(f"Server started at {host} on port {port}")
    print("Waiting for incoming connections...")

    while True:
        clientsocket, addr = serversocket.accept()
        client_thread = threading.Thread(target=handle_client, args=(clientsocket, addr))
        client_thread.start()

if __name__ == "__main__":
    start_server()
