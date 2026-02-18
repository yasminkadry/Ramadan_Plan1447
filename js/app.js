// Local Storage Keys
const STORAGE_KEY = 'ramadan_targets_2026';
const CHECKLIST_KEY = 'ramadan_checklist_2026';

// 10 Days of Ramadan Data
const ramadanDays = [
    {
        day: 1,
        date: '1 رمضان',
        quran: 'سورة الفاتحة',
        adhkar: 'سبحان الله وبحمده 100 مرة',
        sunnah: 'السحور قبل الفجر',
        fara2id: 'الإمساك عن الطعام والشراب',
        items: [
            { category: 'القرآن', text: 'تلاوة سورة الفاتحة' },
            { category: 'الأذكار', text: 'سبحان الله وبحمده 100 مرة' },
            { category: 'السنن', text: 'السحور قبل الفجر' },
            { category: 'الفرائض', text: 'الإمساك عن الطعام والشراب' }
        ]
    },
    {
        day: 2,
        date: '2 رمضان',
        quran: 'سورة البقرة - الآيات الأولى',
        adhkar: 'استغفر الله العظيم 100 مرة',
        sunnah: 'صلاة التراويح',
        fara2id: 'الصوم من الفجر إلى المغرب',
        items: [
            { category: 'القرآن', text: 'تلاوة من سورة البقرة' },
            { category: 'الأذكار', text: 'استغفر الله العظيم 100 مرة' },
            { category: 'السنن', text: 'صلاة التراويح' },
            { category: 'الفرائض', text: 'الصوم من الفجر إلى المغرب' }
        ]
    },
    {
        day: 3,
        date: '3 رمضان',
        quran: 'آيات من سورة البقرة',
        adhkar: 'اللهم إني أسألك العافية',
        sunnah: 'الدعاء في الثلث الأخير',
        fara2id: 'الإفطار على التمر',
        items: [
            { category: 'القرآن', text: 'تلاوة آيات من سورة البقرة' },
            { category: 'الأذكار', text: 'اللهم إني أسألك العافية' },
            { category: 'السنن', text: 'الدعاء في الثلث الأخير' },
            { category: 'الفرائض', text: 'الإفطار على التمر' }
        ]
    },
    {
        day: 4,
        date: '4 رمضان',
        quran: 'سورة آل عمران - آيات الصوم',
        adhkar: 'لا حول ولا قوة إلا بالله',
        sunnah: 'قيام الليل',
        fara2id: 'اجتناب المحرمات',
        items: [
            { category: 'القرآن', text: 'تلاوة من سورة آل عمران' },
            { category: 'الأذكار', text: 'لا حول ولا قوة إلا بالله' },
            { category: 'السنن', text: 'قيام الليل' },
            { category: 'الفرائض', text: 'اجتناب المحرمات' }
        ]
    },
    {
        day: 5,
        date: '5 رمضان',
        quran: 'سورة النساء - الآيات الأولى',
        adhkar: 'سبحان الله وتعالى',
        sunnah: 'الإكثار من الصدقة',
        fara2id: 'عدم شرب الماء',
        items: [
            { category: 'القرآن', text: 'تلاوة من سورة النساء' },
            { category: 'الأذكار', text: 'سبحان الله وتعالى عما يقولون' },
            { category: 'السنن', text: 'الإكثار من الصدقة' },
            { category: 'الفرائض', text: 'عدم شرب الماء' }
        ]
    },
    {
        day: 6,
        date: '6 رمضان',
        quran: 'سورة المائدة - آيات الطعام',
        adhkar: 'يا رب يا أعز يا أكرم',
        sunnah: 'قراءة القرآن بتدبر',
        fara2id: 'الامتناع عن الطيب',
        items: [
            { category: 'القرآن', text: 'تلاوة من سورة المائدة' },
            { category: 'الأذكار', text: 'يا رب يا أعز يا أكرم' },
            { category: 'السنن', text: 'قراءة القرآن بتدبر' },
            { category: 'الفرائض', text: 'الامتناع عن الطيب' }
        ]
    },
    {
        day: 7,
        date: '7 رمضان',
        quran: 'سورة الأنعام - آيات التقوى',
        adhkar: 'اللهم اجعلنا من المتقين',
        sunnah: 'الدعاء المستجاب',
        fara2id: 'السكوت عما لا ينفع',
        items: [
            { category: 'القرآن', text: 'تلاوة من سورة الأنعام' },
            { category: 'الأذكار', text: 'اللهم اجعلنا من المتقين' },
            { category: 'السنن', text: 'الدعاء المستجاب' },
            { category: 'الفرائض', text: 'السكوت عما لا ينفع' }
        ]
    },
    {
        day: 8,
        date: '8 رمضان',
        quran: 'سورة الأعراف - آيات التوبة',
        adhkar: 'تب إلي يا الله',
        sunnah: 'محاسبة النفس',
        fara2id: 'حفظ الجوارح',
        items: [
            { category: 'القرآن', text: 'تلاوة من سورة الأعراف' },
            { category: 'الأذكار', text: 'تب إلي يا الله' },
            { category: 'السنن', text: 'محاسبة النفس' },
            { category: 'الفرائض', text: 'حفظ الجوارح' }
        ]
    },
    {
        day: 9,
        date: '9 رمضان',
        quran: 'سورة الأنفال - آيات الحرم',
        adhkar: 'اللهم وسع على المسلمين',
        sunnah: 'التسبيح والتكبير',
        fara2id: 'الوفاء بالعهد',
        items: [
            { category: 'القرآن', text: 'تلاوة من سورة الأنفال' },
            { category: 'الأذكار', text: 'اللهم وسع على المسلمين' },
            { category: 'السنن', text: 'التسبيح والتكبير' },
            { category: 'الفرائض', text: 'الوفاء بالعهد' }
        ]
    },
    {
        day: 10,
        date: '10 رمضان',
        quran: 'سورة التوبة - آيات المغفرة',
        adhkar: 'اغفر لنا وارحمنا',
        sunnah: 'الشكر على إتمام الأيام',
        fara2id: 'عدم إفطار يوم متعمداً',
        items: [
            { category: 'القرآن', text: 'تلاوة من سورة التوبة' },
            { category: 'الأذكار', text: 'اغفر لنا وارحمنا يا الله' },
            { category: 'السنن', text: 'الشكر على إتمام الأيام' },
            { category: 'الفرائض', text: 'عدم إفطار يوم متعمداً' }
        ]
    }
];

// DOM Elements
const targetInput = document.getElementById('targetInput');
const addBtn = document.getElementById('addBtn');
const targetsList = document.getElementById('targetsList');
const clearAllBtn = document.getElementById('clearAllBtn');
const charCount = document.getElementById('charCount');
const calendarChecklist = document.getElementById('calendarChecklist');
const first10DaysTable = document.getElementById('first10DaysTable');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTargets();
    renderFirst10DaysTable();
    renderChecklistCalendar();
    attachEventListeners();
});

// Attach Event Listeners
function attachEventListeners() {
    addBtn.addEventListener('click', addTarget);
    clearAllBtn.addEventListener('click', clearAllTargets);
    targetInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTarget();
        }
    });
    targetInput.addEventListener('input', updateCharCount);
}

// Update Character Count
function updateCharCount() {
    const length = targetInput.value.length;
    charCount.textContent = length;
}

// Add Target
function addTarget() {
    const targetText = targetInput.value.trim();

    if (targetText === '') {
        showNotification('الرجاء إدخال هدفك أولاً', 'error');
        return;
    }

    let targets = getTargets();

    const newTarget = {
        id: Date.now(),
        text: targetText,
        completed: false,
        createdAt: new Date().toLocaleString('ar-SA')
    };

    targets.push(newTarget);
    saveTargets(targets);

    targetInput.value = '';
    charCount.textContent = '0';

    loadTargets();
    showNotification('تم إضافة الهدف بنجاح ✓', 'success');
}

// Get Targets from Local Storage
function getTargets() {
    const targets = localStorage.getItem(STORAGE_KEY);
    return targets ? JSON.parse(targets) : [];
}

// Save Targets to Local Storage
function saveTargets(targets) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(targets));
}

// Load and Display Targets
function loadTargets() {
    const targets = getTargets();

    targetsList.innerHTML = '';

    if (targets.length === 0) {
        targetsList.innerHTML = `
            <div class="col-12">
                <div class="alert alert-light border rounded-4 mb-0 text-center">
                    <i class="fas fa-lightbulb me-2"></i>لا توجد أهداف بعد. ابدأ بإضافة هدفك الأول!
                </div>
            </div>
        `;
        clearAllBtn.disabled = true;
        return;
    }

    clearAllBtn.disabled = false;

    targets.forEach((target) => {
        const targetElement = createTargetElement(target);
        targetsList.appendChild(targetElement);
    });
}

// Create Target Element
function createTargetElement(target) {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    col.innerHTML = `
        <div class="card border-0 shadow-sm rounded-4 h-100">
            <div class="card-body d-flex flex-column gap-3">
                <div class="d-flex align-items-start justify-content-between gap-2">
                    <p class="mb-0" style="line-height:1.7;">${escapeHtml(target.text)}</p>
                    <button class="btn btn-sm btn-outline-danger flex-shrink-0" onclick="deleteTarget(${target.id})" aria-label="حذف" title="حذف هذا الهدف">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
                <div class="mt-auto">
                    <small class="text-muted"><i class="fas fa-clock me-1"></i>أُضيف في: ${escapeHtml(target.createdAt)}</small>
                </div>
            </div>
        </div>
    `;
    return col;
}

// Delete Target
function deleteTarget(id) {
    if (confirm('هل تريد حذف هذا الهدف؟')) {
        let targets = getTargets();
        targets = targets.filter(target => target.id !== id);
        saveTargets(targets);
        loadTargets();
        showNotification('تم حذف الهدف بنجاح ✓', 'success');
    }
}

// Clear All Targets
function clearAllTargets() {
    if (confirm('هل تريد حذف جميع الأهداف؟ هذا الإجراء لا يمكن التراجع عنه.')) {
        localStorage.removeItem(STORAGE_KEY);
        loadTargets();
        showNotification('تم حذف جميع الأهداف بنجاح ✓', 'success');
    }
}

// Render First 10 Days Table
function renderFirst10DaysTable() {
    first10DaysTable.innerHTML = '';

    ramadanDays.forEach((day) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="d-flex align-items-center gap-2">
                    <span class="day-badge">${day.day}</span>
                    <span class="fw-bold" style="font-family:'Cairo',serif;">${day.date}</span>
                </div>
            </td>
            <td>
                <span class="category-badge">القرآن</span><br>
                ${escapeHtml(day.quran)}
            </td>
            <td>
                <span class="category-badge">الأذكار</span><br>
                ${escapeHtml(day.adhkar)}
            </td>
            <td>
                <span class="category-badge">السنن</span><br>
                ${escapeHtml(day.sunnah)}
            </td>
            <td>
                <span class="category-badge">الفرائض</span><br>
                ${escapeHtml(day.fara2id)}
            </td>
        `;
        first10DaysTable.appendChild(row);
    });
}

// Render Checklist Calendar
function renderChecklistCalendar() {
    calendarChecklist.innerHTML = '';

    ramadanDays.forEach((day) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-lg-6';

        const card = document.createElement('div');
        card.className = 'card border-0 shadow-sm rounded-4 h-100 overflow-hidden';

        const header = document.createElement('div');
        header.className = 'card-header bg-primary text-white border-0 py-3';
        header.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
                <div class="fw-bold" style="font-family:'Cairo',serif;">
                    <i class="fas fa-calendar-day me-2"></i>اليوم ${day.day}
                </div>
                <span class="badge text-bg-warning">${day.date}</span>
            </div>
        `;

        const body = document.createElement('div');
        body.className = 'card-body p-3 p-md-4';

        const list = document.createElement('div');
        list.className = 'vstack gap-3';

        day.items.forEach((item, index) => {
            const itemId = `day-${day.day}-item-${index}`;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'form-check d-flex align-items-start gap-2';

            const isChecked = getChecklistStatus(day.day, index);

            itemDiv.innerHTML = `
                <input
                    class="form-check-input mt-1"
                    type="checkbox"
                    id="${itemId}"
                    ${isChecked ? 'checked' : ''}
                    onchange="saveChecklistStatus(${day.day}, ${index}, this.checked)"
                >
                <label class="form-check-label flex-grow-1" for="${itemId}" style="line-height:1.7;">
                    <span class="badge text-bg-light border text-dark me-1">${escapeHtml(item.category)}</span>
                    ${escapeHtml(item.text)}
                </label>
            `;

            list.appendChild(itemDiv);
        });

        body.appendChild(list);
        card.appendChild(header);
        card.appendChild(body);
        col.appendChild(card);
        calendarChecklist.appendChild(col);
    });
}

// Get Checklist Status
function getChecklistStatus(day, itemIndex) {
    const checklist = localStorage.getItem(CHECKLIST_KEY);
    if (!checklist) return false;
    
    const data = JSON.parse(checklist);
    return data[`${day}-${itemIndex}`] === true;
}

// Save Checklist Status
function saveChecklistStatus(day, itemIndex, isChecked) {
    let checklist = {};
    const stored = localStorage.getItem(CHECKLIST_KEY);
    
    if (stored) {
        checklist = JSON.parse(stored);
    }
    
    checklist[`${day}-${itemIndex}`] = isChecked;
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklist));
    showNotification('تم تحديث التقدم ✓', 'success');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        zIndex: '1000',
        animation: 'slideIn 0.3s ease',
        maxWidth: '400px',
        wordWrap: 'break-word',
        fontFamily: "'Poppins', sans-serif",
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    });

    if (type === 'success') {
        Object.assign(notification.style, {
            backgroundColor: '#27ae60',
            color: '#ffffff'
        });
    } else if (type === 'error') {
        Object.assign(notification.style, {
            backgroundColor: '#e74c3c',
            color: '#ffffff'
        });
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Load on page load
window.addEventListener('load', () => {
    loadTargets();
    renderFirst10DaysTable();
    renderChecklistCalendar();
});
