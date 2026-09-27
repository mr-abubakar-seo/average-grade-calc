'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, RotateCcw } from "lucide-react";
import {
  CalcCard,
  CalculatorShell,
  CHART_COLORS,
  GenericResultDisplay,
  MetricGrid,
  type ChartDatum,
} from "@/components/calculator/CalculatorFramework";
import { useGpaCalculatorLogic, type GpaRowData } from "@/components/calculator/useGpaCalculatorLogic";

const DEFAULT_ROWS: GpaRowData[] = [
  { id: "1", name: "Course 1", grade: "A", credits: "3" },
  { id: "2", name: "Course 2", grade: "B+", credits: "4" },
  { id: "3", name: "Course 3", grade: "85", credits: "3" },
];

const ROW_COLORS = CHART_COLORS;

interface CalculatedSnapshot {
  gpa: number;
  totalCredits: number;
  pieData: ChartDatum[];
  barData: ChartDatum[];
}

export default function UnifiedGpaCalculator() {
  const { rows, result, updateRow, addRow, removeRow } = useGpaCalculatorLogic(DEFAULT_ROWS);
  const [snapshot, setSnapshot] = useState<CalculatedSnapshot | null>(null);

  const handleCalculate = () => {
    const pieData: ChartDatum[] = rows.map((row, index) => ({
      label: row.name || `Course ${index + 1}`,
      value: Number.parseFloat(row.credits) || 0,
      fill: ROW_COLORS[index % ROW_COLORS.length],
    }));
    const barData: ChartDatum[] = rows.map((row, index) => ({
      label: row.name || `Course ${index + 1}`,
      value: Math.round(result.gpa),
      fill: ROW_COLORS[index % ROW_COLORS.length],
    }));

    setSnapshot({ ...result, pieData, barData });
  };

  return (
    <CalculatorShell
      badge="GPA Calculator"
      title="Online GPA Calculator"
      subtitle="Calculate Your 4.0 GPA"
      helper="Enter your course grades and credit hours to calculate your GPA."
      pieData={snapshot?.pieData}
      barData={snapshot?.barData}
    >
      <CalcCard title="Course List" helper="Enter grade (A, B+, etc. or 0-100) and credits.">
        <div className="space-y-1.5">
          <div className="grid grid-cols-[minmax(0,1fr)_96px_96px_34px] items-center gap-2 pb-1 text-[14px] font-bold uppercase text-[var(--brand-muted)] sm:grid-cols-[minmax(0,1fr)_124px_124px_34px]">
            <span>Course Name</span>
            <span>Grade</span>
            <span>Credits</span>
            <span aria-hidden="true" />
          </div>
          <AnimatePresence initial={false}>
            {rows.map((row, index) => (
              <motion.div
                key={row.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid grid-cols-[minmax(0,1fr)_96px_96px_34px] items-center gap-2 sm:grid-cols-[minmax(0,1fr)_124px_124px_34px]"
              >
                <input
                  value={row.name}
                  onChange={(e) => updateRow(row.id, "name", e.target.value)}
                  placeholder={`Course ${index + 1}`}
                  className="h-[42px] w-full rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 text-[15px] font-bold text-[var(--brand-text)] outline-none focus:border-[var(--brand)]"
                />
                <input
                  value={row.grade}
                  onChange={(e) => updateRow(row.id, "grade", e.target.value)}
                  placeholder="A or 90"
                  className="h-[42px] w-full rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 text-[15px] font-bold text-[var(--brand-text)] outline-none focus:border-[var(--brand)]"
                />
                <input
                  value={row.credits}
                  onChange={(e) => updateRow(row.id, "credits", e.target.value)}
                  placeholder="3"
                  className="h-[42px] w-full rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 text-[15px] font-bold text-[var(--brand-text)] outline-none focus:border-[var(--brand)]"
                />
                <button
                  onClick={() => removeRow(row.id)}
                  disabled={rows.length <= 1}
                  className="inline-flex h-[42px] w-[34px] items-center justify-center rounded border border-[var(--brand-border)] text-[var(--brand-muted)] disabled:opacity-30"
                >
                  <Trash2 size={13} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <button
            onClick={addRow}
            className="mt-2.5 flex h-[44px] w-full items-center justify-center gap-2 rounded border border-dashed border-[var(--brand-muted)] text-[13px] font-bold text-[var(--brand-muted)]"
          >
            <Plus size={14} /> Add Course
          </button>
          <button
            onClick={handleCalculate}
            className="mt-2 flex h-[44px] w-full items-center justify-center gap-2 rounded-sm bg-[var(--brand)] text-[13px] font-bold text-white"
          >
            <RotateCcw size={14} /> Calculate
          </button>
        </div>
      </CalcCard>

      {snapshot ? (
        <div className="mt-4">
          <GenericResultDisplay primary={snapshot.gpa.toFixed(0)} />
          <MetricGrid
            metrics={[
              { label: "Total Credits", value: Math.round(snapshot.totalCredits).toString(), tone: "navy" },
              { label: "GPA Status", value: snapshot.gpa >= 3.5 ? "Honor Roll" : snapshot.gpa >= 2.0 ? "Passing" : "Low GPA", tone: snapshot.gpa >= 2.0 ? "green" : "red" },
            ]}
          />
        </div>
      ) : (
        <GenericResultDisplay primary="--" />
      )}
    </CalculatorShell>
  );
}
