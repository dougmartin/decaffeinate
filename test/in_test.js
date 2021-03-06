import check from './support/check';

describe('in operator', () => {
  it('handles the simple identifier case', () => {
    check(`
      a in b
    `, `
      Array.from(b).includes(a);
    `);
  });

  it('skips Array.from in loose mode', () => {
    check(`
      a in b
    `, `
      b.includes(a);
    `, { looseIncludes: true });
  });

  it('handles a property access as the LHS', () => {
    check(`
      a.b in c
    `, `
      Array.from(c).includes(a.b);
    `);
  });

  it('wraps element in parentheses if needed in a function argument', () => {
    check(`
      a(b, c.d in e)
    `, `
      a(b, Array.from(e).includes(c.d));
    `);
  });

  it('wraps list in parentheses if needed', () => {
    check(`
      a in b + c
    `, `
      Array.from(b + c).includes(a);
    `);
  });

  it('works with a crazy case in an `if` statement', () => {
    check(`
      if a + b in c + d
        e
    `, `
      if (Array.from(c + d).includes(a + b)) {
        e;
      }
    `);
  });

  it('works with negated `in`', () => {
    check(`
      a not in b
    `, `
      !Array.from(b).includes(a);
    `);
  });

  it('works with negated `in` in compound `or` expression', () => {
    check(`
      a or a not in b
    `, `
      a || !Array.from(b).includes(a);
    `);
  });

  it('works with negated `in` in compound `and` expression', () => {
    check(`
      a and a not in b
    `, `
      a && !Array.from(b).includes(a);
    `);
  });

  it('handles negation with `unless`', () => {
    check(`
      unless a in b
        c
    `, `
      if (!Array.from(b).includes(a)) {
        c;
      }
    `);
  });

  it('handles negation with `if not`', () => {
    check(`
      if not (a in b)
        c
    `, `
      if (!(Array.from(b).includes(a))) {
        c;
      }
    `);
  });

  it('handles double negation with `unless`', () => {
    check(`
      unless a not in b
        c
    `, `
      if (Array.from(b).includes(a)) {
        c;
      }
    `);
  });

  it('uses includes without Array.from for literal arrays', () => {
    check(`
      if a in [yes, no]
        b
    `, `
      if ([true, false].includes(a)) {
        b;
      }
    `);
  });

  it('uses includes without Array.from for literal arrays with negation', () => {
    check(`
      if a not in [yes, no]
        b
    `, `
      if (![true, false].includes(a)) {
        b;
      }
    `);
  });

  it('uses includes for a single element', () => {
    check(`
      if a in [yes]
        b
    `, `
      if ([true].includes(a)) {
        b;
      }
    `);
  });

  it('uses includes when the left side is not repeatable', () => {
    check(`
      if a() in [yes, no]
        b
    `, `
      if ([true, false].includes(a())) {
        b;
      }
    `);
  });

  it('uses includes with complicated expressions in the array', () => {
    check(`
      if a in [b and c, +d]
        e
    `, `
      if ([b && c, +d].includes(a)) {
        e;
      }
    `);
  });

  it('uses includes for empty arrays', () => {
    check(`
      if a in []
        b
    `, `
      if ([].includes(a)) {
        b;
      }
    `);
  });
});
