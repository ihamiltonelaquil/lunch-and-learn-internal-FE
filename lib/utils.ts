import { useEffect, useRef } from "react";
import { faFileImage, faFilePdf, faFilePowerpoint, faFileWord, faFileLines, faFileZipper, faFile, faFileCode, faFileAudio, faFileVideo } from '@fortawesome/free-regular-svg-icons'

export const useComponentDidMount = (handler: any) => {
    return useEffect(() => handler(), []);
};

export const useComponentDidUpdate = (handler: any, deps: any) => {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;

            return;
        }

        return handler();
    }, deps);
};

export const useComponentWillUnmount = (handler: any) => {
    return useEffect(() => handler, []);
};

export function iconLookup(fileType: string) {
    if (fileType.includes("."))
        fileType = fileType.slice(1);
    fileType = fileType.toLowerCase();
    switch (fileType) {
        case "pdf":
            return faFilePdf;
        case "doc":
        case "docx":
            return faFileWord;
        case "ppt":
        case "pptx":
            return faFilePowerpoint;
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
        case "bmp":
        case "tiff":
        case "svg":
        case "webp":
        case "ico":
        case "heif":
        case "psd":
        case "raw":
        case "arw":
            return faFileImage;
        case "mp3":
        case "wav":
        case "ogg":
        case "flac":
        case "wma":
        case "aac":
        case "m4a":
        case "aiff":
        case "alac":
            return faFileAudio;
        case "mp4":
        case "avi":
        case "mov":
        case "wmv":
        case "flv":
        case "mkv":
        case "webm":
            return faFileVideo;
        case "txt":
        case "log":
        case "md":
        case "json":
        case "xml":
        case "csv":
            return faFileLines;
        case "zip":
        case "rar":
        case "7z":
        case "tar":
        case "gz":
            return faFileZipper;
        case "js":
        case "ts":
        case "jsx":
        case "tsx":
        case "html":
        case "css":
        case "scss":
        case "py":
        case "java":
        case "c":
        case "cpp":
        case "cs":
        case "go":
        case "php":
        case "rb":
        case "swift":
        case "sql":
        case "pl":
        case "sh":
        case "hpp":
        case "h":
        case "asm":
            return faFileCode;
        default:
            return faFile;
    }
}