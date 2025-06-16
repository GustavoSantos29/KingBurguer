import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Lanche {
  final int id;
  final String name;
  final String description;
  final List<String> ingredients;
  final double price;
  final String? image;

  Lanche({
    required this.id,
    required this.name,
    required this.description,
    required this.ingredients,
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
  factory Lanche.fromMap(Map<String, dynamic> map, List<String> ingredientes) {
    return Lanche(
      id: map['id'],
      name: map['name'],
      description: map['description'],
      price: map['price'],
      image: map['image'],
      ingredients: ingredientes,
    );
  }

}

