import { Base, Phantom } from "./core";

/** Interface of 'Brand' and 'Identity' errors. */
export interface Errors<I, T> {
  alreadyBranded: {
    code: "ALREADY_BRANDED";
    message: "Type already branded";
    context: {
      type: T;
    };
  };
  typeNotExtendBase: {
    code: "TYPE_NOT_EXTEND_BASE";
    message: "Type not extend base";
    context: {
      type: Phantom.StripPhantom<T>;
      base: Base.BaseOf<I>;
    };
  };
  transformationMismatch: {
    code: "TRANSFORMATION_MISMATCH";
    message: "Transformation mismatch";
    context: {
      type: T;
      transformation: I;
    };
  };
  notTransformed: {
    code: "NOT_TRANSFORMED";
    message: "Type is not transformed";
    context: {
      type: T;
    };
  };
}

export declare const __ErrorType: unique symbol;

/** Unique Error type for rules validation in phantom. */
export type ErrorType<E> = {
  [__ErrorType]: E;
};
