if (new URLSearchParams(location.search).get('embed') === '1' && window.parent !== window) {
  document.documentElement.classList.add('in-home');
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'embed.css';
  document.head.append(stylesheet);

  const studyList = document.querySelector('#techList, #studies, #items');
  if (studyList) {
    const label = document.createElement('label');
    label.className = 'mobile-study-picker';
    label.append('选择案例');
    const picker = document.createElement('select');
    label.append(picker);
    studyList.before(label);

    const studyButtons = () => [...studyList.querySelectorAll('button')];
    const updatePicker = () => {
      const options = studyButtons().map((button, index) => {
        const code = button.dataset.study || button.dataset.id || button.querySelector('.code')?.textContent.trim();
        const title = button.querySelector('.library-sub, .zh, .case-name')?.textContent.trim() || button.textContent.trim();
        const option = new Option(code ? code + ' · ' + title : title, index);
        option.selected = button.matches('.active, [aria-pressed="true"]');
        return option;
      });
      picker.replaceChildren(...options);
    };
    picker.addEventListener('change', () => studyButtons()[Number(picker.value)]?.click());
    new MutationObserver(updatePicker).observe(studyList, {
      childList:true, subtree:true, attributes:true, attributeFilter:['class','aria-pressed'],
    });
    updatePicker();
  }

  const phone = matchMedia('(max-width: 750px)');
  const inspector = document.querySelector('.inspector-panel');
  if (inspector) {
    const workspace = inspector.parentElement;
    const stage = workspace.querySelector('.stage-shell');
    const compact = matchMedia('(max-width: 1070px)');
    const originalGroups = [...inspector.querySelectorAll('.control-group, .inspector-bottom')];
    const timingGroups = ['duration', 'stagger'].map((id) => document.getElementById(id).closest('.control-group'));
    const more = document.createElement('details');
    more.className = 'mobile-more-parameters';
    const summary = document.createElement('summary');
    summary.textContent = '更多参数与导出';
    more.append(summary);

    const placeInspector = () => {
      if (compact.matches) stage.after(inspector);
      else workspace.append(inspector);
      if (phone.matches) {
        inspector.append(...timingGroups, more);
        more.append(...originalGroups.filter((group) => !timingGroups.includes(group)));
      } else {
        inspector.append(...originalGroups);
        more.remove();
      }
    };
    compact.addEventListener('change', placeInspector);
    phone.addEventListener('change', placeInspector);
    placeInspector();
  }

  const camera = document.getElementById('orbit')?.closest('.sect');
  if (camera) {
    const visual = document.getElementById('theme').closest('.sect');
    const placeCameraControls = () => {
      if (phone.matches) visual.before(camera);
      else visual.after(camera);
    };
    phone.addEventListener('change', placeCameraControls);
    placeCameraControls();
  }

  let sentHeight = 0;
  const reportHeight = () => {
    const height = Math.ceil(document.body.getBoundingClientRect().height);
    if (height !== sentHeight) {
      sentHeight = height;
      window.parent.postMessage({type:'mdl:height', height}, '*');
    }
  };
  new ResizeObserver(reportHeight).observe(document.body);
  stylesheet.onload = reportHeight;
  window.addEventListener('load', reportHeight);
}
