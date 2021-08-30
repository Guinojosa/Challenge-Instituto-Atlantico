import { FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MultipleCommandValidator {

  static multiMachineValidate = (): ValidatorFn => {
    return (machines: FormArray): ValidationErrors | null => {
      const valid = machines.controls.filter(control => control.get('execute').value === true).length > 0;
      return valid ? null : { multiMachinesNotValid: true };
    };
  }

}
