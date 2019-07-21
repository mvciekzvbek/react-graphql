import React from 'react';
import { Query, Mutation } from 'react-apollo';
// import { gql } from 'apollo-boost';
import { ROOT_QUERY } from './App';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const Users = () => 
    <Query 
        query={ROOT_QUERY}
        variables={{filter:{}, page:{}, sort:{}}}
        // pollInterval={60000}
    >
        {({ data, error, loading, refetch }) => {
            // console.log(data);
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error</p>
            return <UserList 
                count={data.totalUsers} 
                users={data.allUsers} 
                refetch={refetch} />
        }}
    </Query>

/**
 * When the Mutation component invokes the updateUserCache function, it sends the cache and the data that
 * has been returned in the mutation response.
 * 
 * We read the data from the current cache using readQuery, merge with data fetched in Mutation and save in cache.
 * @param {*} cache 
 * @param {*} param1 
 */
// const updateUserCache = (cache, {data: {addFakeUsers}}) => {
//     let data = cache.readQuery({query: ROOT_QUERY});
//     data.totalUsers += addFakeUsers.length;
//     data.allUsers = [
//         ...data.allUsers,
//         ...addFakeUsers
//     ]
//     cache.writeQuery({query: ROOT_QUERY, data})
// }

const useStyles = makeStyles({
    container: {
        paddingTop: "32px",
        paddingBottom: "32px"
    },
    avatar: {
        height: 0,
        paddingTop: "100%",
        // width: "250px",
        // height: "250px",
        backgroundRepat: "no-repeat",
        backgroundSize: "cover"
    }
    // root: {
    //     flexGrow: 1,
    //     position: "relative"
    // },
    // gridContainer: {
    //     marginBottom: "32px"
    // },
    // gridItem: {
    //     height: "350px"
    // },
    // button: {
    //     position: "absolute",
    //     backgroundColor: "#0093ff",
    //     '&:hover': {
    //         backgroundColor: "#0093ff"
    //     }
    // },
    // "button--left": {
    //     left: 0
    // },
    // "button--right": {
    //     right: 0
    // }
});

const UserList = ({count, users, refetch}) => {
    const classes = useStyles();

    return (
        <div>
            {/* <p>{count} users</p>
            <button onClick={() => refetch()}>Refetch</button> */}
            {/* <Mutation 
                mutation={gql`
                    mutation addFakeUsers($count: Int!) {
                        addFakeUsers(count: $count) {
                            githubLogin,
                            name,
                            avatar
                        }
                }
            `}
            variables={{count: 1}} 
            // update={updateUserCache}
            // refetchQueries={[{query: ROOT_QUERY}]}
            >
                {addFakeUsers =>
                    <button onClick={addFakeUsers}>Add Fake Users</button>
                }
            </Mutation> */}
            <Container className={classes.container}>
                <Grid container spacing={0}>
                    {users.map(user => {
                        console.log(user.id) 
                        return <Grid item sm={2} xs={4} key={user.id}>
                            <UserListItem
                                name={user.name}
                                avatar={user.avatar}
                            />
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    )
}

const UserListItem = ({name, avatar}) => {
    const classes = useStyles();

    return (
        <div className={classes.avatar} style={{backgroundImage: `url(${avatar})`}}></div>
    )
}
export default Users;