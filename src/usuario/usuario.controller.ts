import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario.entity";
import { UsuarioCadsatroDto } from "./dto/usuario.cadastro.dto";
import { IsPublic } from "src/auth/decorators/is-public.decorator";

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService){}

  @Get('listar')
  listar(): Promise<Usuario[]> {
    return this.usuarioService.listar();
  }

  @IsPublic()
  @Post()
  cadastrar(@Body() usuario : UsuarioCadsatroDto): Promise<Usuario>{
    return this.usuarioService.cadastrar(usuario)
  }
}