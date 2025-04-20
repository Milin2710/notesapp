import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    signup(username: string, email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    verifyTokenAndGetUser(token: string): Promise<User | null>;
}
