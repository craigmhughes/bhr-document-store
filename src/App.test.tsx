import { test, expect } from "vitest";
import { render, screen } from '@testing-library/react'
import App from "./App";

test('loads and displays file entries', async () => {
    render(<App />);

    const fileEntries = await screen.getAllByTestId("file-entry");
    expect(fileEntries.length).toBe(5);
})