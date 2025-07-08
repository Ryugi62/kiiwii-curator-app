// 프로젝트 루트에 있는 postcss.config.cjs
module.exports = {
  plugins: [
    // Tailwind의 PostCSS 플러그인 – 반드시 @tailwindcss/postcss 패키지를 가리킵니다.
    require("@tailwindcss/postcss"),
    // Autoprefixer
    require("autoprefixer"),
  ],
};
