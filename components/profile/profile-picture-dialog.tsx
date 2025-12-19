'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Laptop,
  Image as ImageIcon,
  Camera as CameraIcon,
  X,
  ArrowLeft,
} from 'lucide-react';
import Image from 'next/image';

interface ProfilePictureDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (imageUrl: string) => void;
}

export default function ProfilePictureDialog({
  isOpen,
  onOpenChange,
  onSave,
}: ProfilePictureDialogProps) {
  const { t } = useTranslation();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setPreviewImage(null);
      setIsCameraOpen(false);
      stopCamera();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isCameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraOpen]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setIsCameraOpen(false);
    }
  };

  const handleCameraStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setIsCameraOpen(true);
      setPreviewImage(null);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const handleTakePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/png');
        setPreviewImage(imageUrl);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const handleSave = () => {
    if (previewImage) {
      onSave(previewImage);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setPreviewImage(null);
    setIsCameraOpen(false);
    stopCamera();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[800px] p-0 gap-0 bg-white dark:bg-[#1f1f1f] border-none shadow-2xl overflow-hidden'>
        {isCameraOpen ? (
          <div className='relative w-full h-[500px] bg-black flex flex-col'>
            <div className='flex items-center justify-between p-4 text-white z-10'>
              <Button
                variant='ghost'
                size='icon'
                onClick={stopCamera}
                className='text-white hover:bg-white/20'
              >
                <ArrowLeft className='w-6 h-6' />
              </Button>
              <h2 className='text-lg font-medium'>{t('profile_camera')}</h2>
              <div className='w-10' /> {/* Spacer for centering */}
            </div>

            <div
              className='flex-1 relative overflow-hidden'
              onClick={handleTakePhoto}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className='absolute inset-0 w-full h-full object-cover cursor-pointer'
              />
              <div className='absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none'>
                <p className='text-white text-sm bg-black/50 px-4 py-2 rounded-full'>
                  {t('profile_click_to_take_photo')}
                </p>
              </div>
            </div>
            <canvas ref={canvasRef} className='hidden' />
          </div>
        ) : (
          <>
            <DialogHeader className='p-4 border-b border-gray-200 dark:border-gray-700'>
              <DialogTitle className='text-xl font-normal text-center'>
                {t('profile_add_picture')}
              </DialogTitle>
            </DialogHeader>

            <div className='p-8 min-h-[400px] flex flex-col items-center justify-center bg-gray-50 dark:bg-[#1f1f1f]'>
              {previewImage ? (
                <div className='flex flex-col items-center gap-6 w-full'>
                  <div className='relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg'>
                    <Image
                      src={previewImage}
                      alt='Preview'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='flex gap-4'>
                    <Button
                      variant='outline'
                      onClick={handleCancel}
                      className='px-8'
                    >
                      {t('cancel')}
                    </Button>
                    <Button
                      onClick={handleSave}
                      className='px-8 bg-blue-600 hover:bg-blue-700 text-white'
                    >
                      {t('save')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center w-full h-full gap-8'>
                  <div className='flex flex-col items-center justify-center w-full max-w-md h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2a2a2a]'>
                    <div className='w-48 h-48 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4'>
                      <ImageIcon className='w-24 h-24 text-blue-200 dark:text-blue-800' />
                    </div>
                    <p className='text-gray-500 dark:text-gray-400'>
                      {t('profile_drag_photo')}
                    </p>
                  </div>

                  <div className='flex gap-4'>
                    <Button
                      variant='secondary'
                      className='bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-100 gap-2'
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Laptop className='w-4 h-4' />
                      {t('profile_upload_computer')}
                    </Button>
                    <Button
                      variant='secondary'
                      className='bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-100 gap-2'
                      onClick={handleCameraStart}
                    >
                      <CameraIcon className='w-4 h-4' />
                      {t('profile_take_photo')}
                    </Button>
                  </div>
                  <input
                    type='file'
                    ref={fileInputRef}
                    className='hidden'
                    accept='image/*'
                    onChange={handleFileUpload}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
