import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class AppDataBase{
  static final AppDataBase _instance = AppDataBase._internal();
  static Database? _database;

  factory AppDataBase() => _instance;

  AppDataBase._internal();

  Future<Database> get database async{
    if(_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }

  Future<Database> _initDatabase() async{
    final path = join(await getDatabasesPath(), 'hamburgueria_database.db');
    return openDatabase(
        path,
        version: 1,
        onCreate: (db, version) async{
          await db.execute('''
            CREATE TABLE lanches(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            price REAL,
            image TEXT
            )
          ''');
          await db.execute('''
            CREATE TABLE ingredientes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
            )
          ''');
          await db.execute('''
          CREATE TABLE lanche_ingrediente(
          lanche_id INTEGER,
          ingrediente_id INTEGER,
          FOREIGN KEY (lanche_id) REFERENCES lanches(id) ON DELETE CASCADE,
          FOREIGN KEY (ingrediente_id) REFERENCES ingredientes(id) ON DELETE CASCADE,
          PRIMARY KEY (lanche_id, ingrediente_id)
          )
          ''');
          await db.execute('''
            CREATE TABLE clientes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            address TEXT,
            phone TEXT,
            email TEXT UNIQUE,
            password TEXT,
            image TEXT
            )
          ''');


          // Inserindo ingredientes
          List<String> insertsIngredientes = [
            "INSERT INTO ingredientes (name) VALUES ('Pão')",
            "INSERT INTO ingredientes (name) VALUES ('Hambúrguer')",
            "INSERT INTO ingredientes (name) VALUES ('Queijo')",
            "INSERT INTO ingredientes (name) VALUES ('Alface')",
            "INSERT INTO ingredientes (name) VALUES ('Tomate')",
            "INSERT INTO ingredientes (name) VALUES ('Bacon')",
            "INSERT INTO ingredientes (name) VALUES ('Cebola')",
            "INSERT INTO ingredientes (name) VALUES ('Molho Especial')",
            "INSERT INTO ingredientes (name) VALUES ('Ovo')",
            "INSERT INTO ingredientes (name) VALUES ('Picles')",
          ];

          for (var sql in insertsIngredientes) {
            await db.execute(sql);
          }

          // Inserindo lanches
          List<String> insertsLanches = [
            "INSERT INTO lanches (name, description, price, image) VALUES ('X-Burguer', 'Descrição genérica para teste do lanche X-Burguer', 10.0, 'assets/image/hamburguerExemplo.jpg')",
            "INSERT INTO lanches (name, description, price, image) VALUES ('X-Salada', 'Descrição genérica para teste do lanche X-Salada', 12.0, 'assets/image/hamburguerExemplo.jpg')",
            "INSERT INTO lanches (name, description, price, image) VALUES ('X-Bacon', 'Descrição genérica para teste do lanche X-Bacon', 13.0, 'assets/image/hamburguerExemplo.jpg')",
            "INSERT INTO lanches (name, description, price, image) VALUES ('X-Egg', 'Descrição genérica para teste do lanche X-Egg', 12.0, 'assets/image/hamburguerExemplo.jpg')",
            "INSERT INTO lanches (name, description, price, image) VALUES ('X-Tudo', 'Descrição genérica para teste do lanche X-Tudo', 18.0, 'assets/image/hamburguerExemplo.jpg')",
            "INSERT INTO lanches (name, description, price, image) VALUES ('X-Frango', 'Descrição genérica para teste do lanche X-Frango', 11.0, 'assets/image/hamburguerExemplo.jpg')",
            "INSERT INTO lanches (name, description, price, image) VALUES ('X-Calabresa', 'Descrição genérica para teste do lanche X-Calabresa', 13.0, 'assets/image/hamburguerExemplo.jpg')",
            "INSERT INTO lanches (name, description, price, image) VALUES ('Veggie Burguer', 'Descrição genérica para teste do lanche Veggie Burguer', 14.0, 'assets/image/hamburguerExemplo.jpg')",
            "INSERT INTO lanches (name, description, price, image) VALUES ('Cheddar Burguer', 'Descrição genérica para teste do lanche Cheddar Burguer', 15.0, 'assets/image/hamburguerExemplo.jpg')",
            "INSERT INTO lanches (name, description, price, image) VALUES ('Smash Burguer', 'Descrição genérica para teste do lanche Smash Burguer', 16.0, 'assets/image/hamburguerExemplo.jpg')",
          ];


          for (var sql in insertsLanches) {
            await db.execute(sql);
          }

          // Inserindo relacionamentos lanche_ingrediente
          List<String> insertsLancheIngrediente = [
            // X-Burguer
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (1, 1)", // Pão
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (1, 2)", // Hambúrguer
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (1, 3)", // Queijo

            // X-Salada
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (2, 1)", // Pão
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (2, 2)", // Hambúrguer
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (2, 3)", // Queijo
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (2, 4)", // Alface
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (2, 5)", // Tomate

            // X-Bacon
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (3, 1)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (3, 2)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (3, 3)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (3, 6)",

            // X-Egg
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (4, 1)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (4, 2)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (4, 3)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (4, 9)",

            // X-Tudo
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (5, 1)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (5, 2)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (5, 3)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (5, 4)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (5, 5)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (5, 6)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (5, 7)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (5, 9)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (5, 10)",

            // X-Frango
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (6, 1)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (6, 3)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (6, 4)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (6, 5)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (6, 7)",

            // X-Calabresa
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (7, 1)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (7, 3)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (7, 7)",

            // Veggie Burguer
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (8, 1)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (8, 3)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (8, 4)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (8, 5)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (8, 8)",

            // Cheddar Burguer
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (9, 1)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (9, 2)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (9, 3)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (9, 8)",

            // Smash Burguer
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (10, 1)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (10, 2)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (10, 3)",
            "INSERT INTO lanche_ingrediente (lanche_id, ingrediente_id) VALUES (10, 8)",
          ];

          for (var sql in insertsLancheIngrediente) {
            await db.execute(sql);
          }

        }
    );
  }
}