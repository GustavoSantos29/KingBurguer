import 'package:flutter/material.dart';
import 'package:projetomobile/models/cliente.dart';
import 'package:projetomobile/services/AuthService.dart';
import 'package:projetomobile/widgets/AppDrawer.dart';
import 'package:provider/provider.dart';

import '../providers/ClienteProvider.dart';

class Editprofile extends StatefulWidget {
  const Editprofile({super.key});

  @override
  State<Editprofile> createState() => _EditprofileState();
}

class _EditprofileState extends State<Editprofile> {
  late TextEditingController _nameController;
  late TextEditingController _addressController;
  late TextEditingController _phoneController;
  final _authService = AuthService();

  @override
  void initState() {
    super.initState();
    final cliente = context.read<ClienteProvider>().cliente;
    _nameController = TextEditingController(text: cliente?.name ?? '');
    _addressController = TextEditingController(text: cliente?.address ?? '');
    _phoneController = TextEditingController(text: cliente?.phone ?? '');
  }

  @override
  void dispose() {
    _nameController.dispose();
    _addressController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  void salvar() async {
    final clienteProvider = context.read<ClienteProvider>();
    final cliente = clienteProvider.cliente;

    if (cliente == null) return;
    try {
      final token = await AuthService().getToken();

      final updatedCliente = await _authService.updateCliente(
        name: _nameController.text,
        address: _addressController.text,
        phone: _phoneController.text,
      );

      clienteProvider.updateCliente(updatedCliente);

      Navigator.pop(context);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erro ao atualizar: $e')),
      );
    }

  }

  @override
  Widget build(BuildContext context) {
    final cliente = context.watch<ClienteProvider>().cliente;

    if (cliente == null) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      drawer: AppDrawer(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const SizedBox(height: 30),
            Text(
              cliente.name,
              style: const TextStyle(
                fontSize: 24,
                color: Colors.grey,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),
            ClipRRect(
              borderRadius: BorderRadius.circular(200),
              child: Image.asset(
                'assets/images/defaultUser.png',
                width: 200,
                height: 200,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(height: 30),
            const Align(
              alignment: Alignment.centerLeft,
              child: Text('Nome', style: TextStyle(color: Colors.red)),
            ),
            TextField(
              controller: _nameController,
              decoration: _inputDecoration('Digite seu nome'),
            ),
            const SizedBox(height: 16),
            const Align(
              alignment: Alignment.centerLeft,
              child: Text('Endereço', style: TextStyle(color: Colors.red)),
            ),
            TextField(
              controller: _addressController,
              decoration: _inputDecoration('Digite seu endereço'),
            ),
            const SizedBox(height: 16),
            const Align(
              alignment: Alignment.centerLeft,
              child: Text('Telefone', style: TextStyle(color: Colors.red)),
            ),
            TextField(
              controller: _phoneController,
              decoration: _inputDecoration('(55) 99999-9999'),
              keyboardType: TextInputType.phone,
            ),
            const SizedBox(height: 32),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: salvar,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.red,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadiusGeometry.circular(12),
                      ),
                    ),
                    child: const Text('Salvar'),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: OutlinedButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.red,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadiusGeometry.circular(12),
                      ),
                      side: const BorderSide(color: Colors.red),
                    ),
                    child: const Text('Cancelar'),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  InputDecoration _inputDecoration(String hint) {
    return InputDecoration(
      hintText: hint,
      enabledBorder: const OutlineInputBorder(
        borderSide: BorderSide(color: Colors.red),
      ),
      focusedBorder: const OutlineInputBorder(
        borderSide: BorderSide(color: Colors.red, width: 2),
      ),
    );
  }
}
