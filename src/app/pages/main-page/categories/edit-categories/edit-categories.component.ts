import { alerts } from './../../../../helpers/alerts';
import { Icategories } from './../../../../interface/icategories';
import { CategoriesService } from './../../../../services/categories.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { functions } from 'src/app/helpers/functions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import '../../../../shared/spinkit/sk-cube-grid.css';

export interface IDialogData {
  id: string;
}

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css'],
})
export class EditCategoriesComponent implements OnInit {
  //Creamos grupo de controles
  public f = this.form.group({
    icon: ['', Validators.required],
    image: '',
  });
  //Validacion personalizada
  get icon() {
    return this.f.controls.icon;
  }
  get image() {
    return this.f.controls.image;
  }
  public formSubmit: boolean = false;
  public imgTemp: string = '';
  public resultImg: string = '';
  public nameImage: string = '';
  public urlInput: string = '';
  public iconView: string = '';
  public loadData: boolean = false;
  public nameView: string = '';
  public titleView: any = {};
  public state: string = '';
  public view: number = 0;

  constructor(
    private form: FormBuilder,
    private categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<EditCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {}

  ngOnInit(): void {
    this.loadData = true;
    this.categoriesService.getItem(this.data.id).subscribe((resp: any) => {
      this.icon.setValue(resp.icon);
      this.iconView = `<i class="${resp.icon}"></i>`;
      this.imgTemp = resp.image;
      this.nameImage = resp.image;
      this.nameView = resp.name;
      this.urlInput = resp.url;
      this.titleView = JSON.parse(resp.title_list);
      this.state = resp.state;
      this.view = resp.view;
      this.loadData = false;
    });
  }

  public editCategory(): void {
    this.loadData = true;
    //Validamos que el formulario haya sido enviado
    this.formSubmit = true;
    //Validamos que el formulario este correcto
    if (this.f.invalid) {
      return;
    }

    //Verificar si hay cambio de imagen
    if (this.resultImg == '') {
      this.resultImg = this.nameImage;
    }

    //Verificamos cambio de icono
    let icon = this.f.controls.icon.value;
    if (this.f.controls.icon.value.split('"')[1] != undefined) {
      icon = this.f.controls.icon.value.split('"')[1];
    }

    //Capturamos la informacion del formulario en la interfaz
    const dataCategory: Icategories = {
      icon: icon,
      image: this.resultImg,
      name: this.nameView,
      title_list: JSON.stringify(this.titleView),
      url: this.urlInput,
      view: Number(this.view),
      state: this.state,
    };

    //Guardar en base de datos la categoria
    this.categoriesService
      .patchData(this.data.id, dataCategory, localStorage.getItem('token'))
      .subscribe(
        (resp) => {
          this.loadData = false;
          this.dialogRef.close('save');
          alerts.basicAlert(
            'Listo',
            'La categoria ha sido guardada',
            'success'
          );
        },
        (err) => {
          this.loadData = false;
          alerts.basicAlert('Error', 'Ha ocurrido un error', 'error');
        }
      );
  }

  public invalidField(field: string): boolean {
    return functions.invalidField(field, this.f, this.formSubmit);
  }

  //Validacion de la imagen
  public validateImage(e: any): void {
    functions.validateImage(e).then((resp: any) => {
      this.imgTemp = resp;
      this.resultImg = resp;
    });
  }

  //Validar que el nombre de categoria no se repita
  public isRepeatCategory() {
    return (control: AbstractControl) => {
      const name = functions.createUrl(control.value);
      return new Promise((resolve) => {
        this.categoriesService.getFilterData('url', name).subscribe((resp) => {
          if (Object.keys(resp).length > 0) {
            resolve({ category: true });
          } else {
            this.urlInput = name;
          }
        });
      });
    };
  }

  //Visualizar icono
  public viewIcon(e: any): void {
    this.iconView = e.target.value;
    e.target.value = this.f.controls.icon.value.split('"')[1];
  }
}
