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
    eyebrow: 'PDF p5-12',
    title: 'Controls & Basics',
    detail: 'From 105p PDF - mirrors, clutch, stop/yield real rules.',
    count: 5,
    accent: 'sun',
    questions: [
      { id: 'stop', sign: 'stop', answer: 'Stop', options: ['Stop', 'Yield', 'No entry', 'Speed limit'] },
      { id: 'yield', sign: 'yield', answer: 'Yield', options: ['Yield', 'Stop', 'Roundabout', 'Pedestrian crossing'] },
      { id: 'speed', sign: 'speed', answer: 'Speed limit', options: ['No entry', 'Speed limit', 'Stop', 'Traffic signal'] },
      { id: 'no-entry', sign: 'no-entry', answer: 'No entry', options: ['No entry', 'Yield', 'Stop', 'Speed limit'] },
      { id: 'pedestrian', sign: 'pedestrian', answer: 'Pedestrian crossing', options: ['Traffic signal', 'No entry', 'Pedestrian crossing', 'Roundabout'] },
    ],
  },
  {
    id: 'control',
    eyebrow: 'PDF p18-27',
    title: 'Control Signs',
    detail: 'Overhead signals from PDF p25 - red cross/green arrow.',
    count: 5,
    accent: 'coral',
    questions: [
      { id: 'roundabout', sign: 'roundabout', answer: 'Roundabout', options: ['Roundabout', 'No entry', 'Yield', 'Keep left'] },
      { id: 'light', sign: 'traffic-light', answer: 'Traffic signal', options: ['Stop', 'Traffic signal', 'Pedestrian crossing', 'Speed limit'] },
      { id: 'yield-2', sign: 'yield', answer: 'Yield', options: ['No entry', 'Yield', 'Roundabout', 'Stop'] },
      { id: 'stop-2', sign: 'stop', answer: 'Stop', options: ['Speed limit', 'Stop', 'Traffic signal', 'Yield'] },
      { id: 'no-entry-2', sign: 'no-entry', answer: 'No entry', options: ['Keep left', 'No entry', 'Stop', 'Roundabout'] },
    ],
  },
  {
    id: 'warning',
    eyebrow: 'PDF p92-103',
    title: 'Rules of Road',
    detail: 'Towing 3.5m max 30km/h, no stop on island, bus lanes 6-9am.',
    count: 7,
    accent: 'teal',
    questions: [
      { id: 'speed-2', sign: 'speed', answer: 'Speed limit', options: ['Speed limit', 'Stop', 'Yield', 'No entry'] },
      { id: 'pedestrian-2', sign: 'pedestrian', answer: 'Pedestrian crossing', options: ['Roundabout', 'No entry', 'Pedestrian crossing', 'Traffic signal'] },
      { id: 'light-2', sign: 'traffic-light', answer: 'Traffic signal', options: ['Yield', 'Traffic signal', 'Stop', 'Speed limit'] },
      { id: 'roundabout-2', sign: 'roundabout', answer: 'Roundabout', options: ['Roundabout', 'Pedestrian crossing', 'No entry', 'Stop'] },
      { id: 'stop-3', sign: 'stop', answer: 'Stop', options: ['Yield', 'Stop', 'Keep left', 'Traffic signal'] },
      { id: 'yield-3', sign: 'yield', answer: 'Yield', options: ['No entry', 'Yield', 'Speed limit', 'Roundabout'] },
      { id: 'speed-3', sign: 'speed
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

function Stat({ icon, value, label, accent = 'yellow' }: { icon: ReactNode; value: string; label: string; accent?: string }) {
  return <div className="flex items-center gap-3" data-testid={`stat-${label.toLowerCase().replaceAll(' ', '-')}`}><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent === 'coral' ? 'bg-[#dd4e3d]/15 text-[#dd4e3d]' : accent === 'teal' ? 'bg-[#3c9c8b]/15 text-[#287b70]' : 'bg-[#efb82d]/20 text-[#8a6700]'}`}>{icon}</div><div><div className="k53-mono text-lg font-medium leading-none text-[#263d42]">{value}</div><div className="mt-1 text-[11px] font-bold uppercase tracking-[.14em] text-[#6d7977]">{label}</div></div></div>;
}

function Brand({ compact = false, inverted = false }: { compact?: boolean; inverted?: boolean }) {
  return <div className="flex items-center gap-3" data-testid="brand-k53"><div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#efb82d] text-[#263d42] shadow-[4px_4px_0_#c38f18]"><span className="k53-display text-xl font-bold">K</span><span className="absolute bottom-[6px] right-[7px] h-1.5 w-1.5 rounded-full bg-[#dd4e3d]" /></div>{!compact && <div><div className={`k53-display text-[21px] font-bold leading-none tracking-[-.04em] ${inverted ? 'text-[#263d42]' : 'text-[#f8f1de]'}`}>roadwise</div><div className={`k53-mono mt-1 text-[9px] uppercase tracking-[.16em] ${inverted ? 'text-[#71807d]' : 'text-[#9cafaa]'}`}>K53 companion</div></div>}</div>;
}

function Home({ progress, onStart, onReset }: { progress: Progress; onStart: (set: PracticeSet) => void; onReset: () => void }) {
  const accuracy = progress.totalAnswered ? Math.round((progress.correct / progress.totalAnswered) * 100) : 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  return <div className="k53-shell min-h-[100dvh] bg-[#f1ecde]">
    <aside className="k53-sidebar fixed inset-y-0 left-0 z-30 hidden w-[238px] flex-col px-5 py-7 lg:flex">
      <Brand />
      <div className="mt-16 text-[10px] font-bold uppercase tracking-[.2em] text-[#778d8a]">Your route</div>
      <nav className="mt-4 space-y-2" aria-label="Primary navigation">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex w-full items-center gap-3 rounded-xl bg-[#efb82d] px-3 py-3 text-left text-sm font-extrabold text-[#263d42]" data-testid="button-home-nav"><HomeIcon size={17} /><span>Today</span><span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#dd4e3d]" /></button>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#b1c1bd] transition hover:bg-[#294950]" onClick={() => onStart(SETS[2])} data-testid="button-mixed-nav"><Zap size={17} /><span>Quick mix</span></button>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#b1c1bd] transition hover:bg-[#294950]" onClick={() => onStart(SETS[1])} data-testid="button-control-nav"><Target size={17} /><span>Control signs</span></button>
      </nav>
      <div className="mt-auto rounded-2xl border border-[#3a575a] bg-[#294950] p-4"><div className="flex items-center gap-2 text-[#efb82d]"><ShieldCheck size={16} /><span className="text-xs font-bold">Ready when you are</span></div><p className="mt-2 text-[11px] leading-relaxed text-[#a9bbb5]">One short set a day keeps the signs familiar.</p></div>
      <div className="relative mt-5 flex items-center justify-between text-[#829792]"><span className="text-[10px] font-bold uppercase tracking-[.16em]">v1.0 · ZA</span><button onClick={() => setSettingsOpen((value) => !value)} className="rounded-lg p-2 transition hover:bg-[#294950] hover:text-[#f8f1de]" aria-label="Settings" data-testid="button-settings"><Settings2 size={16} /></button>{settingsOpen && <div className="absolute bottom-12 right-0 w-52 rounded-xl border border-[#3a575a] bg-[#294950] p-3 text-[11px] leading-relaxed text-[#c0cec9]" role="status" data-testid="panel-settings">Your results are saved locally on this device.<button onClick={() => setSettingsOpen(false)} className="mt-2 block font-bold text-[#efb82d]" data-testid="button-close-settings">Close</button></div>}</div>
    </aside>
    <main className="lg:ml-[238px]">
      <header className="relative flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-8"><div className="lg:hidden"><Brand compact /></div><div className="hidden text-[11px] font-bold uppercase tracking-[.19em] text-[#72807c] lg:block">Monday, 24 June 2024 <span className="mx-2 text-[#dd4e3d]">/</span> Pretoria</div><div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-full border border-[#d9d1be] bg-[#f8f3e7] px-3 py-2 text-xs font-bold text-[#61706d] sm:flex"><Flame size={14} className="text-[#dd4e3d]" /> {progress.streak || 0} day streak</div><button onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d9d1be] bg-[#f8f3e7] text-[#526562] lg:hidden" data-testid="button-mobile-menu"><Menu size={18} /></button><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#263d42] text-xs font-extrabold text-[#efb82d]" data-testid="avatar-learner">LM</div></div>{menuOpen && <div className="absolute right-5 top-[72px] z-20 w-48 rounded-2xl border border-[#d9d1be] bg-[#f8f3e7] p-2 shadow-xl sm:right-8" data-testid="menu-mobile-nav"><button onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-xs font-extrabold text-[#263d42] hover:bg-[#eee5d3]" data-testid="button-mobile-home"><HomeIcon size={15} /> Today</button><button onClick={() => { setMenuOpen(false); onStart(SETS[2]); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-xs font-extrabold text-[#263d42] hover:bg-[#eee5d3]" data-testid="button-mobile-mix"><Zap size={15} /> Quick mix</button><button onClick={() => { setMenuOpen(false); onStart(SETS[1]); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-xs font-extrabold text-[#263d42] hover:bg-[#eee5d3]" data-testid="button-mobile-control"><Target size={15} /> Control signs</button></div>}</header>
      <div className="mx-auto max-w-[1220px] px-5 pb-12 sm:px-8 lg:px-12">
        <section className="k53-rise grid gap-7 pt-5 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:pt-12">
          <div><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e2c35b] bg-[#f8e8a8] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#735b12]"><Sparkles size={13} /> Daily visual drill</div><h1 className="k53-display max-w-[680px] text-[clamp(3.3rem,7vw,6.8rem)] font-bold leading-[.86] text-[#263d42]">Know the road.<br /><span className="text-[#dd4e3d]">Own the drive.</span></h1><p className="mt-7 max-w-[460px] text-[15px] leading-relaxed text-[#61706d]">A sharp, five-minute practice companion for the signs that matter on South African roads.</p></div>
          <div className="k53-card relative overflow-hidden rounded-[24px] p-5 sm:p-6"><div className="absolute -right-10 -top-14 h-36 w-36 rounded-full border-[18px] border-[#efb82d]/25" /><div className="relative flex items-start justify-between"><div><div className="k53-mono text-[10px] uppercase tracking-[.16em] text-[#70807b]">Your progress</div><div className="mt-2 flex items-end gap-2"><span className="k53-display text-5xl font-bold text-[#263d42]" data-testid="text-accuracy">{accuracy}%</span><span className="mb-2 text-xs font-bold text-[#71807d]">accuracy</span></div></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#efb82d] text-[#263d42]"><Trophy size={21} /></div></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-[#e3ddce]" aria-label={`${accuracy}% accuracy progress`}><div className="h-full rounded-full bg-[#3c9c8b] transition-all duration-500" style={{ width: `${accuracy}%` }} /></div><div className="mt-3 flex justify-between text-[11px] font-semibold text-[#76827f]"><span data-testid="text-answered">{progress.totalAnswered} signs answered</span><span>{progress.sessions} sessions</span></div></div>
        </section>
        <section className="mt-16 sm:mt-20"><div className="mb-5 flex items-end justify-between"><div><div className="k53-mono text-[10px] font-medium uppercase tracking-[.18em] text-[#dd4e3d]">Choose your route</div><h2 className="k53-display mt-2 text-3xl font-bold text-[#263d42]">Pick a practice set</h2></div><div className="hidden items-center gap-2 text-xs font-bold text-[#74807d] sm:flex"><Clock3 size={15} /> 5–8 min each</div></div><div className="grid gap-4 md:grid-cols-3">{SETS.map((set, index) => <button key={set.id} onClick={() => onStart(set)} className={`k53-card k53-rise k53-delay-${index + 1} group relative min-h-[260px] overflow-hidden rounded-[22px] p-5 text-left transition hover:-translate-y-1 ${set.id === 'starter' ? 'border-[#d4af39]' : ''}`} data-testid={`button-practice-set-${set.id}`}><div className={`absolute -right-8 -top-10 h-36 w-36 rounded-full ${set.accent === 'coral' ? 'bg-[#dd4e3d]/10' : set.accent === 'teal' ? 'bg-[#3c9c8b]/10' : 'bg-[#efb82d]/20'}`} /><div className="relative flex h-full flex-col"><div className="flex items-center justify-between"><span className="k53-mono text-[10px] uppercase tracking-[.16em] text-[#73807b]">{set.eyebrow}</span><span className="rounded-full bg-[#e4ddd0] px-2.5 py-1 k53-mono text-[10px] text-[#66736f]">{set.count} signs</span></div><h3 className="k53-display mt-9 text-[27px] font-bold leading-none text-[#263d42]">{set.title}</h3><p className="mt-3 max-w-[220px] text-xs leading-relaxed text-[#71807d]">{set.detail}</p><div className="mt-auto flex items-center justify-between pt-6"><span className="text-xs font-extrabold text-[#263d42]">Start practice</span><span className={`flex h-9 w-9 items-center justify-center rounded-full transition group-hover:translate-x-1 ${set.accent === 'coral' ? 'bg-[#dd4e3d] text-[#f8f1de]' : set.accent === 'teal' ? 'bg-[#3c9c8b] text-[#f8f1de]' : 'bg-[#efb82d] text-[#263d42]'}`}><ArrowRight size={16} /></span></div></div></button>)}</div></section>
        <section className="mt-12 grid gap-4 sm:grid-cols-3"><div className="k53-card rounded-[20px] p-5"><Stat icon={<Target size={18} />} value={`${progress.correct}`} label="Correct signs" accent="teal" /></div><div className="k53-card rounded-[20px] p-5"><Stat icon={<Flame size={18} />} value={`${progress.streak} days`} label="Current streak" accent="coral" /></div><div className="k53-card rounded-[20px] p-5"><Stat icon={<BookOpen size={18} />} value={progress.lastSet} label="Last practiced" /></div></section>
        {progress.totalAnswered > 0 && <div className="mt-5 flex justify-end"><button className="inline-flex items-center gap-2 text-xs font-bold text-[#78837f] underline decoration-[#d4c8b0] underline-offset-4 transition hover:text-[#dd4e3d]" onClick={onReset} data-testid="button-reset-progress"><RotateCcw size={13} /> Reset progress</button></div>}
      </div>
    </main>
  </div>;
}

function Practice({ set, onFinish }: { set: PracticeSet; onFinish: (answers: number, correct: number) => void }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const question = set.questions[index];
  const answered = picked !== null;
  const selectAnswer = (option: string) => {
    if (answered) return;
    setPicked(option);
    if (option === question.answer) setCorrect((value) => value + 1);
  };
  const next = () => {
    if (index === set.questions.length - 1) onFinish(set.questions.length, correct + (picked === question.answer ? 1 : 0));
    else { setIndex((value) => value + 1); setPicked(null); }
  };
  return <div className="k53-shell min-h-[100dvh] bg-[#f1ecde]"><main className="mx-auto max-w-[1060px] px-5 py-6 sm:px-8 sm:py-10"><header className="flex items-center justify-between"><button onClick={() => onFinish(0, 0)} className="flex items-center gap-2 text-xs font-extrabold text-[#667572] transition hover:text-[#dd4e3d]" data-testid="button-exit-practice"><ChevronLeft size={17} /> Exit</button><div className="flex items-center gap-3"><Brand compact /><span className="hidden border-l border-[#d9d1be] pl-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#78837f] sm:block">{set.title}</span></div><div className="k53-mono text-xs font-medium text-[#6e7c78]" data-testid="text-question-count">{String(index + 1).padStart(2, '0')} <span className="text-[#c4bba9]">/</span> {String(set.questions.length).padStart(2, '0')}</div></header><div className="mt-8 h-1.5 overflow-hidden rounded-full bg-[#ddd6c6]"><div className="h-full rounded-full bg-[#dd4e3d] transition-all duration-500" style={{ width: `${((index + 1) / set.questions.length) * 100}%` }} /></div><section className="mt-10 grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center"><div className="k53-rise"><div className="k53-mono text-[10px] uppercase tracking-[.18em] text-[#dd4e3d]">Identify the sign</div><h1 className="k53-display mt-3 max-w-[420px] text-[clamp(2.8rem,6vw,5.4rem)] font-bold leading-[.88] text-[#263d42]">What does<br />this sign mean?</h1><p className="mt-5 max-w-[300px] text-sm leading-relaxed text-[#76817d]">Trust the shape first. Choose the name that matches.</p><div className="mt-8 hidden items-center gap-3 text-xs font-bold text-[#78837f] sm:flex"><CircleHelp size={16} className="text-[#efb82d]" /> No hints. You know this.</div></div><div className="k53-card k53-pop relative flex min-h-[370px] items-center justify-center overflow-hidden rounded-[30px] bg-[#e8e1d2] p-7"><div className="absolute inset-x-0 bottom-0 h-14 opacity-20 k53-road" /><div className="absolute left-6 top-6 k53-mono text-[10px] uppercase tracking-[.16em] text-[#9c988d]">South Africa · K53</div><div className="relative drop-shadow-[0_20px_12px_rgba(38,61,66,.18)]"><SignIllustration type={question.sign} large /></div></div></section><section className="mx-auto mt-9 max-w-[850px]"><div className="grid gap-3 sm:grid-cols-2">{question.options.map((option, optionIndex) => { const isRight = option === question.answer; const isPicked = option === picked; const stateClass = answered && isRight ? 'border-[#3c9c8b] bg-[#dff0e9] text-[#246e64]' : answered && isPicked ? 'border-[#dd4e3d] bg-[#f7dfd7] text-[#a43831]' : 'border-[#d9d1be] bg-[#f8f3e7] text-[#30484c] hover:border-[#a9bbb5]'; return <button key={option} disabled={answered} onClick={() => selectAnswer(option)} className={`k53-choice flex min-h-[62px] items-center justify-between rounded-2xl border px-5 text-left text-sm font-extrabold ${stateClass}`} data-testid={`button-answer-${optionIndex}`}><span>{option}</span>{answered && isRight && <Check size={18} />}{answered && isPicked && !isRight && <X size={18} />}</button>; })}</div>{answered && <div className={`mt-5 flex items-center justify-between rounded-2xl border px-4 py-3 ${picked === question.answer ? 'border-[#abd2c8] bg-[#dff0e9]' : 'border-[#e7b6aa] bg-[#f7dfd7]'}`} role="status" data-testid="status-answer-feedback"><div className="flex items-center gap-3">{picked === question.answer ? <div className="rounded-full bg-[#3c9c8b] p-1 text-white"><Check size={14} /></div> : <div className="rounded-full bg-[#dd4e3d] p-1 text-white"><X size={14} /></div>}<span className="text-sm font-extrabold text-[#30484c]">{picked === question.answer ? 'Correct call.' : `The answer is ${question.answer}.`}</span></div><button onClick={next} className="inline-flex items-center gap-2 rounded-xl bg-[#263d42] px-4 py-2.5 text-xs font-extrabold text-[#f8f1de] transition hover:bg-[#dd4e3d]" data-testid="button-next-sign">{index === set.questions.length - 1 ? 'See results' : 'Next sign'} <ChevronRight size={15} /></button></div>}</section></main></div>;
}

function Results({ set, answers, correct, onReplay, onHome }: { set: PracticeSet; answers: number; correct: number; onReplay: () => void; onHome: () => void }) {
  const accuracy = answers ? Math.round((correct / answers) * 100) : 0;
  const message = accuracy >= 80 ? 'You read the road well.' : accuracy >= 50 ? 'Good instincts. Keep the rhythm.' : 'Every sign is one step closer.';
  return <div className="k53-shell min-h-[100dvh] bg-[#f1ecde]"><main className="mx-auto max-w-[920px] px-5 py-8 sm:px-8 sm:py-12"><header className="flex items-center justify-between"><Brand inverted /><button onClick={onHome} className="text-xs font-extrabold text-[#667572] underline decoration-[#d4c8b0] underline-offset-4 hover:text-[#dd4e3d]" data-testid="button-results-home">Back to home</button></header><section className="k53-rise mt-16 text-center sm:mt-20"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#efb82d] text-[#263d42] shadow-[5px_5px_0_#c38f18]"><Trophy size={29} /></div><div className="k53-mono mt-8 text-[10px] uppercase tracking-[.2em] text-[#dd4e3d]">Set complete · {set.title}</div><h1 className="k53-display mt-3 text-[clamp(3.2rem,7vw,6rem)] font-bold leading-[.88] text-[#263d42]">{message}</h1><p className="mx-auto mt-5 max-w-[390px] text-sm leading-relaxed text-[#74817d]">A quick result is still progress. Come back tomorrow and make the signs feel automatic.</p></section><section className="k53-card mx-auto mt-12 grid max-w-[700px] overflow-hidden rounded-[26px] sm:grid-cols-3"><div className="border-b border-[#ddd5c5] p-6 text-center sm:border-b-0 sm:border-r"><div className="k53-mono text-5xl font-medium text-[#263d42]" data-testid="text-results-accuracy">{accuracy}%</div><div className="mt-2 text-[10px] font-extrabold uppercase tracking-[.15em] text-[#7a8581]">Accuracy</div></div><div className="border-b border-[#ddd5c5] p-6 text-center sm:border-b-0 sm:border-r"><div className="k53-mono text-5xl font-medium text-[#263d42]" data-testid="text-results-correct">{correct}<span className="text-2xl text-[#a5aea8]">/{answers}</span></div><div className="mt-2 text-[10px] font-extrabold uppercase tracking-[.15em] text-[#7a8581]">Correct signs</div></div><div className="p-6 text-center"><div className="k53-mono text-5xl font-medium text-[#263d42]">+{correct * 10}</div><div className="mt-2 text-[10px] font-extrabold uppercase tracking-[.15em] text-[#7a8581]">Road points</div></div></section><div className="mx-auto mt-8 flex max-w-[700px] flex-col gap-3 sm:flex-row"><button onClick={onReplay} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#263d42] px-5 py-4 text-sm font-extrabold text-[#f8f1de] transition hover:bg-[#dd4e3d]" data-testid="button-replay-set"><RotateCcw size={17} /> Run it again</button><button onClick={onHome} className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#d6cdbb] bg-[#f8f3e7] px-5 py-4 text-sm font-extrabold text-[#30484c] transition hover:border-[#9dafaa]" data-testid="button-choose-another">Choose another set <ArrowRight size={17} /></button></div></main></div>;
}

function HomeWithPersistence() {
  const [screen, setScreen] = useState<Screen>('home');
  const [activeSet, setActiveSet] = useState<PracticeSet>(SETS[0]);
  const [result, setResult] = useState({ answers: 0, correct: 0 });
  const [progress, setProgress] = useState<Progress>(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('k53-progress');
      if (raw) setProgress({ ...EMPTY_PROGRESS, ...JSON.parse(raw) });
    } catch { setStorageError(true); }
    const timer = window.setTimeout(() => setHydrated(true), 260);
    return () => window.clearTimeout(timer);
  }, []);
  const start = (set: PracticeSet) => { setActiveSet(set); setScreen('practice'); };
  const finish = (answers: number, correct: number) => {
    if (answers > 0) {
      const next = { totalAnswered: progress.totalAnswered + answers, correct: progress.correct + correct, sessions: progress.sessions + 1, streak: progress.streak + 1, lastSet: activeSet.title };
      setProgress(next);
      try { window.localStorage.setItem('k53-progress', JSON.stringify(next)); } catch { setStorageError(true); }
      setResult({ answers, correct });
      setScreen('results');
    } else setScreen('home');
  };
  const reset = () => { setProgress(EMPTY_PROGRESS); try { window.localStorage.removeItem('k53-progress'); } catch { setStorageError(true); } };
  if (!hydrated) return <div className="flex min-h-[100dvh] items-center justify-center bg-[#f1ecde]"><div className="w-full max-w-md space-y-4 px-6" aria-label="Loading progress" data-testid="loading-progress"><div className="h-7 w-44 animate-pulse rounded-lg bg-[#ddd5c5]" /><div className="h-3 w-64 animate-pulse rounded bg-[#e4ddcf]" /><div className="h-44 animate-pulse rounded-[24px] bg-[#e4ddcf]" /></div></div>;
  return <>{storageError && <div className="fixed inset-x-0 top-0 z-50 bg-[#dd4e3d] px-4 py-2 text-center text-xs font-bold text-[#fff9ee]" role="alert" data-testid="alert-storage-error">Progress could not be saved on this device. <button className="ml-2 underline" onClick={() => setStorageError(false)} data-testid="button-dismiss-storage-error">Dismiss</button></div>}{screen === 'home' && <Home progress={progress} onStart={start} onReset={reset} />}{screen === 'practice' && <Practice set={activeSet} onFinish={finish} />}{screen === 'results' && <Results set={activeSet} answers={result.answers} correct={result.correct} onReplay={() => start(activeSet)} onHome={() => setScreen('home')} />}</>;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={HomeWithPersistence} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
