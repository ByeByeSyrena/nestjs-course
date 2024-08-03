import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  HttpCode,
  Session,
  UseGuards,
  // use with @Exclude()
  //   UseInterceptors,
  //   ClassSerializerInterceptor,
  //comment
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
// if I want to use interceptor only for all routes, place it here:
@Serialize(UserDto)
// interceptor just for this controller:
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // check how session works
  //
  //   @Get('colors/:color')
  //   setColor(@Param('color') color: string, @Session() session: any) {
  //     session.color = color;
  //   }

  //   @Get('colors')
  //   getColor(@Session() session: any) {
  //     return session.color;
  //   }

  //   @Get('/whoami')
  //   whoAmI(@Session() session: any) {
  //     return this.usersService.findOne(session.userId);
  //   }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  @HttpCode(201)
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  @HttpCode(200)
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  @HttpCode(200)
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  // use with @Exclude()
  //   @UseInterceptors(ClassSerializerInterceptor)

  //Serialize is a custom decorator, can use just
  // @UseInterceptors(new SerializeInterceptor(dto))

  // if I want to use interceptor only for the one route
  // and maybe use another dto
  //, place it here:
  //   @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('handler is running');
    const user = await this.usersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
