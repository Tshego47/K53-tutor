import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Flame,
  Home as HomeIcon,
  Menu,
  RotateCcw,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

type SignType = 'stop' | 'yield' | 'speed' | 'no-entry' | 'pedestrian' | 'traffic-light' | 'roundabout';
type Screen = 'home' | 'practice' | 'results';
type SetId = 'starter' | 'control' | 'warning';

type SignQuestion = {
  id: string;
  sign: SignType;
  answer: string;
  options: string[];
};

type PracticeSet = {
  id: SetId;
  eyebrow: string;
  title: string;
  detail: string;
  count: number;
  accent: string;
  questions: SignQuestion[];
};

type Progress = {
  totalAnswered: number;
  correct: number;
  sessions: number;
  streak: number;
  lastSet: string;
};

const EMPTY_PROGRESS: Progress = {
  totalAnswered: 0,
  correct: 0,
  sessions: 0,
  streak: 0,
  lastSet: 'Not started',
};

const SETS: PracticeSet[] = [
  {
    id: 'starter',
    eyebrow: 'Vehicle Controls',
    title: 'Controls & Mirrors',
    detail: 'Learn what clutch, mirrors and blind spots actually do before you drive.',
    count: 5,
    accent: 'sun',
    questions: [
      { id: 'mir-how-often', sign: 'stop', answer: 'Every 5 to 8 seconds', options: ['Every 5 to 8 seconds', 'Only when braking', 'Once every 10 minutes', 'Only at night'] },
      { id: 'mir-when-adjust', sign: 'yield', answer: 'Only when the car is not moving', options: ['Only when the car is not moving', 'While driving on highway', 'When turning', 'Anytime'] },
      { id: 'blind-how', sign: 'no-entry', answer: 'Turn your head to look', options: ['Turn your head to look', 'Honk your hooter', 'Look in rear-view only', 'No need to check'] },
      { id: 'clutch-do', sign: 'traffic-light', answer: 'Disconnects engine to change gears', options: ['Disconnects engine to change gears', 'Stops the car', 'Steers the car', 'Makes car go faster'] },
      { id: 'safe-to-move', sign: 'stop', answer: 'Check mirrors first', options: ['Check mirrors first', 'Accelerate immediately', 'Hoot first', 'Check wipers'] },
    ],
  },
  {
    id: 'control',
    eyebrow: 'Traffic Signals',
    title: 'Traffic Lights & Overhead Lanes',
    detail: 'What to do at red lights and when a red cross or green arrow is above your lane.',
    count: 6,
    accent: 'coral',
    questions: [
      { id: 'red-disc-do', sign: 'stop', answer: 'Stop behind white line, wait for green', options: ['Stop behind white line, wait for green', 'Slow down and go', 'Yield to others', 'Proceed if clear'] },
      { id: 'flash-red-do', sign: 'stop', answer: 'Treat as 4-way stop, give way to pedestrians', options: ['Treat as 4-way stop, give way to pedestrians', 'Speed up', 'Stop and go quickly', 'Ignore'] },
      { id: 'over-red-cross', sign: 'no-entry', answer: 'You are NOT allowed in that lane', options: ['You are NOT allowed in that lane', 'You ARE allowed in that lane', 'Lane is closing ahead', 'Prepare to stop'] },
      { id: 'over-green-arrow', sign: 'traffic-light', answer: 'You ARE allowed in that lane', options: ['You ARE allowed in that lane', 'You are NOT allowed in that lane', 'Stop', 'No overtaking'] },
      { id: 'over-yellow-arrow', sign: 'roundabout', answer: 'Lane closed, move to next lane', options: ['Lane closed, move to next lane', 'You may stay in lane', 'Speed limit 60', 'Stop street ahead'] },
      { id: 'flagman-stop', sign: 'stop', answer: 'Stay still until he signals you to go', options: ['Stay still until he signals you to go', 'Slow down and pass', 'Hoot and go', 'Turn around'] },
    ],
  },
  {
    id: 'warning',
    eyebrow: 'Rules of the Road',
    title: 'Speed, Towing & Parking',
    detail: 'Real exam rules: speed limits, towing distance, and where you may not stop.',
    count: 7,
    accent: 'teal',
    questions: [
      { id: 'speed-town', sign: 'speed', answer: '60 km/h in towns', options: ['60 km/h in towns', '100 km/h in towns', '120 km/h in towns', '80 km/h in towns'] },
      { id: 'speed-out', sign: 'speed', answer: '100 km/h outside towns', options: ['100 km/h outside towns', '60 km/h outside towns', '120 km/h outside towns', '80 km/h outside towns'] },
      { id: 'speed-freeway', sign: 'speed', answer: '120 km/h on freeways', options: ['120 km/h on freeways', '100 km/h on freeways', '60 km/h on freeways', '160 km/h on freeways'] },
      { id: 'tow-max-dist', sign: 'no-entry', answer: 'Rope/chain may not be longer than 3.5m', options: ['Rope/chain may not be longer than 3.5m', 'May be 10m long', 'May be 1m long only', 'May be 5m long'] },
      { id: 'tow-flag-when', sign: 'no-entry', answer: 'If rope is longer than 1.8m, hang red flag', options: ['If rope is longer than 1.8m, hang red flag', 'If rope is longer than 3.5m, hang white flag', 'Never need a flag', 'Always need white flag'] },
      { id: 'tow-max-speed', sign: 'speed', answer: '30 km/h unless you use a solid bar', options: ['30 km/h unless you use a solid bar', '60 km/h always', '120 km/h on freeway', '100 km/h always'] },
      { id: 'where-no-stop', sign: 'stop', answer: 'On a painted island in the road', options: ['On a painted island in the road', 'Inside a marked parking bay', 'At a stop street', 'At a yield sign'] },
    ],
  },
];

function SignIllustration({ type, large = false }: { type: SignType; large?: boolean }) {
  const label = {
    stop: 'Stop road sign',
    yield: 'Yield road sign',
    speed: '60 speed limit road sign',
    'no-entry': 'No entry road sign',
    pedestrian: 'Pedestrian crossing road sign',
    'traffic-light': 'Traffic signal road sign',
    roundabout: 'Roundabout road sign',
  }[type];
  const common = { role: 'img', 'aria-label': label, 'data-testid': `sign-illustration-${type}` };
  const pole = <path d="M110 157v40" stroke="#b7b9b1" strokeWidth="6" strokeLinecap="round" />;
  if (type === 'stop') return <svg {...common} viewBox="0 0 220 220" className={large ? 'h-64 w-64 sm:h-72 sm:w-72' : 'h-28 w-28'}>{pole}<polygon points="110,25 153,43 171,86 153,129 110,147 67,129 49,86 67,43" fill="#dd4e3d" stroke="#f8f1de" strokeWidth="7" /><polygon points="110,34 146,49 161,86 146,122 110,138 74,122 59,86 74,49" fill="none" stroke="#932e2c" strokeWidth="3" /><text x="110" y="94" textAnchor="middle" fill="#fffaf0" fontFamily="Manrope, sans-serif" fontSize="25" fontWeight="800" letterSpacing="1">STOP</text></svg>;
  if (type === 'yield') return <svg {...common} viewBox="0 0 220 220" className={large ? 'h-64 w-64 sm:h-72 sm:w-72' : 'h-28 w-28'}>{pole}<path d="M110 27 180 146H40Z" fill="#f7f2e6" stroke="#dd4e3d" strokeWidth="12" strokeLinejoin="round" /><path d="M110 51 157 132H63Z" fill="#f7f2e6" /></svg>;
  if (type === 'speed') return <svg {...common} viewBox="0 0 220 220" className={large ? 'h-64 w-64 sm:h-72 sm:w-72' : 'h-28 w-28'}>{pole}<circle cx="110" cy="87" r="64" fill="#f8f3e7" stroke="#dd4e3d" strokeWidth="12" /><circle cx="110" cy="87" r="56" fill="none" stroke="#d5d2c5" strokeWidth="2" /><text x="110" y="96" textAnchor="middle" fill="#263d42" fontFamily="DM Mono, monospace" fontSize="45" fontWeight="500">60</text><text x="110" y="116" textAnchor="middle" fill="#263d42" fontFamily="Manrope, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.5">km/h</text></svg>;
  if (type === 'no-entry') return <svg {...common} viewBox="0 0 220 220" className={large ? 'h-64 w-64 sm:h-72 sm:w-72' : 'h-28 w-28'}>{pole}<circle cx="110" cy="87" r="65" fill="#dd4e3d" stroke="#f8f1de" strokeWidth="7" /><path d="M69 87h82" stroke="#f9f2e1" strokeWidth="16" strokeLinecap="round" /></svg>;
  if (type === 'pedestrian') return <svg {...common} viewBox="0 0 220 220" className={large ? 'h-64 w-64 sm:h-72 sm:w-72' : 'h-28 w-28'}>{pole}<path d="M110 24 175 137H45Z" fill="#f4efe1" stroke="#efb82d" strokeWidth="12" strokeLinejoin="round" /><circle cx="110" cy="66" r="8" fill="#263d42" /><path d="m110 78-15 24 18 9 10 25M96 101l-14 18m31-8 17 8 11 18" fill="none" stroke="#263d42" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (type === 'traffic-light') return <svg {...common} viewBox="0 0 220 220" className={large ? 'h-64 w-64 sm:h-72 sm:w-72' : 'h-28 w-28'}>{pole}<path d="M75 25h70v124H75z" fill="#263d42" stroke="#f8f1de" strokeWidth="7" rx="10" /><circle cx="110" cy="56" r="16" fill="#dd4e3d" /><circle cx="110" cy="87" r="16" fill="#efb82d" /><circle cx="110" cy="118" r="16" fill="#3c9c8b" /></svg>;
  return <svg {...common} viewBox="0 0 220 220" className={large ? 'h-64 w-64 sm:h-72 sm:w-72' : 'h-28 w-28'}>{pole}<circle cx="110" cy="87" r="65" fill="#f8f3e7" stroke="#263d42" strokeWidth="7" /><path d="M110 48c-23 0-42 19-42 42s19 42 42 42" fill="none" stroke="#dd4e3d" strokeWidth="14" /><path d="m84 71-16 19 22 5" fill="none" stroke="#dd4e3d" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" /><path d="M110 126c23 0 42-19 42-42s-19-42-42-42" fill="none" stroke="#263d42" strokeWidth="14" /><path d="m136 103 16-19-22-5" fill="none" stroke="#263d42" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background antialiased selection:bg-[#efb82d]/30">
          <main className="w-full">
            <Switch>
              <Route path="/">
