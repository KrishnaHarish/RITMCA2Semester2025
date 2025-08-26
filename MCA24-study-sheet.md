# MCA24 Computer Networks — Detailed Notes with Diagrams
Semester End Examinations – Sept/Oct 2024
Program: MCA | Semester: II | Course Code: MCA24

How to use
- This is a comprehensive study sheet aligned to the question paper (Units I–V).
- Includes ASCII diagrams and worked examples (CRC, rdt2.1, TCP congestion).
- Practice redrawing diagrams by hand; memorize key definitions and contrasts.

Table of Contents
- Unit I: Foundations and TCP/IP Suite
- Unit II: Application Layer Protocols (HTTP, Cookies, FTP, SMTP) and DHT
- Unit III: Transport Layer (Multiplexing, TCP, UDP, Reliable Transfer)
- Unit IV: Congestion Control and IP Layer
- Unit V: Link Layer (Error Control, ARP, MAC, ALOHA, Routing Broadcast)

----------------------------------------------------------------------------

UNIT I — Foundations and TCP/IP Suite

1) Effectiveness of Data Communication
- Bandwidth (Hz or bps): Physical capacity of medium; upper bound on data rate.
- Throughput (bps): Actual achieved data rate (payload/time) including overhead and losses.
- Latency (delay): 
  - Transmission delay: L/R (bits / bps)
  - Propagation delay: distance / propagation speed
  - Processing + Queuing delays: device-dependent and load-dependent.
- Jitter: Variation in packet delay; critical for real-time media.
- Error rate: BER/PER; higher errors → more retransmissions → lower throughput.
- Reliability/Availability: MTBF, MTTR, redundancy; improves service consistency.
- Protocol overhead: Header/control bytes reduce payload efficiency.
- QoS support: Prioritization, shaping, policing, scheduling; guarantees for latency/bandwidth/jitter/loss.
- Medium characteristics: Noise, attenuation, interference, multipath (wireless), crosstalk.
- Topology and congestion: Path diversity, bottlenecks, contention hotspots.
- Security: Confidentiality, integrity, authentication; added processing and handshake overhead.
- Scalability: Performance as number of nodes/flows increases.

2) Fundamental Characteristics and Components
- Communication characteristics:
  - Delivery: Correct destination (addressing/routing).
  - Accuracy: Error detection/correction; in-order if required.
  - Timeliness: Bounded delay/jitter for time-sensitive data.
  - Security: CIA triad; endpoint and in-transit protection.

- Components:
  - Message: The data (bits/bytes, frames, packets).
  - Sender/Transmitter and Receiver: Hosts/end systems.
  - Medium: Guided (UTP, coax, fiber) or unguided (RF, microwave).
  - Encoders/Modems/Line coding: Convert digital data to signals suited to medium.
  - Interfaces: NICs, drivers, connectors.
  - Intermediaries: Hubs (rare), switches (L2), routers (L3), APs.
  - Protocols: Rules for syntax, semantics, timing.

```
+-----------+        +-----------------+        +-----------+
|  Sender   |---M----|  Transmission   |---M----| Receiver  |
| App/OS/NIC|        | Medium (L1/L2)  |        |App/OS/NIC |
+-----------+        +-----------------+        +-----------+
        ^                         ^                       ^
        |                         |                       |
      Protocols (L7↔L4↔L3↔L2↔L1), addressing, timing, error control, security
```

3) Data Flow Types
- Simplex: One-way only (e.g., keyboard → computer).
- Half-duplex: Both directions but not simultaneously (e.g., walkie-talkie).
- Full-duplex: Both directions simultaneously (e.g., switched Ethernet).

```
Simplex: A ---> B
Half-duplex: A <--> B (one at a time)
Full-duplex: A <====> B (simultaneous)
```

4) TCP/IP Protocol Suite and Key Fields
- Layering (encapsulation):

```
Application: HTTP, FTP, SMTP, DNS, ...
Transport:   TCP | UDP
Internet:    IP (IPv4/IPv6), ICMP
Link:        Ethernet, 802.11, PPP, etc.

App Data
  ↓
TCP/UDP Segment
  ↓
IP Packet
  ↓
Link-layer Frame
```

- Ethernet II frame (L2):

```
+---------+---------+------+-------------------+------+
| DestMAC | SrcMAC  | Type |      Payload      | FCS  |
| 6 bytes | 6 bytes | 2B   | (IP packet, ...)  | 4B   |
+---------+---------+------+-------------------+------+
```

- IPv4 header (L3):

```
+--------+--------+----------------+------------------+
|Ver|IHL|DSCP|ECN|     Total Length                 |
+----------------+---------------+-----+-------------+
|   Identification   |Flags| Fragment Offset         |
+--------------------+-----+------------------------+
|   TTL  | Protocol  |   Header Checksum            |
+--------------------------------+------------------+
|         Source IP Address                          |
+----------------------------------------------------+
|       Destination IP Address                        |
+----------------------------------------------------+
| Options (opt) | Padding (var)                      |
+----------------------------------------------------+
```

- TCP header (L4):

```
+--------------------+--------------------+
|   Src Port (16)    |   Dst Port (16)    |
+--------------------+--------------------+
|                 Sequence Number (32)    |
+-----------------------------------------+
|             Acknowledgment Number (32)  |
+------+----------------+-----------------+
|Data |  Flags (9)      |   Window (16)   |
|Off  |NS CWR ECE URG ACK PSH RST SYN FIN |
+------+----------------+-----------------+
|   Checksum (16)       | Urgent Ptr (16) |
+-----------------------------------------+
|      Options (MSS, WS, SACK, TS...)     |
+-----------------------------------------+
```

5) Multiplexing: FDM vs TDM

- FDM: Split frequency band into sub-bands (guard bands between).
  - Examples: Radio/TV channels; OFDM subcarriers; cable TV.

```
Frequency ->
|---Ch1---|---Ch2---|---Ch3---|---Ch4---|
```

- TDM: Split time into slots; users take turns.
  - Synchronous TDM (fixed slots) vs Statistical TDM (on demand).

```
Time ->
|U1|U2|U3|U4|U1|U2|U3|U4| (sync TDM)
```

6) Packet-Switched VC Phases (compare with datagram)
- Virtual Circuit (e.g., X.25/ATM): setup → data → teardown.

```
Setup: Path + VCID allocation
Data:  Small VCID in each packet; in-order over fixed path
Teardown: Release state/resources
```

- Datagram (IP): No setup; each packet routed independently; per-packet path may vary; best-effort.

----------------------------------------------------------------------------

UNIT II — Application Layer and DHT

1) HTTP/1.1 Request and Response Formats
- Request:

```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml
Accept-Language: en-US
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: cid=12345; session=abc...

[blank line]
[optional body for POST/PUT...]
```

- Response:

```
HTTP/1.1 200 OK
Date: Tue, 26 Aug 2025 08:00:00 GMT
Server: nginx/1.24
Content-Type: text/html; charset=UTF-8
Content-Length: 1024
Cache-Control: max-age=3600
ETag: "abc123"
Last-Modified: Mon, 25 Aug 2025 10:00:00 GMT
Set-Cookie: session=abc...; HttpOnly; Secure; SameSite=Lax

[blank line]
<html>...</html>
```

Notes:
- Stateless protocol; cookies/sessions add state.
- Persistent connections default in HTTP/1.1 (Connection: keep-alive).
- HTTP/2: binary framing, multiplexing, HPACK; HTTP/3: QUIC/UDP.

2) Cookies for E-commerce (Purchase Record)
- Use opaque identifiers in cookies; store purchase history server-side.

Flow:
1. First visit: Server issues Set-Cookie: cid=unique; Expires=+1yr; Domain=.example.com; Path=/; Secure; HttpOnly; SameSite=Lax.
2. Browser returns Cookie: cid=unique on subsequent requests.
3. Server DB: customers(cid) — identity, preferences, purchase_history linked by cid.
4. Cart session can be a transient cookie (sid=...); persistent cid ties long-term record.
5. Do not store sensitive data in cookies; protect with TLS; consider CSRF via SameSite.

3) FTP: Moving Files Between Local and Remote
- Two connections:
  - Control connection: TCP port 21 (commands, replies; persistent).
  - Data connection: Separate TCP (for file/list transfers).
    - Active: Client sends PORT; server connects from 20 → client.
    - Passive: Client sends PASV; server replies with IP:port; client connects.

Commands:
- USER, PASS, PWD, CWD, CDUP, LIST/NLST, RETR, STOR, DELE, MKD, RMD, TYPE A/I, PASV, PORT, SYST, QUIT

Replies:
- 1xx: Preliminary (150 File status okay; opening data connection)
- 2xx: Success (200 Command okay; 226 Closing data connection)
- 3xx: More info needed (331 User name okay; need password)
- 4xx/5xx: Transient/permanent failures (425 Can’t open data; 550 File unavailable)

Passive RETR flow:

```
C->S:   USER alice
S->C:   331
C->S:   PASS ****
S->C:   230
C->S:   TYPE I
S->C:   200
C->S:   PASV
S->C:   227 Entering Passive Mode (h1,h2,h3,h4,p1,p2)
C: open TCP to (h, p1*256+p2)
C->S:   RETR file.bin
S->C:   150 Opening BINARY mode data connection
[Data connection transfers file]
S->C:   226 Transfer complete
```

4) SMTP: Sending Email
- TCP 25 (server-to-server) or 587 (submission); push model; MIME for attachments.
- Example:

```
C: EHLO client.example
S: 250-example.net Hello
S: 250-STARTTLS
S: 250 AUTH PLAIN LOGIN
C: STARTTLS
S: 220 Ready to start TLS
[TLS established]
C: EHLO client.example
S: 250 OK
C: AUTH LOGIN
...
C: MAIL FROM:<alice@example.com>
S: 250 OK
C: RCPT TO:<bob@example.net>
S: 250 OK
C: DATA
S: 354 End data with <CRLF>.<CRLF>
C: From: Alice <alice@example.com>
C: To: Bob <bob@example.net>
C: Subject: Hi

C: Hello Bob
C: .
S: 250 2.0.0 Queued
C: QUIT
```

5) Circular DHT (Chord-like) — Scenario and Lookup
- Consistent hashing on identifier circle [0, 2^m).

Example (m=4):
- Nodes: {1, 3, 4, 8, 12}
- Keys map to successor node clockwise:
  - key 5 → node 8
  - key 0 → node 1

Finger table (per node) speeds up lookup:
- Node n’s i-th finger points to successor of (n + 2^(i-1)) mod 2^m

Lookup example (find key 5 from node 1):
- 1 → 4 → 8 (successor of 5) in O(log N) hops.

Join (node 6 joins):
- Find successor (8), set predecessor/successor pointers.
- Transfer keys in (5,6] from node 8 to node 6.
- Stabilize to fix fingers across nodes.

```
Ring (0..15):
0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 (wrap)
^   N1    N3 N4     N6     N8         N12
```

6) Transport Services Needed by Applications
- Reliability (no loss, in-order), timing (max delay/jitter), throughput (min rate), security (TLS), message boundaries (record vs stream), multiplexing/demux (ports), connection setup, flow and congestion control.
- Mapped via TCP (reliability, flow/congestion control) or UDP + app-level mechanisms; TLS adds security.

----------------------------------------------------------------------------

UNIT III — Transport: Multiplexing, TCP, UDP, Reliable Transfer

1) Connection-oriented Multiplexing/Demultiplexing (TCP)
- Sockets identified by 5-tuple: (SrcIP, SrcPort, DstIP, DstPort, Protocol).
- Server can serve many clients on the same destination port (e.g., 443).

```
Client A: (10.0.0.2:50000) ===\
                               \__ (203.0.113.10:443) Server
Client B: (10.0.0.3:50001) ===/
Two distinct connections:
(A,50000) ↔ (S,443)
(B,50001) ↔ (S,443)
```

2) TCP Three-Way Handshake (Connection Establishment)
- Negotiates ISNs and options (MSS, Window Scale, SACK, Timestamps).

```
Client                                          Server
  | SYN, Seq=x, MSS, WS, SACK?  ------------->    |
  |                                     SYN+ACK, Seq=y, Ack=x+1, opts
  | <-------------------------------------------- |
  | ACK, Seq=x+1, Ack=y+1  -------------------->  |
Connection ESTABLISHED on both ends
```

3) Why Choose UDP over TCP?
- No handshake → lower startup latency.
- No head-of-line blocking (apps can reorder/skip late data).
- Small header; app-defined reliability/FEC.
- Multicast support.
- Use cases: VoIP, gaming, live streaming, DNS, QUIC (user-space reliability atop UDP).

4) Reliable Data Transfer rdt2.1 (Handling Bit Errors with ACK/NAK, seq 0/1)
- Sender states alternate between waiting for ACK0 and ACK1.
- Receiver expects alternating sequence numbers; on error/duplicate, re-ACK or NAK.

Sender (simplified):

```
[Wait call from above, seq=0]
  on data: send pkt0 -> [Wait ACK0]
[Wait ACK0]
  on ACK0 ok: seq=1, go to first state
  on NAK0 or corrupted ACK/NAK: retransmit pkt0

[Wait call from above, seq=1]
  on data: send pkt1 -> [Wait ACK1]
[Wait ACK1]
  on ACK1 ok: seq=0, go to first state
  on NAK1 or corrupted ACK/NAK: retransmit pkt1
```

Receiver (simplified):

```
[Expect pkt0]
  on good pkt0: deliver, send ACK0 -> [Expect pkt1]
  on bad pkt or seq≠0: send NAK0 or re-ACK last good

[Expect pkt1]
  on good pkt1: deliver, send ACK1 -> [Expect pkt0]
  on bad pkt or seq≠1: send NAK1 or re-ACK last good
```

Notes:
- Uses checksum to detect corruption; sequence numbers to detect duplicates.
- Packet loss/timeouts addressed in rdt3.0.

5) TCP Segment Structure — Field Purposes
- Source/Destination Ports: Demux.
- Sequence Number: Byte ordering, loss detection.
- Acknowledgment Number: Cumulative ACK.
- Data Offset: Start of payload (due to variable options).
- Flags: Control (SYN/FIN/RST/ACK/PSH/URG) + ECN (ECE/CWR) + NS.
- Window: Flow control (receiver advertised window).
- Checksum: Header+data integrity (with pseudo-header).
- Urgent Pointer: End of urgent data (legacy).
- Options: MSS, Window Scale (10-bit shift), SACK Permitted/Blocks, Timestamps (RTTM/PAWS), others.

----------------------------------------------------------------------------

UNIT IV — Congestion Control and IP Layer

1) TCP Congestion Control Phases
- Variables: cwnd (congestion window), ssthresh (slow-start threshold), rwnd (receiver window).
- Phases:
  - Slow Start: cwnd starts small (often ~10 MSS); increases exponentially (≈ double per RTT) until ssthresh or loss.
  - Congestion Avoidance: Linear growth (≈ +1 MSS per RTT).
  - Fast Retransmit/Recovery: On 3 duplicate ACKs, retransmit missing segment; ssthresh=cwnd/2; cwnd=s sthresh+(dupACK count); then linear growth. On timeout: cwnd=1 MSS (or IW), enter slow start.

ASCII sketch (cwnd vs time):

```
cwnd
 ^            /\/\/\ (CA linear)
 |          /
 |        /
 |      /
 |    /
 |  /         (loss)  -> FR/FR
 |/                         \_____/-- (CA)
 +------------------------------------------> time
  Slow Start (exponential)    ^
                              loss event
```

ECN:
- If ECN enabled and network marks CE, receiver echoes ECE; sender reduces cwnd and sets CWR.

2) Unicast vs Multicast vs Broadcast Routing
- Unicast (1-to-1): IP routing via shortest paths (Dijkstra, Bellman-Ford); FIB entries per prefix.
- Multicast (1-to-many): Group-based delivery; trees (source-based or shared RPT), RPF check; PIM (SM/DM), IGMP/MLD for membership. Sends only to members; bandwidth-efficient.
- Broadcast (1-to-all in domain): Flooding, reverse-path forwarding, or spanning-tree in L2; constrained to a subnet/L2 domain in modern networks.

3) IPv4 Datagram Format and IPv4 vs IPv6
- IPv4 header drawn earlier; field roles:
  - Identification/Flags/Fragment Offset: Fragmentation support (DF/MF).
  - TTL: Prevents loops (decrement per hop).
  - Protocol: Upper layer (TCP=6, UDP=17, ICMP=1).
  - Header Checksum: IPv4-only; recomputed at each hop.

- IPv4 vs IPv6:
  - Address size: 32-bit vs 128-bit.
  - Header: IPv6 fixed 40-byte base; no header checksum; fields: Version, Traffic Class, Flow Label, Payload Length, Next Header, Hop Limit, Src/Dst.
  - Options: IPv6 uses extension headers (Hop-by-Hop, Routing, Fragment, AH/ESP).
  - Fragmentation: IPv6 only at endpoints (Fragment header); routers don’t fragment.
  - Autoconf: IPv6 SLAAC + ND; IPv4 uses DHCP + ARP.
  - Security: IPsec mandatory to implement in IPv6 (optional in IPv4).
  - ICMPv6 integrates ND, MLD; richer error/control.

4) Three-Way Handshake (Transport-level)
- Same as in Unit III; include options like MSS, WS, SACK, TS negotiated in SYN segments.
- Protection: SYN cookies mitigate SYN floods; backlog management.

----------------------------------------------------------------------------

UNIT V — Link Layer: Error Control, ARP, MAC, ALOHA, Routing Broadcast

1) Error Detection and Correction Methods
- Parity (even/odd), 2D parity: Detect single-bit errors; 2D can correct single-bit.
- Internet checksum: 16-bit ones’ complement sum; detects many but not all errors.
- CRC (Cyclic Redundancy Check): Polynomial division over GF(2); excellent burst error detection.
- FEC codes: Hamming, Reed-Solomon, convolutional, LDPC; correct errors without retransmission.

CRC Worked Example (Q9a)
- Given:
  - Message polynomial M(x) = x^7 + x^6 + x^4 + x^2 + x + 1
    - Binary M = 11010111
  - Generator G(x) = x^3 + x^2 + 1
    - Binary G = 1101 (degree r = 3)

Sender steps:
1) Append r zeros to M: 11010111 000 (dividend = 11010111000).
2) Divide dividend by G (mod-2 XOR division). Track leading 1s:

```
Dividend: 1 1 0 1 0 1 1 1 0 0 0
G (1101) align at idx 0 -> XOR on [0..3]:
After step 1: 0 0 0 0 0 1 1 1 0 0 0
Next leading 1 at idx 5; XOR [5..8]:
After step 2: 0 0 0 0 0 0 0 1 1 0 0
Next leading 1 at idx 7; XOR [7..10]:
After step 3: 0 0 0 0 0 0 0 0 0 0 1
```

Remainder = last r bits = 001.

3) Transmit codeword = original M plus FCS (remainder): 11010111 001.

Receiver steps:
- Divide received codeword (11010111001) by G.
- If remainder == 000 → accept; else → error detected.

2) ARP — Address Resolution Protocol
Purpose: Map IPv4 address → MAC address on a LAN (L2).

Flow:
1. Host checks ARP cache; miss → broadcast ARP Request:
   - “Who has 192.0.2.5? Tell 192.0.2.1”
2. Target host sends unicast ARP Reply with its MAC.
3. Requester caches mapping with timeout; optional Gratuitous ARP to announce self.
4. Risks: ARP spoofing/poisoning; mitigations: DHCP snooping + Dynamic ARP Inspection, static ARP for critical hosts.

ARP frame encapsulated in Ethernet (Type 0x0806).

3) Link-layer Services and Correspondence with IP/TCP
- Offered by Link Layer:
  - Framing and MAC addressing
  - Medium Access Control (contention, scheduling)
  - Reliable delivery on link (ARQ), link-level flow control
  - Error detection/correction (CRC/FEC)
  - Half/full duplex control; priority/QoS (802.1p), VLAN tagging (802.1Q)

- Correspondence:
  - IP: Best-effort; no reliability or flow control; fragmentation (IPv4).
  - TCP: End-to-end reliability, flow and congestion control, in-order delivery.
  - Link reliability reduces residual errors presented to IP/TCP but is not required for correctness (end-to-end principle).

4) Broadcast vs Multicast Routing; Controlled Flooding vs Spanning Tree
- Broadcast vs Multicast:
  - Broadcast: Deliver to all nodes (within a domain); can be wasteful.
  - Multicast: Deliver to subscribed group members only; uses group management and distribution trees; bandwidth-efficient.

- Controlled Flooding vs Spanning Tree Broadcast:
  - Controlled Flooding: Forward copies with constraints (sequence numbers, TTL/hop limit, reverse-path forwarding). May produce duplicates and transient loops.
  - Spanning Tree Broadcast: Precompute a loop-free tree; each link used once; no duplicates; requires tree maintenance (e.g., STP in L2).

5) Pure ALOHA vs Slotted ALOHA
- Pure ALOHA:
  - Transmit anytime; vulnerable period = 2T (T=frame time).
  - Throughput S = G e^(−2G); S_max ≈ 0.184 at G=0.5.

- Slotted ALOHA:
  - Time slotted; send only at slot boundaries; vulnerable period = T.
  - Throughput S = G e^(−G); S_max ≈ 0.368 at G=1.

```
Collisions:
Pure ALOHA:   [----A----]
Vulnerable: [------  2T  ------]

Slotted ALOHA:
Slots: | A | B | C | D |
Only one per slot succeeds
```

6) MAC Address — Definition and Importance
- 48-bit L2 identifier (EUI-48): OUI (24b vendor) + NIC-specific (24b).
- Bits in first octet:
  - I/G bit (LSB): 0=unicast, 1=multicast.
  - U/L bit (second LSB): 0=globally unique, 1=locally administered.

Importance:
- Switch forwarding (learning and filtering).
- IP→MAC mapping (ARP/ND) for intra-LAN delivery.
- VLAN assignment and security policies (port security).
- Multicast mapping (e.g., IPv4 01:00:5E:xx:xx:xx).

----------------------------------------------------------------------------

Appendix — High-Yield Summaries and Tips

Key Formulas
- Transmission delay = L / R
- Propagation delay = d / s (e.g., fiber ≈ 2×10^8 m/s)
- TCP Throughput (rough, loss-limited): ≈ (MSS / (RTT * sqrt(p))) × C (C~1.22 for Reno)
- ALOHA: S = G e^(−2G) (Pure); S = G e^(−G) (Slotted)

Compare-at-a-glance
- TCP vs UDP:
  - TCP: Reliable, ordered, congestion + flow control, connection-oriented, byte stream.
  - UDP: Unreliable, unordered, no congestion control (by default), connectionless, message boundaries preserved.

- IPv4 vs IPv6:
  - 32-bit vs 128-bit addresses; variable vs fixed header; router fragmentation vs endpoint-only; ARP vs ND; DHCP vs SLAAC.

Diagrams to Practice Drawing
- TCP/IP encapsulation
- IPv4 header field layout
- TCP segment with flags
- TCP handshake (seq/ack) and congestion window evolution
- rdt2.1 sender/receiver FSMs
- DHT ring with finger tables
- FDM and TDM timelines
- CRC long division steps

Exam Technique
- Start with succinct definitions, then contrast with 2–3 differentiators.
- Draw small, labeled diagrams; annotate key parameters (e.g., MSS, RTT).
- For protocol traces, show exact lines and codes (e.g., FTP 150/226, SMTP 354).
- For worked problems (CRC), show each XOR step and final remainder.

Good luck!