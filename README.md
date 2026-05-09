# Scalable Image Upload System

A scalable backend image upload system built using **Node.js**, **Express.js**, **AWS S3**, **NGINX Load Balancer**, and **GitHub Actions CI Pipeline**.

The application accepts image uploads through a REST API, validates files using Multer, distributes requests across multiple backend instances using NGINX, and stores uploaded images in Amazon S3.

---

# Features

- REST API built with Express.js
- Upload JPG and PNG images
- Multer-based file validation
- Maximum upload size: 2MB
- AWS S3 cloud storage integration
- Unique image naming using UUID
- Multiple backend server instances
- NGINX reverse proxy and load balancing
- GitHub Actions CI pipeline
- No database required

---

# Tech Stack

- Node.js
- Express.js
- Multer
- AWS SDK v3
- Amazon S3
- NGINX
- GitHub Actions

---

# Project Architecture

```text
Client Request
       │
       ▼
NGINX Load Balancer (Port 80)
       │
 ┌─────┼─────┐
 ▼     ▼     ▼
3001  3002  3003
(Node.js Backend Instances)
       │
       ▼
AWS S3 Bucket
```

---

# Project Structure

```text
project-root/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── nginx/
│   └── nginx.conf
│
├── src/
│   ├── config/
│   │   └── s3Config.js
│   │
│   ├── controllers/
│   │   └── uploadController.js
│   │
│   ├── middleware/
│   │   └── uploadMiddleware.js
│   │
│   ├── routes/
│   │   └── uploadRoutes.js
│   │
│   ├── services/
│   │   └── s3Service.js
│   │
│   └── app.js
│
├── server.js
├── package.json
├── README.md
└── .gitignore
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/AwasthiKunal/Scalable-Image-Upload-System.git
```

Move into the project directory:

```bash
cd Scalable-Image-Upload-System
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=3001

AWS_REGION=ap-south-1

AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY

AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY

S3_BUCKET_NAME=YOUR_BUCKET_NAME
```

---

# Running Multiple Backend Instances

### Server 1

```bash
npm run server1
```

### Server 2

```bash
npm run server2
```

### Server 3

```bash
npm run server3
```

---

# API Endpoints

## Health Check

### Request

```http
GET /
```

### Response

```text
Server is running properly
```

---

## Upload Image

### Request

```http
POST /upload
```

### Content Type

```text
multipart/form-data
```

### Form Data

| Key   | Type |
|------|------|
| image | File |

---

# File Validation Rules

- Only JPG and PNG files allowed
- Maximum file size: 2MB

---

# Successful Response

```json
{
  "message": "Image uploaded successfully",
  "imageUrl": "https://bucket-name.s3.region.amazonaws.com/image-name.jpg"
}
```

---

# Error Responses

## Invalid File Type

```json
{
  "message": "Only JPG and PNG files are allowed"
}
```

## No File Uploaded

```json
{
  "message": "No file uploaded"
}
```

---

# NGINX Load Balancer

NGINX is configured as a reverse proxy and load balancer.

It distributes incoming requests across:

- localhost:3001
- localhost:3002
- localhost:3003

using the default **round-robin** load balancing algorithm.

---

# GitHub Actions CI Pipeline

The project includes a CI workflow using GitHub Actions.

Pipeline triggers on:

- push
- pull_request

Pipeline steps:

- Install dependencies
- Verify project structure
- Validate server build

---

# Testing

The API was tested using:

- Postman
- Browser
- AWS S3 Console

Verified:
- successful image uploads
- S3 object creation
- load balancing across servers
- CI pipeline execution

---

# Future Improvements

- Docker containerization
- EC2 deployment
- Signed S3 URLs
- Image resizing
- Monitoring and logging
- Rate limiting

---

# Author

Kunal Awasthi
