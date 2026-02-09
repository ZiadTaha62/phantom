import type { Brand } from '../core';

/**
 * Creates a typed caster that assigns a {@link Brand} to a value.
 *
 * This is a zero-cost runtime assertion helper — it simply returns the value
 * with the brand's nominal type applied. Use it for simple branded primitives
 * where you know the value is valid.
 *
 * @template B - The brand declaration to assign.
 * @returns A function that casts any value to the branded type.
 */
export const asBrand =
  <B extends Brand.Any>() =>
  <T>(value: T) =>
    value as Brand.Assign<B, T>;
