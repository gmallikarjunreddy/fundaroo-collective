
import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ImagePlus, Upload, X } from 'lucide-react';

interface ImageUploadFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUploadField = ({ value, onChange }: ImageUploadFieldProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For a real app, this would upload to a server and get a URL back
    // For demo purposes, we'll use a local file URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="coverImage">Project Cover Image</Label>
      
      <Input
        id="coverImage"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Project cover"
            className="w-full h-48 object-cover rounded-md border border-border"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline" 
          className="w-full h-48 flex flex-col gap-2 items-center justify-center border-dashed"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImagePlus className="h-8 w-8 text-muted-foreground" />
          <span className="text-muted-foreground">Click to upload cover image</span>
        </Button>
      )}
      
      {previewUrl && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-3 w-3 mr-1" />
            Change Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
