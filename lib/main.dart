import 'package:flutter/material.dart';
import 'package:projetomobile/pages/CarrinhoPage.dart';
import 'package:projetomobile/pages/ComprasPage.dart';
import 'package:projetomobile/pages/DefaultPage.dart';
import 'package:projetomobile/pages/EditProfile.dart';
import 'package:projetomobile/pages/HomePage.dart';
import 'package:projetomobile/providers/CarrinhoProvider.dart';
import 'package:projetomobile/providers/ClienteProvider.dart';
import 'package:provider/provider.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ClienteProvider()),
        ChangeNotifierProvider(create: (_) => CarrinhoProvider())
      ],
      child: MaterialApp(
        title: 'Hamburgueria',
        initialRoute: '/',
        routes: {
          '/': (context) => Defaultpage(),
          '/Homepage': (context) => Homepage(),
          '/EditProfile': (context) => Editprofile(),
          '/CarrinhoPage': (context) => CarrinhoPage(),
          '/ComprasPage': (context) => ComprasPage(),
        },
        theme: ThemeData(
          brightness: Brightness.light,
          primaryColor: Colors.red,
        ),
      ),
    );
  }
}
