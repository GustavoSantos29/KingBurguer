import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'ingrediente.dart';

class Lanche {
  final int id;
  final String name;
  final String description;
  final List<Ingrediente> ingredientes;
  final double price;
  final String? image;

  Lanche({
    required this.id,
    required this.name,
    required this.description,
    required this.ingredientes,
    required this.price,
     this.image,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'price': price,
      'image': image,
    };
  }
  factory Lanche.fromMap(Map<String, dynamic> map) {
    return Lanche(
      id: map['id'],
      name: map['name'],
      description: map['description'],
      price: (map['price'] as num).toDouble(),
      image: map['image'],
      ingredientes: (map['ingredientes'] as List)
          .map((e) => Ingrediente.fromMap(e))
          .toList(),
    );
  }

}

