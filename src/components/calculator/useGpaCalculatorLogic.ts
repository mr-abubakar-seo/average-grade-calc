'use client';

import { useMemo, useState } from "react";

export interface GpaRowData {
  id: string;
  name: string;
  grade: string; // Letter or Percent
  credits: string;
}

export interface GpaResult {
  gpa: number;
  totalCredits: number;
}

const letterToPoints: Record<string, number> = {
  "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0.0,
};

const getPointsFromGrade = (grade: string): number => {
  const upperGrade = grade.trim().toUpperCase();
  if (letterToPoints[upperGrade] !== undefined) return letterToPoints[upperGrade];
  
  const numeric = Number.parseFloat(grade);
  if (!Number.isNaN(numeric)) {
    if (numeric >= 90) return 4.0;
    if (numeric >= 80) return 3.0;
    if (numeric >= 70) return 2.0;
    if (numeric >= 60) return 1.0;
    return 0.0;
  }
  return 0.0;
};

const createGpaRow = (index: number): GpaRowData => ({
  id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${index}`,
  name: `Course ${index}`,
  grade: "",
  credits: "",
});

export function useGpaCalculatorLogic(initialRows: GpaRowData[]) {
  const [rows, setRows] = useState<GpaRowData[]>(initialRows);

  const result = useMemo<GpaResult>(() => {
    const totals = rows.reduce(
      (acc, row) => {
        const points = getPointsFromGrade(row.grade);
        const credits = Number.parseFloat(row.credits) || 0;

        return {
          totalPoints: acc.totalPoints + points * credits,
          totalCredits: acc.totalCredits + credits,
        };
      },
      { totalPoints: 0, totalCredits: 0 }
    );

    const gpa = totals.totalCredits > 0 ? totals.totalPoints / totals.totalCredits : 0;

    return {
      gpa,
      totalCredits: totals.totalCredits,
    };
  }, [rows]);

  const updateRow = (id: string, field: keyof GpaRowData, value: string) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const addRow = () => {
    setRows((current) => [...current, createGpaRow(current.length + 1)]);
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
