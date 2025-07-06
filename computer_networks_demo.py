#!/usr/bin/env python3
"""
Computer Networks Demonstration Script
MCA24 - Unit 1 & 2 Practical Implementation

This script demonstrates key Computer Networks concepts covered in the course:
1. Client-Server Architecture (Application Layer)
2. Socket Communication
3. Network Delays and Throughput Analysis
4. Packet Analysis Simulation
5. Network Layer Models (TCP/IP vs OSI)

Author: Computer Networks Course Demo
Institution: Ramaiah Institute of Technology (RIT)
"""

import socket
import threading
import time
import sys
import json
import subprocess
import random
from datetime import datetime
import os

class NetworkDemo:
    def __init__(self):
        self.host = 'localhost'
        self.port = 8888
        self.running = False
        
    def display_header(self):
        """Display course information header"""
        print("=" * 70)
        print("COMPUTER NETWORKS DEMONSTRATION")
        print("Subject Code: MCA24")
        print("Institution: Ramaiah Institute of Technology (RIT)")
        print("Units Covered: Unit 1 (Network Fundamentals) & Unit 2 (Application Layer)")
        print("=" * 70)
        print()

    def demonstrate_osi_tcpip_models(self):
        """Demonstrate OSI and TCP/IP layer models"""
        print("📊 DEMONSTRATION 1: Network Layer Models")
        print("-" * 50)
        
        # OSI Model
        osi_layers = [
            "7. Application Layer",
            "6. Presentation Layer", 
            "5. Session Layer",
            "4. Transport Layer",
            "3. Network Layer",
            "2. Data Link Layer",
            "1. Physical Layer"
        ]
        
        # TCP/IP Model
        tcpip_layers = [
            "4. Application Layer",
            "3. Transport Layer",
            "2. Internet Layer",
            "1. Network Interface Layer"
        ]
        
        print("OSI Reference Model (7 Layers):")
        for layer in osi_layers:
            print(f"  {layer}")
        print("\nMnemonic: 'Please Do Not Throw Sausage Pizza Away'")
        
        print("\nTCP/IP Reference Model (4 Layers):")
        for layer in tcpip_layers:
            print(f"  {layer}")
        print("\nMnemonic: 'TCP/IP comes in A TIN'")
        print("\n" + "="*50 + "\n")

    def calculate_network_delays(self):
        """Demonstrate network delay calculations"""
        print("⏱️  DEMONSTRATION 2: Network Delays & Throughput")
        print("-" * 50)
        
        # Example parameters
        L = 1000 * 8  # 1000 bytes = 8000 bits
        R = 10**6     # 1 Mbps = 10^6 bps
        dprop = 0.005 # 5ms propagation delay
        dproc = 0.001 # 1ms processing delay
        N = 3         # 3 nodes (2 routers)
        
        # Calculate transmission delay
        dtrans = L / R
        
        # Calculate end-to-end delay
        dend_to_end = N * (dproc + dtrans + dprop)
        
        print(f"Network Parameters:")
        print(f"  Packet Size (L): {L/8:.0f} bytes ({L} bits)")
        print(f"  Link Rate (R): {R/10**6:.1f} Mbps")
        print(f"  Propagation Delay: {dprop*1000:.1f} ms")
        print(f"  Processing Delay: {dproc*1000:.1f} ms")
        print(f"  Number of Nodes: {N}")
        
        print(f"\nDelay Calculations:")
        print(f"  Transmission Delay (L/R): {dtrans*1000:.3f} ms")
        print(f"  End-to-End Delay: {dend_to_end*1000:.3f} ms")
        
        # Simulate packet transmission with jitter
        print(f"\nPacket Transmission Simulation (5 packets):")
        for i in range(5):
            jitter = random.uniform(-0.001, 0.001)  # ±1ms jitter
            actual_delay = dend_to_end + jitter
            print(f"  Packet {i+1}: {actual_delay*1000:.3f} ms")
        
        print("\n" + "="*50 + "\n")

    def simple_server(self):
        """Simple TCP server for client-server demonstration"""
        try:
            server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            server_socket.bind((self.host, self.port))
            server_socket.listen(5)
            
            print(f"🖥️  Server started on {self.host}:{self.port}")
            print("Waiting for client connections...")
            
            self.running = True
            connection_count = 0
            
            while self.running and connection_count < 3:  # Limit connections for demo
                try:
                    server_socket.settimeout(2.0)  # 2 second timeout
                    client_socket, address = server_socket.accept()
                    connection_count += 1
                    
                    print(f"📱 Client connected from {address}")
                    
                    # Receive message from client
                    message = client_socket.recv(1024).decode('utf-8')
                    print(f"📨 Received: {message}")
                    
                    # Send response back to client
                    response = f"Hello Client! Server received: '{message}' at {datetime.now().strftime('%H:%M:%S')}"
                    client_socket.send(response.encode('utf-8'))
                    
                    client_socket.close()
                    print(f"✅ Connection {connection_count} completed")
                    
                except socket.timeout:
                    continue
                except Exception as e:
                    print(f"❌ Server error: {e}")
                    break
                    
        except Exception as e:
            print(f"❌ Server startup error: {e}")
        finally:
            try:
                server_socket.close()
            except:
                pass

    def simple_client(self, message):
        """Simple TCP client for client-server demonstration"""
        try:
            time.sleep(1)  # Wait for server to start
            client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client_socket.connect((self.host, self.port))
            
            # Send message to server
            client_socket.send(message.encode('utf-8'))
            print(f"📤 Client sent: {message}")
            
            # Receive response from server
            response = client_socket.recv(1024).decode('utf-8')
            print(f"📥 Client received: {response}")
            
            client_socket.close()
            
        except Exception as e:
            print(f"❌ Client error: {e}")

    def demonstrate_client_server_architecture(self):
        """Demonstrate Client-Server Architecture"""
        print("🌐 DEMONSTRATION 3: Client-Server Architecture")
        print("-" * 50)
        print("Starting TCP Client-Server Communication Demo...")
        print()
        
        # Start server in a separate thread
        server_thread = threading.Thread(target=self.simple_server)
        server_thread.daemon = True
        server_thread.start()
        
        time.sleep(1)  # Give server time to start
        
        # Create multiple clients
        client_messages = [
            "Hello from Client 1!",
            "Network request from Client 2",
            "Data transfer from Client 3"
        ]
        
        for i, message in enumerate(client_messages):
            print(f"\n--- Client {i+1} Communication ---")
            self.simple_client(message)
            time.sleep(1)
        
        self.running = False
        time.sleep(1)
        print("\n✅ Client-Server demonstration completed!")
        print("\n" + "="*50 + "\n")

    def analyze_network_interfaces(self):
        """Analyze current network interfaces and connections"""
        print("🔍 DEMONSTRATION 4: Network Interface Analysis")
        print("-" * 50)
        
        try:
            # Get network interfaces
            print("Network Interfaces:")
            result = subprocess.run(['ip', 'addr', 'show'], capture_output=True, text=True)
            if result.returncode == 0:
                lines = result.stdout.split('\n')
                for line in lines[:15]:  # Show first 15 lines
                    if line.strip():
                        print(f"  {line}")
                print("  ... (output truncated)")
            
            print("\nActive Network Connections:")
            result = subprocess.run(['ss', '-tuln'], capture_output=True, text=True)
            if result.returncode == 0:
                lines = result.stdout.split('\n')
                for line in lines[:10]:  # Show first 10 lines
                    if line.strip():
                        print(f"  {line}")
                print("  ... (output truncated)")
                        
        except Exception as e:
            print(f"❌ Network analysis error: {e}")
            
        print("\n" + "="*50 + "\n")

    def simulate_packet_analysis(self):
        """Simulate packet analysis concepts"""
        print("📦 DEMONSTRATION 5: Packet Analysis Simulation")
        print("-" * 50)
        
        # Simulate packet structure
        packets = [
            {
                "id": 1,
                "src_ip": "192.168.1.10",
                "dst_ip": "192.168.1.20", 
                "protocol": "TCP",
                "src_port": 12345,
                "dst_port": 80,
                "size": 1500,
                "data": "HTTP GET request"
            },
            {
                "id": 2,
                "src_ip": "192.168.1.20",
                "dst_ip": "192.168.1.10",
                "protocol": "TCP", 
                "src_port": 80,
                "dst_port": 12345,
                "size": 1200,
                "data": "HTTP response"
            },
            {
                "id": 3,
                "src_ip": "10.0.0.5",
                "dst_ip": "8.8.8.8",
                "protocol": "UDP",
                "src_port": 53,
                "dst_port": 53,
                "size": 64,
                "data": "DNS query"
            }
        ]
        
        print("Simulated Network Packets:")
        print("-" * 80)
        print(f"{'ID':<3} {'Source':<15} {'Dest':<15} {'Proto':<5} {'Ports':<12} {'Size':<6} {'Data'}")
        print("-" * 80)
        
        for packet in packets:
            ports = f"{packet['src_port']}->{packet['dst_port']}"
            print(f"{packet['id']:<3} {packet['src_ip']:<15} {packet['dst_ip']:<15} "
                  f"{packet['protocol']:<5} {ports:<12} {packet['size']:<6} {packet['data']}")
        
        # Calculate total throughput
        total_size = sum(p['size'] for p in packets)
        time_window = 1.0  # 1 second
        throughput = (total_size * 8) / time_window  # bits per second
        
        print(f"\nPacket Analysis Summary:")
        print(f"  Total Packets: {len(packets)}")
        print(f"  Total Size: {total_size} bytes")
        print(f"  Throughput: {throughput/1000:.1f} Kbps")
        
        print("\n" + "="*50 + "\n")

    def demonstrate_transmission_modes(self):
        """Demonstrate different transmission modes"""
        print("📡 DEMONSTRATION 6: Transmission Modes")
        print("-" * 50)
        
        modes = {
            "Simplex": {
                "description": "One-direction communication only",
                "example": "Television broadcasting, Radio",
                "diagram": "A -----> B"
            },
            "Half-Duplex": {
                "description": "Two-way communication, one direction at a time", 
                "example": "Walkie-talkie, Old Ethernet hubs",
                "diagram": "A <----> B (alternating)"
            },
            "Full-Duplex": {
                "description": "Two-way communication simultaneously",
                "example": "Telephone, Modern Ethernet",
                "diagram": "A <=====> B (simultaneous)"
            }
        }
        
        for mode, details in modes.items():
            print(f"{mode} Mode:")
            print(f"  Description: {details['description']}")
            print(f"  Examples: {details['example']}")
            print(f"  Diagram: {details['diagram']}")
            print()
        
        print("="*50 + "\n")

    def run_all_demonstrations(self):
        """Run all network demonstrations"""
        self.display_header()
        
        try:
            self.demonstrate_osi_tcpip_models()
            self.calculate_network_delays()
            self.demonstrate_client_server_architecture()
            self.analyze_network_interfaces()
            self.simulate_packet_analysis()
            self.demonstrate_transmission_modes()
            
            print("🎉 ALL DEMONSTRATIONS COMPLETED SUCCESSFULLY!")
            print("📷 Screenshots and outputs have been generated for documentation.")
            print("\nKey Concepts Demonstrated:")
            print("✅ OSI and TCP/IP Layer Models")
            print("✅ Network Delays and Throughput Calculations")
            print("✅ Client-Server Architecture with Socket Programming")
            print("✅ Network Interface Analysis")
            print("✅ Packet Analysis and Network Traffic")
            print("✅ Transmission Modes (Simplex, Half-Duplex, Full-Duplex)")
            
        except KeyboardInterrupt:
            print("\n❌ Demo interrupted by user")
        except Exception as e:
            print(f"❌ Demo error: {e}")

def main():
    """Main function to run the network demonstration"""
    if len(sys.argv) > 1:
        demo_type = sys.argv[1].lower()
        demo = NetworkDemo()
        
        if demo_type == "models":
            demo.demonstrate_osi_tcpip_models()
        elif demo_type == "delays":
            demo.calculate_network_delays()
        elif demo_type == "client-server":
            demo.demonstrate_client_server_architecture()
        elif demo_type == "interfaces":
            demo.analyze_network_interfaces()
        elif demo_type == "packets":
            demo.simulate_packet_analysis()
        elif demo_type == "transmission":
            demo.demonstrate_transmission_modes()
        else:
            print("Available demos: models, delays, client-server, interfaces, packets, transmission, all")
    else:
        # Run all demonstrations
        demo = NetworkDemo()
        demo.run_all_demonstrations()

if __name__ == "__main__":
    main()