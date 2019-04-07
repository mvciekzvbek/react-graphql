import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const Users = () => 
    <Query 
        query={gql`
            {
                totalUsers
                allUsers {
                    githubLogin
                    name
                    avatar
                }
            }
        `}
    >
        {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error</p>
            return <UserList count={data.totalUsers} users={data.allUsers}/>
        }}
    </Query>

const UserList = ({count, users}) => {
    return (
        <div>
            <p>{count} users</p>
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