import 'package:flutter/material.dart';
import 'package:projetomobile/pages/LancheDetailPage.dart';
import '../models/lanche.dart';

class LancheCard extends StatelessWidget {
  final Lanche lanche;

  const LancheCard({super.key, required this.lanche});

  @override
  Widget build(BuildContext context) {
    return
      GestureDetector(
        onTap: () {
        Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => LancheDetailPage(lanche: lanche),
        ),
      );
    },
    child:Column(
      children: [
        Padding(padding:EdgeInsetsGeometry.only(left: 5, top: 20),
          child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Imagem
            ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: Image.asset(
                lanche.image ?? 'assets/images/hamburguerExemplo.jpg',
                width: 80,
                height: 80,
                fit: BoxFit.cover,
              ),
            ),
            SizedBox(width: 12),
            // Texto
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    lanche.name,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    lanche.description,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: Colors.grey[700],
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    '${lanche.price.toStringAsFixed(2)} R\$',
                    style: TextStyle(
                      fontStyle: FontStyle.italic,
                      color: Colors.grey[800],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        ),
        SizedBox(height: 20),
        Divider(thickness: 2, color: Colors.grey[500]),
      ],
    )
      );
  }
}
