import { createContext, useContext, useState, useCallback } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

interface Photo {
  filepath: string;
  webviewPath?: string;
  meterNumber: string;
  timestamp: Date;
}

interface PhotoServiceContextType {
  photos: Photo[];
  takePhoto: (meterNumber: string) => Promise<void>;
  deletePhoto: (photo: Photo) => Promise<void>;
  clearPhotos: () => void;
}

const PhotoServiceContext = createContext<PhotoServiceContextType>({
  photos: [],
  takePhoto: async () => {},
  deletePhoto: async () => {},
  clearPhotos: () => {},
});

export const PhotoServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const takePhoto = useCallback(async (meterNumber: string) => {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
        allowEditing: false,
        saveToGallery: false,
      });

      const fileName = `meter_${meterNumber}_${Date.now()}.jpeg`;
      const savedFile = await savePicture(capturedPhoto, fileName, meterNumber);
      
      setPhotos(prev => [...prev, savedFile]);
    } catch (error) {
      console.error('Error taking photo:', error);
      throw error;
    }
  }, []);

  const savePicture = async (photo: any, fileName: string, meterNumber: string): Promise<Photo> => {
    const base64Data = await readAsBase64(photo);

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    return {
      filepath: fileName,
      webviewPath: photo.webPath,
      meterNumber,
      timestamp: new Date(),
    };
  };

  const readAsBase64 = async (photo: any) => {
    if (Capacitor.isNativePlatform()) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      return file.data;
    } else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      return await convertBlobToBase64(blob);
    }
  };

  const convertBlobToBase64 = (blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  };

  const deletePhoto = async (photo: Photo) => {
    try {
      await Filesystem.deleteFile({
        path: photo.filepath,
        directory: Directory.Data,
      });
      setPhotos(prev => prev.filter(p => p.filepath !== photo.filepath));
    } catch (error) {
      console.error('Error deleting photo:', error);
      throw error;
    }
  };

  const clearPhotos = () => {
    setPhotos([]);
  };

  return (
    <PhotoServiceContext.Provider value={{ photos, takePhoto, deletePhoto, clearPhotos }}>
      {children}
    </PhotoServiceContext.Provider>
  );
};

export const usePhotoService = () => useContext(PhotoServiceContext);