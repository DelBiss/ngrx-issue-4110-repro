//////////
// Copied from https://ngrx.io/api/store/createSelectorFactory
///////////

import { createSelectorFactory, defaultMemoize } from '@ngrx/store';

function removeMatch(arr: string[], target: string): string[] {
  const matchIndex = arr.indexOf(target);
  return [...arr.slice(0, matchIndex), ...arr.slice(matchIndex + 1)];
}

function orderDoesNotMatterComparer<A,B>(a: T, b: T): boolean {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return a === b;
  }
  if (a.length !== b.length) {
    return false;
  }
  let tempB = [...b];
  function reduceToDetermineIfArraysContainSameContents(
    previousCallResult: boolean,
    arrayMember: any
  ): boolean {
    if (previousCallResult === false) {
      return false;
    }
    if (tempB.includes(arrayMember)) {
      tempB = removeMatch(tempB, arrayMember);
      return true;
    }
    return false;
  }
  return a.reduce(reduceToDetermineIfArraysContainSameContents, true);
}

export const createOrderDoesNotMatterSelector = createSelectorFactory(
  (projectionFun) =>
    defaultMemoize(
      projectionFun,
      orderDoesNotMatterComparer,
      orderDoesNotMatterComparer
    )
);
