import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerUser: RegisterUserDto): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: registerUser.email,
      },
    });

    if (user) {
      throw new HttpException(
        { message: 'This email has been used.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.prismaService.user.create({
      data: {
        ...registerUser,
        password: registerUser.password,
        refreshToken: '',
      },
    });

    return res;
  }

  async login(loginUser: LoginUserDto): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginUser.email,
      },
    });

    if (!user || user.password !== loginUser.password) {
      throw new HttpException(
        { message: 'Account or Password is not correct.' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // generate token
    const payload = { id: user.user_id, email: user.email };

    return this.generateToken(payload);
  }

  private async generateToken(payload: {
    id: number;
    email: string;
  }): Promise<any> {
    const token = await this.jwtService.signAsync(payload, {
      secret: '123456',
      expiresIn: '1h',
    });

    return token;
  }
}
