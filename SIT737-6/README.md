# SIT737 Task 6.1P - Kubernetes Deployment

## Overview
This project deploys a simple Node.js application on a Kubernetes cluster using Docker and Minikube.

## Requirements
- Docker
- Node.js
- Minikube
- kubectl
- Git

## Setup Instructions

1. **Build Docker Image**
```bash
docker build -t YOUR_DOCKERHUB_USERNAME/sit737-node-app .
docker push YOUR_DOCKERHUB_USERNAME/sit737-node-app
```

2. **Start Minikube**
```bash
minikube start
```

3. **Deploy on Kubernetes**
```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

4. **Access the App**
Visit: `http://<minikube_ip>:31000`

Use:
```bash
minikube ip
```

## Files Included
- Dockerfile
- deployment.yaml
- service.yaml
- app.js
- package.json

## Screenshot / Demo
(Add screenshots or a short demo video here)
