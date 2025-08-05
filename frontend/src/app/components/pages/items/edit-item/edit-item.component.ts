import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../../services/users.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {ItemsService} from "../../../../services/items.service";
import {Item} from "../../../../interfaces/item";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css'
})
export class EditItemComponent implements OnInit {
  form: FormGroup
  @Input() item?: Item;
  selectedImagesGallery: File[] = [];
  selectedImagesCover: File[] = [];

  confirm!: (result?: any) => void;
  close!: () => void;


  constructor(private readonly userService: UsersService, private fb: FormBuilder, private router: Router, private readonly authService: AuthService, private readonly itemsService: ItemsService) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      cover_image: [null],
      gallery_images: [null],
    });
  }

  ngOnInit() {
    this.form.get('name')?.setValue(this.item?.name)
    this.form.get('description')?.setValue(this.item?.description)
    this.item?.images.map(async el => {
      console.log("AAA", el)
      if (el.from == 'gallery') {
        const file = await this.urlToFile('http://localhost:8000/image/' + el.path.replace(/^images\//, ''), el.from + ".jpg", 'image/jpeg');
        this.selectedImagesGallery.push(file)
      } else if (el.from === 'cover') {
        const file = await this.urlToFile('http://localhost:8000/image/' + el.path.replace(/^images\//, ''), el.from + ".jpg", 'image/jpeg');
        this.selectedImagesCover.push(file)
      }

    })


    console.log(this.selectedImagesGallery)

    this.form.get('gallery_images')?.setValue(this.selectedImagesGallery)
    this.form.get('cover_image')?.setValue(this.selectedImagesCover)

  }

   returnImage(image: {
    "id": number,
    "item_id": number,
    "path": string,
    "from": string,
    "created_at": string,
    "updated_at": string
  }) {
    return 'http://localhost:8000/image/' + image.path.replace(/^images\//, '')
  }

  async urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, {type: mimeType});
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

  delete(pos: number, type: string) {
    if (type === 'cover') {
      this.selectedImagesCover.splice(pos, 1);
      this.form.get('ingredients')?.setValue(this.selectedImagesCover);

    } else if (type === 'gallery') {
      this.selectedImagesGallery.splice(pos, 1);
      this.form.get('preparations')?.setValue(this.selectedImagesGallery);

    }
  }


  updateItem() {

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


    }

  }
}
