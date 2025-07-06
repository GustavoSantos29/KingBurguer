import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:geocoding/geocoding.dart';
import 'package:projetomobile/services/CompraService.dart';
import 'package:provider/provider.dart';
import 'package:projetomobile/util/locationHelp.dart';
import '../providers/CarrinhoProvider.dart';
import '../providers/ClienteProvider.dart';
import '../widgets/AppDrawer.dart';

class CarrinhoPage extends StatelessWidget {
  final CompraService _comprasService = CompraService();

  void _abrirModalConfirmar(BuildContext context, CarrinhoProvider carrinho) {
    final TextEditingController _observacaoController = TextEditingController();
    late TextEditingController _addressController;
    final cliente = context.read<ClienteProvider>().cliente;
    _addressController = TextEditingController(text: cliente?.address ?? '');


    showDialog(
      context: context,
      builder: (context) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Text(
                    'Confirme seu pedido',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.red,
                    ),
                  ),
                  const SizedBox(height: 16),

                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _addressController,
                          decoration: InputDecoration(
                            labelText: 'Endereço de entrega',
                            labelStyle: const TextStyle(color: Colors.red),
                            focusedBorder: OutlineInputBorder(
                              borderSide: const BorderSide(color: Colors.red),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderSide: const BorderSide(color: Colors.red),
                              borderRadius: BorderRadius.circular(8),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      IconButton(
                        icon: const Icon(Icons.my_location, color: Colors.red),
                        onPressed: () async {
                          final endereco = await LocationHelp.getEndereco(context);
                          if (endereco != null) {
                            _addressController.text = endereco;
                          }
                        },
                      )
                    ],
                  ),

                  const SizedBox(height: 12),

                  TextField(
                    controller: _observacaoController,
                    decoration: InputDecoration(
                      labelText: 'Observações',
                      labelStyle: const TextStyle(color: Colors.red),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.red),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.red),
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    maxLines: 2,
                  ),

                  const SizedBox(height: 16),

                  Text(
                    'Total: R\$ ${carrinho.total.toStringAsFixed(2)}',
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.red,
                    ),
                  ),

                  const SizedBox(height: 20),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      TextButton(
                        onPressed: () => Navigator.pop(context),
                        child: const Text(
                          'Cancelar',
                          style: TextStyle(color: Colors.red),
                        ),
                      ),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.red,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        onPressed: () async {
                          final endereco = _addressController.text.trim();
                          final observacao = _observacaoController.text.trim();

                          if (endereco.isEmpty) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Por favor, informe o endereço.')),
                            );
                            return;
                          }

                          final itens = carrinho.itens.map((item) {
                            return {
                              'id': item.lanche.id,
                              'quantidade': item.quantidade,
                            };
                          }).toList();

                          final erro = await _comprasService.realizarCompra(
                            lanches: itens,
                            endereco: endereco,
                            observacao: observacao,
                            total: carrinho.total,
                          );

                          if (erro == null) {
                            carrinho.limpar();
                            Navigator.pop(context);
                            Navigator.pop(context);
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Pedido realizado com sucesso!')),
                            );
                          } else {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text(erro)),
                            );
                          }
                        },
                        child: const Text(
                          'Confirmar',
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),
          ),
        );
      },
    );

  }


  @override
  Widget build(BuildContext context) {
    final carrinho = context.watch<CarrinhoProvider>();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      drawer: AppDrawer(),
      body: Column(
        children: [
          const SizedBox(height: 16), // espaço topo igual Homepage
          // aqui não coloca título nem search bar
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              itemCount: carrinho.itens.length,
              itemBuilder: (context, index) {
                final item = carrinho.itens[index];

                // Card parecido com Homepage, mas com seus botões de +, -, delete
                return Card(
                  margin: const EdgeInsets.symmetric(vertical: 6),
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                item.lanche.name,
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.red,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                'Quantidade: ${item.quantidade}',
                                style: const TextStyle(fontSize: 14),
                              ),
                            ],
                          ),
                        ),
                        Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.remove, color: Colors.red),
                              onPressed: item.quantidade > 1
                                  ? () => carrinho.alterarQuantidade(item.lanche, item.quantidade - 1)
                                  : null,
                            ),
                            IconButton(
                              icon: const Icon(Icons.add, color: Colors.red),
                              onPressed: () => carrinho.alterarQuantidade(item.lanche, item.quantidade + 1),
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete, color: Colors.red),
                              onPressed: () => carrinho.remover(item.lanche),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            child: Column(
              children: [
                Text(
                  'Total: R\$ ${carrinho.total.toStringAsFixed(2)}',
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 10),
                ElevatedButton(
                  onPressed: () => _abrirModalConfirmar(context, carrinho),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red,
                    foregroundColor: Colors.white,
                    padding: EdgeInsets.symmetric(horizontal: 50, vertical: 10),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadiusGeometry.circular(12),
                    ),
                    elevation: 4,
                  ),
                  child: const Text('Concluir Pedido'),
                ),
                OutlinedButton(
                  onPressed: carrinho.limpar,
                  style: OutlinedButton.styleFrom(
                    foregroundColor: Colors.red,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadiusGeometry.circular(12),
                    ),
                    side: const BorderSide(color: Colors.red),
                  ),
                  child: const Text('Esvaziar Carrinho'),
                ),
                const SizedBox(height: 50),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

