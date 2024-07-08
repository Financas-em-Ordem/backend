import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { IsPublic } from "./decorators/is-public.decorator";

@Controller()
export class AuthController {
    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await req.user
    }
}