---
title: Unit-testing functional guards in Angular
tags:
  - post
  - frontend
  - angular
source: https://www.youtube.com/watch?v=MDCKq_e7Q04
---

TL;DR: Run the guard inside the [`TestBed.runInInjectionContext`](https://angular.io/api/core/testing/TestBed#runininjectioncontext) callback.

<!-- excerpt -->

Let's say, we have a functional guard that checks if the user is authorized to use the application that we want to test.

```ts
// auth.guard.ts
export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
	return inject(UserService).isAuthorised
}
```

Now we need to create a unit test file to run test of the guard.

To properly run the guard function in a test spec, you need to wrap it in the [`TestBed.runInInjectionContext`](https://angular.io/api/core/testing/TestBed#runininjectioncontext)'s callback, as mentioned above. It will call the callback argument inside its own injection context.

Just create a function that will run the `runInInjectionContext` that will run the guard. And then use that function in the `it` blocks as if it was the actual functional guard.

```ts
// auth.guard.spec.ts

// A blank component to emulate a page
@Component({})
class BlankComponent {}

// Injected service's stub for testing purposes
class UserServiceStub {
   public static isAuthorised = true;
   public isAuthorised = UserServiceMock.isAuthorised;
}

function runAuthGuard(): boolean {
  const snapshot = TestBed.inject(ActivatedRoute).snapshot;
  return TestBed.runInInjectionContext(() => authGuard(snapshot, {} as RouterStateSnapshot));
}

describe('AuthGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {},
					},
				},
				{
					provide: UserService,
					useClass: UserServiceStub,
				},
			],
			imports: [
				RouterTestingModule.withRoutes([
					{
						path: '',
						component: BlankComponent,
					},
					{
						path: 'dashboard',
						component: BlankComponent,
						canActivate: [authGuard],
					},
				]),
			],
		})
	})

    // To prevent occasional errors in tests
    afterEach(async () => {
      await TestBed.inject(Router).navigate(['/']);
    });

    it('let\'s authorised users pass', () => {
        expect(runAuthGuard()).toEqual(true)
    })

    it('doesn\'t let unauthorised users pass', () => {
        UserServiceStub.isAuthorised = false;
        expect(runAuthGuard()).toEqual(false)
    })
})
```

