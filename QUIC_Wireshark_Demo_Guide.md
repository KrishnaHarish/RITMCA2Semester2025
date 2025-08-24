# QUIC Protocol Analysis - Wireshark Demo Guide
**Subject Code:** MCA24  
**Topic:** Practical QUIC Analysis using Wireshark  
**Faculty:** Dr Manjunath M  
**Department:** MCA  
**Institution:** Ramaiah Institute of Technology, Bangalore - 560054  

---

## Table of Contents

1. [Demo Setup Instructions](#demo-setup-instructions)
2. [Live QUIC Traffic Capture](#live-quic-traffic-capture)
3. [Packet Analysis Walkthrough](#packet-analysis-walkthrough)
4. [Comparative Analysis: QUIC vs HTTP/2](#comparative-analysis-quic-vs-http2)
5. [Advanced Analysis Techniques](#advanced-analysis-techniques)
6. [Troubleshooting Guide](#troubleshooting-guide)
7. [Sample Analysis Results](#sample-analysis-results)

---

## Demo Setup Instructions

### Prerequisites

1. **Software Requirements**:
   - Wireshark 3.2 or later
   - Google Chrome (latest version)
   - Firefox (optional, for comparison)

2. **System Requirements**:
   - Administrator/root privileges for packet capture
   - Network interface access
   - Minimum 2GB RAM for analysis

### Installation Steps

#### Windows:
```powershell
# Download and install Wireshark from https://www.wireshark.org/
# Install with default options
# Ensure WinPcap/Npcap is installed

# Verify installation
wireshark --version
```

#### macOS:
```bash
# Install via Homebrew
brew install wireshark

# Or download from https://www.wireshark.org/
# Grant permissions for network access
```

#### Linux (Ubuntu/Debian):
```bash
# Install Wireshark
sudo apt update
sudo apt install wireshark

# Add user to wireshark group
sudo usermod -a -G wireshark $USER

# Reboot or log out/in for changes to take effect
sudo reboot
```

### Wireshark Configuration

1. **Enable QUIC Protocol**:
   - Open Wireshark
   - Go to `Analyze → Enabled Protocols`
   - Search for "QUIC"
   - Ensure QUIC is checked ✓

2. **Configure Preferences**:
   ```
   Edit → Preferences → Protocols → QUIC
   - Enable "Try to decode QUIC connections"
   - Set "QUIC UDP port" to 443 (default)
   ```

3. **Set up Columns**:
   ```
   View → Column Preferences
   Add custom columns:
   - QUIC Packet Type: %Cus:quic.packet.packet_type:0:R
   - QUIC Stream ID: %Cus:quic.stream.stream_id:0:R
   - Connection ID: %Cus:quic.connection.id:0:R
   ```

---

## Live QUIC Traffic Capture

### Demo 1: Google Search QUIC Analysis

#### Step 1: Prepare the Environment

1. **Clear Browser Data**:
   ```
   Chrome → Settings → Privacy and Security → Clear browsing data
   - Time range: All time
   - Check: Cookies, Cached images and files
   ```

2. **Enable QUIC in Chrome** (if not default):
   ```
   Navigate to: chrome://flags/
   Search: "Experimental QUIC protocol"
   Set to: Enabled
   Restart Chrome
   ```

#### Step 2: Start Packet Capture

1. **Open Wireshark**
2. **Select Network Interface**:
   - Choose your active network interface (WiFi/Ethernet)
   - Double-click to start capture

3. **Apply Capture Filter**:
   ```
   host google.com and udp port 443
   ```

#### Step 3: Generate QUIC Traffic

1. **Open Chrome** (ensure it's a fresh start)
2. **Navigate to**: `https://www.google.com`
3. **Perform Search**: Type "QUIC protocol" and press Enter
4. **Browse Results**: Click on a few search results
5. **Let capture run for 2-3 minutes**

#### Step 4: Stop and Analyze

1. **Stop Capture**: Ctrl+E or Capture → Stop
2. **Apply Display Filter**: `quic`
3. **Observe Results**

**Expected Output Example**:
```
No.    Time      Source          Destination     Protocol  Length  Info
1      0.000000  192.168.1.100   142.250.191.14  QUIC      1252    Initial, DCID=83a2f5b7c1d4e9f2
2      0.023445  142.250.191.14  192.168.1.100   QUIC      1200    Handshake, SCID=12a4b6c8d2e5f7a9
3      0.023567  192.168.1.100   142.250.191.14  QUIC      134     Handshake, ACK
4      0.024001  192.168.1.100   142.250.191.14  QUIC      89      Short Header, PN: 1
5      0.047823  142.250.191.14  192.168.1.100   QUIC      1200    Short Header, PN: 2
```

### Demo 2: YouTube QUIC Streaming Analysis

#### Capture Configuration:
```
Capture Filter: host youtube.com or host googlevideo.com
Display Filter: quic
```

#### Traffic Generation:
1. Open `https://www.youtube.com`
2. Start playing a video
3. Let it buffer and play for 5 minutes
4. Observe streaming patterns

**Key Observations**:
- High-frequency data packets
- Large packet sizes (up to 1500 bytes)
- Multiple concurrent streams
- Connection persistence

---

## Packet Analysis Walkthrough

### Analyzing QUIC Initial Packet

#### Packet Structure Breakdown:

```
Frame 1: 1252 bytes on wire (10016 bits), 1252 bytes captured (10016 bits)
Ethernet II, Src: aa:bb:cc:dd:ee:ff, Dst: 11:22:33:44:55:66
Internet Protocol Version 4, Src: 192.168.1.100, Dst: 142.250.191.14
User Datagram Protocol, Src Port: 52341, Dst Port: 443
QUIC
    Packet Type: Initial (0x00)
    Version: 0x00000001 (QUIC version 1)
    Destination Connection ID Length: 8
    Destination Connection ID: 83a2f5b7c1d4e9f2
    Source Connection ID Length: 8
    Source Connection ID: 12a4b6c8d2e5f7a9
    Token Length: 0
    Length: 1200
    Packet Number: 0x00000001
    Payload: [Encrypted]
        Crypto Frame
            Type: CRYPTO (0x06)
            Offset: 0
            Length: 315
            TLS Handshake Message [Encrypted]
        Padding Frame
            Type: PADDING (0x00)
            Length: 881 bytes
```

#### Analysis Points:

1. **Long Header Format**: Indicates initial connection setup
2. **Version Negotiation**: Shows QUIC version 1 (RFC 9000)
3. **Connection IDs**: Unique identifiers for connection tracking
4. **Encrypted Payload**: Contains TLS 1.3 Client Hello
5. **Padding**: Reaches minimum packet size requirements

### Analyzing QUIC Handshake Completion

#### Server Response Packet:
```
QUIC Handshake Packet
    Packet Type: Handshake (0x02)
    Version: 0x00000001
    DCID: 12a4b6c8d2e5f7a9 (reversed from initial)
    SCID: 83a2f5b7c1d4e9f2
    Packet Number: 0x00000001
    Payload:
        Crypto Frame
            TLS Server Hello [Encrypted]
            TLS Certificate [Encrypted]
            TLS Certificate Verify [Encrypted]
            TLS Finished [Encrypted]
        ACK Frame
            Type: ACK (0x02)
            Largest Acknowledged: 1
            ACK Delay: 1234 (microseconds)
```

### Analyzing Application Data (1-RTT Packets)

#### Short Header Packet:
```
QUIC Short Header
    Header Form: Short (0)
    Fixed Bit: 1
    Spin Bit: 0
    Reserved: 00
    Key Phase: 0
    Packet Number Length: 1 byte
    DCID: 83a2f5b7c1d4e9f2
    Packet Number: 0x05
    Payload [Encrypted]:
        Stream Frame
            Type: STREAM (0x08)
            Stream ID: 0 (Control Stream)
            Offset: 0
            Length: 45
            HTTP/3 Data [Encrypted]
```

---

## Comparative Analysis: QUIC vs HTTP/2

### Demo 3: Side-by-Side Comparison

#### Setup for HTTP/2 Capture:
1. **Disable QUIC in Chrome**:
   ```
   Start Chrome with: --disable-quic
   ```

2. **Capture HTTP/2 Traffic**:
   ```
   Capture Filter: host google.com and tcp port 443
   Display Filter: http2
   ```

#### Setup for QUIC Capture:
1. **Enable QUIC** (default Chrome behavior)
2. **Capture QUIC Traffic**:
   ```
   Capture Filter: host google.com and udp port 443
   Display Filter: quic
   ```

#### Comparison Table:

| Metric | HTTP/2 over TCP | HTTP/3 over QUIC |
|--------|-----------------|------------------|
| **Connection Setup** | 3 RTTs | 0-1 RTT |
| **Packets for handshake** | 6-8 packets | 2-4 packets |
| **Protocol overhead** | TCP+TLS+HTTP/2 | QUIC+HTTP/3 |
| **Stream multiplexing** | TCP-level HOL blocking | Independent streams |
| **Connection migration** | Not supported | Supported |
| **Packet loss handling** | TCP retransmission | QUIC selective retransmission |

#### Performance Metrics Collection:

**Timing Analysis**:
```
Wireshark → Statistics → I/O Graphs
- X-axis: Time
- Y-axis: Packets/second
- Filter 1: http2
- Filter 2: quic
- Compare traffic patterns
```

**Connection Analysis**:
```
Wireshark → Statistics → Conversations
- TCP tab: View HTTP/2 connections
- UDP tab: View QUIC connections
- Compare connection counts and data volumes
```

---

## Advanced Analysis Techniques

### Stream Analysis

#### Following QUIC Streams:
1. **Right-click on QUIC packet**
2. **Select "Follow → QUIC Stream"**
3. **Analyze stream data flow**

**Example Stream Output**:
```
Stream 0 (Control Stream):
→ SETTINGS frame
← SETTINGS frame
→ HTTP/3 Request Headers
← HTTP/3 Response Headers
← HTTP/3 Response Data

Stream 4 (Request Stream):
→ HTTP/3 Request Headers
← HTTP/3 Response Headers
← HTTP/3 Response Data (chunked)
```

### Connection Migration Analysis

#### Simulating Migration:
1. **Start QUIC connection on WiFi**
2. **Switch to mobile hotspot during transfer**
3. **Observe connection persistence**

**Migration Packet Example**:
```
QUIC Path Challenge
    Source IP: 192.168.1.100 (WiFi) → 10.0.0.50 (Mobile)
    DCID: Same (connection preserved)
    Frames:
        PATH_CHALLENGE: 0x1122334455667788
        
QUIC Path Response
    Destination IP: 10.0.0.50
    DCID: Same
    Frames:
        PATH_RESPONSE: 0x1122334455667788
```

### Flow Control Analysis

#### QUIC Flow Control Frames:
```
MAX_DATA Frame
    Type: MAX_DATA (0x10)
    Maximum Data: 1048576 (1MB)

MAX_STREAM_DATA Frame
    Type: MAX_STREAM_DATA (0x11)
    Stream ID: 4
    Maximum Stream Data: 65536 (64KB)

STREAM_DATA_BLOCKED Frame
    Type: STREAM_DATA_BLOCKED (0x15)
    Stream ID: 8
    Maximum Stream Data: 32768
```

### Congestion Control Monitoring

#### Packet Loss Detection:
```
# Filter for retransmissions
quic and quic.frame.type == 0x02

# ACK frame analysis
quic.ack.largest_acknowledged
quic.ack.ack_delay
```

---

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. No QUIC Traffic Visible

**Symptoms**:
- Only TCP traffic on port 443
- No UDP packets to/from server

**Diagnostics**:
```bash
# Check if server supports QUIC
curl -I -H "Alt-Svc: h3=\":443\"" https://www.google.com

# Check Chrome QUIC status
chrome://net-internals/#quic
```

**Solutions**:
- Verify browser QUIC support
- Check server Alt-Svc headers
- Ensure UDP port 443 not blocked

#### 2. Cannot Decode QUIC Packets

**Symptoms**:
- Packets show as "UDP" instead of "QUIC"
- No protocol analysis available

**Solutions**:
1. **Update Wireshark** to 3.2+
2. **Enable QUIC protocol**:
   ```
   Analyze → Enabled Protocols → QUIC ✓
   ```
3. **Check UDP port mapping**:
   ```
   Edit → Preferences → Protocols → UDP
   Add port 443 → QUIC
   ```

#### 3. Incomplete Packet Capture

**Symptoms**:
- Missing handshake packets
- Fragmented captures

**Solutions**:
- Increase capture buffer size
- Use appropriate capture filters
- Ensure sufficient disk space

### Validation Checklist

Before starting analysis:
- [ ] Wireshark version 3.2+
- [ ] QUIC protocol enabled
- [ ] Appropriate capture permissions
- [ ] Target website supports QUIC
- [ ] Browser QUIC enabled
- [ ] Network allows UDP port 443

---

## Sample Analysis Results

### Sample Capture Statistics

#### Google Search QUIC Session:
```
Capture Duration: 60 seconds
Total Packets: 1,247
QUIC Packets: 892 (71.5%)
Average Packet Size: 1,156 bytes
Connections Established: 3
Streams Created: 12
Data Transferred: 2.1 MB
```

#### Detailed Breakdown:
```
Packet Types:
- Initial: 3 packets (0.3%)
- Handshake: 8 packets (0.9%)
- 0-RTT: 2 packets (0.2%)
- 1-RTT: 879 packets (98.6%)

Frame Types Distribution:
- STREAM: 654 frames (73.3%)
- ACK: 156 frames (17.5%)
- CRYPTO: 11 frames (1.2%)
- PADDING: 234 frames (26.2%)
- MAX_DATA: 23 frames (2.6%)
```

### Performance Comparison Results

#### Connection Establishment Time:
```
HTTP/2 over TCP:
- DNS Resolution: 45ms
- TCP Handshake: 67ms
- TLS Handshake: 89ms
- Total: 201ms

HTTP/3 over QUIC:
- DNS Resolution: 45ms
- QUIC Handshake: 34ms
- Total: 79ms
- Improvement: 60.7% faster
```

#### Data Transfer Efficiency:
```
Page Load Test (google.com):
HTTP/2:
- Time to First Byte: 156ms
- Page Load Complete: 1,234ms
- Requests: 23
- Connections: 4

HTTP/3:
- Time to First Byte: 89ms
- Page Load Complete: 987ms
- Requests: 23
- Connections: 1
- Improvement: 20% faster
```

### Real-World Analysis Examples

#### YouTube Video Streaming:
```
Video: 1080p, 5-minute duration
Protocol: QUIC/HTTP3

Stream Analysis:
- Video Stream ID: 4
- Audio Stream ID: 8
- Metadata Stream ID: 12

Bandwidth Usage:
- Peak: 8.5 Mbps
- Average: 6.2 Mbps
- Efficiency: 94.3% (low overhead)

Connection Resilience:
- Network changes: 2
- Connection maintained: 100%
- Zero interruptions
```

#### CDN Performance (Cloudflare):
```
Test Site: cloudflare.com
Geographic Distance: 2,000km

QUIC Advantages Observed:
- 0-RTT resumption: 67% of connections
- Packet loss recovery: 40% faster
- Mobile performance: 25% improvement
- Connection migration: Seamless
```

---

## Lab Exercise Templates

### Exercise 1: Basic QUIC Identification

**Objective**: Learn to identify and filter QUIC traffic

**Pre-lab Setup**:
1. Install Wireshark
2. Configure QUIC protocol support
3. Test network connectivity

**Procedure**:
1. Start 5-minute capture with filter: `udp`
2. Browse 5 different websites
3. Apply post-capture filter: `quic`
4. Document findings

**Expected Results**:
- Percentage of QUIC vs other protocols
- Most common QUIC destinations
- Packet size distribution

**Report Template**:
```
Student Name: _______________
Lab Date: __________________

Results:
Total Packets Captured: _____
QUIC Packets: _____ (____%)
Other UDP: _____ (____%)

Top 3 QUIC Destinations:
1. ________________________
2. ________________________
3. ________________________

Analysis Questions:
1. Why do some sites use QUIC while others don't?
2. What factors influence QUIC adoption?
3. How does QUIC packet size compare to TCP?
```

### Exercise 2: Handshake Analysis

**Objective**: Understand QUIC connection establishment

**Procedure**:
1. Clear browser cache
2. Start targeted capture: `host google.com and udp`
3. Navigate to https://www.google.com
4. Analyze first 10 packets

**Analysis Points**:
- Identify Initial packet
- Locate TLS handshake data
- Measure connection establishment time
- Compare with HTTP/2 equivalent

### Exercise 3: Stream Multiplexing

**Objective**: Observe concurrent stream handling

**Procedure**:
1. Capture traffic while loading image-heavy webpage
2. Use filter: `quic.stream.stream_id`
3. Identify different stream IDs
4. Map streams to page resources

**Deliverable**: Stream mapping diagram showing:
- Stream ID assignments
- Resource types per stream
- Timing relationships
- Dependency patterns

---

## Conclusion

This practical guide provides hands-on experience with QUIC protocol analysis using Wireshark. Key learning outcomes include:

1. **Protocol Recognition**: Ability to identify QUIC traffic in network captures
2. **Performance Analysis**: Understanding QUIC's speed advantages over HTTP/2
3. **Security Awareness**: Recognizing built-in encryption and privacy features
4. **Troubleshooting Skills**: Diagnosing QUIC connectivity and performance issues
5. **Real-world Applications**: Analyzing actual QUIC deployments in production

The combination of theoretical knowledge and practical analysis provides a comprehensive understanding of modern web protocol evolution and performance optimization techniques.

---

## Additional Resources

### Online Tools:
- **HTTP/3 Test Sites**: https://http3check.net/
- **QUIC Implementation Status**: https://github.com/quicwg/base-drafts/wiki/Implementations
- **Browser QUIC Status**: chrome://net-internals/#quic

### Sample Captures:
- Available in course repository
- Various scenarios: browsing, streaming, file transfer
- Different network conditions: WiFi, mobile, poor connectivity

### Further Reading:
- Wireshark QUIC Analysis Guide
- Chrome DevTools Network Analysis
- QUIC Performance Studies
- RFC 9000 Implementation Notes

---

**End of Wireshark Demo Guide**