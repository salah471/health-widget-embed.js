/**
 * الأداة الصحية التفاعلية - كود الدمج
 * يمكن إضافة هذا الكود إلى أي موقع لعرض الأداة الصحية
 */

(function() {
    'use strict';

    // التحقق من وجود الأداة مسبقاً
    if (window.HealthWidgetLoaded) {
        return;
    }
    window.HealthWidgetLoaded = true;

    // إنشاء CSS للأداة
    const widgetCSS = `
        .health-widget-container {
            font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1200px;
            margin: 20px auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            backdrop-filter: blur(10px);
            direction: rtl;
        }
        
        .health-widget-header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            padding: 30px;
            text-align: center;
            color: white;
        }
        
        .health-widget-title {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }
        
        .health-widget-subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .health-cards-container {
            padding: 40px 20px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }
        
        .health-card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            border: 2px solid transparent;
        }
        
        .health-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            border-color: #4facfe;
        }
        
        .health-card-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            font-size: 1.8rem;
            color: white;
        }
        
        .health-card-title {
            font-size: 1.4rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 10px;
        }
        
        .health-card-description {
            color: #718096;
            line-height: 1.6;
            margin-bottom: 20px;
            font-size: 0.95rem;
        }
        
        .health-card-badge {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            display: inline-block;
        }
        
        .health-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .health-modal-content {
            background: white;
            border-radius: 15px;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            width: 100%;
        }
        
        .health-modal-header {
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            border-radius: 15px 15px 0 0;
        }
        
        .health-modal-close {
            font-size: 24px;
            cursor: pointer;
            background: none;
            border: none;
            color: white;
            padding: 5px;
        }
        
        .health-modal-body {
            padding: 20px;
            line-height: 1.6;
        }
        
        .health-form {
            background: #f7fafc;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .health-form-group {
            margin-bottom: 15px;
        }
        
        .health-form-label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #2d3748;
        }
        
        .health-form-input, .health-form-select {
            width: 100%;
            padding: 10px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            font-family: inherit;
        }
        
        .health-form-button {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .health-form-button:hover {
            transform: translateY(-2px);
        }
        
        .health-result {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .health-widget-container {
                margin: 10px;
                border-radius: 15px;
            }
            
            .health-widget-header {
                padding: 20px;
            }
            
            .health-widget-title {
                font-size: 1.8rem;
            }
            
            .health-cards-container {
                padding: 20px 10px;
                grid-template-columns: 1fr;
            }
            
            .health-card {
                padding: 20px;
            }
        }
    `;

    // إضافة CSS إلى الصفحة
    const styleSheet = document.createElement('style');
    styleSheet.textContent = widgetCSS;
    document.head.appendChild(styleSheet);

    // إضافة خط Cairo
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // بيانات الأداة
    const widgetData = {
        medications: [
            {
                id: 'paracetamol',
                nameAr: 'باراسيتامول',
                nameEn: 'Paracetamol',
                category: 'مسكنات الألم وخافضات الحرارة',
                description: 'دواء مسكن للألم وخافض للحرارة، يستخدم لعلاج الألم الخفيف إلى المتوسط والحمى',
                uses: ['تسكين الألم الخفيف إلى المتوسط', 'خفض الحرارة', 'علاج الصداع', 'تسكين آلام الأسنان'],
                howToUse: 'يؤخذ عن طريق الفم مع الماء، الجرعة للبالغين 500-1000 مغ كل 4-6 ساعات',
                sideEffects: ['نادراً: طفح جلدي', 'نادراً: اضطرابات في المعدة', 'الجرعة الزائدة قد تسبب تلف الكبد']
            },
            {
                id: 'ibuprofen',
                nameAr: 'إيبوبروفين',
                nameEn: 'Ibuprofen',
                category: 'مضادات الالتهاب غير الستيرويدية',
                description: 'دواء مضاد للالتهاب ومسكن للألم وخافض للحرارة',
                uses: ['تسكين الألم والالتهاب', 'خفض الحرارة', 'علاج التهاب المفاصل', 'تسكين آلام الدورة الشهرية'],
                howToUse: 'يؤخذ عن طريق الفم مع الطعام، الجرعة للبالغين 200-400 مغ كل 4-6 ساعات',
                sideEffects: ['اضطرابات في المعدة', 'غثيان وقيء', 'دوخة', 'طفح جلدي']
            }
        ]
    };

    // فئة الأداة الصحية
    class HealthWidget {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) {
                console.error('Health Widget: Container not found');
                return;
            }
            this.init();
        }

        init() {
            this.render();
            this.bindEvents();
        }

        render() {
            this.container.innerHTML = `
                <div class="health-widget-container">
                    <div class="health-widget-header">
                        <h2 class="health-widget-title">
                            ❤️ الأداة الصحية التفاعلية
                        </h2>
                        <p class="health-widget-subtitle">مجموعة شاملة من الأدوات الطبية والحاسبات الصحية</p>
                    </div>
                    <div class="health-cards-container">
                        <div class="health-card" data-card="medications">
                            <div class="health-card-icon">💊</div>
                            <h3 class="health-card-title">موسوعة الأدوية</h3>
                            <p class="health-card-description">ابحث عن معلومات شاملة حول الأدوية ودواعي استعمالها</p>
                            <span class="health-card-badge">+100 دواء</span>
                        </div>
                        <div class="health-card" data-card="ovulation">
                            <div class="health-card-icon">📅</div>
                            <h3 class="health-card-title">حاسبة الإباضة</h3>
                            <p class="health-card-description">احسبي فترة الإباضة والخصوبة بدقة</p>
                            <span class="health-card-badge">دقيق</span>
                        </div>
                        <div class="health-card" data-card="pregnancy">
                            <div class="health-card-icon">👶</div>
                            <h3 class="health-card-title">مراحل تطور الجنين</h3>
                            <p class="health-card-description">تتبعي مراحل نمو طفلك أسبوعياً</p>
                            <span class="health-card-badge">40 أسبوع</span>
                        </div>
                        <div class="health-card" data-card="bmr">
                            <div class="health-card-icon">🔥</div>
                            <h3 class="health-card-title">حاسبة السعرات</h3>
                            <p class="health-card-description">احسب معدل الأيض الأساسي والسعرات المطلوبة</p>
                            <span class="health-card-badge">BMR</span>
                        </div>
                        <div class="health-card" data-card="eye-test">
                            <div class="health-card-icon">👁️</div>
                            <h3 class="health-card-title">اختبار النظر</h3>
                            <p class="health-card-description">اختبر قوة نظرك من المنزل</p>
                            <span class="health-card-badge">تفاعلي</span>
                        </div>
                        <div class="health-card" data-card="pregnancy-calc">
                            <div class="health-card-icon">🧮</div>
                            <h3 class="health-card-title">حاسبة الحمل</h3>
                            <p class="health-card-description">احسبي موعد الولادة المتوقع</p>
                            <span class="health-card-badge">موثوق</span>
                        </div>
                    </div>
                </div>
            `;
        }

        bindEvents() {
            const cards = this.container.querySelectorAll('.health-card');
            cards.forEach(card => {
                card.addEventListener('click', (e) => {
                    const cardType = e.currentTarget.getAttribute('data-card');
                    this.openModal(cardType);
                });
            });
        }

        openModal(cardType) {
            let content = '';
            let title = '';

            switch (cardType) {
                case 'medications':
                    title = 'موسوعة الأدوية';
                    content = this.getMedicationsContent();
                    break;
                case 'ovulation':
                    title = 'حاسبة الإباضة والخصوبة';
                    content = this.getOvulationContent();
                    break;
                case 'bmr':
                    title = 'حاسبة السعرات الحرارية';
                    content = this.getBMRContent();
                    break;
                case 'pregnancy-calc':
                    title = 'حاسبة الحمل والولادة';
                    content = this.getPregnancyCalcContent();
                    break;
                case 'pregnancy':
                    title = 'مراحل تطور الجنين';
                    content = this.getPregnancyStagesContent();
                    break;
                case 'eye-test':
                    title = 'اختبار قياس النظر';
                    content = this.getEyeTestContent();
                    break;
            }

            this.showModal(title, content);
        }

        getMedicationsContent() {
            const medications = widgetData.medications.map(med => `
                <div class="health-card" style="margin-bottom: 15px; cursor: pointer;" onclick="healthWidget.showMedicationDetails('${med.id}')">
                    <h4>${med.nameAr}</h4>
                    <p style="color: #666; font-size: 0.9rem;">${med.nameEn}</p>
                    <p style="color: #888; font-size: 0.85rem;">${med.category}</p>
                    <p>${med.description}</p>
                </div>
            `).join('');

            return `
                <div style="margin-bottom: 20px;">
                    <input type="text" placeholder="ابحث عن دواء..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                ${medications}
            `;
        }

        getOvulationContent() {
            return `
                <div class="health-form">
                    <div class="health-form-group">
                        <label class="health-form-label">تاريخ آخر دورة شهرية:</label>
                        <input type="date" class="health-form-input" id="lastPeriodDate">
                    </div>
                    <div class="health-form-group">
                        <label class="health-form-label">طول الدورة الشهرية (بالأيام):</label>
                        <select class="health-form-select" id="cycleLength">
                            <option value="28">28 يوم</option>
                            <option value="21">21 يوم</option>
                            <option value="30">30 يوم</option>
                            <option value="35">35 يوم</option>
                        </select>
                    </div>
                    <button class="health-form-button" onclick="healthWidget.calculateOvulation()">حساب فترة الإباضة</button>
                </div>
                <div id="ovulationResult"></div>
            `;
        }

        calculateBMR() {
            const gender = document.getElementById('gender').value;
            const age = parseInt(document.getElementById('age').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseInt(document.getElementById('height').value);
            const activityLevel = parseFloat(document.getElementById('activityLevel').value);

            if (!age || !weight || !height) {
                alert('يرجى إدخال جميع البيانات المطلوبة');
                return;
            }

            let bmr;
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }

            const tdee = bmr * activityLevel;

            const result = `
                <div class="health-result">
                    <h4>نتائج حساب السعرات الحرارية</h4>
                    <p><strong>معدل الأيض الأساسي (BMR):</strong><br>${Math.round(bmr)} سعرة حرارية/يوم</p>
                    <p><strong>إجمالي السعرات المطلوبة:</strong><br>${Math.round(tdee)} سعرة حرارية/يوم</p>
                    <div style="margin-top: 15px; font-size: 0.9rem;">
                        <p><strong>لفقدان الوزن:</strong> ${Math.round(tdee - 500)} سعرة</p>
                        <p><strong>للحفاظ على الوزن:</strong> ${Math.round(tdee)} سعرة</p>
                        <p><strong>لزيادة الوزن:</strong> ${Math.round(tdee + 500)} سعرة</p>
                    </div>
                </div>
            `;

            document.getElementById('bmrResult').innerHTML = result;
        }

        calculatePregnancy() {
            const lastPeriodDate = document.getElementById('pregnancyLastPeriod').value;
            
            if (!lastPeriodDate) {
                alert('يرجى إدخال تاريخ آخر دورة شهرية');
                return;
            }

            const lastPeriod = new Date(lastPeriodDate);
            const dueDate = new Date(lastPeriod);
            dueDate.setDate(lastPeriod.getDate() + 280);

            const today = new Date();
            const daysDiff = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
            const currentWeek = Math.floor(daysDiff / 7);

            const result = `
                <div class="health-result">
                    <h4>نتائج حساب الحمل</h4>
                    <p><strong>موعد الولادة المتوقع:</strong><br>${dueDate.toLocaleDateString('ar-SA')}</p>
                    <p><strong>أسبوع الحمل الحالي:</strong><br>الأسبوع ${currentWeek}</p>
                    <p style="margin-top: 15px; font-size: 0.9rem;">
                        هذه التواريخ تقديرية. راجعي طبيبك بانتظام
                    </p>
                </div>
            `;

            document.getElementById('pregnancyResult').innerHTML = result;
        }
    }

    // إتاحة الفئة عالمياً
    window.HealthWidget = HealthWidget;
    window.healthWidget = null;

    // دالة التهيئة
    window.initHealthWidget = function(containerId) {
        window.healthWidget = new HealthWidget(containerId);
        return window.healthWidget;
    };

    // التهيئة التلقائية إذا وجد عنصر بالمعرف المحدد
    document.addEventListener('DOMContentLoaded', function() {
        const defaultContainer = document.getElementById('health-widget');
        if (defaultContainer) {
            window.initHealthWidget('health-widget');
        }
    });

})();
