# Copyright (c) 2025 PrivacySDK by Privacy License . All rights reserved.
# Licensed under the MIT License modified with the Commons Clause.
# For complete license terms, see https://gitlab.com/tnabanitade/privacysdk/-/blob/master/LICENSE
# Commercial use is prohibited without a license.
# Contact for Commercial License: nabanita@privacylicense.com | https://privacylicense.ai

#!/bin/bash

# PrivacySDK Google Cloud Run Deployment Script
# This script deploys the PrivacySDK web application to Google Cloud Run

set -e

# Configuration
PROJECT_ID=${1:-"your-google-cloud-project-id"}
REGION=${2:-"us-central1"}
SERVICE_NAME="privacy-sdk"
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "🔒 PrivacySDK Google Cloud Run Deployment"
echo "=========================================="
echo "Project ID: $PROJECT_ID"
echo "Region: $REGION"
echo "Service Name: $SERVICE_NAME"
echo "Image: $IMAGE_NAME"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI is not installed"
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "❌ Error: Not authenticated with gcloud"
    echo "Please run: gcloud auth login"
    exit 1
fi

# Set the project
echo "📋 Setting Google Cloud project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable aiplatform.googleapis.com

# Build the Docker image
echo "🏗️  Building Docker image..."
gcloud builds submit --tag $IMAGE_NAME

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --port 8080 \
    --memory 2Gi \
    --cpu 2 \
    --max-instances 10 \
    --timeout 300 \
    --set-env-vars "NODE_ENV=production" \
    --set-env-vars "PORT=8080"

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

echo ""
echo "✅ Deployment successful!"
echo "🌐 Service URL: $SERVICE_URL"
echo ""
echo "🔧 Environment Variables:"
echo "   - NODE_ENV=production"
echo "   - PORT=8080"
echo ""
echo "📝 To add Gemini AI support, run:"
echo "   gcloud run services update $SERVICE_NAME --region=$REGION --set-env-vars GEMINI_API_KEY=your_api_key_here"
echo ""
echo "🔍 To view logs:"
echo "   gcloud logs tail --service=$SERVICE_NAME --region=$REGION"
echo ""
echo "🎉 PrivacySDK is now live on Google Cloud Run!" 