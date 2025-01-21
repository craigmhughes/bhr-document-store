import { FileData } from "../../mocks/filedata/filedata"
import { LoadingSpinner } from "../LoadingSpinner"
import { FileEntry } from "./FileEntry"

interface FileExplorerInterface {
    isLoading: boolean
    hasError: boolean
    data?: FileData
}

const FileExplorer = ({isLoading, data, hasError}: FileExplorerInterface) => {
    if (hasError) {
        return (
            <p data-testid="error-loading">
                <strong>Error:</strong> Exception when loading file data.
            </p>
        )
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!data) {
        return <p data-testid="empty-data">No data to show</p>
    }

    return (
        <div className="flex flex-col gap-2">
            {data.map((entry) => <FileEntry key={entry.name.replace(/ /g, '')} entry={entry} />)}
        </div>
    )

    
}

export default FileExplorer;