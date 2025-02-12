import { Dispatch, SetStateAction } from "react"
import { FileData } from "../../mocks/filedata/filedata"
import { LoadingSpinner } from "../Icons"
import { FileEntry } from "./FileEntry"

interface FileExplorerInterface {
    isLoading: boolean
    hasError: boolean
    setSelectedFolder: Dispatch<SetStateAction<string>>
    data?: FileData
}

const FileExplorer = ({...props}: FileExplorerInterface) => {
    if (props.hasError) {
        return (
            <p data-testid="error-loading">
                <strong>Error:</strong> Exception when loading file data.
            </p>
        )
    }

    if (props.isLoading) {
        return <LoadingSpinner />
    }

    if (!props.data || props.data.length === 0) {
        return <p data-testid="empty-data">No files found</p>
    }

    return (
        <div className="flex flex-col gap-2">
            {props.data.map((entry) => (
                <FileEntry
                    key={entry.name.replace(/ /g, '')}
                    setSelectedFolder={props.setSelectedFolder}
                    entry={entry}
                />
            ))}
        </div>
    )

    
}

export default FileExplorer;