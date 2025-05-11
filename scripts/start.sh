#!/bin/bash

echo "🚀 Starting CareRing Application..."

# Docker Compose 실행
cd ../backend
docker-compose up -d

# FastAPI 서버 실행
cd ../backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 &

# React Native 실행
cd ../frontend
npx react-native start