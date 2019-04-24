import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialComponentsModule } from "./material-components.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialComponentsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
