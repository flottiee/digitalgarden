
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const AddToHome: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/add-to-home/AddToHome.vue")['default']
export const Avatar: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/Avatar.vue")['default']
export const AvatarBadge: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarBadge.vue")['default']
export const AvatarFallback: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarFallback.vue")['default']
export const AvatarGroup: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarGroup.vue")['default']
export const AvatarGroupCount: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarGroupCount.vue")['default']
export const AvatarImage: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarImage.vue")['default']
export const AvatarWithIcon: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarWithIcon.vue")['default']
export const BitbucketAvatar: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/BitbucketAvatar.vue")['default']
export const GitHubAvatar: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/GitHubAvatar.vue")['default']
export const GitLabAvatar: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/GitLabAvatar.vue")['default']
export const Badge: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/badge/Badge.vue")['default']
export const Banner: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/banner/Banner.vue")['default']
export const Breadcrumb: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/breadcrumbs/Breadcrumb.vue")['default']
export const BreadcrumbItem: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/breadcrumbs/BreadcrumbItem.vue")['default']
export const Button: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/button/Button.vue")['default']
export const ButtonLink: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/button/ButtonLink.vue")['default']
export const CustomButton: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/button/CustomButton.vue")['default']
export const Calendar: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/calendar/Calendar.vue")['default']
export const Card: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/Card.vue")['default']
export const CardAction: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardAction.vue")['default']
export const CardContent: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardContent.vue")['default']
export const CardDescription: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardDescription.vue")['default']
export const CardFooter: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardFooter.vue")['default']
export const CardHeader: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardHeader.vue")['default']
export const CardTitle: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardTitle.vue")['default']
export const Checkbox: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/checkbox/Checkbox.vue")['default']
export const CodeBlock: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/code-block/CodeBlock.vue")['default']
export const Collapse: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/collapse/Collapse.vue")['default']
export const CollapseGroup: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/collapse/CollapseGroup.vue")['default']
export const Combobox: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/combobox/Combobox.vue")['default']
export const ComboboxInput: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/combobox/ComboboxInput.vue")['default']
export const ComboboxList: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/combobox/ComboboxList.vue")['default']
export const ComboboxOption: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/combobox/ComboboxOption.vue")['default']
export const ContextCard: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-card/ContextCard.vue")['default']
export const ContextCardContent: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-card/ContextCardContent.vue")['default']
export const ContextCardTrigger: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-card/ContextCardTrigger.vue")['default']
export const ContextMenu: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenu.vue")['default']
export const ContextMenuContent: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenuContent.vue")['default']
export const ContextMenuItem: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenuItem.vue")['default']
export const ContextMenuTrigger: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenuTrigger.vue")['default']
export const CopyButton: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/copy-button/CopyButton.vue")['default']
export const Drawer: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/drawer/Drawer.vue")['default']
export const DrawerTitle: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/drawer/DrawerTitle.vue")['default']
export const EmptyState: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/empty-state/EmptyState.vue")['default']
export const EmptyStateIcon: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/empty-state/EmptyStateIcon.vue")['default']
export const Entity: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/entity/Entity.vue")['default']
export const EntityContent: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/entity/EntityContent.vue")['default']
export const EntityList: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/entity/EntityList.vue")['default']
export const HesoyamError: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/error/HesoyamError.vue")['default']
export const DisabledWall: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/DisabledWall.vue")['default']
export const ErrorText: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/ErrorText.vue")['default']
export const Fieldset: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/Fieldset.vue")['default']
export const FieldsetContent: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetContent.vue")['default']
export const FieldsetFooter: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooter.vue")['default']
export const FieldsetFooterAction: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooterAction.vue")['default']
export const FieldsetFooterActions: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooterActions.vue")['default']
export const FieldsetFooterStatus: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooterStatus.vue")['default']
export const FieldsetSubtitle: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetSubtitle.vue")['default']
export const FieldsetTitle: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetTitle.vue")['default']
export const WarningText: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/WarningText.vue")['default']
export const File: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/file-tree/File.vue")['default']
export const Folder: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/file-tree/Folder.vue")['default']
export const Tree: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/file-tree/Tree.vue")['default']
export const Gauge: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/gauge/Gauge.vue")['default']
export const Grid: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/grid/Grid.vue")['default']
export const GridCell: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridCell.vue")['default']
export const GridCross: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridCross.vue")['default']
export const GridPage: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridPage.vue")['default']
export const GridSystem: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridSystem.vue")['default']
export const IconTile: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/icon-tile/IconTile.vue")['default']
export const Input: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/input/Input.vue")['default']
export const Kbd: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/keyboard-input/Kbd.vue")['default']
export const Label: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/label/Label.vue")['default']
export const LoadingDots: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/loading-dots/LoadingDots.vue")['default']
export const Marquee: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/marquee/Marquee.vue")['default']
export const Menu: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/Menu.vue")['default']
export const MenuButton: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuButton.vue")['default']
export const MenuContainer: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuContainer.vue")['default']
export const MenuDivider: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuDivider.vue")['default']
export const MenuItem: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuItem.vue")['default']
export const MenuItemLocked: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuItemLocked.vue")['default']
export const MenuLink: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuLink.vue")['default']
export const MenuSection: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuSection.vue")['default']
export const Modal: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/Modal.vue")['default']
export const ModalAction: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalAction.vue")['default']
export const ModalActions: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalActions.vue")['default']
export const ModalBody: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalBody.vue")['default']
export const ModalHeader: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalHeader.vue")['default']
export const ModalInset: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalInset.vue")['default']
export const ModalSubtitle: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalSubtitle.vue")['default']
export const ModalTitle: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalTitle.vue")['default']
export const MultiSelectContent: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectContent.vue")['default']
export const MultiSelectRoot: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectRoot.vue")['default']
export const MultiSelectRow: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectRow.vue")['default']
export const MultiSelectTrigger: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectTrigger.vue")['default']
export const Note: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/note/Note.vue")['default']
export const NoteAction: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/note/NoteAction.vue")['default']
export const NoteContent: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/note/NoteContent.vue")['default']
export const NoteLabel: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/note/NoteLabel.vue")['default']
export const Pagination: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/pagination/Pagination.vue")['default']
export const Progress: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/progress/Progress.vue")['default']
export const Radio: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/radio/Radio.vue")['default']
export const RadioGroup: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/radio/RadioGroup.vue")['default']
export const RadioGroupItem: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/radio/RadioGroupItem.vue")['default']
export const Scroller: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/scroller/Scroller.vue")['default']
export const SearchInput: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/search-input/SearchInput.vue")['default']
export const Select: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/select/Select.vue")['default']
export const Separator: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/separator/Separator.vue")['default']
export const Sheet: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/Sheet.vue")['default']
export const SheetClose: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetClose.vue")['default']
export const SheetContent: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetContent.vue")['default']
export const SheetDescription: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetDescription.vue")['default']
export const SheetFooter: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetFooter.vue")['default']
export const SheetHeader: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetHeader.vue")['default']
export const SheetOverlay: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetOverlay.vue")['default']
export const SheetTitle: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetTitle.vue")['default']
export const SheetTrigger: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetTrigger.vue")['default']
export const ShowMore: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/show-more/ShowMore.vue")['default']
export const Sidebar: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/Sidebar.vue")['default']
export const SidebarContent: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarContent.vue")['default']
export const SidebarFooter: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarFooter.vue")['default']
export const SidebarGroup: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroup.vue")['default']
export const SidebarGroupAction: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroupAction.vue")['default']
export const SidebarGroupContent: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroupContent.vue")['default']
export const SidebarGroupLabel: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroupLabel.vue")['default']
export const SidebarHeader: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarHeader.vue")['default']
export const SidebarInput: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarInput.vue")['default']
export const SidebarInset: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarInset.vue")['default']
export const SidebarMenu: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenu.vue")['default']
export const SidebarMenuAction: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuAction.vue")['default']
export const SidebarMenuBadge: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuBadge.vue")['default']
export const SidebarMenuButton: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuButton.vue")['default']
export const SidebarMenuButtonChild: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuButtonChild.vue")['default']
export const SidebarMenuItem: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuItem.vue")['default']
export const SidebarMenuSkeleton: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSkeleton.vue")['default']
export const SidebarMenuSub: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSub.vue")['default']
export const SidebarMenuSubButton: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSubButton.vue")['default']
export const SidebarMenuSubItem: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSubItem.vue")['default']
export const SidebarProvider: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarProvider.vue")['default']
export const SidebarRail: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarRail.vue")['default']
export const SidebarSeparator: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarSeparator.vue")['default']
export const SidebarTrigger: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarTrigger.vue")['default']
export const Skeleton: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/skeleton/Skeleton.vue")['default']
export const Slider: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/slider/Slider.vue")['default']
export const Snippet: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/snippet/Snippet.vue")['default']
export const Spinner: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/spinner/Spinner.vue")['default']
export const SplitButton: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/split-button/SplitButton.vue")['default']
export const SplitButtonMenuItem: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/split-button/SplitButtonMenuItem.vue")['default']
export const Switch: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/switch/Switch.vue")['default']
export const SwitchControl: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/switch/SwitchControl.vue")['default']
export const Table: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/Table.vue")['default']
export const TableBody: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableBody.vue")['default']
export const TableCell: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableCell.vue")['default']
export const TableCol: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableCol.vue")['default']
export const TableColgroup: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableColgroup.vue")['default']
export const TableFooter: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableFooter.vue")['default']
export const TableHead: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableHead.vue")['default']
export const TableHeader: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableHeader.vue")['default']
export const TableRoot: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableRoot.vue")['default']
export const TableRow: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableRow.vue")['default']
export const Tabs: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/tabs/Tabs.vue")['default']
export const Textarea: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/textarea/Textarea.vue")['default']
export const TextareaMarkdown: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/textarea/TextareaMarkdown.vue")['default']
export const ThemeSwitcher: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/theme-switcher/ThemeSwitcher.vue")['default']
export const Toast: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/toast/Toast.vue")['default']
export const Toaster: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/toast/Toaster.vue")['default']
export const Toggle: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/toggle/Toggle.vue")['default']
export const Tooltip: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/Tooltip.vue")['default']
export const TooltipContent: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipContent.vue")['default']
export const TooltipProvider: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipProvider.vue")['default']
export const TooltipTrigger: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipTrigger.vue")['default']
export const Video: typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/video/Video.vue")['default']
/**
 * Displays the welcome screen used by new Nuxt projects.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
 */
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
/**
 * Renders the selected layout around pages or error content.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
 */
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
/**
 * Catches client-side errors from its default slot and renders an error slot.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
 */
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
/**
 * Renders its default slot only on the client, with an optional server fallback.
 *
 * @see https://nuxt.com/docs/4.x/api/components/client-only
 */
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
/**
 * Renders its content only during development.
 *
 * @see https://nuxt.com/docs/4.x/api/components/dev-only
 */
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
/**
 * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
 */
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
/**
 * Displays a progress bar during page navigation.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
 */
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
/**
 * Formats dates and times consistently across server and client using the user's locale.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
 */
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
/**
 * Announces route changes to assistive technologies using the current page title.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
 */
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
/**
 * Announces dynamic content changes to assistive technologies.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
 */
export const NuxtAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
/**
 * Renders an optimized image through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
 */
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
/**
 * Renders responsive optimized images through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
 */
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
/**
 * Renders the current page from the `pages/` directory.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
 */
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
/**
 * Renders a non-interactive server component without shipping client-side JavaScript.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
 */
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyAddToHome: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/add-to-home/AddToHome.vue")['default']>
export const LazyAvatar: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/Avatar.vue")['default']>
export const LazyAvatarBadge: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarBadge.vue")['default']>
export const LazyAvatarFallback: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarFallback.vue")['default']>
export const LazyAvatarGroup: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarGroup.vue")['default']>
export const LazyAvatarGroupCount: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarGroupCount.vue")['default']>
export const LazyAvatarImage: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarImage.vue")['default']>
export const LazyAvatarWithIcon: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarWithIcon.vue")['default']>
export const LazyBitbucketAvatar: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/BitbucketAvatar.vue")['default']>
export const LazyGitHubAvatar: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/GitHubAvatar.vue")['default']>
export const LazyGitLabAvatar: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/avatar/GitLabAvatar.vue")['default']>
export const LazyBadge: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/badge/Badge.vue")['default']>
export const LazyBanner: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/banner/Banner.vue")['default']>
export const LazyBreadcrumb: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/breadcrumbs/Breadcrumb.vue")['default']>
export const LazyBreadcrumbItem: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/breadcrumbs/BreadcrumbItem.vue")['default']>
export const LazyButton: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/button/Button.vue")['default']>
export const LazyButtonLink: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/button/ButtonLink.vue")['default']>
export const LazyCustomButton: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/button/CustomButton.vue")['default']>
export const LazyCalendar: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/calendar/Calendar.vue")['default']>
export const LazyCard: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/Card.vue")['default']>
export const LazyCardAction: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardAction.vue")['default']>
export const LazyCardContent: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardContent.vue")['default']>
export const LazyCardDescription: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardDescription.vue")['default']>
export const LazyCardFooter: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardFooter.vue")['default']>
export const LazyCardHeader: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardHeader.vue")['default']>
export const LazyCardTitle: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/card/CardTitle.vue")['default']>
export const LazyCheckbox: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/checkbox/Checkbox.vue")['default']>
export const LazyCodeBlock: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/code-block/CodeBlock.vue")['default']>
export const LazyCollapse: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/collapse/Collapse.vue")['default']>
export const LazyCollapseGroup: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/collapse/CollapseGroup.vue")['default']>
export const LazyCombobox: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/combobox/Combobox.vue")['default']>
export const LazyComboboxInput: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/combobox/ComboboxInput.vue")['default']>
export const LazyComboboxList: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/combobox/ComboboxList.vue")['default']>
export const LazyComboboxOption: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/combobox/ComboboxOption.vue")['default']>
export const LazyContextCard: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-card/ContextCard.vue")['default']>
export const LazyContextCardContent: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-card/ContextCardContent.vue")['default']>
export const LazyContextCardTrigger: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-card/ContextCardTrigger.vue")['default']>
export const LazyContextMenu: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenu.vue")['default']>
export const LazyContextMenuContent: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenuContent.vue")['default']>
export const LazyContextMenuItem: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenuItem.vue")['default']>
export const LazyContextMenuTrigger: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenuTrigger.vue")['default']>
export const LazyCopyButton: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/copy-button/CopyButton.vue")['default']>
export const LazyDrawer: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/drawer/Drawer.vue")['default']>
export const LazyDrawerTitle: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/drawer/DrawerTitle.vue")['default']>
export const LazyEmptyState: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/empty-state/EmptyState.vue")['default']>
export const LazyEmptyStateIcon: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/empty-state/EmptyStateIcon.vue")['default']>
export const LazyEntity: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/entity/Entity.vue")['default']>
export const LazyEntityContent: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/entity/EntityContent.vue")['default']>
export const LazyEntityList: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/entity/EntityList.vue")['default']>
export const LazyHesoyamError: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/error/HesoyamError.vue")['default']>
export const LazyDisabledWall: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/DisabledWall.vue")['default']>
export const LazyErrorText: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/ErrorText.vue")['default']>
export const LazyFieldset: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/Fieldset.vue")['default']>
export const LazyFieldsetContent: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetContent.vue")['default']>
export const LazyFieldsetFooter: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooter.vue")['default']>
export const LazyFieldsetFooterAction: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooterAction.vue")['default']>
export const LazyFieldsetFooterActions: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooterActions.vue")['default']>
export const LazyFieldsetFooterStatus: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooterStatus.vue")['default']>
export const LazyFieldsetSubtitle: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetSubtitle.vue")['default']>
export const LazyFieldsetTitle: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetTitle.vue")['default']>
export const LazyWarningText: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/WarningText.vue")['default']>
export const LazyFile: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/file-tree/File.vue")['default']>
export const LazyFolder: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/file-tree/Folder.vue")['default']>
export const LazyTree: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/file-tree/Tree.vue")['default']>
export const LazyGauge: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/gauge/Gauge.vue")['default']>
export const LazyGrid: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/grid/Grid.vue")['default']>
export const LazyGridCell: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridCell.vue")['default']>
export const LazyGridCross: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridCross.vue")['default']>
export const LazyGridPage: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridPage.vue")['default']>
export const LazyGridSystem: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridSystem.vue")['default']>
export const LazyIconTile: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/icon-tile/IconTile.vue")['default']>
export const LazyInput: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/input/Input.vue")['default']>
export const LazyKbd: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/keyboard-input/Kbd.vue")['default']>
export const LazyLabel: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/label/Label.vue")['default']>
export const LazyLoadingDots: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/loading-dots/LoadingDots.vue")['default']>
export const LazyMarquee: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/marquee/Marquee.vue")['default']>
export const LazyMenu: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/Menu.vue")['default']>
export const LazyMenuButton: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuButton.vue")['default']>
export const LazyMenuContainer: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuContainer.vue")['default']>
export const LazyMenuDivider: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuDivider.vue")['default']>
export const LazyMenuItem: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuItem.vue")['default']>
export const LazyMenuItemLocked: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuItemLocked.vue")['default']>
export const LazyMenuLink: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuLink.vue")['default']>
export const LazyMenuSection: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuSection.vue")['default']>
export const LazyModal: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/Modal.vue")['default']>
export const LazyModalAction: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalAction.vue")['default']>
export const LazyModalActions: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalActions.vue")['default']>
export const LazyModalBody: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalBody.vue")['default']>
export const LazyModalHeader: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalHeader.vue")['default']>
export const LazyModalInset: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalInset.vue")['default']>
export const LazyModalSubtitle: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalSubtitle.vue")['default']>
export const LazyModalTitle: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalTitle.vue")['default']>
export const LazyMultiSelectContent: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectContent.vue")['default']>
export const LazyMultiSelectRoot: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectRoot.vue")['default']>
export const LazyMultiSelectRow: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectRow.vue")['default']>
export const LazyMultiSelectTrigger: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectTrigger.vue")['default']>
export const LazyNote: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/note/Note.vue")['default']>
export const LazyNoteAction: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/note/NoteAction.vue")['default']>
export const LazyNoteContent: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/note/NoteContent.vue")['default']>
export const LazyNoteLabel: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/note/NoteLabel.vue")['default']>
export const LazyPagination: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/pagination/Pagination.vue")['default']>
export const LazyProgress: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/progress/Progress.vue")['default']>
export const LazyRadio: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/radio/Radio.vue")['default']>
export const LazyRadioGroup: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/radio/RadioGroup.vue")['default']>
export const LazyRadioGroupItem: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/radio/RadioGroupItem.vue")['default']>
export const LazyScroller: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/scroller/Scroller.vue")['default']>
export const LazySearchInput: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/search-input/SearchInput.vue")['default']>
export const LazySelect: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/select/Select.vue")['default']>
export const LazySeparator: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/separator/Separator.vue")['default']>
export const LazySheet: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/Sheet.vue")['default']>
export const LazySheetClose: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetClose.vue")['default']>
export const LazySheetContent: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetContent.vue")['default']>
export const LazySheetDescription: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetDescription.vue")['default']>
export const LazySheetFooter: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetFooter.vue")['default']>
export const LazySheetHeader: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetHeader.vue")['default']>
export const LazySheetOverlay: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetOverlay.vue")['default']>
export const LazySheetTitle: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetTitle.vue")['default']>
export const LazySheetTrigger: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetTrigger.vue")['default']>
export const LazyShowMore: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/show-more/ShowMore.vue")['default']>
export const LazySidebar: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/Sidebar.vue")['default']>
export const LazySidebarContent: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarContent.vue")['default']>
export const LazySidebarFooter: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarFooter.vue")['default']>
export const LazySidebarGroup: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroup.vue")['default']>
export const LazySidebarGroupAction: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroupAction.vue")['default']>
export const LazySidebarGroupContent: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroupContent.vue")['default']>
export const LazySidebarGroupLabel: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroupLabel.vue")['default']>
export const LazySidebarHeader: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarHeader.vue")['default']>
export const LazySidebarInput: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarInput.vue")['default']>
export const LazySidebarInset: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarInset.vue")['default']>
export const LazySidebarMenu: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenu.vue")['default']>
export const LazySidebarMenuAction: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuAction.vue")['default']>
export const LazySidebarMenuBadge: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuBadge.vue")['default']>
export const LazySidebarMenuButton: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuButton.vue")['default']>
export const LazySidebarMenuButtonChild: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuButtonChild.vue")['default']>
export const LazySidebarMenuItem: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuItem.vue")['default']>
export const LazySidebarMenuSkeleton: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSkeleton.vue")['default']>
export const LazySidebarMenuSub: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSub.vue")['default']>
export const LazySidebarMenuSubButton: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSubButton.vue")['default']>
export const LazySidebarMenuSubItem: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSubItem.vue")['default']>
export const LazySidebarProvider: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarProvider.vue")['default']>
export const LazySidebarRail: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarRail.vue")['default']>
export const LazySidebarSeparator: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarSeparator.vue")['default']>
export const LazySidebarTrigger: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarTrigger.vue")['default']>
export const LazySkeleton: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/skeleton/Skeleton.vue")['default']>
export const LazySlider: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/slider/Slider.vue")['default']>
export const LazySnippet: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/snippet/Snippet.vue")['default']>
export const LazySpinner: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/spinner/Spinner.vue")['default']>
export const LazySplitButton: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/split-button/SplitButton.vue")['default']>
export const LazySplitButtonMenuItem: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/split-button/SplitButtonMenuItem.vue")['default']>
export const LazySwitch: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/switch/Switch.vue")['default']>
export const LazySwitchControl: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/switch/SwitchControl.vue")['default']>
export const LazyTable: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/Table.vue")['default']>
export const LazyTableBody: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableBody.vue")['default']>
export const LazyTableCell: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableCell.vue")['default']>
export const LazyTableCol: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableCol.vue")['default']>
export const LazyTableColgroup: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableColgroup.vue")['default']>
export const LazyTableFooter: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableFooter.vue")['default']>
export const LazyTableHead: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableHead.vue")['default']>
export const LazyTableHeader: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableHeader.vue")['default']>
export const LazyTableRoot: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableRoot.vue")['default']>
export const LazyTableRow: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/table/TableRow.vue")['default']>
export const LazyTabs: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/tabs/Tabs.vue")['default']>
export const LazyTextarea: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/textarea/Textarea.vue")['default']>
export const LazyTextareaMarkdown: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/textarea/TextareaMarkdown.vue")['default']>
export const LazyThemeSwitcher: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/theme-switcher/ThemeSwitcher.vue")['default']>
export const LazyToast: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/toast/Toast.vue")['default']>
export const LazyToaster: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/toast/Toaster.vue")['default']>
export const LazyToggle: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/toggle/Toggle.vue")['default']>
export const LazyTooltip: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/Tooltip.vue")['default']>
export const LazyTooltipContent: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipContent.vue")['default']>
export const LazyTooltipProvider: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipProvider.vue")['default']>
export const LazyTooltipTrigger: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipTrigger.vue")['default']>
export const LazyVideo: LazyComponent<typeof import("../node_modules/@aezakmiproject/hesoyam/src/components/video/Video.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtWelcome>`.
 *
 * Displays the welcome screen used by new Nuxt projects.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
 */
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtLayout>`.
 *
 * Renders the selected layout around pages or error content.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
 */
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
/**
 * Lazy-loaded version of `<NuxtErrorBoundary>`.
 *
 * Catches client-side errors from its default slot and renders an error slot.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
 */
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
/**
 * Lazy-loaded version of `<ClientOnly>`.
 *
 * Renders its default slot only on the client, with an optional server fallback.
 *
 * @see https://nuxt.com/docs/4.x/api/components/client-only
 */
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
/**
 * Lazy-loaded version of `<DevOnly>`.
 *
 * Renders its content only during development.
 *
 * @see https://nuxt.com/docs/4.x/api/components/dev-only
 */
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
/**
 * Lazy-loaded version of `<NuxtLink>`.
 *
 * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
 */
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
/**
 * Lazy-loaded version of `<NuxtLoadingIndicator>`.
 *
 * Displays a progress bar during page navigation.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
 */
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
/**
 * Lazy-loaded version of `<NuxtTime>`.
 *
 * Formats dates and times consistently across server and client using the user's locale.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
 */
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtRouteAnnouncer>`.
 *
 * Announces route changes to assistive technologies using the current page title.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
 */
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
/**
 * Lazy-loaded version of `<NuxtAnnouncer>`.
 *
 * Announces dynamic content changes to assistive technologies.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
 */
export const LazyNuxtAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
/**
 * Lazy-loaded version of `<NuxtImg>`.
 *
 * Renders an optimized image through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
 */
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
/**
 * Lazy-loaded version of `<NuxtPicture>`.
 *
 * Renders responsive optimized images through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
 */
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
/**
 * Lazy-loaded version of `<NuxtPage>`.
 *
 * Renders the current page from the `pages/` directory.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
 */
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
/**
 * Lazy-loaded version of `<NuxtIsland>`.
 *
 * Renders a non-interactive server component without shipping client-side JavaScript.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
 */
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
