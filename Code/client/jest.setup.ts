import "@testing-library/jest-dom";
import { nanoid } from "nanoid";

jest.mock("nanoid", () => ({
  nanoid: jest.fn(() => (Math.random() + 1).toString(36).substring(7)),
}));
