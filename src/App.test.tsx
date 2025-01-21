import { test, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react'
import App from "./App";

test('loads and displays file entries', async () => {
    render(<App />);

    expect(await screen.findByTestId("loading")).toBeTruthy();

    const fileEntries = await vi.waitFor(async () => await screen.getAllByTestId("file-entry"));
    expect(fileEntries.length).toBe(5);
})