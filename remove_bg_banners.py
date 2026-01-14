#!/usr/bin/env python3
"""
Script para eliminar el fondo de los banners
"""

import os
from pathlib import Path
from rembg import remove
import shutil

IMAGES_DIR = "/home/ubuntu/uniclima-nextjs/public/images"
BACKUP_DIR = "/home/ubuntu/uniclima-nextjs/public/images_backup"

# Lista de banners a procesar
BANNERS = [
    "banner-envio.jpg",
    "banner-hero-calderas.jpg",
    "banner-ofertas-principal.png",
    "banner-ofertas.jpg",
    "banner-profesionales.jpg",
    "banner-reparacion-placas.png"
]

def process_banners():
    """Procesa los banners para eliminar el fondo"""
    
    # Crear backup si no existe
    os.makedirs(BACKUP_DIR, exist_ok=True)
    
    processed = 0
    failed = 0
    
    for banner in BANNERS:
        filepath = os.path.join(IMAGES_DIR, banner)
        
        if not os.path.exists(filepath):
            print(f"❌ No encontrado: {banner}")
            continue
        
        # Backup
        backup_path = os.path.join(BACKUP_DIR, banner)
        if not os.path.exists(backup_path):
            shutil.copy2(filepath, backup_path)
            print(f"📦 Backup creado: {banner}")
        
        # Output path (siempre PNG)
        output_filename = Path(banner).stem + ".png"
        output_path = os.path.join(IMAGES_DIR, output_filename)
        
        print(f"🔄 Procesando: {banner} -> {output_filename}")
        
        try:
            with open(filepath, "rb") as inp:
                input_data = inp.read()
            
            output_data = remove(input_data)
            
            with open(output_path, "wb") as out:
                out.write(output_data)
            
            # Eliminar original si era diferente formato
            if filepath != output_path:
                os.remove(filepath)
            
            processed += 1
            print(f"✅ Completado: {output_filename}")
            
        except Exception as e:
            failed += 1
            print(f"❌ Error: {banner} - {e}")
    
    print(f"\n{'='*50}")
    print(f"📊 Resumen Banners:")
    print(f"   ✅ Procesados: {processed}")
    print(f"   ❌ Fallidos: {failed}")
    print(f"{'='*50}")

if __name__ == "__main__":
    print("🖼️  Procesando Banners")
    print("="*50)
    process_banners()
