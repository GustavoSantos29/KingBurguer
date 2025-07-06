import 'package:geocoding/geocoding.dart';
import 'package:geolocator/geolocator.dart';
import 'package:flutter/material.dart';

class LocationHelp {
  static Future<String?> getEndereco(BuildContext context) async {
    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        _showSnack(context, 'Serviço de localização está desativado.');
        return null;
      }


      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          _showSnack(context, 'Permissão de localização negada!');
          return null;
        }
      }

      if (permission == LocationPermission.deniedForever) {
        _showSnack(context, 'Permissão de localização permanentemente negada!');
        return null;
      }


      Position position = await Geolocator.getCurrentPosition();


      List<Placemark> placemarks = await placemarkFromCoordinates(
        position.latitude,
        position.longitude,
      );

      if (placemarks.isNotEmpty) {
        final place = placemarks.first;
        return '${place.street}, ${place.subLocality}, ${place.locality} - ${place.administrativeArea}, ${place.postalCode}';
      }

      return '${position.latitude}, ${position.longitude}';
    } catch (e) {
      _showSnack(context, 'Erro ao obter localização: $e');
      return null;
    }
  }

  static void _showSnack(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }
}
