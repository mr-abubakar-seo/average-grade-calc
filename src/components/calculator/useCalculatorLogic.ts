'use client';

import { useMemo, useState } from "react";

export interface CalculatorRowData {
  id: string;
  name: string;
  grade: string;
  weight: string;
}

export interface CalculatorResult {
  percentage: number;
  letter: string;
  gpa: number;
  totalWeight: number;
  isWeightBalanced: boolean;
}

const clampPercent = (value: string) => {
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(Math.max(parsed, 0), 100);
};

const getLetterGrade = (score: number) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
};

const createRow = (index: number): CalculatorRowData => ({
  id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${index}`,
  name: `Assignment ${index}`,
  grade: "",
  weight: "",
});

export function useCalculatorLogic(initialRows: CalculatorRowData[]) {
  const [rows, setRows] = useState<CalculatorRowData[]>(initialRows);

  const result = useMemo<CalculatorResult>(() => {
    const totals = rows.reduce(
      (acc, row) => {
        const grade = clampPercent(row.grade);
        const weight = clampPercent(row.weight);

        return {
          weightedScore: acc.weightedScore + grade * weight,
          totalWeight: acc.totalWeight + weight,
        };
      },
      { weightedScore: 0, totalWeight: 0 }
    );

    const percentage = totals.totalWeight > 0 ? totals.weightedScore / totals.totalWeight : 0;

    return {
      percentage,
      letter: getLetterGrade(percentage),
      gpa: Math.min(4, Math.max(0, percentage / 25)),
      totalWeight: totals.totalWeight,
      isWeightBalanced: Math.abs(totals.totalWeight - 100) < 0.01,
    };
  }, [rows]);

  const updateRow = (id: string, field: keyof CalculatorRowData, value: string) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const addRow = () => {
    setRows((current) => [...current, createRow(current.length + 1)]);
  };

  const removeRow = (id: string) => {
    setRows((current) => (current.length > 1 ? current.filter((row) => row.id !== id) : current));
  };

  const resetRows = () => {
    setRows(initialRows);
  };

  return {
    rows,
    result,
    updateRow,
    addRow,
    removeRow,
    resetRows,
  };
}
