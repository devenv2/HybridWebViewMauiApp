// محرك JavaScript للمعالجة في الخلفية
// لا نحتاج لأي عناصر HTML - فقط معالجة البيانات

// عندما يتم تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log("محرك JavaScript جاهز!");
    
    // إرسال رسالة إلى C# أن المحرك جاهز
    window.HybridWebView.SendRawMessage('ENGINE_READY');
});

// ==========================================
// دوال الحاسبة الأساسية
// ==========================================

// جمع رقمين
function add(a, b) {
    const result = a + b;
    window.HybridWebView.SendRawMessage(`CALC_RESULT:${result}`);
    return result;
}

// طرح رقمين
function subtract(a, b) {
    const result = a - b;
    window.HybridWebView.SendRawMessage(`CALC_RESULT:${result}`);
    return result;
}

// ضرب رقمين
function multiply(a, b) {
    const result = a * b;
    window.HybridWebView.SendRawMessage(`CALC_RESULT:${result}`);
    return result;
}

// قسمة رقمين
function divide(a, b) {
    if (b === 0) {
        window.HybridWebView.SendRawMessage('ERROR:Cannot divide by zero');
        return null;
    }
    const result = a / b;
    window.HybridWebView.SendRawMessage(`CALC_RESULT:${result}`);
    return result;
}

// ==========================================
// دوال رياضية متقدمة
// ==========================================

// حساب الجذر التربيعي
function sqrt(n) {
    const result = Math.sqrt(n);
    window.HybridWebView.SendRawMessage(`MATH_RESULT:sqrt(${n}) = ${result}`);
    return result;
}

// حساب القوة
function power(base, exponent) {
    const result = Math.pow(base, exponent);
    window.HybridWebView.SendRawMessage(`MATH_RESULT:${base}^${exponent} = ${result}`);
    return result;
}

// حساب المعامل (factorial)
function factorial(n) {
    if (n < 0) {
        window.HybridWebView.SendRawMessage('ERROR:Factorial of negative number');
        return null;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    window.HybridWebView.SendRawMessage(`MATH_RESULT:${n}! = ${result}`);
    return result;
}

// ==========================================
// دوال معالجة البيانات
// ==========================================

// معالجة مصفوفة من الأرقام
function processArray(numbers) {
    const stats = {
        sum: numbers.reduce((a, b) => a + b, 0),
        average: numbers.reduce((a, b) => a + b, 0) / numbers.length,
        max: Math.max(...numbers),
        min: Math.min(...numbers),
        count: numbers.length
    };
    
    window.HybridWebView.SendRawMessage(`ARRAY_STATS:${JSON.stringify(stats)}`);
    return stats;
}

// ==========================================
// دوال للتواصل مع C#
// ==========================================

// دالة عامة لتنفيذ أي عملية
function execute(operation, params) {
    try {
        let result;
        
        switch(operation) {
            case 'add':
                result = add(params[0], params[1]);
                break;
            case 'subtract':
                result = subtract(params[0], params[1]);
                break;
            case 'multiply':
                result = multiply(params[0], params[1]);
                break;
            case 'divide':
                result = divide(params[0], params[1]);
                break;
            case 'sqrt':
                result = sqrt(params[0]);
                break;
            case 'power':
                result = power(params[0], params[1]);
                break;
            case 'factorial':
                result = factorial(params[0]);
                break;
            case 'processArray':
                result = processArray(params);
                break;
            default:
                window.HybridWebView.SendRawMessage(`ERROR:Unknown operation ${operation}`);
                return null;
        }
        
        return result;
    } catch (error) {
        window.HybridWebView.SendRawMessage(`ERROR:${error.message}`);
        return null;
    }
}

// ==========================================
// مثال على استخدام مكتبة خارجية
// ==========================================

// لو أردنا استخدام مكتبة موسيقى مثلاً
function playNote(note, duration) {
    // هنا يمكن استخدام مكتبة Tone.js مثلاً
    // const synth = new Tone.Synth().toDestination();
    // synth.triggerAttackRelease(note, duration);
    
    window.HybridWebView.SendRawMessage(`MUSIC:Playing ${note} for ${duration}`);
    return `${note}-${duration}`;
}

// دالة لتحليل الأوتار الموسيقية
function analyzeChord(notes) {
    // هنا يمكن استخدام مكتبة نظرية الموسيقى
    // const chord = Chord.detect(notes);
    
    const mockResult = {
        notes: notes,
        type: "Major", // مثال
        root: notes[0]
    };
    
    window.HybridWebView.SendRawMessage(`MUSIC_ANALYSIS:${JSON.stringify(mockResult)}`);
    return mockResult;
}

// ==========================================
// تصدير الدوال للاستخدام من C#
// ==========================================
window.JSEngine = {
    // دوال الحساب
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    
    // دوال رياضية
    sqrt: sqrt,
    power: power,
    factorial: factorial,
    
    // معالجة البيانات
    processArray: processArray,
    
    // دالة عامة
    execute: execute,
    
    // دوال الموسيقى (أمثلة)
    playNote: playNote,
    analyzeChord: analyzeChord
};

// رسالة للتأكيد
console.log('JavaScript Engine loaded with functions:', Object.keys(window.JSEngine));