const byId = (id) => document.getElementById(id);
const chapters = [
  {number:'01', label:'动态文字', title:'动态文字与编辑排版', english:'Editorial Kinetic Typography', lab:'core', poster:'type', doc:'CH01_Editorial_Typography'},
  {number:'02', label:'模块图形', title:'模块化图形与连续转场', english:'Modular Graphic Motion', lab:'modular', initial:'GM01', poster:'modular', doc:'CH02_Modular_Graphics'},
  {number:'03', label:'数据动效', title:'数据与信息叙事动效', english:'Data-Driven Motion', lab:'modular', initial:'DM01', poster:'data', doc:'CH03_Data_Driven'},
  {number:'04', label:'空间动效', title:'二维三维融合与技术图解', english:'Hybrid 2D / 3D Motion', lab:'spatial', poster:'spatial', doc:'CH04_Hybrid_2D_3D'},
];
const typeExamples = {KT01:'TY01', KT02:'TY02', KT04:'TY04', KT05:'TY03', KT07:'TY05', KT10:'TY06'};
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const labFrame = byId('lab-frame');
const dialog = byId('detail');
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (symbol) => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;',
}[symbol]));

const previews = [
  {chapter:chapters[0], clip:'type', study:'TY01', title:'行遮罩与文字重排', alt:'三组动态排版，展示基线升入、超大字裁切与栅格重排'},
  {chapter:chapters[1], clip:'modular', study:'GM02', title:'栅格重排', alt:'四个带编号的色块在网格上重新排列'},
  {chapter:chapters[2], clip:'data', study:'DM05', title:'小多图对比', alt:'三个同尺度图表并排呈现数据变化'},
  {chapter:chapters[3], clip:'spatial', study:'H402', title:'轨道镜头', alt:'模块化车型沿轨道旋转并展示不同角度'},
];
for (let i = previews.length - 1; i > 0; i -= 1) {
  const j = Math.floor(Math.random() * (i + 1));
  [previews[i], previews[j]] = [previews[j], previews[i]];
}
const previewInterval = 9000;
const previewCase = byId('preview-case');
const previewToggle = byId('preview-toggle');
let previewIndex = 0;
let autoRotate = !reducedMotion.matches;
let previewVisible = false;
let rotationTimer;

function scheduleRotation() {
  clearTimeout(rotationTimer);
  if (autoRotate && previewVisible && !document.hidden && document.activeElement !== previewCase) {
    rotationTimer = setTimeout(() => advancePreview(1), previewInterval);
  }
}

function renderPreview() {
  const preview = previews[previewIndex];
  const image = byId('hero-image');
  image.alt = preview.alt;
  image.src = 'assets/' + preview.clip + (autoRotate && previewVisible && !document.hidden ? '.gif' : '-poster.png');
  byId('preview-code').textContent = preview.study;
  byId('preview-title').textContent = preview.title;
  byId('preview-position').textContent = (previewIndex + 1) + ' / ' + previews.length;
  previewToggle.textContent = autoRotate ? 'Ⅱ' : '▶';
  const toggleLabel = autoRotate ? '暂停自动轮换' : '开始自动轮换';
  previewToggle.setAttribute('aria-label', toggleLabel);
  previewToggle.title = toggleLabel;
  scheduleRotation();
}

function advancePreview(direction) {
  previewIndex = (previewIndex + direction + previews.length) % previews.length;
  renderPreview();
}

byId('preview-prev').onclick = () => advancePreview(-1);
byId('preview-next').onclick = () => advancePreview(1);
previewToggle.onclick = () => {
  autoRotate = !autoRotate;
  renderPreview();
};
previewCase.addEventListener('focus', scheduleRotation);
previewCase.addEventListener('blur', () => requestAnimationFrame(scheduleRotation));
previewCase.addEventListener('click', () => {
  const preview = previews[previewIndex];
  selectLab(preview.chapter, preview.study);
});
document.addEventListener('visibilitychange', renderPreview);
reducedMotion.addEventListener('change', ({matches}) => {
  autoRotate = !matches;
  renderPreview();
});
new IntersectionObserver(([entry]) => {
  const visible = entry.intersectionRatio >= .25;
  if (previewVisible === visible) return;
  previewVisible = visible;
  renderPreview();
}, {threshold:.25}).observe(document.querySelector('.hero-film'));
renderPreview();

function selectLab(chapter, study) {
  const caseId = study || chapter.initial;
  const params = new URLSearchParams();
  if (caseId) params.set('study', caseId);
  const url = 'demos/' + chapter.lab + '.html';
  byId('lab-direct').href = caseId ? url + '?' + params : url;
  params.set('embed', '1');
  const embed = url + '?' + params;
  if (labFrame.getAttribute('src') !== embed) {
    labFrame.style.removeProperty('height');
    labFrame.src = embed;
  }
  labFrame.title = chapter.label + '实验台';
  byId('lab-switcher').querySelectorAll('button').forEach((button) => {
    button.setAttribute('aria-pressed', button.dataset.chapter === chapter.number);
  });
}

function makeSegment(label, number, handler) {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.chapter = number;
  button.textContent = label;
  button.onclick = handler;
  button.setAttribute('aria-pressed', 'false');
  return button;
}

chapters.forEach((chapter) => {
  byId('lab-switcher').append(makeSegment(chapter.label, chapter.number, () => selectLab(chapter)));
});
selectLab(chapters[0]);

window.addEventListener('message', ({source, data}) => {
  if (source !== labFrame.contentWindow || data?.type !== 'mdl:height') return;
  if (Number.isFinite(data.height) && data.height > 200 && data.height < 12000) {
    labFrame.style.height = Math.ceil(data.height) + 'px';
  }
});

let activeFilter = 'all';
let visibleCount = 12;
const pageSize = 12;
function renderIndex() {
  const query = byId('search').value.trim().toLocaleLowerCase();
  const results = PATTERNS.filter((study) => (
    (activeFilter === 'all' || study.ch === activeFilter) &&
    [study.id, study.title, study.zh, study.description, study.use_cases, study.family]
      .join(' ').toLocaleLowerCase().includes(query)
  ));
  byId('result-count').textContent = results.length + ' / ' + PATTERNS.length + ' 个动效';
  byId('study-grid').innerHTML = results.slice(0, visibleCount).map((study) => `
    <button class="study" type="button" data-study="${study.id}">
      <span class="study-id mono">${study.id}</span>
      <strong>${escapeHtml(study.zh)}</strong>
      <span class="study-en">${escapeHtml(study.title)}</span>
      <span class="study-foot"><span>${escapeHtml(study.duration)}</span><span aria-hidden="true">↗</span></span>
    </button>`).join('') || '<p class="empty">没有找到匹配的动效。试试其他名称或编号。</p>';
  byId('more-studies').hidden = results.length <= visibleCount;
}

function setFilter(number) {
  activeFilter = number;
  visibleCount = pageSize;
  byId('filters').querySelectorAll('button').forEach((button) => {
    button.setAttribute('aria-pressed', button.dataset.chapter === number);
  });
  renderIndex();
}
const allFilter = makeSegment('全部', 'all', () => setFilter('all'));
byId('filters').append(allFilter);
chapters.forEach((chapter) => {
  byId('filters').append(makeSegment(chapter.label, chapter.number, () => setFilter(chapter.number)));
});
const more = document.createElement('button');
more.id = 'more-studies';
more.type = 'button';
more.className = 'button quiet more-studies';
more.textContent = '显示更多动效 ↓';
more.onclick = () => {
  const firstNew = visibleCount;
  visibleCount += pageSize;
  renderIndex();
  byId('study-grid').querySelectorAll('.study')[firstNew]?.focus({preventScroll: true});
};
byId('study-grid').after(more);
byId('search').oninput = () => {
  visibleCount = pageSize;
  renderIndex();
};
setFilter('all');

byId('chapter-grid').innerHTML = chapters.map((chapter) => `
  <a class="chapter-card" href="#library" data-chapter="${chapter.number}">
    <div class="chapter-media"><img src="assets/${chapter.poster}-poster.png" alt="" loading="lazy"></div>
    <div class="chapter-copy"><span class="mono">CH${chapter.number}</span><h3>${chapter.title}</h3>
      <p>${chapter.english}</p><span class="chapter-arrow" aria-hidden="true">↗</span></div>
  </a>`).join('');
byId('chapter-grid').addEventListener('click', (event) => {
  const card = event.target.closest('[data-chapter]');
  if (!card) return;
  byId('search').value = '';
  setFilter(card.dataset.chapter);
});

const defaultSkin = {bg:'#1b1e1d', surface:'#232726', primary:'#d9fb38', ink:'#eaf0e6', accent:'#ff6500', onPrimary:'#1b1e1d'};
function skinFor(palette) {
  return palette === PALETTES[0] ? defaultSkin : palette;
}

function applyPalette(palette) {
  const skin = skinFor(palette);
  const tokens = {
    bg:skin.bg, surface:skin.surface, ink:skin.ink,
    signal:skin.primary, accent:skin.accent, 'on-signal':skin.onPrimary,
  };
  Object.entries(tokens).forEach(([name, value]) => {
    document.documentElement.style.setProperty('--' + name, value);
  });
  document.documentElement.style.colorScheme = palette.id === 'NEW-06' ? 'light' : 'dark';
  document.querySelector('meta[name="theme-color"]').content = skin.bg;

  byId('palette-id').textContent = palette.id;
  byId('palette-title').textContent = palette.zh;
  byId('palette-usage').textContent = palette.best;
  byId('palette-roles').innerHTML = [['背景',skin.bg], ['面板',skin.surface], ['正文',skin.ink], ['主按钮',skin.primary], ['辅助强调',skin.accent]]
    .map(([label, hex]) => `<div><i style="background:${hex}"></i><span>${label}</span><code>${hex}</code></div>`).join('');
  byId('palette-grid').querySelectorAll('button').forEach((button) => {
    button.setAttribute('aria-pressed', button.dataset.palette === palette.id);
  });
  byId('palette-reset').disabled = palette === PALETTES[0];
}

byId('palette-grid').innerHTML = PALETTES.map((palette) => {
  const skin = skinFor(palette);
  return `<button type="button" class="palette-card" data-palette="${palette.id}" aria-pressed="false">
    <span class="palette-colors" aria-hidden="true">${[skin.bg,skin.surface,skin.ink,skin.primary,skin.accent]
      .map((hex) => `<i style="background:${hex}"></i>`).join('')}</span>
    <span class="palette-caption"><strong>${escapeHtml(palette.zh)}</strong><span class="mono">${palette.id}</span></span>
  </button>`;
}).join('');
byId('palette-grid').addEventListener('click', (event) => {
  const button = event.target.closest('[data-palette]');
  if (button) applyPalette(PALETTES.find((palette) => palette.id === button.dataset.palette));
});
byId('palette-reset').onclick = () => {
  applyPalette(PALETTES[0]);
  byId('palette-grid').querySelector('button').focus({preventScroll: true});
};
applyPalette(PALETTES[0]);

const resources = [
  ...chapters.map((chapter) => [chapter.title, 'docs/' + chapter.doc + '.md', 'CH' + chapter.number]),
  ['工业编辑配色', 'docs/Color_System.md', 'COLOR'],
  ['48 项技法结构化目录', 'catalog/techniques.json', 'JSON'],
  ['早期实验原型', 'demos/foundation.html', 'ARCHIVE'],
];
byId('resources-grid').innerHTML = resources.map(([name, href, label]) => `
  <a href="${href}" target="_blank" rel="noopener"><span class="mono">${label}</span><strong>${name}</strong><span aria-hidden="true">↗</span></a>
`).join('');

let currentStudy;
function openStudy(id) {
  const study = PATTERNS.find((entry) => entry.id === id);
  if (!study) return;
  currentStudy = study;
  const chapter = chapters.find((entry) => entry.number === study.ch);
  const demoId = study.ch === '01' ? typeExamples[id] : id;
  byId('detail-id').textContent = study.id + ' / ' + chapter.label;
  byId('detail-title').textContent = study.zh;
  byId('detail-en').textContent = study.title;
  byId('detail-description').textContent = study.description;
  byId('detail-meta').innerHTML = [['建议时长',study.duration], ['用途',study.use_cases], ['运动参数',study.tokens], ['常见错误',study.avoid]]
    .filter(([,value]) => value)
    .map(([label,value]) => `<dt>${label}</dt><dd>${escapeHtml(value)}</dd>`).join('');
  byId('detail-lab').textContent = demoId ? '在 Playground 打开 ↗' : '进入文字实验台 ↗';
  byId('detail-lab').onclick = () => {
    dialog.close();
    selectLab(chapter, demoId);
  };
  byId('copy-status').textContent = '';
  const related = PATTERNS.filter((entry) => entry.ch === study.ch && entry.id !== id)
    .sort((a, b) => Number(b.family === study.family) - Number(a.family === study.family)).slice(0, 2);
  byId('related').innerHTML = `<a class="text-link" href="docs/${chapter.doc}.md" target="_blank" rel="noopener">本章手册 ↗</a>` +
    related.map((entry) => `<button class="text-link" type="button" data-study="${entry.id}">${entry.id} ${escapeHtml(entry.zh)}</button>`).join('');
  if (!dialog.open) dialog.showModal();
  byId('close-detail').focus();
}

[byId('study-grid'), byId('related')].forEach((container) => {
  container.addEventListener('click', (event) => {
    const button = event.target.closest('[data-study]');
    if (button) openStudy(button.dataset.study);
  });
});
byId('close-detail').onclick = () => dialog.close();
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

byId('copy-prompt').onclick = async () => {
  const study = currentStudy;
  const prompt = `制作工业编辑式动效 ${study.id} · ${study.title}（${study.zh}）。
设计规则：${study.description}
建议时长：${study.duration}
用途：${study.use_cases}
运动参数：${study.tokens}
常见错误：${study.avoid}
先设计关键静帧，明确元素标识和统一栅格，再输出运动时间轴并核对效果。`;
  try {
    await navigator.clipboard.writeText(prompt);
    byId('copy-status').textContent = '已复制';
  } catch {
    const field = document.createElement('textarea');
    field.value = prompt;
    dialog.append(field);
    field.select();
    const copied = document.execCommand('copy');
    if (copied) field.remove();
    byId('copy-status').textContent = copied ? '已复制' : '请复制选中的文字';
  }
};

const params = new URLSearchParams(location.search);
const requested = params.get('lab');
if (requested === 'colors' || requested === 'foundation') {
  location.replace('demos/' + requested + '.html');
} else if (requested) {
  const study = params.get('study');
  const chapter = requested === 'modular' && study?.startsWith('DM')
    ? chapters[2] : chapters.find((entry) => entry.lab === requested);
  if (chapter) {
    selectLab(chapter, study);
    if (!location.hash) requestAnimationFrame(() => byId('playground').scrollIntoView({behavior:'instant'}));
  }
}

function updateNavigation() {
  document.querySelectorAll('.site-header nav a').forEach((link) => {
    if (link.hash === location.hash) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('hashchange', updateNavigation);
updateNavigation();
