namespace HybridWebViewMauiApp
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        private async void OnHybridWebViewRawMessageReceived(object sender, HybridWebViewRawMessageReceivedEventArgs e)
        {
            await MainThread.InvokeOnMainThreadAsync(() =>
            {
                string message = e.Message;
                
                // معالجة الرسائل المختلفة
                if (message == "ENGINE_READY")
                {
                    MessageLabel.Text = "✅ محرك JavaScript جاهز!\n";
                    MessageLabel.Text += "📚 المكتبات المحملة:\n";
                    MessageLabel.Text += "  • محرك الحسابات الأساسي\n";
                    MessageLabel.Text += "  • مكتبة الرياضيات المتقدمة\n";
                    MessageLabel.Text += "  • مكتبة نظرية الموسيقى\n\n";
                    ShowAllButtons();
                }
                else if (message.StartsWith("CALC_RESULT:"))
                {
                    string result = message.Replace("CALC_RESULT:", "");
                    MessageLabel.Text += $"📊 النتيجة: {result}\n";
                }
                else if (message.StartsWith("MATH_RESULT:"))
                {
                    string result = message.Replace("MATH_RESULT:", "");
                    MessageLabel.Text += $"🔢 {result}\n";
                }
                else if (message.StartsWith("INTEGRATION:"))
                {
                    string result = message.Replace("INTEGRATION:", "");
                    MessageLabel.Text += $"∫ {result}\n";
                }
                else if (message.StartsWith("STD_DEV:"))
                {
                    string result = message.Replace("STD_DEV:", "");
                    MessageLabel.Text += $"📊 الانحراف المعياري: {result}\n";
                }
                else if (message.StartsWith("REGRESSION:"))
                {
                    string result = message.Replace("REGRESSION:", "");
                    MessageLabel.Text += $"📈 معادلة الانحدار: {result}\n";
                }
                else if (message.StartsWith("FIBONACCI:"))
                {
                    string result = message.Replace("FIBONACCI:", "");
                    MessageLabel.Text += $"🔢 {result}\n";
                }
                else if (message.StartsWith("PRIMES:"))
                {
                    string result = message.Replace("PRIMES:", "");
                    MessageLabel.Text += $"🔢 {result}\n";
                }
                else if (message.StartsWith("SCALE:"))
                {
                    string result = message.Replace("SCALE:", "");
                    MessageLabel.Text += $"🎼 السلم الموسيقي: {result}\n";
                }
                else if (message.StartsWith("CHORD:"))
                {
                    string result = message.Replace("CHORD:", "");
                    MessageLabel.Text += $"🎵 الكورد: {result}\n";
                }
                else if (message.StartsWith("CHORD_ANALYSIS:"))
                {
                    string result = message.Replace("CHORD_ANALYSIS:", "");
                    MessageLabel.Text += $"🎹 تحليل الكورد:\n{FormatJson(result)}\n";
                }
                else if (message.StartsWith("FREQUENCY:"))
                {
                    string result = message.Replace("FREQUENCY:", "");
                    MessageLabel.Text += $"📻 التردد: {result}\n";
                }
                else if (message.StartsWith("PLAYING:"))
                {
                    string result = message.Replace("PLAYING:", "");
                    MessageLabel.Text += $"▶️ {result}\n";
                }
                else if (message.StartsWith("ERROR:"))
                {
                    string error = message.Replace("ERROR:", "");
                    MessageLabel.Text += $"❌ خطأ: {error}\n";
                }
            });
        }

        private void ShowAllButtons()
        {
            AddButton.IsVisible = true;
            SubtractButton.IsVisible = true;
            MultiplyButton.IsVisible = true;
            DivideButton.IsVisible = true;
            SqrtButton.IsVisible = true;
            FactorialButton.IsVisible = true;
            MusicButton.IsVisible = true;
            ArrayButton.IsVisible = true;
        }

        // العمليات الحسابية الأساسية
        private async void OnAddClicked(object sender, EventArgs e)
        {
            MessageLabel.Text += "\n➕ جمع 15 + 25:\n";
            await hybridWebView.EvaluateJavaScriptAsync("JSEngine.add(15, 25)");
        }

        private async void OnSubtractClicked(object sender, EventArgs e)
        {
            MessageLabel.Text += "\n➖ طرح 50 - 20:\n";
            await hybridWebView.EvaluateJavaScriptAsync("JSEngine.subtract(50, 20)");
        }

        private async void OnMultiplyClicked(object sender, EventArgs e)
        {
            MessageLabel.Text += "\n✖️ ضرب 7 × 8:\n";
            await hybridWebView.EvaluateJavaScriptAsync("JSEngine.multiply(7, 8)");
        }

        private async void OnDivideClicked(object sender, EventArgs e)
        {
            MessageLabel.Text += "\n➗ قسمة 100 ÷ 4:\n";
            await hybridWebView.EvaluateJavaScriptAsync("JSEngine.divide(100, 4)");
        }

        private async void OnSqrtClicked(object sender, EventArgs e)
        {
            MessageLabel.Text += "\n🔢 رياضيات متقدمة:\n";
            
            // جذر تربيعي
            await hybridWebView.EvaluateJavaScriptAsync("JSEngine.sqrt(144)");
            
            // تكامل
            await Task.Delay(300);
            await hybridWebView.EvaluateJavaScriptAsync("MathEngine.testIntegration()");
            
            // فيبوناتشي
            await Task.Delay(300);
            await hybridWebView.EvaluateJavaScriptAsync("MathEngine.getFibonacci(10)");
        }

        private async void OnFactorialClicked(object sender, EventArgs e)
        {
            MessageLabel.Text += "\n🔢 عمليات رياضية:\n";
            
            // معامل
            await hybridWebView.EvaluateJavaScriptAsync("JSEngine.factorial(5)");
            
            // أعداد أولية
            await Task.Delay(300);
            await hybridWebView.EvaluateJavaScriptAsync("MathEngine.getPrimes(20)");
        }

        // مثال على الموسيقى
        private async void OnMusicExample(object sender, EventArgs e)
        {
            MessageLabel.Text += "\n🎵 نظرية الموسيقى:\n";
            
            // سلم C Major
            await hybridWebView.EvaluateJavaScriptAsync("MusicEngine.getMusicalScale('C', 'major')");
            
            // كورد G Major
            await Task.Delay(300);
            await hybridWebView.EvaluateJavaScriptAsync("MusicEngine.getMusicalChord('G', 'major')");
            
            // تحليل كورد
            await Task.Delay(300);
            await hybridWebView.EvaluateJavaScriptAsync("MusicEngine.analyzeMusicalChord(['C', 'E', 'G'])");
            
            // حساب التردد
            await Task.Delay(300);
            await hybridWebView.EvaluateJavaScriptAsync("MusicEngine.calculateFrequency('A', 4)");
            
            // تشغيل تسلسل
            await Task.Delay(300);
            await hybridWebView.EvaluateJavaScriptAsync("MusicEngine.playSequence(['C', 'D', 'E', 'F', 'G'], 120)");
        }

        // معالجة مصفوفة
        private async void OnArrayProcess(object sender, EventArgs e)
        {
            MessageLabel.Text += "\n📊 تحليل البيانات:\n";
            
            // إحصائيات المصفوفة
            await hybridWebView.EvaluateJavaScriptAsync("JSEngine.processArray([10, 25, 5, 30, 15, 20])");
            
            // انحراف معياري
            await Task.Delay(300);
            await hybridWebView.EvaluateJavaScriptAsync("MathEngine.calculateStdDev([10, 25, 5, 30, 15, 20])");
            
            // انحدار خطي
            await Task.Delay(300);
            string jsCode = "MathEngine.performRegression([1,2,3,4,5], [2,4,6,8,10])";
            await hybridWebView.EvaluateJavaScriptAsync(jsCode);
        }

        // تنسيق JSON للعرض
        private string FormatJson(string json)
        {
            try
            {
                var obj = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, object>>(json);
                var formatted = "";
                foreach (var item in obj)
                {
                    formatted += $"  • {item.Key}: {item.Value}\n";
                }
                return formatted;
            }
            catch
            {
                return json;
            }
        }
    }
}