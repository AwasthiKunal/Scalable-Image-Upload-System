# Scalable Image Upload System

A scalable cloud-based image upload system built with **Node.js**, **Express.js**, **AWS S3**, **Nginx**, and **PM2** — featuring multi-instance deployment on AWS EC2.

---

## 🔗 Live Demo

**[http://13.201.32.21](http://13.201.32.21)**

---

## Features

- Upload images via a clean frontend interface
- Direct cloud storage to **AWS S3**
- **3 Node.js server instances** running in parallel
- **Nginx reverse proxy** with multi-instance backend configuration
- **PM2** for process management
- Deployed on **AWS EC2** (Ubuntu)
- Publicly accessible image URLs via S3

---

## Architecture

```
Client
  │
  ▼
Nginx (Port 80) — Reverse Proxy
  │
  ├──── Node.js Instance (Port 3001)
  ├──── Node.js Instance (Port 3002)
  └──── Node.js Instance (Port 3003)
              │
              ▼
          AWS S3 Bucket
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js, Multer, AWS SDK |
| Frontend | HTML, CSS, JavaScript |
| Cloud Storage | AWS S3 |
| Server | AWS EC2 (Ubuntu) |
| Reverse Proxy | Nginx |
| Process Manager | PM2 |

---

## Project Structure

```
Scalable-Image-Upload-System/
├── public/
│   └── index.html
├── src/
│   ├── config/
│   │   └── s3Config.js
│   ├── controllers/
│   │   └── uploadController.js
│   ├── middleware/
│   │   └── uploadMiddleware.js
│   ├── routes/
│   │   └── uploadRoutes.js
│   ├── services/
│   │   └── s3Service.js
│   └── app.js
├── nginx/
│   └── nginx.conf
├── server.js
├── package.json
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AwasthiKunal/Scalable-Image-Upload-System.git
cd Scalable-Image-Upload-System
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create three `.env` files in the project root:

**`.env`**
```env
PORT=3001
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-south-1
S3_BUCKET_NAME=your_bucket_name
```

**`.env2`** — same as above with `PORT=3002`

**`.env3`** — same as above with `PORT=3003`

---

## Running the Application

### Option A — Manual (3 terminals)

```bash
npm run server1
npm run server2
npm run server3
```

### Option B — PM2 (Recommended for Production)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start all instances
pm2 start npm --name server1 -- run server1
pm2 start npm --name server2 -- run server2
pm2 start npm --name server3 -- run server3

# Verify running processes
pm2 list

# Save and enable auto-start on reboot
pm2 save
pm2 startup
# Run the command output by pm2 startup
```

---

## Nginx Configuration

### Install Nginx

```bash
sudo apt update && sudo apt install nginx
```

### Configure Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/default
```

Replace the file content with:

```nginx
upstream backend {
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

server {
    listen 80;

    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Apply and Restart

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## AWS S3 Bucket Policy

To enable public read access for uploaded images, apply this bucket policy in the AWS Console:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

---

## API Reference

### Upload Image

```
POST /upload
```

**Request:** `multipart/form-data`

| Key | Type |
|---|---|
| `image` | File |

**Response:**

```json
{
  "message": "Image uploaded successfully",
  "imageUrl": "https://your-bucket.s3.ap-south-1.amazonaws.com/sample-image.jpg"
}
```

---

## Roadmap

- [ ] JWT Authentication
- [ ] MongoDB Integration
- [ ] Docker & Kubernetes Support
- [ ] HTTPS / SSL Configuration
- [ ] CI/CD Pipeline
- [ ] Image Compression
- [ ] CloudFront CDN Integration

---

## Author

**Kunal Awasthi**  
[GitHub →](https://github.com/AwasthiKunal)

