import { inject, resource, Resource, ResourceOptions, ResourceRef } from '@angular/core';
import { ResourceManagerService } from '@shared/services/resource-manager.service';


export type ReloadableResourceOptions = {
  reload: () => void;
  name?: string;
  route?: true | string;
  condition?: () => boolean;
};

export type ReloadableResource = {
  reload: () => void;
  name?: string;
  route?: string;
  condition?: () => boolean;
};

export type ResourceOptionsWithDefault<T, R> = (ResourceOptions<T, R> & { defaultValue: NoInfer<T>} )
export type ResourceOptionsParam<T, R> =  ResourceOptions<T, R> | ResourceOptionsWithDefault<T, R>;

export function registerResource<T, R>(
  resourceOptions: ResourceOptionsWithDefault<T, R>,
  reloadableResourceOptions?: Partial<ReloadableResourceOptions>
): Resource<T>;

export function registerResource<T, R>(
  resourceOptions: ResourceOptions<T, R>,
  reloadableResourceOptions?: Partial<ReloadableResourceOptions>,
): Resource<T | undefined>;


export function registerResource<T, R>(resourceOptions: ResourceOptionsParam<T, R>, reloadableResourceOptions: Partial<ReloadableResourceOptions> = {})
  : Resource<T> | Resource<T | undefined> {
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

