import { test, expect, vi, afterEach, beforeEach } from "vitest";
import { fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react'
import App from "./App";
import filedata from './mocks/filedata/filedata.json'

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

const unsortedFilenames = filedata.map((file) => file.name)
const descendingFilenames = [...unsortedFilenames].sort((a,b) => a > b ? 1 : -1);


const findMatchingFilename = (value: string, fileNames: Node[]) => fileNames[fileNames.findIndex((i) => i.textContent === value)];
const getNumberOfNodesBetween = (a: string, b: string, fileNames: Node[]) => findMatchingFilename(a, fileNames).compareDocumentPosition(findMatchingFilename(b, fileNames));

test('applies sort by filters', async () => {
    let fileNames = await vi.waitFor(async () => await screen.getAllByTestId("entry-name"));
    
    let itemsBetweenNodes = getNumberOfNodesBetween(descendingFilenames[0], descendingFilenames[1], fileNames);
    expect(itemsBetweenNodes).not.toEqual(Node.DOCUMENT_POSITION_FOLLOWING);

    (await screen.findByTestId("name-filter")).click();
    
    fileNames = await vi.waitFor(async () => await screen.getAllByTestId("entry-name"));

    itemsBetweenNodes = getNumberOfNodesBetween(descendingFilenames[0], descendingFilenames[1], fileNames);
    
    expect(itemsBetweenNodes).toEqual(Node.DOCUMENT_POSITION_FOLLOWING);

    
})

test('apply search term', async () => {
    const search = screen.getByTestId("search-bar");

    fireEvent.change(search, {target: {value: 'employee' }})

    let fileNames = await vi.waitFor(async () => await screen.getAllByTestId("entry-name"));

    expect(fileNames.length).toEqual(1);
    expect(fileNames[0].textContent).toEqual("Employee Handbook");
    
})