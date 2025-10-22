# AWS Lambda Functions with Terraform Infrastructure - Homework Project

![Project Screenshot](Ekran%20Resmi%202025-10-22%2017.44.10.png)

## 📋 Proje Özeti

Bu proje, AWS Lambda fonksiyonları ve Terraform altyapısı kullanarak serverless bir uygulama geliştirme örneğidir.

## 🚀 Özellikler

- **3 Lambda Fonksiyonu**: Hello, Math, Weather
- **Terraform Infrastructure**: Otomatik altyapı yönetimi
- **Frontend Website**: Modern web arayüzü
- **API Gateway**: RESTful API endpoint'leri
- **S3 Static Hosting**: Website hosting

## 📁 Proje Yapısı

```
aws-lambda-homework-project/
├── functions/           # Lambda fonksiyonları
│   ├── hello/          # Hello function
│   ├── math/           # Math function
│   └── weather/        # Weather function
├── frontend/           # Web arayüzü
├── terraform/          # Infrastructure as Code
└── demo/              # Demo ve dokümantasyon
```

## 🛠️ Kurulum

1. **Terraform ile altyapıyı oluşturun:**
   ```bash
   cd terraform
   terraform init
   terraform plan
   terraform apply
   ```

2. **Lambda fonksiyonlarını deploy edin:**
   ```bash
   cd functions
   npm install
   # Her fonksiyon için ayrı ayrı deploy
   ```

3. **Frontend'i test edin:**
   ```bash
   cd frontend
   # S3 bucket URL'ini kullanarak test edin
   ```

## 📊 API Endpoints

- **Hello Function**: `/api/hello`
- **Math Function**: `/api/math`
- **Weather Function**: `/api/weather`

## 🔧 Teknolojiler

- **AWS Lambda**: Serverless computing
- **Terraform**: Infrastructure as Code
- **API Gateway**: API management
- **S3**: Static website hosting
- **CloudWatch**: Logging ve monitoring

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---
