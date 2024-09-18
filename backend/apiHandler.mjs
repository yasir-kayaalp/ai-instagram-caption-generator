import vision from '@google-cloud/vision';
import { v2 } from '@google-cloud/translate';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyFilename = path.join(__dirname, '..', 'google-cloud-key.json');
const visionClient = new vision.ImageAnnotatorClient({ keyFilename });
const translate = new v2.Translate({ keyFilename });

async function translateText(text, targetLanguage) {
    try {
        const [translation] = await translate.translate(text, targetLanguage);
        return translation;
    } catch (error) {
        console.error('Çeviri hatası:', error);
        return text;
    }
}

function generateCreativeCaption(labels, objects, colors, faces) {
    const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    const templates = [
        `${randomElement(labels)} ile bezeli bu manzara, adeta bir rüya gibi. ${randomElement(objects)} sanki bizi farklı bir dünyaya davet ediyor.`,
        `${randomElement(objects)}'in etrafında dans eden renkler, doğanın muhteşem uyumunu gözler önüne seriyor.`,
        `Bu karede ${randomElement(labels)} ve ${randomElement(objects)} bir araya gelerek eşsiz bir an yaratıyor.`,
        `${randomElement(labels)}'in büyüleyici güzelliği, insanı adeta büyülüyor. Her detay, doğanın ustalığını gösteriyor.`,
        `${randomElement(objects)} ile çevrili bu manzara, bize doğanın ne kadar zengin olduğunu hatırlatıyor.`
    ];

    const caption = randomElement(templates);
    return caption;
}

async function processImage(imageData) {
    try {
        const buffer = Buffer.from(imageData.split(',')[1], 'base64');

        const [labelDetection] = await visionClient.labelDetection(buffer);
        const [objectDetection] = await visionClient.objectLocalization(buffer);
        const [imageProperties] = await visionClient.imageProperties(buffer);
        const [faceDetection] = await visionClient.faceDetection(buffer);

        const labels = await Promise.all(labelDetection.labelAnnotations.map(label => translateText(label.description, 'tr')));
        const objects = await Promise.all(objectDetection.localizedObjectAnnotations.map(obj => translateText(obj.name, 'tr')));
        const colors = imageProperties.imagePropertiesAnnotation.dominantColors.colors.slice(0, 3).map(color => {
            return `${color.color.red}, ${color.color.green}, ${color.color.blue}`;
        });
        const faces = faceDetection.faceAnnotations.length;

        let generatedCaption = generateCreativeCaption(labels, objects, colors, faces);

        const hashtags = labels.slice(0, 5).map(label => `#${label.replace(/\s+/g, '')}`);

        return {
            caption: generatedCaption,
            hashtags,
            analysis: {
                nesneler: objects,
                renkler: colors,
                yuzSayisi: faces,
                etiketler: labels
            }
        };
    } catch (error) {
        console.error('Görüntü işleme hatası:', error);
        throw error;
    }
}

export { processImage };

