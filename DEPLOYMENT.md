# 🚀 Deployment Guide

Bu dokümantasyon, **My First Serverless Function+** projesinin deployment sürecini detaylandırır.

## 📋 Ön Gereksinimler

### 1. AWS Hesabı
- AWS hesabı oluşturun
- IAM kullanıcısı oluşturun
- Programmatic access için Access Key alın

### 2. Gerekli Araçlar
```bash
# AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Terraform
wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
unzip terraform_1.6.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/

# Node.js (yerel test için)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. GitHub Repository
- GitHub'da yeni repository oluşturun
- Repository'yi clone edin
- Proje dosyalarını yükleyin

## 🔧 AWS Konfigürasyonu

### 1. AWS CLI Konfigürasyonu
```bash
aws configure
# AWS Access Key ID: [your-access-key]
# AWS Secret Access Key: [your-secret-key]
# Default region name: us-east-1
# Default output format: json
```

### 2. IAM Kullanıcısı Yetkileri
Gerekli AWS yetkileri:
- Lambda: Create, Update, Delete, Invoke
- API Gateway: Create, Update, Delete, Deploy
- S3: Create, Read, Write, Delete
- CloudWatch: Create, Read, Write
- IAM: PassRole

## 🏗️ Manuel Deployment

### 1. Terraform ile Altyapı Oluşturma
```bash
# Terraform dizinine git
cd terraform

# Terraform'u başlat
terraform init

# Plan'ı kontrol et
terraform plan

# Altyapıyı oluştur
terraform apply
```

### 2. Frontend'i S3'e Yükleme
```bash
# Terraform output'larını al
terraform output

# S3 bucket adını kopyala
aws s3 sync ../frontend/ s3://[bucket-name] --delete
```

### 3. API URL'ini Güncelleme
```bash
# API Gateway URL'ini al
API_URL=$(terraform output -raw api_gateway_url)
echo $API_URL

# Frontend script.js'i güncelle
sed -i "s|https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/prod|$API_URL|g" ../frontend/script.js

# Güncellenmiş frontend'i yükle
aws s3 sync ../frontend/ s3://[bucket-name] --delete
```

## 🤖 Otomatik Deployment (GitHub Actions)

### 1. GitHub Secrets Ayarlama
Repository Settings > Secrets and variables > Actions:

```
AWS_ACCESS_KEY_ID: [your-access-key]
AWS_SECRET_ACCESS_KEY: [your-secret-key]
```

### 2. Workflow Tetikleme
```bash
# Main branch'e push
git add .
git commit -m "Initial deployment"
git push origin main
```

### 3. Deployment Kontrolü
- GitHub Actions sekmesine git
- Workflow run'ını kontrol et
- Tüm job'ların başarılı olduğunu doğrula

## 🧪 Test ve Doğrulama

### 1. API Endpoint Testleri
```bash
# Hello endpoint
curl "https://[api-gateway-url]/hello?name=Test"

# Math square
curl "https://[api-gateway-url]/math/square?number=5"

# Math factorial
curl "https://[api-gateway-url]/math/factorial?number=5"

# Weather
curl "https://[api-gateway-url]/weather?city=Istanbul"
```

### 2. Frontend Testi
- S3 website URL'ine git
- Tüm function'ları test et
- API status indicator'larını kontrol et

### 3. AWS Console Kontrolü
- Lambda functions listesi
- API Gateway endpoints
- S3 bucket contents
- CloudWatch logs

## 🔍 Troubleshooting

### Yaygın Sorunlar

#### 1. Terraform Apply Hatası
```bash
# State dosyasını kontrol et
terraform state list

# Resource'ları yeniden oluştur
terraform destroy
terraform apply
```

#### 2. Lambda Permission Hatası
```bash
# IAM role'ü kontrol et
aws iam get-role --role-name my-first-serverless-lambda-role

# Lambda permission'ları kontrol et
aws lambda get-policy --function-name my-first-serverless-hello
```

#### 3. API Gateway CORS Hatası
- API Gateway Console'da CORS ayarlarını kontrol et
- Lambda function'da CORS header'larını kontrol et

#### 4. S3 Website Erişim Hatası
```bash
# Bucket policy'yi kontrol et
aws s3api get-bucket-policy --bucket [bucket-name]

# Public access ayarlarını kontrol et
aws s3api get-public-access-block --bucket [bucket-name]
```

## 📊 Monitoring ve Logs

### 1. CloudWatch Logs
```bash
# Log group'ları listele
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/my-first-serverless"

# Son log'ları görüntüle
aws logs tail /aws/lambda/my-first-serverless-hello --follow
```

### 2. Lambda Metrics
- AWS Console > Lambda > Functions
- Monitoring sekmesi
- Duration, Errors, Throttles

### 3. API Gateway Metrics
- AWS Console > API Gateway
- Usage sekmesi
- Request count, Latency, Error rate

## 🧹 Cleanup

### 1. Terraform ile Temizlik
```bash
cd terraform
terraform destroy
```

### 2. Manuel Temizlik
```bash
# Lambda functions
aws lambda delete-function --function-name my-first-serverless-hello
aws lambda delete-function --function-name my-first-serverless-math
aws lambda delete-function --function-name my-first-serverless-weather

# API Gateway
aws apigateway delete-rest-api --rest-api-id [api-id]

# S3 bucket
aws s3 rb s3://[bucket-name] --force

# CloudWatch logs
aws logs delete-log-group --log-group-name /aws/lambda/my-first-serverless-hello
aws logs delete-log-group --log-group-name /aws/lambda/my-first-serverless-math
aws logs delete-log-group --log-group-name /aws/lambda/my-first-serverless-weather
```

## 📈 Cost Optimization

### 1. Lambda Optimizasyonu
- Memory size'ı ihtiyaca göre ayarla
- Timeout değerini optimize et
- Cold start'ları minimize et

### 2. API Gateway Optimizasyonu
- Caching kullan
- Request throttling ayarla
- Usage plan'ları optimize et

### 3. S3 Optimizasyonu
- Lifecycle policy'leri ayarla
- Compression kullan
- CDN (CloudFront) ekle

## 🔒 Security Best Practices

### 1. IAM Yetkileri
- Minimum privilege principle
- Resource-specific permissions
- Regular access review

### 2. API Security
- API key authentication
- Rate limiting
- Input validation

### 3. Data Protection
- Encryption at rest
- Encryption in transit
- Secure parameter storage

## 📚 Ek Kaynaklar

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Serverless Best Practices](https://aws.amazon.com/serverless/best-practices/)
