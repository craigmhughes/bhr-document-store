import { test, afterEach, expect } from "vitest";
import { render, screen, RenderResult } from '@testing-library/react'
import filedata from "../../mocks/filedata/filedata.json";
import FileExplorer from "./FileExplorer";

let lastMount: RenderResult;

afterEach(() => {
    if (lastMount) lastMount.unmount();
})

test('does not show loaded data until isLoading is false', async () => {
    lastMount = render(
        <FileExplorer 
            data={filedata} 
            hasError={false} 
            isLoading={true} 
            setSelectedFolder={() => {}} 
        />
    );

    expect(screen.getByTestId("loading")).toBeTruthy();
})

test('renders FileExplorer if data exists', async () => {
    lastMount = render(
        <FileExplorer 
            data={filedata} 
            hasError={false} 
            isLoading={false} 
            setSelectedFolder={() => {}} 
        />
    );

    expect(screen.getAllByTestId("file-entry").length).toEqual(5);
})

test('shows message in FileExplorer if there is no data', async () => {
    lastMount = render(
        <FileExplorer 
            data={[]} 
            hasError={false} 
            isLoading={false} 
            setSelectedFolder={() => {}} 
        />
    );

    expect(screen.getByTestId("empty-data")).toBeTruthy();
})

test('shows error message in FileExplorer', async () => {
    lastMount = render(
        <FileExplorer 
            data={[]} 
            hasError={true} 
            isLoading={false} 
            setSelectedFolder={() => {}} 
        />
    );

    expect(screen.getByTestId("error-loading")).toBeTruthy();
})