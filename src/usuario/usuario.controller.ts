import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, UseGuards } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario.entity";
import { UsuarioCadsatroDto } from "./dto/usuario.cadastro.dto";
import { UsarioSessaoDto } from "./dto/usuario.sessao.dto";
import { HasRoles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/roles.enum";
import { RolesGuard } from "src/auth/guard/roles-auth.guard";
import { IsPublic } from "src/auth/decorators/is-public.decorator";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @IsPublic()
  @Post()
  cadastrar(@Body() usuario: UsuarioCadsatroDto): Promise<Usuario> {
    return this.usuarioService.cadastrar(usuario)
  }

  @HasRoles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @Get('me')
  async me(@Req() req) {
    return await req.user
  }
}