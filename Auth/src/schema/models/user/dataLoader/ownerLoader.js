import DataLoader from "dataloader";

import {DBmodels} from "../../../../main";

const filterOwners = (key, owners) => {
    for (const owner of owners) {
        if (owner.id === key) {
            return owner
        }
    }
};

const getBatchOwner = async keys => {
    const items = await DBmodels.User.findAll({
        where: {
            id: keys,
        },
    });

    const result = [];

    for (const key of keys) {
        let owner_users = filterOwners(key, items);

        result.push(owner_users || null);
    }

    return result;

};

const ownerLoader = new DataLoader(
    keys => getBatchOwner(keys),
    {cache: false},
);

export default ownerLoader;
