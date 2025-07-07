# MS Ramaiah Institute of Technology  
**Department of Master of Computer Applications**  
**Lab Manual of Computer Networks (MCA24)**

---

## Contents

1. [IP Addressing: Class Full Addressing](#ip-addressing-class-full-addressing)
    - [Hub](#hub)
    - [Switch](#switch)
    - [Steps to Create the LAN](#steps-to-create-the-lan)
    - [Expected Outcome](#expected-outcome-1)
2. [Static Routing](#static-routing)
    - [Router Introduction & Configuration Modes](#router-introduction--configuration-modes)
    - [Basic Cisco Commands](#basic-commands-for-cisco-router)
    - [Static Routing Configuration](#static-routing-configuration)
    - [Expected Outcome](#expected-outcome-2)
3. [FTP Server with ProFTPD](#ftp-server-with-proftpd)
    - [Installation & Configuration](#installation--configuration)
    - [Expected Outcome](#expected-outcome-3)
4. [SSH Configuration & Remote Access](#ssh-configuration--remote-access)
    - [Network Topology](#network-topology)
    - [Server/Client Setup & File Transfer](#serverclient-setup--file-transfer)
    - [Expected Outcome](#expected-outcome-4)

---

## 1. IP Addressing: Class Full Addressing

- **Objective:**  
  Use GNS3 to create a LAN with four VPCS nodes connected through a Hub, assign Class A private IPs (10.0.0.0/8), and verify connectivity.

### Hub
- **Physical Layer (OSI Layer 1):**  
  Forwards data to all devices; does not filter or learn MACs; creates one large collision domain.

**Example:**  
PC1 sends data, all PCs receive it.

**Limitations:**  
Low efficiency/security, high collision risk, not suitable for modern high-speed networks.

### Switch
- **Data Link Layer (OSI Layer 2):**  
  Forwards data to intended device using MAC table; each port is its own collision domain; supports full-duplex.

**Advantages:**  
Efficient bandwidth, reduced collisions, improved security.

**Comparison Table:**

| Feature        | Hub                | Switch                 |
| -------------- | ------------------ | ---------------------- |
| OSI Layer      | 1 (Physical)       | 2 (Data Link)          |
| Data Forward   | All devices        | Destination only       |
| MAC Learning   | No                 | Yes                    |
| Collision Dom. | Single             | One per port           |
| Efficiency     | Low                | High                   |
| Security       | Low                | High                   |
| Usage Today    | Rare               | Common                 |

### Steps to Create the LAN

1. **New Project:** Create in GNS3 (e.g., LAN_Hub_Test).
2. **Add Hub:** Drag and drop to workspace.
3. **Add 4 VPCS:** Name as VPCS1-VPCS4.
4. **Connect PCs:** Use Add Link tool.
5. **Assign IPs:**  
    - VPCS1: `ip 10.0.0.1 255.0.0.0`  
    - VPCS2: `ip 10.0.0.2 255.0.0.0`  
    - VPCS3: `ip 10.0.0.3 255.0.0.0`  
    - VPCS4: `ip 10.0.0.4 255.0.0.0`  
6. **Test Connectivity:**  
    - Ping from VPCS1 to others.
    - TTL: Shows hops left (Windows: 128, Linux: 64, Routers: 255).
    - ARP: Checks for MAC mapping via ARP requests/replies.
7. **Enhancements (Optional):**
    - Monitor traffic with Wireshark.
    - Replace Hub with Switch.
    - Simulate with Class B (172.16.0.0/16) or Class C (192.168.1.0/24) networks.

### Expected Outcome

- All VPCS can ping each other.
- ARP tables show MAC mappings post-ping.
- Wireshark captures ARP/ICMP packets.
- Demonstrates basic LAN setup with manual IP addresses.

---

## 2. Static Routing

- **Objective:**  
  Manually configure static routes between two routers for inter-network communication.

### Router Introduction & Configuration Modes

- **Router:** Connects different networks (Layer 3 - Network Layer).
- **Modes:**
    1. User EXEC: `Router>` (monitoring)
    2. Privileged EXEC: `Router#` (enable, management)
    3. Global Configuration: `Router(config)#` (hostname, routing)
    4. Interface Configuration: `Router(config-if)#` (IP, speed)

### Basic Commands for Cisco Router

- **User EXEC:** `ping`, `show version`, `show ip interface brief`
- **Privileged EXEC:** `enable`, `show running-config`, `reload`
- **Global Config:** `hostname`, `interface FastEthernet0/0`, `ip route`
- **Interface Config:** `ip address`, `no shutdown`, `description`, `duplex`, `speed`
- **Shortcuts:** Tab completion, Ctrl+Z (exit), Ctrl+C (interrupt), `?` for help

### Static Routing Configuration

**Example Topology:**  
- R1(FastEthernet0/0): 10.0.0.1  
- R1(FastEthernet0/1): 20.0.0.1  
- R2(FastEthernet0/0): 20.0.0.2  
- R2(FastEthernet0/1): 30.0.0.1  

**Static Route Commands:**
```shell
# R1
interface fastethernet0/0
ip address 10.0.0.1 255.0.0.0
no shutdown
interface fastethernet0/1
ip address 20.0.0.1 255.0.0.0
no shutdown
ip route 30.0.0.0 255.0.0.0 20.0.0.2

# R2
interface fastethernet0/0
ip address 20.0.0.2 255.0.0.0
no shutdown
interface fastethernet0/1
ip address 30.0.0.1 255.0.0.0
no shutdown
ip route 10.0.0.0 255.0.0.0 20.0.0.1
```
- Syntax: `ip route <dest-network> <mask> <next-hop-IP>`

### Expected Outcome

- All interfaces `up/up` after `no shutdown`.
- R1 and R2 can ping each other’s LAN IPs.
- `show ip route` and `show ip interface brief` reflect correct config.
- Demonstrates manual inter-network routing.

---

## 3. FTP Server with ProFTPD

- **Objective:**  
  Install/configure FTP server on PC1 using ProFTPD, allow file transfers, and secure user access.

### Installation & Configuration

1. **Install:**  
    ```sh
    sudo apt update
    sudo apt install proftpd
    ```
    - Choose standalone mode during install.
2. **Configure:**  
    - Edit `/etc/proftpd/proftpd.conf`:
        - Uncomment `DefaultRoot /home/lubuntu/Desktop/FTP-Share`
        - Set `RequireValidShell on`
        - Uncomment `AuthOrder mod_auth_unix.c`
    - Add `/bin/false` to `/etc/shells`
3. **Create FTP User:**  
    ```sh
    sudo useradd -d /home/lubuntu/Desktop/FTP-Share -s /bin/false ftpuser
    sudo passwd ftpuser
    ```
4. **Set Directory Permissions:**  
    ```sh
    sudo chown ftpuser:ftpuser /home/lubuntu/Desktop/FTP-Share
    sudo chmod 755 /home/lubuntu/Desktop/FTP-Share
    ```
5. **Restart ProFTPD:**  
    ```sh
    sudo systemctl restart proftpd
    ```
6. **Access FTP Server from remote:**  
    - Terminal: `ftp <server-ip>`
    - GUI: `ftp://<server-ip>` in file browser

7. **Test File Transfer:**  
    - `put Hello.txt`, `get Hello.txt`, `ls`, `quit`
    - Permission errors: Set correct ownership and permission, then restart ProFTPD.

### Expected Outcome

- ProFTPD installs and configures without error.
- FTP user has restricted shell.
- Remote clients can upload/download files.
- Directory permissions allow file operations.
- FTP login succeeds; transferred files are visible on server.

---

## 4. SSH Configuration & Remote Access

- **Objective:**  
  Secure remote terminal access and file transfer between VMs over routed network using SSH.

### Network Topology

- **Devices:** 4 end systems (2 VMs, 4 PCs), 2 routers, switches.
- **Addresses:**
    - VM1: 10.0.0.2/8
    - PC1: 10.0.0.3/8
    - PC2: 10.0.0.4/8
    - Router1: FastEthernet0/0: 10.0.0.1, FastEthernet0/1: 20.0.0.1
    - Router2: FastEthernet0/0: 20.0.0.2, FastEthernet0/1: 30.0.0.1
    - VM2: 30.0.0.2/8
    - PC3: 30.0.0.3/8
    - PC4: 30.0.0.4/8

### Server/Client Setup & File Transfer

1. **On VM1 (Server):**
    - Update: `sudo apt update`
    - Install SSH: `sudo apt install openssh-server`
    - Restart: `sudo systemctl restart ssh`
2. **On VM2 (Client):**
    - Ensure network connectivity (`ping 10.0.0.2`).
    - To connect: `ssh <user>@10.0.0.2`
3. **File Transfer:**  
    - `scp file.txt <user>@30.0.0.2:/home/<user>/`
    - Enter password when prompted.

### Expected Outcome

- SSH server starts and runs on VM1.
- Remote login from VM2 to VM1 works.
- File transfers via `scp` succeed.
- `systemctl status ssh` shows active service.

---

*This summary covers practical steps, commands, and expected results for each lab as per the MCA24 Computer Networks syllabus at MSRIT.*