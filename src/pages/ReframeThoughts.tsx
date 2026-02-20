import { useState } from "react";

const DISTORTIONS = [
  "A prediction",
  "A worst-case scenario",
  "An assumption",
  "A feeling disguised as a fact",
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
          {/* Expanding circle */}
          <div className="absolute w-72 h-72 rounded-full bg-primary/10 animate-expand-circle" />
          <div className="card-therapeutic card-glow animate-fade-card-in text-center relative z-10 w-full">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Perspective builds strength.
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              You practiced responding differently.
              <br />
              That's progress.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-therapeutic flex flex-col px-4 py-6">
      {/* Progress bar */}
      <div className="w-full max-w-md mx-auto mb-8">
        <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center font-body">
          Step {step + 1} of {totalSteps}
        </p>
      </div>

      {/* Card container */}
      <div className="flex-1 flex items-center justify-center">
        <div
          key={step}
          className="card-therapeutic animate-fade-card-in w-full max-w-md"
        >
          {step === 0 && <CardIntro onNext={nextStep} />}
          {step === 1 && (
            <CardIdentify
              thought={thought}
              setThought={setThought}
              onNext={nextStep}
            />
          )}
          {step === 2 && (
            <CardExamine
              selected={selectedDistortions}
              toggle={toggleDistortion}
              onNext={nextStep}
            />
          )}
          {step === 3 && (
            <CardReframe
              reframed={reframed}
              setReframed={setReframed}
              onNext={nextStep}
            />
          )}
          {step === 4 && <CardIntegration onNext={nextStep} />}
        </div>
      </div>
    </div>
  );
};

/* ─── Individual Cards ─── */

function CardIntro({ onNext }: { onNext: () => void }) {
  return (
    <>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">
        Reframe Thoughts
      </p>
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-5 leading-snug">
        Let's look at the thought differently.
      </h2>
      <div className="space-y-3 text-muted-foreground font-body text-[15px] leading-relaxed mb-8">
        <p>Our minds generate automatic thoughts — especially when anxiety is high.</p>
        <p>Some feel urgent. Some feel convincing.</p>
        <p>But thoughts are interpretations, not facts.</p>
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
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-3 leading-snug">
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
        className="w-full min-h-[120px] rounded-lg bg-secondary/50 border border-border p-4 font-body text-[15px] text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
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
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-3 leading-snug">
        Let's slow it down.
      </h2>
      <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-5">
        What makes this thought feel true? Is it:
      </p>
      <div className="space-y-2.5 mb-5">
        {DISTORTIONS.map((d) => (
          <button
            key={d}
            onClick={() => toggle(d)}
            className={`w-full text-left px-4 py-3 rounded-lg border font-body text-[15px] transition-all ${
              selected.includes(d)
                ? "bg-primary/10 border-primary/40 text-foreground"
                : "bg-secondary/30 border-border text-muted-foreground hover:bg-secondary/60"
            }`}
          >
            {d}
          </button>
        ))}
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
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-3 leading-snug">
        What is a more balanced version?
      </h2>
      <div className="space-y-3 text-muted-foreground font-body text-[15px] leading-relaxed mb-5">
        <p>This is not about pretending everything is fine.</p>
        <p>It's about adding perspective.</p>
        <p>Try writing a thought that is:</p>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li>More realistic</li>
          <li>Less extreme</li>
          <li>Grounded in evidence</li>
        </ul>
      </div>
      <textarea
        value={reframed}
        onChange={(e) => setReframed(e.target.value)}
        placeholder="Write a more balanced version…"
        className="w-full min-h-[120px] rounded-lg bg-secondary/50 border border-border p-4 font-body text-[15px] text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
      />
      <div className="mt-2 mb-6 bg-secondary/40 rounded-lg p-3">
        <p className="text-xs text-muted-foreground font-body">
          <span className="font-medium">Original:</span> "If I think it, it must be true."
        </p>
        <p className="text-xs text-muted-foreground font-body mt-1">
          <span className="font-medium">Balanced:</span> "Thoughts happen automatically. They don't define my actions."
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
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-3 leading-snug">
        Notice the shift.
      </h2>
      <div className="space-y-3 text-muted-foreground font-body text-[15px] leading-relaxed mb-5">
        <p>Compare the original thought and the reframed one.</p>
        <p>Does the new thought:</p>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li>Reduce urgency?</li>
          <li>Create space?</li>
          <li>Feel slightly more flexible?</li>
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
      className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-body font-medium text-[15px] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export default ReframeThoughts;
