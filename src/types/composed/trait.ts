import {
  Phantom as NamespacePhantom,
  Traits as NamespaceTraits,
} from "../core";
import { ErrorType } from "../errors";
import {
  Equals,
  HandleOriginalType,
  IfNever,
  IntersectOf,
  WithMetadata,
  WithoutMetadata,
} from "./helpers";

/**
 * Trait API.
 *
 * Traits are additive capabilities that can be attached
 * or removed independently.
 */
export namespace Trait {
  /** Type guard for any trait. */
  export type Any = NamespaceTraits.Of<string | symbol>;

  /** Declare a trait */
  export type Declare<Tr extends string | symbol> = NamespaceTraits.Of<Tr>;

  /** Add a trait */
  export type Add<Tr extends Any, T> =
    T extends ErrorType<any> ? T : _Add<Tr, HandleOriginalType<T>>;

  /** Internal implementation of 'Trait.Add' */
  type _Add<Tr extends Any, T> = WithMetadata<
    T,
    NamespaceTraits.FromMap<
      IfNever<NamespaceTraits.TraitsOf<T>> &
        IfNever<NamespaceTraits.TraitsOf<Tr>>
    >
  >;

  /** Add multiple traits */
  export type AddMulti<Tr extends readonly Any[], T> =
    T extends ErrorType<any> ? T : _AddMulti<Tr, HandleOriginalType<T>>;

  /** Internal implementation of 'Trait.AddMulti' */
  type _AddMulti<Tr extends readonly Any[], T> = WithMetadata<
    T,
    NamespaceTraits.FromMap<
      IfNever<NamespaceTraits.TraitsOf<T>> &
        IfNever<NamespaceTraits.TraitsOf<IntersectOf<Tr[number]>>>
    >
  >;

  /** Remove a trait */
  export type Drop<Tr extends Any, T> =
    T extends ErrorType<any> ? T : _Drop<Tr, HandleOriginalType<T>>;

  /** Internal implementation of 'Trait.Drop' */
  type _Drop<Tr extends Any, T> =
    Equals<
      NamespaceTraits.TraitKeysOf<Tr>,
      NamespaceTraits.TraitKeysOf<T>
    > extends true
      ? Equals<
          keyof NamespacePhantom.PhantomOf<T>,
          "__OriginalType" | "__Traits"
        > extends true
        ? NamespacePhantom.StripPhantom<T>
        : WithoutMetadata<T, "__Traits">
      : WithMetadata<
          T,
          NamespaceTraits.FromMap<
            Omit<NamespaceTraits.TraitsOf<T>, NamespaceTraits.TraitKeysOf<Tr>>
          >
        >;

  /** Remove multiple traits */
  export type DropMulti<Tr extends readonly Any[], T> =
    T extends ErrorType<any> ? T : _DropMulti<Tr, HandleOriginalType<T>>;

  /** Internal implementation of 'Trait.DropMulti' */
  type _DropMulti<Tr extends readonly Any[], T> =
    Equals<
      NamespaceTraits.TraitKeysOf<IntersectOf<Tr[number]>>,
      NamespaceTraits.TraitKeysOf<T>
    > extends true
      ? Equals<
          keyof NamespacePhantom.PhantomOf<T>,
          "__OriginalType" | "__Traits"
        > extends true
        ? NamespacePhantom.StripPhantom<T>
        : WithoutMetadata<T, "__Traits">
      : WithMetadata<
          T,
          NamespaceTraits.FromMap<
            Omit<
              NamespaceTraits.TraitsOf<T>,
              NamespaceTraits.TraitKeysOf<IntersectOf<Tr[number]>>
            >
          >
        >;

  /** Check whether value has trait */
  export type HasTrait<T, Tr extends Any> = T extends Tr ? true : false;
}
