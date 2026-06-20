# 대성교회 웹사이트 - API 참조서

## 1. church-nav.js API

### 1.1 전역 변수

```javascript
page         // 현재 페이지 타입 (string)
             // 가능한 값: 'about', 'sermons', 'community', 'missions', 'location', 'home'
```

### 1.2 메뉴 데이터 구조

```javascript
MENU = [
  {
    key: 'about',                          // 페이지 식별자
    label: '교회소개',                      // 메뉴 텍스트
    href: 'about.html',                   // 링크 경로
    sub: [                                // (선택) 서브메뉴
      ['주일예배 설교', 'sermons.html#sunday'],
      ['수요기도회 설교', 'sermons.html#wed']
    ]
  },
  // ... 더 많은 메뉴
]
```

### 1.3 함수 API

#### navHtml()

**설명**: 헤더와 네비게이션 HTML 생성

**반환값**: 
```html
<div class="utility"><!-- 상단 바 --></div>
<header class="site"><!-- 헤더 --></header>
<div class="mobile-menu"><!-- 모바일 메뉴 --></div>
```

**사용**:
```javascript
const html = navHtml();
document.body.insertAdjacentHTML('afterbegin', html);
```

---

#### mobileHtml()

**설명**: 모바일 메뉴 HTML 생성 (navHtml() 내부에서 호출)

**반환값**:
```html
<div class="mobile-menu">
  <div class="scrim"></div>
  <div class="panel">
    <!-- 모바일 메뉴 그룹 -->
  </div>
</div>
```

---

#### footerHtml()

**설명**: 푸터 HTML 생성

**반환값**:
```html
<footer class="site">
  <div class="wrap">
    <!-- 회사 정보, 링크, SNS 아이콘 -->
  </div>
</footer>
```

**내용**:
- 브랜드 정보
- 바로가기 링크
- 커뮤니티 링크
- 온라인 헌금 안내
- 저작권 정보
- SNS 링크 (YouTube, Instagram, Map)

---

### 1.4 이벤트 처리

#### 스크롤 이벤트

```javascript
window.addEventListener('scroll', function(){
  header.classList.toggle('scrolled', window.scrollY > 10);
});
```

**효과**: 
- `scrollY > 10px` 일 때 헤더에 그림자 표시
- 네비게이션 고정

---

#### 모바일 메뉴 토글

```javascript
// 메뉴 열기
document.querySelector('.burger').addEventListener('click', function(){
  mm.classList.add('open');
});

// 메뉴 닫기 (스크림)
mm.querySelector('.scrim').addEventListener('click', function(){
  mm.classList.remove('open');
});

// 메뉴 닫기 (X 버튼)
mm.querySelector('.mclose button').addEventListener('click', function(){
  mm.classList.remove('open');
});
```

---

#### IntersectionObserver (애니메이션)

```javascript
const io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function(el){
  io.observe(el);
});
```

**사용 예**:
```html
<!-- 스크롤 시 나타나는 요소 -->
<div class="reveal">
  콘텐츠
</div>
```

---

## 2. image-slot.js API

### 2.1 HTML 속성 (Web Component Attributes)

```html
<image-slot
  id="unique-id"              <!-- (필수) 상태 저장 키 -->
  shape="rounded"             <!-- 형태: rect | rounded | circle | pill (기본: rounded) -->
  radius="12"                 <!-- rounded 시 코너 반경 (px) (기본: 12) -->
  mask="polygon(...)"         <!-- CSS clip-path (shape 무시) -->
  fit="cover"                 <!-- 객체 맞춤: cover | contain | fill (기본: cover) -->
  position="50% 50%"          <!-- contain/fill 시 위치 (기본: 50% 50%) -->
  placeholder="메시지"        <!-- 빈 상태 메시지 (기본: Drop an image) -->
  src="url"                   <!-- 초기/폴백 이미지 URL -->
>
</image-slot>
```

### 2.2 속성 상세 설명

#### id

- **타입**: 문자열
- **필수**: 예 (상태 저장을 위해)
- **설명**: 고유 식별자. 각 슬롯마다 다른 값 필요
- **예시**: `id="hero"`, `id="avatar"`

#### shape

- **타입**: 문자열 (rect | rounded | circle | pill)
- **기본값**: rounded
- **설명**:
  - `rect`: 직사각형
  - `rounded`: 둥근 모서리
  - `circle`: 원형 (정사각형 슬롯에서만 진정한 원)
  - `pill`: 약 모양 (좌우 끝이 반원)

#### radius

- **타입**: 숫자 (px)
- **기본값**: 12
- **설명**: shape="rounded"일 때만 적용
- **예시**: `radius="20"` → border-radius: 20px

#### mask

- **타입**: CSS clip-path 값
- **기본값**: 없음
- **설명**: shape 무시하고 이 마스크 적용
- **예시**: 
  ```html
  mask="polygon(50% 0%, 100% 50%, 50% 100%, 0 50%)"  <!-- 마름모 -->
  ```

#### fit

- **타입**: 문자열 (cover | contain | fill)
- **기본값**: cover
- **설명**:
  - `cover`: 슬롯 채우기 (일부 잘림) → 재프레임 가능
  - `contain`: 전체 이미지 표시 (빈 공간 있음)
  - `fill`: 슬롯 정확히 채우기 (왜곡 가능)

#### position

- **타입**: CSS object-position 값
- **기본값**: 50% 50%
- **설명**: fit이 contain/fill일 때 이미지 위치
- **예시**: `position="center top"`, `position="0 0"`

#### placeholder

- **타입**: 문자열
- **기본값**: Drop an image
- **설명**: 빈 상태에 표시되는 메시지
- **예시**: `placeholder="사진을 드래그하세요"`

#### src

- **타입**: URL 문자열
- **기본값**: 없음
- **설명**: 초기/폴백 이미지. 사용자 드롭으로 무시됨
- **예시**: `src="default.jpg"`

### 2.3 상태 저장 형식

파일: `.image-slots.state.json`

```json
{
  "slot-id-1": {
    "u": "data:image/webp;base64,...",  // 이미지 Data URL
    "s": 1.5,                            // 스케일 (1-5)
    "x": 10,                             // X 오프셋 (%)
    "y": -20                             // Y 오프셋 (%)
  },
  "slot-id-2": {
    "u": "data:image/webp;base64,..."
  }
}
```

**또는 레거시 형식**:
```json
{
  "slot-id": "data:image/webp;base64,..."  // 기본값: s=1, x=0, y=0
}
```

### 2.4 CSS Parts (::part 선택자)

```css
/* 내부 요소 스타일링 */
image-slot::part(frame) {
  background-color: #f0f0f0;
}

image-slot::part(image) {
  filter: grayscale(50%);
}

image-slot::part(ring) {
  border-color: red;
}

image-slot::part(empty) {
  background-color: #f9f9f9;
}
```

### 2.5 크기 및 레이아웃

```html
<!-- 인라인 스타일로 크기 지정 -->
<image-slot id="hero" style="width: 800px; height: 450px">
</image-slot>

<!-- 부모 그리드/플렉스에서 자동 -->
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
  <image-slot id="img1"></image-slot>
  <image-slot id="img2"></image-slot>
  <image-slot id="img3"></image-slot>
</div>
```

### 2.6 이벤트

#### 지원하는 네이티브 HTML 이벤트

```javascript
// 드래그-드롭
element.addEventListener('dragenter', handler);
element.addEventListener('dragover', handler);
element.addEventListener('dragleave', handler);
element.addEventListener('drop', handler);

// 더블클릭 (재프레임 모드 진입)
element.addEventListener('dblclick', handler);

// 휠 (재프레임 모드에서 줌)
element.addEventListener('wheel', handler);

// 포인터 (팬/리사이즈)
element.addEventListener('pointerdown', handler);
element.addEventListener('pointermove', handler);
element.addEventListener('pointerup', handler);
```

### 2.7 상태 속성 (Data Attributes)

```html
<!-- 이미지 로드됨 -->
<image-slot data-filled=""></image-slot>

<!-- 편집 가능 (window.omelette.writeFile 있을 때) -->
<image-slot data-editable=""></image-slot>

<!-- 재프레임 모드 활성 -->
<image-slot data-reframe=""></image-slot>

<!-- 드래그 호버 상태 -->
<image-slot data-over=""></image-slot>

<!-- 팬 중 -->
<image-slot data-panning=""></image-slot>
```

### 2.8 사용 예제

#### 기본 사용

```html
<image-slot 
  id="hero" 
  style="width: 800px; height: 450px"
  shape="rounded"
  radius="20"
  placeholder="Drop a hero image">
</image-slot>
```

#### 아바타 (원형)

```html
<image-slot 
  id="avatar"
  style="width: 120px; height: 120px"
  shape="circle"
  placeholder="Your photo">
</image-slot>
```

#### 마스크 (마름모)

```html
<image-slot 
  id="kite"
  style="width: 300px; height: 300px"
  mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"
  placeholder="Diamond shape">
</image-slot>
```

#### 너비 제약

```html
<div style="max-width: 600px; margin: 0 auto;">
  <image-slot 
    id="responsive"
    style="width: 100%; height: auto; aspect-ratio: 16/9"
    shape="rounded"
    fit="cover">
  </image-slot>
</div>
```

---

## 3. HTML 페이지 구조

### 3.1 페이지 구분 (data-page 속성)

```html
<!-- about.html -->
<body data-page="about">
  <!-- 헤더 + 푸터 자동 주입 -->
</body>

<!-- sermons.html -->
<body data-page="sermons">
  <!-- 헤더 + 푸터 자동 주입 -->
</body>

<!-- 메인 (index.html만 예외) -->
<body data-page="home">
  <!-- 헤더 + 푸터 없음 (수동 구현) -->
</body>
```

### 3.2 메뉴 자동 활성화

```javascript
// church-nav.js에서 자동으로 처리
const page = document.body.getAttribute('data-page');
const menuItem = document.querySelector(`.navitem[data-key="${page}"]`);
menuItem.classList.add('active');
```

---

## 4. CSS 클래스 참조

### 4.1 네비게이션 클래스

```css
.utility              /* 상단 유틸리티 바 */
.site                 /* 헤더/푸터 컨테이너 */
.brand                /* 로고 링크 */
.menu                 /* 메인 메뉴 */
.navitem              /* 메뉴 아이템 */
.navitem.active       /* 활성 메뉴 아이템 */
.dropdown             /* 드롭다운 메뉴 */
.burger               /* 햄버거 메뉴 버튼 */
.mobile-menu          /* 모바일 메뉴 컨테이너 */
.mobile-menu.open     /* 모바일 메뉴 열림 상태 */
.scrim                /* 모바일 메뉴 배경 오버레이 */
.mgroup               /* 모바일 메뉴 그룹 */
.msub                 /* 모바일 서브메뉴 */
```

### 4.2 헤더 클래스

```css
.scrolled             /* 스크롤 시 추가 */
.logo                 /* 로고 */
.cta                  /* Call-to-action 버튼 */
```

### 4.3 푸터 클래스

```css
.fgrid                /* 푸터 그리드 */
.fbrand               /* 푸터 브랜드 섹션 */
.fcol                 /* 푸터 열 */
.fgiving              /* 헌금 정보 */
.fbot                 /* 푸터 하단 */
.sns                  /* SNS 링크 */
```

### 4.4 애니메이션 클래스

```css
.reveal               /* 스크롤 애니메이션 대상 */
.reveal.in            /* 애니메이션 활성 상태 */
```

---

## 5. 유틸리티 함수

### 5.1 쿠키 함수 (index.html)

```javascript
function getCookie(name) {
  var from_idx = document.cookie.indexOf(name+'=');
  if (from_idx != -1) {
    from_idx += name.length + 1;
    to_idx = document.cookie.indexOf(';', from_idx);
    if (to_idx == -1) {
      to_idx = document.cookie.length
    }
    return unescape(document.cookie.substring(from_idx, to_idx));
  }
}
```

**사용**:
```javascript
const userLang = getCookie('lang');
```

---

### 5.2 윈도우 팝업 함수 (index.html)

```javascript
function MM_openBrWindow(theURL, winName, features) {
  window.open(theURL, winName, features);
}
```

**사용**:
```javascript
MM_openBrWindow('http://example.com', 'popup', 'width=800,height=600');
```

---

### 5.3 성경 검색 함수 (index.html)

```javascript
function submit_book(form) {
  window.open(
    "http://www.holybible.or.kr/B_" + form.VR.value + "/cgi/bibleftxt.php?" +
    "VR=" + form.VR.value + 
    "&VL=" + form.VL.value + 
    "&CN=" + form.CN.value + 
    "&CV=" + form.CV.value + 
    "&FR=" + form.FR.value
  );
  return false;
}
```

**폼 구조**:
```html
<form onsubmit="return submit_book(this)">
  <select name="VR"><!-- 번역본 --></select>
  <select name="VL"><!-- 권 --></select>
  <select name="CN"><!-- 장 --></select>
  <select name="CV"><!-- 절 --></select>
  <select name="FR"><!-- 마지막절 --></select>
  <button type="submit">검색</button>
</form>
```

---

## 6. 플러그인 API

### 6.1 jQuery bxSlider

```javascript
// 초기화
$('#slider').bxSlider({
  auto: true,
  mode: 'fade',
  pagerCustom: '#pager'
});

// 메서드
$('#slider').goToSlide(2);  // 슬라이드 이동
$('#slider').reloadSlider(); // 리로드
```

---

### 6.2 jQuery slicknav (모바일 메뉴)

```javascript
// 초기화
$('#menu').slicknav({
  label: "Menu",
  duration: 200
});
```

---

### 6.3 jQuery Popup

```javascript
// 팝다운 메뉴
$('.popdown').popdown();

// 팝업 윈도우
$('.popup-link').popup();
```

---

## 7. 상태 코드 및 에러 처리

### 7.1 image-slot.js 에러 메시지

| 에러 | 원인 | 해결 |
|------|------|------|
| "Drop a PNG, JPEG, WebP, or AVIF image." | 지원하지 않는 형식 | 지원 형식 사용 |
| "Could not read that image." | 이미지 디코딩 실패 | 다른 이미지 시도 |
| 이미지 미표시 | id 미설정 | id 속성 추가 |
| 상태 저장 안됨 | omelette API 없음 | 오멜렛 환경 필요 |

### 7.2 console 경고

```javascript
// id 없는 슬롯
console.warn('<image-slot> without an id will not persist its dropped image.');
```

---

## 8. 성능 최적화 팁

### 8.1 이미지 슬롯

```html
<!-- ✗ 나쁨 -->
<image-slot id="large" style="width: 2000px; height: 2000px">
</image-slot>

<!-- ✓ 좋음 (MAX_DIM=1200px로 제한됨) -->
<image-slot id="large" style="width: 800px; height: 600px">
</image-slot>
```

### 8.2 메뉴 성능

```javascript
// ✗ 나쁨 (매번 전체 DOM 생성)
navHtml();

// ✓ 좋음 (이미 캐시됨)
// church-nav.js는 한 번만 실행
```

---

## 9. 호환성 참고

### 9.1 웹컴포넌트 지원

```javascript
// 항상 확인
if ('customElements' in window) {
  // Web Components 지원
}
```

### 9.2 Fetch API

```javascript
// image-slot.js 상태 로드
fetch('.image-slots.state.json')
  .then(r => r.ok ? r.json() : null)
  .catch(() => {})
```

---

**문서 작성일**: 2026-06-17  
**버전**: 1.0  
**호환성**: Modern Browsers (IE11 제한 지원)
