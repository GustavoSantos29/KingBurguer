import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';
import '../providers/ClienteProvider.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    final cliente = context.watch<ClienteProvider>().cliente;

    void closeDrawer() {
      Navigator.pop(context);
    }

    if (cliente == null) {
      return Drawer(
        child: Center(child: Text('Nenhum usuário logado')),
      );
    }

    return Drawer(
      backgroundColor: Colors.red,
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          Container(
            margin: const EdgeInsets.only(top: 70, bottom: 100),
            child: Column(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(80),
                  child: Image.asset(
                    cliente.image != null
                        ? cliente.image!
                        : 'assets/images/defaultUser.png',
                    width: 150,
                    height: 150,
                    fit: BoxFit.cover,
                  ),
                ),
                const SizedBox(height: 30),
                Text(
                  cliente.name,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                  ),
                ),
              ],
            ),
          ),
          ListTile(
            iconColor: Colors.white,
            textColor: Colors.white,
            leading: SvgPicture.asset(
              'assets/icons/Home.svg',
              width: 30,
              colorFilter: const ColorFilter.mode(
                Colors.white,
                BlendMode.srcIn,
              ),
            ),
            title: const Text(
              'Home',
              style: TextStyle(fontSize: 24),
            ),
            onTap: () {
              closeDrawer();
              Navigator.pushReplacementNamed(context, '/Homepage');
            },
          ),
          const SizedBox(height: 15),
          ListTile(
            iconColor: Colors.white,
            textColor: Colors.white,
            leading: SvgPicture.asset(
              'assets/icons/gear.svg',
              width: 30,
              colorFilter: const ColorFilter.mode(
                Colors.white,
                BlendMode.srcIn,
              ),
            ),
            title: const Text(
              'Editar perfil',
              style: TextStyle(fontSize: 24),
            ),
            onTap: () {
              closeDrawer();
              Navigator.pushNamed(
                context,
                '/EditProfile',
              );
            },
          ),
          const SizedBox(height: 15),
          ListTile(
            iconColor: Colors.white,
            textColor: Colors.white,
            leading: SvgPicture.asset(
              'assets/icons/cart.svg',
              width: 30,
              colorFilter: const ColorFilter.mode(
                Colors.white,
                BlendMode.srcIn,
              ),
            ),
            title: const Text(
              'Carrinho de compras',
              style: TextStyle(fontSize: 24),
            ),
            onTap: () {
              closeDrawer();
              Navigator.pushNamed(
                context,
                '/CarrinhoPage',
              );
            },
          ),
          const SizedBox(height: 15),
          ListTile(
            iconColor: Colors.white,
            textColor: Colors.white,
            leading: SvgPicture.asset(
              'assets/icons/Compras.svg',
              width: 30,
              colorFilter: const ColorFilter.mode(
                Colors.white,
                BlendMode.srcIn,
              ),
            ),
            title: const Text(
              'Minhas compras',
              style: TextStyle(fontSize: 24),
            ),
            onTap: () {
              closeDrawer();
              Navigator.pushNamed(
                context,
                '/ComprasPage',
              );
            },
          ),

          const SizedBox(height: 15),
          ListTile(
            iconColor: Colors.white,
            textColor: Colors.white,
            leading: SvgPicture.asset(
              'assets/icons/exit.svg',
              width: 30,
              colorFilter: const ColorFilter.mode(
                Colors.white,
                BlendMode.srcIn,
              ),
            ),
            title: const Text(
              'Sair',
              style: TextStyle(fontSize: 24),
            ),
            onTap: () {
              closeDrawer();
              Navigator.pushReplacementNamed(context, '/');
            },
          ),
        ],
      ),
    );
  }
}
