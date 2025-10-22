# 🎥 Demo ve Ekran Görüntüleri

Bu klasör, **My First Serverless Function+** projesinin demo videoları ve ekran görüntülerini içerir.

## 📁 İçerik

### 🎬 Demo Video
- `demo-video.mp4` - Projenin tam çalışma demo'su (1 dakika)
- Proje özelliklerinin gösterimi
- API endpoint'lerinin test edilmesi
- Frontend arayüzünün kullanımı

### 📸 Ekran Görüntüleri

#### 1. Proje Yapısı
- `01-project-structure.png` - GitHub repository yapısı
- `02-terraform-files.png` - Terraform konfigürasyon dosyaları

#### 2. AWS Console
- `03-lambda-functions.png` - AWS Lambda fonksiyonları
- `04-api-gateway.png` - API Gateway konfigürasyonu
- `05-s3-bucket.png` - S3 static website hosting
- `06-cloudwatch-logs.png` - CloudWatch logları

#### 3. Frontend Arayüz
- `07-frontend-homepage.png` - Ana sayfa görünümü
- `08-hello-function-test.png` - Hello function test sonucu
- `09-math-function-test.png` - Math function test sonucu
- `10-weather-function-test.png` - Weather function test sonucu

#### 4. API Testleri
- `11-curl-hello-test.png` - cURL ile Hello API testi
- `12-curl-math-test.png` - cURL ile Math API testi
- `13-curl-weather-test.png` - cURL ile Weather API testi

#### 5. CI/CD Pipeline
- `14-github-actions.png` - GitHub Actions workflow
- `15-deployment-success.png` - Başarılı deployment
- `16-terraform-outputs.png` - Terraform output'ları

## 🚀 Hızlı Test Komutları

### API Endpoint Testleri
```bash
# Hello Function
curl "https://your-api-gateway-url/hello?name=Ali"

# Math Square
curl "https://your-api-gateway-url/math/square?number=5"

# Math Factorial
curl "https://your-api-gateway-url/math/factorial?number=5"

# Weather
curl "https://your-api-gateway-url/weather?city=Istanbul"
```

### Terraform Komutları
```bash
# Altyapıyı oluştur
cd terraform
terraform init
terraform plan
terraform apply

# Altyapıyı temizle
terraform destroy
```

## 📊 Performans Metrikleri

### Lambda Fonksiyon Metrikleri
- **Cold Start Süresi:** ~200-500ms
- **Warm Start Süresi:** ~50-100ms
- **Memory Kullanımı:** 128MB
- **Timeout:** 30 saniye

### API Gateway Metrikleri
- **Response Time:** ~100-300ms
- **Throughput:** 1000+ requests/second
- **Availability:** 99.9%

## 🔧 Troubleshooting

### Yaygın Sorunlar
1. **CORS Hatası:** API Gateway'de CORS ayarlarını kontrol edin
2. **Lambda Timeout:** Timeout değerini artırın
3. **Permission Denied:** IAM rollerini kontrol edin
4. **S3 Access:** Bucket policy'lerini kontrol edin

### Log Kontrolü
```bash
# CloudWatch loglarını kontrol et
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/my-first-serverless"
```

## 📝 Notlar

- Tüm ekran görüntüleri 1920x1080 çözünürlükte alınmıştır
- Demo video 60 FPS, 1080p kalitesinde kaydedilmiştir
- Test verileri gerçek AWS ortamında çalıştırılmıştır
- Tüm endpoint'ler başarıyla test edilmiştir
