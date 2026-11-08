/* ==========================================================================
   بيانات الأذكار والأدعية (Duas & Adhkar Data Architecture)
   تم فصل هذا الملف لتسهيل التوسع المستقبلي وتسريع تحميل التطبيق
   ========================================================================== */

const duasData = [
  {
    id: "deceased_duas",
    title: { English: "Duas for the Deceased", العربية: "أدعية المتوفى المأثورة", اردو: "میت کے لیے ماثور دعائیں", Français: "Invocations pour le défunt", Deutsch: "Bittgebete für den Verstorbenen", Русский: "Мольбы за умершего", Español: "Súplicas por el difunto", हिन्दी: "मृतक के लिए दुआएं", Indonesia: "Doa-doa untuk Jenazah" },
    desc: { English: "Authentic supplications upon death and burial", العربية: "أدعية مأثورة صحيحة عند الموت والدفن والتعزية", اردو: "موت، تدفین اور تعزیت کے وقت کی دعائیں", Français: "Invocations authentiques lors du décès et de l'enterrement", Deutsch: "Authentische Bittgebete bei Tod und Beerdigung", Русский: "Достоверные мольбы при смерти и погребении", Español: "Súplicas auténticas ante la muerte y el entierro", हिन्दी: "मृत्यु और दफ़न के समय की प्रामाणिक दुआएं", Indonesia: "Doa-doa shahih saat kematian dan pemakaman" },
    icon: "🤲",
    items: [
      {
        title: { English: "Upon Closing the Eyes of the Deceased", العربية: "الدعاء عند إغماض عين الميت", اردو: "میت کی آنکھیں بند کرتے وقت کی دعا", Français: "En fermant les yeux du défunt", Deutsch: "Beim Schließen der Augen des Verstorbenen", Русский: "При закрывании глаз умершего", Español: "Al cerrar los ojos del difunto", हिन्दी: "मृतक की आँखें बंद करते समय", Indonesia: "Saat memejamkan mata mayit" },
        arabic: "اللَّهُمَّ اغْفِرْ لِفُلاَنٍ، وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ، وَاخْلُفْهُ فِي عَقِبِهِ فِي الْغَابِرِينَ، وَاغْفِرْ لَنَا وَلَهُ يَا رَبَّ الْعَالَمِينَ، وَافْسَحْ لَهُ فِي قَبْرِهِ وَنَوِّرْ لَهُ فِيهِ",
        meaning: { English: "O Allah, forgive him, raise his degree among those who are rightly guided, grant him a successor in his posterity, and forgive us and him, O Lord of the worlds; make his grave spacious and illuminate it for him.", العربية: "رواه مسلم. دعاء جامع بالرحمة والرفعة والنور في القبر وحفظ الأهل من بعده." }
      },
      {
        title: { English: "When Placing the Body in the Grave", العربية: "الدعاء عند وضع الميت في القبر", اردو: "میت کو قبر میں رکھتے وقت کی دعا", Français: "En déposant le défunt dans la tombe", Deutsch: "Beim Hinablassen in das Grab", Русский: "При помещении умершего в могилу", Español: "Al colocar el cuerpo en la tumba", हिन्दी: "शव को क़ब्र में रखते समय", Indonesia: "Saat meletakkan mayit ke liang lahad" },
        arabic: "بِسْمِ اللَّهِ، وَعَلَى مِلَّةِ رَسُولِ اللَّهِ (أَوْ: وَعَلَى سُنَّةِ رَسُولِ اللَّهِ)",
        meaning: { English: "In the name of Allah and upon the creed (sunnah) of the Messenger of Allah (peace be upon him).", العربية: "سنة نبوية مأثورة عند إنزال الجنازة في القبر." }
      },
      {
        title: { English: "After the Burial (Asking for Steadfastness)", العربية: "الدعاء بعد الفراغ من دفن الميت", اردو: "تدفین کے بعد ثبات کی دعا", Français: "Après l'enterrement (Demande de raffermissement)", Deutsch: "Nach der Beisetzung (Für Standhaftigkeit)", Русский: "После погребения (Мольба о стойкости)", Español: "Tras el entierro (Pedir firmeza)", हिन्दी: "दफ़न के बाद साबित क़दमी की दुआ", Indonesia: "Setelah pemakaman (Memohon keteguhan)" },
        arabic: "اللَّهُمَّ اغْفِرْ لَهُ، اللَّهُمَّ ثَبِّتْهُ، فَإِنَّهُ الآنَ يُسْأَلُ",
        meaning: { English: "O Allah, forgive him. O Allah, strengthen him, for he is now being questioned.", العربية: "كان النبي ﷺ إذا فرغ من دفن الميت وقف عليه فقال: استغفروا لأخيكم وسلوا له التثبيت فإنه الآن يسأل." }
      },
      {
        title: { English: "Condolence Supplication (Ta'ziyah)", العربية: "دعاء التعزية لأهل الميت", اردو: "تعزیت کے کلمات", Français: "Formule de condoléances", Deutsch: "Beileidsbekundung (Ta'ziyah)", Русский: "Слова соболезнования (Та'зия)", Español: "Súplica de condolencias (Ta'ziyah)", हिन्दी: "शोक सांत्वना की दुआ", Indonesia: "Ucapan Takziyah" },
        arabic: "إِنَّ لِلَّهِ مَا أَخَذَ، وَلَهُ مَا أَعْطَى، وَكُلٌّ عِنْدَهُ بِأَجَلٍ مُسَمًّى، فَلْتَصْبِرْ وَلْتَحْتَسِبْ",
        meaning: { English: "Verily to Allah belongs what He took and to Him belongs what He gave, and everything has an appointed time with Him; so be patient and hope for reward.", العربية: "متفق عليه، وهي أصح وأعظم صيغة للتعزية." }
      }
    ]
  },
  {
    id: "funeral_sunnahs",
    title: { English: "Sunnahs & Etiquettes of Janazah", العربية: "سنن وآداب الجنائز", اردو: "جنائز کی سنتیں اور آداب", Français: "Sunnahs et convenances mortuaires", Deutsch: "Sunnahs & Benimmregeln bei Beerdigungen", Русский: "Сунны и адабы джаназа", Español: "Sunnahs y modales funerarios", हिन्दी: "जनाज़े की सुन्नतें और शिष्टाचार", Indonesia: "Sunnah & Adab Jenazah" },
    desc: { English: "Important instructions, etiquettes and rewarded actions", العربية: "توجيهات نبوية في فضل اتباع الجنائز والصبر والآداب الشرعية", اردو: "جنازے کی پیروی اور صبر کے آداب", Français: "Directives prophétiques et récompenses des funérailles", Deutsch: "Prophetische Ratschläge und Verhaltensweisen", Русский: "Пророческие наставления о посещении похорон", Español: "Guía de conducta y méritos en el cortejo fúnebre", हिन्दी: "जनाज़े में शामिल होने के आदाब और फ़ज़ीलत", Indonesia: "Panduan dan adab mengiringi jenazah" },
    icon: "📜",
    items: [
      {
        title: { English: "Virtue of Following the Funeral (Qirat)", العربية: "فضل اتباع الجنازة وثواب القيراط", اردو: "جنازے کے ساتھ چلنے کی فضیلت", Français: "Le mérite de suivre le cortège (Le Qirat)", Deutsch: "Der Lohn der Beerdigungsbegleitung (Qirat)", Русский: "Награда за участие в похоронах (Кират)", Español: "Recompensa de acompañar el cortejo", हिन्दी: "क़ीरात का सवाब", Indonesia: "Pahala Mengiringi Jenazah (Qirath)" },
        arabic: "مَنْ شَهِدَ الجَنَازَةَ حَتَّى يُصَلَّى عَلَيْهَا فَلَهُ قِيرَاطٌ، وَمَنْ شَهِدَهَا حَتَّى تُدْفَنَ فَلَهُ قِيرَاطَانِ. قِيلَ: وَمَا القِيرَاطَانِ؟ قَالَ: «مِثْلُ الجَبَلَيْنِ العَظِيمَيْنِ»",
        meaning: { English: "Whoever attends the funeral until prayer is offered gets a Qirat, and whoever attends until burial gets two Qirats, each like a huge mountain (Agreed Upon).", العربية: "حديث صحيح متفق عليه يبين عظم أجر وثواب الصلاة على الجنازة وحضور دفنها." }
      },
      {
        title: { English: "Speeding up the Funeral Procession", العربية: "استحباب الإسراع بالجنازة", اردو: "جنازے کو جلدی لے جانا", Français: "La hâte dans le cortège funèbre", Deutsch: "Die Beisetzung zügig vorantreiben", Русский: "Поспешность в погребении", Español: "Acelerar el paso en el cortejo", हिन्दी: "जनाज़ा जल्दी ले जाने की ताकीद", Indonesia: "Menyegerakan Pengurusan Jenazah" },
        arabic: "أَسْرِعُوا بِالْجَنَازَةِ؛ فَإِنْ تَكُ صَالِحَةً فَخَيْرٌ تُقَدِّمُونَهَا إِلَيْهِ، وَإِنْ تَكُ سِوَى ذَلِكَ فَشَرٌّ تَضَعُونَهُ عَنْ رِقَابِكُمْ",
        meaning: { English: "Make haste with the funeral; for if it is righteous, you are forwarding it to good; and if it is otherwise, you are taking off an evil from your necks.", العربية: "متفق عليه، وهو أدب نبوي كريم لراحة الميت والإسراع بإكرامه." }
      },
      {
        title: { English: "Greeting at the Cemetery (Visiting Graves)", العربية: "السلام عند زيارة القبور", اردو: "قبرستان میں داخلے کا سلام", Français: "Salutation lors de la visite du cimetière", Deutsch: "Gruß beim Friedhofsbesuch", Русский: "Приветствие при посещении могил", Español: "Saludo al visitar el cementerio", हिन्दी: "क़ब्रिस्तान में दाख़िल होने का सलाम", Indonesia: "Doa Masuk / Menziarahi Makam" },
        arabic: "السَّلَامُ عَلَيْكُمْ دَارَ قَوْمٍ مُؤْمِنِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ، نَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ",
        meaning: { English: "Peace be upon you, O inhabitants of this abode of believers. Indeed, we shall, if Allah wills, join you. We ask Allah for well-being for us and for you.", العربية: "سنة المصطفى ﷺ عند المرور بالقبور أو زيارتها للعظة والاعتبار والدعاء لهم." }
      }
    ]
  },
  {
    id: "general_remembrance",
    title: { English: "General Remembrances (Adhkar)", العربية: "أذكار عامة ومأثورة", اردو: "عام اذکار اور دعائیں", Français: "Invocations et rappels généraux", Deutsch: "Allgemeine Bittgebete & Gedenken", Русский: "Общие поминания и мольбы", Español: "Súplicas y recuerdos generales", हिन्दी: "सामान्य अज़कार और दुआएं", Indonesia: "Dzikir & Doa Umum" },
    desc: { English: "Sayings of patience, praise, and seeking forgiveness", العربية: "أذكار الاسترجاع والصبر والاستغفار المأمور بها في الشدائد", اردو: "استرجاع، صبر اور استغفار کے اذکار", Français: "Invocations de patience et de repentir", Deutsch: "Worte der Geduld und des Bittens um Vergebung", Русский: "Слова терпения, покаяния и мольбы", Español: "Palabras de paciencia y perdón", हिन्दी: "सब्र और इस्तिग़फ़ार के अज़कार", Indonesia: "Dzikir istirja' dan memohon ampunan" },
    icon: "✨",
    items: [
      {
        title: { English: "Supplication in Calamity (Istirja')", العربية: "دعاء المصيبة والاسترجاع", اردو: "مصیبت کے وقت کی دعا", Français: "Invocation face à l'affliction", Deutsch: "Bittgebet bei Unglück", Русский: "Мольба при несчастье", Español: "Súplica ante la calamidad", हिन्दी: "मुसीबत के समय की दुआ", Indonesia: "Doa Tertimpa Musibah" },
        arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي، وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
        meaning: { English: "Truly, to Allah we belong and truly, to Him we shall return. O Allah, reward me in my affliction and replace it with something better.", العربية: "رواه مسلم. ما من مسلم تصيبه مصيبة فيقولها إلا آجره الله في مصيبته وأخلف له خيراً منها." }
      },
      {
        title: { English: "Master of Seeking Forgiveness (Sayyid al-Istighfar)", العربية: "سيد الاستغفار", اردو: "سید الاستغفار", Français: "La maîtresse demande de pardon", Deutsch: "Das vollkommenste Bittgebet um Vergebung", Русский: "Господин покаяния (Саййид аль-Истигфар)", Español: "El líder del perdón", हिन्दी: "सैय्यदुल इस्तिग़फ़ार", Indonesia: "Sayyidul Istighfar" },
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        meaning: { English: "O Allah, You are my Lord, none has the right to be worshipped but You. You created me and I am Your servant... (Whoever says it in evening/morning with conviction enters Paradise - Al-Bukhari).", العربية: "أصح وأبلغ صيغ الاستغفار وأعظمها ثواباً." }
      }
    ]
  }
];