import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:projetomobile/pages/HomePage.dart';
import 'package:projetomobile/widgets/AppDrawner.dart';

import '../models/lanche.dart';

class LancheDetailPage extends StatelessWidget {
  final Lanche lanche;
  const LancheDetailPage({super.key, required this.lanche});

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
                  '${lanche.name}',
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
                  '${lanche.description}',
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
                  '${lanche.ingredients.join(', ')}',
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
                  onPressed: () {
                    print('Botão pressionado');
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
