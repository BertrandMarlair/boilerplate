import React, {useState, useEffect} from "react";
import {withStyles, Grid} from "@material-ui/core";
import style from "./ApplicationStyle";
import gql from "graphql-tag";
import {useQuery} from "react-apollo";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import Card from "../../../components/card/Card";
import Title from "../../../components/typography/Title";
import Text from "../../../components/typography/Text";

const Application = ({classes}) => {
    const [loaded, setLoaded] = useState(false);
    const [applications, setApplications] = useState([]);

    const {data, loading, error} = useQuery(GET_APPLICATION);

    useEffect(() => {
        if (!loading && loaded === false) {
            setLoaded(true);
        }
    }, [loading, loaded]);

    useEffect(() => {
        if (data?.getAllApplications) {
            setApplications(data.getAllApplications);
        }
    }, [data]);

    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                <Error errorMessage={error} />
                {applications.map((app) => (
                    <Grid item lg={4} md={6} xs={12} key={`application/${app._id}`} className={classes.gridItem}>
                        <Card className={classes.card}>
                            <Title>{app.title}</Title>
                            <Text noWrap className={classes.description}>
                                {app.description}
                            </Text>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {loading && <Loading absolute />}
        </div>
    );
};

export default withStyles(style)(Application);

const GET_APPLICATION = gql`
    query getAllApplications {
        getAllApplications {
            _id
            title
            description
        }
    }
`;
