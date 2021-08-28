import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Machine } from 'src/Models/Machine';

export class NewMachineValidator {

    static nameExistValidate = (machines: Machine[]): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            const nameExist = machines.some(machine => machine.name === control.value);
            return control.value.trim() === '' || !nameExist ? null : { nameExistValid: true };
        };
    }

}
