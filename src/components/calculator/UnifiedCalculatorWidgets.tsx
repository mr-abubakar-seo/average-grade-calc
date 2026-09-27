'use client';

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  CalcButton,
  CalcCard,
  CalcField,
  CalculatorShell,
  CHART_COLORS,
  DistributionPanel,
  GenericResultDisplay,
  MetricGrid,
  MiniBarPanel,
} from "@/components/calculator/CalculatorFramework";

const letterFromPercent = (score: number) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
};

const numberValue = (value: string) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const money = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function ToolShell({
  badge,
  title,
  subtitle,
  helper,
  children,
  pieData,
  barData,
  showSideCharts = true,
}: {
  badge?: string;
  title: string;
  subtitle: string;
  helper: string;
  children: React.ReactNode;
  pieData?: Array<{ label: string; value: number; fill?: string }>;
  barData?: Array<{ label: string; value: number; fill?: string }>;
  showSideCharts?: boolean;
}) {
  return (
    <CalculatorShell
      badge={badge ?? title}
      title={title}
      subtitle={subtitle}
      helper={helper}
      pieData={pieData}
      barData={barData}
      showSideCharts={showSideCharts}
    >
      {children}
    </CalculatorShell>
  );
}

function PendingResult() {
  return <GenericResultDisplay primary="--" />;
}

export function UnifiedGradeCalculator() {
  const [total, setTotal] = useState("20");
  const [wrong, setWrong] = useState("7");
  
  const [calculated, setCalculated] = useState<null | { 
    correct: number; 
    totalQuestions: number; 
    score: number;
    pieData: Array<{ label: string; value: number; fill?: string }>;
    barData: Array<{ label: string; value: number; fill?: string }>;
  }>(null);

  const handleCalculate = () => {
    const totalQuestions = Math.max(1, numberValue(total));
    const wrongAnswers = Math.min(Math.max(0, numberValue(wrong)), totalQuestions);
    const correct = totalQuestions - wrongAnswers;
    const score = (correct / totalQuestions) * 100;

    const pieData = [
      { label: "Correct", value: correct, fill: "var(--brand)" },
      { label: "Wrong", value: wrongAnswers, fill: "var(--brand-deep)" },
    ];

    const barData = [
      { label: "Correct", value: Math.round((correct / totalQuestions) * 100), fill: "var(--brand)" },
      { label: "Wrong", value: Math.round((wrongAnswers / totalQuestions) * 100), fill: "var(--brand-deep)" },
      { label: "Score", value: Math.round(score), fill: "var(--brand)" },
    ];

    setCalculated({ correct, totalQuestions, score, pieData, barData });
  };

  return (
    <ToolShell
      title="Test Grade Calculator"
      subtitle="What score did I get?"
      helper="Enter total questions and missed answers to calculate your percentage instantly."
      pieData={calculated?.pieData}
      barData={calculated?.barData}
    >
      <CalcCard title="Test Score" helper="Use whole numbers for questions and incorrect answers.">
        <div className="grid grid-cols-2 gap-2">
          <CalcField label="Total Questions" value={total} onChange={setTotal} min={1} />
          <CalcField label="Wrong Answers" value={wrong} onChange={setWrong} min={0} />
        </div>
        <div className="mt-3">
          <MetricGrid
            metrics={[
              {
                label: "Correct",
                value: calculated ? `${calculated.correct.toFixed(0)} / ${calculated.totalQuestions.toFixed(0)}` : "--",
                tone: "green",
              },
              { label: "Letter", value: calculated ? letterFromPercent(calculated.score) : "--", tone: "orange" },
            ]}
          />
        </div>
        <div className="mt-3">
          <CalcButton onClick={handleCalculate}>Calculate</CalcButton>
        </div>
      </CalcCard>
      {calculated ? (
        <GenericResultDisplay primary={calculated.score.toFixed(0)} suffix="%" />
      ) : (
        <PendingResult />
      )}
      <DistributionPanel score={calculated?.score ?? 0} />
    </ToolShell>
  );
}

export function UnifiedAverageGradeCalculator() {
  const [scores, setScores] = useState<string[]>(["88", "92", "76", "85"]);
  const [calculated, setCalculated] = useState<null | { 
    average: number;
    pieData: Array<{ label: string; value: number; fill?: string }>;
    barData: Array<{ label: string; value: number; fill?: string }>;
  }>(null);

  const addScore = () => setScores([...scores, ""]);
  const removeScore = (index: number) => setScores(scores.filter((_, i) => i !== index));
  const updateScore = (index: number, val: string) => {
    const newScores = [...scores];
    newScores[index] = val;
    setScores(newScores);
  };

  const handleCalculate = () => {
    const validScores = scores.map(numberValue).filter(s => s > 0);
    if (validScores.length === 0) return;
    const average = validScores.reduce((a, b) => a + b, 0) / validScores.length;

    const pieData = validScores.map((s, i) => ({
      label: `Score ${i + 1}`,
      value: s,
      fill: ["var(--brand)", "var(--brand-deep)", "var(--brand)", "var(--brand)", "var(--brand-deep)"][i % 5]
    }));

    const barData = [
      { label: "Average", value: Math.round(average), fill: "var(--brand)" },
      ...validScores.map((s, i) => ({
        label: `S${i + 1}`,
        value: Math.round(s),
        fill: ["var(--brand)", "var(--brand-deep)", "var(--brand)", "var(--brand)", "var(--brand-deep)"][i % 5]
      }))
    ];

    setCalculated({ average, pieData, barData });
  };

  return (
    <ToolShell
      title="Average Grade Calculator"
      subtitle="Find your Average Grade."
      helper="Enter all your test or assignment scores to find the average grade."
      pieData={calculated?.pieData}
      barData={calculated?.barData}
    >
      <CalcCard title="Course Scores" helper="Add as many scores as you need.">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {scores.map((score, i) => (
            <div key={i} className="relative">
              <CalcField label={`Score ${i + 1}`} value={score} onChange={(v) => updateScore(i, v)} />
              {scores.length > 1 && (
                <button 
                  onClick={() => removeScore(i)}
                  className="absolute top-0 right-0 p-1 text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button 
          onClick={addScore}
          className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 mb-3"
        >
          + Add Score
        </button>
        <CalcButton onClick={handleCalculate}>Calculate</CalcButton>
      </CalcCard>
      {calculated ? (
        <GenericResultDisplay primary={calculated.average.toFixed(0)} suffix="%" />
      ) : (
        <PendingResult />
      )}
      <DistributionPanel score={calculated?.average ?? 0} />
    </ToolShell>
  );
}

export function UnifiedGradeCurveCalculator() {
  const [totalQuestions, setTotalQuestions] = useState("20");
  const [correctAnswers, setCorrectAnswers] = useState("12");
  const [minPassingPercent, setMinPassingPercent] = useState("70");
  
  const [calculated, setCalculated] = useState<null | { 
    actualPercent: number;
    questionsToPass: number;
    questionsCorrect: number;
    questionsToCurve: number;
    curvePercent: number;
    finalGrade: number;
    pieData: Array<{ label: string; value: number; fill?: string }>;
    barData: Array<{ label: string; value: number; fill?: string }>;
  }>(null);

  const handleCalculate = () => {
    const total = Math.max(1, numberValue(totalQuestions));
    const correct = Math.min(total, numberValue(correctAnswers));
    const minPass = numberValue(minPassingPercent);

    const actualPercent = (correct / total) * 100;
    const qToPass = Math.ceil((minPass / 100) * total);
    const qCorrect = correct;
    const qToCurve = Math.max(0, qToPass - correct);
    const curvePercent = (qToCurve / total) * 100;
    const finalGrade = Math.min(100, actualPercent + curvePercent);

    const pieData = [
      { label: "Correct", value: correct, fill: "var(--brand)" },
      { label: "Curve Need", value: qToCurve, fill: "var(--brand-deep)" },
      { label: "Remaining", value: Math.max(0, total - correct - qToCurve), fill: "var(--brand-deep)" },
    ];

    const barData = [
      { label: "Actual %", value: Math.round(actualPercent), fill: "var(--brand)" },
      { label: "Curve %", value: Math.round(curvePercent), fill: "var(--brand-deep)" },
      { label: "Final %", value: Math.round(finalGrade), fill: "var(--brand)" },
    ];

    setCalculated({ 
      actualPercent, 
      questionsToPass: qToPass, 
      questionsCorrect: qCorrect, 
      questionsToCurve: qToCurve, 
      curvePercent, 
      finalGrade,
      pieData, 
      barData 
    });
  };

  return (
    <ToolShell
      title="Online Grade Curve Calculator"
      subtitle="Boost your score to pass."
      helper="Calculate exactly how many points or questions you need to curve to reach a passing grade."
      pieData={calculated?.pieData}
      barData={calculated?.barData}
    >
      <CalcCard title="Curve Inputs" helper="Enter your test details and target passing percentage.">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <CalcField label="Total Questions *" value={totalQuestions} onChange={setTotalQuestions} />
            <CalcField label="Correct Answers *" value={correctAnswers} onChange={setCorrectAnswers} />
            <CalcField label="Min passing % *" value={minPassingPercent} onChange={setMinPassingPercent} suffix="%" />
          </div>
          
          {calculated && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-col p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400">Actual %</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{calculated.actualPercent.toFixed(0)}%</span>
              </div>
              <div className="flex flex-col p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400">Questions to Pass</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{calculated.questionsToPass.toFixed(0)}</span>
              </div>
              <div className="flex flex-col p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400">Questions Correct</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{calculated.questionsCorrect.toFixed(0)}</span>
              </div>
              <div className="flex flex-col p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400">Questions to Curve</span>
                <span className="text-sm font-bold text-indigo-500">{calculated.questionsToCurve.toFixed(0)}</span>
              </div>
              <div className="flex flex-col p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-400">Curve %</span>
                <span className="text-sm font-bold text-indigo-500">{calculated.curvePercent.toFixed(0)}%</span>
              </div>
              <div className="flex flex-col p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg border border-indigo-100 dark:border-indigo-500/20">
                <span className="text-[10px] uppercase font-bold text-[var(--brand)]">Final Grade</span>
                <span className="text-sm font-bold text-indigo-600 dark:text-[var(--brand-text)]">{calculated.finalGrade.toFixed(0)}%</span>
              </div>
            </div>
          )}

          <CalcButton onClick={handleCalculate}>Calculate</CalcButton>
        </div>
      </CalcCard>
      {calculated ? (
        <GenericResultDisplay 
          primary={calculated.finalGrade.toFixed(0)} 
          suffix="%" 
        />
      ) : (
        <PendingResult />
      )}
      <DistributionPanel score={calculated?.finalGrade ?? 0} />
    </ToolShell>
  );
}

export function UnifiedFinalGradeCalculator() {
  const [current, setCurrent] = useState("82");
  const [target, setTarget] = useState("90");
  const [weight, setWeight] = useState("30");
  
  const [calculated, setCalculated] = useState<null | { 
    currentGrade: number; 
    targetGrade: number; 
    needed: number; 
    status: string;
    pieData: Array<{ label: string; value: number; fill?: string }>;
    barData: Array<{ label: string; value: number; fill?: string }>;
  }>(null);

  const handleCalculate = () => {
    const currentGrade = numberValue(current);
    const targetGrade = numberValue(target);
    const finalWeight = numberValue(weight);
    const needed = finalWeight > 0 ? (targetGrade - currentGrade * (1 - finalWeight / 100)) / (finalWeight / 100) : 0;
    const status = needed > 100 ? "Reach" : needed < 0 ? "Secured" : "Needed";

    const clampedNeeded = Math.max(0, Math.min(needed, 100));
    const neededFill = needed > 100 ? "var(--brand-deep)" : "var(--brand)";
    // Both charts use the same three metrics: Current / Target / Needed
    const pieData = [
      { label: "Current",  value: Math.round(currentGrade),  fill: "var(--brand)" },
      { label: "Target",   value: Math.round(targetGrade),   fill: "var(--brand-deep)" },
      { label: "Needed",   value: Math.round(clampedNeeded), fill: neededFill },
    ];
    const barData = [
      { label: "Current",  value: Math.round(currentGrade),  fill: "var(--brand)" },
      { label: "Target",   value: Math.round(targetGrade),   fill: "var(--brand-deep)" },
      { label: "Needed",   value: Math.round(clampedNeeded), fill: neededFill },
    ];

    setCalculated({ currentGrade, targetGrade, needed, status, pieData, barData });
  };

  return (
    <ToolShell
      title="Final Grade Calculator Online"
      subtitle="What do I need on the final?"
      helper="Enter your current grade, target grade and final exam weight."
      pieData={calculated?.pieData}
      barData={calculated?.barData}
    >
      <CalcCard title="Final Exam Target" helper="Final weight should be the exam percentage of the course.">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <CalcField label="Current Grade" value={current} onChange={setCurrent} suffix="%" />
          <CalcField label="Target Grade" value={target} onChange={setTarget} suffix="%" />
          <CalcField label="Final Weight" value={weight} onChange={setWeight} suffix="%" />
        </div>
        <div className="mt-3">
          <CalcButton onClick={handleCalculate}>Calculate</CalcButton>
        </div>
      </CalcCard>
      {calculated ? (
        <GenericResultDisplay primary={calculated.needed.toFixed(0)} suffix="%" />
      ) : (
        <PendingResult />
      )}
      <MiniBarPanel
        title="Outcome Preview"
        rows={[
          { label: "Current", value: calculated?.currentGrade ?? 0, color: "var(--brand)" },
          { label: "Target", value: calculated?.targetGrade ?? 0, color: "var(--brand-deep)" },
          {
            label: "Needed",
            value: Math.max(0, Math.min(calculated?.needed ?? 0, 100)),
            color: (calculated?.needed ?? 0) > 100 ? "var(--brand-deep)" : "var(--brand)",
          },
        ]}
      />
    </ToolShell>
  );
}

interface TermRow {
  id: string;
  name: string;
  sgpa: string;
  credits: string;
}

function TermRowsCalculator({
  title,
  subtitle,
  helper,
}: {
  title: string;
  subtitle: string;
  helper: string;
}) {
  const [rows, setRows] = useState<TermRow[]>([
    { id: "1", name: "Semester 1", sgpa: "8.2", credits: "18" },
    { id: "2", name: "Semester 2", sgpa: "8.7", credits: "20" },
  ]);

  const result = useMemo(() => {
    const totals = rows.reduce(
      (acc, row) => {
        const sgpa = numberValue(row.sgpa);
        const credits = numberValue(row.credits);
        return { points: acc.points + sgpa * credits, credits: acc.credits + credits };
      },
      { points: 0, credits: 0 }
    );
    return totals.credits > 0 ? totals.points / totals.credits : 0;
  }, [rows]);
  const [calculated, setCalculated] = useState<null | { 
    result: number; 
    rows: TermRow[];
    pieData: Array<{ label: string; value: number; fill?: string }>;
    barData: Array<{ label: string; value: number; fill?: string }>;
  }>(null);

  const update = (id: string, field: keyof TermRow, value: string) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const add = () => {
    setRows((current) => [
      ...current,
      { id: `${Date.now()}`, name: `Semester ${current.length + 1}`, sgpa: "", credits: "" },
    ]);
  };

  const remove = (id: string) => {
    setRows((current) => (current.length > 1 ? current.filter((row) => row.id !== id) : current));
  };

  const rowColors = ["var(--brand)", "var(--brand-deep)", "var(--brand)", "var(--brand)", "var(--brand-deep)"];

  const handleCalculate = () => {
    // SGPA→CGPA: both charts show SGPA value per semester (same data, same colors)
    const pieData = rows.map((row, i) => ({
      label: row.name || `S${i + 1}`,
      value: Math.round(Math.min(10, Math.max(0, numberValue(row.sgpa)))),
      fill: rowColors[i % rowColors.length],
    }));
    const barData = rows.map((row, i) => ({
      label: row.name || `S${i + 1}`,
      value: Math.round(Math.min(100, Math.max(0, numberValue(row.sgpa) * 10))),
      fill: rowColors[i % rowColors.length],
    }));

    setCalculated({ result, rows: rows.map((row) => ({ ...row })), pieData, barData });
  };

  return (
    <ToolShell title={title} subtitle={subtitle} helper={helper} pieData={calculated?.pieData} barData={calculated?.barData}>
      <CalcCard title="Semester Grades" helper="Credit-weighted CGPA calculation.">
        <div className="space-y-1.5">
          <div className="grid grid-cols-[minmax(0,1fr)_68px_68px_22px] gap-1.5 text-[7px] font-black uppercase text-[var(--brand-muted)]">
            <span>Semester</span>
            <span>SGPA</span>
            <span>Credits</span>
            <span />
          </div>
          <AnimatePresence initial={false}>
            {rows.map((row, index) => (
              <motion.div
                layout
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid grid-cols-[minmax(0,1fr)_68px_68px_22px] gap-1.5"
              >
                <input className="h-[21px] rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] px-2 text-[9px] font-bold text-[var(--brand-text)]" value={row.name} onChange={(e) => update(row.id, "name", e.target.value)} />
                <input className="h-[21px] rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] px-2 text-[9px] font-bold text-[var(--brand-text)]" value={row.sgpa} onChange={(e) => update(row.id, "sgpa", e.target.value)} inputMode="decimal" />
                <input className="h-[21px] rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] px-2 text-[9px] font-bold text-[var(--brand-text)]" value={row.credits} onChange={(e) => update(row.id, "credits", e.target.value)} inputMode="decimal" />
                <button className="flex h-[21px] w-[21px] items-center justify-center rounded border border-[var(--brand-border)] text-[var(--brand-muted)]" onClick={() => remove(row.id)} disabled={rows.length === 1} aria-label={`Remove semester ${index + 1}`}>
                  <Trash2 size={13} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <button className="mt-2 flex h-[22px] w-full items-center justify-center gap-1.5 rounded border border-dashed border-[var(--brand-muted)] text-[8px] font-black text-[var(--brand-muted)]" onClick={add}>
            <Plus size={14} /> Add Semester
          </button>
          <CalcButton onClick={handleCalculate}>Calculate</CalcButton>
        </div>
      </CalcCard>
      {calculated ? (
        <GenericResultDisplay primary={calculated.result.toFixed(0)} />
      ) : (
        <PendingResult />
      )}
      <MiniBarPanel
        title="Semester Trend"
        rows={(calculated?.rows ?? []).map((row) => ({ label: row.name, value: numberValue(row.sgpa) * 10, color: "var(--brand)" }))}
      />
    </ToolShell>
  );
}

export function UnifiedSgpaToCgpaCalculator() {
  return (
    <TermRowsCalculator
      title="SGPA to CGPA Calculator"
      subtitle="Combine semester grades."
      helper="Enter each semester SGPA and credits to calculate credit-weighted CGPA."
    />
  );
}

export function UnifiedCgpaCalculator() {
  return (
    <TermRowsCalculator
      title="CGPA Calculator"
      subtitle="Combine semester grades."
      helper="Enter each semester SGPA and credits to calculate credit-weighted CGPA."
    />
  );
}

export function UnifiedCgpaToPercentCalculator() {
  const [cgpa, setCgpa] = useState("8.4");
  const [factor, setFactor] = useState("9.5");
  
  const [calculated, setCalculated] = useState<null | {
    result: number;
    pieData: Array<{ label: string; value: number; fill?: string }>;
    barData: Array<{ label: string; value: number; fill?: string }>;
  }>(null);

  const handleCalculate = () => {
    const result = numberValue(cgpa) * numberValue(factor);
    const clampedResult = Math.min(100, Math.max(0, result));
    
    // CGPA→%: both charts show Result vs Remaining (same data)
    const clampedResultRounded = Math.round(clampedResult * 10) / 10;
    const remainingRounded = Math.round((100 - clampedResultRounded) * 10) / 10;
    const pieData = [
      { label: "Result",    value: Math.round(clampedResultRounded), fill: "var(--brand)" },
      { label: "Remaining", value: Math.round(remainingRounded),      fill: "var(--brand-border)" },
    ];
    const barData = [
      { label: "Result",    value: Math.round(clampedResultRounded), fill: "var(--brand)" },
      { label: "Remaining", value: Math.round(remainingRounded),      fill: "var(--brand-border)" },
    ];

    setCalculated({ result, pieData, barData });
  };

  return (
    <ToolShell title="CGPA to Percentage" subtitle="Convert grade points." helper="Use your institution's conversion factor, commonly 9.5."
      pieData={calculated?.pieData} barData={calculated?.barData}>
      <CalcCard title="Conversion Inputs" helper="Adjust the multiplier if your university uses a different rule.">
        <div className="grid grid-cols-2 gap-2">
          <CalcField label="CGPA" value={cgpa} onChange={setCgpa} />
          <CalcField label="Factor" value={factor} onChange={setFactor} />
        </div>
        <div className="mt-3">
          <CalcButton onClick={handleCalculate}>Calculate</CalcButton>
        </div>
      </CalcCard>
      {calculated === null ? (
        <PendingResult />
      ) : (
        <GenericResultDisplay primary={calculated.result.toFixed(0)} suffix="%" />
      )}
      <DistributionPanel score={calculated?.result ?? 0} />
    </ToolShell>
  );
}

export function UnifiedSgpaToPercentCalculator() {
  const [sgpa, setSgpa] = useState("8.2");
  
  const [calculated, setCalculated] = useState<null | {
    result: number;
    pieData: Array<{ label: string; value: number; fill?: string }>;
    barData: Array<{ label: string; value: number; fill?: string }>;
  }>(null);

  const handleCalculate = () => {
    const result = numberValue(sgpa) * 9.5;
    const clampedResult = Math.min(100, Math.max(0, result));
    
    // SGPA→%: both charts show Result vs Remaining (same data)
    const clampedResultRounded = Math.round(clampedResult * 10) / 10;
    const remainingRounded = Math.round((100 - clampedResultRounded) * 10) / 10;
    const pieData = [
      { label: "Result",    value: Math.round(clampedResultRounded), fill: "var(--brand)" },
      { label: "Remaining", value: Math.round(remainingRounded),      fill: "var(--brand-border)" },
    ];
    const barData = [
      { label: "Result",    value: Math.round(clampedResultRounded), fill: "var(--brand)" },
      { label: "Remaining", value: Math.round(remainingRounded),      fill: "var(--brand-border)" },
    ];

    setCalculated({ result, pieData, barData });
  };

  return (
    <ToolShell title="SGPA to Percentage" subtitle="Semester percentage estimate." helper="Convert SGPA to percentage using the standard 9.5 multiplier."
      pieData={calculated?.pieData} barData={calculated?.barData}>
      <CalcCard title="SGPA Input" helper="Enter your semester grade point average.">
        <CalcField label="SGPA" value={sgpa} onChange={setSgpa} />
        <div className="mt-3">
          <CalcButton onClick={handleCalculate}>Calculate</CalcButton>
        </div>
      </CalcCard>
      {calculated === null ? (
        <PendingResult />
      ) : (
        <GenericResultDisplay primary={calculated.result.toFixed(0)} suffix="%" />
      )}
      <DistributionPanel score={calculated?.result ?? 0} />
    </ToolShell>
  );
}

export function UnifiedPercentToCgpaCalculator() {
  const [percent, setPercent] = useState("82");
  
  const [calculated, setCalculated] = useState<null | { 
    cgpa: number; 
    percent: number;
    pieData: Array<{ label: string; value: number; fill?: string }>;
    barData: Array<{ label: string; value: number; fill?: string }>;
  }>(null);

  const handleCalculate = () => {
    const percentVal = numberValue(percent);
    const cgpa = percentVal / 9.5;
    const clampedPercent = Math.min(100, Math.max(0, percentVal));
    
    // %→CGPA: both charts show Percentage vs Remaining (same data)
    const clampedPercentRounded = Math.round(clampedPercent * 10) / 10;
    const remainingRounded = Math.round((100 - clampedPercentRounded) * 10) / 10;
    const pieData = [
      { label: "Percentage", value: Math.round(clampedPercentRounded), fill: "var(--brand-deep)" },
      { label: "Remaining",  value: Math.round(remainingRounded),       fill: "var(--brand-border)" },
    ];
    const barData = [
      { label: "Percentage", value: Math.round(clampedPercentRounded), fill: "var(--brand-deep)" },
      { label: "Remaining",  value: Math.round(remainingRounded),       fill: "var(--brand-border)" },
    ];

    setCalculated({ cgpa, percent: percentVal, pieData, barData });
  };

  return (
    <ToolShell title="Percentage to CGPA" subtitle="Convert percentage to points." helper="Convert percentage to CGPA using the standard 9.5 divisor."
      pieData={calculated?.pieData} barData={calculated?.barData}>
      <CalcCard title="Percentage Input" helper="Enter your percentage score.">
        <CalcField label="Percentage" value={percent} onChange={setPercent} suffix="%" />
        <div className="mt-3">
          <CalcButton onClick={handleCalculate}>Calculate</CalcButton>
        </div>
      </CalcCard>
      {calculated ? (
        <GenericResultDisplay primary={calculated.cgpa.toFixed(0)} />
      ) : (
        <PendingResult />
      )}
      <DistributionPanel score={calculated?.percent ?? 0} />
    </ToolShell>
  );
}

export function UnifiedMarksCalculator() {
  const [obtained, setObtained] = useState("410");
  const [total, setTotal] = useState("500");
  
  const [calculated, setCalculated] = useState<null | {
    result: number;
    pieData: Array<{ label: string; value: number; fill?: string }>;
    barData: Array<{ label: string; value: number; fill?: string }>;
  }>(null);

  const handleCalculate = () => {
    const obtainedVal = numberValue(obtained);
    const totalVal = Math.max(1, numberValue(total));
    const result = (obtainedVal / totalVal) * 100;
    
    const pieData = [
      { label: "Obtained", value: obtainedVal, fill: "var(--brand)" },
      { label: "Lost", value: Math.max(0, totalVal - obtainedVal), fill: "var(--brand-deep)" },
    ];
    const barData = [
      { label: "Obtained", value: Math.round((obtainedVal / totalVal) * 100), fill: "var(--brand)" },
      { label: "Lost", value: Math.round(((totalVal - obtainedVal) / totalVal) * 100), fill: "var(--brand-deep)" },
      { label: "Score", value: Math.round(result), fill: "var(--brand)" },
    ];

    setCalculated({ result, pieData, barData });
  };

  return (
    <ToolShell title="Marks Percentage Calculator" subtitle="Convert marks to percentage." helper="Enter obtained marks and total marks to calculate your percentage."
      pieData={calculated?.pieData} barData={calculated?.barData}>
      <CalcCard title="Marks Input" helper="Total marks must be greater than zero.">
        <div className="grid grid-cols-2 gap-2">
          <CalcField label="Obtained" value={obtained} onChange={setObtained} />
          <CalcField label="Total" value={total} onChange={setTotal} />
        </div>
        <div className="mt-3">
          <CalcButton onClick={handleCalculate}>Calculate</CalcButton>
        </div>
      </CalcCard>
      {calculated === null ? (
        <PendingResult />
      ) : (
        <GenericResultDisplay primary={calculated.result.toFixed(0)} suffix="%" />
      )}
      <DistributionPanel score={calculated?.result ?? 0} />
    </ToolShell>
  );
}

export function UnifiedPercentageCalculator() {
  const [part, setPart] = useState("25");
  const [whole, setWhole] = useState("200");
  const [oldValue, setOldValue] = useState("120");
  const [newValue, setNewValue] = useState("150");
  
  const [calculated, setCalculated] = useState<null | { 
    percentage: number; 
    change: number;
    pieData: Array<{ label: string; value: number; fill?: string }>;
    barData: Array<{ label: string; value: number; fill?: string }>;
  }>(null);

  const handleCalculate = () => {
    const partVal = numberValue(part);
    const wholeVal = Math.max(1, numberValue(whole));
    const percentage = (partVal / wholeVal) * 100;
    const change = numberValue(oldValue) !== 0 ? ((numberValue(newValue) - numberValue(oldValue)) / Math.abs(numberValue(oldValue))) * 100 : 0;
    
    // Percentage calc: both charts show Part vs Remainder (same data)
    const pieData = [
      { label: "Part",      value: Math.round(Math.min(100, percentage)),      fill: "var(--brand)" },
      { label: "Remainder", value: Math.round(Math.max(0, 100 - Math.min(100, percentage))), fill: "var(--brand-border)" },
    ];
    const barData = [
      { label: "Part",      value: Math.round(Math.min(100, percentage)),      fill: "var(--brand)" },
      { label: "Remainder", value: Math.round(Math.max(0, 100 - Math.min(100, percentage))), fill: "var(--brand-border)" },
    ];

    setCalculated({ percentage, change, pieData, barData });
  };

  return (
    <ToolShell title="Percentage Calculator" subtitle="Solve common percentage math." helper="Calculate percentages and percentage change in one compact tool."
      pieData={calculated?.pieData} barData={calculated?.barData}>
      <CalcCard title="Percentage Inputs" helper="Part divided by whole gives the percentage.">
        <div className="grid grid-cols-2 gap-2">
          <CalcField label="Part" value={part} onChange={setPart} />
          <CalcField label="Whole" value={whole} onChange={setWhole} />
          <CalcField label="Old Value" value={oldValue} onChange={setOldValue} />
          <CalcField label="New Value" value={newValue} onChange={setNewValue} />
        </div>
        <div className="mt-3">
          <CalcButton onClick={handleCalculate}>Calculate</CalcButton>
        </div>
      </CalcCard>
      {calculated ? (
        <GenericResultDisplay primary={calculated.percentage.toFixed(0)} suffix="%" />
      ) : (
        <PendingResult />
      )}
      <MiniBarPanel
        title="Percentage Summary"
        rows={[
          { label: "Percent", value: calculated?.percentage ?? 0, color: "var(--brand)" },
          { label: "Change", value: Math.abs(calculated?.change ?? 0), color: (calculated?.change ?? 0) >= 0 ? "var(--brand)" : "var(--brand-deep)" },
        ]}
      />
    </ToolShell>
  );
}

export function UnifiedLoanCalculator() {
  const [principal, setPrincipal] = useState("250000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  
  const [calculated, setCalculated] = useState<null | { 
    monthly: number; 
    total: number; 
    principal: number;
  }>(null);

  const handleCalculate = () => {
    const p = numberValue(principal);
    const monthlyRate = numberValue(rate) / 100 / 12;
    const months = Math.max(1, numberValue(years) * 12);
    const monthly = monthlyRate === 0 ? p / months : (p * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const total = monthly * months;

    setCalculated({ monthly, total, principal: p });
  };

  return (
    <ToolShell
      title="Loan Calculator"
      subtitle="Estimate monthly payments."
      helper="Enter principal, annual interest rate, and loan term."
      showSideCharts={false}
    >
      <CalcCard title="Loan Inputs" helper="Supports zero-interest loans too.">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <CalcField label="Loan Amount" value={principal} onChange={setPrincipal} suffix="$" />
          <CalcField label="Rate" value={rate} onChange={setRate} suffix="%" />
          <CalcField label="Years" value={years} onChange={setYears} />
        </div>
        <div className="mt-3">
          <CalcButton onClick={handleCalculate}>Calculate</CalcButton>
        </div>
      </CalcCard>
      {calculated ? (
        <GenericResultDisplay primary={money(calculated.monthly)} badge="Monthly" detail={`${money(calculated.total - calculated.principal)} interest`} />
      ) : (
        <PendingResult />
      )}
      <MetricGrid
        metrics={[
          { label: "Total Paid", value: calculated ? money(calculated.total) : "--", tone: "navy" },
          { label: "Interest", value: calculated ? money(calculated.total - calculated.principal) : "--", tone: "red" },
        ]}
      />
    </ToolShell>
  );
}

export function UnifiedTipCalculator() {
  const [bill, setBill] = useState("84");
  const [tip, setTip] = useState("18");
  const [people, setPeople] = useState("2");
  
  const [calculated, setCalculated] = useState<null | { 
    tipAmount: number; 
    total: number; 
    perPerson: number;
  }>(null);

  const handleCalculate = () => {
    const billVal = numberValue(bill);
    const tipAmount = billVal * (numberValue(tip) / 100);
    const total = billVal + tipAmount;
    const perPerson = total / Math.max(1, numberValue(people));

    setCalculated({ tipAmount, total, perPerson });
  };

  return (
    <ToolShell
      title="Tip Calculator"
      subtitle="Split the bill cleanly."
      helper="Calculate tip, total bill, and per-person amount."
      showSideCharts={false}
    >
      <CalcCard title="Bill Inputs" helper="Use the split field for groups.">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <CalcField label="Bill" value={bill} onChange={setBill} suffix="$" />
          <CalcField label="Tip" value={tip} onChange={setTip} suffix="%" />
          <CalcField label="People" value={people} onChange={setPeople} />
        </div>
        <div className="mt-3">
          <CalcButton onClick={handleCalculate}>Calculate</CalcButton>
        </div>
      </CalcCard>
      {calculated ? (
        <GenericResultDisplay primary={money(calculated.perPerson)} />
      ) : (
        <PendingResult />
      )}
      <MetricGrid
        metrics={[
          { label: "Tip", value: calculated ? money(calculated.tipAmount) : "--", tone: "orange" },
          { label: "Total", value: calculated ? money(calculated.total) : "--", tone: "green" },
        ]}
      />
    </ToolShell>
  );
}

export function UnifiedPasswordGenerator() {
  const [length, setLength] = useState("16");
  const [password, setPassword] = useState("");

  const handleLengthChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    if (cleaned === "") {
      setLength("");
      return;
    }
    const num = parseInt(cleaned, 10);
    if (num > 20) {
      setLength("20");
    } else {
      setLength(cleaned);
    }
  };

  const generate = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&()*+,-./:;=?@[]^_{|}~";
    const size = Math.max(8, Math.min(20, Math.round(numberValue(length))));
    const values = new Uint32Array(size);
    crypto.getRandomValues(values);
    const generated = Array.from(values, (value) => charset[value % charset.length]).join("");
    setPassword(generated);
  };

  const handleCopy = async () => {
    if (!password) {
      toast.error("No password to copy", {
        description: "Please generate a password first",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      toast.success("Password copied!", {
        description: "Your password has been copied to clipboard",
      });
    } catch (err) {
      toast.error("Failed to copy", {
        description: "Please try copying manually",
      });
    }
  };

  return (
    <ToolShell
      title="Password Generator"
      subtitle="Create secure passwords."
      helper="Generate browser-side passwords with cryptographic randomness."
      showSideCharts={false}
    >
      <CalcCard title="Password Settings" helper="Length must be between 8 and 20 characters.">
        <CalcField label="Length" value={length} onChange={handleLengthChange} min={8} max={20} />
        <div className="mt-2">
          <CalcButton onClick={generate}>Generate</CalcButton>
        </div>
      </CalcCard>
      <div className="rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] p-3 text-left shadow-sm">
        <span className="mb-2 block text-[9px] font-black uppercase text-[var(--brand-muted)]">Generated Password</span>
        <div className="flex items-center gap-2">
          <p className="flex-1 break-all font-mono text-xs font-black text-[var(--brand-text)]">
            {password || "No password generated yet."}
          </p>
          <button
            onClick={handleCopy}
            className="shrink-0 rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 py-1.5 text-[8px] font-black text-[var(--brand-muted)] transition-colors hover:bg-[var(--color-muted)]"
          >
            Copy
          </button>
        </div>
      </div>
    </ToolShell>
  );
}
