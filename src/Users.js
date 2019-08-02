import React from 'react';
import { Query, Mutation } from 'react-apollo';
// import { gql } from 'apollo-boost';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ROOT_QUERY } from './App';


const Users = () => (
  <Query
    query={ROOT_QUERY}
    variables={{ filter: {}, page: {}, sort: {} }}
  >
    {({
      data, error, loading, refetch,
    }) => {
    // console.log(data);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;
      return (
        <UserList
          count={data.totalUsers}
          users={data.allUsers.hits}
          refetch={refetch}
        />
      );
    }}
  </Query>
);/**
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
    paddingTop: '32px',
    paddingBottom: '32px',
    maxWidth: "900px"
  },
  avatar: {
    height: 0,
    paddingTop: '100%',
    // width: "250px",
    // height: "250px",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    fontSize: '.7em',
    '&:hover': {
      '& > div': {
        display: 'block',
      },
    },
  },
  layer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundColor: 'black',
    opacity: '0.7',
    color: 'white',
    textAlign: 'center',
    display: 'none',
  },
  name: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '0',
    right: '0',
    margin: '0 auto',
    fontWeight: 'bold',
    fontSize: '1.5em',
  },
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

const UserList = ({ count, users, refetch }) => {
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
          {users.map((user) => {
            return (
              <Grid item sm={2} xs={4} key={user.githubLogin}>
                <UserListItem
                  data={user}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

const UserListItem = (props) => {
  const classes = useStyles();
  const user = props.data;
  
  return (
    <a href={`/users/${user.githubLogin}`} tabIndex="-1">
      <div className={classes.avatar} style={{ backgroundImage: `url(${user["avatar_url"]})` }}>
        <div className={classes.layer}>
          <span className={classes.name}>{user.githubLogin}</span>
        </div>
      </div>
    </a>
  );
};
export default Users;
