import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const ROOT_QUERY = gql`
    {   
        totalUsers
        allUsers {
            githubLogin
            name
            avatar
        }
    }
`

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
            refetchQueries={[{query: ROOT_QUERY}]}
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