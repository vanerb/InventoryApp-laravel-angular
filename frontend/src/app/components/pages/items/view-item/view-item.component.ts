import { Component } from '@angular/core';
import {Image, Item} from "../../../../interfaces/item";

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrl: './view-item.component.css'
})
export class ViewItemComponent {

  item!: Item;

  returnImage(image: Image) {
    if (image !== undefined)
      return 'http://localhost:8000/image/' + image.path.replace(/^images\//, '')
    else
      return ""
  }

  getImages(images: Image[]) {
    return images.filter(el => el.from === 'cover')[0]
  }

}
