// ==========================================
// مدرسة الحساب — نسخة البطاقات والطريقة القياسية 🎓
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const home = document.getElementById('mathHome');
    const panels = document.querySelectorAll('.subject-panel');

    // ==========================================
    // التنقل: قائمة الأقسام ↔ الأقسام
    // ==========================================
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', () => {
            home.classList.add('hidden');
            panels.forEach(p => p.classList.add('hidden'));
            document.getElementById('sub-' + card.dataset.sub).classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    document.querySelectorAll('.btn-back-sub').forEach(btn => {
        btn.addEventListener('click', () => {
            panels.forEach(p => p.classList.add('hidden'));
            home.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ==========================================
    // 📊 جدول الضرب المدرسي
    // ==========================================
    const tableSelect = document.getElementById('tableSelect');
    const schoolTable = document.getElementById('schoolTable');

    if (tableSelect) {
        tableSelect.innerHTML = '';
        for (let i = 1; i <= 10; i++) {
            tableSelect.innerHTML += `<option value="${i}" ${i === 2 ? 'selected' : ''}>جدول ${i}</option>`;
        }

        let answersHidden = false;

        function renderTable(n) {
            schoolTable.innerHTML = '';
            for (let i = 1; i <= 10; i++) {
                const row = document.createElement('div');
                row.className = 'st-row';
                row.innerHTML = `
                    <span class="st-op">${n} × ${i} =</span>
                    <span class="st-res ${answersHidden ? 'hidden-ans' : ''}" data-ans="${n * i}">${answersHidden ? '؟' : n * i}</span>
                `;
                // بالنقر: اكشف الناتج مؤقتاً (وضع الحفظ)
                row.querySelector('.st-res').addEventListener('click', function() {
                    if (!answersHidden) return;
                    this.textContent = this.dataset.ans;
                    setTimeout(() => { this.textContent = '؟'; }, 900);
                });
                schoolTable.appendChild(row);
            }
        }

        tableSelect.addEventListener('change', () => renderTable(parseInt(tableSelect.value)));
        renderTable(2);

        document.getElementById('hideAnswersBtn').addEventListener('click', function() {
            answersHidden = !answersHidden;
            this.innerHTML = answersHidden
                ? '<i class="fas fa-eye"></i> إظهار النواتج'
                : '<i class="fas fa-eye-slash"></i> وضع الحفظ (إخفاء النواتج)';
            renderTable(parseInt(tableSelect.value));
        });

        // تدريب على الجدول المختار
        const tableQuiz = document.getElementById('tableQuiz');
        const tableQuizQ = document.getElementById('tableQuizQ');
        const tableQuizAnswer = document.getElementById('tableQuizAnswer');
        const tableQuizFeedback = document.getElementById('tableQuizFeedback');
        let currentTableN = 2, tableQ = null;

        tableSelect.addEventListener('change', () => { currentTableN = parseInt(tableSelect.value); });

        document.getElementById('tableQuizBtn')?.addEventListener('click', () => {
            tableQuiz.classList.remove('hidden');
            nextTableQ();
        });

        function nextTableQ() {
            tableQ = currentTableN * rand(1, 10);
            tableQuizQ.textContent = `${currentTableN} × ${rand(1, 10) === 0 ? 1 : tableQ / currentTableN}`;
            // نعيد السؤال بشكل صحيح
            const b = tableQ / currentTableN;
            tableQuizQ.textContent = `${currentTableN} × ${b}`;
            tableQuizAnswer.value = '';
            tableQuizFeedback.textContent = '';
            tableQuizFeedback.className = 'game-feedback';
            tableQuizAnswer.focus();
        }

        function checkTableQ() {
            if (parseFloat(tableQuizAnswer.value) === tableQ) {
                tableQuizFeedback.textContent = '✅ صح! 🎉';
                tableQuizFeedback.className = 'game-feedback success';
                setTimeout(nextTableQ, 900);
            } else {
                tableQuizFeedback.textContent = '❌ راجعي الجدول فوق وحاولي ثانية';
                tableQuizFeedback.className = 'game-feedback fail';
            }
        }
        document.getElementById('tableQuizCheck').addEventListener('click', checkTableQ);
        tableQuizAnswer.addEventListener('keydown', e => { if (e.key === 'Enter') checkTableQ(); });
    }

    // ==========================================
    // مولد التدريبات (نفس النظام للجميع)
    // ==========================================
    function setupPractice(qId, inputId, btnId, fbId, generator) {
        const qEl = document.getElementById(qId);
        if (!qEl) return;
        const input = document.getElementById(inputId);
        const fb = document.getElementById(fbId);
        let current = null;

        function next() {
            current = generator();
            qEl.textContent = current.text + ' = ؟';
            input.value = '';
            fb.textContent = '';
            fb.className = 'practice-fb';
        }

        function check() {
            if (parseFloat(input.value) === current.answer) {
                fb.textContent = '✅ صح! 🎉';
                fb.className = 'practice-fb ok';
                setTimeout(next, 1100);
            } else {
                fb.textContent = '❌ طبّقي الطريقة فوق خطوة خطوة';
                fb.className = 'practice-fb no';
            }
        }

        document.getElementById(btnId).addEventListener('click', check);
        input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
        next();
    }

    // الضرب — أسئلة من الحالات الثلاث
    setupPractice('mulQ', 'mulAnswer', 'mulCheck', 'mulFb', () => {
        const type = rand(1, 3);
        if (type === 1) {
            // صفر بالنهاية
            const base = rand(2, 9), zeros = rand(1, 2), b = rand(3, 9);
            const a = base * (10 ** zeros);
            return { text: `${a} × ${b}`, answer: a * b };
        } else if (type === 2) {
            // رقم عادي × رقم
            const a = rand(12, 49), b = rand(3, 9);
            return { text: `${a} × ${b}`, answer: a * b };
        } else {
            // رقمين × رقمين (منتهي بصفر للتسهيل بالبداية)
            const a = rand(11, 49), b = (rand(1, 9)) * 10;
            return { text: `${a} × ${b}`, answer: a * b };
        }
    });

    // الجمع
    setupPractice('addQ', 'addAnswer', 'addCheck', 'addFb', () => {
        const a = rand(23, 89), b = rand(14, 59);
        return { text: `${a} + ${b}`, answer: a + b };
    });

    // الطرح
    setupPractice('subQ', 'subAnswer', 'subCheck', 'subFb', () => {
        const a = rand(45, 99), b = rand(13, 39);
        return { text: `${a} − ${b}`, answer: a - b };
    });

    // القسمة (نواتج صحيحة)
    setupPractice('divQ', 'divAnswer', 'divCheck', 'divFb', () => {
        const d = rand(2, 9), q = rand(10, 49);
        return { text: `${d * q} ÷ ${d}`, answer: q };
    });

    // ==========================================
    // ➗ حلّالة القسمة المطولة خطوة بخطوة
    // ==========================================
    const divDividend = document.getElementById('divDividend');
    const divDivisor = document.getElementById('divDivisor');
    const divSolveBtn = document.getElementById('divSolveBtn');
    const divStepsList = document.getElementById('divStepsList');

    function showLongDivision() {
        const dividend = parseInt(divDividend.value);
        const divisor = parseInt(divDivisor.value);
        divStepsList.innerHTML = '';

        if (!Number.isFinite(dividend) || !Number.isFinite(divisor) || dividend < 0) {
            divStepsList.innerHTML = `<div class="div-step">✏️ اكتب الرقمين أولًا</div>`;
            return;
        }
        if (divisor === 0) {
            divStepsList.innerHTML = `<div class="div-step">😅 القسمة على صفر مستحيلة!</div>`;
            return;
        }

        const digits = String(dividend).split('');
        let remainder = 0, quotientStr = '';
        const steps = [];

        for (let i = 0; i < digits.length; i++) {
            remainder = remainder * 10 + Number(digits[i]);
            const q = Math.floor(remainder / divisor);
            const product = q * divisor;
            const newRem = remainder - product;
            if (quotientStr === '' && q === 0) continue;
            steps.push({ working: remainder, q, product, newRem, isFirst: quotientStr === '' });
            quotientStr += q;
            remainder = newRem;
        }
        if (quotientStr === '') quotientStr = '0';

        steps.forEach((s, idx) => {
            const el = document.createElement('div');
            el.className = 'div-step';
            el.innerHTML = `
                <span class="step-num">الخطوة ${idx + 1}</span>
                <p>${s.isFirst
                    ? `أول رقم من ${dividend} أكبر من ${divisor} هو: <strong>${s.working}</strong>`
                    : `ننزل الرقم الجاي بجانب الباقي ← <strong>${s.working}</strong>`}</p>
                <p>${divisor} يدخل في ${s.working} ← <strong>${s.q}</strong> مرة (رقم بالناتج)</p>
                <p>${s.q} × ${divisor} = <strong>${s.product}</strong> — نطرح: ${s.working} − ${s.product} = <strong>${s.newRem}</strong></p>
            `;
            divStepsList.appendChild(el);
        });

        const quotient = parseInt(quotientStr);
        const resultEl = document.createElement('div');
        resultEl.className = 'div-result';
        let html = `${dividend} ÷ ${divisor} = <strong>${quotient}</strong>`;
        if (remainder > 0) html += ` والباقي <strong>${remainder}</strong>`;
        html += `<br><small>✅ تحققي: ${quotient} × ${divisor}${remainder > 0 ? ` + ${remainder}` : ''} = ${quotient * divisor + remainder}</small>`;
        resultEl.innerHTML = html;
        divStepsList.appendChild(resultEl);
    }

    divSolveBtn?.addEventListener('click', showLongDivision);
    divDividend?.addEventListener('keydown', e => { if (e.key === 'Enter') showLongDivision(); });
    divDivisor?.addEventListener('keydown', e => { if (e.key === 'Enter') showLongDivision(); });
    // تدريب الحيل الذهنية: الحساب بخطوات بسيطة دون استدعاء الآلة الحاسبة
    const mentalGrid = document.getElementById('mentalTrickGrid');
    if (mentalGrid) {
        const mentalTricks = [
            { id: 'times9', title: 'الضرب في 9', rule: 'اضرب العدد في 10، ثم اطرح العدد الأصلي؛ لأن 9 = 10 − 1.', example: '27 × 9 → 270 − 27 = 243', make: () => { const n = rand(12, 89); return { q: `${n} × 9`, a: n * 9 }; } },
            { id: 'times5', title: 'الضرب في 5', rule: 'اضرب العدد في 10 ثم خذ النصف؛ لأن 5 نصف 10. اختر عددًا زوجيًا ليكون الناتج صحيحًا.', example: '38 × 5 → 380 ÷ 2 = 190', make: () => { const n = rand(7, 45) * 2; return { q: `${n} × 5`, a: n * 5 }; } },
            { id: 'square5', title: 'تربيع عدد ينتهي بـ 5', rule: 'اضرب رقم العشرات في الرقم الذي بعده، ثم أضف 25 في النهاية.', example: '35² → 3 × 4 = 12، ثم 25 → 1225', make: () => { const n = rand(1, 9) * 10 + 5; return { q: `${n}²`, a: n * n }; } },
            { id: 'near100', title: 'ضرب عددين قريبين من 100', rule: 'احسب بُعد كل عدد عن 100. اطرح بُعد أحدهما من العدد الآخر، ثم ألحق حاصل ضرب البُعدين بخانتين.', example: '98 × 97 → البُعدان 2 و3؛ 98−3=95، و2×3=06 → 9506', make: () => { const x = rand(1, 9), y = rand(1, 9); const a = 100 - x, b = 100 - y; return { q: `${a} × ${b}`, a: a * b }; } },
            { id: 'divide5', title: 'القسمة على 5', rule: 'ضاعفي المقسوم ثم اقسميه على 10؛ لأن القسمة على 5 تساوي الضرب في 2 ثم القسمة على 10.', example: '135 ÷ 5 → 270 ÷ 10 = 27', make: () => { const q = rand(12, 99); return { q: `${q * 5} ÷ 5`, a: q }; } },
            { id: 'percent15', title: 'حساب 15٪ بسرعة', rule: 'احسب 10٪ بتحريك الفاصلة منزلة، ثم خذ نصفها لتحصل على 5٪، واجمع الناتجين.', example: '15٪ من 240 → 24 + 12 = 36', make: () => { const n = rand(2, 30) * 20; return { q: `15٪ من ${n}`, a: n * 0.15 }; } }
        ];
        const lesson = document.getElementById('mentalLesson');
        const title = document.getElementById('mentalLessonTitle');
        const rule = document.getElementById('mentalLessonRule');
        const example = document.getElementById('mentalWorkedExample');
        const question = document.getElementById('mentalQuestion');
        const input = document.getElementById('mentalAnswer');
        const feedback = document.getElementById('mentalFeedback');
        let selectedTrick = null;
        let currentChallenge = null;

        function nextMentalChallenge() {
            if (!selectedTrick) return;
            currentChallenge = selectedTrick.make();
            question.textContent = `${currentChallenge.q} = ؟`;
            input.value = '';
            feedback.textContent = '';
            feedback.className = 'mental-feedback';
            input.focus();
        }

        mentalTricks.forEach(trick => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'mental-trick-card';
            card.innerHTML = `<strong>${trick.title}</strong><span>${trick.rule}</span>`;
            card.addEventListener('click', () => {
                selectedTrick = trick;
                title.textContent = trick.title;
                rule.textContent = trick.rule;
                example.textContent = `مثال: ${trick.example}`;
                lesson.classList.remove('hidden');
                nextMentalChallenge();
                lesson.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
            mentalGrid.appendChild(card);
        });

        document.getElementById('mentalNext')?.addEventListener('click', nextMentalChallenge);
        document.getElementById('mentalCheck')?.addEventListener('click', () => {
            if (!currentChallenge) return;
            if (Number(input.value) === currentChallenge.a) {
                feedback.textContent = 'أحسنتِ! الحل صحيح من ذهنك 🧠';
                feedback.className = 'mental-feedback mental-correct';
            } else {
                feedback.textContent = 'مو صحيح هالمرة؛ ارجع إلى خطوات الحيلة وجرّب مرة أخرى.';
                feedback.className = 'mental-feedback mental-try-again';
            }
        });
        input?.addEventListener('keydown', event => { if (event.key === 'Enter') document.getElementById('mentalCheck')?.click(); });
    }
});