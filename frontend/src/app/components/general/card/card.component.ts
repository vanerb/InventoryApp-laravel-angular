import {Component, Input, Output} from '@angular/core';
import {Image, Item} from "../../../interfaces/item";
import {EventEmitter} from '@angular/core'; // ✅ El normal de Angular
import {UtilitiesService} from "../../../services/utilities.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})


export class CardComponent {

  @Input() item!: Item

  @Output() action = new EventEmitter<{
    item: Item;
    type: 'delete' | 'update' | 'view';
  }>();

  constructor(private readonly utilitiesService: UtilitiesService) {
  }

  returnImage(image: Image) {
    if (image !== undefined)
      return 'http://localhost:8000/image/' + image.path.replace(/^images\//, '')
    else
      return ""
  }

  getImages(images: Image[]) {
    return images.filter(el => el.from === 'cover')[0]
  }

  imageError($event: Event) {
    return this.utilitiesService.onImageError($event)
  }


  viewItem(item: Item) {
    this.action.emit({
      item: item,
      type: 'view'
    })
  }

  editItem(item: Item) {
    this.action.emit({
      item: item,
      type: 'update'
    })
  }

  deleteItem(item: Item) {
    this.action.emit({
      item,
      type: 'delete'
    });
  }
}
