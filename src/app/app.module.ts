import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { MaterialComponentsModule } from "./material-components.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MaterialComponentsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
