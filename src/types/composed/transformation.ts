import type {
  Input,
  Base as NamespaceBase,
  Input as NamespaceInput,
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
 * Transformation API.
 *
 * Transformations represent reversible operations that
 * change the shape of a value while preserving its origin.
 */
export namespace Transformation {
  /** Type guard for any transformation. */
  export type Any = NamespaceInput.Of<any> & NamespaceTag.Of<string | symbol>;

  /** Declare a transformation */
  export type Declare<
    I,
    T extends string | symbol,
    L extends string = never,
    B extends unknown = never,
    V extends string = never,
  > = Prettify<
    NamespaceInput.Of<I> &
      NamespaceTag.Of<T> &
      NamespaceLabel.OfIfExists<L> &
      NamespaceBase.OfIfExists<B> &
      NamespaceVariants.OfIfExists<V>
  >;

  /**
   * Apply a transformation to a value.
   * Enforces base-type compatibility.
   */
  export type Apply<Tr extends Any, I, T> =
    T extends ErrorType<any> ? T : _Apply<Tr, I, HandleOriginalType<T>>;

  /** Internal implementation of 'Transformation.Apply' */
  type _Apply<Tr extends Any, I, T> =
    NamespaceTag.HasTag<T> extends true
      ? ErrorType<Errors<I, T>['alreadyBranded']>
      : T extends NamespaceBase.BaseOf<I>
        ? WithMetadata<T, PatchMetadata<Tr, Input.Of<I>>>
        : ErrorType<Errors<I, T>['typeNotExtendBase']>;

  /** Revert a transformation */
  export type Revert<Tr extends Any, T, I> =
    T extends ErrorType<any> ? T : _Revert<Tr, HandleOriginalType<T>, I>;

  /** Internal implementation of 'Transformation.Revert' */
  type _Revert<Tr extends Any, T, I> =
    NamespaceInput.HasInput<T> extends true
      ? T extends Tr
        ? NamespaceInput.InputOf<T>
        : ErrorType<Errors<Tr, T>['transformationMismatch']>
      : ErrorType<Errors<never, T>['notTransformed']>;

  /** Revert a transformation whatever transformation was */
  export type RevertAny<T, I> =
    T extends ErrorType<any> ? T : _RevertAny<HandleOriginalType<T>>;

  /** Internal implementation of 'Transformation.RevertAny' */
  type _RevertAny<T> =
    NamespaceInput.HasInput<T> extends true
      ? NamespaceInput.InputOf<T>
      : ErrorType<Errors<never, T>['notTransformed']>;

  /** Check whether value is transformed with */
  export type isTransformed<T, Tr extends Any> = T extends Tr ? true : false;
}
