'use client';

import { useState } from "react";
import {
  CalcCard,
  CalculatorActions,
  CalculatorShell,
  CHART_COLORS,
  DistributionPanel,
  GenericResultDisplay,
  InputRows,
  ResultDisplay,
  type ChartDatum,
} from "@/components/calculator/CalculatorFramework";
import { useCalculatorLogic, type CalculatorResult, type CalculatorRowData } from "@/components/calculator/useCalculatorLogic";

const DEFAULT_ROWS: CalculatorRowData[] = [
  { id: "1", name: "Assignment 1", grade: "80", weight: "25" },
  { id: "2", name: "Midterm", grade: "90", weight: "25" },
  { id: "3", name: "Final Exam", grade: "85", weight: "50" },
];

const parseChartNumber = (value: string) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const ROW_COLORS = CHART_COLORS;

interface CalculatedSnapshot {
  result: CalculatorResult;
  pieData: ChartDatum[];
  barData: ChartDatum[];
}

export default function SemesterGradeCalculator() {
  const { rows, result, updateRow, addRow, removeRow, resetRows } = useCalculatorLogic(DEFAULT_ROWS);
  const [snapshot, setSnapshot] = useState<CalculatedSnapshot | null>(null);

  const handleCalculate = () => {
    const pieData: ChartDatum[] = rows.map((row, index) => ({
      label: row.name || `Row ${index + 1}`,
      value: parseChartNumber(row.weight),
      fill: ROW_COLORS[index % ROW_COLORS.length],
    }));
    const barData: ChartDatum[] = rows.map((row, index) => ({
      label: row.name || `Row ${index + 1}`,
      value: Math.round(parseChartNumber(row.grade)),
      fill: ROW_COLORS[index % ROW_COLORS.length],
    }));

    setSnapshot({ result: { ...result }, pieData, barData });
  };

  return (
    <CalculatorShell
      badge="Semester Grade Calculator"
      title="Free Semester Grade Calculator"
      subtitle="What is My Final Grade?"
      helper="Enter grades and their corresponding weights to calculate your overall semester grade."
      pieData={snapshot?.pieData}
      barData={snapshot?.barData}
    >
      <CalcCard title="Course Grades" helper="Use the % column for each assignment weight.">
        <InputRows rows={rows} onUpdate={updateRow} onRemove={removeRow} />
        <CalculatorActions onAdd={addRow} onCalculate={handleCalculate} />
      </CalcCard>

      {snapshot ? (
        <ResultDisplay result={snapshot.result} />
      ) : (
        <GenericResultDisplay primary="--" />
      )}

      {snapshot && !snapshot.result.isWeightBalanced && (
        <p className="-mt-1 mb-2 text-left text-[8px] font-bold text-[var(--brand-muted)]">
          Weights total {snapshot.result.totalWeight.toFixed(0)}%. Results are normalized until weights equal 100%.
        </p>
      )}

      <DistributionPanel score={snapshot?.result.percentage ?? 0} onResetScale={resetRows} />
    </CalculatorShell>
  );
}
