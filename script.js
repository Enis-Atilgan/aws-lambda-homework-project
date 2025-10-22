// API Base URL - Bu URL Terraform output'undan alınacak
let API_BASE_URL = 'https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/prod';

// Sayfa yüklendiğinde API durumunu kontrol et
document.addEventListener('DOMContentLoaded', function() {
    checkAPIStatus();
});

// API durumunu kontrol et
async function checkAPIStatus() {
    const endpoints = [
        { name: 'hello', url: `${API_BASE_URL}/hello?name=Test` },
        { name: 'math', url: `${API_BASE_URL}/math/square?number=2` },
        { name: 'weather', url: `${API_BASE_URL}/weather?city=Istanbul` }
    ];

    for (const endpoint of endpoints) {
        try {
            const response = await fetch(endpoint.url);
            if (response.ok) {
                updateStatusIndicator(endpoint.name, true);
            } else {
                updateStatusIndicator(endpoint.name, false);
            }
        } catch (error) {
            console.error(`${endpoint.name} API error:`, error);
            updateStatusIndicator(endpoint.name, false);
        }
    }
}

// Status indicator'ı güncelle
function updateStatusIndicator(apiName, isOnline) {
    const indicator = document.getElementById(`${apiName}-indicator`);
    if (indicator) {
        if (isOnline) {
            indicator.classList.add('online');
        } else {
            indicator.classList.remove('online');
        }
    }
}

// Hello function test
async function testHelloFunction() {
    const name = document.getElementById('hello-name').value || 'Dünya';
    const resultDiv = document.getElementById('hello-result');
    const loadingDiv = document.getElementById('hello-loading');
    const contentDiv = document.getElementById('hello-content');

    showLoading(loadingDiv, contentDiv);

    try {
        const response = await fetch(`${API_BASE_URL}/hello?name=${encodeURIComponent(name)}`);
        const data = await response.json();

        if (response.ok) {
            showSuccess(contentDiv, `
                <h4>✅ Hello Function Başarılı!</h4>
                <p><strong>Mesaj:</strong> ${data.message}</p>
                <p><strong>Zaman:</strong> ${new Date(data.timestamp).toLocaleString('tr-TR')}</p>
                <p><strong>Fonksiyon:</strong> ${data.functionName}</p>
                <p><strong>Bölge:</strong> ${data.region}</p>
            `);
            updateStatusIndicator('hello', true);
        } else {
            showError(contentDiv, `
                <h4>❌ Hello Function Hatası</h4>
                <p><strong>Hata:</strong> ${data.error || 'Bilinmeyen hata'}</p>
                <p><strong>Mesaj:</strong> ${data.message || 'Detay yok'}</p>
            `);
        }
    } catch (error) {
        showError(contentDiv, `
            <h4>❌ Bağlantı Hatası</h4>
            <p><strong>Hata:</strong> ${error.message}</p>
            <p>API URL'ini kontrol edin: ${API_BASE_URL}</p>
        `);
        updateStatusIndicator('hello', false);
    } finally {
        hideLoading(loadingDiv, contentDiv);
    }
}

// Square function test
async function testSquareFunction() {
    const number = document.getElementById('square-number').value;
    const resultDiv = document.getElementById('square-result');
    const loadingDiv = document.getElementById('square-loading');
    const contentDiv = document.getElementById('square-content');

    if (!number || isNaN(number)) {
        showError(contentDiv, `
            <h4>❌ Geçersiz Giriş</h4>
            <p>Lütfen geçerli bir sayı girin.</p>
        `);
        return;
    }

    showLoading(loadingDiv, contentDiv);

    try {
        const response = await fetch(`${API_BASE_URL}/math/square?number=${encodeURIComponent(number)}`);
        const data = await response.json();

        if (response.ok) {
            showSuccess(contentDiv, `
                <h4>✅ Kare Hesaplama Başarılı!</h4>
                <p><strong>Sayı:</strong> ${data.number}</p>
                <p><strong>Kare:</strong> ${data.square}</p>
                <p><strong>Zaman:</strong> ${new Date(data.timestamp).toLocaleString('tr-TR')}</p>
                <p><strong>Fonksiyon:</strong> ${data.functionName}</p>
            `);
            updateStatusIndicator('math', true);
        } else {
            showError(contentDiv, `
                <h4>❌ Math Function Hatası</h4>
                <p><strong>Hata:</strong> ${data.error || 'Bilinmeyen hata'}</p>
                <p><strong>Mesaj:</strong> ${data.message || 'Detay yok'}</p>
            `);
        }
    } catch (error) {
        showError(contentDiv, `
            <h4>❌ Bağlantı Hatası</h4>
            <p><strong>Hata:</strong> ${error.message}</p>
            <p>API URL'ini kontrol edin: ${API_BASE_URL}</p>
        `);
        updateStatusIndicator('math', false);
    } finally {
        hideLoading(loadingDiv, contentDiv);
    }
}

// Factorial function test
async function testFactorialFunction() {
    const number = document.getElementById('factorial-number').value;
    const resultDiv = document.getElementById('factorial-result');
    const loadingDiv = document.getElementById('factorial-loading');
    const contentDiv = document.getElementById('factorial-content');

    if (!number || isNaN(number) || number < 0 || number > 20) {
        showError(contentDiv, `
            <h4>❌ Geçersiz Giriş</h4>
            <p>Lütfen 0-20 arasında geçerli bir sayı girin.</p>
        `);
        return;
    }

    showLoading(loadingDiv, contentDiv);

    try {
        const response = await fetch(`${API_BASE_URL}/math/factorial?number=${encodeURIComponent(number)}`);
        const data = await response.json();

        if (response.ok) {
            showSuccess(contentDiv, `
                <h4>✅ Faktöriyel Hesaplama Başarılı!</h4>
                <p><strong>Sayı:</strong> ${data.number}</p>
                <p><strong>Faktöriyel:</strong> ${data.factorial}</p>
                <p><strong>Zaman:</strong> ${new Date(data.timestamp).toLocaleString('tr-TR')}</p>
                <p><strong>Fonksiyon:</strong> ${data.functionName}</p>
            `);
            updateStatusIndicator('math', true);
        } else {
            showError(contentDiv, `
                <h4>❌ Math Function Hatası</h4>
                <p><strong>Hata:</strong> ${data.error || 'Bilinmeyen hata'}</p>
                <p><strong>Mesaj:</strong> ${data.message || 'Detay yok'}</p>
            `);
        }
    } catch (error) {
        showError(contentDiv, `
            <h4>❌ Bağlantı Hatası</h4>
            <p><strong>Hata:</strong> ${error.message}</p>
            <p>API URL'ini kontrol edin: ${API_BASE_URL}</p>
        `);
        updateStatusIndicator('math', false);
    } finally {
        hideLoading(loadingDiv, contentDiv);
    }
}

// Weather function test
async function testWeatherFunction() {
    const city = document.getElementById('weather-city').value;
    const resultDiv = document.getElementById('weather-result');
    const loadingDiv = document.getElementById('weather-loading');
    const contentDiv = document.getElementById('weather-content');

    showLoading(loadingDiv, contentDiv);

    try {
        const response = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`);
        const data = await response.json();

        if (response.ok) {
            showSuccess(contentDiv, `
                <h4>✅ Hava Durumu Bilgisi</h4>
                <p><strong>Şehir:</strong> ${data.city}</p>
                <p><strong>Sıcaklık:</strong> ${data.temperature}</p>
                <p><strong>Durum:</strong> ${data.condition}</p>
                <p><strong>Nem:</strong> ${data.humidity}</p>
                <p><strong>Zaman:</strong> ${new Date(data.timestamp).toLocaleString('tr-TR')}</p>
                <p><strong>Not:</strong> ${data.note}</p>
            `);
            updateStatusIndicator('weather', true);
        } else {
            showError(contentDiv, `
                <h4>❌ Weather Function Hatası</h4>
                <p><strong>Hata:</strong> ${data.error || 'Bilinmeyen hata'}</p>
                <p><strong>Mesaj:</strong> ${data.message || 'Detay yok'}</p>
            `);
        }
    } catch (error) {
        showError(contentDiv, `
            <h4>❌ Bağlantı Hatası</h4>
            <p><strong>Hata:</strong> ${error.message}</p>
            <p>API URL'ini kontrol edin: ${API_BASE_URL}</p>
        `);
        updateStatusIndicator('weather', false);
    } finally {
        hideLoading(loadingDiv, contentDiv);
    }
}

// Utility functions
function showLoading(loadingDiv, contentDiv) {
    loadingDiv.style.display = 'flex';
    contentDiv.style.display = 'none';
    contentDiv.classList.remove('show');
}

function hideLoading(loadingDiv, contentDiv) {
    loadingDiv.style.display = 'none';
    contentDiv.style.display = 'block';
    contentDiv.classList.add('show');
}

function showSuccess(contentDiv, html) {
    contentDiv.innerHTML = html;
    contentDiv.className = 'result-content show success';
}

function showError(contentDiv, html) {
    contentDiv.innerHTML = html;
    contentDiv.className = 'result-content show error';
}

// API URL'ini güncelle (Terraform output'undan alınacak)
function updateAPIBaseURL(newURL) {
    API_BASE_URL = newURL;
    console.log('API Base URL updated to:', API_BASE_URL);
}

// Enter tuşu ile test etme
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.id === 'hello-name') {
            testHelloFunction();
        } else if (activeElement.id === 'square-number') {
            testSquareFunction();
        } else if (activeElement.id === 'factorial-number') {
            testFactorialFunction();
        }
    }
});
