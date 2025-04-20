import { AuthService } from './auth.service';
import { Response, Request as ExpressRequest } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: {
        username: string;
        email: string;
        password: string;
    }): Promise<import("./user.entity").User>;
    login(body: {
        email: string;
        password: string;
    }, response: Response): Promise<{
        token: string;
    }>;
    me(request: ExpressRequest): Promise<import("./user.entity").User | null>;
    logout(res: Response): {
        message: string;
    };
}
