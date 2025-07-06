import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:projetomobile/widgets/AppDrawer.dart';
import 'package:provider/provider.dart';
import '../models/lanche.dart';
import '../providers/CarrinhoProvider.dart';

class LancheDetailPage extends StatelessWidget {
  final Lanche _lanche;
  const LancheDetailPage({super.key, required Lanche lanche}) : _lanche = lanche;


  void _abrirModalAdicionar(BuildContext context, Lanche lanche) {
    int quantidade = 1;

    final scaffoldContext = context; // contexto com acesso ao Provider

    showDialog(
      context: context,
      builder: (_) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          content: StatefulBuilder(
            builder: (context, setState) {
              return SizedBox(
                width: MediaQuery.of(context).size.width * 0.8,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text(
                      'Quantidade',
                      style: TextStyle(
                        fontSize: 20,
                        color: Colors.red,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.remove, color: Colors.red, size: 30),
                          onPressed: () {
                            if (quantidade > 1) {
                              setState(() => quantidade--);
                            }
                          },
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          child: Text(
                            '$quantidade',
                            style: const TextStyle(
                              fontSize: 40,
                              color: Colors.red,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        IconButton(
                          icon: const Icon(Icons.add, color: Colors.red, size: 30),
                          onPressed: () {
                            setState(() => quantidade++);
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.red,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(6),
                          ),
                        ),
                        onPressed: () {
                          scaffoldContext.read<CarrinhoProvider>().adicionar(lanche, quantidade);
                          Navigator.pop(context);
                        },
                        child: const Text(
                          'Adicionar ao Carrinho',
                          style: TextStyle(fontSize: 18, color: Colors.white),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                     OutlinedButton(
                        onPressed: () => Navigator.pop(context),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: Colors.red,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadiusGeometry.circular(12),
                          ),
                          side: const BorderSide(color: Colors.red),
                        ),
                        child: const Text('Cancelar'),
                      ),

                  ],
                ),
              );
            },
          ),
        );
      },
    );
  }




  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
          backgroundColor: Colors.red,
          iconTheme: IconThemeData(
              color: Colors.white
          )
      ),
      drawer: AppDrawer(),
      body: SingleChildScrollView(
        child: Center(
          child: Column(
          children: [
            SizedBox(height: 20),
            IconButton(
              padding: EdgeInsets.only(right: 320),
              onPressed: () {
                Navigator.pop(context);
                },
              icon: SvgPicture.asset(
                'assets/icons/arrow.svg',
                width: 30,
                height: 30,
                color: Colors.grey,
              ),
            ),
            Text(
                  '${_lanche.name}',
                  style: TextStyle(
                      fontSize: 40
                  ),
                ),
            SizedBox(height: 20),
            ClipRRect(
              child: Image.asset(
                'assets/images/hamburguerExemplo.jpg',
                width: 250,
                height: 250,
                fit: BoxFit.cover,
              ),
            ),
            SizedBox(height: 30),
            Text(
                'Descrição',
                style: TextStyle(
                    fontSize: 24,
                    fontStyle: FontStyle.italic)),
            Container(
                width: 350,
                padding: EdgeInsets.symmetric(vertical: 20, horizontal: 10),
                child: Text(''
                  '${_lanche.description}',
                  textAlign: TextAlign.start,
                  style: TextStyle(
                  fontSize: 14,
                ),
              )
            ),
            Container(
              width: 350,
                child:Divider(thickness: 2, color: Colors.grey[500])
            ),
            Text(
                'Ingredientes',
                style: TextStyle(
                    fontSize: 24,
                    fontStyle: FontStyle.italic)),
            Container(
                width: 350,
                padding: EdgeInsets.symmetric(vertical: 20, horizontal: 10),
                child: Text(
                  '${_lanche.ingredientes.map((i) => i.name).join(', ')}',
                  textAlign: TextAlign.start,
                  style: TextStyle(
                    fontSize: 14,
                  ),
                )
            ),
            Container(
                padding: EdgeInsets.only(left: 20),
                alignment: Alignment.centerLeft,
                child:ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red,
                    padding: EdgeInsets.symmetric(vertical: 12, horizontal: 20),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  onPressed: () {_abrirModalAdicionar(context,_lanche);
                  },
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      SvgPicture.asset(
                        'assets/icons/cart.svg',
                        width: 24,
                        height: 24,
                        color: Colors.white,
                      ),
                      SizedBox(width: 8),
                      Text(
                        'Adicionar ao carrinho',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                ),
            ),
            SizedBox(height: 100)
          ],
        ),
      )
      )
    );
  }
}
