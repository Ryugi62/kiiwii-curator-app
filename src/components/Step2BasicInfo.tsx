import React from "react";
import "../styles/App.css";

interface BasicInfo {
  name: string;
  phone: string;
  email: string;
}

interface Props {
  data: BasicInfo;
  onChange: (field: keyof BasicInfo, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step2BasicInfo({
  data,
  onChange,
  onNext,
  onPrev,
}: Props) {
  const isValid = data.name && data.phone && data.email;

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
        <div className="main__title">기본 정보 입력</div>
        <div className="main__subtitle">
          이름, 연락처, 이메일을 입력해주세요
        </div>
        <input
          type="text"
          placeholder="이름"
          className="form-input"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
        <input
          type="tel"
          placeholder="전화번호 (예: 010-1234-5678)"
          className="form-input"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
        <input
          type="email"
          placeholder="이메일"
          className="form-input"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>

      <div className="footer">
        <button className="footer-button" onClick={onPrev}>
          이전
        </button>
        <button
          className={`footer-button ${!isValid ? "disabled" : ""}`}
          onClick={onNext}
          disabled={!isValid}
        >
          다음
        </button>
      </div>
    </div>
  );
}
