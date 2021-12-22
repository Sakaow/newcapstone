import { validateDate, daysAway } from "../client/js/validateDate";

// test for validateDate function
test("validateDate function", () => {
  expect(validateDate("June 1st 2021", "June 1st 2021")).toBe(0);
  expect(validateDate("June 1st 2021", "June 20nd 2021")).toBe(19);
  expect(validateDate("June 1st 2021", "June 30th 2021")).toBe(29);
});

