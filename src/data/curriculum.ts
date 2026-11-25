import { AchievementDef, ModuleInfo } from '../types';

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
}

export const LEVELS: LevelInfo[] = [
  { level: 1, title: 'Explorador Novato', minXp: 0 },
  { level: 2, title: 'Aprendiz de Ventanas', minXp: 250 },
  { level: 3, title: 'Organizador Digital', minXp: 600 },
  { level: 4, title: 'Arquitecto de Carpetas', minXp: 1050 },
  { level: 5, title: 'Especialista de Diálogos', minXp: 1600 },
  { level: 6, title: 'Maestro de Windows 11', minXp: 2200 },
];

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first-lesson',
    title: 'Primer Paso en Windows 11',
    description: 'Completa tu primera lección guiada.',
    xpBonus: 50,
    iconName: 'award',
  },
  {
    id: 'desktop-mapper',
    title: 'Guía del Escritorio',
    description: 'Inspecciona al menos 6 partes del Escritorio de Windows 11.',
    xpBonus: 75,
    iconName: 'compass',
  },
  {
    id: 'explorer-inspector',
    title: 'Inspector del Explorador',
    description: 'Explora las 10 partes completas de la ventana del Explorador de archivos.',
    xpBonus: 100,
    iconName: 'layers',
  },
  {
    id: 'dialog-master',
    title: 'Dominio de Diálogos',
    description: 'Explora todas las partes de una ventana de diálogo en Windows 11.',
    xpBonus: 100,
    iconName: 'check-circle',
  },
  {
    id: 'folder-architect',
    title: 'Arquitecto de Subcarpetas',
    description: 'Completa al menos 3 misiones prácticas creando carpetas y subcarpetas.',
    xpBonus: 120,
    iconName: 'folder-tree',
  },
  {
    id: 'shortcut-sprinter',
    title: 'Velocista del Teclado',
    description: 'Supera el reto interactivo de atajos y rutas.',
    xpBonus: 80,
    iconName: 'keyboard',
  },
  {
    id: 'perfect-quiz',
    title: 'Puntuación Perfecta',
    description: 'Obtén 100% en cualquier cuestionario de módulo.',
    xpBonus: 100,
    iconName: 'flame',
  },
  {
    id: 'win11-certified',
    title: 'Certificado Windows 11',
    description: 'Aprueba el Examen Final con 80% o más.',
    xpBonus: 250,
    iconName: 'trophy',
  },
];

export const MODULES: ModuleInfo[] = [
  {
    id: 'mod-escritorio',
    number: 1,
    title: 'El Escritorio y la Barra de Tareas',
    subtitle: 'Conoce la pantalla principal de Windows 11, el Menú Inicio, la Búsqueda y el Área de notificaciones.',
    category: 'Fundamentos',
    iconName: 'monitor',
    estimatedMinutes: 10,
    lessons: [
      {
        id: 'les-1-1',
        moduleId: 'mod-escritorio',
        order: 1,
        title: 'Tu primera vista: el Escritorio de Windows 11',
        durationMin: 3,
        xpReward: 60,
        summary: 'Aprende qué es el escritorio, cómo funcionan los iconos y por qué la Papelera de reciclaje es tu red de seguridad.',
        linkedLab: 'escritorio',
        steps: [
          {
            title: '¿Qué es el Escritorio?',
            body: 'El Escritorio es tu mesa de trabajo digital. Es la primera pantalla que ves cuando inicias sesión en Windows 11 y el lugar desde donde abres tus aplicaciones, documentos y carpetas.',
            keyPoints: [
              'Fondo de pantalla (Tapiz): la imagen detrás de tus iconos. Puedes personalizarla sin afectar tus archivos.',
              'Iconos del escritorio: accesos rápidos a carpetas, archivos o programas. Se abren con doble clic izquierdo.',
              'Papelera de reciclaje: almacena temporalmente lo que borras por si cambias de opinión y necesitas restaurarlo.',
            ],
            tip: 'Mantén el escritorio ordenado con pocos iconos. Es mucho mejor guardar tus trabajos dentro de carpetas en "Documentos".',
          },
          {
            title: 'El ratón y el menú contextual',
            body: 'En Windows 11 cada botón del ratón cumple un papel claro. Conocer la diferencia entre clic izquierdo y clic derecho te ahorrará muchísimo tiempo.',
            keyPoints: [
              'Un clic izquierdo selecciona un elemento (carpeta, icono o botón).',
              'Doble clic izquierdo abre una carpeta, archivo o programa en el escritorio.',
              'Clic derecho abre el menú contextual: una lista de acciones útiles específicas para el elemento que tocaste.',
            ],
            shortcut: {
              keys: 'Win + D',
              action: 'Muestra u oculta el Escritorio al instante minimizando todas las ventanas abiertas.',
            },
          },
        ],
        miniCheck: {
          question: '¿Qué ocurre cuando haces clic derecho sobre un espacio vacío del Escritorio?',
          options: [
            'Se apaga la computadora automáticamente',
            'Se abre un menú contextual con opciones como Nuevo, Ordenar y Personalizar',
            'Se abre la Papelera de reciclaje',
          ],
          correctIndex: 1,
          explanation: 'El clic derecho siempre despliega el menú contextual adaptado al lugar donde hiciste clic. En el escritorio te permite crear carpetas, cambiar la vista y personalizar.',
        },
      },
      {
        id: 'les-1-2',
        moduleId: 'mod-escritorio',
        order: 2,
        title: 'La Barra de Tareas y el Menú Inicio',
        durationMin: 4,
        xpReward: 70,
        summary: 'Domina la barra centrada de Windows 11, el botón Inicio, la búsqueda universal y la Vista de tareas.',
        linkedLab: 'escritorio',
        steps: [
          {
            title: 'La Barra de Tareas centrada',
            body: 'En la parte inferior de la pantalla está la Barra de Tareas. En Windows 11 los iconos principales vienen centrados por defecto para facilitar su localización visual.',
            keyPoints: [
              'Botón Inicio (logotipo azul de cuatro cuadros): abre tus aplicaciones ancladas, archivos recientes y el botón de apagado.',
              'Cuadro de búsqueda (lupa): encuentra programas, configuraciones o archivos escribiendo solo las primeras letras.',
              'Aplicaciones abiertas y ancladas: una pequeña línea debajo de un icono indica que ese programa está abierto actualmente.',
            ],
            shortcut: {
              keys: 'Tecla Win',
              action: 'Abre o cierra el Menú Inicio sin usar el ratón.',
            },
          },
          {
            title: 'Menú Inicio: Anclados, Recomendaciones y Apagado',
            body: 'El Menú Inicio se divide en tres zonas muy claras para que nunca te pierdas al buscar una herramienta.',
            keyPoints: [
              'Anclados: tus programas favoritos siempre a mano. Puedes tocar "Todas las aplicaciones" para ver la lista alfabética completa.',
              'Recomendaciones: accesos directos a los archivos que editaste hace poco.',
              'Barra inferior del menú: tu perfil de usuario a la izquierda y el botón de Inicio/Apagado (Suspender, Apagar, Reiniciar) a la derecha.',
            ],
            tip: 'Si no encuentras un programa en el Escritorio, pulsa la tecla Windows y empieza a escribir su nombre directamente. Windows lo buscará al instante.',
          },
        ],
        miniCheck: {
          question: '¿Cómo sabes visualmente en la Barra de Tareas que una aplicación está abierta en ese momento?',
          options: [
            'Su icono desaparece de la barra',
            'Tiene una pequeña línea o indicador debajo del icono',
            'El icono parpadea en color rojo',
          ],
          correctIndex: 1,
          explanation: 'Windows 11 muestra una pequeña rayita horizontal (píldora) debajo de los iconos de las aplicaciones abiertas; si es la ventana activa, la línea es azul y ligeramente más ancha.',
        },
      },
      {
        id: 'les-1-3',
        moduleId: 'mod-escritorio',
        order: 3,
        title: 'Bandeja del sistema, Configuración rápida y Widgets',
        durationMin: 3,
        xpReward: 60,
        summary: 'Controla Wi-Fi, volumen, brillo, calendario y notificaciones desde las esquinas de la barra de tareas.',
        linkedLab: 'escritorio',
        steps: [
          {
            title: 'Esquina derecha: Configuración rápida y Notificaciones',
            body: 'En el extremo derecho de la Barra de Tareas viven los controles esenciales del equipo, agrupados de forma limpia para evitar confusiones.',
            keyPoints: [
              'Panel de Configuración rápida (iconos de Wi-Fi, altavoz y batería juntos): un solo clic abre controles de red, Bluetooth, brillo y volumen.',
              'Fecha y hora: al tocarla se despliega el Calendario y el Centro de notificaciones con avisos de tus apps.',
              'Iconos ocultos (flecha hacia arriba ^): guarda programas en segundo plano como antivirus o nube.',
            ],
            shortcut: {
              keys: 'Win + A',
              action: 'Abre directamente el panel de Configuración rápida (Wi-Fi, volumen y brillo).',
            },
          },
          {
            title: 'Esquina izquierda: Panel de Widgets',
            body: 'En el extremo izquierdo verás el clima actual. Al tocarlo se desliza el panel de Widgets con pronóstico, calendario y noticias breves.',
            keyPoints: [
              'Se puede consultar sin cerrar las ventanas en las que estás trabajando.',
              'También puedes abrirlo con el atajo Win + W.',
            ],
          },
        ],
        miniCheck: {
          question: '¿Dónde debes hacer clic para conectar tu equipo a una red Wi-Fi y subir el volumen rápidamente?',
          options: [
            'En la Papelera de reciclaje',
            'En el grupo de iconos de red, altavoz y batería (Configuración rápida) a la derecha',
            'En el icono del clima a la izquierda',
          ],
          correctIndex: 1,
          explanation: 'Al hacer clic en el bloque unificado de Wi-Fi, sonido y batería se abre Configuración rápida, que reúne los ajustes más frecuentes en un solo panel.',
        },
      },
    ],
  },
  {
    id: 'mod-explorador',
    number: 2,
    title: 'Anatomía del Explorador de Archivos',
    subtitle: 'Domina cada una de las 10 partes de la ventana del Explorador de archivos de Windows 11 con total claridad.',
    category: 'Ventana clave',
    iconName: 'folder-open',
    estimatedMinutes: 14,
    lessons: [
      {
        id: 'les-2-1',
        moduleId: 'mod-explorador',
        order: 1,
        title: 'Pestañas, Barra de Título y Botones de Control',
        durationMin: 4,
        xpReward: 75,
        summary: 'Conoce la parte superior de la ventana del Explorador: múltiples pestañas y controles para minimizar, acoplar o cerrar.',
        linkedLab: 'explorador',
        steps: [
          {
            title: 'El Explorador de Archivos: tu archivador central',
            body: 'El Explorador de archivos (icono de carpeta amarilla en la barra de tareas) es la ventana que usas para ver, abrir, mover y organizar todas tus carpetas y documentos.',
            keyPoints: [
              'Pestañas (como en un navegador web): te permiten tener varias carpetas abiertas en una sola ventana y cambiar entre ellas.',
              'Botón Nueva pestaña (+): abre otra carpeta adicional sin llenar tu pantalla de ventanas separadas.',
              'Barra de título: la franja superior que te permite arrastrar la ventana completa manteniendo presionado el clic izquierdo.',
            ],
            shortcut: {
              keys: 'Win + E',
              action: 'Abre una ventana del Explorador de archivos desde cualquier lugar.',
            },
          },
          {
            title: 'Los 3 botones de control de ventana',
            body: 'En la esquina superior derecha de casi todas las ventanas de Windows 11 encontrarás siempre estos tres botones:',
            keyPoints: [
              'Minimizar (—): oculta la ventana hacia la barra de tareas sin cerrar tu trabajo.',
              'Maximizar / Restaurar (□): hace que la ventana ocupe toda la pantalla o vuelva a su tamaño normal. Si dejas el cursor quieto encima, aparecen los diseños de acoplamiento (Snap Layouts).',
              'Cerrar (✕): cierra la ventana completamente.',
            ],
            tip: 'Si presionas Ctrl + T dentro del Explorador de archivos, se abre una pestaña nueva al instante.',
          },
        ],
        miniCheck: {
          question: '¿Para qué sirve el botón con el signo "+" en la parte superior del Explorador de archivos de Windows 11?',
          options: [
            'Para aumentar el tamaño de la letra',
            'Para abrir una nueva pestaña y ver otra carpeta dentro de la misma ventana',
            'Para cerrar todas las carpetas',
          ],
          correctIndex: 1,
          explanation: 'Windows 11 incorporó pestañas en el Explorador de archivos. El botón "+" abre una pestaña nueva igual que en un navegador de internet.',
        },
      },
      {
        id: 'les-2-2',
        moduleId: 'mod-explorador',
        order: 2,
        title: 'Barra de Comandos, Navegación y Direcciones',
        durationMin: 5,
        xpReward: 85,
        summary: 'Aprende a usar la barra de herramientas moderna, las flechas de retroceso/subida, la ruta interactiva y la búsqueda.',
        linkedLab: 'explorador',
        steps: [
          {
            title: 'Barra de Comandos (acciones rápidas)',
            body: 'Justo debajo de las pestañas está la Barra de Comandos de Windows 11, diseñada con iconos claros y sin menús sobrecargados.',
            keyPoints: [
              'Nuevo (+): crea carpetas, documentos de texto o accesos directos con un clic.',
              'Cortar (tijeras), Copiar (hojas), Pegar (portapapeles), Cambiar nombre y Eliminar (papelera): se activan cuando seleccionas un elemento.',
              'Ordenar y Ver: organizan tus archivos por nombre o fecha y cambian entre lista detallada o iconos grandes.',
            ],
          },
          {
            title: 'Botones de Navegación, Barra de Direcciones y Búsqueda',
            body: 'Esta franja te dice exactamente en qué carpeta estás parado y cómo moverte sin perderte.',
            keyPoints: [
              'Atrás (←) y Adelante (→): regresan a la carpeta que visitaste antes o avanzan de nuevo.',
              'Subir un nivel (↑): te lleva directamente a la carpeta padre que contiene la carpeta actual.',
              'Barra de direcciones (Ruta / Breadcrumbs): muestra el camino como "Este equipo > Documentos > Escuela". Puedes tocar cualquier nombre para saltar a ese nivel.',
              'Cuadro de búsqueda: escribe parte del nombre de un archivo para encontrarlo dentro de la carpeta actual y todas sus subcarpetas.',
            ],
            visualExample: {
              label: 'Ejemplo de Barra de Direcciones',
              pathOrSnippet: 'Este equipo  >  Documentos  >  Estudios  >  Matemáticas',
              caption: 'Si haces clic en "Documentos", regresas directamente a esa carpeta padre.',
            },
          },
        ],
        miniCheck: {
          question: 'Si estás dentro de "Documentos > Escuela > Tareas" y haces clic en la flecha "Subir un nivel" (↑), ¿a qué carpeta irás?',
          options: [
            'A la carpeta "Escuela" (la carpeta padre inmediata)',
            'A la Papelera de reciclaje',
            'Se cerrará el Explorador',
          ],
          correctIndex: 0,
          explanation: 'La flecha hacia arriba (↑) siempre sube un escalón en la jerarquía hacia la carpeta contenedora inmediata ("Escuela").',
        },
      },
      {
        id: 'les-2-3',
        moduleId: 'mod-explorador',
        order: 3,
        title: 'Panel de Navegación, Contenido, Detalles y Barra de Estado',
        durationMin: 5,
        xpReward: 85,
        summary: 'Completa el mapa del Explorador dominando el panel izquierdo, las columnas de contenido, el panel de detalles y la barra inferior.',
        linkedLab: 'explorador',
        steps: [
          {
            title: 'Panel de Navegación (izquierda) y Área de Contenido (centro)',
            body: 'La parte principal del Explorador se divide en columnas para que puedas ver la estructura general y el contenido detallado al mismo tiempo.',
            keyPoints: [
              'Panel de navegación izquierdo: muestra accesos rápidos (Inicio, Galería, Escritorio, Descargas, Documentos, Imágenes) y "Este equipo" con tus discos y USB.',
              'Flechitas desplegables (>): al tocarlas en el panel izquierdo, ves las subcarpetas en forma de árbol sin abandonar tu carpeta actual.',
              'Área de contenido: muestra las carpetas y archivos de la ubicación abierta. Sus encabezados (Nombre, Fecha, Tipo, Tamaño) sirven para ordenar con un clic.',
            ],
          },
          {
            title: 'Panel de Detalles (derecha) y Barra de Estado (abajo)',
            body: 'Dos zonas discretas pero muy útiles para verificar información sin necesidad de abrir cada archivo.',
            keyPoints: [
              'Panel de detalles: muestra una vista previa y datos del archivo seleccionado (tipo, tamaño, fecha de creación). Se activa con Alt + Shift + P o el botón "Detalles".',
              'Barra de estado inferior: a la izquierda te dice cuántos elementos hay en la carpeta y cuántos seleccionaste; a la derecha tiene dos botones rápidos para cambiar entre vista de detalles y miniaturas.',
            ],
            tip: 'En el laboratorio interactivo puedes tocar cada una de las 10 partes de la ventana del Explorador y ponerte a prueba con el reto táctil.',
          },
        ],
        miniCheck: {
          question: '¿Qué información muestra la Barra de Estado en la parte inferior del Explorador de archivos?',
          options: [
            'Las contraseñas guardadas del usuario',
            'La cantidad total de elementos, cuántos están seleccionados y accesos rápidos de vista',
            'El pronóstico del clima',
          ],
          correctIndex: 1,
          explanation: 'La barra de estado inferior te informa cuántos elementos contiene la carpeta actual, cuántos seleccionaste y permite cambiar rápidamente entre vista de detalles o miniaturas.',
        },
      },
    ],
  },
  {
    id: 'mod-dialogo',
    number: 3,
    title: 'Partes de una Ventana de Diálogo',
    subtitle: 'Comprende todos los controles de un cuadro de diálogo: pestañas, campos de texto, casillas, opciones y botones de decisión.',
    category: 'Controles UI',
    iconName: 'sliders',
    estimatedMinutes: 12,
    lessons: [
      {
        id: 'les-3-1',
        moduleId: 'mod-dialogo',
        order: 1,
        title: '¿Qué es una ventana de diálogo y en qué se diferencia?',
        durationMin: 4,
        xpReward: 70,
        summary: 'Identifica cuándo Windows te está haciendo una pregunta o pidiendo una configuración mediante un cuadro de diálogo.',
        linkedLab: 'dialogo',
        steps: [
          {
            title: 'Una conversación directa con el sistema',
            body: 'Una ventana de diálogo (o cuadro de diálogo) es una ventana pequeña y enfocada que aparece cuando Windows o un programa necesita que elijas opciones, confirmes una acción o indiques dónde guardar un archivo.',
            keyPoints: [
              'Barra de título del diálogo: te dice exactamente qué estás configurando (por ejemplo, "Propiedades de Escuela" o "Guardar como").',
              'Solo suele tener el botón Cerrar (✕), no Minimizar ni Maximizar, porque su tamaño está diseñado para una tarea concreta.',
              'Muchos cuadros de diálogo son "modales": debes responder (Aceptar o Cancelar) antes de seguir trabajando en la ventana que está detrás.',
            ],
          },
          {
            title: 'Ejemplos comunes que verás todos los días',
            body: 'Seguro te encontrarás con ventanas de diálogo en estas tres situaciones habituales:',
            keyPoints: [
              'Guardar como: te pide el nombre del archivo, el formato (PDF, Word, texto) y la carpeta de destino.',
              'Propiedades: al hacer clic derecho sobre una carpeta y elegir "Propiedades", ves su tamaño, ubicación y atributos en pestañas.',
              'Confirmación: preguntas de seguridad como "¿Deseas guardar los cambios antes de cerrar?" para evitar pérdidas accidentales.',
            ],
          },
        ],
        miniCheck: {
          question: '¿Por qué la mayoría de las ventanas de diálogo no tienen botón de Maximizar?',
          options: [
            'Porque están dañadas',
            'Porque son ventanas focalizadas diseñadas para pedir una decisión o configuración específica',
            'Porque solo funcionan sin ratón',
          ],
          correctIndex: 1,
          explanation: 'Los cuadros de diálogo tienen un propósito puntual (elegir opciones, guardar o confirmar), por lo que normalmente solo muestran la barra de título y el botón Cerrar (✕).',
        },
      },
      {
        id: 'les-3-2',
        moduleId: 'mod-dialogo',
        order: 2,
        title: 'Controles dentro de un diálogo: Campos, Listas, Casillas y Opciones',
        durationMin: 4,
        xpReward: 80,
        summary: 'Distingue de inmediato entre casillas de verificación (varias opciones) y botones de opción (una sola elección).',
        linkedLab: 'dialogo',
        steps: [
          {
            title: 'Pestañas, Campos de texto y Listas desplegables',
            body: 'Los cuadros de diálogo organizan la información con controles estándar que se repiten en todo Windows 11:',
            keyPoints: [
              'Pestañas de sección (General, Compartir, Seguridad): agrupan muchos ajustes relacionados sin abarrotar la pantalla.',
              'Cuadro de texto (Campo de entrada): rectángulo donde escribes un nombre, como el nombre de tu archivo o carpeta.',
              'Lista desplegable (Menú combinado): caja con una flecha hacia abajo (⌄) que al tocarla muestra varias opciones predefinidas, como el tipo de archivo (.docx, .pdf).',
            ],
          },
          {
            title: 'Casillas de verificación vs. Botones de opción',
            body: 'Esta es una de las reglas visuales más útiles para cualquier principiante en informática:',
            keyPoints: [
              'Casillas de verificación (Cuadrados ☑): permiten activar VARIAS opciones a la vez (o ninguna). Ejemplo: marcar "Solo lectura" y también "Oculto".',
              'Botones de opción / Radio (Círculos ◉): son excluyentes; solo puedes elegir UNA opción del grupo. Al marcar una, la anterior se desmarca sola.',
            ],
            tip: 'Truco fácil de recordar: Cuadrado = puedes marcar varios. Círculo = solo puedes elegir uno.',
          },
        ],
        miniCheck: {
          question: 'En una ventana de diálogo, ¿qué control visual te indica que solo puedes elegir UNA opción entre varias?',
          options: [
            'Un botón de opción circular (Radio button ◉)',
            'Una casilla de verificación cuadrada (Checkbox ☑)',
            'La barra de desplazamiento',
          ],
          correctIndex: 0,
          explanation: 'Los botones de opción circulares siempre permiten una única selección dentro de su grupo, mientras que las casillas cuadradas permiten marcar varias a la vez.',
        },
      },
      {
        id: 'les-3-3',
        moduleId: 'mod-dialogo',
        order: 3,
        title: 'Aceptar, Cancelar y Aplicar: ¿cuál es la diferencia?',
        durationMin: 4,
        xpReward: 75,
        summary: 'Nunca vuelvas a dudar qué botón pulsar en la parte inferior de una ventana de diálogo.',
        linkedLab: 'dialogo',
        steps: [
          {
            title: 'Los 3 botones de decisión inferior',
            body: 'En la parte inferior derecha de los cuadros de diálogo de propiedades verás tres botones muy importantes. Cada uno tiene un comportamiento exacto:',
            keyPoints: [
              'Aceptar (botón azul principal): guarda todos los cambios que hiciste y CIERRA la ventana de diálogo.',
              'Cancelar: descarta cualquier cambio que no hayas aplicado y CIERRA la ventana sin modificar nada.',
              'Aplicar: guarda los cambios inmediatamente, pero MANTIENE la ventana abierta para que puedas seguir ajustando otras pestañas.',
            ],
            shortcut: {
              keys: 'Esc',
              action: 'Equivale a pulsar Cancelar y cierra el diálogo sin guardar cambios.',
            },
          },
          {
            title: 'Cuándo usar el botón Aplicar',
            body: 'El botón "Aplicar" aparece desactivado (gris) hasta que modificas alguna opción. Es ideal cuando quieres ver el efecto de un ajuste antes de cerrar el diálogo.',
            keyPoints: [
              'Si pulsas "Aplicar" y luego "Cancelar", los cambios aplicados ya quedaron guardados.',
              'Si presionas la tecla Enter, normalmente se ejecuta el botón principal resaltado en azul (Aceptar o Guardar).',
            ],
          },
        ],
        miniCheck: {
          question: '¿Qué diferencia al botón "Aplicar" del botón "Aceptar" en una ventana de diálogo?',
          options: [
            '"Aplicar" borra los cambios y "Aceptar" los guarda',
            '"Aplicar" guarda los cambios sin cerrar la ventana; "Aceptar" guarda los cambios y cierra la ventana',
            'Hacen exactamente lo mismo',
          ],
          correctIndex: 1,
          explanation: '"Aplicar" guarda tus cambios manteniendo abierto el cuadro de diálogo para seguir configurando; "Aceptar" guarda y cierra la ventana.',
        },
      },
    ],
  },
  {
    id: 'mod-carpetas',
    number: 4,
    title: 'Carpetas, Subcarpetas y Jerarquía',
    subtitle: 'Aprende a crear carpetas, anidar subcarpetas en niveles lógicos, leer rutas y nombrar todo sin errores.',
    category: 'Organización',
    iconName: 'git-branch',
    estimatedMinutes: 15,
    lessons: [
      {
        id: 'les-4-1',
        moduleId: 'mod-carpetas',
        order: 1,
        title: '¿Qué es una carpeta, una subcarpeta y una ruta?',
        durationMin: 5,
        xpReward: 80,
        summary: 'Entiende el sistema de archivos como un archivador con cajones, carpetas y separadores internos.',
        linkedLab: 'carpetas',
        steps: [
          {
            title: 'La analogía del archivador en árbol',
            body: 'Imagina un mueble archivador físico. El disco duro (C:) es el mueble completo, "Documentos" es un cajón, una Carpeta es un fólder principal y una Subcarpeta es un fólder más pequeño guardado dentro del anterior.',
            keyPoints: [
              'Carpeta (Directorio): contenedor digital amarillo que agrupa archivos u otras carpetas.',
              'Subcarpeta: cualquier carpeta que vive dentro de otra carpeta. Puedes crear varios niveles (por ejemplo: Estudios → Matemáticas → Tareas).',
              'Archivo: el contenido real (una foto .jpg, un texto .docx, un presupuesto .xlsx). Los archivos viven dentro de carpetas, nunca al revés.',
            ],
            visualExample: {
              label: 'Estructura en árbol de carpetas y subcarpetas',
              pathOrSnippet: 'Documentos\n ├── Estudios\n │    ├── Matemáticas\n │    │    └── Tareas\n │    └── Historia\n └── Personal',
              caption: '"Estudios" es una carpeta dentro de Documentos. "Matemáticas" es subcarpeta de Estudios, y "Tareas" es subcarpeta de Matemáticas.',
            },
          },
          {
            title: 'Cómo leer una ruta de Windows',
            body: 'Cada carpeta tiene una dirección única llamada Ruta. En Windows las carpetas se separan con la barra invertida (\\).',
            keyPoints: [
              'Se lee de izquierda a derecha: de lo más grande (el disco C:) a lo más específico.',
              'Ejemplo: C:\\Usuarios\\Ana\\Documentos\\Estudios\\Historia significa que Historia está dentro de Estudios, que está dentro de Documentos.',
            ],
          },
        ],
        miniCheck: {
          question: 'En la ruta C:\\Documentos\\Fotos\\Vacaciones_2026, ¿cuál es la carpeta padre directa de "Vacaciones_2026"?',
          options: [
            'La carpeta "Fotos"',
            'El disco "C:" directamente',
            'El Escritorio',
          ],
          correctIndex: 0,
          explanation: 'En una ruta, el nombre inmediatamente a la izquierda es siempre la carpeta contenedora (carpeta padre). Aquí, "Vacaciones_2026" es una subcarpeta de "Fotos".',
        },
      },
      {
        id: 'les-4-2',
        moduleId: 'mod-carpetas',
        order: 2,
        title: '3 formas fáciles de crear carpetas y subcarpetas',
        durationMin: 5,
        xpReward: 90,
        summary: 'Aprende el paso a paso exacto para crear carpetas nuevas usando la barra de comandos, clic derecho o teclado.',
        linkedLab: 'carpetas',
        steps: [
          {
            title: 'Método 1: Botón "Nuevo" y Método 2: Clic derecho',
            body: 'Antes de crear una carpeta, abre primero el lugar donde quieres que viva (por ejemplo, abre "Documentos"). Si quieres crear una SUBCARPETA, debes abrir primero la carpeta padre haciendo doble clic sobre ella.',
            keyPoints: [
              'Desde la Barra de Comandos: haz clic en "+ Nuevo" en la esquina superior izquierda del Explorador y selecciona "Carpeta".',
              'Con clic derecho: haz clic derecho en un espacio vacío del área de contenido → apunta a "Nuevo" → haz clic en "Carpeta".',
              'Escribe el nombre inmediatamente mientras el texto "Nueva carpeta" está resaltado en azul, y presiona Enter para confirmar.',
            ],
            tip: 'Error común de principiantes: crear dos carpetas juntas en el mismo nivel en vez de entrar primero a la carpeta padre. ¡Recuerda abrir la carpeta padre antes de crear la subcarpeta!',
          },
          {
            title: 'Método 3: El atajo mágico de teclado',
            body: 'Cuando ya te sientas cómodo, este atajo te hará crear carpetas y subcarpetas en un segundo:',
            keyPoints: [
              'Abre la carpeta destino.',
              'Presiona Ctrl + Shift + N al mismo tiempo.',
              'Aparece al instante una carpeta lista para escribir su nombre y pulsar Enter.',
            ],
            shortcut: {
              keys: 'Ctrl + Shift + N',
              action: 'Crea una carpeta nueva al instante dentro de la ubicación actual.',
            },
          },
        ],
        miniCheck: {
          question: 'Si ya creaste la carpeta "Trabajo" dentro de Documentos y ahora quieres crear la subcarpeta "Informes" DENTRO de "Trabajo", ¿qué debes hacer primero?',
          options: [
            'Abrir la carpeta "Trabajo" con doble clic antes de pulsar Nuevo → Carpeta',
            'Quedarte en Documentos y escribir "Trabajo Informes"',
            'Reiniciar el Explorador de archivos',
          ],
          correctIndex: 0,
          explanation: 'Para crear una subcarpeta, primero debes entrar dentro de la carpeta padre ("Trabajo") para que la nueva carpeta se cree en su interior.',
        },
      },
      {
        id: 'les-4-3',
        moduleId: 'mod-carpetas',
        order: 3,
        title: 'Reglas para nombrar, renombrar y organizar tus carpetas',
        durationMin: 5,
        xpReward: 80,
        summary: 'Evita errores con caracteres prohibidos de Windows y aplica buenas prácticas para encontrar cualquier archivo en segundos.',
        linkedLab: 'carpetas',
        steps: [
          {
            title: 'Caracteres prohibidos en Windows 11',
            body: 'Windows reserva 9 símbolos especiales para rutas y búsquedas internas, así que no permite usarlos en nombres de carpetas ni archivos.',
            keyPoints: [
              'Símbolos prohibidos: \\  /  :  *  ?  "  <  >  |',
              'Por ejemplo, no puedes llamar a una carpeta "Factura 12/05" porque contiene la barra "/". Usa guiones en su lugar: "Factura 12-05" o "2026-05-12_Factura".',
              'Dos carpetas en el mismo nivel no pueden tener exactamente el mismo nombre, pero sí pueden llamarse igual si están en carpetas padre distintas.',
            ],
            visualExample: {
              label: 'Nombres válidos vs. inválidos',
              pathOrSnippet: '✓  2026_Curso_Windows   (Válido)\n✓  Fotos-Verano         (Válido)\n✕  Notas: ¿Finales?     (Inválido: usa : y ?)',
              caption: 'Usa letras, números, espacios, guiones (-) o guiones bajos (_) para nombres limpios y compatibles.',
            },
          },
          {
            title: 'Cómo cambiar el nombre a una carpeta ya creada',
            body: 'Si cometiste un error al escribir el nombre o quieres mejorarlo, renombrar es muy sencillo y no borra nada de su interior.',
            keyPoints: [
              'Selecciona la carpeta con un clic y presiona la tecla F2.',
              'O selecciona la carpeta y haz clic en el icono "Cambiar nombre" en la Barra de Comandos.',
              'Escribe el nuevo nombre y pulsa Enter.',
            ],
            shortcut: {
              keys: 'F2',
              action: 'Permite cambiar el nombre de la carpeta o archivo seleccionado.',
            },
          },
        ],
        miniCheck: {
          question: '¿Cuál de los siguientes nombres de carpeta SÍ es válido en Windows 11?',
          options: [
            'Tareas: 2026/05',
            'Tareas_2026-05',
            '¿Tareas*Finales?',
          ],
          correctIndex: 1,
          explanation: 'Los guiones bajos (_) y guiones medios (-) son totalmente válidos. Los signos :, /, ¿ no (el ? sí está prohibido) y * están prohibidos por Windows.',
        },
      },
    ],
  },
  {
    id: 'mod-archivos',
    number: 5,
    title: 'Gestión de Archivos y Atajos Esenciales',
    subtitle: 'Copia, mueve, deshaz errores con Ctrl+Z, recupera archivos de la Papelera y domina el teclado.',
    category: 'Práctica diaria',
    iconName: 'keyboard',
    estimatedMinutes: 11,
    lessons: [
      {
        id: 'les-5-1',
        moduleId: 'mod-archivos',
        order: 1,
        title: 'Copiar, Cortar y Pegar sin confundirte',
        durationMin: 4,
        xpReward: 75,
        summary: 'Aprende la diferencia clave entre duplicar un archivo (Copiar) y trasladarlo de carpeta (Cortar).',
        linkedLab: 'atajos',
        steps: [
          {
            title: 'Copiar vs. Cortar',
            body: 'Cuando organizas archivos entre tus nuevas carpetas y subcarpetas, usarás todo el tiempo estas tres acciones:',
            keyPoints: [
              'Copiar (Ctrl + C): crea un duplicado. El archivo original se queda donde estaba y aparece una copia idéntica donde pegues.',
              'Cortar (Ctrl + X): prepara el archivo para MOVERLO (su icono se ve ligeramente transparente). Al pegarlo en otra carpeta, desaparece del lugar anterior.',
              'Pegar (Ctrl + V): coloca el archivo copiado o cortado dentro de la carpeta que tienes abierta.',
            ],
            shortcut: {
              keys: 'Ctrl + Z',
              action: '¡Tu salvavidas! Deshace la última acción si moviste, renombraste o borraste algo por error.',
            },
          },
        ],
        miniCheck: {
          question: 'Quieres mover una foto desde Descargas a tu subcarpeta Fotos\\Familia sin dejar una copia duplicada en Descargas. ¿Qué combinación debes usar?',
          options: [
            'Copiar (Ctrl + C) y Pegar (Ctrl + V)',
            'Cortar (Ctrl + X) y Pegar (Ctrl + V)',
            'Cambiar nombre (F2)',
          ],
          correctIndex: 1,
          explanation: 'Cortar (Ctrl + X) traslada el archivo al nuevo destino sin dejar duplicados en la carpeta de origen.',
        },
      },
      {
        id: 'les-5-2',
        moduleId: 'mod-archivos',
        order: 2,
        title: 'Eliminar y restaurar desde la Papelera de reciclaje',
        durationMin: 3,
        xpReward: 70,
        summary: 'Pierde el miedo a borrar algo por accidente entendiendo cómo funciona la Papelera.',
        linkedLab: 'carpetas',
        steps: [
          {
            title: 'Borrar de forma segura',
            body: 'Cuando seleccionas un archivo o carpeta y pulsas la tecla Supr (Del) o el icono de papelera, NO se destruye al instante: viaja a la Papelera de reciclaje.',
            keyPoints: [
              'Para recuperar algo: abre la Papelera de reciclaje en el Escritorio, haz clic derecho en el archivo y elige "Restaurar". Volverá exactamente a su carpeta original.',
              'Vaciar la Papelera: elimina definitivamente los archivos para liberar espacio en el disco.',
              'Cuidado con memorias USB: lo que borras desde un pendrive USB normalmente se elimina de inmediato sin pasar por la Papelera.',
            ],
            tip: 'Si borraste una carpeta hace dos segundos, pulsa Ctrl + Z inmediatamente para traerla de vuelta sin siquiera abrir la Papelera.',
          },
        ],
        miniCheck: {
          question: 'Si eliminaste una carpeta de Documentos con la tecla Supr por accidente, ¿cómo puedes devolverla exactamente a su lugar original?',
          options: [
            'Es imposible recuperarla',
            'Abrir la Papelera de reciclaje, hacer clic derecho sobre la carpeta y elegir "Restaurar" (o pulsar Ctrl + Z al instante)',
            'Crear una carpeta vacía con el mismo nombre',
          ],
          correctIndex: 1,
          explanation: 'La Papelera de reciclaje guarda la ubicación original de cada elemento borrado para que puedas restaurarlo con un clic.',
        },
      },
      {
        id: 'les-5-3',
        moduleId: 'mod-archivos',
        order: 3,
        title: 'Los 8 atajos de teclado que te harán volar en Windows 11',
        durationMin: 4,
        xpReward: 80,
        summary: 'Memoriza los atajos más útiles para principiantes y practícalos en el reto interactivo.',
        linkedLab: 'atajos',
        steps: [
          {
            title: 'Atajos imprescindibles del día a día',
            body: 'No necesitas aprender cien atajos. Con estos ocho dominarás el 90% de tus tareas cotidianas con agilidad:',
            keyPoints: [
              'Win + E → Abre el Explorador de archivos.',
              'Ctrl + Shift + N → Crea una nueva carpeta.',
              'F2 → Cambia el nombre al elemento seleccionado.',
              'Ctrl + C / Ctrl + X / Ctrl + V → Copiar, Cortar y Pegar.',
              'Ctrl + Z → Deshacer el último error.',
              'Alt + Tab → Cambia rápidamente entre ventanas abiertas.',
              'Win + D → Muestra el Escritorio.',
              'Alt + F4 → Cierra la ventana activa.',
            ],
            shortcut: {
              keys: 'Alt + Tab',
              action: 'Muestra miniaturas de tus ventanas abiertas para saltar de una a otra rápidamente.',
            },
          },
        ],
        miniCheck: {
          question: '¿Qué combinación de teclas abre el Explorador de archivos directamente?',
          options: [
            'Win + E',
            'Alt + F4',
            'Ctrl + P',
          ],
          correctIndex: 0,
          explanation: 'La tecla Windows + E ("Explorador") abre al instante una ventana del Explorador de archivos.',
        },
      },
    ],
  },
  {
    id: 'mod-productividad',
    number: 6,
    title: 'Ventanas, Snap Layouts y Productividad',
    subtitle: 'Organiza dos o más ventanas lado a lado con Snap Layouts, usa escritorios virtuales y personaliza Windows 11.',
    category: 'Dominio',
    iconName: 'layout-grid',
    estimatedMinutes: 10,
    lessons: [
      {
        id: 'les-6-1',
        moduleId: 'mod-productividad',
        order: 1,
        title: 'Snap Layouts: trabaja con dos ventanas a la vez',
        durationMin: 4,
        xpReward: 80,
        summary: 'Aprende a dividir tu pantalla limpiamente para ver un tutorial a la izquierda y tus carpetas a la derecha.',
        linkedLab: 'explorador',
        steps: [
          {
            title: 'Cómo acoplar ventanas en segundos',
            body: 'Una de las funciones estrella de Windows 11 es Snap Layouts (Diseños de acoplamiento). Te permite dividir tu pantalla en mitades, tercios o cuartos sin ajustar bordes a mano.',
            keyPoints: [
              'Pasa el cursor sobre el botón Maximizar (□) de cualquier ventana y espera medio segundo: aparecerá una cuadrícula con varios diseños.',
              'Haz clic en la zona donde quieres ubicar esa ventana (por ejemplo, mitad izquierda).',
              'Windows te preguntará inmediatamente qué otra ventana abierta quieres colocar en la mitad derecha.',
            ],
            shortcut: {
              keys: 'Win + Z',
              action: 'Muestra el menú de diseños Snap Layouts de la ventana activa.',
            },
          },
        ],
        miniCheck: {
          question: '¿Sobre qué botón de una ventana debes dejar el puntero del ratón para ver los diseños de Snap Layouts en Windows 11?',
          options: [
            'Sobre el botón Cerrar (✕)',
            'Sobre el botón Maximizar / Restaurar (□)',
            'Sobre el botón Minimizar (—)',
          ],
          correctIndex: 1,
          explanation: 'Al situar el puntero sobre el botón Maximizar (□), Windows 11 despliega las cuadrículas de Snap Layouts para organizar tus ventanas.',
        },
      },
      {
        id: 'les-6-2',
        moduleId: 'mod-productividad',
        order: 2,
        title: 'Vista de Tareas y Escritorios Virtuales',
        durationMin: 3,
        xpReward: 70,
        summary: 'Separa tus ventanas de estudio de las de ocio usando escritorios virtuales limpios.',
        linkedLab: 'escritorio',
        steps: [
          {
            title: 'Múltiples mesas de trabajo en una misma PC',
            body: 'Si tienes muchas ventanas abiertas a la vez, la Vista de Tareas (el icono de dos cuadrados superpuestos en la Barra de Tareas) te deja crear Escritorios virtuales separados.',
            keyPoints: [
              'Puedes tener "Escritorio 1: Estudios" con tus documentos y "Escritorio 2: Personal" con tu música o fotos.',
              'Tus archivos siguen siendo los mismos; solo se organizan las ventanas abiertas por grupo.',
              'Usa Win + Tab para ver todas las ventanas y crear escritorios nuevos.',
            ],
            shortcut: {
              keys: 'Win + Tab',
              action: 'Abre la Vista de Tareas para ver todas las ventanas y escritorios virtuales.',
            },
          },
        ],
        miniCheck: {
          question: '¿Para qué sirve crear un segundo Escritorio virtual en Windows 11?',
          options: [
            'Para borrar tus programas antiguos',
            'Para separar y organizar distintos grupos de ventanas abiertas (por ejemplo, Estudio y Personal)',
            'Para duplicar el tamaño del disco duro',
          ],
          correctIndex: 1,
          explanation: 'Los escritorios virtuales te permiten mantener ordenadas diferentes tareas sin cerrar tus ventanas ni mezclarlas en una sola pantalla.',
        },
      },
      {
        id: 'les-6-3',
        moduleId: 'mod-productividad',
        order: 3,
        title: 'Configuración de Windows 11 y Accesibilidad',
        durationMin: 3,
        xpReward: 70,
        summary: 'Ajusta el tamaño del texto, el modo oscuro y las opciones de comodidad visual desde Configuración.',
        linkedLab: 'escritorio',
        steps: [
          {
            title: 'Adapta Windows 11 a tu comodidad',
            body: 'La aplicación Configuración (tecla Win + I) reúne de forma clara todas las opciones para que tu computadora se adapte a ti.',
            keyPoints: [
              'Personalización: cambia el fondo de pantalla, colores y elige entre modo Claro u Oscuro.',
              'Accesibilidad: aumenta el tamaño del texto, haz el puntero del ratón más grande y visible o activa la lupa.',
              'Sistema → Almacenamiento: consulta cuánto espacio libre queda en tu disco y activa el Sensor de almacenamiento.',
            ],
            shortcut: {
              keys: 'Win + I',
              action: 'Abre directamente la ventana de Configuración de Windows 11.',
            },
          },
        ],
        miniCheck: {
          question: '¿Qué atajo de teclado abre la aplicación Configuración de Windows 11 al instante?',
          options: [
            'Win + I',
            'Ctrl + S',
            'F5',
          ],
          correctIndex: 0,
          explanation: 'Win + I abre la ventana de Configuración donde puedes ajustar pantalla, personalización, red y accesibilidad.',
        },
      },
    ],
  },
];

export const ALL_LESSONS = MODULES.flatMap((m) => m.lessons);
