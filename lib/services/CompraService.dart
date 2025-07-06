import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:projetomobile/models/compra.dart';

class CompraService {
  final _storage = const FlutterSecureStorage();
  final String _baseUrl = 'http://10.0.1.100:3000/compras';

  Future<String?> realizarCompra({
    required List<Map<String, dynamic>> lanches,
    required double total,
    required String endereco,
    String? observacao,
  }) async {
    final token = await _storage.read(key: 'jwt_token');
    if (token == null) return 'Token não encontrado. Faça login novamente.';

    final body = {
      "lanches": lanches,
      "total": total,
      "observacao": observacao ?? '',
      "address": endereco,
    };

    final response = await http.post(
      Uri.parse('$_baseUrl/comprar'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonEncode(body),
    );

    if (response.statusCode == 200) {
      return null;
    } else {
      return 'Erro: ${response.body}';
    }
  }

  Future<List<Compra>> listarCompras() async {
    final token = await _storage.read(key: 'jwt_token');
    if (token == null) throw Exception('Token não encontrado. Faça login novamente.');

    final response = await http.get(
      Uri.parse('$_baseUrl/compras'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((json) => Compra.fromMap(json)).toList();
    } else {
      throw Exception('Erro ao buscar compras: ${response.body}');
    }
  }
}
