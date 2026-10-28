// ==========================================
// الألغاز والتحديات لمنصة رَكِين 🎮 — النسخة المطورة
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    const gameMenu = document.getElementById('gameMenu');
    const gameArea = document.getElementById('gameArea');
    const gameContent = document.getElementById('gameContent');
    const gameTitle = document.getElementById('gameTitle');
    const closeGameBtn = document.getElementById('closeGameBtn');

    if (!gameMenu) return;

    const gameNames = {
        memory: '🧠 ذاكرة رَكِين',
        math: '🧮 تحدي حسابي سريع',
        word: '🔤 رتب الحروف',
        reaction: '🎯 ردة الفعل',
        pattern: '🧩 اكتشف النمط',
        oddone: '👀 اختر المختلف'
    };

    function openGame(gameKey) {
        const gameName = gameNames[gameKey];
        if (!gameName) {
            console.warn('لعبة غير معرّفة:', gameKey);
            return;
        }
        gameMenu.classList.add('hidden');
        gameArea.classList.remove('hidden');
        gameTitle.innerText = gameName;
        gameContent.innerHTML = '';

        if (gameKey === 'memory') startMemory();
        if (gameKey === 'math') startMath();
        if (gameKey === 'word') startWord();
        if (gameKey === 'reaction') startReaction();
        if (gameKey === 'pattern') startPattern();
        if (gameKey === 'oddone') startOddOne();
    }

    closeGameBtn.addEventListener('click', () => {
        gameArea.classList.add('hidden');
        gameMenu.classList.remove('hidden');
        gameContent.innerHTML = '';
    });

    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => openGame(card.dataset.game));
    });

    // ==========================================
    // اللعبة 1: ذاكرة رَكِين 🧠 — 4 جولات + عرض أولي + عداد وقت
    // ==========================================
    function startMemory() {
        const themes = [
            ['🌙', '☕', '📚', '🌟', '🌿', '🎀', '🧸', '🦋'],
            ['🍓', '🌸', '🌈', '☁️', '💜', '✨', '🐱', '🍰'],
            ['🍎', '🌻', '🐬', '🍭', '🎈', '🎧', '🍀', '💫'],
            ['🐝', '🧁', '🌊', '🪴', '💌', '🫧', '🌙', '🍃']
        ];

        let round = 0;
        const roundTimes = [];

        nextRound();

        function nextRound() {
            if (round >= themes.length) { endGame(); return; }
            round++;

            const emojis = themes[round - 1];
            const deck = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

            let firstCard = null;
            let lock = true; // مقفولة أثناء مرحلة الحفظ
            let matches = 0;
            let elapsed = 0;
            let timerId = null;

            gameContent.innerHTML = `
                <div class="math-hud">
                    <span>الجولة <strong>${round}</strong> من ${themes.length}</span>
                    <span>⏱️ <strong id="memoryTime">0</strong> ثانية</span>
                </div>
                <p class="game-status" id="memoryStatus">احفظ أماكن البطاقات جيدًا! 👀</p>
                <div class="memory-grid" id="memoryGrid"></div>
            `;

            const grid = document.getElementById('memoryGrid');
            const status = document.getElementById('memoryStatus');
            const timeEl = document.getElementById('memoryTime');

            deck.forEach(emoji => {
                const card = document.createElement('div');
                // مكشوفة في البداية — مرحلة الحفظ
                card.className = 'memory-card flipped';
                card.innerHTML = `
                    <div class="memory-card-inner">
                        <div class="memory-face memory-front">🌙</div>
                        <div class="memory-face memory-back">${emoji}</div>
                    </div>
                `;
                card.dataset.emoji = emoji;

                card.addEventListener('click', () => {
                    if (lock || card.classList.contains('matched')) return;
                    if (card === firstCard) return;
                    card.classList.add('flipped');

                    if (!firstCard) {
                        firstCard = card;
                        return;
                    }

                    if (firstCard.dataset.emoji === card.dataset.emoji) {
                        firstCard.classList.add('matched');
                        card.classList.add('matched');
                        firstCard = null;
                        matches++;

                        if (matches === emojis.length) {
                            clearInterval(timerId);
                            roundTimes.push(elapsed);
                            status.innerHTML = `🎉 أكملتِ الجولة ${round} في <strong>${elapsed}</strong> ثانية!`;
                            setTimeout(nextRound, 1800);
                        }
                    } else {
                        lock = true;
                        const prev = firstCard;
                        firstCard = null;
                        setTimeout(() => {
                            prev.classList.remove('flipped');
                            card.classList.remove('flipped');
                            lock = false;
                        }, 700);
                    }
                });

                grid.appendChild(card);
            });

            // بعد 3 ثواني: تُخفى البطاقات ويبدأ العدّاد — اللعب يبدأ!
            setTimeout(() => {
                grid.querySelectorAll('.memory-card').forEach(c => c.classList.remove('flipped'));
                lock = false;
                status.innerText = 'الحين اقلبي البطاقات! 🔄';
                timerId = setInterval(() => {
                    elapsed++;
                    timeEl.innerText = elapsed;
                }, 1000);
            }, 3000);
        }

        function endGame() {
            const total = roundTimes.reduce((a, b) => a + b, 0);
            gameContent.innerHTML = `
                <p class="game-status final">🎉 مبروك! أنهيتِ كل الجولات</p>
                <p class="game-status">أزمنة الجولات: ${roundTimes.map((t, i) => `ج${i + 1}: ${t}ث`).join(' • ')}</p>
                <p class="game-status final">المجموع الكلي: <strong>${total}</strong> ثانية ⏱️</p>
                <div style="text-align:center; margin-top:16px;">
                    <button class="pomo-btn start" id="memoryRestart"><i class="fas fa-redo"></i> من البداية</button>
                </div>
            `;
            document.getElementById('memoryRestart').addEventListener('click', () => {
                round = 0;
                roundTimes.length = 0;
                nextRound();
            });
        }
    }

    // ==========================================
    // اللعبة 2: التحدي الحسابي 🧮 — 45 ثانية + ضرب أسهل
    // ==========================================
    function startMath() {
        let score = 0;
        let timeLeft = 45;
        let timerId = null;

        gameContent.innerHTML = `
            <div class="math-hud">
                <span>النقاط: <strong id="mathScore">0</strong></span>
                <span>الوقت: <strong id="mathTime">45</strong> ثانية</span>
            </div>
            <div class="math-question" id="mathQuestion"></div>
            <div class="math-answers" id="mathAnswers"></div>
        `;

        const qEl = document.getElementById('mathQuestion');
        const aEl = document.getElementById('mathAnswers');
        const sEl = document.getElementById('mathScore');
        const tEl = document.getElementById('mathTime');

        function newQuestion() {
            const ops = [
                { symbol: '+', fn: (a, b) => a + b },
                { symbol: '−', fn: (a, b) => a - b },
                { symbol: '×', fn: (a, b) => a * b }
            ];
            const op = ops[Math.floor(Math.random() * ops.length)];
            let a, b;

            if (op.symbol === '×') {
                // ضرب سهل: أرقام صغيرة
                a = Math.floor(Math.random() * 5) + 2; // 2 - 6
                b = Math.floor(Math.random() * 5) + 2; // 2 - 6
            } else if (op.symbol === '−') {
                a = Math.floor(Math.random() * 40) + 10; // 10 - 49
                b = Math.floor(Math.random() * (a - 5)) + 2;
            } else {
                a = Math.floor(Math.random() * 39) + 2;  // 2 - 40
                b = Math.floor(Math.random() * 20) + 1;  // 1 - 20
            }

            const correct = op.fn(a, b);
            const answers = new Set([correct]);
            while (answers.size < 4) {
                const delta = (Math.floor(Math.random() * 11) - 5) || 7;
                const candidate = correct + delta;
                if (candidate >= 0 && candidate !== correct) answers.add(candidate);
            }
            const shuffled = [...answers].sort(() => Math.random() - 0.5);

            qEl.innerText = `${a} ${op.symbol} ${b} = ؟`;
            aEl.innerHTML = '';
            shuffled.forEach(val => {
                const btn = document.createElement('button');
                btn.className = 'math-answer-btn';
                btn.innerText = val;
                btn.addEventListener('click', () => {
                    // نقفل الأزرار حتى تظهر العملية التالية
                    aEl.querySelectorAll('button').forEach(x => x.disabled = true);

                    if (val === correct) {
                        score++;
                        btn.classList.add('correct');
                    } else {
                        btn.classList.add('wrong');
                        score = Math.max(0, score - 1);
                    }
                    sEl.innerText = score;
                    setTimeout(newQuestion, 300);
                });
                aEl.appendChild(btn);
            });
        }

        timerId = setInterval(() => {
            timeLeft--;
            tEl.innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerId);
                qEl.innerText = '⏰ انتهى الوقت!';
                aEl.innerHTML = `<p class="game-status">نتيجتك: <strong>${score}</strong> نقطة 🎯</p>`;
            }
        }, 1000);

        newQuestion();
    }

    // ==========================================
    // اللعبة 3: رتب الحروف 🔤 — باصلاح البق
    // ==========================================
    function startWord() {
        const words = ['جامعة', 'مذاكرة', 'نجاح', 'تركيز', 'هدوء', 'قهوة', 'كتاب', 'تفوق', 'ركين', 'طموح'];

        let score = 0;
        let round = 0;
        const totalRounds = 5;

        newRound();

        function newRound() {
            round++;
            const word = words[Math.floor(Math.random() * words.length)];
            let letters = word.split('').sort(() => Math.random() - 0.5);
            // نضمن أن الحروف مخلوطة فعلاً
            if (letters.join('') === word) letters = letters.reverse();

            gameContent.innerHTML = `
                <p class="game-status">الجولة <strong>${round}</strong> من ${totalRounds} — النقاط: <strong>${score}</strong></p>
                <div class="word-letters" id="wordLetters"></div>
                <div class="word-answer-row">
                    <input type="text" id="wordInput" class="word-input" placeholder="اكتب الكلمة الصحيحة..." autocomplete="off">
                    <button class="pomo-btn start" id="wordCheckBtn"><i class="fas fa-check"></i> تحقق</button>
                </div>
                <p class="game-feedback" id="wordFeedback"></p>
            `;

            // ✅ الإصلاح: letters مصفوفة جاهزة — forEach مباشرة بدون split
            const lettersEl = document.getElementById('wordLetters');
            letters.forEach(ch => {
                const tile = document.createElement('span');
                tile.className = 'word-tile';
                tile.innerText = ch;
                lettersEl.appendChild(tile);
            });

            const input = document.getElementById('wordInput');
            const feedback = document.getElementById('wordFeedback');
            input.focus();

            function check() {
                if (input.value.trim() === word) {
                    score++;
                    feedback.innerText = '✅ صحيح! أحسنتِ';
                    feedback.className = 'game-feedback success';
                    setTimeout(() => round < totalRounds ? newRound() : endGame(), 900);
                } else {
                    feedback.innerText = '❌ حاول مرة ثانية';
                    feedback.className = 'game-feedback fail';
                }
            }

            document.getElementById('wordCheckBtn').addEventListener('click', check);
            input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
        }

        function endGame() {
            gameContent.innerHTML = `
                <p class="game-status final">🎉 انتهت اللعبة! نتيجتك: <strong>${score}</strong> من ${totalRounds}</p>
                <div style="text-align:center; margin-top:14px;">
                    <button class="pomo-btn start" id="wordRestart"><i class="fas fa-redo"></i> العب مرة ثانية</button>
                </div>
            `;
            document.getElementById('wordRestart').addEventListener('click', () => {
                score = 0;
                round = 0;
                newRound();
            });
        }
    }

    // ==========================================
    // اللعبة 4: ردة الفعل 🎯 — بنظام حالات نظيف (الإصلاح الكامل)
    // ==========================================
    function startReaction() {
        // الحالات: idle (جاهزة) → waiting (حمراء، انتظار) → go (خضراء!)
        let state = 'idle';
        let startTime = 0;
        let timeoutId = null;
        let best = null;

        gameContent.innerHTML = `
            <div class="reaction-box" id="reactionBox">
                <span class="reaction-text" id="reactionText">اضغط للبدء 👆</span>
            </div>
            <p class="game-status" id="reactionResult"></p>
        `;

        const box = document.getElementById('reactionBox');
        const text = document.getElementById('reactionText');
        const result = document.getElementById('reactionResult');

        box.addEventListener('click', () => {

            if (state === 'idle') {
                // بدء جولة جديدة
                state = 'waiting';
                result.innerText = '';
                box.classList.remove('go');
                text.innerText = 'استعدي... انتظري الأخضر ⏳';
                timeoutId = setTimeout(() => {
                    state = 'go';
                    box.classList.add('go');
                    text.innerText = 'اضغط الآن! 🟢';
                    startTime = performance.now();
                }, 1500 + Math.random() * 3500);
            }
            else if (state === 'waiting') {
                // ضغطة مبكرة — نلغي الجولة لكن اللعبة تستمر!
                clearTimeout(timeoutId);
                state = 'idle';
                box.classList.remove('go');
                text.innerText = '😅 مبكر جدًا! اضغط للمحاولة من جديد';
            }
            else if (state === 'go') {
                // نجاح!
                const ms = Math.round(performance.now() - startTime);
                if (best === null || ms < best) best = ms;
                const rank = ms < 250 ? '🚀 خارقة!' : ms < 400 ? '⚡ ممتازة!' : ms < 600 ? '👍 جيدة' : '🐢 على مهالك';
                result.innerHTML = `ردة فعلك: <strong>${ms}</strong> مللي ثانية — ${rank} &nbsp;|&nbsp; أفضل زمن لك: <strong>${best}</strong> ⭐`;
                state = 'idle';
                box.classList.remove('go');
                text.innerText = 'اضغط للعب مرة أخرى';
            }
        });
    }

    // لعبة الأنماط: خمس جولات، مع تسلسلات حسابية وبصرية بسيطة.
    function startPattern() {
        const puzzles = [
            { seq: '2، 4، 6، 8، ؟', answer: '10', choices: ['9', '10', '12', '16'] },
            { seq: '3، 6، 12، 24، ؟', answer: '48', choices: ['36', '42', '48', '50'] },
            { seq: '1، 1، 2، 3، 5، ؟', answer: '8', choices: ['7', '8', '9', '10'] },
            { seq: '20، 17، 14، 11، ؟', answer: '8', choices: ['6', '7', '8', '9'] },
            { seq: '1، 4، 9، 16، ؟', answer: '25', choices: ['20', '24', '25', '36'] },
            { seq: '5، 10، 20، 40، ؟', answer: '80', choices: ['60', '70', '80', '90'] },
            { seq: '2، 5، 8، 11، ؟', answer: '14', choices: ['12', '13', '14', '15'] }
        ];
        let pool = [...puzzles].sort(() => Math.random() - 0.5).slice(0, 5);
        let round = 0;
        let score = 0;

        function showRound() {
            if (round >= pool.length) return finish();
            const puzzle = pool[round];
            gameContent.innerHTML = `
                <div class="math-hud"><span>الجولة <strong>${round + 1}</strong> من 5</span><span>النقاط: <strong>${score}</strong></span></div>
                <p class="math-question">${puzzle.seq}</p>
                <div class="math-answers" id="patternAnswers"></div>
                <p class="game-feedback" id="patternFeedback" aria-live="polite"></p>`;
            const answers = document.getElementById('patternAnswers');
            puzzle.choices.forEach(choice => {
                const button = document.createElement('button');
                button.className = 'math-answer-btn';
                button.textContent = choice;
                button.addEventListener('click', () => {
                    answers.querySelectorAll('button').forEach(item => item.disabled = true);
                    const feedback = document.getElementById('patternFeedback');
                    if (choice === puzzle.answer) {
                        score++;
                        button.classList.add('correct');
                        feedback.textContent = 'صحيح! أحسنتِ 🌟';
                        feedback.className = 'game-feedback success';
                    } else {
                        button.classList.add('wrong');
                        feedback.textContent = `الإجابة ${puzzle.answer} — حاول في الجولة القادمة`;
                        feedback.className = 'game-feedback fail';
                    }
                    round++;
                    setTimeout(showRound, 850);
                });
                answers.appendChild(button);
            });
        }

        function finish() {
            gameContent.innerHTML = `<p class="game-status final">انتهى التحدي! نتيجتك <strong>${score}</strong> من 5 🧩</p>
                <div style="text-align:center;margin-top:14px"><button class="pomo-btn start" id="patternRestart">العب مرة ثانية</button></div>`;
            document.getElementById('patternRestart').addEventListener('click', startPattern);
        }
        showRound();
    }

    // لعبة ملاحظة بصرية: ثلاث عناصر من فئة وعنصر واحد مختلف.
    function startOddOne() {
        const puzzles = [
            { items: ['🍎', '🍐', '🍊', '🥕'], odd: '🥕' },
            { items: ['🐱', '🐶', '🐰', '🌷'], odd: '🌷' },
            { items: ['📚', '📖', '📘', '⚽'], odd: '⚽' },
            { items: ['🌙', '⭐', '☀️', '🍓'], odd: '🍓' },
            { items: ['✏️', '🖊️', '📏', '🍪'], odd: '🍪' },
            { items: ['🚗', '🚌', '🚲', '🐠'], odd: '🐠' }
        ];
        let pool = [...puzzles].sort(() => Math.random() - 0.5).slice(0, 5);
        let round = 0;
        let score = 0;

        function showRound() {
            if (round >= pool.length) return finish();
            const puzzle = pool[round];
            const items = [...puzzle.items].sort(() => Math.random() - 0.5);
            gameContent.innerHTML = `
                <div class="math-hud"><span>الجولة <strong>${round + 1}</strong> من 5</span><span>النقاط: <strong>${score}</strong></span></div>
                <p class="game-status">أي عنصر لا ينتمي للمجموعة؟</p>
                <div class="math-answers" id="oddAnswers"></div>
                <p class="game-feedback" id="oddFeedback" aria-live="polite"></p>`;
            const answers = document.getElementById('oddAnswers');
            items.forEach(item => {
                const button = document.createElement('button');
                button.className = 'math-answer-btn';
                button.textContent = item;
                button.style.fontSize = '2rem';
                button.setAttribute('aria-label', `اختيار ${item}`);
                button.addEventListener('click', () => {
                    answers.querySelectorAll('button').forEach(choice => choice.disabled = true);
                    const feedback = document.getElementById('oddFeedback');
                    if (item === puzzle.odd) {
                        score++;
                        button.classList.add('correct');
                        feedback.textContent = 'صحيح! ملاحظتك قوية 👀';
                        feedback.className = 'game-feedback success';
                    } else {
                        button.classList.add('wrong');
                        feedback.textContent = `العنصر المختلف هو ${puzzle.odd}`;
                        feedback.className = 'game-feedback fail';
                    }
                    round++;
                    setTimeout(showRound, 850);
                });
                answers.appendChild(button);
            });
        }

        function finish() {
            gameContent.innerHTML = `<p class="game-status final">انتهت اللعبة! نتيجتك <strong>${score}</strong> من 5 👀</p>
                <div style="text-align:center;margin-top:14px"><button class="pomo-btn start" id="oddRestart">العب مرة ثانية</button></div>`;
            document.getElementById('oddRestart').addEventListener('click', startOddOne);
        }
        showRound();
    }
});
