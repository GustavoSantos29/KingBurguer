import 'package:projetomobile/db/AppDataBase.dart';
import 'package:sqflite/sqflite.dart';
import '../models/cliente.dart';


class ClienteDao {
  final String table = 'clientes';

  Future<int> createCliente(Cliente cliente) async {
    final db = await AppDataBase().database;
    try{
    return await db.insert(
      table,
      cliente.toMap(),
      conflictAlgorithm: ConflictAlgorithm.abort,
    );
    }catch(e){
      throw Exception('Erro ao criar cliente');
    }
  }

  Future<Cliente?> loginCliente(String email, String senha) async{
    final db = await AppDataBase().database;
    final result = await db.query(
        table,
        where: 'email = ? AND password = ?',
        whereArgs: [email,senha],
    );
    return result.isNotEmpty ? Cliente.fromMap(result.first) : null;
  }

  Future<Cliente?> getCliente(int id) async {
    final db = await AppDataBase().database;
    final result = await db.query(
      table,
      where: 'id = ?',
      whereArgs: [id],
    );
    return result.isNotEmpty ? Cliente.fromMap(result.first) : null;
  }

  Future<int> updateCliente({
    required int id,
    required String name,
    required String address,
    required String phone,
    String? image,
  }) async {
    final db = await AppDataBase().database;
    return await db.update(
      table,
      {
        'name': name,
        'address': address,
        'phone': phone,
        'image': image,
      },
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  Future<int> deleteCliente(int id) async {
    final db = await AppDataBase().database;
    return await db.delete(
      table,
      where: 'id = ?',
      whereArgs: [id],
    );
  }
}
