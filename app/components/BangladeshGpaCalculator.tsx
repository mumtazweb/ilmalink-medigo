"use client";

import { useMemo, useState } from "react";

function marksToGp(marksValue: string) {
  const marks = Number(marksValue);

  if (!Number.isFinite(marks)) return 0;
  if (marks >= 80 && marks <= 100) return 5;
  if (marks >= 70 && marks <= 79) return 4;
  if (marks >= 60 && marks <= 69) return 3.5;
  if (marks >= 50 && marks <= 59) return 3;
  if (marks >= 40 && marks <= 49) return 2;
  if (marks >= 33 && marks <= 39) return 1;
  return 0;
}

function isValidMarks(value: string) {
  if (value.trim() === "") return false;
  const marks = Number(value);
  return Number.isFinite(marks) && marks >= 0 && marks <= 100;
}

function average(numbers: number[]) {
  if (!numbers.length) return 0;
  return numbers.reduce((sum, item) => sum + item, 0) / numbers.length;
}

function formatGpa(value: number) {
  return value ? value.toFixed(2) : "—";
}

export default function BangladeshGpaCalculator() {
  const [class10Year, setClass10Year] = useState("");
  const [class12Year, setClass12Year] = useState("");

  const [class10Marks, setClass10Marks] = useState(["", "", "", "", ""]);
  const [physicsMarks, setPhysicsMarks] = useState("");
  const [chemistryMarks, setChemistryMarks] = useState("");
  const [biologyMarks, setBiologyMarks] = useState("");

  const [neetQualified, setNeetQualified] = useState("yes");
  const [hasChecked, setHasChecked] = useState(false);

  const result = useMemo(() => {
    const tenYear = Number(class10Year);
    const twelveYear = Number(class12Year);

    const tenGps = class10Marks.map(marksToGp);
    const physicsGp = marksToGp(physicsMarks);
    const chemistryGp = marksToGp(chemistryMarks);
    const biologyGp = marksToGp(biologyMarks);

    const class10Gpa = average(tenGps);
    const class12Gpa = average([physicsGp, chemistryGp, biologyGp]);
    const combinedGpa = class10Gpa + class12Gpa;

    const issues: string[] = [];
    const notes: string[] = [];
    const englishAdvisory =
      "English must be passed in both Class 10 and Class 12. This calculator keeps it as an advisory because English marks are not entered here.";

    const allMarksFilled =
      class10Marks.every((mark) => mark.trim() !== "") &&
      physicsMarks.trim() !== "" &&
      chemistryMarks.trim() !== "" &&
      biologyMarks.trim() !== "" &&
      class10Year.trim() !== "" &&
      class12Year.trim() !== "";

    const allMarksValid =
      class10Marks.every(isValidMarks) &&
      isValidMarks(physicsMarks) &&
      isValidMarks(chemistryMarks) &&
      isValidMarks(biologyMarks);

    if (!allMarksFilled) {
      return {
        status: "Not Eligible / High Risk",
        statusClass: "text-red-200",
        boxClass: "border-red-300/40 bg-red-500/10",
        class10Gpa,
        class12Gpa,
        combinedGpa,
        biologyGp,
        physicsGp,
        chemistryGp,
        issues: [
          "Fill Class 10 passing year, Class 12 passing year, top five Class 10 marks and Class 12 PCB marks.",
        ],
        notes: [englishAdvisory],
      };
    }

    if (!allMarksValid) {
      issues.push("All subject marks must be valid numbers between 0 and 100.");
    }

    if (!Number.isFinite(tenYear) || !Number.isFinite(twelveYear)) {
      issues.push("Class 10 and Class 12 passing years must be valid years.");
    }

    if (tenYear < 2022) {
      issues.push(
        "Class 10/SSC/O-Level passing year is older than the 2025–26 Bangladesh private MBBS safe rule."
      );
    }

    if (twelveYear !== 2024 && twelveYear !== 2025) {
      issues.push(
        "Class 12/HSC/A-Level passing year should be 2024 or 2025 for the 2025–26 Bangladesh private/non-government foreign-student route."
      );
    }

    if (twelveYear < tenYear) {
      issues.push("Class 12 passing year cannot be before Class 10 passing year.");
    }

    if (twelveYear - tenYear > 2) {
      issues.push(
        "Class 12/HSC/A-Level must be completed within 2 years of passing Class 10/SSC/O-Level."
      );
    }

    if (class10Gpa < 3.5) {
      issues.push(
        "Class 10 average GPA is below 3.50. Even if combined GPA becomes 7.00, the student is not eligible if Class 10 GPA is below 3.50."
      );
    }

    if (class12Gpa < 3.5) {
      issues.push(
        "Class 12 PCB average GPA is below 3.50. Even if combined GPA becomes 7.00, the student is not eligible if Class 12 GPA is below 3.50."
      );
    }

    if (combinedGpa < 7) {
      issues.push(
        "Combined GPA is below 7.00. Class 10 GPA + Class 12 PCB GPA must be at least 7.00."
      );
    }

    if (biologyGp < 3.5) {
      issues.push("Biology GP is below 3.50. Bangladesh MBBS requires minimum GP 3.50 in Biology.");
    }

    if (neetQualified !== "yes") {
      issues.push("Indian students must qualify NEET-UG before taking MBBS admission abroad.");
    }

    if (issues.length === 0) {
      notes.push(
        "This profile looks likely eligible for Bangladesh private/non-government MBBS route based on the entered marks, GPA, gap rule and NEET status."
      );
      notes.push(englishAdvisory);
      notes.push(
        "Final eligibility must still be verified from the latest DGME/BM&DC circular, equivalence certificate, original documents and college admission authority."
      );

      return {
        status: "Likely Eligible",
        statusClass: "text-emerald-200",
        boxClass: "border-emerald-300/40 bg-emerald-500/10",
        class10Gpa,
        class12Gpa,
        combinedGpa,
        biologyGp,
        physicsGp,
        chemistryGp,
        issues: [],
        notes,
      };
    }

    notes.push(englishAdvisory);
    notes.push("Do not use fake, altered or managed certificates to bypass Bangladesh eligibility rules.");
    notes.push("Verify from the latest DGME/BM&DC circular before paying booking money, processing charges or university fees.");

    return {
      status: "Not Eligible / High Risk",
      statusClass: "text-red-200",
      boxClass: "border-red-300/40 bg-red-500/10",
      class10Gpa,
      class12Gpa,
      combinedGpa,
      biologyGp,
      physicsGp,
      chemistryGp,
      issues,
      notes,
    };
  }, [
    class10Year,
    class12Year,
    class10Marks,
    physicsMarks,
    chemistryMarks,
    biologyMarks,
    neetQualified,
  ]);

  const updateClass10Mark = (index: number, value: string) => {
    setHasChecked(false);
    setClass10Marks((current) =>
      current.map((mark, markIndex) => (markIndex === index ? value : mark))
    );
  };

  const handleCheckEligibility = () => {
    setHasChecked(true);
  };

  return (
    <div
      id="bangladesh-gpa-calculator"
      className="mt-8 rounded-3xl border border-cyan-300/30 bg-cyan-500/10 p-6 shadow-[0_0_30px_rgba(34,211,238,0.10)]"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-cyan-300/40 bg-cyan-300/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
          Free Tool
        </span>

        <span className="rounded-full border border-amber-300/40 bg-amber-300/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-200">
          GPA + Gap Check
        </span>

        <span className="rounded-full border border-red-300/40 bg-red-500/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-red-200">
          Be Cautious
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-bold text-white">
        Bangladesh MBBS GPA Eligibility Calculator
      </h3>

      <p className="mt-3 text-sm leading-7 text-gray-300">
        Check Bangladesh MBBS eligibility for Indian students with Class 10 top five marks,
        Class 12 PCB marks, Biology GP 3.50, Combined GPA 7.00, Bangladesh gap rule and
        NEET qualification. Then click Check Eligibility to see GPA score, verdict and reason.
      </p>

      <div className="mt-6 rounded-3xl border border-amber-300/30 bg-amber-500/10 p-5">
        <h4 className="text-lg font-bold text-amber-100">
          Rules Checked by This Calculator
        </h4>

        <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-300">
          <li>Class 10 GPA is calculated from Class 10 top five marks.</li>
          <li>Class 12 GPA is calculated from Physics, Chemistry and Biology only.</li>
          <li>Class 10 GPA must be at least 3.50.</li>
          <li>Class 12 PCB GPA must be at least 3.50.</li>
          <li>Combined GPA = Class 10 GPA + Class 12 PCB GPA must be at least 7.00.</li>
          <li>Biology GP must be at least 3.50.</li>
          <li>Class 12 must be completed within 2 years of passing Class 10.</li>
          <li>For 2025-26, Class 10 should not be before 2022 and Class 12 should be 2024 or 2025.</li>
          <li>Indian students must be NEET-UG qualified.</li>
          <li>English pass in Class 10 and Class 12 is advisory here because English marks are not entered.</li>
        </ul>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-gray-300">
          Class 10 / SSC / O-Level Passing Year
          <input
            id="bangladesh-class-10-year"
            name="bangladeshClass10Year"
            type="number"
            value={class10Year}
            onChange={(e) => {
              setHasChecked(false);
              setClass10Year(e.target.value);
            }}
            placeholder="Example: 2022"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
          />
        </label>

        <label className="space-y-2 text-sm text-gray-300">
          Class 12 / HSC / A-Level Passing Year
          <input
            id="bangladesh-class-12-year"
            name="bangladeshClass12Year"
            type="number"
            value={class12Year}
            onChange={(e) => {
              setHasChecked(false);
              setClass12Year(e.target.value);
            }}
            placeholder="Example: 2024"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
          />
        </label>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
        <h4 className="text-lg font-bold text-white">
          Class 10 Top Five Subject Marks
        </h4>

        <p className="mt-2 text-sm leading-6 text-gray-400">
          Enter marks of the best/top five Class 10 subjects.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-5">
          {class10Marks.map((mark, index) => (
            <label key={index} className="space-y-2 text-sm text-gray-300">
              Subject {index + 1}
              <input
                id={`bangladesh-class-10-subject-${index + 1}`}
                name={`bangladeshClass10Subject${index + 1}`}
                type="number"
                min="0"
                max="100"
                value={mark}
                onChange={(e) => updateClass10Mark(index, e.target.value)}
                placeholder="0–100"
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
        <h4 className="text-lg font-bold text-white">
          Class 12 PCB Marks
        </h4>

        <p className="mt-2 text-sm leading-6 text-gray-400">
          For Bangladesh MBBS, Class 12 GPA is calculated using Physics, Chemistry and Biology.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-gray-300">
            Physics Marks
            <input
              id="bangladesh-physics-marks"
              name="bangladeshPhysicsMarks"
              type="number"
              min="0"
              max="100"
              value={physicsMarks}
              onChange={(e) => {
                setHasChecked(false);
                setPhysicsMarks(e.target.value);
              }}
              placeholder="0–100"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
            />
          </label>

          <label className="space-y-2 text-sm text-gray-300">
            Chemistry Marks
            <input
              id="bangladesh-chemistry-marks"
              name="bangladeshChemistryMarks"
              type="number"
              min="0"
              max="100"
              value={chemistryMarks}
              onChange={(e) => {
                setHasChecked(false);
                setChemistryMarks(e.target.value);
              }}
              placeholder="0–100"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
            />
          </label>

          <label className="space-y-2 text-sm text-gray-300">
            Biology Marks
            <input
              id="bangladesh-biology-marks"
              name="bangladeshBiologyMarks"
              type="number"
              min="0"
              max="100"
              value={biologyMarks}
              onChange={(e) => {
                setHasChecked(false);
                setBiologyMarks(e.target.value);
              }}
              placeholder="0–100"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-gray-300">
          NEET Qualified?
          <select
            id="bangladesh-neet-qualified"
            name="bangladeshNeetQualified"
            value={neetQualified}
            onChange={(e) => {
              setHasChecked(false);
              setNeetQualified(e.target.value);
            }}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-cyan-300"
          >
            <option className="text-black" value="yes">
              Yes
            </option>
            <option className="text-black" value="no">
              No
            </option>
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={handleCheckEligibility}
        className="mt-6 w-full rounded-2xl bg-cyan-300 px-6 py-4 text-base font-extrabold text-slate-950 shadow-[0_12px_30px_rgba(34,211,238,0.20)] transition hover:bg-cyan-200"
      >
        Check Eligibility
      </button>

      {!hasChecked && (
        <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-gray-300">
          Fill the details and click <strong className="text-white">Check Eligibility</strong> to see GPA score,
          final verdict and reasons.
        </p>
      )}

      {hasChecked && (
        <div className={`mt-6 rounded-3xl border p-5 ${result.boxClass}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-300">
              Final Verdict
            </p>

            <p className={`text-xl font-bold ${result.statusClass}`}>
              {result.status}
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                Class 10 GPA
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {formatGpa(result.class10Gpa)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                Class 12 PCB GPA
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {formatGpa(result.class12Gpa)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                Combined GPA
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {formatGpa(result.combinedGpa)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                Biology GP
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {formatGpa(result.biologyGp)}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                Physics GP
              </p>
              <p className="mt-2 text-xl font-bold text-white">
                {formatGpa(result.physicsGp)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                Chemistry GP
              </p>
              <p className="mt-2 text-xl font-bold text-white">
                {formatGpa(result.chemistryGp)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                NEET Status
              </p>
              <p className="mt-2 text-xl font-bold text-white">
                {neetQualified === "yes" ? "Qualified" : "Not Qualified"}
              </p>
            </div>
          </div>

          {result.issues.length > 0 && (
            <div className="mt-5">
              <p className="font-bold text-red-100">
                Why not eligible / high risk
              </p>

              <ul className="mt-3 space-y-3 text-sm leading-6 text-red-100">
                {result.issues.map((issue) => (
                  <li key={issue} className="flex gap-3">
                    <span>⛔</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.notes.length > 0 && (
            <ul className="mt-5 space-y-3 text-sm leading-6 text-amber-100">
              {result.notes.map((note) => (
                <li key={note} className="flex gap-3">
                  <span>⚠️</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
        <h4 className="text-lg font-bold text-white">
          Bangladesh Marks to GPA Scale
        </h4>

        <div className="mt-4 grid gap-2 text-sm text-gray-300 md:grid-cols-2">
          <p>80–100 = A+ = 5.00</p>
          <p>70–79 = A = 4.00</p>
          <p>60–69 = A- = 3.50</p>
          <p>50–59 = B = 3.00</p>
          <p>40–49 = C = 2.00</p>
          <p>33–39 = D = 1.00</p>
          <p>0–32 = F = 0.00</p>
        </div>
      </div>

      <p className="mt-5 text-xs leading-6 text-gray-400">
        Disclaimer: This calculator is only for guidance. Final admission eligibility depends on the
        latest DGME/BM&amp;DC circular, official equivalence certificate, original documents, NEET status,
        college verification and admission authority approval.
      </p>
    </div>
  );
}
