/* ==========================================================================
   إدارة الحالة والتخزين المحلي (State Management & LocalStorage)
   ========================================================================== */
function t(key, alt) { 
  return (uiMap[key]?.[currentLang] || alt || key); 
}

let currentLang = localStorage.getItem("userLang") || "العربية";
let currentStep = 0;
let userAccent = localStorage.getItem("userAccent") || "#0F172A";
let currentThemeMode = localStorage.getItem("themeMode") || "dark";
let currentFont = localStorage.getItem("userFontSize") || "medium";

// إعدادات التنقل
let navConfig = {
  swipe: localStorage.getItem("nav_swipe") !== "false",
  shake: localStorage.getItem("nav_shake") === "true",
  voice: localStorage.getItem("nav_voice") === "true",
  buttons: localStorage.getItem("nav_buttons") === "true",
  autoEndTasleem: localStorage.getItem("nav_autoEndTasleem") !== "false",
  buttonLayout: localStorage.getItem("nav_btnLayout") || "single", // single | dual
  buttonSize: localStorage.getItem("nav_btnSize") || "medium",     // small | medium | large
  buttonPos: localStorage.getItem("nav_btnPos") || "floating-right", // bottom | center | floating-right
  isPerStepPosActive: localStorage.getItem("nav_isPerStepPosActive") === "true",
  customPositions: JSON.parse(localStorage.getItem("nav_customPositions")) || {
    0: { x: 75, y: 75, scale: 1.0, opacity: 0.9 },
    1: { x: 75, y: 75, scale: 1.0, opacity: 0.9 },
    2: { x: 75, y: 75, scale: 1.0, opacity: 0.9 },
    3: { x: 75, y: 75, scale: 1.0, opacity: 0.9 }
  },
  globalPosition: JSON.parse(localStorage.getItem("nav_globalPosition")) || { x: 75, y: 75, scale: 1.0, opacity: 0.9 },
  isFreePosActive: localStorage.getItem("nav_isFreeActive") === "true"
};

// حالة وضع التخصيص الحي
let isLiveCustomizing = false;
let activeDragElement = null;

// حالة جلسة الصلاة والمستشعرات
let isPrayerActive = false;
let speechRecognizer = null;
let lastShakeTime = 0;
let shakeSensorBound = false;
let shakeMotionThreshold = parseInt(localStorage.getItem("nav_shakeThreshold")) || 12; // عتبة اهتزاز مريحة

// حالة التقليب بسحب الشاشة
let swipeStartX = null;
let swipeStartY = null;
let extraSwipeCount = 0; // لإنهاء الصلاة عند السحبة الخامسة

// حالة التعرف الصوتي (Debounce)
let lastVoiceCommandTime = 0;
const VOICE_DEBOUNCE_DELAY = 1500; // 1.5 ثانية لمنع تخطي التكبيرات

// مستويات قسم الإضافات والسبحة المتطورة
let extrasLevel = 1;
let selectedCategory = null;
let tasbeehCount = parseInt(localStorage.getItem("tasbeeh_count")) || 0;
let tasbeehTarget = parseInt(localStorage.getItem("tasbeeh_target")) || 33;
let tasbeehHaptic = localStorage.getItem("tasbeeh_haptic") !== "false";
let tasbeehRingSize = parseInt(localStorage.getItem("tasbeeh_ring_size")) || 160;

/* ==========================================================================
   تطبيق المظهر وحجم الخط والألوان واتجاه الواجهة
   ========================================================================== */
function applyTheme() {
  let isDark = false;
  if (currentThemeMode === "auto") {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  } else if (currentThemeMode === "dark") {
    isDark = true;
  } else {
    isDark = false;
  }
  
  if (isDark) { 
    document.body.classList.add("dark"); 
    document.body.classList.remove("light"); 
  } else { 
    document.body.classList.add("light"); 
    document.body.classList.remove("dark"); 
  }
  
  document.querySelectorAll('.theme-btn').forEach(btn => {
    if (btn.dataset.theme === currentThemeMode) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

function setThemeMode(mode, save = true) {
  currentThemeMode = mode;
  applyTheme();
  if (save) localStorage.setItem("themeMode", mode);
}

function applyFontScale() {
  document.documentElement.setAttribute('data-font', currentFont);
  document.querySelectorAll('.font-btn').forEach(btn => {
    if (btn.dataset.font === currentFont) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

function setAccentColor(hex, save = true) {
  userAccent = hex;
  document.documentElement.style.setProperty('--accent', hex);
  const [r, g, b] = [parseInt(hex.slice(1,3), 16), parseInt(hex.slice(3,5), 16), parseInt(hex.slice(5,7), 16)];
  document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
  if (save) localStorage.setItem("userAccent", hex);
  updateUI();
}

function updateDirection() {
  const langObj = languages.find(l => l.code === currentLang);
  const dir = langObj ? langObj.dir : "rtl";
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', currentLang === "العربية" ? "ar" : "en");
}

/* ==========================================================================
   بناء بطاقات التكبيرات وشريط التقدم
   ========================================================================== */
function buildSlides() {
  const track = document.getElementById('swipeTrack');
  if (!track) return;
  track.innerHTML = '';
  
  stepsData.forEach((step, idx) => {
    const slide = document.createElement('div'); 
    slide.className = 'swipe-slide';
    const translation = step.translations[currentLang] || step.translations["English"];
    const title = step.title[currentLang] || step.title["العربية"];
    
    slide.innerHTML = `
      <div class="dua-card">
        <div class="dua-header">
          <div class="dua-header-icon">${step.icon}</div>
          <div style="flex:1; min-width:0;">
            <div class="dua-header-title">${title}</div>
            <div class="dua-header-subtitle">(${idx + 1} / 4)</div>
          </div>
        </div>
        <div class="dua-body">
          <div class="arabic-text" dir="rtl">${step.arabic}</div>
          ${currentLang !== "العربية" ? `<div class="transliteration">${step.translit}</div><div class="translation">${translation}</div>` : ''}
        </div>
      </div>
    `;
    track.appendChild(slide);
  });
  updateTrackPosition();
}

function updateTrackPosition() {
  const track = document.getElementById('swipeTrack');
  if (track) {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const multiplier = isRtl ? 1 : -1;
    track.style.transform = `translate3d(${multiplier * currentStep * 100}%, 0, 0)`;
  }
}

function updateProgressBar() {
  const container = document.getElementById('progressContainer');
  if (!container) return;
  container.innerHTML = '';
  stepsData.forEach((_, idx) => {
    const seg = document.createElement('div'); 
    seg.className = 'prog-segment';
    const fill = document.createElement('div'); 
    fill.className = 'prog-fill';
    if (idx <= currentStep) fill.style.width = '100%';
    seg.appendChild(fill);
    container.appendChild(seg);
  });
}

function goToStep(newStep) {
  if (newStep < 0 || newStep >= stepsData.length) return;
  currentStep = newStep;
  extraSwipeCount = 0; // تصفير عداد السحبات الزائدة عند تغيير التكبيرة
  updateTrackPosition();
  updateProgressBar();
  renderOnScreenControls();
}

/* ==========================================================================
   نظام التخصيص الحي لأزرار الشاشة (Live In-Session Customizer)
   ========================================================================== */
function openLiveCustomizer() {
  if (!isPrayerActive) {
    startPrayerSession(); // بدء الصلاة فوراً في وضع المعاينة
  }
  isLiveCustomizing = true;
  document.getElementById('liveCustomizerToolbar').style.display = 'block';
  document.getElementById('chkPerStepPos').checked = navConfig.isPerStepPosActive;
  
  // تفعيل وضع التخصيص الحر افتراضياً إذا لم يكن مفعلاً
  if (!navConfig.isFreePosActive) {
    navConfig.isFreePosActive = true;
  }
  
  updateLiveCustomizerSliders();
  renderOnScreenControls();
}

function saveAndExitLiveCustomizer() {
  isLiveCustomizing = false;
  document.getElementById('liveCustomizerToolbar').style.display = 'none';
  
  localStorage.setItem("nav_customPositions", JSON.stringify(navConfig.customPositions));
  localStorage.setItem("nav_globalPosition", JSON.stringify(navConfig.globalPosition));
  localStorage.setItem("nav_isFreeActive", navConfig.isFreePosActive);
  localStorage.setItem("nav_isPerStepPosActive", navConfig.isPerStepPosActive);
  
  // الخروج من الصلاة والعودة للوحة الإعدادات
  exitPrayerSession(false);
  switchTab('settings');
}

function resetLiveButtonCustomizer() {
  const defaultPos = { x: 75, y: 75, scale: 1.0, opacity: 0.9 };
  navConfig.globalPosition = { ...defaultPos };
  navConfig.customPositions = {
    0: { ...defaultPos }, 1: { ...defaultPos }, 2: { ...defaultPos }, 3: { ...defaultPos }
  };
  navConfig.isPerStepPosActive = false;
  document.getElementById('chkPerStepPos').checked = false;
  
  updateLiveCustomizerSliders();
  renderOnScreenControls();
}

function togglePerStepPositioning(checked) {
  navConfig.isPerStepPosActive = checked;
  // إذا تم التفعيل، ننسخ الموضع العالمي الحالي للتكبيرة الحالية كبداية
  if (checked) {
    navConfig.customPositions[currentStep] = { ...navConfig.globalPosition };
  }
  updateLiveCustomizerSliders();
  renderOnScreenControls();
}

function getActiveButtonConfig() {
  return navConfig.isPerStepPosActive ? navConfig.customPositions[currentStep] : navConfig.globalPosition;
}

function updateLiveCustomizerSliders() {
  const cfg = getActiveButtonConfig();
  const scaleSlider = document.getElementById('customScaleSlider');
  const opacitySlider = document.getElementById('customOpacitySlider');
  
  scaleSlider.value = cfg.scale;
  opacitySlider.value = cfg.opacity;
  
  document.getElementById('scaleValLabel').innerText = `${cfg.scale}x`;
  document.getElementById('opacityValLabel').innerText = `${Math.round(cfg.opacity * 100)}%`;
}

function updateLiveButtonScale(val) {
  const cfg = getActiveButtonConfig();
  cfg.scale = parseFloat(val);
  document.getElementById('scaleValLabel').innerText = `${cfg.scale}x`;
  renderOnScreenControls();
}

function updateLiveButtonOpacity(val) {
  const cfg = getActiveButtonConfig();
  cfg.opacity = parseFloat(val);
  document.getElementById('opacityValLabel').innerText = `${Math.round(cfg.opacity * 100)}%`;
  renderOnScreenControls();
}

/* ==========================================================================
   أزرار التقليب على الشاشة (On-Screen Controls) مع دعم السحب
   ========================================================================== */
function renderOnScreenControls() {
  const container = document.getElementById('onScreenNavControls');
  if (!container) return;
  
  if (!isPrayerActive || !navConfig.buttons) {
    container.classList.remove('active');
    container.innerHTML = '';
    return;
  }

  container.innerHTML = '';

  if (navConfig.isFreePosActive || isLiveCustomizing) {
    container.className = 'on-screen-nav-controls active';
    const btnWrapper = document.createElement('div');
    btnWrapper.id = 'liveDraggableBtnWrapper';
    btnWrapper.className = `draggable-live-btn-wrapper ${isLiveCustomizing ? 'customizing' : ''}`;
    
    const cfg = getActiveButtonConfig();
    
    btnWrapper.style.left = `${cfg.x}%`;
    btnWrapper.style.top = `${cfg.y}%`;
    btnWrapper.style.transform = `translate(-50%, -50%) scale(${cfg.scale})`;
    btnWrapper.style.opacity = cfg.opacity;

    if (navConfig.buttonLayout === 'single') {
      if (currentStep < 3) {
        const btn = document.createElement('button');
        btn.className = 'on-screen-btn btn-forward-wide';
        btn.innerHTML = `<span>${t('nextTakbeer', 'التكبيرة التالية ❯')}</span>`;
        btn.onclick = (e) => { e.stopPropagation(); if (!isLiveCustomizing) goToStep(currentStep + 1); };
        btnWrapper.appendChild(btn);
      } else {
        const finishBtn = document.createElement('button');
        finishBtn.className = 'on-screen-btn btn-forward-wide';
        finishBtn.style.background = '#10b981';
        finishBtn.innerHTML = `<span>✓ ${t('exitPrayer', 'إنهاء الصلاة')}</span>`;
        finishBtn.onclick = (e) => { e.stopPropagation(); if (!isLiveCustomizing) exitPrayerSession(true); };
        btnWrapper.appendChild(finishBtn);
      }
    } else {
      const dualBox = document.createElement('div');
      dualBox.style.display = 'flex';
      dualBox.style.gap = '12px';
      
      const prevBtn = document.createElement('button');
      prevBtn.className = `on-screen-btn`;
      prevBtn.innerHTML = `❮`;
      prevBtn.style.opacity = currentStep === 0 ? '0.35' : '1';
      prevBtn.onclick = (e) => { e.stopPropagation(); if (!isLiveCustomizing && currentStep > 0) goToStep(currentStep - 1); };

      const nextBtn = document.createElement('button');
      nextBtn.className = `on-screen-btn`;
      if (currentStep < 3) {
        nextBtn.innerHTML = `❯`;
        nextBtn.onclick = (e) => { e.stopPropagation(); if (!isLiveCustomizing) goToStep(currentStep + 1); };
      } else {
        nextBtn.innerHTML = `✓`;
        nextBtn.style.background = '#10b981';
        nextBtn.onclick = (e) => { e.stopPropagation(); if (!isLiveCustomizing) exitPrayerSession(true); };
      }
      dualBox.appendChild(prevBtn);
      dualBox.appendChild(nextBtn);
      btnWrapper.appendChild(dualBox);
    }
    
    // إضافة أحداث السحب الحر إذا كنا في وضع التخصيص الحي
    if (isLiveCustomizing) {
      initLiveDragEvents(btnWrapper);
    }
    
    container.appendChild(btnWrapper);
    return;
  }

  // التخطيط الكلاسيكي غير الحر
  container.className = `on-screen-nav-controls active pos-${navConfig.buttonPos}`;
  const sizeClass = `btn-size-${navConfig.buttonSize}`;

  if (navConfig.buttonLayout === 'single') {
    if (currentStep < stepsData.length - 1) {
      const nextBtn = document.createElement('button');
      nextBtn.className = `on-screen-btn btn-forward-wide`;
      nextBtn.innerHTML = `<span>${t('nextTakbeer', 'التكبيرة التالية ❯')}</span>`;
      nextBtn.onclick = (e) => { e.stopPropagation(); goToStep(currentStep + 1); };
      container.appendChild(nextBtn);
    } else {
      const finishBtn = document.createElement('button');
      finishBtn.className = `on-screen-btn btn-forward-wide`;
      finishBtn.style.background = '#10b981';
      finishBtn.innerHTML = `<span>✓ ${t('exitPrayer', 'إنهاء الصلاة')}</span>`;
      finishBtn.onclick = (e) => { e.stopPropagation(); exitPrayerSession(true); };
      container.appendChild(finishBtn);
    }
  } else {
    const prevBtn = document.createElement('button');
    prevBtn.className = `on-screen-btn ${sizeClass}`;
    prevBtn.innerHTML = `❮`;
    prevBtn.style.opacity = currentStep === 0 ? '0.35' : '1';
    prevBtn.onclick = (e) => { 
      e.stopPropagation(); 
      if (currentStep > 0) goToStep(currentStep - 1); 
    };

    const nextBtn = document.createElement('button');
    nextBtn.className = `on-screen-btn ${sizeClass}`;
    if (currentStep < stepsData.length - 1) {
      nextBtn.innerHTML = `❯`;
      nextBtn.onclick = (e) => { e.stopPropagation(); goToStep(currentStep + 1); };
    } else {
      nextBtn.innerHTML = `✓`;
      nextBtn.style.background = '#10b981';
      nextBtn.onclick = (e) => { e.stopPropagation(); exitPrayerSession(true); };
    }

    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
  }
}

// دالة لمعالجة السحب المباشر على الشاشة أثناء جلسة الصلاة
function initLiveDragEvents(element) {
  let isDragging = false;
  
  function updatePosFromEvent(clientX, clientY) {
    const rect = document.getElementById('swipeContainer').getBoundingClientRect();
    let x = ((clientX - rect.left) / rect.width) * 100;
    let y = ((clientY - rect.top) / rect.height) * 100;
    x = Math.max(8, Math.min(92, x)); // حواف آمنة
    y = Math.max(10, Math.min(85, y));
    
    const cfg = getActiveButtonConfig();
    cfg.x = Math.round(x);
    cfg.y = Math.round(y);
    
    element.style.left = `${cfg.x}%`;
    element.style.top = `${cfg.y}%`;
  }

  element.onpointerdown = (e) => {
    isDragging = true;
    element.setPointerCapture(e.pointerId);
  };

  element.onpointermove = (e) => {
    if (!isDragging) return;
    updatePosFromEvent(e.clientX, e.clientY);
  };

  element.onpointerup = (e) => {
    if (isDragging) {
      isDragging = false;
      try { element.releasePointerCapture(e.pointerId); } catch(err){}
    }
  };
}


/* ==========================================================================
   إدارة جلسة صلاة الجنازة والإنهاء
   ========================================================================== */
function handleExitPrayer(isCompleted = false) {
  isPrayerActive = false;

  stopVoiceRecognition();
  stopShakeSensor();

  const sessionTopBar = document.getElementById('prayerSessionTopBar');
  const swipeContainer = document.getElementById('swipeContainer');
  const startScreen = document.getElementById('startPrayerScreen');
  const onScreenControls = document.getElementById('onScreenNavControls');

  if (sessionTopBar) sessionTopBar.style.display = 'none';
  if (swipeContainer) swipeContainer.style.display = 'none';
  if (startScreen) startScreen.style.display = 'flex';
  if (onScreenControls) {
    onScreenControls.classList.remove('active');
    onScreenControls.innerHTML = '';
  }

  if (isCompleted && !isLiveCustomizing) {
    showCompletionBanner();
  }
}

function startPrayerSession() {
  isPrayerActive = true;
  currentStep = 0;
  extraSwipeCount = 0;

  document.getElementById('startPrayerScreen').style.display = 'none';
  document.getElementById('prayerSessionTopBar').style.display = 'block';
  document.getElementById('swipeContainer').style.display = 'flex';

  updateTrackPosition();
  updateProgressBar();
  renderOnScreenControls();

  if (navConfig.voice && !isLiveCustomizing) startVoiceRecognition();
  if (navConfig.shake && !isLiveCustomizing) initShakeSensor();
}

function exitPrayerSession(isCompleted = false) {
  handleExitPrayer(isCompleted);
}

function showCompletionBanner() {
  const banner = document.getElementById('completionBanner');
  document.getElementById('completionBannerText').innerText = t('prayerCompleted', 'تقبل الله - تم إنهاء الصلاة');
  banner.classList.add('show');
  setTimeout(() => {
    banner.classList.remove('show');
  }, 3800);
}

/* ==========================================================================
   التعرف الصوتي (Speech Recognition) - مع Debounce
   ========================================================================== */
function startVoiceRecognition() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
  try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognizer = new SpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = 'ar-SA';

    speechRecognizer.onresult = (event) => {
      if (!isPrayerActive || isLiveCustomizing) return;
      const currentTime = Date.now();
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript.trim().toLowerCase();
        
        // منع التكرار السريع أو تخطي التكبيرات (Debounce)
        if (currentTime - lastVoiceCommandTime < VOICE_DEBOUNCE_DELAY) continue;
        
        if (transcript.includes("الله أكبر") || transcript.includes("الله اكبر") || transcript.includes("اكبر")) {
          if (currentStep < 3) {
            lastVoiceCommandTime = currentTime;
            goToStep(currentStep + 1);
          }
        }

        if (currentStep === 3 && navConfig.autoEndTasleem) {
          if (transcript.includes("السلام عليكم") || transcript.includes("سلام عليكم") || transcript.includes("ورحمة الله")) {
            lastVoiceCommandTime = currentTime;
            exitPrayerSession(true);
            break;
          }
        }
      }
    };

    speechRecognizer.onerror = (e) => {
      console.log("Speech recognition error:", e.error);
    };

    speechRecognizer.onend = () => {
      if (isPrayerActive && navConfig.voice && !isLiveCustomizing) {
        try { speechRecognizer.start(); } catch(err){}
      }
    };

    speechRecognizer.start();
  } catch (err) {
    console.error("Speech recognition error:", err);
  }
}

function stopVoiceRecognition() {
  if (speechRecognizer) {
    try {
      speechRecognizer.abort();
    } catch (e) {}
    speechRecognizer = null;
  }
}

/* ==========================================================================
   مستشعر الحركة (Shake Detection) - مع عتبة مضبوطة
   ========================================================================== */
function handleDeviceMotion(event) {
  if (!isPrayerActive || !navConfig.shake || isLiveCustomizing) return;
  const current = Date.now();
  if ((current - lastShakeTime) < 1200) return;

  const acc = event.accelerationIncludingGravity || event.acceleration;
  if (!acc) return;

  const delta = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
  
  // استخدام العتبة المضبوطة لالتقاط الحركة بسلاسة
  if (delta > shakeMotionThreshold) {
    lastShakeTime = current;
    if (currentStep < 3) {
      goToStep(currentStep + 1);
    } else if (navConfig.autoEndTasleem) {
      exitPrayerSession(true);
    }
  }
}

function initShakeSensor() {
  if (typeof DeviceMotionEvent !== 'undefined') {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission().then(state => {
        if (state === 'granted' && !shakeSensorBound) {
          window.addEventListener('devicemotion', handleDeviceMotion, false);
          shakeSensorBound = true;
        }
      }).catch(console.error);
    } else {
      if (!shakeSensorBound) {
        window.addEventListener('devicemotion', handleDeviceMotion, false);
        shakeSensorBound = true;
      }
    }
  }
}

function stopShakeSensor() {
  if (shakeSensorBound) {
    window.removeEventListener('devicemotion', handleDeviceMotion, false);
    shakeSensorBound = false;
  }
}

/* ==========================================================================
   التقليب بسحب الشاشة (Touch Swipe) - مع الإنهاء في السحبة الخامسة
   ========================================================================== */
function handleTouchStart(e) {
  if (!navConfig.swipe || !isPrayerActive || isLiveCustomizing) return;
  swipeStartX = e.touches[0].clientX;
  swipeStartY = e.touches[0].clientY;
}

function handleTouchEnd(e) {
  if (!navConfig.swipe || !isPrayerActive || swipeStartX === null || isLiveCustomizing) return;
  const diffX = e.changedTouches[0].clientX - swipeStartX;
  const diffY = e.changedTouches[0].clientY - swipeStartY;
  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
  
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
    const isSwipingForward = (isRtl && diffX < 0) || (!isRtl && diffX > 0);
    const isSwipingBackward = (isRtl && diffX > 0) || (!isRtl && diffX < 0);
    
    if (isSwipingForward) {
      if (currentStep < 3) {
        goToStep(currentStep + 1);
      } else {
        // نحن في التكبيرة الرابعة، سحبة إضافية للأمام (السحبة الخامسة) تنهي الصلاة
        extraSwipeCount++;
        if (extraSwipeCount >= 1) {
          exitPrayerSession(true);
        }
      }
    } else if (isSwipingBackward) {
      if (currentStep > 0) {
        goToStep(currentStep - 1);
      }
    }
  }
  swipeStartX = null;
  swipeStartY = null;
}

/* ==========================================================================
   نافذة التلميحات والشرح (Hints Modal)
   ========================================================================== */
const hintDetails = {
  swipe: {
    icon: "👆",
    title: { English: "Swipe Gestures", العربية: "التقليب بسحب الشاشة" },
    desc: {
      English: "Swipe your finger across the card to quickly advance. A final swipe on the 4th Takbeer ends the prayer.",
      العربية: "اسحب إصبعك يميناً أو يساراً عبر بطاقة التكبيرة للانتقال المباشر. السحب الإضافي للأمام بعد التكبيرة الرابعة ينهي جلسة الصلاة تلقائياً."
    }
  },
  shake: {
    icon: "📳",
    title: { English: "Shake Motion", العربية: "التقليب باهتزاز الجهاز" },
    desc: {
      English: "Gently shake your phone to advance to the next Takbeer. Sensors are active only during prayer.",
      العربية: "قم بهز الهاتف هزة خفيفة ومعتدلة بيدك للانتقال تلقائياً للتكبيرة التالية. المستشعرات محصورة تماماً بجلسة الصلاة لتوفير شحن البطارية."
    }
  },
  voice: {
    icon: "🎙️",
    title: { English: "Voice Recognition", العربية: "التقليب بالصوت" },
    desc: {
      English: "When saying 'Allahu Akbar', it automatically transitions to the next Takbeer. At the final Takbeer, saying 'As-Salamu Alaykum' ends prayer.",
      العربية: "بمجرد التلفظ بـ 'الله أكبر' ينتقل التطبيق للتكبيرة التالية. وعند الوصول للتكبيرة الرابعة، يقوم بالاستماع لكلمة 'السلام عليكم' لإنهاء الصلاة وإيقاف الميكروفون فوراً."
    }
  },
  buttons: {
    icon: "🎛️",
    title: { English: "On-Screen Buttons", العربية: "التقليب بأزرار الشاشة" },
    desc: {
      English: "Displays custom on-screen navigation buttons. You can fully customize their size, opacity, and position for each step.",
      العربية: "يُظهر أزراراً أنيقة فوق الشاشة للتنقل اليدوي. يمكنك تخصيص حجمها وشفافيتها ومكانها لكل تكبيرة على حدة عبر الإعدادات."
    }
  }
};

function openHintModal(type) {
  const data = hintDetails[type];
  if (!data) return;
  document.getElementById('hintModalIcon').innerText = data.icon;
  document.getElementById('hintModalTitle').innerText = data.title[currentLang] || data.title['العربية'];
  document.getElementById('hintModalContent').innerText = data.desc[currentLang] || data.desc['العربية'];
  document.getElementById('hintModalCloseBtn').innerText = t('understood', 'فهمت ذلك');
  document.getElementById('hintModal').classList.add('active');
}

function closeHintModal() {
  document.getElementById('hintModal').classList.remove('active');
}

/* ==========================================================================
   قسم الإضافات بنظام القوائم المتداخلة والبيانات المنفصلة
   ========================================================================== */
function renderExtrasView() {
  const container = document.getElementById('extrasPanel');
  if (!container) return;
  container.innerHTML = '';

  if (extrasLevel === 1) {
    container.innerHTML = `
      <!-- زر السبحة التفاعلية في أعلى قائمة الإضافات -->
      <div class="extras-menu-card" onclick="openTasbeehModal()" style="border-color: var(--accent); background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.15), rgba(var(--accent-rgb), 0.05));">
        <div class="extras-menu-left">
          <div class="extras-card-icon">📿</div>
          <div>
            <div class="extras-item-title">السبحة الإلكترونية المتطورة</div>
            <div class="extras-item-sub">عداد لمسي ذكي، دعم للاهتزاز، وأهداف مخصصة</div>
          </div>
        </div>
        <div style="font-size:1.2rem; color:var(--accent);">❯</div>
      </div>
      
      <!-- زر الانتقال لقائمة الأدعية -->
      <div class="extras-menu-card" onclick="openExtrasLevel2()">
        <div class="extras-menu-left">
          <div class="extras-card-icon">🤲</div>
          <div>
            <div class="extras-item-title">${t('adhkarAndDuas', 'الأذكار والأدعية')}</div>
            <div class="extras-item-sub">أدعية المتوفى، سنن وآداب الجنائز، أذكار عامة مأثورة</div>
          </div>
        </div>
        <div style="font-size:1.2rem; color:var(--text-secondary);">❯</div>
      </div>
    `;
  } else if (extrasLevel === 2) {
    let html = `
      <div class="extras-nav-header">
        <button class="extras-back-btn" onclick="extrasGoBack()">
          ${t('backBtn', '❮ عودة')}
        </button>
        <div class="extras-view-title">${t('adhkarAndDuas', 'الأذكار والأدعية')}</div>
      </div>
    `;

    // استخدام مصفوفة duasData من الملف المفصول duas-data.js
    if (typeof duasData !== 'undefined') {
      duasData.forEach(cat => {
        const catTitle = cat.title[currentLang] || cat.title['العربية'];
        const catDesc = cat.desc[currentLang] || cat.desc['العربية'];
        html += `
          <div class="extras-menu-card" onclick="openExtrasLevel3('${cat.id}')">
            <div class="extras-menu-left">
              <div class="extras-card-icon">${cat.icon}</div>
              <div style="min-width:0;">
                <div class="extras-item-title">${catTitle}</div>
                <div class="extras-item-sub">${catDesc}</div>
              </div>
            </div>
            <div style="font-size:1.15rem; color:var(--text-secondary);">❯</div>
          </div>
        `;
      });
    }

    container.innerHTML = html;
  } else if (extrasLevel === 3 && selectedCategory) {
    const catTitle = selectedCategory.title[currentLang] || selectedCategory.title['العربية'];
    let html = `
      <div class="extras-nav-header">
        <button class="extras-back-btn" onclick="extrasGoBack()">
          ${t('backBtn', '❮ عودة')}
        </button>
        <div class="extras-view-title">${catTitle}</div>
      </div>
    `;

    selectedCategory.items.forEach(item => {
      const itemTitle = item.title[currentLang] || item.title['العربية'];
      const itemMeaning = item.meaning[currentLang] || item.meaning['العربية'] || '';
      html += `
        <div class="dua-entry-card">
          <div class="dua-entry-title">
            <span>🔹</span>
            <span style="flex:1;">${itemTitle}</span>
          </div>
          <div class="dua-entry-arabic">${item.arabic}</div>
          ${itemMeaning ? `<div class="dua-entry-meaning">${itemMeaning}</div>` : ''}
        </div>
      `;
    });

    container.innerHTML = html;
  }
}

function openExtrasLevel2() { extrasLevel = 2; renderExtrasView(); }
function openExtrasLevel3(catId) {
  if (typeof duasData !== 'undefined') {
    selectedCategory = duasData.find(c => c.id === catId);
    if (!selectedCategory) return;
    extrasLevel = 3;
    renderExtrasView();
  }
}
function extrasGoBack() {
  if (extrasLevel === 3) extrasLevel = 2;
  else if (extrasLevel === 2) extrasLevel = 1;
  renderExtrasView();
}

/* ==========================================================================
   منطق السبحة الإلكترونية المتطورة (Advanced Tasbeeh Logic)
   ========================================================================== */
function openTasbeehModal() {
  document.getElementById('tasbeehModal').classList.add('active');
  updateTasbeehUI();
}

function closeTasbeehModal() {
  document.getElementById('tasbeehModal').classList.remove('active');
}

function setTasbeehTarget(target) {
  tasbeehTarget = target;
  localStorage.setItem("tasbeeh_target", target);
  updateTasbeehUI();
}

function resetTasbeehCounter() {
  tasbeehCount = 0;
  localStorage.setItem("tasbeeh_count", tasbeehCount);
  updateTasbeehUI();
  triggerHaptic(50); // اهتزاز خفيف لتأكيد التصفير
}

function toggleTasbeehHaptic(checked) {
  tasbeehHaptic = checked;
  localStorage.setItem("tasbeeh_haptic", checked);
}

function adjustTasbeehRingSize(val) {
  tasbeehRingSize = parseInt(val);
  localStorage.setItem("tasbeeh_ring_size", tasbeehRingSize);
  document.getElementById('tasbeehTouchRing').style.width = `${tasbeehRingSize}px`;
  document.getElementById('tasbeehTouchRing').style.height = `${tasbeehRingSize}px`;
}

function triggerHaptic(duration = 30) {
  if (tasbeehHaptic && "vibrate" in navigator) {
    navigator.vibrate(duration);
  }
}

function handleTasbeehClick() {
  tasbeehCount++;
  localStorage.setItem("tasbeeh_count", tasbeehCount);
  
  const ring = document.getElementById('tasbeehTouchRing');
  
  // تأثير النبض البصري
  ring.classList.remove('pulse');
  void ring.offsetWidth; // إعادة تهيئة الـ CSS Animation
  ring.classList.add('pulse');

  // اهتزاز مميز عند الوصول للهدف أو مضاعفاته
  if (tasbeehTarget > 0 && tasbeehCount % tasbeehTarget === 0) {
    triggerHaptic([50, 50, 100]); // اهتزاز قوي ومميز
  } else if (tasbeehCount % 100 === 0) {
    triggerHaptic([50, 100, 50]); // اهتزاز مميز للمئات
  } else {
    triggerHaptic(30); // نبضة خفيفة للعد العادي
  }

  updateTasbeehUI();
}

function updateTasbeehUI() {
  document.getElementById('tasbeehCountDisplay').innerText = tasbeehCount;
  
  const targetLabel = document.getElementById('tasbeehTargetDisplay');
  if (tasbeehTarget === 0) {
    targetLabel.innerText = 'الهدف: حر ∞';
  } else {
    targetLabel.innerText = `الهدف: ${tasbeehTarget}`;
  }

  // تحديث شريط التقدم الدائري (SVG Stroke Dashoffset)
  const circle = document.getElementById('tasbeehCircleProg');
  if (tasbeehTarget > 0) {
    const progress = (tasbeehCount % tasbeehTarget) / tasbeehTarget;
    // 440 هو محيط الدائرة (stroke-dasharray)
    const offset = 440 - (progress * 440); 
    circle.style.strokeDashoffset = tasbeehCount > 0 && progress === 0 ? 0 : offset;
  } else {
    circle.style.strokeDashoffset = 440; // إخفاء الشريط في الوضع الحر
  }

  // تحديث الأزرار النشطة للهدف
  document.querySelectorAll('.tasbeeh-target-pills .pill-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (tasbeehTarget === 33) document.querySelectorAll('.tasbeeh-target-pills .pill-btn')[0].classList.add('active');
  else if (tasbeehTarget === 100) document.querySelectorAll('.tasbeeh-target-pills .pill-btn')[1].classList.add('active');
  else if (tasbeehTarget === 0) document.querySelectorAll('.tasbeeh-target-pills .pill-btn')[2].classList.add('active');

  // تحديث حجم الحلقة وعلامة الاهتزاز
  document.getElementById('tasbeehTouchRing').style.width = `${tasbeehRingSize}px`;
  document.getElementById('tasbeehTouchRing').style.height = `${tasbeehRingSize}px`;
  document.getElementById('chkTasbeehHaptic').checked = tasbeehHaptic;
}

/* ==========================================================================
   لوحة الإعدادات الشاملة (Settings Panel)
   ========================================================================== */
function populateSettingsPanel() {
  const panel = document.getElementById('settingsPanel');
  if (!panel) return;

  panel.innerHTML = `
    <!-- إعدادات المظهر والسمات (Theme Mode) - تم نقلها للأعلى -->
    <div class="setting-group">
      <div class="setting-title">${t('themeModeTitle', 'وضع المظهر')}</div>
      <div class="pill-button-group">
        <button data-theme="auto" class="pill-btn theme-btn ${currentThemeMode === 'auto' ? 'active' : ''}">${t('autoTheme', 'تلقائي')}</button>
        <button data-theme="light" class="pill-btn theme-btn ${currentThemeMode === 'light' ? 'active' : ''}">${t('lightTheme', 'فاتح')}</button>
        <button data-theme="dark" class="pill-btn theme-btn ${currentThemeMode === 'dark' ? 'active' : ''}">${t('darkTheme', 'داكن')}</button>
      </div>
    </div>

    <!-- إعدادات اللون المميز -->
    <div class="setting-group">
      <div class="setting-title">
        <span>${t('accentLabel', 'اللون المميز')}</span>
      </div>
      <div class="color-palette" id="settingsColorPalette"></div>
      <button id="customColorBtn" class="styled-action-btn" onclick="openCustomColor()">🎨 ${t('additionalColors', 'ألوان إضافية (40 لون)')}</button>
    </div>

    <!-- إعدادات حجم الخط -->
    <div class="setting-group">
      <div class="setting-title">${t('fontSize', 'حجم الخط')}</div>
      <div class="pill-button-group">
        <button data-font="small" class="pill-btn font-btn ${currentFont === 'small' ? 'active' : ''}">${t('small', 'صغير')}</button>
        <button data-font="medium" class="pill-btn font-btn ${currentFont === 'medium' ? 'active' : ''}">${t('medium', 'متوسط')}</button>
        <button data-font="large" class="pill-btn font-btn ${currentFont === 'large' ? 'active' : ''}">${t('large', 'كبير')}</button>
        <button data-font="huge" class="pill-btn font-btn ${currentFont === 'huge' ? 'active' : ''}">${t('huge', 'ضخم')}</button>
      </div>
    </div>

    <!-- قسم طرق التقليب والتنقل (نُقل للأسفل) -->
    <div class="setting-group">
      <div class="setting-title">
        <span>🎮 ${t('navControlsTitle', 'طرق التقليب والتنقل')}</span>
      </div>

      <!-- السحب -->
      <div class="nav-toggle-row">
        <div class="nav-toggle-left">
          <span>👆</span>
          <span>${t('swipeNav', 'التقليب بسحب الشاشة')}</span>
        </div>
        <div class="nav-toggle-right">
          <button class="info-btn" onclick="openHintModal('swipe')" title="معلومات">ℹ️</button>
          <input type="checkbox" id="chkSwipe" class="custom-checkbox" ${navConfig.swipe ? 'checked' : ''} onchange="toggleNavOption('swipe', this.checked)">
        </div>
      </div>

      <!-- الاهتزاز -->
      <div class="nav-toggle-row">
        <div class="nav-toggle-left">
          <span>📳</span>
          <span>${t('shakeNav', 'التقليب باهتزاز الجهاز')}</span>
        </div>
        <div class="nav-toggle-right">
          <button class="info-btn" onclick="openHintModal('shake')" title="معلومات">ℹ️</button>
          <input type="checkbox" id="chkShake" class="custom-checkbox" ${navConfig.shake ? 'checked' : ''} onchange="toggleNavOption('shake', this.checked)">
        </div>
      </div>
      <!-- شريط التحكم بحساسية الاهتزاز -->
      <div id="shakeSensitivityRow" style="display: ${navConfig.shake ? 'block' : 'none'}; padding: 0 12px 14px; border-bottom: 1px solid rgba(128,128,128,0.08);">
         <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 6px; display: flex; justify-content: space-between;">
           <span>قوة الاهتزاز المطلوبة:</span>
           <span id="shakeThresholdVal">${shakeMotionThreshold} (أقل = أسهل)</span>
         </div>
         <input type="range" min="5" max="25" value="${shakeMotionThreshold}" oninput="updateShakeThreshold(this.value)" style="width: 100%; accent-color: var(--accent);">
      </div>

      <!-- الصوت -->
      <div class="nav-toggle-row">
        <div class="nav-toggle-left">
          <span>🎙️</span>
          <span>${t('voiceNav', 'التقليب بالصوت')}</span>
        </div>
        <div class="nav-toggle-right">
          <button class="info-btn" onclick="openHintModal('voice')" title="معلومات">ℹ️</button>
          <input type="checkbox" id="chkVoice" class="custom-checkbox" ${navConfig.voice ? 'checked' : ''} onchange="toggleNavOption('voice', this.checked)">
        </div>
      </div>

      <!-- مفتاح الإنهاء التلقائي عند التسليم -->
      <div id="autoEndTasleemRow" class="nav-toggle-row" style="display: ${navConfig.voice ? 'flex' : 'none'}; background: rgba(var(--accent-rgb), 0.06); border-radius: 12px; margin: 6px 0; padding: 10px 12px;">
        <div class="nav-toggle-left" style="font-size:0.86rem;">
          <span>✨</span>
          <span>${t('voiceAutoEnd', 'الإنهاء التلقائي عند التسليم')}</span>
        </div>
        <div class="nav-toggle-right">
          <label class="switch-label">
            <input type="checkbox" id="chkAutoEnd" ${navConfig.autoEndTasleem ? 'checked' : ''} onchange="toggleAutoEndTasleem(this.checked)">
            <span class="switch-slider"></span>
          </label>
        </div>
      </div>

      <!-- أزرار الشاشة -->
      <div class="nav-toggle-row">
        <div class="nav-toggle-left">
          <span>🎛️</span>
          <span>${t('buttonsNav', 'التقليب بأزرار الشاشة')}</span>
        </div>
        <div class="nav-toggle-right">
          <button class="info-btn" onclick="openHintModal('buttons')" title="معلومات">ℹ️</button>
          <input type="checkbox" id="chkButtons" class="custom-checkbox" ${navConfig.buttons ? 'checked' : ''} onchange="toggleNavOption('buttons', this.checked)">
        </div>
      </div>

      <!-- زر المعاينة والتخصيص الحي للأزرار -->
      <div id="btnCustomizeWrapper" style="display: ${navConfig.buttons ? 'block' : 'none'}; margin-top: 10px;">
        <div style="font-size:0.78rem; font-weight:700; margin-bottom:6px; color:var(--text-secondary); text-align:right;">نمط الأزرار الأساسي:</div>
        <div class="pill-button-group" style="margin-bottom:10px;">
          <button type="button" class="pill-btn ${navConfig.buttonLayout === 'single' ? 'active' : ''}" onclick="toggleButtonLayout('single')">زر واحد</button>
          <button type="button" class="pill-btn ${navConfig.buttonLayout === 'dual' ? 'active' : ''}" onclick="toggleButtonLayout('dual')">زرين (سابق/تالي)</button>
        </div>
        <button class="styled-action-btn" onclick="openLiveCustomizer()" style="border-color: rgba(var(--accent-rgb), 0.4); color: var(--accent);">
          ⚙️ ${t('customizeButtons', 'المعاينة والتخصيص الحي للأزرار')}
        </button>
      </div>
    </div>
  `;

  // تحميل الألوان الأساسية الـ 7 الفخمة
  const paletteContainer = document.getElementById('settingsColorPalette');
  if (typeof primarySevenLuxuryColors !== 'undefined') {
    primarySevenLuxuryColors.forEach(color => {
      const circle = document.createElement('div');
      circle.className = 'color-circle';
      if (color.toUpperCase() === userAccent.toUpperCase()) circle.classList.add('active');
      circle.style.backgroundColor = color;
      circle.onclick = () => setAccentColor(color, true);
      paletteContainer.appendChild(circle);
    });
  }

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.onclick = () => setThemeMode(btn.dataset.theme, true);
  });

  document.querySelectorAll('.font-btn').forEach(btn => {
    btn.onclick = () => {
      currentFont = btn.dataset.font;
      localStorage.setItem("userFontSize", currentFont);
      applyFontScale();
    };
  });
}

function toggleButtonLayout(layout) {
  navConfig.buttonLayout = layout;
  localStorage.setItem("nav_btnLayout", layout);
  populateSettingsPanel();
}

function updateShakeThreshold(val) {
  shakeMotionThreshold = parseInt(val);
  localStorage.setItem("nav_shakeThreshold", shakeMotionThreshold);
  document.getElementById('shakeThresholdVal').innerText = `${shakeMotionThreshold} (أقل = أسهل)`;
}

function openCustomColor() {
  const palette = document.getElementById('premiumColorPalette');
  palette.innerHTML = '';
  if (typeof allFortyColors !== 'undefined') {
    allFortyColors.forEach(color => {
      const circle = document.createElement('div');
      circle.className = 'color-circle';
      if (color.toUpperCase() === userAccent.toUpperCase()) circle.classList.add('active');
      circle.style.backgroundColor = color;
      circle.onclick = () => {
        setAccentColor(color, true);
        closeModal();
      };
      palette.appendChild(circle);
    });
  }
  document.getElementById('customColorModal').classList.add('active');
}

function closeModal() {
  document.getElementById('customColorModal').classList.remove('active');
}

function toggleNavOption(key, checked) {
  navConfig[key] = checked;
  localStorage.setItem(`nav_${key}`, checked);
  
  if (key === 'voice') {
    const row = document.getElementById('autoEndTasleemRow');
    if (row) row.style.display = checked ? 'flex' : 'none';
    if (!checked && isPrayerActive) stopVoiceRecognition();
    if (checked && isPrayerActive) startVoiceRecognition();
  }
  
  if (key === 'shake') {
    const row = document.getElementById('shakeSensitivityRow');
    if (row) row.style.display = checked ? 'block' : 'none';
    if (!checked) stopShakeSensor();
    if (checked && isPrayerActive) initShakeSensor();
  }

  if (key === 'buttons') {
    const wrapper = document.getElementById('btnCustomizeWrapper');
    if (wrapper) wrapper.style.display = checked ? 'block' : 'none';
    renderOnScreenControls();
  }
}

function toggleAutoEndTasleem(checked) {
  navConfig.autoEndTasleem = checked;
  localStorage.setItem("nav_autoEndTasleem", checked);
}

/* ==========================================================================
   لوحة اللغات
   ========================================================================== */
function populateLanguageList() {
  const langPanel = document.getElementById('languagePanel');
  if (!langPanel) return;
  langPanel.innerHTML = `
    <div class="setting-group">
      <div class="setting-title">🌐 ${t('language', 'اللغة')}</div>
      <div class="lang-grid-container" id="fullLangList"></div>
    </div>
  `;
  const grid = document.getElementById('fullLangList');
  languages.forEach(lang => {
    const btn = document.createElement('button');
    btn.className = `lang-btn-item ${lang.code === currentLang ? 'active' : ''}`;
    btn.innerHTML = `<span style="font-size:1.4rem;">${lang.flag}</span> <span>${lang.name}</span>`;
    btn.onclick = () => {
      currentLang = lang.code;
      localStorage.setItem("userLang", lang.code);
      updateDirection();
      updateUI();
    };
    grid.appendChild(btn);
  });
}

function openQrModal() {
  document.getElementById('qrPopup').classList.add('active');
}

/* ==========================================================================
   تحديث نصوص الواجهة
   ========================================================================== */
function updateUI() {
  updateDirection();

  document.getElementById('guideLabel').innerText = t('guide', 'الدليل');
  document.getElementById('extrasLabel').innerText = t('extras', 'الإضافات');
  document.getElementById('settingsLabel').innerText = t('settings', 'الإعدادات');
  document.getElementById('languageLabel').innerText = t('language', 'اللغة');
  
  document.getElementById('startScreenTitle').innerText = t('guide', 'صلاة الجنازة');
  document.getElementById('startScreenDesc').innerText = t('startScreenDesc', 'دليل تفاعلي متزامن خطوة بخطوة مع أربع تكبيرات...');
  document.getElementById('btnStartPrayerText').innerText = t('startPrayerBtn', 'ابدأ صلاة الجنازة');
  document.getElementById('startScreenShareText').innerText = `${t('shareReward', 'شارك الأجر')} (${t('shareLabel', 'رمز QR')})`;
  document.getElementById('exitSessionBtnText').innerText = t('exitPrayer', 'إنهاء الصلاة');

  document.getElementById('qrLabel').innerText = t('shareReward', 'شارك الأجر');
  document.getElementById('qrSubText').innerText = t('qrSubText', 'امسح الرمز لنشر تطبيق دليل الجنازة ونيل الأجر');
  document.getElementById('closeQrBtn').innerText = t('close', 'إغلاق');
  
  document.getElementById('onboardLangTitle').innerText = t('selectLangTitle', 'اختر اللغة');
  document.getElementById('dontAskLabel').innerText = t('dontAskAgain', 'عدم السؤال مرة أخرى');
  document.getElementById('saveLangBtn').innerText = t('continueBtn', 'متابعة ←');
  document.getElementById('onboardColorTitle').innerText = t('chooseThemeTitle', 'اختر اللون المميز');
  document.getElementById('onboardColorSub').innerText = t('chooseThemeSub', 'اختر اللون المفضل لواجهة التطبيق');
  document.getElementById('startAppBtn').innerText = t('startApp', 'ابدأ التطبيق');

  buildSlides();
  populateLanguageList();
  populateSettingsPanel();
  renderExtrasView();
  renderOnScreenControls();
}

/* ==========================================================================
   شاشة التهيئة الأولى (Onboarding)
   ========================================================================== */
function showOnboardingIfNeeded() {
  const skipOnboard = localStorage.getItem("skipOnboarding");
  if (skipOnboard === "true") return;

  document.getElementById('langOnboardingModal').style.display = 'flex';
  const grid = document.getElementById('onboardLangGrid');
  grid.innerHTML = '';
  languages.forEach(lang => {
    const btn = document.createElement('button');
    btn.className = `lang-btn-item ${lang.code === currentLang ? 'active' : ''}`;
    btn.innerHTML = `<span style="font-size:1.4rem;">${lang.flag}</span> <span>${lang.name}</span>`;
    btn.onclick = () => {
      currentLang = lang.code;
      localStorage.setItem("userLang", lang.code);
      document.querySelectorAll('#onboardLangGrid .lang-btn-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateUI();
    };
    grid.appendChild(btn);
  });
}

function proceedToColorOnboarding() {
  const isChecked = document.getElementById('dontAskCheckbox').checked;
  if (isChecked) {
    localStorage.setItem("skipOnboarding", "true");
  }

  document.getElementById('langOnboardingModal').style.display = 'none';
  document.getElementById('colorOnboardingModal').style.display = 'flex';
  
  const palette = document.getElementById('onboardColorPalette');
  palette.innerHTML = '';
  
  // عرض الألوان الـ 7 الفخمة فقط في البداية للاختيار السريع
  if (typeof primarySevenLuxuryColors !== 'undefined') {
    primarySevenLuxuryColors.forEach(color => {
      const circle = document.createElement('div');
      circle.className = 'color-circle';
      if (color.toUpperCase() === userAccent.toUpperCase()) circle.classList.add('active');
      circle.style.backgroundColor = color;
      circle.onclick = () => {
        setAccentColor(color, true);
        document.querySelectorAll('#onboardColorPalette .color-circle').forEach(c => c.classList.remove('active'));
        circle.classList.add('active');
      };
      palette.appendChild(circle);
    });
  }
}

function finishOnboarding() {
  document.getElementById('colorOnboardingModal').style.display = 'none';
}

/* ==========================================================================
   التبديل بين التبويبات
   ========================================================================== */
function switchTab(tab) {
  // إذا كنا في وضع التخصيص الحي ونحاول تغيير التبويب، نقوم بحفظ وإغلاق التخصيص أولاً
  if (isLiveCustomizing && tab !== 'guide') {
    saveAndExitLiveCustomizer();
  }

  document.getElementById('extrasPanel').classList.remove('active');
  document.getElementById('settingsPanel').classList.remove('active');
  document.getElementById('languagePanel').classList.remove('active');
  
  if (tab === 'guide') {
    if (isPrayerActive) {
      document.getElementById('swipeContainer').style.display = 'flex';
      document.getElementById('prayerSessionTopBar').style.display = 'block';
      document.getElementById('startPrayerScreen').style.display = 'none';
    } else {
      document.getElementById('swipeContainer').style.display = 'none';
      document.getElementById('prayerSessionTopBar').style.display = 'none';
      document.getElementById('startPrayerScreen').style.display = 'flex';
    }
  } else {
    document.getElementById('swipeContainer').style.display = 'none';
    document.getElementById('prayerSessionTopBar').style.display = 'none';
    document.getElementById('startPrayerScreen').style.display = 'none';

    if (tab === 'extras') {
      extrasLevel = 1;
      renderExtrasView();
      document.getElementById('extrasPanel').classList.add('active');
    } else if (tab === 'settings') {
      populateSettingsPanel();
      document.getElementById('settingsPanel').classList.add('active');
    } else if (tab === 'language') {
      populateLanguageList();
      document.getElementById('languagePanel').classList.add('active');
    }
  }

  ['navGuide','navExtras','navSettings','navLanguage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  
  const activeNav = document.getElementById(`nav${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
  if (activeNav) activeNav.classList.add('active');
}

// تصدير الدوال للنافذة
window.switchTab = switchTab;
window.closePopup = (id) => { document.getElementById(id).classList.remove('active'); };
window.proceedToColorOnboarding = proceedToColorOnboarding;
window.finishOnboarding = finishOnboarding;
window.openQrModal = openQrModal;
window.goToStep = goToStep;
window.startPrayerSession = startPrayerSession;
window.exitPrayerSession = exitPrayerSession;
window.openHintModal = openHintModal;
window.closeHintModal = closeHintModal;
window.openLiveCustomizer = openLiveCustomizer;
window.saveAndExitLiveCustomizer = saveAndExitLiveCustomizer;
window.resetLiveButtonCustomizer = resetLiveButtonCustomizer;
window.togglePerStepPositioning = togglePerStepPositioning;
window.updateLiveButtonScale = updateLiveButtonScale;
window.updateLiveButtonOpacity = updateLiveButtonOpacity;
window.toggleButtonLayout = toggleButtonLayout;
window.toggleNavOption = toggleNavOption;
window.toggleAutoEndTasleem = toggleAutoEndTasleem;
window.updateShakeThreshold = updateShakeThreshold;
window.openExtrasLevel2 = openExtrasLevel2;
window.openExtrasLevel3 = openExtrasLevel3;
window.extrasGoBack = extrasGoBack;
window.openTasbeehModal = openTasbeehModal;
window.closeTasbeehModal = closeTasbeehModal;
window.setTasbeehTarget = setTasbeehTarget;
window.resetTasbeehCounter = resetTasbeehCounter;
window.toggleTasbeehHaptic = toggleTasbeehHaptic;
window.adjustTasbeehRingSize = adjustTasbeehRingSize;
window.handleTasbeehClick = handleTasbeehClick;

/* ==========================================================================
   التهيئة الأولية عند تشغيل الصفحة
   ========================================================================== */
(function init() {
  updateDirection();
  setThemeMode(currentThemeMode, false);
  setAccentColor(userAccent, false);
  applyFontScale();
  updateUI();
  
  const container = document.getElementById('swipeContainer');
  container.addEventListener('touchstart', handleTouchStart, { passive: true });
  container.addEventListener('touchend', handleTouchEnd, { passive: true });

  document.getElementById('navGuide').onclick = () => switchTab('guide');
  document.getElementById('navExtras').onclick = () => switchTab('extras');
  document.getElementById('navSettings').onclick = () => switchTab('settings');
  document.getElementById('navLanguage').onclick = () => switchTab('language');

  showOnboardingIfNeeded();
})();