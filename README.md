# AI Instagram Başlık Oluşturucu

Bu proje, yapay zeka kullanarak Instagram fotoğrafları için yaratıcı başlıklar ve hashtag'ler oluşturan bir web uygulamasıdır.

## Özellikler

- Fotoğraf yükleme ve analiz etme
- AI destekli başlık oluşturma
- Otomatik hashtag önerileri
- Responsive tasarım

## Teknolojiler

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- AI Servisleri: Google Cloud Vision API, Google Cloud Natural Language API
- Dağıtım: Heroku

## Kurulum

1. Repoyu klonlayın:
   ```
   git clone https://github.com/sizin-kullanici-adiniz/ai-instagram-caption-generator.git
   ```

2. Proje dizinine gidin:
   ```
   cd ai-instagram-caption-generator
   ```

3. Gerekli paketleri yükleyin:
   ```
   npm install
   ```

4. Google Cloud hesabı oluşturun ve gerekli API'leri etkinleştirin:
   - Vision API
   - Natural Language API
   - Translation API

5. Google Cloud kimlik bilgilerinizi `google-cloud-key.json` dosyasına kaydedin.

6. `.env` dosyası oluşturun ve gerekli ortam değişkenlerini ayarlayın:
   ```
   PORT=3000
   GOOGLE_APPLICATION_CREDENTIALS=./google-cloud-key.json
   ```

7. Uygulamayı başlatın:
   ```
   npm start
   ```

## Kullanım

1. Tarayıcınızda `http://localhost:3000` adresine gidin.
2. "Fotoğraf Yükle" butonuna tıklayın ve bir fotoğraf seçin.
3. "Analiz Et" butonuna tıklayın.
4. Oluşturulan başlık ve hashtag'leri görüntüleyin.

## Dağıtım

Bu uygulama Heroku'ya dağıtılmıştır. Canlı versiyonu [buradan](https://obscure-caverns-61598-24c7f5883601.herokuapp.com/) görüntüleyebilirsiniz.

## Katkıda Bulunma

1. Bu repoyu fork edin
2. Yeni bir özellik branch'i oluşturun (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik: Açıklama'`)
4. Branch'inizi push edin (`git push origin yeni-ozellik`)
5. Bir Pull Request oluşturun

## Lisans

Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır.

## İletişim

Yasir Kayaalp - [GitHub](https://github.com/yasir-kayaalp) - dalfesmain@gmail.com

Proje Linki: [https://github.com/yasir-kayaalp/ai-instagram-caption-generator](https://github.com/yasir-kayaalp/ai-instagram-caption-generator)