# FinLearn — Banking on Literacy

FinLearn is a premium, gamified financial literacy application designed to bridge the gap between financial complexity and everyday understanding. Built with a focus on **speed, security, and accessibility**, it provides a seamless learning experience through interactive onboarding, bite-sized chapters, and real-time flashcard challenges.

---

## 🏗 Vertical & Persona
**Vertical:** EdTech / Fintech (Financial Literacy)
**Persona:** Expert Full-Stack Engineer building polished, scalable, and high-quality live-demo applications.

The app is tailored for beginners who want to grasp essential financial concepts like the 50/30/20 rule, compound interest, and emergency fund management without being overwhelmed by technical jargon.

---

## 💡 Approach & Logic
Our approach is centered on **"Active Learning through Gamification."** We believe that financial literacy is best acquired when users are immediately challenged and rewarded.

1.  **Diagnostic Onboarding:** Every new user starts with a mandatory 4-question quiz to establish a baseline. This not only gathers data but immediately engages the user with core concepts.
2.  **Reward-Driven Cycle:** Learning activities (reading chapters and answering flashcards) award both **Total Score** (knowledge measure) and **Reward Points** (engagement measure).
3.  **Instant Feedback Loop:** Every answer submission is met with immediate validation and a detailed **"Why"** explanation, ensuring that every mistake becomes a learning opportunity.

---

## 🛠 How the Solution Works
FinLearn is built on a modern, high-performance stack optimized for responsiveness and reliability:

-   **Frontend:** [Next.js 14 (App Router)](https://nextjs.org/) for lightning-fast server-side rendering and client-side navigation.
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with a custom **Glassmorphism** design system for a premium, futuristic aesthetic.
-   **Database:** [Prisma](https://www.prisma.io/) with [SQLite](https://sqlite.org/) for local, persistent data storage that requires zero external configuration.
-   **Authentication:** [NextAuth.js (Auth.js)](https://next-auth.js.org/) providing secure session management via Google Auth and Email-based simulated login.
-   **State Management:** React Server Actions for secure, direct-to-database mutations without the need for traditional REST APIs.

---

## 💎 Code Quality & Metrics

### 🛡 Security — Safe & Responsible Implementation
-   **Server-Side Logic:** All sensitive operations, including answer validation and score updates, are handled via **Server Actions** using `getServerSession` to prevent spoofing or unauthorized access.
-   **Data Consistency:** Database updates are wrapped in **Prisma Transactions** (`$transaction`), ensuring that score updates and answer logging happen atomically.
-   **Sanitization:** Use of TypeScript and Prisma ensures strict type safety and protection against SQL injection.

### ⚡ Efficiency — Optimal Use of Resources
-   **Static Data Strategy:** Educational content and questions are stored as constants, reducing database overhead while maintaining flexibility for updates.
-   **Minimal Footprint:** SQLite provides a powerful, zero-latency database experience perfectly suited for local deployment and quick demonstrations.
-   **Revalidation:** Leverages Next.js `revalidatePath` to surgically update the UI only when relevant data changes (e.g., after a quiz).

### 🧪 Testing — Validation of Functionality
-   **Unit & Integration Tests:** Implemented using **Jest** and **React Testing Library**.
-   **Key Coverage:** Mocks server actions to validate UI state changes, button disable/enable logic, and feedback rendering based on correct/incorrect answers.
-   Run tests using: `npm run test`

### ♿ Accessibility — Inclusive & Usable Design
-   **Semantic HTML:** Proper use of `<main>`, `<nav>`, `<header>`, and button elements for screen-reader compatibility.
-   **Visual Integrity:** High-contrast color palettes (WCAG compliant) and focus states for keyboard navigation.
-   **SEO:** Comprehensive metadata, including description, keywords, and viewport settings, to ensure discoverability and performance.

### 🌐 Google Services Integration
-   **Google Identity:** Integrated **Google Authentication** for seamless onboarding.
-   **Brand Compliance:** Sign-in workflows follow Google's branding guidelines while maintaining the app's premium aesthetic.
-   **Google Typography:** Utilizes **Inter** from Google Fonts for maximum readability across devices.

---

## 🚀 Assumptions Made
-   **MCQ Preference:** Assumed that beginners prefer Multiple Choice Questions (MCQ) over open-ended text entry to reduce friction and cognitive load.
-   **Onboarding Duration:** A 4-question onboarding quiz is assumed to be the "sweet spot" for initial engagement without causing drop-off.
-   **Local Persistence:** Assumed that for a demo-focused application, a local SQLite database provides the best balance of speed and ease of use.

---

## 📦 Getting Started
1. `cd finlearn`
2. `npm install`
3. `npx prisma migrate dev --name init`
4. `npm run dev`
