# Task List App

## Run app by Docker (localhost)
### 1. Create Docker image
`$ docker build -t tasklistapp -f Dockerfile .`
### 2. Run Docker image from container
`$ docker run -i -p 3000:3000 -t tasklistapp`
### 3. Access by
[http://localhost:3000](http://localhost:3000)

## Run app in local environment
### 1. Run
`$ npm start`
### 2. Access by
[http://localhost:3000](http://localhost:3000)

## Env Variables
REACT_APP_TASK_LIST_API_HOST: Task list api host

## Dev Environment
Node 10.22.1
npm 6.14.6
ReactJS 17.0.2 