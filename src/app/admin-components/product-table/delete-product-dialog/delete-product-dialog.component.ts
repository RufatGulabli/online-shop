import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-delete-product-dialog",
  templateUrl: "./delete-product-dialog.component.html",
  styleUrls: ["./delete-product-dialog.component.css"]
})
export class DeleteProductDialogComponent {
  productTitle: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.productTitle = data.title;
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }
}
