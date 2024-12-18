import {expect} from "vitest"

export function expectToBeIsoTimestamp() {
    const isoTimestampRegExp = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?Z$/;
    return expect.stringMatching(isoTimestampRegExp);
}

export function expectAnyString() {
    return expect.any(String)
}