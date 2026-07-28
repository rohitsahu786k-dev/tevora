"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Home, LockKeyhole, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { GlobalSearch } from "@/components/search";
import { BrandLogo } from "@/components/brand/brand-logo";
import {
  mainNavigation,
  productMenuGroups,
  sectorMenuItems,
  spaceMenuGroups,
  type MenuLink,
} from "@/config/navigation";
import { brandSettings } from "@/config/brand";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion/tokens";

type MenuName = "products" | "spaces" | "sectors";
const isActive = (pathname: string, href: string) =>
  href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
function MenuItem({ item, close }: { item: MenuLink; close: () => void }) {
  return (
    <Link
      href={item.href as never}
      onClick={close}
      className="group block py-3"
    >
      <span className="group-hover:text-accent font-semibold">
        {item.label}
      </span>
      {item.description && (
        <span className="type-caption text-ink-muted mt-1 block max-w-xs">
          {item.description}
        </span>
      )}
    </Link>
  );
}
function MegaMenu({ name, close }: { name: MenuName; close: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{
        duration: motionTokens.duration.component,
        ease: motionTokens.easing.enter,
      }}
      className="border-line bg-surface text-graphite absolute inset-x-0 top-full border-y shadow-[0_16px_32px_rgb(16_32_29/10%)]"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: motionTokens.stagger.tight },
          },
        }}
        className="mx-auto max-w-[96rem] px-8 py-8"
      >
        {name === "products" && (
          <div className="grid grid-cols-5 gap-8">
            {productMenuGroups.map((group) => (
              <motion.div
                key={group.label}
                variants={{
                  hidden: { opacity: 0.72, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <p className="type-eyebrow border-line text-accent border-b pb-3">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <MenuItem key={item.href} item={item} close={close} />
                ))}
              </motion.div>
            ))}
          </div>
        )}
        {name === "spaces" && (
          <>
            <div className="grid grid-cols-4 gap-8">
              {spaceMenuGroups.map((group) => (
                <div key={group.label}>
                  <p className="type-eyebrow border-line text-accent border-b pb-3">
                    {group.label}
                  </p>
                  <div className="grid grid-cols-2 gap-x-4">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href as never}
                        onClick={close}
                        className="hover:text-accent min-h-10 py-2 text-xs font-semibold"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={routes.spaces}
              onClick={close}
              className="border-graphite mt-6 inline-flex min-h-11 items-center border-b text-sm font-semibold"
            >
              View All Spaces
            </Link>
          </>
        )}
        {name === "sectors" && (
          <div className="grid grid-cols-4 gap-x-8 gap-y-2">
            {sectorMenuItems.map((item) => (
              <MenuItem key={item.href} item={item} close={close} />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
function MobileGroup({
  label,
  items,
  active,
  pathname,
  close,
}: {
  label: string;
  items: MenuLink[];
  active: boolean;
  pathname: string;
  close: () => void;
}) {
  const [open, setOpen] = useState(active);
  return (
    <div className="border-b border-white/15">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex min-h-16 w-full items-center justify-between text-left text-xl font-medium"
      >
        {label}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-5 transition-transform motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: motionTokens.duration.component }}
            className="overflow-hidden pb-5"
          >
            <ul>
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href as never}
                    onClick={close}
                    aria-current={
                      isActive(pathname, item.href) ? "page" : undefined
                    }
                    className={cn(
                      "flex min-h-12 items-center border-l-2 pl-4 text-sm",
                      isActive(pathname, item.href)
                        ? "border-emerald-300 text-emerald-300"
                        : "border-white/20 text-white/70",
                    )}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<MenuName | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const transparent = pathname === "/" && !scrolled && !mobileOpen;
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopMenu(null);
        setMobileOpen(false);
      }
    };
    const outside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node))
        setDesktopMenu(null);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("mousedown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("mousedown", outside);
    };
  }, []);
  useEffect(() => {
    if (!mobileOpen || !mobileRef.current) return;
    const previous = document.body.style.overflow;
    const trigger = menuTriggerRef.current;
    document.body.style.overflow = "hidden";
    const panel = mobileRef.current;
    const first = panel.querySelector<HTMLElement>("button,a[href]");
    first?.focus();
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = [
        ...panel.querySelectorAll<HTMLElement>(
          "button:not([disabled]),a[href]",
        ),
      ];
      const start = items[0],
        end = items.at(-1);
      if (event.shiftKey && document.activeElement === start) {
        event.preventDefault();
        end?.focus();
      } else if (!event.shiftKey && document.activeElement === end) {
        event.preventDefault();
        start?.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.removeEventListener("keydown", trap);
      document.body.style.overflow = previous;
      trigger?.focus();
    };
  }, [mobileOpen]);
  const toggleMenu = (menu: MenuName) =>
    setDesktopMenu((current) => (current === menu ? null : menu));
  const close = () => setDesktopMenu(null);
  const mobileProducts = productMenuGroups.flatMap((group) => group.items);
  const mobileSpaces = spaceMenuGroups.flatMap((group) => group.items);
  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "top-0 z-[var(--z-header)] w-full border-b transition-colors duration-200 motion-reduce:transition-none",
          transparent
            ? "fixed border-white/20 bg-transparent text-white"
            : "border-line bg-canvas/95 text-graphite sticky backdrop-blur-sm",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[96rem] items-center gap-2 px-4 transition-[min-height] duration-300 motion-reduce:transition-none sm:gap-4 sm:px-8",
            scrolled ? "min-h-16" : "min-h-16 sm:min-h-20",
          )}
        >
          <Link
            href={routes.home}
            className="mr-auto flex min-h-11 min-w-0 flex-col justify-center leading-none"
            aria-label={`${brandSettings.brandName} home`}
          >
            <BrandLogo
              variant={transparent ? "light" : "dark"}
              priority
              className="w-32 sm:w-40"
            />
            <span
              className={cn(
                "type-caption mt-1 hidden pl-[1.85rem] min-[23rem]:block sm:pl-[2.05rem]",
                transparent ? "text-white/65" : "text-ink-muted",
              )}
            >
              {brandSettings.brandDescriptor}
            </span>
          </Link>
          <nav
            aria-label="Primary"
            className="hidden h-20 items-stretch 2xl:flex"
          >
            {mainNavigation
              .filter((item) => item.label !== "Contact")
              .map((item) =>
                "menu" in item ? (
                  <button
                    key={item.label}
                    type="button"
                    aria-expanded={desktopMenu === item.menu}
                    aria-haspopup="true"
                    onClick={() => toggleMenu(item.menu)}
                    className={cn(
                      "flex min-w-20 items-center justify-center gap-1 border-b-2 px-2 text-xs font-semibold",
                      desktopMenu === item.menu || isActive(pathname, item.href)
                        ? "border-accent"
                        : "border-transparent",
                    )}
                  >
                    {item.label}
                    <ChevronDown aria-hidden className="size-3" />
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href as never}
                    onClick={close}
                    aria-current={
                      isActive(pathname, item.href) ? "page" : undefined
                    }
                    className={cn(
                      "flex min-w-20 items-center justify-center border-b-2 px-2 text-xs font-semibold",
                      isActive(pathname, item.href)
                        ? "border-accent"
                        : "border-transparent",
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}
          </nav>
          <GlobalSearch inverse={transparent} />
          <Link
            href={routes.login as never}
            className={cn(
              "hidden min-h-11 items-center gap-2 border px-4 text-xs font-semibold lg:flex",
              transparent
                ? "hover:text-brand-950 border-white/55 text-white hover:bg-white"
                : "border-line hover:border-brand-900 hover:bg-surface-muted",
            )}
          >
            <LockKeyhole aria-hidden className="size-4" />
            Login
          </Link>
          <Link
            href={routes.contact}
            className={cn(
              "hidden min-h-11 items-center border px-4 text-xs font-semibold lg:flex",
              transparent
                ? "text-brand-950 border-white bg-white"
                : "border-brand-900 bg-brand-900 hover:bg-accent text-white",
            )}
          >
            Discuss Your Project
          </Link>
          <button
            ref={menuTriggerRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(true)}
            className={cn(
              "grid size-11 shrink-0 place-items-center border 2xl:hidden",
              transparent ? "border-white/30" : "border-line",
            )}
            aria-label="Open navigation"
          >
            <Menu aria-hidden className="size-5" />
          </button>
        </div>
        <AnimatePresence>
          {desktopMenu && <MegaMenu name={desktopMenu} close={close} />}
        </AnimatePresence>
      </header>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            ref={mobileRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{
              duration: motionTokens.duration.component,
              ease: motionTokens.easing.enter,
            }}
            className="bg-brand-950 fixed inset-0 z-[var(--z-mobile-nav)] h-dvh w-screen overflow-y-auto overscroll-contain text-white"
          >
            <div className="mx-auto min-h-dvh max-w-3xl px-5 pt-[env(safe-area-inset-top)] pb-[calc(2.5rem+env(safe-area-inset-bottom))] sm:px-8">
              <header className="flex min-h-20 items-center justify-between border-b border-white/15">
                <Link
                  href={routes.home}
                  aria-label={`${brandSettings.brandName} home`}
                >
                  <BrandLogo variant="light" className="w-36" />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="grid size-11 place-items-center border border-white/30"
                  aria-label="Close navigation"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </header>
              <nav aria-label="Mobile primary" className="mt-5">
                <Link
                  href={routes.home}
                  onClick={() => setMobileOpen(false)}
                  aria-current={pathname === routes.home ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 items-center gap-3 border-b border-white/15 text-lg",
                    pathname === routes.home && "text-emerald-300",
                  )}
                >
                  <Home aria-hidden className="size-5" />
                  <span>Home</span>
                </Link>
                <MobileGroup
                  label="Products"
                  items={mobileProducts}
                  active={
                    isActive(pathname, routes.products) ||
                    isActive(pathname, "/product")
                  }
                  pathname={pathname}
                  close={() => setMobileOpen(false)}
                />
                <MobileGroup
                  label="Spaces"
                  items={mobileSpaces}
                  active={isActive(pathname, routes.spaces)}
                  pathname={pathname}
                  close={() => setMobileOpen(false)}
                />
                <MobileGroup
                  label="Sectors"
                  items={sectorMenuItems}
                  active={isActive(pathname, routes.sectors)}
                  pathname={pathname}
                  close={() => setMobileOpen(false)}
                />
                <div className="grid pt-4">
                  {mainNavigation
                    .filter(
                      (item) =>
                        !["Products", "Spaces", "Sectors", "Contact"].includes(
                          item.label,
                        ),
                    )
                    .map((item) => (
                      <Link
                        key={item.label}
                        href={item.href as never}
                        onClick={() => setMobileOpen(false)}
                        aria-current={
                          isActive(pathname, item.href) ? "page" : undefined
                        }
                        className={cn(
                          "flex min-h-14 items-center border-b border-white/15 text-lg",
                          isActive(pathname, item.href) && "text-emerald-300",
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>
                <Link
                  href={routes.contact}
                  onClick={() => setMobileOpen(false)}
                  className="text-brand-950 mt-8 flex min-h-14 items-center justify-center bg-white px-5 font-semibold"
                >
                  Discuss Your Project
                </Link>
                <Link
                  href={routes.login as never}
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 flex min-h-14 items-center justify-center gap-2 border border-white/30 px-5 font-semibold"
                >
                  <LockKeyhole aria-hidden className="size-4" />
                  Login for Downloads
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
