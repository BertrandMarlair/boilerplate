import { ForbiddenError } from "apollo-server-express";
// import Sequelize from "sequelize";

const errorIf = condition => (err_msg, throw_err = true) => {
    if (condition) {
        const err = new Error(err_msg);

        if (throw_err) {
            throw new ForbiddenError(err);
        }
    }
};

const paginate = async (models, model_key, query, pagination = {}, available_orders, default_order) => {
    const page = pagination.page || 0;
    const pageSize = pagination.pageSize || 25;
    const orderKey = pagination.orderKey || default_order || "updatedAt";
    const orderValue = pagination.orderValue || "DESC";
    const current_order = available_orders.get(pagination.orderKey);

    if(pagination.orderKey){
        errorIf(!current_order)(
            `Invalide key '${
                pagination.orderKey
            }' for the filtered query. Choose between keys ${JSON.stringify(
                Array.from(available_orders.keys()),
            )}`,
        );
    }

    query.offset = page * pageSize;
    query.limit = pageSize;
    
    if(orderKey.includes(".")){
        query.limit = pageSize * 2;
        query.subQuery = false;
        // query.order = [[Sequelize.literal(orderKey), orderValue]];
    } else {
        query.order = [[orderKey, orderValue]];
    }

    const {count: total_instances, rows: records} = await models[
        model_key
    ].findAndCountAll(query);

    const total_pages = Math.ceil(total_instances / pageSize)

    const last_page = total_pages > 0 ? total_pages - 1 : total_pages;

    return {
        records,
        pagination_data: {
            last_page,
            current_page: page || 0,
            total_instances,
            available_orders: listAvailableOrders(available_orders),
        },
    };
};

export default paginate;

export const listAvailableOrders = availables => {
    let result = [];

    for (const key of Array.from(availables.keys())) {
        const order_info = availables.get(key);
        
        order_info.key = key;
        result.push(order_info);
    }

    return result;
};
