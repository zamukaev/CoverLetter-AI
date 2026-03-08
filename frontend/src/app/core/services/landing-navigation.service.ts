import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export type LandingSection = 'features' | 'how-it-works' | 'pricing' | 'faq';

type SectionObserver = {
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
};

@Injectable({ providedIn: 'root' })
export class LandingNavigationService {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly sectionElements = new Map<LandingSection, HTMLElement>();
  private readonly pendingSection = signal<LandingSection | null>(null);

  private observer: SectionObserver | null = null;
  private rafHandle: number | null = null;

  readonly activeSection = signal<LandingSection | null>(null);

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    this.restorePendingSectionFromHistory();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.restorePendingSectionFromHistory();
        this.flushPendingScroll();
        this.resetObserver();
      });
  }

  navigateTo(section: LandingSection): void {
    if (!this.isBrowser) {
      return;
    }

    this.pendingSection.set(section);

    if (!this.isOnLandingRoute()) {
      void this.router.navigate(['/'], { state: { landingSection: section } });
      return;
    }

    this.flushPendingScroll();
  }

  registerSection(section: LandingSection, element: HTMLElement): void {
    if (!this.isBrowser) {
      return;
    }

    this.sectionElements.set(section, element);
    const observer = this.ensureObserver();
    observer?.observe(element);
    this.flushPendingScroll();
  }

  unregisterSection(section: LandingSection): void {
    const element = this.sectionElements.get(section);
    if (!element) {
      return;
    }

    this.observer?.unobserve(element);
    this.sectionElements.delete(section);

    if (this.activeSection() === section) {
      this.activeSection.set(null);
    }
  }

  private flushPendingScroll(): void {
    if (!this.isBrowser || !this.isOnLandingRoute()) {
      return;
    }

    const targetSection = this.pendingSection();
    if (!targetSection) {
      return;
    }

    const targetElement = this.sectionElements.get(targetSection);
    if (!targetElement) {
      return;
    }

    this.pendingSection.set(null);

    if (this.rafHandle !== null) {
      cancelAnimationFrame(this.rafHandle);
    }

    this.rafHandle = requestAnimationFrame(() => {
      const targetTop =
        window.scrollY + targetElement.getBoundingClientRect().top - this.getStickyHeaderOffset();

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });

      this.rafHandle = null;
    });
  }

  private ensureObserver(): SectionObserver | null {
    if (!this.isBrowser || this.observer) {
      return this.observer;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        let visible: { section: LandingSection; ratio: number } | null = null;

        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const section = this.findSectionByElement(entry.target);
          if (!section) {
            continue;
          }

          if (!visible || entry.intersectionRatio > visible.ratio) {
            visible = { section, ratio: entry.intersectionRatio };
          }
        }

        if (visible) {
          this.activeSection.set(visible.section);
        }
      },
      {
        // Keeps active-section tracking stable with sticky header and varied viewport sizes.
        rootMargin: `-${this.getStickyHeaderOffset() + 16}px 0px -45% 0px`,
        threshold: [0.2, 0.35, 0.5, 0.65],
      },
    ) as SectionObserver;

    return this.observer;
  }

  private resetObserver(): void {
    if (!this.observer) {
      return;
    }

    this.observer.disconnect();
    this.observer = null;
    const observer = this.ensureObserver();

    if (!observer) {
      return;
    }

    for (const element of this.sectionElements.values()) {
      observer.observe(element);
    }
  }

  private findSectionByElement(target: Element): LandingSection | null {
    for (const [section, element] of this.sectionElements.entries()) {
      if (element === target) {
        return section;
      }
    }

    return null;
  }

  private restorePendingSectionFromHistory(): void {
    if (!this.isBrowser) {
      return;
    }

    const historyState = window.history.state as Record<string, unknown> | null;
    const restoredSection = this.parseLandingSection(historyState?.['landingSection']);

    if (!restoredSection) {
      return;
    }

    this.pendingSection.set(restoredSection);

    const nextState = { ...(historyState ?? {}) };
    delete nextState['landingSection'];
    window.history.replaceState(nextState, this.document.title, window.location.href);
  }

  private parseLandingSection(value: unknown): LandingSection | null {
    if (
      value === 'features' ||
      value === 'how-it-works' ||
      value === 'pricing' ||
      value === 'faq'
    ) {
      return value;
    }

    return null;
  }

  private isOnLandingRoute(): boolean {
    return this.router.url.split('?')[0].split('#')[0] === '/';
  }

  private getStickyHeaderOffset(): number {
    const header = this.document.querySelector('header');
    if (header instanceof HTMLElement) {
      return header.offsetHeight + 12;
    }

    return 96;
  }
}
