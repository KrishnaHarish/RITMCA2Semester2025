#!/usr/bin/env python3
"""
Advanced Computer Networks Tools and Analysis
MCA24 - Extended Practical Implementation

This script provides advanced network analysis tools:
1. Network Monitoring and Statistics
2. FTP Simulation
3. Network Performance Testing
4. Protocol Analysis

Author: Computer Networks Course Demo
Institution: Ramaiah Institute of Technology (RIT)
"""

import socket
import subprocess
import time
import threading
import os
import tempfile
from datetime import datetime
import json

class AdvancedNetworkTools:
    def __init__(self):
        self.temp_dir = tempfile.mkdtemp()
        
    def network_monitoring(self):
        """Advanced network monitoring and statistics"""
        print("🔍 ADVANCED NETWORK MONITORING")
        print("=" * 50)
        
        try:
            # Monitor network traffic
            print("Network Interface Statistics:")
            result = subprocess.run(['cat', '/proc/net/dev'], capture_output=True, text=True)
            if result.returncode == 0:
                lines = result.stdout.split('\n')
                print("Interface     RX Bytes    TX Bytes    RX Packets  TX Packets")
                print("-" * 60)
                for line in lines[2:]:  # Skip header lines
                    if line.strip() and ':' in line:
                        parts = line.split()
                        if len(parts) >= 10:
                            interface = parts[0].replace(':', '')
                            rx_bytes = int(parts[1])
                            tx_bytes = int(parts[9])
                            rx_packets = int(parts[2])
                            tx_packets = int(parts[10])
                            print(f"{interface:<12} {rx_bytes:>10} {tx_bytes:>10} {rx_packets:>10} {tx_packets:>10}")
            
            print("\nRouting Table:")
            result = subprocess.run(['ip', 'route'], capture_output=True, text=True)
            if result.returncode == 0:
                for line in result.stdout.split('\n')[:5]:  # Show first 5 routes
                    if line.strip():
                        print(f"  {line}")
                        
        except Exception as e:
            print(f"❌ Monitoring error: {e}")
        
        print("\n" + "=" * 50 + "\n")

    def simulate_ftp_protocol(self):
        """Simulate FTP Protocol operation"""
        print("📁 FTP PROTOCOL SIMULATION")
        print("=" * 50)
        
        # Create sample files for FTP demo
        test_files = {
            "document.txt": "This is a sample document for FTP transfer demonstration.",
            "data.json": '{"network": "computer", "protocol": "FTP", "port": 21}',
            "readme.md": "# FTP Demo\nThis demonstrates File Transfer Protocol concepts."
        }
        
        # Create test files
        for filename, content in test_files.items():
            filepath = os.path.join(self.temp_dir, filename)
            with open(filepath, 'w') as f:
                f.write(content)
        
        print("FTP Server Simulation:")
        print(f"📂 FTP Root Directory: {self.temp_dir}")
        print("📋 Available Files:")
        
        for filename in test_files.keys():
            file_path = os.path.join(self.temp_dir, filename)
            file_size = os.path.getsize(file_path)
            print(f"  📄 {filename} ({file_size} bytes)")
        
        print("\nFTP Session Simulation:")
        print("🔗 Control Connection: TCP Port 21")
        print("📊 Data Connection: TCP Port 20 (Active) or Random Port (Passive)")
        print()
        
        # Simulate FTP commands and responses
        ftp_session = [
            ("CLIENT", "USER anonymous"),
            ("SERVER", "331 Guest login ok, send your complete email address as password."),
            ("CLIENT", "PASS user@example.com"),
            ("SERVER", "230 Guest login ok, access restrictions apply."),
            ("CLIENT", "PWD"),
            ("SERVER", f"257 \"{self.temp_dir}\" is current directory."),
            ("CLIENT", "LIST"),
            ("SERVER", "150 Here comes the directory listing."),
            ("SERVER", f"226 Directory send OK. ({len(test_files)} files)"),
            ("CLIENT", "RETR document.txt"),
            ("SERVER", "150 Opening BINARY mode data connection for document.txt"),
            ("SERVER", "226 Transfer complete."),
            ("CLIENT", "QUIT"),
            ("SERVER", "221 Goodbye.")
        ]
        
        print("FTP Command/Response Session:")
        print("-" * 60)
        for actor, message in ftp_session:
            prefix = "C>" if actor == "CLIENT" else "S>"
            print(f"{prefix} {message}")
            time.sleep(0.2)  # Simulate network delay
        
        print(f"\n✅ FTP simulation completed. Files created in: {self.temp_dir}")
        print("\n" + "=" * 50 + "\n")

    def network_performance_test(self):
        """Network performance testing"""
        print("⚡ NETWORK PERFORMANCE TESTING")
        print("=" * 50)
        
        # Test localhost connectivity
        print("Testing localhost connectivity:")
        try:
            start_time = time.time()
            result = subprocess.run(['ping', '-c', '3', 'localhost'], 
                                  capture_output=True, text=True, timeout=10)
            end_time = time.time()
            
            if result.returncode == 0:
                print("✅ Localhost connectivity: OK")
                lines = result.stdout.split('\n')
                for line in lines:
                    if 'time=' in line:
                        print(f"  {line.strip()}")
            else:
                print("❌ Localhost connectivity: Failed")
                
        except subprocess.TimeoutExpired:
            print("⚠️ Ping timeout")
        except Exception as e:
            print(f"❌ Ping error: {e}")
        
        # TCP Port Scan
        print("\nTCP Port Connectivity Test:")
        common_ports = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995]
        open_ports = []
        
        for port in common_ports[:5]:  # Test first 5 ports for demo
            try:
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                sock.settimeout(1)
                result = sock.connect_ex(('localhost', port))
                if result == 0:
                    open_ports.append(port)
                    print(f"  Port {port}: OPEN")
                else:
                    print(f"  Port {port}: CLOSED")
                sock.close()
            except Exception:
                print(f"  Port {port}: ERROR")
        
        print(f"\n📊 Port Scan Summary: {len(open_ports)} open ports found")
        
        # Socket Performance Test
        print("\nSocket Performance Test:")
        self._socket_performance_test()
        
        print("\n" + "=" * 50 + "\n")

    def _socket_performance_test(self):
        """Internal socket performance testing"""
        def echo_server():
            """Simple echo server for performance testing"""
            try:
                server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
                server_socket.bind(('localhost', 9999))
                server_socket.listen(1)
                server_socket.settimeout(5)
                
                conn, addr = server_socket.accept()
                data = conn.recv(1024)
                conn.send(data)  # Echo back
                conn.close()
                server_socket.close()
            except Exception:
                pass
        
        # Start echo server in background
        server_thread = threading.Thread(target=echo_server)
        server_thread.daemon = True
        server_thread.start()
        
        time.sleep(0.5)  # Let server start
        
        # Test client performance
        try:
            test_data = b"Performance test data " * 100  # ~2.2KB
            
            start_time = time.time()
            client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client_socket.connect(('localhost', 9999))
            client_socket.send(test_data)
            response = client_socket.recv(len(test_data))
            client_socket.close()
            end_time = time.time()
            
            latency = (end_time - start_time) * 1000  # Convert to ms
            throughput = (len(test_data) * 8) / (end_time - start_time)  # bits per second
            
            print(f"  📊 Data Size: {len(test_data)} bytes")
            print(f"  ⏱️ Round-trip Time: {latency:.2f} ms")
            print(f"  📈 Throughput: {throughput/1000:.1f} Kbps")
            
        except Exception as e:
            print(f"  ❌ Socket test error: {e}")

    def protocol_analysis(self):
        """Analyze different protocol characteristics"""
        print("🔬 PROTOCOL ANALYSIS")
        print("=" * 50)
        
        protocols = {
            "HTTP": {
                "port": 80,
                "type": "TCP",
                "description": "HyperText Transfer Protocol",
                "characteristics": ["Stateless", "Request-Response", "Text-based"]
            },
            "HTTPS": {
                "port": 443,
                "type": "TCP",
                "description": "HTTP Secure",
                "characteristics": ["Encrypted", "SSL/TLS", "Secure"]
            },
            "FTP": {
                "port": 21,
                "type": "TCP", 
                "description": "File Transfer Protocol",
                "characteristics": ["Dual-channel", "Stateful", "File transfer"]
            },
            "DNS": {
                "port": 53,
                "type": "UDP",
                "description": "Domain Name System",
                "characteristics": ["Name resolution", "Hierarchical", "Distributed"]
            },
            "SMTP": {
                "port": 25,
                "type": "TCP",
                "description": "Simple Mail Transfer Protocol",
                "characteristics": ["Email delivery", "Push protocol", "Text-based"]
            }
        }
        
        print("Common Network Protocols Analysis:")
        print("-" * 80)
        print(f"{'Protocol':<8} {'Port':<6} {'Type':<6} {'Description':<25} {'Characteristics'}")
        print("-" * 80)
        
        for protocol, details in protocols.items():
            chars = ", ".join(details['characteristics'])
            print(f"{protocol:<8} {details['port']:<6} {details['type']:<6} "
                  f"{details['description']:<25} {chars}")
        
        print("\nProtocol Layer Mapping (TCP/IP Model):")
        layers = {
            "Application": ["HTTP", "HTTPS", "FTP", "SMTP", "DNS"],
            "Transport": ["TCP", "UDP"],
            "Internet": ["IP", "ICMP", "ARP"],
            "Network Interface": ["Ethernet", "WiFi", "PPP"]
        }
        
        for layer, protocols_list in layers.items():
            print(f"  {layer} Layer: {', '.join(protocols_list)}")
        
        print("\n" + "=" * 50 + "\n")

    def network_security_basics(self):
        """Demonstrate basic network security concepts"""
        print("🛡️ NETWORK SECURITY BASICS")
        print("=" * 50)
        
        print("Common Network Security Threats:")
        threats = [
            "Packet Sniffing - Intercepting network traffic",
            "Man-in-the-Middle - Intercepting communications",
            "DDoS Attacks - Overwhelming network resources", 
            "Port Scanning - Discovering open services",
            "IP Spoofing - Forging source IP addresses"
        ]
        
        for i, threat in enumerate(threats, 1):
            print(f"  {i}. {threat}")
        
        print("\nSecurity Measures:")
        measures = [
            "Encryption (SSL/TLS, VPN)",
            "Firewalls and Access Control",
            "Network Monitoring and IDS",
            "Authentication and Authorization",
            "Regular Security Updates"
        ]
        
        for i, measure in enumerate(measures, 1):
            print(f"  {i}. {measure}")
        
        print("\nBasic Security Check:")
        # Check for common security indicators
        try:
            # Check if we're running as root (security concern)
            if os.geteuid() == 0:
                print("  ⚠️ Running as root - potential security risk")
            else:
                print("  ✅ Running as non-root user")
                
            # Check firewall status (if available)
            result = subprocess.run(['which', 'ufw'], capture_output=True)
            if result.returncode == 0:
                result = subprocess.run(['ufw', 'status'], capture_output=True, text=True)
                if 'Status: active' in result.stdout:
                    print("  ✅ Firewall is active")
                else:
                    print("  ⚠️ Firewall may be inactive")
            else:
                print("  ℹ️ UFW firewall not available")
                
        except Exception as e:
            print(f"  ❌ Security check error: {e}")
        
        print("\n" + "=" * 50 + "\n")

    def cleanup(self):
        """Clean up temporary files"""
        try:
            import shutil
            shutil.rmtree(self.temp_dir)
            print(f"🧹 Cleaned up temporary directory: {self.temp_dir}")
        except Exception as e:
            print(f"⚠️ Cleanup warning: {e}")

    def run_advanced_demos(self):
        """Run all advanced network demonstrations"""
        print("ADVANCED COMPUTER NETWORKS TOOLS")
        print("Subject Code: MCA24 - Extended Demonstrations")
        print("Institution: Ramaiah Institute of Technology (RIT)")
        print("=" * 70)
        print()
        
        try:
            self.network_monitoring()
            self.simulate_ftp_protocol()
            self.network_performance_test()
            self.protocol_analysis()
            self.network_security_basics()
            
            print("🎉 ADVANCED DEMONSTRATIONS COMPLETED!")
            print("\nAdvanced Concepts Covered:")
            print("✅ Network Monitoring and Statistics")
            print("✅ FTP Protocol Simulation")
            print("✅ Network Performance Testing")
            print("✅ Protocol Analysis and Characteristics")
            print("✅ Network Security Fundamentals")
            
        except KeyboardInterrupt:
            print("\n❌ Advanced demo interrupted by user")
        except Exception as e:
            print(f"❌ Advanced demo error: {e}")
        finally:
            self.cleanup()

def main():
    """Main function for advanced network tools"""
    tools = AdvancedNetworkTools()
    tools.run_advanced_demos()

if __name__ == "__main__":
    main()