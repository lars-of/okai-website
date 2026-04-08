"use client";

import React from "react";

// OKAI Markenfarben
const COLORS = {
  brightRed: "#EF646E",
  mint: "#C4DFB6",
  sky: "#AEC5EB",
  offWhite: "#FDFCF9",
  midGray: "#7A7872",
};

// Die 7 Achsen des KI-Reifegrads
const CATEGORIES = [
  "Strategie",
  "Prozesse",
  "Daten & Systeme",
  "Werkzeuge & Tools",
  "Wissen im Team",
  "Kultur & Haltung",
  "Regeln & Verantwortung",
];

// Beispielwerte (niedrig bis mittel, 25-55%)
const SAMPLE_SCORES = [0.35, 0.28, 0.45, 0.3, 0.25, 0.52, 0.38];

// Konfiguration
const CENTER_X = 250;
const CENTER_Y = 250;
const MAX_RADIUS = 160;
const GRID_LEVELS = [0.25, 0.5, 0.75, 1.0];
const LABEL_OFFSET = 28;

interface RadarChartProps {
  className?: string;
  /** Optionale echte Werte (0-1 pro Kategorie). Ohne Props werden Beispielwerte gezeigt. */
  scores?: number[];
}

/**
 * Berechnet die x/y-Position eines Punktes auf dem Radar.
 * index = Achsenindex, value = Wert zwischen 0 und 1 (Anteil am Maximum)
 */
function getPoint(index: number, value: number, total: number) {
  // Start oben (bei -90 Grad), dann im Uhrzeigersinn
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  return {
    x: CENTER_X + Math.cos(angle) * MAX_RADIUS * value,
    y: CENTER_Y + Math.sin(angle) * MAX_RADIUS * value,
  };
}

/**
 * Erzeugt die Punkte-Zeichenkette für ein Polygon auf einer bestimmten Stufe.
 */
function getPolygonPoints(values: number[], total: number): string {
  return values
    .map((val, i) => {
      const { x, y } = getPoint(i, val, total);
      return `${x},${y}`;
    })
    .join(" ");
}

/**
 * Erzeugt die Punkte für ein gleichmäßiges Heptagon (Gitterebene).
 */
function getGridPolygonPoints(level: number, total: number): string {
  return Array.from({ length: total }, (_, i) => {
    const { x, y } = getPoint(i, level, total);
    return `${x},${y}`;
  }).join(" ");
}

/**
 * Berechnet die Label-Position außerhalb des Charts.
 */
function getLabelPosition(index: number, total: number) {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  const radius = MAX_RADIUS + LABEL_OFFSET;
  return {
    x: CENTER_X + Math.cos(angle) * radius,
    y: CENTER_Y + Math.sin(angle) * radius,
  };
}

/**
 * Bestimmt die Textausrichtung abhängig von der Position auf dem Kreis.
 */
function getTextAnchor(index: number, total: number): "start" | "middle" | "end" {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  const cosVal = Math.cos(angle);
  if (Math.abs(cosVal) < 0.1) return "middle";
  return cosVal > 0 ? "start" : "end";
}

/**
 * Bestimmt die vertikale Textausrichtung des Labels.
 */
function getDominantBaseline(index: number, total: number): "auto" | "middle" | "hanging" {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  const sinVal = Math.sin(angle);
  if (Math.abs(sinVal) < 0.1) return "middle";
  return sinVal > 0 ? "hanging" : "auto";
}

export function RadarChart({ className, scores }: RadarChartProps) {
  const total = CATEGORIES.length;
  const activeScores = scores ?? SAMPLE_SCORES;
  const dataPoints = activeScores.map((score, i) => getPoint(i, score, total));

  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="KI-Reifegrad Radar-Diagramm"
    >
      {/* Hintergrund */}
      <rect width="500" height="500" fill="#0A0A0A" rx="12" />

      {/* Gradient-Definition fuer das Daten-Polygon */}
      <defs>
        <radialGradient id="dataGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={COLORS.brightRed} stopOpacity="0.45" />
          <stop
            offset="100%"
            stopColor={COLORS.brightRed}
            stopOpacity="0.12"
          />
        </radialGradient>
      </defs>

      {/* Konzentrische Heptagon-Gitterlinien (4 Stufen) */}
      {GRID_LEVELS.map((level) => (
        <polygon
          key={`grid-${level}`}
          points={getGridPolygonPoints(level, total)}
          fill="none"
          stroke={COLORS.offWhite}
          strokeOpacity={level === 1.0 ? 0.2 : 0.08}
          strokeWidth={level === 1.0 ? 1 : 0.5}
        />
      ))}

      {/* Achsenlinien vom Zentrum zu den Ecken */}
      {CATEGORIES.map((_, i) => {
        const { x, y } = getPoint(i, 1, total);
        return (
          <line
            key={`axis-${i}`}
            x1={CENTER_X}
            y1={CENTER_Y}
            x2={x}
            y2={y}
            stroke={COLORS.offWhite}
            strokeOpacity={0.1}
            strokeWidth={0.5}
          />
        );
      })}

      {/* Daten-Polygon (gefuellt mit Gradient) */}
      <polygon
        points={getPolygonPoints(activeScores, total)}
        fill="url(#dataGradient)"
        stroke={COLORS.brightRed}
        strokeWidth={2}
        strokeOpacity={0.85}
        strokeLinejoin="round"
      />

      {/* Datenpunkte als Kreise */}
      {dataPoints.map((point, i) => (
        <circle
          key={`dot-${i}`}
          cx={point.x}
          cy={point.y}
          r={4}
          fill={COLORS.brightRed}
          stroke={COLORS.offWhite}
          strokeWidth={1.5}
          strokeOpacity={0.6}
        />
      ))}

      {/* Achsenbeschriftungen */}
      {CATEGORIES.map((label, i) => {
        const pos = getLabelPosition(i, total);
        return (
          <text
            key={`label-${i}`}
            x={pos.x}
            y={pos.y}
            textAnchor={getTextAnchor(i, total)}
            dominantBaseline={getDominantBaseline(i, total)}
            fill={COLORS.mint}
            fontSize="13"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="500"
          >
            {label}
          </text>
        );
      })}

      {/* Prozent-Beschriftungen an den Gitterlinien (auf der ersten Achse) */}
      {GRID_LEVELS.map((level) => {
        const { x, y } = getPoint(0, level, total);
        return (
          <text
            key={`pct-${level}`}
            x={x + 6}
            y={y - 4}
            fill={COLORS.midGray}
            fontSize="9"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {Math.round(level * 100)}%
          </text>
        );
      })}
    </svg>
  );
}
