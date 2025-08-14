/** * الأداة الصحية التفاعلية - كود الدمج * يمكن إضافة هذا الكود إلى أي موقع لعرض الأداة الصحية */ (function() { 'use strict'; // التحقق من وجود الأداة مسبقاً if (window.HealthWidgetLoaded) { return; } window.HealthWidgetLoaded = true; // إنشاء CSS للأداة const widgetCSS = ` .health-widget-container { font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 1200px; margin: 20px auto; background: rgba(255, 255, 255, 0.95); border-radius: 20px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); overflow: hidden; backdrop-filter: blur(10px); direction: rtl; } .health-widget-header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 30px; text-align: center; color: white; } .health-widget-title { font-size: 2.2rem; font-weight: 700; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 15px; } .health-widget-subtitle { font-size: 1.1rem; opacity: 0.9; font-weight: 300; } .health-cards-container { padding: 40px 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; } .health-card { background: white; border-radius: 15px; padding: 30px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; border: 2px solid transparent; } .health-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); border-color: #4facfe; } .health-card-icon { width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-size: 1.8rem; color: white; } .health-card-title { font-size: 1.4rem; font-weight: 600; color: #2d3748; margin-bottom: 10px; } .health-card-description { color: #718096; line-height: 1.6; margin-bottom: 20px; font-size: 0.95rem; } .health-card-badge { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; display: inline-block; } .health-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px; } .health-modal-content { background: white; border-radius: 15px; max-width: 800px; max-height: 90vh; overflow-y: auto; position: relative; width: 100%; } .health-modal-header { padding: 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 15px 15px 0 0; } .health-modal-close { font-size: 24px; cursor: pointer; background: none; border: none; color: white; padding: 5px; } .health-modal-body { padding: 20px; line-height: 1.6; } .health-form { background: #f7fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px; } .health-form-group { margin-bottom: 15px; } .health-form-label { display: block; margin-bottom: 5px; font-weight: 600; color: #2d3748; } .health-form-input, .health-form-select { width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 1rem; font-family: inherit; } .health-form-button { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: transform 0.2s ease; } .health-form-button:hover { transform: translateY(-2px); } .health-result { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-top: 20px; text-align: center; } @media (max-width: 768px) { .health-widget-container { margin: 10px; border-radius: 15px; } .health-widget-header { padding: 20px; } .health-widget-title { font-size: 1.8rem; } .health-cards-container { padding: 20px 10px; grid-template-columns: 1fr; } .health-card { padding: 20px; } } `; // إضافة CSS إلى الصفحة const styleSheet = document.createElement('style'); styleSheet.textContent = widgetCSS; document.head.appendChild(styleSheet); // إضافة خط Cairo const fontLink = document.createElement('link'); fontLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap'; fontLink.rel = 'stylesheet'; document.head.appendChild(fontLink); // بيانات الأداة const widgetData = { medications: [ { id: 'paracetamol', nameAr: 'باراسيتامول', nameEn: 'Paracetamol', category: 'مسكنات الألم وخافضات الحرارة', description: 'دواء مسكن للألم وخافض للحرارة، يستخدم لعلاج الألم الخفيف إلى المتوسط والحمى', uses: ['تسكين الألم الخفيف إلى المتوسط', 'خفض الحرارة', 'علاج الصداع', 'تسكين آلام الأسنان'], howToUse: 'يؤخذ عن طريق الفم مع الماء، الجرعة للبالغين 500-1000 مغ كل 4-6 ساعات', sideEffects: ['نادراً: طفح جلدي', 'نادراً: اضطرابات في المعدة', 'الجرعة الزائدة قد تسبب تلف الكبد'] }, { id: 'ibuprofen', nameAr: 'إيبوبروفين', nameEn: 'Ibuprofen', category: 'مضادات الالتهاب غير الستيرويدية', description: 'دواء مضاد للالتهاب ومسكن للألم وخافض للحرارة', uses: ['تسكين الألم والالتهاب', 'خفض الحرارة', 'علاج التهاب المفاصل', 'تسكين آلام الدورة الشهرية'], howToUse: 'يؤخذ عن طريق الفم مع الطعام، الجرعة للبالغين 200-400 مغ كل 4-6 ساعات', sideEffects: ['اضطرابات في المعدة', 'غثيان وقيء', 'دوخة', 'طفح جلدي'] } ] }; // فئة الأداة الصحية class HealthWidget { constructor(containerId) { this.container = document.getElementById(containerId); if (!this.container) { console.error('Health Widget: Container not found'); return; } this.init(); } init() { this.render(); this.bindEvents(); } render() { this.container.innerHTML = ` 

❤️ الأداة الصحية التفاعلية 

مجموعة شاملة من الأدوات الطبية والحاسبات الصحية

💊

موسوعة الأدوية

ابحث عن معلومات شاملة حول الأدوية ودواعي استعمالها

+100 دواء 

📅

حاسبة الإباضة

احسبي فترة الإباضة والخصوبة بدقة

دقيق 

👶

مراحل تطور الجنين

تتبعي مراحل نمو طفلك أسبوعياً

40 أسبوع 

🔥

حاسبة السعرات

احسب معدل الأيض الأساسي والسعرات المطلوبة

BMR 

👁️

اختبار النظر

اختبر قوة نظرك من المنزل

تفاعلي 

🧮

حاسبة الحمل

احسبي موعد الولادة المتوقع

موثوق 

`; } bindEvents() { const cards = this.container.querySelectorAll('.health-card'); cards.forEach(card => { card.addEventListener('click', (e) => { const cardType = e.currentTarget.getAttribute('data-card'); this.openModal(cardType); }); }); } openModal(cardType) { let content = ''; let title = ''; switch (cardType) { case 'medications': title = 'موسوعة الأدوية'; content = this.getMedicationsContent(); break; case 'ovulation': title = 'حاسبة الإباضة والخصوبة'; content = this.getOvulationContent(); break; case 'bmr': title = 'حاسبة السعرات الحرارية'; content = this.getBMRContent(); break; case 'pregnancy-calc': title = 'حاسبة الحمل والولادة'; content = this.getPregnancyCalcContent(); break; case 'pregnancy': title = 'مراحل تطور الجنين'; content = this.getPregnancyStagesContent(); break; case 'eye-test': title = 'اختبار قياس النظر'; content = this.getEyeTestContent(); break; } this.showModal(title, content); } getMedicationsContent() { const medications = widgetData.medications.map(med => ` 

${med.nameAr}

${med.nameEn}

${med.category}

${med.description}

`).join(''); return ` 

${medications} `; } getOvulationContent() { return ` 

تاريخ آخر دورة شهرية: 

طول الدورة الشهرية (بالأيام): 28 يوم21 يوم30 يوم35 يوم 

حساب فترة الإباضة 

`; } getBMRContent() { return ` 

الجنس: ذكرأنثى 

العمر (بالسنوات): 

الوزن (بالكيلوغرام): 

الطول (بالسنتيمتر): 

مستوى النشاط: قليل الحركةنشاط خفيفنشاط متوسطنشاط عالي 

حساب السعرات الحرارية 

`; } getPregnancyCalcContent() { return ` 

تاريخ آخر دورة شهرية: 

حساب موعد الولادة 

`; } getPregnancyStagesContent() { return ` 

مراحل تطور الجنين

معلومات مفصلة عن تطور الجنين أسبوعياً من الأسبوع الأول حتى الأسبوع الأربعين

الأسبوع 1-4: تكوين الأعضاء الأساسية

الأسبوع 5-12: نمو الأطراف والجهاز العصبي

الأسبوع 13-28: تطور الحواس والحركة

الأسبوع 29-40: اكتمال النمو والاستعداد للولادة

`; } getEyeTestContent() { return ` 

اختبار قياس النظر

اختبار بصري تفاعلي لقياس قوة النظر

E F P T O Z 

هل يمكنك قراءة الحروف بوضوح؟

نعم، واضحة لا، غير واضحة 

تنبيه: هذا الاختبار للإرشاد فقط وليس بديلاً عن الفحص الطبي 

`; } showModal(title, content) { const modal = document.createElement('div'); modal.className = 'health-modal'; modal.innerHTML = ` 

${title}

× 

${content} 

`; modal.addEventListener('click', (e) => { if (e.target === modal) { modal.remove(); } }); document.body.appendChild(modal); } showMedicationDetails(medId) { const medication = widgetData.medications.find(med => med.id === medId); if (!medication) return; const content = ` 

${medication.nameAr}

الاسم الإنجليزي: ${medication.nameEn}

الفئة: ${medication.category}

الوصف: ${medication.description}

دواعي الاستعمال:

${medication.uses.map(use => `

${use}

`).join('')} 

طريقة الاستخدام:

${medication.howToUse}

الأعراض الجانبية:

${medication.sideEffects.map(effect => `

${effect}

`).join('')} `; this.showModal(medication.nameAr, content); } calculateOvulation() { const lastPeriodDate = document.getElementById('lastPeriodDate').value; const cycleLength = parseInt(document.getElementById('cycleLength').value); if (!lastPeriodDate) { alert('يرجى إدخال تاريخ آخر دورة شهرية'); return; } const lastPeriod = new Date(lastPeriodDate); const ovulationDay = cycleLength - 14; const ovulationDate = new Date(lastPeriod); ovulationDate.setDate(lastPeriod.getDate() + ovulationDay); const result = ` 

نتائج حساب الإباضة

يوم الإباضة المتوقع:
${ovulationDate.toLocaleDateString('ar-SA')}

هذه التواريخ تقديرية وقد تختلف من امرأة لأخرى 

`; document.getElementById('ovulationResult').innerHTML = result; } calculateBMR() { const gender = document.getElementById('gender').value; const age = parseInt(document.getElementById('age').value); const weight = parseFloat(document.getElementById('weight').value); const height = parseInt(document.getElementById('height').value); const activityLevel = parseFloat(document.getElementById('activityLevel').value); if (!age || !weight || !height) { alert('يرجى إدخال جميع البيانات المطلوبة'); return; } let bmr; if (gender === 'male') { bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5; } else { bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161; } const tdee = bmr * activityLevel; const result = ` 

نتائج حساب السعرات الحرارية

معدل الأيض الأساسي (BMR):
${Math.round(bmr)} سعرة حرارية/يوم

إجمالي السعرات المطلوبة:
${Math.round(tdee)} سعرة حرارية/يوم

لفقدان الوزن: ${Math.round(tdee - 500)} سعرة

للحفاظ على الوزن: ${Math.round(tdee)} سعرة

لزيادة الوزن: ${Math.round(tdee + 500)} سعرة

`; document.getElementById('bmrResult').innerHTML = result; } calculatePregnancy() { const lastPeriodDate = document.getElementById('pregnancyLastPeriod').value; if (!lastPeriodDate) { alert('يرجى إدخال تاريخ آخر دورة شهرية'); return; } const lastPeriod = new Date(lastPeriodDate); const dueDate = new Date(lastPeriod); dueDate.setDate(lastPeriod.getDate() + 280); const today = new Date(); const daysDiff = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24)); const currentWeek = Math.floor(daysDiff / 7); const result = ` 

نتائج حساب الحمل

موعد الولادة المتوقع:
${dueDate.toLocaleDateString('ar-SA')}

أسبوع الحمل الحالي:
الأسبوع ${currentWeek}

هذه التواريخ تقديرية. راجعي طبيبك بانتظام 

`; document.getElementById('pregnancyResult').innerHTML = result; } } // إتاحة الفئة عالمياً window.HealthWidget = HealthWidget; window.healthWidget = null; // دالة التهيئة window.initHealthWidget = function(containerId) { window.healthWidget = new HealthWidget(containerId); return window.healthWidget; }; // التهيئة التلقائية إذا وجد عنصر بالمعرف المحدد document.addEventListener('DOMContentLoaded', function() { const defaultContainer = document.getElementById('health-widget'); if (defaultContainer) { window.initHealthWidget('health-widget'); } }); })(); 
