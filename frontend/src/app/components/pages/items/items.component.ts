import {Component, OnInit} from '@angular/core';
import {CreateItem, Item} from "../../../interfaces/item";
import {ItemsService} from "../../../services/items.service";
import {ModalService} from "../../../services/modal.service";
import {AddItemComponent} from "./add-item/add-item.component";
import {WarningModalComponent} from "../../general/warning-modal/warning-modal.component";
import {EditItemComponent} from "./edit-item/edit-item.component";
import {ViewItemComponent} from "./view-item/view-item.component";
import {UtilitiesService} from "../../../services/utilities.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {

  items: Item[] = []


  constructor(private readonly itemsService: ItemsService, private readonly modalService: ModalService, private readonly utilitiesService: UtilitiesService,) {

  }


  ngOnInit() {
    this.itemsService.all().subscribe({
      next: (data: Item[]) => this.items = data,
      error: (err) => console.error('Error al obtener usuarios', err),
      complete: () => console.log('Petición completada'),
    });

    console.log(this.items)
  }

  addItem() {

    this.modalService.open(AddItemComponent, {
        width: '90%',

      },
      {}).then(async (item: FormData) => {


      this.itemsService.create(item).subscribe({
        next: async () => {
          this.updateItems()
        },
        error: (err) => {

        }
      });

    })
      .catch(() => {
        this.modalService.close()
      });


  }

  editItem(item: Item) {

    this.modalService.open(EditItemComponent, {
        width: '90%',

      },
      {
        item: item
      }).then(async () => {

    })
      .catch(() => {
        this.modalService.close()
      });


  }

  deleteItem(item: Item) {
    this.modalService.open(WarningModalComponent, {
        width: '350px',

      },
      {
        title: "Eliminar",
        message: "¿Está seguro de que quiere eliminar el elemento " + item.name + "?",
        type: "delete"
      }).then(async () => {

      this.itemsService.delete(item.id).subscribe({
        next: () => {
          this.updateItems()
        },
        error: (err) => console.error('Error al obtener usuarios', err),
        complete: () => console.log('Petición completada'),
      });
    })
      .catch(() => {
        this.modalService.close()
      });
  }

  viewItem(id: number) {
    this.modalService.open(ViewItemComponent, {
      width: '90%',

    }, {}).then(async () => {

    })
      .catch(() => {
        this.modalService.close()
      });
  }

  imageError($event: Event) {
    return this.utilitiesService.onImageError($event)
  }

  updateItems() {
    this.itemsService.all().subscribe({
      next: (data: Item[]) => this.items = data,
      error: (err) => console.error('Error al obtener usuarios', err),
      complete: () => console.log('Petición completada'),
    });
  }

}
