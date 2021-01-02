import {queryOne, queryOneById, updateOneById} from "../../../core/mongo";

export const getUserById = async _id => {
    return await queryOneById("users", _id);
};

export const getUserByName = async name => {
    return await queryOne("users", {name});
};

export const updateUserById = async (_id, updateValue) => {
    return await updateOneById("users", _id, updateValue);
};
