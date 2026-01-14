#!/usr/bin/env python3
"""
Script para recortar los márgenes blancos de una imagen de banner
"""

from PIL import Image
import numpy as np

def crop_white_margins(input_path, output_path, threshold=240):
    """
    Recorta los márgenes blancos/claros de una imagen.
    """
    # Abrir la imagen
    img = Image.open(input_path)
    
    # Convertir a RGBA para manejar transparencia
    if img.mode == 'RGBA':
        # Crear fondo blanco y componer
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3])
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Convertir a array numpy
    img_array = np.array(img)
    
    print(f"Dimensiones originales: {img.width}x{img.height}")
    print(f"Valores de píxeles en esquinas:")
    print(f"  Superior izquierda: {img_array[0, 0]}")
    print(f"  Superior derecha: {img_array[0, -1]}")
    print(f"  Inferior izquierda: {img_array[-1, 0]}")
    print(f"  Inferior derecha: {img_array[-1, -1]}")
    
    # Detectar el color de fondo (promedio de las esquinas)
    corners = [
        img_array[0:10, 0:10],      # Superior izquierda
        img_array[0:10, -10:],      # Superior derecha
        img_array[-10:, 0:10],      # Inferior izquierda
        img_array[-10:, -10:]       # Inferior derecha
    ]
    
    # Calcular el color promedio de las esquinas
    bg_colors = [np.mean(corner, axis=(0,1)) for corner in corners]
    avg_bg = np.mean(bg_colors, axis=0)
    print(f"Color de fondo promedio: {avg_bg}")
    
    # Encontrar píxeles que difieren significativamente del fondo
    diff = np.abs(img_array.astype(float) - avg_bg)
    non_bg_mask = np.any(diff > 30, axis=2)  # Diferencia de más de 30 en cualquier canal
    
    # Encontrar los límites del contenido
    rows = np.any(non_bg_mask, axis=1)
    cols = np.any(non_bg_mask, axis=0)
    
    row_indices = np.where(rows)[0]
    col_indices = np.where(cols)[0]
    
    if len(row_indices) == 0 or len(col_indices) == 0:
        print("No se encontró contenido diferente del fondo")
        # Copiar la imagen original
        img.save(output_path, quality=95)
        return
    
    top = max(0, row_indices[0] - 2)
    bottom = min(img.height, row_indices[-1] + 3)
    left = max(0, col_indices[0] - 2)
    right = min(img.width, col_indices[-1] + 3)
    
    print(f"Recortando: top={top}, bottom={bottom}, left={left}, right={right}")
    
    # Recortar la imagen
    cropped = img.crop((left, top, right, bottom))
    
    print(f"Dimensiones recortadas: {cropped.width}x{cropped.height}")
    
    # Guardar la imagen recortada
    cropped.save(output_path, quality=95)
    print(f"Imagen guardada en: {output_path}")

if __name__ == "__main__":
    input_path = "/home/ubuntu/upload/B08D22B9-EEE1-4B44-96CE-54EEE89A3F5B.png"
    output_path = "/home/ubuntu/uniclima-nextjs/public/images/banner-pieza-gratis.png"
    
    crop_white_margins(input_path, output_path)
