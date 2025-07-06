import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:projetomobile/models/cliente.dart';
import 'package:http/http.dart' as http;

import '../models/compra.dart';

class AuthService {
  final String _baseUrl = 'http://10.0.1.100:3000/auth';
  final _storage = const FlutterSecureStorage();

  //Registar um novo cliente ( usuários do sistema )
  Future<String?> register(Cliente cliente) async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(cliente.toMap()), // corrigido aqui
      );

      print('StatusCode: ${response.statusCode}');
      print('Body: ${response.body}');

      if (response.statusCode == 200 || response.statusCode == 201) {
        return null;
      } else {
        return 'Erro: ${response.body}';
      }
    } catch (e) {
      print('Erro na requisição: $e');
      return 'Erro na requisição: $e';
    }
  }

  // Fazer login
  Future<Cliente?> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      String token = data['token'];
      await _storage.write(key: 'jwt_token', value: token);
      return Cliente.fromMap(data['user']);
      } else {
        return null;
      }
  }

  // Atualizar cliente
  Future<Cliente> updateCliente({
    required String name,
    required String address,
    required String phone
    }) async{
    final response = await http.put(
      Uri.parse('$_baseUrl/update'),
      headers: await _getHeaders(),
      body: jsonEncode({
        'name': name,
        'address': address,
        'phone': phone,
      }),
    );
    if(response.statusCode == 200){
      final data = jsonDecode(response.body)['user'];
      return Cliente.fromMap(data);
    }else{
      throw Exception('Falha ao atualizar usuário');
    }

  }



  Future<Map<String, String>> _getHeaders() async{
    final token = await getToken();
    return{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    };
  }


  // Logout
  Future<void> logout() async {
    await _storage.delete(key: 'jwt_token');
  }


  Future<void> saveToken(String token) async {
    await _storage.write(key: 'token', value: token);
  }

  Future<String?> getToken() async {
    return await _storage.read(key: 'jwt_token');
  }



}

