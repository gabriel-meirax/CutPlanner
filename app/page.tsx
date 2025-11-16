"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import FormSection from "@/components/FormSection";
import ResultsSection from "@/components/ResultsSection";
import Footer from "@/components/Footer";
import { OptimizationResult } from "@/types";

export default function Home() {
  const [optimizationResult, setOptimizationResult] =
    useState<OptimizationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptimization = async (formData: any) => {
    setIsLoading(true);
    try {
      const optimizationType = formData.optimizationType || "1d";
      // Use NEXT_PUBLIC_PYTHON_API_URL if set, else fallback to /api for local dev
      const pythonApiUrl = process.env.NEXT_PUBLIC_PYTHON_API_URL || "";
      const endpoint = pythonApiUrl
        ? `${pythonApiUrl}/optimize/${optimizationType}`
        : `/api/optimize/${optimizationType}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ detail: "Erro desconhecido" }));
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      setOptimizationResult(result);
    } catch (error: any) {
      console.error("Erro na otimização:", error);
      alert("Erro ao executar otimização: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOptimizationResult(null);
  };

  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <FormSection onOptimize={handleOptimization} isLoading={isLoading} />
      {optimizationResult && (
        <ResultsSection result={optimizationResult} onReset={handleReset} />
      )}
      <Footer />
    </main>
  );
}
