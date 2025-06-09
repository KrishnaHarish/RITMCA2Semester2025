# Computer Networks  
**Subject Code:** MCA24  
**Unit – 2**  
**Dr Manjunath M**  
Assistant Professor  
Department of MCA  
Ramaiah Institute of Technology (RIT), Bangalore - 560054

---

## Unit – 2 Syllabus

- **Application Layer:**
  - Principles of Network Applications
  - The Web and HTTP
  - File Transfer: FTP
  - Electronic Mail in the Internet
  - DNS—The Internet’s Directory Service
  - Peer-to-Peer Applications

---

## Application Layer

### Introduction

- The **Application Layer** provides services and interfaces directly to end users or application software.
- It acts as the window between the user and the network.
- Network applications are the primary reason for the existence and growth of computer networks.
- Examples of "killer applications" over the decades:
  - 1970s–1980s: Email, remote access, file sharing
  - 1990s: World Wide Web, e-commerce
  - Late 1990s: Instant messaging, P2P file sharing
  - 2000s: VoIP, video conferencing, YouTube, Netflix, online gaming
  - 2010s onward: Social networking (Facebook, Twitter, etc.)

---

### Principles of Network Applications

- Network applications are **distributed programs**—software running on different end systems (clients and servers) that communicate via a network.
  - Example: A web browser (client) communicates with a web server.
- Application software is **developed to run only on end systems** (desktops, servers, mobile devices).
- Not developed for network-core devices (like routers/switches), which operate below the application layer.
- Applications are implemented using languages like C, Java, Python, etc.
- **End-to-end architecture** enables rapid innovation and deployment of new network applications.

Key considerations in application development:
1. **Network Application Architectures**
2. **Processes Communicating**
3. **Transport Services Available to Applications**
4. **Transport Services Provided by the Internet**
5. **Application-Layer Protocols**

---

### 1. Network Application Architectures

Before implementing a network application, it's essential to choose an **application architecture**—a design that defines how application components are distributed across end systems.

#### Two Predominant Application Architectures:
1. **Client-Server Architecture**
2. **Peer-to-Peer (P2P) Architecture**

---

#### Client-Server Architecture

- **Dedicated, always-on server** provides services to multiple client devices.
- Server has a **fixed IP address** and is typically hosted in data centers to handle large-scale requests.
- **Clients initiate communication**, and the server responds.
- **Common examples:** Web (HTTP), FTP, Email, Telnet.
- **Scalability** is managed using data centers with thousands of servers (e.g., Google, Amazon, Facebook).

---

#### Peer-to-Peer (P2P) Architecture

- **No central server**; all participating devices (peers) communicate directly.
- **Peers act as both clients and servers**—sharing bandwidth, storage, and computation.
- **Examples:** BitTorrent (file sharing), Skype (VoIP), IPTV platforms.
- **Advantages:** High self-scalability and cost efficiency.

##### Challenges in P2P Architectures:
- **ISP Friendliness:** Shifts upstream traffic to ISPs, requiring efficient use.
- **Security:** Distributed design is harder to secure against malicious users.
- **Incentive Design:** Encouraging users to contribute resources remains a key issue.

---

### 2. Processes Communicating

- Programs running on computers are called **processes** when actively running.
  - E.g., browser, game, server.
- **Two processes on the same machine:** Use interprocess communication (managed by OS).
- **Network applications:** Processes on different machines communicate by sending messages over the network.

#### Client and Server Processes

- Communication takes place between pairs of processes on different end systems.
- Processes exchange messages for tasks such as requesting web pages, downloading files, or sending emails.
- Each session typically involves:
  - **Client process:** Initiates communication
  - **Server process:** Waits for incoming requests

---

### File Transfer Protocol (FTP)

- **FTP (File Transfer Protocol)** is a standard application-layer protocol for transferring files between a local and remote host over a network.
- Allows users to upload or download files after authenticating with username and password.

**Typical FTP session:**
- User (client) sits at a local host.
- Provides login credentials to connect to remote FTP server.
- Files are transferred either from local → remote or remote → local file systems.

---

#### FTP Architecture

- FTP operates over **TCP** and is unique because it uses **two separate TCP connections**:
  - **Control Connection** (TCP port 21)
  - **Data Connection**
- FTP is a **dual-channel protocol**, unlike HTTP (single connection).
- **FTP is a stateful protocol**:
  - Control connection is **persistent**
  - Data connections are **non-persistent**

#### FTP Commands

*(To be continued with details of FTP commands, responses and sessions.)*