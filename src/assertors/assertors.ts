import { asBrand as _asBrand } from "./brand";
import { asIdentity as _asIdentity } from "./identity";
import {
  addTrait as _asTrait,
  addTraits as _asTraits,
  dropTrait as _dropTrait,
  dropTraits as _dropTraits,
} from "./trait";
import {
  applyTransformation as _applyTransformation,
  revertTransformation as _revertTransformation,
} from "./transformation";

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
  export const asBrand = _asBrand;

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
  export const asIdentity = _asIdentity;

  /**
   * Creates a typed caster that adds a single {@link Trait} to a value.
   *
   * Zero-runtime-cost assertion helper.
   *
   * @template Tr - The trait declaration to add.
   * @returns A function that adds the trait to any value.
   */
  export const addTrait = _asTrait;

  /**
   * Creates a typed caster that adds multiple {@link Trait}s to a value.
   *
   * Zero-runtime-cost assertion helper.
   *
   * @template Tr - Tuple of trait declarations to add.
   * @returns A function that adds all traits to any value.
   */
  export const addTraits = _asTraits;

  /**
   * Creates a typed caster that removes a single {@link Trait} from a value.
   *
   * Zero-runtime-cost assertion helper.
   *
   * @template Tr - The trait declaration to remove.
   * @returns A function that drops the trait from any value.
   */
  export const dropTrait = _dropTrait;

  /**
   * Creates a typed caster that removes multiple {@link Trait}s from a value.
   *
   * Zero-runtime-cost assertion helper.
   *
   * @template Tr - Tuple of trait declarations to remove.
   * @returns A function that drops all specified traits from any value.
   */
  export const dropTraits = _dropTraits;

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
  export const applyTransformation = _applyTransformation;

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
  export const revertTransformation = _revertTransformation;
}
