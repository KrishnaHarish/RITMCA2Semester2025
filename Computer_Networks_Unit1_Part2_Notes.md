# Computer Networks  
**Subject Code:** MCA24  
**Unit – 1 (Part 2)**  
**Faculty:** Dr Manjunath M  
**Department:** MCA  
**Institution:** Ramaiah Institute of Technology, Bangalore - 560054  

---

## Packet Switching

### Introduction to Packet Switching
- Fundamental communication model of the Internet.
- Messages are divided into smaller **packets** sent independently over the network.
- Each packet has:
  - **Header**: destination address, sequence number, etc.
  - **Payload**: part of the original message.
- Packets traverse networks via **links** and **packet switches** (routers/switches).
- Transmission time for a packet of L bits over a link with rate R is **L/R seconds**.

---

## Store-and-Forward Transmission

- In packet-switched networks, routers use **store-and-forward**:
  - A router must receive the entire packet before forwarding.
  - Each hop introduces a delay.
  - Delay per link: **L/R** (receive) + **L/R** (forward) = **2L/R** per hop.
  - For N links (N-1 routers), end-to-end delay = **N·(L/R)**.
- **Pipelining**: With multiple packets, packets can be transmitted back-to-back, with the last packet arriving at **4L/R** if 3 packets are sent.

---

## Queuing Delays and Packet Loss

- Routers maintain **output buffers/queues** for each outgoing link.
- If the outgoing link is busy, arriving packets are queued, causing **queuing delay**.
- If the buffer is full, **packet loss** occurs (new packets dropped or old ones removed).
- More congestion = higher delay and loss (similar to lines at tollbooths).
- Common when hosts send high-rate data bursts.

---

## Circuit Switching

- **Circuit switching**: Another method for data transmission (e.g., telephone networks).
- A dedicated path/circuit is established between sender and receiver, reserving resources for the session.
- Guarantees a fixed transmission rate.
- Inefficient if reserved resources are unused during silence.
- **Phases**:
  1. **Connection Establishment** (path setup)
  2. **Data Transfer**
  3. **Connection Disconnection**

---

### Multiplexing in Circuit-Switched Networks

1. **Frequency-Division Multiplexing (FDM)**:
   - Link’s frequency spectrum is split into bands, each assigned to a connection.
   - Example: Telephone networks, FM radio (each station/call gets a band).

2. **Time-Division Multiplexing (TDM)**:
   - Time is divided into frames and slots; each connection gets a time slot.
   - Example: 8,000 frames/sec × 8 bits/slot = 64 kbps per circuit.

**Drawbacks**: Reserved bandwidth is wasted if unused. Circuit setup requires complex signaling.

---

## Packet Switching vs Circuit Switching

- **Packet Switching**: Resources shared dynamically, more efficient for bursty data, susceptible to delays and loss.
- **Circuit Switching**: Dedicated resources, predictable performance, but inefficient for idle periods.

---

## Network of Networks

- The **Internet** is a global "network of networks".
- **Access ISPs**: Local networks (home, university, mobile) connect users to the Internet.
- **Regional ISPs**: Connect multiple access ISPs.
- **IXPs (Internet Exchange Points)**: Neutral points for direct ISP traffic exchange, reducing latency/cost.
- **Tier-1 ISPs**: Core global networks, peer with each other, provide global routing.

---

## Delay, Loss, and Throughput in Packet-Switched Networks

As a packet travels, it may experience four delays at each router (node):

1. **Processing Delay**: Time to process packet header and check for errors (microseconds).
2. **Queuing Delay**: Time waiting in queue for transmission; varies with congestion.
3. **Transmission Delay**: Time to push all packet bits onto the link; **L/R**.
4. **Propagation Delay**: Physical travel time across the link; **d/s** (distance/speed).

- **Total nodal delay**:  
  `dnodal = dproc + dqueue + dtrans + dprop`

---

### Queuing Delay

- Most variable delay, depends on **traffic intensity**:
  - **Traffic Intensity = (L × a) / R**
    - L: packet size (bits)
    - a: avg. arrival rate (packets/sec)
    - R: link rate (bits/sec)
- High intensity = higher queuing delay and packet loss.

---

### Packet Loss

- Occurs when the output buffer is full.
- Excess packets are dropped (not queued).
- Higher traffic intensity increases packet loss.
- End-system may retransmit lost packets (e.g., TCP).

---

## End-to-End Delay

- Sum of delays across all nodes (routers) between source and destination.
- **Simple Model Assumptions**:
  - N-1 routers (N nodes), negligible queuing delay.
  - Each node: processing delay (dproc), transmission delay (L/R), propagation delay (dprop).
- **Formula:**
  ```
  dend-to-end = N × (dproc + dtrans + dprop)
  dtrans = L/R
  ```
---

## Jitter in Computer Networks

- **Delay**: Time for a bit to travel from source to destination.
- **Jitter**: Variation in delay between successive packets.

---

## Transmission Modes

- **Simplex**: One-direction only (e.g., TV).
- **Half-duplex**: Both directions, one way at a time (e.g., walkie-talkie).
- **Full-duplex**: Both directions simultaneously (e.g., phone).

---

## Layered Architecture

- Complex systems (like networks) are broken into **layers**.
- Each layer:
  - Handles specific tasks.
  - Provides services to the layer above.
  - Uses services from the layer below.
- **Benefits**:
  - Modularity, abstraction, easier design/maintenance, standardized communication, easier troubleshooting.

---

## Reference Models

### OSI Reference Model (ISO)

- **Layers (7)**:  
  7. Application  
  6. Presentation  
  5. Session  
  4. Transport  
  3. Network  
  2. Data Link  
  1. Physical  
- Mnemonics:  
  "Please Do Not Throw Sausage Pizza Away"  
  "All People Seem To Need Data Processing"
- **Not architecture**: conceptual framework, not actual protocols.

### TCP/IP Reference Model

- **Layers (4)**:
  4. Application  
  3. Transport  
  2. Internet  
  1. Network Interface (Physical + Data Link)  
- Mnemonic:  
  "TCP/IP comes in A TIN"
- **Practical model**: defines real-world protocols.

---

### OSI vs TCP/IP Layer Comparison

| OSI Layer         | TCP/IP Layer         | Data Unit   | Addressing/Function      |
|-------------------|---------------------|-------------|-------------------------|
| Application (7)   | Application (4)     | Message     | Network-aware apps      |
| Presentation (6)  | Application (4)     |             | Data formatting, encryption |
| Session (5)       | Application (4)     |             | Session management      |
| Transport (4)     | Transport (3)       | Segment     | TCP/UDP, ports          |
| Network (3)       | Internet (2)        | Packet      | IP addressing, routing  |
| Data Link (2)     | Network Interface(1)| Frame       | MAC, error checking     |
| Physical (1)      | Network Interface(1)| Bit         | Transmission medium     |

- **Encapsulation**: Each layer adds headers (and possibly trailers) as data moves down, and removes them as it moves up.

---

**End of Unit 1 (Part 2) Notes**