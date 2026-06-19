import { useCallback, useEffect, useState } from "react";
import {
  ChevronRight,
  GripVertical,
  Loader2,
  MoreVertical,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiRequest } from "@/lib/api-client";
import { cn } from "@/lib/utils";

type Page<T> = { items: T[]; total: number; limit: number; offset: number };

type NavigationMenuResponse = {
  id: string;
  organization_id: string;
  key: string;
  name: string;
  locale: string | null;
  created_at: string;
};

type NavigationItemResponse = {
  id: string;
  menu_id: string;
  parent_id: string | null;
  label: string;
  url: string | null;
  entry_id: string | null;
  target: string | null;
  order_index: number;
  metadata: Record<string, unknown>;
  created_at: string;
};

type NavigationItemTree = NavigationItemResponse & {
  children: NavigationItemTree[];
};

type NavigationMenuTreeResponse = {
  menu: NavigationMenuResponse;
  items: NavigationItemTree[];
};

type FlatItem = NavigationItemTree & { depth: number };

const MENU_KEY_PATTERN = /^[a-z0-9][a-z0-9_-]*$/;

function navIdOf(item: NavigationItemResponse): string {
  const navId = item.metadata?.navId;
  return typeof navId === "string" ? navId : "";
}

function flattenTree(items: NavigationItemTree[], depth = 0): FlatItem[] {
  return items.flatMap((item) => [{ ...item, depth }, ...flattenTree(item.children, depth + 1)]);
}

// Reorder a sibling group (all nodes sharing `parentId`) to match `orderedIds`,
// reassigning their order_index. Other branches of the tree are left untouched.
function applyOrder(nodes: NavigationItemTree[], orderedIds: string[]): NavigationItemTree[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return orderedIds.flatMap((id, index) => {
    const node = byId.get(id);
    return node ? [{ ...node, order_index: index }] : [];
  });
}

function reorderTree(
  nodes: NavigationItemTree[],
  parentId: string | null,
  orderedIds: string[],
): NavigationItemTree[] {
  if (parentId === null) return applyOrder(nodes, orderedIds);
  return nodes.map((node) =>
    node.id === parentId
      ? { ...node, children: applyOrder(node.children, orderedIds) }
      : { ...node, children: reorderTree(node.children, parentId, orderedIds) },
  );
}

type ItemDraft = {
  label: string;
  url: string;
  target: string;
  navId: string;
  parentId: string;
  orderIndex: string;
};

const EMPTY_DRAFT: ItemDraft = {
  label: "",
  url: "",
  target: "_self",
  navId: "",
  parentId: "",
  orderIndex: "0",
};

export function NavigationView({
  onError,
}: {
  onError: (err: unknown, fallback?: string) => void;
}) {
  const [menus, setMenus] = useState<NavigationMenuResponse[]>([]);
  const [loadingMenus, setLoadingMenus] = useState(true);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [tree, setTree] = useState<NavigationMenuTreeResponse | null>(null);
  const [loadingTree, setLoadingTree] = useState(false);

  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [menuKey, setMenuKey] = useState("");
  const [menuName, setMenuName] = useState("");
  const [menuLocale, setMenuLocale] = useState("");
  const [savingMenu, setSavingMenu] = useState(false);

  const [pendingMenuDelete, setPendingMenuDelete] = useState<NavigationMenuResponse | null>(null);

  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationItemResponse | null>(null);
  const [draft, setDraft] = useState<ItemDraft>(EMPTY_DRAFT);
  const [savingItem, setSavingItem] = useState(false);
  const [pendingItemDelete, setPendingItemDelete] = useState<NavigationItemResponse | null>(null);

  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const loadMenus = useCallback(async () => {
    setLoadingMenus(true);
    try {
      const page = await apiRequest<Page<NavigationMenuResponse>>(
        "/api/v1/cms/navigation-menus?limit=200",
      );
      setMenus(page.items);
      setSelectedMenuId((current) => current ?? page.items[0]?.id ?? null);
    } catch (err) {
      onError(err, "Unable to load navigation menus");
    } finally {
      setLoadingMenus(false);
    }
  }, [onError]);

  const loadTree = useCallback(
    async (menuId: string) => {
      setLoadingTree(true);
      try {
        const data = await apiRequest<NavigationMenuTreeResponse>(
          `/api/v1/cms/navigation-menus/${menuId}/tree`,
        );
        setTree(data);
      } catch (err) {
        onError(err, "Unable to load menu items");
      } finally {
        setLoadingTree(false);
      }
    },
    [onError],
  );

  useEffect(() => {
    void loadMenus();
  }, [loadMenus]);

  useEffect(() => {
    if (selectedMenuId) void loadTree(selectedMenuId);
    else setTree(null);
  }, [selectedMenuId, loadTree]);

  const openCreateMenu = () => {
    setMenuKey("");
    setMenuName("");
    setMenuLocale("");
    setCreateMenuOpen(true);
  };

  const createMenu = async () => {
    const key = menuKey.trim();
    const name = menuName.trim();
    if (!MENU_KEY_PATTERN.test(key) || !name) return;
    setSavingMenu(true);
    try {
      const next = await apiRequest<NavigationMenuResponse>("/api/v1/cms/navigation-menus", {
        method: "POST",
        body: JSON.stringify({
          key,
          name,
          locale: menuLocale.trim() || null,
        }),
      });
      setMenus((current) => [next, ...current]);
      setSelectedMenuId(next.id);
      setCreateMenuOpen(false);
    } catch (err) {
      onError(err, "Unable to create navigation menu");
    } finally {
      setSavingMenu(false);
    }
  };

  const deleteMenu = async () => {
    if (!pendingMenuDelete) return;
    try {
      await apiRequest<void>(`/api/v1/cms/navigation-menus/${pendingMenuDelete.id}`, {
        method: "DELETE",
      });
      const remaining = menus.filter((menu) => menu.id !== pendingMenuDelete.id);
      setMenus(remaining);
      if (selectedMenuId === pendingMenuDelete.id) {
        setSelectedMenuId(remaining[0]?.id ?? null);
      }
      setPendingMenuDelete(null);
    } catch (err) {
      onError(err, "Unable to delete navigation menu");
    }
  };

  const items = tree ? flattenTree(tree.items) : [];

  const reorderItems = async (target: FlatItem) => {
    const dragged = items.find((item) => item.id === dragId) ?? null;
    setDragId(null);
    setDragOverId(null);
    if (!dragged || dragged.id === target.id || !tree || !selectedMenuId) return;
    // Reordering is only allowed within a sibling group (same parent).
    const parentId = dragged.parent_id ?? null;
    if (parentId !== (target.parent_id ?? null)) return;

    const orderedIds = items
      .filter((item) => (item.parent_id ?? null) === parentId && item.id !== dragged.id)
      .map((item) => item.id);
    const targetIndex = orderedIds.indexOf(target.id);
    if (targetIndex === -1) return;
    orderedIds.splice(targetIndex, 0, dragged.id);

    // Optimistic update, then persist the new order_index of each sibling.
    setTree({ ...tree, items: reorderTree(tree.items, parentId, orderedIds) });
    try {
      await Promise.all(
        orderedIds.map((id, index) =>
          apiRequest<NavigationItemResponse>(`/api/v1/cms/navigation-items/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ order_index: index }),
          }),
        ),
      );
    } catch (err) {
      onError(err, "Unable to reorder items");
    } finally {
      await loadTree(selectedMenuId);
    }
  };

  const openCreateItem = () => {
    setEditingItem(null);
    setDraft({ ...EMPTY_DRAFT, orderIndex: String(items.length) });
    setItemDialogOpen(true);
  };

  const openEditItem = (item: NavigationItemResponse) => {
    setEditingItem(item);
    setDraft({
      label: item.label,
      url: item.url ?? "",
      target: item.target ?? "_self",
      navId: navIdOf(item),
      parentId: item.parent_id ?? "",
      orderIndex: String(item.order_index),
    });
    setItemDialogOpen(true);
  };

  const saveItem = async () => {
    if (!selectedMenuId) return;
    const label = draft.label.trim();
    if (!label) return;
    setSavingItem(true);
    const metadata = draft.navId.trim() ? { navId: draft.navId.trim() } : {};
    const body = {
      label,
      url: draft.url.trim() || null,
      target: draft.target || "_self",
      parent_id: draft.parentId || null,
      order_index: Number.parseInt(draft.orderIndex, 10) || 0,
      metadata,
    };
    try {
      if (editingItem) {
        await apiRequest<NavigationItemResponse>(`/api/v1/cms/navigation-items/${editingItem.id}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        });
      } else {
        await apiRequest<NavigationItemResponse>(
          `/api/v1/cms/navigation-menus/${selectedMenuId}/items`,
          { method: "POST", body: JSON.stringify(body) },
        );
      }
      setItemDialogOpen(false);
      await loadTree(selectedMenuId);
    } catch (err) {
      onError(err, "Unable to save navigation item");
    } finally {
      setSavingItem(false);
    }
  };

  const deleteItem = async () => {
    if (!pendingItemDelete || !selectedMenuId) return;
    try {
      await apiRequest<void>(`/api/v1/cms/navigation-items/${pendingItemDelete.id}`, {
        method: "DELETE",
      });
      setPendingItemDelete(null);
      await loadTree(selectedMenuId);
    } catch (err) {
      onError(err, "Unable to delete navigation item");
    }
  };

  // Candidate parents = every item except the one being edited (avoid self-parenting).
  const parentOptions = items.filter((item) => item.id !== editingItem?.id);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Navigation</h1>
          <p className="mt-1 text-muted-foreground">
            Manage header and footer menus delivered to the website via the CMS API.
          </p>
        </div>
        <Button className="rounded-lg bg-indigo-600 hover:bg-indigo-700" onClick={openCreateMenu}>
          <Plus className="mr-1.5 h-4 w-4" /> Create menu
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Menu list */}
        <div className="space-y-1.5 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5">
          {loadingMenus ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full rounded-lg" />
            ))
          ) : menus.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">No menus yet.</p>
          ) : (
            menus.map((menu) => {
              const isActive = menu.id === selectedMenuId;
              return (
                <button
                  key={menu.id}
                  onClick={() => setSelectedMenuId(menu.id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition",
                    isActive
                      ? "bg-indigo-50 font-semibold text-indigo-700"
                      : "text-foreground/80 hover:bg-slate-50",
                  )}
                >
                  <span className="min-w-0 truncate text-left">
                    {menu.name}
                    <span className="ml-1.5 font-mono text-xs text-muted-foreground">
                      {menu.key}
                      {menu.locale ? `·${menu.locale}` : ""}
                    </span>
                  </span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isActive ? "text-indigo-600" : "text-muted-foreground",
                    )}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Items */}
        <div className="space-y-4">
          {selectedMenuId && tree ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold">{tree.menu.name}</h2>
                  <p className="font-mono text-xs text-muted-foreground">
                    {tree.menu.key}
                    {tree.menu.locale ? ` · ${tree.menu.locale}` : " · default"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-lg" onClick={openCreateItem}>
                    <Plus className="mr-1.5 h-4 w-4" /> Add item
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-lg text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                    onClick={() => setPendingMenuDelete(tree.menu)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                {loadingTree ? (
                  <div className="space-y-2 p-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton key={index} className="h-12 w-full rounded-lg" />
                    ))}
                  </div>
                ) : items.length === 0 ? (
                  <p className="px-6 py-10 text-center text-sm text-muted-foreground">
                    No items in this menu yet. Add one to get started.
                  </p>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50/60"
                        style={{ paddingLeft: 16 + item.depth * 20 }}
                      >
                        <GripVertical className="h-4 w-4 shrink-0 text-slate-300" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{item.label}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {item.url || "(no link)"}
                            {navIdOf(item) ? ` · navId: ${navIdOf(item)}` : ""}
                            {item.target && item.target !== "_self" ? ` · ${item.target}` : ""}
                          </p>
                        </div>
                        <span className="shrink-0 font-mono text-xs text-muted-foreground">
                          #{item.order_index}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Item actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-36">
                            <DropdownMenuItem onClick={() => openEditItem(item)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-rose-600 focus:bg-rose-50 focus:text-rose-700"
                              onClick={() => setPendingItemDelete(item)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          ) : (
            <div className="rounded-2xl bg-white px-6 py-16 text-center text-sm text-muted-foreground shadow-sm ring-1 ring-black/5">
              {loadingMenus ? "Loading…" : "Select a menu or create one to manage its items."}
            </div>
          )}
        </div>
      </div>

      {/* Create menu dialog */}
      <Dialog open={createMenuOpen} onOpenChange={setCreateMenuOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create navigation menu</DialogTitle>
            <DialogDescription>
              Use a stable key (e.g. <span className="font-mono">main-header</span>) — the website
              fetches the menu by this key.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="menu-key">Key</Label>
              <Input
                id="menu-key"
                value={menuKey}
                onChange={(event) => setMenuKey(event.target.value)}
                placeholder="main-header"
                className="font-mono"
              />
              {menuKey && !MENU_KEY_PATTERN.test(menuKey.trim()) ? (
                <p className="text-xs text-rose-600">
                  Lowercase letters, numbers, hyphens and underscores only.
                </p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="menu-name">Name</Label>
              <Input
                id="menu-name"
                value={menuName}
                onChange={(event) => setMenuName(event.target.value)}
                placeholder="Main Header"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="menu-locale">Locale (optional)</Label>
              <Input
                id="menu-locale"
                value={menuLocale}
                onChange={(event) => setMenuLocale(event.target.value)}
                placeholder="Leave empty for the default menu"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateMenuOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={savingMenu || !MENU_KEY_PATTERN.test(menuKey.trim()) || !menuName.trim()}
              onClick={createMenu}
            >
              {savingMenu ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create / edit item dialog */}
      <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit item" : "Add item"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="item-label">Label</Label>
              <Input
                id="item-label"
                value={draft.label}
                onChange={(event) => setDraft((d) => ({ ...d, label: event.target.value }))}
                placeholder="Products"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="item-url">URL</Label>
              <Input
                id="item-url"
                value={draft.url}
                onChange={(event) => setDraft((d) => ({ ...d, url: event.target.value }))}
                placeholder="/products"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="item-navid">navId (active highlight)</Label>
                <Input
                  id="item-navid"
                  value={draft.navId}
                  onChange={(event) => setDraft((d) => ({ ...d, navId: event.target.value }))}
                  placeholder="products"
                  className="font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="item-order">Order</Label>
                <Input
                  id="item-order"
                  type="number"
                  value={draft.orderIndex}
                  onChange={(event) => setDraft((d) => ({ ...d, orderIndex: event.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Target</Label>
                <Select
                  value={draft.target}
                  onValueChange={(value) => setDraft((d) => ({ ...d, target: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_self">Same tab (_self)</SelectItem>
                    <SelectItem value="_blank">New tab (_blank)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Parent</Label>
                <Select
                  value={draft.parentId || "none"}
                  onValueChange={(value) =>
                    setDraft((d) => ({ ...d, parentId: value === "none" ? "" : value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="None (top level)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (top level)</SelectItem>
                    {parentOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={savingItem || !draft.label.trim()}
              onClick={saveItem}
            >
              {savingItem ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              {editingItem ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete menu confirm */}
      <AlertDialog
        open={Boolean(pendingMenuDelete)}
        onOpenChange={(open) => !open && setPendingMenuDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this menu?</AlertDialogTitle>
            <AlertDialogDescription>
              “{pendingMenuDelete?.name}” and all of its items will be permanently removed. The
              website will fall back to its static links.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-rose-600 hover:bg-rose-700" onClick={deleteMenu}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete item confirm */}
      <AlertDialog
        open={Boolean(pendingItemDelete)}
        onOpenChange={(open) => !open && setPendingItemDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this item?</AlertDialogTitle>
            <AlertDialogDescription>
              “{pendingItemDelete?.label}” will be removed from the menu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-rose-600 hover:bg-rose-700" onClick={deleteItem}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
