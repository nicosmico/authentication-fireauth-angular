import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

export class CustomValidators{
    static confirmPassword(form: AbstractControl){
        const password= form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        if(password === confirmPassword){
            return null;
        }
        return { passwords_not_match: true };
    }

    // static checkCategoryName(categoryService: CategoryService){
    //     return (control: AbstractControl) => {
    //         const categoryName = control.value;
    //         return categoryService.isCategoryAviliable(categoryName).pipe(
    //             map((response: {isAvailable: boolean}) => {
    //                 if(response.isAvailable){
    //                     return null;
    //                 }else{
    //                     return { name_not_available: true };
    //                 }
    //             })
    //         );
    //     }
    // }
}