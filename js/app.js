// Local Storage Keys
const STORAGE_KEY = 'ramadan_targets_2026';
const MATRIX_KEY = 'ramadan_matrix_2026';
const MATRIX_TEXT_KEY = 'ramadan_matrix_text_2026';
const NOTES_KEY = 'ramadan_day_notes_2026';
const TEXT_INPUT_GROUP_IDS = new Set(['booster', 'helper']);

function createRamadanDays(startDay, count) {
    return Array.from({ length: count }, (_, index) => {
        const day = startDay + index;
        return {
            day,
            date: `${day} رَمَضَانَ`
        };
    });
}

const ramadanDaysFirstTen = createRamadanDays(1, 10);
const ramadanDaysNextTen = createRamadanDays(11, 10);

// Matrix content based on the provided reference image
const matrixConfig = {
    redFlags: [
        'الصَّلَاةُ (5/5)',
        'الصِّومُ',
        'أذكار الصباح/المساء',
        'بر الوالدين',
        'وِرْدُ القُرْآنِ',
        'السُّحُورُ',
        'القِيَامُ',
        'الوِتْرُ',
        'درس دينيٌّ',
    ],
    boosters: [
        'ذِكْرٌ - إِفْطَارُ صَائِمٍ - صَدَقَةٌ - صِلَةُ الرَّحِمِ - إِلَخْ'
    ],
    helpers: [
        'الدُّعَاءُ - الشُّكْرُ - صُحْبَةٌ صَالِحَةٌ'
    ],
    distractors: [
        'هَاتِفٌ',
        'تِلْفَازٌ',
        'صُحْبَةٌ سَيِّئَةٌ',
        'إِلْهَاءٌ عَشْوَائِيٌّ'
    ]
};

const matrixGroups = [
    {
        id: 'red',
        title: 'خُطُوطٌ حَمْرَاءُ (ضَرُورِيَّاتٌ)',
        items: matrixConfig.redFlags,
        tableCellClass: 'cell-red',
        checklistClass: 'check-red'
    },
    {
        id: 'booster',
        title: 'وَتَزَوَّدُوا',
        items: matrixConfig.boosters,
        tableCellClass: 'cell-purple',
        checklistClass: 'check-purple'
    },
    {
        id: 'helper',
        title: 'مُعِينَاتٌ',
        items: matrixConfig.helpers,
        tableCellClass: 'cell-blue',
        checklistClass: 'check-blue'
    },
    {
        id: 'distractor',
        title: 'مُشَتِّتَاتٌ',
        items: matrixConfig.distractors,
        tableCellClass: 'cell-yellow',
        checklistClass: 'check-yellow'
    }
];

const MATRIX_TOTAL_ITEMS = matrixGroups.reduce((sum, group) => sum + group.items.length, 0);
const noteSaveTimers = {};

// DOM Elements
const targetInput = document.getElementById('targetInput');
const addBtn = document.getElementById('addBtn');
const targetsList = document.getElementById('targetsList');
const clearAllBtn = document.getElementById('clearAllBtn');
const charCount = document.getElementById('charCount');
const calendarChecklist = document.getElementById('calendarChecklist');
const calendarChecklistNextTen = document.getElementById('calendarChecklistNextTen');
const dailyMatrixTable = document.getElementById('dailyMatrixTable');
const dailyMatrixTableNextTen = document.getElementById('dailyMatrixTableNextTen');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTargets();
    syncTextDrivenStatuses([...ramadanDaysFirstTen, ...ramadanDaysNextTen]);
    renderDailyMatrix(ramadanDaysFirstTen, dailyMatrixTable);
    renderDailyMatrix(ramadanDaysNextTen, dailyMatrixTableNextTen);
    renderChecklistCalendar(ramadanDaysFirstTen, calendarChecklist);
    renderChecklistCalendar(ramadanDaysNextTen, calendarChecklistNextTen);
    attachEventListeners();
});

// Attach Event Listeners
function attachEventListeners() {
    addBtn.addEventListener('click', addTarget);
    clearAllBtn.addEventListener('click', clearAllTargets);
    targetInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTarget();
        }
    });
    targetInput.addEventListener('input', updateCharCount);
}

// Update Character Count
function updateCharCount() {
    charCount.textContent = targetInput.value.length;
}

// Add Target
function addTarget() {
    const targetText = targetInput.value.trim();

    if (targetText === '') {
        showNotification('الرَّجَاءُ إِدْخَالُ هَدَفِكَ أَوَّلًا', 'error');
        return;
    }

    const targets = getTargets();

    targets.push({
        id: Date.now(),
        text: targetText,
        createdAt: new Date().toLocaleString('ar-SA')
    });

    saveTargets(targets);

    targetInput.value = '';
    charCount.textContent = '0';

    loadTargets();
    showNotification('تَمَّتْ إِضَافَةُ الهَدَفِ بِنَجَاحٍ ✓', 'success');
}

// Targets Storage
function getTargets() {
    const targets = localStorage.getItem(STORAGE_KEY);
    return targets ? JSON.parse(targets) : [];
}

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
                    <i class="fas fa-lightbulb me-2"></i>لَا تُوجَدُ أَهْدَافٌ بَعْدُ. ابْدَأْ بِإِضَافَةِ هَدَفِكَ الأَوَّلِ!
                </div>
            </div>
        `;
        clearAllBtn.disabled = true;
        return;
    }

    clearAllBtn.disabled = false;

    targets.forEach((target) => {
        targetsList.appendChild(createTargetElement(target));
    });
}

function createTargetElement(target) {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    col.innerHTML = `
        <div class="card border-0 shadow-sm rounded-4 h-100">
            <div class="card-body d-flex flex-column gap-3">
                <div class="d-flex align-items-start justify-content-between gap-2">
                    <p class="mb-0" style="line-height:1.7;">${escapeHtml(target.text)}</p>
                    <button class="btn btn-sm btn-outline-danger flex-shrink-0" onclick="deleteTarget(${target.id})" aria-label="حَذْفٌ" title="حَذْفُ هٰذَا الهَدَفِ">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
                <div class="mt-auto">
                    <small class="text-muted"><i class="fas fa-clock me-1"></i>أُضِيفَ فِي: ${escapeHtml(target.createdAt)}</small>
                </div>
            </div>
        </div>
    `;
    return col;
}

function deleteTarget(id) {
    if (!confirm('هَلْ تُرِيدُ حَذْفَ هٰذَا الهَدَفِ؟')) {
        return;
    }

    const targets = getTargets().filter((target) => target.id !== id);
    saveTargets(targets);
    loadTargets();
    showNotification('تَمَّ حَذْفُ الهَدَفِ بِنَجَاحٍ ✓', 'success');
}

function clearAllTargets() {
    if (!confirm('هَلْ تُرِيدُ حَذْفَ جَمِيعِ الأَهْدَافِ؟ هٰذَا الإِجْرَاءُ لَا يُمْكِنُ التَّرَاجُعُ عَنْهُ.')) {
        return;
    }

    localStorage.removeItem(STORAGE_KEY);
    loadTargets();
    showNotification('تَمَّ حَذْفُ جَمِيعِ الأَهْدَافِ بِنَجَاحٍ ✓', 'success');
}

// Matrix Rendering
function renderDailyMatrix(days, tableElement) {
    if (!tableElement) {
        return;
    }

    const thead = `
        <thead>
            <tr>
                <th class="group-day" rowspan="2">اليَوْمُ</th>
                <th class="group-red" colspan="${matrixConfig.redFlags.length}">خُطُوطٌ حَمْرَاءُ (ضَرُورِيَّاتٌ)</th>
                <th class="group-purple" rowspan="2">
                    وَتَزَوَّدُوا
                    <small>${escapeHtml(matrixConfig.boosters[0])}</small>
                </th>
                <th class="group-blue" rowspan="2">
                    مُعِينَاتٌ
                    <small>${escapeHtml(matrixConfig.helpers[0])}</small>
                </th>
                <th class="group-yellow" colspan="${matrixConfig.distractors.length}">مُشَتِّتَاتٌ (يومى بدون)</th>
            </tr>
            <tr>
                ${matrixConfig.redFlags.map((item) => `<th class="sub-red rotate">${escapeHtml(item)}</th>`).join('')}
                ${matrixConfig.distractors.map((item) => `<th class="sub-yellow rotate">${escapeHtml(item)}</th>`).join('')}
            </tr>
        </thead>
    `;

    const rows = days.map((day) => {
        const redCells = matrixConfig.redFlags.map((_, index) =>
            buildMatrixCell(day.day, 'red', index, 'cell-red')
        ).join('');

        const boosterCell = buildMatrixTextCell(day.day, 'booster', 0, 'cell-purple');
        const helperCell = buildMatrixTextCell(day.day, 'helper', 0, 'cell-blue');

        const distractorCells = matrixConfig.distractors.map((_, index) =>
            buildMatrixCell(day.day, 'distractor', index, 'cell-yellow')
        ).join('');

        return `
            <tr>
                <td class="day-col"><span class="day-badge">${day.day}</span></td>
                ${redCells}
                ${boosterCell}
                ${helperCell}
                ${distractorCells}
            </tr>
        `;
    }).join('');

    tableElement.innerHTML = `${thead}<tbody>${rows}</tbody>`;

    attachMatrixToggleEvents(tableElement, '.matrix-cell');
    attachMatrixTextEvents(tableElement);
}

function buildMatrixCell(day, group, index, className) {
    const key = getMatrixKey(day, group, index);
    const isActive = getMatrixStatus(key);

    return `
        <td class="${className}">
            <button
                type="button"
                class="matrix-cell ${isActive ? 'is-active' : ''}"
                data-matrix-key="${key}"
                aria-pressed="${isActive}"
                aria-label="تَحْدِيثُ حَالَةِ اليَوْمِ ${day}"
            >
                <span class="matrix-mark">✓</span>
            </button>
        </td>
    `;
}

function buildMatrixTextCell(day, group, index, className) {
    const key = getMatrixKey(day, group, index);
    const value = getMatrixText(key);
    const isActive = value.trim().length > 0;

    if (getMatrixStatus(key) !== isActive) {
        setMatrixStatus(key, isActive);
    }

    return `
        <td class="${className}">
            <input
                type="text"
                class="matrix-text-input"
                data-matrix-text-key="${key}"
                data-day="${day}"
                aria-label="Daily input for day ${day}"
                value="${escapeHtml(value)}"
            />
        </td>
    `;
}

// Checklist Rendering (same data as matrix) + Daily Notes
function renderChecklistCalendar(days, checklistContainer) {
    if (!checklistContainer) {
        return;
    }

    checklistContainer.innerHTML = '';

    days.forEach((day) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-xl-6';

        const card = document.createElement('div');
        card.className = 'card border-0 shadow-sm rounded-4 h-100 overflow-hidden checklist-day-card';

        card.innerHTML = `
            <div class="card-header text-white border-0 py-3 d-flex align-items-center justify-content-between" style="background: linear-gradient(90deg, #4a148c, #724283);">
                <div class="fw-bold">
                    <i class="fas fa-calendar-day me-2"></i>اليَوْمُ ${day.day}
                </div>
                <div class="d-flex align-items-center gap-2">
                    <span class="badge text-bg-warning">${escapeHtml(day.date)}</span>
                    <span class="badge text-bg-light text-dark" data-day-progress="${day.day}">${countDayProgress(day.day)}/${MATRIX_TOTAL_ITEMS}</span>
                </div>
            </div>
            <div class="card-body p-3 p-md-4 d-grid gap-3">
                ${renderChecklistGroup(day.day, matrixGroups[0])}
                ${renderChecklistGroup(day.day, matrixGroups[1])}
                ${renderChecklistGroup(day.day, matrixGroups[2])}
                ${renderChecklistGroup(day.day, matrixGroups[3])}
                <section class="day-note-wrap">
                    <label class="day-note-label" for="day-note-${day.day}">مُلَاحَظَاتُ اليَوْمِ</label>
                    <textarea id="day-note-${day.day}" class="day-note" data-day-note="${day.day}" rows="3" placeholder="اُكْتُبْ مُلَاحَظَةً مُخْتَصَرَةً...">${escapeHtml(getDayNote(day.day))}</textarea>
                    <small class="text-muted day-note-status" data-note-status="${day.day}">مَحْفُوظٌ</small>
                </section>
            </div>
        `;

        col.appendChild(card);
        checklistContainer.appendChild(col);
    });

    attachMatrixToggleEvents(checklistContainer, '.check-item');
    attachDayNoteEvents(checklistContainer);
}

function renderChecklistGroup(day, group) {
    return `
        <section class="check-group ${group.checklistClass}">
            <h3 class="check-group-title">${escapeHtml(group.title)}</h3>
            <div class="check-items">
                ${group.items.map((item, index) => renderChecklistItem(day, group.id, index, item, group.checklistClass)).join('')}
            </div>
        </section>
    `;
}

function renderChecklistItem(day, group, index, label, sectionClass) {
    const key = getMatrixKey(day, group, index);
    const isDone = getMatrixStatus(key);
    const isTextDriven = isTextDrivenKey(key);

    return `
        <button
            type="button"
            class="check-item ${sectionClass} ${isDone ? 'is-done' : ''} ${isTextDriven ? 'is-text-driven' : ''}"
            data-matrix-key="${key}"
            aria-pressed="${isDone}"
            title="${escapeHtml(label)}"
            ${isTextDriven ? 'disabled' : ''}
        >
            <span class="check-item-text">${escapeHtml(label)}</span>
            <span class="check-item-mark">✓</span>
        </button>
    `;
}

// Matrix interactions
function attachMatrixToggleEvents(root, selector) {
    root.querySelectorAll(selector).forEach((button) => {
        button.addEventListener('click', () => {
            const key = button.dataset.matrixKey;
            toggleMatrixStatus(key);
        });
    });
}

function attachMatrixTextEvents(root) {
    if (!root) {
        return;
    }

    root.querySelectorAll('[data-matrix-text-key]').forEach((input) => {
        input.addEventListener('input', () => {
            const key = input.dataset.matrixTextKey;
            const value = input.value;
            const wasActive = getMatrixStatus(key);
            const isActive = value.trim().length > 0;
            const day = Number(input.dataset.day);

            setMatrixText(key, value);

            if (wasActive !== isActive) {
                setMatrixStatus(key, isActive);
                syncMatrixStateForKey(key, isActive);
                updateDayProgress(day);
            }
        });
    });
}

function toggleMatrixStatus(key) {
    if (isTextDrivenKey(key)) {
        return;
    }

    const next = !getMatrixStatus(key);
    setMatrixStatus(key, next);
    syncMatrixStateForKey(key, next);
    updateDayProgress(getDayFromKey(key));
}

function syncMatrixStateForKey(key, isActive) {
    document.querySelectorAll(`[data-matrix-key="${key}"]`).forEach((element) => {
        element.classList.toggle('is-active', isActive);
        element.classList.toggle('is-done', isActive);
        element.classList.add('pop-done');
        element.setAttribute('aria-pressed', String(isActive));

        setTimeout(() => {
            element.classList.remove('pop-done');
        }, 220);
    });
}

function updateDayProgress(day) {
    const progress = `${countDayProgress(day)}/${MATRIX_TOTAL_ITEMS}`;
    document.querySelectorAll(`[data-day-progress="${day}"]`).forEach((badge) => {
        badge.textContent = progress;
    });
}

function countDayProgress(day) {
    let completed = 0;

    matrixGroups.forEach((group) => {
        group.items.forEach((_, index) => {
            if (getMatrixStatus(getMatrixKey(day, group.id, index))) {
                completed += 1;
            }
        });
    });

    return completed;
}

function getDayFromKey(key) {
    return Number(key.split('-')[0]);
}

function getMatrixKey(day, group, index) {
    return `${day}-${group}-${index}`;
}

function isTextDrivenKey(key) {
    const parts = key.split('-');
    const group = parts[1];
    const index = parts[2];

    return TEXT_INPUT_GROUP_IDS.has(group) && index === '0';
}

function syncTextDrivenStatuses(days) {
    days.forEach((dayEntry) => {
        TEXT_INPUT_GROUP_IDS.forEach((groupId) => {
            const key = getMatrixKey(dayEntry.day, groupId, 0);
            const hasValue = getMatrixText(key).trim().length > 0;
            setMatrixStatus(key, hasValue);
        });
    });
}

// Daily Notes
function attachDayNoteEvents(root) {
    if (!root) {
        return;
    }

    root.querySelectorAll('.day-note').forEach((textarea) => {
        textarea.addEventListener('input', () => {
            const day = Number(textarea.dataset.dayNote);
            setDayNote(day, textarea.value);
            setDayNoteStatus(day, 'جَارِي الحِفْظُ...');

            if (noteSaveTimers[day]) {
                clearTimeout(noteSaveTimers[day]);
            }

            noteSaveTimers[day] = setTimeout(() => {
                setDayNoteStatus(day, 'تَمَّ الحِفْظُ');
            }, 320);
        });
    });
}

function setDayNoteStatus(day, text) {
    document.querySelectorAll(`[data-note-status="${day}"]`).forEach((status) => {
        status.textContent = text;
    });
}

function getNotesData() {
    const stored = localStorage.getItem(NOTES_KEY);
    return stored ? JSON.parse(stored) : {};
}

function getDayNote(day) {
    const data = getNotesData();
    return data[day] || '';
}

function setDayNote(day, noteText) {
    const data = getNotesData();
    data[day] = noteText;
    localStorage.setItem(NOTES_KEY, JSON.stringify(data));
}

// Matrix storage
function getMatrixData() {
    const stored = localStorage.getItem(MATRIX_KEY);
    return stored ? JSON.parse(stored) : {};
}

function getMatrixStatus(key) {
    const data = getMatrixData();
    return data[key] === true;
}

function setMatrixStatus(key, isActive) {
    const data = getMatrixData();
    data[key] = isActive;
    localStorage.setItem(MATRIX_KEY, JSON.stringify(data));
}

function getMatrixTextData() {
    const stored = localStorage.getItem(MATRIX_TEXT_KEY);
    return stored ? JSON.parse(stored) : {};
}

function getMatrixText(key) {
    const data = getMatrixTextData();
    return data[key] || '';
}

function setMatrixText(key, textValue) {
    const data = getMatrixTextData();
    const isBlank = textValue.trim().length === 0;

    if (isBlank) {
        delete data[key];
    } else {
        data[key] = textValue;
    }

    localStorage.setItem(MATRIX_TEXT_KEY, JSON.stringify(data));
}

// Utility
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

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
        fontFamily: "'Marhey', sans-serif",
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
