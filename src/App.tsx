import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { FileData, FileDataEntry, Folder } from './mocks/filedata/filedata';
import { GetData } from './mocks/filedata';
import FileExplorer from './components/FileExplorer/FileExplorer';

function App() {
    const [data, setData] = useState<FileData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    const [selectedFolder, setSelectedFolder] = useState<string>("");

    const availableFilters = [undefined, "name"];

    const [activeFilter, setActiveFilter] = useState<string>();
    const [searchTerm, setSearchTerm] = useState<string>();

    const filePathText = useMemo<string>(() => {
        return selectedFolder ? `/ ${selectedFolder}` : ''
    }, [selectedFolder])

    const filteredData = useMemo(() => {
        let dataToFilter = data && [...data];

        const selectedFolderData = data?.find((entry) => entry.name === selectedFolder) as Folder;
        if (selectedFolderData) {
            dataToFilter = selectedFolderData.files
        }

        if (searchTerm) {
            dataToFilter = dataToFilter?.filter((entry) => entry.name.toLowerCase().includes(searchTerm.toLowerCase()))
        }
        
        return !activeFilter ? dataToFilter : dataToFilter?.sort((a: FileDataEntry, b: FileDataEntry) => {
            const castFilter = activeFilter as keyof typeof a;

            return  a[castFilter] > b[castFilter] ? 1 : -1
        })
    }, [data, selectedFolder, activeFilter, searchTerm])

    useEffect(() => {   
        GetData.then((response) => {
            setData(response);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
            setHasError(true);
        })
    }, [])

    return (
        <div className="text-left">
            {filePathText && (
                <button 
                    className="text-sm"
                    onClick={() => setSelectedFolder("")}
                >
                    Go Back
                </button>
            )}
            <header className="font-bold my-4">
                <h1 className="text-2xl py-4 border-b border-gray-100" data-testid="active-folder-name">
                    Files {filePathText}
                </h1>

                <input 
                    data-testid="search-bar"
                    className="px-4 py-2 mt-6 rounded"
                    placeholder="Search..." 
                    type="text" 
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }} 
                />

                <div className="border-b border-gray-700 py-4 my-4 flex flex-col gap-2">
                    <p>Sort by:</p>
                    <ul className="flex text-xs gap-2">
                        {availableFilters.map((filter) => (
                            <li key={filter ?? "none"}>
                                <button data-testid={`${filter}-filter`} onClick={() => setActiveFilter(filter ?? undefined)}>
                                    {filter ?? "none"}
                                </button> 
                            </li>
                        ))}
                    </ul>
                </div>
            </header>
            <FileExplorer 
                data={filteredData} 
                isLoading={isLoading} 
                hasError={hasError}
                setSelectedFolder={setSelectedFolder}
            />  
        </div>
    )
}

export default App
