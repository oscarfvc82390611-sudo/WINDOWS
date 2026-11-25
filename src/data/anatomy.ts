import { AnatomyHotspot, FolderMission, VirtualNode } from '../types';

export const DESKTOP_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'desk-wallpaper',
    number: 1,
    name: 'Fondo de pantalla (Escritorio)',
    shortName: 'Fondo de pantalla',
    category: 'Área de trabajo',
    description:
      'Es la superficie principal de trabajo detrás de tus ventanas e iconos. Puedes hacer clic derecho en cualquier zona libre para crear carpetas, ordenar iconos o personalizar el tema.',
    beginnerTip: 'Si tienes muchas ventanas abiertas y quieres ver el escritorio al instante, pulsa Win + D.',
    shortcut: 'Win + D',
  },
  {
    id: 'desk-recycle',
    number: 2,
    name: 'Papelera de reciclaje',
    shortName: 'Papelera',
    category: 'Icono del sistema',
    description:
      'Guarda temporalmente los archivos y carpetas que eliminas de tu disco duro. Desde aquí puedes restaurar cualquier elemento borrado por error o vaciarla para liberar espacio.',
    beginnerTip: 'Mientras no vacíes la Papelera, tus archivos eliminados se pueden recuperar con clic derecho → Restaurar.',
  },
  {
    id: 'desk-icons',
    number: 3,
    name: 'Iconos y accesos directos',
    shortName: 'Iconos',
    category: 'Área de trabajo',
    description:
      'Representan carpetas, documentos o programas. Si tienen una pequeña flecha en la esquina inferior izquierda, son accesos directos (un atajo al programa real). Se abren con doble clic.',
    beginnerTip: 'Borrar un acceso directo del escritorio NO desinstala el programa, solo quita el botón rápido.',
  },
  {
    id: 'desk-widgets',
    number: 4,
    name: 'Botón de Widgets (Clima)',
    shortName: 'Widgets',
    category: 'Barra de tareas',
    description:
      'Ubicado en la esquina inferior izquierda, muestra la temperatura y abre un panel lateral con tarjetas de clima, calendario, tareas y noticias.',
    beginnerTip: 'Al tocar fuera del panel de Widgets, se oculta automáticamente sin interrumpir lo que hacías.',
    shortcut: 'Win + W',
  },
  {
    id: 'desk-start',
    number: 5,
    name: 'Botón Inicio',
    shortName: 'Botón Inicio',
    category: 'Barra de tareas',
    description:
      'El icono azul de cuatro cuadros es la puerta principal de Windows 11. Abre el Menú Inicio con tus aplicaciones ancladas, archivos recientes y el botón para apagar o reiniciar el equipo.',
    beginnerTip: 'También puedes hacer clic derecho sobre el Botón Inicio para abrir un menú rápido de herramientas avanzadas.',
    shortcut: 'Tecla Win',
  },
  {
    id: 'desk-search',
    number: 6,
    name: 'Cuadro de Búsqueda',
    shortName: 'Búsqueda',
    category: 'Barra de tareas',
    description:
      'Te permite localizar cualquier aplicación, carpeta, documento o ajuste de Configuración con solo escribir las primeras letras de su nombre.',
    beginnerTip: 'No hace falta saber dónde está guardado un programa: búscalo aquí por su nombre.',
    shortcut: 'Win + S',
  },
  {
    id: 'desk-taskview',
    number: 7,
    name: 'Vista de Tareas',
    shortName: 'Vista de tareas',
    category: 'Barra de tareas',
    description:
      'Muestra en miniatura todas las ventanas abiertas en pantalla y te permite crear o cambiar entre varios Escritorios virtuales (por ejemplo, Estudio y Personal).',
    beginnerTip: 'Úsalo cuando tengas muchas ventanas abiertas y quieras encontrar una rápidamente.',
    shortcut: 'Win + Tab',
  },
  {
    id: 'desk-pinned',
    number: 8,
    name: 'Aplicaciones ancladas y abiertas',
    shortName: 'Apps ancladas',
    category: 'Barra de tareas',
    description:
      'Reúne tus programas de uso diario como el Explorador de archivos y el navegador. Se abren con UN solo clic. Las aplicaciones abiertas muestran una pequeña línea debajo de su icono.',
    beginnerTip: 'En la barra de tareas solo necesitas UN clic (no doble clic) para abrir un programa.',
  },
  {
    id: 'desk-tray',
    number: 9,
    name: 'Configuración rápida y Reloj',
    shortName: 'Bandeja / Reloj',
    category: 'Área de notificaciones',
    description:
      'El grupo de Wi-Fi, volumen y batería abre Configuración rápida. A su derecha, la fecha y hora despliegan el Calendario y el Centro de notificaciones.',
    beginnerTip: 'Pulsa Win + A para abrir Configuración rápida desde el teclado en cualquier momento.',
    shortcut: 'Win + A',
  },
];

export const EXPLORER_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'exp-tabs',
    number: 1,
    name: 'Pestañas y botón Nueva pestaña (+)',
    shortName: 'Pestañas',
    category: 'Parte superior',
    description:
      'Permiten abrir varias carpetas distintas dentro de una sola ventana del Explorador, igual que un navegador web. El botón "+" crea una pestaña nueva y la "✕" cierra solo esa pestaña.',
    beginnerTip: 'Usa pestañas para copiar archivos de "Descargas" a "Documentos" sin amontonar ventanas.',
    shortcut: 'Ctrl + T',
  },
  {
    id: 'exp-controls',
    number: 2,
    name: 'Botones de control de ventana',
    shortName: 'Controles de ventana',
    category: 'Barra de título',
    description:
      'Los tres controles clásicos en la esquina superior derecha: Minimizar (—) oculta la ventana en la barra de tareas; Maximizar/Restaurar (□) ajusta su tamaño y muestra Snap Layouts al pasar el cursor; Cerrar (✕) finaliza la ventana.',
    beginnerTip: 'Deja el ratón quieto medio segundo sobre Maximizar (□) para dividir la pantalla con Snap Layouts.',
    shortcut: 'Win + Z',
  },
  {
    id: 'exp-nav-buttons',
    number: 3,
    name: 'Botones de navegación (Atrás, Adelante, Subir, Actualizar)',
    shortName: 'Navegación',
    category: 'Barra de direcciones',
    description:
      'Atrás (←) regresa a la última carpeta visitada; Adelante (→) avanza si retrocediste; Subir un nivel (↑) salta directamente a la carpeta padre; Actualizar (↻) refresca el contenido de la carpeta.',
    beginnerTip: 'Si entraste a una subcarpeta y quieres volver a la carpeta que la contiene, usa la flecha hacia arriba (↑).',
    shortcut: 'Alt + ↑',
  },
  {
    id: 'exp-address',
    number: 4,
    name: 'Barra de direcciones (Ruta interactiva)',
    shortName: 'Barra de direcciones',
    category: 'Barra de direcciones',
    description:
      'Muestra exactamente dónde estás ubicado en forma de migas de pan (breadcrumbs), por ejemplo: "Este equipo > Documentos > Estudios". Puedes tocar cualquier carpeta de la ruta para regresar a ella de inmediato.',
    beginnerTip: 'Si haces clic en el espacio libre al final de la barra, verás la ruta escrita con barras invertidas (C:\\Usuarios\\...).',
    shortcut: 'Alt + D',
  },
  {
    id: 'exp-search',
    number: 5,
    name: 'Cuadro de búsqueda del Explorador',
    shortName: 'Buscar en carpeta',
    category: 'Barra de direcciones',
    description:
      'Busca archivos y subcarpetas por nombre o contenido únicamente dentro de la carpeta donde te encuentras y todas las subcarpetas que contiene.',
    beginnerTip: 'Si buscas un documento escolar, entra primero a "Documentos" y escribe una palabra clave aquí.',
    shortcut: 'Ctrl + F',
  },
  {
    id: 'exp-commandbar',
    number: 6,
    name: 'Barra de comandos (Nuevo, Cortar, Copiar, Ordenar, Ver)',
    shortName: 'Barra de comandos',
    category: 'Herramientas',
    description:
      'Concentra las acciones más importantes con iconos claros: crear una carpeta o archivo (+ Nuevo), Cortar, Copiar, Pegar, Cambiar nombre, Compartir, Eliminar, Ordenar los elementos y cambiar el diseño de vista.',
    beginnerTip: 'Los iconos de Cortar, Copiar, Renombrar y Eliminar se iluminan automáticamente en cuanto seleccionas un archivo o carpeta.',
    shortcut: 'Ctrl + Shift + N',
  },
  {
    id: 'exp-navpane',
    number: 7,
    name: 'Panel de navegación izquierdo',
    shortName: 'Panel izquierdo',
    category: 'Estructura',
    description:
      'Muestra el árbol principal de ubicaciones de tu PC: Inicio, Galería, OneDrive, Escritorio, Descargas, Documentos, Imágenes, Este equipo y unidades USB conectadas. Las flechas (>) expanden subcarpetas.',
    beginnerTip: 'Puedes arrastrar un archivo desde el centro y soltarlo sobre cualquier carpeta del Panel izquierdo para moverlo.',
  },
  {
    id: 'exp-content',
    number: 8,
    name: 'Área de contenido y encabezados de columna',
    shortName: 'Área de contenido',
    category: 'Área principal',
    description:
      'Es la zona central donde ves las carpetas y archivos de la ubicación actual. En la vista Detalles incluye columnas (Nombre, Fecha de modificación, Tipo, Tamaño); al tocar cualquier encabezado ordenas la lista.',
    beginnerTip: 'Haz clic una vez para seleccionar un archivo y doble clic para abrirlo.',
  },
  {
    id: 'exp-details',
    number: 9,
    name: 'Panel de detalles / Vista previa',
    shortName: 'Panel de detalles',
    category: 'Información',
    description:
      'Panel lateral derecho opcional que muestra una vista previa del elemento seleccionado junto con sus propiedades clave: tipo de archivo, tamaño, ubicación y última modificación.',
    beginnerTip: 'Puedes mostrarlo u ocultarlo en cualquier momento con el botón "Detalles" en la esquina derecha de la barra de comandos.',
    shortcut: 'Alt + Shift + P',
  },
  {
    id: 'exp-statusbar',
    number: 10,
    name: 'Barra de estado inferior y vistas rápidas',
    shortName: 'Barra de estado',
    category: 'Parte inferior',
    description:
      'A la izquierda informa cuántos elementos existen en la carpeta actual y cuántos tienes seleccionados (con su tamaño). A la derecha ofrece dos botones rápidos para alternar entre lista detallada y miniaturas grandes.',
    beginnerTip: 'Muy útil para comprobar cuántos archivos seleccionaste antes de copiarlos o borrarlos.',
  },
];

export const DIALOG_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'dlg-titlebar',
    number: 1,
    name: 'Barra de título y botón Cerrar (✕)',
    shortName: 'Barra de título',
    category: 'Encabezado',
    description:
      'Indica claramente qué objeto o tarea estás configurando (por ejemplo, "Propiedades de: Estudios" o "Guardar como"). Solo incluye el botón Cerrar (✕) que cancela sin guardar cambios.',
    beginnerTip: 'Siempre lee la barra de título primero para confirmar sobre qué carpeta o archivo vas a aplicar cambios.',
    shortcut: 'Esc',
  },
  {
    id: 'dlg-tabs',
    number: 2,
    name: 'Pestañas de sección del diálogo',
    shortName: 'Pestañas',
    category: 'Navegación interna',
    description:
      'Dividen las configuraciones en categorías ordenadas (General, Compartir, Seguridad, Personalizar) para que el cuadro de diálogo sea fácil de leer y no muestre demasiadas opciones de golpe.',
    beginnerTip: 'Cambiar de pestaña NO borra los ajustes que marcaste en la pestaña anterior mientras no cierres la ventana.',
  },
  {
    id: 'dlg-summary',
    number: 3,
    name: 'Zona de información y metadatos',
    shortName: 'Información',
    category: 'Lectura',
    description:
      'Muestra datos informativos de solo lectura que Windows calcula automáticamente: tipo de objeto, ubicación exacta (ruta), tamaño en disco y cantidad de archivos y subcarpetas.',
    beginnerTip: 'Es la forma más rápida de saber cuánto espacio ocupa una carpeta completa con todas sus subcarpetas.',
  },
  {
    id: 'dlg-textbox',
    number: 4,
    name: 'Cuadro de texto (Campo editable)',
    shortName: 'Campo de texto',
    category: 'Entrada de datos',
    description:
      'Casilla rectangular donde puedes hacer clic y escribir texto con el teclado, como el nombre nuevo de una carpeta o el nombre del archivo que vas a guardar.',
    beginnerTip: 'Al escribir aquí recuerda evitar los caracteres prohibidos de Windows (\\ / : * ? " < > |).',
  },
  {
    id: 'dlg-dropdown',
    number: 5,
    name: 'Lista desplegable (Menú combinado)',
    shortName: 'Lista desplegable',
    category: 'Selección',
    description:
      'Control con una flecha hacia abajo (⌄) que oculta una lista de opciones predefinidas. Al tocarlo se despliega para elegir, por ejemplo, el tipo de optimización o el formato del archivo (.pdf, .docx).',
    beginnerTip: 'Ahorra errores porque solo te deja escoger opciones válidas que Windows entiende.',
  },
  {
    id: 'dlg-checkboxes',
    number: 6,
    name: 'Casillas de verificación (Checkboxes)',
    shortName: 'Casillas (Múltiples)',
    category: 'Selección múltiple',
    description:
      'Pequeños cuadrados que se marcan con una palomita (✓). Permiten activar VARIAS opciones al mismo tiempo, solo una, o dejar todas desmarcadas.',
    beginnerTip: 'Pista visual: si es CUADRADO, puedes marcar más de una opción a la vez.',
  },
  {
    id: 'dlg-radios',
    number: 7,
    name: 'Botones de opción (Radio buttons)',
    shortName: 'Botones de opción',
    category: 'Selección única',
    description:
      'Pequeños círculos agrupados que son mutuamente excluyentes: solo puedes elegir UNA opción del grupo. Al seleccionar una, la anterior se desactiva automáticamente.',
    beginnerTip: 'Pista visual: si es REDONDO, solo puedes escoger una única alternativa.',
  },
  {
    id: 'dlg-accept',
    number: 8,
    name: 'Botón de acción principal (Aceptar / Guardar)',
    shortName: 'Botón Aceptar',
    category: 'Confirmación',
    description:
      'Resaltado en el color azul principal de Windows 11. Guarda y ejecuta todos los cambios elegidos en el cuadro de diálogo y cierra la ventana inmediatamente.',
    beginnerTip: 'Generalmente puedes activarlo presionando la tecla Enter.',
    shortcut: 'Enter',
  },
  {
    id: 'dlg-cancel-apply',
    number: 9,
    name: 'Botones Cancelar y Aplicar',
    shortName: 'Cancelar / Aplicar',
    category: 'Control de cambios',
    description:
      '"Cancelar" cierra el diálogo descartando los cambios sin guardar. "Aplicar" guarda tus ajustes al momento pero mantiene el diálogo abierto para que puedas seguir revisando o cambiando otras pestañas.',
    beginnerTip: 'Si te equivocas modificando opciones y te arrepientes, pulsa Cancelar (o Esc) sin miedo: nada cambiará.',
    shortcut: 'Esc',
  },
];

export const INITIAL_SANDBOX_NODES: VirtualNode[] = [
  {
    id: 'root-docs',
    name: 'Documentos',
    type: 'folder',
    modifiedDate: '24/11/2026',
    parentId: null,
    isSystem: true,
  },
  {
    id: 'root-pics',
    name: 'Imágenes',
    type: 'folder',
    modifiedDate: '24/11/2026',
    parentId: null,
    isSystem: true,
  },
  {
    id: 'root-downloads',
    name: 'Descargas',
    type: 'folder',
    modifiedDate: '24/11/2026',
    parentId: null,
    isSystem: true,
  },
  {
    id: 'file-bienvenida',
    name: 'Guia_Inicio_Rapido.pdf',
    type: 'file',
    extension: 'pdf',
    sizeLabel: '420 KB',
    modifiedDate: '24/11/2026',
    parentId: 'root-docs',
  },
  {
    id: 'file-borrador',
    name: 'Borrador.txt',
    type: 'file',
    extension: 'txt',
    sizeLabel: '4 KB',
    modifiedDate: '24/11/2026',
    parentId: 'root-docs',
  },
  {
    id: 'file-foto1',
    name: 'Playa_Atardecer.jpg',
    type: 'file',
    extension: 'jpg',
    sizeLabel: '2.4 MB',
    modifiedDate: '20/11/2026',
    parentId: 'root-pics',
  },
  {
    id: 'file-instalador',
    name: 'Manual_Windows11.pdf',
    type: 'file',
    extension: 'pdf',
    sizeLabel: '1.8 MB',
    modifiedDate: '22/11/2026',
    parentId: 'root-downloads',
  },
];

const normalizeName = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

function findFolder(nodes: VirtualNode[], name: string, parentId: string): VirtualNode | undefined {
  const target = normalizeName(name);
  return nodes.find(
    (n) => n.type === 'folder' && n.parentId === parentId && normalizeName(n.name) === target
  );
}

export const FOLDER_MISSIONS: FolderMission[] = [
  {
    id: 'mission-1',
    number: 1,
    title: 'Tu primera carpeta en Documentos',
    difficulty: 'Básico',
    xpReward: 80,
    description:
      'Crea una carpeta llamada "Estudios" directamente dentro de la carpeta Documentos.',
    goalSummary: 'Crear: Documentos > Estudios',
    hint: 'Asegúrate de estar dentro de "Documentos", toca el botón "+ Nueva carpeta", escribe Estudios y confirma.',
    targetPathPreview: 'Documentos \\ Estudios',
    checkCompleted: (nodes) => Boolean(findFolder(nodes, 'Estudios', 'root-docs')),
  },
  {
    id: 'mission-2',
    number: 2,
    title: 'Crea dos subcarpetas de materias',
    difficulty: 'Básico',
    xpReward: 100,
    description:
      'Entra dentro de tu carpeta "Estudios" y crea DOS subcarpetas: "Matemáticas" e "Historia".',
    goalSummary: 'Crear subcarpetas "Matemáticas" e "Historia" dentro de Estudios',
    hint: 'Haz clic en la carpeta "Estudios" para abrirla (verás "Documentos > Estudios" en la barra de direcciones) y crea ambas subcarpetas ahí adentro.',
    targetPathPreview: 'Documentos \\ Estudios \\ [Matemáticas, Historia]',
    checkCompleted: (nodes) => {
      const estudios = findFolder(nodes, 'Estudios', 'root-docs');
      if (!estudios) return false;
      return (
        Boolean(findFolder(nodes, 'Matematicas', estudios.id)) &&
        Boolean(findFolder(nodes, 'Historia', estudios.id))
      );
    },
  },
  {
    id: 'mission-3',
    number: 3,
    title: 'Jerarquía de 3 niveles (Sub-subcarpeta)',
    difficulty: 'Intermedio',
    xpReward: 120,
    description:
      'Abre la subcarpeta "Matemáticas" (que está dentro de Estudios) y crea adentro la subcarpeta "Tareas".',
    goalSummary: 'Crear: Documentos > Estudios > Matemáticas > Tareas',
    hint: 'Navega por Documentos → Estudios → Matemáticas. Una vez adentro, crea la carpeta "Tareas".',
    targetPathPreview: 'Documentos \\ Estudios \\ Matemáticas \\ Tareas',
    checkCompleted: (nodes) => {
      const estudios = findFolder(nodes, 'Estudios', 'root-docs');
      if (!estudios) return false;
      const mate = findFolder(nodes, 'Matematicas', estudios.id);
      if (!mate) return false;
      return Boolean(findFolder(nodes, 'Tareas', mate.id));
    },
  },
  {
    id: 'mission-4',
    number: 4,
    title: 'Organiza tus Imágenes por año',
    difficulty: 'Intermedio',
    xpReward: 120,
    description:
      'Usa el panel izquierdo para ir a "Imágenes", crea la carpeta "2026" y dentro de "2026" crea la subcarpeta "Vacaciones".',
    goalSummary: 'Crear: Imágenes > 2026 > Vacaciones',
    hint: 'Toca "Imágenes" en el panel de navegación izquierdo. Crea "2026", ábrela y crea adentro "Vacaciones".',
    targetPathPreview: 'Imágenes \\ 2026 \\ Vacaciones',
    checkCompleted: (nodes) => {
      const y2026 = findFolder(nodes, '2026', 'root-pics');
      if (!y2026) return false;
      return Boolean(findFolder(nodes, 'Vacaciones', y2026.id));
    },
  },
  {
    id: 'mission-5',
    number: 5,
    title: 'Renombra un archivo existente',
    difficulty: 'Avanzado',
    xpReward: 130,
    description:
      'Regresa a "Documentos", selecciona el archivo "Borrador.txt" y cámbiale el nombre a "Notas_Finales.txt".',
    goalSummary: 'Renombrar Borrador.txt → Notas_Finales.txt',
    hint: 'En Documentos toca una vez "Borrador.txt" para seleccionarlo, luego pulsa "Cambiar nombre" en la Barra de Comandos y escribe Notas_Finales.txt.',
    targetPathPreview: 'Documentos \\ Notas_Finales.txt',
    checkCompleted: (nodes) =>
      nodes.some(
        (n) =>
          n.parentId === 'root-docs' &&
          n.type === 'file' &&
          (normalizeName(n.name) === 'notas_finales.txt' || normalizeName(n.name) === 'notas_finales')
      ),
  },
];

export interface ShortcutPair {
  id: string;
  keys: string;
  action: string;
  category: string;
}

export const SHORTCUT_CHALLENGE_PAIRS: ShortcutPair[] = [
  { id: 'sc-1', keys: 'Ctrl + Shift + N', action: 'Crear una nueva carpeta al instante', category: 'Carpetas' },
  { id: 'sc-2', keys: 'Win + E', action: 'Abrir el Explorador de archivos', category: 'Navegación' },
  { id: 'sc-3', keys: 'F2', action: 'Cambiar el nombre a una carpeta o archivo', category: 'Edición' },
  { id: 'sc-4', keys: 'Ctrl + Z', action: 'Deshacer la última acción o error', category: 'Seguridad' },
  { id: 'sc-5', keys: 'Win + D', action: 'Mostrar u ocultar el Escritorio', category: 'Escritorio' },
  { id: 'sc-6', keys: 'Win + Z', action: 'Abrir los diseños de Snap Layouts', category: 'Ventanas' },
];
