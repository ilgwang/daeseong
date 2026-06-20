# 대성교회 웹사이트

> 손정열 목사 시무. 남과 북의 성도들이 복음으로 하나 되어 하나님을 섬기고 세상을 섬기는 공동체

**웹사이트**: [www.daeseong.or.kr](http://www.daeseong.or.kr)  
**위치**: 서울시 송파구 오금동  
**기술 스택**: HTML5, CSS3, JavaScript, jQuery, Web Components

---

## 📋 목차

### 📚 문서

이 프로젝트의 기술 문서는 다음과 같이 구성되어 있습니다:

| 문서 | 설명 |
|------|------|
| **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** | 프로젝트 전체 개요, 기능, 기술 스택 분석 |
| **[TECHNICAL_DETAILS.md](TECHNICAL_DETAILS.md)** | JavaScript 흐름, CSS 계층, 성능 분석, 마이그레이션 가이드 |
| **[API_REFERENCE.md](API_REFERENCE.md)** | 함수 API, Web Component 속성, 클래스 참조 |
| **[README.md](README.md)** | 이 파일 (프로젝트 소개 및 시작 가이드) |

---

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone <repository-url>
cd daeseong
```

### 2. 로컬 서버 실행

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```

### 3. 브라우저에서 확인

```
http://localhost:8000
```

---

## 📂 프로젝트 구조

```
daeseong/
├── html/                           # HTML 페이지들
│   ├── index.html                  # 메인 페이지
│   ├── about.html                  # 교회소개
│   ├── news.html                   # 뉴스
│   ├── location.html               # 오시는 길
│   └── sermons-gallery.html        # 설교/갤러리
│
├── css/                            # 스타일시트
│   ├── main.css                    # 메인 스타일
│   ├── nav.css                     # 네비게이션
│   ├── about.css                   # 페이지별 스타일
│   ├── location.css
│   └── ...
│
├── js/                             # JavaScript
│   ├── church-nav.js               # 헤더/푸터/네비게이션
│   ├── image-slot.js               # 이미지 드롭 컴포넌트
│   └── jquery.bxslider.js          # 슬라이더 플러그인
│
├── image/                          # 이미지 자산
├── inc/                            # 포함 라이브러리
│   ├── modernizr-2.6.2.min.js
│   └── layerpop.js
│
├── member/                         # 회원 시스템
├── _ds_manifest.json               # 디자인 시스템 메니페스트
├── PROJECT_OVERVIEW.md             # 프로젝트 개요 ⭐
├── TECHNICAL_DETAILS.md            # 기술 세부사항 ⭐
├── API_REFERENCE.md                # API 참조서 ⭐
└── README.md                       # 이 파일
```

---

## 🎯 주요 기능

### 1. 반응형 네비게이션
- 데스크톱: 가로 메뉴
- 모바일: 햄버거 메뉴
- 드롭다운 서브메뉴
- 스크롤 시 헤더 고정 및 그림자 효과

**파일**: `js/church-nav.js`

### 2. 이미지 드롭 업로드
- 드래그-드롭 이미지 업로드
- 자동 리사이징 (WebP 포맷)
- 이미지 재프레임 (팬, 줌)
- 상태 저장 (`.image-slots.state.json`)

**파일**: `js/image-slot.js`

### 3. 스크롤 애니메이션
- IntersectionObserver로 스크롤 감지
- 화면에 들어온 요소 애니메이션

**파일**: `js/church-nav.js` (reveal 기능)

### 4. 이미지 슬라이더
- jQuery bxSlider로 배너 슬라이드
- 자동/수동 재생

**파일**: `js/jquery.bxslider.js`

---

## 🎨 디자인 시스템

### 색상 팔레트

```
Ink (#16233B)           → 기본 텍스트, 헤더
Ink-soft (#2C3A54)      → 보조 텍스트
Brass (#B28A4C)         → 강조, 액센트
Sage (#5E7363)          → 배경, 보조
Cream (#F6F1E7)         → 밝은 배경
Paper (#FBF8F2)         → 카드 배경
```

### 타이포그래피

```
Sans: Pretendard         → 본문, UI
Serif: Noto Serif KR     → 제목, 강조
```

> 상세 정보: **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** 섹션 11 참조

---

## 💻 개발 가이드

### 페이지 추가하기

1. **HTML 파일 생성** (`html/newpage.html`)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <title>새 페이지 - 대성교회</title>
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="/css/newpage.css">
</head>
<body data-page="newpage">
  <div id="wrap">
    <!-- 콘텐츠 -->
  </div>
  <script src="/js/church-nav.js"></script>
</body>
</html>
```

2. **메뉴에 추가** (`js/church-nav.js`)

```javascript
MENU = [
  // ... 기존 메뉴
  { key:'newpage', label:'새 페이지', href:'newpage.html' }
];
```

3. **스타일 작성** (`css/newpage.css`)

### 이미지 슬롯 사용하기

```html
<image-slot 
  id="profile-photo"
  style="width: 200px; height: 200px"
  shape="circle"
  placeholder="프로필 사진을 올려주세요">
</image-slot>
```

> 상세 정보: **[API_REFERENCE.md](API_REFERENCE.md)** 섹션 2 참조

### 스크롤 애니메이션 추가

```html
<!-- reveal 클래스 추가 -->
<div class="reveal">
  스크롤하면 나타나는 콘텐츠
</div>
```

> church-nav.js가 자동으로 IntersectionObserver 등록

---

## 🛠️ 개발 팁

### 디버깅

```javascript
// 현재 페이지 확인
console.log(document.body.getAttribute('data-page'));

// 네비게이션 상태 확인
console.log(document.querySelector('.navitem.active'));

// 이미지 슬롯 상태 확인
const slot = document.querySelector('image-slot#hero');
console.log(slot._view);  // { s, x, y }
```

### CSS 이슈 해결

```css
/* 레이아웃 문제 시 모든 요소 윤곽 표시 */
* { outline: 1px solid red; }

/* z-index 문제 시 */
.problematic { z-index: 9999; }
```

### 성능 최적화

```html
<!-- 폰트 미리 로드 -->
<link rel="preload" href="/fonts/pretendard.woff2" as="font">

<!-- 이미지 지연 로드 -->
<img loading="lazy" src="...">

<!-- CSS 최소화 -->
<link rel="stylesheet" href="/css/main.min.css">
```

---

## 🔄 Git 워크플로우

### 새로운 기능 추가

```bash
# 1. 브랜치 생성
git checkout -b feature/description

# 2. 변경 사항 커밋
git add .
git commit -m "feat: 기능 설명"

# 3. 푸시
git push origin feature/description

# 4. Pull Request 생성
```

### 버그 수정

```bash
# 1. 브랜치 생성
git checkout -b fix/description

# 2. 수정 및 커밋
git add .
git commit -m "fix: 버그 설명"

# 3. 푸시 및 PR
git push origin fix/description
```

### 최근 커밋

```
74f7f80  header UI 수정 중
4a7e493  유튜브 영상 UIUX 수정
5dedb05  Create Project
```

---

## 📊 브라우저 호환성

| 브라우저 | 지원 | 비고 |
|---------|------|------|
| Chrome | ✅ | 최신 버전 권장 |
| Firefox | ✅ | 최신 버전 권장 |
| Safari | ✅ | 최신 버전 권장 |
| Edge | ✅ | 최신 버전 권장 |
| IE 11 | ⚠️ | 부분 지원 (Modernizr) |

**Web Components 지원**: Chrome, Firefox, Safari, Edge  
**IE 11 호환**: Polyfills 필요

---

## 🚨 알려진 문제점

### 1. 레거시 코드 의존성
- jQuery 1.8.3 사용 (매우 오래됨)
- 인라인 HTML 스크립트

### 2. 성능
- 외부 CDN 의존 (jQuery, Fonts)
- CSS/JS 최소화 미흡

### 3. 보안
- CSP (Content Security Policy) 미설정
- 외부 리소스 의존성

---

## 📈 개선 로드맵

### 우선순위 높음
- [ ] jQuery 제거 및 Vanilla JS 마이그레이션
- [ ] 외부 리소스 자체 호스팅
- [ ] CSS/JS 번들링 및 최소화

### 우선순위 중간
- [ ] 웹컴포넌트 확대 적용
- [ ] TypeScript 도입
- [ ] 자동 테스트 추가

### 우선순위 낮음
- [ ] 번들러 도입 (Webpack/Vite)
- [ ] 접근성 개선 (WCAG 2.1)
- [ ] PWA 지원

> 자세한 마이그레이션 계획: **[TECHNICAL_DETAILS.md](TECHNICAL_DETAILS.md)** 섹션 11 참조

---

## 📚 API 문서

### 주요 API

| API | 파일 | 설명 |
|-----|------|------|
| `church-nav.js` | `js/church-nav.js` | 네비게이션, 헤더, 푸터 |
| `<image-slot>` | `js/image-slot.js` | 이미지 드롭 컴포넌트 |
| `IntersectionObserver` | `js/church-nav.js` | 스크롤 애니메이션 |

> 전체 API 문서: **[API_REFERENCE.md](API_REFERENCE.md)**

---

## 🐛 버그 리포트 및 기능 요청

### 버그 리포트

1. 버그 재현 방법 기술
2. 예상 동작 vs 실제 동작
3. 브라우저 및 OS 정보
4. 스크린샷 또는 콘솔 에러

### 기능 요청

1. 기능의 목적 설명
2. 예상 사용 방법
3. 구현 우선순위

---

## 📞 연락처

**교회 웹사이트**: www.daeseong.or.kr  
**담임목사**: 손정열 목사

---

## 📄 라이선스

© 2026 대한예수교장로회 대성교회. All rights reserved.

---

## 📖 추가 학습 자료

### 웹 기술
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

### 성능 최적화
- [Web.dev - Performance](https://web.dev/performance/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### 접근성
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)

---

## 🎓 프로젝트 학습 순서

이 프로젝트를 이해하려면 다음 순서로 읽기를 권장합니다:

1. **README.md** (이 파일) - 프로젝트 개요
2. **PROJECT_OVERVIEW.md** - 구조 및 기능
3. **API_REFERENCE.md** - 사용 가능한 API
4. **TECHNICAL_DETAILS.md** - 기술 심화 학습

---

## ✨ 주요 특징

### 🌐 반응형 디자인
모바일부터 데스크톱까지 모든 화면 크기 지원

### 🎨 우아한 UI
현대적이고 깔끔한 디자인 시스템

### ⚡ 빠른 성능
최적화된 이미지 처리 및 로딩

### 🔒 안전한 상태 관리
이미지 데이터의 안전한 저장 및 관리

### 📱 모바일 친화적
터치 친화적 UI 및 상호작용

---

**마지막 업데이트**: 2026-06-17  
**문서 버전**: 1.0  
**작성**: Claude Code

> 💡 **팁**: 프로젝트의 각 부분에 대해 더 알아보려면 각 마크다운 파일의 특정 섹션을 참조하세요.
