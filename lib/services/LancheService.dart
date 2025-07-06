import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:projetomobile/models/lanche.dart';
import 'package:projetomobile/services/AuthService.dart';

class LancheService {
  final String _baseUrl = 'http://10.0.1.100:3000/lanches';
  final AuthService _authService = AuthService();

  Future<Map<String, String>> _getHeaders() async{
    final token = await _authService.getToken();
    return{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer $token',
    };
  }

  Future<List<Lanche>> getLanches () async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse(_baseUrl),
      headers: headers
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((json) => Lanche.fromMap(json)).toList();
    } else {
      throw Exception('Falha ao carregar lanches');
    }
  }


}