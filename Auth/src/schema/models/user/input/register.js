import { inputObjectType } from "nexus";
import TypeEnum from "../enum/typeEnum";

const registerInput = inputObjectType({
    name: "registerInput",
    definition(t) {
      t.string("name", { required: true });
      t.string("type", { required: true, type: TypeEnum });
      t.string("password", { required: true });
      t.string("passwordConfirmation", { required: true });
    },
});

export default registerInput;