import { regex } from 'regex';


export interface PasswordRequirements {
  minLength?: number;
  minNumbers?: number;
  minSymbols?: number;
  minLowercase?: number;
  minUppercase?: number;
}

function getStrongPasswordRequirements(): PasswordRequirements {
  return {
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minLowercase: 1,
    minUppercase: 1,
  }
}

export function generatePasswordValidationRegex(passwordRequirements: PasswordRequirements = getStrongPasswordRequirements()) {
  return regex`
  ^
  (?=.{${passwordRequirements?.minLength ?? 0},}$)                      # total length between 8
  (?=(?:.*\d){${passwordRequirements?.minNumbers ?? 0},})              # at least N_DIGITS digits
  (?=(?:.*[a-z]){${passwordRequirements?.minLowercase ?? 0},})          # at least N_LOWER lowercase letters
  (?=(?:.*[A-Z]){${passwordRequirements?.minUppercase ?? 0},})          # at least N_UPPER uppercase letters
  (?=(?:.*[^A-Za-z0-9]){${passwordRequirements?.minSymbols ?? 0},})     # at least N_SYMBOLS symbols
  .+$
  `
}
