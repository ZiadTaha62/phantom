export {
  assertors,
  addTrait,
  addTraits,
  applyTransformation,
  asBrand,
  asIdentity,
  dropTrait,
  dropTraits,
  revertTransformation,
} from './assertors';
export { PhantomChain } from './chain';
export { Phantom } from './phantom';
export type {
  Base,
  Brand,
  ErrorType,
  Identity,
  Input,
  Inspect,
  Label,
  PhantomCore,
  Tag,
  Trait,
  Traits,
  Transformation,
  Variants,
} from './core';
import { Phantom } from './phantom';
export default Phantom;
