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

#서버 키는 법
docker start carering-mysql
#서버 끄는법
docker stop carering-mysql

#파이썬 추가할때 
pip freeze > requirements.txt

#외부 서버 여는법
 npx localtunnel --port 8000 --subdomain mycarering

#sql에 들어가기
 docker exec -it carering-mysql mysql -u root -p
 DELETE FROM basic_info;
 DELETE FROM lifestyle;
 DELETE FROM users;
 
 #테이블은 남기고 지우기 
 SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE comments;
TRUNCATE TABLE posts;
TRUNCATE TABLE basic_info;
TRUNCATE TABLE lifestyle;
TRUNCATE TABLE users;

SET FOREIGN_KEY_CHECKS = 1;