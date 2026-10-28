document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('calcDisplay');
    const historyEl = document.getElementById('calcHistory');
    const buttons = document.getElementById('calcButtons');
    const modeButton = document.getElementById('angleMode');
    const memoryStatus = document.getElementById('memoryStatus');
    const historyList = document.getElementById('calcHistoryList');
    if (!display || !buttons) return;

    let answer = 0;
    let memory = 0;
    let degrees = true;
    let lastWasResult = false;
    const history = [];
    const knownFunctions = new Set(['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sqrt', 'ln', 'log', 'abs']);

    function tokenize(expression) {
        const normalized = expression.replace(/[×]/g, '*').replace(/[÷]/g, '/').replace(/[−]/g, '-').replace(/π/g, 'pi');
        const tokens = normalized.match(/(?:\d+(?:\.\d*)?|\.\d+)|(?:[a-zA-Z]+)|[+\-*/^()%!]/g) || [];
        const residue = normalized.replace(/(?:\d+(?:\.\d*)?|\.\d+)|(?:[a-zA-Z]+)|[+\-*/^()%!]|\s+/g, '');
        if (residue) throw new Error('فيه رمز غير معروف في العملية');
        return tokens.map(token => /^[a-z]+$/i.test(token) ? token.toLowerCase() : token);
    }

    function evaluate(expression) {
        const tokens = tokenize(expression.replace(/\bAns\b/gi, 'ans'));
        if (!tokens.length) throw new Error('اكتب عملية أولًا');
        let index = 0;
        const peek = () => tokens[index];
        const take = () => tokens[index++];
        const expect = (token) => {
            if (take() !== token) throw new Error('راجعي الأقواس في العملية');
        };
        const startsPrimary = token => token === '(' || token === 'pi' || token === 'e' || token === 'ans' || knownFunctions.has(token) || (token && (/^(?:\d|\.)/.test(token)));

        function expressionRule() {
            let value = termRule();
            while (peek() === '+' || peek() === '-') {
                const op = take();
                const right = termRule();
                value = op === '+' ? value + right : value - right;
            }
            return value;
        }

        function termRule() {
            let value = unaryRule();
            while (true) {
                const op = peek();
                if (op === '*' || op === '/' || op === 'mod') {
                    take();
                    const right = unaryRule();
                    if ((op === '/' || op === 'mod') && right === 0) throw new Error('ما نقدر نقسم على صفر');
                    value = op === '*' ? value * right : op === '/' ? value / right : value % right;
                } else if (startsPrimary(op)) {
                    value *= unaryRule();
                } else break;
            }
            return value;
        }

        function unaryRule() {
            if (peek() === '+') { take(); return unaryRule(); }
            if (peek() === '-') { take(); return -unaryRule(); }
            return powerRule();
        }

        function powerRule() {
            let value = postfixRule();
            if (peek() === '^') {
                take();
                value = value ** unaryRule();
            }
            return value;
        }

        function postfixRule() {
            let value = primaryRule();
            while (peek() === '!' || peek() === '%') {
                const op = take();
                if (op === '%') value /= 100;
                else {
                    if (!Number.isInteger(value) || value < 0 || value > 170) throw new Error('المضروب يقبل أعدادًا صحيحة من 0 إلى 170');
                    let product = 1;
                    for (let n = 2; n <= value; n += 1) product *= n;
                    value = product;
                }
            }
            return value;
        }

        function primaryRule() {
            const token = take();
            if (token === '(') {
                const value = expressionRule();
                expect(')');
                return value;
            }
            if (token === 'pi') return Math.PI;
            if (token === 'e') return Math.E;
            if (token === 'ans') return answer;
            if (knownFunctions.has(token)) {
                if (peek() !== '(') throw new Error('اكتب قوسًا بعد اسم الدالة');
                take();
                const value = expressionRule();
                expect(')');
                if (token === 'sqrt') return Math.sqrt(value);
                if (token === 'ln') return Math.log(value);
                if (token === 'log') return Math.log10(value);
                if (token === 'abs') return Math.abs(value);
                if (token === 'sin') return Math.sin(degrees ? value * Math.PI / 180 : value);
                if (token === 'cos') return Math.cos(degrees ? value * Math.PI / 180 : value);
                if (token === 'tan') return Math.tan(degrees ? value * Math.PI / 180 : value);
                if (token === 'asin') return (degrees ? 180 / Math.PI : 1) * Math.asin(value);
                if (token === 'acos') return (degrees ? 180 / Math.PI : 1) * Math.acos(value);
                if (token === 'atan') return (degrees ? 180 / Math.PI : 1) * Math.atan(value);
            }
            if (token && /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(token)) return Number(token);
            throw new Error('العملية غير مكتملة أو فيها رمز غير معروف');
        }

        const result = expressionRule();
        if (index < tokens.length) throw new Error('راجعي ترتيب العملية والأقواس');
        if (!Number.isFinite(result)) throw new Error('الناتج خارج المجال الحسابي');
        return Object.is(result, -0) ? 0 : result;
    }

    function format(value) {
        if (Number.isInteger(value) && Math.abs(value) < 1e15) return String(value);
        return Number(value.toPrecision(12)).toString();
    }

    function renderMemory() {
        memoryStatus.textContent = memory === 0 ? 'الذاكرة فارغة' : `M = ${format(memory)}`;
    }

    function setExpression(text) {
        display.value = text || '0';
        display.focus();
        display.setSelectionRange(display.value.length, display.value.length);
    }

    function addHistory(expression, result) {
        const item = { expression, result: format(result) };
        history.unshift(item);
        history.splice(12);
        historyEl.textContent = `${expression} =`;
        historyList.replaceChildren();
        history.forEach(entry => {
            const row = document.createElement('button');
            row.type = 'button';
            row.className = 'calc-history-item';
            row.textContent = `${entry.expression} = ${entry.result}`;
            row.title = 'اضغط لإعادة العملية';
            row.addEventListener('click', () => setExpression(entry.expression));
            historyList.appendChild(row);
        });
    }

    function calculate() {
        const expression = display.value.trim();
        try {
            const result = evaluate(expression);
            answer = result;
            display.value = format(result);
            addHistory(expression, result);
            lastWasResult = true;
        } catch (error) {
            historyEl.textContent = error.message || 'تعذر حساب العملية';
            lastWasResult = false;
        }
    }

    function insert(value) {
        const startsNew = /^(?:\d|\.|sin\(|cos\(|tan\(|asin\(|acos\(|atan\(|sqrt\(|log\(|ln\(|abs\(|π|e|Ans|\()/.test(value);
        if (lastWasResult && startsNew) { display.value = ''; display.setSelectionRange(0, 0); }
        else if (lastWasResult && display.value === '0') setExpression('');
        lastWasResult = false;
        let start = display.selectionStart ?? display.value.length;
        let end = display.selectionEnd ?? start;
        if (display.value === '0') {
            display.value = '';
            start = 0;
            end = 0;
        }
        display.setRangeText(value, start, end, 'end');
        display.focus();
        historyEl.textContent = '';
    }

    function toggleSign() {
        const value = display.value.trim();
        if (!value || value === '0' || value === '−') setExpression(value === '−' ? '0' : '−');
        else if (value.startsWith('−(') && value.endsWith(')')) setExpression(value.slice(2, -1));
        else setExpression(`−(${value})`);
        lastWasResult = false;
    }
    function clearAll() {
        display.value = '0';
        historyEl.textContent = '';
        lastWasResult = false;
        display.focus();
    }

    function backspace() {
        if (lastWasResult) return clearAll();
        const start = display.selectionStart ?? display.value.length;
        const end = display.selectionEnd ?? start;
        if (start !== end) display.setRangeText('', start, end, 'end');
        else if (start > 0) display.setRangeText('', start - 1, start, 'end');
        if (!display.value) display.value = '0';
        display.focus();
        lastWasResult = false;
    }

    buttons.addEventListener('click', async event => {
        const button = event.target.closest('button');
        if (!button) return;
        if (button.dataset.num !== undefined) insert(button.dataset.num);
        else if (button.dataset.op) insert(button.dataset.op);
        else if (button.dataset.insert !== undefined) insert(button.dataset.insert);
        else if (button.dataset.action === 'equals') calculate();
        else if (button.dataset.action === 'clear') clearAll();
        else if (button.dataset.action === 'back') backspace();
        else if (button.dataset.action === 'sign') toggleSign();
        else if (button.dataset.action === 'memory-clear') { memory = 0; renderMemory(); }
        else if (button.dataset.action === 'memory-recall') insert(format(memory));
        else if (button.dataset.action === 'memory-add' || button.dataset.action === 'memory-subtract') {
            try {
                const value = evaluate(display.value);
                memory += button.dataset.action === 'memory-add' ? value : -value;
                renderMemory();
            } catch (error) { historyEl.textContent = 'أكملي العملية أولاً ثم استخدمي الذاكرة'; }
        } else if (button.dataset.action === 'copy') {
            try {
                await navigator.clipboard.writeText(display.value);
                historyEl.textContent = 'تم نسخ الناتج';
            } catch { historyEl.textContent = 'حددي الناتج وانسخيه من لوحة المفاتيح'; }
        }
    });

    display.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === '=') { event.preventDefault(); calculate(); }
        if (event.key === 'Escape') clearAll();
    });
    display.addEventListener('input', () => { lastWasResult = false; historyEl.textContent = ''; });
    document.addEventListener('keydown', event => {
        if (event.target === display || event.target.matches('input, textarea, select, [contenteditable="true"]')) return;
        if (event.key === 'Enter' || event.key === '=') calculate();
        else if (event.key === 'Escape') clearAll();
    });

    modeButton.addEventListener('click', () => {
        degrees = !degrees;
        modeButton.textContent = degrees ? 'DEG' : 'RAD';
        modeButton.setAttribute('aria-label', degrees ? 'الوضع بالدرجات' : 'الوضع بالراديان');
    });
    document.getElementById('clearCalcHistory')?.addEventListener('click', () => {
        history.length = 0;
        historyEl.textContent = '';
        historyList.innerHTML = '<p class="history-empty">عملياتك الأخيرة بتظهر هنا</p>';
    });
    renderMemory();
});