import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CommonModule } from "@angular/common";
import { InlineFormComponent } from "../components/inline-form.component";

@NgModule({
    imports: [
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        CommonModule
    ],
    declarations: [
        InlineFormComponent
    ],
    exports: [
        InlineFormComponent
    ]
})
export class InlineFormModule {}