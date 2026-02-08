import { assertors as NamespaceAssertors } from './assertors';
import { PhantomChain as _PhantomChain } from './chain';
import type {
  Base as NamespaceBase,
  Brand as NamespaceBrand,
  Identity as NamespaceIdentity,
  Input as NamespaceInput,
  Label as NamespaceLabel,
  Tag as NamespaceTag,
  Trait as NamespaceTrait,
  Traits as NamespaceTraits,
  Transformation as NamespaceTransformation,
  Variants as NamespaceVariants,
  ErrorType as _ErrorType,
} from './types';
import { Phantom as NamespacePhantom } from './types';

export namespace Phantom {
  /** --------------------------------------
   * Types
   * --------------------------------------- */

  /**
   * Optional human-readable label metadata.
   *
   * Labels are descriptive only and do not affect identity.
   */
  export namespace Label {
    /** Marker type for labeled values */
    export type Any = NamespaceLabel.Any;
    /** Extract the label */
    export type LabelOf<T> = NamespaceLabel.LabelOf<T>;
    /** Check whether a label exists */
    export type HasLabel<
      T,
      L extends string = string,
    > = NamespaceLabel.HasLabel<T, L>;
  }

  /**
   * Nominal tag metadata.
   *
   * Tags uniquely identify a branded or identified type.
   * A value may only have a single tag.
   */
  export namespace Tag {
    /** Marker type for any tagged value */
    export type Any = NamespaceTag.Any;
    /** Extract the tag from a type */
    export type TagOf<T> = NamespaceTag.TagOf<T>;
    /** Check whether a type is tagged */
    export type HasTag<
      T,
      Ta extends string | symbol = string | symbol,
    > = NamespaceTag.HasTag<T, Ta>;
  }

  /**
   * Variant metadata.
   *
   * Variants represent mutually exclusive states of a type.
   */
  export namespace Variants {
    /** Marker type for variant-bearing values */
    export type Any = NamespaceVariants.Any;
    /** Extract variant union */
    export type VariantsOf<T> = NamespaceVariants.VariantsOf<T>;
    /** Check whether variants exist */
    export type HasVariants<T> = NamespaceVariants.HasVariants<T>;
  }

  /**
   * Base-type metadata.
   *
   * Used to constrain which runtime types a brand, identity,
   * or transformation may be applied to.
   */
  export namespace Base {
    /** Marker type for base constraints */
    export type Any = NamespaceBase.Any;
    /** Extract the base type */
    export type BaseOf<T> = NamespaceBase.BaseOf<T>;
    /** Check whether a base constraint exists */
    export type HasBase<T, B = unknown> = NamespaceBase.HasBase<T, B>;
  }

  /**
   * Input metadata.
   *
   * Utilities for attaching and querying input metadata in transformations.
   */
  export namespace Input {
    /** Marker type for input value */
    export type Any = NamespaceInput.Any;
    /** Extract the input */
    export type InputOf<T> = NamespaceInput.InputOf<T>;
    /** Check whether an input exists */
    export type HasInput<T, I = unknown> = NamespaceInput.HasInput<T, I>;
  }

  /**
   * Trait metadata.
   *
   * Traits behave like a set of capabilities that can be
   * added or removed independently.
   */
  export namespace Traits {
    /** Marker type for trait-bearing values */
    export type Any = NamespaceTraits.Any;
    /** Extract the trait map */
    export type TraitsOf<T> = NamespaceTraits.TraitsOf<T>;
    /** Extract trait keys */
    export type TraitKeysOf<T> = NamespaceTraits.TraitKeysOf<T>;
    /** Check if any traits exist */
    export type HasTraits<
      T,
      Tr extends string | symbol = string | symbol,
    > = NamespaceTraits.HasTraits<T, Tr>;
  }

  /**
   * Branding API.
   *
   * Brands provide nominal typing for otherwise identical values.
   * A value may only be branded once.
   */
  export namespace Brand {
    /** Type guard for any brand. */
    export type Any = NamespaceBrand.Any;
    /** Declare a brand */
    export type Declare<
      T extends string | symbol,
      L extends string = never,
    > = NamespaceBrand.Declare<T, L>;
    /** Assign a brand to a value. Fails if the value is already branded */
    export type Assign<B extends Any, T> = NamespaceBrand.Assign<B, T>;
    /** Assign a brand if possible, otherwise return the original type */
    export type AssignSafe<B extends Any, T> = NamespaceBrand.AssignSafe<B, T>;
    /** Check whether value is branded with */
    export type isBrand<T, B extends Brand.Any> = NamespaceBrand.isBrand<T, B>;
  }

  /**
   * Identity API.
   *
   * Identities are brands with additional constraints:
   * - Base type
   * - Variants
   */
  export namespace Identity {
    /** Type guard for any identity. */
    export type Any = NamespaceIdentity.Any;
    /** Declare an identity */
    export type Declare<
      T extends string | symbol,
      L extends string = never,
      B extends unknown = never,
      V extends string = never,
    > = NamespaceIdentity.Declare<T, L, B, V>;
    /** Assign an identity to a value. Enforces base-type compatibility */
    export type Assign<I extends Any, T> = NamespaceIdentity.Assign<I, T>;
    /** Safe identity assignment */
    export type AssignSafe<I extends Any, T> = NamespaceIdentity.AssignSafe<
      I,
      T
    >;
    /** Set the active variant on an identity */
    export type WithVariant<
      I extends Any,
      V extends Variants.VariantsOf<I>,
    > = NamespaceIdentity.WithVariant<I, V>;
    /** Set the active variant on a value */
    export type WithTypeVariant<
      T,
      V extends Variants.VariantsOf<T>,
    > = NamespaceIdentity.WithTypeVariant<T, V>;
    /** Check whether value is branded with */
    export type isIdentity<T, I extends Any> = NamespaceIdentity.isIdentity<
      T,
      I
    >;
  }

  /**
   * Trait API.
   *
   * Traits are additive capabilities that can be attached
   * or removed independently.
   */
  export namespace Trait {
    /** Type guard for any trait. */
    export type Any = NamespaceTrait.Any;
    /** Declare a trait */
    export type Declare<Tr extends string | symbol> =
      NamespaceTrait.Declare<Tr>;
    /** Add a trait */
    export type Add<Tr extends Any, T> = NamespaceTrait.Add<Tr, T>;
    /** Add multiple traits */
    export type AddMulti<
      Tr extends readonly Any[],
      T,
    > = NamespaceTrait.AddMulti<Tr, T>;
    /** Remove a trait */
    export type Drop<Tr extends Any, T> = NamespaceTrait.Drop<Tr, T>;
    /** Remove multiple traits */
    export type DropMulti<
      Tr extends readonly Any[],
      T,
    > = NamespaceTrait.DropMulti<Tr, T>;
    /** Check whether value has trait */
    export type HasTrait<T, Tr extends Any> = NamespaceTrait.HasTrait<T, Tr>;
  }

  /**
   * Transformation API.
   *
   * Transformations represent reversible operations that
   * change the shape of a value while preserving its origin.
   */
  export namespace Transformation {
    /** Type guard for any transformation. */
    export type Any = NamespaceTransformation.Any;
    /** Declare a transformation */
    export type Declare<
      I,
      T extends string | symbol,
      L extends string = never,
      B extends unknown = never,
      V extends string = never,
    > = NamespaceTransformation.Declare<I, T, L, B, V>;
    /** Apply a transformation to a value. Enforces base-type compatibility */
    export type Apply<Tr extends Any, I, T> = NamespaceTransformation.Apply<
      Tr,
      I,
      T
    >;
    /** Revert a transformation */
    export type Revert<Tr extends Any, T, I> = NamespaceTransformation.Revert<
      Tr,
      T,
      I
    >;
    /** Revert a transformation whatever transformation was */
    export type RevertAny<T, I> = NamespaceTransformation.RevertAny<T, I>;
    /** Check whether value is transformed with */
    export type isTransformed<
      T,
      Tr extends Any,
    > = NamespaceTransformation.isTransformed<T, Tr>;
  }

  /**
   * Inspect API.
   *
   * Inspection helpers of phantom types.
   */
  export namespace Inspect {
    /** Get phantom metadata object from a type */
    export type PhantomOf<T> = NamespacePhantom.PhantomOf<T>;
    /** Stip phantom metadata object from a type */
    export type StripPhantom<T> = NamespacePhantom.StripPhantom<T>;
    /** run-time helper for 'StringPhantom', used for debugging mainly */
    export const stripPhantom = NamespacePhantom.stripPhantom;
    /** Extract the label */
    export type LabelOf<T> = NamespaceLabel.LabelOf<T>;
    /** Check whether a base constraint exists */
    export type HasLabel<
      T,
      L extends string = string,
    > = NamespaceLabel.HasLabel<T, L>;
    /** Extract the tag from a type */
    export type TagOf<T> = NamespaceTag.TagOf<T>;
    /** Check whether a type is tagged */
    export type HasTag<
      T,
      Ta extends string | symbol = string | symbol,
    > = NamespaceTag.HasTag<T, Ta>;
    /** Extract variant union */
    export type VariantsOf<T> = NamespaceVariants.VariantsOf<T>;
    /** Check whether variants exist */
    export type HasVariants<T> = NamespaceVariants.HasVariants<T>;
    /** Extract the base type */
    export type BaseOf<T> = NamespaceBase.BaseOf<T>;
    /** Check whether a base constraint exists */
    export type HasBase<T, B = unknown> = NamespaceBase.HasBase<T, B>;
    /** Extract the input */
    export type InputOf<T> = NamespaceInput.InputOf<T>;
    /** Check whether an input exists */
    export type HasInput<T, I = unknown> = NamespaceInput.HasInput<T, I>;
    /** Extract the trait map */
    export type TraitsOf<T> = NamespaceTraits.TraitsOf<T>;
    /** Extract trait keys */
    export type TraitKeysOf<T> = NamespaceTraits.TraitKeysOf<T>;
    /** Check if any traits exist */
    export type HasTraits<
      T,
      Tr extends string | symbol = string | symbol,
    > = NamespaceTraits.HasTraits<T, Tr>;
    /** Check whether value is branded with */
    export type isBrand<T, B extends Brand.Any> = NamespaceBrand.isBrand<T, B>;
    /** Check whether value is branded with */
    export type isIdentity<
      T,
      I extends Identity.Any,
    > = NamespaceIdentity.isIdentity<T, I>;
    /** Check whether value has trait */
    export type HasTrait<T, Tr extends Trait.Any> = NamespaceTrait.HasTrait<
      T,
      Tr
    >;
    /** Check whether value is transformed with */
    export type isTransformed<
      T,
      Tr extends Transformation.Any,
    > = NamespaceTransformation.isTransformed<T, Tr>;
  }

  /** --------------------------------------
   * assertors
   * --------------------------------------- */

  export namespace assertors {
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
    export const asBrand = NamespaceAssertors.asBrand;

    /**
     * Creates a typed caster that assigns an {@link Identity} to a value.
     *
     * This is a zero-cost runtime assertion helper — it simply returns the value
     * with the identity's nominal type applied. Use it when you know a value
     * conforms to an identity but need to assert it for the type system.
     *
     * @template I - The identity declaration to assign.
     * @returns A function that casts any value to the assigned identity type.
     */
    export const asIdentity = NamespaceAssertors.asIdentity;

    /**
     * Creates a typed caster that adds a single {@link Trait} to a value.
     *
     * Zero-runtime-cost assertion helper.
     *
     * @template Tr - The trait declaration to add.
     * @returns A function that adds the trait to any value.
     */
    export const addTrait = NamespaceAssertors.addTrait;

    /**
     * Creates a typed caster that adds multiple {@link Trait}s to a value.
     *
     * Zero-runtime-cost assertion helper.
     *
     * @template Tr - Tuple of trait declarations to add.
     * @returns A function that adds all traits to any value.
     */
    export const addTraits = NamespaceAssertors.addTraits;

    /**
     * Creates a typed caster that removes a single {@link Trait} from a value.
     *
     * Zero-runtime-cost assertion helper.
     *
     * @template Tr - The trait declaration to remove.
     * @returns A function that drops the trait from any value.
     */
    export const dropTrait = NamespaceAssertors.dropTrait;

    /**
     * Creates a typed caster that removes multiple {@link Trait}s from a value.
     *
     * Zero-runtime-cost assertion helper.
     *
     * @template Tr - Tuple of trait declarations to remove.
     * @returns A function that drops all specified traits from any value.
     */
    export const dropTraits = NamespaceAssertors.dropTraits;

    /**
     * Creates a typed applicator for a {@link Transformation}.
     *
     * Use this for "forward" operations (e.g., encrypt, encode, wrap).
     * The `input` parameter is only used for type inference — it is not used at runtime.
     *
     * Zero-runtime-cost assertion helper.
     *
     * @template Tr - The transformation declaration.
     * @returns A function that applies the transformation while preserving the input type for later revert.
     */
    export const applyTransformation = NamespaceAssertors.applyTransformation;

    /**
     * Creates a typed reverter for a {@link Transformation}.
     *
     * Use this for "reverse" operations (e.g., decrypt, decode, unwrap).
     * The `transformed` parameter is used for type inference of the expected input,
     * and `input` is the computed result that must match the stored input type.
     *
     * Zero-runtime-cost assertion helper.
     *
     * @template Tr - The transformation declaration.
     * @returns A function that reverts the transformation, stripping phantom metadata.
     */
    export const revertTransformation = NamespaceAssertors.revertTransformation;
  }

  /** --------------------------------------
   * Phantom object manipulators
   * --------------------------------------- */

  /** Get phantom metadata object from a type */
  export type PhantomOf<T> = NamespacePhantom.PhantomOf<T>;
  /** Stip phantom metadata object from a type */
  export type StripPhantom<T> = NamespacePhantom.StripPhantom<T>;
  /** run-time helper for 'StringPhantom', used for debugging mainly */
  export const stripPhantom = NamespacePhantom.stripPhantom;

  /** --------------------------------------
   * Error type
   * --------------------------------------- */

  /** Unique Error type for rules validation in phantom. */
  export type ErrorType<E> = _ErrorType<E>;

  /** --------------------------------------
   * Chain class
   * --------------------------------------- */

  /**
   * A fluent PhantomChain class for chaining Phantom assertors.
   *
   * This provides a better developer experience (DX) by allowing method chaining
   * with `.with(assertor)` instead of nesting function calls or using a variadic chain.
   * Each `.with()` applies the assertor to the current value, updating the type incrementally.
   * Call `.end()` to retrieve the final value.
   *
   * At runtime, assertors are zero-cost casts, so the PhantomChain adds minimal overhead
   * (just object creation and method calls).
   *
   * Example:
   * ```ts
   * const asMyBrand = Phantom.assertors.asBrand<MyBrand>();
   * const asMyTrait = Phantom.assertors.asTrait<MyTrait>();
   * const applyMyTransform = Phantom.assertors.applyTransformation<MyTransform>();
   *
   * const result = new PhantomChain("value")
   *   .with(asMyBrand)
   *   .with(asMyTrait)
   *   .with(applyMyTransform)
   *   .end();
   * ```
   */
  export const PhantomChain = _PhantomChain;
}
