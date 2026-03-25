# MyAcademy — 선형대수 × 그래픽스 × AI 학습 프로젝트

## 프로젝트 구조

```
MyAcademy/
├── curriculum/               # 커리큘럼 정의 (md)
│   └── linear_algebra_curriculum.md
├── learning_methodology.md   # 학습 방법론
├── MDs/                      # 수업 초안 MD (검수용, git 추적 안 됨)
│   └── p1_01_벡터의_이중_정체성.md  등
├── Docs/                     # 최종 HTML + GitHub Pages
│   ├── style.css             # 공용 스타일 (다크 테마)
│   ├── canvas-lib.js         # 캔버스 유틸리티 라이브러리
│   ├── nav.js                # 네비게이션 중앙 관리
│   ├── index.html            # 홈/목차
│   └── p1_01_*.html          # 수업별 페이지
└── CLAUDE.md
```

## 워크플로우

### 1단계: MD 초안 생성 (`MDs/`)
- 파일명: `pN_MM_주제.md` (Phase번호_문서번호_주제)
  - 예: `p1_01_벡터의_이중_정체성.md`, `p1_02_내적의_기하학.md`
- 내용 구성:
  - 개념 설명 (기하학적 직관 → 공식 순서)
  - 인터랙티브 시각화 설명 (어떤 캔버스를 만들지)
  - 핵심 수식 (MathJax용)
  - 직접 해보기 과제
  - 체크포인트 질문
- **수식은 LaTeX로 작성** (HTML 변환 시 MathJax가 렌더링)
- `.gitignore`에 `MDs/` 포함 — git 추적 안 됨

### 2단계: 사용자 검수
- MD 내용을 사용자가 확인
- "좋다" 하면 3단계 진행
- 수정 요청 시 MD 수정 후 재검수

### 3단계: HTML 페이지 생성 (`Docs/`)
- 파일명: MD와 동일한 네이밍 (`pN_MM_주제.html`)
- **캔버스 시각화는 canvas-lib.js 사용** — 직접 Canvas 코드 작성 금지
- **수식은 MathJax** — CDN 로드
- **코드 블록은 MD에서 직접 복사** (환각 방지)
- Docs/ 변경 push 시 GitHub Pages 자동 배포

## 파일 네이밍 규칙

```
p{Phase}_{순번}_{주제}.html

Phase 1: p1_01 ~ p1_99
Phase 2: p2_01 ~ p2_99
...

예시:
p1_01_벡터의_이중_정체성.html
p1_02_내적의_기하학.html
p1_03_외적의_기하학.html
p1_04_기저와_좌표계.html
p1_05_동차좌표.html
p1_06_체크포인트.html
p2_01_행렬은_선형변환.html
```

## HTML 페이지 작성 규칙

새 HTML 파일 작성 시:

1. **사이드바/page-nav는 비워둠** — nav.js가 자동 렌더링
   ```html
   <nav class="sidebar" id="sidebar"></nav>
   <div id="sidebarOverlay"></div>
   <!-- ... 본문 ... -->
   <div class="page-nav" id="page-nav"></div>
   ```

2. **PAGE_ID와 ON_THIS_PAGE 선언** — `</main>` 직전에:
   ```html
   <script>
   var PAGE_ID = "p1_01";
   var ON_THIS_PAGE = [
     { id: "section-id", label: "섹션 제목" },
     // ...
   ];
   </script>
   <script src="nav.js"></script>
   ```

3. **nav.js에 페이지 등록** — `NAV_DATA.pages` 배열에 항목 추가
   - 새 Phase의 첫 항목에는 `card` 객체 포함 (index 레슨카드용)
   - `xp` level/percent 업데이트

4. **인라인 script 금지** — 햄버거/테마 토글은 nav.js가 처리

5. **캔버스 라이브러리 로드 순서**:
   ```html
   <script src="canvas-lib.js"></script>
   <script>
   // 수업별 캔버스 코드
   </script>
   ```

6. **MathJax 로드**:
   ```html
   <script>
   MathJax = {
       tex: { inlineMath: [['$','$']], displayMath: [['$$','$$']] },
       svg: { fontCache: 'global' }
   };
   </script>
   <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js" async></script>
   ```

## nav.js 페이지 등록 형식

```js
// Phase의 첫 번째 항목 (card 포함)
{
  id: "p1_01",
  file: "p1_01_벡터의_이중_정체성.html",
  title: "벡터의 이중 정체성",
  badge: "lesson",          // "lesson" | "checkpoint" | "supplement"
  group: "Phase 1 — 벡터와 내적·외적",
  card: {
    num: "01",
    cardTitle: "벡터와 내적·외적의 기하학",
    desc: "점 vs 방향, 내적 = 투영, 외적 = 법선, 기저 = 좌표의 자(ruler).",
    tags: ["벡터", "내적", "외적", "기저", "동차좌표"],
  },
  subLabel: "📐 벡터의 이중 정체성",
},

// Phase 내 일반 항목
{
  id: "p1_02",
  file: "p1_02_내적의_기하학.html",
  title: "내적의 기하학",
  badge: "lesson",
  group: "Phase 1 — 벡터와 내적·외적",
  subLabel: "📐 내적의 기하학",
},

// 체크포인트
{
  id: "p1_06",
  file: "p1_06_체크포인트.html",
  title: "체크포인트",
  badge: "checkpoint",
  group: "Phase 1 — 벡터와 내적·외적",
  subLabel: "✅ 체크포인트",
},
```

## 수업 콘텐츠 원칙

- **기하학적 직관 먼저, 공식은 나중에**
- **모든 수업 페이지에 최소 1개의 인터랙티브 캔버스**
- **canvas-lib.js의 createCanvas() 사용** — 격자, 벡터, 드래그, 투영 등 재사용
- **시각화의 기본 상태(default)가 가장 교육적인 케이스를 보여주도록** 설계
- **복잡한 개념은 별도 페이지로 분리** (예: 동차 좌표)

## 체크포인트 페이지

- 난수로 매번 새로운 문제 생성
- 수치 입력 → epsilon 허용 오차 자동 채점
- **틀린 문제에 비주얼 오답노트** — canvas-lib.js로 시각적 해설
- 맞은 문제에도 풀이 표시
- "새 문제" 버튼으로 재생성

## 스타일 가이드

- 다크 테마 기본 (라이트 테마 토글 지원)
- 색상 팔레트:
  - vec-a (골드): `#e8c840` — 첫 번째 벡터, 기저 e₁
  - vec-b (시안): `#58c4dd` — 두 번째 벡터, 기저 e₂
  - vec-c (그린): `#83c167` — 결과, 점 P
  - proj (빨강): `#fc6255` — 투영
  - accent (보라): `#ab6bdb` — 강조, 기저 좌표
- Google Fonts: Noto Sans KR
- 수식: MathJax (SVG 출력)
- 코드 폰트: Cascadia Code → Fira Code → Consolas 순 fallback
