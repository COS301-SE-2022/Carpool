/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const shell_1 = __webpack_require__("./libs/api/shell/feature/src/index.ts");
const config_1 = __webpack_require__("@nestjs/config");
const mailer_1 = __webpack_require__("@nestjs-modules/mailer");
const path_1 = __webpack_require__("path");
const handlebars_adapter_1 = __webpack_require__("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        // imports: [ApiShellFeatureModule, ConfigModule.forRoot()],
        imports: [
            shell_1.ApiShellFeatureModule,
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        transport: {
                            host: config.get('EMAIL_HOST'),
                            secure: false,
                            auth: {
                                user: config.get('EMAIL_USER'),
                                pass: config.get('EMAIL_PASSWORD'),
                            },
                        },
                        defaults: {
                            from: 'blulancetech@gmail.com',
                        },
                        template: {
                            dir: (0, path_1.join)(__dirname, './mail_templates'),
                            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                            options: {
                                strict: true,
                            },
                        },
                    });
                }),
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule.forRoot(),
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./libs/api/authentication/api/feature/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/authentication/api/feature/src/lib/api-authentication-api-feature.module.ts"), exports);


/***/ }),

/***/ "./libs/api/authentication/api/feature/src/lib/api-authentication-api-feature.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticationModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const repository_1 = __webpack_require__("./libs/api/authentication/repository/data-access/src/index.ts");
const service_1 = __webpack_require__("./libs/api/authentication/service/feature/src/index.ts");
const auth_resolver_resolver_1 = __webpack_require__("./libs/api/authentication/api/feature/src/lib/auth-resolver.resolver.ts");
const service_2 = __webpack_require__("./libs/api/authentication/service/feature/src/index.ts");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const prisma_1 = __webpack_require__("./libs/api/shared/services/prisma/data-access/src/index.ts");
const service_3 = __webpack_require__("./libs/api/drivers/service/feature/src/index.ts");
const service_4 = __webpack_require__("./libs/api/trips/service/feature/src/index.ts");
let AuthenticationModule = class AuthenticationModule {
};
AuthenticationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule],
        providers: [
            auth_resolver_resolver_1.AuthResolver,
            service_1.AuthService,
            service_3.DriversService,
            service_2.DriverRegisterHandler,
            service_4.TripsService,
            service_2.FindTopUsersHandler,
            service_2.FindAllUsersHandler,
            service_2.FindTotalDriversHandler,
            service_2.FindTotalUsersHandler,
            service_2.FindTopUniversitiesHandler,
            service_2.FindRecentUsersHandler,
            service_2.ResetPasswordHandler,
            service_2.ForgotPasswordHandler,
            prisma_1.PrismaService,
            service_2.UserLoginHandler,
            service_2.UserUpdateHandler,
            service_2.UserRegisterHandler,
            service_1.UserVerifyHandler,
            repository_1.AuthRepository,
            service_1.FindUserByIdHandler,
        ],
    })
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;


/***/ }),

/***/ "./libs/api/authentication/api/feature/src/lib/auth-resolver.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const service_1 = __webpack_require__("./libs/api/authentication/service/feature/src/index.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const entities_1 = __webpack_require__("./libs/api/authentication/api/shared/entities/data-access/src/index.ts");
const service_2 = __webpack_require__("./libs/api/drivers/service/feature/src/index.ts");
const service_3 = __webpack_require__("./libs/api/trips/service/feature/src/index.ts");
const entities_2 = __webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/index.ts");
let AuthResolver = class AuthResolver {
    constructor(authService, driversService, tripsService) {
        this.authService = authService;
        this.driversService = driversService;
        this.tripsService = tripsService;
    }
    tripsCreated(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findByDriver(user.id);
        });
    }
    bookings(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findBookingsByUser(user.id);
        });
    }
    driver(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.driversService.findDriverProfile(user.id);
        });
    }
    findUserById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.findUserById(id);
        });
    }
    findTopUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.findTopUsers();
        });
    }
    findAllUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.findAllUsers();
        });
    }
    findTotalUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.findTotalUsers();
        });
    }
    findTotalDrivers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.findTotalDrivers();
        });
    }
    findRecentUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.findRecentUsers();
        });
    }
    findTopUniversities() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.findTopUniversities();
        });
    }
    login(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userObj = yield this.authService.login(email, password);
            if (userObj) {
                const user = new entities_1.UserLogin();
                user.id = userObj.id;
                user.email = userObj.email;
                user.isDriver = userObj.isDriver;
                if (userObj.isValidated) {
                    user.token = 'generate';
                }
                else {
                    user.token = '';
                }
                return user;
            }
            else {
                throw new Error('Invalid credentials');
            }
        });
    }
    register(name, surname, email, university, studentNumber, password, cellNumber) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userObj = yield this.authService.register(name, surname, email, university, studentNumber, password, cellNumber);
            if (userObj) {
                const user = new entities_1.UserLogin();
                user.id = userObj.id;
                user.email = userObj.email;
                user.verificationCode = `${Math.floor(100000 + Math.random() * 900000)}`;
                const date = new Date();
                date.setDate(date.getDate() + 1);
                user.expires = date;
                console.log('before email');
                yield this.authService.sendVerificationEmail(user.email, user.verificationCode);
                console.log('after email');
                return user;
            }
            else {
                throw new Error('Something went wrong!');
            }
        });
    }
    forgotPassword(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userObj = yield this.authService.forgotPassword(email);
            if (userObj) {
                const user = new entities_1.ForgotPassword();
                user.email = userObj.email;
                user.verificationCode = `${Math.floor(100000 + Math.random() * 900000)}`;
                const date = new Date();
                date.setDate(date.getDate() + 1);
                user.expires = date;
                console.log('before email');
                yield this.authService.sendVerificationEmail(user.email, user.verificationCode);
                console.log('after email');
                return user;
            }
            else {
                throw new Error('Something went wrong!');
            }
        });
    }
    resetPassword(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.resetPassword(email, password);
        });
    }
    registerDriver(ID, licensePlate, carModel, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const driverObj = yield this.authService.registerDriver(userId, licensePlate, carModel, ID);
            if (driverObj) {
                return driverObj;
            }
            else {
                throw new Error('Something went wrong!');
            }
        });
    }
    verifyEmail(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.verifyEmail(id);
        });
    }
    updateUser(id, name, surname, email, university, studentNumber, cellNumber) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.updateUser(id, name, surname, email, university, studentNumber, cellNumber);
        });
    }
};
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => [entities_2.Trip]),
    tslib_1.__param(0, (0, graphql_1.Root)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthResolver.prototype, "tripsCreated", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => [entities_2.Booking]),
    tslib_1.__param(0, (0, graphql_1.Root)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AuthResolver.prototype, "bookings", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => entities_1.Driver),
    tslib_1.__param(0, (0, graphql_1.Root)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AuthResolver.prototype, "driver", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => entities_1.User),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AuthResolver.prototype, "findUserById", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_1.User]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], AuthResolver.prototype, "findTopUsers", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_1.User]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], AuthResolver.prototype, "findAllUsers", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => Number),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], AuthResolver.prototype, "findTotalUsers", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => Number),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], AuthResolver.prototype, "findTotalDrivers", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_1.User]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], AuthResolver.prototype, "findRecentUsers", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_1.TopUniversities]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], AuthResolver.prototype, "findTopUniversities", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => entities_1.UserLogin),
    tslib_1.__param(0, (0, graphql_1.Args)('email')),
    tslib_1.__param(1, (0, graphql_1.Args)('password')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], AuthResolver.prototype, "login", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_1.UserLogin),
    tslib_1.__param(0, (0, graphql_1.Args)('name')),
    tslib_1.__param(1, (0, graphql_1.Args)('surname')),
    tslib_1.__param(2, (0, graphql_1.Args)('email')),
    tslib_1.__param(3, (0, graphql_1.Args)('university')),
    tslib_1.__param(4, (0, graphql_1.Args)('studentNumber')),
    tslib_1.__param(5, (0, graphql_1.Args)('password')),
    tslib_1.__param(6, (0, graphql_1.Args)('cellNumber')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], AuthResolver.prototype, "register", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => entities_1.ForgotPassword),
    tslib_1.__param(0, (0, graphql_1.Args)('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], AuthResolver.prototype, "forgotPassword", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_1.User),
    tslib_1.__param(0, (0, graphql_1.Args)('email')),
    tslib_1.__param(1, (0, graphql_1.Args)('password')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "resetPassword", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_1.Driver),
    tslib_1.__param(0, (0, graphql_1.Args)('ID')),
    tslib_1.__param(1, (0, graphql_1.Args)('licensePlate')),
    tslib_1.__param(2, (0, graphql_1.Args)('carModel')),
    tslib_1.__param(3, (0, graphql_1.Args)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], AuthResolver.prototype, "registerDriver", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], AuthResolver.prototype, "verifyEmail", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_1.User),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__param(1, (0, graphql_1.Args)('name')),
    tslib_1.__param(2, (0, graphql_1.Args)('surname')),
    tslib_1.__param(3, (0, graphql_1.Args)('email')),
    tslib_1.__param(4, (0, graphql_1.Args)('university')),
    tslib_1.__param(5, (0, graphql_1.Args)('studentNumber')),
    tslib_1.__param(6, (0, graphql_1.Args)('cellNumber')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_x = typeof Promise !== "undefined" && Promise) === "function" ? _x : Object)
], AuthResolver.prototype, "updateUser", null);
AuthResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => entities_1.User),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof service_1.AuthService !== "undefined" && service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof service_2.DriversService !== "undefined" && service_2.DriversService) === "function" ? _b : Object, typeof (_c = typeof service_3.TripsService !== "undefined" && service_3.TripsService) === "function" ? _c : Object])
], AuthResolver);
exports.AuthResolver = AuthResolver;


/***/ }),

/***/ "./libs/api/authentication/api/shared/entities/data-access/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/authentication/api/shared/entities/data-access/src/lib/api-authentication-api-shared-entities-data-access.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/authentication/api/shared/entities/data-access/src/lib/auth-entity.entity.ts"), exports);


/***/ }),

/***/ "./libs/api/authentication/api/shared/entities/data-access/src/lib/api-authentication-api-shared-entities-data-access.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiAuthenticationApiSharedEntitiesDataAccessModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ApiAuthenticationApiSharedEntitiesDataAccessModule = class ApiAuthenticationApiSharedEntitiesDataAccessModule {
};
ApiAuthenticationApiSharedEntitiesDataAccessModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiAuthenticationApiSharedEntitiesDataAccessModule);
exports.ApiAuthenticationApiSharedEntitiesDataAccessModule = ApiAuthenticationApiSharedEntitiesDataAccessModule;


/***/ }),

/***/ "./libs/api/authentication/api/shared/entities/data-access/src/lib/auth-entity.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserUpdate = exports.ForgotPassword = exports.Driver = exports.DriverInput = exports.UserInput = exports.UserLogin = exports.TopUniversities = exports.Count = exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const entities_1 = __webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/index.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let User = class User {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "surname", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "university", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "studentNumber", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "profilePic", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "isDriver", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Number),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "avgRating", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "cellNumber", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "isValidated", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [entities_1.Trip]),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "tripsCreated", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [entities_1.Booking]),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "bookings", void 0);
User = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;
let Count = class Count {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], Count.prototype, "university", void 0);
Count = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Count);
exports.Count = Count;
let TopUniversities = class TopUniversities {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], TopUniversities.prototype, "university", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Count),
    tslib_1.__metadata("design:type", Count)
], TopUniversities.prototype, "_count", void 0);
TopUniversities = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], TopUniversities);
exports.TopUniversities = TopUniversities;
let UserLogin = class UserLogin {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], UserLogin.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserLogin.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], UserLogin.prototype, "isDriver", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserLogin.prototype, "token", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserLogin.prototype, "verificationCode", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UserLogin.prototype, "expires", void 0);
UserLogin = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], UserLogin);
exports.UserLogin = UserLogin;
let UserInput = class UserInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserInput.prototype, "name", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserInput.prototype, "surname", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserInput.prototype, "password", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserInput.prototype, "cellNumber", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserInput.prototype, "university", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserInput.prototype, "studentNumber", void 0);
UserInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserInput);
exports.UserInput = UserInput;
let DriverInput = class DriverInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], DriverInput.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], DriverInput.prototype, "ID", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], DriverInput.prototype, "licensePlate", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], DriverInput.prototype, "carModel", void 0);
DriverInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], DriverInput);
exports.DriverInput = DriverInput;
let Driver = class Driver {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Driver.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Driver.prototype, "idNumber", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Driver.prototype, "license", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Driver.prototype, "licensePlate", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Driver.prototype, "model", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Driver.prototype, "carPicture", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => User),
    tslib_1.__metadata("design:type", User)
], Driver.prototype, "user", void 0);
Driver = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Driver);
exports.Driver = Driver;
let ForgotPassword = class ForgotPassword {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], ForgotPassword.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], ForgotPassword.prototype, "verificationCode", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ForgotPassword.prototype, "expires", void 0);
ForgotPassword = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], ForgotPassword);
exports.ForgotPassword = ForgotPassword;
let UserUpdate = class UserUpdate {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserUpdate.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserUpdate.prototype, "name", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserUpdate.prototype, "surname", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserUpdate.prototype, "cellNumber", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserUpdate.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserUpdate.prototype, "university", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserUpdate.prototype, "studentNumber", void 0);
UserUpdate = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UserUpdate);
exports.UserUpdate = UserUpdate;


/***/ }),

/***/ "./libs/api/authentication/repository/data-access/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/authentication/repository/data-access/src/lib/api-authentication-repository-data-access.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/authentication/repository/data-access/src/lib/auth-repository.repository.ts"), exports);


/***/ }),

/***/ "./libs/api/authentication/repository/data-access/src/lib/api-authentication-repository-data-access.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiAuthenticationRepositoryDataAccessModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ApiAuthenticationRepositoryDataAccessModule = class ApiAuthenticationRepositoryDataAccessModule {
};
ApiAuthenticationRepositoryDataAccessModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiAuthenticationRepositoryDataAccessModule);
exports.ApiAuthenticationRepositoryDataAccessModule = ApiAuthenticationRepositoryDataAccessModule;


/***/ }),

/***/ "./libs/api/authentication/repository/data-access/src/lib/auth-repository.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const prisma_1 = __webpack_require__("./libs/api/shared/services/prisma/data-access/src/index.ts");
const bcrypt = __webpack_require__("bcrypt");
let AuthRepository = class AuthRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findUserById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findUnique({
                where: {
                    id,
                },
            });
        });
    }
    findTotalUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.count();
        });
    }
    findTopUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findMany({
                orderBy: {
                    avgRating: 'desc',
                },
                take: 5,
            });
        });
    }
    findTopUniversities() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const universities = yield this.prisma.user.groupBy({
                by: ['university'],
                _count: {
                    university: true,
                },
                orderBy: {
                    _count: {
                        university: 'desc',
                    },
                },
            });
            return universities;
        });
    }
    findTotalDrivers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.driver.count();
        });
    }
    findAllUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findMany();
        });
    }
    findRecentUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                take: 5,
            });
        });
    }
    findAllDrivers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findMany({
                where: {
                    isDriver: true,
                },
            });
        });
    }
    login(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (user && user.isValidated) {
                const isValidPassword = yield bcrypt.compare(password, user.password);
                // const isValidPassword = user.password === password;
                if (isValidPassword) {
                    return user;
                }
            }
            else if (!user) {
                throw new common_1.NotFoundException(`User with email ${email} does not exist`);
            }
            else if (!user.isValidated) {
                throw new common_1.UnauthorizedException(`Email address has not been validated`);
            }
        });
    }
    register(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userExist = yield this.prisma.user.findUnique({
                where: {
                    email: user.email,
                },
            });
            if (userExist) {
                throw new Error(`User with email ${user.email} already exists`);
            }
            else {
                const salt = yield bcrypt.genSalt();
                const hashedPassword = yield bcrypt.hash(user.password, salt);
                return this.prisma.user.create({
                    data: {
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        university: user.university,
                        studentNumber: user.studentNumber,
                        password: hashedPassword,
                        cellNumber: user.cellNumber,
                        profilePic: '',
                    },
                });
            }
        });
    }
    forgotPassword(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (user) {
                return user;
            }
            else {
                throw new Error(`User with email ${email} does not exist`);
            }
        });
    }
    resetPassword(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt.genSalt();
            const hashedPassword = yield bcrypt.hash(password, salt);
            const user = yield this.prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    password: hashedPassword,
                },
            });
            if (user) {
                return user;
            }
            else {
                throw new Error(`User with email ${email} does not exist`);
            }
        });
    }
    registerDriver(driver) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const driverExist = yield this.prisma.driver.findUnique({
                where: {
                    userId: driver.userId,
                },
            });
            if (driverExist) {
                throw new Error(`User with already registered as driver`);
            }
            else {
                const driverCreated = yield this.prisma.driver.create({
                    data: {
                        idNumber: driver.ID,
                        licensePlate: driver.licensePlate,
                        model: driver.carModel,
                        userId: driver.userId,
                        license: '',
                        carPicture: '',
                    },
                });
                yield this.prisma.user.update({
                    where: {
                        id: driver.userId,
                    },
                    data: {
                        isDriver: true,
                    },
                });
                return driverCreated;
            }
        });
    }
    validateEmail(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    isValidated: true,
                },
            });
            if (user) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    updateUser(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    university: user.university,
                    studentNumber: user.studentNumber,
                    cellNumber: user.cellNumber,
                },
            });
            if (updatedUser) {
                return updatedUser;
            }
        });
    }
};
AuthRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], AuthRepository);
exports.AuthRepository = AuthRepository;


/***/ }),

/***/ "./libs/api/authentication/service/feature/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/authentication/service/feature/src/lib/api-authentication-service-feature.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/authentication/service/feature/src/lib/auth-service.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/authentication/service/feature/src/lib/queries/auth-query-handler.handler.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/authentication/service/feature/src/lib/commands/auth-command-handler.handler.ts"), exports);


/***/ }),

/***/ "./libs/api/authentication/service/feature/src/lib/api-authentication-service-feature.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiAuthenticationServiceFeatureModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ApiAuthenticationServiceFeatureModule = class ApiAuthenticationServiceFeatureModule {
};
ApiAuthenticationServiceFeatureModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiAuthenticationServiceFeatureModule);
exports.ApiAuthenticationServiceFeatureModule = ApiAuthenticationServiceFeatureModule;


/***/ }),

/***/ "./libs/api/authentication/service/feature/src/lib/auth-service.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const auth_query_query_1 = __webpack_require__("./libs/api/authentication/service/feature/src/lib/queries/auth-query.query.ts");
const auth_command_command_1 = __webpack_require__("./libs/api/authentication/service/feature/src/lib/commands/auth-command.command.ts");
const mailer_1 = __webpack_require__("@nestjs-modules/mailer");
let AuthService = class AuthService {
    constructor(queryBus, commandBus, mailerService) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
        this.mailerService = mailerService;
    }
    findUserById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new auth_query_query_1.FindUserByIdQuery(id));
        });
    }
    login(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new auth_query_query_1.UserLoginQuery(email, password));
        });
    }
    findTopUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new auth_query_query_1.FindTopUsersQuery());
        });
    }
    findTotalUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.queryBus.execute(new auth_query_query_1.FindTotalUsersQuery());
        });
    }
    findAllUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.queryBus.execute(new auth_query_query_1.FindAllUsersQuery());
        });
    }
    findTotalDrivers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.queryBus.execute(new auth_query_query_1.FindTotalDriversQuery());
        });
    }
    findRecentUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.queryBus.execute(new auth_query_query_1.FindRecentUsersQuery());
        });
    }
    findTopUniversities() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.queryBus.execute(new auth_query_query_1.FindTopUniversitiesQuery());
        });
    }
    register(name, surname, email, university, studentNumber, password, cellNumber) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new auth_command_command_1.UserRegisterCommand(name, surname, email, university, studentNumber, password, cellNumber));
        });
    }
    forgotPassword(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new auth_query_query_1.ForgotPasswordQuery(email));
        });
    }
    registerDriver(ID, licensePlate, carModel, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new auth_command_command_1.DriverRegisterCommand(userId, licensePlate, carModel, ID));
        });
    }
    verifyEmail(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new auth_command_command_1.UserVerifyCommand(id));
        });
    }
    sendVerificationEmail(email, code) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.mailerService.sendMail({
                to: email,
                subject: 'Greeting from NestJS NodeMailer',
                template: '/confirm_email',
                context: {
                    code: code,
                },
            });
        });
    }
    updateUser(id, name, surname, email, university, studentNumber, cellNumber) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new auth_command_command_1.UserUpdateCommand(id, name, surname, email, university, studentNumber, cellNumber));
        });
    }
    resetPassword(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new auth_command_command_1.ResetPasswordCommand(email, password));
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object, typeof (_c = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _c : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./libs/api/authentication/service/feature/src/lib/commands/auth-command-handler.handler.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResetPasswordHandler = exports.UserUpdateHandler = exports.UserVerifyHandler = exports.DriverRegisterHandler = exports.UserRegisterHandler = void 0;
const tslib_1 = __webpack_require__("tslib");
const repository_1 = __webpack_require__("./libs/api/authentication/repository/data-access/src/index.ts");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const auth_command_command_1 = __webpack_require__("./libs/api/authentication/service/feature/src/lib/commands/auth-command.command.ts");
const entities_1 = __webpack_require__("./libs/api/authentication/api/shared/entities/data-access/src/index.ts");
let UserRegisterHandler = class UserRegisterHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { name, surname, email, university, studentNumber, password, cellNumber, } = command;
            const user = new entities_1.UserInput();
            user.name = name;
            user.surname = surname;
            user.email = email;
            user.university = university;
            user.studentNumber = studentNumber;
            user.password = password;
            user.cellNumber = cellNumber;
            return yield this.authRepository.register(user);
        });
    }
};
UserRegisterHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(auth_command_command_1.UserRegisterCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _a : Object])
], UserRegisterHandler);
exports.UserRegisterHandler = UserRegisterHandler;
let DriverRegisterHandler = class DriverRegisterHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { userId, licensePlate, carModel, ID } = command;
            const driver = new entities_1.DriverInput();
            driver.userId = userId;
            driver.licensePlate = licensePlate;
            driver.carModel = carModel;
            driver.ID = ID;
            return yield this.authRepository.registerDriver(driver);
        });
    }
};
DriverRegisterHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(auth_command_command_1.DriverRegisterCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _b : Object])
], DriverRegisterHandler);
exports.DriverRegisterHandler = DriverRegisterHandler;
let UserVerifyHandler = class UserVerifyHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = command;
            return yield this.authRepository.validateEmail(id);
        });
    }
};
UserVerifyHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(auth_command_command_1.UserVerifyCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _c : Object])
], UserVerifyHandler);
exports.UserVerifyHandler = UserVerifyHandler;
let UserUpdateHandler = class UserUpdateHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id, name, surname, email, university, studentNumber, cellNumber } = command;
            const user = new entities_1.UserUpdate();
            user.id = id;
            user.name = name;
            user.surname = surname;
            user.email = email;
            user.university = university;
            user.studentNumber = studentNumber;
            user.cellNumber = cellNumber;
            return yield this.authRepository.updateUser(user);
        });
    }
};
UserUpdateHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(auth_command_command_1.UserUpdateCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _d : Object])
], UserUpdateHandler);
exports.UserUpdateHandler = UserUpdateHandler;
let ResetPasswordHandler = class ResetPasswordHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { email, password } = command;
            return yield this.authRepository.resetPassword(email, password);
        });
    }
};
ResetPasswordHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(auth_command_command_1.ResetPasswordCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _e : Object])
], ResetPasswordHandler);
exports.ResetPasswordHandler = ResetPasswordHandler;


/***/ }),

/***/ "./libs/api/authentication/service/feature/src/lib/commands/auth-command.command.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResetPasswordCommand = exports.UserUpdateCommand = exports.UserVerifyCommand = exports.DriverRegisterCommand = exports.UserRegisterCommand = void 0;
class UserRegisterCommand {
    constructor(name, surname, email, university, studentNumber, password, cellNumber) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.university = university;
        this.studentNumber = studentNumber;
        this.password = password;
        this.cellNumber = cellNumber;
    }
}
exports.UserRegisterCommand = UserRegisterCommand;
class DriverRegisterCommand {
    constructor(ID, licensePlate, carModel, userId) {
        this.ID = ID;
        this.licensePlate = licensePlate;
        this.carModel = carModel;
        this.userId = userId;
    }
}
exports.DriverRegisterCommand = DriverRegisterCommand;
class UserVerifyCommand {
    constructor(id) {
        this.id = id;
    }
}
exports.UserVerifyCommand = UserVerifyCommand;
class UserUpdateCommand {
    constructor(id, name, surname, email, university, studentNumber, cellNumber) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.university = university;
        this.studentNumber = studentNumber;
        this.cellNumber = cellNumber;
    }
}
exports.UserUpdateCommand = UserUpdateCommand;
class ResetPasswordCommand {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
exports.ResetPasswordCommand = ResetPasswordCommand;


/***/ }),

/***/ "./libs/api/authentication/service/feature/src/lib/queries/auth-query-handler.handler.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindTopUsersHandler = exports.FindAllUsersHandler = exports.FindTopUniversitiesHandler = exports.FindRecentUsersHandler = exports.FindTotalDriversHandler = exports.FindTotalUsersHandler = exports.ForgotPasswordHandler = exports.FindUserByIdHandler = exports.UserLoginHandler = void 0;
const tslib_1 = __webpack_require__("tslib");
const repository_1 = __webpack_require__("./libs/api/authentication/repository/data-access/src/index.ts");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const auth_query_query_1 = __webpack_require__("./libs/api/authentication/service/feature/src/lib/queries/auth-query.query.ts");
let UserLoginHandler = class UserLoginHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authRepository.login(query.email, query.password);
        });
    }
};
UserLoginHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(auth_query_query_1.UserLoginQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _a : Object])
], UserLoginHandler);
exports.UserLoginHandler = UserLoginHandler;
let FindUserByIdHandler = class FindUserByIdHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authRepository.findUserById(query.id);
        });
    }
};
FindUserByIdHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(auth_query_query_1.FindUserByIdQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _b : Object])
], FindUserByIdHandler);
exports.FindUserByIdHandler = FindUserByIdHandler;
let ForgotPasswordHandler = class ForgotPasswordHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authRepository.forgotPassword(query.email);
        });
    }
};
ForgotPasswordHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(auth_query_query_1.ForgotPasswordQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _c : Object])
], ForgotPasswordHandler);
exports.ForgotPasswordHandler = ForgotPasswordHandler;
let FindTotalUsersHandler = class FindTotalUsersHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authRepository.findTotalUsers();
        });
    }
};
FindTotalUsersHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(auth_query_query_1.FindTotalUsersQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _d : Object])
], FindTotalUsersHandler);
exports.FindTotalUsersHandler = FindTotalUsersHandler;
let FindTotalDriversHandler = class FindTotalDriversHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authRepository.findTotalDrivers();
        });
    }
};
FindTotalDriversHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(auth_query_query_1.FindTotalDriversQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _e : Object])
], FindTotalDriversHandler);
exports.FindTotalDriversHandler = FindTotalDriversHandler;
let FindRecentUsersHandler = class FindRecentUsersHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authRepository.findRecentUsers();
        });
    }
};
FindRecentUsersHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(auth_query_query_1.FindRecentUsersQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _f : Object])
], FindRecentUsersHandler);
exports.FindRecentUsersHandler = FindRecentUsersHandler;
let FindTopUniversitiesHandler = class FindTopUniversitiesHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authRepository.findTopUniversities();
        });
    }
};
FindTopUniversitiesHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(auth_query_query_1.FindTopUniversitiesQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _g : Object])
], FindTopUniversitiesHandler);
exports.FindTopUniversitiesHandler = FindTopUniversitiesHandler;
let FindAllUsersHandler = class FindAllUsersHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authRepository.findAllUsers();
        });
    }
};
FindAllUsersHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(auth_query_query_1.FindAllUsersQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _h : Object])
], FindAllUsersHandler);
exports.FindAllUsersHandler = FindAllUsersHandler;
let FindTopUsersHandler = class FindTopUsersHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authRepository.findTopUsers();
        });
    }
};
FindTopUsersHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(auth_query_query_1.FindTopUsersQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof repository_1.AuthRepository !== "undefined" && repository_1.AuthRepository) === "function" ? _j : Object])
], FindTopUsersHandler);
exports.FindTopUsersHandler = FindTopUsersHandler;


/***/ }),

/***/ "./libs/api/authentication/service/feature/src/lib/queries/auth-query.query.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindTopUsersQuery = exports.FindAllUsersQuery = exports.FindTopUniversitiesQuery = exports.FindRecentUsersQuery = exports.FindTotalDriversQuery = exports.FindTotalUsersQuery = exports.ForgotPasswordQuery = exports.FindUserByIdQuery = exports.UserLoginQuery = void 0;
class UserLoginQuery {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
exports.UserLoginQuery = UserLoginQuery;
class FindUserByIdQuery {
    constructor(id) {
        this.id = id;
    }
}
exports.FindUserByIdQuery = FindUserByIdQuery;
class ForgotPasswordQuery {
    constructor(email) {
        this.email = email;
    }
}
exports.ForgotPasswordQuery = ForgotPasswordQuery;
class FindTotalUsersQuery {
}
exports.FindTotalUsersQuery = FindTotalUsersQuery;
class FindTotalDriversQuery {
}
exports.FindTotalDriversQuery = FindTotalDriversQuery;
class FindRecentUsersQuery {
}
exports.FindRecentUsersQuery = FindRecentUsersQuery;
class FindTopUniversitiesQuery {
}
exports.FindTopUniversitiesQuery = FindTopUniversitiesQuery;
class FindAllUsersQuery {
}
exports.FindAllUsersQuery = FindAllUsersQuery;
class FindTopUsersQuery {
}
exports.FindTopUsersQuery = FindTopUsersQuery;


/***/ }),

/***/ "./libs/api/bookings/api/feature/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/bookings/api/feature/src/lib/api-bookings-api-feature.module.ts"), exports);


/***/ }),

/***/ "./libs/api/bookings/api/feature/src/lib/api-bookings-api-feature.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const service_1 = __webpack_require__("./libs/api/authentication/service/feature/src/index.ts");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const prisma_1 = __webpack_require__("./libs/api/shared/services/prisma/data-access/src/index.ts");
const service_2 = __webpack_require__("./libs/api/trips/service/feature/src/index.ts");
const repository_1 = __webpack_require__("./libs/api/trips/repository/data-access/src/index.ts");
const bookings_resolver_resolver_1 = __webpack_require__("./libs/api/bookings/api/feature/src/lib/bookings-resolver.resolver.ts");
const service_3 = __webpack_require__("./libs/api/trips/service/feature/src/index.ts");
let BookingsModule = class BookingsModule {
};
BookingsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule],
        providers: [
            service_1.AuthService,
            service_2.TripsService,
            repository_1.TripsRepository,
            bookings_resolver_resolver_1.BookingResolver,
            prisma_1.PrismaService,
            service_3.FindAllTripRequestsHandler,
        ],
    })
], BookingsModule);
exports.BookingsModule = BookingsModule;


/***/ }),

/***/ "./libs/api/bookings/api/feature/src/lib/bookings-resolver.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const entities_1 = __webpack_require__("./libs/api/authentication/api/shared/entities/data-access/src/index.ts");
const entities_2 = __webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/index.ts");
const service_1 = __webpack_require__("./libs/api/trips/service/feature/src/index.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const service_2 = __webpack_require__("./libs/api/authentication/service/feature/src/index.ts");
let BookingResolver = class BookingResolver {
    constructor(tripsService, authService) {
        this.tripsService = tripsService;
        this.authService = authService;
    }
    user(booking) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.findUserById(booking.userId);
        });
    }
    trip(booking) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findTripById(booking.tripId);
        });
    }
    findAllTripRequests(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findAllTripRequests(userId);
        });
    }
};
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => entities_1.User),
    tslib_1.__param(0, (0, graphql_1.Root)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof entities_2.Booking !== "undefined" && entities_2.Booking) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], BookingResolver.prototype, "user", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => entities_2.Trip),
    tslib_1.__param(0, (0, graphql_1.Root)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof entities_2.Booking !== "undefined" && entities_2.Booking) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], BookingResolver.prototype, "trip", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_2.Booking]),
    tslib_1.__param(0, (0, graphql_1.Args)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], BookingResolver.prototype, "findAllTripRequests", null);
BookingResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => entities_2.Booking),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof service_1.TripsService !== "undefined" && service_1.TripsService) === "function" ? _a : Object, typeof (_b = typeof service_2.AuthService !== "undefined" && service_2.AuthService) === "function" ? _b : Object])
], BookingResolver);
exports.BookingResolver = BookingResolver;


/***/ }),

/***/ "./libs/api/drivers/api/feature/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/drivers/api/feature/src/lib/api-drivers-api-feature.module.ts"), exports);


/***/ }),

/***/ "./libs/api/drivers/api/feature/src/lib/api-drivers-api-feature.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriversModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const prisma_1 = __webpack_require__("./libs/api/shared/services/prisma/data-access/src/index.ts");
const service_1 = __webpack_require__("./libs/api/authentication/service/feature/src/index.ts");
const service_2 = __webpack_require__("./libs/api/drivers/service/feature/src/index.ts");
const repository_1 = __webpack_require__("./libs/api/drivers/repository/data-access/src/index.ts");
const drivers_resolver_resolver_1 = __webpack_require__("./libs/api/drivers/api/feature/src/lib/drivers-resolver.resolver.ts");
let DriversModule = class DriversModule {
};
DriversModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule],
        providers: [
            //** RESOLVER */
            drivers_resolver_resolver_1.DriversResolver,
            //** REPOSITORY */
            repository_1.DriversRepository,
            //** SERVICES */
            service_2.DriversService,
            prisma_1.PrismaService,
            service_1.AuthService,
            //** COMMAND HANDLERS */
            service_2.FindDriverProfileHandler,
        ],
    })
], DriversModule);
exports.DriversModule = DriversModule;


/***/ }),

/***/ "./libs/api/drivers/api/feature/src/lib/drivers-resolver.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriversResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const entities_1 = __webpack_require__("./libs/api/authentication/api/shared/entities/data-access/src/index.ts");
const service_1 = __webpack_require__("./libs/api/drivers/service/feature/src/index.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const service_2 = __webpack_require__("./libs/api/authentication/service/feature/src/index.ts");
let DriversResolver = class DriversResolver {
    constructor(driversService, authService) {
        this.driversService = driversService;
        this.authService = authService;
    }
    user(driver) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.findUserById(driver.userId);
        });
    }
    /**
     * Query to find a driver profile
     * @param {string} id The id of the driver to find
     * @returns {Promise<Trip[]>}
     */
    findDriverProfile(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.driversService.findDriverProfile(userId);
        });
    }
};
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => entities_1.User),
    tslib_1.__param(0, (0, graphql_1.Root)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof entities_1.Driver !== "undefined" && entities_1.Driver) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], DriversResolver.prototype, "user", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => entities_1.Driver),
    tslib_1.__param(0, (0, graphql_1.Args)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], DriversResolver.prototype, "findDriverProfile", null);
DriversResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => entities_1.Driver),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof service_1.DriversService !== "undefined" && service_1.DriversService) === "function" ? _a : Object, typeof (_b = typeof service_2.AuthService !== "undefined" && service_2.AuthService) === "function" ? _b : Object])
], DriversResolver);
exports.DriversResolver = DriversResolver;


/***/ }),

/***/ "./libs/api/drivers/repository/data-access/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/drivers/repository/data-access/src/lib/api-drivers-repository-data-access.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/drivers/repository/data-access/src/lib/drivers-repository.repository.ts"), exports);


/***/ }),

/***/ "./libs/api/drivers/repository/data-access/src/lib/api-drivers-repository-data-access.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiDriversRepositoryDataAccessModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ApiDriversRepositoryDataAccessModule = class ApiDriversRepositoryDataAccessModule {
};
ApiDriversRepositoryDataAccessModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiDriversRepositoryDataAccessModule);
exports.ApiDriversRepositoryDataAccessModule = ApiDriversRepositoryDataAccessModule;


/***/ }),

/***/ "./libs/api/drivers/repository/data-access/src/lib/drivers-repository.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriversRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const prisma_1 = __webpack_require__("./libs/api/shared/services/prisma/data-access/src/index.ts");
let DriversRepository = class DriversRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findDriverProfile(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.driver.findUnique({
                where: {
                    userId: userId,
                },
            });
        });
    }
};
DriversRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], DriversRepository);
exports.DriversRepository = DriversRepository;


/***/ }),

/***/ "./libs/api/drivers/service/feature/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/drivers/service/feature/src/lib/api-drivers-service-feature.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/drivers/service/feature/src/lib/drivers-service.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/drivers/service/feature/src/lib/queries/drivers-query-handler.handler.ts"), exports);


/***/ }),

/***/ "./libs/api/drivers/service/feature/src/lib/api-drivers-service-feature.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiDriversServiceFeatureModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ApiDriversServiceFeatureModule = class ApiDriversServiceFeatureModule {
};
ApiDriversServiceFeatureModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiDriversServiceFeatureModule);
exports.ApiDriversServiceFeatureModule = ApiDriversServiceFeatureModule;


/***/ }),

/***/ "./libs/api/drivers/service/feature/src/lib/drivers-service.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriversService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const drivers_query_query_1 = __webpack_require__("./libs/api/drivers/service/feature/src/lib/queries/drivers-query.query.ts");
let DriversService = class DriversService {
    constructor(queryBus) {
        this.queryBus = queryBus;
    }
    findDriverProfile(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new drivers_query_query_1.FindDriverProfileQuery(userId));
        });
    }
};
DriversService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _a : Object])
], DriversService);
exports.DriversService = DriversService;


/***/ }),

/***/ "./libs/api/drivers/service/feature/src/lib/queries/drivers-query-handler.handler.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindDriverProfileHandler = void 0;
const tslib_1 = __webpack_require__("tslib");
const repository_1 = __webpack_require__("./libs/api/drivers/repository/data-access/src/index.ts");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const drivers_query_query_1 = __webpack_require__("./libs/api/drivers/service/feature/src/lib/queries/drivers-query.query.ts");
let FindDriverProfileHandler = class FindDriverProfileHandler {
    constructor(driversRepository) {
        this.driversRepository = driversRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.driversRepository.findDriverProfile(query.userId);
        });
    }
};
FindDriverProfileHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(drivers_query_query_1.FindDriverProfileQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof repository_1.DriversRepository !== "undefined" && repository_1.DriversRepository) === "function" ? _a : Object])
], FindDriverProfileHandler);
exports.FindDriverProfileHandler = FindDriverProfileHandler;


/***/ }),

/***/ "./libs/api/drivers/service/feature/src/lib/queries/drivers-query.query.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindDriverProfileQuery = void 0;
class FindDriverProfileQuery {
    constructor(userId) {
        this.userId = userId;
    }
}
exports.FindDriverProfileQuery = FindDriverProfileQuery;


/***/ }),

/***/ "./libs/api/messages/api/feature/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/messages/api/feature/src/lib/api-messages-api-feature.module.ts"), exports);


/***/ }),

/***/ "./libs/api/messages/api/feature/src/lib/api-messages-api-feature.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const data_access_1 = __webpack_require__("./libs/api/messages/repository/data-access/src/index.ts");
const feature_1 = __webpack_require__("./libs/api/messages/service/feature/src/index.ts");
const message_resolver_resolver_1 = __webpack_require__("./libs/api/messages/api/feature/src/lib/message-resolver.resolver.ts");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const prisma_1 = __webpack_require__("./libs/api/shared/services/prisma/data-access/src/index.ts");
const service_1 = __webpack_require__("./libs/api/authentication/service/feature/src/index.ts");
let MessageModule = class MessageModule {
};
MessageModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule],
        providers: [
            message_resolver_resolver_1.MessageResolver,
            feature_1.MessageService,
            feature_1.CreateMessageHandler,
            feature_1.GetMessagesHandler,
            prisma_1.PrismaService,
            service_1.AuthService,
            data_access_1.MessageRepository,
            feature_1.GetChatsHandler,
        ],
    })
], MessageModule);
exports.MessageModule = MessageModule;


/***/ }),

/***/ "./libs/api/messages/api/feature/src/lib/message-resolver.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const feature_1 = __webpack_require__("./libs/api/messages/service/feature/src/index.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const entities_1 = __webpack_require__("./libs/api/messages/api/shared/entities/data-access/src/index.ts");
const entities_2 = __webpack_require__("./libs/api/authentication/api/shared/entities/data-access/src/index.ts");
const entities_3 = __webpack_require__("./libs/api/messages/api/shared/entities/data-access/src/index.ts");
const service_1 = __webpack_require__("./libs/api/authentication/service/feature/src/index.ts");
const graphql_subscriptions_1 = __webpack_require__("graphql-subscriptions");
const pubSub = new graphql_subscriptions_1.PubSub();
let MessageResolver = class MessageResolver {
    constructor(messageService, authService) {
        this.messageService = messageService;
        this.authService = authService;
    }
    sender(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.findUserById(message.senderId);
        });
    }
    receiver(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.findUserById(message.receiverId);
        });
    }
    getMessages(senderId, receiverId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.messageService.getMessages(senderId, receiverId);
        });
    }
    getChats(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.messageService.getChats(userId);
        });
    }
    createMessage(message, senderId, receiverId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newMessage = yield this.messageService.createMessage(senderId, receiverId, message);
            pubSub.publish('messageSent', { messageSent: newMessage });
            return newMessage;
        });
    }
    messageSent() {
        return pubSub.asyncIterator('messageSent');
    }
};
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => entities_2.User),
    tslib_1.__param(0, (0, graphql_1.Root)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof entities_1.Message !== "undefined" && entities_1.Message) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], MessageResolver.prototype, "sender", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => entities_2.User),
    tslib_1.__param(0, (0, graphql_1.Root)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof entities_1.Message !== "undefined" && entities_1.Message) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], MessageResolver.prototype, "receiver", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_1.Message]),
    tslib_1.__param(0, (0, graphql_1.Args)('senderId')),
    tslib_1.__param(1, (0, graphql_1.Args)('receiverId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], MessageResolver.prototype, "getMessages", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_3.Chat]),
    tslib_1.__param(0, (0, graphql_1.Args)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], MessageResolver.prototype, "getChats", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_1.Message),
    tslib_1.__param(0, (0, graphql_1.Args)('message')),
    tslib_1.__param(1, (0, graphql_1.Args)('senderId')),
    tslib_1.__param(2, (0, graphql_1.Args)('receiverId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], MessageResolver.prototype, "createMessage", null);
tslib_1.__decorate([
    (0, graphql_1.Subscription)(() => entities_1.Message, { name: 'messageSent' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MessageResolver.prototype, "messageSent", null);
MessageResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => entities_1.Message),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof feature_1.MessageService !== "undefined" && feature_1.MessageService) === "function" ? _a : Object, typeof (_b = typeof service_1.AuthService !== "undefined" && service_1.AuthService) === "function" ? _b : Object])
], MessageResolver);
exports.MessageResolver = MessageResolver;


/***/ }),

/***/ "./libs/api/messages/api/shared/entities/data-access/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/messages/api/shared/entities/data-access/src/lib/api-messages-api-shared-entities-data-access.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/messages/api/shared/entities/data-access/src/lib/message-entity.entity.ts"), exports);


/***/ }),

/***/ "./libs/api/messages/api/shared/entities/data-access/src/lib/api-messages-api-shared-entities-data-access.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiMessagesApiSharedEntitiesDataAccessModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ApiMessagesApiSharedEntitiesDataAccessModule = class ApiMessagesApiSharedEntitiesDataAccessModule {
};
ApiMessagesApiSharedEntitiesDataAccessModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiMessagesApiSharedEntitiesDataAccessModule);
exports.ApiMessagesApiSharedEntitiesDataAccessModule = ApiMessagesApiSharedEntitiesDataAccessModule;


/***/ }),

/***/ "./libs/api/messages/api/shared/entities/data-access/src/lib/message-entity.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageInput = exports.Chat = exports.Message = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const entities_1 = __webpack_require__("./libs/api/authentication/api/shared/entities/data-access/src/index.ts");
let Message = class Message {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "message", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "senderId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "receiverId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => entities_1.User),
    tslib_1.__metadata("design:type", typeof (_a = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _a : Object)
], Message.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => entities_1.User),
    tslib_1.__metadata("design:type", typeof (_b = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _b : Object)
], Message.prototype, "receiver", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Message.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Message.prototype, "updatedAt", void 0);
Message = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Message);
exports.Message = Message;
let Chat = class Chat {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Chat.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Chat.prototype, "name", void 0);
Chat = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Chat);
exports.Chat = Chat;
let MessageInput = class MessageInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], MessageInput.prototype, "message", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], MessageInput.prototype, "senderId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], MessageInput.prototype, "receiverId", void 0);
MessageInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], MessageInput);
exports.MessageInput = MessageInput;


/***/ }),

/***/ "./libs/api/messages/repository/data-access/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/messages/repository/data-access/src/lib/api-messages-repository-data-access.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/messages/repository/data-access/src/lib/message-repository.repository.ts"), exports);


/***/ }),

/***/ "./libs/api/messages/repository/data-access/src/lib/api-messages-repository-data-access.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiMessagesRepositoryDataAccessModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ApiMessagesRepositoryDataAccessModule = class ApiMessagesRepositoryDataAccessModule {
};
ApiMessagesRepositoryDataAccessModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiMessagesRepositoryDataAccessModule);
exports.ApiMessagesRepositoryDataAccessModule = ApiMessagesRepositoryDataAccessModule;


/***/ }),

/***/ "./libs/api/messages/repository/data-access/src/lib/message-repository.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const prisma_1 = __webpack_require__("./libs/api/shared/services/prisma/data-access/src/index.ts");
const entities_1 = __webpack_require__("./libs/api/messages/api/shared/entities/data-access/src/index.ts");
let MessageRepository = class MessageRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createMessage(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.message.create({
                data: {
                    senderId: message.senderId,
                    receiverId: message.receiverId,
                    message: message.message,
                },
            });
        });
    }
    getMessages(senderId, receiverId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.message.findMany({
                where: {
                    OR: [
                        {
                            senderId,
                            receiverId,
                        },
                        {
                            senderId: receiverId,
                            receiverId: senderId,
                        },
                    ],
                },
            });
        });
    }
    getChats(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const chats = yield this.prisma.message.findMany({
                where: {
                    OR: [{ receiverId: userId }, { senderId: userId }],
                },
                select: {
                    senderId: true,
                    receiverId: true,
                    sender: {
                        select: {
                            name: true,
                            surname: true,
                        },
                    },
                    receiver: {
                        select: {
                            name: true,
                            surname: true,
                        },
                    },
                },
            });
            let uniqueChats = [];
            chats.map((chat) => {
                const chatObj = new entities_1.Chat();
                if (chat.senderId === userId) {
                    chatObj.userId = chat.receiverId;
                    chatObj.name = `${chat.receiver.name} ${chat.receiver.surname}`;
                }
                else {
                    chatObj.userId = chat.senderId;
                    chatObj.name = `${chat.sender.name} ${chat.sender.surname}`;
                }
                uniqueChats.push(chatObj);
            });
            uniqueChats = uniqueChats.filter((value, index, self) => index ===
                self.findIndex((t) => t.name === value.name && t.userId === value.userId));
            return uniqueChats;
        });
    }
};
MessageRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], MessageRepository);
exports.MessageRepository = MessageRepository;


/***/ }),

/***/ "./libs/api/messages/service/feature/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/messages/service/feature/src/lib/api-messages-service-feature.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/messages/service/feature/src/lib/message-service.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/messages/service/feature/src/lib/queries/message-query-handler.handler.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/messages/service/feature/src/lib/commands/message-command-handler.handler.ts"), exports);


/***/ }),

/***/ "./libs/api/messages/service/feature/src/lib/api-messages-service-feature.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiMessagesServiceFeatureModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ApiMessagesServiceFeatureModule = class ApiMessagesServiceFeatureModule {
};
ApiMessagesServiceFeatureModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiMessagesServiceFeatureModule);
exports.ApiMessagesServiceFeatureModule = ApiMessagesServiceFeatureModule;


/***/ }),

/***/ "./libs/api/messages/service/feature/src/lib/commands/message-command-handler.handler.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMessageHandler = void 0;
const tslib_1 = __webpack_require__("tslib");
const data_access_1 = __webpack_require__("./libs/api/messages/repository/data-access/src/index.ts");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const message_command_command_1 = __webpack_require__("./libs/api/messages/service/feature/src/lib/commands/message-command.command.ts");
const entities_1 = __webpack_require__("./libs/api/messages/api/shared/entities/data-access/src/index.ts");
let CreateMessageHandler = class CreateMessageHandler {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { senderId, receiverId, message } = command;
            const messageObj = new entities_1.MessageInput();
            messageObj.senderId = senderId;
            messageObj.receiverId = receiverId;
            messageObj.message = message;
            return yield this.messageRepository.createMessage(messageObj);
        });
    }
};
CreateMessageHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(message_command_command_1.CreateMessageCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof data_access_1.MessageRepository !== "undefined" && data_access_1.MessageRepository) === "function" ? _a : Object])
], CreateMessageHandler);
exports.CreateMessageHandler = CreateMessageHandler;


/***/ }),

/***/ "./libs/api/messages/service/feature/src/lib/commands/message-command.command.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMessageCommand = void 0;
class CreateMessageCommand {
    constructor(senderId, receiverId, message) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.message = message;
    }
}
exports.CreateMessageCommand = CreateMessageCommand;


/***/ }),

/***/ "./libs/api/messages/service/feature/src/lib/message-service.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const message_query_query_1 = __webpack_require__("./libs/api/messages/service/feature/src/lib/queries/message-query.query.ts");
const message_command_command_1 = __webpack_require__("./libs/api/messages/service/feature/src/lib/commands/message-command.command.ts");
let MessageService = class MessageService {
    constructor(queryBus, commandBus) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
    getMessages(senderId, receiverId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new message_query_query_1.GetMessagesQuery(senderId, receiverId));
        });
    }
    getChats(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new message_query_query_1.GetChatsQuery(userId));
        });
    }
    createMessage(senderId, receiverId, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new message_command_command_1.CreateMessageCommand(senderId, receiverId, message));
        });
    }
};
MessageService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object])
], MessageService);
exports.MessageService = MessageService;


/***/ }),

/***/ "./libs/api/messages/service/feature/src/lib/queries/message-query-handler.handler.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetChatsHandler = exports.GetMessagesHandler = void 0;
const tslib_1 = __webpack_require__("tslib");
const data_access_1 = __webpack_require__("./libs/api/messages/repository/data-access/src/index.ts");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const message_query_query_1 = __webpack_require__("./libs/api/messages/service/feature/src/lib/queries/message-query.query.ts");
let GetMessagesHandler = class GetMessagesHandler {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.messageRepository.getMessages(query.senderId, query.receiverId);
        });
    }
};
GetMessagesHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(message_query_query_1.GetMessagesQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof data_access_1.MessageRepository !== "undefined" && data_access_1.MessageRepository) === "function" ? _a : Object])
], GetMessagesHandler);
exports.GetMessagesHandler = GetMessagesHandler;
let GetChatsHandler = class GetChatsHandler {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.messageRepository.getChats(query.userId);
        });
    }
};
GetChatsHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(message_query_query_1.GetChatsQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof data_access_1.MessageRepository !== "undefined" && data_access_1.MessageRepository) === "function" ? _b : Object])
], GetChatsHandler);
exports.GetChatsHandler = GetChatsHandler;


/***/ }),

/***/ "./libs/api/messages/service/feature/src/lib/queries/message-query.query.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetChatsQuery = exports.GetMessagesQuery = void 0;
class GetMessagesQuery {
    constructor(senderId, receiverId) {
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}
exports.GetMessagesQuery = GetMessagesQuery;
class GetChatsQuery {
    constructor(userId) {
        this.userId = userId;
    }
}
exports.GetChatsQuery = GetChatsQuery;


/***/ }),

/***/ "./libs/api/shared/services/prisma/data-access/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/shared/services/prisma/data-access/src/lib/api-shared-services-prisma-data-access.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/shared/services/prisma/data-access/src/lib/prisma-client.ts"), exports);


/***/ }),

/***/ "./libs/api/shared/services/prisma/data-access/src/lib/api-shared-services-prisma-data-access.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiSharedServicesPrismaDataAccessModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ApiSharedServicesPrismaDataAccessModule = class ApiSharedServicesPrismaDataAccessModule {
};
ApiSharedServicesPrismaDataAccessModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiSharedServicesPrismaDataAccessModule);
exports.ApiSharedServicesPrismaDataAccessModule = ApiSharedServicesPrismaDataAccessModule;


/***/ }),

/***/ "./libs/api/shared/services/prisma/data-access/src/lib/prisma-client.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const client_1 = __webpack_require__("@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    onModuleInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.$connect();
        });
    }
    enableShutdownHooks(app) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.$on('beforeExit', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield app.close();
            }));
        });
    }
};
PrismaService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PrismaService);
exports.PrismaService = PrismaService;


/***/ }),

/***/ "./libs/api/shell/feature/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/shell/feature/src/lib/api-shell-feature.module.ts"), exports);


/***/ }),

/***/ "./libs/api/shell/feature/src/lib/api-shell-feature.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiShellFeatureModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const resolvers_1 = __webpack_require__("./libs/api/authentication/api/feature/src/index.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const apollo_1 = __webpack_require__("@nestjs/apollo");
const resolvers_2 = __webpack_require__("./libs/api/trips/api/feature/src/index.ts");
const resolvers_3 = __webpack_require__("./libs/api/bookings/api/feature/src/index.ts");
const feature_1 = __webpack_require__("./libs/api/weather/api/feature/src/index.ts");
const feature_2 = __webpack_require__("./libs/api/messages/api/feature/src/index.ts");
const feature_3 = __webpack_require__("./libs/api/drivers/api/feature/src/index.ts");
let ApiShellFeatureModule = class ApiShellFeatureModule {
};
ApiShellFeatureModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            resolvers_1.AuthenticationModule,
            feature_1.WeatherModule,
            feature_3.DriversModule,
            resolvers_2.TripsModule,
            resolvers_3.BookingsModule,
            feature_2.MessageModule,
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: true,
                // playground: true,
                // introspection: true,
                driver: apollo_1.ApolloDriver,
                subscriptions: {
                    'graphql-ws': true,
                    'subscriptions-transport-ws': true,
                },
            }),
        ],
    })
], ApiShellFeatureModule);
exports.ApiShellFeatureModule = ApiShellFeatureModule;


/***/ }),

/***/ "./libs/api/trips/api/feature/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/trips/api/feature/src/lib/api-trips-api-feature.module.ts"), exports);


/***/ }),

/***/ "./libs/api/trips/api/feature/src/lib/api-trips-api-feature.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TripsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const repository_1 = __webpack_require__("./libs/api/trips/repository/data-access/src/index.ts");
const trips_resolver_resolver_1 = __webpack_require__("./libs/api/trips/api/feature/src/lib/trips-resolver.resolver.ts");
const service_1 = __webpack_require__("./libs/api/trips/service/feature/src/index.ts");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const prisma_1 = __webpack_require__("./libs/api/shared/services/prisma/data-access/src/index.ts");
const service_2 = __webpack_require__("./libs/api/authentication/service/feature/src/index.ts");
let TripsModule = class TripsModule {
};
TripsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule],
        providers: [
            //** RESOLVER */
            trips_resolver_resolver_1.TripsResolver,
            //** REPOSITORY */
            repository_1.TripsRepository,
            //** SERVICES */
            service_1.TripsService,
            prisma_1.PrismaService,
            //** COMMAND HANDLERS */
            service_1.FindAllHandler,
            service_1.FindBookingsForMonthHandler,
            service_1.FindTripsForMonthHandler,
            service_1.FindBookingsByUserHandler,
            service_1.FindUpcomingTripsHandler,
            service_1.FindTripsByMonthHandler,
            service_1.FindByDriverHandler,
            service_1.FindByPassengerHandler,
            service_1.TripsCreateHandler,
            service_1.SearchTripsHandler,
            service_1.BookTripHandler,
            service_1.FindBookingByTripHandler,
            service_1.TripsDeleteHandler,
            service_1.TripsUpdateHandler,
            service_1.FindCoordinatesByTripHandler,
            service_1.FindTripByIdHandler,
            service_2.AuthService,
            service_1.FindByConfirmedTripHandler,
            service_1.FindByRequestedTripHandler,
            service_1.BookingUpdatePaymentStatusHandler,
            service_1.FindBookingByTripAndUserIdHandler,
            service_1.AcceptTripRequestHandler,
            service_1.StartTripHandler,
            service_1.EndTripHandler,
            service_1.DeclineTripRequestHandler,
            service_1.FindByPassengerReviewsHandler,
            service_1.FindByDriverReviewsHandler,
            service_1.UpdatePassengerReviewsHandler,
            service_1.UpdateDriverReviewsHandler,
            service_1.CreateReviewHandler,
            service_1.FindAllPassengersHandler,
        ],
    })
], TripsModule);
exports.TripsModule = TripsModule;


/***/ }),

/***/ "./libs/api/trips/api/feature/src/lib/trips-resolver.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TripsResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const entities_1 = __webpack_require__("./libs/api/authentication/api/shared/entities/data-access/src/index.ts");
const entities_2 = __webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/index.ts");
const service_1 = __webpack_require__("./libs/api/trips/service/feature/src/index.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const service_2 = __webpack_require__("./libs/api/authentication/service/feature/src/index.ts");
let TripsResolver = class TripsResolver {
    constructor(tripsService, authService) {
        this.tripsService = tripsService;
        this.authService = authService;
    }
    coordinates(trip) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findCoordinatesByTrip(trip.tripId);
        });
    }
    passengers(trip) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findBookingByTrip(trip.tripId);
        });
    }
    driver(trip) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.findUserById(trip.driverId);
        });
    }
    /**
     * Query to find all trips
     * @returns {Promise<Trip[]>}
     */
    findAllTrips() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findAll();
        });
    }
    /**
     * Query to find number of trips for month
     * @returns {Promise<number>}
     */
    findTripsForMonth() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findTripsForMonth();
        });
    }
    findBookingsByUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findBookingsByUser(userId);
        });
    }
    findTripsByMonth() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findTripsByMonth();
        });
    }
    /**
     * Query to find number of bookings for month
     * @returns {Promise<number>}
     */
    findBookingsForMonth() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findBookingsForMonth();
        });
    }
    /**
     * Query to find a trip by id
     * @param {string} id The id of the trip to find
     * @returns {Promise<Trip>}
     */
    findTripById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findTripById(id);
        });
    }
    /**
     * Query to find trips by driver id
     * @param {string} id The id of the driver to find the trips by
     * @returns {Promise<Trip[]>}
     */
    findByDriver(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findByDriver(id);
        });
    }
    /**
     * Query to find trips by passenger id
     * @param {string} id The id of the passenger to find the trips by
     * @returns {Promise<Trip[]>}
     */
    findByPassenger(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findByPassenger(id);
        });
    }
    /**
     * Query to find upcoming trip for user
     * @param {string} id The id of the passenger to find the trips by
     * @returns {Promise<Trip>}
     */
    findUpcomingTrip(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findUpcomingTrip(id);
        });
    }
    findBookingByTripAndUserId(tripId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findBookingByTripAndUserId(tripId, userId);
        });
    }
    findByConfirmedTrips(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findByConfirmedTrips(id);
        });
    }
    findByRequestedTrips(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findByRequestedTrips(id);
        });
    }
    findByPassengerReviews(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findByPassengerReviews(id);
        });
    }
    findByDriverReviews(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findByDriverReviews(id);
        });
    }
    findAllPassengers(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.findAllPassengers(id);
        });
    }
    searchTrips(date, startLongitude, startLatitude, destinationLongitude, destinationLatitude) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const trips = yield this.tripsService.searchTrips(date);
            const searchResults = [];
            if (trips.length !== 0) {
                trips.map((trip) => {
                    if (trip.coordinates[0].longitude === startLongitude &&
                        trip.coordinates[0].latitude === startLatitude &&
                        trip.coordinates[1].longitude === destinationLongitude &&
                        trip.coordinates[1].latitude === destinationLatitude) {
                        searchResults.push(trip);
                    }
                });
            }
            return searchResults;
        });
    }
    create(driver, tripDate, seatsAvailable, price, status, startLocationAddress, startLocationLongitude, startLocationLatitude, destinationAddress, destinationLongitude, destinationLatitude) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.create(driver, tripDate, seatsAvailable, price, status, startLocationAddress, startLocationLongitude, startLocationLatitude, destinationAddress, destinationLongitude, destinationLatitude);
        });
    }
    updatePaymentStatus(bookingId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.updatePaymentStatus(bookingId);
        });
    }
    updateReviewPassenger(bookingId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.updateReviewPassenger(bookingId);
        });
    }
    updateReviewDriver(tripId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.updateReviewDriver(tripId);
        });
    }
    bookTrip(tripId, passengerId, seatsBooked, status, price, address, longitude, latitude) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.bookTrip(passengerId, tripId, seatsBooked, status, price, address, longitude, latitude);
        });
    }
    postReview(byId, forId, tripId, role, comment, rating) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('POSTREVIEW');
            return yield this.tripsService.postReview(byId, forId, tripId, role, comment, rating);
        });
    }
    acceptTripRequest(tripId, bookingId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.acceptTripRequest(tripId, bookingId);
        });
    }
    declineTripRequest(bookingId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.declineTripRequest(bookingId);
        });
    }
    startTrip(tripId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.startTrip(tripId);
        });
    }
    endTrip(tripId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsService.endTrip(tripId);
        });
    }
};
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => [entities_2.Booking]),
    tslib_1.__param(0, (0, graphql_1.Root)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof entities_2.Trip !== "undefined" && entities_2.Trip) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], TripsResolver.prototype, "coordinates", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => [entities_2.Location]),
    tslib_1.__param(0, (0, graphql_1.Root)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof entities_2.Trip !== "undefined" && entities_2.Trip) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], TripsResolver.prototype, "passengers", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => entities_1.User),
    tslib_1.__param(0, (0, graphql_1.Root)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof entities_2.Trip !== "undefined" && entities_2.Trip) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], TripsResolver.prototype, "driver", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_2.Trip]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], TripsResolver.prototype, "findAllTrips", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => Number),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], TripsResolver.prototype, "findTripsForMonth", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_2.Booking]),
    tslib_1.__param(0, (0, graphql_1.Args)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], TripsResolver.prototype, "findBookingsByUser", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_2.TripByMonth]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], TripsResolver.prototype, "findTripsByMonth", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => Number),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], TripsResolver.prototype, "findBookingsForMonth", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => entities_2.Trip),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], TripsResolver.prototype, "findTripById", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_2.Trip]),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], TripsResolver.prototype, "findByDriver", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_2.Trip]),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], TripsResolver.prototype, "findByPassenger", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => entities_2.Trip),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], TripsResolver.prototype, "findUpcomingTrip", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => entities_2.Booking),
    tslib_1.__param(0, (0, graphql_1.Args)('tripId')),
    tslib_1.__param(1, (0, graphql_1.Args)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], TripsResolver.prototype, "findBookingByTripAndUserId", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_2.Trip]),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], TripsResolver.prototype, "findByConfirmedTrips", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_2.Trip]),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], TripsResolver.prototype, "findByRequestedTrips", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_2.Trip]),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], TripsResolver.prototype, "findByPassengerReviews", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_2.Trip]),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_x = typeof Promise !== "undefined" && Promise) === "function" ? _x : Object)
], TripsResolver.prototype, "findByDriverReviews", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_2.Trip]),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], TripsResolver.prototype, "findAllPassengers", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [entities_2.Trip]),
    tslib_1.__param(0, (0, graphql_1.Args)('date')),
    tslib_1.__param(1, (0, graphql_1.Args)('startLongitude')),
    tslib_1.__param(2, (0, graphql_1.Args)('startLatitude')),
    tslib_1.__param(3, (0, graphql_1.Args)('destinationLongitude')),
    tslib_1.__param(4, (0, graphql_1.Args)('destinationLatitude')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_z = typeof Promise !== "undefined" && Promise) === "function" ? _z : Object)
], TripsResolver.prototype, "searchTrips", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_2.Trip),
    tslib_1.__param(0, (0, graphql_1.Args)('driver')),
    tslib_1.__param(1, (0, graphql_1.Args)('tripDate')),
    tslib_1.__param(2, (0, graphql_1.Args)('seatsAvailable')),
    tslib_1.__param(3, (0, graphql_1.Args)('price')),
    tslib_1.__param(4, (0, graphql_1.Args)('status')),
    tslib_1.__param(5, (0, graphql_1.Args)('startLocationAddress')),
    tslib_1.__param(6, (0, graphql_1.Args)('startLocationLongitude')),
    tslib_1.__param(7, (0, graphql_1.Args)('startLocationLatitude')),
    tslib_1.__param(8, (0, graphql_1.Args)('destinationAddress')),
    tslib_1.__param(9, (0, graphql_1.Args)('destinationLongitude')),
    tslib_1.__param(10, (0, graphql_1.Args)('destinationLatitude')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_0 = typeof Promise !== "undefined" && Promise) === "function" ? _0 : Object)
], TripsResolver.prototype, "create", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_2.Booking),
    tslib_1.__param(0, (0, graphql_1.Args)('bookingId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_1 = typeof Promise !== "undefined" && Promise) === "function" ? _1 : Object)
], TripsResolver.prototype, "updatePaymentStatus", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_2.Booking),
    tslib_1.__param(0, (0, graphql_1.Args)('bookingId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_2 = typeof Promise !== "undefined" && Promise) === "function" ? _2 : Object)
], TripsResolver.prototype, "updateReviewPassenger", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_2.Trip),
    tslib_1.__param(0, (0, graphql_1.Args)('tripId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_3 = typeof Promise !== "undefined" && Promise) === "function" ? _3 : Object)
], TripsResolver.prototype, "updateReviewDriver", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_2.Booking),
    tslib_1.__param(0, (0, graphql_1.Args)('tripId')),
    tslib_1.__param(1, (0, graphql_1.Args)('passengerId')),
    tslib_1.__param(2, (0, graphql_1.Args)('seatsBooked')),
    tslib_1.__param(3, (0, graphql_1.Args)('status')),
    tslib_1.__param(4, (0, graphql_1.Args)('price')),
    tslib_1.__param(5, (0, graphql_1.Args)('address')),
    tslib_1.__param(6, (0, graphql_1.Args)('longitude')),
    tslib_1.__param(7, (0, graphql_1.Args)('latitude')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, String, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_4 = typeof Promise !== "undefined" && Promise) === "function" ? _4 : Object)
], TripsResolver.prototype, "bookTrip", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_2.Reviews),
    tslib_1.__param(0, (0, graphql_1.Args)('byId')),
    tslib_1.__param(1, (0, graphql_1.Args)('forId')),
    tslib_1.__param(2, (0, graphql_1.Args)('tripId')),
    tslib_1.__param(3, (0, graphql_1.Args)('role')),
    tslib_1.__param(4, (0, graphql_1.Args)('comment')),
    tslib_1.__param(5, (0, graphql_1.Args)('rating')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_5 = typeof Promise !== "undefined" && Promise) === "function" ? _5 : Object)
], TripsResolver.prototype, "postReview", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_2.Trip),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__param(1, (0, graphql_1.Args)('bookingId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_6 = typeof Promise !== "undefined" && Promise) === "function" ? _6 : Object)
], TripsResolver.prototype, "acceptTripRequest", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_2.Booking),
    tslib_1.__param(0, (0, graphql_1.Args)('bookingId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_7 = typeof Promise !== "undefined" && Promise) === "function" ? _7 : Object)
], TripsResolver.prototype, "declineTripRequest", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_2.Trip),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_8 = typeof Promise !== "undefined" && Promise) === "function" ? _8 : Object)
], TripsResolver.prototype, "startTrip", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => entities_2.Trip),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_9 = typeof Promise !== "undefined" && Promise) === "function" ? _9 : Object)
], TripsResolver.prototype, "endTrip", null);
TripsResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => entities_2.Trip),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof service_1.TripsService !== "undefined" && service_1.TripsService) === "function" ? _a : Object, typeof (_b = typeof service_2.AuthService !== "undefined" && service_2.AuthService) === "function" ? _b : Object])
], TripsResolver);
exports.TripsResolver = TripsResolver;


/***/ }),

/***/ "./libs/api/trips/api/shared/entities/data-access/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/lib/api-trips-api-shared-entities-data-access.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/lib/booking-entity.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/lib/trip-entity.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/lib/location-entity.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/lib/pickuplocation-entity.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/lib/review-entity.entity.ts"), exports);


/***/ }),

/***/ "./libs/api/trips/api/shared/entities/data-access/src/lib/api-trips-api-shared-entities-data-access.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiTripsApiSharedEntitiesDataAccessModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ApiTripsApiSharedEntitiesDataAccessModule = class ApiTripsApiSharedEntitiesDataAccessModule {
};
ApiTripsApiSharedEntitiesDataAccessModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiTripsApiSharedEntitiesDataAccessModule);
exports.ApiTripsApiSharedEntitiesDataAccessModule = ApiTripsApiSharedEntitiesDataAccessModule;


/***/ }),

/***/ "./libs/api/trips/api/shared/entities/data-access/src/lib/booking-entity.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BookingStatusUpdate = exports.BookingInput = exports.Booking = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const pickuplocation_entity_entity_1 = __webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/lib/pickuplocation-entity.entity.ts");
const entities_1 = __webpack_require__("./libs/api/authentication/api/shared/entities/data-access/src/index.ts");
const trip_entity_entity_1 = __webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/lib/trip-entity.entity.ts");
let Booking = class Booking {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], Booking.prototype, "bookingId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Booking.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Booking.prototype, "tripId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Booking.prototype, "bookingDate", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Booking.prototype, "seatsBooked", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Booking.prototype, "status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    tslib_1.__metadata("design:type", Number)
], Booking.prototype, "price", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => pickuplocation_entity_entity_1.PickupLocation),
    tslib_1.__metadata("design:type", typeof (_b = typeof pickuplocation_entity_entity_1.PickupLocation !== "undefined" && pickuplocation_entity_entity_1.PickupLocation) === "function" ? _b : Object)
], Booking.prototype, "pickUp", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => entities_1.User),
    tslib_1.__metadata("design:type", typeof (_c = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _c : Object)
], Booking.prototype, "user", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => trip_entity_entity_1.Trip),
    tslib_1.__metadata("design:type", typeof (_d = typeof trip_entity_entity_1.Trip !== "undefined" && trip_entity_entity_1.Trip) === "function" ? _d : Object)
], Booking.prototype, "trip", void 0);
Booking = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Booking);
exports.Booking = Booking;
let BookingInput = class BookingInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], BookingInput.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], BookingInput.prototype, "tripId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], BookingInput.prototype, "bookingDate", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], BookingInput.prototype, "seatsBooked", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], BookingInput.prototype, "status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], BookingInput.prototype, "price", void 0);
BookingInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], BookingInput);
exports.BookingInput = BookingInput;
let BookingStatusUpdate = class BookingStatusUpdate {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], BookingStatusUpdate.prototype, "bookingId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], BookingStatusUpdate.prototype, "status", void 0);
BookingStatusUpdate = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], BookingStatusUpdate);
exports.BookingStatusUpdate = BookingStatusUpdate;


/***/ }),

/***/ "./libs/api/trips/api/shared/entities/data-access/src/lib/location-entity.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocationInput = exports.Location = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const trip_entity_entity_1 = __webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/lib/trip-entity.entity.ts");
let Location = class Location {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "address", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "latitude", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "longitude", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "tripId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => trip_entity_entity_1.Trip),
    tslib_1.__metadata("design:type", typeof (_a = typeof trip_entity_entity_1.Trip !== "undefined" && trip_entity_entity_1.Trip) === "function" ? _a : Object)
], Location.prototype, "trip", void 0);
Location = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Location);
exports.Location = Location;
let LocationInput = class LocationInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LocationInput.prototype, "address", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LocationInput.prototype, "latitude", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], LocationInput.prototype, "longitude", void 0);
LocationInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], LocationInput);
exports.LocationInput = LocationInput;


/***/ }),

/***/ "./libs/api/trips/api/shared/entities/data-access/src/lib/pickuplocation-entity.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PickupLocationInput = exports.PickupLocation = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const booking_entity_entity_1 = __webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/lib/booking-entity.entity.ts");
let PickupLocation = class PickupLocation {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], PickupLocation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], PickupLocation.prototype, "address", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], PickupLocation.prototype, "latitude", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], PickupLocation.prototype, "longitude", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], PickupLocation.prototype, "bookingId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => booking_entity_entity_1.Booking),
    tslib_1.__metadata("design:type", typeof (_a = typeof booking_entity_entity_1.Booking !== "undefined" && booking_entity_entity_1.Booking) === "function" ? _a : Object)
], PickupLocation.prototype, "booking", void 0);
PickupLocation = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], PickupLocation);
exports.PickupLocation = PickupLocation;
let PickupLocationInput = class PickupLocationInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], PickupLocationInput.prototype, "address", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], PickupLocationInput.prototype, "latitude", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], PickupLocationInput.prototype, "longitude", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], PickupLocationInput.prototype, "bookingId", void 0);
PickupLocationInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], PickupLocationInput);
exports.PickupLocationInput = PickupLocationInput;


/***/ }),

/***/ "./libs/api/trips/api/shared/entities/data-access/src/lib/review-entity.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewInput = exports.Reviews = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let Reviews = class Reviews {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], Reviews.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Reviews.prototype, "byId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Reviews.prototype, "forId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Reviews.prototype, "tripId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Reviews.prototype, "role", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Reviews.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Reviews.prototype, "rating", void 0);
Reviews = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Reviews);
exports.Reviews = Reviews;
let ReviewInput = class ReviewInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], ReviewInput.prototype, "byId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], ReviewInput.prototype, "forId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], ReviewInput.prototype, "tripId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], ReviewInput.prototype, "role", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], ReviewInput.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], ReviewInput.prototype, "rating", void 0);
ReviewInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ReviewInput);
exports.ReviewInput = ReviewInput;


/***/ }),

/***/ "./libs/api/trips/api/shared/entities/data-access/src/lib/trip-entity.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewsStatusUpdate = exports.TripStatusUpdate = exports.AcceptTripRequestUpdate = exports.TripsUpdate = exports.TripsInput = exports.TripByMonth = exports.Trip = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const entities_1 = __webpack_require__("./libs/api/authentication/api/shared/entities/data-access/src/index.ts");
const booking_entity_entity_1 = __webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/lib/booking-entity.entity.ts");
const location_entity_entity_1 = __webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/lib/location-entity.entity.ts");
let Trip = class Trip {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], Trip.prototype, "tripId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Trip.prototype, "driverId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Trip.prototype, "tripDate", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Date),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Trip.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Trip.prototype, "seatsAvailable", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    tslib_1.__metadata("design:type", Number)
], Trip.prototype, "price", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => entities_1.User),
    tslib_1.__metadata("design:type", typeof (_c = typeof entities_1.User !== "undefined" && entities_1.User) === "function" ? _c : Object)
], Trip.prototype, "driver", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Trip.prototype, "status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [booking_entity_entity_1.Booking]),
    tslib_1.__metadata("design:type", Array)
], Trip.prototype, "passengers", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [location_entity_entity_1.Location]),
    tslib_1.__metadata("design:type", Array)
], Trip.prototype, "coordinates", void 0);
Trip = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Trip);
exports.Trip = Trip;
let TripByMonth = class TripByMonth {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], TripByMonth.prototype, "month", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], TripByMonth.prototype, "trips", void 0);
TripByMonth = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], TripByMonth);
exports.TripByMonth = TripByMonth;
let TripsInput = class TripsInput {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], TripsInput.prototype, "driverId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], TripsInput.prototype, "tripDate", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], TripsInput.prototype, "seatsAvailable", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], TripsInput.prototype, "price", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [location_entity_entity_1.LocationInput]),
    tslib_1.__metadata("design:type", Array)
], TripsInput.prototype, "coordinates", void 0);
TripsInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], TripsInput);
exports.TripsInput = TripsInput;
let TripsUpdate = class TripsUpdate {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], TripsUpdate.prototype, "seatsAvailable", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], TripsUpdate.prototype, "price", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], TripsUpdate.prototype, "status", void 0);
TripsUpdate = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], TripsUpdate);
exports.TripsUpdate = TripsUpdate;
let AcceptTripRequestUpdate = class AcceptTripRequestUpdate {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], AcceptTripRequestUpdate.prototype, "seatsAvailable", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], AcceptTripRequestUpdate.prototype, "status", void 0);
AcceptTripRequestUpdate = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AcceptTripRequestUpdate);
exports.AcceptTripRequestUpdate = AcceptTripRequestUpdate;
let TripStatusUpdate = class TripStatusUpdate {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], TripStatusUpdate.prototype, "status", void 0);
TripStatusUpdate = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], TripStatusUpdate);
exports.TripStatusUpdate = TripStatusUpdate;
let ReviewsStatusUpdate = class ReviewsStatusUpdate {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], ReviewsStatusUpdate.prototype, "tripId", void 0);
ReviewsStatusUpdate = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ReviewsStatusUpdate);
exports.ReviewsStatusUpdate = ReviewsStatusUpdate;


/***/ }),

/***/ "./libs/api/trips/repository/data-access/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/trips/repository/data-access/src/lib/api-trips-repository-data-access.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/trips/repository/data-access/src/lib/trips-repository.repository.ts"), exports);


/***/ }),

/***/ "./libs/api/trips/repository/data-access/src/lib/api-trips-repository-data-access.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiTripsRepositoryDataAccessModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ApiTripsRepositoryDataAccessModule = class ApiTripsRepositoryDataAccessModule {
};
ApiTripsRepositoryDataAccessModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiTripsRepositoryDataAccessModule);
exports.ApiTripsRepositoryDataAccessModule = ApiTripsRepositoryDataAccessModule;


/***/ }),

/***/ "./libs/api/trips/repository/data-access/src/lib/trips-repository.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TripsRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const prisma_1 = __webpack_require__("./libs/api/shared/services/prisma/data-access/src/index.ts");
const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return `${day} ${monthNames[month]} ${year}`;
};
let TripsRepository = class TripsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.trip.findMany({
                orderBy: {
                    tripDate: 'desc',
                },
            });
        });
    }
    findTripsForMonth() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const trips = yield this.prisma.trip.aggregate({
                where: {
                    tripDate: {
                        gte: firstDay,
                        lte: lastDay,
                    },
                },
                _count: true,
            });
            return trips._count;
        });
    }
    findBookingsForMonth() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const bookings = yield this.prisma.booking.aggregate({
                where: {
                    trip: {
                        tripDate: {
                            gte: firstDay,
                            lte: lastDay,
                        },
                    },
                },
                _count: true,
            });
            return bookings._count;
        });
    }
    findBookingsByUser(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.booking.findMany({
                where: {
                    userId: id,
                },
            });
        });
    }
    findTripsByMonth() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const trips = yield this.prisma.$queryRaw `
    SELECT count(trip_id) AS trips, TO_CHAR(trip_date, 'Mon')
    AS month FROM trip GROUP BY TO_CHAR(trip_date, 'Mon');
    `;
            return trips;
        });
    }
    findTripById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.trip.findUnique({
                where: {
                    tripId: id,
                },
            });
        });
    }
    findUpcomingTrip(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const trips = yield this.prisma.trip.findMany({
                where: {
                    OR: [
                        {
                            driverId: id,
                        },
                        {
                            passengers: {
                                some: {
                                    userId: id,
                                },
                            },
                        },
                    ],
                    tripDate: {
                        gte: new Date(),
                    },
                    status: {
                        in: ['active', 'confirmed', 'paid'],
                    },
                },
                orderBy: {
                    tripDate: 'desc',
                },
            });
            return trips[0];
        });
    }
    findByDriver(driverId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.trip.findMany({
                where: {
                    driverId: driverId,
                },
            });
        });
    }
    findByPassenger(passengerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.trip.findMany({
                where: {
                    passengers: {
                        some: {
                            userId: passengerId,
                        },
                    },
                    tripDate: {
                        lt: new Date(),
                    },
                },
            });
        });
    }
    findByConfirmedTrips(passengerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.trip.findMany({
                where: {
                    passengers: {
                        some: {
                            userId: passengerId,
                            status: 'unpaid',
                        },
                    },
                    status: 'confirmed',
                },
            });
        });
    }
    findByRequestedTrips(passengerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const trips = yield this.prisma.trip.findMany({
                where: {
                    passengers: {
                        some: {
                            userId: passengerId,
                            status: 'unpaid',
                        },
                    },
                    status: 'requested',
                },
            });
            return trips;
        });
    }
    findByPassengerReviews(passengerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(passengerId);
            return this.prisma.trip.findMany({
                where: {
                    passengers: {
                        some: {
                            userId: passengerId,
                            reviewed: false,
                        },
                    },
                    status: 'completed',
                },
            });
        });
    }
    findAllPassengers(tripID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.trip.findMany({
                where: {
                    tripId: tripID,
                },
            });
        });
    }
    findByDriverReviews(DriverId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.trip.findMany({
                where: {
                    driverId: DriverId,
                    reviewed: false,
                    status: 'completed',
                },
            });
        });
    }
    findBookingByTrip(tripID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.booking.findMany({
                where: {
                    tripId: tripID,
                },
            });
        });
    }
    findBookingByTripAndUserId(tripID, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const booking = yield this.prisma.booking.findMany({
                where: {
                    tripId: tripID,
                    userId: userId,
                },
            });
            return booking[0];
        });
    }
    findCoordinatesByTrip(tripID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.location.findMany({
                where: {
                    tripId: tripID,
                },
            });
        });
    }
    create(driver, tripDate, seatsAvailable, price, status, startLocationAddress, startLocationLongitude, startLocationLatitude, destinationAddress, destinationLongitude, destinationLatitude) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.trip.create({
                data: {
                    tripDate: tripDate,
                    seatsAvailable: parseInt(seatsAvailable),
                    price: parseFloat(price),
                    status: status,
                    coordinates: {
                        create: [
                            {
                                address: startLocationAddress,
                                latitude: startLocationLatitude,
                                longitude: startLocationLongitude,
                            },
                            {
                                address: destinationAddress,
                                latitude: destinationLatitude,
                                longitude: destinationLongitude,
                            },
                        ],
                    },
                    driver: {
                        connect: {
                            id: driver,
                        },
                    },
                },
            });
        });
    }
    postReview(byId, forId, tripId, role, comment, rating) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.review.create({
                data: {
                    byId: byId,
                    forId: forId,
                    tripId: tripId,
                    role: role,
                    comment: comment,
                    rating: rating,
                },
            });
        });
    }
    updatePaymentStatus(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.booking.update({
                where: {
                    bookingId: id,
                },
                data: {
                    status: 'paid',
                },
            });
        });
    }
    bookTrip(tripId, passengerId, seatsBooked, status, price, address, longitude, latitude) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.booking.create({
                data: {
                    trip: {
                        connect: { tripId },
                    },
                    user: {
                        connect: { id: passengerId },
                    },
                    seatsBooked: parseInt(seatsBooked),
                    status: status,
                    price: parseFloat(price),
                    pickUp: {
                        create: {
                            address,
                            latitude,
                            longitude,
                        },
                    },
                },
            });
        });
    }
    update(id, trips) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.trip.update({
                where: {
                    tripId: id,
                },
                data: {
                    seatsAvailable: trips.seatsAvailable,
                    price: trips.price,
                },
            });
        });
    }
    updateReviewPassenger(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.booking.update({
                where: {
                    bookingId: id,
                },
                data: {
                    reviewed: true,
                },
            });
        });
    }
    updateReviewDriver(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.trip.update({
                where: {
                    tripId: id,
                },
                data: {
                    reviewed: true,
                },
            });
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.trip.delete({
                where: {
                    tripId: id,
                },
            });
        });
    }
    searchTrips(date) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const allTrips = yield this.prisma.trip.findMany({
                select: {
                    tripId: true,
                    tripDate: true,
                    seatsAvailable: true,
                    price: true,
                    driverId: true,
                    coordinates: true,
                    driver: {
                        select: {
                            id: true,
                            name: true,
                            profilePic: true,
                        },
                    },
                    createdAt: true,
                },
                orderBy: {
                    driver: {
                        avgRating: 'desc',
                    },
                },
            });
            const tripsByDate = [];
            if (allTrips.length !== 0) {
                allTrips.map((trip) => {
                    if (formatDate(`${trip.tripDate}`) === formatDate(date)) {
                        tripsByDate.push(trip);
                    }
                });
                // console.log(tripsByDate);
                return tripsByDate;
            }
            else {
                return [];
            }
        });
    }
    acceptTripRequest(id, bookingId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const trip = yield this.prisma.trip.update({
                where: {
                    tripId: id,
                },
                data: {
                    seatsAvailable: {
                        decrement: 1,
                    },
                },
            });
            yield this.prisma.booking.update({
                where: {
                    bookingId: bookingId,
                },
                data: {
                    status: 'unpaid',
                },
            });
            return trip;
        });
    }
    declineTripRequest(bookingId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.booking.update({
                where: {
                    bookingId: bookingId,
                },
                data: {
                    status: 'declined',
                },
            });
        });
    }
    startTrip(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.trip.update({
                where: {
                    tripId: id,
                },
                data: {
                    status: 'active',
                },
            });
        });
    }
    endTrip(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.trip.update({
                where: {
                    tripId: id,
                },
                data: {
                    status: 'completed',
                },
            });
        });
    }
    findAllTripRequests(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prisma.booking.findMany({
                where: {
                    trip: {
                        driverId: userId,
                    },
                    status: 'requested',
                },
            });
        });
    }
};
TripsRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_1.PrismaService !== "undefined" && prisma_1.PrismaService) === "function" ? _a : Object])
], TripsRepository);
exports.TripsRepository = TripsRepository;


/***/ }),

/***/ "./libs/api/trips/service/feature/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/trips/service/feature/src/lib/api-trips-service-feature.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/trips/service/feature/src/lib/trip-service.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/trips/service/feature/src/lib/queries/trips-query-handler.handler.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/trips/service/feature/src/lib/commands/trips-command-handler.handler.ts"), exports);


/***/ }),

/***/ "./libs/api/trips/service/feature/src/lib/api-trips-service-feature.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiTripsServiceFeatureModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ApiTripsServiceFeatureModule = class ApiTripsServiceFeatureModule {
};
ApiTripsServiceFeatureModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiTripsServiceFeatureModule);
exports.ApiTripsServiceFeatureModule = ApiTripsServiceFeatureModule;


/***/ }),

/***/ "./libs/api/trips/service/feature/src/lib/commands/trips-command-handler.handler.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EndTripHandler = exports.StartTripHandler = exports.DeclineTripRequestHandler = exports.AcceptTripRequestHandler = exports.TripsDeleteHandler = exports.BookingUpdatePaymentStatusHandler = exports.UpdateDriverReviewsHandler = exports.UpdatePassengerReviewsHandler = exports.TripsUpdateHandler = exports.BookTripHandler = exports.CreateReviewHandler = exports.TripsCreateHandler = void 0;
const tslib_1 = __webpack_require__("tslib");
const repository_1 = __webpack_require__("./libs/api/trips/repository/data-access/src/index.ts");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const trips_command_command_1 = __webpack_require__("./libs/api/trips/service/feature/src/lib/commands/trips-command.command.ts");
const entities_1 = __webpack_require__("./libs/api/trips/api/shared/entities/data-access/src/index.ts");
let TripsCreateHandler = class TripsCreateHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { driver, tripDate, seatsAvailable, price, status, startLocationAddress, startLocationLongitude, startLocationLatitude, destinationAddress, destinationLongitude, destinationLatitude, } = command;
            return yield this.tripsRepository.create(driver, tripDate, seatsAvailable, price, status, startLocationAddress, startLocationLongitude, startLocationLatitude, destinationAddress, destinationLongitude, destinationLatitude);
        });
    }
};
TripsCreateHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(trips_command_command_1.TripsCreateCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _a : Object])
], TripsCreateHandler);
exports.TripsCreateHandler = TripsCreateHandler;
let CreateReviewHandler = class CreateReviewHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { byId, forId, tripId, role, comment, rating, } = command;
            return yield this.tripsRepository.postReview(byId, forId, tripId, role, comment, rating);
        });
    }
};
CreateReviewHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(trips_command_command_1.CreateReviewCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _b : Object])
], CreateReviewHandler);
exports.CreateReviewHandler = CreateReviewHandler;
let BookTripHandler = class BookTripHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { tripId, passengerId, seatsBooked, status, price, address, longitude, latitude, } = command;
            return yield this.tripsRepository.bookTrip(tripId, passengerId, seatsBooked, status, price, address, longitude, latitude);
        });
    }
};
BookTripHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(trips_command_command_1.BookTripCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _c : Object])
], BookTripHandler);
exports.BookTripHandler = BookTripHandler;
let TripsUpdateHandler = class TripsUpdateHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { tripId, seatsAvailable, price, status } = command;
            const tripUpdate = new entities_1.TripsUpdate();
            tripUpdate.seatsAvailable = seatsAvailable;
            tripUpdate.price = price;
            tripUpdate.status = status;
            return yield this.tripsRepository.update(tripId, tripUpdate);
        });
    }
};
TripsUpdateHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(trips_command_command_1.TripsUpdateCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _d : Object])
], TripsUpdateHandler);
exports.TripsUpdateHandler = TripsUpdateHandler;
let UpdatePassengerReviewsHandler = class UpdatePassengerReviewsHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { bookingId } = command;
            return yield this.tripsRepository.updateReviewPassenger(bookingId);
        });
    }
};
UpdatePassengerReviewsHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(trips_command_command_1.UpdatePassengerReviewsCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _e : Object])
], UpdatePassengerReviewsHandler);
exports.UpdatePassengerReviewsHandler = UpdatePassengerReviewsHandler;
let UpdateDriverReviewsHandler = class UpdateDriverReviewsHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { tripId } = command;
            return yield this.tripsRepository.updateReviewDriver(tripId);
        });
    }
};
UpdateDriverReviewsHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(trips_command_command_1.UpdateDriverReviewsCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _f : Object])
], UpdateDriverReviewsHandler);
exports.UpdateDriverReviewsHandler = UpdateDriverReviewsHandler;
let BookingUpdatePaymentStatusHandler = class BookingUpdatePaymentStatusHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { bookingId } = command;
            return yield this.tripsRepository.updatePaymentStatus(bookingId);
        });
    }
};
BookingUpdatePaymentStatusHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(trips_command_command_1.BookingUpdatePaymentStatusCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _g : Object])
], BookingUpdatePaymentStatusHandler);
exports.BookingUpdatePaymentStatusHandler = BookingUpdatePaymentStatusHandler;
let TripsDeleteHandler = class TripsDeleteHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { tripId } = command;
            return yield this.tripsRepository.delete(tripId);
        });
    }
};
TripsDeleteHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(trips_command_command_1.TripsDeleteCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _h : Object])
], TripsDeleteHandler);
exports.TripsDeleteHandler = TripsDeleteHandler;
let AcceptTripRequestHandler = class AcceptTripRequestHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { tripId, bookingId } = command;
            return yield this.tripsRepository.acceptTripRequest(tripId, bookingId);
        });
    }
};
AcceptTripRequestHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(trips_command_command_1.AcceptTripRequestCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _j : Object])
], AcceptTripRequestHandler);
exports.AcceptTripRequestHandler = AcceptTripRequestHandler;
let DeclineTripRequestHandler = class DeclineTripRequestHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { bookingId } = command;
            return yield this.tripsRepository.declineTripRequest(bookingId);
        });
    }
};
DeclineTripRequestHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(trips_command_command_1.DeclineTripRequestCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _k : Object])
], DeclineTripRequestHandler);
exports.DeclineTripRequestHandler = DeclineTripRequestHandler;
let StartTripHandler = class StartTripHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { tripId } = command;
            return yield this.tripsRepository.startTrip(tripId);
        });
    }
};
StartTripHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(trips_command_command_1.StartTripCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _l : Object])
], StartTripHandler);
exports.StartTripHandler = StartTripHandler;
let EndTripHandler = class EndTripHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(command) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { tripId } = command;
            return yield this.tripsRepository.endTrip(tripId);
        });
    }
};
EndTripHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(trips_command_command_1.EndTripCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _m : Object])
], EndTripHandler);
exports.EndTripHandler = EndTripHandler;


/***/ }),

/***/ "./libs/api/trips/service/feature/src/lib/commands/trips-command.command.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeclineTripRequestCommand = exports.EndTripCommand = exports.StartTripCommand = exports.AcceptTripRequestCommand = exports.TripsDeleteCommand = exports.UpdateDriverReviewsCommand = exports.UpdatePassengerReviewsCommand = exports.BookingUpdatePaymentStatusCommand = exports.TripsUpdateCommand = exports.BookTripCommand = exports.CreateReviewCommand = exports.TripsCreateCommand = void 0;
class TripsCreateCommand {
    constructor(driver, tripDate, seatsAvailable, price, status, startLocationAddress, startLocationLongitude, startLocationLatitude, destinationAddress, destinationLongitude, destinationLatitude) {
        this.driver = driver;
        this.tripDate = tripDate;
        this.seatsAvailable = seatsAvailable;
        this.price = price;
        this.status = status;
        this.startLocationAddress = startLocationAddress;
        this.startLocationLongitude = startLocationLongitude;
        this.startLocationLatitude = startLocationLatitude;
        this.destinationAddress = destinationAddress;
        this.destinationLongitude = destinationLongitude;
        this.destinationLatitude = destinationLatitude;
    }
}
exports.TripsCreateCommand = TripsCreateCommand;
class CreateReviewCommand {
    constructor(byId, forId, tripId, role, comment, rating) {
        this.byId = byId;
        this.forId = forId;
        this.tripId = tripId;
        this.role = role;
        this.comment = comment;
        this.rating = rating;
    }
}
exports.CreateReviewCommand = CreateReviewCommand;
class BookTripCommand {
    constructor(tripId, passengerId, seatsBooked, status, price, address, longitude, latitude) {
        this.tripId = tripId;
        this.passengerId = passengerId;
        this.seatsBooked = seatsBooked;
        this.status = status;
        this.price = price;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}
exports.BookTripCommand = BookTripCommand;
class TripsUpdateCommand {
    constructor(tripId, seatsAvailable, price, status) {
        this.tripId = tripId;
        this.seatsAvailable = seatsAvailable;
        this.price = price;
        this.status = status;
    }
}
exports.TripsUpdateCommand = TripsUpdateCommand;
class BookingUpdatePaymentStatusCommand {
    constructor(bookingId) {
        this.bookingId = bookingId;
    }
}
exports.BookingUpdatePaymentStatusCommand = BookingUpdatePaymentStatusCommand;
class UpdatePassengerReviewsCommand {
    constructor(bookingId) {
        this.bookingId = bookingId;
    }
}
exports.UpdatePassengerReviewsCommand = UpdatePassengerReviewsCommand;
class UpdateDriverReviewsCommand {
    constructor(tripId) {
        this.tripId = tripId;
    }
}
exports.UpdateDriverReviewsCommand = UpdateDriverReviewsCommand;
class TripsDeleteCommand {
    constructor(tripId) {
        this.tripId = tripId;
    }
}
exports.TripsDeleteCommand = TripsDeleteCommand;
class AcceptTripRequestCommand {
    constructor(tripId, bookingId) {
        this.tripId = tripId;
        this.bookingId = bookingId;
    }
}
exports.AcceptTripRequestCommand = AcceptTripRequestCommand;
class StartTripCommand {
    constructor(tripId) {
        this.tripId = tripId;
    }
}
exports.StartTripCommand = StartTripCommand;
class EndTripCommand {
    constructor(tripId) {
        this.tripId = tripId;
    }
}
exports.EndTripCommand = EndTripCommand;
class DeclineTripRequestCommand {
    constructor(bookingId) {
        this.bookingId = bookingId;
    }
}
exports.DeclineTripRequestCommand = DeclineTripRequestCommand;


/***/ }),

/***/ "./libs/api/trips/service/feature/src/lib/queries/trips-query-handler.handler.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindBookingsByUserHandler = exports.FindTripsByMonthHandler = exports.FindBookingsForMonthHandler = exports.FindTripsForMonthHandler = exports.FindUpcomingTripsHandler = exports.FindAllTripRequestsHandler = exports.SearchTripsHandler = exports.FindTripByIdHandler = exports.FindCoordinatesByTripHandler = exports.FindBookingByTripAndUserIdHandler = exports.FindBookingByTripHandler = exports.FindByDriverReviewsHandler = exports.FindAllPassengersHandler = exports.FindByPassengerReviewsHandler = exports.FindByRequestedTripHandler = exports.FindByConfirmedTripHandler = exports.FindByPassengerHandler = exports.FindByDriverHandler = exports.FindAllHandler = void 0;
const tslib_1 = __webpack_require__("tslib");
const repository_1 = __webpack_require__("./libs/api/trips/repository/data-access/src/index.ts");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const trips_query_query_1 = __webpack_require__("./libs/api/trips/service/feature/src/lib/queries/trips-query.query.ts");
let FindAllHandler = class FindAllHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findAll();
        });
    }
};
FindAllHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.FindAllQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _a : Object])
], FindAllHandler);
exports.FindAllHandler = FindAllHandler;
let FindByDriverHandler = class FindByDriverHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findByDriver(query.driverId);
        });
    }
};
FindByDriverHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.FindByDriverQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _b : Object])
], FindByDriverHandler);
exports.FindByDriverHandler = FindByDriverHandler;
let FindByPassengerHandler = class FindByPassengerHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findByPassenger(query.passengerId);
        });
    }
};
FindByPassengerHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.FindByPassengerQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _c : Object])
], FindByPassengerHandler);
exports.FindByPassengerHandler = FindByPassengerHandler;
let FindByConfirmedTripHandler = class FindByConfirmedTripHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findByConfirmedTrips(query.passengerId);
        });
    }
};
FindByConfirmedTripHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.findByConfirmedTripsQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _d : Object])
], FindByConfirmedTripHandler);
exports.FindByConfirmedTripHandler = FindByConfirmedTripHandler;
let FindByRequestedTripHandler = class FindByRequestedTripHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findByRequestedTrips(query.passengerId);
        });
    }
};
FindByRequestedTripHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.findByRequestedTripsQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _e : Object])
], FindByRequestedTripHandler);
exports.FindByRequestedTripHandler = FindByRequestedTripHandler;
let FindByPassengerReviewsHandler = class FindByPassengerReviewsHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findByPassengerReviews(query.passengerId);
        });
    }
};
FindByPassengerReviewsHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.findByPassengerReviewsQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _f : Object])
], FindByPassengerReviewsHandler);
exports.FindByPassengerReviewsHandler = FindByPassengerReviewsHandler;
let FindAllPassengersHandler = class FindAllPassengersHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findAllPassengers(query.tripID);
        });
    }
};
FindAllPassengersHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.findAllPassengersQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _g : Object])
], FindAllPassengersHandler);
exports.FindAllPassengersHandler = FindAllPassengersHandler;
let FindByDriverReviewsHandler = class FindByDriverReviewsHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findByDriverReviews(query.DriverId);
        });
    }
};
FindByDriverReviewsHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.findByDriverReviewsQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _h : Object])
], FindByDriverReviewsHandler);
exports.FindByDriverReviewsHandler = FindByDriverReviewsHandler;
let FindBookingByTripHandler = class FindBookingByTripHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findBookingByTrip(query.tripId);
        });
    }
};
FindBookingByTripHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.FindBookingByTripQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _j : Object])
], FindBookingByTripHandler);
exports.FindBookingByTripHandler = FindBookingByTripHandler;
let FindBookingByTripAndUserIdHandler = class FindBookingByTripAndUserIdHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findBookingByTripAndUserId(query.tripId, query.userId);
        });
    }
};
FindBookingByTripAndUserIdHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.FindBookingByTripAndUserIdQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _k : Object])
], FindBookingByTripAndUserIdHandler);
exports.FindBookingByTripAndUserIdHandler = FindBookingByTripAndUserIdHandler;
let FindCoordinatesByTripHandler = class FindCoordinatesByTripHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findCoordinatesByTrip(query.tripId);
        });
    }
};
FindCoordinatesByTripHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.FindCoordinatesByTripQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _l : Object])
], FindCoordinatesByTripHandler);
exports.FindCoordinatesByTripHandler = FindCoordinatesByTripHandler;
let FindTripByIdHandler = class FindTripByIdHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findTripById(query.tripId);
        });
    }
};
FindTripByIdHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.FindTripByIdQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _m : Object])
], FindTripByIdHandler);
exports.FindTripByIdHandler = FindTripByIdHandler;
let SearchTripsHandler = class SearchTripsHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.searchTrips(query.date);
        });
    }
};
SearchTripsHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.SearchTripsQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _o : Object])
], SearchTripsHandler);
exports.SearchTripsHandler = SearchTripsHandler;
let FindAllTripRequestsHandler = class FindAllTripRequestsHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findAllTripRequests(query.userId);
        });
    }
};
FindAllTripRequestsHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.FindAllTripRequestsQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_p = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _p : Object])
], FindAllTripRequestsHandler);
exports.FindAllTripRequestsHandler = FindAllTripRequestsHandler;
let FindUpcomingTripsHandler = class FindUpcomingTripsHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findUpcomingTrip(query.userId);
        });
    }
};
FindUpcomingTripsHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.FindUpcomingTripsQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_q = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _q : Object])
], FindUpcomingTripsHandler);
exports.FindUpcomingTripsHandler = FindUpcomingTripsHandler;
let FindTripsForMonthHandler = class FindTripsForMonthHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findTripsForMonth();
        });
    }
};
FindTripsForMonthHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.FindTripsForMonthQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_r = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _r : Object])
], FindTripsForMonthHandler);
exports.FindTripsForMonthHandler = FindTripsForMonthHandler;
let FindBookingsForMonthHandler = class FindBookingsForMonthHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findBookingsForMonth();
        });
    }
};
FindBookingsForMonthHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.FindBookingsForMonthQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_s = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _s : Object])
], FindBookingsForMonthHandler);
exports.FindBookingsForMonthHandler = FindBookingsForMonthHandler;
let FindTripsByMonthHandler = class FindTripsByMonthHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findTripsByMonth();
        });
    }
};
FindTripsByMonthHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.FindTripsByMonthQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_t = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _t : Object])
], FindTripsByMonthHandler);
exports.FindTripsByMonthHandler = FindTripsByMonthHandler;
let FindBookingsByUserHandler = class FindBookingsByUserHandler {
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    execute(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.tripsRepository.findBookingsByUser(query.userId);
        });
    }
};
FindBookingsByUserHandler = tslib_1.__decorate([
    (0, cqrs_1.QueryHandler)(trips_query_query_1.FindBookingsByUserQuery),
    tslib_1.__metadata("design:paramtypes", [typeof (_u = typeof repository_1.TripsRepository !== "undefined" && repository_1.TripsRepository) === "function" ? _u : Object])
], FindBookingsByUserHandler);
exports.FindBookingsByUserHandler = FindBookingsByUserHandler;


/***/ }),

/***/ "./libs/api/trips/service/feature/src/lib/queries/trips-query.query.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindBookingsByUserQuery = exports.FindTripsByMonthQuery = exports.FindBookingsForMonthQuery = exports.FindTripsForMonthQuery = exports.FindUpcomingTripsQuery = exports.FindAllTripRequestsQuery = exports.SearchTripsQuery = exports.FindTripByIdQuery = exports.FindCoordinatesByTripQuery = exports.FindBookingByTripAndUserIdQuery = exports.FindBookingByTripQuery = exports.findByDriverReviewsQuery = exports.findAllPassengersQuery = exports.findByPassengerReviewsQuery = exports.findByRequestedTripsQuery = exports.findByConfirmedTripsQuery = exports.FindByPassengerQuery = exports.FindByDriverQuery = exports.FindAllQuery = void 0;
class FindAllQuery {
}
exports.FindAllQuery = FindAllQuery;
class FindByDriverQuery {
    constructor(driverId) {
        this.driverId = driverId;
    }
}
exports.FindByDriverQuery = FindByDriverQuery;
class FindByPassengerQuery {
    constructor(passengerId) {
        this.passengerId = passengerId;
    }
}
exports.FindByPassengerQuery = FindByPassengerQuery;
class findByConfirmedTripsQuery {
    constructor(passengerId) {
        this.passengerId = passengerId;
    }
}
exports.findByConfirmedTripsQuery = findByConfirmedTripsQuery;
class findByRequestedTripsQuery {
    constructor(passengerId) {
        this.passengerId = passengerId;
    }
}
exports.findByRequestedTripsQuery = findByRequestedTripsQuery;
class findByPassengerReviewsQuery {
    constructor(passengerId) {
        this.passengerId = passengerId;
    }
}
exports.findByPassengerReviewsQuery = findByPassengerReviewsQuery;
class findAllPassengersQuery {
    constructor(tripID) {
        this.tripID = tripID;
    }
}
exports.findAllPassengersQuery = findAllPassengersQuery;
class findByDriverReviewsQuery {
    constructor(DriverId) {
        this.DriverId = DriverId;
    }
}
exports.findByDriverReviewsQuery = findByDriverReviewsQuery;
class FindBookingByTripQuery {
    constructor(tripId) {
        this.tripId = tripId;
    }
}
exports.FindBookingByTripQuery = FindBookingByTripQuery;
class FindBookingByTripAndUserIdQuery {
    constructor(tripId, userId) {
        this.tripId = tripId;
        this.userId = userId;
    }
}
exports.FindBookingByTripAndUserIdQuery = FindBookingByTripAndUserIdQuery;
class FindCoordinatesByTripQuery {
    constructor(tripId) {
        this.tripId = tripId;
    }
}
exports.FindCoordinatesByTripQuery = FindCoordinatesByTripQuery;
class FindTripByIdQuery {
    constructor(tripId) {
        this.tripId = tripId;
    }
}
exports.FindTripByIdQuery = FindTripByIdQuery;
class SearchTripsQuery {
    constructor(date) {
        this.date = date;
    }
}
exports.SearchTripsQuery = SearchTripsQuery;
class FindAllTripRequestsQuery {
    constructor(userId) {
        this.userId = userId;
    }
}
exports.FindAllTripRequestsQuery = FindAllTripRequestsQuery;
class FindUpcomingTripsQuery {
    constructor(userId) {
        this.userId = userId;
    }
}
exports.FindUpcomingTripsQuery = FindUpcomingTripsQuery;
class FindTripsForMonthQuery {
}
exports.FindTripsForMonthQuery = FindTripsForMonthQuery;
class FindBookingsForMonthQuery {
}
exports.FindBookingsForMonthQuery = FindBookingsForMonthQuery;
class FindTripsByMonthQuery {
}
exports.FindTripsByMonthQuery = FindTripsByMonthQuery;
class FindBookingsByUserQuery {
    constructor(userId) {
        this.userId = userId;
    }
}
exports.FindBookingsByUserQuery = FindBookingsByUserQuery;


/***/ }),

/***/ "./libs/api/trips/service/feature/src/lib/trip-service.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TripsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const trips_query_query_1 = __webpack_require__("./libs/api/trips/service/feature/src/lib/queries/trips-query.query.ts");
const trips_command_command_1 = __webpack_require__("./libs/api/trips/service/feature/src/lib/commands/trips-command.command.ts");
let TripsService = class TripsService {
    constructor(queryBus, commandBus) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.FindAllQuery());
        });
    }
    findTripById(tripId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.FindTripByIdQuery(tripId));
        });
    }
    findBookingsByUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.FindBookingsByUserQuery(userId));
        });
    }
    findUpcomingTrip(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.FindUpcomingTripsQuery(id));
        });
    }
    findByDriver(driverId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.FindByDriverQuery(driverId));
        });
    }
    findByPassenger(passengerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.FindByPassengerQuery(passengerId));
        });
    }
    findTripsForMonth() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.FindTripsForMonthQuery());
        });
    }
    findBookingsForMonth() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.FindBookingsForMonthQuery());
        });
    }
    findByConfirmedTrips(passengerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.findByConfirmedTripsQuery(passengerId));
        });
    }
    findTripsByMonth() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.FindTripsByMonthQuery());
        });
    }
    findByRequestedTrips(passengerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.findByRequestedTripsQuery(passengerId));
        });
    }
    findByPassengerReviews(passengerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.findByPassengerReviewsQuery(passengerId));
        });
    }
    findAllPassengers(tripID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.findAllPassengersQuery(tripID));
        });
    }
    findByDriverReviews(DriverId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.findByDriverReviewsQuery(DriverId));
        });
    }
    findBookingByTrip(tripID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.FindBookingByTripQuery(tripID));
        });
    }
    findBookingByTripAndUserId(tripID, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.FindBookingByTripAndUserIdQuery(tripID, userId));
        });
    }
    findCoordinatesByTrip(tripID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.FindCoordinatesByTripQuery(tripID));
        });
    }
    searchTrips(date) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.SearchTripsQuery(date));
        });
    }
    create(driver, tripDate, seatsAvailable, price, status, startLocationAddress, startLocationLongitude, startLocationLatitude, destinationAddress, destinationLongitude, destinationLatitude) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new trips_command_command_1.TripsCreateCommand(driver, tripDate, seatsAvailable, price, status, startLocationAddress, startLocationLongitude, startLocationLatitude, destinationAddress, destinationLongitude, destinationLatitude));
        });
    }
    bookTrip(passengerId, tripId, seatsBooked, status, price, address, latitude, longitude) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new trips_command_command_1.BookTripCommand(tripId, passengerId, seatsBooked, status, price, address, longitude, latitude));
        });
    }
    postReview(byId, forId, tripId, role, comment, rating) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new trips_command_command_1.CreateReviewCommand(byId, forId, tripId, role, comment, rating));
        });
    }
    update(tripId, seatsAvailable, price, status) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new trips_command_command_1.TripsUpdateCommand(tripId, seatsAvailable, price, status));
        });
    }
    updatePaymentStatus(bookingId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new trips_command_command_1.BookingUpdatePaymentStatusCommand(bookingId));
        });
    }
    updateReviewPassenger(bookingId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new trips_command_command_1.UpdatePassengerReviewsCommand(bookingId));
        });
    }
    updateReviewDriver(tripId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new trips_command_command_1.UpdateDriverReviewsCommand(tripId));
        });
    }
    delete(tripId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new trips_command_command_1.TripsDeleteCommand(tripId));
        });
    }
    acceptTripRequest(tripId, bookingId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new trips_command_command_1.AcceptTripRequestCommand(tripId, bookingId));
        });
    }
    declineTripRequest(bookingId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new trips_command_command_1.DeclineTripRequestCommand(bookingId));
        });
    }
    startTrip(tripId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new trips_command_command_1.StartTripCommand(tripId));
        });
    }
    endTrip(tripId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commandBus.execute(new trips_command_command_1.EndTripCommand(tripId));
        });
    }
    findAllTripRequests(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new trips_query_query_1.FindAllTripRequestsQuery(userId));
        });
    }
};
TripsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object])
], TripsService);
exports.TripsService = TripsService;
var Role;
(function (Role) {
    Role["PASSENGER"] = "PASSENGER";
    Role["DRIVER"] = "DRIVER";
})(Role || (Role = {}));


/***/ }),

/***/ "./libs/api/weather/api/feature/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/weather/api/feature/src/lib/api-weather-api-feature.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/weather/api/feature/src/lib/weather-resolver.resolver.ts"), exports);


/***/ }),

/***/ "./libs/api/weather/api/feature/src/lib/api-weather-api-feature.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WeatherModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const cqrs_1 = __webpack_require__("@nestjs/cqrs");
const weather_resolver_resolver_1 = __webpack_require__("./libs/api/weather/api/feature/src/lib/weather-resolver.resolver.ts");
let WeatherModule = class WeatherModule {
};
WeatherModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule],
        providers: [weather_resolver_resolver_1.WeatherResolver],
        exports: [],
    })
], WeatherModule);
exports.WeatherModule = WeatherModule;


/***/ }),

/***/ "./libs/api/weather/api/feature/src/lib/weather-resolver.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WeatherResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const entities_1 = __webpack_require__("./libs/api/weather/api/shared/entities/data-access/src/index.ts");
const axios_1 = __webpack_require__("axios");
let WeatherResolver = class WeatherResolver {
    getWeather(lat, long) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const location = yield axios_1.default.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=ZLZ7t3NgGRDKOaXMKZshgK0Gf2UAyv5m&q=${lat}%2C${long}`);
            const conditions = yield axios_1.default.get(`http://dataservice.accuweather.com/currentconditions/v1/${location.data.Key}?apikey=ZLZ7t3NgGRDKOaXMKZshgK0Gf2UAyv5m&details=true`);
            const result = {
                isRaining: false,
                isWindy: false,
                windSpeed: `${conditions.data[0].Wind.Speed.Metric.Value}km/h`,
                isSnowing: false,
                temperature: `${conditions.data[0].Temperature.Metric.Value}°C`,
            };
            if (conditions.data[0].HasPrecipitation) {
                conditions.data[0].PrecipitationType === 'Rain' &&
                    (result.isRaining = true);
                conditions.data[0].PrecipitationType === 'Snow' &&
                    (result.isSnowing = true);
            }
            if (conditions.data[0].Wind.Speed.Metric.Value > 30) {
                result.isWindy = true;
            }
            return result;
        });
    }
};
tslib_1.__decorate([
    (0, graphql_1.Query)(() => entities_1.Weather),
    tslib_1.__param(0, (0, graphql_1.Args)('lat')),
    tslib_1.__param(1, (0, graphql_1.Args)('long')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], WeatherResolver.prototype, "getWeather", null);
WeatherResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)()
], WeatherResolver);
exports.WeatherResolver = WeatherResolver;


/***/ }),

/***/ "./libs/api/weather/api/shared/entities/data-access/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/api/weather/api/shared/entities/data-access/src/lib/api-weather-api-shared-entities-data-access.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/api/weather/api/shared/entities/data-access/src/lib/weather-entity.entity.ts"), exports);


/***/ }),

/***/ "./libs/api/weather/api/shared/entities/data-access/src/lib/api-weather-api-shared-entities-data-access.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiWeatherApiSharedEntitiesDataAccessModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ApiWeatherApiSharedEntitiesDataAccessModule = class ApiWeatherApiSharedEntitiesDataAccessModule {
};
ApiWeatherApiSharedEntitiesDataAccessModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], ApiWeatherApiSharedEntitiesDataAccessModule);
exports.ApiWeatherApiSharedEntitiesDataAccessModule = ApiWeatherApiSharedEntitiesDataAccessModule;


/***/ }),

/***/ "./libs/api/weather/api/shared/entities/data-access/src/lib/weather-entity.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Weather = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let Weather = class Weather {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], Weather.prototype, "isRaining", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], Weather.prototype, "isWindy", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Weather.prototype, "windSpeed", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], Weather.prototype, "isSnowing", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Weather.prototype, "temperature", void 0);
Weather = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Weather);
exports.Weather = Weather;


/***/ }),

/***/ "@nestjs-modules/mailer":
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer");

/***/ }),

/***/ "@nestjs-modules/mailer/dist/adapters/handlebars.adapter":
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");

/***/ }),

/***/ "@nestjs/apollo":
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/cqrs":
/***/ ((module) => {

module.exports = require("@nestjs/cqrs");

/***/ }),

/***/ "@nestjs/graphql":
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@prisma/client":
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "axios":
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "graphql-subscriptions":
/***/ ((module) => {

module.exports = require("graphql-subscriptions");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map