# UDPServer.py
import socket
import time

def start_udp_server():
    host = "192.168.0.134"  # Your server VM's IP
    port = 9999             # A different port for UDP

    serversocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    serversocket.bind((host, port))

    print(f"UDP Server started at {host} on port {port}")
    print("Waiting for incoming datagrams...")

    while True:
        data, addr = serversocket.recvfrom(1024)
        print("*" * 50)
        print(f"Received message from: {addr[0]}:{addr[1]}")
        print(f"Message: {data.decode().strip()}")

        currentTime = time.ctime(time.time()) + "\r\n"
        serversocket.sendto(currentTime.encode('ascii'), addr)
        print(f"Sent time back to {addr}")
        print("*" * 50)

if __name__ == "__main__":
    start_udp_server()
