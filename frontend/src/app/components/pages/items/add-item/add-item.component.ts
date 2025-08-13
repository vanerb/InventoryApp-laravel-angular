import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../../services/users.service";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {ItemsService} from "../../../../services/items.service";
import {CreateItem} from "../../../../interfaces/item";
import {ModalService} from "../../../../services/modal.service";
import {WarningModalComponent} from "../../../general/warning-modal/warning-modal.component";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  form: FormGroup

  confirm!: (result?: any) => void;
  close!: () => void;


  constructor(private readonly userService: UsersService, private fb: FormBuilder, private router: Router, private readonly authService: AuthService, private readonly itemsService: ItemsService, private readonly modalService: ModalService) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      cover_image: [null],
      gallery_images: [null],
    });
  }

  onCoverImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.form.get('cover_image')?.setValue(file);
    }
  }

  onGalleryImagesChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      this.form.get('gallery_images')?.setValue(fileArray);
    }
  }


  addItem() {

    if (this.form.valid) {
      const formData = new FormData();

      formData.append('name', this.form.get('name')?.value);
      formData.append('description', this.form.get('description')?.value);

      const coverImage = this.form.get('cover_image')?.value;
      if (coverImage) {
        formData.append('cover_image', coverImage);
      }

      const galleryImages: File[] = this.form.get('gallery_images')?.value || [];
      galleryImages.forEach((img, index) => {
        formData.append('gallery_images[]', img);
      });

      this.confirm(formData)
    } else {

      this.modalService.open(WarningModalComponent, {
          width: '350px',

        },
        {
          title: "Aviso",
          message: "Hay errores en el formulario. Porfavor réviselo.",
          type: "info"
        }).then(async () => {


      })
        .catch(() => {
          this.modalService.close()
        });

    }

  }
}
