import User from '../infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../HashProvider/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
    nickname: string;
}

@injectable()
export default class CreateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('BCryptHash')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        name,
        email,
        password,
        nickname,
    }: IRequest): Promise<User> {
        const checkUserExist = await this.userRepository.findByEmail(email);
        if (checkUserExist) {
            throw new Error('Email addres already exist');
        }
        const hashedPassword = await this.hashProvider.generateHash(password);
        const user = await this.userRepository.create({
            name,
            nickname,
            email,
            password: hashedPassword,
        });

        return user;
    }
}
