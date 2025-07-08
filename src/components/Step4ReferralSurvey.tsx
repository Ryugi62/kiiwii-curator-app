import React from "react";
import "../styles/App.css";

const SOURCES = [
  "이메일",
  "카카오톡",
  "오픈채팅방",
  "인스타그램",
  "유튜브",
  "기타",
] as const;
type Source = (typeof SOURCES)[number];

interface Props {
  selected: Source | "";
  onChange: (src: Source) => void;
  onSubmit: () => void;
  onPrev: () => void;
}

export default function Step4ReferralSurvey({
  selected,
  onChange,
  onSubmit,
  onPrev,
}: Props) {
  return (
    <div className="container">
      <div className="header">
        <img src="/logo.png" alt="KiiWii 로고" className="header__logo" />
        <div className="header__tagline">
          좋은 제품을 소개해
          <br />
          수익을 창출하는 플랫폼
        </div>
      </div>

      <div className="main">
        <div className="main__title">유입 경로 설문</div>
        <div className="main__subtitle">
          어디서 키위 큐레이터를 알게 되셨나요?
        </div>
        <div className="options">
          {SOURCES.map((src) => (
            <button
              key={src}
              className={`option-button ${selected === src ? "active" : ""}`}
              onClick={() => onChange(src)}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      <div className="footer">
        <button className="footer-button" onClick={onPrev}>
          이전
        </button>
        <button
          className={`footer-button ${!selected ? "disabled" : ""}`}
          onClick={onSubmit}
          disabled={!selected}
        >
          완료
        </button>
      </div>
    </div>
  );
}
