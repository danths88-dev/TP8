# 📘 Guía Práctica de Experimentación en Laboratorios Interactivos
## Trabajo Práctico N° 8: Sistemas de Archivos y Entrada/Salida

**Universidad Nacional de Jujuy (UNJu) — Facultad de Ingeniería**  
**Cátedra:** Teoría de Sistemas Operativos (TSO) — Ciclo Lectivo 2026  
**Responsable de Cátedra:** Ing. María Fernanda Vázquez | **JTP:** Ing. Fabio D. Argañaraz  

---

### 🎯 Propósito y Alcance de esta Guía

La evaluación calificable está basada estrictamente en los contenidos oficiales de las Unidades 8 y 9. La aplicación incorpora algunas ampliaciones didácticas opcionales, expresamente identificadas y no necesarias para resolver los ejercicios.

Los laboratorios interactivos de `index.html` permiten comprender, analizar y simular interactivamente la mecánica y estructuras internas de los sistemas de archivos y subsistemas de E/S en almacenamiento secundario, delimitada a los siguientes tópicos centrales de **Sistema de Archivos y E/S (Unidades 8 y 9)**:
1. **Métodos de asignación de espacio en disco:** Asignación contigua (adyacente), asignación enlazada pura en disco y Tabla de Asignación de Archivos (**FAT** residente en memoria principal según Diapositiva 33).
2. **Estructura de Inodos (Nodos-i) UNIX:** Bloques directos, bloques indirectos simples, dobles y triples; trazado del número de accesos físicos a disco requeridos para leer un bloque lógico dado; y cálculo formal de la capacidad máxima de archivo según el tamaño de bloque (Diapositivas 36-38).
3. **Administración de espacio libre:** Cálculo analítico de memoria RAM requerida para el vector o **mapa de bits (*bitmaps*)** mediante la fórmula oficial de cátedra (Diapositivas 39-42, fórmula en Diapositiva 40) y **condición fundamental de uso del mapa de bits** (suficiente RAM para mantener el mapa completo en memoria principal, Diapositiva 40) frente a listas ligadas de bloques libres y bloques de disco (Diapositivas 41-42).
4. **Auditoría y consistencia del sistema de archivos (*fsck / chkdsk*):** Reproducción interactiva de los 5 estados teóricos (Consistente, Bloque Perdido/Huérfano, Bloque Duplicado en Lista Libre, Bloque de Datos Duplicado y Bloque Defectuoso) y mecanismos de reparación in-situ del SO junto con el tratamiento por hardware (bloques/pistas de reserva del controlador) y software (quitar de lista libre y crear archivo de bloques defectuosos) (Diapositivas 44-47).
5. **Protección, clases de usuario y control de cuotas:** Matriz de permisos por clases independientes de usuario (**dueño, grupo y otros** con derechos independientes de lectura, escritura y ejecución según Diapositiva 10); **control de cuotas de disco** en sistemas multiusuario para evitar la monopolización del almacenamiento fijando cuotas máximas de archivos y bloques garantizadas por el sistema operativo (Diapositiva 43); y la **operación de apertura de archivos (`open()`)** que extrae atributos y direcciones en disco para almacenarlos en una tabla en memoria principal (Diapositiva 8).
6. **Planificación de cabeza de disco y técnicas de E/S:** Políticas de búsqueda (FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK y **SCAN de N pasos** según Diapos 70-80); técnicas de comunicación de E/S (**Polling, Interrupciones y DMA** con transferencia de bloques e interrupción al terminar según Diapos 58-62); capas de software y buffering (Diapos 64-65); tiempo de transferencia según $T = b / (r \cdot N)$ (Diapos 67-68); y comparativa conceptual entre caché de disco y disco RAM (Diapos 81-82).

Esta guía detalla las pautas de experimentación, deducciones analíticas y correspondencia directa con las 20 consignas de autoevaluación (100 puntos en total, 5 puntos cada una).

---

## 🗄️ Laboratorio 1: Métodos de Asignación en Disco (Contigua, Enlazada y FAT)
**Ubicación en simulador:** Sección `#lab1-allocation`  
**Ejercicios asociados:** **Ejercicio 1**, **Ejercicio 2** y **Ejercicio 3**.

### 🧪 Experimento 1.1: Asignación Contigua y Fragmentación Externa
1. **Procedimiento:**
   - En el selector de estrategia, selecciona **`Asignación Contigua (Adyacente)`**.
   - Presiona **`📄 Crear Archivo A (3 blk)`**: se asignan consecutivamente los bloques `0, 1, 2`.
   - Presiona **`📄 Crear Archivo B (4 blk)`**: se asignan consecutivamente los bloques `3, 4, 5, 6`.
   - Presiona **`📄 Crear Archivo C (2 blk)`**: se asignan consecutivamente los bloques `7, 8`.
   - Presiona **`🗑️ Eliminar Archivo A (Genera Hueco)`**: los bloques `0, 1, 2` quedan vacíos.
   - Presiona **`➕ Extender Archivo B (+3 blk)`**:
     - *Fenómeno observado:* El simulador emite un mensaje de error pedagógico: el Archivo B no puede crecer contiguamente hacia adelante porque los bloques adyacentes `7, 8` están ocupados por el Archivo C. Aunque existen 3 bloques libres en `[0, 1, 2]` y más de 50 bloques libres a partir del bloque 9, el Archivo B no puede crecer in situ sin una reasignación completa a una nueva zona contigua o una compactación de disco.
2. **Métricas y Deducción (Diapositivas 26-28):**
   - **Ventajas:** Fácil de implementar (solo requiere la dirección del primer bloque y el número de bloques), excelente rendimiento de lectura (todo el archivo puede leerse en una sola operación) y acceso directo simple.
   - **Desventajas:** Causa **fragmentación externa** (requiere compactación) y obliga a **conocer el tamaño máximo del archivo al momento de su creación** (preasignación).
   - **Índice Didáctico de Dispersión del Espacio Libre:** Métrica conceptual expresada como $\frac{\text{Libres Totales} - \text{Bloque Continuo Máximo}}{\text{Libres Totales}} \times 100$.
   - ✅ *Esta simulación fundamenta el **Ejercicio 1***.

---

### 🧪 Experimento 1.2: Asignación Enlazada (Lista Ligada en Disco)
1. **Procedimiento:**
   - Selecciona **`Asignación Enlazada (Linked List en disco)`**.
   - Presiona **`📄 Crear Archivo A (3 blk)`**: se asignan bloques dispersos (`2 → 11 → 25 → EOF`).
   - Presiona **`📄 Crear Archivo B (4 blk)`**: se asignan bloques dispersos (`4 → 18 → 7 → 31 → EOF`).
   - Presiona **`📄 Crear Archivo C (2 blk)`**: se asignan bloques dispersos adicionales.
   - Presiona **`🗑️ Eliminar Archivo A`**: se liberan los bloques `2, 11, 25`.
   - Presiona **`➕ Extender Archivo B`**: Archivo B aprovecha dinámicamente los bloques dispersos liberados sin requerir contigüidad física.
2. **Métricas y Deducción (Diapositivas 29-31):**
   - **Ventajas:** Elimina la fragmentación externa (se aprovecha cualquier bloque libre) y no es necesario declarar el tamaño del archivo al crearlo.
   - **Desventajas:**
     1. El acceso aleatorio a un bloque intermedio $k$ es muy lento: para llegar al bloque $k$, el SO debe leer los primeros $k - 1$ bloques en disco uno por uno.
     2. La cantidad de almacenamiento de datos en un bloque **ya no es una potencia de dos**, porque los bytes del puntero (primera palabra del bloque) reducen el área útil de datos.
     3. Baja fiabilidad si se pierde o daña un puntero en disco.
   - ✅ *Esta simulación fundamenta el **Ejercicio 2***.

---

### 🧪 Experimento 1.3: Tabla de Asignación de Archivos (FAT)
1. **Procedimiento:**
   - Selecciona **`Tabla FAT (Punteros centralizados en Memoria Principal)`**.
   - Observa que los bloques en disco contienen únicamente datos puros (`Dato`) sin punteros incrustados en su interior.
   - Debajo de la grilla de disco se visualiza la **Tabla de Asignación de Archivos (FAT)**.
2. **Deducción Teórica Oficial (Diapositivas 32-34):**
   - La arquitectura FAT toma la palabra apuntadora de cada bloque de disco y la coloca en una tabla en memoria principal.
   - **Ventajas:** El bloque completo está disponible para datos (potencia de dos) y el acceso aleatorio es mucho más fácil y veloz porque la cadena se recorre en memoria sin hacer referencias a disco.
   - **Desventaja Crítica:** *Toda la tabla debe estar en memoria principal todo el tiempo para funcionar* (Diapositiva 33), por lo que no escala bien en discos grandes.
   - ✅ *Esta simulación fundamenta el **Ejercicio 3***.

---

## 🌲 Laboratorio 2: Estructura de Inodo UNIX y Acceso por Desplazamiento
**Ubicación en simulador:** Sección `#lab2-inode`  
**Ejercicios asociados:** **Ejercicio 4**, **Ejercicio 5** y **Ejercicio 6**.

### 📋 Parámetros de Diseño Oficiales (Diapositivas 36-38)
* Tamaño de Bloque: $1\text{ KiB} = 1024\text{ Bytes}$.
* Tamaño de Dirección de Bloque: $4\text{ Bytes}$ (punteros de 32 bits).
* Punteros contenidos en un bloque: $\frac{1024\text{ Bytes}}{4\text{ Bytes/puntero}} = 256\text{ punteros}$.
* **Condición teórica asumida:** Nodo-i ya residente en memoria RAM y bloques de punteros de indirección no almacenados previamente en memoria caché.

---

### 🧪 Experimento 2.1: Archivos Pequeños y Bloques Directos
1. **Configuración en Simulador:**
   - Selecciona bloque lógico: **`5`**. Presiona **`🔍 Rastrear Acceso en Inodo`**.
2. **Observación:**
   - Se ilumina el nodo **10 Bloques Directos**.
   - El inodo en RAM contiene directamente las direcciones físicas de los bloques 0 a 9.
   - **Lecturas físicas a disco:** **Exactamente 1 lectura** (directamente al bloque de datos en disco).
   - ✅ *Resuelve el **Ejercicio 4***.

---

### 🧪 Experimento 2.2: Capacidad del Nivel Doblemente Indirecto
1. **Cálculo Analítico (Diapositivas 37-38):**
   * **Nivel Directo (10 bloques):** $10 \times 1\text{ KiB} = 10\text{ KiB}$.
   * **Nivel Simple Indirecto (1 bloque de punteros):** $256 \times 1\text{ KiB} = 256\text{ KiB}$.
   * **Nivel Doble Indirecto:**
     - 1 bloque de primer nivel apunta a 256 bloques simplemente indirectos.
     - Cada bloque simplemente indirecto apunta a 256 bloques de datos.
     - Número total de bloques: $256 \times 256 = \mathbf{65.536\text{ bloques}}$ (`65K` en tabla de Diapositiva 38).
     - Capacidad total aportada: $65.536 \times 1\text{ KiB} = \mathbf{65.536\text{ KiB}} = \mathbf{64\text{ MiB}}$ (`65M` en notación abreviada de la tabla en Diapositiva 38).
   * **Nivel Triple Indirecto:**
     - $256 \times 65.536 = 16.777.216\text{ bloques} = \mathbf{16\text{ GiB}}$ (`16M` bloques y `16G` de tamaño máximo en Diapositiva 38).
   - ✅ *Resuelve el **Ejercicio 5***.

---

### 🧪 Experimento 2.3: Accesos Físicos a Disco para Bloque Lógico 300
1. **Configuración en Simulador:**
   - Introduce bloque lógico: **`300`**. Presiona **`🔍 Rastrear Acceso en Inodo`**.
2. **Desglose de Rangos:**
   - Directos: Bloques 0 a 9 (10 bloques).
   - Simple Indirecto: Bloques 10 a $10 + 256 - 1 = 265$ (256 bloques).
   - Doble Indirecto: Bloques 266 a $266 + 65.536 - 1 = 65.801$.
   - Como $300$ se encuentra en el rango $[266, 65801]$, reside en el **bloque doblemente indirecto**.
3. **Lecturas Requeridas (sin caché previa de punteros):**
   - 1ª lectura física: Lectura del bloque doblemente indirecto.
   - 2ª lectura física: Lectura del bloque simple indirecto hijo referenciado.
   - 3ª lectura física: Lectura del bloque de datos real.
   - **Total:** **3 lecturas físicas a disco**.
   - ✅ *Resuelve el **Ejercicio 6***.

---

## 📊 Laboratorio 3: Administración de Espacio Libre (Mapa de Bits y Listas Ligadas)
**Ubicación en simulador:** Sección `#lab3-freespace`  
**Ejercicios asociados:** **Ejercicio 7**, **Ejercicio 8** y **Ejercicio 9**.

### 🧪 Experimento 3.1: Dimensionamiento de RAM para Mapa de Bits
1. **Fórmula Oficial de Cátedra (Diapositivas 39-42, fórmula en Diapositiva 40):**
   $$\text{Cantidad de memoria (en bytes) requerida} = \frac{\text{Tamaño del disco en bytes}}{8 \times \text{Tamaño de bloque del sistema de archivos}}$$
2. **Caso Analítico del Práctico:**
   - Disco: $32\text{ GiB} = 32 \times 2^{30}\text{ bytes} = 34.359.738.368\text{ bytes}$.
   - Bloque: $4\text{ KiB} = 4.096\text{ bytes}$.
   - Aplicando la fórmula:
     $$\text{Bytes de RAM} = \frac{34.359.738.368}{8 \times 4.096} = \frac{34.359.738.368}{32.768} = \mathbf{1.048.576\text{ bytes}} = \mathbf{1\text{ MiB}} \ (1.024\text{ KiB})$$
   - *Comprobación:* Configura $32\text{ GiB}$ y $4\text{ KiB}$ en los selectores del simulador y valida el resultado.
   - ✅ *Resuelve el **Ejercicio 7***.

---

### 🧪 Experimento 3.2: Condición Fundamental de Uso del Mapa de Bits (Diapositiva 40)
1. **Condición de Viabilidad Teórica:**
   - De acuerdo con la **Diapositiva 40**, el método de mapa de bits para la administración de espacio libre *sólo funciona bien cuando se puede mantener el mapa completo en la memoria principal*.
   - Si el volumen de almacenamiento es sumamente grande y no se cuenta con suficiente memoria RAM disponible para albergar el vector completo, el sistema tendría que realizar accesos secundarios a disco para consultar o actualizar sectores del mapa, anulando su ventaja en velocidad.
   - ✅ *Resuelve el **Ejercicio 8***.

---

### 🧪 Experimento 3.3: Lista Ligada de Bloques Libres vs Lista Ligada de Bloques de Disco
1. **Comparación Clave (Diapositivas 41-42):**
   - **Lista Ligada de Bloques Libres (Diapositiva 41):** Un bloque libre contiene una lista de punteros a otros bloques libres y un puntero al siguiente bloque de punteros. *Ventajas:* se utilizan bloques libres (sin costo adicional en disco) y solo es necesario guardar un bloque de apuntadores en memoria principal. *Desventaja:* cuando un bloque de apuntadores se llena o se vacía, se producen lecturas y escrituras adicionales en disco en el límite entre bloques.
   - **Lista Ligada de Bloques de Disco (Diapositiva 42):** En lugar de almacenar el estado de cada bloque individual, almacena pares `(dirección del primer bloque libre, cuenta de bloques libres contiguos)`. *Ventaja:* es ideal para asignaciones contiguas o por *extents*. *Desventaja:* a medida que el disco se fragmenta, la lista crece y se vuelve menos eficiente.
   - ✅ *Resuelve el **Ejercicio 9***.

---

## 🩺 Laboratorio 4: Verificador de Consistencia de Disco (fsck Simulator)
**Ubicación en simulador:** Sección `#lab4-fsck`  
**Ejercicios asociados:** **Ejercicio 10**, **Ejercicio 11** y **Ejercicio 15**.

### 📋 Los 5 Estados Teóricos de Consistencia y Reparación (Diapositivas 44-47)

La tabla de consistencia del simulador presenta tres filas de auditoría: **Uso en Archivos**, **Uso en Lista Libre** y **Lista de Bloques Defectuosos**.

| Escenario | Contador en Archivos | Contador en Lista Libre | Lista Bloques Defectuosos | Diagnóstico del Sistema Operativo | Acción Correctiva de `fsck` |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **a) Consistente** | 1 | 0 (o bien 0 / 1) | 0 | Todo bloque pertenece exactamente a un archivo o a la lista libre. | Ninguna acción necesaria. |
| **b) Bloque Perdido / Huérfano** | 0 | 0 | 0 | El bloque no figura asignado a ningún archivo ni en el espacio libre. No daña los archivos pero desperdicia espacio. | El verificador de consistencia lo agrega nuevamente a la lista libre. |
| **c) Duplicado en Lista Libre** | 0 | 2 | 0 | El bloque se listó dos veces como libre; al asignarlo, dos archivos colisionarían. | Se reconstruye la lista libre eliminando la entrada duplicada. |
| **d) Bloque de Datos Duplicado** | 2 | 0 | 0 | Dos archivos apuntan al mismo bloque de datos. Peligro de corrupción cruzada. | Asigna un bloque libre, copia el contenido del bloque duplicado en él y cambia uno de los punteros para que apunte a la copia. |
| **e) Bloque Defectuoso (Bad Block)**| 0 | 0 | 1 (Bloque 6) | Sector físico con fallos de lectura/escritura. | Solución por Hardware (sector de lista + bloque de reserva) o Solución por Software (quitar de lista libre y crear archivo de bloques defectuosos). |

1. **Pruebas en el Simulador:**
   - Elige **`b) Bloque Perdido / Huérfano`**, presiona **`🔍 Ejecutar fsck / Auditoría`** y observa la alerta sobre el bloque 5. Al presionar **`🛠️ Aislar por Software (Archivo Defectuosos) / Reparar con fsck`**, el bloque 5 se reincorpora a la lista libre in-situ.
   - Elige **`d) Bloque de Datos Duplicado`**, ejecuta la auditoría y presiona el botón de reparación por software para comprobar cómo el Archivo 2 reasigna su puntero a un nuevo bloque libre (#7) desvinculándose del bloque 2.
   - Elige **`e) Bloque Defectuoso`** y analiza el tratamiento dual mediante los dos botones específicos de reparación:
     - **`🛠️ Aislar por Software (Archivo Defectuosos) / Reparar con fsck`**: Quita el bloque 6 de la lista libre del SO y crea/actualiza el archivo de bloques defectuosos (el cual no debe leerse, escribirse ni respaldarse en copias de seguridad — Diapositiva 47).
     - **`⚙️ Sustituir por Hardware (Controlador / Bloques Reserva)`**: Simula cómo el controlador lee el sector dedicado a la lista de bloques defectuosos y sustituye el bloque dañado por un bloque o pista de reserva (Diapositiva 46).
   - ✅ *Resuelven el **Ejercicio 10**, **Ejercicio 11** y **Ejercicio 15***.

---

## 🛡️ Laboratorio 5: Protección de Archivos (Clases de Usuario), Control de Cuotas y Operación de Apertura
**Ubicación en simulador:** Sección `#lab5-perm-quotas`  
**Ejercicios asociados:** **Ejercicio 12**, **Ejercicio 13** y **Ejercicio 14**.

### 🧪 Experimento 5.1: Protección por Clases de Usuario (Dueño, Grupo y Otros — Diapositiva 10)
1. **Modelo de Protección por Clases:**
   - De acuerdo con la **Diapositiva 10**, el sistema operativo implementa el control de acceso estructurando a los usuarios en tres clases independientes:
     - **Dueño / Propietario (u):** Usuario creador del archivo.
     - **Grupo (g):** Conjunto definido de usuarios autorizados.
     - **Otros (o):** Resto de los usuarios con acceso al sistema.
   - Cada clase dispone de **derechos de acceso independientes** para operaciones de lectura (**r**), escritura (**w**) y ejecución (**x**).
2. **Ampliación Didáctica: Ponderación Octal (`chmod`):**
   * $\text{Lectura (r)} = 4$ ($2^2$)
   * $\text{Escritura (w)} = 2$ ($2^1$)
   * $\text{Ejecución (x)} = 1$ ($2^0$)
   * *Ejemplo interactivo:* Propietario `rwx` (7), Grupo `r-x` (5), Otros `r--` (4) $\rightarrow$ Cadena `-rwxr-xr--` y comando `chmod 754 archivo`.
   * ✅ *Resuelve el **Ejercicio 13***.

---

### 🧪 Experimento 5.2: Finalidad y Control de Cuotas de Disco en Sistemas Multiusuario (Diapositiva 43)
1. **Fundamento Oficial de Cátedra:**
   - La **Diapositiva 43** establece que para **evitar que los usuarios acaparen demasiado espacio en disco**, los sistemas operativos multiusuario proporcionan un mecanismo de cuotas donde el administrador asigna a cada usuario una **proporción máxima de archivos y bloques**.
   - El sistema operativo garantiza activamente que los usuarios no excedan sus cuotas asignadas.
2. **Experimentación en Simulador:**
   - Ajusta la *Cuota Máxima Asignada por Administrador* (ej. 100 MiB) y el *Consumo Actual* (ej. 60 MiB).
   - Observa cómo el sistema operativo autoriza operaciones normales mientras el consumo sea menor o igual a la cuota máxima. Si el usuario intenta sobrepasar la cuota máxima, el SO bloquea inmediatamente la creación o extensión de archivos.
   - ✅ *Resuelve el **Ejercicio 12***.

---

### 🧪 Experimento 5.3: Operación de Apertura de Archivos y Tabla en Memoria Principal (Diapositiva 8)
1. **Comportamiento Oficial del Sistema Operativo:**
   - Conforme a la **Diapositiva 8**, antes de utilizar un archivo, un proceso debe abrirlo mediante la operación **open()**:
     1. El sistema operativo **busca el nombre del archivo en el directorio**.
     2. **Extrae los atributos y las direcciones de disco** del archivo.
     3. **Los coloca en una tabla en memoria principal (RAM)**.
   - Las llamadas posteriores utilizan un descriptor o índice a esta tabla en RAM sin tener que volver a recorrer el directorio en disco en cada acceso.
   - ✅ *Resuelve el **Ejercicio 14***.

---

## 💽 Laboratorio 6: Planificación de Disco y Técnicas de Comunicación de E/S (Unidad 9)
**Ubicación en simulador:** Sección `#lab6-io-disks`  
**Ejercicios asociados:** **Ejercicio 16**, **Ejercicio 17**, **Ejercicio 18**, **Ejercicio 19** y **Ejercicio 20**.

### 🧪 Experimento 6.1: Políticas de Planificación de Cabeza de Disco (Diapositivas 70-80)
1. **Configuración Oficial de Cátedra (Diapositivas 76 y 79):**
   - Disco de 200 cilindros (pistas numeradas de 0 a 199).
   - Posición inicial de la cabeza: **100** (sentido inicial ascendente `100 → 199` en la tabla de la Diapositiva 79).
   - Cola de peticiones pendientes: `55, 58, 39, 18, 90, 160, 150, 38, 184`.
2. **Comparativa de Algoritmos (Diapositiva 79):**
   * **FCFS (First-Come, First-Served):** Atiende en orden de llegada `[100, 55, 58, 39, 18, 90, 160, 150, 38, 184]`. Desplazamiento total: **498 cilindros** (longitud media de búsqueda: **55,3**).
   * **SSTF (Shortest Seek Time First):** Atiende la petición más cercana al cabezal `[100, 90, 58, 55, 39, 38, 18, 150, 160, 184]`. Desplazamiento total: **248 cilindros** (longitud media de búsqueda: **27,5**). *Fenómeno:* Favorece el centro y puede inducir **inanición (*starvation*)** en las pistas extremas ante cargas continuas.
   * **SCAN (Algoritmo del Elevador):** Con sentido ascendente (`100 → 199`), atiende `100 → 150 → 160 → 184` e invierte la marcha hacia `90 → 58 → 55 → 39 → 38 → 18`. Según la tabla de la Diapositiva 79 (invirtiendo en la última petición `184`, equivalente a LOOK), recorre **250 cilindros** (longitud media de búsqueda: **27,8**); si llega hasta el extremo físico `199`, recorre **280 cilindros**.
   * **C-SCAN (SCAN Circular):** Barre en un solo sentido (`100 → 150 → 160 → 184`), salta al otro extremo sin atender peticiones intermedias y continúa en el mismo sentido (`18 → 38 → 39 → 55 → 58 → 90`). Según la tabla de la Diapositiva 79 (saltando a la petición más extrema `18` conforme a la Diapositiva 75), recorre **322 cilindros** (longitud media de búsqueda: **35,8**); si llega a los bordes físicos `199` y `0`, recorre **391 cilindros**.
   * **SCAN de N Pasos (Diapositiva 74):** Divide la cola de peticiones en subcolas de longitud $N$. Cada subcola se procesa una a la vez utilizando SCAN; mientras se procesa una cola, las nuevas solicitudes deben esperar en otra cola. Para valores de $N$ grandes, su comportamiento se aproxima al de SCAN; en cambio, si $N = 1$, se adopta la política FIFO (FCFS).
   * *(Nota didáctica del simulador: En esta simulación didáctica se utiliza $N = 4$ y se considera que las subcolas ya se encuentran formadas antes de iniciar el recorrido).*
   * ✅ *Fundamenta el **Ejercicio 19** y el **Ejercicio 20***.

---

### 🧪 Experimento 6.2: Técnicas de Comunicación de E/S y Capas de Software
1. **Mecanismos de E/S (Diapositivas 58-62):**
   * **E/S Programada (Polling):** La CPU tiene el control directo de la operación de E/S; emite un mandato al módulo y espera comprobando su estado periódicamente hasta que la operación finaliza, por lo que si la CPU es más rápida que el módulo de E/S se desperdicia el tiempo de procesamiento.
   * **E/S Dirigida por Interrupciones:** La CPU emite un mandato de E/S, continúa ejecutando otras instrucciones y es interrumpida por el módulo de E/S cuando este ha completado su trabajo; no obstante, consume muchos ciclos de procesador porque toda unidad de datos que va de la memoria al módulo de E/S (o viceversa) debe pasar a través de la CPU.
   * **Acceso Directo a Memoria (DMA):** Un módulo adicional en el bus del sistema (el controlador DMA) imita al procesador y asume el control para transferir un bloque de datos directamente desde o hacia la memoria a través del bus del sistema; la CPU solo interviene al principio enviando la orden al DMA y al final cuando es interrumpida una vez transferido el bloque completo.
   * ✅ *Fundamenta el **Ejercicio 16***.
2. **Capas del Software de E/S y Subsistema del Núcleo (Diapositivas 64-65):**
   * Los **manejadores de dispositivos (*device drivers*)** encapsulan el código dependiente del dispositivo (registros del controlador), mientras que el **software independiente del dispositivo** y el subsistema de E/S del núcleo implementan funciones comunes como el almacenamiento intermedio (**buffering** simple, doble o circular), **caching**, **spooling** y planificación de E/S.
   * ✅ *Fundamenta el **Ejercicio 17***.

---

### 🧪 Experimento 6.3: Tiempo de Transferencia y Almacenamiento en Memoria (Diapos 68, 81-82)
1. **Tiempo de Transferencia y Componentes de Acceso (Diapositivas 67-68):**
   * Fórmula oficial de transferencia:
     $$T = \frac{b}{r \cdot N}$$
     Donde $b$ es el número de bytes a transferir, $r$ la velocidad de rotación en revoluciones por segundo, y $N$ el número de bytes en una pista.
   * El tiempo total de acceso a disco se compone de:
     $$T_{\text{acceso}} = T_{\text{búsqueda}} + T_{\text{latencia rotacional}} + T_{\text{transferencia}}$$
   * ✅ *Fundamenta el **Ejercicio 18***.
2. **Caché de Disco vs Disco RAM (Diapositivas 81-82 - Comparativa de Cátedra):**
   * **Caché de Disco:** Buffer en memoria principal para sectores de disco gestionado por el SO con reemplazo dinámico (LRU / LFU).
   * **Disco RAM (*RAM Disk*):** Controlador de dispositivo que simula un disco en memoria principal; se accede rápido, es volátil y los archivos a guardar los elige el usuario.

---

## 📋 Matriz Integradora de Autoevaluación

| N° | Tema Evaluado | Laboratorio de Apoyo | Parámetros / Escenario Clave | Resultado / Concepto Objetivo |
| :---: | :--- | :--- | :--- | :--- |
| **1** | Asignación Contigua | Lab 1 (Asignación) | Lectura secuencial vs huecos y creación | `Excelente rendimiento de lectura, pero causa fragmentación externa y exige conocer el tamaño máximo al crear el archivo` |
| **2** | Asignación Enlazada | Lab 1 (Asignación) | Recorrido de punteros y tamaño de datos | `Acceso aleatorio lento (k lecturas a disco), el espacio de datos por bloque deja de ser potencia de 2 y es vulnerable a pérdida de punteros` |
| **3** | Tabla FAT | Lab 1 (Asignación) | Centralización de punteros en memoria RAM | `Extrae el puntero a una tabla en RAM acelerando el acceso aleatorio, pero toda la tabla debe estar en memoria todo el tiempo` |
| **4** | Inodo Bloques Directos | Lab 2 (Inodo UNIX) | Archivos pequeños contenidos en inodo en RAM | `Direcciones de los primeros 10 bloques en el propio nodo-i; requiere 1 sola lectura a disco` |
| **5** | Capacidad Inodo | Lab 2 (Inodo UNIX) | Nivel doble indirecto: $256 \times 256$ bloques | `65.536 bloques de datos (65K), equivalentes a 64 MiB exactos (65M en tabla de Diapo 38)` |
| **6** | Accesos a Disco Inodo | Lab 2 (Inodo UNIX) | Bloque lógico 300 en doble indirecto | `3 lecturas físicas a disco (bloque doble indirecto, bloque simple indirecto y bloque de datos)` |
| **7** | Mapa de Bits en RAM | Lab 3 (Espacio Libre) | Disco de 32 GiB con bloques de 4 KiB | `1.048.576 bytes (exactamente 1 MiB o 1.024 KiB)` |
| **8** | Condición Uso Mapa de Bits | Lab 3 (Espacio Libre) | Mapa completo en RAM (Diapositiva 40) | `Funciona bien solo cuando existe suficiente RAM para mantener el mapa de bits completo en memoria principal` |
| **9** | Lista Ligada Libre | Lab 3 (Espacio Libre) | Bloques libres vs bloques de disco (Diapo 42) | `Usa bloques libres sin costo de disco y permite asignación por extents, pero un bloque se llena o vacía causando E/S adicional` |
| **10** | fsck: Bloque Perdido | Lab 4 (fsck) | Bloque huérfano con contadores 0 / 0 (Diapo 44) | `No daña archivos pero desperdicia espacio; el verificador lo agrega nuevamente a la lista libre` |
| **11** | fsck: Bloque Duplicado | Lab 4 (fsck) | 2 archivos apuntan al mismo bloque (Diapo 44) | `Riesgo de corrupción cruzada; asigna un bloque libre, copia el contenido del bloque 2 y actualiza una referencia` |
| **12** | Cuotas de Disco: Finalidad | Lab 5 (Permisos/Cuotas)| Cuota máxima en sistemas multiusuario (Diapo 43) | `Evitar el acaparamiento fijando una proporción máxima de archivos y bloques garantizada por el SO` |
| **13** | Protección por Clases | Lab 5 (Permisos/Cuotas)| Clases de usuario e independencia (Diapo 10) | `Tres clases (dueño, grupo y otros) con permisos independientes de lectura (r), escritura (w) y ejecución (x)` |
| **14** | Apertura de Archivos open()| Lab 5 (Permisos/Cuotas)| Directorio, extracción de atributos a RAM (Diapo 8) | `Busca el nombre en el directorio, extrae atributos y direcciones de disco y los guarda en una tabla en memoria principal` |
| **15** | Bloques Defectuosos | Lab 4 (fsck) | Solución por Hardware vs Software (Diapos 46-47) | `Hardware: sector dedicado a lista y reemplazo por bloque de reserva; Software: quita de lista libre y crea archivo de defectuosos (no leer/escribir/respaldar)` |
| **16** | Técnicas de Comunicación E/S | Lab 6 (E/S y Discos) | E/S Programada vs Interrupciones vs DMA (Diapos 58-62) | `DMA transfiere el bloque directamente desde/hacia memoria por el bus e interrumpe a la CPU solo al principio y al final` |
| **17** | Capas Software E/S | Lab 6 (E/S y Discos) | Drivers vs Software independiente (Diapos 64-65) | `Drivers encapsulan el hardware; la capa independiente y el núcleo proveen buffering (simple, doble, circular), caching y spooling` |
| **18** | Parámetros Disco | Lab 6 (E/S y Discos) | Búsqueda, latencia y fórmula $T = b / (r \cdot N)$ | `Suma de tiempo de búsqueda (brazo a pista), latencia rotacional (sector a cabeza) y tiempo de transferencia T = b / (r · N)` |
| **19** | Planificación de Disco | Lab 6 (E/S y Discos) | Comparativa SSTF vs C-SCAN (Diapos 72, 75 y 79) | `SSTF logra menor longitud media (27,5 vs 35,8) pero puede causar inanición en extremos; C-SCAN rastrea en una sola dirección con servicio más uniforme` |
| **20** | SCAN de N Pasos | Lab 6 (E/S y Discos) | Subcolas de longitud N (Diapo 74) | `Segmenta la cola en subcolas de longitud N procesadas con SCAN; para N grande se aproxima a SCAN y para N = 1 adopta FIFO` |
