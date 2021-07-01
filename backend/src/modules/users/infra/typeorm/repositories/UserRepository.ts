import {getRepository, Repository}from 'typeorm'
import User from '../entities/User'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'


 export default  class UserRepository implements IUserRepository{
    private ormRepository:Repository<User>
    constructor(){
        this.ormRepository = getRepository(User)
    }

    public async findById(id:string):Promise<User | undefined>{
        const user = await this.ormRepository.findOne(id)
        return user
    }


    public async findByEmail(email:string):Promise<User | undefined>{
        const user = await this.ormRepository.findOne({
            where:{
                email
            }
        })

        return user
    }
 
    public async save(user:User):Promise<User >{
        const users = await this.ormRepository.save(user)
        return users
    }

    public async create(userData:ICreateUserDTO):Promise<User>{
        const user =  this.ormRepository.create(userData)

        await this.ormRepository.save(user)



        return user
    }

}
