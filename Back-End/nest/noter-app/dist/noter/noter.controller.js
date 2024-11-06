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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoterController = void 0;
const common_1 = require("@nestjs/common");
const noter_service_1 = require("./noter.service");
const create_noter_dto_1 = require("./dto/create-noter.dto");
let NoterController = class NoterController {
    constructor(noterService) {
        this.noterService = noterService;
    }
    create(createNoterDto) {
        return this.noterService.create(createNoterDto);
    }
    findAll(createNoterDto) {
        return this.noterService.findAll();
    }
};
exports.NoterController = NoterController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_noter_dto_1.CreateNoterDto]),
    __metadata("design:returntype", void 0)
], NoterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_noter_dto_1.CreateNoterDto]),
    __metadata("design:returntype", void 0)
], NoterController.prototype, "findAll", null);
exports.NoterController = NoterController = __decorate([
    (0, common_1.Controller)('noter'),
    __metadata("design:paramtypes", [noter_service_1.NoterService])
], NoterController);
//# sourceMappingURL=noter.controller.js.map