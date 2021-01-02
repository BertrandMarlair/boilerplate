const healhCheck = async (req, res) => {
    try {
        return res.status(200).send("Health check success");
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

export default healhCheck;
