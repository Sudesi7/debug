import { render, screen } from "@testing-library/react";
import GreetingWidget from "../GreetingWidget";

function withMockedHour(hour) {
  const OriginalDate = Date;
  global.Date = class extends OriginalDate {
    constructor(...args) {
      if (args.length === 0) {
        const d = new OriginalDate();
        d.setHours(hour, 0, 0, 0);
        return d;
      }
      return new OriginalDate(...args);
    }
    static now() {
      return OriginalDate.now();
    }
  };
  return () => { global.Date = OriginalDate; };
}

test("shows morning", () => {
  const restore = withMockedHour(9);
  render(<GreetingWidget />);
  expect(screen.getByText(/Good morning/i)).toBeInTheDocument();
  restore();
});

test("shows afternoon", () => {
  const restore = withMockedHour(13);
  render(<GreetingWidget />);
  expect(screen.getByText(/Good afternoon/i)).toBeInTheDocument();
  restore();
});

test("shows evening", () => {
  const restore = withMockedHour(20);
  render(<GreetingWidget />);
  expect(screen.getByText(/Good evening/i)).toBeInTheDocument();
  restore();
});
