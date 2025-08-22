// مثال على مكتبة رياضيات متقدمة يمكن استخدامها في MAUI
// يمكن استبدالها بأي مكتبة JavaScript حقيقية

// ==========================================
// مكتبة الرياضيات المتقدمة
// ==========================================

window.AdvancedMath = {
    
    // حساب التكامل العددي (Numerical Integration)
    integrate: function(func, a, b, n = 1000) {
        const h = (b - a) / n;
        let sum = 0;
        
        for (let i = 0; i < n; i++) {
            const x = a + i * h;
            sum += func(x) * h;
        }
        
        return sum;
    },
    
    // حساب المشتقة العددية (Numerical Derivative)
    derivative: function(func, x, h = 0.0001) {
        return (func(x + h) - func(x - h)) / (2 * h);
    },
    
    // حل المعادلات باستخدام Newton-Raphson
    solveEquation: function(func, derivative, x0, tolerance = 0.0001, maxIterations = 100) {
        let x = x0;
        
        for (let i = 0; i < maxIterations; i++) {
            const fx = func(x);
            
            if (Math.abs(fx) < tolerance) {
                return x;
            }
            
            const fpx = derivative(x);
            
            if (fpx === 0) {
                throw new Error("Derivative is zero");
            }
            
            x = x - fx / fpx;
        }
        
        throw new Error("Max iterations reached");
    },
    
    // حساب الانحراف المعياري
    standardDeviation: function(numbers) {
        const mean = numbers.reduce((a, b) => a + b) / numbers.length;
        const squaredDiffs = numbers.map(x => Math.pow(x - mean, 2));
        const avgSquaredDiff = squaredDiffs.reduce((a, b) => a + b) / numbers.length;
        return Math.sqrt(avgSquaredDiff);
    },
    
    // الانحدار الخطي البسيط
    linearRegression: function(xValues, yValues) {
        const n = xValues.length;
        const sumX = xValues.reduce((a, b) => a + b, 0);
        const sumY = yValues.reduce((a, b) => a + b, 0);
        const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
        const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        return { slope, intercept };
    },
    
    // مصفوفة فيبوناتشي
    fibonacci: function(n) {
        const result = [0, 1];
        for (let i = 2; i <= n; i++) {
            result.push(result[i - 1] + result[i - 2]);
        }
        return result.slice(0, n + 1);
    },
    
    // الأعداد الأولية
    isPrime: function(n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
        
        let i = 5;
        while (i * i <= n) {
            if (n % i === 0 || n % (i + 2) === 0) return false;
            i += 6;
        }
        return true;
    },
    
    // توليد أعداد أولية حتى n
    generatePrimes: function(n) {
        const primes = [];
        for (let i = 2; i <= n; i++) {
            if (this.isPrime(i)) {
                primes.push(i);
            }
        }
        return primes;
    }
};

// ==========================================
// دوال للتواصل مع C#
// ==========================================

window.MathEngine = {
    
    // حساب تكامل دالة x^2 من 0 إلى 1
    testIntegration: function() {
        const result = AdvancedMath.integrate(x => x * x, 0, 1);
        window.HybridWebView.SendRawMessage(`INTEGRATION:∫x² dx from 0 to 1 = ${result}`);
        return result;
    },
    
    // حساب الانحراف المعياري
    calculateStdDev: function(numbers) {
        const result = AdvancedMath.standardDeviation(numbers);
        window.HybridWebView.SendRawMessage(`STD_DEV:σ = ${result}`);
        return result;
    },
    
    // الانحدار الخطي
    performRegression: function(xValues, yValues) {
        const result = AdvancedMath.linearRegression(xValues, yValues);
        window.HybridWebView.SendRawMessage(`REGRESSION:y = ${result.slope}x + ${result.intercept}`);
        return result;
    },
    
    // سلسلة فيبوناتشي
    getFibonacci: function(n) {
        const result = AdvancedMath.fibonacci(n);
        window.HybridWebView.SendRawMessage(`FIBONACCI:First ${n+1} numbers: [${result.join(', ')}]`);
        return result;
    },
    
    // الأعداد الأولية
    getPrimes: function(n) {
        const result = AdvancedMath.generatePrimes(n);
        window.HybridWebView.SendRawMessage(`PRIMES:Primes up to ${n}: [${result.join(', ')}]`);
        return result;
    }
};

console.log('Advanced Math Library loaded!');