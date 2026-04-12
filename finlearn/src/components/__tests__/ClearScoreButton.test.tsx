import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ClearScoreButton from "../ClearScoreButton";
import { clearUserProgress } from "@/actions/progress";

// Mock the action
jest.mock("@/actions/progress", () => ({
  clearUserProgress: jest.fn(),
}));

describe("ClearScoreButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.confirm
    window.confirm = jest.fn();
    // Mock window.alert
    window.alert = jest.fn();
    // Mock console.error to avoid noise in tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it("renders correctly", () => {
    render(<ClearScoreButton />);
    expect(screen.getByText("Clear Score")).toBeInTheDocument();
  });

  it("does not call clearUserProgress if user cancels confirmation", async () => {
    (window.confirm as jest.Mock).mockReturnValue(false);
    render(<ClearScoreButton />);
    
    fireEvent.click(screen.getByText("Clear Score"));
    
    expect(window.confirm).toHaveBeenCalled();
    expect(clearUserProgress).not.toHaveBeenCalled();
  });

  it("calls clearUserProgress and shows loading state on confirmation", async () => {
    (window.confirm as jest.Mock).mockReturnValue(true);
    (clearUserProgress as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<ClearScoreButton />);
    
    fireEvent.click(screen.getByText("Clear Score"));
    
    expect(window.confirm).toHaveBeenCalled();
    expect(screen.getByText("Clearing...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
    
    await waitFor(() => {
      expect(clearUserProgress).toHaveBeenCalled();
    });
    
    await waitFor(() => {
      expect(screen.getByText("Clear Score")).toBeInTheDocument();
      expect(screen.getByRole("button")).not.toBeDisabled();
    });
  });

  it("handles errors gracefully", async () => {
    (window.confirm as jest.Mock).mockReturnValue(true);
    (clearUserProgress as jest.Mock).mockRejectedValue(new Error("Failed"));
    
    render(<ClearScoreButton />);
    
    fireEvent.click(screen.getByText("Clear Score"));
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Failed to clear score. Please try again.");
    });
    
    expect(screen.getByText("Clear Score")).toBeInTheDocument();
  });
});
