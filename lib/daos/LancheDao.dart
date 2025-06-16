import 'package:projetomobile/db/AppDataBase.dart';
import 'package:projetomobile/models/lanche.dart';

class LancheDao {
  static const String table = 'lanches';

  Future<Lanche?> getLanche(int id) async {
    final db = await AppDataBase().database;
    final result = await db.query(
      table,
      where: 'id = ?',
      whereArgs: [id],
    );
    if (result.isNotEmpty) {
      final ingredientesMap = await db.rawQuery('''
      SELECT i.name FROM ingredientes i
      INNER JOIN lanche_ingrediente li ON i.id = li.ingrediente_id
      WHERE li.lanche_id = ?
    ''', [id]);

      List<String> ingredientes = ingredientesMap
          .map((e) => (e['name'] ?? '').toString())
          .toList();

      return Lanche.fromMap(result.first, ingredientes);
    } else {
      return null;
    }
  }

  Future<List<Lanche>> getAllLanches() async {
    final db = await AppDataBase().database;
    final lanchesMap = await db.query(table);
    List<Lanche> lanches = [];
    for (var lancheMap in lanchesMap) {
      final ingredientesMap = await db.rawQuery('''
      SELECT i.name FROM ingredientes i
      INNER JOIN lanche_ingrediente li ON i.id = li.ingrediente_id
      WHERE li.lanche_id = ?
      ''', [lancheMap['id']]);

      List<String> ingredientes = ingredientesMap.map((e) {
        final nome = e['name'];
        if (nome is String) {
          return nome;
        } else {
          return '';
        }
      }).toList();
      print(lancheMap);
      lanches.add(Lanche.fromMap(lancheMap, ingredientes));
    }

    return lanches;
  }

  Future<List<Lanche>> searchLanches(String query) async {
    final db = await AppDataBase().database;
    List<Lanche> lanches = [];
    final lanchesMap = await db.query(
      table,
      where: 'name LIKE ?',
      whereArgs: ['%$query%'],
    );

    for (var lancheMap in lanchesMap) {
      final ingredientesMap = await db.rawQuery('''
      SELECT i.name FROM ingredientes i
      INNER JOIN lanche_ingrediente li ON i.id = li.ingrediente_id
      WHERE li.lanche_id = ?
    ''', [lancheMap['id']]);

      List<String> ingredientes = ingredientesMap
          .map((e) => (e['name'] ?? '').toString())
          .toList();

      lanches.add(Lanche.fromMap(lancheMap, ingredientes));
    }
    return lanches;
  }


}