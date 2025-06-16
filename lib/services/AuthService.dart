import 'package:projetomobile/daos/ClienteDao.dart';
import 'package:projetomobile/models/cliente.dart';

class AuthService {
  final ClienteDao _clienteDao = ClienteDao();

  Future<String?>register(Cliente cliente) async{
    try{
      await _clienteDao.createCliente(cliente);
      return null;
    } catch(e){
      if (e.toString().contains('UNIQUE constraint failed')) {
        return 'Email já cadastrado.';
      }
      return 'Erro ao criar conta.';
    }
  }

  Future<Cliente?>login(String email, String password) async {
    return await _clienteDao.loginCliente(email, password);
  }
}