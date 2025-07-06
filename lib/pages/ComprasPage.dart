import 'package:flutter/material.dart';
import 'package:projetomobile/models/compra.dart';
import 'package:projetomobile/services/CompraService.dart';

import '../widgets/AppDrawer.dart';

class ComprasPage extends StatefulWidget {
  const ComprasPage({super.key});

  @override
  State<ComprasPage> createState() => _ComprasPageState();
}

class _ComprasPageState extends State<ComprasPage> {
  final CompraService _compraService = CompraService();

  late Future<List<Compra>> _comprasFuture;

  @override
  void initState() {
    super.initState();
    _comprasFuture = _compraService.listarCompras();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      drawer: AppDrawer(),
      body: FutureBuilder<List<Compra>>(
        future: _comprasFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(child: Text('Erro: ${snapshot.error}'));
          }

          final compras = snapshot.data ?? [];
          if (compras.isEmpty) {
            return const Center(child: Text('Nenhuma compra encontrada.'));
          }

          return ListView.builder(
            itemCount: compras.length,
            itemBuilder: (context, index) {
              final compra = compras[index];
              return Card(
                margin: const EdgeInsets.all(8),
                child: ListTile(
                  leading: compra.primeiroLanche != null
                      ? Image.asset(
                    'assets/images/hamburguerExemplo.jpg',
                    width: 50,
                    height: 50,
                  )
                      : const Icon(Icons.fastfood),
                  title: Text(
                    'Total: R\$ ${compra.total.toStringAsFixed(2)}',
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  subtitle: Text(
                    'Data: ${compra.createdAt.day}/${compra.createdAt.month}/${compra.createdAt.year}',
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
