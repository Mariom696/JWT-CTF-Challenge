# JWT-CTF-Challenge
"Secure Portal" A beginner web CTF challenge focusing on JWT authentication bypass.

## Challenge Description
You have found an internal portal for a startup that claims to have "ultra secure" authentication.
Can you bypass their login system and access the admin panel?

---

## Setup Instructions

1. Install Node.js and npm (if not installed):
    ```bash
    sudo apt install nodejs npm
    ```

2. Clone this repository:
    ```bash
    git clone https://github.com/Mariom696/CTFs.git
    cd jwt-ctf-challenge
    ```

3. Install required packages:
    ```bash
    npm install express jsonwebtoken body-parser

    ```

4. Run the server:
    ```bash
    node server.js
    ```

5. Visit:
    ```
    http://localhost:3000/
    ```

---

## Challenge Walkthrough

- Register a new user via the web portal.
- Login to retrieve a **JWT Token**.
- **Modify the JWT Token** to escalate your role from `user` to `admin`.
- Use the forged token to access the `/admin` route and retrieve the flag!

---

## Vulnerability Details 

- The server **decodes** JWT tokens without verifying their signature.
- A malicious user can **tamper** with the JWT payload to escalate privileges.

---

## Exploit Steps

1. Login to get a valid JWT.
2. Decode the JWT (e.g., using [jwt.io](https://jwt.io/)).
3. Modify `"role": "user"` ➔ `"role": "admin"`.
4. Forge the token and reuse it to access `/admin`.
5. Capture the flag!

---


