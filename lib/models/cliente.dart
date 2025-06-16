class Cliente {
  final int? id;
  final String name;
  final String address;
  final String phone;
  final String email;
  final String password;
  final String? image; 

  Cliente({
    this.id,
    required this.name,
    required this.address,
    required this.phone,
    required this.email,
    required this.password,
    this.image,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'address': address,
      'phone': phone,
      'email': email,
      'password': password,
      'image': image,
    };
  }

  factory Cliente.fromMap(Map<String, dynamic> map) {
    return Cliente(
      id: map['id'],
      name: map['name'],
      address: map['address'],
      phone: map['phone'],
      email: map['email'],
      password: map['password'],
      image: map['image'],
    );
  }
}