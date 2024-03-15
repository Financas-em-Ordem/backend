import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario.entity";
import { UsuarioCadsatroDto } from "./dto/usuario.cadastro.dto";
import { UsarioSessaoDto } from "./dto/usuario.sessao.dto";
import { IsPublic } from "src/auth/decorators/is-public.decorator";

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService){}

  @Get('listar')
  listar(): Promise<Usuario[]> {
    return this.usuarioService.listar();
  }

  @IsPublic()
  @Post('teste')
  procurar(@Request() req){
    return this.usuarioService.encontrarUsuarioEmailCPF(req.body.email, req.body.cpf)
  }

  @IsPublic()
  @Post()
  cadastrar(@Body() usuario : UsuarioCadsatroDto): Promise<Usuario>{
    return this.usuarioService.cadastrar(usuario)
  }

  @IsPublic()
  @Post('varios')
  cadastrarVarios(@Body() usuarios : UsuarioCadsatroDto[]){
    return this.usuarioService.cadastrarVariosUsers(usuarios)
  }

  @Get('me')
  me(@Req() req){
    return req.user
  }
}