# 🛠️ TP N° 8: Sistemas de Archivos y Entrada/Salida — Asignación, Nodos-i UNIX, Espacio Libre, Consistencia, Planificación de Disco y Técnicas de E/S

**Universidad Nacional de Jujuy (UNJu) — Facultad de Ingeniería**  
**Cátedra:** Teoría de Sistemas Operativos (TSO)  
**Ciclo Lectivo:** 2026  
**Responsable de Cátedra:** Ing. María Fernanda Vázquez  
**JTP:** Ing. Fabio D. Argañaraz  

[![GitHub Classroom Autograding](https://github.com/UNJU-Teoria-de-Sistemas-Operativos/TP8/actions/workflows/classroom.yml/badge.svg)](https://github.com/UNJU-Teoria-de-Sistemas-Operativos/TP8/actions/workflows/classroom.yml)

---

## 🎯 Alcance Temático y Objetivos del Trabajo Práctico

La evaluación calificable está basada estrictamente en los contenidos oficiales de las Unidades 8 y 9. La aplicación incorpora algunas ampliaciones didácticas opcionales, expresamente identificadas y no necesarias para resolver los ejercicios.

Este trabajo práctico se concentra en los tópicos nucleares de Gestión de Archivos, Almacenamiento Secundario y Subsistema de Entrada/Salida de **Unidad 8 (Sistema de Archivos)** y **Unidad 9 (Entrada/Salida)**:
- **Métodos de Asignación en Disco:** Análisis comparativo de **Asignación Contigua** (rendimiento secuencial, acceso directo y fragmentación externa con necesidad de compactación), **Asignación Enlazada pura** (eliminación de fragmentación, costo de $k$ lecturas a disco para acceso aleatorio y vulnerabilidad de rotura de enlaces) y **Tabla de Asignación de Archivos (FAT)** (resolución de cadenas de punteros en memoria principal con requisito de residencia completa según modelo oficial de Diapositiva 33).
- **Arquitectura de Inodos (Nodos-i) de UNIX:** Estructura jerárquica basada en 10 bloques directos, 1 simple indirecto, 1 doble indirecto y 1 triple indirecto. Cálculo analítico de la capacidad máxima soportada según el tamaño de bloque y trazado del número exacto de operaciones de E/S físicas a disco para leer un offset determinado (Diapositivas 36-38).
- **Administración del Espacio Libre:** Dimensionamiento de memoria principal para el **mapa de bits (*bitmaps*)** mediante la fórmula oficial ($\frac{\text{Tamaño Disco}}{8 \times \text{Tamaño Bloque}}$), condición fundamental de viabilidad teórica y de uso (suficiente RAM para mantener el mapa completo en memoria, Diapositiva 40) e inspector didáctico del mapa de bits.
- **Consistencia y Auditoría del Sistema de Archivos (*fsck / chkdsk*):** Reproducción de los estados canónicos de coherencia (Consistente, Bloque Perdido/Huérfano, Bloque Duplicado en Lista Libre, Bloque Duplicado en Múltiples Archivos y Bloque Defectuoso) y aplicación de las acciones de reparación in-situ del SO junto al aislamiento en lista de bloques defectuosos y repuesto por hardware (Diapositivas 44-47).
- **Protección, Permisos y Cuotas:** Protección por clases de usuario (**dueño, grupo y otros** con derechos independientes rwx - Diapositiva 10), control de cuotas de disco para evitar la monopolización fijando proporciones máximas de archivos y bloques garantizadas por el SO (Diapositiva 43), y operación de apertura de archivos (`open()`) con extracción de atributos y direcciones a una tabla en memoria principal (Diapositiva 8).
- **Técnicas de Comunicación de E/S y Software de E/S:** E/S programada (*polling*), E/S por interrupciones, y Acceso Directo a Memoria (**DMA** con transferencia directa de bloques y una única interrupción de finalización - Diapositivas 58-62); capas del software de E/S (drivers vs software independiente del dispositivo, *buffering* simple/doble/circular y *spooling*).
- **Estructura y Planificación de Cabezas de Disco:** Desglose del tiempo total de acceso ($T_{\text{búsqueda}} + T_{\text{latencia}} + T_{\text{transferencia}}$), cálculo analítico de $T = \frac{b}{r \cdot N}$, simulación de algoritmos de planificación (**FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK y SCAN de N pasos** - Diapositivas 70-80) y contraste entre Caché de Disco y Disco RAM (*RAM Disk*).

---

## 📚 Mapa Bibliográfico Oficial

Para la resolución de los laboratorios y el banco de autoevaluación, consulta la siguiente bibliografía oficial de la cátedra:

| Material Oficial | Referencia Exacta | Temas Cubiertos |
| :--- | :--- | :--- |
| **Diapositivas Unidades 8 y 9** | Cátedra TSO UNJu (2026), pág. 1-83 | Directorios, Asignación, Nodos-i, Mapas de Bits, Cuotas, fsck, Técnicas de E/S (DMA/Polling), Planificación de Disco (SSTF/SCAN/C-SCAN/SCAN de N pasos), Caché y RAM Disk |
| **Silberschatz, Galvin & Gagne** | *Fundamentos de Sistemas Operativos*, 7ma Edición (2006) / 9na Edición | Cap. 10.1-10.6 (Archivos, Tablas y Permisos), Cap. 11.1-11.7 (Estructura FS, Asignación, Espacio Libre y Recuperación), Cap. 12.1-12.5 (Sistemas de E/S, DMA y Discos) |
| **Tanenbaum, A. S. & Bos, H.** | *Sistemas Operativos Modernos*, 4ta Edición (2015) | Cap. 4.1-4.4 (Archivos, Directorios, Inodos, Cuotas y Consistencia), Cap. 5.1-5.4 (Hardware y Software de E/S, Capas, DMA, Discos y Planificación) |

---

## 🚀 Estructura del Entorno de Práctica

El trabajo se desarrolla íntegramente a través del ecosistema interactivo y de autoevaluación:

1. **Laboratorios Interactivos Web (`index.html` y `app.js`):**
   - 🗄️ **Laboratorio 1: Métodos de Asignación de Archivos:** Simulación visual sobre cuadrícula de 64 bloques comparando contigüidad, enlaces en disco y tabla FAT en RAM.
   - 🌲 **Laboratorio 2: Estructura de Inodo UNIX y Acceso por Desplazamiento:** Árbol jerárquico oficial de cátedra, trazador de accesos a disco por bloque lógico y calculadora de capacidad.
   - 📊 **Laboratorio 3: Administración de Espacio Libre (Mapa de Bits):** Calculadora del tamaño del bitmap en RAM según la fórmula de cátedra, análisis de la condición de uso frente a listas ligadas (Diapositiva 40) e inspector didáctico del primer bloque libre en una palabra de 32 bits.
   - 🩺 **Laboratorio 4: Verificador de Consistencia de Disco (fsck Simulator):** Simulación de los 5 estados de consistencia de las Diapositivas 44-47 y bibliografía, con 3 filas de auditoría (Archivos, Lista Libre y Bloques Defectuosos) y botones específicos de reparación por software y hardware.
   - 🛡️ **Laboratorio 5: Protección por Clases, Control de Cuotas y Apertura:** Matriz interactiva de derechos de acceso por clases de usuario (dueño, grupo, otros — Diapositiva 10), simulador de cuotas de almacenamiento para evitar el acaparamiento fijando cuota máxima (Diapositiva 43) y visualización del proceso de apertura de archivos a memoria principal (Diapositiva 8).
   - 💽 **Laboratorio 6: Planificación de Disco y Técnicas de Comunicación de E/S:** Trazador secuencial de los algoritmos FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK y SCAN de N pasos (en el simulador se utiliza N = 4 con subcolas ya formadas) con cálculo de cilindros recorridos, calculadora de $T = \frac{b}{r \cdot N}$ y comparadores de E/S (DMA vs Polling) y Caché vs RAM Disk.
2. **Guía de Experimentación (`guia_laboratorio.md`):**
   - Documento didáctico con el desglose experimental de los 6 laboratorios y correspondencia con las 20 consignas.
3. **Autoevaluación Automatizada (`rubric_tp8.json` y `autograder_tp8.py`):**
   - Rúbrica criptográfica pública protegida con HMAC-SHA256 y script ejecutable en terminal local y GitHub Actions.

---

## 💻 Instrucciones de Resolución y Entrega

### Paso 1: Experimentación y Resolución en el Navegador
1. Abre el archivo `index.html` en tu navegador web preferido (doble clic o mediante Live Server).
2. Completa tus datos en la tarjeta **"Datos del estudiante"** (Apellido y Nombre obligatorio, Legajo Estudiantil obligatorio y Correo Institucional opcional).
3. Interactúa con los 6 laboratorios guiándote con [guia_laboratorio.md](guia_laboratorio.md).
4. Responde las **20 consignas de autoevaluación** en las tarjetas inferiores. Si tienes dudas en alguna pregunta, utiliza el botón *"💡 Pista Pedagógica"* o el enlace directo *"↗ Ir al Lab"*.

### Paso 2: Exportación de Respuestas
1. Al responder el 100% de las preguntas, dirígete al panel inferior y presiona **"📥 Exportar respuestas_tp8.json"**.
2. Guarda el archivo descargado en la raíz de tu repositorio con el nombre exacto:
   ```text
   respuestas_tp8.json
   ```

### Paso 3: Validación Local con el Autograder
Abre una terminal en la raíz del repositorio y ejecuta:

```bash
python autograder_tp8.py
```

El script verificará tus respuestas contra la rúbrica oficial `rubric_tp8.json` y emitirá un reporte detallado:

```text
==============================================================================
   UNIVERSIDAD NACIONAL DE JUJUY - FACULTAD DE INGENIERÍA
   CÁTEDRA: TEORÍA DE SISTEMAS OPERATIVOS (TSO) - CICLO LECTIVO 2026
   REPORTE OFICIAL DE AUTOEVALUACIÓN: TP N° 8 (SISTEMAS DE ARCHIVOS Y E/S)
==============================================================================

[ RESULTADOS DE LA EVALUACIÓN INTERACTIVA Y CONCEPTUAL (20 EJERCICIOS) ]
------------------------------------------------------------------------------
  ✅ ej1_asignacion_contigua                Puntos:  5 | ¡Excelente!
  ...
  ✅ ej20_planificacion_disco_n_pasos       Puntos:  5 | ¡Excelente!
------------------------------------------------------------------------------
  PUNTAJE TOTAL: 100/100 pts
  NOTA FINAL:    10.0 / 10.0
  ESTADO:        [APROBADO]
==============================================================================
```

### Paso 4: Entrega vía GitHub Classroom
Una vez validada tu calificación en tu máquina:

```bash
git add respuestas_tp8.json
git commit -m "Entrega final TP8 - Sistemas de Archivos y E/S"
git push origin main
```

El flujo de GitHub Actions ejecutará automáticamente la suite de evaluación y registrará tu puntaje oficial en la plataforma.

---

## ⚖️ Criterios de Evaluación y Aprobación

* **Puntaje Total:** 100 puntos distribuidos en 20 consignas ponderadas a 5 puntos c/u.
* **Escala de Calificación:** Escala numérica de 0.0 a 10.0.
* **Condición de Aprobación:** Obtener una nota final igual o superior a **6.0 / 10.0** (mínimo 60 puntos).
