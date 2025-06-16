import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:projetomobile/pages/LoginPage.dart';

class Defaultpage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            children: [
              SvgPicture.asset(
                'assets/icons/LogoHamburgueria.svg',
                width: 233,
                height: 341,
                ),
              SizedBox(height: 16),
              Text(
                'King Burger',
                style: TextStyle(
                  fontSize: 60,
                  fontWeight: FontWeight.bold,
                  fontStyle: FontStyle.italic,
                  color: Colors.red
                ),
              ),
              Text(
                'A melhor hamburgueria da cidade',
                textAlign: TextAlign.center,
                style: TextStyle(

                    fontSize: 24,
                    color: Colors.red
                ),
              ),
              SizedBox(height: 30),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red,
                  foregroundColor: Colors.white,
                  padding: EdgeInsets.symmetric(horizontal: 150, vertical: 20),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadiusGeometry.circular(12),
                  ),
                  elevation: 4,
                ),
                onPressed: () {
                  Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => const LoginPage()),
                  );
                },
                child: Text('Login', style: TextStyle(color: Colors.white),),
              ),
            ],
          ),
        ),
      ),);
  }
}
