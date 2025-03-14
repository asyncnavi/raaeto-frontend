import {useState} from "react";
import {authClient, BASE_URL} from "../client";

const useFileUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<never>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
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
            const response = await authClient.post(BASE_URL + "/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setResponse(response.data);
        } catch (error) {
            setError("Error uploading file");
        } finally {
            setIsUploading(false);
        }
    };

    return {
        file,
        isUploading,
        error,
        response,
        handleFileChange,
        handleFileUpload,
    };
};

export default useFileUpload;