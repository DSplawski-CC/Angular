declare global {
  namespace jasmine {
    interface Matchers<T> {
      /**
       * Checks the emission of events from an EventEmitter:
       * - Without arguments: whether at least one event was emitted.
       * - With `expectedValue`: whether the given value was emitted at least once.
       * - With `expectedValue` and `expectedCount`: whether the given value was emitted exactly expectedCount times.
       * - With only `expectedCount`: whether any event (any value) was emitted exactly expectedCount times.
       */
      toHaveEmitted(expectedValue?: T extends import('@angular/core').EventEmitter<infer U> ? U : unknown, expectedCount?: number): boolean;
    }
  }
}

export const outputEventMatchers: jasmine.CustomMatcherFactories = {
  toHaveEmitted: (util: jasmine.MatchersUtil) => {
    return {
      compare(actual: any, expectedValue?: any, expectedCount?: number) {
        // Check if `actual` is an EventEmitter
        const isEventEmitter = !!actual && typeof actual.subscribe === 'function' && typeof actual.emit === 'function';
        if (!isEventEmitter) {
          return {
            pass: false,
            message: 'Matcher toHaveEmitted should be used with an EventEmitter (e.g., a component @Output).'
          };
        }

        // If the emit method has been spied on (via spyOn), use the call information.
        const emitSpy = actual.emit && (actual.emit as any).calls;
        const callArgs: any[] = emitSpy ? emitSpy.allArgs().map((args: any[]) => args[0]) : [];

        let pass = false;
        let message = '';

        // No expectations (checking if anything was emitted)
        if (expectedValue === undefined && expectedCount === undefined) {
          pass = callArgs.length > 0;
          message = pass
            ? 'Expected the EventEmitter **not** to emit any events, but events were emitted.'
            : 'Expected the EventEmitter to emit at least one event, but **none** were emitted.';
        }
        // Only count (checking for an exact number of emissions of any event)
        else if (expectedValue === undefined && typeof expectedCount === 'number') {
          pass = callArgs.length === expectedCount;
          message = pass
            ? `Expected the EventEmitter **not** to emit an event exactly ${expectedCount} times (but it did).`
            : `Expected the EventEmitter to emit an event exactly ${expectedCount} times, but it emitted ${callArgs.length} times.`;
        }
        // Value + count (checking if a specific value was emitted exactly a given number of times)
        else if (expectedValue !== undefined && typeof expectedCount === 'number') {
          const matchCount = callArgs.filter(arg => util.equals(arg, expectedValue)).length;
          pass = matchCount === expectedCount;
          message = pass
            ? `Expected the value \`${JSON.stringify(expectedValue)}\` **not** to be emitted ${expectedCount} times (but it was).`
            : `Expected the value \`${JSON.stringify(expectedValue)}\` to be emitted ${expectedCount} times, but it was emitted ${matchCount} times.`;
        }
        // Only value (checking if a specific value was emitted at least once)
        else if (expectedValue !== undefined && expectedCount === undefined) {
          const found = callArgs.some(arg => util.equals(arg, expectedValue));
          pass = found;
          message = pass
            ? `Expected the value \`${JSON.stringify(expectedValue)}\` **not** to be emitted, but it was.`
            : `Expected the value \`${JSON.stringify(expectedValue)}\` to be emitted, but it was never emitted.`;
        }

        return { pass, message };
      }
    };
  }
};
