import {
    PAGINATION_DEFAULT_LIMIT,
} from "./constants";
import {MongoClient, ObjectId} from "mongodb";

const options = {
    reconnectTries: 30,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
};

const {
    MONGO_DOMOTICZ_HOSTNAME,
    MONGO_DOMOTICZ_NAME,
    MONGO_DOMOTICZ_PORT,
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
} = process.env;

const mongo = async () => {
    try {
        const mongoClientPromise = MongoClient.connect(
            `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_DOMOTICZ_HOSTNAME}:${MONGO_DOMOTICZ_PORT}`,
            options,
        );
        const mongoDbPromise = await mongoClientPromise
            .then(client => client.db(MONGO_DOMOTICZ_NAME))
            .catch(err => {
                console.log(err);
            });

        if (mongoDbPromise) {
            return mongoDbPromise;
        }
        return {error: "Impossible to connect to the database"};
    } catch (err) {
        return {error: err.message};
    }
};

export default mongo;

export const query = async (collection_name, rawQuery) => {
    const db = await mongo();

    return await db
        .collection(collection_name)
        .find(rawQuery)
        .toArray();
};

export const queryById = async (collection_name, _id) => {
    return await query(collection_name, {_id: new ObjectId(_id)});
};

export const queryOne = async (collection_name, rawQuery) => {
    const db = await mongo();

    return await db.collection(collection_name).findOne(rawQuery);
};

export const queryOneById = async (collection_name, _id) => {
    return await queryOne(collection_name, {_id: new ObjectId(_id)});
};

export const count = async (collection_name, rawQuery) => {
    const db = await mongo();

    return await db
        .collection(collection_name)
        .find(rawQuery)
        .count();
};

export const updateOne = async (collection_name, rawQuery, rawUpdate) => {
    const db = await mongo();

    const result = await db
        .collection(collection_name)
        .findOneAndUpdate(rawQuery, rawUpdate, {returnOriginal: false});

    return result.value;
};

export const updateOneById = async (collection_name, _id, rawUpdate) => {
    return await updateOne(
        collection_name,
        {_id: new ObjectId(_id)},
        rawUpdate,
    );
};

export const insertOne = async (collection_name, rawQuery) => {
    const db = await mongo();
    const res = await db.collection(collection_name).insertOne(rawQuery);

    return res.ops[0];
};

export const insertMany = async (collection_name, rawQuery) => {
    const db = await mongo();

    return await db.collection(collection_name).insertMany(rawQuery);
};

export const newUpdatedAt = async (collection_name, _id, updated_at) => {
    const db = await mongo();

    return await db
        .collection(collection_name)
        .update({_id: new ObjectId(_id)}, {$set: {updated_at}});
};

export const emptyPaginate = params => {
    const limit = (params && params.limit) || PAGINATION_DEFAULT_LIMIT;
    const page = (params && params.page) || 0;

    return {
        docs: [],
        totalDocs: 0,
        limit,
        hasPrevPage: false,
        hasNextPage: false,
        page,
        totalPages: Math.ceil(0 / limit),
        prevPage: null,
        nextPage: null,
    };
};

export const paginate = async (collection_name, rawQuery, params) => {
    const db = await mongo();
    const limit = params.limit || PAGINATION_DEFAULT_LIMIT;
    const skip = params.page ? params.page * limit : 0;
    const sort = {};

    if (params.orderBy) {
        params.orderBy.map(order => {
            sort[order.field] = order.direction === "DESC" ? 1 : -1;
        });
    }

    const cursor = db
        .collection(collection_name)
        .find(rawQuery)
        .limit(limit)
        .skip(skip)
        .sort(sort);

    const totalDocs = await cursor.count();

    if (skip >= totalDocs) {
        return emptyPaginate();
    }

    const hasPrevPage = skip > 0;
    const hasNextPage = skip + limit < totalDocs;
    const page = params.page || 0;

    return {
        docs: await cursor.toArray(),
        totalDocs,
        limit,
        hasPrevPage,
        hasNextPage,
        page,
        totalPages: Math.ceil(totalDocs / limit),
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
    };
};

export const paginateAgg = async (collection_name, aggregation, params) => {
    const db = await mongo();
    const limit = params.limit || PAGINATION_DEFAULT_LIMIT;
    const skip = params.page ? params.page * limit : 0;

    const docs = await db
        .collection(collection_name)
        .aggregate(
            [
                ...aggregation,
                {
                    $facet: {
                        paginatedResults: [{$skip: skip}, {$limit: limit}],
                        totalCount: [
                            {
                                $count: "count",
                            },
                        ],
                    },
                },
            ].filter(q => q),
        )
        .toArray();

    const totalDocs = docs[0].totalCount[0] ? docs[0].totalCount[0].count : 0;

    if (skip >= totalDocs) {
        return emptyPaginate();
    }

    const hasPrevPage = skip > 0;
    const hasNextPage = skip + limit < totalDocs;
    const page = params.page || 0;

    return {
        docs: docs[0].paginatedResults,
        totalDocs,
        limit,
        hasPrevPage,
        hasNextPage,
        page,
        totalPages: Math.ceil(totalDocs / limit),
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
    };
};

export const getArrayCountAgg = params => {
    const {field, as} = params;

    return {
        $addFields: {
            [as]: {$size: {$ifNull: [`$${field}`, []]}},
        },
    };
};

export const getLookupCountAgg = params => {
    const {collection, from, to, as, pipeline = []} = params;

    return [
        {
            $lookup: {
                from: collection,
                let: {params: `$${from}`},
                pipeline: [
                    {$match: {$expr: {$eq: [`$${to}`, "$$params"]}}},
                    ...pipeline,
                    {$count: "count"},
                ].filter(p => p),
                as,
            },
        },
        {
            $addFields: {
                [as]: {$sum: `$${as}.count`},
            },
        },
    ];
};

export const createLookupFromArray = params => {
    const {collection, from, to, as, pipeline = [], scope} = params;

    return [
        {
            $addFields: {
                [as]: {$ifNull: [`$${scope}`, []]},
            },
        },
        {
            $lookup: {
                from: collection,
                let: {params: `$${from}`},
                pipeline: [
                    {$match: {$expr: {$in: [`$${to}`, "$$params"]}}},
                    ...pipeline,
                ].filter(p => p),
                as,
            },
        },
    ];
};

export const createLookup = params => {
    const {collection, from, to, as, pipeline = []} = params;

    return {
        $lookup: {
            from: collection,
            let: {params: `$${from}`},
            pipeline: [
                {$match: {$expr: {$eq: [`$${to}`, "$$params"]}}},
                ...pipeline,
            ].filter(p => p),
            as,
        },
    };
};

export const createLookupToObject = params => {
    const {collection, from, to, as, pipeline = []} = params;

    return [
        {
            $lookup: {
                from: collection,
                let: {params: `$${from}`},
                pipeline: [
                    {$match: {$expr: {$eq: [`$${to}`, "$$params"]}}},
                    ...pipeline,
                ].filter(p => p),
                as,
            },
        },
        {
            $unwind: {
                path: `$${as}`,
                preserveNullAndEmptyArrays: true,
            },
        },
    ];
};

export const createManualLookup = params => {
    const {collection, from, as, pipeline = []} = params;

    return {
        $lookup: {
            from: collection,
            let: {params: `$${from}`},
            pipeline: [...pipeline].filter(p => p),
            as,
        },
    };
};

export const isAskedByQuery = (type, info, fullQuery) => {
    let selectedFields = [];

    const getAllInfoField = (selections, parentSelection) => {
        for (let i = 0; selections.length > i; i++) {
            const selection = selections[i];

            if (selection.selectionSet) {
                selectedFields.push(
                    `${parentSelection ? `${parentSelection}.` : ""}${
                        selection.name.value
                    }`,
                );
                getAllInfoField(
                    selection.selectionSet.selections,
                    `${parentSelection ? `${parentSelection}.` : ""}${
                        selection.name.value
                    }`,
                );
            } else {
                selectedFields.push(
                    `${parentSelection ? `${parentSelection}.` : ""}${
                        selection.name.value
                    }`,
                );
            }
        }
    };

    getAllInfoField(info.fieldNodes[0].selectionSet.selections);

    if (selectedFields.includes(type)) {
        return fullQuery;
    }
    return [];
};
