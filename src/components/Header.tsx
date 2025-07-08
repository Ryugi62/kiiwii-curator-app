import React from "react";

interface HeaderProps {
  withVideo?: boolean;
}

export default function Header({ withVideo = false }: HeaderProps) {
  return (
    <header className="w-full max-w-[375px] mx-auto">
      {/* 상단 로고 + 문구 */}
      <div className="px-6 pt-6">
        <img src="/logo.svg" alt="KiiWii 로고" className="h-8" />
        <p className="mt-2 text-[18px] font-bold leading-[140%]">
          좋은 제품을 소개해
          <br />
          수익을 창출하는 플랫폼
        </p>
      </div>

      {/* 옵션: 비디오 영역 */}
      {withVideo && (
        <div className="px-6 mt-4">
          <div className="w-full h-[211px] bg-black rounded overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/D2-pJojoDi4?si=Zd2mW5HRvNg7BMF6"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            ></iframe>
          </div>
        </div>
      )}
    </header>
  );
}
