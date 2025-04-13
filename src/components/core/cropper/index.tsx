import { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '../../ui/button';

export const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
};

export const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
    });
};

export const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
};

export interface PhotoData {
    fileName: string;
    data: string | null; // base64
}

interface Crop {
    x: number;
    y: number;
}

interface PixelCrop {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ImageCropperProps {
    file: File;
    onChange: (data: PhotoData) => void;
}

const TARGET_WIDTH = 800;
const TARGET_HEIGHT = 150;
const ASPECT_RATIO = TARGET_WIDTH / TARGET_HEIGHT;

export const ImageCropper: React.FC<ImageCropperProps> = ({ file, onChange }) => {
    const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null);
    const [objectUrl, setObjectUrl] = useState<string>('');

    useEffect(() => {
        const url = URL.createObjectURL(file);
        setObjectUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const onCropComplete = useCallback((_: Crop, croppedAreaPixels: PixelCrop) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCrop = useCallback(async () => {
        if (!croppedAreaPixels) return;

        try {
            const image = await createImage(objectUrl);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) throw new Error('Canvas context is not supported');

            canvas.width = TARGET_WIDTH;
            canvas.height = TARGET_HEIGHT;

            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;

            ctx.drawImage(
                image,
                croppedAreaPixels.x * scaleX,
                croppedAreaPixels.y * scaleY,
                croppedAreaPixels.width * scaleX,
                croppedAreaPixels.height * scaleY,
                0,
                0,
                TARGET_WIDTH,
                TARGET_HEIGHT
            );

            const croppedImage = canvas.toDataURL('image/jpeg', 0.9);

            console.log('croppedImage', croppedImage)
            onChange({
                fileName: file.name,
                data: croppedImage
            });
        } catch (e) {
            console.error('Ошибка при обрезке изображения', e);
            onChange({
                fileName: file.name,
                data: null
            });
        }
    }, [croppedAreaPixels, file.name, objectUrl, onChange]);

    return (
        <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="relative w-full h-64 bg-gray-100">
                <Cropper
                    image={objectUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={ASPECT_RATIO}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape="rect"
                    classes={{
                        containerClassName: "bg-gray-200",
                        mediaClassName: "max-h-64 object-contain"
                    }}
                />
            </div>

            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Масштаб: {Math.round(zoom * 100)}%
                </label>
                <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            <Button
                onClick={() => handleCrop()}
                type='button'
                className='w-full mt-2'
            >
                Применить обрезку
            </Button>
        </div>
    );
};