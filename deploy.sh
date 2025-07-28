#!/bin/bash

# AWS ECS Deployment Script for shadcn-admin

set -e

# Variables (Update these with your actual values)
AWS_REGION="ap-northeast-1"
ECR_REPOSITORY_URI="YOUR_ACCOUNT_ID.dkr.ecr.ap-northeast-1.amazonaws.com/shadcn-admin"
CLUSTER_NAME="YOUR_CLUSTER_NAME"
SERVICE_NAME="shadcn-admin-service"
TASK_FAMILY="shadcn-admin-app"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting deployment of shadcn-admin to AWS ECS...${NC}"

# Step 1: Build Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker build -t shadcn-admin .

# Step 2: Tag image for ECR
echo -e "${YELLOW}Tagging image for ECR...${NC}"
docker tag shadcn-admin:latest $ECR_REPOSITORY_URI:latest
docker tag shadcn-admin:latest $ECR_REPOSITORY_URI:$(date +%Y%m%d-%H%M%S)

# Step 3: Login to ECR
echo -e "${YELLOW}Logging in to ECR...${NC}"
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPOSITORY_URI

# Step 4: Push image to ECR
echo -e "${YELLOW}Pushing image to ECR...${NC}"
docker push $ECR_REPOSITORY_URI:latest
docker push $ECR_REPOSITORY_URI:$(date +%Y%m%d-%H%M%S)

# Step 5: Register new task definition
echo -e "${YELLOW}Registering new task definition...${NC}"
TASK_DEFINITION_ARN=$(aws ecs register-task-definition \
  --cli-input-json file://task-definition.json \
  --region $AWS_REGION \
  --query 'taskDefinition.taskDefinitionArn' \
  --output text)

echo -e "${GREEN}New task definition registered: $TASK_DEFINITION_ARN${NC}"

# Step 6: Update ECS service
echo -e "${YELLOW}Updating ECS service...${NC}"
aws ecs update-service \
  --cluster $CLUSTER_NAME \
  --service $SERVICE_NAME \
  --task-definition $TASK_DEFINITION_ARN \
  --region $AWS_REGION

# Step 7: Wait for deployment to complete
echo -e "${YELLOW}Waiting for deployment to complete...${NC}"
aws ecs wait services-stable \
  --cluster $CLUSTER_NAME \
  --services $SERVICE_NAME \
  --region $AWS_REGION

echo -e "${GREEN}Deployment completed successfully!${NC}"

# Step 8: Show service status
echo -e "${YELLOW}Current service status:${NC}"
aws ecs describe-services \
  --cluster $CLUSTER_NAME \
  --services $SERVICE_NAME \
  --region $AWS_REGION \
  --query 'services[0].{Status:status,RunningCount:runningCount,DesiredCount:desiredCount,TaskDefinition:taskDefinition}'