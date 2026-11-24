# Personal Expense Tracker (FinTrack) — CSD0111 Mini Project

## Student Details
- **Name:** Omkar Singh Gurjar
- **Roll Number:** BETN1CS26094
- **Course:** B.Tech — Computer Science & Engineering (CSE)
- **Subject Code:** CSD0111 Mini Project

---

## Project Description
**FinTrack (Personal Expense Tracker)** is a responsive, client-side web application and MS Office financial analytics suite designed to help students and individuals record daily income, categorize expenses, enforce monthly budget limits, and calculate net savings in real time.

This project integrates all six required syllabus technologies:
1. **MS Word (`01_Word_Documentation/Project_Report.docx` & `.pdf`):** Comprehensive project documentation covering objectives, requirements, architecture, formulas, and screenshots.
2. **MS Excel (`02_Excel_Workbook/Project_Data.xlsx`):** 24 structured financial transactions, 8 dynamic formulas/functions (`SUMIF`, `AVERAGEIF`, `COUNTIF`, `MAX`, `IF`), and 2 embedded charts.
3. **MS PowerPoint (`03_PowerPoint/Project_Presentation.pptx`):** 9-slide presentation covering project objectives, system design, JavaScript modules, Excel analysis, and future scope.
4. **HTML5, CSS3 & JavaScript (`04_Website/`):** Functional web application with form validation, LocalStorage persistence, multi-criteria filtering, budget progress tracking, and CSV export.

---

## Folder Structure
```text
CSD0111_Mini_Project/
├── 01_Word_Documentation/
│   ├── Project_Report.docx
│   └── Project_Report.pdf
├── 02_Excel_Workbook/
│   └── Project_Data.xlsx
├── 03_PowerPoint/
│   └── Project_Presentation.pptx
├── 04_Website/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── images/
│       └── logo.svg
├── 05_Screenshots/
│   └── Project_Screenshots/
│       ├── 01_Dashboard_Overview.png
│       ├── 02_Form_Validation_Entry.png
│       ├── 03_Category_Filter_Search.png
│       ├── 04_Excel_Analysis_Charts.png
│       └── 05_CSV_Export_Budget_Alert.png
└── README.md
```

---

## Key Features
- **Strict Form Validation:** Validates description length, positive numeric amounts, and valid dates before submission.
- **Real-Time KPI Dashboard:** Instantly updates Net Balance, Total Income, Total Expenses, and Savings Rate (%).
- **Interactive Monthly Budget Tracker:** Dynamic color-coded progress bar with over-budget warning alerts.
- **Category Breakdown:** Visual horizontal bars displaying expense distribution across categories.
- **Multi-Criteria Search & Filter:** Filter transactions simultaneously by keyword, type (`Income`/`Expense`), and category.
- **Browser LocalStorage & CSV Export:** Automatically saves data locally and exports ledger records to `.csv`.

---

## Instructions to Run
1. **Web Application:** Open `04_Website/index.html` directly in any modern web browser (Chrome, Edge, Firefox) — no backend server installation required.
2. **Excel Workbook:** Open `02_Excel_Workbook/Project_Data.xlsx` in Microsoft Excel to inspect the `Transactions` sheet and `Summary_Dashboard` charts.
3. **Documentation & Slides:** View `01_Word_Documentation/Project_Report.docx` (or `.pdf`) and `03_PowerPoint/Project_Presentation.pptx`.