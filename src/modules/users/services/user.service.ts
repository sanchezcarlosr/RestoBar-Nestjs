import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas";
import { Model } from 'mongoose'
import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { plainToInstance } from "class-transformer";
import { UserResponseDTO } from "../dto/response-user.dto";
import { CreateUserDTO, UpdateUserDto } from "../dto";
import { PasswordService } from "./password.service";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { StorageService } from "src/modules/common/storages/storage.service";

export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private eventEmmiter: EventEmitter2,
        private storageService: StorageService,
        private passwordService: PasswordService,
    ) {

    }

    async getUser(): Promise<UserResponseDTO[]> {
        const data = await this.userModel.find().lean();
        //Ejemplo de un evento escuchando
        //this.eventEmmiter.emit('user.registered', { name: 'carlos', email: '44877662@fi.unju.edu.ar' });
        return plainToInstance(UserResponseDTO, data, {
            excludeExtraneousValues: true,
        })
    }

    async findUserByEmail(email: string): Promise<UserResponseDTO> {
        const userFound = await this.userModel.findOne({ email: email }).lean();
        if (!userFound) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return plainToInstance(UserResponseDTO, userFound, {
            excludeExtraneousValues: true,
        });
    }

    async registerUser(createUserDto: CreateUserDTO, file: Express.Multer.File): Promise<UserResponseDTO> {
        const encryptedPassword = await this.passwordService.hashPassword(createUserDto.password);
        const urlPhoto = await this.storageService.savePhoto(file, 'user-photos');
        const userRegistered = new this.userModel({ ...createUserDto, password: encryptedPassword , urlPhoto: urlPhoto}).save();
        return plainToInstance(UserResponseDTO, userRegistered, {
            excludeExtraneousValues: true,
        });
    }

    async updateUser(email: string, updateUserDto: UpdateUserDto): Promise<UserResponseDTO> {
        const updateUser = await this.userModel
            .findOneAndUpdate({ email: email }, { $set: updateUserDto }, { new: true }).lean();
        return plainToInstance(UserResponseDTO, updateUser, {
            excludeExtraneousValues: true,
        });
    }

    async updatePassword(email: string, changePasswordDto: ChangePasswordDto): Promise<boolean> {
        const userFoud = await this.userModel.findOne({ emai: email }).exec();
        if (!userFoud) {
            throw new NotFoundException(
                `Cannot change password: No user found with email "${email}".`,
            );
        }
        const successPassword = await this.passwordService.compareEncryptedPassword(
            changePasswordDto.currentPassword,
            userFoud.password
        );

        if (!successPassword) {
            throw new BadRequestException(
                'The current password you provided is incorrect.',
            );
        }

        if (changePasswordDto.currentPassword === changePasswordDto.newPassword) {
            throw new BadRequestException(
                'The new password cannot be the same as the current password.',
            );
        }
        userFoud.password = await this.passwordService.hashPassword(changePasswordDto.newPassword);
        await userFoud.save()
        return true;
    }

    async deleteUserByEmail(email: string): Promise<UserResponseDTO | null> {
        const userDeleted = await this.userModel.findOneAndDelete({ email: email }).lean();
        return plainToInstance(UserResponseDTO, userDeleted, {
            excludeExtraneousValues: true,
        })
    }
}