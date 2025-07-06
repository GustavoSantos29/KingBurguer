class Compra {
  final int id;
  final double total;
  final DateTime createdAt;
  final Lanche? primeiroLanche;

  Compra({
    required this.id,
    required this.total,
    required this.createdAt,
    this.primeiroLanche,
  });

  factory Compra.fromMap(Map<String, dynamic> map) {
    return Compra(
      id: map['id'],
      total: (map['total'] as num).toDouble(),
      createdAt: DateTime.parse(map['createdAt']),
      primeiroLanche: map['primeiroLanche'] != null
          ? Lanche.fromMap(map['primeiroLanche'])
          : null,
    );
  }
}

class Lanche {
  final int id;
  final String name;

  Lanche({
    required this.id,
    required this.name,
  });

  factory Lanche.fromMap(Map<String, dynamic> map) {
    return Lanche(
      id: map['id'],
      name: map['name'],
    );
  }
}
