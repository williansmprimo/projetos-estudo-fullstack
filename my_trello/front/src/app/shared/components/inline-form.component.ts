import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
    selector: "inline-form",
    templateUrl: "inline-form.component.html",
    styles: "inline-form.component.css"
})
export class InlineFormComponent {
    @Input() text = '';
    @Input() type = 'input';
    @Input() showButton = false

    @Output() onSubmit = new EventEmitter<string>();

    isEditing = false;

    form = this.formBuilder.group({
        text: ['']
    });

    constructor(private formBuilder: FormBuilder){}

    handleSubmit(){
        if(this.form.value.text){
            this.isEditing = false;
            this.onSubmit.next(this.form.value.text);
        }
    }

    edit(){
        this.form.patchValue({
            text: this.text
        })
        this.isEditing = true;
    }
}