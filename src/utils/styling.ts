export const unforward = (forwardedProp: string) => ({
  shouldForwardProp: (prop: string) => prop !== forwardedProp,
});
