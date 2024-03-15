import { Request, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IsPublic } from './decorators/is-public.decorator';

@Controller('')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @IsPublic()
    @UsePipes(ValidationPipe)
    @Post('login')
    async login(@Request() req){
        return await this.authService.login(req.body.email, req.body.senha)
    }
}
