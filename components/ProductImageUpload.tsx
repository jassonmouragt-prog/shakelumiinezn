'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ImageIcon, AlertCircle, X } from 'lucide-react';

type ProductImageUploadProps = {
  label?: string;
  value: string;
  onChange: (dataUrl: string) => void;
  maxSizeMB?: number;
};

export default function ProductImageUpload({
  label = 'Foto do Produto',
  value,
  onChange,
  maxSizeMB = 3
}: ProductImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Envie uma imagem (JPG, PNG, WEBP, GIF).');
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`A imagem deve ter no máximo ${maxSizeMB} MB.`);
      return;
    }
    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      onChange(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="block font-semibold text-[#5A5A58] mb-1">{label}</label>

      <div
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-4 p-3 rounded-2xl bg-[#FAFAF8] border border-dashed border-[#D9D9D9] hover:border-[#D4AF37] cursor-pointer transition-colors"
        title="Clique para enviar uma foto da sua galeria"
      >
        <div className="w-16 h-16 rounded-xl bg-white border border-[#E2E2DF] relative overflow-hidden flex-shrink-0 flex items-center justify-center">
          {value ? (
            <Image
              src={value}
              alt="Prévia do produto"
              fill
              unoptimized
              className="object-contain"
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-[#C9A227]" />
          )}
        </div>
        <div className="text-[11px] text-[#5A5A58]">
          <strong className="text-[#1A1A1A] block mb-0.5">
            Enviar foto da galeria
          </strong>
          <span className="block">Clique para escolher uma imagem do seu dispositivo (JPG, PNG, WEBP). Máx. {maxSizeMB} MB.</span>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />

      {error && (
        <p className="flex items-center gap-1.5 mt-1.5 text-[11px] font-medium text-red-600 animate-fade-in">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}

      {value && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange('');
          }}
          className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-red-500 hover:text-red-700"
        >
          <X className="w-3 h-3" />
          Remover foto
        </button>
      )}
    </div>
  );
}