# 대성교회 웹사이트 - 기술 세부사항

## 1. DOM 구조 분석

### 1.1 기본 HTML 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- Meta tags -->
  <meta charset="euc-kr">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="/css/normalize.css">
  <link rel="stylesheet" href="/css/reset.css">
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="/css/responsible.css">
  
  <!-- Scripts -->
  <script src="https://code.jquery.com/jquery-latest.js"></script>
  <script src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
</head>
<body data-page="about">
  <!-- 동적으로 주입되는 요소들 -->
  <div class="utility"><!-- 상단 유틸리티 바 --></div>
  <header class="site"><!-- 헤더 --></header>
  <div class="mobile-menu"><!-- 모바일 메뉴 --></div>
  
  <!-- 페이지 콘텐츠 -->
  <div id="wrap">
    <div id="vis_sec"><!-- 시각적 섹션 --></div>
    <div class="content"><!-- 메인 콘텐츠 --></div>
  </div>
  
  <!-- 동적으로 주입되는 푸터 -->
  <footer class="site"><!-- 푸터 --></footer>
  
  <script src="/js/church-nav.js"></script>
</body>
</html>
```

### 1.2 church-nav.js 주입 메커니즘

**조건부 주입**:
```javascript
if(page !== 'home') {  // 홈페이지는 별도 처리
  document.body.insertAdjacentHTML('afterbegin', navHtml());
  document.body.insertAdjacentHTML('beforeend', footerHtml());
}
```

**주입 순서**:
1. `afterbegin`: 헤더 + 네비게이션 (body 맨 앞)
2. `beforeend`: 푸터 (body 맨 뒤)

---

## 2. JavaScript 실행 흐름

### 2.1 church-nav.js 실행 흐름

```
문서 로드
  ↓
church-nav.js 실행 (IIFE)
  ↓
1. page 속성 읽기
   document.body.getAttribute('data-page')
  ↓
2. MENU 배열 정의
  ↓
3. 함수 정의
   - navHtml()
   - mobileHtml()
   - footerHtml()
  ↓
4. 조건부 주입 (page !== 'home')
   - 헤더 + 네비게이션 HTML 주입
   - 푸터 HTML 주입
  ↓
5. 이벤트 리스너 등록
   - 스크롤: 헤더 그림자 토글
   - 클릭: 모바일 메뉴 토글
   - IntersectionObserver: reveal 애니메이션
  ↓
스크립트 종료 (IIFE 클로저 유지)
```

### 2.2 image-slot.js 실행 흐름

```
문서 로드
  ↓
image-slot.js 실행 (IIFE)
  ↓
1. 상수 정의 (STATE_FILE, MAX_DIM, ACCEPT)
  ↓
2. 전역 상태 초기화
   - subs (구독자 Set)
   - slots (슬롯 상태 객체)
   - tombstones (삭제된 슬롯)
   - loaded (로드 상태)
  ↓
3. 헬퍼 함수 정의
   - load() → fetch('.image-slots.state.json')
   - save() → window.omelette.writeFile()
   - toDataUrl() → Canvas 변환
  ↓
4. CustomElement 정의
   - class ImageSlot extends HTMLElement
  ↓
5. Element 등록
   - customElements.define('image-slot', ImageSlot)
  ↓
사용 준비 완료 (<image-slot> 사용 가능)
```

### 2.3 상태 관리 (image-slot.js)

```javascript
// 상태 파일 포맷 (.image-slots.state.json)
{
  "slot-id-1": {
    u: "data:image/webp;base64,..."  // 이미지 데이터 URL
    s: 1.5,                            // 스케일 (1-5)
    x: 10,                             // X 오프셋 (%)
    y: -20                             // Y 오프셋 (%)
  },
  "slot-id-2": {
    u: "data:image/webp;base64,..."
    s: 1,
    x: 0,
    y: 0
  }
}
```

**상태 변경 흐름**:
```
사용자 드롭
  ↓
_ingest() 호출
  ↓
toDataUrl() 실행
  (Canvas로 리사이징)
  ↓
setSlot() 호출
  ↓
slots 객체 업데이트
  ↓
구독자들에게 알림 (_subFn 호출)
  ↓
save() 실행 (loaded=true인 경우)
  ↓
window.omelette.writeFile() 호출
```

---

## 3. CSS 계층 구조 및 상속

### 3.1 마진 붕괴 (Margin Collapse)

```css
/* reset.css */
* { margin: 0; padding: 0; }

/* 이로 인해 */
body margin auto     /* 작동 O */
body margin: 0       /* 명시적으로 설정 필요 */
```

### 3.2 박스 모델 설정

```css
/* reset.css / normalize.css */
* {
  box-sizing: border-box;  /* 패딩/보더 포함 크기 */
}
```

### 3.3 폰트 상속

```css
/* fonts.css */
@font-face {
  font-family: 'Pretendard';
  src: url(...) format('woff2');
  font-weight: 400;
}

/* main.css */
body {
  font-family: "Malgun Gothic", "Noto Sans KR", sans-serif;
}

.serif {
  font-family: "Noto Serif KR", serif;
}
```

### 3.4 z-index 계층

```css
.nav { z-index: 9999; }          /* 네비게이션 */
#header { z-index: 999999; }     /* 헤더 (최상위) */
.mobile-menu { z-index: ??? }    /* 모바일 메뉴 (불확정) */
:host([data-reframe]) { z-index: 10; }  /* 이미지 슬롯 재프레임 모드 */
```

---

## 4. 이벤트 처리 메커니즘

### 4.1 모바일 메뉴 토글

```javascript
// 열기
document.querySelector('.burger').addEventListener('click', function(){
  mm.classList.add('open');
});

// 닫기 (스크림 클릭)
mm.querySelector('.scrim').addEventListener('click', function(){
  mm.classList.remove('open');
});

// 닫기 (X 버튼)
mm.querySelector('.mclose button').addEventListener('click', function(){
  mm.classList.remove('open');
});
```

**CSS 상태**:
```css
.mobile-menu { /* 기본: 숨김 */ }
.mobile-menu.open { /* 열림 상태 */ }
```

### 4.2 스크롤 이벤트

```javascript
window.addEventListener('scroll', function(){
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// CSS로 구현
header { 
  /* 기본 상태 */ 
}
header.scrolled { 
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  /* 그림자 추가 */ 
}
```

### 4.3 IntersectionObserver (스크롤 애니메이션)

```javascript
const io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting) {
      e.target.classList.add('in');  // 화면에 들어옴
      io.unobserve(e.target);        // 한 번만 실행
    }
  });
}, { threshold: 0.12 });  // 12% 이상 보일 때 발동

// 관찰 대상 등록
document.querySelectorAll('.reveal').forEach(function(el){
  io.observe(el);
});
```

**CSS 애니메이션**:
```css
.reveal { 
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s, transform 0.5s;
}

.reveal.in { 
  opacity: 1;
  transform: translateY(0);
}
```

---

## 5. Image Slot 웹컴포넌트 상세

### 5.1 Shadow DOM 구조

```html
<image-slot id="hero" shape="rounded">
  #shadow-root (open)
    <style><!-- 스타일 (캡슐화됨) --></style>
    <div class="frame" part="frame">
      <img part="image">
      <div class="empty" part="empty">
        <svg><!-- 아이콘 --></svg>
        <div class="cap">Drop an image</div>
        <div class="sub">or <u>browse files</u></div>
      </div>
      <div class="ring" part="ring"></div>
    </div>
    <div class="spill">
      <img class="ghost">
      <div class="handle" data-c="nw"></div>
      <div class="handle" data-c="ne"></div>
      <div class="handle" data-c="sw"></div>
      <div class="handle" data-c="se"></div>
    </div>
    <div class="ctl">
      <button data-act="replace">Replace</button>
      <button data-act="clear">Remove</button>
    </div>
    <input type="file" accept="image/png,image/jpeg,...">
```

### 5.2 라이프사이클

```
constructor()
  ↓ (요소가 DOM에 추가될 때)
connectedCallback()
  ├─ addEventListener('dragenter', 'dragover', 'dragleave', 'drop')
  ├─ ResizeObserver 시작
  ├─ load() 호출
  └─ _render() 호출
  ↓ (속성 변경 시)
attributeChangedCallback()
  └─ _render() 호출
  ↓ (값 변경)
setSlot() → _subFn() → _render()
  ↓ (요소가 DOM에서 제거될 때)
disconnectedCallback()
  ├─ 이벤트 리스너 제거
  └─ ResizeObserver 정리
```

### 5.3 재프레임 모드 (double-click)

```javascript
// 진입
_enterReframe() {
  this.setAttribute('data-reframe', '');  // CSS 상태 변경
  // 외부 클릭 감지, Escape 키 감지
  document.addEventListener('pointerdown', this._outside);
  document.addEventListener('keydown', this._esc);
}

// 종료
_exitReframe(commit) {
  this.removeAttribute('data-reframe');
  if(commit) this._commitView();  // 변경사항 저장
}
```

**재프레임 모드 기능**:
- **팬 (이동)**: spill 레이어에서 드래그
- **리사이즈**: 모서리 핸들 드래그 (종횡비 유지)
- **줌**: 휠 스크롤

```javascript
// 팬 예시
move = (ev) => {
  this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
  this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
  this._clampView();    // 범위 제한
  this._applyView();    // 시각화
};
```

### 5.4 이미지 리사이징 (Canvas)

```javascript
async toDataUrl(file, targetW) {
  // 1. 비트맵 생성
  const bitmap = await createImageBitmap(file);
  
  // 2. 크기 계산
  const cap = Math.min(MAX_DIM, Math.round(targetW * 2));
  const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  
  // 3. Canvas 그리기
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
  
  // 4. WebP 인코딩
  return canvas.toDataURL('image/webp', 0.85);  // 85% 품질
}
```

---

## 6. 성능 최적화 분석

### 6.1 현재 병목 지점

| 항목 | 상태 | 영향 |
|------|------|------|
| jQuery 로드 | 외부 CDN | 네트워크 대기 |
| 폰트 로드 | 외부 CDN (Google Fonts) | 첫 화면 렌더링 지연 |
| 이미지 최적화 | 미흡 | 페이지 로드 시간 |
| CSS 최소화 | 미흡 | 파일 크기 증가 |
| JavaScript 최소화 | 미흡 | 파일 크기 증가 |

### 6.2 개선 방안

```javascript
// 1. 지연 로드 (Lazy Loading)
<img loading="lazy" src="...">

// 2. 리소스 힌트
<link rel="preload" href="/fonts/pretendard.woff2" as="font">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">

// 3. 서빙 최적화
gzip 압축 활성화
CSS/JS 번들링 및 최소화
이미지 포맷 최적화 (WebP)
```

---

## 7. 브라우저 호환성

### 7.1 지원 브라우저

```javascript
// Modernizr로 기능 감지
Modernizr.flexbox  // Flexbox 지원 확인
Modernizr.cssgrid  // Grid 지원 확인
```

### 7.2 폴리필

```html
<script src="/inc/modernizr-2.6.2.min.js"></script>
<!-- IE 9 이상 지원 -->
```

### 7.3 웹컴포넌트 지원

```javascript
// CustomElement는 IE에서 미지원
// 하지만 오래된 jQuery만 보면 IE 대응이 목표는 아닌 듯
```

---

## 8. 데이터 흐름 다이어그램

### 8.1 사용자 상호작용 플로우

```
사용자 동작
  ↓
이벤트 발생
  ├─ 드래그-드롭: _ingest()
  ├─ 클릭: _input.click() 또는 setSlot()
  ├─ 스크롤: header.scrolled 토글
  └─ 모바일 메뉴: .mobile-menu.open 토글
  ↓
상태 업데이트
  ├─ image-slot: slots 객체 변경
  ├─ navigation: active 클래스 변경
  └─ header: scrolled 클래스 변경
  ↓
UI 재렌더링
  ├─ image-slot: _render() 호출
  ├─ CSS 클래스 토글
  └─ DOM 업데이트
  ↓
저장 (해당되는 경우)
  └─ window.omelette.writeFile()
```

### 8.2 이미지 슬롯 데이터 흐름

```
파일 드롭
  ↓
handleEvent('drop')
  ↓
_ingest(file)
  ├─ MIME 타입 검증
  ├─ toDataUrl() 실행
  │   └─ Canvas 리사이징
  └─ setSlot() 호출
  ↓
slots['id'] = { u, s, x, y }
  ↓
save()
  └─ window.omelette.writeFile()
      └─ .image-slots.state.json 저장
  ↓
_render()
  ├─ 이미지 표시
  ├─ _applyView() 호출
  │   └─ 이미지 위치/크기 적용
  └─ UI 업데이트
```

---

## 9. 메모리 관리

### 9.1 메모리 누수 위험

```javascript
// 1. IntersectionObserver 정리 ✓
io.unobserve(e.target);  // 관찰 해제

// 2. Image-slot 정리 ✓
disconnectedCallback() {
  this._ro.disconnect();  // ResizeObserver 정리
  // 이벤트 리스너 제거
}

// 3. 글로벌 이벤트 리스너
window.addEventListener('scroll', ...);  // 정리되지 않음
// 문제: 페이지 이동 시에도 유지될 수 있음
```

### 9.2 권장 개선

```javascript
// 이벤트 리스너를 정리 함수로 래핑
function setupNavigation() {
  const scrollHandler = () => { ... };
  window.addEventListener('scroll', scrollHandler);
  
  return function cleanup() {
    window.removeEventListener('scroll', scrollHandler);
  };
}
```

---

## 10. 네트워크 요청 분석

### 10.1 초기 로드 순서

```
1. HTML 문서 요청
   ↓
2. CSS 파일들 (병렬)
   - normalize.css
   - reset.css
   - fonts.css
   - main.css
   - responsible.css
   
3. 인라인 <script> 실행
   
4. jQuery CDN 로드 (외부)
   └─ 해결: code.jquery.com
   
5. jQuery UI CDN 로드 (외부)
   └─ 해결: code.jquery.com
   
6. church-nav.js 실행
   ├─ 필요시 로고 로드
   └─ 필요시 이미지 로드
   
7. image-slot.js 로드 및 등록
   └─ .image-slots.state.json 로드 (fetch)
```

### 10.2 성능 병목

```
TTFB (Time To First Byte)
  ↓
FCP (First Contentful Paint)
  ├─ CSS 로드 필요
  └─ 폰트 대기 시간 포함
  ↓
LCP (Largest Contentful Paint)
  ├─ 히어로 이미지 로드
  └─ jQuery 로드 완료
```

---

## 11. 마이그레이션 체크리스트

### 11.1 레거시 → 모던 전환 단계

- [ ] jQuery 제거 (Vanilla JS로 변환)
- [ ] 인라인 스크립트 → 외부 파일로 분리
- [ ] CSS 글로벌 네임스페이스 → BEM 또는 CSS Modules
- [ ] 모든 UI를 웹컴포넌트로 변환
- [ ] 번들러 도입 (Webpack, Vite 등)
- [ ] TypeScript 도입
- [ ] 테스트 작성 (Jest, Playwright)
- [ ] 성능 모니터링 설정
- [ ] 접근성 감시 (axe, WAVE)

### 11.2 단계별 계획

**Phase 1: 기초 작업**
- [ ] Git 워크플로우 확립
- [ ] 개발/스테이징/프로덕션 환경 분리
- [ ] 자동 빌드 및 배포 설정

**Phase 2: 점진적 모더화**
- [ ] navigation 컴포넌트 → 웹컴포넌트
- [ ] header/footer 컴포넌트 → 웹컴포넌트
- [ ] jQuery 의존성 제거

**Phase 3: 개선**
- [ ] 성능 최적화
- [ ] 접근성 개선
- [ ] SEO 최적화

---

## 12. 디버깅 팁

### 12.1 이미지 슬롯 문제 해결

```javascript
// 상태 확인
window.localStorage.getItem('.image-slots.state.json')

// 슬롯 정보 조회
const slot = document.querySelector('image-slot#hero');
console.log(slot._view);  // 현재 뷰 상태

// 강제 재렌더
slot._render();

// 상태 초기화
slot._local = null;
setSlot('hero', null);
```

### 12.2 네비게이션 문제 해결

```javascript
// 현재 페이지 확인
const page = document.body.getAttribute('data-page');
console.log('Current page:', page);

// 메뉴 상태 확인
document.querySelectorAll('.navitem.active').forEach(el => {
  console.log(el);
});

// 모바일 메뉴 토글
document.querySelector('.mobile-menu').classList.toggle('open');
```

### 12.3 CSS 이슈 디버깅

```css
/* z-index 충돌 확인 */
* { outline: 1px solid red; }  /* 모든 요소 가시화 */

/* 마진 붕괴 확인 */
* { border: 1px solid blue; }

/* 레이아웃 이슈 확인 */
@media (max-width: 768px) {
  * { background: rgba(0,0,0,0.1); }  /* 그리드 시각화 */
}
```

---

**문서 작성일**: 2026-06-17  
**버전**: 1.0
