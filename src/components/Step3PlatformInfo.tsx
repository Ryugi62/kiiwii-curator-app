import React from "react";
import "../styles/App.css";

interface PlatformInfo {
  platform: string;
  channelName: string;
  channelUrl: string;
}

interface Props {
  data: PlatformInfo;
  onChange: (field: keyof PlatformInfo, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step3PlatformInfo({
  data,
  onChange,
  onNext,
  onPrev,
}: Props) {
  const isValid = data.platform && data.channelName && data.channelUrl;

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
        <div className="main__title">활동 플랫폼 정보</div>
        <div className="main__subtitle">주요 활동 플랫폼을 입력해주세요</div>
        <input
          type="text"
          placeholder="플랫폼 (예: 인스타그램)"
          className="form-input"
          value={data.platform}
          onChange={(e) => onChange("platform", e.target.value)}
        />
        <input
          type="text"
          placeholder="활동명 (예: 길동이올시다)"
          className="form-input"
          value={data.channelName}
          onChange={(e) => onChange("channelName", e.target.value)}
        />
        <input
          type="url"
          placeholder="계정 URL"
          className="form-input"
          value={data.channelUrl}
          onChange={(e) => onChange("channelUrl", e.target.value)}
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
