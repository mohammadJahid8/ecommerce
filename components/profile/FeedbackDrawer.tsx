'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  X,
  HelpCircle,
  Monitor,
  Trash2,
  Pencil,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import ScreenshotEditor from './ScreenshotEditor';

// ─── Types ──────────────────────────────────────────────────────────────────────

type FeedbackView = 'selection' | 'report' | 'suggest';

interface FeedbackDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ─── Issue category options ─────────────────────────────────────────────────────

const issueCategories = [
  'feedback_cat_chat_message',
  'feedback_cat_notifications',
  'feedback_cat_find_messages',
  'feedback_cat_send_email',
  'feedback_cat_account_help',
  'feedback_cat_report_spam',
  'feedback_cat_other',
] as const;

const issueCategoryFallbacks: Record<string, string> = {
  feedback_cat_chat_message: 'Send or receive chat message',
  feedback_cat_notifications: 'Change notifications settings',
  feedback_cat_find_messages: 'Find messages or attachments',
  feedback_cat_send_email: 'Send or receive email',
  feedback_cat_account_help: 'Get help with your account',
  feedback_cat_report_spam: 'Report spam or block someone',
  feedback_cat_other: 'Other',
};

// ─── Component ──────────────────────────────────────────────────────────────────

export default function FeedbackDrawer({
  open,
  onOpenChange,
}: FeedbackDrawerProps) {
  const { t } = useTranslation();
  const [view, setView] = useState<FeedbackView>('selection');
  const [issueCategory, setIssueCategory] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [emailConsent, setEmailConsent] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Screenshot state
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [originalScreenshotUrl, setOriginalScreenshotUrl] = useState<
    string | null
  >(null);
  const [showEditor, setShowEditor] = useState(false);

  const resetAndClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setView('selection');
      setIssueCategory('');
      setIssueDescription('');
      setSuggestion('');
      setEmailConsent(false);
      setDropdownOpen(false);
      setScreenshotUrl(null);
      setOriginalScreenshotUrl(null);
      setShowEditor(false);
    }, 300);
  };

  const goBack = () => {
    setView('selection');
    setIssueCategory('');
    setIssueDescription('');
    setSuggestion('');
    setEmailConsent(false);
    setDropdownOpen(false);
    setScreenshotUrl(null);
    setOriginalScreenshotUrl(null);
    setShowEditor(false);
  };

  // ── Screenshot capture ──
  const captureScreenshot = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' } as MediaTrackConstraints,
      });

      const track = stream.getVideoTracks()[0];
      const imageCapture = new (window as any).ImageCapture(track);

      // Small delay to ensure frame is ready
      await new Promise((res) => setTimeout(res, 300));

      const bitmap = await imageCapture.grabFrame();
      track.stop();

      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(bitmap, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setScreenshotUrl(dataUrl);
        setOriginalScreenshotUrl(dataUrl);
      }
    } catch {
      // User cancelled or API not available
      console.log('Screenshot capture cancelled or failed');
    }
  };

  const deleteScreenshot = () => {
    setScreenshotUrl(null);
    setOriginalScreenshotUrl(null);
  };

  const openAnnotationEditor = () => {
    setShowEditor(true);
  };

  const handleEditorDone = (editedDataUrl: string) => {
    setScreenshotUrl(editedDataUrl);
    setShowEditor(false);
  };

  const handleEditorCancel = () => {
    setShowEditor(false);
  };

  // ── Titles per view ──
  const titles: Record<FeedbackView, string> = {
    selection: t('feedback_title', 'Send feedback to Google'),
    report: t('feedback_report_issue', 'Report an issue'),
    suggest: t('feedback_suggest_idea', 'Suggest an idea'),
  };

  // ── Screenshot preview section (reused in both report + suggest) ──
  const renderScreenshotSection = () => {
    if (!screenshotUrl) {
      return (
        <>
          <p className='mt-6 text-[14px] text-[#202124] dark:text-slate-200 mb-3'>
            {t(
              'feedback_screenshot_help',
              'A screenshot will help us better understand your idea.',
            )}
          </p>
          <button
            onClick={captureScreenshot}
            className='w-full flex items-center justify-center gap-2 px-4 py-3 border border-[#dadce0] dark:border-slate-600 rounded-full text-[14px] text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-[#f1f3f4] dark:hover:bg-slate-700 transition-colors'
          >
            <Monitor className='w-[18px] h-[18px]' />
            {t('feedback_capture_screenshot', 'Capture screenshot')}
          </button>
        </>
      );
    }

    return (
      <div className='mt-6'>
        <p className='text-[14px] text-[#202124] dark:text-slate-200 mb-3'>
          {t('feedback_attached_screenshot', 'Attached screenshot')}
        </p>
        <div className='relative rounded-lg overflow-hidden border border-[#dadce0] dark:border-slate-600'>
          {/* Screenshot preview with overlay */}
          <div className='relative'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshotUrl}
              alt='Screenshot'
              className='w-full h-auto max-h-[200px] object-cover object-top'
            />

            {/* Darkened overlay */}
            <div className='absolute inset-0 bg-black/30' />

            {/* Centered "Highlight or Hide Info" button */}
            <button
              onClick={openAnnotationEditor}
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#2d2d2d] rounded-full shadow-lg text-[14px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] hover:bg-[#f1f3f4] dark:hover:bg-slate-700 transition-colors whitespace-nowrap'
            >
              <Pencil className='w-[16px] h-[16px]' />
              {t('feedback_highlight_hide', 'Highlight or Hide Info')}
            </button>

            {/* Delete button — top right */}
            <button
              onClick={deleteScreenshot}
              className='absolute top-2 right-2 w-[36px] h-[36px] bg-white dark:bg-[#2d2d2d] border border-[#dadce0] dark:border-slate-600 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors'
              aria-label='Delete screenshot'
            >
              <Trash2 className='w-[18px] h-[18px] text-red-600 dark:text-red-400' />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // If annotation editor is open, render it full-screen
  if (showEditor && (originalScreenshotUrl || screenshotUrl)) {
    return (
      <ScreenshotEditor
        imageDataUrl={screenshotUrl!}
        onDone={handleEditorDone}
        onCancel={handleEditorCancel}
      />
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side='right'
        className='w-[420px] sm:max-w-[420px] p-0 flex flex-col [&>button]:hidden'
      >
        <VisuallyHidden.Root>
          <SheetTitle>{titles[view]}</SheetTitle>
        </VisuallyHidden.Root>

        {/* ════════ Fixed Header ════════ */}
        <div className='flex items-center h-[56px] px-5 shrink-0 border-b border-[#dadce0] dark:border-slate-700'>
          {view !== 'selection' ? (
            <button
              onClick={goBack}
              className='p-2 -ml-2 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-slate-700 transition-colors'
              aria-label='Back'
            >
              <ArrowLeft className='w-[20px] h-[20px] text-[#444746] dark:text-slate-300' />
            </button>
          ) : (
            <div className='w-[36px]' />
          )}

          <h2 className='flex-1 text-center text-[16px] font-medium text-[#202124] dark:text-white'>
            {titles[view]}
          </h2>

          <button
            onClick={resetAndClose}
            className='p-2 -mr-2 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-slate-700 transition-colors'
            aria-label='Close'
          >
            <X className='w-[20px] h-[20px] text-[#444746] dark:text-slate-300' />
          </button>
        </div>

        {/* ════════ Scrollable Content ════════ */}
        <div className='flex-1 overflow-y-auto'>
          {/* ── Selection view ── */}
          {view === 'selection' && (
            <div className='px-6 py-6'>
              {/* Illustration */}
              <div className='flex justify-center mb-8'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src='https://www.gstatic.com/uservoice/feedback/client/web/live/intent_selection_header.png'
                  alt='Feedback illustration'
                  className='w-[240px] h-auto'
                />
              </div>

              {/* Options */}
              <div className='space-y-2'>
                <button
                  onClick={() => setView('report')}
                  className='w-full flex items-center gap-4 px-4 py-4 hover:bg-[#f1f3f4] dark:hover:bg-slate-700/50 rounded-lg transition-colors text-left'
                >
                  <div className='w-[40px] h-[40px] rounded-full bg-[#1a73e8] flex items-center justify-center shrink-0'>
                    <svg
                      className='w-[20px] h-[20px] text-white'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z' />
                    </svg>
                  </div>
                  <span className='text-[16px] text-[#202124] dark:text-slate-200'>
                    {t('feedback_report_issue', 'Report an issue')}
                  </span>
                </button>

                <button
                  onClick={() => setView('suggest')}
                  className='w-full flex items-center gap-4 px-4 py-4 hover:bg-[#f1f3f4] dark:hover:bg-slate-700/50 rounded-lg transition-colors text-left'
                >
                  <div className='w-[40px] h-[40px] rounded-full bg-[#1a73e8] flex items-center justify-center shrink-0'>
                    <svg
                      className='w-[20px] h-[20px] text-white'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z' />
                    </svg>
                  </div>
                  <span className='text-[16px] text-[#202124] dark:text-slate-200'>
                    {t('feedback_suggest_idea', 'Suggest an idea')}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* ── Report an issue form ── */}
          {view === 'report' && (
            <div className='px-6 py-6'>
              {/* Category dropdown */}
              <label className='block text-[14px] text-[#202124] dark:text-slate-200 mb-2'>
                {t(
                  'feedback_issue_question',
                  'When you noticed this issue, what were you trying to do? (required)',
                )}
              </label>
              <div className='relative mb-6'>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className='w-full flex items-center justify-between px-4 py-3 border-2 border-[#dadce0] dark:border-slate-600 rounded-md text-[14px] text-[#202124] dark:text-slate-200 hover:border-[#1a73e8] focus:border-[#1a73e8] focus:outline-none transition-colors bg-white dark:bg-[#2d2d2d]'
                >
                  <span
                    className={
                      issueCategory ? '' : 'text-[#5f6368] dark:text-slate-400'
                    }
                  >
                    {issueCategory
                      ? t(issueCategory, issueCategoryFallbacks[issueCategory])
                      : t('feedback_choose_option', 'Choose an option')}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#5f6368] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className='absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#2d2d2d] border border-[#dadce0] dark:border-slate-600 rounded-md shadow-lg z-50 py-1'>
                    {issueCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setIssueCategory(cat);
                          setDropdownOpen(false);
                        }}
                        className='w-full text-left px-4 py-3 text-[14px] text-[#202124] dark:text-slate-200 hover:bg-[#f1f3f4] dark:hover:bg-slate-700 transition-colors'
                      >
                        {t(cat, issueCategoryFallbacks[cat])}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description textarea */}
              <label className='block text-[14px] text-[#202124] dark:text-slate-200 mb-2'>
                {t('feedback_describe_issue', 'Describe your issue (required)')}
              </label>
              <textarea
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder={t(
                  'feedback_issue_placeholder',
                  "Tell us what happened and what's not working",
                )}
                className='w-full h-[140px] px-4 py-3 border border-[#dadce0] dark:border-slate-600 rounded-md text-[14px] text-[#202124] dark:text-slate-200 placeholder:text-[#9aa0a6] dark:placeholder:text-slate-500 bg-white dark:bg-[#2d2d2d] resize-none focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-colors'
              />
              <p className='mt-2 text-[12px] text-[#5f6368] dark:text-slate-400 flex items-center gap-1.5'>
                {t(
                  'feedback_no_sensitive',
                  "Please don't include any sensitive information",
                )}
                <HelpCircle className='w-[14px] h-[14px]' />
              </p>

              {/* Screenshot section */}
              {renderScreenshotSection()}
            </div>
          )}

          {/* ── Suggest an idea form ── */}
          {view === 'suggest' && (
            <div className='px-6 py-6'>
              {/* Description textarea */}
              <label className='block text-[14px] text-[#202124] dark:text-slate-200 mb-2'>
                {t(
                  'feedback_describe_suggestion',
                  'Describe your suggestion (required)',
                )}
              </label>
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder={t(
                  'feedback_suggestion_placeholder',
                  'Tell us how we can improve our product',
                )}
                className='w-full h-[140px] px-4 py-3 border border-[#dadce0] dark:border-slate-600 rounded-md text-[14px] text-[#202124] dark:text-slate-200 placeholder:text-[#9aa0a6] dark:placeholder:text-slate-500 bg-white dark:bg-[#2d2d2d] resize-none focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-colors'
              />
              <p className='mt-2 text-[12px] text-[#5f6368] dark:text-slate-400 flex items-center gap-1.5'>
                {t(
                  'feedback_no_sensitive',
                  "Please don't include any sensitive information",
                )}
                <HelpCircle className='w-[14px] h-[14px]' />
              </p>

              {/* Screenshot section */}
              {renderScreenshotSection()}
            </div>
          )}
        </div>

        {/* ════════ Fixed Footer ════════ */}
        {(view === 'report' || view === 'suggest') && (
          <div className='shrink-0 border-t border-[#dadce0] dark:border-slate-700 px-6 py-4'>
            {/* Email consent checkbox */}
            <label className='flex items-start gap-3 mb-4 cursor-pointer'>
              <input
                type='checkbox'
                checked={emailConsent}
                onChange={(e) => setEmailConsent(e.target.checked)}
                className='mt-0.5 w-[18px] h-[18px] rounded border-2 border-[#5f6368] dark:border-slate-500 accent-[#1a73e8] cursor-pointer'
              />
              <span className='text-[13px] text-[#202124] dark:text-slate-200 leading-[1.5]'>
                {t(
                  'feedback_email_consent',
                  'We may email you for more information or updates',
                )}
              </span>
            </label>

            {/* Legal text */}
            <p className='text-[12px] text-[#5f6368] dark:text-slate-400 leading-[1.6] mb-4'>
              {t(
                'feedback_legal_text',
                'Some account and system information may be sent to Google. We will use it to fix problems and improve our services, subject to our Privacy Policy and Terms of Service. We may email you for more information or updates. Go to Legal Help to ask for content changes for legal reasons.',
              )}
            </p>

            {/* Action button */}
            <div className='flex justify-end'>
              <button
                className='px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1765cc] text-white text-[14px] font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={
                  view === 'report'
                    ? !issueDescription.trim()
                    : !suggestion.trim()
                }
              >
                {view === 'report'
                  ? t('feedback_next', 'Next')
                  : t('feedback_send', 'Send')}
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
