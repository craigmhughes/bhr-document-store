import { test, expect, vi, afterEach, beforeEach } from "vitest";
import { render, RenderResult, screen, waitFor } from '@testing-library/react'
import App from "./App";

const getAppInLoadedState = async () => {
    lastMount = render(<App />);

    expect(await screen.findByTestId("loading")).toBeTruthy();

    const fileEntries = await vi.waitFor(async () => await screen.getAllByTestId("file-entry"));
    expect(fileEntries.length).toBe(5);
}

let lastMount: RenderResult;

afterEach(() => {
    if (lastMount) lastMount.unmount();
})

beforeEach(async () => {
    await getAppInLoadedState();
})

test('loads folder content when clicked', async () => {
    const folderName = screen.getByTestId("active-folder-name");
    expect(folderName.textContent).toEqual("Files ");

    screen.getByText("Misc").click();

    await waitFor(() => expect(folderName.textContent).toEqual("Files / Misc"));
    expect(screen.getAllByTestId("file-entry").length).toEqual(2);
})