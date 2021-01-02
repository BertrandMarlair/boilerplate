import { inputObjectType } from "nexus";
import TypeEnum from "../enum/typeEnum";

const editUserInput = inputObjectType({
    name: "editUserInput",
    definition(t) {
      t.string("name", { required: true });
      t.string("type", { required: true, type: TypeEnum });
    },
});

export default editUserInput;