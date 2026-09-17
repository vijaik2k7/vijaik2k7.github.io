import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Key,
  Camera,
  Type,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Upload,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Zap,
  Info,
} from 'lucide-react';
import { ThemeMode } from '../types';
import { FoodAnalysis } from './types';
import { analyzeFood } from './geminiApi';

interface FoodAnalyzerPageProps {
  theme: ThemeMode;
}

export const FoodAnalyzerPage: React.FC<FoodAnalyzerPageProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  // API Key State
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('gemini-api-key') || '';
  });
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(!localStorage.getItem('gemini-api-key'));
  const [showApiKeyText, setShowApiKeyText] = useState<boolean>(false);
  const [tempApiKey, setTempApiKey] = useState<string>(apiKey);

  // Input Tab State: 'camera' | 'text'
  const [activeTab, setActiveTab] = useState<'camera' | 'text'>('camera');

  // Camera & Image State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Text Input State
  const [textDescription, setTextDescription] = useState<string>('');

  // Analysis State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('Initializing Gemini 3.8 Flash...');
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Save API Key
  const handleSaveApiKey = () => {
    const trimmed = tempApiKey.trim();
    setApiKey(trimmed);
    localStorage.setItem('gemini-api-key', trimmed);
    setShowApiKeyInput(false);
    setErrorMsg(null);
  };

  const handleClearApiKey = () => {
    setApiKey('');
    setTempApiKey('');
    localStorage.removeItem('gemini-api-key');
    setShowApiKeyInput(true);
  };

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err: unknown) {
      console.error('Camera access error:', err);
      setCameraError('Camera access denied or unequipped. Upload a photo or use text input.');
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // Toggle Camera Facing Mode
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Handle Tab Switch
  useEffect(() => {
    if (activeTab === 'camera' && !capturedImage && !analysisResult) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeTab, facingMode, capturedImage, analysisResult]);

  // Capture photo from video feed
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  // Handle File Upload Fallback
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string);
          stopCamera();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Retake Photo
  const handleRetake = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setErrorMsg(null);
    startCamera();
  };

  // Run Gemini Analysis
  const handleAnalyze = async () => {
    if (!apiKey) {
      setShowApiKeyInput(true);
      setErrorMsg('Please save your Gemini API Key first.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    const steps = [
      'Scanning product visual data...',
      'Sending payload to Gemini 3.8 Flash...',
      'Parsing nutritional breakdown & additives...',
      'Synthesizing verdict & letter grade...',
    ];
    let stepIdx = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIdx = (stepIdx + 1) % steps.length;
      setLoadingStep(steps[stepIdx]);
    }, 1200);

    try {
      const imgPayload = activeTab === 'camera' ? capturedImage || undefined : undefined;
      const textPayload = activeTab === 'text' ? textDescription : undefined;

      const result = await analyzeFood(apiKey, imgPayload, textPayload);
      setAnalysisResult(result);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Analysis failed. Please check your key and try again.');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  };

  // Reset Everything
  const handleReset = () => {
    setCapturedImage(null);
    setTextDescription('');
    setAnalysisResult(null);
    setErrorMsg(null);
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  // Quick Preset Suggestions for Text Input
  const presets = [
    'Doritos Nacho Cheese Family Pack',
    'Nutella Hazelnut Cocoa Spread',
    'Greek Yogurt Plain 0% Fat',
    'Trader Joe\'s Frozen Orange Chicken',
    'Coca-Cola Zero Sugar 20oz',
  ];

  // Helper for Grade Colors
  const getGradeStyle = (grade: FoodAnalysis['grade']) => {
    switch (grade) {
      case 'A':
        return {
          bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
          border: 'border-emerald-500',
          text: 'text-emerald-600 dark:text-emerald-400',
          glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
        };
      case 'B':
        return {
          bg: 'bg-lime-500/10 dark:bg-lime-500/20',
          border: 'border-lime-500',
          text: 'text-lime-600 dark:text-lime-400',
          glow: 'shadow-[0_0_30px_rgba(132,204,22,0.3)]',
        };
      case 'C':
        return {
          bg: 'bg-amber-500/10 dark:bg-amber-500/20',
          border: 'border-amber-500',
          text: 'text-amber-600 dark:text-amber-400',
          glow: 'shadow-[0_0_30px_rgba(245,158,11,0.3)]',
        };
      case 'D':
        return {
          bg: 'bg-orange-500/10 dark:bg-orange-500/20',
          border: 'border-orange-500',
          text: 'text-orange-600 dark:text-orange-400',
          glow: 'shadow-[0_0_30px_rgba(249,115,22,0.3)]',
        };
      case 'F':
      default:
        return {
          bg: 'bg-rose-500/10 dark:bg-rose-500/20',
          border: 'border-rose-500',
          text: 'text-rose-600 dark:text-rose-400',
          glow: 'shadow-[0_0_30px_rgba(244,63,94,0.3)]',
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-xs font-mono transition-colors ${
            isDark ? 'text-zinc-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border border-[#FF5500]/40 bg-[#FF5500]/10 text-[#FF5500] font-bold">
          Gemini 3.8 Flash • Zero Server
        </span>
      </div>

      {/* Main Title Banner */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FF5500] flex items-center justify-center text-white shadow-lg shadow-[#FF5500]/25 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h1 className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
              NutriSnap AI Food Scanner
            </h1>
            <p className={`text-xs sm:text-sm font-mono mt-0.5 ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
              Instant AI health analysis of food products, ingredients &amp; snacks using vision intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* API Key Bar */}
      <div
        className={`mb-8 border rounded-2xl p-4 transition-all ${
          isDark
            ? 'bg-[#121215] border-zinc-800'
            : 'bg-[#f5f0e6] border-[#d8cfbe] shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Key className="w-4 h-4 text-[#FF5500]" />
            <span className={`text-xs font-mono font-bold ${isDark ? 'text-zinc-200' : 'text-stone-800'}`}>
              Gemini API Key
            </span>
            {apiKey ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-semibold">
                <ShieldCheck className="w-3 h-3" /> Saved in Local Storage
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-semibold">
                <AlertCircle className="w-3 h-3" /> Key Required
              </span>
            )}
          </div>

          <button
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className={`text-xs font-mono flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors ${
              isDark
                ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                : 'border-[#c8bca8] hover:bg-[#e6decb] text-stone-700'
            }`}
          >
            <span>{showApiKeyInput ? 'Hide' : apiKey ? 'Manage Key' : 'Enter Key'}</span>
            {showApiKeyInput ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Key Input */}
        {showApiKeyInput && (
          <div className="mt-4 pt-4 border-t border-zinc-800/50 space-y-3 animate-in fade-in">
            <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
              Your API key is stored locally in your browser memory and sent directly to Google's Gemini servers. No middleman or backend logging.
              Don't have a key?{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF5500] hover:underline font-bold"
              >
                Get a free Gemini API key →
              </a>
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type={showApiKeyText ? 'text' : 'password'}
                  placeholder="AIzaSy..."
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  className={`w-full px-3 py-2 pr-10 rounded-xl border text-xs font-mono focus:outline-none focus:border-[#FF5500] ${
                    isDark
                      ? 'bg-zinc-900 border-zinc-700 text-white placeholder-zinc-600'
                      : 'bg-white border-[#c8bca8] text-stone-900 placeholder-stone-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowApiKeyText(!showApiKeyText)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showApiKeyText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveApiKey}
                  disabled={!tempApiKey.trim()}
                  className="px-4 py-2 bg-[#FF5500] text-white text-xs font-mono font-bold rounded-xl hover:bg-[#e04b00] disabled:opacity-50 transition-colors shadow-md"
                >
                  Save Key
                </button>
                {apiKey && (
                  <button
                    onClick={handleClearApiKey}
                    className={`px-3 py-2 border text-xs font-mono rounded-xl transition-colors ${
                      isDark
                        ? 'border-rose-900/60 text-rose-400 hover:bg-rose-950/40'
                        : 'border-rose-300 text-rose-700 hover:bg-rose-50'
                    }`}
                  >
                    Clear Key
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global Error Banner */}
      {errorMsg && (
        <div className="mb-6 p-4 bg-rose-950/70 border border-rose-800 text-rose-200 rounded-2xl flex items-center justify-between gap-3 text-xs font-mono shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-white font-bold p-1">
            Dismiss
          </button>
        </div>
      )}

      {/* Input / Scanner Section */}
      {!analysisResult && (
        <div
          className={`border rounded-2xl p-6 transition-all ${
            isDark
              ? 'bg-[#121215] border-zinc-800'
              : 'bg-[#f5f0e6] border-[#d8cfbe] shadow-sm'
          }`}
        >
          {/* Input Mode Selector Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl border mb-6 border-zinc-800/40 bg-black/10 dark:bg-zinc-900/50">
            <button
              onClick={() => setActiveTab('camera')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === 'camera'
                  ? 'bg-[#FF5500] text-white shadow-md'
                  : isDark
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Camera Photo</span>
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === 'text'
                  ? 'bg-[#FF5500] text-white shadow-md'
                  : isDark
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Text Description</span>
            </button>
          </div>

          {/* TAB 1: CAMERA VIEW & PHOTO CAPTURE */}
          {activeTab === 'camera' && (
            <div className="space-y-4">
              {!capturedImage ? (
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3] max-h-[420px] flex items-center justify-center border border-zinc-800 group">
                  {/* Live Video Feed */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Camera Viewfinder Overlay */}
                  <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-[#FF5500]/50 m-6 rounded-xl flex items-center justify-center">
                    <div className="text-center bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white/80 text-[11px] font-mono">
                      Center food product or ingredient list in frame
                    </div>
                  </div>

                  {/* Top Camera Controls */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={toggleFacingMode}
                      className="p-2.5 rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-colors border border-white/20"
                      title="Switch Camera (Front/Rear)"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Snap Button */}
                  <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-4">
                    <button
                      onClick={capturePhoto}
                      className="w-16 h-16 rounded-full border-4 border-white bg-[#FF5500] hover:bg-[#e04b00] active:scale-95 transition-all shadow-xl flex items-center justify-center"
                      title="Take Snapshot"
                    >
                      <Camera className="w-7 h-7 text-white" />
                    </button>
                  </div>

                  {/* Camera Error / Fallback Banner */}
                  {cameraError && (
                    <div className="absolute inset-0 bg-zinc-950/90 flex flex-col items-center justify-center p-6 text-center space-y-4">
                      <AlertCircle className="w-10 h-10 text-amber-500" />
                      <p className="text-xs font-mono text-zinc-300 max-w-sm">{cameraError}</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-[#FF5500] text-white text-xs font-mono font-bold rounded-xl flex items-center gap-2 hover:bg-[#e04b00] transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Photo File Instead</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Captured Image Preview */
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-black aspect-[4/3] max-h-[380px] flex items-center justify-center">
                    <img src={capturedImage} alt="Captured food product" className="w-full h-full object-contain" />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-white border border-white/20 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Photo Captured</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleRetake}
                      disabled={isLoading}
                      className={`flex-1 py-3 px-4 border rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors ${
                        isDark
                          ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                          : 'border-[#c8bca8] hover:bg-[#e6decb] text-stone-700'
                      }`}
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Retake Photo</span>
                    </button>

                    <button
                      onClick={handleAnalyze}
                      disabled={isLoading}
                      className="flex-1 py-3 px-4 bg-[#FF5500] hover:bg-[#e04b00] text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FF5500]/20 disabled:opacity-50 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Analyze with Gemini 3.8 Flash</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Upload File Input Button */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {!capturedImage && (
                <div className="text-center pt-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`text-xs font-mono underline transition-colors ${
                      isDark ? 'text-zinc-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Or upload an image file from your device
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TEXT DESCRIPTION */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div>
                <label className={`block text-xs font-mono font-bold mb-2 ${isDark ? 'text-zinc-300' : 'text-stone-800'}`}>
                  Describe Food Product or Paste Ingredients
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g., Doritos Nacho Cheese Tortilla Chips (Corn, Vegetable Oil, Maltodextrin, Salt, Cheddar Cheese, Monosodium Glutamate...)"
                  value={textDescription}
                  onChange={(e) => setTextDescription(e.target.value)}
                  className={`w-full p-3.5 rounded-xl border text-xs font-mono focus:outline-none focus:border-[#FF5500] transition-all ${
                    isDark
                      ? 'bg-zinc-900 border-zinc-700 text-white placeholder-zinc-600'
                      : 'bg-white border-[#c8bca8] text-stone-900 placeholder-stone-400'
                  }`}
                />
              </div>

              {/* Preset Chips */}
              <div>
                <span className={`text-[11px] font-mono block mb-2 ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
                  Try a quick preset sample:
                </span>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTextDescription(preset)}
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                        isDark
                          ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-[#FF5500]'
                          : 'bg-[#e4ddd0] border-[#c8bca8] text-stone-800 hover:border-[#FF5500]'
                      }`}
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isLoading || !textDescription.trim()}
                className="w-full py-3.5 px-4 bg-[#FF5500] hover:bg-[#e04b00] text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FF5500]/20 disabled:opacity-50 transition-all mt-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Analyze Product Description</span>
              </button>
            </div>
          )}

          {/* Loading Radar Overlay */}
          {isLoading && (
            <div className="mt-6 p-6 border rounded-2xl bg-[#FF5500]/5 border-[#FF5500]/30 flex flex-col items-center justify-center text-center space-y-3 animate-pulse">
              <div className="w-12 h-12 rounded-full border-4 border-[#FF5500] border-t-transparent animate-spin" />
              <p className="text-xs font-mono font-bold text-[#FF5500]">{loadingStep}</p>
              <p className={`text-[11px] font-mono ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
                Evaluating nutritional profile, sodium/sugar ratios &amp; food additives...
              </p>
            </div>
          )}
        </div>
      )}

      {/* RESULTS CARD */}
      {analysisResult && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div
            className={`border rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all ${
              isDark
                ? 'bg-[#121215] border-zinc-800'
                : 'bg-[#f5f0e6] border-[#d8cfbe] shadow-md'
            }`}
          >
            {/* Header: Grade + Product Name */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 pb-6 border-b border-zinc-800/40">
              {/* Giant Grade Circle */}
              {(() => {
                const style = getGradeStyle(analysisResult.grade);
                return (
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 flex flex-col items-center justify-center shrink-0 ${style.bg} ${style.border} ${style.glow}`}
                  >
                    <span className={`text-4xl sm:text-5xl font-serif font-extrabold ${style.text}`}>
                      {analysisResult.grade}
                    </span>
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider mt-0.5 opacity-80">
                      Health Grade
                    </span>
                  </div>
                );
              })()}

              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-zinc-700/50 bg-black/10 dark:bg-white/5 text-[10px] font-mono font-semibold uppercase mb-2">
                  <Sparkles className="w-3 h-3 text-[#FF5500]" />
                  <span>Gemini AI Verdict</span>
                </div>
                <h2 className={`text-xl sm:text-2xl font-serif font-bold tracking-tight mb-2 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  {analysisResult.productName}
                </h2>
                {analysisResult.summary && (
                  <p className={`text-xs sm:text-sm font-sans leading-relaxed italic ${isDark ? 'text-zinc-300' : 'text-stone-700'}`}>
                    "{analysisResult.summary}"
                  </p>
                )}
              </div>
            </div>

            {/* Split Grid: The Good & The Bad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* THE GOOD */}
              <div className="border border-emerald-500/30 rounded-xl p-5 bg-emerald-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <h3 className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                    The Good
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {analysisResult.good.map((item, idx) => (
                    <li key={idx} className={`text-xs font-sans flex items-start gap-2 ${isDark ? 'text-zinc-200' : 'text-stone-800'}`}>
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* THE BAD */}
              <div className="border border-rose-500/30 rounded-xl p-5 bg-rose-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  <h3 className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                    The Bad &amp; Concerns
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {analysisResult.bad.map((item, idx) => (
                    <li key={idx} className={`text-xs font-sans flex items-start gap-2 ${isDark ? 'text-zinc-200' : 'text-stone-800'}`}>
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800/40">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 bg-[#FF5500] hover:bg-[#e04b00] text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FF5500]/20 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Scan Another Product</span>
              </button>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>AI-generated analysis for informational purposes. Not medical advice.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodAnalyzerPage;
