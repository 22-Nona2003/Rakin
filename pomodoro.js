// ==========================================
// مؤقت بومودورو لمنصة رَكِين 🍅
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    const timerText = document.getElementById('timerText');
    const timerHint = document.getElementById('timerHint');
    const startPauseBtn = document.getElementById('startPauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const ringProgress = document.getElementById('ringProgress');
    const sessionsTodayEl = document.getElementById('sessionsToday');
    const minutesStudiedEl = document.getElementById('minutesStudied');
    const cycleHint = document.getElementById('cycleHint');
    const tabs = document.querySelectorAll('.pomo-tab');

    if (!timerText || !startPauseBtn) return;

    // --- الإعدادات ---
    const CIRCUMFERENCE = 2 * Math.PI * 118; // محيط دائرة التقدم
    ringProgress.style.strokeDasharray = CIRCUMFERENCE;

    let mode = 'focus';          // focus | short | long
    let totalSeconds = 25 * 60;
    let remainingSeconds = totalSeconds;
    let isRunning = false;
    let timerInterval = null;
    let deadline = null;

    // --- الإحصائيات المحفوظة ---
    function getStats() {
        const now = new Date();
        const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const stats = JSON.parse(localStorage.getItem('rakeen_pomo')) || {};
        if (stats.date !== today) {
            // يوم جديد — نصفر الإحصائيات
            return { date: today, sessions: 0, minutes: 0 };
        }
        return stats;
    }

    function saveStats(stats) {
        localStorage.setItem('rakeen_pomo', JSON.stringify(stats));
    }

    function renderStats() {
        const s = getStats();
        sessionsTodayEl.innerText = s.sessions;
        minutesStudiedEl.innerText = s.minutes;
    }

    // --- العرض ---
    function updateDisplay() {
        const m = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
        const s = String(remainingSeconds % 60).padStart(2, '0');
        timerText.innerText = `${m}:${s}`;

        // تحديث حلقة التقدم
        const progress = 1 - (remainingSeconds / totalSeconds);
        ringProgress.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);

        // عنوان الصفحة يعرض الوقت — جميل للتبويب
        document.title = isRunning
            ? `${m}:${s} - ${mode === 'focus' ? 'تركيز 🍅' : 'استراحة ☕'} | رَكِين`
            : 'مؤقت بومودورو | منصة رَكِين';
    }

    // --- المؤقتات ---
    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        deadline = Date.now() + remainingSeconds * 1000;
        startPauseBtn.innerHTML = '<i class="fas fa-pause"></i> إيقاف مؤقت';
        startPauseBtn.classList.add('running');
        timerHint.innerText = mode === 'focus' ? 'ركّز، رَكِين معك ☕' : 'استرخِ واستمتع 🌿';

        timerInterval = setInterval(tickTimer, 250);
        tickTimer();

    }

    function tickTimer() {
        if (!isRunning || deadline === null) return;
        remainingSeconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
        if (remainingSeconds === 0) {
            completeSession();
            return;
        }
        updateDisplay();
    }

    function pauseTimer() {
        if (deadline !== null) remainingSeconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
        isRunning = false;
        clearInterval(timerInterval);
        deadline = null;
        startPauseBtn.innerHTML = '<i class="fas fa-play"></i> استئناف';
        startPauseBtn.classList.remove('running');
        timerHint.innerText = 'توقف المؤقت — خذ نفسًا';
        updateDisplay();
    }

    function resetTimer() {
        isRunning = false;
        clearInterval(timerInterval);
        deadline = null;
        remainingSeconds = totalSeconds;
        startPauseBtn.innerHTML = '<i class="fas fa-play"></i> ابدأ';
        startPauseBtn.classList.remove('running');
        timerHint.innerText = 'هل أنت مستعد للبدء؟';
        updateDisplay();
    }

    // --- إكمال الجلسة والانتقال التلقائي ---
    function completeSession() {
        clearInterval(timerInterval);
        isRunning = false;
        deadline = null;

        const stats = getStats();

        if (mode === 'focus') {
            // انتهت جلسة تركيز — نسجلها
            stats.sessions++;
            stats.minutes += Math.round(totalSeconds / 60);
            saveStats(stats);
            renderStats();

            // عدد الجلسات اليوم يحدد نوع الاستراحة التالية
            const nextIsLong = stats.sessions % 4 === 0;
            switchMode(nextIsLong ? 'long' : 'short', true);
            timerHint.innerText = nextIsLong
                ? '🎉 أربع جلسات! خذ استراحة طويلة تستحقها'
                : '🎉 أحسنتِ! استراحة قصيرة الآن';
        } else {
            // انتهت الاستراحة — نعود للتركيز
            switchMode('focus', true);
            timerHint.innerText = 'خلصت الاستراحة — يالله جلسة جديدة 💪';
        }

        playChime();
    }

    // --- تبديل الأوضاع ---
    function switchMode(newMode, autoStart = false) {
        mode = newMode;

        // تحديث أزرار التبويبات
        tabs.forEach(t => {
            t.classList.toggle('active', t.dataset.mode === newMode);
        });

        totalSeconds = parseInt(
            document.querySelector(`.pomo-tab[data-mode="${newMode}"]`).dataset.minutes
        ) * 60;
        remainingSeconds = totalSeconds;

        if (autoStart) {
            startTimer();
        } else {
            resetTimer();
        }
        updateDisplay();
    }

    // --- صوت تنبيه لطيف (بدون ملفات) ---
    function playChime() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const notes = [523.25, 659.25, 783.99]; // نغمة صاعدة هادئة
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.25);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.25 + 0.8);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ctx.currentTime + i * 0.25);
                osc.stop(ctx.currentTime + i * 0.25 + 0.8);
            });
        } catch (e) { /* الصوت اختياري */ }
    }

    // --- الأحداث ---
    startPauseBtn.addEventListener('click', () => {
        isRunning ? pauseTimer() : startTimer();
    });

    resetBtn.addEventListener('click', resetTimer);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchMode(tab.dataset.mode);
        });
    });

    // يعيد مزامنة العد عند الرجوع للتبويب بعد تركه بالخلفية.
    document.addEventListener('visibilitychange', () => {
        if (isRunning) tickTimer();
        renderStats();
    });

    // --- البداية ---
    renderStats();
    updateDisplay();
});
