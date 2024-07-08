import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    standalone: true,
    imports: [
        MenubarModule,
        ButtonModule
    ]
})
export class HomeComponent{
   constructor(){} 
}