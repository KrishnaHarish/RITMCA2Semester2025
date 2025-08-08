# Computer Networks  
**Subject Code:** MCA24  
**Topic:** QUIC Protocol Analysis and Wireshark Demo  
**Faculty:** Dr Manjunath M  
**Department:** MCA  
**Institution:** Ramaiah Institute of Technology, Bangalore - 560054  

---

## Table of Contents

1. [Introduction to QUIC Protocol](#introduction-to-quic-protocol)
2. [QUIC vs HTTP/2 and TCP](#quic-vs-http2-and-tcp)
3. [QUIC Protocol Architecture](#quic-protocol-architecture)
4. [QUIC Features and Benefits](#quic-features-and-benefits)
5. [QUIC Packet Structure](#quic-packet-structure)
6. [Connection Establishment](#connection-establishment)
7. [QUIC in Real-World Applications](#quic-in-real-world-applications)
8. [Wireshark Analysis Setup](#wireshark-analysis-setup)
9. [QUIC Traffic Analysis Demo](#quic-traffic-analysis-demo)
10. [Practical Exercises](#practical-exercises)

---

## Introduction to QUIC Protocol

### What is QUIC?

**QUIC (Quick UDP Internet Connections)** is a modern transport protocol developed by Google, standardized as RFC 9000 in 2021. It's designed to provide:

- **Faster connection establishment**
- **Improved security** (built-in encryption)
- **Better performance** over unreliable networks
- **Multiplexing** without head-of-line blocking

### Key Characteristics:

- **Transport Protocol**: Operates at the transport layer
- **UDP-based**: Built on top of UDP instead of TCP
- **Encrypted by default**: All packets are encrypted
- **HTTP/3 foundation**: HTTP/3 runs on top of QUIC
- **Multiplexed streams**: Multiple data streams in a single connection

---

## QUIC vs HTTP/2 and TCP

### Traditional Web Stack (HTTP/1.1 & HTTP/2):
```
Application Layer:    HTTP/1.1 or HTTP/2
Transport Layer:      TCP
Security Layer:       TLS
Network Layer:        IP
```

### Modern QUIC Stack (HTTP/3):
```
Application Layer:    HTTP/3
Transport Layer:      QUIC (includes TLS 1.3)
Network Layer:        UDP + IP
```

### Comparison Table:

| Feature | TCP + TLS + HTTP/2 | QUIC + HTTP/3 |
|---------|-------------------|---------------|
| **Handshake RTTs** | 3 RTTs (TCP + TLS + HTTP/2) | 0-1 RTT |
| **Head-of-line blocking** | Yes (TCP level) | No |
| **Connection migration** | No | Yes |
| **Multiplexing** | Stream level only | Independent streams |
| **Encryption** | Optional (TLS) | Built-in |
| **Packet loss recovery** | TCP retransmission | Per-stream recovery |

---

## QUIC Protocol Architecture

### Core Components:

1. **Connection Management**
   - Connection IDs for mobility support
   - Connection migration across networks

2. **Stream Management**
   - Independent bidirectional streams
   - Flow control per stream and connection

3. **Packet Protection**
   - Header protection
   - Payload encryption
   - Integrity verification

4. **Congestion Control**
   - Similar to TCP algorithms
   - Improved loss detection

### QUIC Layers:

```
┌─────────────────────────────────────┐
│           HTTP/3 (RFC 9114)         │
├─────────────────────────────────────┤
│         QUIC Transport              │
│    ┌─────────────────────────────┐   │
│    │    Stream Multiplexing      │   │
│    ├─────────────────────────────┤   │
│    │    Congestion Control       │   │
│    ├─────────────────────────────┤   │
│    │      Flow Control           │   │
│    ├─────────────────────────────┤   │
│    │   Connection Management     │   │
│    └─────────────────────────────┘   │
├─────────────────────────────────────┤
│         TLS 1.3 Encryption          │
├─────────────────────────────────────┤
│              UDP                    │
├─────────────────────────────────────┤
│              IP                     │
└─────────────────────────────────────┘
```

---

## QUIC Features and Benefits

### 1. Reduced Connection Establishment Time

**Traditional TCP + TLS:**
```
Client                    Server
  |                         |
  |------ TCP SYN --------->|  (1 RTT)
  |<--- TCP SYN-ACK --------|
  |------ TCP ACK --------->|
  |                         |
  |------ TLS Hello ------->|  (1-2 RTT)
  |<---- TLS Response ------|
  |                         |
  |--- HTTP/2 Request ----->|  (1 RTT)
  |                         |
Total: 3+ RTTs
```

**QUIC 0-RTT:**
```
Client                    Server
  |                         |
  |--- QUIC Initial ------->|  (0-1 RTT)
  |--- HTTP/3 Request ----->|  (Same packet)
  |<--- Response ----------|
  |                         |
Total: 0-1 RTT
```

### 2. Independent Stream Multiplexing

- **HTTP/2 Problem**: Head-of-line blocking at TCP level
- **QUIC Solution**: Independent streams, packet loss affects only one stream

### 3. Connection Migration

- Connections survive network changes (WiFi to cellular)
- Uses Connection IDs instead of IP:port tuples

### 4. Built-in Security

- All packets encrypted with TLS 1.3
- Header protection prevents metadata leakage
- Forward secrecy by default

---

## QUIC Packet Structure

### Packet Types:

1. **Initial Packets**: Connection establishment
2. **Handshake Packets**: Cryptographic handshake
3. **0-RTT Packets**: Early data transmission
4. **1-RTT Packets**: Protected application data

### Long Header Format (Initial/Handshake):
```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+
|1|   Type(7)   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                         Version                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| DCID Len (8)  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|               Destination Connection ID (0..160)           ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| SCID Len (8)  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                 Source Connection ID (0..160)              ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Payload Length                       ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Packet Number (8/16/24/32)              ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                          Payload                           ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### Short Header Format (1-RTT):
```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+
|0|1|S|R|R|K|P P|
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                Destination Connection ID (0..160)          ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     Packet Number (8/16/24/32)             ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     Protected Payload                      ...
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

---

## Connection Establishment

### QUIC Handshake Process:

1. **Client Initial Packet**:
   - Contains TLS Client Hello
   - Connection ID proposal
   - Supported versions

2. **Server Response**:
   - Server Hello in Handshake packet
   - Certificate and key exchange
   - Connection parameters

3. **Client Confirmation**:
   - Handshake completion
   - Application data can start

### 0-RTT Data Transmission:

For resumed connections:
- Client sends application data immediately
- Uses cached connection parameters
- Server validates and processes early data

---

## QUIC in Real-World Applications

### Major Adopters:

1. **Google Services**:
   - YouTube (significant traffic percentage)
   - Google Search
   - Gmail, Google Drive

2. **Content Delivery Networks**:
   - Cloudflare
   - Fastly
   - AWS CloudFront

3. **Browsers**:
   - Chrome (default enabled)
   - Firefox
   - Safari
   - Edge

### Performance Improvements:

- **YouTube**: 15% reduction in rebuffering
- **Google Search**: 2% improvement in page load times
- **General Web**: 10-20% faster page loads on mobile networks

---

## Wireshark Analysis Setup

### Prerequisites:

1. **Wireshark Installation**:
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install wireshark
   
   # Windows: Download from wireshark.org
   # macOS: Download from wireshark.org or use Homebrew
   brew install wireshark
   ```

2. **Enable QUIC Protocol Support**:
   - Wireshark 3.2+ has built-in QUIC support
   - Enable QUIC dissector: Analyze → Enabled Protocols → QUIC

### Capture Setup:

1. **Network Interface Selection**:
   - Choose appropriate interface (WiFi/Ethernet)
   - Ensure sufficient permissions

2. **Capture Filters**:
   ```
   # Capture UDP traffic on common QUIC ports
   udp port 443 or udp port 80
   
   # Capture all UDP traffic
   udp
   
   # Specific host
   host google.com and udp
   ```

3. **Display Filters for QUIC**:
   ```
   # All QUIC packets
   quic
   
   # QUIC handshake packets
   quic.header_form == 1
   
   # QUIC data packets
   quic.header_form == 0
   
   # Specific connection
   quic.connection.id == <connection_id>
   
   # QUIC streams
   quic.stream.stream_id == <stream_id>
   ```

---

## QUIC Traffic Analysis Demo

### Demo Scenario: Analyzing Google Search Traffic

#### Step 1: Start Packet Capture

1. Open Wireshark
2. Select network interface
3. Apply capture filter: `host google.com and udp`
4. Start capture

#### Step 2: Generate QUIC Traffic

1. Open Chrome browser
2. Navigate to `https://www.google.com`
3. Perform a search query
4. Observe network activity

#### Step 3: Analyze Captured Packets

**Initial Packet Analysis:**
```
Frame 1: QUIC Initial Packet
├── UDP Header
│   ├── Source Port: 52341
│   ├── Destination Port: 443
│   ├── Length: 1252
│   └── Checksum: 0x1a2b
├── QUIC Header
│   ├── Header Form: Long (1)
│   ├── Packet Type: Initial (0)
│   ├── Version: 0x00000001
│   ├── DCID Length: 8
│   ├── DCID: 83a2f5b7c1d4e9f2
│   ├── SCID Length: 8
│   ├── SCID: 12a4b6c8d2e5f7a9
│   └── Packet Number: 1
└── Encrypted Payload
    └── TLS Client Hello (encrypted)
```

**Handshake Packet Analysis:**
```
Frame 2: QUIC Handshake Packet
├── UDP Header
├── QUIC Header
│   ├── Header Form: Long (1)
│   ├── Packet Type: Handshake (2)
│   └── Packet Number: 2
└── Encrypted Payload
    └── TLS Server Hello (encrypted)
```

**Application Data Packet:**
```
Frame 5: QUIC 1-RTT Packet
├── UDP Header
├── QUIC Header
│   ├── Header Form: Short (0)
│   ├── DCID: 83a2f5b7c1d4e9f2
│   └── Packet Number: 5
└── Encrypted Payload
    └── HTTP/3 Data (encrypted)
```

#### Step 4: Stream Analysis

**Identifying HTTP/3 Streams:**
1. Use filter: `quic and http3`
2. Follow stream: Right-click → Follow → QUIC Stream
3. Analyze request/response patterns

**Key Metrics to Observe:**
- **Connection establishment time**
- **Stream multiplexing**
- **Packet sizes and patterns**
- **Connection migration events**

### Demo Scenario: Connection Migration

#### Simulating Network Change:

1. Start capture while connected to WiFi
2. Begin downloading large file
3. Switch to mobile hotspot
4. Observe connection migration in Wireshark

**Connection Migration Packet:**
```
Frame 15: Connection Migration
├── QUIC Header (Short)
│   ├── DCID: 83a2f5b7c1d4e9f2 (same)
│   └── New Source IP: 192.168.1.100
└── PATH_CHALLENGE Frame
    └── Data: Random 8 bytes
```

---

## Practical Exercises

### Exercise 1: Basic QUIC Identification

**Objective**: Identify QUIC packets in network traffic

**Steps**:
1. Capture 5 minutes of general web browsing
2. Use filter `quic` to identify QUIC traffic
3. Count total QUIC packets vs HTTP/1.1 and HTTP/2
4. Document findings

**Expected Observations**:
- QUIC usage percentage
- Common destination ports
- Packet size distributions

### Exercise 2: Handshake Analysis

**Objective**: Analyze QUIC connection establishment

**Steps**:
1. Clear browser cache and restart
2. Start Wireshark capture
3. Visit `https://www.youtube.com`
4. Stop capture after page loads
5. Analyze handshake sequence

**Analysis Points**:
- Number of RTTs required
- Initial packet size
- Handshake completion time
- 0-RTT data presence

### Exercise 3: Stream Multiplexing Demonstration

**Objective**: Observe stream multiplexing in action

**Steps**:
1. Capture traffic while loading content-rich page
2. Filter for single QUIC connection
3. Identify different stream IDs
4. Map streams to different resources

**Key Findings**:
- Number of concurrent streams
- Stream priority mechanisms
- Head-of-line blocking absence

### Exercise 4: Performance Comparison

**Objective**: Compare QUIC vs TCP performance

**Steps**:
1. **Test Setup**:
   - Force HTTP/1.1: Chrome flag `--disable-quic`
   - Force HTTP/2: Normal browser
   - Enable HTTP/3: Chrome flag `--enable-quic`

2. **Measurements**:
   - Page load times
   - Number of connections
   - Bytes transferred
   - Packet counts

3. **Analysis**:
   - Create comparison table
   - Document performance differences
   - Explain observed behaviors

### Exercise 5: Security Analysis

**Objective**: Understand QUIC security features

**Steps**:
1. Capture QUIC traffic
2. Attempt to decode encrypted payloads
3. Analyze header protection
4. Document security observations

**Security Features to Identify**:
- Encrypted packet numbers
- Protected headers
- Connection ID usage
- Forward secrecy evidence

---

## Advanced Analysis Techniques

### 1. QUIC Debugging in Chrome

Enable detailed logging:
```bash
# Start Chrome with QUIC logging
chrome --enable-logging --log-level=0 --vmodule=*quic*=2
```

Access internal tools:
- `chrome://net-internals/#quic`
- `chrome://flags/#enable-quic`

### 2. Custom Wireshark Dissectors

For experimental QUIC features:
```lua
-- Custom QUIC frame dissector
local quic_custom = Proto("quic_custom", "QUIC Custom Frame")

function quic_custom.dissector(buffer, pinfo, tree)
    local subtree = tree:add(quic_custom, buffer(), "QUIC Custom Frame")
    -- Add custom parsing logic
end
```

### 3. Statistical Analysis

Use Wireshark statistics:
- **Statistics → Conversations**: QUIC connection overview
- **Statistics → I/O Graphs**: Traffic patterns
- **Statistics → Protocol Hierarchy**: Protocol distribution

---

## Troubleshooting Common Issues

### 1. QUIC Not Being Used

**Symptoms**: Only seeing TCP traffic to port 443

**Solutions**:
- Check browser QUIC support
- Verify server QUIC capability
- Check Alt-Svc headers in HTTP responses

### 2. Cannot Decrypt QUIC Traffic

**Expected Behavior**: QUIC payloads are always encrypted

**For Analysis**:
- Focus on header information
- Analyze connection patterns
- Use timing analysis
- Monitor frame types when visible

### 3. Wireshark Not Detecting QUIC

**Solutions**:
- Update Wireshark to 3.2+
- Enable QUIC protocol dissector
- Check UDP traffic on ports 80, 443
- Verify packet completeness

---

## Conclusion

QUIC represents a significant evolution in transport protocols, offering:

- **Improved Performance**: Faster connection establishment and better handling of packet loss
- **Enhanced Security**: Built-in encryption and privacy features
- **Better User Experience**: Reduced latency and improved reliability
- **Future-Proof Design**: Foundation for HTTP/3 and modern web applications

Understanding QUIC protocol through Wireshark analysis provides valuable insights into:
- Modern network protocol design
- Real-world performance optimization
- Security implementation in transport protocols
- Evolution of web technologies

### Key Takeaways:

1. **QUIC combines transport and security layers** for efficiency
2. **0-RTT connections** significantly improve user experience
3. **Stream multiplexing** eliminates head-of-line blocking
4. **Connection migration** enables seamless network transitions
5. **Wireshark analysis** reveals protocol behavior and performance characteristics

---

## References and Further Reading

1. **RFC 9000**: QUIC: A UDP-Based Multiplexed and Secure Transport
2. **RFC 9114**: HTTP/3
3. **Wireshark User Guide**: QUIC Protocol Analysis
4. **Chrome QUIC Documentation**: Developer resources
5. **IETF QUIC Working Group**: Latest specifications and developments

---

**End of QUIC Protocol Analysis Notes**