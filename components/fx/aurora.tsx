/**
 * Two large, heavily blurred light fields (gold and mint) that drift slowly.
 * Desktop only; static and hidden below lg. Pure CSS transforms, GPU-composited.
 */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 hidden overflow-hidden lg:block ${className}`}
    >
      <div className="fx-aurora-a absolute -right-[10%] -top-[20%] h-[70%] w-[55%] rounded-full bg-gold/[0.16] blur-[120px]" />
      <div className="fx-aurora-b absolute -bottom-[25%] right-[20%] h-[60%] w-[45%] rounded-full bg-mint/[0.12] blur-[120px]" />
      <div className="fx-aurora-b absolute -left-[15%] top-[10%] h-[50%] w-[35%] rounded-full bg-gold/[0.06] blur-[100px]" />
    </div>
  );
}
