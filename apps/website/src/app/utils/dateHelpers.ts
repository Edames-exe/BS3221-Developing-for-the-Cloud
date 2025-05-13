export function toDateTimeLocal(isoString: string): string {
  const dt = new Date(isoString);
  const tzOffset = dt.getTimezoneOffset() * 60000;
  const local = new Date(dt.getTime() - tzOffset);
  return local.toISOString().slice(0, 16);
}
