# MongoDB Kubernetes App

This project demonstrates a containerized Node.js microservice that performs CRUD operations using MongoDB, deployed to a Kubernetes cluster.

## 🌐 Components

- Node.js + Express microservice
- MongoDB database
- Docker containerization
- Kubernetes deployments and services
- MongoDB credentials stored in Kubernetes Secrets
- Persistent volume for MongoDB

## 🚀 Setup Instructions

### 1. Build and Push Docker Image

```bash
docker build -t mongo-k8s-app .
docker tag mongo-k8s-app <your-dockerhub-username>/mongo-k8s-app
docker push <your-dockerhub-username>/mongo-k8s-app
```

Update `app-deployment.yaml` to use your pushed image.

### 2. Deploy to Kubernetes

```bash
kubectl apply -f k8s/mongo-secret.yaml
kubectl apply -f k8s/mongo-pv-pvc.yaml
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml
kubectl apply -f k8s/app-deployment.yaml
kubectl apply -f k8s/app-service.yaml
```

### 3. Access the App

Use `kubectl get svc` to find the NodePort and access your app:

```
http://<your-node-ip>:<node-port>/items
```

## 📂 Folder Structure

```
mongo-k8s-app/
├── app.js
├── package.json
├── Dockerfile
├── k8s/
│   ├── mongo-secret.yaml
│   ├── mongo-pv-pvc.yaml
│   ├── mongo-deployment.yaml
│   ├── mongo-service.yaml
│   ├── app-deployment.yaml
│   ├── app-service.yaml
```

## ✅ Test Endpoints

- `GET /items`
- `POST /items`
- `PUT /items/:id`
- `DELETE /items/:id`
