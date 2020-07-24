import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClienteService} from '../../servicios/cliente.service';
import {Cliente} from '../../modelo/cliente.model';
import {FlashMessagesService} from 'angular2-flash-messages';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };

  // Se usan en el html con #botonCerrar y #clienteForm
  @ViewChild('clienteForm') clienteForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;

  constructor(private clientesServicio: ClienteService, private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.clientesServicio.getClientes()
      .subscribe(
        clientes => {
          this.clientes = clientes;
        }
      );
  }


  getSaldoTotal(): number{
    let saldoTotal = 0;
    if (this.clientes){
      this.clientes.forEach( cliente => {
        saldoTotal += cliente.saldo;
      });
    }
    return saldoTotal;
  }


  agregar({value, valid}: {value: Cliente, valid: boolean}): void {
    if (!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }
    else{
      // Agregar el nuevo cliente
      this.clientesServicio.agregarCliente(value);

      // Resetear contenido del formulario
      this.clienteForm.resetForm();

      // Cerrar el modal
      this.cerrarModal();
    }
  }


  // Cierra la ventana modal
  private cerrarModal(): void{
    this.botonCerrar.nativeElement.click();
  }

}
