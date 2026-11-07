/**
 * ==============================================================================
 * UNJu - Universidad Nacional de Jujuy | Facultad de Ingeniería
 * Cátedra: Teoría de Sistemas Operativos (TSO) - Ciclo Lectivo 2026
 * Titular: Ing. María Fernanda Vázquez - JTP: Ing. Fabio D. Argañaraz
 * ------------------------------------------------------------------------------
 * TP N° 8: SISTEMAS DE ARCHIVOS — LABORATORIOS INTERACTIVOS Y AUTOEVALUACIÓN
 * ==============================================================================
 */

// --- BANCO DE PREGUNTAS Y METADATOS ---
const TP8_EXERCISES = [
    {
        id: "ej1_asignacion_contigua",
        num: 1,
        weight: 5,
        title: "Asignación Contigua (Adyacente) en Disco",
        labRef: "#lab1-allocation",
        labRefText: "Lab 1 (Asignación)",
        question: "En la asignación adyacente (contigua), los archivos se asignan a áreas contiguas de almacenamiento secundario. ¿Cuáles son sus principales ventajas y sus principales defectos según la cátedra?",
        hint: "Revisa las Diapositivas 26, 27 y 28: ¿qué datos bastan para localizar un archivo, qué requisito exige al crearlo (preasignación) y qué produce en el disco? (Diapositivas 26 a 28 | Silberschatz Cap. 11.4).",
        options: [
            { val: "crecimiento_dinamico_k_lecturas", text: "Ventajas: Permite el crecimiento dinámico sin preasignar espacio máximo; Defectos: Requiere recorrer múltiples bloques de índices en disco para localizar un bloque intermedio." },
            { val: "recorrido_fat_memoria_proporcional", text: "Ventajas: Resuelve los enlaces en una tabla en memoria principal; Defectos: Exige mantener toda la tabla de asignación en memoria principal todo el tiempo para funcionar." },
            { val: "maxima_velocidad_fragmentacion_externa", text: "Ventajas: Facilidad de implantación y excelente rendimiento de E/S; Defectos: Exige conocer el tamaño máximo del archivo al crearlo y produce gran fragmentación en el disco." },
            { val: "bloque_indices_desperdicio_pequenos", text: "Ventajas: Aprovecha cualquier bloque disperso sin fragmentación externa; Defectos: El apuntador interno resta bytes y el espacio de datos del bloque deja de ser potencia de 2." }
        ]
    },
    {
        id: "ej2_asignacion_enlazada",
        num: 2,
        weight: 5,
        title: "Asignación Ligada (Encadenada) en Disco",
        labRef: "#lab1-allocation",
        labRefText: "Lab 1 (Asignación)",
        question: "En la asignación ligada en disco (donde la primera palabra de cada bloque se utiliza como apuntador al siguiente), ¿cuáles son sus principales desventajas según la teoría de la cátedra?",
        hint: "Revisa la Diapositiva 29: ¿qué ocurre al intentar acceder aleatoriamente a un bloque y qué sucede con la cantidad de espacio disponible para datos dentro de cada bloque? (Diapositivas 29 a 31 | Tanenbaum & Bos Cap. 4.4).",
        options: [
            { val: "costo_k_lecturas_vulnerabilidad_cadena", text: "El acceso aleatorio es muy lento porque deben recorrerse los bloques siguiendo los apuntadores en disco, y el espacio para datos en un bloque ya no es potencia de 2 por los bytes del apuntador." },
            { val: "bloque_indices_metadatos_dedicados", text: "El directorio debe guardar las direcciones físicas de todos los bloques del archivo, y se requiere preasignar el tamaño máximo del archivo antes de escribir el primer bloque en disco." },
            { val: "fragmentacion_externa_compactacion_continua", text: "Se pierde una gran cantidad de espacio por fragmentación externa entre bloques dispersos, y el sistema operativo debe compactar las pistas magnéticas tras cada operación de lectura." },
            { val: "tabla_global_saturada_cache", text: "Toda la cadena de bloques de datos debe permanecer cargada de forma estática en memoria principal, y el tamaño de cada bloque queda limitado a un único registro de longitud fija." }
        ]
    },
    {
        id: "ej3_tabla_fat",
        num: 3,
        weight: 5,
        title: "Asignación Ligada e Indizada (Tabla en Memoria / FAT)",
        labRef: "#lab1-allocation",
        labRefText: "Lab 1 (Asignación)",
        question: "¿De qué manera la asignación ligada e indizada (FAT) elimina las desventajas de la asignación ligada simple en disco y cuál es su principal desventaja según el modelo oficial de la cátedra?",
        hint: "Compara la ubicación de la palabra del apuntador de cada bloque y revisa la desventaja destacada por la cátedra en la Diapositiva 33 (Diapositiva 33 | Tanenbaum & Bos Cap. 4.4).",
        options: [
            { val: "conversion_tramos_contiguos_automatica", text: "Reagrupando dinámicamente los bloques del archivo en pistas adyacentes durante los periodos libres; su principal desventaja es requerir compactación física continua del disco." },
            { val: "bloque_indices_metadatos_dedicados", text: "Asignando a cada archivo un bloque de índices independiente dentro del sector de arranque; su principal desventaja es impedir el acceso aleatorio a los bloques finales del archivo." },
            { val: "duplicacion_sectores_busqueda_binaria", text: "Duplicando cada apuntador de bloque en sectores contiguos de reserva para búsquedas binarias; su principal desventaja es reducir a la mitad la capacidad útil de cada bloque de datos." },
            { val: "punteros_centralizados_tabla_ram", text: "Tomando la palabra del apuntador de cada bloque y colocándola en una tabla o índice en memoria; su principal desventaja es que toda la tabla debe estar en memoria todo el tiempo." }
        ]
    },
    {
        id: "ej4_inodo_bloques_directos",
        num: 4,
        weight: 5,
        title: "Estructura de Nodo-i UNIX y Archivos Pequeños",
        labRef: "#lab2-inode",
        labRefText: "Lab 2 (Inodo UNIX)",
        question: "En el diseño de nodo-i considerado por la cátedra, ¿por qué para los archivos pequeños toda la información necesaria para localizar sus bloques está disponible al abrir el archivo sin leer bloques de indirección?",
        hint: "Revisa las Diapositivas 36 a 38: ¿dónde se almacenan las primeras direcciones en disco y qué ocurre con el nodo-i al abrir el archivo? (Diapositivas 36 a 38 | Tanenbaum & Bos Cap. 4.4).",
        options: [
            { val: "busqueda_secuencial_fat_luego_disco", text: "Porque sus direcciones físicas se consultan secuencialmente en la tabla global de la partición antes de iniciar la transferencia desde el disco." },
            { val: "en_el_propio_inodo_un_acceso", text: "Porque las primeras direcciones en disco se almacenan en el propio nodo-i, el cual se traslada del disco a la memoria principal al abrir el archivo." },
            { val: "integracion_datos_entrada_directorio", text: "Porque los bloques de datos de los archivos pequeños se guardan compactados directamente dentro del campo de nombre de la entrada del directorio." },
            { val: "consulta_bloque_punteros_intermedio", text: "Porque el controlador del disco reserva de manera fija el primer cilindro físico para alojar contiguamente todos los archivos menores a diez bloques." }
        ]
    },
    {
        id: "ej5_capacidad_inodo_calculo",
        num: 5,
        weight: 5,
        title: "Capacidad del Nivel Doble Indirecto en un Archivo UNIX",
        labRef: "#lab2-inode",
        labRefText: "Lab 2 (Inodo UNIX)",
        question: "Según la tabla de capacidad de un archivo UNIX de la cátedra (Diapositiva 38), con bloques de 1 KiB y apuntadores de 4 bytes (256 direcciones por bloque), ¿cuántos bloques y bytes direcciona el nivel Doble Indirecto?",
        hint: "Consulta la fila 'Doble Indirecto' de la tabla en la Diapositiva 38 (256 × 256 bloques de 1 KiB) (Diapositivas 36 a 38 | Tanenbaum & Bos Cap. 4.4).",
        options: [
            { val: "256_bloques_256kib", text: "Direcciona 256 bloques de datos, equivalentes a 256 KiB exactos (expresado como 256 bloques y 256K bytes en la tabla de cátedra)." },
            { val: "16777216_bloques_16gib", text: "Direcciona 16.777.216 bloques de datos, equivalentes a 16 GiB exactos (expresado como 256 x 65K = 16M bloques y 16G bytes en la tabla de cátedra)." },
            { val: "1048576_bloques_1gib", text: "Direcciona 1.048.576 bloques de datos, equivalentes a 1 GiB exacto (expresado como 1M bloques y 1G bytes en la tabla de cátedra)." },
            { val: "65536_bloques_64mib", text: "Direcciona 65.536 bloques de datos, equivalentes a 64 MiB exactos (expresado como 256 x 256 = 65K bloques y 65M bytes en la tabla de cátedra)." }
        ]
    },
    {
        id: "ej6_accesos_disco_inodo",
        num: 6,
        weight: 5,
        title: "Accesos Físicos a Disco por Nivel de Indirección",
        labRef: "#lab2-inode",
        labRefText: "Lab 2 (Inodo UNIX)",
        question: "Considerando que los bloques lógicos se numeran desde 0, que el nodo-i posee 10 punteros directos, un puntero indirecto simple capaz de direccionar 256 bloques y un puntero doblemente indirecto, si el nodo-i ya está cargado en memoria RAM y ningún bloque de punteros reside en caché, ¿cuántas lecturas físicas a disco son necesarias para acceder al bloque lógico 300?",
        hint: "Calcula la suma acumulada de bloques direccionables antes del nivel doble indirecto (directos + capacidad de 1 simple indirecto). Determina en qué nivel cae el bloque 300 y cuántos bloques intermedios deben leerse (Diapositivas 36 a 38 | Silberschatz Cap. 11.4).",
        options: [
            { val: "3_lecturas_doble_indirecto", text: "3 lecturas físicas: 1 para el bloque doble indirecto, 1 para el simple indirecto hijo y 1 para el bloque de datos." },
            { val: "2_lecturas_simple_indirecto", text: "2 lecturas físicas: 1 para el bloque indirecto simple y 1 para el bloque de datos correspondiente." },
            { val: "4_lecturas_con_inodo_en_disco", text: "4 lecturas físicas: 1 para el nodo-i en disco, 1 para el bloque doble indirecto, 1 para el simple y 1 para los datos." },
            { val: "1_lectura_acceso_directo", text: "1 lectura física: acceso directo inmediato al bloque de datos a partir de una dirección almacenada en el nodo-i." }
        ]
    },
    {
        id: "ej7_mapa_bits_memoria",
        num: 7,
        weight: 5,
        title: "Dimensionamiento de Memoria para Mapa de Bits",
        labRef: "#lab3-freespace",
        labRefText: "Lab 3 (Mapa de Bits)",
        question: "Para un volumen de 32 GiB (34.359.738.368 bytes), dividido en bloques de asignación de 4 KiB (4.096 bytes), ¿cuánta memoria en bytes requiere su mapa de bits de bloques?",
        hint: "Aplica la fórmula oficial de la Diapositiva 40: Memoria (en bytes) = tamaño de disco en bytes / (8 * tamaño de bloques del sistema de archivos) (Diapositivas 39 a 41 | Silberschatz Cap. 11.5).",
        options: [
            { val: "8388608_bytes_8mib", text: "8.388.608 bytes (8 MiB)." },
            { val: "1048576_bytes_1mib", text: "1.048.576 bytes (1 MiB)." },
            { val: "524288_bytes_512kib", text: "524.288 bytes (512 KiB)." },
            { val: "4194304_bytes_4mib", text: "4.194.304 bytes (4 MiB)." }
        ]
    },
    {
        id: "ej8_mapa_bits_condicion_uso",
        num: 8,
        weight: 5,
        title: "Condición de Uso del Mapa de Bits",
        labRef: "#lab3-freespace",
        labRefText: "Lab 3 (Mapa de Bits)",
        question: "Según la Diapositiva 40 de la cátedra, ¿en qué situación resulta generalmente preferible utilizar el método de mapa de bits para gestionar el espacio libre?",
        hint: "Revisa el tercer punto de la Diapositiva 40 sobre la condición de la memoria principal para contener el mapa de bits (Diapositiva 40 | Tanenbaum & Bos Cap. 4.4).",
        options: [
            { val: "disco_severamente_fragmentado_indices", text: "Cuando el disco carece de subdirectorios y todos los archivos deben alojarse mediante preasignación de cilindros completos." },
            { val: "archivos_grandes_sin_memoria_ram", text: "Cuando la memoria principal es muy reducida y resulta necesario guardar el estado de los bloques únicamente en pistas de reserva." },
            { val: "suficiente_memoria_ram_mapa_completo", text: "Cuando existe espacio suficiente en la memoria principal para contener completo el mapa de bits correspondiente a los bloques del disco." },
            { val: "acceso_exclusivo_superusuario_root", text: "Cuando el tamaño de los bloques del sistema de archivos es variable y no se conoce el número total de bloques de la partición." }
        ]
    },
    {
        id: "ej9_lista_ligada_espacio_libre",
        num: 9,
        weight: 5,
        title: "Administración de Espacio Libre por Lista Ligada",
        labRef: "#lab3-freespace",
        labRefText: "Lab 3 (Mapa de Bits)",
        question: "Según la Diapositiva 42 de la cátedra, ¿cómo se organiza la lista ligada de bloques de disco para administrar el espacio libre y qué ventaja ofrece frente al mapa de bits?",
        hint: "Revisa en la Diapositiva 42 qué contienen los bloques libres y cómo se utilizan para almacenar la propia lista de bloques libres (Diapositiva 42 | Tanenbaum & Bos Cap. 4.4).",
        options: [
            { val: "localiza_contiguos_sin_busquedas", text: "Reserva el primer cilindro del disco para alojar un índice contiguo de sectores vacíos, localizando áreas adyacentes en una sola lectura." },
            { val: "aprovecha_propios_bloques_recorrido_lento", text: "Utiliza los propios bloques libres para contener la lista, almacenando cada bloque tantos números de bloques libres como pueda y reduciendo el uso de memoria principal." },
            { val: "tolerancia_fallos_redundancia_superbloque", text: "Duplica los números de los bloques disponibles dentro de cada entrada del directorio raíz, evitando pérdidas si falla un sector magnético." },
            { val: "acceso_aleatorio_tiempo_constante_registro", text: "Guarda los números de bloques desocupados al final de los bloques de archivos activos, eliminando las operaciones de lectura en el disco." }
        ]
    },
    {
        id: "ej10_consistencia_bloque_perdido",
        num: 10,
        weight: 5,
        title: "Estados del Sistema de Archivos: Bloque Perdido",
        labRef: "#lab4-fsck",
        labRefText: "Lab 4 (Consistencia)",
        question: "Al analizar los estados del sistema de archivos (Diapositiva 44) mediante los vectores de 'bloques en uso' (Blocks in use) y 'bloques libres' (Free blocks), si ambos contadores valen 0 para un bloque, ¿qué estado representa y cómo se corrige?",
        hint: "Revisa el caso (b) de la Diapositiva 44: el bloque no figura en 'Blocks in use' ni en 'Free blocks' (Diapositiva 44 | Tanenbaum & Bos Cap. 4.4).",
        options: [
            { val: "bloque_duplicado_elimina_referencias", text: "Representa un bloque duplicado en la lista libre; debe eliminarse una de sus referencias para que su contador en la lista libre quede en 1." },
            { val: "bloque_defectuoso_aislamiento_hardware", text: "Representa un bloque defectuoso de hardware; el controlador del disco debe sustituirlo automáticamente por un bloque o pista de reserva." },
            { val: "inodo_huerfano_enlaza_lost_found", text: "Representa un estado consistente normal; corresponde a un sector reservado para respaldos incrementales que debe mantener ambos contadores en 0." },
            { val: "bloque_perdido_agrega_a_lista_libre", text: "Representa un bloque perdido: no está en uso por ningún archivo ni figura en la lista de bloques libres, por lo que debe reincorporarse a los bloques libres." }
        ]
    },
    {
        id: "ej11_consistencia_bloque_duplicado",
        num: 11,
        weight: 5,
        title: "Estados del Sistema de Archivos: Bloque de Datos Duplicado",
        labRef: "#lab4-fsck",
        labRefText: "Lab 4 (Consistencia)",
        question: "Según el caso (d) de la Diapositiva 44 ('Bloque de datos duplicado', donde el contador en 'Blocks in use' vale 2 y en 'Free blocks' vale 0), ¿cuál es el riesgo de esta anomalía y cómo puede resolverse?",
        hint: "Revisa el escenario (d) de la Diapositiva 44: dos archivos reclaman el mismo bloque físico de datos (Diapositiva 44 | Tanenbaum & Bos Cap. 4.4).",
        options: [
            { val: "corrupcion_cruzada_soluciona_clonando_bloque", text: "Si uno de los archivos modifica el bloque alterará los datos del otro, y si se borra lo liberará; puede resolverse copiando el contenido en un bloque libre y actualizando una referencia." },
            { val: "hard_link_compartido_sin_intervencion", text: "No implica riesgo para los datos porque representa un estado consistente ordinario donde dos archivos independientes comparten bloques sin necesidad de corrección." },
            { val: "corrupcion_directorio_truncado_cero", text: "Impide leer las rutas relativas del directorio de trabajo actual, por lo que el sistema operativo debe truncar ambos archivos a longitud cero de forma inmediata." },
            { val: "invalida_superbloque_formateo_particion", text: "Deshabilita permanentemente la tabla de memoria real de archivos abiertos y exige realizar un formateo completo de todas las pistas de la partición." }
        ]
    },
    {
        id: "ej12_cuotas_disco_finalidad",
        num: 12,
        weight: 5,
        title: "Cuotas de Disco (Disk Quotes) en Sistemas Multiusuario",
        labRef: "#lab5-perm-quotas",
        labRefText: "Lab 5 (Permisos y Cuotas)",
        question: "En un sistema operativo multiusuario, ¿cuál es la finalidad de establecer cuotas en el disco (Disk Quotes) y qué elementos asigna el administrador según la Diapositiva 43?",
        hint: "Consulta la Diapositiva 43 sobre qué busca evitar este mecanismo, qué asigna el administrador a cada usuario y qué garantiza el SO (Diapositiva 43 | Tanenbaum & Bos Cap. 4.4).",
        options: [
            { val: "limitar_procesos_concurrentes_memoria", text: "Evitar la saturación de la CPU asignando a cada usuario una cantidad máxima de procesos concurrentes y de páginas en memoria principal." },
            { val: "comprimir_archivos_antiguos_usuario", text: "Reducir el tiempo de búsqueda del brazo magnético asignando a cada usuario un cilindro exclusivo y una cantidad fija de sectores contiguos." },
            { val: "evitar_acaparamiento_maximo_archivos_bloques", text: "Evitar que los usuarios se apropien de un espacio excesivo en disco, asignando a cada usuario una proporción máxima de archivos y bloques que el SO garantiza no exceder." },
            { val: "restringir_ancho_banda_red_usuarios", text: "Sustituir las listas de control de acceso asignando a cada usuario un número fijo de directorios de nivel único sin permisos de escritura." }
        ]
    },
    {
        id: "ej13_proteccion_clases_usuario",
        num: 13,
        weight: 5,
        title: "Protección de Archivos: Control de Acceso, ACL y Grupos",
        labRef: "#lab5-perm-quotas",
        labRefText: "Lab 5 (Permisos y Cuotas)",
        question: "Según la Diapositiva 10 ('Protección'), ¿cómo operan el control de acceso, las Listas de Control de Acceso (ACL) y la diferenciación por grupos?",
        hint: "Revisa los tres bloques de la Diapositiva 10: Control de Acceso (RWX), ACL (NTFS) y Grupos (Dueño, Grupo y Otros) (Diapositiva 10 | Silberschatz Cap. 10.6).",
        options: [
            { val: "dueno_control_total_otros_sin_acceso", text: "El control de acceso otorga siempre permisos totales al dueño, las ACL bloquean el acceso por red y los grupos impiden la lectura a otros usuarios." },
            { val: "clases_independientes_dueno_grupo_otros", text: "El control de acceso regula quién puede leer, escribir o ejecutar (RWX), las ACL permiten granularidad fina por usuario específico y el esquema de grupos diferencia permisos entre Dueño, Grupo y Otros." },
            { val: "grupos_definen_cuotas_dueno_ejecucion", text: "El control de acceso define el tamaño del bloque, las ACL administran las cuotas de almacenamiento por partición y los grupos solo regulan la ejecución de programas." },
            { val: "otros_heredan_permisos_superusuario", text: "El control de acceso encripta los sectores físicos, las ACL asignan contraseñas por directorio de nivel único y los grupos otorgan privilegios de administrador a otros usuarios." }
        ]
    },
    {
        id: "ej14_apertura_archivo_tabla_memoria",
        num: 14,
        weight: 5,
        title: "Operación de Apertura de Archivos y Tabla en Memoria Real",
        labRef: "#lab5-perm-quotas",
        labRefText: "Lab 5 (Permisos y Cuotas)",
        question: "Según la Diapositiva 8 de la cátedra, ¿qué pasos realiza el sistema operativo al abrir un archivo y cómo se resuelven las referencias subsecuentes a dicho archivo?",
        hint: "Revisa los cuatro puntos de la Diapositiva 8 ('Al abrir un archivo el S. O.: ...') (Diapositiva 8 | Silberschatz Cap. 10.2).",
        options: [
            { val: "busca_nombre_extrae_atributos_tabla_memoria", text: "Busca en su directorio el nombre del archivo, extrae los atributos y direcciones en disco, y graba esta información en una tabla de memoria real para que las referencias subsecuentes usen la memoria principal." },
            { val: "carga_archivo_completo_memoria_ram", text: "Copia todos los bloques de datos del archivo desde el disco hacia un disco RAM estático, de modo que las referencias subsecuentes modifiquen solo la unidad virtual sin usar el directorio." },
            { val: "asigna_nuevos_bloques_contiguos_directorio", text: "Reubica los bloques del archivo en un área contigua del cilindro central y actualiza el mapa de bits, para que las referencias subsecuentes no requieran mover el cabezal del disco." },
            { val: "reserva_tabla_paginas_espacio_swap", text: "Duplica la entrada del directorio en un sector de reserva del controlador de disco, de manera que las referencias subsecuentes sean resueltas en hardware sin usar la memoria principal." }
        ]
    },
    {
        id: "ej15_bloques_defectuosos_recuperacion",
        num: 15,
        weight: 5,
        title: "Confiabilidad y Manejo de un Bloque Defectuoso: Hardware vs Software",
        labRef: "#lab4-fsck",
        labRefText: "Lab 4 (Consistencia)",
        question: "Según las Diapositivas 46 y 47 de la cátedra, ¿en qué consisten la solución en hardware y la solución en software para el manejo de un bloque defectuoso?",
        hint: "Compara en la Diapositiva 46 el sector dedicado a la lista de bloques defectuosos y el bloque/pista de reserva del controlador con el archivo de bloques defectuosos de la Diapositiva 47 (Diapositivas 46 y 47).",
        options: [
            { val: "hardware_compactacion_fisica_software_borrado", text: "En hardware, el controlador compacta físicamente todos los cilindros de la partición en tiempo real; en software, el sistema de archivos elimina los archivos que hayan intentado acceder al sector dañado." },
            { val: "hardware_desvio_cache_software_reintento_indefinido", text: "En hardware, el disco desactiva el cabezal de la superficie afectada y desvía las lecturas a la caché; en software, el sistema operativo reintenta indefinidamente la operación sin alterar la lista de bloques libres." },
            { val: "hardware_bloque_reserva_software_lista_defectuosos", text: "En hardware, el controlador lee la lista de bloques defectuosos de un sector dedicado y los reemplaza por un bloque o pista de reserva; en software, se los elimina de la lista de bloques libres y se crea un archivo de bloques defectuosos que no debe leerse, escribirse ni respaldarse." },
            { val: "hardware_raid_interno_software_superbloque", text: "En hardware, el controlador reconstruye los bytes mediante un respaldo incremental alojado en la pista cero; en software, el sistema operativo duplica el bloque defectuoso dentro del directorio raíz." }
        ]
    },
    {
        id: "ej16_tecnicas_comunicacion_io",
        num: 16,
        weight: 5,
        title: "Técnicas de Comunicación de E/S: Programada, Interrupciones y DMA",
        labRef: "#lab6-io-disks",
        labRefText: "Lab 6 (E/S y Discos)",
        question: "Según las Diapositivas 58 a 62 de la Unidad 9, ¿qué diferencia al Acceso Directo a Memoria (DMA) respecto de la E/S programada y de la E/S dirigida por interrupciones?",
        hint: "Observa la tabla de la Diapositiva 62 (con/sin interrupciones y transferencia a través del procesador vs. directa a memoria) y la Diapositiva 60 (Diapositivas 58 a 62 | Stallings Cap. 11).",
        options: [
            { val: "modificacion_registros_sin_bus", text: "En DMA la transferencia se realiza a través del procesador sin emplear interrupciones, manteniendo a la CPU ocupada durante todo el intercambio del bloque de datos." },
            { val: "delegacion_buffer_usuario_sin_interrupciones", text: "En DMA el procesador lee cada palabra desde el módulo de E/S y la escribe en memoria principal cada vez que recibe una interrupción por palabra transferida." },
            { val: "espera_activa_alta_velocidad", text: "En DMA el proceso de usuario controla directamente los motores del dispositivo periférico sin intervención del módulo de DMA ni de las líneas de interrupción." },
            { val: "dma_transferencia_bloques_interrupcion_final", text: "En DMA un módulo de DMA controla el intercambio directo de datos entre la memoria principal y el módulo de E/S, y el procesador envía la petición de un bloque y solo es interrumpido cuando se ha transferido el bloque entero." }
        ]
    },
    {
        id: "ej17_capas_software_io_buffering",
        num: 17,
        weight: 5,
        title: "Capas del Software de E/S y Subsistema del Núcleo",
        labRef: "#lab6-io-disks",
        labRefText: "Lab 6 (E/S y Discos)",
        question: "Según las Diapositivas 64 y 65 de la cátedra, ¿qué funciones cumplen el software de SO independiente del dispositivo (y el subsistema del núcleo) frente a los drivers de dispositivos?",
        hint: "Revisa los recuadros de la Diapositiva 64 ('Software de SO independiente del dispositivo' y 'Drivers de Dispositivos') y la Diapositiva 65 (Diapositivas 64 y 65 | Tanenbaum Cap. 5.2).",
        options: [
            { val: "lineas_irq_directas_drivers_posix", text: "El software independiente gestiona exclusivamente las interrupciones físicas del hardware; mientras que los drivers constituyen bibliotecas vinculadas en el espacio de usuario." },
            { val: "capa_independiente_buffering_caching_drivers_especificos", text: "El software independiente realiza tareas como el uso del buffer y el reporte de error (junto con caching y spooling en el núcleo); mientras que los drivers se encargan de los detalles de operación de los dispositivos y proporcionan interfaces uniformes para el resto del SO." },
            { val: "espacio_usuario_bibliotecas_drivers_bios", text: "El software independiente controla directamente el movimiento mecánico de los cilindros del disco; mientras que los drivers administran las cuotas de almacenamiento por usuario." },
            { val: "drivers_spooling_independiente_analogico", text: "El software independiente traduce las señales electrónicas del adaptador de hardware; mientras que los drivers ejecutan las aplicaciones de usuario y la cola de impresión." }
        ]
    },
    {
        id: "ej18_parametros_rendimiento_disco",
        num: 18,
        weight: 5,
        title: "Parámetros de Rendimiento de Disco y Tiempo de Transferencia",
        labRef: "#lab6-io-disks",
        labRefText: "Lab 6 (E/S y Discos)",
        question: "Según la Diapositiva 68 de la cátedra, ¿cuáles son los tres parámetros de rendimiento de un disco magnético y mediante qué fórmula se calcula el tiempo de transferencia (T)?",
        hint: "Consulta la Diapositiva 68: identifica los tres tiempos definidos y la expresión de T en función de b (bytes a transferir), r (revoluciones por segundo) y N (bytes por pista) (Diapositiva 68).",
        options: [
            { val: "tiempo_compilacion_propagacion_formula_inversa", text: "Tiempo de búsqueda, retardo de conmutación de pista y tiempo de transferencia, calculándose este último mediante la relación T = (b · r) / N." },
            { val: "tiempo_memoria_ciclo_reloj_formula_erronea", text: "Tiempo de posicionamiento, retardo de controlador y tiempo de transferencia, calculándose este último mediante la relación T = (r · N) / b." },
            { val: "conmutacion_contexto_buffer_dma_producto", text: "Tiempo de asentamiento del brazo, retardo de cola y tiempo de transferencia, calculándose este último mediante la relación T = b / (r + N)." },
            { val: "busqueda_brazo_latencia_giro_transferencia_formula", text: "Tiempo de búsqueda, retardo de giro y tiempo de transferencia, calculándose este último mediante la relación T = b / (r · N)." }
        ]
    },
    {
        id: "ej19_planificacion_disco_algoritmos",
        num: 19,
        weight: 5,
        title: "Políticas de Planificación de Disco: SSTF vs C-SCAN",
        labRef: "#lab6-io-disks",
        labRefText: "Lab 6 (E/S y Discos)",
        question: "Según las Diapositivas 72, 73 y 75 de la cátedra, ¿qué comportamiento presenta la estrategia SSTF respecto de las pistas del disco y qué ventajas ofrece la estrategia C-SCAN?",
        hint: "Revisa en la Diapositiva 72 a qué pistas tiende a favorecer SSTF y en la Diapositiva 75 cómo realiza el rastreo C-SCAN y qué ocurre con la varianza (Diapositivas 72 a 75 | Stallings Cap. 11).",
        options: [
            { val: "sstf_inanicion_extremos_cscan_recorrido_unidireccional_baja_varianza", text: "SSTF tiende a favorecer a las pistas del centro del disco; mientras que C-SCAN restringe el rastreo a una sola dirección, no discrimina a los cilindros exterior e interior y logra que la varianza de los tiempos de respuesta sea muy pequeña." },
            { val: "sstf_alternancia_cercana_cscan_barrido_bidireccional", text: "SSTF respeta el orden de llegada de las peticiones a la cola; mientras que C-SCAN invierte la dirección de servicio en cada extremo atendiendo peticiones en ambos sentidos de recorrido." },
            { val: "sstf_equitativo_cscan_postergacion_centro", text: "SSTF elimina toda discriminación entre pistas interiores y exteriores; mientras que C-SCAN favorece únicamente a las pistas centrales postergando las solicitudes de los bordes del disco." },
            { val: "sstf_fifo_estricto_cscan_prioridad_proceso", text: "SSTF divide la cola de peticiones en subcolas de longitud fija N; mientras que C-SCAN selecciona siempre la solicitud que requiera el mayor movimiento posible del brazo desde su posición actual." }
        ]
    },
    {
        id: "ej20_planificacion_disco_n_pasos",
        num: 20,
        weight: 5,
        title: "Planificación de Disco: Estrategia SCAN de N Pasos",
        labRef: "#lab6-io-disks",
        labRefText: "Lab 6 (E/S y Discos)",
        question: "Según la Diapositiva 74 de la teoría oficial de cátedra, ¿cómo opera la estrategia SCAN de N pasos y cuál es su comportamiento para valores grandes de N y para N = 1?",
        hint: "Revisa los cuatro puntos de la Diapositiva 74 ('Estrategia SCAN de N pasos') sobre las subcolas de longitud N, N grande y N=1 (Diapositiva 74 | Stallings Cap. 11).",
        options: [
            { val: "subcolas_prioridad_proceso_n_1_sstf", text: "Divide las peticiones por prioridad del proceso emisor; para valores grandes de N atiende solo procesos del núcleo y para N = 1 adopta la política SSTF." },
            { val: "barrido_circular_saltos_fijos_n_pistas", text: "Recorre el disco avanzando en saltos fijos de N pistas en una sola dirección; para valores grandes de N equivale a C-LOOK y para N = 1 detiene el cabezal." },
            { val: "subcolas_n_scan_n_grande_scan_n_1_fifo", text: "Divide la cola de peticiones en subcolas de longitud N que se procesan una a una mediante SCAN (añadiendo nuevas peticiones a las otras subcolas); para N grande se aproxima a SCAN y para N = 1 adopta la política FIFO." },
            { val: "alternancia_bidireccional_n_cilindros_reserva", text: "Invierte el sentido del brazo cada vez que atiende N solicitudes consecutivas; para valores grandes de N equivale a FIFO y para N = 1 se comporta como C-SCAN." }
        ]
    }
];

// --- ESTADO GLOBAL Y LOCALSTORAGE ---
const STORAGE_KEY = "tso_tp8_state_v1";

let appState = {
    theme: "light",
    student: {
        name: "",
        id: "",
        email: ""
    },
    answers: {},
    // Simulador Lab 1 (Asignación)
    lab1: {
        method: "contigua",
        blocks: Array(64).fill(null), // null = libre, o { file: 'A', index: 0, next: null }
        files: {}
    },
    // Simulador Lab 4 (fsck)
    lab4: {
        scenario: "consistent",
        files: [
            { id: 1, blocks: [0, 1, 2] },
            { id: 2, blocks: [3, 4] }
        ],
        freeList: [5, 6, 7],
        badBlocksList: [],
        audited: false,
        repaired: false
    },
    // Simulador Lab 6 (Planificación de Disco y E/S)
    lab6: {
        requests: [55, 58, 39, 18, 90, 160, 150, 38, 184],
        initialHead: 100,
        algo: "fcfs",
        direction: "outwards"
    }
};

// Carga inicial de estado
function loadPersistedState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed.answers) appState.answers = parsed.answers;
            if (parsed.student) appState.student = parsed.student;
            if (parsed.theme) appState.theme = parsed.theme;
        }
    } catch (e) {
        console.warn("No se pudo cargar el estado guardado:", e);
    }
}

function persistState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            theme: appState.theme,
            student: appState.student,
            answers: appState.answers
        }));
    } catch (e) {
        console.warn("Error al persistir estado:", e);
    }
}

// --- TEMA OSCURO / CLARO ---
function initTheme() {
    const savedTheme = appState.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    const btn = document.getElementById('btn-theme-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
}

function applyTheme(theme) {
    appState.theme = theme;
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    persistState();
}

// --- RENDERIZADO DE LAS CARDS DE AUTOEVALUACIÓN ---
function renderQuestions() {
    const container = document.getElementById('questions-list');
    if (!container) return;

    container.innerHTML = "";

    TP8_EXERCISES.forEach((ex) => {
        const card = document.createElement('div');
        card.id = `card-${ex.id}`;
        card.className = "question-card";

        const isAnswered = !!appState.answers[ex.id];
        if (isAnswered) card.classList.add('answered');

        const optionsHtml = ex.options.map((opt, idx) => {
            const isChecked = appState.answers[ex.id] === opt.val;
            return `
                <label class="option-label">
                    <input type="radio" name="radio-${ex.id}" value="${opt.val}" ${isChecked ? 'checked' : ''} data-ex-id="${ex.id}">
                    <span><strong>${String.fromCharCode(65 + idx)})</strong> ${opt.text}</span>
                </label>
            `;
        }).join('');

        card.innerHTML = `
            <div class="flex flex-wrap justify-between items-center gap-2 mb-2">
                <div class="flex items-center gap-2">
                    <span class="badge badge-info">Ejercicio ${ex.num}</span>
                    <span class="font-bold text-sm text-gray-800 dark:text-gray-100">${ex.title}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="badge badge-warning">${ex.weight} Pts</span>
                    <a href="${ex.labRef}" class="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">↗ Ir a ${ex.labRefText}</a>
                </div>
            </div>
            <p class="text-xs text-gray-700 dark:text-gray-300 font-medium mb-3 leading-relaxed">${ex.question}</p>
            <div class="space-y-1">
                ${optionsHtml}
            </div>
            <div class="mt-3 flex justify-between items-center">
                <button type="button" class="btn-toggle-hint text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline" data-target="hint-${ex.id}">💡 Pista Pedagógica</button>
                <span class="text-[11px] text-gray-400 status-indicator">${isAnswered ? '✅ Respondido' : '⚪ Pendiente'}</span>
            </div>
            <div id="hint-${ex.id}" class="hint-box hidden">
                ${ex.hint}
            </div>
        `;

        container.appendChild(card);
    });

    // Listeners para selección de radios
    container.addEventListener('change', (e) => {
        if (e.target && e.target.type === 'radio') {
            const exId = e.target.getAttribute('data-ex-id');
            const val = e.target.value;
            appState.answers[exId] = val;
            
            const card = document.getElementById(`card-${exId}`);
            if (card) {
                card.classList.add('answered');
                const status = card.querySelector('.status-indicator');
                if (status) status.textContent = '✅ Respondido';
            }
            updateProgress();
            persistState();
        }
    });

    // Listeners para toggle de pistas
    container.querySelectorAll('.btn-toggle-hint').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const box = document.getElementById(targetId);
            if (box) box.classList.toggle('hidden');
        });
    });
}

function updateProgress() {
    const total = TP8_EXERCISES.length;
    let answered = 0;
    TP8_EXERCISES.forEach(ex => {
        if (appState.answers[ex.id]) answered++;
    });

    const percent = Math.round((answered / total) * 100);
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');

    if (fill) fill.style.width = `${percent}%`;
    if (text) text.textContent = `Progreso: ${answered} / ${total} (${percent}%)`;

    if (answered === total && window.confetti) {
        window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.85 } });
    }
}

// --- LABORATORIO 1: MÉTODOS DE ASIGNACIÓN (CONTIGUA, ENLAZADA, FAT) ---
function initLab1() {
    const selectMethod = document.getElementById('select-alloc-method');
    const gridContainer = document.getElementById('disk-grid-container');
    const badgeMethod = document.getElementById('badge-alloc-method');
    const statsText = document.getElementById('disk-stats');
    const infoCard = document.getElementById('alloc-info-card');
    const feedbackMsg = document.getElementById('alloc-feedback-msg');
    const fatTableContainer = document.getElementById('fat-table-container');
    const fatEntriesGrid = document.getElementById('fat-entries-grid');

    function showFeedback(msg, type = 'info') {
        if (!feedbackMsg) return;
        feedbackMsg.className = "mb-3 text-xs font-semibold p-2.5 rounded border transition-all";
        if (type === 'success') {
            feedbackMsg.className += " bg-emerald-100 border-emerald-300 text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-200";
        } else if (type === 'error' || type === 'danger') {
            feedbackMsg.className += " bg-rose-100 border-rose-300 text-rose-800 dark:bg-rose-950/60 dark:border-rose-800 dark:text-rose-200";
        } else if (type === 'warning') {
            feedbackMsg.className += " bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-200";
        } else {
            feedbackMsg.className += " bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-200";
        }
        feedbackMsg.innerHTML = msg;
        feedbackMsg.classList.remove('hidden');
    }

    function allocateFreeBlocks(count, preferContiguous = false) {
        if (preferContiguous) {
            for (let i = 0; i <= 64 - count; i++) {
                let sliceFree = true;
                for (let j = 0; j < count; j++) {
                    if (appState.lab1.blocks[i + j]) {
                        sliceFree = false;
                        break;
                    }
                }
                if (sliceFree) {
                    return Array.from({ length: count }, (_, idx) => i + idx);
                }
            }
            return null;
        } else {
            const freeIndices = [];
            for (let i = 0; i < 64; i++) {
                if (!appState.lab1.blocks[i]) {
                    freeIndices.push(i);
                    if (freeIndices.length === count) break;
                }
            }
            return freeIndices.length === count ? freeIndices : null;
        }
    }

    function renderFatTable() {
        if (!fatEntriesGrid) return;
        fatEntriesGrid.innerHTML = "";

        for (let i = 0; i < 64; i++) {
            const blk = appState.lab1.blocks[i];
            const cell = document.createElement('div');
            cell.className = "p-1 rounded border text-[10px]";

            if (!blk) {
                cell.className += " bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-400";
                cell.innerHTML = `<span class="opacity-60">[${i}]</span>: -`;
            } else {
                let colorClass = " bg-purple-100 dark:bg-purple-950/80 border-purple-300 dark:border-purple-700 font-bold text-purple-700 dark:text-purple-300";
                if (blk.file === 'A') {
                    colorClass = " bg-blue-100 dark:bg-blue-950/80 border-blue-300 dark:border-blue-700 font-bold text-blue-700 dark:text-blue-300";
                } else if (blk.file === 'B') {
                    colorClass = " bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 font-bold text-emerald-700 dark:text-emerald-300";
                } else if (blk.file === 'C') {
                    colorClass = " bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 font-bold text-amber-700 dark:text-amber-300";
                }
                const val = (blk.next !== null && blk.next !== undefined) ? `${blk.next}` : 'EOF';
                cell.className += colorClass;
                cell.innerHTML = `<span class="opacity-75">[${i}]</span>: ${val}`;
            }
            fatEntriesGrid.appendChild(cell);
        }
    }

    function renderGrid() {
        if (!gridContainer) return;
        gridContainer.innerHTML = "";

        let occupied = 0;
        const method = appState.lab1.method;

        appState.lab1.blocks.forEach((blk, idx) => {
            const el = document.createElement('div');
            el.className = "disk-block";
            
            if (!blk) {
                el.classList.add('block-free');
                el.innerHTML = `<span>${idx}</span>`;
            } else {
                occupied++;
                el.classList.add(`block-file-${blk.file.toLowerCase()}`);
                if (method === 'enlazada') {
                    const nextTxt = (blk.next !== null && blk.next !== undefined) ? `→${blk.next}` : 'EOF';
                    el.innerHTML = `<span>${blk.file}${blk.index}</span><span class="text-[9px] opacity-80 font-mono">${nextTxt}</span>`;
                } else if (method === 'fat') {
                    // En FAT los punteros residen en la tabla (modelo oficial: en memoria principal)
                    el.innerHTML = `<span>${blk.file}${blk.index}</span><span class="text-[8px] opacity-75 font-mono">Dato</span>`;
                } else {
                    // Contigua
                    el.innerHTML = `<span>${blk.file}${blk.index}</span>`;
                }
            }
            gridContainer.appendChild(el);
        });

        const free = 64 - occupied;

        // Mostrar u ocultar la tabla FAT según el método
        if (fatTableContainer) {
            if (method === 'fat') {
                fatTableContainer.classList.remove('hidden');
                renderFatTable();
            } else {
                fatTableContainer.classList.add('hidden');
            }
        }

        // Calcular índice didáctico de dispersión del espacio libre para asignación contigua
        let fragExt = 0;
        if (method === 'contigua') {
            let maxFreeChunk = 0;
            let currentChunk = 0;
            appState.lab1.blocks.forEach(b => {
                if (!b) {
                    currentChunk++;
                    if (currentChunk > maxFreeChunk) maxFreeChunk = currentChunk;
                } else {
                    currentChunk = 0;
                }
            });
            if (free > 0 && maxFreeChunk < free) {
                fragExt = Math.round(((free - maxFreeChunk) / free) * 100);
            }
        }

        if (statsText) {
            statsText.textContent = `Ocupados: ${occupied}/64 | Libres: ${free} | Índice Didáctico de Dispersión del Espacio Libre: ${fragExt}%`;
        }

        updateAllocInfo();
    }

    function updateAllocInfo() {
        if (!infoCard) return;
        const m = appState.lab1.method;
        if (m === 'contigua') {
            infoCard.innerHTML = `
                <div class="font-bold text-blue-700 dark:text-blue-300">📌 Asignación Contigua (Diapositivas 26-28):</div>
                <p>• Los bloques de cada archivo deben ser estrictamente contiguos en disco; solo requiere la dirección del primer bloque y el número de bloques.</p>
                <p>• <strong>Velocidad:</strong> Excelente rendimiento de lectura (una sola operación) y acceso directo simple.</p>
                <p>• <strong>Problemas Críticos:</strong> Causa <em>fragmentación externa</em> (requiere compactación) y obliga a <strong>conocer el tamaño máximo del archivo al momento de crearlo</strong> (preasignación, Diapositiva 27).</p>
                <p>• <strong>Índice Didáctico de Dispersión del Espacio Libre:</strong> Métrica conceptual que ilustra la proporción de espacio libre fragmentado en huecos no contiguos: <code>((Libres Totales - Bloque Continuo Máximo) / Libres Totales) × 100</code>.</p>
            `;
            if (badgeMethod) badgeMethod.textContent = "Método: Asignación Contigua";
        } else if (m === 'enlazada') {
            infoCard.innerHTML = `
                <div class="font-bold text-purple-700 dark:text-purple-300">📌 Asignación por Lista Ligada / Enlazada (Diapositivas 29-31):</div>
                <p>• La primera palabra de cada bloque se utiliza como puntero al siguiente bloque y el resto para datos (mostrado en cada celda).</p>
                <p>• <strong>Ventajas:</strong> Elimina la fragmentación externa (se aprovecha cualquier bloque libre) y no es necesario declarar el tamaño del archivo al crearlo.</p>
                <p>• <strong>Desventajas (Diapositiva 29):</strong> Acceso aleatorio muy lento (requiere recorrer <em>k</em> bloques en disco); el espacio de datos por bloque <strong>deja de ser potencia de 2</strong> por los bytes del puntero; y si se pierde un puntero se corrompe la cadena.</p>
            `;
            if (badgeMethod) badgeMethod.textContent = "Método: Asignación Enlazada";
        } else {
            infoCard.innerHTML = `
                <div class="font-bold text-emerald-700 dark:text-emerald-300">📌 Lista Ligada utilizando una Tabla en Memoria — FAT (Diapositivas 32-34):</div>
                <p>• Toma la palabra apuntadora de cada bloque de disco y la coloca en una tabla en memoria principal (Tabla de Asignación de Archivos - FAT).</p>
                <p>• <strong>Ventajas:</strong> El bloque completo queda disponible para datos (potencia de 2) y el acceso aleatorio es mucho más rápido porque la cadena se recorre en memoria sin hacer referencias a disco.</p>
                <p>• <strong>Desventaja Crítica (Diapositiva 33):</strong> Toda la tabla debe estar en memoria principal todo el tiempo para funcionar, lo que escala linealmente y consume mucha RAM en discos grandes.</p>
            `;
            if (badgeMethod) badgeMethod.textContent = "Método: Tabla FAT (Memoria Principal)";
        }
    }

    if (selectMethod) {
        selectMethod.addEventListener('change', (e) => {
            const hasFiles = appState.lab1.files && Object.keys(appState.lab1.files).length > 0;
            if (hasFiles) {
                if (confirm("Cambiar el método de asignación reiniciará los bloques del disco para inicializar la nueva estructura. ¿Deseas continuar?")) {
                    appState.lab1.blocks = Array(64).fill(null);
                    appState.lab1.files = {};
                    appState.lab1.method = e.target.value;
                    if (feedbackMsg) feedbackMsg.classList.add('hidden');
                    renderGrid();
                } else {
                    e.target.value = appState.lab1.method;
                }
            } else {
                appState.lab1.method = e.target.value;
                if (feedbackMsg) feedbackMsg.classList.add('hidden');
                renderGrid();
            }
        });
    }

    // Acciones de archivos
    const btnCreateA = document.getElementById('btn-create-file-a');
    const btnCreateB = document.getElementById('btn-create-file-b');
    const btnCreateC = document.getElementById('btn-create-file-c');
    const btnDeleteA = document.getElementById('btn-delete-file-a');
    const btnExtendB = document.getElementById('btn-extend-file-b');
    const btnReset = document.getElementById('btn-reset-disk');

    if (btnCreateA) {
        btnCreateA.addEventListener('click', () => {
            if (appState.lab1.files && appState.lab1.files['A']) {
                showFeedback("⚠️ El Archivo A ya fue creado en disco. Para volver a crearlo, elimínelo o limpie el disco.", "warning");
                return;
            }

            const m = appState.lab1.method;
            if (m === 'contigua') {
                const targetBlocks = (!appState.lab1.blocks[0] && !appState.lab1.blocks[1] && !appState.lab1.blocks[2]) ? 
                    [0, 1, 2] : allocateFreeBlocks(3, true);

                if (!targetBlocks) {
                    showFeedback("❌ Error en Asignación Contigua: No se encontraron 3 bloques libres contiguos para alojar el Archivo A.", "error");
                    return;
                }
                appState.lab1.blocks[targetBlocks[0]] = { file: 'A', index: 0, next: targetBlocks[1] };
                appState.lab1.blocks[targetBlocks[1]] = { file: 'A', index: 1, next: targetBlocks[2] };
                appState.lab1.blocks[targetBlocks[2]] = { file: 'A', index: 2, next: null };
                if (!appState.lab1.files) appState.lab1.files = {};
                appState.lab1.files['A'] = targetBlocks;
                showFeedback(`✅ Archivo A creado exitosamente en bloques contiguos [${targetBlocks.join(', ')}] (3 bloques).`, "success");
            } else if (m === 'enlazada') {
                // Si [2, 11, 25] están libres, usarlos para ilustrar dispersión; sino, buscar libres
                const preferred = [2, 11, 25];
                const canUsePref = preferred.every(b => !appState.lab1.blocks[b]);
                const targetBlocks = canUsePref ? preferred : allocateFreeBlocks(3, false);

                if (!targetBlocks) {
                    showFeedback("❌ Error en Asignación Enlazada: Espacio insuficiente en disco para el Archivo A.", "error");
                    return;
                }
                appState.lab1.blocks[targetBlocks[0]] = { file: 'A', index: 0, next: targetBlocks[1] };
                appState.lab1.blocks[targetBlocks[1]] = { file: 'A', index: 1, next: targetBlocks[2] };
                appState.lab1.blocks[targetBlocks[2]] = { file: 'A', index: 2, next: null };
                if (!appState.lab1.files) appState.lab1.files = {};
                appState.lab1.files['A'] = targetBlocks;
                showFeedback(`✅ Archivo A creado con asignación enlazada en bloques dispersos: ${targetBlocks.join(' → ')} → EOF (sin requerir contigüidad física).`, "success");
            } else {
                // FAT
                const preferred = [2, 11, 25];
                const canUsePref = preferred.every(b => !appState.lab1.blocks[b]);
                const targetBlocks = canUsePref ? preferred : allocateFreeBlocks(3, false);

                if (!targetBlocks) {
                    showFeedback("❌ Error en FAT: Espacio insuficiente en disco para el Archivo A.", "error");
                    return;
                }
                appState.lab1.blocks[targetBlocks[0]] = { file: 'A', index: 0, next: targetBlocks[1] };
                appState.lab1.blocks[targetBlocks[1]] = { file: 'A', index: 1, next: targetBlocks[2] };
                appState.lab1.blocks[targetBlocks[2]] = { file: 'A', index: 2, next: null };
                if (!appState.lab1.files) appState.lab1.files = {};
                appState.lab1.files['A'] = targetBlocks;
                showFeedback(`✅ Archivo A creado con FAT en bloques dispersos: [${targetBlocks.join(', ')}]. Punteros centralizados en la tabla FAT en memoria principal.`, "success");
            }
            renderGrid();
        });
    }

    if (btnCreateB) {
        btnCreateB.addEventListener('click', () => {
            if (appState.lab1.files && appState.lab1.files['B']) {
                showFeedback("⚠️ El Archivo B ya fue creado en disco. Para volver a crearlo, limpie el disco.", "warning");
                return;
            }

            const m = appState.lab1.method;
            if (m === 'contigua') {
                const targetBlocks = (!appState.lab1.blocks[3] && !appState.lab1.blocks[4] && !appState.lab1.blocks[5] && !appState.lab1.blocks[6]) ? 
                    [3, 4, 5, 6] : allocateFreeBlocks(4, true);

                if (!targetBlocks) {
                    showFeedback("❌ Error en Asignación Contigua: No se encontraron 4 bloques libres contiguos para alojar el Archivo B.", "error");
                    return;
                }
                appState.lab1.blocks[targetBlocks[0]] = { file: 'B', index: 0, next: targetBlocks[1] };
                appState.lab1.blocks[targetBlocks[1]] = { file: 'B', index: 1, next: targetBlocks[2] };
                appState.lab1.blocks[targetBlocks[2]] = { file: 'B', index: 2, next: targetBlocks[3] };
                appState.lab1.blocks[targetBlocks[3]] = { file: 'B', index: 3, next: null };
                if (!appState.lab1.files) appState.lab1.files = {};
                appState.lab1.files['B'] = targetBlocks;
                showFeedback(`✅ Archivo B creado exitosamente en bloques contiguos [${targetBlocks.join(', ')}] (4 bloques).`, "success");
            } else if (m === 'enlazada') {
                const preferred = [4, 18, 7, 31];
                const canUsePref = preferred.every(b => !appState.lab1.blocks[b]);
                const targetBlocks = canUsePref ? preferred : allocateFreeBlocks(4, false);

                if (!targetBlocks) {
                    showFeedback("❌ Error en Asignación Enlazada: Espacio insuficiente en disco para el Archivo B.", "error");
                    return;
                }
                appState.lab1.blocks[targetBlocks[0]] = { file: 'B', index: 0, next: targetBlocks[1] };
                appState.lab1.blocks[targetBlocks[1]] = { file: 'B', index: 1, next: targetBlocks[2] };
                appState.lab1.blocks[targetBlocks[2]] = { file: 'B', index: 2, next: targetBlocks[3] };
                appState.lab1.blocks[targetBlocks[3]] = { file: 'B', index: 3, next: null };
                if (!appState.lab1.files) appState.lab1.files = {};
                appState.lab1.files['B'] = targetBlocks;
                showFeedback(`✅ Archivo B creado con asignación enlazada en bloques dispersos: ${targetBlocks.join(' → ')} → EOF.`, "success");
            } else {
                const preferred = [4, 18, 7, 31];
                const canUsePref = preferred.every(b => !appState.lab1.blocks[b]);
                const targetBlocks = canUsePref ? preferred : allocateFreeBlocks(4, false);

                if (!targetBlocks) {
                    showFeedback("❌ Error en FAT: Espacio insuficiente en disco para el Archivo B.", "error");
                    return;
                }
                appState.lab1.blocks[targetBlocks[0]] = { file: 'B', index: 0, next: targetBlocks[1] };
                appState.lab1.blocks[targetBlocks[1]] = { file: 'B', index: 1, next: targetBlocks[2] };
                appState.lab1.blocks[targetBlocks[2]] = { file: 'B', index: 2, next: targetBlocks[3] };
                appState.lab1.blocks[targetBlocks[3]] = { file: 'B', index: 3, next: null };
                if (!appState.lab1.files) appState.lab1.files = {};
                appState.lab1.files['B'] = targetBlocks;
                showFeedback(`✅ Archivo B creado con FAT en bloques dispersos: [${targetBlocks.join(', ')}]. Punteros registrados en la tabla FAT en memoria principal.`, "success");
            }
            renderGrid();
        });
    }

    if (btnCreateC) {
        btnCreateC.addEventListener('click', () => {
            if (appState.lab1.files && appState.lab1.files['C']) {
                showFeedback("⚠️ El Archivo C ya fue creado en disco. Para volver a crearlo, limpie el disco.", "warning");
                return;
            }

            const m = appState.lab1.method;
            if (m === 'contigua') {
                const targetBlocks = (!appState.lab1.blocks[7] && !appState.lab1.blocks[8]) ? 
                    [7, 8] : allocateFreeBlocks(2, true);

                if (!targetBlocks) {
                    showFeedback("❌ Error en Asignación Contigua: No se encontraron 2 bloques libres contiguos para alojar el Archivo C.", "error");
                    return;
                }
                appState.lab1.blocks[targetBlocks[0]] = { file: 'C', index: 0, next: targetBlocks[1] };
                appState.lab1.blocks[targetBlocks[1]] = { file: 'C', index: 1, next: null };
                if (!appState.lab1.files) appState.lab1.files = {};
                appState.lab1.files['C'] = targetBlocks;
                showFeedback(`✅ Archivo C creado exitosamente en bloques contiguos [${targetBlocks.join(', ')}] (2 bloques).`, "success");
            } else if (m === 'enlazada') {
                const preferred = [15, 28];
                const canUsePref = preferred.every(b => !appState.lab1.blocks[b]);
                const targetBlocks = canUsePref ? preferred : allocateFreeBlocks(2, false);

                if (!targetBlocks) {
                    showFeedback("❌ Error en Asignación Enlazada: Espacio insuficiente para el Archivo C.", "error");
                    return;
                }
                appState.lab1.blocks[targetBlocks[0]] = { file: 'C', index: 0, next: targetBlocks[1] };
                appState.lab1.blocks[targetBlocks[1]] = { file: 'C', index: 1, next: null };
                if (!appState.lab1.files) appState.lab1.files = {};
                appState.lab1.files['C'] = targetBlocks;
                showFeedback(`✅ Archivo C creado con asignación enlazada en bloques dispersos: ${targetBlocks.join(' → ')} → EOF.`, "success");
            } else {
                const preferred = [15, 28];
                const canUsePref = preferred.every(b => !appState.lab1.blocks[b]);
                const targetBlocks = canUsePref ? preferred : allocateFreeBlocks(2, false);

                if (!targetBlocks) {
                    showFeedback("❌ Error en FAT: Espacio insuficiente para el Archivo C.", "error");
                    return;
                }
                appState.lab1.blocks[targetBlocks[0]] = { file: 'C', index: 0, next: targetBlocks[1] };
                appState.lab1.blocks[targetBlocks[1]] = { file: 'C', index: 1, next: null };
                if (!appState.lab1.files) appState.lab1.files = {};
                appState.lab1.files['C'] = targetBlocks;
                showFeedback(`✅ Archivo C creado con FAT en bloques dispersos: [${targetBlocks.join(', ')}].`, "success");
            }
            renderGrid();
        });
    }

    if (btnDeleteA) {
        btnDeleteA.addEventListener('click', () => {
            if (!appState.lab1.files || !appState.lab1.files['A']) {
                showFeedback("⚠️ El Archivo A no existe en disco o ya fue eliminado.", "warning");
                return;
            }

            const freed = [...appState.lab1.files['A']];
            freed.forEach(b => {
                appState.lab1.blocks[b] = null;
            });
            delete appState.lab1.files['A'];

            if (appState.lab1.method === 'contigua') {
                showFeedback(`🗑️ Archivo A eliminado. Se liberaron los bloques contiguos [${freed.join(', ')}], generando un hueco de 3 bloques (fragmentación externa).`, "info");
            } else {
                showFeedback(`🗑️ Archivo A eliminado. Se liberaron los bloques dispersos [${freed.join(', ')}].`, "info");
            }
            renderGrid();
        });
    }

    if (btnExtendB) {
        btnExtendB.addEventListener('click', () => {
            if (!appState.lab1.files || !appState.lab1.files['B']) {
                showFeedback("⚠️ Primero debe crear el Archivo B antes de intentar extenderlo.", "warning");
                return;
            }

            const m = appState.lab1.method;
            const currentBlocks = appState.lab1.files['B'];

            if (m === 'contigua') {
                const last = currentBlocks[currentBlocks.length - 1];
                const nextCandidate = [last + 1, last + 2, last + 3];

                const canExtendForward = nextCandidate.every(b => b < 64 && !appState.lab1.blocks[b]);

                if (!canExtendForward) {
                    const blockingFile = (last + 1 < 64 && appState.lab1.blocks[last + 1]) ? appState.lab1.blocks[last + 1].file : null;
                    showFeedback(`❌ Error en Asignación Contigua (Fragmentación Externa): El Archivo B ocupa los bloques [${currentBlocks.join(', ')}] y no puede extenderse contiguamente hacia adelante porque el bloque adyacente ${last + 1} está ocupado${blockingFile ? ' por el Archivo ' + blockingFile : ''}. Aunque existan bloques libres en otra parte del disco (ej. hueco generado al eliminar A), no son contiguos al Archivo B. Esto demuestra la limitación de la asignación contigua: para crecer, el archivo requeriría reasignarse por completo a otra zona contigua o compactar el disco.`, "error");
                    return;
                }

                appState.lab1.blocks[last].next = nextCandidate[0];
                appState.lab1.blocks[nextCandidate[0]] = { file: 'B', index: currentBlocks.length, next: nextCandidate[1] };
                appState.lab1.blocks[nextCandidate[1]] = { file: 'B', index: currentBlocks.length + 1, next: nextCandidate[2] };
                appState.lab1.blocks[nextCandidate[2]] = { file: 'B', index: currentBlocks.length + 2, next: null };
                appState.lab1.files['B'] = [...currentBlocks, ...nextCandidate];
                showFeedback(`✅ Archivo B extendido contiguamente hacia adelante en los bloques libres [${nextCandidate.join(', ')}] (total: ${appState.lab1.files['B'].length} bloques).`, "success");
            } else if (m === 'enlazada') {
                const extBlocks = allocateFreeBlocks(3, false);
                if (!extBlocks) {
                    showFeedback("❌ Error en Asignación Enlazada: No hay 3 bloques libres disponibles en disco.", "error");
                    return;
                }

                const last = currentBlocks[currentBlocks.length - 1];
                appState.lab1.blocks[last].next = extBlocks[0];
                appState.lab1.blocks[extBlocks[0]] = { file: 'B', index: currentBlocks.length, next: extBlocks[1] };
                appState.lab1.blocks[extBlocks[1]] = { file: 'B', index: currentBlocks.length + 1, next: extBlocks[2] };
                appState.lab1.blocks[extBlocks[2]] = { file: 'B', index: currentBlocks.length + 2, next: null };
                appState.lab1.files['B'] = [...currentBlocks, ...extBlocks];

                showFeedback(`✅ Archivo B extendido en asignación enlazada reutilizando bloques dispersos libres [${extBlocks.join(', ')}]. Cadena de bloques: ${appState.lab1.files['B'].join(' → ')} → EOF (¡sin requerir contigüidad física!).`, "success");
            } else {
                // FAT
                const extBlocks = allocateFreeBlocks(3, false);
                if (!extBlocks) {
                    showFeedback("❌ Error en FAT: No hay 3 bloques libres disponibles en disco.", "error");
                    return;
                }

                const last = currentBlocks[currentBlocks.length - 1];
                appState.lab1.blocks[last].next = extBlocks[0];
                appState.lab1.blocks[extBlocks[0]] = { file: 'B', index: currentBlocks.length, next: extBlocks[1] };
                appState.lab1.blocks[extBlocks[1]] = { file: 'B', index: currentBlocks.length + 1, next: extBlocks[2] };
                appState.lab1.blocks[extBlocks[2]] = { file: 'B', index: currentBlocks.length + 2, next: null };
                appState.lab1.files['B'] = [...currentBlocks, ...extBlocks];

                showFeedback(`✅ Archivo B extendido con FAT utilizando bloques dispersos [${extBlocks.join(', ')}]. Las entradas se actualizaron en la tabla FAT en memoria principal.`, "success");
            }
            renderGrid();
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            appState.lab1.blocks = Array(64).fill(null);
            appState.lab1.files = {};
            if (feedbackMsg) feedbackMsg.classList.add('hidden');
            renderGrid();
        });
    }

    renderGrid();
}

// --- LABORATORIO 2: INODO UNIX Y CÁLCULO DE CAPACIDAD ---
function initLab2() {
    const inputBlock = document.getElementById('input-inode-block');
    const selectBlockSize = document.getElementById('inode-block-size');
    const btnTrace = document.getElementById('btn-trace-inode');
    const resultCard = document.getElementById('inode-result-card');

    const nodeDirect = document.getElementById('node-direct');
    const nodeInd1 = document.getElementById('node-indirect1');
    const nodeInd2 = document.getElementById('node-indirect2');
    const nodeInd3 = document.getElementById('node-indirect3');

    const lblDirectRange = document.getElementById('lbl-direct-range');
    const lblDirectCap = document.getElementById('lbl-direct-cap');
    const lblInd1Title = document.getElementById('lbl-indirect1-title');
    const lblInd1Range = document.getElementById('lbl-indirect1-range');
    const lblInd1Cap = document.getElementById('lbl-indirect1-cap');
    const lblInd2Title = document.getElementById('lbl-indirect2-title');
    const lblInd2Range = document.getElementById('lbl-indirect2-range');
    const lblInd2Cap = document.getElementById('lbl-indirect2-cap');
    const lblInd3Title = document.getElementById('lbl-indirect3-title');
    const lblInd3Range = document.getElementById('lbl-indirect3-range');
    const lblInd3Cap = document.getElementById('lbl-indirect3-cap');
    const inodeBaseNote = document.getElementById('inode-base-note');

    function calculateAndTrace() {
        const blkSize = parseInt(selectBlockSize.value, 10);
        const ptrsPerBlock = blkSize / 4; // 4 bytes por dirección (32 bits)
        const logicBlock = parseInt(inputBlock.value, 10) || 0;

        // Limpiar animaciones de trace
        [nodeDirect, nodeInd1, nodeInd2, nodeInd3].forEach(n => {
            if (n) n.classList.remove('active-trace');
        });

        // Rangos de bloques
        const directLimit = 10;
        const ind1Limit = directLimit + ptrsPerBlock;
        const ind2Limit = ind1Limit + (ptrsPerBlock * ptrsPerBlock);
        const ind3Limit = ind2Limit + (ptrsPerBlock * ptrsPerBlock * ptrsPerBlock);

        // Actualizar dinámicamente el valor máximo admisible en el input
        if (inputBlock) inputBlock.max = ind3Limit - 1;

        // Actualizar dinámicamente las etiquetas de arquitectura del inodo
        if (lblDirectRange) lblDirectRange.textContent = "Bloques lógicos: 0 a 9";
        if (lblDirectCap) lblDirectCap.textContent = `Capacidad: ${(10 * blkSize / 1024)} KiB (1 acceso)`;

        if (lblInd1Title) lblInd1Title.textContent = `Simple Indirecto (${ptrsPerBlock} punteros)`;
        if (lblInd1Range) lblInd1Range.textContent = `Bloques lógicos: 10 a ${(ind1Limit - 1).toLocaleString('es-AR')}`;
        if (lblInd1Cap) lblInd1Cap.textContent = `Capacidad: ${((ptrsPerBlock * blkSize) / 1024).toLocaleString('es-AR')} KiB (2 accesos)`;

        if (lblInd2Title) lblInd2Title.textContent = `Doble Indirecto (${ptrsPerBlock}² = ${(ptrsPerBlock * ptrsPerBlock).toLocaleString('es-AR')} punteros)`;
        if (lblInd2Range) lblInd2Range.textContent = `Bloques: ${ind1Limit.toLocaleString('es-AR')} a ${(ind2Limit - 1).toLocaleString('es-AR')}`;
        if (lblInd2Cap) {
            const mibVal = (ptrsPerBlock * ptrsPerBlock * blkSize) / (1024 * 1024);
            lblInd2Cap.textContent = blkSize === 1024
                ? `Capacidad: ${mibVal.toLocaleString('es-AR')} MiB [65K blk / 65M en tabla Diapo 38] (3 accesos)`
                : `Capacidad: ${mibVal.toLocaleString('es-AR')} MiB (3 accesos)`;
        }

        if (lblInd3Title) lblInd3Title.textContent = `Triple Indirecto (${ptrsPerBlock}³ punteros)`;
        if (lblInd3Range) lblInd3Range.textContent = `Bloques: ${ind2Limit.toLocaleString('es-AR')} a ${(ind3Limit - 1).toLocaleString('es-AR')}`;
        if (lblInd3Cap) {
            const gib = (ptrsPerBlock * ptrsPerBlock * ptrsPerBlock * blkSize) / (1024*1024*1024);
            lblInd3Cap.textContent = gib >= 1024 ? `Capacidad: ~${(gib / 1024).toFixed(0)} TiB (4 accesos)` : `Capacidad: ~${gib.toFixed(0)} GiB (4 accesos)`;
        }

        if (inodeBaseNote) {
            inodeBaseNote.textContent = `Configuración activa: ${blkSize/1024} KiB / ${ptrsPerBlock} punteros por bloque (Diapositivas 36-38, tabla Diapo 38)`;
        }

        let levelName = "";
        let diskReads = 0;
        let explanation = "";

        if (logicBlock < directLimit) {
            levelName = "Bloque Directo";
            diskReads = 1;
            explanation = `El bloque lógico ${logicBlock} reside directamente dentro de las 10 direcciones almacenadas en el propio nodo-i. Como el inodo ya está cargado en RAM, sólo se requiere <strong>1 lectura física a disco</strong> (directamente al bloque de datos).`;
            if (nodeDirect) nodeDirect.classList.add('active-trace');
        } else if (logicBlock < ind1Limit) {
            levelName = "Simple Indirecto";
            diskReads = 2;
            const offsetInInd = logicBlock - directLimit;
            explanation = `El bloque lógico ${logicBlock} excede los 10 bloques directos y se ubica en el bloque simple indirecto (offset ${offsetInInd}). Requiere <strong>2 lecturas físicas a disco</strong>: 1ª lectura para el bloque de punteros y 2ª lectura para el bloque de datos real.`;
            if (nodeInd1) nodeInd1.classList.add('active-trace');
        } else if (logicBlock < ind2Limit) {
            levelName = "Doble Indirecto";
            diskReads = 3;
            const offsetInDouble = logicBlock - ind1Limit;
            explanation = `El bloque lógico ${logicBlock} cae en el bloque doblemente indirecto (offset ${offsetInDouble}). Requiere <strong>3 lecturas físicas a disco</strong>: 1ª para el bloque doblemente indirecto, 2ª para el bloque simplemente indirecto hijo y 3ª para el bloque de datos final.`;
            if (nodeInd2) nodeInd2.classList.add('active-trace');
        } else if (logicBlock < ind3Limit) {
            levelName = "Triple Indirecto";
            diskReads = 4;
            explanation = `El bloque lógico ${logicBlock} requiere el nivel triplemente indirecto. Son necesarias <strong>4 lecturas físicas a disco</strong> (3 niveles jerárquicos de punteros + bloque de datos).`;
            if (nodeInd3) nodeInd3.classList.add('active-trace');
        } else {
            levelName = "Fuera de Rango Máximo";
            diskReads = 0;
            explanation = `El bloque lógico supera la capacidad máxima soportada por este diseño de inodo (${ind3Limit - 1} bloques).`;
        }

        if (resultCard) {
            resultCard.innerHTML = `
                <div class="flex justify-between items-center mb-1">
                    <span class="font-bold text-sm text-purple-700 dark:text-purple-300">Rastreo de Bloque Lógico #${logicBlock}:</span>
                    <span class="badge badge-${diskReads <= 2 ? 'success' : 'warning'}">${diskReads} Accesos a Disco Físico</span>
                </div>
                <p>• <strong>Nivel Localizado:</strong> <span class="font-semibold text-gray-800 dark:text-gray-200">${levelName}</span></p>
                <p>• <strong>Detalle de E/S:</strong> ${explanation}</p>
                <p class="text-[11px] text-gray-500 mt-1">Capacidad acumulada con ${blkSize} B/bloque: Directos (10 blk), Simple (${ptrsPerBlock} blk), Doble (${ptrsPerBlock * ptrsPerBlock} blk = ${(ptrsPerBlock * ptrsPerBlock * blkSize / (1024*1024)).toFixed(0)} MiB).</p>
            `;
        }
    }

    if (btnTrace) btnTrace.addEventListener('click', calculateAndTrace);
    if (selectBlockSize) selectBlockSize.addEventListener('change', calculateAndTrace);
    calculateAndTrace();
}

// --- LABORATORIO 3: ADMINISTRACIÓN DEL ESPACIO LIBRE (MAPA DE BITS) ---
function initLab3() {
    const selectDisk = document.getElementById('bitmap-disk-size');
    const selectBlock = document.getElementById('bitmap-block-size');
    const resultRam = document.getElementById('bitmap-ram-result');
    const wordGrid = document.getElementById('word-bits-grid');
    const wordStatus = document.getElementById('word-status-desc');
    const btnToggleBits = document.getElementById('btn-toggle-bits');

    function calculateBitmapRam() {
        const diskGb = parseInt(selectDisk.value, 10);
        const blkBytes = parseInt(selectBlock.value, 10);

        // Fórmula de cátedra: Tamaño Disco en Bytes / (8 * Tamaño Bloque en Bytes)
        const diskBytes = diskGb * Math.pow(2, 30);
        const ramBytes = diskBytes / (8 * blkBytes);

        let ramText = "";
        if (ramBytes >= 1048576) {
            ramText = `${ramBytes.toLocaleString('es-AR')} Bytes (${(ramBytes / 1048576).toFixed(2)} MiB)`;
        } else {
            ramText = `${ramBytes.toLocaleString('es-AR')} Bytes (${(ramBytes / 1024).toFixed(2)} KiB)`;
        }

        if (resultRam) resultRam.textContent = ramText;
    }

    // Inspector didáctico de palabra de 32 bits del mapa de bits
    // Convención: 0 = bloque ocupado, 1 = bloque libre
    let sampleWord = 0b00000000000000000000000000000100; // bit 2 libre

    function renderWordBits() {
        if (!wordGrid) return;
        wordGrid.innerHTML = "";

        // Encontrar primer bit en 1 (bloque libre)
        let firstFreeBit = -1;
        for (let i = 0; i < 32; i++) {
            if ((sampleWord & (1 << i)) !== 0) {
                firstFreeBit = i;
                break;
            }
        }

        for (let i = 31; i >= 0; i--) {
            const isSet = (sampleWord & (1 << i)) !== 0;
            const cell = document.createElement('div');
            cell.className = `bit-cell ${isSet ? 'bit-1' : 'bit-0'}`;
            if (i === firstFreeBit) cell.classList.add('bit-highlight');
            cell.textContent = isSet ? '1' : '0';
            cell.title = `Bit ${i}: ${isSet ? 'Libre (1)' : 'Ocupado (0)'}`;
            wordGrid.appendChild(cell);
        }

        if (wordStatus) {
            const hex = "0x" + sampleWord.toString(16).toUpperCase().padStart(8, '0');
            wordStatus.innerHTML = `
                <div>Palabra hexadecimal: <strong>${hex}</strong></div>
                <div>Inspector didáctico del mapa de bits: identificación del primer bloque libre representado con 1: <strong>Primer bloque libre en Bit #${firstFreeBit >= 0 ? firstFreeBit : 'Ninguno (palabra llena)'}</strong></div>
            `;
        }
    }

    if (btnToggleBits) {
        btnToggleBits.addEventListener('click', () => {
            // Rota o genera una nueva muestra
            sampleWord = (sampleWord === 0b00000000000000000000000000000100) ? 
                0b00000000000000000000000000000001 : 
                0b00000000000000000000000000000100;
            renderWordBits();
        });
    }

    if (selectDisk) selectDisk.addEventListener('change', calculateBitmapRam);
    if (selectBlock) selectBlock.addEventListener('change', calculateBitmapRam);

    calculateBitmapRam();
    renderWordBits();
}

// --- LABORATORIO 4: VERIFICADOR DE CONSISTENCIA (fsck SIMULATOR) ---
function initLab4() {
    const selectScenario = document.getElementById('select-fsck-scenario');
    const btnRunFsck = document.getElementById('btn-run-fsck');
    const btnRepairSoftware = document.getElementById('btn-repair-fsck');
    const btnRepairHardware = document.getElementById('btn-repair-hardware');
    const tableBody = document.getElementById('fsck-table-body');
    const diagCard = document.getElementById('fsck-diagnosis-card');
    const badgeStatus = document.getElementById('badge-fsck-status');

    function updateScenario() {
        const sc = selectScenario.value;
        appState.lab4.scenario = sc;
        appState.lab4.audited = false;
        appState.lab4.repaired = false;
        appState.lab4.badBlocksList = [];

        // Construir datos de bloques según Diapositivas 44, 46 y 47
        // 8 bloques (0 a 7)
        if (sc === 'consistent') {
            appState.lab4.files = [{ id: 1, blocks: [0, 1, 2] }, { id: 2, blocks: [3, 4] }];
            appState.lab4.freeList = [5, 6, 7];
        } else if (sc === 'lost_block') {
            // Bloque 5 no está en archivos ni en freeList
            appState.lab4.files = [{ id: 1, blocks: [0, 1, 2] }, { id: 2, blocks: [3, 4] }];
            appState.lab4.freeList = [6, 7]; // 5 es huérfano
        } else if (sc === 'duplicate_free') {
            // Bloque 5 aparece dos veces en la lista libre
            appState.lab4.files = [{ id: 1, blocks: [0, 1, 2] }, { id: 2, blocks: [3, 4] }];
            appState.lab4.freeList = [5, 5, 6, 7];
        } else if (sc === 'duplicate_data') {
            // Bloque 2 compartido por archivo 1 y archivo 2
            appState.lab4.files = [{ id: 1, blocks: [0, 1, 2] }, { id: 2, blocks: [2, 3, 4] }];
            appState.lab4.freeList = [5, 6, 7];
        } else if (sc === 'bad_block') {
            // Bloque defectuoso: Bloque 6 con fallo de E/S detectado pero pendiente de confirmación de aislamiento
            appState.lab4.files = [{ id: 1, blocks: [0, 1, 2] }, { id: 2, blocks: [3, 4] }];
            appState.lab4.freeList = [5, 6, 7]; // Aún figura en freeList (no aislado)
            appState.lab4.badBlocksList = []; // Todavía no ingresado a la lista de defectuosos
            appState.lab4.pendingBadBlock = 6;
        }

        renderFsckTable();
    }

    function renderFsckTable() {
        if (!tableBody) return;

        // Contar ocurrencias por bloque (0 a 7)
        const fileCount = Array(8).fill(0);
        const freeCount = Array(8).fill(0);
        const badCount = Array(8).fill(0);

        appState.lab4.files.forEach(f => {
            f.blocks.forEach(b => { if (b < 8) fileCount[b]++; });
        });

        appState.lab4.freeList.forEach(b => { if (b < 8) freeCount[b]++; });

        if (appState.lab4.badBlocksList) {
            appState.lab4.badBlocksList.forEach(b => { if (b < 8) badCount[b]++; });
        }

        let fileRow = `<tr><td class="font-bold text-left bg-gray-100 dark:bg-slate-800">Uso en Archivos</td>`;
        let freeRow = `<tr><td class="font-bold text-left bg-gray-100 dark:bg-slate-800">Uso en Lista Libre</td>`;
        let badRow = `<tr><td class="font-bold text-left bg-gray-100 dark:bg-slate-800">Lista Bloques Defectuosos</td>`;

        for (let i = 0; i < 8; i++) {
            const fVal = fileCount[i];
            const frVal = freeCount[i];
            const bVal = badCount[i];

            // Anomalía lógica en la auditoría
            const isPendingBad = (appState.lab4.pendingBadBlock === i && !appState.lab4.repaired);
            const isAnom = (fVal + frVal + bVal !== 1) || (fVal > 1) || (frVal > 1) || isPendingBad;
            const cellClass = (appState.lab4.audited && isAnom && !appState.lab4.repaired) ? 'bg-rose-200 dark:bg-rose-950 font-bold text-rose-600' : '';
            const badCellClass = (bVal > 0) ? (appState.lab4.repaired ? 'bg-amber-100 dark:bg-amber-950/60 font-bold text-amber-700 dark:text-amber-300' : 'bg-rose-200 dark:bg-rose-950 font-bold text-rose-600') : '';

            fileRow += `<td class="${cellClass}">${fVal}</td>`;
            freeRow += `<td class="${cellClass}">${frVal} ${isPendingBad ? '<span class="text-[10px] text-rose-600 font-bold" title="Fallo de E/S detectado">[!]</span>' : ''}</td>`;
            badRow += `<td class="${badCellClass}">${bVal}</td>`;
        }
        fileRow += `</tr>`;
        freeRow += `</tr>`;
        badRow += `</tr>`;

        tableBody.innerHTML = fileRow + freeRow + badRow;

        updateDiagnosis(fileCount, freeCount, badCount);
    }

    function updateDiagnosis(fileCount, freeCount, badCount) {
        if (!diagCard) return;

        const sc = appState.lab4.scenario;
        if (!appState.lab4.audited) {
            diagCard.innerHTML = `<p class="text-gray-500">Presiona <strong>"Ejecutar fsck / Auditoría"</strong> para inspeccionar la coherencia entre inodos, la lista de bloques libres y la estructura de bloques defectuosos.</p>`;
            if (badgeStatus) {
                badgeStatus.className = "badge badge-info";
                badgeStatus.textContent = "Listo para Auditar";
            }
            return;
        }

        if (appState.lab4.repaired) {
            return; // Ya gestionado en los handlers de reparación
        }

        if (sc === 'consistent') {
            diagCard.innerHTML = `
                <div class="font-bold text-emerald-700 dark:text-emerald-300">✅ Sistema de Archivos 100% Consistente:</div>
                <p>Cada bloque del disco aparece referenciado exactamente <strong>una vez</strong>: o bien pertenece a un archivo válido, o bien reside en la lista de espacio libre. No se requiere ninguna acción correctiva.</p>
            `;
            if (badgeStatus) {
                badgeStatus.className = "badge badge-success";
                badgeStatus.textContent = "Estado: Consistente";
            }
        } else if (sc === 'lost_block') {
            diagCard.innerHTML = `
                <div class="font-bold text-amber-700 dark:text-amber-300">⚠️ Bloque Perdido / Huérfano Detectado (Bloque 5):</div>
                <p>• <strong>Diagnóstico:</strong> El bloque 5 posee contador 0 en archivos y contador 0 en lista libre. No causa daño a datos existentes, pero genera pérdida silenciosa de capacidad útil del disco.</p>
                <p>• <strong>Acción de fsck:</strong> La herramienta de comprobación puede marcarlo nuevamente como libre o reincorporarlo a la estructura de espacio libre, según el sistema de archivos y el modo de reparación utilizado.</p>
            `;
            if (badgeStatus) {
                badgeStatus.className = "badge badge-warning";
                badgeStatus.textContent = "Fallo: Bloque Perdido";
            }
        } else if (sc === 'duplicate_free') {
            diagCard.innerHTML = `
                <div class="font-bold text-rose-700 dark:text-rose-300">❌ Bloque Duplicado en la Lista Libre (Bloque 5):</div>
                <p>• <strong>Diagnóstico:</strong> El bloque 5 aparece dos veces en la lista libre (contador = 2). Al asignarse, dos archivos distintos recibirían el mismo bloque creyendo que era espacio exclusivo.</p>
                <p>• <strong>Acción de fsck:</strong> Reconstruir la lista libre eliminando las entradas redundantes y dejando una sola referencia válida.</p>
            `;
            if (badgeStatus) {
                badgeStatus.className = "badge badge-danger";
                badgeStatus.textContent = "Fallo: Duplicado en Lista Libre";
            }
        } else if (sc === 'duplicate_data') {
            diagCard.innerHTML = `
                <div class="font-bold text-rose-700 dark:text-rose-300">🚨 Bloque de Datos Duplicado (Bloque 2):</div>
                <p>• <strong>Diagnóstico:</strong> Dos inodos distintos apuntan al bloque 2. Riesgo de corrupción cruzada de datos si uno de ellos escribe o borra el archivo.</p>
                <p>• <strong>Acción de fsck:</strong> En esta simulación didáctica se aplica una posible estrategia de reparación: duplicar el contenido en un bloque libre y actualizar una de las referencias. La acción real depende del sistema de archivos y de la herramienta utilizada.</p>
            `;
            if (badgeStatus) {
                badgeStatus.className = "badge badge-danger";
                badgeStatus.textContent = "Fallo Crítico: Bloque Duplicado";
            }
        } else if (sc === 'bad_block') {
            diagCard.innerHTML = `
                <div class="font-bold text-rose-700 dark:text-rose-300">⚠️ Sector / Bloque Defectuoso Detectado (Bloque 6 — Diapositivas 45-47):</div>
                <p>• <strong>Diagnóstico:</strong> El bloque 6 presentó errores de lectura/escritura (bloque defectuoso), pero aún figura en la lista de bloques libres y podría ser asignado a un archivo.</p>
                <p>• <strong>Solución por Software (Diapositiva 47):</strong> Presiona <strong>"Aislar por Software (Archivo Defectuosos)"</strong> para quitar el bloque 6 de la lista de bloques libres del SO y crear un archivo con los bloques defectuosos (el cual no debe ser leído, escrito ni incluido en copias de seguridad).</p>
                <p>• <strong>Solución por Hardware (Diapositiva 46):</strong> Presiona <strong>"Sustituir por Hardware (Controlador)"</strong> para que el controlador dedique un sector a la lista de bloques defectuosos y lo sustituya transparentemente por uno de los bloques o pistas de reserva.</p>
            `;
            if (badgeStatus) {
                badgeStatus.className = "badge badge-danger";
                badgeStatus.textContent = "Fallo: Bloque Defectuoso Pendiente";
            }
        }
    }

    if (selectScenario) selectScenario.addEventListener('change', updateScenario);

    if (btnRunFsck) {
        btnRunFsck.addEventListener('click', () => {
            appState.lab4.audited = true;
            renderFsckTable();
        });
    }

    if (btnRepairSoftware) {
        btnRepairSoftware.addEventListener('click', () => {
            const sc = appState.lab4.scenario;
            let repairMsg = "";

            if (sc === 'consistent') {
                repairMsg = "El sistema de archivos ya se encuentra en estado 100% consistente. No se requiere ninguna acción correctiva.";
            } else if (sc === 'lost_block') {
                if (!appState.lab4.freeList.includes(5)) {
                    appState.lab4.freeList.push(5);
                    appState.lab4.freeList.sort((a, b) => a - b);
                }
                repairMsg = "🛠️ Reparación por Software (fsck): El bloque perdido #5 fue reincorporado a la estructura de bloques libres. Se recuperó la capacidad útil sin pérdida de datos.";
            } else if (sc === 'duplicate_free') {
                appState.lab4.freeList = [...new Set(appState.lab4.freeList)].sort((a, b) => a - b);
                repairMsg = "🛠️ Reparación por Software (fsck): Se eliminó la referencia duplicada del bloque #5 en la lista libre. Cada bloque libre ahora posee exactamente contador = 1.";
            } else if (sc === 'duplicate_data') {
                const f2 = appState.lab4.files.find(f => f.id === 2);
                if (f2 && f2.blocks.includes(2)) {
                    f2.blocks = [7, 3, 4]; // Reasigna bloque 2 al bloque libre 7
                    appState.lab4.freeList = appState.lab4.freeList.filter(b => b !== 7);
                    repairMsg = "En esta simulación didáctica se aplica una posible estrategia de reparación: duplicar el contenido en un bloque libre (#7) y actualizar una de las referencias (Archivo 2). La acción real depende del sistema de archivos y de la herramienta utilizada.";
                } else {
                    repairMsg = "🛠️ Reparación por Software (fsck): Los inodos ya han sido desvinculados.";
                }
            } else if (sc === 'bad_block') {
                appState.lab4.badBlocksList = [6];
                appState.lab4.freeList = appState.lab4.freeList.filter(b => b !== 6);
                appState.lab4.pendingBadBlock = null;
                repairMsg = "🛠️ Solución por Software Aplicada (Diapositiva 47): El usuario o sistema de archivos quitó el bloque #6 de la lista de bloques libres del SO y lo incorporó a un archivo especial de bloques defectuosos. Precauciones activas: este archivo nunca debe ser leído ni escrito, y se excluye de las copias de seguridad (backups).";
            }

            appState.lab4.audited = true;
            appState.lab4.repaired = true;
            renderFsckTable();

            if (diagCard) {
                diagCard.innerHTML = `
                    <div class="font-bold text-emerald-700 dark:text-emerald-300">✅ Acción por Software Aplicada Exitosamente:</div>
                    <p>• <strong>Resultado:</strong> ${repairMsg}</p>
                    <p class="text-xs text-gray-500 mt-1">Estructuras internas revalidadas. Las anomalías lógicas del escenario han sido corregidas con éxito.</p>
                `;
            }
            if (badgeStatus) {
                badgeStatus.className = "badge badge-success";
                badgeStatus.textContent = "Estado: Aislado / Reparado por Software";
            }
        });
    }

    if (btnRepairHardware) {
        btnRepairHardware.addEventListener('click', () => {
            const sc = appState.lab4.scenario;
            if (sc === 'bad_block') {
                appState.lab4.badBlocksList = [];
                appState.lab4.pendingBadBlock = null;
                if (!appState.lab4.freeList.includes(6)) {
                    appState.lab4.freeList.push(6);
                    appState.lab4.freeList.sort((a, b) => a - b);
                }
                appState.lab4.audited = true;
                appState.lab4.repaired = true;
                renderFsckTable();

                if (diagCard) {
                    diagCard.innerHTML = `
                        <div class="font-bold text-emerald-700 dark:text-emerald-300">⚙️ Solución por Hardware Aplicada (Controlador — Diapositiva 46):</div>
                        <p>• <strong>Mecanismo del Controlador:</strong> Se dedica un sector del disco a la lista de bloques defectuosos; al inicializarse, el controlador lee dicha lista y elige un bloque (o pista) de reserva para sustituir transparentemente al defectuoso (#6), registrando la asociación en esa lista.</p>
                        <p class="text-xs text-gray-500 mt-1">Proceso ejecutado íntegramente por el controlador de hardware, transparente para el sistema de archivos.</p>
                    `;
                }
                if (badgeStatus) {
                    badgeStatus.className = "badge badge-success";
                    badgeStatus.textContent = "Estado: Reparado por Hardware";
                }
            } else {
                if (diagCard) {
                    diagCard.innerHTML = `
                        <div class="font-bold text-blue-700 dark:text-blue-300">ℹ️ Sector Sparing Inaplicable a este Escenario:</div>
                        <p>La reasignación por hardware (<em>sector sparing</em>) es ejecutada por la controladora de disco exclusivamente ante <strong>defectos físicos de sectores</strong> en el medio magnético o de estado sólido.</p>
                        <p>Las anomalías lógicas de estructuras de metadatos (bloques perdidos o duplicados) deben auditarse y corregirse por <strong>software</strong> mediante fsck o utilidades del sistema de archivos.</p>
                    `;
                }
            }
        });
    }

    updateScenario();
}

// --- LABORATORIO 5: PERMISOS UNIX Y CUOTAS DE DISCO ---
function initLab5() {
    // Permisos
    const uR = document.getElementById('perm-u-r');
    const uW = document.getElementById('perm-u-w');
    const uX = document.getElementById('perm-u-x');

    const gR = document.getElementById('perm-g-r');
    const gW = document.getElementById('perm-g-w');
    const gX = document.getElementById('perm-g-x');

    const oR = document.getElementById('perm-o-r');
    const oW = document.getElementById('perm-o-w');
    const oX = document.getElementById('perm-o-x');

    const octU = document.getElementById('octal-u');
    const octG = document.getElementById('octal-g');
    const octO = document.getElementById('octal-o');

    const permSym = document.getElementById('perm-symbolic');
    const permOct = document.getElementById('perm-octal-code');
    const permCmd = document.getElementById('perm-chmod-cmd');

    function updatePerms() {
        const valU = (uR.checked ? 4 : 0) + (uW.checked ? 2 : 0) + (uX.checked ? 1 : 0);
        const valG = (gR.checked ? 4 : 0) + (gW.checked ? 2 : 0) + (gX.checked ? 1 : 0);
        const valO = (oR.checked ? 4 : 0) + (oW.checked ? 2 : 0) + (oX.checked ? 1 : 0);

        if (octU) octU.textContent = valU;
        if (octG) octG.textContent = valG;
        if (octO) octO.textContent = valO;

        const symStr = "-" + 
            (uR.checked ? 'r' : '-') + (uW.checked ? 'w' : '-') + (uX.checked ? 'x' : '-') +
            (gR.checked ? 'r' : '-') + (gW.checked ? 'w' : '-') + (gX.checked ? 'x' : '-') +
            (oR.checked ? 'r' : '-') + (oW.checked ? 'w' : '-') + (oX.checked ? 'x' : '-');

        const octCode = `${valU}${valG}${valO}`;

        if (permSym) permSym.textContent = symStr;
        if (permOct) permOct.textContent = octCode;
        if (permCmd) permCmd.textContent = `chmod ${octCode} archivo`;
    }

    [uR, uW, uX, gR, gW, gX, oR, oW, oX].forEach(cb => {
        if (cb) cb.addEventListener('change', updatePerms);
    });

    updatePerms();

    // Cuotas de Disco (Diapositiva 43: Proporción máxima de archivos y bloques garantizada por el SO)
    const sliderMaxQuota = document.getElementById('slider-quota-max') || document.getElementById('slider-hard-limit');
    const sliderUsage = document.getElementById('slider-usage') || document.getElementById('slider-quota-usage');
    const lblMaxQuota = document.getElementById('lbl-quota-max') || document.getElementById('lbl-hard-limit');
    const lblUsage = document.getElementById('lbl-usage') || document.getElementById('lbl-quota-usage');
    const quotaCard = document.getElementById('quota-status-card');

    function updateQuotas() {
        const maxQuota = sliderMaxQuota ? parseInt(sliderMaxQuota.value, 10) : 100;
        const usage = sliderUsage ? parseInt(sliderUsage.value, 10) : 60;

        if (lblMaxQuota) lblMaxQuota.textContent = `${maxQuota} MiB`;
        if (lblUsage) lblUsage.textContent = `${usage} MiB`;

        if (!quotaCard) return;

        if (usage > maxQuota) {
            quotaCard.innerHTML = `
                <div class="font-bold text-rose-700 dark:text-rose-300">⛔ Cuota Máxima Asignada Excedida — Operación Denegada por el SO:</div>
                <p>• <strong>Consumo Solicitado:</strong> ${usage} MiB supera la cuota máxima autorizada (${maxQuota} MiB).</p>
                <p>• <strong>Garantía del SO (Diapositiva 43):</strong> El sistema operativo garantiza estrictamente que ningún usuario exceda la proporción máxima fijada por el administrador, denegando de inmediato la asignación de nuevos bloques o la creación de archivos adicionales.</p>
            `;
        } else {
            quotaCard.innerHTML = `
                <div class="font-bold text-emerald-700 dark:text-emerald-300">✅ Operación Permitida (Régimen Normal):</div>
                <p>• <strong>Consumo Actual:</strong> ${usage} MiB de ${maxQuota} MiB asignados.</p>
                <p>• <strong>Garantía del SO (Diapositiva 43):</strong> El consumo se mantiene dentro del límite máximo establecido por el administrador. Las operaciones de asignación y escritura se completan normalmente sin restricciones.</p>
            `;
        }
    }

    if (sliderMaxQuota) sliderMaxQuota.addEventListener('input', updateQuotas);
    if (sliderUsage) sliderUsage.addEventListener('input', updateQuotas);

    updateQuotas();
}

// --- LABORATORIO 6: PLANIFICACIÓN DE DISCO Y COMUNICACIÓN DE E/S ---
function initLab6() {
    const inputReqs = document.getElementById('disk-requests-input');
    const inputHead = document.getElementById('disk-head-input');
    const selectAlgo = document.getElementById('disk-algo-select');
    const selectDir = document.getElementById('disk-dir-select');
    const btnRun = document.getElementById('btn-run-disk-sim');
    const btnReset = document.getElementById('btn-reset-disk-sim');
    const badgeAlgo = document.getElementById('badge-disk-algo');
    const visualTrack = document.getElementById('disk-visual-track');
    const metricsSummary = document.getElementById('disk-metrics-summary');
    const diagnosisCard = document.getElementById('disk-algo-diagnosis');

    // Calculadora T = b / (r * N)
    const inputB = document.getElementById('input-calc-b');
    const inputR = document.getElementById('input-calc-r');
    const inputN = document.getElementById('input-calc-n');
    const resultCalc = document.getElementById('transfer-calc-result');

    function updateTransferCalc() {
        if (!inputB || !inputR || !inputN || !resultCalc) return;
        const b = parseFloat(inputB.value) || 0;
        const r = parseFloat(inputR.value) || 1;
        const N = parseFloat(inputN.value) || 1;

        if (r <= 0 || N <= 0) {
            resultCalc.textContent = "Error: 'r' y 'N' deben ser mayores a 0.";
            return;
        }

        const T = b / (r * N);
        const ms = T * 1000;
        resultCalc.innerHTML = `Tiempo de Transferencia T = ${b.toLocaleString()} / (${r} × ${N.toLocaleString()}) = <strong>${T.toFixed(4)} s</strong> (${ms.toFixed(2)} ms)`;
    }

    if (inputB) inputB.addEventListener('input', updateTransferCalc);
    if (inputR) inputR.addEventListener('input', updateTransferCalc);
    if (inputN) inputN.addEventListener('input', updateTransferCalc);
    updateTransferCalc();

    function parseRequestsAndValidate() {
        const errorDiv = document.getElementById('disk-input-error');
        if (errorDiv) {
            errorDiv.classList.add('hidden');
            errorDiv.textContent = "";
        }

        const rawHead = inputHead ? inputHead.value.trim() : "100";
        const headVal = Number(rawHead);
        if (rawHead === "" || !Number.isInteger(headVal) || headVal < 0 || headVal > 199) {
            if (errorDiv) {
                errorDiv.textContent = "⚠️ Posición inicial del cabezal inválida. Debe ser un número entero entre 0 y 199.";
                errorDiv.classList.remove('hidden');
            }
            if (inputHead) inputHead.classList.add('border-rose-500');
            return null;
        } else {
            if (inputHead) inputHead.classList.remove('border-rose-500');
        }

        if (!inputReqs) return { head: headVal, reqs: [55, 58, 39, 18, 90, 160, 150, 38, 184] };
        const rawTokens = inputReqs.value.split(',').map(s => s.trim()).filter(s => s.length > 0);
        const validList = [];
        const invalidTokens = [];

        rawTokens.forEach(t => {
            const num = Number(t);
            if (!Number.isInteger(num) || num < 0 || num > 199) {
                invalidTokens.push(t);
            } else {
                validList.push(num);
            }
        });

        if (invalidTokens.length > 0) {
            if (errorDiv) {
                errorDiv.textContent = `⚠️ Pistas inválidas detectadas en la cola: [${invalidTokens.join(', ')}]. Ingrese únicamente números enteros entre 0 y 199 separados por coma.`;
                errorDiv.classList.remove('hidden');
            }
            if (inputReqs) inputReqs.classList.add('border-rose-500');
            return null;
        } else {
            if (inputReqs) inputReqs.classList.remove('border-rose-500');
        }

        if (validList.length === 0) {
            if (errorDiv) {
                errorDiv.textContent = "⚠️ La cola de peticiones no puede estar vacía.";
                errorDiv.classList.remove('hidden');
            }
            return null;
        }

        return { head: headVal, reqs: validList };
    }

    function runSimulation() {
        const parsed = parseRequestsAndValidate();
        if (!parsed) return; // Validación falló

        const { head, reqs } = parsed;
        const algo = selectAlgo ? selectAlgo.value : 'fcfs';
        const dir = selectDir ? selectDir.value : 'inwards';

        if (badgeAlgo) {
            badgeAlgo.textContent = `Algoritmo: ${algo.toUpperCase()}`;
        }

        let sequence = [];
        let totalDistance = 0;
        let algoNotes = "";

        if (algo === 'fcfs') {
            sequence = [head, ...reqs];
            algoNotes = "<strong>FCFS (First-Come, First-Served):</strong> Atiende las solicitudes en estricto orden cronológico de llegada. Es totalmente justa y predecible, pero provoca largos desplazamientos innecesarios del cabezal de un extremo a otro del disco.";
        } else if (algo === 'sstf') {
            sequence = [head];
            const pending = [...reqs];
            let current = head;
            while (pending.length > 0) {
                let closestIdx = 0;
                let minDist = Math.abs(pending[0] - current);
                for (let i = 1; i < pending.length; i++) {
                    const dist = Math.abs(pending[i] - current);
                    if (dist < minDist) {
                        minDist = dist;
                        closestIdx = i;
                    }
                }
                current = pending.splice(closestIdx, 1)[0];
                sequence.push(current);
            }
            algoNotes = "<strong>SSTF (Shortest Seek Time First):</strong> Selecciona siempre la petición más próxima a la posición actual del cabezal. Minimiza el tiempo medio de búsqueda en cargas moderadas, pero introduce el riesgo de <em>inanición (starvation)</em> para peticiones en los extremos si llegan solicitudes continuas en pistas intermedias.";
        } else if (algo === 'scan') {
            sequence = [head];
            const lower = reqs.filter(r => r <= head).sort((a, b) => b - a);
            const higher = reqs.filter(r => r > head).sort((a, b) => a - b);

            if (dir === 'inwards') {
                lower.forEach(r => sequence.push(r));
                if (lower.length > 0 && lower[lower.length - 1] !== 0) sequence.push(0);
                higher.forEach(r => sequence.push(r));
            } else {
                higher.forEach(r => sequence.push(r));
                if (higher.length > 0 && higher[higher.length - 1] !== 199) sequence.push(199);
                lower.forEach(r => sequence.push(r));
            }
            algoNotes = "<strong>SCAN (Algoritmo del Elevador — Diapositivas 73 y 79):</strong> El brazo se mueve en una dirección satisfaciendo todas las solicitudes pendientes en su camino hasta alcanzar la última pista o hasta que no haya más peticiones en esa dirección, donde invierte su sentido.<br><span class='text-[11px] text-emerald-700 dark:text-emerald-300 mt-1 block'><strong>📌 Criterio de la Tabla Oficial (Diapositiva 79):</strong> Si con la cola por defecto y sentido ascendente (<code>100 → 199</code>) el brazo invierte su dirección en la última petición solicitada (pista <strong>184</strong>, modalidad LOOK), recorre <code>100→150→160→184→90→58→55→39→38→18</code> = <strong>250 cilindros</strong> y obtiene una <strong>longitud media de búsqueda de 27,8</strong> (250 / 9). Si llega hasta el borde físico 199, suma 280 cilindros (31,1 media).</span>";
        } else if (algo === 'cscan') {
            sequence = [head];
            if (dir === 'inwards') {
                const lower = reqs.filter(r => r <= head).sort((a, b) => b - a);
                const higher = reqs.filter(r => r > head).sort((a, b) => b - a);
                lower.forEach(r => sequence.push(r));
                sequence.push(0);
                sequence.push(199);
                higher.forEach(r => sequence.push(r));
            } else {
                const higherAsc = reqs.filter(r => r >= head).sort((a, b) => a - b);
                const lowerAsc = reqs.filter(r => r < head).sort((a, b) => a - b);
                higherAsc.forEach(r => sequence.push(r));
                sequence.push(199);
                sequence.push(0);
                lowerAsc.forEach(r => sequence.push(r));
            }
            algoNotes = "<strong>C-SCAN (Exploración Circular — Diapositivas 75 y 79):</strong> Restringe el rastreo a una sola dirección. Cuando visita la última pista en una dirección, el brazo regresa al extremo opuesto del disco y vuelve a comenzar el rastreo.<br><span class='text-[11px] text-emerald-700 dark:text-emerald-300 mt-1 block'><strong>📌 Criterio de la Tabla Oficial (Diapositiva 79):</strong> Según la Diapositiva 75 (<em>«Cuando se termina de recorrer hacia adentro, salta a la petición más cercana al cilindro exterior y reanuda su desplazamiento»</em>), en la tabla de la Diapositiva 79 con sentido ascendente (<code>100 → 199</code>) el cabezal salta desde <strong>184 hasta 18</strong> (166 cilindros de salto), sumando <strong>322 cilindros totales</strong> y una <strong>longitud media de búsqueda de 35,8</strong> (322 / 9), coincidiendo con la opción <em>C-LOOK</em> de este simulador. Si recorre hasta los bordes físicos 199 y 0, suma 391 cilindros.</span>";
        } else if (algo === 'look') {
            sequence = [head];
            const lower = reqs.filter(r => r <= head).sort((a, b) => b - a);
            const higher = reqs.filter(r => r > head).sort((a, b) => a - b);

            if (dir === 'inwards') {
                lower.forEach(r => sequence.push(r));
                higher.forEach(r => sequence.push(r));
            } else {
                higher.forEach(r => sequence.push(r));
                lower.forEach(r => sequence.push(r));
            }
            algoNotes = "<strong>LOOK:</strong> Variante práctica de SCAN donde el cabezal viaja en un sentido solo hasta la <em>última solicitud pendiente</em> en esa dirección (sin llegar obligatoriamente hasta el cilindro físico 0 o 199), invirtiendo el movimiento de inmediato.";
        } else if (algo === 'clook') {
            sequence = [head];
            if (dir === 'inwards') {
                const lower = reqs.filter(r => r <= head).sort((a, b) => b - a);
                const higher = reqs.filter(r => r > head).sort((a, b) => b - a);
                lower.forEach(r => sequence.push(r));
                higher.forEach(r => sequence.push(r));
            } else {
                const higher = reqs.filter(r => r >= head).sort((a, b) => a - b);
                const lower = reqs.filter(r => r < head).sort((a, b) => a - b);
                higher.forEach(r => sequence.push(r));
                lower.forEach(r => sequence.push(r));
            }
            algoNotes = "<strong>C-LOOK:</strong> Variante de C-SCAN que se desplaza en una sola dirección hasta la última petición y luego salta directamente a la petición más extrema del otro lado (sin desplazarse inútilmente a los bordes físicos del plato).<br><span class='text-[11px] text-gray-500 mt-1 block'><strong>Nota didáctica:</strong> En esta simulación, el retorno circular se incluye en el desplazamiento físico total del cabezal, aunque durante ese trayecto no se atienden solicitudes.</span>";
        } else if (algo === 'nstep-scan') {
            sequence = [head];
            const N = 4;
            let currentHead = head;
            for (let i = 0; i < reqs.length; i += N) {
                const subqueue = reqs.slice(i, i + N);
                const subLower = subqueue.filter(r => r <= currentHead).sort((a, b) => b - a);
                const subHigher = subqueue.filter(r => r > currentHead).sort((a, b) => a - b);
                if (dir === 'inwards') {
                    subLower.forEach(r => sequence.push(r));
                    subHigher.forEach(r => sequence.push(r));
                } else {
                    subHigher.forEach(r => sequence.push(r));
                    subLower.forEach(r => sequence.push(r));
                }
                if (sequence.length > 0) currentHead = sequence[sequence.length - 1];
            }
            algoNotes = "<strong>SCAN de N pasos (Diapositiva 74):</strong> Segmenta la cola de peticiones en subcolas de longitud N. En esta simulación didáctica se utiliza N = 4 y se considera que las subcolas ya se encuentran formadas antes de iniciar el recorrido. Las solicitudes de cada subcola se procesan mediante SCAN; mientras se atiende una subcola, las nuevas solicitudes deben esperar en otra subcola. Para N grande, converge al comportamiento de SCAN clásico; para N = 1, equivale al servicio FIFO (FCFS).";
        }

        totalDistance = 0;
        let stepsHtml = "";

        for (let i = 0; i < sequence.length - 1; i++) {
            const from = sequence[i];
            const to = sequence[i + 1];
            const dist = Math.abs(to - from);
            totalDistance += dist;

            const isBoundary = (to === 0 || to === 199);
            const isUnservedBoundary = isBoundary && !reqs.includes(to);
            const isCircularJump = (algo === 'cscan' && ((from === 0 && to === 199) || (from === 199 && to === 0)));
            const stepLabel = (i === 0) ? `Inicio (${from})` : `Paso ${i}: ${from}`;
            const pct = Math.round((to / 199) * 100);

            let statusTag = '';
            if (isCircularJump) {
                statusTag = '<span class="text-purple-600 dark:text-purple-400 font-bold text-[10px] ml-1">[Salto circular sin servicio]</span>';
            } else if (isUnservedBoundary) {
                statusTag = '<span class="text-amber-600 dark:text-amber-400 font-bold text-[10px] ml-1">[Extremo físico no atendido]</span>';
            }

            stepsHtml += `
                <div class="disk-step-item">
                    <span><strong>${stepLabel} → ${to}</strong> ${statusTag}</span>
                    <span class="text-gray-500">Desplazamiento: <strong>${dist}</strong> cilindros</span>
                </div>
                <div class="disk-track-bar">
                    <div class="disk-track-marker" style="left: ${pct}%;" title="Pista ${to}"></div>
                </div>
            `;
        }

        if (metricsSummary) {
            const avgPerReq = (totalDistance / reqs.length).toFixed(1);
            const avgPerStep = (totalDistance / (sequence.length - 1)).toFixed(1);
            metricsSummary.innerHTML = `Total Desplazamiento: <span class="text-blue-600 dark:text-blue-400 font-bold text-sm">${totalDistance} cilindros</span> (${avgPerReq} cil/pet atendida | ${avgPerStep} prom/tramo)`;
        }

        if (visualTrack) {
            visualTrack.innerHTML = stepsHtml;
        }

        if (diagnosisCard) {
            diagnosisCard.innerHTML = `
                <div class="font-bold text-blue-700 dark:text-blue-300">📌 Diagnóstico de la Política (${algo.toUpperCase()}):</div>
                <p>${algoNotes}</p>
                <p class="text-[11px] text-gray-500 mt-1">Secuencia completa atendida (${sequence.length - 1} tramos): ${sequence.join(' → ')}.</p>
            `;
        }
    }

    if (btnRun) btnRun.addEventListener('click', runSimulation);
    if (selectAlgo) selectAlgo.addEventListener('change', runSimulation);
    if (selectDir) selectDir.addEventListener('change', runSimulation);

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (inputReqs) inputReqs.value = "55, 58, 39, 18, 90, 160, 150, 38, 184";
            if (inputHead) inputHead.value = "100";
            if (selectAlgo) selectAlgo.value = "fcfs";
            if (selectDir) selectDir.value = "outwards";
            runSimulation();
        });
    }

    runSimulation();
}

// --- EXPORTACIÓN Y PERSISTENCIA DE DATOS DEL ALUMNO ---
function initStudentAndExport() {
    const inputName = document.getElementById('student-name');
    const inputId = document.getElementById('student-id');
    const inputEmail = document.getElementById('student-email');

    if (inputName) {
        inputName.value = appState.student.name || "";
        inputName.addEventListener('input', (e) => {
            appState.student.name = e.target.value.trim();
            persistState();
        });
    }

    if (inputId) {
        inputId.value = appState.student.id || "";
        inputId.addEventListener('input', (e) => {
            appState.student.id = e.target.value.trim();
            persistState();
        });
    }

    if (inputEmail) {
        inputEmail.value = appState.student.email || "";
        inputEmail.addEventListener('input', (e) => {
            appState.student.email = e.target.value.trim();
            persistState();
        });
    }

    const btnExport = document.getElementById('btn-export');
    const fileImport = document.getElementById('file-import');
    const btnResetAll = document.getElementById('btn-reset-answers');
    const feedback = document.getElementById('export-feedback');

    if (btnExport) {
        btnExport.addEventListener('click', () => {
            const trimmedName = (appState.student.name || "").trim();
            const trimmedId = (appState.student.id || "").trim();
            const trimmedEmail = (appState.student.email || "").trim();

            if (trimmedName.length < 2) {
                if (feedback) {
                    feedback.innerHTML = `<span class="text-rose-600 font-bold">⚠️ Por favor, ingresa tu Apellido y Nombre (mínimo 2 caracteres).</span>`;
                }
                alert("Por favor, ingresa tu Apellido y Nombre (mínimo 2 caracteres) antes de exportar.");
                if (inputName) inputName.focus();
                return;
            }

            if (trimmedId.length < 2) {
                if (feedback) {
                    feedback.innerHTML = `<span class="text-rose-600 font-bold">⚠️ Por favor, ingresa tu Legajo Estudiantil institucional.</span>`;
                }
                alert("Por favor, ingresa tu Legajo Estudiantil institucional antes de exportar.");
                if (inputId) inputId.focus();
                return;
            }

            if (trimmedEmail.length > 0) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(trimmedEmail)) {
                    if (feedback) {
                        feedback.innerHTML = `<span class="text-rose-600 font-bold">⚠️ El formato del correo electrónico institucional no es válido.</span>`;
                    }
                    alert("El formato del correo electrónico institucional no es válido.");
                    if (inputEmail) inputEmail.focus();
                    return;
                }
            }

            const answeredCount = Object.keys(appState.answers).length;
            if (answeredCount < TP8_EXERCISES.length) {
                const pending = TP8_EXERCISES.length - answeredCount;
                if (!confirm(`⚠️ Atención: Tienes ${pending} ejercicio(s) sin responder. ¿Deseas exportar el archivo de todos modos?`)) {
                    return;
                }
            }

            const exportPayload = {
                metadata: {
                    tp: "TSO-2026-TP8",
                    catedra: "Teoría de Sistemas Operativos - UNJu FI",
                    docentes: "Ing. María Fernanda Vázquez | Ing. Fabio D. Argañaraz",
                    fecha_exportacion: new Date().toISOString(),
                    alumno: {
                        nombre: trimmedName,
                        legajo: trimmedId,
                        email: trimmedEmail
                    }
                },
                ...appState.answers
            };

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
            const dlAnchor = document.createElement('a');
            dlAnchor.setAttribute("href", dataStr);
            dlAnchor.setAttribute("download", "respuestas_tp8.json");
            document.body.appendChild(dlAnchor);
            dlAnchor.click();
            dlAnchor.remove();

            if (feedback) {
                feedback.innerHTML = `<span class="text-emerald-600 font-bold">✅ 'respuestas_tp8.json' descargado con éxito. Colócalo en la raíz de tu repositorio y ejecuta 'python autograder_tp8.py' para verificar tu calificación.</span>`;
            }
        });
    }

    if (fileImport) {
        fileImport.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    if (!imported.metadata || imported.metadata.tp !== "TSO-2026-TP8") {
                        throw new Error("El archivo JSON no corresponde a la entrega oficial de este trabajo práctico (metadata.tp debe ser 'TSO-2026-TP8').");
                    }

                    if (imported.metadata && imported.metadata.alumno) {
                        appState.student.name = (imported.metadata.alumno.nombre || "").trim();
                        appState.student.id = (imported.metadata.alumno.legajo || imported.metadata.alumno.legajo_dni || "").trim();
                        appState.student.email = (imported.metadata.alumno.email || "").trim();

                        if (inputName) inputName.value = appState.student.name;
                        if (inputId) inputId.value = appState.student.id;
                        if (inputEmail) inputEmail.value = appState.student.email;
                    }

                    let acceptedCount = 0;
                    let discardedCount = 0;
                    const discardedDetails = [];

                    TP8_EXERCISES.forEach(ex => {
                        if (imported[ex.id] !== undefined) {
                            const val = imported[ex.id];
                            const validOptions = ex.options.map(o => o.val);
                            if (validOptions.includes(val)) {
                                appState.answers[ex.id] = val;
                                acceptedCount++;
                            } else {
                                discardedCount++;
                                discardedDetails.push(`${ex.id} (opción no válida)`);
                            }
                        }
                    });

                    Object.keys(imported).forEach(k => {
                        if (k !== 'metadata' && !TP8_EXERCISES.some(ex => ex.id === k)) {
                            discardedCount++;
                            discardedDetails.push(`Clave desconocida: "${k}"`);
                        }
                    });

                    renderQuestions();
                    updateProgress();
                    persistState();

                    if (feedback) {
                        let msg = `<span class="text-blue-600 font-bold">✅ Respuestas cargadas correctamente (${acceptedCount} válidas) desde '${file.name}'.</span>`;
                        if (discardedCount > 0) {
                            msg += `<br><span class="text-amber-600 text-[11px] font-semibold">⚠️ Se descartaron ${discardedCount} elementos: ${discardedDetails.join(', ')}.</span>`;
                        }
                        feedback.innerHTML = msg;
                    }
                } catch (err) {
                    alert("Error al procesar el archivo JSON: " + err.message);
                }
            };
            reader.readAsText(file);
        });
    }

    if (btnResetAll) {
        btnResetAll.addEventListener('click', () => {
            if (confirm("¿Estás seguro de que deseas reiniciar todas tus respuestas y datos ingresados?")) {
                appState.answers = {};
                appState.student = { name: "", id: "", email: "" };
                localStorage.removeItem(STORAGE_KEY);

                if (inputName) inputName.value = "";
                if (inputId) inputId.value = "";
                if (inputEmail) inputEmail.value = "";

                renderQuestions();
                updateProgress();
                if (feedback) feedback.textContent = "Datos reiniciados.";
            }
        });
    }
}

// --- MICROACTIVIDADES DIDÁCTICAS INTERACTIVAS (NO CALIFICABLES) ---
function initRouteClassifier() {
    const routes = [
        { path: "/usr/ast/buzon", type: "absoluta", exp: "Comienza con un separador (/ en UNIX o \\ en Windows), indicando que la ruta parte desde el directorio raíz del árbol de directorios (Diapositiva 9)." },
        { path: "documentos/informe.pdf", type: "relativa", exp: "No comienza con un separador; se utiliza en conjunto con el concepto de directorio de trabajo o directorio activo (Diapositiva 9)." },
        { path: "../config/red.sys", type: "relativa", exp: "No comienza con el separador de raíz; emplea la entrada '..' (directorio padre) relativa al directorio de trabajo activo (Diapositiva 9)." },
        { path: "\\usr\\ast\\buzon", type: "absoluta", exp: "Comienza con el separador de ruta en Windows (\\), por lo que especifica la trayectoria completa desde el directorio raíz sin depender del directorio de trabajo (Diapositiva 9)." }
    ];
    let currentIdx = 0;
    const pathEl = document.getElementById('micro-route-path');
    const feedbackEl = document.getElementById('micro-route-feedback');
    const btnAbs = document.getElementById('btn-route-abs');
    const btnRel = document.getElementById('btn-route-rel');
    const btnNext = document.getElementById('btn-route-next');

    if (!pathEl || !btnAbs || !btnRel) return;

    function renderRoute() {
        const item = routes[currentIdx];
        pathEl.textContent = item.path;
        if (feedbackEl) {
            feedbackEl.classList.add('hidden');
            feedbackEl.innerHTML = '';
        }
    }

    function checkAnswer(chosen) {
        const item = routes[currentIdx];
        if (!feedbackEl) return;
        feedbackEl.classList.remove('hidden');
        if (chosen === item.type) {
            feedbackEl.className = "p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 text-xs";
            feedbackEl.innerHTML = `<strong>✅ ¡Correcto!</strong> Es una <strong>Ruta ${item.type.toUpperCase()}</strong>. ${item.exp}`;
        } else {
            feedbackEl.className = "p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-300 text-xs";
            feedbackEl.innerHTML = `<strong>❌ Incorrecto.</strong> Es una <strong>Ruta ${item.type.toUpperCase()}</strong>. ${item.exp}`;
        }
    }

    btnAbs.addEventListener('click', () => checkAnswer('absoluta'));
    btnRel.addEventListener('click', () => checkAnswer('relativa'));
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            currentIdx = (currentIdx + 1) % routes.length;
            renderRoute();
        });
    }

    renderRoute();
}

function initBackupSelector() {
    const scenarios = [
        { text: "Copiar todos los archivos del sistema de archivos a un medio secundario de almacenamiento para tener una copia base integral de recuperación ante desastres.", type: "completo", exp: "Un respaldo completo realiza una copia de todos los archivos del sistema de archivos; demanda más tiempo y espacio, pero simplifica la restauración (Diapositiva 48)." },
        { text: "Copiar únicamente aquellos archivos que han sido creados o modificados desde que se realizó el último respaldo en el sistema.", type: "incremental", exp: "Un respaldo incremental copia solo los archivos modificados desde la última copia de seguridad; es más rápido y ahorra espacio (Diapositiva 48)." },
        { text: "Al cierre del ciclo semanal, volcar de forma íntegra todos los directorios y archivos de la partición de almacenamiento.", type: "completo", exp: "Corresponde a un respaldo completo porque duplica la totalidad de la información del volumen (Diapositiva 48)." },
        { text: "Durante la noche de un día laboral, respaldar exclusivamente los archivos de usuario que cambiaron en la jornada.", type: "incremental", exp: "Corresponde a un respaldo incremental, ya que solo procesa los archivos con marcas de modificación activa desde el respaldo previo (Diapositiva 48)." }
    ];
    let currentIdx = 0;
    const textEl = document.getElementById('micro-backup-text');
    const feedbackEl = document.getElementById('micro-backup-feedback');
    const btnComp = document.getElementById('btn-backup-full');
    const btnIncr = document.getElementById('btn-backup-incr');
    const btnNext = document.getElementById('btn-backup-next');

    if (!textEl || !btnComp || !btnIncr) return;

    function renderBackup() {
        const item = scenarios[currentIdx];
        textEl.textContent = item.text;
        if (feedbackEl) {
            feedbackEl.classList.add('hidden');
            feedbackEl.innerHTML = '';
        }
    }

    function checkAnswer(chosen) {
        const item = scenarios[currentIdx];
        if (!feedbackEl) return;
        feedbackEl.classList.remove('hidden');
        if (chosen === item.type) {
            feedbackEl.className = "p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 text-xs";
            feedbackEl.innerHTML = `<strong>✅ ¡Correcto!</strong> Corresponde a un <strong>Respaldo ${item.type.toUpperCase()}</strong>. ${item.exp}`;
        } else {
            feedbackEl.className = "p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-300 text-xs";
            feedbackEl.innerHTML = `<strong>❌ Incorrecto.</strong> Corresponde a un <strong>Respaldo ${item.type.toUpperCase()}</strong>. ${item.exp}`;
        }
    }

    btnComp.addEventListener('click', () => checkAnswer('completo'));
    btnIncr.addEventListener('click', () => checkAnswer('incremental'));
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            currentIdx = (currentIdx + 1) % scenarios.length;
            renderBackup();
        });
    }

    renderBackup();
}

// --- INICIALIZACIÓN GLOBAL ---
document.addEventListener('DOMContentLoaded', () => {
    loadPersistedState();
    initTheme();
    renderQuestions();
    updateProgress();
    initLab1();
    initLab2();
    initLab3();
    initLab4();
    initLab5();
    initLab6();
    initRouteClassifier();
    initBackupSelector();
    initStudentAndExport();
});

