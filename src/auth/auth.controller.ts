import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { email: string, password: string }){
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }

    @UseGuards(AuthGuard)
    @Get('validate-token')
    validateToken(){
        return { valid: true }
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Body() body: { token: string }){
        const res = await this.authService.me(body.token);
        
        return res
    }

}