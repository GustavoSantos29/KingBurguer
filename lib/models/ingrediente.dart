class Ingrediente {
  final int id;
  final String name;

  Ingrediente({
    required this.id,
    required this.name,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
    };
  }

  factory Ingrediente.fromMap(Map<String, dynamic> map) {
    return Ingrediente(
      id: map['ingrediente']['id'],
      name: map['ingrediente']['name'],
    );
  }
}
