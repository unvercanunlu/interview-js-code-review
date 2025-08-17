### Practice 1

**Güvenlik Açıkları:**

- **`innerHTML` Kullanımı ve XSS Saldırıları:** Kod, HTML içeriğini dinamik olarak ayarlamak için `innerHTML` kullanıyor. Bu, en yaygın ve en tehlikeli güvenlik açıklarından biridir çünkü kullanıcı tarafından sağlanan verilerin doğrudan DOM'a enjekte edilmesine izin verir. Kötü niyetli bir kullanıcı, bu açıklığı kullanarak sayfaya zararlı `script`'ler (örneğin, çerezleri çalmak veya diğer kullanıcıları zararlı sitelere yönlendirmek için) enjekte edebilir. Bu nedenle, `innerHTML` yerine, sadece metin içeriğini ayarlayan ve daha güvenli olan `textContent` veya `innerText` gibi özellikler kullanılmalıdır.
- **Validation ve Sanitization Eksikliği:** Dinamik olarak oluşturulan HTML elementlerinde `validation` (doğrulama), `normalization` (normalleştirme) ve `sanitization` (zararlı girdiden arındırma) işlemleri eksik. Bu, potansiyel XSS saldırılarına karşı kodu savunmasız bırakır. Herhangi bir kullanıcı girdisi DOM'a eklenmeden önce mutlaka temizlenmelidir.

**Hata Yönetimi ve Veri Kontrolü:**

- **`null` ve `undefined` Kontrolleri:** `data` ve `products` değişkenlerinin `null` (boş) veya `undefined` (tanımlanmamış) olup olmadığına dair kontroller yapılmamış. Bu durum, beklenmedik veri formatlarında veya API'den gelen hatalı yanıtlarda uygulamanın çökmesine neden olabilir.
- **`try-catch` Mekanizmasının Gerekliliği:** `fetch` işlemleri sırasında oluşabilecek ağ hataları veya diğer beklenmedik durumlar için bir `try-catch` (dene-yakala) bloğu kullanılması şarttır. Bu, uygulamanın daha dayanıklı olmasını sağlar.
- **`AbortController` Kullanımı:** Çoklu veya tekrarlayan API çağrılarında, `race condition`'ları (aynı anda başlayan birden fazla işlemin birbiriyle çakışması) önlemek için `AbortController` (iptal kontrolcüsü) kullanılması önemlidir. Bu, önceki isteklerin iptal edilerek en son isteğin geçerli olmasını sağlar.
- **Kapsamlı HTTP Hata Yönetimi:** Kod, sadece başarılı yanıt (`response.ok`) durumunu kontrol ediyor. 400, 401, 403, 404 gibi spesifik HTTP `response code`'ları (yanıt kodları) için ayrı ayrı durumlar ele alınmamıştır. Bu durum, kullanıcıya neden bir hatayla karşılaşıldığına dair net bilgi verilmesini engeller.
- **Geçersiz Yanıtların Loglanması:** `catch` bloğunda sadece genel ağ hataları ele alınmış. API'den dönen ancak beklenen formatta olmayan (örneğin, boş bir `object` veya `array`) verilerin de `log`lanması (kaydedilmesi), hata ayıklama sürecini kolaylaştırır.
- **Timeout Mekanizması:** Ağ istekleri, sunucunun yavaş yanıt vermesi veya hiç yanıt vermemesi durumunda süresiz olarak askıda kalabilir. Bu durumu önlemek ve kullanıcı deneyimini korumak için `setTimeout` ve `clearTimeout` ile bir `timeout` (zaman aşımı) mekanizması eklenmelidir.

**Performans ve Kod Kalitesi:**

- **DOM Manipülasyonu:** Mevcut HTML `render` etme (görselleştirme) yöntemi, performansı olumsuz etkileyebilir. Özellikle büyük veri setleri için, `replaceChildren` veya `DocumentFragment` gibi daha verimli `batch insertion` (toplu ekleme) mekanizmaları kullanılmalıdır.
- **Type Checking:** `container` gibi DOM elementleri için `type checking` (tip kontrolü) eksik. TypeScript veya JSDoc gibi araçlarla tip tanımı yapılması, kodun okunabilirliğini ve sürdürülebilirliğini artırır.
- **`document.addEventListener`:** `DOMContentLoaded` `event listener`'ının (olay dinleyicisi) kullanımı, kodun HTML içeriği tamamen yüklendikten sonra çalışmasını garantilediği için doğru ve standart bir yaklaşımdır.

---

### Practice 2

**Güvenlik Açıkları:**

- **`innerHTML` ve XSS:** `innerHTML` kullanımı, kullanıcı girdisinin doğrudan HTML olarak sayfaya eklenmesine olanak tanıyarak XSS saldırılarına kapı açar. Bu, kullanıcı tarafından sağlanan arama sorgularının da `sanitize` (temizleme) edilmesini gerektirir.
- **Inline Event Handler (`onclick`):** `onclick` gibi `inline event handler`'ların (satır içi olay işleyici) HTML içinde kullanılması, sunum katmanını (HTML) ve davranış katmanını (JavaScript) birbirine bağlayan bir `anti-pattern` (karşıt şablon)'dir. Bu, kodu yönetmeyi, bakımını yapmayı ve test etmeyi zorlaştırır. `addEventListener` ile `event`'lerin (olayların) JavaScript tarafında yönetilmesi daha iyi bir uygulamadır.

**Performans:**

- **`debounce` ve API İstekleri:** Kullanıcı her tuş vuruşunda bir API isteği gönderilmesi, sunucuya gereksiz yük bindirir ve performansı düşürür. Kullanıcının yazmayı bitirmesini beklemek için `debounce` (geciktirme) tekniği kullanılmalıdır.
- **`Race Condition` ve `AbortController`:** Çoklu API istekleri gönderildiğinde (örneğin, kullanıcı hızlıca arama kutusuna bir şeyler yazdığında), eski, yavaş istekler daha sonra tamamlanarak kullanıcıya yanlış sonuçlar gösterebilir. `AbortController` kullanarak önceki istekleri iptal etmek, `race condition`'ları önler.

**Hata Yönetimi ve Veri Kontrolü:**

- **Validation Eksikliği:** `data`, `e.target.value` ve `query` gibi değişkenlerin boş veya `null` olup olmadığına dair kontroller eksik. Bu, hatalı veri nedeniyle kodun çökmesine neden olabilir.
- **Kapsamlı HTTP Hata Yönetimi:** Kod, sadece başarılı yanıtları ele alıyor; 400, 401, 404, 403 gibi spesifik HTTP hataları için özel durumlar tanımlanmamıştır.
- **Yakalanan Hataların Sınırlı Kapsamı:** `catch` bloğu sadece ağ hatalarını yakalıyor. API'den gelen geçersiz veya eksik veri formatları (örneğin, `result.url`'nin olmaması) gibi durumlar ele alınmamıştır.
- **`finally` Bloğunun Önemi:** İsteğin başarılı veya başarısız olmasına bakılmaksızın, bir `loading` durumunu (yüklenme durumu) kaldırmak gibi işlemler için `finally` (son olarak) bloğu kullanılabilir.

**Kod Kalitesi:**

- **Type Checking Eksikliği:** `searchInput` ve `resultsContainer` gibi DOM elementleri için `type checking` (tip kontrolü) eksik.
- **Yanlış `Event Delegation` Yorumu:** Kodda, `onclick` doğrudan kullanıldığı için `event delegation` (olay devretme) uygulanmamıştır. `Event delegation`, performans için büyük bir fayda sağlar; zira birden fazla benzer element için tek bir `event listener` (olay dinleyicisi) kullanmayı sağlar.

---

### Practice 3

**Güvenlik ve Performans:**

- **`innerHTML` ve XSS:** `newTodoText` değişkeni `innerHTML` ile doğrudan DOM'a eklendiği için XSS saldırılarına açıktır. Güvenlik için `document.createElement()` ve `textContent` kullanılmalıdır.
- **Event Listener Performans Sorunu:** Her bir "sil" butonu için ayrı bir `event listener` (olay dinleyicisi) eklemek, özellikle çok sayıda eleman olduğunda performans sorunlarına ve `memory leak`'lere (bellek sızıntısı) yol açabilir. Bunun yerine, tüm butonları içeren ebeveyn `<ul>` elementine tek bir `event listener` ekleyerek `event delegation` (olay devretme) kullanmak daha verimlidir.
- **Batch Insertion:** Elementleri tek tek DOM'a eklemek yerine, `DocumentFragment` kullanarak elementleri önce sanal bir bellek alanında oluşturup, ardından tek bir işlemde DOM'a eklemek performansı artırır.

**Kullanıcı Deneyimi (UX) ve Doğrulama:**

- **`alert` Kullanımı:** Kullanıcıyı uyarmak için `alert()` kullanmak, kesintili ve eski bir kullanıcı deneyimi (`UX`) sunar. Hata mesajları, formun içinde, ilgili alanın yanında gösterilmelidir.
- **Live Validation:** Kullanıcı yazdıkça geçerliliği kontrol etmek, anında geri bildirim sağlar ve daha iyi bir UX sunar.

**Kod Kalitesi ve Sürdürülebilirlik:**

- **Global Değişkenler:** `todoCount` gibi `state management` (durum yönetimi) için global bir değişken kullanmak, kodun `modularity` (modülerlik) ve `testability` (test edilebilirlik) özelliklerini azaltır.
- **Type Checking:** DOM elementleri için `type checking` (tip kontrolü) eksik. Bu durum, özellikle büyük projelerde hata bulmayı zorlaştırır.
- **Event Delegation Yanlış Anlaşılması:** Kodun "inner event delegation"ı önlemesi gibi bir yorum, konunun yanlış anlaşıldığını gösterir. Doğru yaklaşım `event delegation` kullanmaktır.

---

### Practice 4

**Güvenlik:**

- **Plain Text Password Gönderimi:** Şifre, API'ye `encrypted` (şifrelenmeden), `plain text` (düz metin) olarak gönderiliyor. Bu, ağ trafiği izlendiğinde `sensitive data`'nın (hassas veri) ele geçirilmesine yol açabilecek ciddi bir güvenlik açığıdır. Şifreler mutlaka `encrypted` olarak gönderilmelidir.
- **Front-end Validation Eksikliği:** Kullanıcıdan alınan şifre gibi `sensitive data` (hassas veri) için minimum uzunluk veya karakter gereksinimi gibi `front-end validation`'ları (ön yüz doğrulamaları) eksik. Bu, `weak password`'lerin (zayıf şifrelerin) kullanılmasına olanak tanır.

**Hata Yönetimi ve Kullanıcı Deneyimi:**

- **General Error Messages:** Kod, 401 (`Unauthorized` - Yetkisiz), 403 (`Forbidden` - Yasak) gibi spesifik HTTP hataları için genel bir "`Authentication failed`" (Kimlik doğrulama başarısız oldu) mesajı gösteriyor. Daha spesifik hata mesajları (örneğin, "`Invalid password`" - Geçersiz şifre veya "`Account is locked`" - Hesap kilitli) kullanıcıya daha iyi `feedback` (geri bildirim) sağlar.
- **`finally` Bloğunun Eksikliği:** API isteği tamamlandığında (başarılı veya başarısız fark etmeksizin) bir `loading` mesajını (yükleme mesajı) kaldırmak gibi işlemler için `finally` (son olarak) bloğu idealdir.
- **"`Too Many Requests`" Hatası:** 429 gibi "`Too Many Requests`" (Çok Fazla İstek) hatalarının özel olarak ele alınması ve kullanıcıya beklemesi gereken süre hakkında bilgi verilmesi gerekir.

**Performans ve Kod Kalitesi:**

- **`Race Condition`'ları Önleme:** Kullanıcı, login butonuna art arda hızlıca tıklarsa, gereksiz API çağrıları oluşur. `AbortController` veya `debounce` mekanizmaları kullanılarak bu durum engellenmelidir.
- **Type Checking:** DOM elementleri için `type checking` (tip kontrolü) eksik.

### Practice 5

**Güvenlik:**

- **`innerHTML` ve XSS:** `innerHTML` kullanılarak API'den gelen verinin doğrudan DOM'a enjekte edilmesi, `sanitize` edilmediği için XSS saldırılarına yol açar.
- **Validation ve Normalization Eksikliği:** API'den gelen verilerle HTML elementleri oluşturulurken `validation` (doğrulama) ve `normalization` (normalleştirme) işlemleri eksik.

**Hata Yönetimi ve Veri Kontrolü:**

- **`null` ve `undefined` Kontrolleri:** API yanıtından gelen `userData` için `null` (boş) veya `undefined` (tanımlanmamış) kontrolü eksik.
- **Timeout Mekanizması:** Yavaş veya yanıt vermeyen API'ler için bir `timeout` (zaman aşımı) mekanizması bulunmuyor.
- **Race Condition ve `AbortController`:** Çoklu isteklerde `race condition`'ları (yarış koşulları) önlemek için `AbortController` (iptal kontrolcüsü) eksik.
- **Kapsamlı Hata Yönetimi:** Sadece başarılı yanıtlar ele alınmış, 400, 401, 404 gibi spesifik HTTP hata kodları için ayrı durumlar ele alınmamıştır.

**Kod Kalitesi ve Sürdürülebilirlik:**

- **Type Checking:** DOM elementleri için `type checking` (tip kontrolü) eksik.
- **Single Responsibility Principle (SRP):** Kod, hem `data fetching` (veri çekme) hem de veriyi `render` etme (görselleştirme) gibi iki farklı `responsibility`'yi (sorumluluğu) aynı sınıfta topluyor. Bu, SRP'yi ihlal eder ve kodun bakımını zorlaştırır.

### Practice 6

**Güvenlik ve Performans:**

- **`innerHTML` ve XSS:** `userComment` değişkeni `innerHTML` ile doğrudan DOM'a eklendiği için XSS saldırılarına açıktır. `document.createElement()` ile `textContent` veya `innerText` kullanılması gerekir.
- **Button Tıklama Sorunu:** Submit butonu art arda tıklanabiliyor. Gereksiz ve boş yorumların eklenmesini önlemek için `throttling` (kısma) veya `debouncing` (geciktirme) mekanizmaları kullanılmalıdır.

**Kullanıcı Deneyimi (UX) ve Kod Kalitesi:**

- **`alert` Kullanımı:** Form `validation`'ı (doğrulaması) için `alert()` kullanmak kötü bir kullanıcı deneyimidir. Hata mesajları formun içinde gösterilmelidir.
- **Accessibility (A11y):** Formda eksik `labels` (etiketler), ARIA `attributes` (nitelikleri) ve `keyboard navigation` (klavye ile gezinme) gibi önemli `accessibility` (erişilebilirlik) sorunları bulunmaktadır.
- **Type Checking:** DOM elementleri için `type checking` (tip kontrolü) eksik.

### Practice 7

**Güvenlik ve Performans:**

- **`innerHTML` ve XSS:** `innerHTML` kullanımı, API'den gelen verinin DOM'a enjekte edilmesine izin vererek bir XSS güvenlik açığı oluşturur.
- **Verimsiz DOM Manipulation:** Kod, `loop` (döngü) içinde DOM'u sürekli temizleyip yeniden `render` ediyor. Bu, özellikle büyük veri setleri için performansı ciddi şekilde düşürür. `DocumentFragment` kullanarak `batch insertion` (toplu ekleme) yapmak daha verimlidir.
- **Inline Event Handlers:** `onclick` ve `onchange` gibi `inline event handler`'lar (satır içi olay işleyici) yerine `addEventListener` kullanılmalıdır.

**State Yönetimi ve Mimari:**

- **Global Scope Kirliliği:** `window.shoppingCart = shoppingCart` satırı, `global scope`'u (küresel kapsam) kirletir ve `testability`'i (test edilebilirlik) azaltır.
- **State Persistence:** Uygulamanın `state`'i (durumu - alışveriş sepeti), sayfa yenilendiğinde kaybolur. Verilerin `localStorage` veya `sessionStorage` gibi `browser storage`'larında (tarayıcı depolamalarında) saklanması, `persistence` (kalıcılık) sağlar.

**Hata Yönetimi ve Veri Doğrulama:**

- **`null` ve `undefined` Kontrolleri:** `item.price` gibi değerler için `null` (boş) veya `undefined` (tanımlanmamış) kontrolleri eksik.
- **Data Format Validation:** Kod, API'den gelen verinin varlığını veya formatını `validate` (doğrulama) etmiyor.
- **Kapsamlı Hata Yönetimi:** Sadece `response.ok` kontrol ediliyor, diğer HTTP hataları ele alınmıyor.
- **Race Condition ve `AbortController`:** Hızlı tıklamalar veya tekrarlanan istekler için `AbortController` (iptal kontrolcüsü) eksik.

**Accessibility (A11y) ve Kod Kalitesi:**

- **Accessibility Sorunları:** Uygulama, eksik ARIA `attributes` (nitelikleri) ve `keyboard navigation` (klavye ile gezinme) gibi önemli `accessibility` (erişilebilirlik) sorunlarına sahiptir.
- **Type Checking:** DOM elementleri için `type checking` (tip kontrolü) eksik.

### Practice 8

**Performans ve Bellek Yönetimi:**

- **Verimsiz Event Listener Kullanımı:** Kod, `querySelectorAll` ile seçilen her bir butona ayrı ayrı bir `click` `listener` (dinleyici) ekliyor. Bu yaklaşım, az sayıda element için kabul edilebilir olsa da, buton sayısı arttıkça performansı olumsuz etkiler ve her `listener`'ın bellekte yer kaplaması nedeniyle `memory leak`'lere (bellek sızıntısı) yol açabilir.
- **Doğru Yaklaşım: Event Delegation:** Bu sorunu çözmek için `event delegation` (olay devretme) tekniği kullanılmalıdır. Bu teknikte, her bir butona ayrı ayrı `listener` eklemek yerine, tüm butonları kapsayan ebeveyn elementine (`buttonContainer`) tek bir `listener` eklenir. `event.target` özelliği kullanılarak hangi butona tıklandığı tespit edilir ve ilgili işlem yapılır. Bu sayede, tek bir `listener` ile sınırsız sayıda butonu verimli bir şekilde yönetebiliriz.

**Kod Kalitesi ve Sürdürülebilirlik:**

- **Dinamik Butonlar için Eksik `Event Listener`:** `addDynamicButton()` fonksiyonu, dinamik olarak eklenen yeni butona `addEventListener` eklemiyor. Bu da yeni eklenen butonun çalışmamasına neden olur. `Event delegation` kullanılsaydı bu sorun otomatik olarak çözülürdü.
- **`Type Checking` Eksikliği:** `counter`, `counterElement`, `buttonContainer`, `buttons` gibi değişkenler için `type checking` (tip kontrolü) eksik. Bu durum, özellikle büyük projelerde kodun okunabilirliğini ve sürdürülebilirliğini olumsuz etkiler.
- **Yanlış Varsayım:** "Kodun mevcut hali, bellek sızıntısına veya performans sorununa yol açmaz" yorumu yanlıştır. Dinamik olarak butonlar eklenip çıkarıldığında (örneğin bir `SPA`'da), eski `listener`'lar bellekten temizlenmediği için `memory leak` (bellek sızıntısı) oluşabilir.

**Hata Yönetimi ve Kullanıcı Deneyimi:**

- **Eksik Hedef Kontrolü:** Kod, `event.target`'ın (olay hedefinin) her zaman bir buton olacağını varsayıyor. Eğer `<span>` veya başka bir iç elemente tıklanırsa, `event.target.dataset.action` `undefined` olur ve kod beklenmedik şekilde davranabilir. Bu durumu önlemek için, tıklanan elementin bir buton olup olmadığı `event.target.matches('.action-btn')` gibi bir yöntemle kontrol edilmelidir.

---

### Practice 9

**Bellek Sızıntısı ve Performans:**

- **Zamanlama Fonksiyonları ve `Memory Leak`:** Kod, `setTimeout` ve `setInterval` gibi zamanlama fonksiyonlarının yanlış kullanımı nedeniyle ciddi bir `memory leak` (bellek sızıntısı) riskine sahiptir. `startButton`'a her tıklandığında, `setInterval` ve `setTimeout` için yeni bir `timerId` oluşturulur. Ancak eski `timer`'lar (zamanlayıcılar) her zaman temizlenmediği için bellekte birikir. Bu, uygulamanın performansını ciddi şekilde düşürür.
- **Doğru Yaklaşım:** `startButton` tıklandığında `timerId` zaten tanımlıysa, yeni bir sayaç başlatılmamalıdır. `if (!timerId)` kontrolüyle bu durum kısmen ele alınmıştır, ancak `setTimeout` çağrısı içindeki `clearInterval` doğru çalışsa bile, bu yaklaşım gereksiz yere birden fazla işlem oluşturabilir.

**Veri Yapısı ve Tip Güvenliği:**

- **`Type Checking` Eksikliği:** `counter` ve `timerId` gibi global değişkenler için `type checking` (tip kontrolü) eksiktir. Bu durum, özellikle daha karmaşık uygulamalarda kodun okunabilirliğini ve sürdürülebilirliğini olumsuz etkiler.
- **`Null Guard` Kontrolü Eksikliği:** `startButton` ve `stopButton` gibi HTML elementleri için `null guard` (boş kontrolü) eksiktir. Eğer bu elementler HTML'de bulunamazsa, `getElementById` `null` döndürür ve `null` üzerinde `addEventListener` çağırmaya çalışmak bir hata (`error`) fırlatır.

**`Event Handling` (Olay Yönetimi):**

- **`Event Delegation` Yanlış Yorumu:** Kodda `event delegation` (olay devretme) eksiktir. Ancak, `startButton` ve `stopButton` gibi az sayıda statik element için `event delegation` gerekli değildir. `addEventListener` doğrudan elemente eklenebilir. `Event delegation`, dinamik olarak eklenen ve çok sayıda olan elementler için (örneğin bir listedeki öğeler) daha uygun bir tekniktir.

**Hata ve Durum Yönetimi:**

- **`ClearTimeout` Eksikliği:** `counter` değişkeni `clearInterval` ile temizlense bile, uygulama yeniden başlatılmadığı sürece bellekten silinmez. Ayrıca, `setTimeout`'un `clearTimeout` ile temizlenmesi gibi bir mekanizma da eksiktir.
