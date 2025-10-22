export const handler = async (event) => {
    console.log('Weather function triggered:', JSON.stringify(event, null, 2));
    
    try {
        const city = event.queryStringParameters?.city || 'Istanbul';
        
        // Mock weather data - gerçek uygulamada bir weather API'si kullanılabilir
        const weatherData = {
            'Istanbul': { temperature: '22°C', condition: 'Güneşli', humidity: '65%' },
            'Ankara': { temperature: '18°C', condition: 'Parçalı Bulutlu', humidity: '70%' },
            'Izmir': { temperature: '25°C', condition: 'Açık', humidity: '60%' },
            'Antalya': { temperature: '28°C', condition: 'Güneşli', humidity: '55%' },
            'Bursa': { temperature: '20°C', condition: 'Hafif Yağmurlu', humidity: '75%' }
        };
        
        const cityData = weatherData[city] || {
            temperature: '20°C',
            condition: 'Bilinmiyor',
            humidity: '50%'
        };
        
        const response = {
            city: city,
            temperature: cityData.temperature,
            condition: cityData.condition,
            humidity: cityData.humidity,
            timestamp: new Date().toISOString(),
            functionName: 'my-first-serverless-weather',
            region: process.env.AWS_REGION || 'us-east-1',
            note: 'Bu mock veridir. Gerçek uygulamada bir weather API kullanılmalıdır.'
        };
        
        console.log('Weather response:', JSON.stringify(response, null, 2));
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
            },
            body: JSON.stringify(response)
        };
        
    } catch (error) {
        console.error('Error in weather function:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message,
                timestamp: new Date().toISOString()
            })
        };
    }
};
