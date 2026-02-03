import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;



    return (
        <div className="w-full">
            <div {...getRootProps()} className={`
                relative p-8 text-center transition-all duration-300 cursor-pointer
                bg-white/5 backdrop-blur-sm border-2 border-dashed rounded-3xl
                ${isDragActive ? 'border-brand-500 bg-brand-500/10 shadow-[0_0_50px_-10px_rgba(99,102,241,0.5)]' : 'border-white/20 hover:border-brand-500/50 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.4)]'}
            `}>
                <input {...getInputProps()} />

                <div className="space-y-4">
                    {file ? (
                        <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-medium text-white truncate max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect?.(null);
                                }}
                            >
                                <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <p className="text-lg text-gray-300 mb-1">
                                <span className="font-semibold text-white">
                                    Click to upload
                                </span> or drag and drop
                            </p>
                            <p className="text-sm text-gray-400">PDF (max {formatSize(maxFileSize)})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader
