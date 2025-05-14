import { CanActivateFn, RedirectCommand } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';


export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.getToken()) {
    const loginPath = router.parseUrl("/sign-in");
    return new RedirectCommand(loginPath, {
      skipLocationChange: true,
    });
  }

  return true;
};

export const authGuardSkip: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const homePath = router.parseUrl("/");
    return new RedirectCommand(homePath, {
      replaceUrl: true,
    });
  }

  return true;
}
