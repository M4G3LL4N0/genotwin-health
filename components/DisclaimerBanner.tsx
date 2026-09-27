export function DisclaimerBanner() {
  return (
    <div
      role="region"
      aria-label="Medical disclaimer"
      className="border-b border-amber-200/80 bg-amber-50 px-4 py-3 text-center text-xs text-amber-950 sm:text-sm"
    >
      <strong className="font-semibold">Educational only.</strong> GenoTwin is not a medical device,
      does not provide diagnosis or treatment, and is not a substitute for a licensed clinician.
      Always consult qualified health professionals for medical decisions.
    </div>
  );
}
