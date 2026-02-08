import type {
  Base as NamespaceBase,
  Label as NamespaceLabel,
  Tag as NamespaceTag,
  Variants as NamespaceVariants,
} from '../core';
import type { ErrorType, Errors } from '../errors';
import type {
  HandleOriginalType,
  PatchMetadata,
  Prettify,
  WithMetadata,
} from './helpers';

/**
 * Identity API.
 *
 * Identities are brands with additional constraints:
 * - Base type
 * - Variants
 */
export namespace Identity {
  /** Type guard for any identity. */
  export type Any = NamespaceTag.Of<string | symbol>;

  /** Declare an identity */
  export type Declare<
    T extends string | symbol,
    L extends string = never,
    B extends unknown = never,
    V extends string = never,
  > = Prettify<
    NamespaceTag.Of<T> &
      NamespaceLabel.OfIfExists<L> &
      NamespaceBase.OfIfExists<B> &
      NamespaceVariants.OfIfExists<V>
  >;

  /**
   * Assign an identity to a value.
   * Enforces base-type compatibility.
   */
  export type Assign<I extends Any, T> =
    T extends ErrorType<any> ? T : _Assign<I, HandleOriginalType<T>>;

  /** Internal implementation of 'Identity.Assign' */
  type _Assign<I extends Any, T> =
    NamespaceTag.HasTag<T> extends true
      ? ErrorType<Errors<I, T>['alreadyBranded']>
      : T extends NamespaceBase.BaseOf<I>
        ? WithMetadata<T, I>
        : ErrorType<Errors<I, T>['typeNotExtendBase']>;

  /** Safe identity assignment */
  export type AssignSafe<I extends Any, T> =
    T extends ErrorType<any> ? T : _AssignSafe<I, HandleOriginalType<T>>;

  /** Internal implementation of 'Identity.AssignSafe' */
  type _AssignSafe<I extends Any, T> =
    NamespaceTag.HasTag<T> extends true
      ? T
      : T extends NamespaceBase.BaseOf<I>
        ? WithMetadata<T, I>
        : ErrorType<Errors<I, T>['typeNotExtendBase']>;

  /** Set the active variant on an identity */
  export type WithVariant<
    I extends Any,
    V extends NamespaceVariants.VariantsOf<I>,
  > = PatchMetadata<I, NamespaceVariants.Of<V>>;

  /** Set the active variant on a value */
  export type WithTypeVariant<T, V extends NamespaceVariants.VariantsOf<T>> =
    T extends ErrorType<any> ? T : _WithTypeVariant<HandleOriginalType<T>, V>;

  /** Internal implementation of 'Identity.WithTypeVariant' */
  type _WithTypeVariant<
    T,
    V extends NamespaceVariants.VariantsOf<T>,
  > = WithMetadata<T, NamespaceVariants.Of<V>>;

  /** Check whether value is branded with */
  export type isIdentity<T, I extends Any> = T extends I ? true : false;
}
