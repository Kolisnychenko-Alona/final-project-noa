import { AbstractControl } from '@angular/forms';

export function ConfirmPassword(confirmControlName: string) {
  return (control: AbstractControl) => {
    const confirmControl = control.root.get(confirmControlName);
    if (confirmControl && control.value !== confirmControl.value) {
      return { matchFields: true };
    }
    return null;
  };
}
