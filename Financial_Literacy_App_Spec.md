# Financial Literacy Hub (Antigravity Build Spec)
## Persona
You are an expert full-stack engineer and live-demo builder.
You build small, polished apps that are easy to explain.
You prioritize clear scope, predictable outcomes, and clean UI.
You write readable code and avoid unnecessary abstractions.
## Objective
Build a tool that helps users understand financial concepts like saving, investing, and budgeting in a simple and interactive way. Focus on clarity and practical usage. This app should be accessible to beginners and should not require any prior financial knowledge.
## Scope
**Include**
- Authentication with Google Account or Email.
- Mandatory 4-question onboarding quiz after login to gauge financial literacy and introduce concepts.
- Educational materials teaching concepts (e.g., how to do budgeting with prior ideas).
- Interactive flashcards to quiz users after chapters.
- Immediate feedback on flashcard/quiz answers (explaining why they are right or wrong).
- Scoring system that rewards points based on correct answers.
- A history section where users can view their past quiz responses and attempts.
- Secure code practices with unit and integration test cases.
**Exclude**
- Budget Tracker (no manual text entries for budgets).
- Complex reporting or background jobs.
- Over-engineered architecture.
## Tech stack
**Preferred**
- Next.js App Router + TypeScript
- NextAuth.js (Auth.js) for authentication
- Prisma + SQLite
- Tailwind CSS
- Jest / React Testing Library (for test cases)
## Data model
**User**
- `id` : string uuid (primary key)
- `email` : string (unique)
- `name` : string (optional)
- `createdAt` : datetime
**UserAnswer**
- `id` : string uuid (primary key)
- `userId` : string (foreign key to User)
- `questionId` : string (ID of the statically defined question)
- `selectedOptionIndex` : integer
- `isCorrect` : boolean
- `createdAt` : datetime
**UserProgress**
- `id` : string uuid (primary key)
- `userId` : string (foreign key to User)
- `totalScore` : integer
- `rewardPoints` : integer
- `createdAt` : datetime
- `updatedAt` : datetime
*(Note: Chapters and Quiz Questions will be stored as static data/constants in the codebase. The database will persist users, the answers provided by the user, their scores, and reward points, eliminating the need for seed scripts).*
## UI
Single page layout with sidebar to access different features of the app.
### Authentication
- User can securely log in with their Google account or via Email.
### Initial App Entry (Post-Login)
- The user is immediately presented with a 4-question MCQ quiz to get the gist of their financial literacy.
- Completing the initial quiz calculates their starting score and awards reward points based on performance.
### Section 1 — Learning Chapters
- Different cards with financial topics on it (e.g., guide to budgeting, saving basics).
- Clicking a card opens the educational content to read.
### Section 2 — Flashcards & Quizzes
- Flashcards to quiz the user on what they just learned.
- MCQ format only.
- On submitting an answer, the app immediately replies with the answer along with a corresponding statement detailing **why** it is right or wrong.
- Score and reward points are updated in real-time.
### Section 3 — History & Profile
- View past quiz responses and past flashcard attempts.
## Validation
- No typing validation required for interactions as the user will not do any text typing (beyond the login flow).
- All questions are MCQ based. The app simply validates that a choice is selected before proceeding.
## Persistence
- Use Prisma schema and SQLite migrations.
- **No seeding scripts.** Content is static; the database only strictly tracks users, submitted answers, and their progress.
## Definition of done
A user can:
1) Log in using a Google account or an email.
2) Complete the initial 4-question onboarding quiz.
3) View their updated score and reward points based on quiz answers.
4) Read a chapter (e.g., learning how to do budgeting).
5) Complete MCQ flashcards and receive immediate right/wrong response feedback.
6) Navigate to a history tab to review their past quiz responses and attempts.
7) Refresh the page and confirm their quiz answers, points, and score are still there.
## Deliverables
- Working app with no placeholder screens.
- Prisma schema and migration files (focused ONLY on tracking users, progress, and user answers).
- Code that includes robust test cases enforcing app logic and user security.
- Single command to run: `npm run dev` (and `npm run test` for coverage)
## Constraints
- No external APIs unless explicitly needed (e.g., Google Fonts, Google Auth).
- All interactive inputs are MCQ; strictly no manual data entry features like budget tracking.
- Code must be secure and tested.
- App features should be exclusively focused on financial literacy knowledge checking.
