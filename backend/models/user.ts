/*

// Some CURSACH leftover
import * as Mongoose  from 'mongoose';
import * as Jwt       from 'jsonwebtoken';
import * as Paginate  from 'mongoose-paginate';
import * as Apollo    from 'apollo-server-express';
import * as Vts       from 'vee-type-safe';
import * as Config    from '@app/config';
import * as _         from 'lodash';

import ObjectId = Mongoose.Types.ObjectId;

export interface UserData {
    // id:            ObjectId;
    login:         string;
    // role:          UserRole;
    fullname:      string;
    password:      string;
    registeredAt:  Date;
    avaUrl?:       string | null;
    isDisabled:    boolean;
    groupId?:      ObjectId | null;
    tgChatId?:     number;
    tgUsername?:   string; 
}

export const Schema = new Mongoose.Schema({
    // [Helpers.paginate.metaSymbol]: {
    //     id: {
    //         aliasFor: '_id',
    //         required: true
    //     }
    // } as Helpers.PaginateMetadata,
    role:         { type: String,  required: true,  enum: Object.values(UserRole) },
    login:        { type: String,  required: true  },
    password:     { type: String,  required: true  },
    fullname:     { type: String,  required: true  },
    registeredAt: { type: Date,    required: true, default: Date.now },
    avaUrl:       { type: String,  required: false },
    isDisabled:   { type: Boolean, required: false, default: false },
    tgChatId:     { type: Number,  required: false },
    tgUsername:   { type: String,  required: false },
    groupId: {
        type: Mongoose.SchemaTypes.ObjectId,
        ref: 'Group',
        required: false
    }
});

// function patchToMongoUpdate(patch: GqlV1.UpdateMePatch | GqlV1.UpdateUserPatch) {
//     return _.omitBy(patch, (key, value) => (
//         key === 'avaUrl' ? _.isUndefined(value) : _.isNil(value)
//     ));
// }

const Statics: UserStatics = {
    findByTgChatId(tgChatId) {
        return Helpers.tryFindOne(User, { tgChatId });
    },
    async registerTgChatId({ tgChatId, tgUsername }) {
        const updated = await User.findOneAndUpdate({ tgUsername }, { tgChatId }).exec();
        return updated        ? 
            { failure: null } :
            { failure: "telegram username is not registered" };
    },

    // updateUser: async ({ id, patch }) => ({
    //     user: await Helpers.tryUpdateById(User, id, patchToMongoUpdate(patch))
    // }),

    deleteUser: async ({ id }) => ({ user: await Helpers.tryDeleteById(User, id) }),
    getUser:    async ({ id }) => ({ user: await Helpers.tryFindById(User, id)   }),

    getUsers: req => Helpers.paginate<User, UserModel>({
        ...req,
        model: User,
        sort: { login: 'asc' },
    }),

    unAssignGroup: (groupId, usersId) => User
        .update({ groupId, _id: { $in: usersId } },
                { groupId: null },
                { multi: true }
        ).exec(),

    assignGroup: (groupId, usersId) => User
        .update({ _id: { $in: usersId } },
                { groupId },
                { multi: true}
        ).exec(),
        
    findByLoginPassword: (login, password) => User.findOne({
        login,
        password: Config.encodePassword(password)
    }).exec(),

    // deprecated
    getPageRest: async pageArgs => paginate<User, UserModel, ApiUser.BasicJson>(User, {
        pageArgs,
        map: user => user.toBasicJsonData(),
        searchField: 'login',
        lean: false,
        sort: { login: 'asc' }
    })
};

const Methods: UserMethods = {
    makeJwt() {
        const customPayload: ApiV1.Data.CustomJwtPayload = {
            sub: String(this._id)
        };
        return Jwt.sign(customPayload, Config.JwtKeyPair.private, {
            expiresIn: Config.JwtExpirationTime,
            algorithm: Config.JwtEncodingAlgorithm
        });
    }
};

Schema.statics = Statics;
Schema.methods = Methods;
// Schema.index()

Schema.plugin(Paginate);

export const User = Mongoose.model<User, UserModel>('User', Schema);

export interface UserMethods {
    makeJwt(this: User): string;
    updateMe(this: User, req: GqlV1.UpdateMeRequest): Promise<GqlV1.UpdateMeResponse>;
}
export interface User extends Mongoose.Document, UserData, UserMethods {
}

export interface UserStatics {
    findByTgChatId(chatId: number): Promise<User>;
    registerTgChatId(req: GqlV1.RegisterTgChatIdRequest): Promise<GqlV1.RegisterTgChatIdResponse>;

    updateUser(req: GqlV1.UpdateUserRequest): Promise<GqlV1.UpdateUserResponse>;
    deleteUser(req: GqlV1.DeleteUserRequest): Promise<GqlV1.DeleteUserResponse>;
    getUser(req: GqlV1.GetUserRequest):       Promise<GqlV1.GetUserResponse>;
    getUsers(req: GqlV1.GetUsersRequest):     Promise<GqlV1.GetUsersResponse>;
    assignGroup  (groupId: ObjectId, usersId: ObjectId[]): Promise<number>;
    unAssignGroup(groupId: ObjectId, usersId: ObjectId[]): Promise<number>;
    findByLoginPassword(login: string, password: string): Promise<User | null>;
    

    // deprecated
    getPageRest(
        pageArgs: ApiV1.PaginationArgs
    ): Promise<ApiV1.Paginated<ApiUser.BasicJson>>;
}

export interface UserModel extends Mongoose.PaginateModel<User>, UserStatics {
    
}
*/