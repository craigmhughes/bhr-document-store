import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { FileData, Folder } from './mocks/filedata/filedata';
import { GetData } from './mocks/filedata';
import FileExplorer from './components/FileExplorer/FileExplorer';

function App() {
    const [data, setData] = useState<FileData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    const [selectedFolder, setSelectedFolder] = useState<string>("");

    const filePathText = useMemo<string>(() => {
        return selectedFolder ? `/ ${selectedFolder}` : ''
    }, [selectedFolder])

    const filteredData = useMemo(() => {
        const selectedFolderData = data?.find((entry) => entry.name === selectedFolder) as Folder;
        if (selectedFolderData) {
            return selectedFolderData.files
        }

        return data
    }, [data, selectedFolder])

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
                <h1 className="text-2xl">
                    Files {filePathText}
                </h1>
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
