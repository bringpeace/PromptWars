export interface Question {
  id: string;
  chapterId?: string; // If undefined, it's an onboarding question
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export const onboardingQuestions: Question[] = [
  {
    id: "ob-1",
    text: "What is the primary purpose of an emergency fund?",
    options: [
      "To save for a down payment on a house",
      "To cover unexpected expenses like medical bills or job loss",
      "To invest in the stock market",
      "To pay for annual vacations"
    ],
    correctOptionIndex: 1,
    explanation: "An emergency fund acts as a financial safety net to cover unexpected expenses so you don't have to go into debt."
  },
  {
    id: "ob-2",
    text: "Which of the following describes the 50/30/20 budgeting rule?",
    options: [
      "50% savings, 30% wants, 20% needs",
      "50% needs, 30% savings, 20% wants",
      "50% needs, 30% wants, 20% savings",
      "50% wants, 30% needs, 20% savings"
    ],
    correctOptionIndex: 2,
    explanation: "The 50/30/20 rule is a simple budgeting method where you spend roughly 50% on needs, 30% on wants, and put 20% towards savings or debt."
  },
  {
    id: "ob-3",
    text: "What does 'compound interest' mean?",
    options: [
      "Paying a lower interest rate on your mortgage",
      "Earning interest on your initial savings as well as on the interest previously earned",
      "A penalty fee for paying a loan off early",
      "A fixed amount of money paid yearly on an investment"
    ],
    correctOptionIndex: 1,
    explanation: "Compound interest is when you earn interest both on your original money and on the interest you've already accumulated."
  },
  {
    id: "ob-4",
    text: "True or False: Diversification means putting all your investments in one high-performing stock.",
    options: [
      "True",
      "False"
    ],
    correctOptionIndex: 1,
    explanation: "False. Diversification means spreading your investments across various assets to reduce risk."
  }
];

export const flashcardQuestions: Question[] = [
  {
    id: "fc-1",
    chapterId: "budgeting-basics",
    text: "In the 50/30/20 rule, the 30% category is typically allocated to what?",
    options: [
      "Wants (e.g., dining out, hobbies)",
      "Needs (e.g., rent, groceries)",
      "Savings and debt repayment",
      "Taxes"
    ],
    correctOptionIndex: 0,
    explanation: "The 30% in the 50/30/20 budget is generally reserved for 'wants' or discretionary spending."
  },
  {
    id: "fc-2",
    chapterId: "saving-for-emergencies",
    text: "How many months of living expenses should a typical emergency fund cover?",
    options: [
      "1 to 2 months",
      "3 to 6 months",
      "Exactly 12 months",
      "10 years"
    ],
    correctOptionIndex: 1,
    explanation: "Financial experts typically recommend keeping 3 to 6 months of essential living expenses in an emergency fund."
  },
  {
    id: "fc-3",
    chapterId: "investing-101",
    text: "What is the main difference between stocks and bonds?",
    options: [
      "Stocks represent a loan, bonds represent ownership",
      "Stocks represent ownership, bonds represent a loan",
      "Stocks are risk-free, bonds are highly risky",
      "There is no difference"
    ],
    correctOptionIndex: 1,
    explanation: "When you buy a stock, you're buying a piece of ownership in a company. A bond is essentially a loan you make to a company or government."
  },
  {
    id: "fc-4",
    chapterId: "saving-for-emergencies",
    text: "Which of these is the most 'liquid' asset (easy to turn into cash)?",
    options: [
      "A house",
      "A savings account",
      "A retirement fund",
      "Rare collectible cards"
    ],
    correctOptionIndex: 1,
    explanation: "Liquidity refers to how quickly an asset can be converted to cash. Savings accounts are highly liquid compared to real estate or collectibles."
  },
  {
    id: "fc-5",
    chapterId: "budgeting-basics",
    text: "What does 'Pay Yourself First' mean?",
    options: [
      "Buying a treat after a long week",
      "Prioritizing savings as soon as you receive your paycheck",
      "Paying for all your subscriptions first",
      "Only spending money on yourself"
    ],
    correctOptionIndex: 1,
    explanation: "Paying yourself first means setting aside savings before paying bills or discretionary expenses, ensuring your future is funded."
  },
  {
    id: "fc-6",
    chapterId: "investing-101",
    text: "What is the primary risk of keeping all your money in a standard checking account for 40 years?",
    options: [
      "The bank might close",
      "The money will lose purchasing power due to inflation",
      "The government will take it",
      "There is no risk"
    ],
    correctOptionIndex: 1,
    explanation: "Inflation gradually increases the price of goods, so money that doesn't earn interest will buy less over time."
  }
];

export const allQuestions = [...onboardingQuestions, ...flashcardQuestions];
