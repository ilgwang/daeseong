# 대성교회 웹사이트 - 프로젝트 개요

## 1. 프로젝트 정보

**프로젝트명**: 대성교회 웹사이트 (Daeseong Church Website)  
**담임목사**: 손정열 목사  
**주소**: 송파구 오금동 (서울)  
**웹사이트**: www.daeseong.or.kr  
**기술 스택**: HTML5, CSS3, JavaScript (jQuery), 웹컴포넌트

---

## 2. 프로젝트 구조

```
daeseong/
├── html/                          # HTML 페이지 파일들
│   ├── index.html                 # 메인 페이지
│   ├── about.html                 # 교회소개 페이지
│   ├── news.html                  # 뉴스/소식 페이지
│   ├── location.html              # 오시는 길 페이지
│   ├── sermons-gallery.html       # 설교/갤러리 페이지
│   └── header.html                # 헤더 컴포넌트 (부분 페이지)
│
├── css/                           # 스타일시트
│   ├── main.css                   # 메인 스타일
│   ├── nav.css                    # 네비게이션 스타일
│   ├── style.css                  # 추가 스타일
│   ├── reset.css                  # CSS 리셋
│   ├── normalize.css              # CSS 정규화
│   ├── font.css                   # 폰트 설정
│   ├── about.css                  # 교회소개 페이지 스타일
│   ├── location.css               # 오시는 길 페이지 스타일
│   ├── sermons-gallery.css        # 설교/갤러리 스타일
│   ├── modern-design.css          # 모던 디자인 스타일
│   ├── responsible.css            # 반응형 디자인
│   ├── jquery.bxslider.css        # 슬라이더 플러그인 스타일
│   ├── slicknav.css               # 모바일 메뉴 스타일
│   ├── superfish.css              # 드롭다운 메뉴 스타일
│   └── fonts.css                  # 웹폰트 정의
│
├── js/                            # JavaScript 파일들
│   ├── church-nav.js              # 헤더/푸터 주입 + 네비게이션 로직
│   ├── image-slot.js              # 이미지 드롭 웹컴포넌트
│   └── jquery.bxslider.js         # 이미지 슬라이더 플러그인
│
├── inc/                           # 포함 파일들
│   ├── modernizr-2.6.2.min.js    # HTML5 폴리필 라이브러리
│   └── layerpop.js                # 팝업 관련 스크립트
│
├── image/                         # 이미지 자산
│   ├── banner1.jpg ~ banner4.jpg  # 배너 이미지
│   ├── footer_logo2.png           # 푸터 로고
│   ├── index_logo_daeseong.png    # 메인 로고
│   ├── vis_*.jpg                  # 시각적 배경 이미지
│   ├── board*.jpg                 # 게시판 이미지
│   ├── map.jpg                    # 지도 이미지
│   └── aboutbg.jpg                # 교회소개 배경
│
├── member/                        # 회원 관련 페이지
│   └── js/jquery.popup.js         # 팝업 플러그인
│
├── _ds_bundle.js                  # 번들 파일 (디자인 시스템 관련)
├── _ds_manifest.json              # 디자인 시스템 메니페스트
├── .git/                          # Git 저장소
└── README.md                       # (새로 작성)
```

---

## 3. 주요 기능 및 구성

### 3.1 네비게이션 시스템 (church-nav.js)

#### 메뉴 구조
```javascript
{
  '교회소개' → about.html
  '예배·설교' → sermons.html (하위 메뉴)
    - 주일예배 설교
    - 수요기도회 설교
    - 금요철야기도회 설교
  '커뮤니티' → community.html (하위 메뉴)
    - 공지사항
    - 교회소식
    - 주보
    - 갤러리
    - 칼럼
    - Bible Study
  '선교' → missions.html
  '오시는 길' → location.html
}
```

#### 주요 기능
- **동적 헤더/푸터 주입**: `data-page` 속성으로 페이지 타입 식별
- **상단 유틸리티 바**: 로그인, 회원가입, 오시는 길 링크
- **반응형 모바일 메뉴**: 모바일에서 햄버거 메뉴로 전환
- **스크롤 이벤트 처리**: 스크롤 시 헤더에 그림자 효과 추가
- **인터섹션 옵저버**: reveal 클래스 요소들의 스크롤 애니메이션 처리

### 3.2 이미지 드롭 컴포넌트 (image-slot.js)

커스텀 웹컴포넌트 `<image-slot>`으로 사용자가 이미지를 드래그-드롭으로 업로드할 수 있음.

#### 주요 특징
- **드래그-드롭 지원**: 이미지 파일을 드롭하여 업로드
- **이미지 리사이징**: Canvas를 이용한 자동 리사이징 (WebP 포맷, 1200px 제한)
- **재프레임 모드**: 더블클릭으로 이미지 위치/크기 조정
- **상태 저장**: `.image-slots.state.json` 사이드카 파일에 이미지 저장
- **지원 형식**: PNG, JPEG, WebP, AVIF

#### 사용 예시
```html
<image-slot 
  id="hero" 
  style="width:800px;height:450px" 
  shape="rounded" 
  radius="20"
  placeholder="Drop a hero image">
</image-slot>
```

### 3.3 HTML 페이지들

#### index.html (메인 페이지)
- 헤더와 푸터 삽입 없음 (별도로 렌더링)
- jQuery 기반의 레거시 구조
- 인라인 스크립트 포함 (쿠키 처리, 성경 검색 등)

#### about.html (교회소개)
- `data-page="about"` 속성으로 활성 메뉴 표시
- 네비게이션과 푸터 자동 주입
- 시각적 섹션과 콘텐츠 레이아웃

#### 기타 페이지
- news.html, location.html, sermons-gallery.html 등
- 공통으로 church-nav.js를 통해 헤더/푸터 관리

---

## 4. 기술 스택 분석

### 4.1 프론트엔드 기술

| 기술 | 용도 | 상태 |
|------|------|------|
| HTML5 | 마크업 | 활성 |
| CSS3 | 스타일링 | 활성 |
| JavaScript (Vanilla) | 상호작용 | 활성 |
| jQuery | DOM 조작, 이벤트 | 활성 (레거시) |
| 웹컴포넌트 | 이미지 슬롯 컴포넌트 | 신규 추가 |

### 4.2 플러그인 및 라이브러리

| 라이브러리 | 기능 | 파일 |
|-----------|------|------|
| bxslider | 이미지 슬라이더 | jquery.bxslider.js/css |
| slicknav | 모바일 메뉴 | jquery.slicknav.js |
| jQuery UI | UI 위젯 | - |
| Modernizr | HTML5 폴리필 | modernizr-2.6.2.min.js |
| Superfish | 드롭다운 메뉴 | superfish.css |

### 4.3 폰트 및 디자인 시스템

**_ds_manifest.json**에 정의된 디자인 토큰:

```json
Colors:
- --ink: #16233B (검정색)
- --ink-soft: #2C3A54 (진한 회색)
- --cream: #F6F1E7 (크림색)
- --cream-deep: #EDE5D5 (진한 크림)
- --paper: #FBF8F2 (종이색)
- --brass: #B28A4C (황동색)
- --brass-deep: #94703A (진한 황동)
- --sage: #5E7363 (세이지 초록)
- --line: rgba(22,35,59,.14) (선 색)
- --muted: #6A7488 (음소거된 회색)

Fonts:
- --serif: "Noto Serif KR" (세리프)
- --sans: "Pretendard" (산스 세리프)

Shadows:
- --shadow-sm: 작은 그림자
- --shadow-md: 중간 그림자

Sizing:
- --maxw: 1200px (최대 폭)
```

---

## 5. 핵심 JavaScript 로직

### 5.1 church-nav.js 구조

```javascript
// 1. 페이지 타입 감지
const page = document.body.getAttribute('data-page') || 'home';

// 2. 메뉴 데이터 정의
const MENU = [
  { key, label, href, sub: [...] }
];

// 3. HTML 생성 함수
navHtml()      // 헤더 + 네비게이션 HTML
mobileHtml()   // 모바일 메뉴 HTML
footerHtml()   // 푸터 HTML

// 4. DOM 주입 (홈페이지 제외)
if(page !== 'home') {
  insertAdjacentHTML('afterbegin', navHtml());
  insertAdjacentHTML('beforeend', footerHtml());
}

// 5. 이벤트 핸들링
- 스크롤 시 헤더 그림자
- 모바일 메뉴 토글
- IntersectionObserver로 애니메이션 처리
```

### 5.2 image-slot.js 구조

```javascript
// 1. 상수 정의
STATE_FILE = '.image-slots.state.json'
MAX_DIM = 1200
ACCEPT = ['image/png', 'image/jpeg', ...]

// 2. 상태 관리
const subs = new Set()
let slots = {} // 모든 슬롯의 이미지 상태
let loaded = false

// 3. 핵심 함수
load()        // 상태 파일 로드
save()        // 상태 파일 저장
toDataUrl()   // 이미지를 Data URL로 변환
setSlot()     // 슬롯 상태 업데이트
getSlot()     // 슬롯 상태 조회

// 4. CustomElement 클래스
class ImageSlot extends HTMLElement {
  connectedCallback()       // DOM 연결 시
  attributeChangedCallback() // 속성 변경 시
  handleEvent()             // 드래그 이벤트 처리
  _ingest()                 // 파일 수입
  _render()                 // UI 렌더링
  _enterReframe()           // 재프레임 모드 진입
  _exitReframe()            // 재프레임 모드 해제
}
```

---

## 6. CSS 아키텍처

### 6.1 계층 구조

```
normalize.css          # 브라우저 기본값 정규화
↓
reset.css             # CSS 리셋
↓
fonts.css             # 폰트 로드
↓
main.css              # 메인 스타일 (헤더, GNB, 시각적 섹션, 푸터)
↓
nav.css               # 네비게이션 스타일
↓
responsible.css       # 반응형 디자인 (미디어 쿼리)
↓
page-specific.css     # 페이지별 스타일 (about.css, location.css 등)
↓
plugin.css            # 플러그인 스타일 (jquery.bxslider.css, slicknav.css)
```

### 6.2 주요 CSS 클래스

```css
/* 레이아웃 */
#wrap          - 전체 래퍼
#vis_sec       - 시각적 섹션
.content       - 콘텐츠 영역

/* 헤더 */
#header        - 헤더 컨테이너
.header_top_item - 상단 유틸리티 바
.header_gnb    - 글로벌 네비게이션

/* 네비게이션 */
.nav           - 메인 네비게이션
.navitem       - 네비게이션 아이템
.dropdown      - 드롭다운 메뉴
.mobile-menu   - 모바일 메뉴

/* 푸터 */
footer.site    - 푸터
.fgrid         - 푸터 그리드
.fcol          - 푸터 열

/* 유틸리티 */
.utility       - 유틸리티 바
.burger        - 햄버거 메뉴 버튼
.reveal        - 스크롤 애니메이션
.scrolled      - 스크롤 상태 표시
```

---

## 7. 반응형 디자인

### 7.1 미디어 쿼리 주요 포인트

```css
/* style.css */
@media screen and (max-width: 1024px) {
  #menu { display: none; }
  .slicknav_menu { display: block; }
}

/* responsible.css */
- 모바일 레이아웃 (< 768px)
- 태블릿 레이아웃 (768px - 1024px)
- 데스크톱 레이아웃 (> 1024px)
```

---

## 8. 현재 개발 상황

### 8.1 최근 커밋 히스토리
- `74f7f80`: header UI 수정 중
- `4a7e493`: 유튜브 영상 UIUX 수정
- `5dedb05`: Create Project

### 8.2 진행 중인 작업
- 헤더 UI 개선 중
- 레거시 코드와 모던 코드의 혼합 구조

---

## 9. 아키텍처 패턴

### 9.1 레거시 + 모던 하이브리드

**레거시 부분**:
- jQuery 기반 DOM 조작
- 인라인 스크립트 (1990-2000년대 스타일)
- 레거시 HTML 마크업

**모던 부분**:
- 웹컴포넌트 (Custom Elements)
- Shadow DOM 캡슐화
- 현대적 JavaScript (async/await, 화살표 함수)
- 디자인 시스템 (토큰 기반)

### 9.2 컴포넌트 기반 아키텍처

```
Application
├── Navigation System (church-nav.js)
│   ├── Header
│   ├── Navigation Menu
│   └── Footer
├── Image Slot Component (image-slot.js)
│   ├── Drop Zone
│   ├── Reframe Mode
│   └── State Management
└── Page Components
    ├── Home Page
    ├── About Page
    ├── Sermons Page
    ├── Location Page
    └── News Page
```

---

## 10. 문제점 및 개선 사항

### 10.1 식별된 문제점

1. **레거시 코드**: jQuery 1.8.3 사용 (매우 오래됨)
2. **HTML 인라인 스크립트**: 보안 위험 및 유지보수 어려움
3. **일관성 없는 마크업**: 페이지별로 다른 구조
4. **CSS 충돌 위험**: 글로벌 스타일 오버라이드
5. **폰트 로딩**: 구글 폰트 외부 로드

### 10.2 권장 개선 사항

1. **점진적 모던화**
   - jQuery 제거 (Vanilla JS로 마이그레이션)
   - 웹컴포넌트 활용 확대
   - ES6+ 문법 사용

2. **컴포넌트 체계화**
   - 모든 UI를 웹컴포넌트로 변환
   - 공통 스타일 라이브러리 구축

3. **성능 최적화**
   - 번들링 및 최소화
   - 이미지 최적화
   - 폰트 로딩 최적화

4. **접근성 개선**
   - ARIA 속성 추가
   - 키보드 네비게이션 개선
   - 시맨틱 HTML 사용

---

## 11. 디자인 시스템

### 11.1 색상 팔레트

| 이름 | 값 | 용도 |
|------|-----|------|
| Ink | #16233B | 기본 텍스트, 헤더 |
| Brass | #B28A4C | 악센트, 하이라이트 |
| Sage | #5E7363 | 보조 요소 |
| Cream | #F6F1E7 | 배경 |
| Paper | #FBF8F2 | 카드 배경 |

### 11.2 타이포그래피

| 용도 | 폰트 | 가중치 |
|------|------|--------|
| 본문 | Pretendard | 400 |
| 제목 | Noto Serif KR | 600, 700 |
| 강조 | Pretendard | 500, 600 |

---

## 12. 배포 및 환경

### 12.1 파일 구조

- 모든 리소스가 웹루트에서 상대 경로로 접근
- `/css/`, `/js/`, `/image/`, `/inc/`, `/html/` 디렉토리 구조

### 12.2 CDN 리소스

- jQuery (code.jquery.com)
- jQuery UI (code.jquery.com)
- Google Fonts

---

## 13. 보안 고려사항

### 13.1 현재 상황

- 외부 CDN 의존 (jQuery, fonts)
- 인라인 스크립트 (잠재적 XSS 위험)
- 쿠키 기반 세션 관리 (레거시)

### 13.2 개선 권장

1. 외부 리소스 자체 호스팅
2. CSP (Content Security Policy) 설정
3. 인라인 스크립트 제거
4. 정기적인 의존성 업데이트

---

## 14. 개발 워크플로우

### 14.1 지역 개발

```bash
# 파일 변경 후
git add .
git commit -m "커밋 메시지"
git push origin main
```

### 14.2 테스트

- 로컬 서버에서 페이지 로드 테스트
- 브라우저 호환성 테스트 (Chrome, Safari, Firefox, Edge)
- 반응형 디자인 테스트 (모바일, 태블릿, 데스크톱)

---

## 15. 더 알아보기

이 프로젝트의 상세 정보는 다음 메모리 파일들을 참조하세요:

- `project_overview.md` - 프로젝트 개요 및 배경
- `project_structure.md` - 디렉토리 구조 및 파일 설명
- `key_functions.md` - 주요 함수 및 기능 상세 분석
- `technical_details.md` - 기술 세부사항 및 코드 분석

---

**문서 작성일**: 2026-06-17  
**버전**: 1.0  
**작성자**: Claude Code
