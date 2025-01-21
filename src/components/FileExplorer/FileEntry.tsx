import { FileEntry as FileEntryType, Folder } from "../../mocks/filedata/filedata"

interface FileEntryInterface {
    entry: FileEntryType | Folder
}

export const FileEntry = ({entry} : FileEntryInterface) => {
    const isFolder = entry.type.toLowerCase() === "folder"

    const fileType = !isFolder && (
        <span className="rounded bg-grey ml-2 text-xs font-semibold px-1.5 py-0.5 bg-gray-700 border border-gray-400">
            {`.${entry.type}`}
        </span>
    )

    const addedDate = !isFolder && (
        <p className="text-xs">
            Created: {(entry as FileEntryType).added}
        </p>
    )

    return (
        <button 
            data-testid="file-entry"
            className="text-left min-h-12 flex justify-center flex-col disabled:bg-transparent disabled:border-0" 
            disabled={!isFolder}
        >
            <p className="mb-1">
                {entry.name}
                {fileType}
            </p>
            {addedDate}
        </button>
    )
}