import React, { useState } from 'react';
import { useAppState } from './AppContext';
import { 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Calendar, 
  Activity, 
  Milestone, 
  Moon, 
  CheckCircle2, 
  TrendingUp, 
  Brain, 
  Zap, 
  RefreshCw, 
  Award,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DataHistoryScreen: React.FC = () => {
  const { dailyLogs, navigate, profile, activity } = useAppState();
  const [activeTab, setActiveTab] = useState<'history' | 'analysis'>('history');
  const [filterPeriod, setFilterPeriod] = useState<'7days' | 'monthly' | 'custom'>('7days');
  const [expandedLog, setExpandedLog] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedDayPoint, setSelectedDayPoint] = useState<number>(6); // Default to last day (Today)

  // AI Advice state variables
  const [aiReportId, setAiReportId] = useState<number>(0);
  const aiCoachResponses = [
    {
      score: 88,
      status: "최적화 상태",
      insights: [
        `걸음수 규칙성 매우 우수: 주간 평균 걸음 수(${activity.steps.toLocaleString()}보)는 목표의 84% 수준으로 양호한 활성 비율을 기록하고 있습니다.`,
        "수면 및 아침 피로 복원: 수면 효율 대비 깊은 수면 비율이 24%에 도달하여 수면 주기 밸런스가 조화롭습니다. 가벼운 유산소는 숙면에 긍정적 기여를 합니다.",
        "칼로리 활성 연소 패턴: 일평균 약 350kcal의 활동 대사를 기록하여 심폐 지구성 건강 및 기초 근성 확보에 우수한 규칙성을 보여주고 있습니다."
      ],
      recommendation: "현재 수면과 보행 리듬이 밸런스를 구성하고 있습니다. 유지를 위해 취침 1시간 전 스트레칭을 루틴화하고, 걷기 중간에 템포를 한 차례 올려 심박수를 증가시켜 보세요!"
    },
    {
      score: 92,
      status: "최상의 퍼포먼스",
      insights: [
        `보행량 초과 달성: 오늘 및 최근 성과(${activity.steps.toLocaleString()}보)가 연속적으로 향상되며 유산소 페이싱이 매우 정교하게 형성되어 있습니다.`,
        "숙면 지수 시너지: 수면 및 심폐 리커버리 상태가 점진적으로 안정을 되찾아, 오전 에너지 활성화 점수가 평균 15% 상승했습니다.",
        "대사율 안정화: 지속적인 신진대사가 이루어지며 근육 피로를 축적하지 않고 에너지를 순환시키는 최적의 에어로빅 환경이 구성되었습니다."
      ],
      recommendation: "신체 에너지 수준이 극대화된 시기입니다. 주말 레저 활동이나 러닝 거리를 소폭 상향 조정하여 한계를 넓혀보셔도 좋습니다. 과훈련 방지를 위해 따뜻한 온수 샤워를 더해 보세요."
    },
    {
      score: 83,
      status: "회복 페이스 필요",
      insights: [
        "수면 시간의 일시적 하락: 최근 평균 수면 시간이 다소 부족하여 다음 날 피로 누적 및 에너지 수준의 낙차 폭이 다소 감지됩니다.",
        "보행 강도 최적화 제안: 강도 높은 운동보다는 평탄한 지면의 가벼운 보행으로 젖산 산화 및 리커버리를 촉진할 것을 제안합니다.",
        "수치 요약: 일평균 활성 대사 효율은 일정하지만, 오전 수치 피드백이 다소 정체되어 회복 리듬 전환이 시급해 보입니다."
      ],
      recommendation: `${profile.name}님, 가벼운 저녁 산책 정도로 발목 및 무릎 관절을 정렬 처리하고 산소공급을 늘린 뒤, 평상시보다 30분 일찍 취침하여 충전을 최우선 리듬으로 교정해 주시길 조언합니다.`
    }
  ];

  const handleReanalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAiReportId(prev => (prev + 1) % aiCoachResponses.length);
    }, 2000);
  };

  const toggleExpandLog = (index: number) => {
    setExpandedLog(expandedLog === index ? null : index);
  };

  const handleExport = () => {
    setExporting(true);
    setExportComplete(false);
    setTimeout(() => {
      setExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    }, 1800);
  };

  // Activity chart data for the period summary (7 days)
  const barHeights = [45, 60, 30, 80, 55, 40, 90]; 
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayDetails = [
    { steps: 6100, calories: 250, sleep: "7h 10m", score: 78, tag: "가벼운 활동" },
    { steps: 8200, calories: 340, sleep: "6h 45m", score: 81, tag: "목표 도달 중" },
    { steps: 4120, calories: 120, sleep: "8h 15m", score: 75, tag: "회복 및 휴식" },
    { steps: 10900, calories: 480, sleep: "7h 30m", score: 92, tag: "목표 달성!" },
    { steps: 7500, calories: 310, sleep: "7h 05m", score: 83, tag: "일반 활동" },
    { steps: 5600, calories: 215, sleep: "8h 00m", score: 80, tag: "충전 데이" },
    { steps: activity.steps, calories: activity.caloriesKcal, sleep: "7h 20m", score: 88, tag: "실시간 분석" }
  ];

  const currentCoach = aiCoachResponses[aiReportId];

  return (
    <div className="flex flex-col gap-6 px-5 pb-28 pt-4">
      {/* Target header using branding navigate connection with a push_back animation */}
      <header className="flex items-center justify-between border-b border-white/5 bg-[#131313]/55 pb-3">
        <h1 
          onClick={() => navigate('dashboard', 'push_back')}
          className="cursor-pointer text-xl font-bold tracking-tight text-white select-none hover:text-brand-primary transition"
        >
          VitalStep
        </h1>
        <div className="rounded-full bg-white/5 p-1.5 text-gray-500">
          <Calendar size={18} />
        </div>
      </header>

      {/* Primary Titles & Header Tab Switches */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-1.5"
        >
          <span className="text-[11px] font-bold tracking-widest text-brand-primary uppercase">
            STETHANOS BIOMETRICS
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {activeTab === 'history' ? 'Data History' : 'Trend Analysis'}
          </h2>
        </motion.div>

        {/* Tab switch for History vs Data Analysis */}
        <div className="grid grid-cols-2 gap-2 bg-[#1c1b1b] p-1.5 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('history')}
            className={`rounded-lg py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'history' 
                ? 'bg-[#2a2a2a] text-brand-primary border border-white/10 shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            기록 보관함
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`rounded-lg py-2.5 text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 ${
              activeTab === 'analysis' 
                ? 'bg-[#2a2a2a] text-brand-primary border border-white/10 shadow-md' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp size={14} />
            데이터 분석
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'history' ? (
          <motion.div
            key="history-tab"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex flex-col gap-6"
          >
            {/* Toggle Filter Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-[#1c1b1b] p-1.5 rounded-xl border border-white/5">
              <button
                onClick={() => setFilterPeriod('7days')}
                className={`rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  filterPeriod === '7days' 
                    ? 'bg-brand-primary text-[#002e6a] shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setFilterPeriod('monthly')}
                className={`rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  filterPeriod === 'monthly' 
                    ? 'bg-brand-primary text-[#002e6a] shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setFilterPeriod('custom')}
                className={`rounded-lg py-2 text-xs font-semibold uppercase tracking-wide transition flex items-center justify-center gap-1.5 ${
                  filterPeriod === 'custom' 
                    ? 'bg-brand-primary text-[#002e6a] shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>Custom Range</span>
              </button>
            </div>

            {/* Period Summary Dashboard Card */}
            <div className="rounded-2xl border border-white/10 bg-[#1c1b1b] p-6 shadow-xl">
              <span className="text-[11px] font-bold tracking-wider text-brand-primary uppercase">
                PERIOD SUMMARY
              </span>

              {/* Triple metrics summary columns */}
              <div className="grid grid-cols-3 gap-4 mt-5 pb-5 border-b border-white/5">
                <div className="space-y-1">
                  <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block">STEPS</span>
                  <span className="font-mono text-xl font-bold text-white tracking-tight block sm:text-2xl">
                    64,280
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block">CALORIES</span>
                  <span className="font-mono text-xl font-bold text-brand-secondary tracking-tight block sm:text-2xl">
                    2,450
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block">SLEEP</span>
                  <span className="font-mono text-xl font-bold text-brand-tertiary tracking-tight block sm:text-2xl">
                    54h 20m
                  </span>
                </div>
              </div>

              {/* Seven miniature bars for Last 7 Days historical activity preview */}
              <div className="flex h-20 items-end justify-between gap-1.5 pt-6 px-1">
                {barHeights.map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full bg-white/5 rounded-t-sm h-12 flex items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: i * 0.04 }}
                        className={`w-full rounded-t-xs ${
                          i === 6 ? 'bg-brand-primary shadow-xs' : 'bg-[#313131] hover:bg-[#414141]'
                        } transition-all`}
                      />
                    </div>
                    <span className="text-[9px] font-semibold text-gray-600 font-mono">
                      D{i+1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Daily Logs */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white select-none uppercase tracking-wider text-xs text-gray-500">
                DAILY LOGS
              </h3>

              <div className="space-y-2.5">
                {dailyLogs.map((log, index) => {
                  const isExpanded = expandedLog === index;

                  return (
                    <div 
                      key={index}
                      className="overflow-hidden rounded-xl border border-white/5 bg-[#1c1b1b]/70 hover:border-white/10 transition-all duration-300"
                    >
                      {/* Header view */}
                      <div 
                        onClick={() => toggleExpandLog(index)}
                        className="flex items-center justify-between p-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-white/5 text-center shrink-0 border border-white/5">
                            <span className="text-[9px] font-bold text-gray-500 font-mono tracking-wider uppercase">
                              {log.date.split(' ')[0]}
                            </span>
                            <span className="text-lg font-extrabold text-white leading-tight font-mono">
                              {log.date.split(' ')[1]}
                            </span>
                          </div>

                          <div className="space-y-0.5">
                            <h4 className="text-sm font-semibold text-white">
                              {log.type}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {log.steps.toLocaleString()} steps • {log.calories} kcal
                            </p>
                          </div>
                        </div>

                        <div className="text-gray-500">
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </div>

                      {/* Expanded Details drill down */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-t border-white/5 bg-black/20 p-4.5 text-xs text-gray-400 space-y-3"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center gap-2">
                                <Activity size={14} className="text-brand-primary" />
                                <span className="font-semibold text-white">Total Steps:</span>
                                <span className="font-mono text-gray-300">{log.steps.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Milestone size={14} className="text-brand-secondary" />
                                <span className="font-semibold text-white">Calories:</span>
                                <span className="font-mono text-gray-300">{log.calories} kcal</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Moon size={14} className="text-brand-tertiary" />
                                <span className="font-semibold text-white">Sleep Logs:</span>
                                <span className="font-mono text-gray-300">{log.sleep}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <CheckCircle2 size={13} className="text-[#00a572]" />
                                <span className="text-gray-300 font-semibold uppercase">Daily Goal Met</span>
                              </div>
                            </div>

                            {/* Micro bar line visualizing active periods */}
                            <div className="space-y-1.5 pt-2">
                              <div className="text-[10px] text-gray-500 font-bold tracking-wider">INTENSITY WAVEFORM</div>
                              <div className="flex h-5 items-end gap-1 px-1 py-0.5 bg-black/40 rounded-md">
                                {log.intensityArr.map((v, key) => (
                                  <div 
                                    key={key} 
                                    className="bg-brand-primary/60 flex-1 hover:bg-brand-primary transition-all" 
                                    style={{ height: `${v}%`, borderRadius: '12px' }} 
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 5: Download Actions & Sublabels */}
            <div className="space-y-3 mt-4 text-center">
              <button
                onClick={handleExport}
                disabled={exporting}
                className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 flex-row text-sm font-bold tracking-wider uppercase transition shadow-lg ${
                  exportComplete 
                    ? 'bg-[#00a572] text-white' 
                    : 'bg-brand-primary text-[#002e6a] hover:bg-opacity-90'
                }`}
              >
                {exporting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#002e6a] border-t-transparent" />
                    <span>Generating Report...</span>
                  </>
                ) : exportComplete ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>PDF Report Exported! (Check folder)</span>
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    <span>Export Report (PDF)</span>
                  </>
                )}
              </button>

              <span className="text-xs text-gray-500 block font-medium">
                Monthly archive ready for October.
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="analysis-tab"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex flex-col gap-6"
          >
            {/* Bento-style Metric Score Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-[#1c1b1b] p-5 shadow-lg relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 h-16 w-16 rounded-full bg-brand-primary/5 blur-xl" />
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-brand-primary" />
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">규칙성 지수</span>
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold font-mono text-white">{currentCoach.score}</span>
                  <span className="text-xs text-gray-400 font-semibold">/ 100</span>
                </div>
                <div className="mt-2 text-[11px] text-brand-primary font-medium">
                  {currentCoach.status}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#1c1b1b] p-5 shadow-lg relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 h-16 w-16 rounded-full bg-brand-secondary/5 blur-xl" />
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-brand-secondary animate-pulse" />
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">일평균 에너지</span>
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-2xl font-bold font-mono text-brand-secondary">
                    {Math.round(64280 / 7).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold font-sans">걸음/일</span>
                </div>
                <div className="mt-2 text-[11px] text-gray-400 font-medium">
                  목표의 {Math.round(((64280 / 7) / profile.stepsGoal) * 100)}% 만족도
                </div>
              </div>
            </div>

            {/* Interactive Trend Analysis Graph */}
            <div className="rounded-2xl border border-white/10 bg-[#1c1b1b] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-brand-primary uppercase tracking-widest">WEEKLY STEP FLUCTUATION</span>
                  <h4 className="text-sm font-bold text-white">주간 보행량 변동 분석</h4>
                </div>
                <span className="text-[10px] font-mono text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full select-none">
                  Click point
                </span>
              </div>

              {/* Custom SVG Coordinate Line Graph */}
              <div className="relative h-44 w-full bg-black/20 rounded-xl p-4 flex items-center justify-between">
                <div className="absolute left-3 top-3 flex flex-col justify-between h-[80%] text-[8px] font-mono text-gray-600">
                  <span>15K</span>
                  <span>10K (목표)</span>
                  <span>5K</span>
                  <span>0</span>
                </div>

                <div className="w-full h-24 relative flex items-end pl-8">
                  {/* Dotted Target Line */}
                  <div className="absolute left-8 right-0 border-t border-dashed border-white/20 bottom-[66%]" />

                  {/* SVG paths connecting the data points */}
                  <svg className="absolute left-8 right-0 bottom-0 top-0 h-full w-[calc(100%-32px)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Area fill */}
                    <path
                      d="M 5,90 L 5,55 L 20,40 L 35,70 L 50,20 L 65,45 L 80,60 L 95,15 L 95,90 Z"
                      fill="url(#grad-blue)"
                      opacity="0.15"
                    />
                    {/* Line path */}
                    <path
                      d="M 5,55 L 20,40 L 35,70 L 50,20 L 65,45 L 80,60 L 95,15"
                      fill="none"
                      stroke="#adc6ff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="grad-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#adc6ff" />
                        <stop offset="100%" stopColor="#adc6ff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Highlighting points for user clicks */}
                  <div className="absolute left-8 right-0 bottom-0 top-0 flex justify-between px-2 items-center w-[calc(100%-32px)] h-full">
                    {dayDetails.map((day, idx) => {
                      const isActive = selectedDayPoint === idx;
                      // Calculated approximate top positions
                      const offsetTops = ["55%", "40%", "70%", "20%", "45%", "60%", "15%"];
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedDayPoint(idx)}
                          className="absolute w-5 h-5 flex items-center justify-center -translate-x-1/2 focus:outline-none cursor-pointer group"
                          style={{ 
                            left: `${5 + (idx * 15)}%`, 
                            top: offsetTops[idx]
                          }}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full border border-[#131313] transition-all duration-300 ${
                            isActive 
                              ? 'bg-brand-primary scale-135 shadow-lg shadow-brand-primary/50' 
                              : 'bg-[#2a2a2a] group-hover:bg-brand-primary/50'
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Day Details Card underneath the interactive chart */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDayPoint}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white font-mono">{weekDays[selectedDayPoint]}day</span>
                      <span className="text-[10px] bg-white/10 text-gray-300 font-bold px-1.5 py-0.5 rounded">
                        {dayDetails[selectedDayPoint].tag}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      수면: {dayDetails[selectedDayPoint].sleep} • 소모 칼로리: {dayDetails[selectedDayPoint].calories} kCal
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold font-mono text-brand-primary">
                      {dayDetails[selectedDayPoint].steps.toLocaleString()}
                    </div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">STEPS</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* AI Advisor Card using user name with reanalyze interactions */}
            <div className="rounded-2xl border border-[#adc6ff]/20 bg-[#1c1b1b] p-6 shadow-xl relative overflow-hidden space-y-4">
              <div className="absolute -left-12 -top-12 h-24 w-24 rounded-full bg-brand-primary/5 blur-2xl" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Brain size={18} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-extrabold text-white">VitalStep 건강 코치 AI</h4>
                    <p className="text-[10px] text-gray-500 font-mono">PERSONALLY TAILORED SUMMARY</p>
                  </div>
                </div>

                <button
                  onClick={handleReanalyze}
                  disabled={analyzing}
                  title="re-analyze current health logs"
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition active:scale-90 ${
                    analyzing ? 'animate-spin border-brand-primary' : ''
                  }`}
                >
                  <RefreshCw size={14} />
                </button>
              </div>

              {analyzing ? (
                <div className="py-6 flex flex-col items-center justify-center gap-3">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
                  <span className="text-xs text-gray-400 font-mono animate-pulse">실시간 바이오 인덱스 재분석 중...</span>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Dynamic report content */}
                  <div className="text-xs text-gray-300 leading-relaxed bg-black/20 rounded-xl p-4.5 border border-white/5 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-brand-primary font-bold">
                      <Sparkles size={14} />
                      <span>{profile.name}님의 맞춤 분석 레포트</span>
                    </div>
                    <ul className="space-y-2 list-none pl-0">
                      {currentCoach.insights.map((insight, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <span className="text-brand-secondary text-sm leading-none mt-0.5">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-brand-primary/5 hover:bg-brand-primary/8 border border-brand-primary/15 rounded-xl p-4 text-xs space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <Award size={14} className="text-brand-primary" />
                      <span>오늘의 액션 추천 가이드</span>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      {currentCoach.recommendation}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
