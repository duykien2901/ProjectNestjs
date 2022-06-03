import { Routes } from 'nest-router';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PostsModule } from 'src/modules/posts/posts.module';
import { UserModule } from 'src/modules/user/user.module';

export const ROUTERS: Routes = [
  {
    path: 'api/v1',
    children: [
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'user',
        module: UserModule,
      },
      {
        path: 'post',
        module: PostsModule,
      },
    ],
  },
];
