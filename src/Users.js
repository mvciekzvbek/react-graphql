import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { ROOT_QUERY } from './App';

const Users = () => 
    <Query 
        query={ROOT_QUERY}
        // pollInterval={60000}
    >
        {({ data, error, loading, refetch }) => {
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

const UserList = ({count, users, refetch}) => {
    return (
        <div>
            <p>{count} users</p>
            <button onClick={() => refetch()}>Refetch</button>
            <Mutation 
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
            </Mutation>
            <ul>
                {users.map(user => 
                    <UserListItem
                        key={user.githubLogin}
                        name={user.name}
                        avatar={user.avatar}
                    />
                )}
            </ul>
        </div>
    )
}

const UserListItem = ({name, avatar}) => {
    return (
        <li>
            <img src={avatar} width={48} height={48} alt="" />
            {name}
        </li>
    )
}
export default Users;