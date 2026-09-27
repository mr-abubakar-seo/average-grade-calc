'use client';

import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CalculatorResult, CalculatorRowData } from "@/components/calculator/useCalculatorLogic";

interface CalculatorShellProps {
  badge?: string;
  title: string;
  subtitle: string;
  helper: string;
  children: ReactNode;
  pieData?: ChartDatum[];
  barData?: ChartDatum[];
  showSideCharts?: boolean;
}

interface CalcCardProps {
  title: string;
  helper: string;
  children: ReactNode;
}

interface InputRowProps {
  index: number;
  row: CalculatorRowData;
  canRemove: boolean;
  onUpdate: (id: string, field: keyof CalculatorRowData, value: string) => void;
  onRemove: (id: string) => void;
}

interface ResultDisplayProps {
  result: CalculatorResult;
}

interface DistributionPanelProps {
  score: number;
  onResetScale?: () => void;
}

interface CalcFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
  type?: "text" | "number";
  min?: number;
  max?: number;
  step?: number;
}

interface Metric {
  label: string;
  value: string;
  tone?: "navy" | "orange" | "green" | "red";
}

interface GenericResultDisplayProps {
  primary: string;
  suffix?: string;
  badge?: string;
  detail?: string;
}

export interface ChartDatum {
  label: string;
  value: number;
  fill?: string;
}

export const CHART_COLORS = [
  "#22c55e",
  "#eab308",
  "#3b82f6",
  "#f97316",
  "#a855f7",
  "#ef4444",
  "#14b8a6",
  "#ec4899",
];

const gradeScale = [
  { label: "A", min: 90, value: 90, fill: CHART_COLORS[0] },
  { label: "B", min: 80, value: 80, fill: CHART_COLORS[1] },
  { label: "C", min: 70, value: 70, fill: CHART_COLORS[3] },
  { label: "D", min: 60, value: 60, fill: CHART_COLORS[5] },
];

const defaultPieData: ChartDatum[] = [
  { label: "Score", value: 65, fill: CHART_COLORS[0] },
  { label: "Remaining", value: 35, fill: CHART_COLORS[1] },
];

const defaultBarData: ChartDatum[] = [
  { label: "A", value: 92, fill: CHART_COLORS[0] },
  { label: "B", value: 78, fill: CHART_COLORS[1] },
  { label: "C", value: 64, fill: CHART_COLORS[2] },
  { label: "D", value: 46, fill: CHART_COLORS[3] },
  { label: "F", value: 24, fill: CHART_COLORS[5] },
];

const clampChartValue = (value: number) => Math.max(0, Math.min(Number.isFinite(value) ? value : 0, 100));

const normalizeChartData = (data: ChartDatum[] | undefined, fallback: ChartDatum[]) =>
  (data && data.length > 0 ? data : fallback).map((item, index) => ({
    ...item,
    fill: CHART_COLORS[index % CHART_COLORS.length],
    value: clampChartValue(item.value),
  }));

function ClientOnlyChart({
  heightClass,
  children,
}: {
  heightClass: string;
  children: ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`${heightClass} min-w-0`}>
      {isMounted ? children : null}
    </div>
  );
}

function SideChartCard({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <aside
      className={`rounded-lg border border-[var(--brand-border)] bg-[var(--brand-surface)] p-3 text-left text-[var(--brand-text)] shadow-sm transition-colors ${className}`}
    >
      <h2 className="text-center text-[14px] font-bold leading-none text-[var(--brand-text)]">{title}</h2>
      {children}
    </aside>
  );
}

function GlobalPieGraph({ data }: { data?: ChartDatum[] }) {
  const chartData = normalizeChartData(data, defaultPieData);

  return (
    <SideChartCard title="Grade Mix" className="order-2 lg:order-1">
      <ClientOnlyChart heightClass="h-[210px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <PieChart margin={{ top: 12, right: 4, bottom: 0, left: 4 }}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="48%"
              outerRadius={72}
              innerRadius={0}
              stroke="var(--brand-surface)"
              strokeWidth={2}
            >
              {chartData.map((entry) => (
                <Cell key={entry.label} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${Math.round(Number(value))}%`, "Share"]} 
              contentStyle={{ 
                backgroundColor: 'var(--brand-surface)', 
                border: '1px solid var(--brand-border)', 
                borderRadius: '6px',
                color: 'var(--brand-text)'
              }}
              labelStyle={{ color: 'var(--brand-text)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ClientOnlyChart>
      <div className="mt-1 grid grid-cols-2 gap-1">
        {chartData.map((item) => (
          <div key={item.label} className="flex items-center gap-1 text-[13px] font-bold text-[var(--brand-muted)]">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
            <span className="truncate">{item.label}</span>
          </div>
        ))}
      </div>
    </SideChartCard>
  );
}

function GlobalBarGraph({ data }: { data?: ChartDatum[] }) {
  const chartData = normalizeChartData(data, defaultBarData);

  return (
    <SideChartCard title="Score Bands" className="order-2 lg:order-3">
      <ClientOnlyChart heightClass="h-[210px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart data={chartData} margin={{ top: 18, right: 6, bottom: 8, left: -24 }}>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--brand-muted)", fontSize: 9, fontWeight: 900 }}
            />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              formatter={(value) => [`${Math.round(Number(value))}%`, "Score"]} 
              contentStyle={{ 
                backgroundColor: 'var(--brand-surface)', 
                border: '1px solid var(--brand-border)', 
                borderRadius: '6px',
                color: 'var(--brand-text)'
              }}
              labelStyle={{ color: 'var(--brand-text)' }}
            />
            <Bar dataKey="value" radius={[7, 7, 0, 0]} barSize={24}>
              {chartData.map((entry) => (
                <Cell key={entry.label} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ClientOnlyChart>
      <div className="grid grid-cols-3 gap-1.5">
        {chartData.slice(0, 3).map((item) => (
          <div key={item.label} className="rounded border border-[var(--brand-border)] bg-[var(--color-muted)] p-1.5 text-center">
            <p className="text-[13px] font-bold text-[var(--brand-muted)]">{item.label}</p>
            <p className="text-[13px] font-bold text-[var(--brand-text)]">{Math.round(item.value)}%</p>
          </div>
        ))}
      </div>
    </SideChartCard>
  );
}

export function CalculatorShell({
  badge,
  title,
  subtitle,
  helper,
  children,
  pieData,
  barData,
  showSideCharts = true,
}: CalculatorShellProps) {
  return (
    <section className="bg-background px-3 py-7 text-[var(--brand-text)] transition-colors duration-300 sm:px-4 sm:py-8">
      <div className="mx-auto w-full max-w-[1120px] text-center">
        <div className="inline-flex min-h-5 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--brand)_30%,transparent)] px-3 py-0.5 text-[13px] font-bold uppercase text-[var(--brand-muted)] transition-colors before:mr-1.5 before:h-[7px] before:w-[7px] before:rounded-full before:border before:border-current before:content-['']">
          {badge ?? title}
        </div>
        <h1 className="mt-3.5 text-[28px] font-bold leading-none tracking-normal text-[var(--brand-text)] transition-colors sm:text-4xl">
          {title}
        </h1>
        <p className="mt-1 text-[15px] font-bold italic leading-tight text-[var(--brand)] sm:text-xl">
          {subtitle}
        </p>
        <p className="mx-auto mt-3 mb-4 max-w-[320px] text-[14px] font-bold leading-relaxed text-[var(--brand-muted)] transition-colors sm:max-w-md sm:text-[15px]">
          {helper}
        </p>
        <div
          className={showSideCharts
            ? "mx-auto grid w-full max-w-[430px] items-start gap-4 lg:max-w-[1180px] lg:grid-cols-[220px_minmax(560px,680px)_220px] lg:justify-center xl:grid-cols-[240px_minmax(640px,760px)_240px]"
            : "mx-auto grid w-full max-w-[430px] items-start gap-4 lg:max-w-[760px] lg:grid-cols-1 lg:justify-center"}
        >
          {showSideCharts ? <GlobalPieGraph data={pieData} /> : null}
          <main className={showSideCharts ? "order-1 w-full lg:order-2" : "order-1 w-full"}>{children}</main>
          {showSideCharts ? <GlobalBarGraph data={barData} /> : null}
        </div>
      </div>
    </section>
  );
}

export function CalcCard({ title, helper, children }: CalcCardProps) {
  return (
    <div className="overflow-hidden rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] p-3 text-left text-[var(--brand-text)] shadow-sm transition-colors">
      <div className="mb-2.5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold leading-none text-[var(--brand-text)]">{title}</h2>
          <p className="mt-1 text-[15px] font-bold leading-tight text-[var(--brand-muted)]">{helper}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export function InputHeader() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_96px_96px_34px] items-center gap-2 pb-1 text-[14px] font-bold uppercase text-[var(--brand-muted)] sm:grid-cols-[minmax(0,1fr)_124px_124px_34px]">
      <span>Assignment</span>
      <span>Grade</span>
      <span>Weight</span>
      <span aria-hidden="true" />
    </div>
  );
}

export function InputRow({ index, row, canRemove, onUpdate, onRemove }: InputRowProps) {
  const name = row.name || `Assignment ${index + 1}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="grid grid-cols-[minmax(0,1fr)_96px_96px_34px] items-center gap-2 sm:grid-cols-[minmax(0,1fr)_124px_124px_34px]"
    >
      <input
        aria-label={`Assignment ${index + 1} name`}
        value={row.name}
        onChange={(event) => onUpdate(row.id, "name", event.target.value)}
        placeholder={`Assignment ${index + 1}`}
        className="h-[42px] w-full rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 text-[15px] font-bold text-[var(--brand-text)] outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[color-mix(in_srgb,var(--brand)_25%,transparent)]"
      />
      <div className="relative">
        <input
          aria-label={`${name} grade`}
          inputMode="decimal"
          value={row.grade}
          onChange={(event) => onUpdate(row.id, "grade", event.target.value)}
          placeholder="0"
          className="h-[42px] w-full rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 pr-7 text-[15px] font-bold text-[var(--brand-text)] outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[color-mix(in_srgb,var(--brand)_25%,transparent)]"
        />
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[var(--brand-muted)]">
          %
        </span>
      </div>
      <div className="relative">
        <input
          aria-label={`${name} weight`}
          inputMode="decimal"
          value={row.weight}
          onChange={(event) => onUpdate(row.id, "weight", event.target.value)}
          placeholder="0"
          className="h-[42px] w-full rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 pr-7 text-[15px] font-bold text-[var(--brand-text)] outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[color-mix(in_srgb,var(--brand)_25%,transparent)]"
        />
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[var(--brand-muted)]">
          %
        </span>
      </div>
      <button
        type="button"
        className="inline-flex h-[42px] w-[34px] items-center justify-center rounded border border-[var(--brand-border)] text-[var(--brand-muted)] disabled:cursor-not-allowed disabled:opacity-35"
        onClick={() => onRemove(row.id)}
        disabled={!canRemove}
        aria-label={`Remove ${name}`}
      >
        <Trash2 size={13} />
      </button>
    </motion.div>
  );
}

export function InputRows({
  rows,
  onUpdate,
  onRemove,
}: {
  rows: CalculatorRowData[];
  onUpdate: InputRowProps["onUpdate"];
  onRemove: InputRowProps["onRemove"];
}) {
  return (
    <div className="space-y-1.5" role="table" aria-label="Calculator entries">
      <InputHeader />
      <AnimatePresence initial={false}>
        {rows.map((row, index) => (
          <InputRow
            key={row.id}
            index={index}
            row={row}
            canRemove={rows.length > 1}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export function CalculatorActions({ onAdd, onCalculate }: { onAdd: () => void; onCalculate: () => void }) {
  return (
    <>
      <button
        type="button"
        className="mt-2.5 flex h-[44px] w-full items-center justify-center gap-2 rounded border border-dashed border-[var(--brand-muted)] text-[13px] font-bold text-[var(--brand-muted)]"
        onClick={onAdd}
      >
        <Plus size={14} />
        Add Row
      </button>
      <button
        type="button"
        className="mt-2 flex h-[44px] w-full items-center justify-center gap-2 rounded-sm bg-[var(--brand)] text-[13px] font-bold text-white"
        onClick={onCalculate}
      >
        <RotateCcw size={14} />
        Calculate
      </button>
    </>
  );
}

export function CalcField({
  label,
  value,
  onChange,
  placeholder,
  suffix,
  type = "number",
  min,
  max,
  step,
}: CalcFieldProps) {
  return (
    <label className="block text-left">
      <span className="mb-1 block text-[13px] font-bold uppercase text-[var(--brand-muted)]">{label}</span>
      <span className="relative block">
        <input
          type={type}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-[48px] w-full rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] px-3 pr-10 text-[14px] font-bold text-[var(--brand-text)] outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[color-mix(in_srgb,var(--brand)_25%,transparent)]"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[13px] font-bold text-[var(--brand-muted)]">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}

export function CalcButton({
  children,
  onClick,
  variant = "primary",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[48px] w-full items-center justify-center rounded-sm text-[15px] font-bold ${
        variant === "primary"
          ? "bg-[var(--brand)] text-white"
          : "border border-[var(--brand-border)] bg-[var(--brand-surface)] text-[var(--brand-muted)]"
      }`}
    >
      {children}
    </button>
  );
}

export function GenericResultDisplay({ primary, suffix }: GenericResultDisplayProps) {
  return (
    <div className="my-2 flex items-center justify-between text-[var(--brand-text)] transition-colors" aria-live="polite">
      <div className="flex items-end">
        <motion.strong
          key={primary}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[28px] font-bold leading-none"
        >
          {primary}
        </motion.strong>
        {suffix && <span className="ml-1 text-[13px] font-bold text-[var(--brand-muted)]">{suffix}</span>}
      </div>
    </div>
  );
}

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  const toneClass = {
    navy: "text-[var(--brand-text)]",
    orange: "text-[var(--brand)]",
    green: "text-[var(--brand)]",
    red: "text-[var(--brand-deep)]",
  };

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded border border-[var(--brand-border)] bg-[var(--color-muted)] p-2">
          <p className="text-[14px] font-bold uppercase text-[var(--brand-muted)]">{metric.label}</p>
          <p className={`mt-1 text-[13px] font-bold ${toneClass[metric.tone ?? "navy"]}`}>{metric.value}</p>
        </div>
      ))}
    </div>
  );
}

export function MiniBarPanel({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; value: number; color?: string }>;
}) {
  return (
    <div className="overflow-hidden rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] p-3 text-left text-[var(--brand-text)] shadow-sm">
      <h2 className="text-[15px] font-bold leading-none text-[var(--brand-text)]">{title}</h2>
      <div className="mt-3 space-y-2">
        {rows.map((row, index) => (
          <div key={row.label} className="grid grid-cols-[110px_minmax(0,1fr)_60px] items-center gap-2">
            <span className="truncate text-[13px] font-bold text-[var(--brand-muted)]">{row.label}</span>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-muted)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(0, Math.min(row.value, 100))}%` }}
                className="h-full rounded-full"
                style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
              />
            </div>
            <small className="text-right text-[13px] font-bold text-[var(--brand-muted)]">{row.value.toFixed(0)}%</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <div className="my-2 flex items-center justify-between text-[var(--brand-text)] transition-colors" aria-live="polite">
      <div className="flex items-end">
        <motion.strong
          key={result.percentage.toFixed(0)}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[28px] font-bold leading-none"
        >
          {result.percentage.toFixed(0)}
        </motion.strong>
        <span className="ml-1 text-[13px] font-bold text-[var(--brand-muted)]">%</span>
      </div>
    </div>
  );
}

export function DistributionPanel({ score, onResetScale }: DistributionPanelProps) {
  const data = gradeScale.map((grade) => ({
    ...grade,
    value: score >= grade.min ? grade.value : 4,
    fill: score >= grade.min ? grade.fill : "var(--brand-border)",
  }));

  return (
    <div className="overflow-hidden rounded border border-[var(--brand-border)] bg-[var(--brand-surface)] pt-3 text-left text-[var(--brand-text)] shadow-sm">
      <h2 className="px-3.5 text-[15px] font-bold leading-none text-[var(--brand-text)]">Grade Distribution</h2>
      <ClientOnlyChart heightClass="mt-2 h-[104px] px-2">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 14, bottom: 0, left: -28 }}>
            <XAxis type="number" hide domain={[0, 100]} />
            <YAxis
              type="category"
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--brand-muted)", fontSize: 17, fontWeight: 900 }}
            />
            <Bar dataKey="value" radius={[999, 999, 999, 999]} barSize={4} background={{ fill: "var(--color-muted)" }}>
              {data.map((entry) => (
                <Cell key={entry.label} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ClientOnlyChart>
      <button
        type="button"
        className="h-[42px] w-full border-t border-[var(--brand-border)] px-3.5 text-left text-[13px] font-bold text-[var(--brand-muted)]"
        onClick={onResetScale}
      >
        Custom Grade Scale
      </button>
    </div>
  );
}
