import 'package:flutter/material.dart';
import '../models/lanche.dart';

class CarrinhoItem {
  final Lanche lanche;
  int quantidade;

  CarrinhoItem({required this.lanche, this.quantidade = 1});
}

class CarrinhoProvider with ChangeNotifier {
  final List<CarrinhoItem> _itens = [];

  List<CarrinhoItem> get itens => List.unmodifiable(_itens);

  void adicionar(Lanche lanche, int quantidade) {
    final index = _itens.indexWhere((item) => item.lanche.id == lanche.id);
    if (index >= 0) {
      _itens[index].quantidade += quantidade;
    } else {
      _itens.add(CarrinhoItem(lanche: lanche, quantidade: quantidade));
    }
    notifyListeners();
  }

  void remover(Lanche lanche) {
    _itens.removeWhere((item) => item.lanche.id == lanche.id);
    notifyListeners();
  }

  void alterarQuantidade(Lanche lanche, int novaQuantidade) {
    final index = _itens.indexWhere((item) => item.lanche.id == lanche.id);
    if (index >= 0) {
      _itens[index].quantidade = novaQuantidade;
      if (novaQuantidade <= 0) remover(lanche);
      notifyListeners();
    }
  }

  double get total {
    return _itens.fold(0.0, (total, item) => total + (item.lanche.price * item.quantidade));
  }

  void limpar() {
    _itens.clear();
    notifyListeners();
  }
}
