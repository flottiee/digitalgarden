
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

interface _GlobalComponents {
  AddToHome: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/add-to-home/AddToHome.vue")['default']
  Avatar: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/Avatar.vue")['default']
  AvatarBadge: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarBadge.vue")['default']
  AvatarFallback: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarFallback.vue")['default']
  AvatarGroup: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarGroup.vue")['default']
  AvatarGroupCount: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarGroupCount.vue")['default']
  AvatarImage: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarImage.vue")['default']
  AvatarWithIcon: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarWithIcon.vue")['default']
  BitbucketAvatar: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/BitbucketAvatar.vue")['default']
  GitHubAvatar: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/GitHubAvatar.vue")['default']
  GitLabAvatar: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/GitLabAvatar.vue")['default']
  Badge: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/badge/Badge.vue")['default']
  Banner: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/banner/Banner.vue")['default']
  Breadcrumb: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/breadcrumbs/Breadcrumb.vue")['default']
  BreadcrumbItem: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/breadcrumbs/BreadcrumbItem.vue")['default']
  Button: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/button/Button.vue")['default']
  ButtonLink: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/button/ButtonLink.vue")['default']
  CustomButton: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/button/CustomButton.vue")['default']
  Calendar: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/calendar/Calendar.vue")['default']
  Card: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/Card.vue")['default']
  CardAction: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/CardAction.vue")['default']
  CardContent: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/CardContent.vue")['default']
  CardDescription: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/CardDescription.vue")['default']
  CardFooter: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/CardFooter.vue")['default']
  CardHeader: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/CardHeader.vue")['default']
  CardTitle: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/CardTitle.vue")['default']
  Checkbox: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/checkbox/Checkbox.vue")['default']
  CodeBlock: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/code-block/CodeBlock.vue")['default']
  Collapse: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/collapse/Collapse.vue")['default']
  CollapseGroup: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/collapse/CollapseGroup.vue")['default']
  Combobox: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/combobox/Combobox.vue")['default']
  ComboboxInput: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/combobox/ComboboxInput.vue")['default']
  ComboboxList: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/combobox/ComboboxList.vue")['default']
  ComboboxOption: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/combobox/ComboboxOption.vue")['default']
  ContextCard: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-card/ContextCard.vue")['default']
  ContextCardContent: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-card/ContextCardContent.vue")['default']
  ContextCardTrigger: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-card/ContextCardTrigger.vue")['default']
  ContextMenu: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenu.vue")['default']
  ContextMenuContent: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenuContent.vue")['default']
  ContextMenuItem: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenuItem.vue")['default']
  ContextMenuTrigger: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenuTrigger.vue")['default']
  CopyButton: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/copy-button/CopyButton.vue")['default']
  Drawer: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/drawer/Drawer.vue")['default']
  DrawerTitle: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/drawer/DrawerTitle.vue")['default']
  EmptyState: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/empty-state/EmptyState.vue")['default']
  EmptyStateIcon: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/empty-state/EmptyStateIcon.vue")['default']
  Entity: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/entity/Entity.vue")['default']
  EntityContent: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/entity/EntityContent.vue")['default']
  EntityList: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/entity/EntityList.vue")['default']
  HesoyamError: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/error/HesoyamError.vue")['default']
  DisabledWall: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/DisabledWall.vue")['default']
  ErrorText: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/ErrorText.vue")['default']
  Fieldset: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/Fieldset.vue")['default']
  FieldsetContent: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetContent.vue")['default']
  FieldsetFooter: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooter.vue")['default']
  FieldsetFooterAction: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooterAction.vue")['default']
  FieldsetFooterActions: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooterActions.vue")['default']
  FieldsetFooterStatus: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooterStatus.vue")['default']
  FieldsetSubtitle: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetSubtitle.vue")['default']
  FieldsetTitle: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetTitle.vue")['default']
  WarningText: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/WarningText.vue")['default']
  File: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/file-tree/File.vue")['default']
  Folder: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/file-tree/Folder.vue")['default']
  Tree: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/file-tree/Tree.vue")['default']
  Gauge: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/gauge/Gauge.vue")['default']
  Grid: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/grid/Grid.vue")['default']
  GridCell: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridCell.vue")['default']
  GridCross: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridCross.vue")['default']
  GridPage: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridPage.vue")['default']
  GridSystem: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridSystem.vue")['default']
  IconTile: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/icon-tile/IconTile.vue")['default']
  Input: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/input/Input.vue")['default']
  Kbd: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/keyboard-input/Kbd.vue")['default']
  Label: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/label/Label.vue")['default']
  LoadingDots: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/loading-dots/LoadingDots.vue")['default']
  Marquee: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/marquee/Marquee.vue")['default']
  Menu: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/Menu.vue")['default']
  MenuButton: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuButton.vue")['default']
  MenuContainer: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuContainer.vue")['default']
  MenuDivider: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuDivider.vue")['default']
  MenuItem: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuItem.vue")['default']
  MenuItemLocked: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuItemLocked.vue")['default']
  MenuLink: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuLink.vue")['default']
  MenuSection: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuSection.vue")['default']
  Modal: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/Modal.vue")['default']
  ModalAction: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalAction.vue")['default']
  ModalActions: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalActions.vue")['default']
  ModalBody: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalBody.vue")['default']
  ModalHeader: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalHeader.vue")['default']
  ModalInset: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalInset.vue")['default']
  ModalSubtitle: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalSubtitle.vue")['default']
  ModalTitle: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalTitle.vue")['default']
  MultiSelectContent: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectContent.vue")['default']
  MultiSelectRoot: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectRoot.vue")['default']
  MultiSelectRow: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectRow.vue")['default']
  MultiSelectTrigger: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectTrigger.vue")['default']
  Note: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/note/Note.vue")['default']
  NoteAction: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/note/NoteAction.vue")['default']
  NoteContent: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/note/NoteContent.vue")['default']
  NoteLabel: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/note/NoteLabel.vue")['default']
  Pagination: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/pagination/Pagination.vue")['default']
  Progress: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/progress/Progress.vue")['default']
  Radio: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/radio/Radio.vue")['default']
  RadioGroup: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/radio/RadioGroup.vue")['default']
  RadioGroupItem: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/radio/RadioGroupItem.vue")['default']
  Scroller: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/scroller/Scroller.vue")['default']
  SearchInput: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/search-input/SearchInput.vue")['default']
  Select: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/select/Select.vue")['default']
  Separator: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/separator/Separator.vue")['default']
  Sheet: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/Sheet.vue")['default']
  SheetClose: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetClose.vue")['default']
  SheetContent: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetContent.vue")['default']
  SheetDescription: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetDescription.vue")['default']
  SheetFooter: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetFooter.vue")['default']
  SheetHeader: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetHeader.vue")['default']
  SheetOverlay: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetOverlay.vue")['default']
  SheetTitle: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetTitle.vue")['default']
  SheetTrigger: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetTrigger.vue")['default']
  ShowMore: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/show-more/ShowMore.vue")['default']
  Sidebar: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/Sidebar.vue")['default']
  SidebarContent: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarContent.vue")['default']
  SidebarFooter: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarFooter.vue")['default']
  SidebarGroup: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroup.vue")['default']
  SidebarGroupAction: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroupAction.vue")['default']
  SidebarGroupContent: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroupContent.vue")['default']
  SidebarGroupLabel: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroupLabel.vue")['default']
  SidebarHeader: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarHeader.vue")['default']
  SidebarInput: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarInput.vue")['default']
  SidebarInset: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarInset.vue")['default']
  SidebarMenu: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenu.vue")['default']
  SidebarMenuAction: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuAction.vue")['default']
  SidebarMenuBadge: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuBadge.vue")['default']
  SidebarMenuButton: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuButton.vue")['default']
  SidebarMenuButtonChild: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuButtonChild.vue")['default']
  SidebarMenuItem: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuItem.vue")['default']
  SidebarMenuSkeleton: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSkeleton.vue")['default']
  SidebarMenuSub: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSub.vue")['default']
  SidebarMenuSubButton: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSubButton.vue")['default']
  SidebarMenuSubItem: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSubItem.vue")['default']
  SidebarProvider: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarProvider.vue")['default']
  SidebarRail: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarRail.vue")['default']
  SidebarSeparator: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarSeparator.vue")['default']
  SidebarTrigger: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarTrigger.vue")['default']
  Skeleton: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/skeleton/Skeleton.vue")['default']
  Slider: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/slider/Slider.vue")['default']
  Snippet: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/snippet/Snippet.vue")['default']
  Spinner: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/spinner/Spinner.vue")['default']
  SplitButton: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/split-button/SplitButton.vue")['default']
  SplitButtonMenuItem: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/split-button/SplitButtonMenuItem.vue")['default']
  Switch: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/switch/Switch.vue")['default']
  SwitchControl: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/switch/SwitchControl.vue")['default']
  Table: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/Table.vue")['default']
  TableBody: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableBody.vue")['default']
  TableCell: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableCell.vue")['default']
  TableCol: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableCol.vue")['default']
  TableColgroup: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableColgroup.vue")['default']
  TableFooter: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableFooter.vue")['default']
  TableHead: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableHead.vue")['default']
  TableHeader: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableHeader.vue")['default']
  TableRoot: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableRoot.vue")['default']
  TableRow: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableRow.vue")['default']
  Tabs: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/tabs/Tabs.vue")['default']
  Textarea: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/textarea/Textarea.vue")['default']
  TextareaMarkdown: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/textarea/TextareaMarkdown.vue")['default']
  ThemeSwitcher: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/theme-switcher/ThemeSwitcher.vue")['default']
  Toast: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/toast/Toast.vue")['default']
  Toaster: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/toast/Toaster.vue")['default']
  Toggle: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/toggle/Toggle.vue")['default']
  Tooltip: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/Tooltip.vue")['default']
  TooltipContent: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipContent.vue")['default']
  TooltipProvider: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipProvider.vue")['default']
  TooltipTrigger: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipTrigger.vue")['default']
  Video: typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/video/Video.vue")['default']
  /**
   * Displays the welcome screen used by new Nuxt projects.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
   */
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  /**
   * Renders the selected layout around pages or error content.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
   */
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  /**
   * Catches client-side errors from its default slot and renders an error slot.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
   */
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  /**
   * Renders its default slot only on the client, with an optional server fallback.
   *
   * @see https://nuxt.com/docs/4.x/api/components/client-only
   */
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  /**
   * Renders its content only during development.
   *
   * @see https://nuxt.com/docs/4.x/api/components/dev-only
   */
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  /**
   * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
   */
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  /**
   * Displays a progress bar during page navigation.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
   */
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  /**
   * Formats dates and times consistently across server and client using the user's locale.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
   */
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  /**
   * Announces route changes to assistive technologies using the current page title.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
   */
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  /**
   * Announces dynamic content changes to assistive technologies.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
   */
  NuxtAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
  /**
   * Renders an optimized image through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
   */
  NuxtImg: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  /**
   * Renders responsive optimized images through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
   */
  NuxtPicture: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  /**
   * Renders the current page from the `pages/` directory.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
   */
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  /**
   * Renders a non-interactive server component without shipping client-side JavaScript.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
   */
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyAddToHome: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/add-to-home/AddToHome.vue")['default']>
  LazyAvatar: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/Avatar.vue")['default']>
  LazyAvatarBadge: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarBadge.vue")['default']>
  LazyAvatarFallback: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarFallback.vue")['default']>
  LazyAvatarGroup: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarGroup.vue")['default']>
  LazyAvatarGroupCount: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarGroupCount.vue")['default']>
  LazyAvatarImage: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarImage.vue")['default']>
  LazyAvatarWithIcon: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/AvatarWithIcon.vue")['default']>
  LazyBitbucketAvatar: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/BitbucketAvatar.vue")['default']>
  LazyGitHubAvatar: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/GitHubAvatar.vue")['default']>
  LazyGitLabAvatar: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/avatar/GitLabAvatar.vue")['default']>
  LazyBadge: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/badge/Badge.vue")['default']>
  LazyBanner: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/banner/Banner.vue")['default']>
  LazyBreadcrumb: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/breadcrumbs/Breadcrumb.vue")['default']>
  LazyBreadcrumbItem: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/breadcrumbs/BreadcrumbItem.vue")['default']>
  LazyButton: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/button/Button.vue")['default']>
  LazyButtonLink: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/button/ButtonLink.vue")['default']>
  LazyCustomButton: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/button/CustomButton.vue")['default']>
  LazyCalendar: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/calendar/Calendar.vue")['default']>
  LazyCard: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/Card.vue")['default']>
  LazyCardAction: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/CardAction.vue")['default']>
  LazyCardContent: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/CardContent.vue")['default']>
  LazyCardDescription: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/CardDescription.vue")['default']>
  LazyCardFooter: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/CardFooter.vue")['default']>
  LazyCardHeader: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/CardHeader.vue")['default']>
  LazyCardTitle: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/card/CardTitle.vue")['default']>
  LazyCheckbox: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/checkbox/Checkbox.vue")['default']>
  LazyCodeBlock: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/code-block/CodeBlock.vue")['default']>
  LazyCollapse: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/collapse/Collapse.vue")['default']>
  LazyCollapseGroup: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/collapse/CollapseGroup.vue")['default']>
  LazyCombobox: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/combobox/Combobox.vue")['default']>
  LazyComboboxInput: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/combobox/ComboboxInput.vue")['default']>
  LazyComboboxList: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/combobox/ComboboxList.vue")['default']>
  LazyComboboxOption: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/combobox/ComboboxOption.vue")['default']>
  LazyContextCard: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-card/ContextCard.vue")['default']>
  LazyContextCardContent: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-card/ContextCardContent.vue")['default']>
  LazyContextCardTrigger: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-card/ContextCardTrigger.vue")['default']>
  LazyContextMenu: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenu.vue")['default']>
  LazyContextMenuContent: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenuContent.vue")['default']>
  LazyContextMenuItem: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenuItem.vue")['default']>
  LazyContextMenuTrigger: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/context-menu/ContextMenuTrigger.vue")['default']>
  LazyCopyButton: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/copy-button/CopyButton.vue")['default']>
  LazyDrawer: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/drawer/Drawer.vue")['default']>
  LazyDrawerTitle: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/drawer/DrawerTitle.vue")['default']>
  LazyEmptyState: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/empty-state/EmptyState.vue")['default']>
  LazyEmptyStateIcon: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/empty-state/EmptyStateIcon.vue")['default']>
  LazyEntity: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/entity/Entity.vue")['default']>
  LazyEntityContent: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/entity/EntityContent.vue")['default']>
  LazyEntityList: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/entity/EntityList.vue")['default']>
  LazyHesoyamError: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/error/HesoyamError.vue")['default']>
  LazyDisabledWall: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/DisabledWall.vue")['default']>
  LazyErrorText: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/ErrorText.vue")['default']>
  LazyFieldset: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/Fieldset.vue")['default']>
  LazyFieldsetContent: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetContent.vue")['default']>
  LazyFieldsetFooter: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooter.vue")['default']>
  LazyFieldsetFooterAction: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooterAction.vue")['default']>
  LazyFieldsetFooterActions: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooterActions.vue")['default']>
  LazyFieldsetFooterStatus: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetFooterStatus.vue")['default']>
  LazyFieldsetSubtitle: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetSubtitle.vue")['default']>
  LazyFieldsetTitle: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/FieldsetTitle.vue")['default']>
  LazyWarningText: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/fieldset/WarningText.vue")['default']>
  LazyFile: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/file-tree/File.vue")['default']>
  LazyFolder: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/file-tree/Folder.vue")['default']>
  LazyTree: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/file-tree/Tree.vue")['default']>
  LazyGauge: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/gauge/Gauge.vue")['default']>
  LazyGrid: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/grid/Grid.vue")['default']>
  LazyGridCell: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridCell.vue")['default']>
  LazyGridCross: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridCross.vue")['default']>
  LazyGridPage: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridPage.vue")['default']>
  LazyGridSystem: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/grid/GridSystem.vue")['default']>
  LazyIconTile: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/icon-tile/IconTile.vue")['default']>
  LazyInput: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/input/Input.vue")['default']>
  LazyKbd: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/keyboard-input/Kbd.vue")['default']>
  LazyLabel: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/label/Label.vue")['default']>
  LazyLoadingDots: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/loading-dots/LoadingDots.vue")['default']>
  LazyMarquee: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/marquee/Marquee.vue")['default']>
  LazyMenu: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/Menu.vue")['default']>
  LazyMenuButton: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuButton.vue")['default']>
  LazyMenuContainer: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuContainer.vue")['default']>
  LazyMenuDivider: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuDivider.vue")['default']>
  LazyMenuItem: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuItem.vue")['default']>
  LazyMenuItemLocked: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuItemLocked.vue")['default']>
  LazyMenuLink: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuLink.vue")['default']>
  LazyMenuSection: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/menu/MenuSection.vue")['default']>
  LazyModal: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/Modal.vue")['default']>
  LazyModalAction: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalAction.vue")['default']>
  LazyModalActions: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalActions.vue")['default']>
  LazyModalBody: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalBody.vue")['default']>
  LazyModalHeader: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalHeader.vue")['default']>
  LazyModalInset: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalInset.vue")['default']>
  LazyModalSubtitle: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalSubtitle.vue")['default']>
  LazyModalTitle: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/modal/ModalTitle.vue")['default']>
  LazyMultiSelectContent: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectContent.vue")['default']>
  LazyMultiSelectRoot: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectRoot.vue")['default']>
  LazyMultiSelectRow: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectRow.vue")['default']>
  LazyMultiSelectTrigger: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/multi-select/MultiSelectTrigger.vue")['default']>
  LazyNote: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/note/Note.vue")['default']>
  LazyNoteAction: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/note/NoteAction.vue")['default']>
  LazyNoteContent: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/note/NoteContent.vue")['default']>
  LazyNoteLabel: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/note/NoteLabel.vue")['default']>
  LazyPagination: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/pagination/Pagination.vue")['default']>
  LazyProgress: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/progress/Progress.vue")['default']>
  LazyRadio: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/radio/Radio.vue")['default']>
  LazyRadioGroup: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/radio/RadioGroup.vue")['default']>
  LazyRadioGroupItem: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/radio/RadioGroupItem.vue")['default']>
  LazyScroller: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/scroller/Scroller.vue")['default']>
  LazySearchInput: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/search-input/SearchInput.vue")['default']>
  LazySelect: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/select/Select.vue")['default']>
  LazySeparator: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/separator/Separator.vue")['default']>
  LazySheet: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/Sheet.vue")['default']>
  LazySheetClose: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetClose.vue")['default']>
  LazySheetContent: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetContent.vue")['default']>
  LazySheetDescription: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetDescription.vue")['default']>
  LazySheetFooter: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetFooter.vue")['default']>
  LazySheetHeader: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetHeader.vue")['default']>
  LazySheetOverlay: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetOverlay.vue")['default']>
  LazySheetTitle: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetTitle.vue")['default']>
  LazySheetTrigger: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sheet/SheetTrigger.vue")['default']>
  LazyShowMore: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/show-more/ShowMore.vue")['default']>
  LazySidebar: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/Sidebar.vue")['default']>
  LazySidebarContent: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarContent.vue")['default']>
  LazySidebarFooter: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarFooter.vue")['default']>
  LazySidebarGroup: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroup.vue")['default']>
  LazySidebarGroupAction: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroupAction.vue")['default']>
  LazySidebarGroupContent: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroupContent.vue")['default']>
  LazySidebarGroupLabel: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarGroupLabel.vue")['default']>
  LazySidebarHeader: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarHeader.vue")['default']>
  LazySidebarInput: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarInput.vue")['default']>
  LazySidebarInset: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarInset.vue")['default']>
  LazySidebarMenu: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenu.vue")['default']>
  LazySidebarMenuAction: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuAction.vue")['default']>
  LazySidebarMenuBadge: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuBadge.vue")['default']>
  LazySidebarMenuButton: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuButton.vue")['default']>
  LazySidebarMenuButtonChild: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuButtonChild.vue")['default']>
  LazySidebarMenuItem: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuItem.vue")['default']>
  LazySidebarMenuSkeleton: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSkeleton.vue")['default']>
  LazySidebarMenuSub: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSub.vue")['default']>
  LazySidebarMenuSubButton: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSubButton.vue")['default']>
  LazySidebarMenuSubItem: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarMenuSubItem.vue")['default']>
  LazySidebarProvider: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarProvider.vue")['default']>
  LazySidebarRail: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarRail.vue")['default']>
  LazySidebarSeparator: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarSeparator.vue")['default']>
  LazySidebarTrigger: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/sidebar/SidebarTrigger.vue")['default']>
  LazySkeleton: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/skeleton/Skeleton.vue")['default']>
  LazySlider: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/slider/Slider.vue")['default']>
  LazySnippet: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/snippet/Snippet.vue")['default']>
  LazySpinner: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/spinner/Spinner.vue")['default']>
  LazySplitButton: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/split-button/SplitButton.vue")['default']>
  LazySplitButtonMenuItem: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/split-button/SplitButtonMenuItem.vue")['default']>
  LazySwitch: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/switch/Switch.vue")['default']>
  LazySwitchControl: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/switch/SwitchControl.vue")['default']>
  LazyTable: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/Table.vue")['default']>
  LazyTableBody: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableBody.vue")['default']>
  LazyTableCell: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableCell.vue")['default']>
  LazyTableCol: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableCol.vue")['default']>
  LazyTableColgroup: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableColgroup.vue")['default']>
  LazyTableFooter: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableFooter.vue")['default']>
  LazyTableHead: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableHead.vue")['default']>
  LazyTableHeader: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableHeader.vue")['default']>
  LazyTableRoot: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableRoot.vue")['default']>
  LazyTableRow: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/table/TableRow.vue")['default']>
  LazyTabs: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/tabs/Tabs.vue")['default']>
  LazyTextarea: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/textarea/Textarea.vue")['default']>
  LazyTextareaMarkdown: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/textarea/TextareaMarkdown.vue")['default']>
  LazyThemeSwitcher: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/theme-switcher/ThemeSwitcher.vue")['default']>
  LazyToast: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/toast/Toast.vue")['default']>
  LazyToaster: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/toast/Toaster.vue")['default']>
  LazyToggle: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/toggle/Toggle.vue")['default']>
  LazyTooltip: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/Tooltip.vue")['default']>
  LazyTooltipContent: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipContent.vue")['default']>
  LazyTooltipProvider: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipProvider.vue")['default']>
  LazyTooltipTrigger: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/tooltip/TooltipTrigger.vue")['default']>
  LazyVideo: LazyComponent<typeof import("../../node_modules/@aezakmiproject/hesoyam/src/components/video/Video.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtWelcome>`.
   *
   * Displays the welcome screen used by new Nuxt projects.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
   */
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtLayout>`.
   *
   * Renders the selected layout around pages or error content.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
   */
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  /**
   * Lazy-loaded version of `<NuxtErrorBoundary>`.
   *
   * Catches client-side errors from its default slot and renders an error slot.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
   */
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  /**
   * Lazy-loaded version of `<ClientOnly>`.
   *
   * Renders its default slot only on the client, with an optional server fallback.
   *
   * @see https://nuxt.com/docs/4.x/api/components/client-only
   */
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  /**
   * Lazy-loaded version of `<DevOnly>`.
   *
   * Renders its content only during development.
   *
   * @see https://nuxt.com/docs/4.x/api/components/dev-only
   */
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  /**
   * Lazy-loaded version of `<NuxtLink>`.
   *
   * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
   */
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  /**
   * Lazy-loaded version of `<NuxtLoadingIndicator>`.
   *
   * Displays a progress bar during page navigation.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
   */
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  /**
   * Lazy-loaded version of `<NuxtTime>`.
   *
   * Formats dates and times consistently across server and client using the user's locale.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
   */
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtRouteAnnouncer>`.
   *
   * Announces route changes to assistive technologies using the current page title.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
   */
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  /**
   * Lazy-loaded version of `<NuxtAnnouncer>`.
   *
   * Announces dynamic content changes to assistive technologies.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
   */
  LazyNuxtAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
  /**
   * Lazy-loaded version of `<NuxtImg>`.
   *
   * Renders an optimized image through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
   */
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  /**
   * Lazy-loaded version of `<NuxtPicture>`.
   *
   * Renders responsive optimized images through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
   */
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  /**
   * Lazy-loaded version of `<NuxtPage>`.
   *
   * Renders the current page from the `pages/` directory.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
   */
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  /**
   * Lazy-loaded version of `<NuxtIsland>`.
   *
   * Renders a non-interactive server component without shipping client-side JavaScript.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
   */
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
