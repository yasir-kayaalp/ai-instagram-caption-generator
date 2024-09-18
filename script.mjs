import { analyzeImage } from './js/imageAnalysis.js';
import { generateCaption } from './js/captionGenerator.js';
import { suggestHashtags } from './js/hashtagSuggester.js';

// Gerekli DOM elementlerini seçme
const uploadForm = document.getElementById('uploadForm');
const imageUpload = document.getElementById('imageUpload');
const generatedCaption = document.getElementById('generatedCaption');
const suggestedHashtags = document.getElementById('suggestedHashtags');

// Form gönderildiğinde çalışacak fonksiyon
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const file = imageUpload.files[0];
    if (!file) {
        alert('Lütfen bir fotoğraf seçin.');
        return;
    }

    try {
        // Görüntü analizi
        const imageData = await analyzeImage(file);

        // Başlık oluşturma
        const caption = await generateCaption(imageData);

        // Hashtag önerileri
        const hashtags = await suggestHashtags(imageData);

        // Sonuçları gösterme
        displayResults(caption, hashtags);
    } catch (error) {
        console.error('Hata:', error);
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
});

// Görüntü analizi fonksiyonu (imageAnalysis.js'den gelecek)
async function analyzeImage(file) {
    // Bu fonksiyon imageAnalysis.js'de tanımlanacak
    // Şimdilik boş bir nesne döndürelim
    return {};
}

// Başlık oluşturma fonksiyonu (captionGenerator.js'den gelecek)
async function generateCaption(imageData) {
    // Bu fonksiyon captionGenerator.js'de tanımlanacak
    // Şimdilik örnek bir başlık döndürelim
    return "Harika bir gün için harika bir fotoğraf! #mutluluk";
}

// Hashtag önerme fonksiyonu (hashtagSuggester.js'den gelecek)
async function suggestHashtags(imageData) {
    // Bu fonksiyon hashtagSuggester.js'de tanımlanacak
    // Şimdilik örnek hashtagler döndürelim
    return ["#güneş", "#doğa", "#huzur"];
}

// Sonuçları gösterme fonksiyonu
function displayResults(caption, hashtags) {
    generatedCaption.textContent = caption;
    suggestedHashtags.textContent = hashtags.join(' ');
}
