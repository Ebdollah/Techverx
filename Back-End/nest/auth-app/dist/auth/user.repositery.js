"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepositery = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let UsersRepositery = class UsersRepositery extends typeorm_1.Repository {
    constructor(dataSource) {
        super(user_entity_1.User, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createUser(authDto) {
        const { username, email, password } = authDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ username, email, password: hashedPassword });
        try {
            await this.save(user);
        }
        catch (error) {
            if (error.code === 23505) {
                throw new common_1.ConflictException("Username already exist");
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
            console.log(error);
        }
    }
};
exports.UsersRepositery = UsersRepositery;
exports.UsersRepositery = UsersRepositery = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UsersRepositery);
//# sourceMappingURL=user.repositery.js.map