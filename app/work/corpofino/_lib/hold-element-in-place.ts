const DRIFT_TOLERANCE_PIXELS = 1;

export function holdElementInPlaceWhileLayoutSettles(element: HTMLElement, settleDurationMilliseconds: number) {
  const initialViewportTop = element.getBoundingClientRect().top;
  const settleEndTime = performance.now() + settleDurationMilliseconds;

  function cancelScrollDrift() {
    const drift = element.getBoundingClientRect().top - initialViewportTop;
    if (Math.abs(drift) >= DRIFT_TOLERANCE_PIXELS) {
      window.scrollTo({ top: window.scrollY + drift, behavior: "instant" });
    }
    if (performance.now() < settleEndTime) requestAnimationFrame(cancelScrollDrift);
  }

  requestAnimationFrame(cancelScrollDrift);
}
