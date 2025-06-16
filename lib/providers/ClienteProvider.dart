import 'package:flutter/material.dart';
import '../models/cliente.dart';

class ClienteProvider extends ChangeNotifier {
  Cliente? _cliente;

  Cliente? get cliente => _cliente;

  void setCliente(Cliente cliente) {
    _cliente = cliente;
    notifyListeners();
  }

  void updateCliente(Cliente clienteAtualizado) {
    _cliente = clienteAtualizado;
    notifyListeners();
  }
}
