import { roundTo } from "./mathEngine";

export const gpaPoints = (letter: string): number => {
  switch (letter) {
    case "A+": return 4.0;
    case "A": return 4.0;
    case "A-": return 3.7;
    case "B+": return 3.3;
    case "B": return 3.0;
    case "B-": return 2.7;
    case "C+": return 2.3;
    case "C": return 2.0;
    case "C-": return 1.7;
    case "D+": return 1.3;
    case "D": return 1.0;
    case "D-": return 0.7;
    default: return 0.0;
  }
};

export const LETTER_OPTIONS = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];

export const getLetterGrade = (percentage: number): string => {
  if (percentage >= 97) return "A+";
  if (percentage >= 93) return "A";
  if (percentage >= 90) return "A-";
  if (percentage >= 87) return "B+";
  if (percentage >= 83) return "B";
  if (percentage >= 80) return "B-";
  if (percentage >= 77) return "C+";
  if (percentage >= 73) return "C";
  if (percentage >= 70) return "C-";
  if (percentage >= 67) return "D+";
  if (percentage >= 63) return "D";
  if (percentage >= 60) return "D-";
  return "F";
};

export const getGradeColorInfo = (letter: string): { bg: string; text: string; border: string } => {
  if (letter.startsWith("A")) return { bg: "bg-green-100 dark:bg-green-950", text: "text-green-800 dark:text-green-300", border: "border-green-200 dark:border-green-900" };
  if (letter.startsWith("B")) return { bg: "bg-blue-100 dark:bg-blue-950", text: "text-blue-800 dark:text-blue-300", border: "border-blue-200 dark:border-blue-900" };
  if (letter.startsWith("C")) return { bg: "bg-yellow-100 dark:bg-yellow-950", text: "text-yellow-800 dark:text-yellow-300", border: "border-yellow-200 dark:border-yellow-900" };
  if (letter.startsWith("D")) return { bg: "bg-orange-100 dark:bg-orange-950", text: "text-orange-800 dark:text-orange-300", border: "border-orange-200 dark:border-orange-900" };
  return { bg: "bg-red-100 dark:bg-red-950", text: "text-red-800 dark:text-red-300", border: "border-red-200 dark:border-red-900" };
};

export const calculateGPA = (courses: { grade: string; credits: number }[]): number => {
  let pointsSum = 0;
  let creditsSum = 0;

  courses.forEach(c => {
    const credits = c.credits;
    if (!isNaN(credits) && c.grade) {
      creditsSum += credits;
      pointsSum += (credits * gpaPoints(c.grade));
    }
  });

  return creditsSum > 0 ? roundTo(pointsSum / creditsSum) : 0;
};

export const calculateSGPA = (courses: { grade: string; credits: number }[]): number => {
  return calculateGPA(courses);
};

export const calculateCGPA = (semesters: { sgpa: number; credits: number }[]): number => {
  let totalPoints = 0;
  let totalCredits = 0;
  semesters.forEach(sem => {
    totalPoints += sem.sgpa * sem.credits;
    totalCredits += sem.credits;
  });
  return totalCredits > 0 ? roundTo(totalPoints / totalCredits) : 0;
};

export const cgpaToPercentage = (cgpa: number, university: string = "normal", scale: number = 10.0): number => {
  if (!university || university === "normal") {
    if (scale === 10.0) return roundTo(cgpa * 9.5);
    if (scale === 5.0) return roundTo(cgpa * 20);
    if (scale === 4.0) return roundTo(cgpa * 25);
    return 0;
  }
  
  const isUSA = university.includes("usa") || ["mit", "harvard", "stanford", "yale", "princeton", "columbia", "chicago", "upenn", "caltech", "duke", "johns_hopkins", "northwestern", "dartmouth", "brown", "vanderbilt", "rice", "notre_dame", "cornell", "georgetown", "emory", "uc_berkeley", "ucla", "usc", "carnegie_mellon", "wake_forest", "tufts", "unc", "boston_university", "case_western", "tulane", "nyu", "bu", "purdue", "ohio_state", "michigan", "illinois", "texas", "penn_state", "minnesota", "arizona_state", "florida", "georgia_tech", "virginia", "washington", "uw_madison", "pittsburgh", "rutgers", "iowa", "colorado", "maryland", "uc_san_diego", "uc_davis", "uc_santa_barbara", "lehigh", "drexel", "stevens", "fordham"].includes(university);

  if (isUSA) return roundTo((cgpa / 4.0) * 100);
  if (university === "vtu") return roundTo((cgpa - 0.75) * 10);
  if (university === "mumbai") return roundTo((cgpa * 7.1) + 11);
  if (university === "makaut" || university === "wbut") return roundTo((cgpa - 0.75) * 10);
  if (university === "gtu") return roundTo((cgpa - 0.5) * 10);
  if (university === "sppu") return roundTo(cgpa * 8.9);
  if (university === "acharya") return roundTo(cgpa * 9.5);
  if (university === "aicte") return roundTo(cgpa * 10);
  if (university === "aktu") return roundTo((cgpa - 0.5) * 10);
  if (university === "amravati") return roundTo(cgpa * 10);
  if (university === "amity") return roundTo(cgpa * 10);
  if (university === "anna") return roundTo(cgpa * 10);
  if (university === "amie") return roundTo(cgpa * 10);
  if (university === "andhra") return roundTo(cgpa * 10);
  if (university === "bamu") return roundTo(cgpa * 10);
  if (university === "bhu") return roundTo(cgpa * 10);
  if (university === "bangalore") return roundTo(cgpa * 10);
  if (university === "bput") return roundTo((cgpa - 0.5) * 10);
  if (university === "bharathiar") return roundTo(cgpa * 10);
  if (university === "bits") return roundTo((cgpa / 10) * 100);
  if (university === "burdwan") return roundTo(cgpa * 10);
  if (university === "calicut") return roundTo(cgpa * 10);
  if (university === "cu") return roundTo(cgpa * 10);
  if (university === "davv") return roundTo(cgpa * 10);
  if (university === "du") return roundTo(cgpa * 10);
  if (university === "dibrugarh") return roundTo(cgpa * 10);
  if (university === "gndu") return roundTo(cgpa * 10);
  if (university === "iit") return roundTo(cgpa * 9.5);
  if (university === "jntu") return roundTo(cgpa * 10);
  if (university === "kerala") return roundTo(cgpa * 10);
  if (university === "ku" || university === "kuk") return roundTo(cgpa * 10);
  if (university === "lpu") return roundTo(cgpa * 10);
  if (university === "madras" || university === "uom") return roundTo(cgpa * 10);
  if (university === "mgr") return roundTo(cgpa * 10);
  if (university === "manipal") return roundTo(cgpa * 9.5);
  if (university === "mysore") return roundTo(cgpa * 10);
  if (university === "nagpur") return roundTo(cgpa * 10);
  if (university === "osmania") return roundTo(cgpa * 10);
  if (university === "rajasthan" || university === "uniraj") return roundTo(cgpa * 10);
  if (university === "rgpv") return roundTo(cgpa * 10);
  if (university === "sathyabama") return roundTo(cgpa * 10);
  if (university === "srm") return roundTo(cgpa * 9.5);
  if (university === "tezpur") return roundTo(cgpa * 10);
  if (university === "vit") return roundTo(cgpa * 9.5);
  if (university === "mg_university") return roundTo(cgpa * 10);
  if (university === "nit") return roundTo(cgpa * 9.5);
  if (university === "ptu" || university === "ikgptu") return roundTo(cgpa * 10);
  if (university === "rtu") return roundTo(cgpa * 10);
  if (university === "sau") return roundTo(cgpa * 10);
  if (university === "sndt") return roundTo(cgpa * 10);
  if (university === "upes") return roundTo(cgpa * 9.5);
  if (university === "thapar") return roundTo(cgpa * 9.5);
  if (university === "dtu") return roundTo(cgpa * 9.5);
  if (university === "jamia" || university === "jmiit") return roundTo(cgpa * 10);
  if (university === "amu") return roundTo(cgpa * 10);
  if (university === "bvp") return roundTo(cgpa * 10);
  if (university === "ipu") return roundTo(cgpa * 10);
  if (university === "mdu") return roundTo(cgpa * 9.5);
  if (university === "hptu") return roundTo(cgpa * 10);
  if (university === "cusat") return roundTo(cgpa * 10);
  if (university === "cblu" || university === "crsu" || university === "gjust" || university === "luvas" ||
      university === "nims" || university === "opjs" || university === "pec" || university === "dbrau" ||
      university === "ycmou") return roundTo(cgpa * 10);
  return roundTo(cgpa * 9.5);
};

export const percentageToCGPA = (percentage: number): number => {
  return roundTo(percentage / 9.5);
};

export const sgpaToPercentage = (sgpa: number): number => {
  return roundTo(sgpa * 9.5);
};

export const calculateMarksPercentage = (obtained: number, total: number): number => {
  return total > 0 ? roundTo((obtained / total) * 100) : 0;
};

export const calculateFinalGrade = (currentGrade: number, currentWeight: number, desiredGrade: number, finalWeight: number): number => {
  return roundTo((desiredGrade - (currentGrade * (currentWeight / 100))) / (finalWeight / 100));
};
