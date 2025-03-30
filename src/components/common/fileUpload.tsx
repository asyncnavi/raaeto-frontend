/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { IconUpload } from "@tabler/icons-react";
import { Button, Card, Input, Image } from "@heroui/react";
import { authClient, BASE_URL } from "../../client";

interface FileUploadProps {
    onSelect: (url: string) => void;
    label?: string 
}

const FileUpload: React.FC<FileUploadProps> = ({ onSelect , label = "Select File"}) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile)); 
        }
    };

    const handleFileUpload = async () => {
        if (!file) {
            setError("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        setIsUploading(true);
        setError(null);

        try {
            const response = await authClient.post(BASE_URL + "/uploads", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            //@ts-expect-error
            onSelect(response.url); 
            setFile(null);
            //@ts-expect-error
            setPreview(response.url);
         
        } catch (error) {
            console.log(error)
            setError("Error uploading file. Try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Card className="p-4 border rounded-lg shadow-sm space-y-3">
            <Input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer flex items-center space-x-2 text-blue-600 hover:underline">
                <IconUpload className="w-5 h-5" />
                <span>{label}</span>
            </label>

            {preview && (
                <Image src={preview} alt="Preview" className="w-24 h-24 rounded" />
            )}

            {error && <p className="text-red-500">{error}</p>}

            <Button size="sm" onPress={handleFileUpload} disabled={isUploading || !file} variant="flat" color="primary">
                {isUploading ? "...Uploading" : "Upload"}
            </Button>
        </Card>
    );
};

export default FileUpload;
