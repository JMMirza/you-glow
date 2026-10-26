import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isFileSizeValid', async: false })
class IsFileSizeValidConstraint implements ValidatorConstraintInterface {
  validate(fileArray: any[]) {
    if (fileArray && Array.isArray(fileArray)) {
      for (const file of fileArray) {
        if (file.size > 35 * 1024 * 1024) {
          // File size exceeds 35 MB
          return false;
        }
      }
    }
    return true;
  }
}

@ValidatorConstraint({ name: 'isSingleFileSizeValid', async: false })
class IsSingleFileSizeValidConstraint implements ValidatorConstraintInterface {
  validate(file: any) {
    if (file && file.size > 35 * 1024 * 1024) {
      // File size exceeds 35 MB
      return false;
    }
    return true;
  }
}

export function IsFileSizeValid(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isFileSizeValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: any) {
          if (Array.isArray(value)) {
            // Use array validator for multiple files
            return new IsFileSizeValidConstraint().validate(value);
          } else {
            // Use single file validator for individual file
            return new IsSingleFileSizeValidConstraint().validate(value);
          }
        },
      },
    });
  };
}
