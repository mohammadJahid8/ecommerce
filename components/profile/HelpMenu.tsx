'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HelpCircle, X, ArrowLeft, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import FeedbackDrawer from './FeedbackDrawer';

// ─── Types ──────────────────────────────────────────────────────────────────────

interface HelpArticle {
  id: string;
  titleKey: string;
  titleFallback: string;
  hasContent: boolean;
}

type HelpView = 'closed' | 'dropdown' | 'list' | 'article';

// ─── Article definitions ────────────────────────────────────────────────────────

const helpArticles: HelpArticle[] = [
  {
    id: 'create-account',
    titleKey: 'help_article_create_account',
    titleFallback: 'Create an account',
    hasContent: true,
  },
  {
    id: 'sign-in',
    titleKey: 'help_article_sign_in',
    titleFallback: 'Sign in',
    hasContent: true,
  },
  {
    id: 'add-home-screen',
    titleKey: 'help_article_add_home_screen',
    titleFallback: 'Add to your home screen - Android',
    hasContent: false,
  },
  {
    id: 'fix-bounced',
    titleKey: 'help_article_fix_bounced',
    titleFallback: 'Fix bounced or rejected emails',
    hasContent: false,
  },
  {
    id: 'emoji-reactions',
    titleKey: 'help_article_emoji_reactions',
    titleFallback: 'Reply to emails with emoji reactions',
    hasContent: false,
  },
];

// ─── Article content components ─────────────────────────────────────────────────

function CreateAccountContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2 className='text-[20px] font-bold text-[#202124] dark:text-white mb-2 leading-[1.3]'>
        {t('help_create_account_title', 'Create an account')}
      </h2>
      <p className='text-[14px] text-[#5f6368] dark:text-slate-400 mb-6 leading-[1.7]'>
        {t(
          'help_create_account_desc',
          'To sign up, create an Account. You can use the username and password to sign in and access other products.',
        )}
      </p>

      <h3 className='text-[18px] font-bold text-[#202124] dark:text-white mb-3 leading-[1.3]'>
        {t('help_signup_title', 'Sign up for an account')}
      </h3>
      <p className='text-[14px] text-[#5f6368] dark:text-slate-400 mb-4 leading-[1.7]'>
        <strong className='text-[#202124] dark:text-slate-200'>
          {t('help_important', 'Important:')}
        </strong>{' '}
        {t(
          'help_signup_warning',
          'Before you set up a new account, make sure to sign out of your current account.',
        )}
      </p>
      <ol className='text-[14px] text-[#3c4043] dark:text-slate-300 list-decimal pl-5 space-y-3 mb-4 leading-[1.7]'>
        <li>
          {t(
            'help_signup_step_1',
            'From your device, go to the Account sign in page.',
          )}
        </li>
        <li>
          {t('help_signup_step_2_prefix', 'Click')}{' '}
          <strong>{t('help_signup_step_2_bold', 'Create account')}</strong>.
        </li>
        <li>
          {t(
            'help_signup_step_3',
            'In the drop down, select if the account is for your:',
          )}
          <ul className='list-disc pl-5 mt-2 space-y-1.5'>
            <li>{t('help_personal_use', 'Personal use')}</li>
            <li>{t('help_child', 'Child')}</li>
            <li>{t('help_work_or_business', 'Work or business')}</li>
          </ul>
        </li>
        <li>
          {t(
            'help_signup_step_4',
            'Enter your name and a username for your account.',
          )}
        </li>
        <li>{t('help_signup_step_5', 'Create and confirm your password.')}</li>
        <li>
          {t('help_signup_step_6_prefix', 'Click')}{' '}
          <strong>{t('help_signup_step_6_bold', 'Next')}</strong>.
        </li>
        <li>
          {t(
            'help_signup_step_7',
            'Add and verify a phone number (optional but recommended).',
          )}
        </li>
        <li>
          {t('help_signup_step_8_prefix', 'Click')}{' '}
          <strong>{t('help_signup_step_8_bold', 'Next')}</strong>.
        </li>
      </ol>
    </>
  );
}

function SignInContent() {
  const { t } = useTranslation();

  return (
    <>
      <h2 className='text-[20px] font-bold text-[#202124] dark:text-white mb-2 leading-[1.3]'>
        {t('help_sign_in_title', 'Sign in to your account')}
      </h2>
      <p className='text-[14px] text-[#5f6368] dark:text-slate-400 mb-6 leading-[1.7]'>
        {t(
          'help_sign_in_desc',
          'Use your account email and password to sign in across all services and products.',
        )}
      </p>

      <h3 className='text-[18px] font-bold text-[#202124] dark:text-white mb-3 leading-[1.3]'>
        {t('help_how_to_sign_in', 'How to sign in')}
      </h3>
      <ol className='text-[14px] text-[#3c4043] dark:text-slate-300 list-decimal pl-5 space-y-3 mb-6 leading-[1.7]'>
        <li>
          {t(
            'help_signin_step_1',
            'Go to the sign in page on your computer or mobile device.',
          )}
        </li>
        <li>
          {t(
            'help_signin_step_2_prefix',
            'Enter your email or phone number, then click',
          )}{' '}
          <strong>{t('help_signin_step_2_bold', 'Next')}</strong>.
        </li>
        <li>
          {t('help_signin_step_3_prefix', 'Enter your password, then click')}{' '}
          <strong>{t('help_signin_step_3_bold', 'Next')}</strong>.
        </li>
      </ol>

      <h3 className='text-[18px] font-bold text-[#202124] dark:text-white mb-3 leading-[1.3]'>
        {t('help_troubleshoot_title', 'Troubleshoot sign-in issues')}
      </h3>
      <p className='text-[14px] text-[#5f6368] dark:text-slate-400 mb-4 leading-[1.7]'>
        {t(
          'help_troubleshoot_desc',
          'If you are having trouble signing in, try the following:',
        )}
      </p>
      <ul className='text-[14px] text-[#3c4043] dark:text-slate-300 list-disc pl-5 space-y-3 mb-4 leading-[1.7]'>
        <li>
          {t(
            'help_troubleshoot_tip_1',
            'Make sure you are using the correct email and password.',
          )}
        </li>
        <li>
          {t(
            'help_troubleshoot_tip_2',
            'Clear your browser cache and cookies, then try again.',
          )}
        </li>
        <li>
          {t(
            'help_troubleshoot_tip_3',
            'If you forgot your password, click "Forgot password?" on the sign-in page to reset it.',
          )}
        </li>
        <li>
          {t(
            'help_troubleshoot_tip_4',
            'Try signing in from a different browser or device.',
          )}
        </li>
      </ul>
    </>
  );
}

const articleContentMap: Record<string, React.FC> = {
  'create-account': CreateAccountContent,
  'sign-in': SignInContent,
};

// ─── Main component ─────────────────────────────────────────────────────────────

export default function HelpMenu() {
  const [view, setView] = useState<HelpView>('closed');
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(
    null,
  );
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const close = useCallback(() => {
    setView('closed');
    setSelectedArticle(null);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close]);

  const openArticle = (article: HelpArticle) => {
    if (article.hasContent) {
      setSelectedArticle(article);
      setView('article');
    }
  };

  const isButtonActive = view !== 'closed';
  const ArticleContent = selectedArticle
    ? articleContentMap[selectedArticle.id]
    : null;

  return (
    <div ref={menuRef} className='relative'>
      {/* ───── Trigger button ───── */}
      <button
        onClick={() => setView((v) => (v === 'closed' ? 'dropdown' : 'closed'))}
        className={cn(
          'p-3 rounded-full transition-colors',
          isButtonActive
            ? 'bg-slate-100 dark:bg-slate-700'
            : 'hover:bg-slate-100 dark:hover:bg-slate-700',
        )}
        aria-label='Help'
      >
        <HelpCircle className='w-5 h-5 text-slate-600 dark:text-slate-300' />
      </button>

      {/* ───── Dropdown menu (Help / Training / Send feedback) ───── */}
      {view === 'dropdown' && (
        <div className='absolute right-0 top-full mt-2 w-[200px] bg-white dark:bg-[#2d2d2d] rounded-lg shadow-[0_1px_3px_1px_rgba(0,0,0,0.15),0_1px_2px_0_rgba(0,0,0,0.3)] py-2 z-50'>
          <button
            onClick={() => setView('list')}
            className='w-full text-left px-4 py-[6px] text-[14px] text-[#3c4043] dark:text-slate-200 hover:bg-[#f1f3f4] dark:hover:bg-slate-700 transition-colors'
          >
            {t('help_center', 'Help')}
          </button>

          <button
            onClick={() => setView('list')}
            className='w-full text-left px-4 py-[6px] text-[14px] text-[#3c4043] dark:text-slate-200 hover:bg-[#f1f3f4] dark:hover:bg-slate-700 transition-colors'
          >
            {t('help_training', 'Training')}
          </button>

          <div className='my-1 border-t border-[#dadce0] dark:border-slate-700' />

          <button
            onClick={() => {
              close();
              setFeedbackOpen(true);
            }}
            className='w-full text-left px-4 py-[6px] text-[14px] text-[#3c4043] dark:text-slate-200 hover:bg-[#f1f3f4] dark:hover:bg-slate-700 transition-colors'
          >
            {t('help_send_feedback', 'Send feedback to Google')}
          </button>
        </div>
      )}

      {/* ───── Help panel (list + article views) ───── */}
      {(view === 'list' || view === 'article') && (
        <div className='absolute right-0 top-full mt-2 w-[360px] max-h-[560px] bg-white dark:bg-[#2d2d2d] rounded-[8px] shadow-[0_1px_3px_1px_rgba(0,0,0,0.15),0_1px_2px_0_rgba(0,0,0,0.3)] z-50 flex flex-col overflow-hidden'>
          {/* ── Header (no border) ── */}
          <div className='flex items-center px-5 py-4 shrink-0'>
            {view === 'article' ? (
              <button
                onClick={() => {
                  setView('list');
                  setSelectedArticle(null);
                }}
                className='p-2 -ml-2 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-slate-700 transition-colors'
                aria-label='Back'
              >
                <ArrowLeft className='w-[22px] h-[22px] text-[#444746] dark:text-slate-300' />
              </button>
            ) : (
              <div className='w-[38px]' />
            )}

            <h3 className='flex-1 text-center text-[18px] text-[#202124] dark:text-white'>
              {t('help_title', 'Help')}
            </h3>

            <button
              onClick={close}
              className='p-2 -mr-2 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-slate-700 transition-colors'
              aria-label='Close'
            >
              <X className='w-[22px] h-[22px] text-[#444746] dark:text-slate-300' />
            </button>
          </div>

          {/* ── List view ── */}
          {view === 'list' && (
            <div className='flex-1 overflow-y-auto'>
              <p className='px-6 pb-4 text-[15px] text-[#202124] dark:text-slate-300 font-medium'>
                {t('help_popular_resources', 'Popular help resources')}
              </p>

              <div className='pb-3'>
                {helpArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => openArticle(article)}
                    disabled={!article.hasContent}
                    className={cn(
                      'w-full flex items-center gap-5 px-6 py-[14px] text-left transition-colors',
                      article.hasContent
                        ? 'hover:bg-[#f1f3f4] dark:hover:bg-slate-700/50 cursor-pointer'
                        : 'opacity-40 cursor-not-allowed',
                    )}
                  >
                    <div className='w-[32px] h-[32px] rounded-full bg-[#e8f0fe] dark:bg-[#394457] flex items-center justify-center shrink-0'>
                      <FileText className='w-[16px] h-[16px] text-[#1a73e8] dark:text-[#8ab4f8]' />
                    </div>
                    <span className='text-[16px] text-[#202124] dark:text-slate-200 leading-[1.5]'>
                      {t(article.titleKey, article.titleFallback)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Article detail view ── */}
          {view === 'article' && selectedArticle && ArticleContent && (
            <div className='flex-1 overflow-y-auto px-6 py-2 pb-6'>
              <ArticleContent />
            </div>
          )}
        </div>
      )}
      <FeedbackDrawer open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </div>
  );
}
