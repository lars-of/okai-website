"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { IconArrowRight, IconCheck } from "./Icons";
import { RadarChart } from "./RadarChart";
import {
  CATEGORIES,
  INDUSTRIES,
  COMPANY_SIZES,
  TOTAL_QUESTIONS,
  MAX_SCORE,
  getAllQuestions,
  getResultLevel,
  getCategoryScores,
  type Industry,
  type CompanySize,
  type Question,
} from "@/lib/reifegrad-questions";

/* ============================================
   KI-Reifegrad-Check – Interaktiver Quiz

   Flow:
   1. Intro: Branche & Betriebsgröße wählen
   2. Quiz: 25 Fragen, eine nach der anderen
   3. Ergebnis: Score, Radar-Chart, Empfehlungen

   State wird komplett im Client gehalten.
   Kein Server-Call nötig (außer optionalem Tracking).
   ============================================ */

type QuizStep = "intro" | "quiz" | "result";

/* Farben für die Ergebnis-Stufen */
const LEVEL_COLORS: Record<string, string> = {
  startbereit: "text-bright-red",
  neugierig: "text-sky",
  aufdemweg: "text-mint",
  fortgeschritten: "text-mint",
};

const LEVEL_BG: Record<string, string> = {
  startbereit: "bg-bright-red/10",
  neugierig: "bg-sky/20",
  aufdemweg: "bg-mint/20",
  fortgeschritten: "bg-mint/30",
};

export function ReifegradQuiz() {
  /* --- State --- */
  const [step, setStep] = useState<QuizStep>("intro");
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [companySize, setCompanySize] = useState<CompanySize | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  /* Alle Fragen als flaches Array (stabil, wird nicht neu berechnet) */
  const questions = useMemo(() => getAllQuestions(), []);
  const currentQuestion: Question | undefined = questions[currentIndex];

  /* Fortschritt in Prozent */
  const progress = useMemo(
    () => Math.round((Object.keys(answers).length / TOTAL_QUESTIONS) * 100),
    [answers]
  );

  /* Aktuelle Kategorie ermitteln */
  const currentCategory = useMemo(() => {
    if (!currentQuestion) return null;
    return CATEGORIES.find((c) =>
      c.questions.some((q) => q.id === currentQuestion.id)
    );
  }, [currentQuestion]);

  /* Ergebnis berechnen */
  const totalScore = useMemo(
    () => Object.values(answers).reduce((sum, pts) => sum + pts, 0),
    [answers]
  );
  const resultLevel = useMemo(() => getResultLevel(totalScore), [totalScore]);
  const categoryScores = useMemo(() => getCategoryScores(answers), [answers]);

  /* --- Callbacks --- */

  /** Quiz starten (nach Branche/Größe-Auswahl) */
  const handleStart = useCallback(() => {
    if (!industry || !companySize) return;
    setStep("quiz");
    setCurrentIndex(0);
    setAnswers({});
  }, [industry, companySize]);

  /** Antwort speichern und zur nächsten Frage */
  const handleAnswer = useCallback(
    (questionId: number, points: number) => {
      setAnswers((prev) => ({ ...prev, [questionId]: points }));

      /* Nächste Frage oder Ergebnis */
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setStep("result");
      }
    },
    [currentIndex, questions.length]
  );

  /** Eine Frage zurückgehen */
  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  /** Quiz komplett zurücksetzen */
  const handleReset = useCallback(() => {
    setStep("intro");
    setIndustry(null);
    setCompanySize(null);
    setCurrentIndex(0);
    setAnswers({});
  }, []);

  /* ============================================
     Render: Intro
     ============================================ */
  if (step === "intro") {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="mb-4">KI-Reifegrad-Check starten</h2>
          <p className="text-dark-gray">
            25 Fragen. 5 Minuten. Kein Login. Sofortergebnis.
          </p>
        </div>

        {/* Branche wählen */}
        <div className="mb-8">
          <p className="text-sm font-semibold mb-3">Branche des Unternehmens:</p>
          <div className="grid grid-cols-2 gap-2">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.value}
                onClick={() => setIndustry(ind.value)}
                className={`text-left px-4 py-3 text-sm okai-shape-sm border transition-colors ${
                  industry === ind.value
                    ? "border-bright-red bg-bright-red/10 font-semibold"
                    : "border-sand-border bg-white hover:border-bright-red/50"
                }`}
              >
                {ind.label}
              </button>
            ))}
          </div>
        </div>

        {/* Betriebsgröße wählen */}
        <div className="mb-10">
          <p className="text-sm font-semibold mb-3">Betriebsgröße:</p>
          <div className="grid grid-cols-2 gap-2">
            {COMPANY_SIZES.map((size) => (
              <button
                key={size.value}
                onClick={() => setCompanySize(size.value)}
                className={`text-left px-4 py-3 text-sm okai-shape-sm border transition-colors ${
                  companySize === size.value
                    ? "border-bright-red bg-bright-red/10 font-semibold"
                    : "border-sand-border bg-white hover:border-bright-red/50"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Start-Button */}
        <button
          onClick={handleStart}
          disabled={!industry || !companySize}
          className="w-full inline-flex items-center justify-center gap-2 bg-bright-red text-white font-semibold px-6 py-3.5 okai-shape-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check starten <IconArrowRight size={16} />
        </button>

        <p className="text-xs text-mid-gray text-center mt-4">
          Keine Daten werden gespeichert. Die Auswertung erfolgt sofort im Browser.
        </p>
      </div>
    );
  }

  /* ============================================
     Render: Quiz (Frage für Frage)
     ============================================ */
  if (step === "quiz" && currentQuestion) {
    const isAnswered = answers[currentQuestion.id] !== undefined;

    return (
      <div className="max-w-2xl mx-auto">
        {/* Fortschrittsbalken */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-mid-gray mb-2">
            <span>
              {currentCategory?.name} – Frage {currentIndex + 1} von{" "}
              {TOTAL_QUESTIONS}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-sand-border rounded-full overflow-hidden">
            <div
              className="h-full bg-bright-red rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Kategorie-Label */}
        <p className="eyebrow !text-bright-red mb-2">{currentCategory?.name}</p>
        <p className="text-xs text-mid-gray mb-6">{currentCategory?.description}</p>

        {/* Frage */}
        <h3 className="mb-6 text-xl">{currentQuestion.text}</h3>

        {/* Antwortoptionen */}
        <div className="space-y-3 mb-8">
          {currentQuestion.answers.map((answer, i) => {
            const isSelected = answers[currentQuestion.id] === answer.points;
            return (
              <button
                key={i}
                onClick={() => handleAnswer(currentQuestion.id, answer.points)}
                className={`w-full text-left px-5 py-4 okai-shape-sm border transition-all ${
                  isSelected
                    ? "border-bright-red bg-bright-red/10 font-medium"
                    : "border-sand-border bg-white hover:border-bright-red/50 hover:bg-off-white"
                }`}
              >
                <span className="text-xs font-semibold text-mid-gray mr-2">
                  {String.fromCharCode(65 + i)}
                </span>
                {answer.text}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="text-sm text-mid-gray hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Zurück
          </button>
          {isAnswered && currentIndex < questions.length - 1 && (
            <button
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="text-sm font-semibold text-bright-red hover:text-black"
            >
              Weiter →
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ============================================
     Render: Ergebnis
     ============================================ */
  if (step === "result") {
    /* Werte für das Radar-Chart (0-1 Skala) */
    const radarValues = categoryScores.map((cs) => cs.percentage / 100);

    return (
      <div className="max-w-4xl mx-auto">
        {/* Header mit Score */}
        <div className="text-center mb-12">
          <p className="eyebrow mb-2">Ergebnis</p>
          <div
            className={`inline-block px-4 py-2 okai-shape-sm text-sm font-semibold mb-4 ${
              LEVEL_BG[resultLevel.id]
            } ${LEVEL_COLORS[resultLevel.id]}`}
          >
            {resultLevel.name}
          </div>
          <p className="text-5xl font-bold mb-2">
            {totalScore}{" "}
            <span className="text-xl text-mid-gray font-normal">
              / {MAX_SCORE} Punkte
            </span>
          </p>
          <p className="text-dark-gray max-w-xl mx-auto">
            {resultLevel.description}
          </p>
        </div>

        {/* Zwei Spalten: Radar + Kategorien */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Radar-Chart mit echten Werten */}
          <div className="bg-black okai-shape-md p-4">
            <RadarChart className="w-full" scores={radarValues} />
          </div>

          {/* Einzelne Kategorien */}
          <div className="space-y-3">
            <p className="text-sm font-semibold mb-1">Ergebnis pro Kategorie:</p>
            {categoryScores.map((cs) => (
              <div key={cs.categoryId}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{cs.name}</span>
                  <span className="text-mid-gray">
                    {cs.score}/{cs.maxScore} ({cs.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-sand-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      cs.percentage >= 66
                        ? "bg-mint"
                        : cs.percentage >= 33
                        ? "bg-sky"
                        : "bg-bright-red"
                    }`}
                    style={{ width: `${cs.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empfohlene nächste Schritte */}
        <div className="bg-off-white okai-shape-md p-8 mb-8 border border-sand-border">
          <h3 className="mb-4">Empfohlene nächste Schritte</h3>
          <div className="space-y-3">
            {resultLevel.nextSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <IconCheck
                  size={18}
                  className="text-bright-red shrink-0 mt-0.5"
                />
                <p className="text-dark-gray">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Schwächste Kategorien hervorheben */}
        <div className="bg-off-white okai-shape-md p-8 mb-8 border border-sand-border">
          <h3 className="mb-4">Hier liegt das größte Potenzial</h3>
          <div className="space-y-4">
            {[...categoryScores]
              .sort((a, b) => a.percentage - b.percentage)
              .slice(0, 3)
              .map((cs) => (
                <div key={cs.categoryId} className="flex items-start gap-3">
                  <span className="text-bright-red font-bold text-lg shrink-0 w-10">
                    {cs.percentage}%
                  </span>
                  <div>
                    <p className="font-semibold">{cs.name}</p>
                    <p className="text-sm text-dark-gray">
                      {CATEGORIES.find((c) => c.id === cs.categoryId)
                        ?.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/#kontakt"
            className="inline-flex items-center justify-center gap-2 bg-bright-red text-white font-semibold px-6 py-3 okai-shape-sm hover:opacity-90 transition-opacity"
          >
            Kostenlos beraten lassen <IconArrowRight size={16} />
          </Link>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 border-2 border-dark-gray text-dark-gray font-semibold px-6 py-3 okai-shape-sm hover:bg-black hover:text-white transition-colors"
          >
            Check wiederholen
          </button>
        </div>

        <p className="text-xs text-mid-gray mt-6">
          Alle Daten bleiben im Browser. Es werden keine persönlichen Informationen
          gespeichert oder übertragen.
        </p>
      </div>
    );
  }

  return null;
}
