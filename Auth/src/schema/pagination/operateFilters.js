/* eslint-disable no-console */
// import Sequelize from "sequelize";

// import moment from "moment";
// const Op = Sequelize.Op;

const FILTER_TYPES_OPERATORS = new Map([
    // [type_name, [available_operators...]]
    ["STRING", ["iLike"]],
    ["DATE", ["gte", "lte", "between", "notBetween"]],
    ["NUMBER", ["gte", "lte", "eq", "not"]],
    ["ID", ["eq", "not"]],
]);

const errorIf = condition => (err_msg, throw_err = true) => {
    if (condition) {
        const err = new Error(err_msg);

        console.error(err);
        if (throw_err) {
            throw err;
        }
    }
};

const getCurrentOperator = (operator, available_operators) => {
    let current_operator = operator;

    if (!current_operator && available_operators.length === 1) {
        current_operator = available_operators[0];
    } else if (!available_operators.includes(current_operator)) {
        // current filter must be an available one
        current_operator = null;
    }

    return current_operator;
};

// const formatValues = (values, type, operator) => {
//     let sql_array = values;

//     if (type === "STRING") {
//         sql_array = values.map(value => `%${value}%`);
//     }

//     if (type === "DATE") {
//         sql_array = values.map(value =>
//             moment(value, "YYYY-MM-DD").format("YYYY-MM-DDT00:00:00.000-00:00"),
//         );
//     }

//     if (operator === "gte" || operator === "lte") {
//         return sql_array[0];
//     }

//     if (operator === "between" || operator === "notBetween") {
//         return sql_array.slice(0, 2);
//     }

//     return {
//         [Op.any]: JSON.stringify(sql_array)
//             .replace("[", "{")
//             .replace("]", "}"),
//     };
// };

const findIncludedStatementByIndex = (filter_index, query_statement) => {
    let targeted_statement = null,
        path_length = 0;

    // keep record of nested include statements the target comes from
    const targeted_statement_path = [];

    // recussif fn to search the filter index in all the nested include statements
    // eslint-disable-next-line func-style
    function targetStatement(statement) {
        const included_statements = statement.include || [];

        targeted_statement = included_statements.find((join) => {
            if(join.include) join.where = {}
            return join.filter_index === filter_index
        });

        for (const [i, joined_statement] of included_statements.entries()) {
            if (targeted_statement) {
                targeted_statement_path.push(targeted_statement);
                const prev_statement = included_statements[i - 1];

                if (prev_statement && path_length > 0) {
                    targeted_statement_path.push(prev_statement);
                }

                break;
            } else if (joined_statement.model) {
                path_length++;
                targetStatement(joined_statement);
            }
        }
    }

    targetStatement(query_statement);

    // the required property must be true so the filter can work even if its a nested include statement
    targeted_statement_path.forEach(path => {
        path.required = true;
    });

    return targeted_statement;
};

const buildWhereStatement = (
    query_statement,
    // main_op,
    // key,
    // values,
    // type,
    // current_operator,
) => {
    query_statement.where = query_statement.where || {};
    // const where_layer = query_statement.where;

    // where_layer[Op[main_op]] = where_layer[Op[main_op]] || {};
    // const main_op_layer = where_layer[Op[main_op]];

    // main_op_layer[key] = main_op_layer[key] || {};
    // const key_layer = main_op_layer[key];

    // key_layer[Op.or] = key_layer[Op.or] || {};
    // const or_layer = key_layer[Op.or];

    // or_layer[Op[current_operator]] = formatValues(
    //     values,
    //     type,
    //     current_operator,
    // );
};

const buildStatement = (
    query_statement,
    main_op,
    key,
    values,
    type,
    current_operator,
) => {
    if (key.includes(".")) {
        const [filter_index, field_key] = key.split(".");
        const targeted_statement = findIncludedStatementByIndex(
            filter_index,
            query_statement,
        );

        errorIf(!targeted_statement)(
            `Invalid filter request: key '${key}' expects corresponding included statement with filter_index '${filter_index}' but found none.`,
        );

        buildWhereStatement(
            targeted_statement,
            main_op,
            field_key,
            values,
            type,
            current_operator,
        );
    } else {
        buildWhereStatement(
            query_statement,
            main_op,
            key,
            values,
            type,
            current_operator,
        );
    }
};

export const operateFilters = (
    query_statement,
    available_keys,
    filters_to_operate = [],
) => {
    for (const operation of filters_to_operate) {
        const current_filter = available_keys.get(operation.key);
        const main_op = operation.inner_stack_operator || "and";

        errorIf(!current_filter)(
            `Invalide key '${
                operation.key
            }' for the filtered query. Choose between keys ${JSON.stringify(
                Array.from(available_keys.keys()),
            )}`,
        );

        const type = current_filter.type;
        const available_operators = FILTER_TYPES_OPERATORS.get(type);

        errorIf(!available_operators)(
            `Invalid type '${current_filter.type}' for key '${
                operation.key
            }'. Choose between types ${JSON.stringify(
                Array.from(FILTER_TYPES_OPERATORS.keys()),
            )}`,
        );

        for (const filter of operation.filters) {
            let current_operator = getCurrentOperator(
                filter.operator,
                available_operators,
            );

            errorIf(!current_operator)(
                `Invalid operator '${
                    filter.operator
                }' for type '${type}' of key '${
                    operation.key
                }'. Choose between ${JSON.stringify(available_operators)}`,
            );

            const values = filter.values;

            errorIf(!values && values.length === 0 && !current_operator)(
                `No value given to '${current_operator}' for type '${current_filter.type}' of key '${operation.key}'. At least one value is required to filter.`,
            );

            buildStatement(
                query_statement,
                main_op,
                operation.key,
                values,
                type,
                current_operator,
            );
        }
    }
};

export const listAvailableFilters = availables => {
    let result = [];

    for (const key of Array.from(availables.keys())) {
        const filter_info = availables.get(key);

        filter_info.key = key;
        filter_info.valid_operators = FILTER_TYPES_OPERATORS.get(
            filter_info.type,
        );

        result.push(filter_info);
    }

    return result;
};