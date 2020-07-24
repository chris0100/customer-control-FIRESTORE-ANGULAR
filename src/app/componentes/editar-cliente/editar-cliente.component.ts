import {Component, OnInit} from '@angular/core';
import {Cliente} from '../../modelo/cliente.model';
import {ClienteService} from '../../servicios/cliente.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };

  id: string;

  constructor(private clientesServicio: ClienteService, private flashMessages: FlashMessagesService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.clientesServicio.getCliente(this.id)
      .subscribe(cliente => {
        this.cliente = cliente;
      });
  }

  // Guarda los datos del formulario en la ventana de editar
  guardar({value, valid}: { value: Cliente, valid: boolean }): void {
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      value.id = this.id;

      // Modificar el cliente
      this.clientesServicio.modificarCliente(value);

      // Despues de modificado, me redirecciona al inicio
      this.router.navigate(['/']);
    }
  }


  // Eliminar el cliente
  eliminar(): void {
    if (confirm('Seguro que desea eliminar el cliente?')) {

      // Elimina el cliente
      this.clientesServicio.eliminarCliente(this.cliente);

      // Redirecciona
      this.router.navigate(['/']);
    }
  }


}
