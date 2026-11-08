/* ==========================================================================
   قوائم الألوان (الـ 7 الفخمة والـ 40 الشاملة)
   ========================================================================== */

// الألوان السبعة الفخمة والوقورة المختارة بعناية
const primarySevenLuxuryColors = [
  "#0F172A", // الكحلي الليلي الهادئ
  "#064E3B", // الأخضر الزيتوني الملكي
  "#0F766E", // الفيروزي العميق الوقور
  "#1E293B", // الرمادي الحجري الداكن
  "#831843", // العنابي الوقور
  "#3B0764", // البنفسجي الميدنايت
  "#78350F"  // الذهبي البرونزي الدافئ
];

// قائمة 40 لوناً شاملة لتلبية جميع الأذواق
const allFortyColors = [
  ...primarySevenLuxuryColors,
  "#006666", "#115E59", "#134E4A", "#047857", "#059669", 
  "#10B981", "#15803D", "#166534", "#1E3A8A", "#1D4ED8", 
  "#2563EB", "#3B82F6", "#0284C7", "#0369A1", "#0E7490", 
  "#0891B2", "#4F46E5", "#4338CA", "#3730A3", "#581C87", 
  "#6B21A8", "#7E22CE", "#9333EA", "#A855F7", "#BE185D", 
  "#9D174D", "#B91C1C", "#C2410C", "#D97706", "#B45309", 
  "#92400E", "#4B5563", "#374151"
];

/* ==========================================================================
   مصفوفة اللغات والاتجاهات
   ========================================================================== */
const languages = [
  { code: "العربية", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "English", name: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "اردو", name: "اردو", flag: "🇵🇰", dir: "rtl" },
  { code: "Français", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "Deutsch", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "Русский", name: "Русский", flag: "🇷🇺", dir: "ltr" },
  { code: "Español", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "हिन्दी", name: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "Indonesia", name: "Indonesia", flag: "🇮🇩", dir: "ltr" }
];

/* ==========================================================================
   بيانات التكبيرات والصلوات (Steps Data)
   ========================================================================== */
const stepsData = [
  { 
    title: { English: "First Takbeer - Surah Al-Fatihah", العربية: "التكبيرة الأولى - سورة الفاتحة", اردو: "پہلی تکبیر - سورۃ الفاتحہ", Français: "Premier Takbir - Sourate Al-Fatiha", Deutsch: "Erster Takbir - Sure Al-Fatiha", Русский: "Первый такбир - Сура Аль-Фатиха", Español: "Primer Takbir - Sura Al-Fatiha", हिन्दी: "पहली तकबीर - सूरह अल-फ़ातिहा", Indonesia: "Takbir Pertama - Surah Al-Fatihah" },
    icon: "📖",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ * الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ * الرَّحْمَنِ الرَّحِيمِ * مَالِكِ يَوْمِ الدِّينِ * إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ * اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ * صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", 
    translit: "Bismillahir-Rahmanir-Raheem, Alhamdu lillahi rabbil 'aalameen, Ar-Rahmanir-Raheem, Maliki yawmid-deen, Iyyaka na'budu wa iyyaka nasta'een, Ihdinas-siratal-mustaqeem, Siratal-latheena an'amta 'alayhim ghayril-maghdoobi 'alayhim wa lad-daalleen", 
    translations: { 
      English: "In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path. The path of those You have blessed, not of those who earned anger, nor of those who went astray.", 
      العربية: "بسم الله الرحمن الرحيم. الحمد لله رب العالمين. الرحمن الرحيم. مالك يوم الدين. إياك نعبد وإياك نستعين. اهدنا الصراط المستقيم. صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين.", 
      Français: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux. Louange à Allah, Seigneur de l'univers. Le Tout Miséricordieux, le Très Miséricordieux. Maître du Jour de la rétribution. C'est Toi seul que nous adorons, et c'est Toi seul dont nous implorons secours. Guide-nous dans le droit chemin. Le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés.", 
      اردو: "اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ تمام تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا رب ہے۔ بڑا مہربان، نہایت رحم والا۔ روزِ جزا کا مالک۔ ہم صرف تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں۔ ہمیں سیدھا راستہ دکھا۔ ان لوگوں کا راستہ جن پر تو نے انعام کیا، نہ ان کا جن پر غضب ہوا اور نہ گمراہوں کا۔", 
      Deutsch: "Im Namen Allahs, des Allerbarmers, des Barmherzigen. Alles Lob gebührt Allah, dem Herrn der Welten. Dem Allerbarmers, dem Barmherzigen. Dem Herrscher am Tag des Gerichts. Dir allein dienen wir, und Dich allein bitten wir um Hilfe. Führe uns den geraden Weg. Den Weg derer, denen Du Gnade erwiesen hast, nicht derer, die Zorn erregt haben, und nicht der Irrenden.", 
      Русский: "Во имя Аллаха, Милостивого, Милосердного. Хвала Аллаху, Господу миров. Милостивому, Милосердному. Властелину Судного дня. Тебе одному мы поклоняемся и Тебя одного молим о помощи. Веди нас прямым путём. Путём тех, кого Ты облагодетельствовал, не тех, на кого пал гнев, и не заблудших.", 
      Español: "En el nombre de Alá, el Más Misericordioso, el Más Compasivo. Toda alabanza pertenece a Alá, Señor de los mundos. El Más Misericordioso, el Más Compasivo. Soberano del Día del Juicio. Solo a Ti te adoramos y solo a Ti te pedimos ayuda. Guíanos por el camino recto. El camino de aquellos a quienes has favorecido, no el de los que han incurrido en Tu ira, ni el de los extraviados.", 
      हिन्दी: "अल्लाह के नाम से, जो बड़ा मेहरबान और निहायत रहम वाला है। सारी तारीफ़ अल्लाह के लिए है, जो सारे जहानों का रब है। बड़ा मेहरबान, निहायत रहम वाला। क़यामत के दिन का मालिक। हम सिर्फ़ तेरी ही इबादत करते हैं और सिर्फ़ तुझसे ही मदद माँगते हैं। हमें सीधा रास्ता दिखा। उन लोगों का रास्ता जिन पर तूने इनाम किया, न उनका जिन पर ग़ज़ब हुआ और न गुमराहों का।", 
      Indonesia: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam. Yang Maha Pengasih lagi Maha Penyayang. Pemilik hari pembalasan. Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami memohon pertolongan. Tunjukilah kami jalan yang lurus. Yaitu jalan orang-orang yang telah Engkau beri nikmat, bukan jalan mereka yang dimurkai, dan bukan pula jalan mereka yang sesat." 
    } 
  },
  { 
    title: { English: "Second Takbeer - The Ibrahimiyyah Prayer", العربية: "التكبيرة الثانية - الصلاة الإبراهيمية", اردو: "دوسری تکبیر - درود ابراہیمی", Français: "Deuxième Takbir - La Prière Ibrahimiyyah", Deutsch: "Zweiter Takbir - Das Ibrahimitische Gebet", Русский: "Второй такбир - Ибрахимова молитва", Español: "Segundo Takbir - La Oración Ibrahimiyyah", हिन्दी: "दूसरी तकबीर - इब्राहीमी दुआ", Indonesia: "Takbir Kedua - Shalawat Ibrahimiyah" },
    icon: "🕌",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ", 
    translit: "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammad, kama sallayta 'ala Ibrahima wa 'ala aali Ibrahim, innaka Hamidun Majeed. Allahumma barik 'ala Muhammadin wa 'ala aali Muhammad, kama barakta 'ala Ibrahima wa 'ala aali Ibrahim, innaka Hamidun Majeed", 
    translations: { 
      English: "O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon Abraham and upon the family of Abraham. Indeed, You are Praiseworthy, Glorious. O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Abraham and upon the family of Abraham. Indeed, You are Praiseworthy, Glorious.", 
      العربية: "اللهم صل على محمد وعلى آل محمد، كما صليت على إبراهيم وعلى آل إبراهيم، إنك حميد مجيد. اللهم بارك على محمد وعلى آل محمد، كما باركت على إبراهيم وعلى آل إبراهيم، إنك حميد مجيد.", 
      Français: "Ô Allah, prie sur Muhammad et sur la famille de Muhammad, comme Tu as prié sur Abraham et sur la famille d'Abraham. Tu es certes Digne de louange et de gloire. Ô Allah, bénis Muhammad et la famille de Muhammad, comme Tu as béni Abraham et la famille d'Abraham. Tu es certes Digne de louange et de gloire.", 
      اردو: "اے اللہ! محمد اور آل محمد پر رحمت نازل فرما، جیسا کہ تو نے ابراہیم اور آل ابراہیم پر رحمت نازل کی۔ بے شک تو قابلِ تعریف اور بزرگ ہے۔ اے اللہ! محمد اور آل محمد پر برکت نازل فرما، جیسا کہ تو نے ابراہیم اور آل ابراہیم پر برکت نازل کی۔ بے شک تو قابلِ تعریف اور بزرگ ہے۔", 
      Deutsch: "O Allah, sende Frieden auf Muhammad und auf die Familie Muhammads, wie Du Frieden auf Abraham und auf die Familie Abrahams gesandt hast. Wahrlich, Du bist der Preiswürdige, der Ruhmreiche. O Allah, segne Muhammad und die Familie Muhammads, wie Du Abraham und die Familie Abrahams gesegnet hast. Wahrlich, Du bist der Preiswürdige, der Ruhmreiche.", 
      Русский: "О Аллах, благослови Мухаммада и семейство Мухаммада, как благословил Ты Ибрахима и семейство Ибрахима. Поистине, Ты Достойный хвалы, Славный. О Аллах, пошли благословения Мухаммаду и семейству Мухаммада, как послал Ты благословения Ибрахиму и семейству Ибрахима. Поистине, Ты Достойный хвалы, Славный.", 
      Español: "Oh Allah, envía paz sobre Muhammad y sobre la familia de Muhammad, como enviaste paz sobre Abraham y sobre la familia de Abraham. Ciertamente, Tú eres Digno de alabanza, Glorioso. Oh Allah, bendice a Muhammad y a la familia de Muhammad, como bendijiste a Abraham y a la familia de Abraham. Ciertamente, Tú eres Digno de alabanza, Glorioso.", 
      हिन्दी: "ऐ अल्लाह, मुहम्मद और मुहम्मद के परिवार पर दया भेज, जैसे तूने इब्राहीम और इब्राहीम के परिवार पर दया भेजी। बेशक तू प्रशंसनीय और महान है। ऐ अल्लाह, मुहम्मद और मुहम्मद के परिवार पर बरकत भेज, जैसे तूने इब्राहीम और इब्राहीम के परिवार पर बरकत भेजी। बेशक तू प्रशंसनीय और महान है।", 
      Indonesia: "Ya Allah, limpahkan rahmat kepada Muhammad dan keluarga Muhammad, sebagaimana Engkau melimpahkan rahmat kepada Ibrahim dan keluarga Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia. Ya Allah, berkahilah Muhammad dan keluarga Muhammad, sebagaimana Engkau memberkahi Ibrahim dan keluarga Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia." 
    } 
  },
  { 
    title: { English: "Third Takbeer - Dua for the Deceased", العربية: "التكبيرة الثالثة - الدعاء للميت", اردو: "تیسری تکبیر - میت کے لیے دعا", Français: "Troisième Takbir - Invocation pour le défunt", Deutsch: "Dritter Takbir - Bittgebet für den Verstorbenen", Русский: "Третий такбир - Мольба за умершего", Español: "Tercer Takbir - Súplica por el difunto", हिन्दी: "तीसरी तकबीर - मृतक के लिए दुआ", Indonesia: "Takbir Ketiga - Doa untuk Mayit" },
    icon: "🤲",
    arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ، وَأَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ، وَأَهْلًا خَيْرًا مِنْ أَهْلِهِ، وَزَوْجًا خَيْرًا مِنْ زَوْجِهِ، وَأَدْخِلْهُ الْجَنَّةَ وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ النَّارِ", 
    translit: "Allahumma-ghfir lahu warhamhu wa 'aafihi wa'fu 'anhu, wa akrim nuzulahu, wa wassi' mudkhalahu, waghsilhu bil-ma'i wath-thalji wal-barad, wa naqqihi minal-khataya kama naqqaytath-thawbal-abyada minad-danas, wa abdilhu daran khayran min darihi, wa ahlan khayran min ahlihi, wa zawjan khayran min zawjihi, wa adkhilhul-jannata wa a'idh-hu min 'adhabil-qabri, wa min 'adhabin-nar", 
    translations: { 
      English: "O Allah, forgive him and have mercy on him, and grant him well-being and pardon him. Honor his abode, and widen his entrance, and wash him with water, snow and hail, and purify him from sins as You purified the white garment from dirt. And exchange his home for a better home, and his family for a better family, and his spouse for a better spouse. Admit him to Paradise and protect him from the punishment of the grave and from the punishment of the Fire.", 
      العربية: "اللهم اغفر له وارحمه وعافه واعف عنه، وأكرم نزله، ووسع مدخله، واغسله بالماء والثلج والبرد، ونقه من الخطايا كما نقيت الثوب الأبيض من الدنس، وأبدله داراً خيراً من داره، وأهلاً خيراً من أهله، وزوجاً خيراً من زوجه، وأدخله الجنة وأعذه من عذاب القبر ومن عذاب النار.", 
      Français: "Ô Allah, pardonne-lui et fais-lui miséricorde, et accorde-lui le bien-être et pardonne-lui. Honore sa demeure, élargis son entrée, et lave-le avec l'eau, la neige et la grêle, et purifie-le des péchés comme Tu as purifié le vêtement blanc de la saleté. Et remplace sa maison par une meilleure maison, et sa famille par une meilleure famille, et son épouse par une meilleure épouse. Fais-le entrer au Paradis et protège-le du châtiment de la tombe et du châtiment du Feu.", 
      اردو: "اے اللہ! اسے بخش دے اور اس پر رحم فرما، اور اسے عافیت دے اور اسے معاف کر دے۔ اس کی مہمانی کا اکرام فرما، اور اس کی داخل ہونے کی جگہ وسیع فرما، اور اسے پانی، برف اور اولوں سے دھو دے، اور اسے گناہوں سے اس طرح پاک کر دے جیسے تو نے سفید کپڑے کو میل سے پاک کیا۔ اور اسے اس کے گھر سے بہتر گھر دے، اور اس کے اہل سے بہتر اہل دے، اور اس کی بیوی سے بہتر بیوی دے۔ اسے جنت میں داخل فرما اور قبر کے عذاب اور آگ کے عذاب سے بچا۔", 
      Deutsch: "O Allah, vergib ihm und erbarme dich seiner, und gewähre ihm Wohlbefinden und verzeih ihm. Ehre seine Unterkunft und erweitere seinen Eingang, und wasche ihn mit Wasser, Schnee und Hagel, und reinige ihn von Sünden, wie Du das weiße Gewand von Schmutz gereinigt hast. Und ersetze sein Haus durch ein besseres Haus, und seine Familie durch eine bessere Familie, und seinen Ehepartner durch einen besseren Ehepartner. Lass ihn ins Paradies eintreten und schütze ihn vor der Strafe des Grabes und vor der Strafe des Feuers.", 
      Русский: "О Аллах, прости его и помилуй его, и даруй ему благополучие и прости его. Окажи ему почести и расширь его вход, и омой его водой, снегом и градом, и очисти его от грехов, как очистил Ты белую одежду от грязи. И замени его дом лучшим домом, и его семью лучшей семьёй, и его супругу лучшей супругой. Введи его в Рай и защити его от наказания могилы и от наказания Огня.", 
      Español: "Oh Allah, perdónalo y ten misericordia de él, y concédele bienestar y perdónalo. Honra su morada, y amplía su entrada, y lávalo con agua, nieve y granizo, y purifícalo de los pecados como purificaste la prenda blanca de la suciedad. Y reemplaza su hogar por un hogar mejor, y su familia por una familia mejor, y su cónyuge por un cónyuge mejor. Hazlo entrar al Paraíso y protégelo del castigo de la tumba y del castigo del Fuego.", 
      हिन्दी: "ऐ अल्लाह, इसे क्षमा कर और इस पर दया कर, और इसे आफ़ियत दे और इसे माफ़ कर दे। इसकी मेज़बानी का सम्मान कर, और इसके दाख़िल होने की जगह को वसीअ कर, और इसे पानी, बर्फ़ और ओलों से धो दे, और इसे गुनाहों से इस तरह पाक कर दे जैसे तूने सफ़ेद कपड़े को गंदगी से पाक किया। और इसे इसके घर से बेहतर घर दे, और इसके परिवार से बेहतर परिवार दे, और इसकी पत्नी से बेहतर पत्नी दे। इसे जन्नत में दाख़िल कर और क़ब्र के अज़ाब और आग के अज़ाब से बचा।", 
      Indonesia: "Ya Allah, ampunilah dia dan rahmatilah dia, dan berikanlah dia kesejahteraan dan maafkanlah dia. Muliakanlah tempat tinggalnya, dan luaskanlah tempat masuknya, dan basuhlah dia dengan air, salju dan hujan es, dan bersihkanlah dia dari dosa-dosa sebagaimana Engkau membersihkan pakaian putih dari kotoran. Dan gantikanlah rumahnya dengan rumah yang lebih baik, dan keluarganya dengan keluarga yang lebih baik, dan pasangannya dengan pasangan yang lebih baik. Masukkanlah dia ke dalam surga dan lindungilah dia dari siksa kubur dan dari siksa neraka." 
    } 
  },
  { 
    title: { English: "Fourth Takbeer - Dua for all Muslims", العربية: "التكبيرة الرابعة - الدعاء لعموم المسلمين", اردو: "چوتھی تکبیر - تمام مسلمانوں کے لیے دعا", Français: "Quatrième Takbir - Invocation pour tous les musulmans", Deutsch: "Vierter Takbir - Bittgebet für alle Muslime", Русский: "Четвёртый такбир - Мольба за всех мусульман", Español: "Cuarto Takbir - Súplica por todos los musulmanes", हिन्दी: "चौथी तकबीर - सभी मुसलमानों के लिए दुआ", Indonesia: "Takbir Keempat - Doa untuk seluruh kaum muslimin" },
    icon: "🌍",
    arabic: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا، اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الْإِسْلَامِ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الْإِيمَانِ، اللَّهُمَّ لَا تَحْرِمْنَا أَجْرَهُ، وَلَا تُضِلَّنَا بَعْدَهُ", 
    translit: "Allahumma-ghfir lihayyina wa mayyitina, wa shahidina wa gha'ibina, wa saghirina wa kabirina, wa dhakarina wa unthana. Allahumma man ahyaytahu minna fa'ahyihi 'alal-Islam, wa man tawaffaytahu minna fatawaffahu 'alal-iman. Allahumma la tahrimna ajrahu, wa la tudillana ba'dahu", 
    translations: { 
      English: "O Allah, forgive our living and our dead, our present and our absent, our young and our old, our males and our females. O Allah, whoever You keep alive from among us, keep him alive upon Islam, and whoever You cause to die from among us, cause him to die upon faith. O Allah, do not deprive us of his reward, and do not let us go astray after him.", 
      العربية: "اللهم اغفر لحينا وميتنا، وشاهدنا وغائبنا، وصغيرنا وكبيرنا، وذكرنا وأنثانا. اللهم من أحييته منا فأحيه على الإسلام، ومن توفيته منا فتوفه على الإيمان. اللهم لا تحرمنا أجره، ولا تضلنا بعده.", 
      Français: "Ô Allah, pardonne nos vivants et nos morts, nos présents et nos absents, nos petits et nos grands, nos mâles et nos femelles. Ô Allah, celui d'entre nous que Tu maintiens en vie, maintiens-le en vie sur l'Islam, et celui d'entre nous que Tu fais mourir, fais-le mourir sur la foi. Ô Allah, ne nous prive pas de sa récompense, et ne nous égare pas après lui.", 
      اردو: "اے اللہ! ہمارے زندوں اور ہمارے مردوں کو، ہمارے حاضر اور ہمارے غائب کو، ہمارے چھوٹے اور ہمارے بڑے کو، ہمارے مردوں اور ہماری عورتوں کو بخش دے۔ اے اللہ! ہم میں سے جسے تو زندہ رکھے اسے اسلام پر زندہ رکھ، اور ہم میں سے جسے تو وفات دے اسے ایمان پر وفات دے۔ اے اللہ! ہمیں اس کے اجر سے محروم نہ کر، اور اس کے بعد ہمیں گمراہ نہ کر۔", 
      Deutsch: "O Allah, vergib unseren Lebenden und unseren Toten, unseren Anwesenden und unseren Abwesenden, unseren Jungen und unseren Alten, unseren Männern und unseren Frauen. O Allah, wen von uns Du am Leben erhältst, den erhalte am Leben auf dem Islam, und wen von uns Du sterben lässt, den lasse sterben auf dem Glauben. O Allah, beraube uns nicht seines Lohnes, und lass uns nach ihm nicht irregehen.", 
      Русский: "О Аллах, прости наших живых и наших мёртвых, наших присутствующих и наших отсутствующих, наших малых и наших старых, наших мужчин и наших женщин. О Аллах, кого из нас Ты оставишь в живых, того оставь в живых на Исламе, а кого из нас Ты упокоишь, того упокой на вере. О Аллах, не лиши нас награды за него и не введи нас в заблуждение после него.", 
      Español: "Oh Allah, perdona a nuestros vivos y a nuestros muertos, a nuestros presentes y a nuestros ausentes, a nuestros pequeños y a nuestros mayores, a nuestros hombres y a nuestras mujeres. Oh Allah, a quien de nosotros mantengas con vida, mantenlo con vida sobre el Islam, y a quien de nosotros hagas morir, hazlo morir sobre la fe. Oh Allah, no nos prives de su recompensa, y no nos desvíes después de él.", 
      हिन्दी: "ऐ अल्लाह, हमारे ज़िंदों और हमारे मुर्दों को, हमारे हाज़िर और हमारे ग़ायब को, हमारे छोटे और हमारे बड़े को, हमारे मर्दों और हमारी औरतों को बख़्श दे। ऐ अल्लाह, हम में से जिसे तू ज़िंदा रखे उसे इस्लाम पर ज़िंदा रख, और हम में से जिसे तू मौत दे उसे ईमान पर मौत दे। ऐ अल्लाह, हमें उसके अज्र से महरूम न कर, और उसके बाद हमें गुमराह न कर।", 
      Indonesia: "Ya Allah, ampunilah orang-orang yang masih hidup di antara kami dan yang telah wafat, yang hadir dan yang tidak hadir, yang kecil dan yang besar, laki-laki dan perempuan kami. Ya Allah, siapa yang Engkau hidupkan di antara kami, maka hidupkanlah dia di atas Islam, dan siapa yang Engkau wafatkan di antara kami, maka wafatkanlah dia di atas iman. Ya Allah, janganlah Engkau halangi kami dari pahalanya, dan janganlah Engkau sesatkan kami setelahnya." 
    } 
  }
];

/* ==========================================================================
   قاموس واجهة المستخدم وترجماته النقية
   ========================================================================== */
const uiMap = {
  adult: { English: "Adult", العربية: "بالغ", اردو: "بالغ", Français: "Adulte", Deutsch: "Erwachsener", Русский: "Взрослый", Español: "Adulto", हिन्दी: "वयस्क", Indonesia: "Dewasa" },
  child: { English: "Child", العربية: "طفل", اردو: "بچہ", Français: "Enfant", Deutsch: "Kind", Русский: "Ребёнок", Español: "Niño", हिन्दी: "बच्चा", Indonesia: "Anak" },
  guide: { English: "Guide", العربية: "الدليل", اردو: "رہنما", Français: "Guide", Deutsch: "Leitfaden", Русский: "Руководство", Español: "Guía", हिन्दी: "मार्गदर्शिका", Indonesia: "Panduan" },
  extras: { English: "Extras", العربية: "الإضافات", اردو: "اضافی", Français: "Extra", Deutsch: "Extras", Русский: "Дополнительно", Español: "Extras", हिन्दी: "अतिरिक्त", Indonesia: "Tambahan" },
  settings: { English: "Settings", العربية: "الإعدادات", اردو: "ترتیبات", Français: "Paramètres", Deutsch: "Einstellungen", Русский: "Настройки", Español: "Ajustes", हिन्दी: "सेटिंग्स", Indonesia: "Pengaturan" },
  language: { English: "Language", العربية: "اللغة", اردو: "زبان", Français: "Langue", Deutsch: "Sprache", Русский: "Язык", Español: "Idioma", हिन्दी: "भाषा", Indonesia: "Bahasa" },
  fontSize: { English: "Font Size", العربية: "حجم الخط", اردو: "فونٹ سائز", Français: "Taille de police", Deutsch: "Schriftgröße", Русский: "Размер шрифта", Español: "Tamaño de fuente", हिन्दी: "फ़ॉन्ट आकार", Indonesia: "Ukuran Font" },
  themeModeTitle: { English: "Theme Mode", العربية: "وضع المظهر", اردو: "تھيم موڈ", Français: "Mode de thème", Deutsch: "Design-Modus", Русский: "Режим темы", Español: "Modo de tema", हिन्दी: "थीम मोड", Indonesia: "Mode Tema" },
  small: { English: "Small", العربية: "صغير", اردو: "چھوٹا", Français: "Petit", Deutsch: "Klein", Русский: "Маленький", Español: "Pequeño", हिन्दी: "छोटा", Indonesia: "Kecil" },
  medium: { English: "Medium", العربية: "متوسط", اردو: "درمیانہ", Français: "Moyen", Deutsch: "Mittel", Русский: "Средний", Español: "Mediano", हिन्दी: "मध्यम", Indonesia: "Sedang" },
  large: { English: "Large", العربية: "كبير", اردو: "بڑا", Français: "Grand", Deutsch: "Groß", Русский: "Большой", Español: "Grande", हिन्दी: "बड़ा", Indonesia: "Besar" },
  huge: { English: "Huge", العربية: "ضخم", اردو: "بہت بڑا", Français: "Très grand", Deutsch: "Sehr groß", Русский: "Очень большой", Español: "Muy grande", हिन्दी: "विशाल", Indonesia: "Sangat Besar" },
  lightTheme: { English: "Light", العربية: "فاتح", اردو: "روشن", Français: "Clair", Deutsch: "Hell", Русский: "Светлый", Español: "Claro", हिन्दी: "हल्का", Indonesia: "Terang" },
  darkTheme: { English: "Dark", العربية: "داكن", اردو: "تاریک", Français: "Sombre", Deutsch: "Dunkel", Русский: "Тёмный", Español: "Oscuro", हिन्दी: "गहरा", Indonesia: "Gelap" },
  autoTheme: { English: "Auto", العربية: "تلقائي", اردو: "خودکار", Français: "Automatique", Deutsch: "Automatisch", Русский: "Автоматически", Español: "Automático", हिन्दी: "स्वचालित", Indonesia: "Otomatis" },
  accentLabel: { English: "Accent Color", العربية: "اللون المميز", اردو: "نمایاں رنگ", Français: "Couleur d'accent", Deutsch: "Akzentfarbe", Русский: "Цвет темы", Español: "Color distintivo", हिन्दी: "थीम रंग", Indonesia: "Warna Tema" },
  additionalColors: { English: "Additional Colors (40 Colors)", العربية: "ألوان إضافية (40 لون)", اردو: "مزید رنگ (40 رنگ)", Français: "Couleurs supplémentaires (40 couleurs)", Deutsch: "Zusätzliche Farben (40 Farben)", Русский: "Дополнительные цвета (40 цветов)", Español: "Colores adicionales (40 colores)", हिन्दी: "अतिरिक्त रंग (40 रंग)", Indonesia: "Warna Tambahan (40 Warna)" },
  continueBtn: { English: "Continue →", العربية: "متابعة ←", اردو: "جاری رکھیں ←", Français: "Continuer →", Deutsch: "Weiter →", Русский: "Продолжить →", Español: "Continuar →", हिन्दी: "जारी रखें →", Indonesia: "Lanjutkan →" },
  dontAskAgain: { English: "Don't ask me again", العربية: "عدم السؤال مرة أخرى", اردو: "مجھ سے دوبارہ مت پوچھیں", Français: "Ne plus me demander", Deutsch: "Nicht mehr fragen", Русский: "Больше не спрашивать", Español: "No volver a preguntar", हिन्दी: "मुझसे दोबारा न पूछें", Indonesia: "Jangan tanya saya lagi" },
  startApp: { English: "Start App", العربية: "ابدأ التطبيق", اردو: "ایپ شروع کریں", Français: "Démarrer", Deutsch: "App starten", Русский: "Начать работу", Español: "Iniciar aplicación", हिन्दी: "ऐप शुरू करें", Indonesia: "Mulai Aplikasi" },
  close: { English: "Close", العربية: "إغلاق", اردو: "بند کریں", Français: "Fermer", Deutsch: "Schließen", Русский: "Закрыть", Español: "Cerrar", हिन्दी: "बंद करें", Indonesia: "Tutup" },
  shareLabel: { English: "Share App QR Code", العربية: "مشاركة رمز QR", اردو: "QR کوڈ شیئر کریں", Français: "Partager le QR code", Deutsch: "QR-Code teilen", Русский: "Поделиться QR-кодом", Español: "Compartir código QR", हिन्दी: "QR कोड साझा करें", Indonesia: "Bagikan Kode QR" },
  shareReward: { English: "Share the Reward", العربية: "شارك الأجر", اردو: "ثواب شیئر کریں", Français: "Partager la récompense", Deutsch: "Belohnung teilen", Русский: "Поделиться наградой", Español: "Compartir recompensa", हिन्दी: "सवाब साझा करें", Indonesia: "Bagikan Kebaikan" },
  qrSubText: { English: "Scan code to share Janazah Guide and gain reward", العربية: "امسح الرمز لنشر تطبيق دليل الجنازة ونيل الأجر", اردو: "ایپ شیئر کرنے اور ثواب حاصل کرنے کے لیے اسکین کریں", Français: "Scannez pour partager l'application et obtenir la récompense", Deutsch: "Scannen, um die App zu teilen und Belohnung zu erhalten", Русский: "Отсканируйте код, чтобы поделиться и получить награду", Español: "Escanea el código para compartir la app y ganar recompensa", हिन्दी: "ऐप साझा करने और सवाब पाने के लिए स्कैन करें", Indonesia: "Pindai kode untuk membagikan aplikasi dan meraih pahala" },
  selectLangTitle: { English: "Select Language", العربية: "اختر اللغة", اردو: "زبان منتخب کریں", Français: "Choisir la langue", Deutsch: "Sprache wählen", Русский: "Выберите язык", Español: "Seleccionar idioma", हिन्दी: "भाषा चुनें", Indonesia: "Pilih Bahasa" },
  chooseThemeTitle: { English: "Choose Theme Color", العربية: "اختر اللون المميز", اردو: "نمایاں رنگ منتخب کریں", Français: "Choisir la couleur", Deutsch: "Akzentfarbe wählen", Русский: "Выберите цвет", Español: "Elegir color distintivo", हिन्दी: "थीम रंग चुनें", Indonesia: "Pilih Warna Tema" },
  chooseThemeSub: { English: "Select your preferred interface color", العربية: "اختر اللون المفضل لواجهة التطبيق", اردو: "ایپ انٹرفیس کے لیے پسندیدہ رنگ منتخب کریں", Français: "Choisissez votre couleur préférée", Deutsch: "Wählen Sie Ihre bevorzugte Farbe", Русский: "Выберите желаемый цвет интерфейса", Español: "Selecciona el color preferido", हिन्दी: "पसंदीदा इंटरफ़ेस रंग चुनें", Indonesia: "Pilih warna antarmuka favorit Anda" },
  navControlsTitle: { English: "Navigation Methods", العربية: "طرق التقليب والتنقل", اردو: "نیویگیشن کے طریقے", Français: "Modes de défilement", Deutsch: "Navigationsmethoden", Русский: "Способы перелистывания", Español: "Métodos de navegación", हिन्दी: "नेविगेशन के तरीके", Indonesia: "Metode Navigasi" },
  swipeNav: { English: "Swipe Gestures", العربية: "التقليب بسحب الشاشة", اردو: "اسکرین سوائپ", Français: "Balayage tactile", Deutsch: "Wischgesten", Русский: "Жесты смахивания", Español: "Deslizamiento táctil", हिन्दी: "स्क्रीन स्वाइप", Indonesia: "Usap Layar" },
  shakeNav: { English: "Shake Motion", العربية: "التقليب باهتزاز الجهاز", اردو: "فون ہلانے پر", Français: "Secousse de l'appareil", Deutsch: "Geräteschütteln", Русский: "Встряхивание устройства", Español: "Agitar el dispositivo", हिन्दी: "डिवाइस हिलाकर", Indonesia: "Guncang Perangkat" },
  voiceNav: { English: "Voice Recognition", العربية: "التقليب بالصوت", اردو: "آوازی نیویگیشن", Français: "Reconnaissance vocale", Deutsch: "Spracherkennung", Русский: "Голосовое управление", Español: "Reconocimiento de voz", हिन्दी: "आवाज़ द्वारा", Indonesia: "Perintah Suara" },
  buttonsNav: { English: "On-Screen Buttons", العربية: "التقليب بأزرار الشاشة", اردو: "اسکرین بٹن", Français: "Boutons à l'écran", Deutsch: "Bildschirmtasten", Русский: "Кнопки на экране", Español: "Botones en pantalla", हिन्दी: "स्क्रीन बटन", Indonesia: "Tombol Layar" },
  customizeButtons: { English: "Live Buttons Customizer", العربية: "المعاينة والتخصيص الحي للأزرار", اردو: "بٹنوں کی لائیو ترتیب", Français: "Personnalisation en direct des boutons", Deutsch: "Live-Tastenanpassung", Русский: "Живая настройка кнопок", Español: "Personalización en vivo de botones", हिन्दी: "लाइव बटन कस्टमाइज़र", Indonesia: "Kustomisasi Tombol Langsung" },
  voiceAutoEnd: { English: "Auto-End Prayer upon Tasleem", العربية: "الإنهاء التلقائي عند التسليم", اردو: "سلام پر خودکار اختتام", Français: "Fin automatique au salut final", Deutsch: "Automatisches Beenden beim Friedensgruß", Русский: "Автозавершение при таслиме", Español: "Finalizar automáticamente al dar el salam", हिन्दी: "सलाम पर स्वतः समाप्ति", Indonesia: "Selesai Otomatis Saat Salam" },
  startPrayerBtn: { English: "Start Funeral Prayer", العربية: "ابدأ صلاة الجنازة", اردو: "نمازِ جنازہ شروع کریں", Français: "Démarrer la prière funéraire", Deutsch: "Totengebet beginnen", Русский: "Начать заупокойную молитву", Español: "Iniciar oración fúnebre", हिन्दी: "नमाज़-ए-जनाज़ा शुरू करें", Indonesia: "Mulai Shalat Jenazah" },
  startScreenDesc: { English: "Interactive step-by-step 4-Takbeer guide. Microphone and motion sensors activate only while prayer is in progress.", العربية: "دليل تفاعلي متزامن خطوة بخطوة مع أربع تكبيرات، يدعم التبديل اللمسي والصوتي والحركي.", اردو: "چار تکبیروں کا مکمل اور مرحلہ وار رہنما۔ سینسرز صرف نماز کے دوران کام کریں گے۔", Français: "Guide interactif étape par étape avec 4 takbirs. Les capteurs ne s'activent que pendant la prière.", Deutsch: "Interaktiver Leitfaden mit 4 Takbiren. Sensoren sind nur während des Gebets aktiv.", Русский: "Пошаговое интерактивное руководство из 4 такбиров. Датчики включаются только во время молитвы.", Español: "Guía interactiva paso a paso de 4 takbirat. Los sensores se activan únicamente durante la sesión.", हिन्दी: "4 तकबीरों का चरणबद्ध गाइड। प्रार्थना सत्र शुरू होने पर ही सेंसर काम करेंगे।", Indonesia: "Panduan interaktif 4 takbir langkah demi langkah. Sensor hanya aktif saat shalat dimulai." },
  exitPrayer: { English: "End Prayer", العربية: "إنهاء الصلاة", اردو: "نماز ختم کریں", Français: "Terminer la prière", Deutsch: "Gebet beenden", Русский: "Завершить молитву", Español: "Finalizar oración", हिन्दी: "नमाज़ समाप्त करें", Indonesia: "Akhiri Shalat" },
  prayerCompleted: { English: "May Allah accept - Prayer completed", العربية: "تقبل الله - تم إنهاء الصلاة", اردو: "اللہ قبول فرمائے - نماز مکمل ہوئی", Français: "Qu'Allah accepte - Prière terminée", Deutsch: "Möge Allah annehmen - Gebet beendet", Русский: "Да примет Аллах - Молитва завершена", Español: "Que Alá acepte - Oración finalizada", हिन्दी: "अल्लाह क़बूल फरमाए - नमाज़ पूरी हुई", Indonesia: "Semoga Allah menerima - Shalat selesai" },
  nextTakbeer: { English: "Next Takbeer ❯", العربية: "التكبيرة التالية ❯", اردو: "اگلی تکبیر ❯", Français: "Takbir suivant ❯", Deutsch: "Nächster Takbir ❯", Русский: "Следующий такбир ❯", Español: "Siguiente Takbir ❯", हिन्दी: "अगली तकबीर ❯", Indonesia: "Takbir Selanjutnya ❯" },
  prevTakbeer: { English: "❮ Previous", العربية: "❮ السابقة", اردو: "❮ پچھلی", Français: "❮ Précédent", Deutsch: "❮ Vorherige", Русский: "❮ Предыдущий", Español: "❮ Anterior", हिन्दी: "❮ पिछली", Indonesia: "❮ Sebelumnya" },
  adhkarAndDuas: { English: "Adhkar & Supplications", العربية: "الأذكار والأدعية", اردو: "اذکار اور دعائیں", Français: "Invocations et rappels", Deutsch: "Bittgebete & Adhkar", Русский: "Азкары и дуа", Español: "Adhkar y súplicas", हिन्दी: "अज़कार और दुआएं", Indonesia: "Dzikir & Doa" },
  backBtn: { English: "❮ Back", العربية: "❮ عودة", اردو: "❮ واپسی", Français: "❮ Retour", Deutsch: "❮ Zurück", Русский: "❮ Назад", Español: "❮ Volver", हिन्दी: "❮ वापस", Indonesia: "❮ Kembali" },
  understood: { English: "Understood", العربية: "فهمت ذلك", اردو: "سمجھ گیا", Français: "Compris", Deutsch: "Verstanden", Русский: "Понятно", Español: "Entendido", हिन्दी: "समझ गया", Indonesia: "Dimengerti" }
};