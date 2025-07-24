# QUIC Protocol Analysis - Lab Exercise
**Subject Code:** MCA24  
**Topic:** Practical QUIC Analysis using Wireshark  
**Faculty:** Dr Manjunath M  
**Department:** MCA  
**Institution:** Ramaiah Institute of Technology, Bangalore - 560054  

---

## Lab Exercise Overview

**Duration:** 2 hours  
**Difficulty:** Intermediate  
**Prerequisites:** Basic networking knowledge, Wireshark familiarity  

### Learning Objectives

By the end of this lab, students will be able to:
1. **Identify QUIC traffic** in network captures
2. **Analyze QUIC packet structure** and understand key fields
3. **Compare QUIC performance** with traditional HTTP/2
4. **Use Wireshark filters** effectively for QUIC analysis
5. **Interpret connection establishment** and data transfer patterns
6. **Understand QUIC security features** and encryption

---

## Pre-Lab Setup

### Software Requirements
- [ ] Wireshark 3.2 or later installed
- [ ] Google Chrome (latest version)
- [ ] Firefox (optional, for comparison)
- [ ] Network connectivity with administrative privileges

### Lab Environment Setup

#### Step 1: Install and Configure Wireshark

**Windows:**
```cmd
1. Download Wireshark from https://www.wireshark.org/
2. Install with default options (ensure Npcap is selected)
3. Run as Administrator for packet capture
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install wireshark
sudo usermod -a -G wireshark $USER
# Log out and back in, or restart
```

**macOS:**
```bash
# Using Homebrew
brew install wireshark
# Or download from https://www.wireshark.org/
```

#### Step 2: Verify QUIC Protocol Support

1. Open Wireshark
2. Go to `Analyze → Enabled Protocols`
3. Search for "QUIC"
4. Ensure QUIC protocol is enabled ✓

#### Step 3: Configure Custom Columns (Optional)
```
View → Column Preferences → Add:
- Column 1: "QUIC Type" → Custom → %Cus:quic.packet.packet_type:0:R
- Column 2: "Stream ID" → Custom → %Cus:quic.stream.stream_id:0:R
- Column 3: "Conn ID" → Custom → %Cus:quic.connection.id:0:R
```

---

## Lab Exercise 1: QUIC Traffic Identification

### Objective
Learn to identify QUIC traffic and distinguish it from other protocols.

### Procedure

#### Part A: Baseline Capture

1. **Start General Capture**
   ```
   Capture Filter: (leave empty for all traffic)
   Duration: 5 minutes
   ```

2. **Generate Mixed Traffic**
   - Browse 5 different websites
   - Include: Google, YouTube, CloudFlare, Amazon, Wikipedia
   - Perform searches and navigate between pages

3. **Stop Capture and Analyze**
   ```
   Display Filter: quic
   ```

#### Part B: Protocol Distribution Analysis

1. **Check Protocol Hierarchy**
   ```
   Statistics → Protocol Hierarchy
   Look for: UDP → QUIC
   ```

2. **Answer Questions:**
   - What percentage of traffic was QUIC?
   - Which websites used QUIC vs HTTP/2?
   - What are the most common destination ports for QUIC?

### Expected Results Template
```
Total Packets Captured: _______
QUIC Packets: _______ (_____%)
HTTP/2 Packets: _______ (_____%)
Other Protocols: _______ (_____%)

QUIC Destinations Observed:
1. ________________________________
2. ________________________________
3. ________________________________

Most Common QUIC Port: _____________
```

---

## Lab Exercise 2: QUIC Connection Analysis

### Objective
Analyze QUIC connection establishment and compare with HTTP/2.

### Procedure

#### Part A: QUIC Connection Capture

1. **Clear Browser Data**
   ```
   Chrome → Settings → Privacy and Security
   → Clear browsing data → All time
   Check: Cookies, Cached images and files
   ```

2. **Start Targeted Capture**
   ```
   Capture Filter: host google.com and udp port 443
   ```

3. **Generate QUIC Traffic**
   - Navigate to: https://www.google.com
   - Perform a search for "QUIC protocol"
   - Click on 2-3 search results
   - Return to Google and search for "HTTP/3"

4. **Stop Capture**

#### Part B: Connection Analysis

1. **Apply Display Filter**
   ```
   quic
   ```

2. **Identify Key Packets**
   - Find the first Initial packet
   - Locate Handshake packets
   - Identify when data transfer begins

3. **Analyze Initial Packet**
   - Expand QUIC protocol details
   - Note Connection IDs
   - Examine packet size and structure

#### Part C: HTTP/2 Comparison

1. **Disable QUIC in Chrome**
   ```
   Chrome flags: chrome://flags/
   Search: "Experimental QUIC protocol"
   Set to: Disabled
   Restart Chrome
   ```

2. **Repeat Capture Process**
   ```
   Capture Filter: host google.com and tcp port 443
   Display Filter: http2 or tls
   ```

3. **Compare Results**

### Analysis Questions

1. **Connection Establishment:**
   - How many packets were required for QUIC connection setup?
   - How many packets were required for HTTP/2 connection setup?
   - What is the time difference between first packet and data transfer?

2. **Packet Structure:**
   - What information is visible in QUIC Initial packets?
   - How does QUIC Connection ID work?
   - What security measures can you observe?

### Results Template
```
QUIC Connection Analysis:
- Initial packet time: ________________
- Handshake complete time: ____________
- Total connection setup time: _______
- Number of setup packets: ___________

HTTP/2 Connection Analysis:
- TCP SYN time: ____________________
- TLS handshake complete: __________
- Total connection setup time: ______
- Number of setup packets: __________

Performance Difference: ______________
```

---

## Lab Exercise 3: Packet Structure Deep Dive

### Objective
Understand QUIC packet format and analyze different packet types.

### Procedure

#### Part A: Packet Type Analysis

1. **Use Previous QUIC Capture or Create New One**

2. **Analyze Different Packet Types**

   **Initial Packet Analysis:**
   ```
   Filter: quic.header_form == 1 and quic.packet.packet_type == 0
   ```
   - Examine header structure
   - Note Connection ID fields
   - Observe payload size

   **Handshake Packet Analysis:**
   ```
   Filter: quic.header_form == 1 and quic.packet.packet_type == 2
   ```
   - Compare with Initial packet
   - Note encryption differences

   **Data Packet Analysis (1-RTT):**
   ```
   Filter: quic.header_form == 0
   ```
   - Observe Short Header format
   - Note protected packet numbers
   - Examine stream data

#### Part B: Frame Analysis

1. **Stream Frame Analysis**
   ```
   Filter: quic.frame.type == 8
   ```
   - Identify different stream IDs
   - Observe data lengths
   - Note stream ordering

2. **ACK Frame Analysis**
   ```
   Filter: quic.frame.type == 2
   ```
   - Examine acknowledgment patterns
   - Note ACK delays
   - Observe packet ranges

3. **Flow Control Frames**
   ```
   Filter: quic.frame.type == 16 or quic.frame.type == 17
   ```
   - MAX_DATA frames
   - MAX_STREAM_DATA frames
   - Flow control values

### Packet Analysis Worksheet

**Initial Packet Details:**
```
Header Form: ___________________
Packet Type: ___________________
Version: _______________________
DCID Length: ___________________
Destination Connection ID: _____
SCID Length: ___________________
Source Connection ID: __________
Packet Number: _________________
Payload Length: _______________
```

**1-RTT Packet Details:**
```
Header Form: ___________________
Fixed Bit: ____________________
Spin Bit: _____________________
Key Phase: ____________________
Packet Number Length: __________
Destination Connection ID: _____
Packet Number: _________________
```

---

## Lab Exercise 4: Stream Multiplexing Analysis

### Objective
Understand QUIC's stream multiplexing capabilities and compare with HTTP/2.

### Procedure

#### Part A: Multi-Stream Capture

1. **Target Content-Rich Site**
   ```
   Capture Filter: host youtube.com or host googlevideo.com
   ```

2. **Generate Multi-Stream Traffic**
   - Navigate to https://www.youtube.com
   - Start playing a video
   - Browse recommended videos (don't click, just hover)
   - Let video play for 2-3 minutes

3. **Analyze Stream Patterns**
   ```
   Display Filter: quic and quic.stream.stream_id
   ```

#### Part B: Stream Identification

1. **List All Streams**
   ```
   Statistics → Conversations → QUIC Streams
   ```

2. **Analyze Individual Streams**
   - Right-click on QUIC packet
   - Select "Follow → QUIC Stream"
   - Examine data flow patterns

3. **Stream Categorization**
   - Control streams (ID 0, 2, 6, 10...)
   - Request streams (ID 4, 8, 12...)
   - Push streams (if any)

#### Part C: Head-of-Line Blocking Test

1. **Simulate Packet Loss**
   - Observe what happens when packets are lost
   - Compare stream independence

2. **Compare with HTTP/2**
   - Repeat similar test with HTTP/2
   - Note differences in blocking behavior

### Stream Analysis Results

```
Total Streams Observed: ________________
Control Streams: ______________________
Request Streams: ______________________
Average Stream Duration: ______________
Concurrent Streams (peak): ____________

Stream Independence Evidence:
___________________________________________
___________________________________________
___________________________________________
```

---

## Lab Exercise 5: Security Analysis

### Objective
Examine QUIC's built-in security features and encryption.

### Procedure

#### Part A: Encryption Analysis

1. **Examine Packet Protection**
   ```
   Display Filter: quic
   ```
   - Note that all payloads are encrypted
   - Observe header protection
   - Check packet number encryption

2. **Connection ID Privacy**
   - Observe how Connection IDs are used
   - Note Connection ID rotation (if visible)
   - Understand privacy implications

#### Part B: Security Comparison

1. **Compare with HTTP/2**
   - HTTP/2 without TLS (if available)
   - Note plaintext vs encrypted content
   - Observe TLS layer separation

2. **Metadata Protection**
   - What information is visible to network observers?
   - What is hidden by QUIC encryption?
   - How does this compare to traditional protocols?

### Security Analysis Report

```
Visible Metadata in QUIC:
1. _________________________________
2. _________________________________
3. _________________________________

Protected Information:
1. _________________________________
2. _________________________________
3. _________________________________

Security Advantages over HTTP/2:
___________________________________
___________________________________
___________________________________
```

---

## Lab Exercise 6: Performance Measurement

### Objective
Measure and compare QUIC vs HTTP/2 performance characteristics.

### Procedure

#### Part A: Controlled Performance Test

1. **Test Setup**
   - Same website with both protocols
   - Clear browser cache between tests
   - Use Chrome DevTools for timing

2. **QUIC Performance Test**
   ```
   Chrome: Default configuration (QUIC enabled)
   Capture Filter: host example.com and udp
   ```

3. **HTTP/2 Performance Test**
   ```
   Chrome: --disable-quic flag
   Capture Filter: host example.com and tcp port 443
   ```

#### Part B: Metrics Collection

1. **Timing Analysis**
   ```
   Wireshark → Statistics → I/O Graphs
   - X-axis: Time
   - Y-axis: Packets/second
   - Compare traffic patterns
   ```

2. **Connection Analysis**
   ```
   Statistics → Conversations
   - Compare connection counts
   - Analyze data volumes
   - Note connection persistence
   ```

3. **Round-Trip Time Analysis**
   - Measure handshake completion time
   - Compare first data packet timing
   - Calculate improvement percentage

### Performance Comparison Results

```
Page Load Test: _________________________

QUIC Results:
- Connection establishment: _____ ms
- Time to first byte: __________ ms
- Page load complete: __________ ms
- Total connections: ___________
- Data transferred: ____________

HTTP/2 Results:
- Connection establishment: _____ ms
- Time to first byte: __________ ms
- Page load complete: __________ ms
- Total connections: ___________
- Data transferred: ____________

Performance Improvement:
- Connection time: _____ % faster/slower
- TTFB: ______________ % faster/slower
- Page load: _________ % faster/slower
```

---

## Advanced Analysis (Optional)

### Connection Migration Simulation

If you have mobile hotspot capability:

1. **Start Download on WiFi**
   - Begin downloading large file
   - Start Wireshark capture

2. **Switch to Mobile**
   - Change to mobile hotspot
   - Observe connection persistence

3. **Analyze Migration**
   ```
   Filter: quic.frame.type == 26 or quic.frame.type == 27
   Look for: PATH_CHALLENGE and PATH_RESPONSE frames
   ```

---

## Troubleshooting Guide

### Common Issues and Solutions

#### No QUIC Traffic Visible
**Problem:** Only seeing TCP traffic to port 443
**Solution:**
- Check if site supports QUIC (Alt-Svc headers)
- Verify browser QUIC support is enabled
- Try different websites (Google, Cloudflare)

#### Wireshark Shows UDP Instead of QUIC
**Problem:** Packets appear as "UDP" not "QUIC"
**Solution:**
- Update Wireshark to 3.2+
- Enable QUIC protocol in settings
- Check port mappings (443 → QUIC)

#### Cannot Capture Packets
**Problem:** Permission denied or no interfaces
**Solution:**
- Run Wireshark as Administrator (Windows)
- Add user to wireshark group (Linux)
- Check network interface selection

---

## Lab Report Template

### Student Information
```
Name: _________________________________
Roll Number: __________________________
Date: _________________________________
Lab Partner: __________________________
```

### Executive Summary
```
Brief overview of findings and key observations:
____________________________________________
____________________________________________
____________________________________________
```

### Detailed Results

#### Exercise 1: Traffic Identification
- QUIC percentage: _____________________
- Key observations: ____________________

#### Exercise 2: Connection Analysis
- Performance improvement: _____________
- Key differences: _____________________

#### Exercise 3: Packet Structure
- Most interesting finding: _____________
- Security observations: _______________

#### Exercise 4: Stream Multiplexing
- Number of concurrent streams: ________
- Evidence of multiplexing: ____________

#### Exercise 5: Security Analysis
- Security advantages identified: _______
- Privacy implications: ________________

#### Exercise 6: Performance Measurement
- Quantitative improvements: ___________
- Qualitative differences: _____________

### Conclusions
```
What did you learn about QUIC protocol?
How does it compare to traditional HTTP/2?
What are the implications for web performance?
________________________________________________
________________________________________________
________________________________________________
```

### Recommendations
```
Based on your analysis, what recommendations would you make 
for web developers and network administrators?
________________________________________________
________________________________________________
________________________________________________
```

---

## Assessment Criteria

### Technical Understanding (40%)
- Correct identification of QUIC traffic
- Accurate packet analysis
- Understanding of protocol differences

### Analysis Quality (30%)
- Depth of investigation
- Quality of observations
- Use of appropriate filters

### Performance Measurement (20%)
- Accurate timing measurements
- Valid comparisons
- Quantitative analysis

### Report Quality (10%)
- Clear documentation
- Professional presentation
- Complete results

### Grading Scale
- A: 90-100% - Excellent understanding and analysis
- B: 80-89% - Good understanding with minor gaps
- C: 70-79% - Satisfactory understanding
- D: 60-69% - Basic understanding, needs improvement
- F: <60% - Insufficient understanding

---

## Additional Resources

### Reference Materials
- QUIC Protocol RFC 9000
- HTTP/3 RFC 9114
- Wireshark User Guide
- Chrome QUIC documentation

### Online Tools
- HTTP/3 Test: https://http3check.net/
- QUIC Implementation Status
- Browser Developer Tools

### Sample Capture Files
Available in course repository:
- `google_quic_capture.pcapng`
- `youtube_streaming.pcapng`
- `quic_vs_http2_comparison.pcapng`

---

**End of Lab Exercise**

## Submission Instructions

1. **Complete all exercises** during lab session
2. **Fill out lab report** template
3. **Save Wireshark captures** (compress if large)
4. **Submit electronically** before next class
5. **Include analysis files** and screenshots

**Due Date:** _________________  
**Submission Format:** PDF report + capture files  
**File Naming:** LastName_FirstName_QUIC_Lab.pdf  

---

**Good luck with your QUIC protocol analysis!** 🚀