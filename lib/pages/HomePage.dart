import 'package:flutter/material.dart';
import 'package:projetomobile/widgets/AppDrawner.dart';
import 'package:provider/provider.dart';

import '../daos/LancheDao.dart';
import '../models/lanche.dart';
import '../providers/ClienteProvider.dart';
import '../widgets/lancheCard.dart';

class Homepage extends StatefulWidget {
  const Homepage({super.key});

  @override
  State<Homepage> createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {
  final LancheDao lancheDao = LancheDao();
  List<Lanche> _allLanches = [];
  List<Lanche> _lanches = [];
  final TextEditingController searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadLanches();
  }

  void _loadLanches() async {
    final lanches = await lancheDao.getAllLanches();
    setState(() {
      _allLanches = lanches;
      _lanches = lanches;
    });
  }

  void _searchLanches(String query) async {
    if (query.isEmpty) {
      setState(() {
        _lanches = List.from(_allLanches);
      });
      return;
    }

    final lanchesEncontrados = await lancheDao.searchLanches(query);
    setState(() {
      _lanches = lanchesEncontrados.isEmpty ? List.from(_allLanches) : lanchesEncontrados;
    });
  }

  @override
  Widget build(BuildContext context) {
    final cliente = context.watch<ClienteProvider>().cliente;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      drawer: AppDrawer(),
      body: Column(
        children: [
          const SizedBox(height: 16),
          const Text(
            'King Burger',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Colors.red,
              fontStyle: FontStyle.italic,
              fontSize: 40,
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
            child: SearchBar(
              controller: searchController,
              hintText: 'Buscar Lanche',
              leading: const Icon(Icons.search),
              backgroundColor: WidgetStatePropertyAll(Colors.grey[200]),
              shape: WidgetStatePropertyAll(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(5),
                  side: const BorderSide(
                    color: Colors.red,
                    width: 5,
                    strokeAlign: BorderSide.strokeAlignOutside,
                  ),
                ),
              ),
              onChanged: _searchLanches,
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _lanches.length,
              itemBuilder: (context, index) {
                final lanche = _lanches[index];
                return LancheCard(lanche: lanche);
              },
            ),
          ),
        ],
      ),
    );
  }
}
