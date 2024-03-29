import { NavbarComponent } from './../../../shared/navbar/navbar.component';
import { MatDialog } from '@angular/material/dialog';
import { DisputesService } from './../../../services/disputes.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Idisputes } from './../../../interface/idisputes';
import { MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EditDisputesComponent } from './edit-disputes/edit-disputes.component';

@Component({
  providers: [NavbarComponent],
  selector: 'app-disputes',
  templateUrl: './disputes.component.html',
  styleUrls: ['./disputes.component.css'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed,void',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
      transition(
        'expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DisputesComponent implements OnInit {
  public displayedColumns: string[] = [
    'position',
    'order',
    'transmitter',
    'receiver',
    'message',
    'actions',
  ]; //Variable para nombrar las columnas de la tabla
  public dataSource!: MatTableDataSource<Idisputes>; //Instancia la data que aparecera en la tabla
  public disputes: Idisputes[] = [];
  public expandedElement!: Idisputes | null;
  public loadData: boolean = false;

  //Paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //Orden
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private disputesService: DisputesService,
    private dialog: MatDialog,
    private navbarComponent: NavbarComponent
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.loadData = true;

    this.disputesService.getData().subscribe((resp: any) => {
      // Se ajusta la respuesta de la bd a la interfaz
      let position: number = 1;

      this.disputes = this.disputesService.formatDisputes(resp);

      this.dataSource = new MatTableDataSource(this.disputes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.loadData = false;
    });
  }

  //FIltro de busqueda
  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public editDispute(id: string): void {
    const dialogRef = this.dialog.open(EditDisputesComponent, {
      width: '100%',
      data: {
        id,
      },
    });

    //Actualizar el listado de la tabla
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
        //Se actualiza el icono del navbar
        this.navbarComponent.getDisputes();
      }
    });
  }
}
