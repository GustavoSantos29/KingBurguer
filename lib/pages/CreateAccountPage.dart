import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:projetomobile/models/cliente.dart';
import 'package:projetomobile/pages/LoginPage.dart';
import 'package:projetomobile/services/AuthService.dart';

import 'HomePage.dart';

class CreateAccountPage extends StatefulWidget {
  const CreateAccountPage ({super.key});

  @override
  State<CreateAccountPage> createState() => _CreateAccountPageState();
}


class _CreateAccountPageState extends State<CreateAccountPage> {
  final _formKey = GlobalKey<FormState>();

  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _addressController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();

  final AuthService authService = AuthService();

  void _siginUp() async{
    if(_formKey.currentState!.validate()){
      if(_passwordController.text != confirmPasswordController.text){
        ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('As senhas não coincidem!'))
        );
        return;
      }
      final newCliente = Cliente(
        name: _nameController.text,
        address: _addressController.text,
        phone: _phoneController.text,
        email: _emailController.text,
        password: _passwordController.text,
        image: null,
      );

      final error = await authService.register(newCliente);

      if (error == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Conta criada com sucesso!')),
        );
        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => LoginPage()));

      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('error')),

        );
        return;
      }

      Navigator.pushReplacement(context,
          MaterialPageRoute(builder: (context) => LoginPage()));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Criar uma conta',
            style: TextStyle(
                color: Colors.red,
                fontStyle: FontStyle.italic,)
        ),
      ),
      body: SingleChildScrollView(
        child:Form(
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
                padding: EdgeInsets.only(top: 50, bottom: 20, left: 5),
                width: 300,
                child: Text('Preencha o formulário para criar sua nova conta',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      fontSize: 18,
                      color: Colors.red,
                      fontStyle: FontStyle.italic)
              ),
            ),
            Padding(padding: EdgeInsets.only(left: 15, right: 15, bottom: 30),
              child: TextFormField(
                controller: _nameController,
                validator: (value){
                  if(value == null || value.isEmpty){
                    return 'Informe seu nome';
                  }
                  return null;
                },
                decoration: InputDecoration(
                  label: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      SvgPicture.asset(
                        'assets/icons/user.svg',
                        width: 35,
                        height: 34,
                      ),
                      Text('Nome',
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
            Padding(padding: EdgeInsets.only(left: 15, right: 15, bottom: 30),
              child: TextFormField(
                controller: _addressController,
                validator: (value){
                  if(value == null || value.isEmpty){
                    return 'Informe seu endereço';
                  }
                  return null;
                },
                decoration: InputDecoration(
                  label: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      SvgPicture.asset(
                        'assets/icons/address.svg',
                        width: 35,
                        height: 34,
                      ),
                      Text('Endereço',
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
            Padding(padding: EdgeInsets.only(left: 15, right: 15, bottom: 30),
              child: TextFormField(
                controller: _phoneController,
                validator: (value){
                  if(value == null || value.isEmpty){
                    return 'Informe seu telefone';
                  }
                  return null;
                },
                decoration: InputDecoration(
                  label: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      SvgPicture.asset(
                        'assets/icons/phone.svg',
                        width: 35,
                        height: 34,
                      ),
                      Text('Telefone',
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
            Padding(padding: EdgeInsets.only(left: 15, right: 15, bottom: 30),
              child: TextFormField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                validator: (value){
                  if(value == null || value.isEmpty){
                    return 'Informe seu email';
                  }
                  if(!value.contains('@')){
                    return 'Informe um email válido';
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
            Padding(padding: EdgeInsets.only(left: 15, right: 15, bottom: 30),
              child: TextFormField(
                controller: _passwordController,
                obscureText: true,
                validator: (value){
                  if(value == null || value.isEmpty){
                    return 'Digite sua senha aqui';
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
            Padding(padding: EdgeInsets.only(left: 15, right: 15, bottom: 30),
              child: TextFormField(
                controller: confirmPasswordController,
                obscureText: true,
                validator: (value){
                  if(value == null || value.isEmpty){
                    return 'Confirme sua senha';
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
                      Text('Confirme sua senha',
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
            ElevatedButton(style:
                ElevatedButton.styleFrom(
                  backgroundColor: Colors.red,
                  foregroundColor: Colors.white,
                  padding: EdgeInsets.symmetric(horizontal:100,vertical: 15),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadiusGeometry.circular(12),
                  ),
                  elevation: 4,
                ),onPressed: _siginUp,
                child: Text('Criar conta',
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 20),)
                ),
            SizedBox(height: 20),
            TextButton(
              onPressed: () {
              Navigator.pushReplacement(context,
                  MaterialPageRoute(builder: (context) => LoginPage()));
              },
              child: const Text('Já possui uma conta? Clique aqui',
                  style: TextStyle(
                      color: Colors.red,
                      fontSize: 18)
              ),
            ),
            SizedBox(height: 50),
          ],
        ),
        ),
      ),
      );

  }
}
