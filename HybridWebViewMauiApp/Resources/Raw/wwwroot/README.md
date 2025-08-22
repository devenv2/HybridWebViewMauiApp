# هيكل مشروع HybridWebView

## 📁 تنظيم الملفات:

```
wwwroot/
├── index.html          # الصفحة الرئيسية
├── scripts/           
│   ├── HybridWebView.js   # مكتبة التواصل مع C#
│   └── calculator.js       # منطق الحاسبة
└── styles/
    └── styles.css          # التنسيقات والأنماط
```

## 🔄 كيفية التواصل:

### من C# إلى JavaScript:
```csharp
// استدعاء دالة JavaScript
await hybridWebView.EvaluateJavaScriptAsync("calculateSum(10, 20)");

// الحصول على قيمة
string result = await hybridWebView.EvaluateJavaScriptAsync("getDirectSum(5, 3)");
```

### من JavaScript إلى C#:
```javascript
// إرسال رسالة
window.HybridWebView.SendRawMessage('DOM loaded');
window.HybridWebView.SendRawMessage('Result: 15 + 25 = 40');
```

## 🎯 الدوال المتاحة في JavaScript:

- `calculateSum(num1, num2)` - حساب المجموع وإرسال النتيجة
- `getDirectSum(num1, num2)` - إرجاع المجموع مباشرة
- `setBackgroundColor(color)` - تغيير لون الخلفية
- `updateResult(text)` - تحديث النص في الصفحة
- `reset()` - إعادة تعيين الصفحة

## 📝 ملاحظات:
- الملفات منفصلة لسهولة الصيانة
- CSS في ملف منفصل للتنسيقات
- JavaScript منظم في ملفات حسب الوظيفة
- سهل التطوير والتوسع