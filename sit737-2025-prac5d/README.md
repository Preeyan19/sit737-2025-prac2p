# SIT737 – 2025 – Practical 5.2D

## Publishing a Microservice to Google Cloud Registry

### Author: pree166
### Project ID: sit737-25t-shivangeka-1dbaa53

---

## Project Description

This is a simple Node.js microservice that has been containerized using Docker and published to a private container registry on Google Cloud.

---

## Step-by-Step Instructions

### 1. Set GCP Project
```bash
gcloud config set project sit737-25t-shivangeka-1dbaa53
```

### 2. Build Docker Image
```bash
docker build -t gcr.io/sit737-25t-shivangeka-1dbaa53/microservice:v1 .
```

### 3. Authenticate Docker with GCR
```bash
gcloud auth configure-docker
```

### 4. Push Image to GCR
```bash
docker push gcr.io/sit737-25t-shivangeka-1dbaa53/microservice:v1
```

### 5. Run Image from GCR
```bash
docker run -p 3000:3000 gcr.io/sit737-25t-shivangeka-1dbaa53/microservice:v1
```

---

## Files Included

- `app.js` - Node.js server
- `package.json` - Project dependencies
- `Dockerfile` - Docker image configuration
- `README.md` - This documentation

---

## GitHub Repo

Push this folder to your GitHub as:
https://github.com/pree166/sit737-2025-prac5d