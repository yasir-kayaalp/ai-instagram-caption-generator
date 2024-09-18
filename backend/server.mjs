import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';  // Bu satırı ekleyin
import { processImage } from './apiHandler.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS middleware'ini ekleyin
app.use(cors());

// Statik dosyaları sunmak için middleware
app.use(express.static(path.join(__dirname, '..')));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ana route
app.get('/', (req, res) => {
    res.send('AI Instagram Başlık Oluşturucu API');
});

// Görüntü analizi, başlık oluşturma ve hashtag önerme route'u
app.post('/analyze', async (req, res) => {
    try {
        const { image } = req.body;
        const result = await processImage(image);
        res.json(result);
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ error: 'Sunucu hatası', details: error.message });
    }
});

// Sunucuyu başlat
const port = process.env.PORT || 3000;
const ip = '0.0.0.0'; // Tüm ağ arayüzlerini dinle

app.listen(port, ip, () => {
    console.log(`Sunucu http://${ip}:${port} adresinde çalışıyor`);
    console.log(`Yerel ağdan erişmek için: http://192.168.1.112:${port}`);
    console.log(`Localhost'tan erişmek için: http://localhost:${port}`);
});
