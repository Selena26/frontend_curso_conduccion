import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService]
    });

    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia guardar usuario', () => {
    const usuario = { /* usuario data */ };

    service.saveUsuario(usuario).then(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/usuario');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('Deberia obtener usuarios', () => {
    service.getUsers().then(users => {
      expect(users).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/usuarios');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('Deberia obtener un usuario', () => {
    service.getUsers1().then(users => {
      expect(users).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/usuarios1');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('Deberia obtener usuarios por ID', () => {
    const userId = 1;

    service.getUserById(userId).then(user => {
      expect(user).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:3000/usuario/getById/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('Deberia actualizar usuarios', () => {
    const userId = 1;
    const usuario = { /* updated usuario data */ };

    service.updateUsuario(userId, usuario).then(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:3000/usuario/update/${userId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('Deberia eliminar un usuario', () => {
    const userId = 1;

    service.deleteUsuario(userId).then(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:3000/usuario/delete/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('Deberia chequear si un correo existe', () => {
    const email = 'test@example.com';

    service.checkEmailExists(email).subscribe(response => {
      expect(response.emailExists).toBe(true); // You can adjust this based on your test data
    });

    const req = httpMock.expectOne(`http://localhost:3000/usuario/checkEmail/${email}`);
    expect(req.request.method).toBe('GET');
    req.flush({ emailExists: true }); // You can adjust this based on your test data
  });

  it('Deberia chequear si la cedula existe', () => {
    const cedula = '1234567890';
    service.checkCedulaExists(cedula).subscribe(response => {
      expect(response.cedulaExists).toBe(true); // You can adjust this based on your test data
    });

    const req = httpMock.expectOne(`http://localhost:3000/usuario/checkCedula/${cedula}`);
    expect(req.request.method).toBe('GET');
    req.flush({ cedulaExists: true }); // You can adjust this based on your test data
  });
});
