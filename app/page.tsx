"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

const categories = [
  "뷰티",
  "패션",
  "푸드",
  "건강",
  "자동차",
  "홈•리빙",
  "반려동물",
  "스포츠•아웃도어",
  "도서",
  "테크•가전",
  "키즈",
  "여행",
  "시니어",
];

const acquisitionChannels = [
  "이메일",
  "카카오톡",
  "오픈채팅방",
  "인스타그램",
  "유튜브",
  "기타",
];

export default function KiiWiiLanding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    platform: "",
    activityName: "",
    accountUrl: "",
  });

  const [surveyData, setSurveyData] = useState({
    acquisitionChannel: "",
    otherChannelText: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSurveyChange = (field: string, value: string) => {
    setSurveyData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (field === "acquisitionChannel" && value !== "기타") {
      setSurveyData((prev) => ({ ...prev, otherChannelText: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    switch (step) {
      case 1:
        if (selectedCategories.length === 0) {
          newErrors.categories = "관심 분야를 최소 1개 이상 선택해주세요.";
        }
        break;
      case 2:
        if (!formData.name.trim()) {
          newErrors.name = "이름을 입력해주세요.";
        }
        if (!formData.phone.trim()) {
          newErrors.phone = "전화번호를 입력해주세요.";
        }
        if (!formData.email.trim()) {
          newErrors.email = "이메일을 입력해주세요.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "올바른 이메일 형식을 입력해주세요.";
        }
        break;
      case 3:
        if (!formData.platform.trim()) {
          newErrors.platform = "주요 활동 플랫폼을 입력해주세요.";
        }
        if (!formData.activityName.trim()) {
          newErrors.activityName = "활동명을 입력해주세요.";
        }
        if (!formData.accountUrl.trim()) {
          newErrors.accountUrl = "계정 URL을 입력해주세요.";
        }
        break;
      case 4:
        if (!surveyData.acquisitionChannel) {
          newErrors.acquisitionChannel =
            "KiiWii를 알게 된 경로를 선택해주세요.";
        }
        if (
          surveyData.acquisitionChannel === "기타" &&
          !surveyData.otherChannelText.trim()
        ) {
          newErrors.otherChannelText = "기타 경로를 입력해주세요.";
        }
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    // 1) 유효성 검사
    if (!validateStep(currentStep)) return;

    // 2) 프록시 API 호출
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedCategories,
          formData,
          surveyData,
        }),
      });

      const text = await response.text();
      console.log("프록시 응답:", text);

      if (text === "Success") {
        alert("신청이 완료되었습니다!");
        window.location.reload();
      } else {
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4">
        <div className="w-22 h-8 mb-4 flex items-left justify-left">
          {/* 왼쪽에 이미지 출력 next에서 public -> kiiwii-logo.png */}
          <img
            src="/kiiwii-logo.png"
            alt="KiiWii Logo"
            className="h-6 w-auto"
          />
        </div>
        <h1 className="text-lg font-bold text-black leading-tight mb-6">
          좋은 제품을 소개해
          <br />
          수익을 창출하는 플랫폼
        </h1>
      </div>

      {/* Video Section */}
      <div className="w-full h-52 bg-black mb-6 relative">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/D2-pJojoDi4?si=VroffSEXfNgj6qlE"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="px-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-8">
          KiiWii 큐레이터 모집
        </h2>
        {currentStep === 1 && (
          <div className="space-y-6">
            <Label className="text-sm font-medium text-gray-800 mb-3 block">
              관심 분야(복수 선택 가능)
            </Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`h-10 px-3 text-sm font-medium rounded-lg text-nowrap flex items-center justify-center transition-colors ${
                    selectedCategories.includes(category)
                      ? "bg-[#D0FBE9] text-[#12EB90] border border-[#12EB90]"
                      : "bg-white text-gray-800 border border-gray-200 shadow-sm hover:bg-gray-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {errors.categories && (
              <p className="text-red-500 text-sm mt-2">{errors.categories}</p>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-800 mb-2 block"
              >
                이름 *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`h-12 border-gray-200 shadow-sm ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-800 mb-2 block"
              >
                전화번호 *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`h-12 border-gray-200 shadow-sm ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-800 mb-2 block"
              >
                이메일 *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`h-12 border-gray-200 shadow-sm ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <Label
                htmlFor="platform"
                className="text-sm font-medium text-gray-800 mb-2 block"
              >
                주요 활동 플랫폼 *
              </Label>
              <Input
                id="platform"
                value={formData.platform}
                onChange={(e) => handleInputChange("platform", e.target.value)}
                className={`h-12 border-gray-200 shadow-sm ${
                  errors.platform ? "border-red-500" : ""
                }`}
              />
              {errors.platform && (
                <p className="text-red-500 text-sm mt-1">{errors.platform}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="activityName"
                className="text-sm font-medium text-gray-800 mb-2 block"
              >
                활동명 *
              </Label>
              <Input
                id="activityName"
                value={formData.activityName}
                onChange={(e) =>
                  handleInputChange("activityName", e.target.value)
                }
                className={`h-12 border-gray-200 shadow-sm ${
                  errors.activityName ? "border-red-500" : ""
                }`}
              />
              {errors.activityName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.activityName}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="accountUrl"
                className="text-sm font-medium text-gray-800 mb-2 block"
              >
                계정 URL *
              </Label>
              <Input
                id="accountUrl"
                value={formData.accountUrl}
                onChange={(e) =>
                  handleInputChange("accountUrl", e.target.value)
                }
                className={`h-12 border-gray-200 shadow-sm ${
                  errors.accountUrl ? "border-red-500" : ""
                }`}
              />
              {errors.accountUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.accountUrl}</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-800 mb-3 block">
                KiiWii를 어떻게 알게 되셨나요? *
              </Label>
              <Select
                value={surveyData.acquisitionChannel}
                onValueChange={(v) =>
                  handleSurveyChange("acquisitionChannel", v)
                }
              >
                <SelectTrigger
                  className={`h-12 ${
                    errors.acquisitionChannel ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {acquisitionChannels.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.acquisitionChannel && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.acquisitionChannel}
                </p>
              )}
            </div>

            {surveyData.acquisitionChannel === "기타" && (
              <div>
                <Label
                  htmlFor="otherChannel"
                  className="text-sm font-medium text-gray-800 mb-2 block"
                >
                  기타 경로를 입력해주세요 *
                </Label>
                <Input
                  id="otherChannel"
                  value={surveyData.otherChannelText}
                  onChange={(e) =>
                    handleSurveyChange("otherChannelText", e.target.value)
                  }
                  className={`h-12 border-gray-200 shadow-sm ${
                    errors.otherChannelText ? "border-red-500" : ""
                  }`}
                />
                {errors.otherChannelText && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.otherChannelText}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 my-8">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors ${
                step === currentStep
                  ? "bg-[#12EB90]"
                  : step < currentStep
                  ? "bg-[#12EB90]"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-row items-center justify-between gap-4 pb-8">
          {currentStep > 1 ? (
            <>
              <Button
                onClick={handleBack}
                className="w-1/2 h-12 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors"
              >
                이전 단계로
              </Button>
              <Button
                onClick={currentStep === 4 ? handleSubmit : handleNext}
                className="w-1/2 h-12 bg-[#12EB90] hover:bg-[#10d182] text-gray-800 font-semibold rounded-lg transition-colors"
              >
                {currentStep === 4 ? "제출하기" : "다음"}
              </Button>
            </>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full h-12 bg-[#12EB90] hover:bg-[#10d182] text-gray-800 font-semibold rounded-lg transition-colors"
            >
              다음
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
