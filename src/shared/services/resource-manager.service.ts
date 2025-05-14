import { effect, inject, Injectable, resource, ResourceOptions, ResourceRef, signal } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


type ReloadableResourceOptions = {
  reload: () => void;
  name?: string;
  route?: true | string;
  condition?: () => boolean;
};

type ReloadableResource = {
  reload: () => void;
  name?: string;
  route?: string;
  condition?: () => boolean;
};

@Injectable({
  providedIn: 'root'
})
export class ResourceManagerService {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly currentRoute = signal('');
  private registeredResources = new Set<ReloadableResource>();

  constructor() {
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        this.currentRoute.set(event.urlAfterRedirects)
      });

    effect(() => {
      if (this.authService.isLoggedIn()) {
        this.reloadResources();
      }
    });
  }

  registerResource(resource: ReloadableResourceOptions) {
    const route = resource.route === true
      ? this.currentRoute()
      : resource.route;

    const resourceToAdd: ReloadableResource = {
      reload: resource.reload,
      name: resource.name,
      route: route,
      condition: resource.condition,
    }

    this.registeredResources.add(resourceToAdd);
  }

  unregisterResource(resource: ReloadableResource) {
    this.registeredResources.delete(resource);
  }

  private reloadResources() {
    const route = this.currentRoute();

    this.registeredResources.forEach(resource => {
      const shouldReload =
        (!resource.route || route.includes(resource.route)) &&
        (resource.condition ? resource.condition() : true);

      if (shouldReload) {
        resource.reload();
      }
    });
  }
}

export function registerResource<T, R>(resourceOptions: ResourceOptions<T, R>, reloadableResourceOptions: Partial<ReloadableResourceOptions> = {}) {
  const resourceManager = inject(ResourceManagerService);
  const reactiveResource = resource(resourceOptions);


  resourceManager.registerResource({
    ...reloadableResourceOptions,
    reload: () => {
      reactiveResource.reload();
    }
  });

  return reactiveResource;
}
