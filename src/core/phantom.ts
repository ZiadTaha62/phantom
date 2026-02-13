/** Stip phantom metadata object from a type */
type StripPhantom<T> = T extends {
  __Phantom: { __OriginalType?: infer O };
}
  ? Exclude<O, undefined>
  : T;

/** run-time helper for 'StringPhantom', used for debugging mainly */
export const stripPhantom = <T>(value: T): StripPhantom<T> => value as any;

// Avoid bundler bugs
type _StripPhantom<T> = StripPhantom<T>;
const _stripPhantom = stripPhantom;

/**
 * Phantom meatadata object manipulators.
 *
 * Phantom matadata object holds all metadata used by 'phantom'.
 */
export namespace PhantomCore {
  /** Get phantom metadata object from a type */
  export type PhantomOf<T> = T extends {
    __Phantom: infer Phantom extends object;
  }
    ? Phantom
    : never;

  /** Stip phantom metadata object from a type */
  export type StripPhantom<T> = _StripPhantom<T>;

  /** run-time helper for 'StringPhantom', used for debugging mainly */
  export const stripPhantom = _stripPhantom;
}
