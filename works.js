// ============================================================
// 포트폴리오 데이터 — 이 파일만 수정하면 갤러리가 바뀝니다.
// ============================================================

window.PROFILE = {
  name: "YOUR NAME",                       // TODO: 이름 또는 닉네임
  title: "AI로 만든 작품들",
  intro: "TODO: 한 줄 소개를 적으세요.",
  links: [
    // TODO: 실제 링크로 교체하세요. 필요 없는 항목은 삭제하세요.
    { label: "Instagram", url: "#" },
    { label: "Email", url: "mailto:you@example.com" }
  ]
};

// 작품 항목 설명
//  type : "image" | "video"   (카테고리 필터에 쓰는 값은 category)
//  src  : 이미지/영상 파일 경로 (예: "assets/work01.jpg"). 비워두면 샘플 표지가 표시됨
//  poster: 영상일 때 썸네일 이미지 경로 (선택)
//  sample: true 이면 "SAMPLE" 배지 표시. 실제 작품을 넣으면 삭제하세요.
//  tool / prompt / year : 상세 화면에 표시. 없으면 생략하세요.
window.WORKS = [
  {
    title: "샘플 작품 01",
    category: "이미지",
    type: "image",
    src: "",
    description: "TODO: 작품 설명을 적으세요.",
    tool: "TODO: 사용한 AI 도구",
    year: "2026",
    sample: true,
    hue: 250
  },
  {
    title: "샘플 작품 02",
    category: "영상",
    type: "video",
    src: "",
    description: "TODO: 작품 설명을 적으세요.",
    tool: "TODO: 사용한 AI 도구",
    year: "2026",
    sample: true,
    hue: 190
  },
  {
    title: "샘플 작품 03",
    category: "이미지",
    type: "image",
    src: "",
    description: "TODO: 작품 설명을 적으세요.",
    tool: "TODO: 사용한 AI 도구",
    year: "2026",
    sample: true,
    hue: 330
  },
  {
    title: "샘플 작품 04",
    category: "음악",
    type: "image",
    src: "",
    description: "TODO: 음악은 표지 이미지와 링크를 넣는 방식을 권장합니다.",
    tool: "TODO: 사용한 AI 도구",
    year: "2026",
    sample: true,
    hue: 40
  },
  {
    title: "샘플 작품 05",
    category: "이미지",
    type: "image",
    src: "",
    description: "TODO: 작품 설명을 적으세요.",
    tool: "TODO: 사용한 AI 도구",
    year: "2026",
    sample: true,
    hue: 150
  },
  {
    title: "샘플 작품 06",
    category: "영상",
    type: "video",
    src: "",
    description: "TODO: 작품 설명을 적으세요.",
    tool: "TODO: 사용한 AI 도구",
    year: "2026",
    sample: true,
    hue: 10
  }
];
