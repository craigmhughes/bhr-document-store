import { test, expect, afterEach } from "vitest";
import { render, screen, RenderResult } from '@testing-library/react'
import { FileEntry } from "./FileEntry";
import { FileEntry as FileEntryType, Folder } from "../../mocks/filedata/filedata";

const testFile: FileEntryType = {
    "type": "csv",
    "name": "Cost centres",
    "added": "2016-08-12"
};

const testFolder: Folder = {
    "type": "folder",
    "name": "Misc",
    "files":
    [
        {
            "type": "doc",
            "name": "Christmas party",
            "added": "2017-12-01"
        },
        {
            "type": "mov",
            "name": "Welcome to the company!",
            "added": "2015-04-24"
        }
    ]
};

let lastMount: RenderResult;

afterEach(() => {
    if (lastMount) lastMount.unmount();
})

test('renders FileEntry with test File', async () => {
    lastMount = render(<FileEntry entry={testFile} setSelectedFolder={() => {}} />);

    expect(screen.getByText(testFile.name)).toBeTruthy();
    expect(screen.getByText(`.${testFile.type}`)).toBeTruthy();
    expect(screen.getByText(`Created: ${testFile.added}`)).toBeTruthy();

    expect(screen.getByTestId("file-entry").getAttribute("disabled")).toEqual("");
})

test('renders FileEntry with test Folder', async () => {
    lastMount = render(<FileEntry entry={testFolder} setSelectedFolder={() => {}} />);

    expect(screen.getByText(testFolder.name)).toBeTruthy();
    expect(screen.getByTestId("file-entry").getAttribute("disabled")).toBeNull();
})