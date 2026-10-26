/**
 * @readonly
 * @constant {string}
 * - one letter,
 * - one number
 * - one special character
 * - one capital letter
 * - Minimum twelve characters with at least all the above conditions
 */
export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&-+=()|~!_?,]).{12,}$/;

export const macIdRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
