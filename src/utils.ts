export function Void(): void {
  // eslint-disable-next-line fp/no-nil
  return;
}

export function toVoid(_: any): void {
  return Void();
}
