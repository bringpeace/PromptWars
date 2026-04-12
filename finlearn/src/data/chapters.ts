export interface Chapter {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const chapters: Chapter[] = [
  {
    id: "budgeting-basics",
    title: "Budgeting Basics",
    description: "Learn how to manage your money with a simple budget.",
    content: "A budget is a plan for every dollar you have. It's not a restriction on spending, but rather a plan for what you want your money to do for you. A standard recommended approach is the 50/30/20 rule, which suggests spending 50% of your after-tax income on needs, 30% on wants, and 20% on savings and paying off debt. By tracking your spending, you can discover where your money actually goes, helping you make better decisions."
  },
  {
    id: "saving-for-emergencies",
    title: "Saving for Emergencies",
    description: "Why you need an emergency fund and how to build one.",
    content: "An emergency fund is money set aside specifically to cover unexpected expenses like medical bills, car repairs, or job loss. It's generally recommended to save 3 to 6 months' worth of living expenses. A good way to build this is to start small: aim for $500 to $1,000 initially, then grow it over time by automatically transferring a portion of your paycheck into a high-yield savings account."
  },
  {
    id: "investing-101",
    title: "Investing 101",
    description: "The fundamentals of making your money work for you.",
    content: "Investing is how you make your money grow over time to outpace inflation. Instead of sitting in a checking account, invested money buys assets like stocks and bonds. Stocks represent ownership in a company, while bonds are essentially loans you give to companies or governments. Through compound interest, early investments can grow exponentially. Diversification (not putting all your eggs in one basket) is key to managing risk."
  }
];
