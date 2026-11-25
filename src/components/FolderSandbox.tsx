import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowUp,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Folder,
  FolderOpen,
  FolderPlus,
  Image as ImageIcon,
  Lightbulb,
  Pencil,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { FOLDER_MISSIONS, INITIAL_SANDBOX_NODES } from '../data/anatomy';
import { VirtualNode } from '../types';

interface FolderSandboxProps {
  completedMissionIds: string[];
  onMissionComplete: (missionId: string, xpReward: number) => void;
}

const FORBIDDEN_CHARS_REGEX = /[\\/:*?"<>|]/;

export const FolderSandbox: React.FC<FolderSandboxProps> = ({
  completedMissionIds,
  onMissionComplete,
}) => {
  const [nodes, setNodes] = useState<VirtualNode[]>(INITIAL_SANDBOX_NODES);
  const [currentFolderId, setCurrentFolderId] = useState<string>('root-docs');
  const [history, setHistory] = useState<string[]>(['root-docs']);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Mission selection
  const [activeMissionIdx, setActiveMissionIdx] = useState<number>(() => {
    const firstIncomplete = FOLDER_MISSIONS.findIndex((m) => !completedMissionIds.includes(m.id));
    return firstIncomplete >= 0 ? firstIncomplete : 0;
  });
  const [showHint, setShowHint] = useState(false);

  // Modal input states for creating / renaming folders
  const [inputMode, setInputMode] = useState<'create' | 'rename' | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const activeMission = FOLDER_MISSIONS[activeMissionIdx];

  // Auto-check all missions whenever nodes change
  useEffect(() => {
    FOLDER_MISSIONS.forEach((mission) => {
      if (!completedMissionIds.includes(mission.id) && mission.checkCompleted(nodes)) {
        onMissionComplete(mission.id, mission.xpReward);
      }
    });
  }, [nodes, completedMissionIds, onMissionComplete]);

  const openCreateModal = useCallback(() => {
    setInputMode('create');
    setInputValue('');
    setErrorMessage(null);
  }, []);

  // Support real Windows shortcut Ctrl + Shift + N inside the simulator!
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        openCreateModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openCreateModal]);

  const currentChildren = useMemo(() => {
    return nodes
      .filter((n) => n.parentId === currentFolderId)
      .sort((a, b) => {
        if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
        return a.name.localeCompare(b.name, 'es');
      });
  }, [nodes, currentFolderId]);

  const breadcrumbChain = useMemo(() => {
    const chain: VirtualNode[] = [];
    let cursor = nodes.find((n) => n.id === currentFolderId);
    while (cursor) {
      chain.unshift(cursor);
      cursor = cursor.parentId ? nodes.find((n) => n.id === cursor?.parentId) : undefined;
    }
    return chain;
  }, [nodes, currentFolderId]);

  const navigateTo = (folderId: string) => {
    if (folderId === currentFolderId) return;
    setCurrentFolderId(folderId);
    setSelectedNodeId(null);
    setHistory((prev) => [...prev, folderId]);
    setStatusNotice(null);
  };

  const goBack = () => {
    if (history.length <= 1) return;
    const nextHistory = history.slice(0, -1);
    setHistory(nextHistory);
    setCurrentFolderId(nextHistory[nextHistory.length - 1]);
    setSelectedNodeId(null);
  };

  const goUp = () => {
    const current = nodes.find((n) => n.id === currentFolderId);
    if (current?.parentId) {
      navigateTo(current.parentId);
    }
  };

  const openRenameModal = () => {
    if (!selectedNodeId) return;
    const target = nodes.find((n) => n.id === selectedNodeId);
    if (!target || target.isSystem) return;
    setInputMode('rename');
    setInputValue(target.name);
    setErrorMessage(null);
  };

  const handleSubmitInput = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();

    if (!trimmed) {
      setErrorMessage('Escribe un nombre válido antes de confirmar.');
      return;
    }

    if (FORBIDDEN_CHARS_REGEX.test(trimmed)) {
      setErrorMessage(
        'Windows 11 no permite los símbolos \\ / : * ? " < > | en nombres de carpetas o archivos. Usa guiones (-) o guiones bajos (_).'
      );
      return;
    }

    const duplicate = nodes.some(
      (n) =>
        n.parentId === currentFolderId &&
        n.id !== (inputMode === 'rename' ? selectedNodeId : '') &&
        n.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (duplicate) {
      setErrorMessage(`Ya existe un elemento llamado "${trimmed}" dentro de esta misma carpeta.`);
      return;
    }

    if (inputMode === 'create') {
      const newFolder: VirtualNode = {
        id: `folder-${Date.now()}`,
        name: trimmed,
        type: 'folder',
        modifiedDate: 'Hoy',
        parentId: currentFolderId,
      };
      setNodes((prev) => [...prev, newFolder]);
      setSelectedNodeId(newFolder.id);
      setStatusNotice(`Carpeta "${trimmed}" creada dentro de ${breadcrumbChain[breadcrumbChain.length - 1]?.name}.`);
    } else if (inputMode === 'rename' && selectedNodeId) {
      setNodes((prev) =>
        prev.map((n) => (n.id === selectedNodeId ? { ...n, name: trimmed } : n))
      );
      setStatusNotice(`Elemento renombrado a "${trimmed}".`);
    }

    setInputMode(null);
    setInputValue('');
    setErrorMessage(null);
  };

  const handleDeleteSelected = () => {
    if (!selectedNodeId) return;
    const target = nodes.find((n) => n.id === selectedNodeId);
    if (!target || target.isSystem) return;

    // Collect target + all nested descendants
    const idsToRemove = new Set<string>([selectedNodeId]);
    let added = true;
    while (added) {
      added = false;
      nodes.forEach((n) => {
        if (n.parentId && idsToRemove.has(n.parentId) && !idsToRemove.has(n.id)) {
          idsToRemove.add(n.id);
          added = true;
        }
      });
    }

    setNodes((prev) => prev.filter((n) => !idsToRemove.has(n.id)));
    setSelectedNodeId(null);
    setStatusNotice(`"${target.name}" se envió a la Papelera de reciclaje.`);
  };

  const handleResetSandbox = () => {
    setNodes(INITIAL_SANDBOX_NODES);
    setCurrentFolderId('root-docs');
    setHistory(['root-docs']);
    setSelectedNodeId(null);
    setStatusNotice('Simulador restaurado al estado inicial.');
  };

  const renderTree = (parentId: string | null, depth = 0): React.ReactNode => {
    const folders = nodes
      .filter((n) => n.type === 'folder' && n.parentId === parentId)
      .sort((a, b) => a.name.localeCompare(b.name, 'es'));

    return folders.map((folder) => {
      const isCurrent = folder.id === currentFolderId;
      const children = nodes.filter((n) => n.type === 'folder' && n.parentId === folder.id);
      return (
        <div key={folder.id}>
          <button
            type="button"
            onClick={() => navigateTo(folder.id)}
            style={{ paddingLeft: `${depth * 14 + 8}px` }}
            className={`w-full flex items-center gap-2 py-2 pr-2 rounded-lg text-xs text-left transition-colors min-h-[36px] ${
              isCurrent
                ? 'bg-[#EBF4FC] dark:bg-sky-950/70 text-[#0067C0] dark:text-sky-300 font-semibold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {isCurrent ? (
              <FolderOpen className="w-4 h-4 text-amber-500 shrink-0" />
            ) : (
              <Folder className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            <span className="truncate">{folder.name}</span>
          </button>
          {children.length > 0 && renderTree(folder.id, depth + 1)}
        </div>
      );
    });
  };

  const missionIsDone = completedMissionIds.includes(activeMission.id);
  const currentNode = nodes.find((n) => n.id === currentFolderId);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Taller Interactivo: Carpetas y Subcarpetas
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5 tabular-nums">
            {completedMissionIds.length} de {FOLDER_MISSIONS.length} misiones guiadas completadas · Atajo real: Ctrl + Shift + N
          </p>
        </div>
        <button
          type="button"
          onClick={handleResetSandbox}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors self-start min-h-[40px] whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reiniciar carpetas
        </button>
      </div>

      {/* Mission Bar */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {FOLDER_MISSIONS.map((mission, idx) => {
            const done = completedMissionIds.includes(mission.id);
            const selected = idx === activeMissionIdx;
            return (
              <button
                key={mission.id}
                type="button"
                onClick={() => {
                  setActiveMissionIdx(idx);
                  setShowHint(false);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap min-h-[40px] shrink-0 ${
                  selected
                    ? 'bg-[#0067C0] text-white'
                    : done
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {done && <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>Misión {mission.number}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Nivel {activeMission.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">+{activeMission.xpReward} XP</span>
              {missionIsDone && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completada
                  </span>
                </>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {activeMission.number}. {activeMission.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{activeMission.description}</p>
            <p className="text-xs font-mono text-[#0067C0] dark:text-sky-400 pt-0.5">
              Ruta objetivo: {activeMission.targetPathPreview}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowHint((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors min-h-[44px] whitespace-nowrap"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              {showHint ? 'Ocultar pista' : 'Ver pista'}
            </button>
            {missionIsDone && activeMissionIdx < FOLDER_MISSIONS.length - 1 && (
              <button
                type="button"
                onClick={() => {
                  setActiveMissionIdx((prev) => prev + 1);
                  setShowHint(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors min-h-[44px] whitespace-nowrap"
              >
                Siguiente misión
              </button>
            )}
          </div>
        </div>

        {showHint && (
          <div className="rounded-xl bg-[#F4F7FB] dark:bg-slate-800/80 p-3.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold text-slate-900 dark:text-white">Pista paso a paso: </span>
            {activeMission.hint}
          </div>
        )}
      </div>

      {/* Interactive Windows 11 File Explorer Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Simulated Top Navigation & Breadcrumb Address Bar */}
          <div className="flex flex-wrap items-center gap-2 p-2.5 bg-[#F7F9FC] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goBack}
                disabled={history.length <= 1}
                aria-label="Atrás"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800 disabled:opacity-35 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goUp}
                disabled={!currentNode?.parentId}
                aria-label="Subir un nivel"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800 disabled:opacity-35 transition-colors"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            {/* Clickable Breadcrumbs */}
            <div className="flex-1 min-w-[200px] flex items-center flex-wrap gap-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-slate-400">Este equipo</span>
              {breadcrumbChain.map((crumb) => (
                <React.Fragment key={crumb.id}>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <button
                    type="button"
                    onClick={() => navigateTo(crumb.id)}
                    className={`px-1.5 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                      crumb.id === currentFolderId
                        ? 'font-bold text-[#0067C0] dark:text-sky-400'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {crumb.name}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Command Bar */}
          <div className="flex flex-wrap items-center gap-2 p-2.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0067C0] text-white text-xs font-semibold hover:bg-[#0056A3] active:scale-[0.98] transition-all min-h-[44px]"
            >
              <FolderPlus className="w-4 h-4" />
              Nueva carpeta
            </button>

            <button
              type="button"
              onClick={openRenameModal}
              disabled={!selectedNodeId}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors min-h-[44px]"
            >
              <Pencil className="w-3.5 h-3.5" />
              Cambiar nombre
            </button>

            <button
              type="button"
              onClick={handleDeleteSelected}
              disabled={!selectedNodeId}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 disabled:opacity-40 transition-colors min-h-[44px]"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Eliminar
            </button>
          </div>

          {/* Inline Create / Rename Bar */}
          {inputMode && (
            <form
              onSubmit={handleSubmitInput}
              className="p-3.5 bg-[#EBF4FC] dark:bg-sky-950/40 border-b border-sky-200 dark:border-sky-900 space-y-2.5"
            >
              <label
                htmlFor="sandbox-folder-name"
                className="block text-xs font-semibold text-slate-900 dark:text-white"
              >
                {inputMode === 'create'
                  ? `Nueva carpeta dentro de "${breadcrumbChain[breadcrumbChain.length - 1]?.name}"`
                  : 'Escribe el nuevo nombre'}
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="sandbox-folder-name"
                  type="text"
                  autoFocus
                  placeholder={inputMode === 'create' ? 'Ej. Estudios, Matemáticas, 2026...' : 'Nuevo nombre'}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setErrorMessage(null);
                  }}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0067C0] min-h-[44px]"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#0067C0] text-white text-xs font-semibold hover:bg-[#0056A3] min-h-[44px]"
                  >
                    {inputMode === 'create' ? 'Crear' : 'Guardar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputMode(null);
                      setErrorMessage(null);
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 min-h-[44px]"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
              {errorMessage && (
                <div className="flex items-start gap-2 text-xs text-rose-700 dark:text-rose-400 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          )}

          {/* Explorer Body: Quick Locations + Current Folder Content */}
          <div className="grid grid-cols-1 sm:grid-cols-12 min-h-[290px] divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800">
            {/* Quick Sidebar */}
            <div className="sm:col-span-4 p-2.5 space-y-1 bg-slate-50/60 dark:bg-slate-950/30">
              <p className="px-2 py-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Acceso rápido
              </p>
              {[
                { id: 'root-docs', label: 'Documentos', icon: FileText },
                { id: 'root-pics', label: 'Imágenes', icon: ImageIcon },
                { id: 'root-downloads', label: 'Descargas', icon: Download },
              ].map((loc) => {
                const Icon = loc.icon;
                const active = currentFolderId === loc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => navigateTo(loc.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors min-h-[40px] ${
                      active
                        ? 'bg-[#EBF4FC] dark:bg-sky-950/70 text-[#0067C0] dark:text-sky-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{loc.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Folder Contents */}
            <div className="sm:col-span-8 p-3 space-y-2">
              {currentChildren.length === 0 ? (
                <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <FolderOpen className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Esta carpeta está vacía
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                    Toca <span className="font-semibold text-[#0067C0] dark:text-sky-400">Nueva carpeta</span> arriba para crear una subcarpeta aquí adentro.
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {currentChildren.map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    return (
                      <div
                        key={node.id}
                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border transition-colors min-h-[52px] ${
                          isSelected
                            ? 'bg-[#EBF4FC] dark:bg-sky-950/50 border-[#0067C0]/40 dark:border-sky-700'
                            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/70'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedNodeId(node.id)}
                          onDoubleClick={() => {
                            if (node.type === 'folder') navigateTo(node.id);
                          }}
                          className="flex-1 flex items-center gap-3 text-left min-w-0 py-1"
                        >
                          {node.type === 'folder' ? (
                            <Folder className="w-5 h-5 text-amber-500 fill-amber-400/40 shrink-0" />
                          ) : (
                            <FileText className="w-5 h-5 text-[#0067C0] dark:text-sky-400 shrink-0" />
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                              {node.name}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {node.type === 'folder'
                                ? 'Carpeta de archivos'
                                : `Archivo ${node.extension?.toUpperCase() ?? ''} · ${node.sizeLabel ?? ''}`}
                            </p>
                          </div>
                        </button>

                        {node.type === 'folder' && (
                          <button
                            type="button"
                            onClick={() => navigateTo(node.id)}
                            className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-[#0067C0] dark:text-sky-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap min-h-[38px]"
                          >
                            Abrir
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#F7F9FC] dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            <span>
              {currentChildren.length} {currentChildren.length === 1 ? 'elemento' : 'elementos'}
              {selectedNodeId ? ' · 1 seleccionado' : ''}
            </span>
            {statusNotice && (
              <span className="text-[#0067C0] dark:text-sky-400 font-medium">{statusNotice}</span>
            )}
          </div>
        </div>

        {/* Live Hierarchical Folder Tree Card */}
        <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Árbol de carpetas y subcarpetas en vivo
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Observa cómo se anida tu estructura al crear carpetas. Toca cualquiera para navegar a ella.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 p-2.5 max-h-[320px] overflow-y-auto space-y-0.5">
            {renderTree(null, 0)}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Ruta completa actual en Windows 11:
            </p>
            <p className="font-mono text-xs text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg break-all">
              C:\Usuarios\Estudiante\{breadcrumbChain.map((c) => c.name).join('\\')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
