import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:projetomobile/pages/CreateAccountPage.dart';
import 'package:projetomobile/services/AuthService.dart';
import 'package:provider/provider.dart';

import '../providers/ClienteProvider.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();

  final AuthService _authService = AuthService();

  void _login() async {
    if (_formKey.currentState!.validate()) {
      final cliente = await _authService.login(
          _emailController.text, _passwordController.text
      );

      if (cliente != null && mounted) {
        context.read<ClienteProvider>().updateCliente(cliente);
        Navigator.pushReplacementNamed(context, '/Homepage');

      } else if (mounted){
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Email ou senha inválidos!')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Text("King Burguer",
              style: TextStyle(
                  color: Colors.red,
                  fontStyle: FontStyle.italic)
          )
      ),
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SvgPicture.asset(
              'assets/icons/LogoHamburgueria.svg',
              width: 116.5,
              height: 170.5,
            ),
            Text(
              'King Burger',
              style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                  fontStyle: FontStyle.italic,
                  color: Colors.red
              ),
            ),
            Container(
                child: Text('Login',
                  style: TextStyle(
                    fontSize: 24,
                    color: Colors.red,
                    fontStyle: FontStyle.italic)
                  ),
                padding: EdgeInsets.only(top: 50, bottom: 20)
            ),
            Padding(padding: EdgeInsets.only(left: 15, right: 15, bottom: 30),
              child: TextFormField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                validator: (value){
                  if(value == null || value.isEmpty){
                    return 'Informe um email';
                  }
                  return null;
                },
                decoration: InputDecoration(
                    label: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        SvgPicture.asset(
                          'assets/icons/email.svg',
                          width: 35,
                          height: 34,
                        ),
                        Text('Email',
                          style: TextStyle(color: Colors.red),
                        )
                      ],
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(
                        color: Colors.red,
                      )
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(
                        color: Colors.red,
                        width: 2,
                      )
                    ),
                    errorBorder: OutlineInputBorder(
                      borderSide: BorderSide(
                        color: Colors.red,
                        width: 3,
                    ),
                  ),
                    focusedErrorBorder: OutlineInputBorder(
                      borderSide: BorderSide(
                        color: Colors.red,
                        width: 3,
                      )
                  ),
                ),
              ),
            ),
            Padding(padding: EdgeInsets.only(left: 15, right: 15, bottom: 10),
              child: TextFormField(
                controller: _passwordController,
                obscureText: true,
                validator: (password){
                  if(password == null || password.isEmpty){
                    return 'Informe sua senha';
                  }
                  return null;
                },
                decoration: InputDecoration(
                  label: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      SvgPicture.asset(
                        'assets/icons/password.svg',
                        width: 35,
                        height: 34,
                      ),
                      Text('Senha',
                        style: TextStyle(color: Colors.red),
                      )
                    ],
                  ),
                    enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: Colors.red,
                        )
                    ),
                    focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: Colors.red,
                          width: 3,
                        )
                    ),
                    errorBorder: OutlineInputBorder(
                      borderSide: BorderSide(
                       color: Colors.red,
                        width: 2,
                      ),
                  ),
                    focusedErrorBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: Colors.red,
                          width: 3,
                        )
                    ),
                ),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              spacing: 10,
              children: [
                ElevatedButton(style:
                      ElevatedButton.styleFrom(
                      backgroundColor: Colors.red,
                      foregroundColor: Colors.white,
                      padding: EdgeInsets.symmetric(horizontal:60,vertical: 15),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadiusGeometry.circular(12),
                      ),
                      elevation: 4,
                    ),onPressed: _login,
                    child: Text('Entrar',
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 20),)
                    ),
                TextButton(onPressed: () {
                    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => CreateAccountPage()));
                    },
                  child: const Text('Criar uma conta',
                          style: TextStyle(
                              color: Colors.red,
                              fontSize: 18)
                      ),
                ),
              ],)

              ],
        ),
        ) ,
      ),
    );
  }
}

