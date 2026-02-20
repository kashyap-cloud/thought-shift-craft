import { useState } from "react";
import { ArrowLeft, Check, Feather, Brain, Lightbulb, Scale, Sparkles } from "lucide-react";

const DISTORTIONS = [
  { label: "A prediction", icon: Lightbulb },
  { label: "A worst-case scenario", icon: Sparkles },
  { label: "An assumption", icon: Brain },
  { label: "A feeling disguised as a fact", icon: Feather },
];

const ReframeThoughts = () => {
  const [step, setStep] = useState(0);
  const [thought, setThought] = useState("");
  const [selectedDistortions, setSelectedDistortions] = useState<string[]>([]);
  const [reframed, setReframed] = useState("");
  const [completed, setCompleted] = useState(false);

  const totalSteps = 5;

  const toggleDistortion = (d: string) => {
    setSelectedDistortions((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-therapeutic flex items-center justify-center px-4 py-8">
        <div className="relative flex items-center justify-center w-full max-w-md">
          <div className="absolute w-80 h-80 rounded-full bg-primary/8 animate-expand-circle" />
          <div className="absolute w-56 h-56 rounded-full bg-accent/40 animate-expand-circle" style={{ animationDelay: "0.4s" }} />
          <div className="card-therapeutic card-glow animate-fade-card-in text-center relative z-10 w-full">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Scale className="text-primary" size={24} />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-3">
              Perspective builds strength.
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed text-[15px]">
              You practiced responding differently.
              <br />
              That's progress.
            </p>
            <button
              onClick={() => { setCompleted(false); setStep(0); setThought(""); setSelectedDistortions([]); setReframed(""); }}
              className="mt-6 w-full py-3 rounded-xl border border-border/60 text-muted-foreground font-body text-sm transition-all hover:bg-secondary/50 active:scale-[0.98]"
            >
              Try again
            </button>
            <p className="text-xs text-muted-foreground/50 font-body mt-4">
              Reframe Thoughts
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-therapeutic flex flex-col px-4 py-6">
      {/* Header with back + progress */}
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="flex items-center gap-3 mb-4">
          {step > 0 ? (
            <button
              onClick={goBack}
              className="w-9 h-9 rounded-full bg-card/80 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-all active:scale-95 shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft size={16} />
            </button>
          ) : (
            <div className="w-9" />
          )}
          <div className="flex-1">
            <div className="h-1.5 w-full rounded-full bg-muted/80 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary/80 transition-all duration-700 ease-out"
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground font-body tabular-nums shrink-0 w-9 text-right">
            {step + 1}/{totalSteps}
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center pb-4">
        <div
          key={step}
          className="card-therapeutic animate-fade-card-in w-full max-w-md"
        >
          {step === 0 && <CardIntro onNext={nextStep} />}
          {step === 1 && (
            <CardIdentify thought={thought} setThought={setThought} onNext={nextStep} />
          )}
          {step === 2 && (
            <CardExamine selected={selectedDistortions} toggle={toggleDistortion} onNext={nextStep} />
          )}
          {step === 3 && (
            <CardReframe reframed={reframed} setReframed={setReframed} onNext={nextStep} />
          )}
          {step === 4 && <CardIntegration onNext={nextStep} />}
        </div>
      </div>
    </div>
  );
};

/* ─── Cards ─── */

function CardIntro({ onNext }: { onNext: () => void }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Feather className="text-primary" size={15} />
        </div>
        <p className="text-xs uppercase tracking-widest text-primary/70 font-body font-medium">
          Reframe Thoughts
        </p>
      </div>
      <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-5 leading-snug">
        Let's look at the thought differently.
      </h2>
      <div className="space-y-3 text-muted-foreground font-body text-[15px] leading-relaxed mb-8">
        <p>Our minds generate automatic thoughts — especially when anxiety is high.</p>
        <p>Some feel urgent. Some feel convincing.</p>
        <p className="font-medium text-foreground/80">But thoughts are interpretations, not facts.</p>
        <p>Today, we'll practice gently reshaping one.</p>
      </div>
      <ActivityButton onClick={onNext}>I'm ready to try.</ActivityButton>
    </>
  );
}

function CardIdentify({
  thought,
  setThought,
  onNext,
}: {
  thought: string;
  setThought: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <>
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Brain className="text-primary" size={15} />
      </div>
      <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug">
        What was the thought?
      </h2>
      <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-5">
        Write the thought exactly as it appeared in your mind.
        <br />
        No editing. No fixing.
      </p>
      <textarea
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        placeholder='e.g., "If I make a mistake, everything will fall apart."'
        className="w-full min-h-[120px] rounded-xl bg-secondary/40 border border-border/60 p-4 font-body text-[15px] text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
      />
      <p className="text-xs text-muted-foreground mt-2 mb-6 font-body italic">
        Notice the tone of the thought.
      </p>
      <ActivityButton onClick={onNext} disabled={!thought.trim()}>
        I see it clearly.
      </ActivityButton>
    </>
  );
}

function CardExamine({
  selected,
  toggle,
  onNext,
}: {
  selected: string[];
  toggle: (d: string) => void;
  onNext: () => void;
}) {
  return (
    <>
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Lightbulb className="text-primary" size={15} />
      </div>
      <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug">
        Let's slow it down.
      </h2>
      <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-5">
        What makes this thought feel true? Is it:
      </p>
      <div className="space-y-2.5 mb-5">
        {DISTORTIONS.map((d) => {
          const isSelected = selected.includes(d.label);
          const Icon = d.icon;
          return (
            <button
              key={d.label}
              onClick={() => toggle(d.label)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border font-body text-[15px] transition-all flex items-center gap-3 ${
                isSelected
                  ? "bg-primary/8 border-primary/30 text-foreground shadow-sm"
                  : "bg-card border-border/60 text-muted-foreground hover:bg-secondary/50 hover:border-border"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
              }`}>
                {isSelected && <Check size={11} className="text-primary-foreground" />}
              </div>
              <Icon size={15} className={isSelected ? "text-primary shrink-0" : "text-muted-foreground/50 shrink-0"} />
              <span>{d.label}</span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground mb-6 font-body italic">
        Anxiety often amplifies possibilities into certainties.
      </p>
      <ActivityButton onClick={onNext} disabled={selected.length === 0}>
        Okay…
      </ActivityButton>
    </>
  );
}

function CardReframe({
  reframed,
  setReframed,
  onNext,
}: {
  reframed: string;
  setReframed: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <>
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Scale className="text-primary" size={15} />
      </div>
      <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug">
        What is a more balanced version?
      </h2>
      <div className="space-y-3 text-muted-foreground font-body text-[15px] leading-relaxed mb-5">
        <p>This is not about pretending everything is fine.</p>
        <p>It's about adding perspective.</p>
        <p>Try writing a thought that is:</p>
        <ul className="space-y-2 pl-1">
          <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />More realistic</li>
          <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />Less extreme</li>
          <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />Grounded in evidence</li>
        </ul>
      </div>
      <textarea
        value={reframed}
        onChange={(e) => setReframed(e.target.value)}
        placeholder="Write a more balanced version…"
        className="w-full min-h-[120px] rounded-xl bg-secondary/40 border border-border/60 p-4 font-body text-[15px] text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
      />
      <div className="mt-3 mb-6 bg-secondary/30 rounded-xl p-4 border border-border/40">
        <p className="text-xs text-muted-foreground font-body leading-relaxed">
          <span className="font-semibold text-foreground/60">Original:</span> "If I think it, it must be true."
        </p>
        <p className="text-xs text-muted-foreground font-body mt-2 leading-relaxed">
          <span className="font-semibold text-primary/70">Balanced:</span> "Thoughts happen automatically. They don't define my actions."
        </p>
      </div>
      <ActivityButton onClick={onNext} disabled={!reframed.trim()}>
        That feels more grounded.
      </ActivityButton>
    </>
  );
}

function CardIntegration({ onNext }: { onNext: () => void }) {
  return (
    <>
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Sparkles className="text-primary" size={15} />
      </div>
      <h2 className="font-heading text-[22px] sm:text-2xl font-semibold text-foreground mb-3 leading-snug">
        Notice the shift.
      </h2>
      <div className="space-y-3 text-muted-foreground font-body text-[15px] leading-relaxed mb-5">
        <p>Compare the original thought and the reframed one.</p>
        <p>Does the new thought:</p>
        <ul className="space-y-2 pl-1">
          <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />Reduce urgency?</li>
          <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />Create space?</li>
          <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />Feel slightly more flexible?</li>
        </ul>
      </div>
      <p className="text-xs text-muted-foreground mb-6 font-body italic">
        You don't need to eliminate anxiety.
        <br />
        Even small shifts build resilience.
      </p>
      <ActivityButton onClick={onNext}>I can practice this.</ActivityButton>
    </>
  );
}

/* ─── Shared Button ─── */

function ActivityButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body font-medium text-[15px] transition-all duration-200 hover:shadow-md hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none"
    >
      {children}
    </button>
  );
}

export default ReframeThoughts;
