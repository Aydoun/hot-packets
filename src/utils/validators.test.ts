import { validateEmail } from './validators';

describe('Validators Test Suite', () => {
  it('Should validate a string email', () => {
    expect(validateEmail('')).toBeFalsy();
    expect(validateEmail(null)).toBeFalsy();
    expect(validateEmail('not-an-email')).toBeFalsy();
    expect(validateEmail('not-an-email@test')).toBeFalsy();
    expect(validateEmail('is-email@email.com')).toBeTruthy();
  });
});
