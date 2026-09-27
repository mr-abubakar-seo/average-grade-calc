import { roundTo } from "./mathEngine";

export const calculateTip = (billAmount: number, tipPercentage: number): number => {
  return roundTo(billAmount * (tipPercentage / 100));
};

export const calculateSplit = (billAmount: number, tip: number, people: number): number => {
  return roundTo((billAmount + tip) / people);
};

export const calculatePercentage = (part: number, whole: number): number => {
  return whole > 0 ? roundTo((part / whole) * 100) : 0;
};

export const calculatePercentageOf = (percentage: number, whole: number): number => {
  return roundTo((percentage / 100) * whole);
};

export const calculatePercentageChange = (oldValue: number, newValue: number): number => {
  if (oldValue === 0) return 0;
  return roundTo(((newValue - oldValue) / Math.abs(oldValue)) * 100);
};

export interface AmortizationScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export const calculateLoanAmortization = (principal: number, rate: number, years: number): AmortizationScheduleItem[] => {
  const monthlyRate = rate / 100 / 12;
  const totalPayments = years * 12;
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  const schedule: AmortizationScheduleItem[] = [];
  let balance = principal;
  
  for (let i = 1; i <= totalPayments; i++) {
    const interest = balance * monthlyRate;
    const principalPayment = monthlyPayment - interest;
    balance -= principalPayment;
    
    schedule.push({
      month: i,
      payment: roundTo(monthlyPayment),
      principal: roundTo(principalPayment),
      interest: roundTo(interest),
      balance: roundTo(Math.max(0, balance))
    });
  }
  
  return schedule;
};
