# Diseño del Sistema de Diagnóstico y Reparación de Placas Electrónicas

## 1. Flujo del Proceso y Experiencia de Usuario (User Journey)

El proceso se ha diseñado para ser lo más claro, sencillo y transparente posible para el cliente, guiándole en cada paso y manteniendo una comunicación constante.

| Paso | Acción del Cliente | Acción del Sistema (Backend) | Comunicación con el Cliente |
| :--- | :--- | :--- | :--- |
| 1 | **Rellena el formulario de diagnóstico** en la nueva página web, proporcionando datos del equipo, descripción del fallo, fotos y/o vídeos. | Crea una nueva orden de servicio con estado **"Pendiente de Pago"** y genera un ID único de seguimiento. | Email de confirmación con el resumen del pedido, el ID de seguimiento y el enlace para el pago del diagnóstico. |
| 2 | **Realiza el pago de 35€ + IVA** a través de la pasarela de pago. | Actualiza el estado de la orden a **"Pendiente de Envío"**. | Email de confirmación del pago e instrucciones detalladas para el envío de la placa (dirección, cómo empaquetarla, etc.). |
| 3 | **Envía la placa** a las instalaciones de Uniclima. | - | - |
| 4 | Uniclima recibe la placa. | El técnico de Uniclima actualiza el estado a **"En Diagnóstico"**. | Email informativo: "Hemos recibido tu placa y nuestros técnicos ya están trabajando en ella". |
| 5 | El técnico diagnostica la avería. | El técnico actualiza el estado a **"Presupuesto Enviado"** y añade el coste de la reparación al sistema. | Email con el presupuesto detallado de la reparación y dos opciones claras. |
| 6 | **Toma una decisión:** <br> A) **Aceptar el presupuesto.** <br> B) **Rechazar el presupuesto.** | A) El sistema actualiza el estado a **"Reparación en Curso"**. <br> B) El sistema actualiza el estado a **"Pendiente de Decisión Cliente"**. | A) Email de confirmación de la aceptación. <br> B) Email con las dos opciones post-rechazo. |
| 7 | **Si rechaza (6B), elige una opción:** <br> 1. Devolver el dinero del envío y Uniclima se queda la placa. <br> 2. Pagar 9€ de gastos de envío para recuperar la placa. | 1. El sistema actualiza a **"Cerrado (Placa en Stock)"** y procesa la devolución. <br> 2. El sistema actualiza a **"Pendiente de Pago Envío"**. | 1. Email de confirmación del cierre y la devolución. <br> 2. Email con el enlace para el pago de los 9€. |
| 8 | El técnico repara la placa. | El técnico actualiza el estado a **"Reparado y Testeado"**. | Email informativo: "¡Buenas noticias! Tu placa ha sido reparada y está en fase de testeo". |
| 9 | La placa supera el testeo final. | El sistema actualiza el estado a **"Listo para Envío"**. | Email informativo: "Tu placa ha superado todos los tests y será enviada en las próximas 24h". |
| 10| Uniclima envía la placa reparada. | El sistema actualiza el estado a **"Enviado"** y añade el número de seguimiento del transportista. | Email con la confirmación del envío y el enlace de seguimiento del paquete. |
| 11| El cliente recibe la placa. | El sistema actualiza el estado a **"Completado"** tras 7 días de la entrega. | Email de seguimiento para confirmar que todo funciona correctamente y solicitar una reseña. |

## 2. Estructura de la Página de Diagnóstico

La página se dividirá en secciones claras para guiar al usuario:

1.  **Título Principal y Propuesta de Valor:** "¿Tu equipo no funciona? Diagnosticamos y reparamos la placa electrónica. Rápido, económico y con garantía."
2.  **Pasos del Proceso (Visual):** Un gráfico simple con 3-4 pasos: 1. Rellena el formulario -> 2. Envíanos la placa -> 3. Recibe tu presupuesto -> 4. Te la devolvemos reparada.
3.  **Formulario de Diagnóstico Avanzado (ver sección 3).**
4.  **Precios Claros:**
    *   **Diagnóstico:** 35€ + IVA.
    *   **Envío de vuelta (si no se repara):** 9€.
    *   **Garantía:** 1 año en todas las reparaciones.
5.  **Preguntas Frecuentes (FAQ):** ¿Qué pasa si no acepto el presupuesto? ¿Cuánto tardan? ¿Qué garantía tiene?

## 3. Formulario de Diagnóstico Avanzado

El formulario será el corazón de la página. Se dividirá en pasos para no abrumar al usuario.

### Paso 1: Datos del Equipo

*   **Tipo de Equipo (desplegable):**
    *   Caldera
    *   Aire Acondicionado
    *   Aerotermia
*   **Marca (desplegable con buscador):** Se poblará desde una base de datos. *Ej: Junkers, Vaillant, Mitsubishi, Daikin...*
*   **Modelo (campo de texto con autocompletar):** Se filtrará según la marca seleccionada. *Ej: Cerapur, Ecodan, etc.*
*   **Número de Serie (opcional, campo de texto):** "Ayúdanos a identificar tu equipo con precisión."

### Paso 2: Descripción del Problema

*   **Síntomas (Checkboxes de selección múltiple):**
    *   No enciende
    *   Muestra un código de error
    *   Hace ruidos extraños
    *   No calienta / No enfría
    *   Se apaga solo
    *   Otro (campo de texto)
*   **Código de Error (campo de texto, si se selecciona la opción anterior):** "Introduce el código que aparece en la pantalla (ej. F28, E9)."
*   **Descripción Detallada (área de texto):** "Cuéntanos con el mayor detalle posible qué le ocurre a tu equipo. ¿Cuándo empezó el fallo? ¿Ocurre siempre o de forma intermitente?"

### Paso 3: Sube Fotos y Vídeos

*   **Componente de subida de archivos:**
    *   Permitirá arrastrar y soltar o seleccionar archivos.
    *   **Botón "Usar Cámara":** Pedirá permisos (`getUserMedia API`) para acceder a la cámara del móvil/portátil y hacer fotos o grabar vídeo directamente.
    *   **Restricciones:**
        *   Máximo 4 fotos (JPG, PNG, WEBP).
        *   Máximo 1 vídeo (MP4, MOV), hasta 15MB.
    *   **Guía visual:** Pequeños thumbnails mostrando qué fotografiar: "1. Foto general de la placa. 2. Foto del conector principal. 3. Foto de la zona quemada (si la hay). 4. Etiqueta de la placa."

### Paso 4: Datos de Contacto

*   Nombre completo
*   Email
*   Teléfono
*   Dirección completa para la recogida/envío

## 4. Base de Datos de Marcas y Modelos

Se creará una tabla en la base de datos para almacenar esta información y facilitar el autocompletado.

| `id` | `tipo_equipo` | `marca` | `modelo` |
| :--- | :--- | :--- | :--- |
| 1 | caldera | Junkers | Cerapur ZWBC 22-2C |
| 2 | caldera | Vaillant | ecoTEC plus VM ES 246/5-5 |
| 3 | aire_acondicionado | Mitsubishi | MSZ-HR35VF |
| 4 | aerotermia | Daikin | Altherma 3 |

Esta base de datos se podrá ampliar y gestionar fácilmente desde un panel de administración.

## 5. Sistema de Seguimiento (Página de Cliente)

Cada orden tendrá una URL única (ej: `uniclima.es/reparacion/seguimiento/{ID_UNICO}`). En esta página, el cliente podrá ver:

*   **Estado actual** del proceso en una línea de tiempo visual.
*   **Historial de estados:** Un log con fecha y hora de cada cambio.
*   **Presupuesto** (si está disponible) con botones para aceptar o rechazar.
*   **Comunicados** de los técnicos.
*   **Número de seguimiento** del envío de vuelta.
