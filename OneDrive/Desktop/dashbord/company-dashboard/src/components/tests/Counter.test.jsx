import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../Counter";

test("increments by 3", async () => {
  render(<Counter />);
  const btn = screen.getByRole("button", { name: /increment by 3/i });

  await userEvent.click(btn);
  expect(screen.getByText(/Count: 3/)).toBeInTheDocument();

  await userEvent.click(btn);
  expect(screen.getByText(/Count: 6/)).toBeInTheDocument();
});
