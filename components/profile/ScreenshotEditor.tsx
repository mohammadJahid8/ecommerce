'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Highlighter, EyeOff } from 'lucide-react';

interface ScreenshotEditorProps {
  imageDataUrl: string;
  onDone: (editedDataUrl: string) => void;
  onCancel: () => void;
}

interface Annotation {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'highlight' | 'hide';
}

export default function ScreenshotEditor({
  imageDataUrl,
  onDone,
  onCancel,
}: ScreenshotEditorProps) {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [tool, setTool] = useState<'highlight' | 'hide'>('highlight');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Load image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImgLoaded(true);
    };
    img.src = imageDataUrl;
  }, [imageDataUrl]);

  // Calculate scale and offset to fit image in viewport
  const updateCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const headerH = 56;
    const footerH = 56;
    const availW = window.innerWidth;
    const availH = window.innerHeight - headerH - footerH;

    const scaleX = availW / img.naturalWidth;
    const scaleY = availH / img.naturalHeight;
    const s = Math.min(scaleX, scaleY, 1);

    canvas.width = availW;
    canvas.height = availH;

    const drawW = img.naturalWidth * s;
    const drawH = img.naturalHeight * s;
    const ox = (availW - drawW) / 2;
    const oy = (availH - drawH) / 2;

    setScale(s);
    setOffset({ x: ox, y: oy });
  }, []);

  useEffect(() => {
    updateCanvas();
    window.addEventListener('resize', updateCanvas);
    return () => window.removeEventListener('resize', updateCanvas);
  }, [updateCanvas]);

  // Trigger redraw when image loads
  useEffect(() => {
    if (imgLoaded) updateCanvas();
  }, [imgLoaded, updateCanvas]);

  // ── Rendering ──
  const renderCanvas = useCallback(
    (
      currentDrawing?: { sx: number; sy: number; ex: number; ey: number },
      hoverIdx?: number | null,
    ) => {
      const canvas = canvasRef.current;
      const img = imgRef.current;
      if (!canvas || !img) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;

      // Clear entire canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fill background
      ctx.fillStyle = '#202124';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw image
      ctx.drawImage(img, offset.x, offset.y, drawW, drawH);

      const hasAnnotations =
        annotations.length > 0 ||
        (currentDrawing && Math.abs(currentDrawing.ex - currentDrawing.sx) > 5);

      // Draw darkened overlay on the image area when annotations exist
      if (hasAnnotations) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.fillRect(offset.x, offset.y, drawW, drawH);
      }

      // Draw saved annotations (cut out from overlay — bright regions)
      for (let i = 0; i < annotations.length; i++) {
        const ann = annotations[i];
        const ax = offset.x + ann.x * scale;
        const ay = offset.y + ann.y * scale;
        const aw = ann.w * scale;
        const ah = ann.h * scale;

        if (ann.type === 'highlight') {
          // Restore the original image in this region (clear overlay)
          ctx.save();
          ctx.beginPath();
          ctx.rect(ax, ay, aw, ah);
          ctx.clip();
          ctx.drawImage(img, offset.x, offset.y, drawW, drawH);
          ctx.restore();

          // Draw highlight border
          ctx.strokeStyle = '#fbbc04';
          ctx.lineWidth = 3;
          ctx.strokeRect(ax, ay, aw, ah);
        } else {
          // Black-out region
          ctx.fillStyle = '#000000';
          ctx.fillRect(ax, ay, aw, ah);
        }

        // Draw remove icon on hover
        if (hoverIdx === i) {
          const iconSize = 24;
          const iconX = ax + aw - iconSize / 2;
          const iconY = ay - iconSize / 2;

          // Circle background
          ctx.beginPath();
          ctx.arc(
            iconX + iconSize / 2,
            iconY + iconSize / 2,
            iconSize / 2 + 2,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.strokeStyle = '#dadce0';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Draw X
          const cx = iconX + iconSize / 2;
          const cy = iconY + iconSize / 2;
          ctx.strokeStyle = '#5f6368';
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(cx - 5, cy - 5);
          ctx.lineTo(cx + 5, cy + 5);
          ctx.moveTo(cx + 5, cy - 5);
          ctx.lineTo(cx - 5, cy + 5);
          ctx.stroke();
        }
      }

      // Draw current drag preview
      if (currentDrawing) {
        const sw = currentDrawing.ex - currentDrawing.sx;
        const sh = currentDrawing.ey - currentDrawing.sy;

        if (Math.abs(sw) > 2 || Math.abs(sh) > 2) {
          if (tool === 'highlight') {
            // Clear overlay in this region
            ctx.save();
            ctx.beginPath();
            ctx.rect(currentDrawing.sx, currentDrawing.sy, sw, sh);
            ctx.clip();
            ctx.drawImage(img, offset.x, offset.y, drawW, drawH);
            ctx.restore();

            ctx.strokeStyle = '#fbbc04';
            ctx.lineWidth = 3;
            ctx.strokeRect(currentDrawing.sx, currentDrawing.sy, sw, sh);
          } else {
            ctx.fillStyle = '#000000';
            ctx.fillRect(currentDrawing.sx, currentDrawing.sy, sw, sh);
          }
        }
      }
    },
    [annotations, scale, offset, tool],
  );

  // Re-render when annotations or hover changes
  useEffect(() => {
    renderCanvas(undefined, hoveredIndex);
  }, [renderCanvas, hoveredIndex, annotations]);

  // Draw during drag
  useEffect(() => {
    if (!drawing) return;
    renderCanvas(
      {
        sx: startPos.x,
        sy: startPos.y,
        ex: currentPos.x,
        ey: currentPos.y,
      },
      null,
    );
  }, [drawing, currentPos, startPos, renderCanvas]);

  // ── Hit testing ──
  const getAnnotationAtPos = (cx: number, cy: number): number | null => {
    for (let i = annotations.length - 1; i >= 0; i--) {
      const ann = annotations[i];
      const ax = offset.x + ann.x * scale;
      const ay = offset.y + ann.y * scale;
      const aw = ann.w * scale;
      const ah = ann.h * scale;

      // Normalize for negative widths/heights
      const left = Math.min(ax, ax + aw);
      const top = Math.min(ay, ay + ah);
      const right = Math.max(ax, ax + aw);
      const bottom = Math.max(ay, ay + ah);

      if (cx >= left && cx <= right && cy >= top && cy <= bottom) {
        return i;
      }
    }
    return null;
  };

  const isOnRemoveIcon = (cx: number, cy: number, idx: number): boolean => {
    const ann = annotations[idx];
    const ax = offset.x + ann.x * scale;
    const ay = offset.y + ann.y * scale;
    const aw = ann.w * scale;

    // Icon is drawn centered at (ax + aw, ay) — top-right corner of annotation
    const iconCX = ax + aw;
    const iconCY = ay;
    const dist = Math.sqrt((cx - iconCX) ** 2 + (cy - iconCY) ** 2);
    return dist <= 16;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    // Check if clicking remove icon on any annotation
    for (let i = annotations.length - 1; i >= 0; i--) {
      if (isOnRemoveIcon(cx, cy, i)) {
        setAnnotations((prev) => prev.filter((_, j) => j !== i));
        setHoveredIndex(null);
        return;
      }
    }

    setStartPos({ x: cx, y: cy });
    setCurrentPos({ x: cx, y: cy });
    setDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    setMousePos({ x: cx, y: cy });

    if (drawing) {
      setCurrentPos({ x: cx, y: cy });
      return;
    }

    // Hover detection — check annotation body OR its remove icon
    let found: number | null = null;
    for (let i = annotations.length - 1; i >= 0; i--) {
      if (isOnRemoveIcon(cx, cy, i)) {
        found = i;
        break;
      }
    }
    if (found === null) {
      found = getAnnotationAtPos(cx, cy);
    }
    setHoveredIndex(found);
  };

  const handleMouseUp = () => {
    if (!drawing) return;
    setDrawing(false);

    const w = currentPos.x - startPos.x;
    const h = currentPos.y - startPos.y;
    if (Math.abs(w) < 5 || Math.abs(h) < 5) return;

    // Convert canvas coords → image coords
    const imgX = (startPos.x - offset.x) / scale;
    const imgY = (startPos.y - offset.y) / scale;
    const imgW = w / scale;
    const imgH = h / scale;

    setAnnotations((prev) => [
      ...prev,
      { x: imgX, y: imgY, w: imgW, h: imgH, type: tool },
    ]);
  };

  const handleDone = () => {
    const img = imgRef.current;
    if (!img) return;

    // Render final image at original resolution
    const outCanvas = document.createElement('canvas');
    outCanvas.width = img.naturalWidth;
    outCanvas.height = img.naturalHeight;
    const ctx = outCanvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);

    // If there are annotations, draw darkened overlay + clear annotation regions
    if (annotations.length > 0) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.fillRect(0, 0, outCanvas.width, outCanvas.height);

      for (const ann of annotations) {
        if (ann.type === 'highlight') {
          ctx.save();
          ctx.beginPath();
          ctx.rect(ann.x, ann.y, ann.w, ann.h);
          ctx.clip();
          ctx.drawImage(img, 0, 0);
          ctx.restore();

          ctx.strokeStyle = '#fbbc04';
          ctx.lineWidth = 4;
          ctx.strokeRect(ann.x, ann.y, ann.w, ann.h);
        } else {
          ctx.fillStyle = '#000000';
          ctx.fillRect(ann.x, ann.y, ann.w, ann.h);
        }
      }
    }

    onDone(outCanvas.toDataURL('image/png'));
  };

  return (
    <div className='fixed inset-0 z-[100] bg-[#f8f9fa] dark:bg-[#202124] flex flex-col'>
      {/* Header */}
      <div className='h-[56px] flex items-center justify-between px-5 bg-white dark:bg-[#2d2d2d] border-b border-[#dadce0] dark:border-slate-700 shrink-0'>
        <h3 className='text-[16px] font-medium text-[#202124] dark:text-white'>
          {t(
            'screenshot_editor_title',
            'Highlight or Hide info on your screenshot',
          )}
        </h3>
        <button
          onClick={onCancel}
          className='p-2 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-slate-700 transition-colors'
        >
          <X className='w-5 h-5 text-[#5f6368] dark:text-slate-300' />
        </button>
      </div>

      {/* Canvas */}
      <div className='flex-1 overflow-hidden cursor-crosshair bg-[#f1f3f4] dark:bg-[#1a1a1a]'>
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            if (drawing) handleMouseUp();
            setHoveredIndex(null);
          }}
          className='block w-full h-full'
        />
      </div>

      {/* Footer toolbar */}
      <div className='h-[56px] flex items-center justify-between px-5 bg-white dark:bg-[#2d2d2d] border-t border-[#dadce0] dark:border-slate-700 shrink-0'>
        {/* Tools */}
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setTool('highlight')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
              tool === 'highlight'
                ? 'bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#394457] dark:text-[#8ab4f8]'
                : 'bg-[#f1f3f4] text-[#3c4043] hover:bg-[#e8eaed] dark:bg-[#3c4043] dark:text-slate-200 dark:hover:bg-[#4a4d51]'
            }`}
          >
            <Highlighter className='w-4 h-4' />
            {t('screenshot_highlight', 'Highlight')}
          </button>
          <button
            onClick={() => setTool('hide')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
              tool === 'hide'
                ? 'bg-[#e8f0fe] text-[#1a73e8] dark:bg-[#394457] dark:text-[#8ab4f8]'
                : 'bg-[#f1f3f4] text-[#3c4043] hover:bg-[#e8eaed] dark:bg-[#3c4043] dark:text-slate-200 dark:hover:bg-[#4a4d51]'
            }`}
          >
            <EyeOff className='w-4 h-4' />
            {t('screenshot_hide', 'Hide')}
          </button>
        </div>

        {/* Actions — rounded like the tool buttons */}
        <div className='flex items-center gap-3'>
          <button
            onClick={onCancel}
            className='px-5 py-2 text-[13px] font-medium text-[#3c4043] dark:text-slate-200 bg-[#f1f3f4] dark:bg-[#3c4043] hover:bg-[#e8eaed] dark:hover:bg-[#4a4d51] rounded-full transition-colors'
          >
            {t('cancel', 'Cancel')}
          </button>
          <button
            onClick={handleDone}
            className='px-5 py-2 text-[13px] font-medium text-white bg-[#1a73e8] hover:bg-[#1765cc] rounded-full transition-colors'
          >
            {t('screenshot_done', 'Done')}
          </button>
        </div>
      </div>
    </div>
  );
}
