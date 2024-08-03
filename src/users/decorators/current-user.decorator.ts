import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  // data - goes from where we use @CurrentUser(--data here--)
  // context: ExecutionContext is a wrapper that handle different types of requests:
  // graphQl, restApi, web sockets etc
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
