import React from "react";
import "../styles/App.css";

const OPTIONS = [
  "뷰티",
  "패션",
  "푸드",
  "건강",
  "자동차",
  "홈·리빙",
  "반려동물",
  "스포츠·아웃도어",
  "도서",
  "테크·가전",
  "키즈",
  "여행",
  "시니어",
] as const;
type Option = (typeof OPTIONS)[number];

interface Props {
  selected: Option[];
  onToggle: (opt: Option) => void;
  onNext: () => void;
}

export default function Step1Interests({ selected, onToggle, onNext }: Props) {
  return (
    <div className="container">
      <div className="header">
        <img src="/logo.png" alt="KiiWii 로고" className="header__logo" />
        <div className="header__tagline">
          좋은 제품을 소개해
          <br />
          수익을 창출하는 플랫폼
        </div>
        <div className="header__video">
          <iframe
            src="https://www.youtube.com/embed/D2-pJojoDi4?si=Zd2mW5HRvNg7BMF6"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="main">
        <div className="main__title">KiiWii 큐레이터 모집</div>
        <div className="main__subtitle">관심 분야(복수 선택 가능)</div>
        <div className="options">
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`option-button ${
                selected.includes(opt) ? "active" : ""
              }`}
              onClick={() => onToggle(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="footer">
        <button
          className={`footer-button ${selected.length === 0 ? "disabled" : ""}`}
          onClick={onNext}
          disabled={selected.length === 0}
        >
          신청하기
        </button>
      </div>
    </div>
  );
}
